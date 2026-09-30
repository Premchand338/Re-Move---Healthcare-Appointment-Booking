import type { RequestHandler } from 'express'
import type { ZodType } from 'zod'

export function validate(schema: ZodType): RequestHandler {
  return (req, _res, next) => {
    const result = schema.safeParse(req.body)
    if (!result.success) {
      const fields: Record<string, string> = {}
      for (const issue of result.error.issues) {
        const field = issue.path.length ? issue.path.join('.') : 'body'
        fields[field] ??= issue.message
      }
      const error = Object.assign(new Error('Validation failed'), {
        status: 400,
        code: 'VALIDATION_ERROR',
        fields,
      })
      next(error)
      return
    }

    req.body = result.data
    next()
  }
}