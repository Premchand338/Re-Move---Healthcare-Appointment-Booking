import type { PatientInput } from '../types/patient'

export type ValidatedPatientInput = {
  fullName?: string
  phone?: string
  email?: string | null
  dateOfBirth?: string | null
  address?: string | null
  emergencyContact?: string | null
}

const optionalTextFields = ['email', 'dateOfBirth', 'address', 'emergencyContact'] as const

export function validatePatientInput(input: PatientInput, isCreate: boolean): ValidatedPatientInput {
  const errors: Record<string, string> = {}
  const result: ValidatedPatientInput = {}

  if (isCreate && !input.fullName) errors.fullName = 'Required'
  if (isCreate && !input.phone) errors.phone = 'Required'

  if (input.fullName !== undefined) {
    if (typeof input.fullName !== 'string' || !input.fullName.trim()) errors.fullName = 'Must be a non-empty string'
    else result.fullName = input.fullName.trim()
  }

  if (input.phone !== undefined) {
    if (typeof input.phone !== 'string' || !/^\+?[0-9 -]{7,20}$/.test(input.phone.trim())) errors.phone = 'Invalid phone number'
    else result.phone = input.phone.trim()
  }

  if (input.email !== undefined) {
    if (input.email === null || input.email === '') result.email = null
    else if (typeof input.email !== 'string' || !/^\S+@\S+\.\S+$/.test(input.email)) errors.email = 'Invalid email address'
    else result.email = input.email.trim().toLowerCase()
  }

  if (input.dateOfBirth !== undefined) {
    if (input.dateOfBirth === null || input.dateOfBirth === '') result.dateOfBirth = null
    else if (typeof input.dateOfBirth !== 'string' || Number.isNaN(Date.parse(input.dateOfBirth))) errors.dateOfBirth = 'Invalid date'
    else result.dateOfBirth = input.dateOfBirth
  }


  for (const field of optionalTextFields.slice(2)) {
    const value = input[field]
    if (value !== undefined) {
      if (value === null || value === '') result[field] = null
      else if (typeof value !== 'string') errors[field] = 'Must be text'
      else result[field] = value.trim()
    }
  }

  if (Object.keys(errors).length) {
    const error = new Error('Validation failed') as Error & { status: number; code: string; fields: Record<string, string> }
    error.status = 400
    error.code = 'VALIDATION_ERROR'
    error.fields = errors
    throw error
  }

  if (!isCreate && Object.keys(result).length === 0) {
    const error = new Error('Send at least one field to update') as Error & { status: number; code: string }
    error.status = 400
    error.code = 'VALIDATION_ERROR'
    throw error
  }

  return result
}
