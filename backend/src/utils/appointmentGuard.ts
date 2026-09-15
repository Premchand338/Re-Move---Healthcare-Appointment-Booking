import { pool } from '../db'

export async function assertNoActiveAppointments(
  column: 'patient_id' | 'therapist_id' | 'service_id',
  id: number,
) {
  const { rows } = await pool.query(
    `SELECT 1 FROM appointments WHERE ${column} = $1 AND status = 'booked' LIMIT 1`,
    [id],
  )
  if (rows[0]) {
    const error = new Error('Ye specialist deactivate nahi ho sakta — pehle unki active appointments cancel ya complete karein.') as Error & { status: number; code: string }
    error.status = 409
    error.code = 'RESOURCE_IN_USE'
    throw error
  }
}