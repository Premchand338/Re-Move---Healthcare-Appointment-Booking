import React from 'react';
// Removed - no backend support yet, see backend simplification plan
// import { CLINICS } from '../data/clinicalData';
import { MapPin, Phone, Clock, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateSection }) => {
  return (
    <footer className="bg-[#12161A] text-neutral-300 pt-16 pb-28 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Brand and Mission Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 border-b border-neutral-800 pb-12">
          <div className="md:col-span-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-editorial-serif text-3xl font-extrabold tracking-tight text-white">
                KINETIC
              </span>
              <span className="bg-[#C59E5F] text-[#181816] text-[10px] font-bold px-2 py-0.5 rounded-sm">
                HEALTH
              </span>
            </div>
            <div className="font-clinical-mono text-[11px] uppercase tracking-[0.2em] text-neutral-400 mb-3 font-semibold">
              EVIDENCE PHYSICAL THERAPY & DOCTOR APPOINTMENTS
            </div>
            <p className="text-sm text-neutral-400 font-editorial-sans leading-relaxed max-w-sm">
              An evidence-led clinical physiotherapy network and booking platform. Real-time scheduling with doctoral specialists, transparent cashless insurance co-pays, and zero waiting room delays.
            </p>
          </div>

          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8 text-xs font-clinical-mono">
            <div>
              <span className="text-white uppercase tracking-wider font-bold block mb-3">
                DOCTORS & SPECIALTIES
              </span>
              <ul className="space-y-2 text-neutral-400">
                <li>
                  <button onClick={() => onNavigateSection('symptom-localization')} className="hover:text-[#DFBA73] transition-colors cursor-pointer text-left">
                    Knee & ACL Specialists
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigateSection('symptom-localization')} className="hover:text-[#DFBA73] transition-colors cursor-pointer text-left">
                    Spine & Sciatica Therapy
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigateSection('symptom-localization')} className="hover:text-[#DFBA73] transition-colors cursor-pointer text-left">
                    Rotator Cuff & Shoulder
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigateSection('specialists')} className="hover:text-[#DFBA73] transition-colors cursor-pointer text-left">
                    All Physical Therapists
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <span className="text-white uppercase tracking-wider font-bold block mb-3">
                PATIENT RESOURCES
              </span>
              <ul className="space-y-2 text-neutral-400">
                <li>
                  <button onClick={() => onNavigateSection('modalities')} className="hover:text-[#DFBA73] transition-colors cursor-pointer text-left">
                    Clinical Evidence Library
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigateSection('trajectory')} className="hover:text-[#DFBA73] transition-colors cursor-pointer text-left">
                    Predictive Milestones
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigateSection('biomechanical-visualizer')} className="hover:text-[#DFBA73] transition-colors cursor-pointer text-left">
                    3D Anatomical Body Map
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigateSection('specialists')} className="hover:text-[#DFBA73] transition-colors cursor-pointer text-left">
                    Verified Patient Reviews
                  </button>
                </li>
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <span className="text-white uppercase tracking-wider font-bold block mb-3">
                INSURANCE NETWORKS
              </span>
              <div className="space-y-1.5 text-neutral-400 text-[11px]">
                <p className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Star Health & Allied Insurance
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  HDFC ERGO Health Care
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  ICICI Lombard TPA
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Care Health / Religare
                </p>
                <p className="text-emerald-400 font-bold mt-2">Instant Cashless Desk Verification</p>
              </div>
            </div>
          </div>
        </div>

        {/* Removed - no backend support yet, see backend simplification plan */}
        {/* Flagship Clinics Detailed Directory */}
        {/* <div className="py-12 border-b border-neutral-800">
          <div className="flex items-center gap-2 mb-6">
            <MapPin size={16} className="text-[#C59E5F]" />
            <span className="font-clinical-mono text-xs uppercase tracking-wider text-white font-bold">
              PHYSICAL THERAPY CLINIC LOCATIONS
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 text-xs">
            {CLINICS.map((clinic) => (
              <div key={clinic.city} className="p-4 bg-neutral-900/80 border border-neutral-800 rounded-2xl">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-editorial-serif text-base font-bold text-white">
                    {clinic.city}
                  </span>
                  <span className="text-[10px] font-clinical-mono text-emerald-400 font-bold">● Open Today</span>
                </div>
                <div className="font-editorial-sans text-neutral-300 font-semibold mb-1">
                  {clinic.centerName}
                </div>
                <p className="text-neutral-400 text-[11px] leading-relaxed mb-2 font-editorial-sans">
                  {clinic.address}
                </p>
                <div className="text-[10px] font-clinical-mono text-neutral-400 space-y-1">
                  <div className="flex items-center gap-1.5">
                    <Phone size={11} className="text-neutral-500" />
                    <span>{clinic.phone}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock size={11} className="text-neutral-500" />
                    <span>{clinic.timing}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div> */}

        {/* Disclaimer and Legal Footer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-[11px] font-clinical-mono text-neutral-500 gap-4">
          <p className="max-w-2xl leading-relaxed">
            Kinetic is an accredited physical therapy practice and clinical scheduling system. The interactive assessment tool is designed for triage and does not replace emergency medical diagnosis.
          </p>

          <div className="flex items-center gap-4 shrink-0 font-medium">
            <span>© 2026 KINETIC HEALTHCARE</span>
            <span>PRIVACY & HIPPA</span>
            <span>CLINICAL CODE</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
