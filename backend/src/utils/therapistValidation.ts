import { z } from 'zod'

export const therapistSchema = z.object({
  fullName: z.string().min(1, 'Name is required'),
  title: z.string().optional(),
  degrees: z.string().optional(),
  phone: z.string().min(10, 'Valid phone number required'),
  email: z.string().email('Invalid email').optional().or(z.literal('')).nullable(),
  specialization: z.string().optional(),
  category: z.string().optional(),
  bio: z.string().optional(),
  clinicalFocus: z.string().optional(),
  experienceYears: z.number().optional(),
  rating: z.number().optional(),
  reviewCount: z.number().optional(),
  pricePerSession: z.number().optional(),
  matchScore: z.number().optional(),
  matchReasons: z.array(z.string()).optional(),
  avatarUrl: z.string().url().optional().or(z.literal('')).nullable(),
  focusTags: z.array(z.string()).optional(),
  availableSlots: z.array(z.string()).optional(),
  clinicLocation: z.string().optional(),
  active: z.boolean().optional(),
})

export function validateTherapistInput(data: unknown, isCreate: boolean) {
  const schema = isCreate ? therapistSchema.required({ fullName: true, phone: true }) : therapistSchema.partial()
  return schema.parse(data)
}