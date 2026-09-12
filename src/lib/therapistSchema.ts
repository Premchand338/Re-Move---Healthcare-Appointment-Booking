import { z } from 'zod'

export const therapistSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),

  title: z.string().min(1, 'Professional title is required'),

  degrees: z.string().optional().nullable(),

  phone: z.string().min(10, 'Valid phone number is required'),

  email: z
    .string()
    .email('Invalid email')
    .optional()
    .nullable()
    .or(z.literal('')),

  specialization: z.string().min(1, 'Specialization is required'),

  category: z.string().min(1, 'Category is required'),

  bio: z.string().optional().nullable(),

  clinicalFocus: z.string().optional().nullable(),

  experienceYears: z
    .number()
    .min(0)
    .optional()
    .nullable(),

  rating: z
    .number()
    .min(0)
    .max(5)
    .optional()
    .nullable(),

  reviewCount: z
    .number()
    .min(0)
    .optional()
    .nullable(),

  pricePerSession: z
    .number()
    .min(0)
    .optional()
    .nullable(),

  matchScore: z
    .number()
    .min(0)
    .max(100)
    .optional()
    .nullable(),

  avatarUrl: z
    .string()
    .url('Must be a valid URL')
    .optional()
    .nullable()
    .or(z.literal('')),

  clinicLocation: z.string().optional().nullable(),

  focusTags: z.string().optional().nullable(),

  availableSlots: z.string().optional().nullable(),
})

export type TherapistFormValues = z.infer<typeof therapistSchema>