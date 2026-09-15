// export type Therapist = {
//   id: number;
//   fullName: string;
//   phone: string;
//   email: string | null;
//   specialization: string;
//   bio: string | null;
//   active: boolean;
//   // Added from your initDatabase.ts ALTER TABLE statements
//   rating: number | null;
//   reviewCount: number | null;
//   pricePerSession: number | null;
//   treatsBodyParts: string[] | null; 
//   createdAt: string;
//   updatedAt: string;
// }

// frontend/src/types/therapist.ts

// export type Therapist = {
//   id: number; // Backend BIGSERIAL ke hisaab se number rakha hai
//   fullName: string;
//   title: string; // e.g., "Orthopedic & Sports Physiotherapy"
//   degrees: string; // e.g., "DPT, OCS, CSCS"
//   phone: string;
//   email: string | null;
//   specialization: string;
//   category: string; // e.g., 'knee', 'spine', 'shoulder'
//   bio: string | null;
//   clinicalFocus: string;
  
//   // Stats & Matching
//   experienceYears: number;
//   rating: number | null;
//   reviewCount: number | null;
//   pricePerSession: number | null; // consultationFee ke jagah ye use karenge DB consistency ke liye
//   matchScore: number | null;
//   matchReasons: string[];
  
//   // UI & Availability
//   avatarUrl: string | null;
//   focusTags: string[];
//   availableSlots: string[];
//   clinicLocation: string;
  
//   // System
//   active: boolean;
//   createdAt: string;
//   updatedAt: string;
// };



export type Therapist = {
  id: string | number; // Accept both for flexibility
  fullName: string;
  title: string | null;
  degrees: string | null;
  phone: string;
  email: string | null;
  specialization: string;
  category: string | null;
  bio: string | null;
  clinicalFocus: string | null;
  experienceYears: number | null;
  rating: number | string | null; // Accept both
  reviewCount: number | null;
  pricePerSession: number | string | null; // Accept both
  matchScore: number | string | null; // Accept both
  matchReasons: string[];
  avatarUrl: string | null;
  focusTags: string[];
  availableSlots: string[];
  clinicLocation: string | null;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export type TherapistInput = Partial<Omit<Therapist, 'id' | 'createdAt' | 'updatedAt' | 'active'>> & {
  fullName: string;
  phone: string;
};