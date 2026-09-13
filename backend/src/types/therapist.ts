// export type Therapist = {
//   id: number
//   fullName: string
//   phone: string
//   email: string | null
//   specialization: string
//   bio: string | null
//   active: boolean
//   createdAt: string
//   updatedAt: string
// }

// export type TherapistInput = {
//   fullName?: unknown
//   phone?: unknown
//   email?: unknown
//   specialization?: unknown
//   bio?: unknown
//   active?: unknown
// }
// backend/src/types/therapist.ts

export type Therapist = {
  id: number
  fullName: string
  title: string | null
  degrees: string | null
  phone: string
  email: string | null
  specialization: string
  category: string | null
  bio: string | null
  clinicalFocus: string | null
  experienceYears: number | null
  rating: number | null
  reviewCount: number | null
  pricePerSession: number | null
  matchScore: number | null
  matchReasons: string[]
  avatarUrl: string | null
  focusTags: string[]
  availableSlots: string[]
  clinicLocation: string | null
  active: boolean
  createdAt: string
  updatedAt: string
}

export type TherapistInput = {
  fullName: string
  title?: string
  degrees?: string
  phone: string
  email?: string | null
  specialization?: string
  category?: string
  bio?: string
  clinicalFocus?: string
  experienceYears?: number
  rating?: number
  reviewCount?: number
  pricePerSession?: number
  matchScore?: number
  matchReasons?: string[]
  avatarUrl?: string | null
  focusTags?: string[]
  availableSlots?: string[]
  clinicLocation?: string
  active?: boolean
}