import { Router } from 'express'
import { pool } from '../db'
import { requireAuth, requireRole } from '../middleware/auth'

const router = Router()

router.post('/', async (req, res, next) => {
  try {
    const { fullName, phone, notes } = req.body
    const { rows } = await pool.query(
      `INSERT INTO inquiries (full_name, phone, notes) VALUES ($1, $2, $3) RETURNING inquiry_id AS "id", full_name AS "fullName", phone, notes, status, created_at AS "createdAt"`,
      [fullName, phone, notes ?? null]
    )
    res.status(201).json({ success: true, data: rows[0] })
  } catch (error) { next(error) }
})

router.get('/', requireAuth, requireRole('admin'), async (_req, res, next) => {
  try {
    const { rows } = await pool.query(`SELECT inquiry_id AS "id", full_name AS "fullName", phone, notes, status, created_at AS "createdAt" FROM inquiries ORDER BY inquiry_id DESC`)
    res.json({ success: true, data: rows })
  } catch (error) { next(error) }
})

export default router