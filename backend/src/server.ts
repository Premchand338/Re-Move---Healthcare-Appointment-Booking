import 'dotenv/config'
import cors from 'cors'
import express, { type ErrorRequestHandler } from 'express'
import { rateLimit } from 'express-rate-limit'
import helmet from 'helmet'
import { pool } from './db'
import appointmentRoutes from './routes/appointmentRoutes'
import patientRoutes from './routes/patientRoutes'
import serviceRoutes from './routes/serviceRoutes'
import therapistRoutes from './routes/therapistRoutes'
import authRoutes from './routes/authRoutes'
import assessmentRoutes from './routes/assessmentRoutes'
import inquiryRoutes from './routes/inquiryRoutes'


const app = express()
app.set('trust proxy', 1)
const port = Number(process.env.PORT ?? 4000)
const defaultOrigins = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000'
const allowedOrigins = new Set(
  (process.env.CORS_ALLOWED_ORIGINS ?? defaultOrigins)
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean),
)

if ([...allowedOrigins].some((origin) => origin.includes('*'))) {
  throw new Error('CORS_ALLOWED_ORIGINS must list explicit origins; wildcard origins are not allowed')
}

const loginRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: { code: 'RATE_LIMITED', message: 'Too many login attempts. Please try again in 15 minutes.' } },
})

const inquiryRateLimit = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: { code: 'RATE_LIMITED', message: 'Too many inquiries. Please try again later.' } },
})

const apiRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => req.path === '/health',
  message: { success: false, error: { code: 'RATE_LIMITED', message: 'Too many requests. Please try again later.' } },
})

app.use(helmet())
app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.has(origin)) {
      callback(null, true)
      return
    }
    const error = Object.assign(new Error('Origin not allowed by CORS'), {
      status: 403,
      code: 'CORS_ORIGIN_DENIED',
    })
    callback(error)
  },
}))
app.use(express.json({ limit: '1mb' }))
app.use(apiRateLimit)

app.get('/health', async (_req, res, next) => {
  try {
    await pool.query('SELECT 1')
    res.json({ success: true, data: { status: 'ok' } })
  } catch (error) { next(error) }
})
app.post('/inquiries', inquiryRateLimit)
app.use('/inquiries', inquiryRoutes)
app.use('/assessments', assessmentRoutes)
app.post('/auth/login', loginRateLimit)
app.use('/auth', authRoutes)
app.use('/patients', patientRoutes)
app.use('/therapists', therapistRoutes)
app.use('/services', serviceRoutes)
app.use('/appointments', appointmentRoutes)

const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  if (error.code === 'CORS_ORIGIN_DENIED') {
    res.status(403).json({ success: false, error: { code: 'CORS_ORIGIN_DENIED', message: 'Origin is not allowed' } })
    return
  }
  if (error.code === '23505' && error.constraint === 'appointments_active_therapist_start_unique') {
    res.status(409).json({
      success: false,
      error: { code: 'SLOT_CONFLICT', message: 'This therapist is already booked at that time. Please choose another time.' },
    })
    return
  }
  if (error.code === '23505') {
    res.status(409).json({ success: false, error: { code: 'DUPLICATE_RESOURCE', message: 'A unique value already exists' } })
    return
  }
  if (error.code === '23503') {
    res.status(409).json({ success: false, error: { code: 'RESOURCE_IN_USE', message: 'Patient cannot be deleted because appointments exist' } })
    return
  }
  const status = error.status ?? 500
  const isProduction = process.env.NODE_ENV === 'production'
  const isServerError = status >= 500
  res.status(status).json({
    success: false,
    error: {
      code: isProduction && isServerError ? 'INTERNAL_SERVER_ERROR' : error.code ?? 'INTERNAL_SERVER_ERROR',
      message: isProduction && isServerError ? 'Internal server error' : error.message ?? 'Something went wrong',
      ...(error.fields ? { fields: error.fields } : {}),
      ...(!isProduction && error.stack ? { stack: error.stack } : {}),
    },
  })
}

app.use(errorHandler)

const server = app.listen(port, '0.0.0.0', () => {
  console.log(`API running on port ${port}`)
})

server.on('error', (err: NodeJS.ErrnoException) => {
  console.error('Server failed to start:', err.code, err.message)
  process.exit(1)
})
