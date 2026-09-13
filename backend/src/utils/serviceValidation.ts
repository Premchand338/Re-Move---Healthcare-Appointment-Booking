import type { ServiceInput } from '../types/service'

export type ValidatedServiceInput = {
  name?: string
  description?: string | null
  durationMinutes?: number
  price?: number
  active?: boolean
}

function validationError(fields: Record<string, string>): never {
  const error = new Error('Validation failed') as Error & { status: number; code: string; fields: Record<string, string> }
  error.status = 400
  error.code = 'VALIDATION_ERROR'
  error.fields = fields
  throw error
}

export function validateServiceInput(input: ServiceInput, isCreate: boolean): ValidatedServiceInput {
  const result: ValidatedServiceInput = {}
  const errors: Record<string, string> = {}
  if (isCreate && input.name === undefined) errors.name = 'Required'
  if (isCreate && input.durationMinutes === undefined) errors.durationMinutes = 'Required'
  if (isCreate && input.price === undefined) errors.price = 'Required'

  if (input.name !== undefined) {
    if (typeof input.name !== 'string' || !input.name.trim()) errors.name = 'Must be a non-empty string'
    else result.name = input.name.trim()
  }
  if (input.description !== undefined) {
    if (input.description === null || input.description === '') result.description = null
    else if (typeof input.description !== 'string') errors.description = 'Must be text'
    else result.description = input.description.trim()
  }
  if (input.durationMinutes !== undefined) {
    if (typeof input.durationMinutes !== 'number' || !Number.isInteger(input.durationMinutes) || input.durationMinutes <= 0) errors.durationMinutes = 'Must be a positive integer'
    else result.durationMinutes = input.durationMinutes
  }
  if (input.price !== undefined) {
    if (typeof input.price !== 'number' || !Number.isFinite(input.price) || input.price < 0) errors.price = 'Must be a non-negative number'
    else result.price = input.price
  }
  if (input.active !== undefined) {
    if (typeof input.active !== 'boolean') errors.active = 'Must be true or false'
    else result.active = input.active
  }

  if (Object.keys(errors).length) validationError(errors)
  if (!isCreate && Object.keys(result).length === 0) validationError({ body: 'Send at least one field to update' })
  return result
}
