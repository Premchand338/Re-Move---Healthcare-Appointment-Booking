import React, { useState, useEffect } from 'react';
import { Specialist, JointId } from '../types';
import { SPECIALISTS_DATA } from '../data/clinicalData';
import { Play, Pause, Volume2, Star, Check, Info, FileText, Calendar, ArrowRight, ShieldCheck, MapPin, Clock, Video, Building, CheckCircle2 } from 'lucide-react';

interface SpecialistFacultyProps {
  onOpenDossier: (specialist: Specialist) => void;
  onBookAppointment: (specialist: Specialist, slot: string) => void;
}

export const SpecialistFaculty: React.FC<SpecialistFacultyProps> = ({
  onOpenDossier,
  onBookAppointment
}) => {
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const [selectedJointFilter, setSelectedJointFilter] = useState<string>('all');
  const [inNetworkOnly, setInNetworkOnly] = useState<boolean>(true);
  const [selectedSlots, setSelectedSlots] = useState<Record<string, string>>({
    'sarah-chen': '6:30 PM',
    'marcus-vance': '5:30 PM',
    'elena-rostova': '6:30 PM'
  });
  const [showMatchInfoId, setShowMatchInfoId] = useState<string | null>(null);
  const [audioProgress, setAudioProgress] = useState(0);

  // Simulated audio playback ticker
  useEffect(() => {
    let interval: any;
    if (playingAudioId) {
      interval = setInterval(() => {
        setAudioProgress((prev) => {
          if (prev >= 100) {
            setPlayingAudioId(null);
            return 0;
          }
          return prev + 6;
        });
      }, 500);
    } else {
      setAudioProgress(0);
    }
    return () => clearInterval(interval);
  }, [playingAudioId]);

  const toggleAudio = (id: string) => {
    if (playingAudioId === id) {
      setPlayingAudioId(null);
    } else {
      setPlayingAudioId(id);
      setAudioProgress(0);
    }
  };

  const handleSlotSelect = (specialistId: string, slot: string) => {
    setSelectedSlots((prev) => ({
      ...prev,
      [specialistId]: slot
    }));
  };

  // Filtered doctors
  const filteredSpecialists = SPECIALISTS_DATA.filter((specialist) => {
    if (selectedJointFilter !== 'all') {
      const joint = selectedJointFilter.toLowerCase();
      const matchesCategory = specialist.category.toLowerCase() === joint;
      const matchesSpecialization = specialist.specialization.toLowerCase().includes(joint);
      const matchesFocus = specialist.focusTags.some((tag) => tag.toLowerCase().includes(joint));
      const matchesAnkle = joint === 'ankle' && (specialist.specialization.toLowerCase().includes('gait') || specialist.focusTags.some(t => t.toLowerCase().includes('running')));
      return matchesCategory || matchesSpecialization || matchesFocus || matchesAnkle;
    }
    return true;
  });

  return (
    <section id="specialists" className="py-16 md:py-24 border-b border-neutral-200 bg-[#FAFAF8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Elevated UX Hierarchy */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-clinical-mono text-xs uppercase tracking-[0.22em] text-neutral-500 font-extrabold">
                Doctoral Physical Therapy Directory · Verified Matching
              </span>
            </div>

            <h2 className="font-editorial-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-neutral-900 leading-[1.12]">
              Book top doctoral clinicians in minutes.
            </h2>

            <p className="mt-3.5 text-base sm:text-lg text-neutral-600 font-editorial-sans leading-relaxed">
              Every clinician at Kinetic holds a clinical doctorate (DPT) or board sub-specialization. Direct 60-minute one-on-one appointments with verified in-network cashless insurance claims.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <button
              onClick={() => onOpenDossier(SPECIALISTS_DATA[0])}
              className="inline-flex items-center gap-2 bg-white hover:bg-neutral-100 text-neutral-950 border-2 border-neutral-900 text-xs font-black uppercase tracking-wider px-5 py-3 rounded-2xl transition-all cursor-pointer real-shadow-xs hover:real-shadow-md"
            >
              <span>View Faculty Dossier</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>

        {/* Interactive Filter & Sorting Bar with Clean UX */}
        <div className="bg-white border-2 border-neutral-900 rounded-3xl p-4 sm:p-5 mb-8 real-shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-clinical-mono text-neutral-500 font-bold mr-1 uppercase">
              Filter By Joint:
            </span>
            {[
              { id: 'all', label: 'All Conditions' },
              { id: 'knee', label: 'Knee & ACL' },
              { id: 'spine', label: 'Spine & Back' },
              { id: 'shoulder', label: 'Shoulder' },
              { id: 'hip', label: 'Hip & Pelvis' },
              { id: 'ankle', label: 'Ankle & Foot' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedJointFilter(tab.id)}
                className={`text-xs px-3.5 py-1.5 rounded-xl font-bold font-editorial-sans transition-all cursor-pointer border ${
                  selectedJointFilter === tab.id
                    ? 'bg-neutral-950 text-white border-neutral-950 shadow-xs scale-102'
                    : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:bg-neutral-100 hover:border-neutral-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 text-xs font-clinical-mono shrink-0">
            <label className="flex items-center gap-2 cursor-pointer text-neutral-800 font-bold bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
              <input
                type="checkbox"
                checked={inNetworkOnly}
                onChange={(e) => setInNetworkOnly(e.target.checked)}
                className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4 cursor-pointer"
              />
              <span className="text-emerald-900">In-Network Only (Cashless)</span>
            </label>
          </div>
        </div>

        {/* 3-Column Specialist Grid System */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {filteredSpecialists.map((specialist) => {
            const currentSlot = selectedSlots[specialist.id] || specialist.availableSlots[0];
            const isPlaying = playingAudioId === specialist.id;
            const isMatchOpen = showMatchInfoId === specialist.id;

            return (
              <div
                key={specialist.id}
                id={`card-${specialist.id}`}
                className="bg-white border-2 border-neutral-200 hover:border-neutral-950 hover:-translate-y-1 rounded-3xl p-5 sm:p-6 real-shadow-sm hover:real-shadow-xl flex flex-col justify-between transition-all duration-150 group"
              >
                <div>
                  {/* Top Match & Network Badge Row */}
                  <div className="flex items-center justify-between border-b border-neutral-200 pb-3 mb-4">
                    <div className="flex items-center gap-1.5 bg-emerald-100/80 text-emerald-900 border border-emerald-300 px-3 py-1 rounded-full text-[11px] font-clinical-mono font-black">
                      <CheckCircle2 size={13} className="text-emerald-700" />
                      <span>{specialist.matchScore}% MATCH · IN-NETWORK</span>
                    </div>

                    <button
                      onClick={() => setShowMatchInfoId(isMatchOpen ? null : specialist.id)}
                      className="text-[11px] font-editorial-sans text-neutral-500 hover:text-neutral-950 font-bold underline decoration-neutral-300 underline-offset-2 transition-colors cursor-pointer"
                    >
                      why matched?
                    </button>
                  </div>

                  {/* Expandable "Why this match" explanation */}
                  {isMatchOpen && (
                    <div className="mb-4 p-3 bg-neutral-50 border border-neutral-200 rounded-2xl text-xs text-neutral-700">
                      <p className="font-clinical-mono text-[10px] uppercase font-bold text-neutral-900 mb-1.5">
                        Clinical Match Determinants:
                      </p>
                      <ul className="space-y-1">
                        {specialist.matchReasons.map((reason, idx) => (
                          <li key={idx} className="flex items-start gap-1.5 text-[11px]">
                            <span className="text-emerald-700 font-bold">✓</span>
                            <span>{reason}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Specialist Avatar & Doctor Details */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="relative shrink-0">
                      <img
                        src={specialist.avatarUrl}
                        alt={specialist.name}
                        referrerPolicy="no-referrer"
                        className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl object-cover border-2 border-neutral-900 real-shadow-xs"
                      />
                      <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-editorial-serif text-lg sm:text-xl font-bold text-neutral-950 truncate">
                        {specialist.name}
                      </h3>
                      <p className="text-xs text-neutral-600 font-editorial-sans truncate font-medium">
                        {specialist.title}
                      </p>
                      
                      {/* Star Rating & Experience */}
                      <div className="flex items-center gap-1.5 text-xs font-clinical-mono text-neutral-600 mt-1.5">
                        <span className="flex items-center text-neutral-950 font-bold">
                          <Star size={13} className="fill-amber-400 text-amber-400 mr-1" />
                          {specialist.rating}
                        </span>
                        <span className="text-neutral-400">·</span>
                        <span className="text-neutral-600 font-medium">180+ reviews</span>
                        <span className="text-neutral-400">·</span>
                        <span className="text-neutral-600 font-medium">{specialist.experienceYears}y exp</span>
                      </div>

                      {/* Location & Wait Time Guarantee */}
                      <div className="flex items-center gap-1 text-[11px] text-neutral-500 font-editorial-sans mt-1">
                        <MapPin size={11} className="text-neutral-400 shrink-0" />
                        <span className="truncate font-medium">Bandra Movement Lab (1.2 km away)</span>
                      </div>
                    </div>
                  </div>

                  {/* Audio Introduction Snippet */}
                  <div className="mb-4 bg-[#F9F8F5] border border-[#E5E1D8] rounded-2xl p-2.5 flex items-center justify-between gap-2">
                    <button
                      onClick={() => toggleAudio(specialist.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-clinical-mono transition-all cursor-pointer font-bold ${
                        isPlaying
                          ? 'bg-[#3E5647] text-white'
                          : 'bg-[#181816] text-[#F9F8F5] hover:bg-[#2A2A26] border border-[#C59E5F]'
                      }`}
                    >
                      {isPlaying ? <Pause size={12} /> : <Play size={12} className="ml-0.5 text-[#DFBA73]" />}
                      <span>{isPlaying ? 'PAUSE' : `Listen 0:${specialist.audioIntroSeconds}`}</span>
                    </button>

                    <div className="flex-1 flex flex-col justify-center min-w-0">
                      <span className="text-[10px] font-clinical-mono text-neutral-600 truncate font-semibold">
                        {isPlaying ? 'Clinical Philosophy Voice Note' : 'Doctor introduction & rationale'}
                      </span>
                      {isPlaying && (
                        <div className="w-full bg-neutral-200 h-1.5 rounded-full mt-1 overflow-hidden">
                          <div
                            className="bg-emerald-500 h-full transition-all duration-300"
                            style={{ width: `${audioProgress}%` }}
                          />
                        </div>
                      )}
                    </div>

                    <Volume2 size={14} className="text-neutral-500 shrink-0" />
                  </div>

                  {/* Clinical Focus Badges */}
                  <div className="space-y-1.5 mb-4">
                    {specialist.focusTags.slice(0, 3).map((tag, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-xs text-neutral-700">
                        <Check size={13} className="text-emerald-600 shrink-0" />
                        <span className="truncate font-medium">{tag}</span>
                      </div>
                    ))}
                  </div>

                  {/* Pricing and Co-pay Breakdown */}
                  <div className="py-2.5 px-3 bg-neutral-50 border border-neutral-200 rounded-2xl flex items-center justify-between text-xs mb-5 font-clinical-mono">
                    <span className="text-neutral-500">Regular Fee:</span>
                    <div className="text-right">
                      <span className="text-neutral-400 line-through mr-1.5">₹{specialist.consultationFee.toLocaleString()}</span>
                      <span className="text-neutral-800 text-[11px]">
                        Cashless Co-pay: <strong className="text-emerald-700 font-black text-sm">₹{specialist.cashlessCopay}</strong>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Slots & Booking Action */}
                <div>
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-[11px] font-clinical-mono text-neutral-700 font-bold mb-2">
                      <span className="flex items-center gap-1">
                        <Clock size={12} className="text-neutral-500" />
                        Available Tomorrow · Thu Sep 4
                      </span>
                      <span className="text-emerald-800 text-[10px] bg-emerald-100/70 px-2 py-0.5 rounded-md border border-emerald-300 font-bold">
                        In-Person & Video
                      </span>
                    </div>

                    {/* Multi-Slot Time Grid */}
                    <div className="grid grid-cols-3 gap-2">
                      {specialist.availableSlots.map((slot) => {
                        const isChosen = currentSlot === slot;
                        return (
                          <button
                            key={slot}
                            onClick={() => handleSlotSelect(specialist.id, slot)}
                            className={`py-2 px-2 text-xs font-clinical-mono rounded-xl border transition-all duration-150 cursor-pointer text-center font-bold ${
                              isChosen
                                ? 'bg-[#181816] text-[#F9F8F5] border-[#C59E5F] real-shadow-2xs scale-102'
                                : 'bg-[#F9F8F5] text-[#5A5750] border-[#E5E1D8] hover:bg-white hover:border-[#181816] hover:-translate-y-0.5 active:scale-95'
                            }`}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Card Bottom CTA Grid */}
                  <div className="grid grid-cols-12 gap-2 pt-2">
                    <button
                      onClick={() => onOpenDossier(specialist)}
                      className="col-span-4 bg-white border-2 border-neutral-300 hover:border-neutral-950 hover:bg-neutral-50 text-neutral-800 hover:text-neutral-950 text-xs font-bold py-2.5 rounded-2xl transition-all duration-150 flex items-center justify-center gap-1 cursor-pointer active:scale-95"
                    >
                      <FileText size={13} />
                      <span>Profile</span>
                    </button>

                    <button
                      id={`book-specialist-${specialist.id}`}
                      onClick={() => onBookAppointment(specialist, currentSlot)}
                      className="col-span-8 bg-[#181816] hover:bg-[#2A2A26] text-[#F9F8F5] text-xs font-bold uppercase tracking-wider py-2.5 rounded-2xl transition-all duration-150 flex items-center justify-center gap-1.5 real-shadow-sm border border-[#C59E5F] hover:border-[#DFBA73] hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                    >
                      <Calendar size={13} className="text-[#DFBA73]" />
                      <span>Book {currentSlot}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
