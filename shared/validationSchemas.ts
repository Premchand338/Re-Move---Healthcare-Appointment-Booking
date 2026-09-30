import { z } from 'zod'

const requiredText = (message: string, max = 255) => z.string().trim().min(1, message).max(max)
const optionalText = z.union([z.string().trim(), z.null()]).optional().transform((value) => value === '' ? null : value)
const optionalEmail = z.union([
  z.string().trim().email('Invalid email').transform((value) => value.toLowerCase()),
  z.literal('').transform(() => null),
  z.null(),
]).optional()

const phoneSchema = z.string().trim().regex(/^\+?[0-9 -]{7,20}$/, 'Invalid phone number')
const therapistPhoneSchema = z.string().trim().regex(/^\+?[0-9 -]{10,20}$/, 'Valid phone number required')

export const therapistSchema = z.object({
  fullName: requiredText('Name is required', 120),
  title: requiredText('Professional title is required', 120),
  degrees: optionalText,
  phone: therapistPhoneSchema,
  email: optionalEmail,
  specialization: requiredText('Specialization is required', 120),
  category: requiredText('Category is required', 50),
  bio: optionalText,
  clinicalFocus: optionalText,
  experienceYears: z.number().int().min(0).nullable().optional(),
  rating: z.number().min(0).max(5).nullable().optional(),
  reviewCount: z.number().int().min(0).nullable().optional(),
  pricePerSession: z.number().min(0).nullable().optional(),
  matchScore: z.number().min(0).max(100).nullable().optional(),
  matchReasons: z.array(z.string().trim()).optional(),
  avatarUrl: z.union([
    z.string().trim().url('Must be a valid URL'),
    z.literal('').transform(() => null),
    z.null(),
  ]).optional(),
  focusTags: z.array(z.string().trim()).optional(),
  availableSlots: z.array(z.string().trim()).optional(),
  clinicLocation: optionalText,
  active: z.boolean().optional(),
})

export const therapistCreateSchema = therapistSchema
export const therapistUpdateSchema = therapistSchema.partial().refine(
  (value) => Object.keys(value).length > 0,
  'Send at least one field to update',
)

export const therapistFormSchema = therapistSchema.extend({
  focusTags: z.string().optional(),
  availableSlots: z.string().optional(),
})

const patientSchema = z.object({
  fullName: requiredText('Must be a non-empty string', 120),
  phone: phoneSchema,
  email: optionalEmail,
  dateOfBirth: z.union([
    z.string().trim().refine((value) => !Number.isNaN(Date.parse(value)), 'Invalid date'),
    z.literal('').transform(() => null),
    z.null(),
  ]).optional(),
  address: optionalText,
  emergencyContact: optionalText,
})

export const patientCreateSchema = patientSchema.extend({
  fullName: requiredText('Required', 120),
  phone: phoneSchema,
})
export const patientUpdateSchema = patientSchema.partial().refine(
  (value) => Object.keys(value).length > 0,
  'Send at least one field to update',
)

const serviceSchema = z.object({
  name: requiredText('Must be a non-empty string', 120),
  description: optionalText,
  durationMinutes: z.number().int().positive('Must be a positive integer'),
  price: z.number().finite().nonnegative('Must be a non-negative number'),
  mode: z.enum(['clinic', 'home', 'tele']).optional(),
  active: z.boolean().optional(),
})

export const serviceCreateSchema = serviceSchema
export const serviceUpdateSchema = serviceSchema.partial().refine(
  (value) => Object.keys(value).length > 0,
  'Send at least one field to update',
)

const appointmentDateTime = z.string().trim()
  .refine((value) => !Number.isNaN(Date.parse(value)), 'Must be a valid ISO date-time')
  .refine((value) => Date.parse(value) > Date.now(), 'Must be in the future')

const appointmentStatus = z.enum(['booked', 'completed', 'cancelled', 'no_show'])

export const appointmentCreateSchema = z.object({
  patientId: requiredText('Must be a non-empty string', 32),
  therapistId: requiredText('Must be a non-empty string', 32),
  serviceId: requiredText('Must be a non-empty string', 32),
  appointmentAt: appointmentDateTime,
  patientNote: optionalText,
})

export const appointmentUpdateSchema = z.object({
  appointmentAt: appointmentDateTime.optional(),
  status: appointmentStatus.optional(),
  patientNote: optionalText,
  therapistNote: optionalText,
}).refine(
  (value) => Object.keys(value).length > 0,
  'Send at least one field to update',
)

export const inquirySchema = z.object({
  fullName: requiredText('Name is required', 120),
  phone: phoneSchema,
  notes: optionalText,
})

export const loginSchema = z.object({
  email: z.string().trim().email('Invalid email'),
  password: z.string().min(1, 'Password is required'),
})

export const registerSchema = loginSchema.extend({
  role: z.enum(['admin', 'therapist', 'patient']),
})

export const assessmentCreateSchema = z.object({
  patientId: z.union([z.number().int().positive(), z.string().trim().regex(/^[1-9]\d*$/)]),
  bodyPart: requiredText('Required', 50),
  triggers: z.array(requiredText('Required', 255)),
  sensation: requiredText('Required', 50),
  duration: requiredText('Required', 50),
  goals: z.array(requiredText('Required', 255)),
  carePreference: requiredText('Required', 50),
})

export const assessmentBookingSchema = z.object({
  bodyPart: requiredText('Required', 50),
  painDuration: requiredText('Required', 50),
  painScale: z.number().int().min(0).max(10),
  aggravatingFactor: requiredText('Required', 255),
  primaryGoal: requiredText('Required', 255),
  notes: optionalText,
  therapistId: z.coerce.number().int().positive(),
  appointmentSlot: requiredText('Required', 64),
})

export type TherapistFormValues = z.infer<typeof therapistFormSchema>