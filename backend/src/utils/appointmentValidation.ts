import type { AppointmentInput } from '../types/appointment'

export type ValidatedAppointmentInput = {
  patientId?: string
  therapistId?: string
  serviceId?: string
  appointmentAt?: string
  status?: 'booked' | 'completed' | 'cancelled' | 'no_show'
  patientNote?: string | null
  therapistNote?: string | null
}

function fail(fields: Record<string, string>): never {
  const error = new Error('Validation failed') as Error & { status: number; code: string; fields: Record<string, string> }
  error.status = 400
  error.code = 'VALIDATION_ERROR'
  error.fields = fields
  throw error
}

export function validateAppointmentInput(input: AppointmentInput, isCreate: boolean): ValidatedAppointmentInput {
  const result: ValidatedAppointmentInput = {}
  const errors: Record<string, string> = {}
  const idFields = ['patientId', 'therapistId', 'serviceId'] as const

  for (const field of idFields) {
    const value = input[field]
    if (isCreate && value === undefined) errors[field] = 'Required'
    if (value !== undefined) {
      if (!isCreate) errors[field] = 'Cannot be changed after booking'
      else if (typeof value !== 'string' || value.trim() === '') errors[field] = 'Must be a non-empty string'
      else result[field] = value.trim()
    }
  }

  if (isCreate && input.appointmentAt === undefined) errors.appointmentAt = 'Required'
  if (input.appointmentAt !== undefined) {
    if (typeof input.appointmentAt !== 'string' || Number.isNaN(Date.parse(input.appointmentAt))) errors.appointmentAt = 'Must be a valid ISO date-time'
    else if (new Date(input.appointmentAt).getTime() <= Date.now()) errors.appointmentAt = 'Must be in the future'
    else result.appointmentAt = input.appointmentAt
  }

  if (input.status !== undefined) {
    const allowed = ['booked', 'completed', 'cancelled', 'no_show'] as const
    if (typeof input.status !== 'string' || !allowed.includes(input.status as typeof allowed[number])) errors.status = 'Invalid status'
    else result.status = input.status as typeof allowed[number]
  }

  for (const field of ['patientNote', 'therapistNote'] as const) {
    const value = input[field]
    if (value !== undefined) {
      if (value === null || value === '') result[field] = null
      else if (typeof value !== 'string') errors[field] = 'Must be text'
      else result[field] = value.trim()
    }
  }

  if (Object.keys(errors).length) fail(errors)
  if (!isCreate && Object.keys(result).length === 0) fail({ body: 'Send at least one field to update' })
  return result
}
