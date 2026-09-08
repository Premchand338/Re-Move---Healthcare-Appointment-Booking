export type JointId = 'knee' | 'spine' | 'shoulder' | 'hip' | 'ankle' | 'cervical';

export interface JointData {
  id: JointId;
  name: string;
  anatomicalName: string;
  category: string;
  biomechanics: string;
  coordinates: { x: number; y: number }; // Percentage 0-100 on body map
  commonConcerns: string[];
  clinicalEvidenceFocus: string;
  successRate: string;
  keyIndicators: string[];
  recommendedSpecialistId: string;
}

export interface Specialist {
  id: string;
  name: string;
  title: string;
  degrees: string;
  specialization: string;
  category: 'spine' | 'knee' | 'shoulder' | 'gait' | 'hip';
  experienceYears: number;
  rating: number;
  reviewsCount: number;
  consultationFee: number;
  cashlessCopay: number;
  matchScore: number;
  matchReasons: string[];
  audioIntroSeconds: number;
  audioQuote: string;
  avatarUrl: string;
  focusTags: string[];
  availableSlots: string[];
  education: string[];
  clinicalFocus: string;
  publishedResearch: string[];
  clinicLocation: string;
}

export interface Modality {
  id: string;
  title: string;
  evidenceStrength: 'STRONG' | 'MODERATE' | 'CONTEXT DEPENDENT' | 'HIGH GRADE A';
  subtitle: string;
  description: string;
  mechanisms: string[];
  indications: string[];
  contraindications: string[];
  clinicalCitations: {
    journal: string;
    year: number;
    title: string;
    finding: string;
  }[];
}

export interface TrajectoryPhase {
  step: string;
  timeframe: string;
  phaseName: string;
  clinicalObjective: string;
  interventions: string[];
  clearanceMilestone: string;
  targetMetrics: string;
}

export interface AssessmentState {
  step: number;
  selectedJoint: JointId;
  painDuration: 'acute' | 'subacute' | 'chronic' | 'recurrent';
  painScale: number;
  aggravatingFactor: string;
  primaryGoal: string;
  selectedSpecialistId: string;
  selectedSlot: string;
  patientName: string;
  patientPhone: string;
  insuranceProvider: string;
  notes: string;
}
