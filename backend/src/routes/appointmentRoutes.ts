import { Router } from 'express'
import type { PoolClient } from 'pg'
import { pool } from '../db'
import type { Appointment, AppointmentInput } from '../types/appointment'
import { validateAppointmentInput } from '../utils/appointmentValidation'
import { requireAuth, requireRole } from '../middleware/auth'


const router = Router()
const appointmentColumns = `
  appointment_id AS "id", patient_id AS "patientId", therapist_id AS "therapistId",
  service_id AS "serviceId", appointment_at AS "appointmentAt", status,
  patient_note AS "patientNote", therapist_note AS "therapistNote",
  cancelled_at AS "cancelledAt", created_at AS "createdAt", updated_at AS "updatedAt"
`

function apiError(status: number, code: string, message: string): never {
  const error = new Error(message) as Error & { status: number; code: string }
  error.status = status
  error.code = code
  throw error
}

async function assertBookable(client: PoolClient, patientId: string, therapistId: string, serviceId: string) {
  const patient = await client.query('SELECT patient_id FROM patients WHERE patient_id = $1 AND active = true', [patientId])
  if (!patient.rows[0]) apiError(404, 'PATIENT_NOT_FOUND', 'Active patient not found')

  // This lock serializes bookings for one therapist, preventing concurrent overlap.
  const therapist = await client.query('SELECT therapist_id FROM therapists WHERE therapist_id = $1 AND active = true FOR UPDATE', [therapistId])
  if (!therapist.rows[0]) apiError(404, 'THERAPIST_NOT_FOUND', 'Active therapist not found')

  const service = await client.query<{ duration_minutes: number }>('SELECT duration_minutes FROM services WHERE service_id = $1 AND active = true', [serviceId])
  if (!service.rows[0]) apiError(404, 'SERVICE_NOT_FOUND', 'Active service not found')
  return service.rows[0].duration_minutes
}

async function assertSlotAvailable(client: PoolClient, therapistId: string, serviceId: string, appointmentAt: string, excludeId?: number) {
  const duration = await client.query<{ duration_minutes: number }>('SELECT duration_minutes FROM services WHERE service_id = $1', [serviceId])
  const durationMinutes = duration.rows[0]?.duration_minutes
  if (!durationMinutes) apiError(404, 'SERVICE_NOT_FOUND', 'Service not found')

  const conflict = await client.query(
    `SELECT a.appointment_id
     FROM appointments a
     JOIN services s ON s.service_id = a.service_id
     WHERE a.therapist_id = $1
       AND a.status = 'booked'
       AND ($4::bigint IS NULL OR a.appointment_id <> $4)
       AND a.appointment_at < $2::timestamptz + ($3::int * INTERVAL '1 minute')
       AND a.appointment_at + (s.duration_minutes * INTERVAL '1 minute') > $2::timestamptz
     LIMIT 1`,
    [therapistId, appointmentAt, durationMinutes, excludeId ?? null],
  )
  if (conflict.rows[0]) apiError(409, 'SLOT_CONFLICT', 'Therapist is already booked during this time')
}

function parseId(value: string): number {
  const id = Number(value)
  if (Number.isSafeInteger(id) && id > 0) return id
  return apiError(400, 'INVALID_ID', 'Appointment id must be a positive integer')
}

router.post('/', requireAuth, requireRole('admin', 'patient'), async (req, res, next) => {
  const client = await pool.connect()
  try {
    const input = validateAppointmentInput(req.body as AppointmentInput, true)
    await client.query('BEGIN')
    await assertBookable(client, input.patientId!, input.therapistId!, input.serviceId!)
    await assertSlotAvailable(client, input.therapistId!, input.serviceId!, input.appointmentAt!)
    const { rows } = await client.query<Appointment>(
      `INSERT INTO appointments (patient_id, therapist_id, service_id, appointment_at, patient_note)
       VALUES ($1, $2, $3, $4, $5) RETURNING ${appointmentColumns}`,
      [input.patientId, input.therapistId, input.serviceId, input.appointmentAt, input.patientNote ?? null],
    )
    await client.query('COMMIT')
    res.status(201).json({ success: true, data: rows[0] })
  } catch (error) {
    await client.query('ROLLBACK')
    next(error)
  } finally { client.release() }
})

router.get('/', async (req, res, next) => {
  try {
    const values: unknown[] = []
    const filters: string[] = []
    for (const [key, column] of Object.entries({ patientId: 'patient_id', therapistId: 'therapist_id', status: 'status' })) {
      const value = req.query[key]
      if (typeof value === 'string' && value) {
        values.push(value)
        filters.push(`${column} = $${values.length}`)
      }
    }
    const where = filters.length ? `WHERE ${filters.join(' AND ')}` : ''
    const { rows } = await pool.query<Appointment>(`SELECT ${appointmentColumns} FROM appointments ${where} ORDER BY appointment_at`, values)
    res.json({ success: true, data: rows })
  } catch (error) { next(error) }
})

router.get('/:id', async (req, res, next) => {
  try {
    const { rows } = await pool.query<Appointment>(`SELECT ${appointmentColumns} FROM appointments WHERE appointment_id = $1`, [parseId(req.params.id)])
    if (!rows[0]) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Appointment not found' } })
    res.json({ success: true, data: rows[0] })
  } catch (error) { next(error) }
})

router.patch('/:id', async (req, res, next) => {
  const client = await pool.connect()
  try {
    const id = parseId(req.params.id)
    const input = validateAppointmentInput(req.body as AppointmentInput, false)
    await client.query('BEGIN')
    const existing = await client.query<Pick<Appointment, 'therapistId' | 'serviceId' | 'status'>>(
      'SELECT therapist_id AS "therapistId", service_id AS "serviceId", status FROM appointments WHERE appointment_id = $1 FOR UPDATE', [id],
    )
    if (!existing.rows[0]) apiError(404, 'NOT_FOUND', 'Appointment not found')
    const appointment = existing.rows[0]
    if (input.appointmentAt !== undefined) {
      if (appointment.status !== 'booked') apiError(409, 'INVALID_STATUS_TRANSITION', 'Only booked appointments can be rescheduled')
      await client.query('SELECT therapist_id FROM therapists WHERE therapist_id = $1 FOR UPDATE', [appointment.therapistId])
      await assertSlotAvailable(client, appointment.therapistId, appointment.serviceId, input.appointmentAt, id)
    }
    const columnMap: Record<string, string> = { appointmentAt: 'appointment_at', status: 'status', patientNote: 'patient_note', therapistNote: 'therapist_note' }
    const entries = Object.entries(input)
    const sets = entries.map(([key], index) => `${columnMap[key]} = $${index + 1}`)
    const values = entries.map(([, value]) => value)
    if (input.status === 'cancelled') sets.push('cancelled_at = CURRENT_TIMESTAMP')
    const { rows } = await client.query<Appointment>(
      `UPDATE appointments SET ${sets.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE appointment_id = $${values.length + 1} RETURNING ${appointmentColumns}`,
      [...values, id],
    )
    await client.query('COMMIT')
    res.json({ success: true, data: rows[0] })
  } catch (error) {
    await client.query('ROLLBACK')
    next(error)
  } finally { client.release() }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const { rows } = await pool.query<Appointment>(
      `UPDATE appointments SET status = 'cancelled', cancelled_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP
       WHERE appointment_id = $1 AND status = 'booked' RETURNING ${appointmentColumns}`,
      [parseId(req.params.id)],
    )
    if (!rows[0]) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Booked appointment not found' } })
    res.json({ success: true, data: rows[0] })
  } catch (error) { next(error) }
})

export default router
