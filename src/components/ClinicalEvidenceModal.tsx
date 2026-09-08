import React from 'react';
import { Modality } from '../types';
import { X, BookOpen, AlertTriangle, CheckCircle2, ShieldCheck } from 'lucide-react';

interface ClinicalEvidenceModalProps {
  modality: Modality | null;
  onClose: () => void;
}

export const ClinicalEvidenceModal: React.FC<ClinicalEvidenceModalProps> = ({ modality, onClose }) => {
  if (!modality) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 bg-neutral-50">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-clinical-mono text-xs uppercase tracking-wider text-neutral-600 font-bold">
              Kinetic Literature & Clinical Practice Guidelines
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-700 rounded-lg hover:bg-neutral-200 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 font-editorial-sans text-neutral-800 space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-clinical-mono text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300">
                EVIDENCE GRADE: {modality.evidenceStrength}
              </span>
              <span className="text-xs font-clinical-mono text-neutral-500">
                International Clinical Guidelines
              </span>
            </div>

            <h3 className="font-editorial-serif text-3xl font-bold text-neutral-900 mt-1">
              {modality.title}
            </h3>
            <p className="text-xs font-clinical-mono uppercase tracking-wide text-neutral-500 mt-1 font-semibold">
              {modality.subtitle}
            </p>
          </div>

          <p className="text-sm text-neutral-600 leading-relaxed font-editorial-sans">
            {modality.description}
          </p>

          {/* Biological Mechanisms */}
          <div className="p-4 bg-[#FAFAF8] border border-neutral-200 rounded-2xl shadow-2xs">
            <h4 className="text-xs font-clinical-mono uppercase tracking-wider text-neutral-900 font-bold mb-2.5 flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-emerald-600" />
              Documented Physiological Mechanisms
            </h4>
            <ul className="space-y-2 text-xs text-neutral-700">
              {modality.mechanisms.map((mech, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold mt-0.5">•</span>
                  <span>{mech}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Clinical Indications & Contraindications */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-emerald-50/80 border border-emerald-200 rounded-2xl">
              <div className="text-xs font-clinical-mono uppercase tracking-wider text-emerald-900 font-bold mb-2 flex items-center gap-1">
                <CheckCircle2 size={13} className="text-emerald-700" />
                Primary Indications
              </div>
              <ul className="space-y-1.5 text-xs text-emerald-800 font-medium">
                {modality.indications.map((ind, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>{ind}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-2xl">
              <div className="text-xs font-clinical-mono uppercase tracking-wider text-amber-900 font-bold mb-2 flex items-center gap-1">
                <AlertTriangle size={13} className="text-amber-700" />
                Clinical Contraindications
              </div>
              <ul className="space-y-1.5 text-xs text-amber-800 font-medium">
                {modality.contraindications.map((con, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Citations */}
          <div>
            <h4 className="text-xs font-clinical-mono uppercase tracking-wider text-neutral-900 font-bold mb-3 flex items-center gap-1.5">
              <BookOpen size={14} className="text-neutral-500" />
              Peer-Reviewed Literature Citations
            </h4>
            <div className="space-y-2.5">
              {modality.clinicalCitations.map((cite, i) => (
                <div key={i} className="p-3.5 bg-[#FAFAF8] border border-neutral-200 rounded-xl text-xs shadow-2xs">
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="font-bold text-neutral-900">{cite.journal}</span>
                    <span className="text-[11px] font-clinical-mono text-neutral-500 font-medium">{cite.year}</span>
                  </div>
                  <p className="italic text-neutral-700 mb-1">«{cite.title}»</p>
                  <p className="text-neutral-600 font-editorial-sans text-[11px] leading-relaxed">
                    <strong className="text-neutral-900 font-bold">Finding:</strong> {cite.finding}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-neutral-200 bg-neutral-50 flex items-center justify-between text-xs font-clinical-mono">
          <span className="text-neutral-500">Kinetic Evidence Library v4.2</span>
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-[#181816] hover:bg-[#2A2A26] text-[#F9F8F5] font-bold rounded-xl uppercase tracking-wider text-xs transition-colors cursor-pointer border border-[#C59E5F] hover:border-[#DFBA73] shadow-2xs"
          >
            Close Guidelines
          </button>
        </div>
      </div>
    </div>
  );
};
