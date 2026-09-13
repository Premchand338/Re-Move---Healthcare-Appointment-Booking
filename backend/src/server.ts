import 'dotenv/config'
import cors from 'cors'
import express, { type ErrorRequestHandler } from 'express'
import { pool } from './db'
import appointmentRoutes from './routes/appointmentRoutes'
import patientRoutes from './routes/patientRoutes'
import serviceRoutes from './routes/serviceRoutes'
import therapistRoutes from './routes/therapistRoutes'
import authRoutes from './routes/authRoutes'
import assessmentRoutes from './routes/assessmentRoutes'
import inquiryRoutes from './routes/inquiryRoutes'


const app = express()
const port = Number(process.env.PORT ?? 4000)

app.use(cors())
app.use(express.json())

app.get('/api/health', async (_req, res, next) => {
  try {
    await pool.query('SELECT 1')
    res.json({ success: true, data: { status: 'ok' } })
  } catch (error) { next(error) }
})
app.use('/api/inquiries', inquiryRoutes)
app.use('/api/assessments', assessmentRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/patients', patientRoutes)
app.use('/api/therapists', therapistRoutes)
app.use('/api/services', serviceRoutes)
app.use('/api/appointments', appointmentRoutes)

const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  if (error.code === '23505') {
    res.status(409).json({ success: false, error: { code: 'DUPLICATE_RESOURCE', message: 'A unique value already exists' } })
    return
  }
  if (error.code === '23503') {
    res.status(409).json({ success: false, error: { code: 'RESOURCE_IN_USE', message: 'Patient cannot be deleted because appointments exist' } })
    return
  }
  const status = error.status ?? 500
  res.status(status).json({
    success: false,
    error: { code: error.code ?? 'INTERNAL_SERVER_ERROR', message: error.message ?? 'Something went wrong', ...(error.fields ? { fields: error.fields } : {}) },
  })
}

app.use(errorHandler)

app.listen(port, () => console.log(`API running at http://localhost:${port}`))
