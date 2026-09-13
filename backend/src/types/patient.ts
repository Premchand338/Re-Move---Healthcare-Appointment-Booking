export type Patient = {
  id: number
  fullName: string
  phone: string
  email: string | null
  dateOfBirth: string | null
  address: string | null
  emergencyContact: string | null
  active: boolean
  userId: number | null
  createdAt: string
  updatedAt: string
}

export type PatientInput = {
  fullName?: unknown
  phone?: unknown
  email?: unknown
  dateOfBirth?: unknown
  address?: unknown
  emergencyContact?: unknown  
}
