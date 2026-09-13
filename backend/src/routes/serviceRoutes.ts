import { Router } from 'express'
import { pool } from '../db'
import type { Service, ServiceInput } from '../types/service'
import { validateServiceInput } from '../utils/serviceValidation'
import { assertNoActiveAppointments } from '../utils/appointmentGuard'
import { requireAuth, requireRole } from '../middleware/auth'

const router = Router()
const serviceColumns = `service_id AS "id", name, description, duration_minutes AS "durationMinutes", price,mode, active, created_at AS "createdAt", updated_at AS "updatedAt"`
const sqlColumns: Record<string, string> = { name: 'name', description: 'description', durationMinutes: 'duration_minutes', price: 'price', mode: 'mode', active: 'active' }

function parseId(value: string): number {
  const id = Number(value)
  if (Number.isSafeInteger(id) && id > 0) return id
  const error = new Error('Service id must be a positive integer') as Error & { status: number; code: string }
  error.status = 400
  error.code = 'INVALID_ID'
  throw error
}

router.post('/', requireAuth, requireRole('admin'), async (req, res, next) => {
  try {
    const input = validateServiceInput(req.body as ServiceInput, true)
    const { rows } = await pool.query<Service>(
      `INSERT INTO services (name, description, duration_minutes, price, mode) VALUES ($1, $2, $3, $4, $5) RETURNING ${serviceColumns}`,
      [input.name, input.description ?? null, input.durationMinutes, input.price, (req.body as any).mode ?? 'clinic'],
    )
    res.status(201).json({ success: true, data: rows[0] })
  } catch (error) { next(error) }
})

router.get('/', async (_req, res, next) => {
  try {
    const { rows } = await pool.query<Service>(`SELECT ${serviceColumns} FROM services WHERE active = true ORDER BY service_id`)
    res.json({ success: true, data: rows })
  } catch (error) { next(error) }
})

router.get('/:id', async (req, res, next) => {
  try {
    const { rows } = await pool.query<Service>(`SELECT ${serviceColumns} FROM services WHERE service_id = $1 AND active = true`, [parseId(req.params.id)])
    if (!rows[0]) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Service not found' } })
    res.json({ success: true, data: rows[0] })
  } catch (error) { next(error) }
})

router.patch('/:id', async (req, res, next) => {
  try {
    const id = parseId(req.params.id)
    const input = validateServiceInput(req.body as ServiceInput, false)
    const entries = Object.entries(input)
    const sets = entries.map(([key], index) => `${sqlColumns[key]} = $${index + 1}`)
    const values = entries.map(([, value]) => value)
    const { rows } = await pool.query<Service>(
      `UPDATE services SET ${sets.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE service_id = $${values.length + 1} AND active = true RETURNING ${serviceColumns}`,
      [...values, id],
    )
    if (!rows[0]) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Service not found' } })
    res.json({ success: true, data: rows[0] })
  } catch (error) { next(error) }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const id = parseId(req.params.id)
    await assertNoActiveAppointments('service_id', id)
    const { rows } = await pool.query(
      `UPDATE services SET active = false, updated_at = CURRENT_TIMESTAMP WHERE service_id = $1 AND active = true RETURNING service_id`,
      [id],
    )
    if (!rows[0]) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Service not found or already inactive' } })
    res.status(204).send()
  } catch (error) { next(error) }
})

export default router
