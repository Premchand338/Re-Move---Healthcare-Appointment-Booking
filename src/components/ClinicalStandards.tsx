import React from 'react';
import { CLINICAL_STANDARDS } from '../data/clinicalData';
import { GraduationCap, Activity, ShieldCheck, ArrowRight, CheckCircle2, Star } from 'lucide-react';

interface ClinicalStandardsProps {
  onStartAssessment: () => void;
}

export const ClinicalStandards: React.FC<ClinicalStandardsProps> = ({ onStartAssessment }) => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'specialists':
        return <GraduationCap size={20} className="text-neutral-950" />;
      case 'biomechanics':
        return <Activity size={20} className="text-neutral-950" />;
      case 'coverage':
        return <ShieldCheck size={20} className="text-neutral-950" />;
      default:
        return <Activity size={20} className="text-neutral-950" />;
    }
  };

  return (
    <section id="clinical-standards" className="py-20 md:py-24 border-b border-neutral-200 bg-[#FAFAF8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 mb-3 bg-white px-3.5 py-1.5 rounded-full border border-neutral-200 text-xs font-clinical-mono font-bold text-neutral-800 real-shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>THE KINETIC CLINICAL ACCREDITATION</span>
          </div>

          <h2 className="font-editorial-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-neutral-900 leading-[1.12]">
            Evidence over opinion. Results over guesswork.
          </h2>

          <p className="mt-3.5 text-base sm:text-lg text-neutral-600 font-editorial-sans leading-relaxed">
            We replaced rushed 15-minute consultations with measured 3D biomechanics, transparent cashless pricing, and 60 uninterrupted minutes with Board-Certified Doctors of Physical Therapy.
          </p>
        </div>

        {/* 3 Columns Grid System */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 items-stretch">
          {CLINICAL_STANDARDS.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-[#E5E1D8] hover:border-[#181816] hover:-translate-y-1 rounded-3xl p-7 real-shadow-xs hover:real-shadow-xl flex flex-col justify-between transition-all duration-150 group"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#F6EEDF] border border-[#C59E5F]/50 text-[#8C6D34] flex items-center justify-center mb-6 real-shadow-2xs">
                  {getIcon(item.id)}
                </div>

                <div className="text-xs font-clinical-mono uppercase tracking-wider text-[#3E5647] font-bold mb-2">
                  {item.badge}
                </div>

                <h3 className="font-editorial-serif text-2xl font-bold text-[#181816] mb-2.5">
                  {item.title}
                </h3>

                <p className="text-sm text-[#5A5750] font-editorial-sans leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#F2EFE8] flex items-center gap-2 text-xs font-clinical-mono text-[#7A766E] font-medium">
                <CheckCircle2 size={14} className="text-[#3E5647]" />
                <span>Verified Kinetic Standard</span>
              </div>
            </div>
          ))}
        </div>

        {/* High-Conversion Kinetic Callout Banner */}
        <div className="bg-white border border-[#E5E1D8] rounded-3xl p-8 sm:p-12 text-center max-w-3xl mx-auto real-shadow-xl relative overflow-hidden">
          <div className="absolute top-3 left-3 text-neutral-300 font-clinical-mono text-xs select-none">
            +
          </div>
          <div className="absolute top-3 right-3 text-neutral-300 font-clinical-mono text-xs select-none">
            +
          </div>

          <span className="font-clinical-mono text-xs uppercase tracking-[0.22em] text-[#7A766E] font-bold block mb-2">
            Direct Access Evaluation · Zero Referral Needed
          </span>

          <h3 className="font-editorial-serif text-3xl sm:text-4xl font-normal text-[#181816] mb-3 leading-tight">
            Ready to live without movement limitation?
          </h3>

          <p className="text-sm sm:text-base text-[#5A5750] font-editorial-sans mb-7 max-w-xl mx-auto leading-relaxed">
            Take our 2-minute 3D symptom triage to get matched with an orthopedic doctoral specialist and secure today’s open slot.
          </p>

          <button
            onClick={onStartAssessment}
            className="inline-flex items-center gap-2.5 bg-[#181816] hover:bg-[#2A2A26] text-[#F9F8F5] font-clinical-mono text-xs uppercase tracking-wider font-bold px-8 py-4 rounded-2xl transition-all real-shadow-sm border border-[#C59E5F] hover:border-[#DFBA73] hover:scale-105 active:scale-95 group cursor-pointer"
          >
            <span>Start Your 2-Min Triage</span>
            <ArrowRight size={16} className="text-[#DFBA73] transition-transform group-hover:translate-x-1" />
          </button>
          
          <p className="text-xs font-clinical-mono text-[#7A766E] mt-4">
            100% Cashless In-Network TPA claims available on site
          </p>
        </div>

      </div>
    </section>
  );
};
