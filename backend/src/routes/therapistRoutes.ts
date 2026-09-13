import { Router } from 'express'
import { pool } from '../db'
import type { Therapist, TherapistInput } from '../types/therapist'
import { validateTherapistInput } from '../utils/therapistValidation'
import { assertNoActiveAppointments } from '../utils/appointmentGuard'
import { requireAuth, requireRole } from '../middleware/auth'

const router = Router()

const therapistColumns = `
  therapist_id AS "id",
  full_name AS "fullName",
  title,
  degrees,
  phone,
  email,
  specialization,
  category,
  bio,
  clinical_focus AS "clinicalFocus",
  experience_years AS "experienceYears",
  rating,
  review_count AS "reviewCount",
  price_per_session AS "pricePerSession",
  match_score AS "matchScore",
  match_reasons AS "matchReasons",
  avatar_url AS "avatarUrl",
  focus_tags AS "focusTags",
  available_slots AS "availableSlots",
  clinic_location AS "clinicLocation",
  active,
  created_at AS "createdAt",
  updated_at AS "updatedAt"
`

const sqlColumns: Record<keyof TherapistInput, string> = {
  fullName: 'full_name',
  title: 'title',
  degrees: 'degrees',
  phone: 'phone',
  email: 'email',
  specialization: 'specialization',
  category: 'category',
  bio: 'bio',
  clinicalFocus: 'clinical_focus',
  experienceYears: 'experience_years',
  rating: 'rating',
  reviewCount: 'review_count',
  pricePerSession: 'price_per_session',
  matchScore: 'match_score',
  matchReasons: 'match_reasons',
  avatarUrl: 'avatar_url',
  focusTags: 'focus_tags',
  availableSlots: 'available_slots',
  clinicLocation: 'clinic_location',
  active: 'active',
}

function parseId(value: string): number {
  const id = Number(value)

  if (Number.isSafeInteger(id) && id > 0) {
    return id
  }

  const error = new Error(
    'Therapist id must be a positive integer',
  ) as Error & {
    status: number
    code: string
  }

  error.status = 400
  error.code = 'INVALID_ID'

  throw error
}

// ==========================================
// POST /therapists
// ==========================================

router.post(
  '/',
  requireAuth,
  requireRole('admin'),
  async (req, res, next) => {
    try {
      const input = validateTherapistInput(
        req.body,
        true,
      )

      const keys = Object.keys(input).filter(
        (key) => key in sqlColumns,
      ) as Array<keyof TherapistInput>

      const cols = keys
        .map((key) => sqlColumns[key])
        .join(', ')

      const placeholders = keys
        .map((_, index) => `$${index + 1}`)
        .join(', ')

      const values = keys.map((key) => input[key])

      const { rows } = await pool.query<Therapist>(
        `INSERT INTO therapists (${cols})
         VALUES (${placeholders})
         RETURNING ${therapistColumns}`,
        values,
      )

      res.status(201).json({
        success: true,
        data: rows[0],
      })
    } catch (error) {
      next(error)
    }
  },
)

// ==========================================
// GET /therapists
// ==========================================

router.get('/', async (_req, res, next) => {
  try {
    const { rows } = await pool.query<Therapist>(
      `SELECT ${therapistColumns}
       FROM therapists
       WHERE active = true
       ORDER BY therapist_id`,
    )

    res.json({
      success: true,
      data: rows,
    })
  } catch (error) {
    next(error)
  }
})

// ==========================================
// GET /therapists/:id
// ==========================================

router.get('/:id', async (req, res, next) => {
  try {
    const { rows } = await pool.query<Therapist>(
      `SELECT ${therapistColumns}
       FROM therapists
       WHERE therapist_id = $1
       AND active = true`,
      [parseId(req.params.id)],
    )

    if (!rows[0]) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Therapist not found',
        },
      })
    }

    res.json({
      success: true,
      data: rows[0],
    })
  } catch (error) {
    next(error)
  }
})

// ==========================================
// PATCH /therapists/:id
// ==========================================

router.patch(
  '/:id',
  requireAuth,
  requireRole('admin'),
  async (req, res, next) => {
    try {
      const rawId = req.params.id

      if (typeof rawId !== 'string') {
        return res.status(400).json({
          success: false,
          error: {
            code: 'BAD_REQUEST',
            message: 'Invalid therapist id',
          },
        })
      }

      const id = parseId(rawId)

      const input = validateTherapistInput(
        req.body,
        false,
      )

      const entries = Object.entries(input)
        .filter(([key]) => key in sqlColumns)
        .filter(([, value]) => value !== undefined) as Array<
        [
          keyof TherapistInput,
          TherapistInput[keyof TherapistInput],
        ]
      >

      if (entries.length === 0) {
        return res.status(400).json({
          success: false,
          error: {
            code: 'BAD_REQUEST',
            message: 'No fields to update',
          },
        })
      }

      const sets = entries.map(
        ([key], index) =>
          `${sqlColumns[key]} = $${index + 1}`,
      )

      const values = entries.map(
        ([, value]) => value,
      )

      const { rows } = await pool.query<Therapist>(
        `UPDATE therapists
         SET ${sets.join(', ')},
             updated_at = CURRENT_TIMESTAMP
         WHERE therapist_id = $${values.length + 1}
         AND active = true
         RETURNING ${therapistColumns}`,
        [...values, id],
      )

      if (!rows[0]) {
        return res.status(404).json({
          success: false,
          error: {
            code: 'NOT_FOUND',
            message: 'Therapist not found',
          },
        })
      }

      res.json({
        success: true,
        data: rows[0],
      })
    } catch (error) {
      next(error)
    }
  },
)

// ==========================================
// DELETE /therapists/:id
// Soft deactivate
// ==========================================

router.delete(
  '/:id',
  requireAuth,
  requireRole('admin'),
  async (req, res, next) => {
    try {
      const rawId = req.params.id

      if (typeof rawId !== 'string') {
        return res.status(400).json({
          success: false,
          error: {
            code: 'BAD_REQUEST',
            message: 'Invalid therapist id',
          },
        })
      }

      const id = parseId(rawId)

      await assertNoActiveAppointments(
        'therapist_id',
        id,
      )

      const { rows } = await pool.query(
        `UPDATE therapists
         SET active = false,
             updated_at = CURRENT_TIMESTAMP
         WHERE therapist_id = $1
         AND active = true
         RETURNING therapist_id`,
        [id],
      )

      if (!rows[0]) {
        return res.status(404).json({
          success: false,
          error: {
            code: 'NOT_FOUND',
            message:
              'Therapist not found or already inactive',
          },
        })
      }

      res.status(204).send()
    } catch (error) {
      next(error)
    }
  },
)

export default router