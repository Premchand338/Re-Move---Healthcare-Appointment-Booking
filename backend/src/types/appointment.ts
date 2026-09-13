export type Appointment = {
  id: number
  patientId: string
  therapistId: string
  serviceId: string
  appointmentAt: string
  status: 'booked' | 'completed' | 'cancelled' | 'no_show'
  patientNote: string | null
  therapistNote: string | null
  cancelledAt: string | null
  createdAt: string
  updatedAt: string
}

export type AppointmentInput = {
  patientId?: unknown
  therapistId?: unknown
  serviceId?: unknown
  appointmentAt?: unknown
  status?: unknown
  patientNote?: unknown
  therapistNote?: unknown
}
