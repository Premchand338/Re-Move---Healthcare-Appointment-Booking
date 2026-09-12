import { api } from '../lib/api';

export interface Therapist {
  id: number;
  fullName: string;
  phone: string;
  email: string | null;
  specialization: string;
  bio: string | null;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export const therapistService = {
  // GET /api/therapists
  getAll: () => api.get<Therapist[]>('/therapists'),
  
  // GET /api/therapists/:id
  getById: (id: number) => api.get<Therapist>(`/therapists/${id}`),
};