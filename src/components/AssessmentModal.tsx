import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, type Variants } from 'motion/react';
import { JointId, AssessmentState } from '../types';
import { CLINICAL_JOINTS, SPECIALISTS_DATA } from '../data/clinicalData';
import { X, Check, ArrowRight, ArrowLeft, Shield, Calendar, Clock, Sparkles } from 'lucide-react';
import type { Therapist } from '../types/therapist';
import { api } from '../lib/api';

interface AssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialJoint: JointId;
  preselectedSpecialist: Therapist | null;
  preselectedSlot?: string;
}

interface SubmitResponse {
  assessmentId: number;
  appointmentId: number;
  appointmentAt: string;
}

export const AssessmentModal: React.FC<AssessmentModalProps> = ({
  isOpen,
  onClose,
  initialJoint = 'knee',
  preselectedSpecialist = null,
  preselectedSlot = '6:30 PM'
}) => {
  const [assessment, setAssessment] = useState<AssessmentState>({
    step: 1,
    selectedJoint: initialJoint,
    painDuration: 'subacute',
    painScale: 5,
    aggravatingFactor: 'Downhill walking / descending stairs',
    primaryGoal: 'Return to running / painless physical activity',
    selectedSpecialistId: preselectedSpecialist?.id ?? '',
    selectedSlot: preselectedSlot,
    patientName: '',
    patientPhone: '',
    insuranceProvider: 'HDFC ERGO / Star Health (Cashless)',
    notes: ''
  });

  const [direction, setDirection] = useState<number>(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [therapists, setTherapists] = useState<Therapist[]>([]);
  const [loadingTherapists, setLoadingTherapists] = useState(false);
  const [appointmentRef, setAppointmentRef] = useState<string | null>(null);

  // Load therapists from backend when modal opens or step 4 is reached
  useEffect(() => {
    if (isOpen && assessment.step === 4) {
      loadTherapists();
    }
  }, [isOpen, assessment.step]);

const loadTherapists = async () => {
  setLoadingTherapists(true);
  try {
    const data = await api.get<Therapist[]>('/therapists');
    const normalizedData = data.map(t => ({
      ...t,
      id: String(t.id),
      rating: t.rating?.toString() || '0',
      pricePerSession: t.pricePerSession?.toString() || '0',
      matchScore: t.matchScore?.toString() || '0',
    })) as Therapist[];

    setTherapists(normalizedData);

    // FIX: agar selectedSpecialistId list me nahi hai (fake-default tha), pehla-real-therapist select karo
    const isValidSelection = normalizedData.some(t => t.id === assessment.selectedSpecialistId);
    if (!isValidSelection && normalizedData.length > 0) {
      setAssessment(prev => ({ ...prev, selectedSpecialistId: normalizedData[0].id }));
    }

    if (preselectedSpecialist && !normalizedData.find(t => t.id === preselectedSpecialist.id)) {
      setTherapists(prev => [
        ...prev,
        { ...preselectedSpecialist, id: String(preselectedSpecialist.id) } as Therapist
      ]);
    }
  } catch (err) {
    console.error('Failed to load therapists:', err);
    setError('Failed to load available therapists');
  } finally {
    setLoadingTherapists(false);
  }
};

  if (!isOpen) return null;

  const currentSpecialist = therapists.length > 0
  ? therapists.find(t => String(t.id) === String(assessment.selectedSpecialistId)) ||
    (preselectedSpecialist ? { ...preselectedSpecialist } as unknown as Therapist : null) ||
    therapists[0]
  : SPECIALISTS_DATA.find((s) => s.id === assessment.selectedSpecialistId) || SPECIALISTS_DATA[0];

const specialistName =
  'fullName' in currentSpecialist
    ? currentSpecialist.fullName
    : currentSpecialist.name;

    const specialistPrice =
  'pricePerSession' in currentSpecialist
    ? currentSpecialist.pricePerSession
    : currentSpecialist.consultationFee;

const activeJointData = CLINICAL_JOINTS[assessment.selectedJoint] || CLINICAL_JOINTS.knee;
const stepLabels = ['Body area', 'Pain profile', 'Recovery goal', 'Specialist & time'];

 // In handleSubmit function (around line 130)
const handleSubmit = async () => {
  setSubmitting(true);
  setError(null);
  
  try {
    // FIX: Ensure therapistId is converted to number for backend
    const therapistIdNum = assessment.selectedSpecialistId 
      ? Number(assessment.selectedSpecialistId) 
      : null;

    if (!therapistIdNum) {
      throw new Error('No therapist selected');
    }

    const response = await api.post<SubmitResponse>('/assessments/submit-with-booking', {
      bodyPart: assessment.selectedJoint,
      painDuration: assessment.painDuration,
      painScale: assessment.painScale,
      aggravatingFactor: assessment.aggravatingFactor,
      primaryGoal: assessment.primaryGoal,
      notes: assessment.notes,
      therapistId: therapistIdNum,
      appointmentSlot: assessment.selectedSlot
    });

    console.log('Booking payload:', {
      bodyPart: assessment.selectedJoint,
      therapistId: therapistIdNum,
      appointmentSlot: assessment.selectedSlot,
    });

    setAppointmentRef(`#KT-${new Date().getFullYear()}-${response.appointmentId}`);
    setIsSubmitted(true);
  } catch (err) {
    console.error('Booking failed:', err);
    setError(err instanceof Error ? err.message : 'Booking failed. Please try again.');
  } finally {
    setSubmitting(false);
  }
};

  const handleNext = () => {
    setDirection(1);
    if (assessment.step < 4) {
      setAssessment((prev) => ({ ...prev, step: prev.step + 1 }));
    } else {
      // On final step, submit to backend
      handleSubmit();
    }
  };

  const handleBack = () => {
    setDirection(-1);
    if (assessment.step > 1) {
      setAssessment((prev) => ({ ...prev, step: prev.step - 1 }));
    }
  };

  const resetAndClose = () => {
    setIsSubmitted(false);
    setAppointmentRef(null);
    setError(null);
    onClose();
  };

  // Snappy 160-180ms wizard step animation curves
  const stepVariants: Variants = {
    enter: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? 20 : -20
    }),
    center: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.18,
        ease: 'easeOut'
      }
    },
    exit: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? -20 : 20,
      transition: {
        duration: 0.15,
        ease: 'easeIn'
      }
    })
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1F1F1F]/65 p-3 backdrop-blur-sm transition-opacity duration-150 sm:p-5">
      <div className="relative flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-[#E3DED3] bg-[#F7F4EE] shadow-2xl">

        {/* Modal Top Header */}
        <div className="flex items-center justify-between border-b border-white/10 bg-[#1F1F1F] px-5 py-4 text-[#F7F4EE] sm:px-7">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#8C3B2F] text-white">
              <Sparkles size={17} />
            </span>
            <div className="min-w-0">
              <div className="font-clinical-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#F7F4EE]/65">Kinetic Care</div>
              <div className="truncate font-editorial-serif text-lg font-semibold text-white sm:text-xl">Assessment &amp; booking</div>
            </div>
          </div>

          <button
            onClick={resetAndClose}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:bg-white/10 hover:text-white cursor-pointer"
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>
        </div>

        {/* Multi-Step Progress Indicator with Tighter Transition */}
        {!isSubmitted && (
          <div className="border-b border-[#E3DED3] bg-white px-5 py-4 sm:px-7">
            <div className="mb-3 flex items-center justify-between font-clinical-mono text-[10px] uppercase tracking-wide text-[#5A5750]">
              <span>Care pathway</span>
              <span className="font-bold text-[#8C3B2F]">Step {assessment.step} of 4</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {stepLabels.map((label, index) => {
                const step = index + 1;
                const isComplete = assessment.step > step;
                const isCurrent = assessment.step === step;
                return (
                  <div key={label} aria-current={isCurrent ? 'step' : undefined} className="flex min-w-0 flex-col items-center gap-1.5 text-center">
                    <span className={`flex h-7 w-7 items-center justify-center rounded-full border font-clinical-mono text-[10px] font-bold transition-colors ${
                      isComplete
                        ? 'border-[#1F4E45] bg-[#1F4E45] text-white'
                        : isCurrent
                          ? 'border-[#8C3B2F] bg-[#8C3B2F] text-white'
                          : 'border-[#E3DED3] bg-[#F7F4EE] text-[#5A5750]'
                    }`}>
                      {isComplete ? <Check size={13} /> : `0${step}`}
                    </span>
                    <span className={`max-w-full truncate font-clinical-mono text-[8px] uppercase tracking-wide sm:text-[10px] ${isCurrent ? 'font-bold text-[#8C3B2F]' : 'text-[#5A5750]'}`}>
                      {label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Modal Body Content with Snappy Step Transition */}
        <div className="flex-1 overflow-y-auto p-5 font-editorial-sans text-[#1F1F1F] sm:p-7">
          {isSubmitted ? (
            /* Confirmation Screen */
            <div className="py-6 text-center animate-fadeIn">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#1F4E45]/20 bg-[#1F4E45]/10 text-[#1F4E45] shadow-xs">
                <Check size={32} />
              </div>

              <div className="mb-3 inline-block rounded-full border border-[#1F4E45]/20 bg-[#1F4E45]/8 px-3.5 py-1 font-clinical-mono text-xs font-extrabold text-[#1F4E45]">
                APPOINTMENT CONFIRMED · REF: {appointmentRef || '#KT-PENDING'}
              </div>

              <h3 className="mb-2 font-editorial-serif text-3xl font-bold text-[#1F1F1F]">
                Your appointment is confirmed!
              </h3>

              <p className="mx-auto mb-6 max-w-md text-sm leading-relaxed text-[#5A5750]">
                You are confirmed with <strong className="text-[#1F1F1F]">{specialistName}</strong> for {assessment.selectedSlot} tomorrow. A calendar invite and SMS confirmation have been dispatched.
              </p>

              <div className="mx-auto mb-6 max-w-md space-y-2.5 rounded-2xl border border-[#E3DED3] bg-white p-5 text-left font-clinical-mono text-xs shadow-sm">
                <div className="flex justify-between border-b border-[#E3DED3] pb-2">
                  <span className="text-[#5A5750]">Target Region:</span>
                  <span className="font-bold text-[#1F1F1F]">{activeJointData.name}</span>
                </div>
                <div className="flex justify-between border-b border-[#E3DED3] pb-2">
                  <span className="text-[#5A5750]">Treating Clinician:</span>
                  <span className="font-bold text-[#1F1F1F]">{specialistName} ({currentSpecialist.degrees})</span>
                </div>
                <div className="flex justify-between border-b border-[#E3DED3] pb-2">
                  <span className="text-[#5A5750]">Appointment Time:</span>
                  <span className="font-bold text-[#1F1F1F]">Tomorrow · {assessment.selectedSlot}</span>
                </div>
                {/* Removed - no backend support yet, see backend simplification plan */}
                {/* <div className="flex justify-between">
                  <span className="text-neutral-500">Estimated Co-pay:</span>
                  <span className="font-black text-emerald-700 text-sm">₹{currentSpecialist.cashlessCopay} (Instant Cashless TPA)</span>
                </div> */}
              </div>

              <button
                onClick={resetAndClose}
                className="ui-btn ui-btn-primary"
              >
                Back to Kinetic Health
              </button>
            </div>
          ) : (
            <AnimatePresence custom={direction}>
              <motion.div
                key={assessment.step}
                custom={direction}
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                {/* STEP 1: Anatomical Joint Selector */}
                {assessment.step === 1 && (
                  <div>
                    <h4 className="mb-1 font-editorial-serif text-2xl font-bold text-[#1F1F1F]">
                      Where is movement restricted or painful?
                    </h4>
                    <p className="mb-5 font-editorial-sans text-xs text-[#5A5750]">
                      Select the primary anatomical joint experiencing loading sensitivity.
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {(Object.keys(CLINICAL_JOINTS) as JointId[]).map((key) => {
                        const joint = CLINICAL_JOINTS[key];
                        const isSelected = assessment.selectedJoint === key;
                        return (
                          <button
                            key={key}
                            onClick={() => setAssessment({ ...assessment, selectedJoint: key })}
                            className={`p-3.5 text-left rounded-2xl border transition-all duration-150 cursor-pointer ${
                              isSelected
                                ? 'bg-[#1F1F1F] text-[#F7F4EE] border-[#8C3B2F] real-shadow-xs font-bold scale-[1.02]'
                                : 'bg-[#F7F4EE] text-[#5A5750] border-[#E3DED3] hover:bg-white hover:border-[#1F1F1F] hover:-translate-y-0.5 hover:real-shadow-2xs active:scale-[0.98]'
                            }`}
                          >
                            <div className={`text-[10px] font-clinical-mono uppercase tracking-wider mb-1 ${
                              isSelected ? 'text-white/75 font-extrabold' : 'text-[#5A5750]'
                            }`}>
                              {joint.category}
                            </div>
                            <div className="text-sm font-bold truncate">{joint.name}</div>
                            <div className={`text-[11px] truncate mt-1 ${
                              isSelected ? 'text-white font-semibold' : 'text-[#5A5750]'
                            }`}>
                              {joint.anatomicalName}
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    <div className="mt-6 flex items-start gap-2.5 rounded-2xl border border-[#8C3B2F]/20 bg-[#F4E8E4] p-4 text-xs text-[#5A5750]">
                      <Sparkles size={16} className="mt-0.5 shrink-0 text-[#8C3B2F]" />
                      <div>
                        <strong className="font-bold text-[#1F1F1F]">Clinical Triage Rationale:</strong> Selecting {activeJointData.name} pairs you directly with board-certified physical therapists specializing in this movement kinetic chain.
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 2: Chronicity & Pain Scale */}
                {assessment.step === 2 && (
                  <div>
                    <h4 className="mb-1 font-editorial-serif text-2xl font-bold text-[#1F1F1F]">
                      Symptom chronicity & load tolerance
                    </h4>
                    <p className="text-xs text-neutral-500 mb-5">
                      How long has this been present, and what is your subjective rating under load?
                    </p>

                    <div className="mb-6">
                      <label className="text-xs font-clinical-mono uppercase tracking-wider text-neutral-700 font-bold block mb-2">
                        Duration of Symptoms:
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {[
                          { id: 'acute', label: 'Acute (< 2 wks)' },
                          { id: 'subacute', label: 'Subacute (2–12 wks)' },
                          { id: 'chronic', label: 'Chronic (> 3 mos)' },
                          { id: 'recurrent', label: 'Recurrent flare' }
                        ].map((dur) => (
                          <button
                            key={dur.id}
                            onClick={() => setAssessment({ ...assessment, painDuration: dur.id as any })}
                            className={`py-2.5 px-3 text-xs font-clinical-mono rounded-xl border transition-all duration-150 cursor-pointer font-bold ${
                              assessment.painDuration === dur.id
                                ? 'bg-[#8C3B2F] text-white border-[#8C3B2F] real-shadow-2xs scale-[1.02]'
                                : 'bg-[#F7F4EE] text-[#5A5750] border-[#E3DED3] hover:bg-white hover:border-[#1F1F1F] hover:-translate-y-0.5 active:scale-[0.98]'
                            }`}
                          >
                            {dur.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Pain Scale Slider (0-10) */}
                      <div className="mb-6 rounded-2xl border border-[#E3DED3] bg-white p-4">
                      <div className="flex items-center justify-between text-xs font-clinical-mono mb-2">
                        <span className="text-neutral-700 uppercase font-bold">Subjective Discomfort (0–10):</span>
                        <span className="rounded-lg border border-[#E3DED3] bg-[#F7F4EE] px-3 py-0.5 text-base font-black text-[#1F1F1F]">
                          {assessment.painScale} / 10
                        </span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={assessment.painScale}
                        onChange={(e) => setAssessment({ ...assessment, painScale: parseInt(e.target.value) })}
                        className="h-2 w-full cursor-pointer rounded-lg accent-[#8C3B2F]"
                      />
                      <div className="flex justify-between text-[10px] font-clinical-mono text-neutral-500 mt-1.5 font-bold">
                        <span>1: Mild awareness</span>
                        <span>5: Limits exercise</span>
                        <span>10: Severe pain at rest</span>
                      </div>
                    </div>

                    {/* Aggravating factors */}
                    <div>
                      <label className="text-xs font-clinical-mono uppercase tracking-wider text-neutral-700 font-bold block mb-2">
                        Primary Aggravating Movement:
                      </label>
                      <select
                        value={assessment.aggravatingFactor}
                        onChange={(e) => setAssessment({ ...assessment, aggravatingFactor: e.target.value })}
                        className="w-full rounded-2xl border border-[#E3DED3] bg-white p-3 text-xs font-medium text-[#1F1F1F] transition-colors duration-150 hover:border-[#8C3B2F]/50 focus:border-[#8C3B2F] focus:outline-none cursor-pointer font-editorial-sans"
                      >
                        <option value="Downhill walking / descending stairs">Downhill walking / descending stairs</option>
                        <option value="Prolonged desk sitting (> 2 hours)">Prolonged desk sitting (&gt; 2 hours)</option>
                        <option value="Overhead reaching / lifting weights">Overhead reaching / lifting weights</option>
                        <option value="Running past 3km / impact deceleration">Running past 3km / impact deceleration</option>
                        <option value="Sudden rotation / rotational sports swing">Sudden rotation / rotational sports swing</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* STEP 3: Goals */}
                {assessment.step === 3 && (
                  <div>
                    <h4 className="mb-1 font-editorial-serif text-2xl font-bold text-[#1F1F1F]">
                      What does recovery mean to you?
                    </h4>
                    <p className="text-xs text-neutral-500 mb-5">
                      We calibrate all objective test criteria toward your specific functional goals.
                    </p>

                    <div className="space-y-2.5 mb-6">
                      {[
                        'Return to competitive running / marathon training',
                        'Pain-free 8-hour desk posture without spinal ache',
                        'Weightlifting & heavy axial loading (squats/deadlifts)',
                        'Post-operative surgical clearance & ligament rehab',
                        'General mobility, walking freedom & pain prevention'
                      ].map((goalOption) => (
                        <button
                          key={goalOption}
                          onClick={() => setAssessment({ ...assessment, primaryGoal: goalOption })}
                          className={`w-full p-3.5 text-left rounded-2xl border text-xs sm:text-sm transition-all duration-150 flex items-center justify-between cursor-pointer ${
                            assessment.primaryGoal === goalOption
                              ? 'bg-[#1F1F1F] text-[#F7F4EE] font-bold border-[#8C3B2F] real-shadow-2xs scale-[1.01]'
                              : 'bg-[#F7F4EE] text-[#5A5750] border-[#E3DED3] hover:bg-white hover:border-[#1F1F1F] hover:-translate-y-0.5 hover:real-shadow-2xs active:scale-[0.99]'
                          }`}
                        >
                          <span className="font-semibold">{goalOption}</span>
                          {assessment.primaryGoal === goalOption && <Check size={16} className="text-[#8C3B2F] font-bold" />}
                        </button>
                      ))}
                    </div>

                    <div>
                      <label className="text-xs font-clinical-mono uppercase tracking-wider text-neutral-700 font-bold block mb-1.5">
                        Specific Medical History or MRI Findings (Optional):
                      </label>
                      <textarea
                        rows={3}
                        value={assessment.notes}
                        onChange={(e) => setAssessment({ ...assessment, notes: e.target.value })}
                        placeholder="e.g., MRI shows mild medial meniscus fraying, occurred 3 weeks ago while training..."
                        className="w-full p-3 bg-white border-2 border-neutral-300 hover:border-neutral-400 focus:border-neutral-950 rounded-2xl text-xs font-editorial-sans text-neutral-900 placeholder:text-neutral-400 focus:outline-none transition-colors duration-150"
                      />
                    </div>
                  </div>
                )}

                {/* STEP 4: Specialist Match & Final Schedule */}
                {assessment.step === 4 && (
                  <div>
                    <h4 className="font-editorial-serif text-2xl font-bold text-neutral-900 mb-1">
                      Matched clinical faculty & time slot
                    </h4>
                    <p className="text-xs text-neutral-500 mb-5">
                      Based on your {activeJointData.name} assessment, we matched you with our top physical therapist.
                    </p>

                    {/* Specialist Match Profile Card with Crisp Hover */}
                    <div className="mb-5 flex items-center justify-between gap-4 rounded-2xl border border-[#E3DED3] bg-white p-4 transition-colors duration-150 hover:border-[#8C3B2F]/50">
                      <div className="flex items-center gap-3">
                        <img
                          src={currentSpecialist.avatarUrl ?? undefined}
                          alt={specialistName}
                          referrerPolicy="no-referrer"
                          className="h-14 w-14 rounded-2xl border border-[#E3DED3] object-cover shadow-sm"
                        />
                        <div>
                          <div className="text-[10px] font-clinical-mono font-bold uppercase text-[#1F4E45]">
                            ★ {currentSpecialist.matchScore}% MATCH · VERIFIED
                          </div>
                          <h5 className="font-editorial-serif text-base font-bold text-[#1F1F1F]">
                            {specialistName}
                          </h5>
                          <p className="font-clinical-mono text-xs text-[#5A5750]">
                            {currentSpecialist.degrees} · {currentSpecialist.specialization}
                          </p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="text-[10px] font-clinical-mono text-neutral-500 uppercase font-bold">Consult Fee</div>
                        <div className="text-xs text-neutral-400 line-through">
                          ₹{specialistPrice ?? 0}
                        </div>
                        {/* Removed - no backend support yet, see backend simplification plan */}
                        {/* <div className="text-sm text-emerald-700 font-clinical-mono font-black">
                          Co-pay: ₹{currentSpecialist.cashlessCopay}
                        </div> */}
                      </div>
                    </div>

                    {/* Available Slot Picker with Crisp Feedback */}
                    <div className="mb-4">
                      <label className="text-xs font-clinical-mono uppercase tracking-wider text-neutral-700 font-bold block mb-2">
                        Select Preferred Slot (Tomorrow):
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {currentSpecialist.availableSlots.map((slot) => (
                          <button
                            key={slot}
                            onClick={() => setAssessment({ ...assessment, selectedSlot: slot })}
                            className={`py-2 text-xs font-clinical-mono rounded-xl border transition-all duration-150 cursor-pointer font-bold ${
                              assessment.selectedSlot === slot
                                ? 'bg-[#8C3B2F] text-white border-[#8C3B2F] real-shadow-2xs scale-[1.02]'
                                : 'bg-white text-[#5A5750] border-[#E3DED3] hover:border-[#8C3B2F] hover:bg-[#F7F4EE] hover:-translate-y-0.5 active:scale-[0.98]'
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Patient Info Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                      <div>
                        <label className="text-xs font-clinical-mono uppercase tracking-wider text-neutral-700 font-bold block mb-1">
                          Full Name:
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Arjun Mehta"
                          value={assessment.patientName}
                          onChange={(e) => setAssessment({ ...assessment, patientName: e.target.value })}
                          className="w-full rounded-xl border border-[#E3DED3] bg-white p-2.5 text-xs font-medium text-[#1F1F1F] transition-colors duration-150 hover:border-[#8C3B2F]/50 focus:border-[#8C3B2F] focus:outline-none font-editorial-sans"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-clinical-mono uppercase tracking-wider text-neutral-700 font-bold block mb-1">
                          Mobile Number:
                        </label>
                        <input
                          type="tel"
                          placeholder="+91 98200 XXXXX"
                          value={assessment.patientPhone}
                          onChange={(e) => setAssessment({ ...assessment, patientPhone: e.target.value })}
                          className="w-full rounded-xl border border-[#E3DED3] bg-white p-2.5 text-xs font-medium text-[#1F1F1F] transition-colors duration-150 hover:border-[#8C3B2F]/50 focus:border-[#8C3B2F] focus:outline-none font-editorial-sans"
                        />
                      </div>
                    </div>

                    {/* Insurance Provider */}
                    <div>
                      <label className="text-xs font-clinical-mono uppercase tracking-wider text-neutral-700 font-bold block mb-1">
                        Cashless Insurance / TPA Network:
                      </label>
                      <select
                        value={assessment.insuranceProvider}
                        onChange={(e) => setAssessment({ ...assessment, insuranceProvider: e.target.value })}
                        className="w-full cursor-pointer rounded-xl border border-[#E3DED3] bg-white p-2.5 text-xs font-medium text-[#1F1F1F] transition-colors duration-150 hover:border-[#8C3B2F]/50 focus:border-[#8C3B2F] focus:outline-none font-editorial-sans"
                      >
                        <option value="HDFC ERGO / Star Health (Cashless)">HDFC ERGO / Star Health (Cashless)</option>
                        <option value="ICICI Lombard (Direct TPA)">ICICI Lombard (Direct TPA)</option>
                        <option value="Care Health Insurance">Care Health Insurance</option>
                        <option value="Bupa Global / International">Bupa Global / International</option>
                        <option value="Self-Pay / Instant UPI">Self-Pay / Instant UPI</option>
                      </select>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        {/* Error Banner */}
        {error && !isSubmitted && (
          <div className="px-6 py-3 bg-red-50 border-t border-red-200">
            <p className="text-sm text-red-800 font-clinical-mono flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-red-500"></span>
              {error}
            </p>
          </div>
        )}

        {/* Modal Footer Controls */}
        {!isSubmitted && (
          <div className="flex items-center justify-between border-t border-[#E3DED3] bg-white px-5 py-4 sm:px-7">
            {assessment.step > 1 ? (
              <button
                onClick={handleBack}
                className="ui-btn ui-btn-secondary ui-btn-small"
              >
                <ArrowLeft size={13} />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            <button
              id="assessment-submit-next"
              onClick={handleNext}
              disabled={submitting || (assessment.step === 4 && loadingTherapists)}
              className="ui-btn ui-btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <>
                  <span className="animate-pulse">Booking...</span>
                </>
              ) : (
                <>
                  <span>{assessment.step === 4 ? 'Confirm & Book Appointment' : 'Next Step'}</span>
                  <ArrowRight size={13} />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
