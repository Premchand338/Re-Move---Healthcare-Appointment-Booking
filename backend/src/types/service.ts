export type Service = {
  id: number
  name: string
  description: string | null
  durationMinutes: number
  price: string
  active: boolean
  createdAt: string
  updatedAt: string
}

export type ServiceInput = {
  name?: unknown
  description?: unknown
  durationMinutes?: unknown
  price?: unknown
  active?: unknown
}
