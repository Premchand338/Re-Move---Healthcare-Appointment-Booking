import React, { useState } from 'react';
// Removed - no backend support yet, see backend simplification plan
// import { TRAJECTORY_STEPS } from '../data/clinicalData';
import { ChevronRight, Target, Activity, CheckCircle, Shield, ArrowRight } from 'lucide-react';

export const RehabilitationTrajectory: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(2); // Default to Step 03: Mobility & Capsular Glide
  // Removed - no backend support yet, see backend simplification plan
  // const currentStep = TRAJECTORY_STEPS[activeStepIndex];

  return (
    <section id="trajectory" className="py-16 md:py-24 border-b border-neutral-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-clinical-mono text-xs uppercase tracking-[0.22em] text-neutral-500 font-extrabold">
                Predictive Recovery Milestones · Phased Loading
              </span>
            </div>

            <h2 className="font-editorial-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-neutral-900 leading-[1.12]">
              Objective recovery. Never guess when you're healed.
            </h2>

            <p className="mt-3.5 text-base sm:text-lg text-neutral-600 font-editorial-sans leading-relaxed">
              Tissue remodeling occurs in distinct physiological phases. At Kinetic, advancing to running, jumping, or heavy lifting requires passing objective force-plate and range-of-motion clearance gates.
            </p>
          </div>

          <div className="flex items-center gap-2 font-clinical-mono text-xs text-neutral-700 bg-[#FAFAF8] px-4 py-2.5 rounded-2xl border border-neutral-200 shrink-0">
            <Target size={15} className="text-emerald-700" />
            <span>Clearance Gates: 5 Phased Milestones</span>
          </div>
        </div>

        {/* Removed - no backend support yet, see backend simplification plan */}
        {/* Phase Stepper Tabs with 5-Column Grid */}
        {/* <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5 mb-8">{TRAJECTORY_STEPS.map((phase, idx) => {const isActive = activeStepIndex === idx; return (<button key={phase.step} onClick={() => setActiveStepIndex(idx)} className={...}>{...}</button>);})}</div> */}

        {/* Removed - no backend support yet, see backend simplification plan */}
        {/* Active Phase Deep Dive Card with 12-Column Layout */}
        {/* <div className="bg-[#FAFAF8] border-2 border-neutral-900 rounded-3xl p-6 sm:p-9 real-shadow-xl"><div className="flex flex-col md:flex-row md:items-center justify-between border-b border-neutral-200 pb-5 mb-6 gap-4"><div><div className="flex items-center gap-2 mb-1.5 text-xs font-clinical-mono text-emerald-800 font-bold"><span>{currentStep.step}</span><span>·</span><span>{currentStep.timeframe}</span><span>·</span><span className="bg-emerald-100/80 text-emerald-900 border border-emerald-300 px-3 py-0.5 rounded-full font-black">ACTIVE CLINICAL MILESTONE</span></div><h3 className="font-editorial-serif text-2xl sm:text-3xl font-bold text-neutral-950">{currentStep.phaseName} — {currentStep.clinicalObjective}</h3></div><div className="shrink-0 bg-white border-2 border-neutral-900 px-5 py-3 rounded-2xl text-right real-shadow-xs"><div className="text-[10px] font-clinical-mono uppercase tracking-wider text-neutral-500 font-bold">Kinematic Benchmark Target</div><div className="text-xs font-clinical-mono font-black text-neutral-950 mt-0.5">{currentStep.targetMetrics}</div></div></div><div className="grid grid-cols-1 md:grid-cols-12 gap-8"><div className="md:col-span-7"><h4 className="text-xs font-clinical-mono uppercase tracking-wider text-neutral-900 font-black mb-3.5 flex items-center gap-2"><Activity size={15} className="text-emerald-700" />Evidence-Led Interventions & Load Drills:</h4><div className="space-y-2.5">{currentStep.interventions.map((item, i) => (<div key={i} className="flex items-start gap-3 p-3.5 bg-white border border-neutral-200 rounded-2xl text-xs sm:text-sm text-neutral-800 real-shadow-2xs"><CheckCircle size={16} className="text-emerald-600 shrink-0 mt-0.5" /><span className="font-medium leading-relaxed">{item}</span></div>))}</div></div><div className="md:col-span-5 flex flex-col justify-between bg-white border-2 border-neutral-200 rounded-3xl p-6 real-shadow-sm"><div><div className="flex items-center gap-1.5 text-xs font-clinical-mono uppercase tracking-wider text-neutral-900 font-black mb-3"><Target size={15} className="text-amber-600" />Objective Clearance Gate:</div><p className="text-xs text-neutral-600 leading-relaxed font-editorial-sans">Before your Doctor of Physical Therapy clears you for the next load phase, you must objectively achieve:</p><div className="mt-4 p-4 bg-[#FFFDF0] border-2 border-amber-300 rounded-2xl"><div className="text-[10px] font-clinical-mono text-amber-900 uppercase font-black tracking-wider">Discharge / Advance Requirement</div><div className="text-xs sm:text-sm font-bold text-neutral-950 mt-1.5 font-editorial-sans leading-snug">{currentStep.clearanceMilestone}</div></div></div><div className="mt-6 pt-4 border-t border-neutral-200 flex items-center justify-between text-xs text-neutral-600 font-clinical-mono"><span>Phase progression status:</span><span className="font-black text-neutral-950 bg-neutral-100 px-2.5 py-1 rounded-md">Phase {activeStepIndex + 1} of {TRAJECTORY_STEPS.length}</span></div></div></div></div> */}

        {/* Disclaimer note */}
        <div className="mt-6 text-center text-xs font-editorial-sans text-neutral-500">
          *Recovery trajectories vary by individual pathology, tissue healing genetics, movement history, and treating doctor evaluation.
        </div>

      </div>
    </section>
  );
};
