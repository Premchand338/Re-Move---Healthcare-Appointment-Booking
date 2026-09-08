import React from 'react';
import { Specialist } from '../types';
import { X, Award, BookOpen, MapPin, Calendar, Clock, Star, Volume2, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface SpecialistDossierModalProps {
  specialist: Specialist | null;
  onClose: () => void;
  onBook: (specialist: Specialist, slot: string) => void;
}

export const SpecialistDossierModal: React.FC<SpecialistDossierModalProps> = ({
  specialist,
  onClose,
  onBook
}) => {
  if (!specialist) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 bg-neutral-50">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-clinical-mono text-xs uppercase tracking-wider text-neutral-600 font-bold">
              Zocdoc Verified Doctor Profile · ID: #{specialist.id.toUpperCase()}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-700 rounded-lg hover:bg-neutral-200 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Scroll Content */}
        <div className="p-6 overflow-y-auto flex-1 font-editorial-sans text-neutral-800 space-y-6">
          {/* Header Identity Card */}
          <div className="flex flex-col sm:flex-row items-start gap-5 border-b border-neutral-200 pb-6">
            <img
              src={specialist.avatarUrl}
              alt={specialist.name}
              referrerPolicy="no-referrer"
              className="w-24 h-24 rounded-2xl object-cover border border-neutral-200 shadow-2xs"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <span className="text-xs font-clinical-mono bg-emerald-50 text-emerald-800 border border-emerald-300 px-2.5 py-0.5 rounded-full font-bold">
                  {specialist.matchScore}% MATCH
                </span>
                <span className="text-xs font-clinical-mono bg-neutral-100 text-neutral-700 border border-neutral-200 px-2.5 py-0.5 rounded-full font-semibold">
                  {specialist.experienceYears} Years Experience
                </span>
                <span className="text-xs font-clinical-mono bg-amber-50 text-amber-800 border border-amber-300 px-2.5 py-0.5 rounded-full font-semibold">
                  In-Network
                </span>
              </div>

              <h3 className="font-editorial-serif text-2xl sm:text-3xl font-bold text-neutral-900">
                {specialist.name}
              </h3>

              <p className="text-sm text-neutral-600 font-editorial-sans">
                {specialist.title} · <span className="font-clinical-mono font-semibold text-neutral-900">{specialist.degrees}</span>
              </p>

              <div className="flex items-center gap-2 text-xs font-clinical-mono text-neutral-600 mt-2">
                <MapPin size={13} className="text-neutral-400" />
                <span>{specialist.clinicLocation}</span>
                <span>·</span>
                <span className="text-amber-500 font-bold flex items-center">
                  <Star size={12} className="fill-amber-400 text-amber-400 mr-0.5" />
                  {specialist.rating} ({specialist.reviewsCount} verified patient reviews)
                </span>
              </div>
            </div>
          </div>

          {/* Clinical Philosophy Quote */}
          <div className="p-4 rounded-2xl bg-[#FFFDF0] border border-amber-200">
            <div className="flex items-center gap-2 text-[11px] font-clinical-mono uppercase tracking-widest text-amber-900 font-bold mb-1.5">
              <Volume2 size={13} className="text-amber-600" />
              Doctor Philosophy & Bedside Approach
            </div>
            <p className="font-editorial-serif text-base text-neutral-900 italic leading-relaxed">
              "{specialist.audioQuote}"
            </p>
          </div>

          {/* Academic Pedigree & Board Specializations */}
          <div>
            <h4 className="text-xs font-clinical-mono uppercase tracking-wider text-neutral-900 font-bold mb-3 flex items-center gap-1.5">
              <Award size={14} className="text-amber-500" />
              Academic Credentials & Certifications
            </h4>
            <div className="space-y-2">
              {specialist.education.map((edu, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 bg-[#FAFAF8] border border-neutral-200 rounded-xl text-xs text-neutral-800">
                  <ShieldCheck size={15} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span className="font-medium text-neutral-900">{edu}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Movement Lab Equipment */}
          <div>
            <h4 className="text-xs font-clinical-mono uppercase tracking-wider text-neutral-900 font-bold mb-3">
              Specialized Movement Diagnostics Available
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-clinical-mono">
              <div className="p-3 bg-[#FAFAF8] border border-neutral-200 rounded-xl text-center">
                <span className="text-neutral-900 font-bold block">FORCE PLATES</span>
                <span className="text-[10px] text-neutral-500">Dual-axis ground reaction</span>
              </div>
              <div className="p-3 bg-[#FAFAF8] border border-neutral-200 rounded-xl text-center">
                <span className="text-neutral-900 font-bold block">240FPS VIDEO</span>
                <span className="text-[10px] text-neutral-500">High-speed plane capture</span>
              </div>
              <div className="p-3 bg-[#FAFAF8] border border-neutral-200 rounded-xl text-center">
                <span className="text-neutral-900 font-bold block">DYNAMOMETRY</span>
                <span className="text-[10px] text-neutral-500">Peak torque isolation</span>
              </div>
              <div className="p-3 bg-[#FAFAF8] border border-neutral-200 rounded-xl text-center">
                <span className="text-neutral-900 font-bold block">ISOKINETICS</span>
                <span className="text-[10px] text-neutral-500">Eccentric loading bench</span>
              </div>
            </div>
          </div>

          {/* Published Clinical Research */}
          <div>
            <h4 className="text-xs font-clinical-mono uppercase tracking-wider text-neutral-900 font-bold mb-3 flex items-center gap-1.5">
              <BookOpen size={14} className="text-neutral-500" />
              Peer-Reviewed Publications & Articles
            </h4>
            <div className="space-y-2">
              {specialist.publishedResearch.map((paper, idx) => (
                <div key={idx} className="p-3 bg-[#FAFAF8] border border-neutral-200 rounded-xl text-xs font-editorial-sans text-neutral-700">
                  <span className="font-semibold text-neutral-900 block mb-0.5">«{paper.split('(')[0].trim()}»</span>
                  <span className="text-[11px] font-clinical-mono text-neutral-500">
                    ({paper.split('(')[1]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Booking Action */}
        <div className="px-6 py-4 border-t border-neutral-200 bg-neutral-50 flex items-center justify-between">
          <div>
            <div className="text-[11px] font-clinical-mono text-neutral-500 uppercase font-semibold">Consultation Fee</div>
            <div className="text-base font-bold text-neutral-900 font-clinical-mono">
              ₹{specialist.consultationFee.toLocaleString()}{' '}
              <span className="text-xs text-neutral-500 font-normal">
                (In-Network Co-pay: <strong className="text-emerald-700 font-bold">₹{specialist.cashlessCopay}</strong>)
              </span>
            </div>
          </div>

          <button
            onClick={() => onBook(specialist, specialist.availableSlots[0])}
            className="bg-[#181816] hover:bg-[#2A2A26] text-[#F9F8F5] font-bold px-6 py-3 rounded-xl text-xs font-clinical-mono uppercase tracking-wider flex items-center gap-2 transition-all shadow-sm border border-[#C59E5F] hover:border-[#DFBA73] hover:shadow-md cursor-pointer"
          >
            <Calendar size={13} className="text-[#DFBA73]" />
            <span>Book with {specialist.name.split(' ')[1]}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
