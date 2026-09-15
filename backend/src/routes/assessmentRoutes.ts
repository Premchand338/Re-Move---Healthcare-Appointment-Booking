import { Router, Request } from 'express'
import { pool } from '../db'
import { requireAuth, requireRole, AuthRequest } from '../middleware/auth'

const router = Router()

const assessmentColumns = `
  assessment_id AS "id", patient_id AS "patientId",
  body_part AS "bodyPart", triggers, sensation, duration,
  goals, care_preference AS "carePreference", created_at AS "createdAt"
`

// Helper to convert time slot string to ISO timestamp for tomorrow
function convertSlotToTimestamp(slot: string): string {
  const now = new Date()
  const tomorrow = new Date(now)
  tomorrow.setDate(tomorrow.getDate() + 1)
  tomorrow.setHours(0, 0, 0, 0)

  // Parse slot like "6:30 PM" or "9:00 AM"
  const timeMatch = slot.match(/(\d+):(\d+)\s*(AM|PM)/i)
  if (!timeMatch) {
    return tomorrow.toISOString()
  }

  const hoursStr = timeMatch[1]
  const minutesStr = timeMatch[2]
  const ampm = timeMatch[3]

  if (!hoursStr || !minutesStr || !ampm) {
    return tomorrow.toISOString()
  }

  let hours = parseInt(hoursStr, 10)
  const minutes = parseInt(minutesStr, 10)
  const ampmUpper = ampm.toUpperCase()

  if (ampmUpper === 'PM' && hours !== 12) {
    hours += 12
  } else if (ampmUpper === 'AM' && hours === 12) {
    hours = 0
  }

  tomorrow.setHours(hours, minutes, 0, 0)
  return tomorrow.toISOString()
}

