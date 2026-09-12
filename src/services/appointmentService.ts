import { api } from '../lib/api';

export interface Appointment {
  id: number;
  patientId: string;
  therapistId: string;
  serviceId: string;
  appointmentAt: string; // ISO date string
  status: 'booked' | 'completed' | 'cancelled' | 'no_show';
  patientNote: string | null;
  therapistNote: string | null;
  cancelledAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAppointmentInput {
  patientId: string;
  therapistId: string;
  serviceId: string;
  appointmentAt: string; 
  patientNote?: string;
}

export const appointmentService = {
  // GET /api/appointments?therapistId=X&status=Y
  getAll: (filters?: { patientId?: string; therapistId?: string; status?: string }) => {
    const queryString = filters ? '?' + new URLSearchParams(filters as Record<string, string>).toString() : '';
    return api.get<Appointment[]>(`/appointments${queryString}`);
  },

  // POST /api/appointments
  create: (data: CreateAppointmentInput) => api.post<Appointment>('/appointments', data),

  // PATCH /api/appointments/:id
  update: (id: number, data: Partial<CreateAppointmentInput> & { status?: string }) => 
    api.patch<Appointment>(`/appointments/${id}`, data),
};