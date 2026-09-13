import { Router } from 'express'
import { pool } from '../db'
import type { Patient, PatientInput } from '../types/patient'
import { validatePatientInput } from '../utils/patientValidation'
import { assertNoActiveAppointments } from '../utils/appointmentGuard'
import { requireAuth, requireRole } from '../middleware/auth'
import type { AuthRequest } from '../middleware/auth' 
const router = Router()

const patientColumns = `
  patient_id AS "id", full_name AS "fullName", phone, email,
  date_of_birth AS "dateOfBirth", address,
  emergency_contact AS "emergencyContact",
  active,
  created_at AS "createdAt", updated_at AS "updatedAt"
`

function parseId(id: string): number {
  const parsed = Number(id)
  if (!Number.isSafeInteger(parsed) || parsed < 1) {
    const error = new Error('Patient id must be a positive integer') as Error & { status: number; code: string }
    error.status = 400
    error.code = 'INVALID_ID'
    throw error
  }
  return parsed
}

router.post('/', requireAuth, async (req: AuthRequest, res, next) => {
  try {
    const input = validatePatientInput(req.body as PatientInput, true)
    const userId = req.user?.role === 'patient' ? req.user.userId : null

    const { rows } = await pool.query<Patient>(
      `INSERT INTO patients (full_name, phone, email, date_of_birth, address, emergency_contact, user_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING ${patientColumns}`,
      [input.fullName, input.phone, input.email ?? null, input.dateOfBirth ?? null, input.address ?? null, input.emergencyContact ?? null, userId],
    )
    res.status(201).json({ success: true, data: rows[0] })
  } catch (error) { next(error) }
})

router.get('/', async (_req, res, next) => {
  try {
    const { rows } = await pool.query<Patient>(`SELECT ${patientColumns} FROM patients WHERE active = true ORDER BY patient_id`)
    res.json({ success: true, data: rows })
  } catch (error) { next(error) }
})

router.get('/:id', async (req, res, next) => {
  try {
    const id = parseId(req.params.id)
    const { rows } = await pool.query<Patient>(`SELECT ${patientColumns} FROM patients WHERE patient_id = $1 AND active = true`, [id])
    if (!rows[0]) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Patient not found' } })
    res.json({ success: true, data: rows[0] })
  } catch (error) { next(error) }
})

router.patch('/:id', async (req, res, next) => {
  try {
    const id = parseId(req.params.id)
    const input = validatePatientInput(req.body as PatientInput, false)
    const columns = Object.entries(input)

    if (columns.length === 0) {
      const error = new Error('At least one field is required to update') as Error & { status: number; code: string }
      error.status = 400
      error.code = 'VALIDATION_ERROR'
      throw error
    }

    const sqlColumns: Record<string, string> = {
      fullName: 'full_name', phone: 'phone', email: 'email', dateOfBirth: 'date_of_birth', address: 'address', emergencyContact: 'emergency_contact',
      // primaryIssue: 'primary_issue',
      // painArea: 'pain_area',
      // painDuration: 'pain_duration',
      // painSeverity: 'pain_severity',
    }
    const sets = columns.map(([key], index) => `${sqlColumns[key]} = $${index + 1}`)
    const values = columns.map(([, value]) => value)
    const { rows } = await pool.query<Patient>(
      `UPDATE patients SET ${sets.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE patient_id = $${values.length + 1} RETURNING ${patientColumns}`,
      [...values, id],
    )
    if (!rows[0]) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Patient not found' } })
    res.json({ success: true, data: rows[0] })
  } catch (error) { next(error) }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const id = parseId(req.params.id)
    await assertNoActiveAppointments('patient_id', id)
    const { rows } = await pool.query<Patient>(
      `UPDATE patients SET active = false, updated_at = CURRENT_TIMESTAMP
       WHERE patient_id = $1 AND active = true
       RETURNING patient_id`,
      [id],
    )
    if (!rows[0]) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Patient not found or already inactive' } })
    res.status(204).send()
  } catch (error) { next(error) }
})

export default router
