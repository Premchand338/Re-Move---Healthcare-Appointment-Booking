import React, { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'motion/react';
import { JointId, AssessmentState } from '../types';
import { CLINICAL_JOINTS, SPECIALISTS_DATA } from '../data/clinicalData';
import { X, Check, ArrowRight, ArrowLeft, Shield, Calendar, Clock, Sparkles } from 'lucide-react';
import type { Therapist } from '../types/therapist';

interface AssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialJoint: JointId;
  preselectedSpecialist: Therapist | null;  // Changed from Specialist to Therapist
  preselectedSlot?: string;
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
    selectedSpecialistId: preselectedSpecialist ? preselectedSpecialist.id : 'sarah-chen',
    selectedSlot: preselectedSlot,
    patientName: '',
    patientPhone: '',
    insuranceProvider: 'HDFC ERGO / Star Health (Cashless)',
    notes: ''
  });

  const [direction, setDirection] = useState<number>(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const currentSpecialist =
    SPECIALISTS_DATA.find((s) => s.id === assessment.selectedSpecialistId) || SPECIALISTS_DATA[0];
  const activeJointData = CLINICAL_JOINTS[assessment.selectedJoint] || CLINICAL_JOINTS.knee;

  const handleNext = () => {
    setDirection(1);
    if (assessment.step < 4) {
      setAssessment((prev) => ({ ...prev, step: prev.step + 1 }));
    } else {
      setIsSubmitted(true);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm transition-opacity duration-150">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border-2 border-neutral-900 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 bg-neutral-50">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-clinical-mono text-xs uppercase tracking-wider text-neutral-800 font-extrabold">
              Kinetic Health · Doctoral Triage & Direct Booking
            </span>
          </div>

          <button
            onClick={resetAndClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-950 rounded-xl hover:bg-neutral-200 transition-colors duration-150 cursor-pointer"
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>
        </div>

        {/* Multi-Step Progress Indicator with Tighter Transition */}
        {!isSubmitted && (
          <div className="px-6 pt-4 pb-2 border-b border-neutral-200 bg-[#FAFAF8]">
            <div className="flex items-center justify-between text-xs font-clinical-mono text-neutral-500 mb-2">
              <span className="font-bold text-neutral-900">Step {assessment.step} of 4</span>
              <span className="font-bold text-neutral-900">
                {assessment.step === 1 && '1. Symptom Localization'}
                {assessment.step === 2 && '2. Chronicity & Pain Intensity'}
                {assessment.step === 3 && '3. Biomechanical Goals'}
                {assessment.step === 4 && '4. Doctor Selection & Confirmation'}
              </span>
            </div>
            <div className="w-full bg-neutral-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#C59E5F] border border-[#A88247] h-full transition-all duration-200 ease-out"
                style={{ width: `${(assessment.step / 4) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Modal Body Content with Snappy Step Transition */}
        <div className="p-6 overflow-y-auto flex-1 font-editorial-sans text-neutral-800">
          {isSubmitted ? (
            /* Confirmation Screen */
            <div className="py-6 text-center animate-fadeIn">
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-4 border-2 border-emerald-400 shadow-xs">
                <Check size={32} />
              </div>

              <div className="inline-block bg-emerald-50 text-emerald-900 border border-emerald-300 text-xs font-clinical-mono px-3.5 py-1 rounded-full mb-3 font-extrabold">
                APPOINTMENT CONFIRMED · REF: #KT-2026-884
              </div>

              <h3 className="font-editorial-serif text-3xl font-bold text-neutral-950 mb-2">
                Your appointment is confirmed!
              </h3>

              <p className="text-sm text-neutral-600 max-w-md mx-auto mb-6 leading-relaxed">
                You are confirmed with <strong className="text-neutral-950">{currentSpecialist.name}</strong> for {assessment.selectedSlot} tomorrow. A calendar invite and SMS confirmation have been dispatched.
              </p>

              <div className="bg-[#FAFAF8] border-2 border-neutral-200 rounded-2xl p-5 max-w-md mx-auto text-left text-xs font-clinical-mono space-y-2.5 mb-6 real-shadow-xs">
                <div className="flex justify-between border-b border-neutral-200 pb-2">
                  <span className="text-neutral-500">Target Region:</span>
                  <span className="font-bold text-neutral-900">{activeJointData.name}</span>
                </div>
                <div className="flex justify-between border-b border-neutral-200 pb-2">
                  <span className="text-neutral-500">Treating Clinician:</span>
                  <span className="font-bold text-neutral-900">{currentSpecialist.name} ({currentSpecialist.degrees})</span>
                </div>
                <div className="flex justify-between border-b border-neutral-200 pb-2">
                  <span className="text-neutral-500">Appointment Time:</span>
                  <span className="font-bold text-neutral-900">Tomorrow · {assessment.selectedSlot}</span>
                </div>
                {/* Removed - no backend support yet, see backend simplification plan */}
                {/* <div className="flex justify-between">
                  <span className="text-neutral-500">Estimated Co-pay:</span>
                  <span className="font-black text-emerald-700 text-sm">₹{currentSpecialist.cashlessCopay} (Instant Cashless TPA)</span>
                </div> */}
              </div>

              <button
                onClick={resetAndClose}
                className="bg-[#181816] hover:bg-[#2A2A26] text-[#F9F8F5] border border-[#C59E5F] hover:border-[#DFBA73] font-clinical-mono text-xs font-bold uppercase tracking-wider px-8 py-3.5 rounded-2xl transition-all duration-150 cursor-pointer real-shadow-sm hover:scale-105 active:scale-95"
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
                    <h4 className="font-editorial-serif text-2xl font-bold text-neutral-900 mb-1">
                      Where is movement restricted or painful?
                    </h4>
                    <p className="text-xs text-neutral-500 mb-5 font-editorial-sans">
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
                                ? 'bg-[#181816] text-[#F9F8F5] border-[#C59E5F] real-shadow-xs font-bold scale-[1.02]'
                                : 'bg-[#F9F8F5] text-[#5A5750] border-[#E5E1D8] hover:bg-white hover:border-[#181816] hover:-translate-y-0.5 hover:real-shadow-2xs active:scale-[0.98]'
                            }`}
                          >
                            <div className={`text-[10px] font-clinical-mono uppercase tracking-wider mb-1 ${
                              isSelected ? 'text-neutral-950 font-extrabold' : 'text-neutral-500'
                            }`}>
                              {joint.category}
                            </div>
                            <div className="text-sm font-bold truncate">{joint.name}</div>
                            <div className={`text-[11px] truncate mt-1 ${
                              isSelected ? 'text-neutral-900 font-semibold' : 'text-neutral-500'
                            }`}>
                              {joint.anatomicalName}
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    <div className="mt-6 p-4 rounded-2xl bg-[#FFFDF0] border-2 border-amber-300 text-xs text-neutral-800 flex items-start gap-2.5">
                      <Sparkles size={16} className="text-amber-700 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-neutral-950 font-bold">Clinical Triage Rationale:</strong> Selecting {activeJointData.name} pairs you directly with board-certified physical therapists specializing in this movement kinetic chain.
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 2: Chronicity & Pain Scale */}
                {assessment.step === 2 && (
                  <div>
                    <h4 className="font-editorial-serif text-2xl font-bold text-neutral-900 mb-1">
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
                                ? 'bg-[#181816] text-[#F9F8F5] border-[#C59E5F] real-shadow-2xs scale-[1.02]'
                                : 'bg-[#F9F8F5] text-[#5A5750] border-[#E5E1D8] hover:bg-white hover:border-[#181816] hover:-translate-y-0.5 active:scale-[0.98]'
                            }`}
                          >
                            {dur.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Pain Scale Slider (0-10) */}
                    <div className="mb-6 p-4 bg-[#FAFAF8] rounded-2xl border-2 border-neutral-200">
                      <div className="flex items-center justify-between text-xs font-clinical-mono mb-2">
                        <span className="text-neutral-700 uppercase font-bold">Subjective Discomfort (0–10):</span>
                        <span className="text-base font-black text-neutral-950 bg-white px-3 py-0.5 rounded-lg border-2 border-neutral-900 real-shadow-2xs">
                          {assessment.painScale} / 10
                        </span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={assessment.painScale}
                        onChange={(e) => setAssessment({ ...assessment, painScale: parseInt(e.target.value) })}
                        className="w-full accent-neutral-950 h-2 bg-neutral-200 rounded-lg cursor-pointer"
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
                        className="w-full p-3 bg-white border-2 border-neutral-300 hover:border-neutral-400 focus:border-neutral-950 rounded-2xl text-xs font-editorial-sans text-neutral-900 focus:outline-none transition-colors duration-150 cursor-pointer font-medium"
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
                    <h4 className="font-editorial-serif text-2xl font-bold text-neutral-900 mb-1">
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
                              ? 'bg-[#181816] text-[#F9F8F5] font-bold border-[#C59E5F] real-shadow-2xs scale-[1.01]'
                              : 'bg-[#F9F8F5] text-[#5A5750] border-[#E5E1D8] hover:bg-white hover:border-[#181816] hover:-translate-y-0.5 hover:real-shadow-2xs active:scale-[0.99]'
                          }`}
                        >
                          <span className="font-semibold">{goalOption}</span>
                          {assessment.primaryGoal === goalOption && <Check size={16} className="text-[#DFBA73] font-bold" />}
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
                    <div className="bg-[#FAFAF8] border-2 border-neutral-200 hover:border-neutral-900 rounded-2xl p-4 mb-5 flex items-center justify-between gap-4 transition-colors duration-150">
                      <div className="flex items-center gap-3">
                        <img
                          src={currentSpecialist.avatarUrl}
                          alt={currentSpecialist.name}
                          referrerPolicy="no-referrer"
                          className="w-14 h-14 rounded-2xl object-cover border-2 border-neutral-900 real-shadow-2xs"
                        />
                        <div>
                          <div className="text-[10px] font-clinical-mono text-emerald-800 font-bold uppercase">
                            ★ {currentSpecialist.matchScore}% MATCH · VERIFIED
                          </div>
                          <h5 className="font-editorial-serif text-base font-bold text-neutral-950">
                            {currentSpecialist.name}
                          </h5>
                          <p className="text-xs text-neutral-600 font-clinical-mono">
                            {currentSpecialist.degrees} · {currentSpecialist.specialization}
                          </p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="text-[10px] font-clinical-mono text-neutral-500 uppercase font-bold">Consult Fee</div>
                        <div className="text-xs text-neutral-400 line-through">
                          ₹{currentSpecialist.consultationFee}
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
                                ? 'bg-[#181816] text-[#F9F8F5] border-[#C59E5F] real-shadow-2xs scale-[1.02]'
                                : 'bg-white text-[#5A5750] border-[#E5E1D8] hover:border-[#181816] hover:bg-[#F9F8F5] hover:-translate-y-0.5 active:scale-[0.98]'
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
                          className="w-full p-2.5 bg-white border-2 border-neutral-300 hover:border-neutral-400 focus:border-neutral-950 rounded-xl text-xs font-editorial-sans text-neutral-900 focus:outline-none transition-colors duration-150 font-medium"
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
                          className="w-full p-2.5 bg-white border-2 border-neutral-300 hover:border-neutral-400 focus:border-neutral-950 rounded-xl text-xs font-editorial-sans text-neutral-900 focus:outline-none transition-colors duration-150 font-medium"
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
                        className="w-full p-2.5 bg-white border-2 border-neutral-300 hover:border-neutral-400 focus:border-neutral-950 rounded-xl text-xs font-editorial-sans text-neutral-900 focus:outline-none transition-colors duration-150 font-medium cursor-pointer"
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

        {/* Modal Footer Controls */}
        {!isSubmitted && (
          <div className="px-6 py-4 border-t border-neutral-200 bg-neutral-50 flex items-center justify-between">
            {assessment.step > 1 ? (
              <button
                onClick={handleBack}
                className="px-4 py-2 border-2 border-neutral-300 text-neutral-800 hover:text-neutral-950 hover:bg-white hover:border-neutral-900 rounded-xl text-xs font-clinical-mono uppercase tracking-wider flex items-center gap-1.5 transition-all duration-150 cursor-pointer font-bold active:scale-95"
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
              className="bg-[#181816] hover:bg-[#2A2A26] text-[#F9F8F5] font-bold px-6 py-3 rounded-xl text-xs font-clinical-mono uppercase tracking-wider flex items-center gap-1.5 transition-all duration-150 real-shadow-xs border border-[#C59E5F] hover:border-[#DFBA73] hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>{assessment.step === 4 ? 'Confirm & Book Appointment' : 'Next Step'}</span>
              <ArrowRight size={13} className="text-[#C59E5F]" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