// POST /assessments - Create standalone assessment
router.post('/', requireAuth, requireRole('patient', 'admin'), async (req: Request, res, next) => {
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

// POST /assessments/submit-with-booking - Combined assessment + appointment booking
// router.post('/submit-with-booking', requireAuth, requireRole('patient', 'admin'), async (req: Request, res, next) => {
//   const client = await pool.connect()
//   try {
//     const {
//       bodyPart,
//       painDuration,
//       painScale,
//       aggravatingFactor,
//       primaryGoal,
//       notes,
//       therapistId,
//       appointmentSlot
//     } = req.body

//     // Get patient ID from auth token
//     const userId = (req as AuthRequest).user?.userId

//     if (!userId) {
//       return res.status(401).json({
//         success: false,
//         error: { code: 'UNAUTHORIZED', message: 'User not authenticated' }
//       })
//     }

//     if (!bodyPart || !therapistId || !appointmentSlot) {
//       return res.status(400).json({
//         success: false,
//         error: { code: 'VALIDATION_ERROR', message: 'Missing required fields: bodyPart, therapistId, or appointmentSlot' }
//       })
//     }

//     await client.query('BEGIN')

//     // 1. Create assessment record
//     const assessmentResult = await client.query(
//       `INSERT INTO assessments (patient_id, body_part, triggers, sensation, duration, goals, care_preference)
//        VALUES ($1, $2, $3, $4, $5, $6, $7)
//        RETURNING assessment_id`,
//       [
//         userId,
//         bodyPart,
//         JSON.stringify([aggravatingFactor]),
//         `Pain ${painScale}/10`,
//         painDuration,
//         JSON.stringify([primaryGoal]),
//         'Insurance'
//       ]
//     )

//     // 2. Convert time slot to ISO timestamp
//     const appointmentAt = convertSlotToTimestamp(appointmentSlot)

//     // 3. Get default service ID (initial consultation)
//     const serviceResult = await client.query(
//       `SELECT service_id FROM services WHERE active = true AND name ILIKE '%consultation%' LIMIT 1`
//     )
//     const serviceId = serviceResult.rows[0]?.service_id || 1

//     // 4. Verify therapist exists and is active
//     const therapistCheck = await client.query(
//       `SELECT therapist_id FROM therapists WHERE therapist_id = $1 AND active = true`,
//       [therapistId]
//     )
//     if (!therapistCheck.rows[0]) {
//       await client.query('ROLLBACK')
//       return res.status(404).json({
//         success: false,
//         error: { code: 'THERAPIST_NOT_FOUND', message: 'Selected therapist is not available' }
//       })
//     }

//     // 5. Check for slot conflicts
//     const durationResult = await client.query<{ duration_minutes: number }>(
//       `SELECT duration_minutes FROM services WHERE service_id = $1`,
//       [serviceId]
//     )
//     const durationMinutes = durationResult.rows[0]?.duration_minutes || 45

//     const conflictCheck = await client.query(
//       `SELECT a.appointment_id
//        FROM appointments a
//        JOIN services s ON s.service_id = a.service_id
//        WHERE a.therapist_id = $1
//          AND a.status = 'booked'
//          AND a.appointment_at < $2::timestamptz + ($3::int * INTERVAL '1 minute')
//          AND a.appointment_at + (s.duration_minutes * INTERVAL '1 minute') > $2::timestamptz
//        LIMIT 1`,
//       [therapistId, appointmentAt, durationMinutes]
//     )

//     if (conflictCheck.rows[0]) {
//       await client.query('ROLLBACK')
//       return res.status(409).json({
//         success: false,
//         error: { code: 'SLOT_CONFLICT', message: 'This time slot is no longer available. Please select another.' }
//       })
//     }

//     // 6. Create appointment
//     const appointmentResult = await client.query(
//       `INSERT INTO appointments (patient_id, therapist_id, service_id, appointment_at, patient_note)
//        VALUES ($1, $2, $3, $4, $5)
//        RETURNING appointment_id, appointment_at`,
//       [userId, therapistId, serviceId, appointmentAt, notes || null]
//     )

//     await client.query('COMMIT')

//     res.status(201).json({
//       success: true,
//       data: {
//         assessmentId: assessmentResult.rows[0].assessment_id,
//         appointmentId: appointmentResult.rows[0].appointment_id,
//         appointmentAt: appointmentResult.rows[0].appointment_at
//       }
//     })
//   } catch (error) {
//     await client.query('ROLLBACK')
//     next(error)
//   } finally {
//     client.release()
//   }
// })

// POST /assessments/submit-with-booking
router.post('/submit-with-booking', requireAuth, requireRole('patient', 'admin'), async (req: Request, res, next) => {
  const client = await pool.connect()
  try {
    const {
      bodyPart,
      painDuration,
      painScale,
      aggravatingFactor,
      primaryGoal,
      notes,
      therapistId,
      appointmentSlot
    } = req.body

    // Get patient ID from auth token
    const userId = (req as AuthRequest).user?.userId
    
    // FIX 1: Check if userId exists
    if (!userId) {
      return res.status(401).json({
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'User not authenticated' }
      })
    }

    if (!bodyPart || !therapistId || !appointmentSlot) {
      return res.status(400).json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Missing required fields: bodyPart, therapistId, or appointmentSlot' }
      })
    }

    await client.query('BEGIN')
    
    // FIX 2: Find or create patient record linked to this user
    let patientRecord = await client.query(
      'SELECT patient_id FROM patients WHERE user_id = $1',
      [userId]
    )
    
    let actualPatientId: string
    
    if (patientRecord.rows.length === 0) {
      // Create patient record if doesn't exist
      const userResult = await client.query(
        'SELECT email FROM users WHERE user_id = $1',
        [userId]
      )
      
      if (userResult.rows.length === 0) {
        await client.query('ROLLBACK')
        return res.status(404).json({
          success: false,
          error: { code: 'USER_NOT_FOUND', message: 'User not found in database' }
        })
      }
      
      const userEmail = userResult.rows[0].email
      const newPatient = await client.query(
        `INSERT INTO patients (full_name, email, user_id, phone, active) 
         VALUES ($1, $2, $3, $4, true) 
         RETURNING patient_id`,
        [userEmail.split('@')[0], userEmail, userId, '']
      )
      
      actualPatientId = newPatient.rows[0].patient_id
    } else {
      actualPatientId = patientRecord.rows[0].patient_id
    }

    // FIX 3: Map frontend fields to backend schema correctly
    const assessmentResult = await client.query(
      `INSERT INTO assessments (patient_id, body_part, triggers, sensation, duration, goals, care_preference)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING assessment_id`,
       [
    userId,
    bodyPart,
    [aggravatingFactor], // FIX: JSON.stringify hata do, sirf array pass karo
    `Pain ${painScale}/10`,
    painDuration,
    [primaryGoal],       // FIX: JSON.stringify hata do
    'Insurance'
  ]
    )

    // 2. Convert time slot to ISO timestamp
    const appointmentAt = convertSlotToTimestamp(appointmentSlot)

    // 3. Get default service ID (initial consultation)
    const serviceResult = await client.query(
      `SELECT service_id FROM services WHERE active = true AND name ILIKE '%consultation%' LIMIT 1`
    )
    const serviceId = serviceResult.rows[0]?.service_id || 1

    // 4. Verify therapist exists and is active
    const therapistCheck = await client.query(
      `SELECT therapist_id FROM therapists WHERE therapist_id = $1 AND active = true`,
      [therapistId]
    )
    
    if (!therapistCheck.rows[0]) {
      await client.query('ROLLBACK')
      return res.status(404).json({
        success: false,
        error: { code: 'THERAPIST_NOT_FOUND', message: 'Selected therapist is not available' }
      })
    }

    // 5. Check for slot conflicts
    const durationResult = await client.query<{ duration_minutes: number }>(
      `SELECT duration_minutes FROM services WHERE service_id = $1`,
      [serviceId]
    )
    const durationMinutes = durationResult.rows[0]?.duration_minutes || 45
    
    const conflictCheck = await client.query(
      `SELECT a.appointment_id
       FROM appointments a
       JOIN services s ON s.service_id = a.service_id
       WHERE a.therapist_id = $1
         AND a.status = 'booked'
         AND a.appointment_at < $2::timestamptz + ($3::int * INTERVAL '1 minute')
         AND a.appointment_at + (s.duration_minutes * INTERVAL '1 minute') > $2::timestamptz
       LIMIT 1`,
      [therapistId, appointmentAt, durationMinutes]
    )
    
    if (conflictCheck.rows[0]) {
      await client.query('ROLLBACK')
      return res.status(409).json({
        success: false,
        error: { code: 'SLOT_CONFLICT', message: 'This time slot is no longer available. Please select another.' }
      })
    }

    // 6. Create appointment
    const appointmentResult = await client.query(
      `INSERT INTO appointments (patient_id, therapist_id, service_id, appointment_at, patient_note)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING appointment_id, appointment_at`,
      [actualPatientId, therapistId, serviceId, appointmentAt, notes || null]
    )

    await client.query('COMMIT')

    res.status(201).json({
      success: true,
      data: {
        assessmentId: assessmentResult.rows[0].assessment_id,
        appointmentId: appointmentResult.rows[0].appointment_id,
        appointmentAt: appointmentResult.rows[0].appointment_at
      }
    })
  } catch (error) {
    await client.query('ROLLBACK')
    next(error)
  } finally {
    client.release()
  }
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