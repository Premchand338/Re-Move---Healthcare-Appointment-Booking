import React, { useState } from 'react';
import { JointId } from '../types';
import { CLINICAL_JOINTS } from '../data/clinicalData';
import { BiomechanicalVisualizer } from './BiomechanicalVisualizer';
import { CheckCircle2, ChevronRight, Sparkles, BookOpen, AlertCircle, ArrowRight, ShieldCheck, Activity } from 'lucide-react';

interface SymptomLocalizationProps {
  selectedJoint: JointId;
  onSelectJoint: (id: JointId) => void;
  onStartAssessment: (id: JointId) => void;
}

export const SymptomLocalization: React.FC<SymptomLocalizationProps> = ({
  selectedJoint,
  onSelectJoint,
  onStartAssessment
}) => {
  const [activeTab, setActiveTab] = useState<'3d' | '2d'>('3d');
  const activeData = CLINICAL_JOINTS[selectedJoint] || CLINICAL_JOINTS.knee;

  const anatomicalTabs: { id: JointId; label: string; code: string }[] = [
    { id: 'knee', label: 'Knee Joint', code: 'J-01' },
    { id: 'spine', label: 'Lumbar Spine', code: 'J-02' },
    { id: 'shoulder', label: 'Shoulder Cuff', code: 'J-03' },
    { id: 'hip', label: 'Hip & Pelvis', code: 'J-04' },
    { id: 'ankle', label: 'Ankle & Foot', code: 'J-05' },
    { id: 'cervical', label: 'Neck & Cervical', code: 'J-06' }
  ];

  return (
    <section id="symptom-localization" className="py-16 md:py-24 border-b border-neutral-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Elevated UX Typography */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-clinical-mono text-xs uppercase tracking-[0.22em] text-neutral-500 font-extrabold">
                Interactive 3D Triage · Anatomical Vector Mapping
              </span>
            </div>

            <h2 className="font-editorial-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-neutral-900 leading-[1.12]">
              Point to where it hurts. We uncover the mechanical root.
            </h2>

            <p className="mt-3.5 text-base sm:text-lg text-neutral-600 font-editorial-sans leading-relaxed">
              No medical prescription or prior MRI scan needed. Interact with the 3D biomechanical model below or select your symptomatic joint to match directly with Board-Certified Orthopedic DPTs.
            </p>
          </div>

          <div className="flex items-center gap-2 font-clinical-mono text-xs text-neutral-600 bg-[#FAFAF8] px-4 py-2.5 rounded-2xl border border-neutral-200 shrink-0">
            <ShieldCheck size={16} className="text-emerald-700" />
            <span>Direct Access: Instant 1-on-1 Doctoral Evaluation</span>
          </div>
        </div>

        {/* 12-Column Grid System: Left Visualizer (7 cols) + Right Clinical Dossier (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Visualizer & Anatomical Navigator (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            
            {/* Quick Anatomical Selection Strip */}
            <div className="bg-[#FAFAF8] border border-neutral-200 rounded-2xl p-2 flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
              <div className="flex items-center gap-1.5 shrink-0">
                {anatomicalTabs.map((tab) => {
                  const isCurrent = selectedJoint === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => onSelectJoint(tab.id)}
                      className={`px-3.5 py-1.5 text-xs font-bold font-editorial-sans rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                        isCurrent
                          ? 'bg-neutral-950 text-white shadow-xs scale-102'
                          : 'bg-white text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 border border-neutral-200'
                      }`}
                    >
                      <span className="text-[10px] font-clinical-mono opacity-60">{tab.code}</span>
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-clinical-mono text-emerald-800 font-bold px-2 shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                <span>360° MODEL ACTIVE</span>
              </div>
            </div>

            {/* Visualizer Canvas Card with Mathematical Border */}
            <div className="bg-neutral-950 rounded-3xl border-2 border-neutral-900 overflow-hidden real-shadow-xl relative">
              <BiomechanicalVisualizer
                selectedJoint={selectedJoint}
                onSelectJoint={onSelectJoint}
                onStartAssessment={onStartAssessment}
              />
            </div>

            {/* Micro UX instruction row */}
            <div className="flex items-center justify-between text-xs font-clinical-mono text-neutral-500 px-1">
              <span>● Drag model to rotate 360° · Click any anatomical node to isolate vectors</span>
              <span className="font-semibold text-neutral-800 hidden sm:inline">6 Calibrated Kinematic Nodes</span>
            </div>

          </div>

          {/* Right Column: In-Depth Diagnostic Profile & Booking Affordance (5 cols) */}
          <div className="lg:col-span-5 bg-[#FAFAF8] border-2 border-neutral-200 rounded-3xl p-6 sm:p-7 real-shadow-lg flex flex-col justify-between">
            <div>
              {/* Category & Anatomical Subtitle */}
              <div className="flex items-center justify-between border-b border-neutral-200 pb-3.5 mb-4">
                <div>
                  <span className="font-clinical-mono text-[10px] uppercase tracking-widest text-neutral-500 font-bold block">
                    ANATOMICAL CLASSIFICATION
                  </span>
                  <span className="font-clinical-mono text-xs font-extrabold text-neutral-900">
                    {activeData.anatomicalName}
                  </span>
                </div>
                <span className="bg-emerald-100/80 text-emerald-900 border border-emerald-300 text-[10px] font-clinical-mono px-3 py-1 rounded-full font-bold">
                  {activeData.category}
                </span>
              </div>

              {/* Serif Title & Dynamic Biomechanics */}
              <h3 className="font-editorial-serif text-2xl sm:text-3xl font-medium text-neutral-900 leading-snug">
                {activeData.name}
              </h3>

              <p className="mt-2 text-sm text-neutral-600 font-editorial-sans leading-relaxed">
                {activeData.biomechanics}
              </p>

              {/* Common Movement Symptoms Checklist */}
              <div className="mt-5 pt-4 border-t border-neutral-200">
                <h4 className="font-clinical-mono text-xs uppercase tracking-wider text-neutral-900 font-extrabold mb-3 flex items-center gap-1.5">
                  <AlertCircle size={14} className="text-amber-500" />
                  Hallmark Clinical Presentations:
                </h4>

                <div className="space-y-2">
                  {activeData.commonConcerns.map((concern, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white border border-neutral-200/80 text-xs text-neutral-800">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 mt-1" />
                      <span className="font-medium leading-snug">{concern}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Clinical Evidence Focus Block */}
              <div className="mt-5 p-4 rounded-2xl bg-[#FFFDF0] border border-amber-200 text-neutral-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-clinical-mono text-[10px] uppercase tracking-widest text-amber-900 font-extrabold flex items-center gap-1.5">
                    <BookOpen size={13} className="text-amber-700" />
                    Evidence-Based Recovery Benchmark
                  </span>
                  <span className="text-[10px] font-clinical-mono text-neutral-600 bg-amber-100/60 px-2 py-0.5 rounded-md font-bold">
                    GRADE A
                  </span>
                </div>
                <p className="text-xs text-neutral-700 leading-relaxed italic font-editorial-serif">
                  "{activeData.clinicalEvidenceFocus}"
                </p>
                <div className="mt-3 text-[11px] font-clinical-mono text-neutral-700 flex items-center justify-between border-t border-amber-200/80 pt-2.5">
                  <span>Documented Recovery Target:</span>
                  <span className="font-extrabold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    {activeData.successRate}
                  </span>
                </div>
              </div>
            </div>

            {/* Primary Action Button for this Region */}
            <div className="mt-6 pt-5 border-t border-neutral-200">
              <button
                id={`start-assessment-${selectedJoint}`}
                onClick={() => onStartAssessment(selectedJoint)}
                className="w-full bg-[#181816] hover:bg-[#2A2A26] text-[#F9F8F5] py-3.5 px-5 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all real-shadow-sm border border-[#C59E5F] hover:border-[#DFBA73] flex items-center justify-center gap-2 group cursor-pointer hover:scale-[1.01] active:scale-[0.99] hover:real-shadow-md"
              >
                <span className="font-clinical-mono">Book Specialists for {activeData.name.split('&')[0].trim()}</span>
                <ChevronRight size={16} className="text-[#DFBA73] transition-transform group-hover:translate-x-1" />
              </button>
              
              <div className="flex items-center justify-between text-[11px] font-clinical-mono text-neutral-500 mt-3 px-1">
                <span>✓ Direct cashless claims</span>
                <span>·</span>
                <span>✓ 60-min doctoral consult</span>
                <span>·</span>
                <span>✓ Today slots open</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
