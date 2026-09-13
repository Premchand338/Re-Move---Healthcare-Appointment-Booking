import { Router } from 'express'
import { pool } from '../db'
import { requireAuth, requireRole } from '../middleware/auth'
import type { AuthRequest } from '../middleware/auth'

const router = Router()

const assessmentColumns = `
  assessment_id AS "id", patient_id AS "patientId",
  body_part AS "bodyPart", triggers, sensation, duration,
  goals, care_preference AS "carePreference", created_at AS "createdAt"
`

router.post('/', requireAuth, requireRole('patient', 'admin'), async (req, res, next) => {
  try {
    const { patientId, bodyPart, triggers, sensation, duration, goals, carePreference } = req.body
    const { rows } = await pool.query(
      `INSERT INTO assessments (patient_id, body_part, triggers, sensation, duration, goals, care_preference)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING ${assessmentColumns}`,
      [patientId, bodyPart, triggers, sensation, duration, goals, carePreference]
    )
    res.status(201).json({ success: true, data: rows[0] })
  } catch (error) { next(error) }
})

router.get('/:id', requireAuth, async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      `SELECT ${assessmentColumns} FROM assessments WHERE assessment_id = $1`,
      [req.params.id]
    )
    if (!rows[0]) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Assessment not found' } })
    res.json({ success: true, data: rows[0] })
  } catch (error) { next(error) }
})

router.get('/:id/matches', requireAuth, async (req, res, next) => {
  try {
    const assessment = await pool.query(`SELECT body_part FROM assessments WHERE assessment_id = $1`, [req.params.id])
    if (!assessment.rows[0]) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Assessment not found' } })

    const bodyPart = assessment.rows[0].body_part

    const { rows } = await pool.query(
      `SELECT
         therapist_id AS "therapistId", full_name AS "fullName", specialization,
         rating, review_count AS "reviewCount", price_per_session AS "pricePerSession",
         CASE WHEN $1 = ANY(treats_body_parts) THEN 100 ELSE 40 END AS "matchScore"
       FROM therapists
       WHERE active = true
       ORDER BY "matchScore" DESC, rating DESC NULLS LAST
       LIMIT 5`,
      [bodyPart]
    )
    res.json({ success: true, data: rows })
  } catch (error) { next(error) }
})

export default router