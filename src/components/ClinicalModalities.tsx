import React from 'react';
import { Modality } from '../types';
// Removed - no backend support yet, see backend simplification plan
// import { MODALITIES_DATA } from '../data/clinicalData';
import { ArrowUpRight, BookOpen, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

interface ClinicalModalitiesProps {
  onOpenEvidence: (modality: Modality) => void;
}

export const ClinicalModalities: React.FC<ClinicalModalitiesProps> = ({ onOpenEvidence }) => {
  const getEvidenceColor = (strength: string) => {
    switch (strength) {
      case 'HIGH GRADE A':
      case 'STRONG':
        return 'bg-emerald-100/80 text-emerald-900 border-emerald-300';
      case 'MODERATE':
        return 'bg-amber-100/80 text-amber-900 border-amber-300';
      case 'CONTEXT DEPENDENT':
      default:
        return 'bg-neutral-100 text-neutral-800 border-neutral-300';
    }
  };

  return (
    <section id="modalities" className="py-16 md:py-24 border-b border-neutral-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-clinical-mono text-xs uppercase tracking-[0.22em] text-neutral-500 font-extrabold">
                Evidence-Based Modalities · Clinical Transparency
              </span>
            </div>

            <h2 className="font-editorial-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-neutral-900 leading-[1.12]">
              Therapy grounded in science. Never passive placebo.
            </h2>

            {/* <p className="mt-3.5 text-base sm:text-lg text-neutral-600 font-editorial-sans leading-relaxed">
              We reject unsupervised heat-packs or passive machine sessions. Every intervention at Kinetic is derived from international Orthopedic Clinical Practice Guidelines (CPGs) and active mechanobiology.
            </p> */}
          </div>

          <div className="flex items-center gap-2 font-clinical-mono text-xs text-neutral-700 bg-[#FAFAF8] px-4 py-2.5 rounded-2xl border border-neutral-200 shrink-0">
            <BookOpen size={15} className="text-amber-600" />
            <span>APTA & JOSPT Peer-Reviewed Protocols</span>
          </div>
        </div>

        {/* Removed - no backend support yet, see backend simplification plan */}
        {/* 4-Column Balanced Grid System */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">{MODALITIES_DATA.map((modality) => (<div key={modality.id} onClick={() => onOpenEvidence(modality)} className="bg-[#FAFAF8] hover:bg-white border-2 border-neutral-200 hover:border-neutral-950 hover:-translate-y-1 rounded-3xl p-6 real-shadow-xs hover:real-shadow-xl flex flex-col justify-between transition-all duration-150 group cursor-pointer"><div><div className="flex items-center justify-between border-b border-neutral-200 pb-3 mb-4"><span className="text-[10px] font-clinical-mono uppercase tracking-widest text-neutral-500 font-bold">EVIDENCE TIER</span><span className={`text-[10px] font-clinical-mono font-black px-2.5 py-0.5 rounded-full border ${getEvidenceColor(modality.evidenceStrength)}`}>{modality.evidenceStrength}</span></div><h3 className="font-editorial-serif text-xl font-bold text-neutral-900 tracking-tight leading-snug">{modality.title}</h3><p className="text-xs font-clinical-mono text-emerald-800 font-bold uppercase tracking-wider mt-1.5 leading-snug">{modality.subtitle}</p><p className="mt-3 text-xs sm:text-sm text-neutral-600 font-editorial-sans leading-relaxed">{modality.description}</p></div><div className="mt-6 pt-4 border-t border-neutral-200"><button type="button" onClick={(e) => { e.stopPropagation(); onOpenEvidence(modality); }} className="w-full inline-flex items-center justify-between text-xs font-clinical-mono font-black text-neutral-950 py-2.5 px-3.5 rounded-xl bg-white border-2 border-neutral-200 group-hover:border-neutral-950 transition-all duration-150 uppercase tracking-wider cursor-pointer active:scale-95"><span>Review Clinical Trial Data</span><ArrowUpRight size={14} className="transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-neutral-900" /></button></div></div>))}</div> */}
      </div>
    </section>
  );
};
