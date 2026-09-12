import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { JointId } from '../types';
import { 
  Search, MapPin, ShieldCheck, ArrowRight, Star, Clock, 
  CheckCircle2, Calendar, Activity, Sparkles, UserCheck, 
  ChevronRight, Layers, ArrowUpRight, Zap
} from 'lucide-react';
import heroPhysioImage from '../assets/images/hero.png';
import { div } from 'motion/react-client';

// CONTINUOUS ROTATING SERVICES AT KINETIC
const KINETIC_SERVICES = [
  {
    id: 'biomechanics',
    title: 'Biomechanical Joint Rehabilitation',
    subtext: 'Patellar, acetabular & glenohumeral kinematic chain correction',
    category: 'Orthopedic Mechanics',
    code: 'SRV-01'
  },
  {
    id: 'acl-meniscus',
    title: 'Post-Operative ACL & Meniscus Kinematics',
    subtext: 'Bilateral force-plate symmetry & zero-lag acceleration protocols',
    category: 'Surgical Recovery',
    code: 'SRV-02'
  },
  {
    id: 'spine-decompression',
    title: 'Spinal Alignment & Sciatic Decompression',
    subtext: 'Directional mechanical preference & non-surgical disc restoration',
    category: 'Spine Center',
    code: 'SRV-03'
  },
  {
    id: 'rotator-cuff',
    title: 'Rotator Cuff & Overhead Shoulder Mobility',
    subtext: 'Scapulothoracic force balancing & impingement release',
    category: 'Upper Extremity',
    code: 'SRV-04'
  },
  {
    id: 'running-gait',
    title: 'Running Gait & 3D Force-Plate Analysis',
    subtext: 'High-speed 120 FPS motion capture & ground reaction vector tuning',
    category: 'Performance Lab',
    code: 'SRV-05'
  },
  {
    id: 'doctoral-manual',
    title: 'Doctoral Manual Orthopedic Therapy',
    subtext: 'Grade IV capsular glide, joint mobilization & myofascial restoration',
    category: 'Hands-on DPT Care',
    code: 'SRV-06'
  },
  {
    id: 'cervical-equilibrium',
    title: 'Cervical Equilibrium & Ergonomic Health',
    subtext: 'Vestibular balance, suboccipital release & desk posture correction',
    category: 'Cervical Spine',
    code: 'SRV-07'
  }
];

interface HeroSectionProps {
  selectedJoint: JointId;
  onSelectJoint: (id: JointId) => void;
  onStartAssessment: (id?: JointId) => void;
  onExploreBody: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  selectedJoint,
  onSelectJoint,
  onStartAssessment,
  onExploreBody
}) => {
  const [searchJoint, setSearchJoint] = useState<JointId>(selectedJoint);
  const [searchLocation, setSearchLocation] = useState('Bandra West, Mumbai');
  const [searchInsurance, setSearchInsurance] = useState('Star Health Insurance (Cashless)');
  const [searchDate, setSearchDate] = useState('Today (Immediate Openings)');
  const [estimatedCopay, setEstimatedCopay] = useState<number>(350);
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);

  // Automatic ticker for service rotation every 2.8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveServiceIndex((prev) => (prev + 1) % KINETIC_SERVICES.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  const insuranceOptions = [
    { name: 'Star Health Insurance (Cashless)', copay: 350, network: 'Preferred Tier-1' },
    { name: 'HDFC ERGO Health', copay: 400, network: 'Direct Cashless' },
    { name: 'ICICI Lombard Complete Health', copay: 350, network: 'Direct Cashless' },
    { name: 'Care Health (Religare)', copay: 450, network: 'In-Network TPA' },
    { name: 'Bupa / Niva Bupa Global', copay: 300, network: 'Elite Worldwide' },
    { name: 'Self-Pay / Direct Reimbursement', copay: 1840, network: 'Standard Clinic Fee' }
  ];

  const quickCategories: { id: JointId; label: string }[] = [
    { id: 'knee', label: 'Knee & ACL' },
    { id: 'spine', label: 'Spine & Sciatica' },
    { id: 'shoulder', label: 'Shoulder & Rotator Cuff' },
    { id: 'hip', label: 'Hip & Pelvis' },
    { id: 'ankle', label: 'Ankle & Achilles' },
    { id: 'cervical', label: 'Neck & Cervical' }
  ];

  const handleInsuranceChange = (name: string) => {
    setSearchInsurance(name);
    const match = insuranceOptions.find((opt) => opt.name === name);
    if (match) {
      setEstimatedCopay(match.copay);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSelectJoint(searchJoint);
    const specialistsSection = document.getElementById('specialists');
    if (specialistsSection) {
      specialistsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePillClick = (jointId: JointId) => {
    setSearchJoint(jointId);
    onSelectJoint(jointId);
  };

  const currentService = KINETIC_SERVICES[activeServiceIndex] || KINETIC_SERVICES[0];

  return (
    <section className="relative w-full overflow-hidden border-b border-neutral-200 bg-neutral-950">
      
      {/* 🛑 FULL-WIDTH ANIMATING PHYSIOTHERAPY BACKGROUND STAGE 🛑 */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0">
        <motion.img
          src={heroPhysioImage}
          alt="Doctor of Physical Therapy guiding a patient through biomechanical joint rehabilitation"
          referrerPolicy="no-referrer"
          animate={{ scale: [1, 1.025, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          className="w-full h-full object-cover object-center md:object-[center_35%]"
        />

        {/* Clean daylight scrims keep the clinical image visible while protecting text contrast. */}
        <div className="absolute inset-0 bg-linear-to-r from-neutral-950/70 via-neutral-950/34 to-neutral-950/8" />
        <div className="absolute inset-0 bg-linear-to-b from-neutral-950/20 via-transparent to-neutral-950/54" />
        <div className="absolute inset-0 bg-white/5 mix-blend-soft-light" />
      </div>

      {/* 🛑 CORE EDITORIAL CONTAINER 🛑 */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-14 md:pt-18 md:pb-20">
        
        {/* ══════════════════════════════════════════════════════════════════
            1. UPPER HERO CONTENT WITH THEME BORDER & ROTATING MOTION SERVICES
            ══════════════════════════════════════════════════════════════════ */}
        <div className="relative border-2 border-white/35 bg-neutral-950/48 p-7 sm:p-10 lg:p-12 overflow-hidden mb-8">
          
          {/* Theme Architectural Corner Crosshair Accents */}
          <div className="absolute top-3 left-3 text-neutral-600 font-clinical-mono text-xs select-none pointer-events-none">
            +
          </div>
          <div className="absolute top-3 right-3 text-neutral-600 font-clinical-mono text-xs select-none pointer-events-none">
            +
          </div>
          <div className="absolute bottom-3 left-3 text-neutral-600 font-clinical-mono text-xs select-none pointer-events-none">
            +
          </div>
          <div className="absolute bottom-3 right-3 text-neutral-600 font-clinical-mono text-xs select-none pointer-events-none">
            +
          </div>

          {/* Glowing Ambient Radial Backdrop with Kintsugi Warmth */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-white/5 blur-3xl pointer-events-none -z-10" />

          {/* Top Status & Accreditation Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-white/10 mb-6">
            
            <div className="flex items-center gap-2.5">
              <span className="flex items-center gap-1.5 bg-white/15 backdrop-blur-md border border-white/30 px-3 py-1 rounded-full text-xs font-clinical-mono text-white font-bold tracking-wider shadow-lg shadow-black/10">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                DOCTORAL PHYSICAL THERAPY &amp; MOTION LABS
              </span>
              {/* <span className="hidden sm:inline text-neutral-500 font-clinical-mono text-xs">·</span>
              <span className="hidden sm:inline font-clinical-mono text-xs text-neutral-300">
                Direct Access Care (No Doctor Referral Required)
              </span> */}
            </div>

            {/* Live Service Indicator Badge */}
            <div className="flex items-center gap-2 text-xs font-clinical-mono text-[#FFF04B] bg-[#FFF04B]/15 px-3 py-1 rounded-full border border-[#FFF04B]/30">
              <Activity size={13} className="text-[#FFF04B]" />
              <span className="font-bold uppercase tracking-wider">Kinematic Specialization:</span>
              <span className="text-white font-bold">{currentService.code}</span>
            </div>
          </div>

          {/* Hero Grid: Main Display Typography + Live Motion Services Display */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left 8 Cols: Display Headline with Smooth Rotating Services Motion */}
            <div className="lg:col-span-8">
              
              {/* <div className="text-xs sm:text-sm font-clinical-mono uppercase tracking-[0.22em] text-[#DFBA73] font-bold mb-2.5 flex items-center gap-2">
                <Sparkles size={14} className="text-[#DFBA73]" />
                <span>「間」Ma ·「渋」Shibui ·「侘寂」Wabi-Sabi Biomechanical Excellence</span>
              </div> */}

              {/* Main Headline with Animated Rotating Text */}
              <h1 className="font-editorial-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3.4rem] font-normal tracking-tight text-white leading-[1.1] mb-4">
                Clinical physical therapy for{' '}
                <span className="inline-block relative min-h-[1.25em] align-top text-[#FFF04B]">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={currentService.id}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={{
                        hidden: {},
                        visible: {},
                        exit: { opacity: 0, y: -8, transition: { duration: 0.18 } }
                      }}
                      className="font-editorial-serif italic inline-block font-semibold text-[#FFF04B]"
                      aria-label={`${currentService.title}.`}
                    >
                      {`${currentService.title}.`.split(' ').map((word, index) => (
                        <span key={`${currentService.id}-${word}-${index}`} className="inline-block overflow-hidden align-bottom">
                          <motion.span
                            initial={{ opacity: 0, y: '100%' }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: 0.38,
                              delay: index * 0.065,
                              ease: [0.22, 1, 0.36, 1]
                            }}
                            className="inline-block"
                          >
                            {word}
                          </motion.span>
                          {index < currentService.title.split(' ').length - 1 && ' '}
                        </span>
                      ))}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </h1>

              {/* Dynamic Service Sub-Description with Fade Transition */}
              <div className="min-h-10 mb-5">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentService.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, delay: 0.28 }}
                    className="flex items-center gap-2 text-sm sm:text-base text-neutral-100 font-editorial-sans"
                  >
                    <span className="px-2 py-0.5 rounded-md bg-[#FFF04B]/15 font-clinical-mono text-xs font-bold text-[#FFF04B] border border-[#FFF04B]/30">
                      {currentService.category}
                    </span>
                    <span>{currentService.subtext}</span>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Value Proposition Description */}
              {/* <p className="text-sm sm:text-base text-neutral-300 font-editorial-sans leading-relaxed max-w-2xl">
                Experience 60-minute one-on-one sessions exclusively with Board-Certified Doctors of Physical Therapy (DPTs). We diagnose your entire kinetic chain using 3D motion analysis, followed by verified cashless claims with Star Health, HDFC ERGO, ICICI Lombard & Bupa.
              </p> */}  

            </div>

            {/* Right 4 Cols: Live Clinical Telemetry Snapshot & Immediate Slot */}
            <div className="lg:col-span-4 flex flex-col gap-3.5">
              
              {/* Doctor On Duty Card */}
              <div className="bg-white/16 border border-white/30 rounded-2xl p-4 real-shadow-lg shadow-black/20">
                <div className="flex items-center justify-between text-[11px] font-clinical-mono text-neutral-200 mb-2 pb-2 border-b border-white/10">
                  <span className="flex items-center gap-1.5 text-emerald-400 font-bold uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Bandra Flagship Active
                  </span>
                  <span className="text-white font-bold">TODAY</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-neutral-900 border border-neutral-700 text-white flex items-center justify-center font-editorial-serif text-base font-bold shrink-0">
                    PS
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-white text-sm font-editorial-sans truncate">
                        Dr. Priya Sharma
                      </span>
                      <span className="text-[10px] font-clinical-mono bg-white/20 text-neutral-100 font-semibold px-1 rounded-sm">
                        DPT
                      </span>
                    </div>
                    <div className="text-xs text-neutral-200 font-editorial-sans truncate">
                      Director of Kinematics · 12 Yrs
                    </div>
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2 text-center text-xs font-clinical-mono">
                  <div className="bg-black/40 rounded-lg p-1.5 border border-white/10">
                    <span className="text-[9px] text-neutral-400 block">AXIS ROM</span>
                    <span className="text-white font-bold">118° NORMAL</span>
                  </div>
                  <div className="bg-black/40 rounded-lg p-1.5 border border-white/10">
                    <span className="text-[9px] text-neutral-400 block">SYMMETRY</span>
                    <span className="text-emerald-400 font-bold">96.4% BILATERAL</span>
                  </div>
                </div>
              </div>

    
              <div className="bg-[#181816]/82 backdrop-blur-md text-[#F9F8F5] rounded-2xl p-3.5 border border-[#FFF04B]/70 real-shadow-lg shadow-black/25 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#FFF04B]/15 text-[#FFF04B] flex items-center justify-center shrink-0 border border-[#FFF04B]/30">
                    <Calendar size={16} />
                  </div>
                  <div>
                    <div className="text-[9px] font-clinical-mono font-bold uppercase tracking-wider text-[#FFF04B]">
                      Next Available Session
                    </div>
                    <div className="text-sm font-bold font-clinical-mono text-white">
                      Today · 4:15 PM
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onStartAssessment(selectedJoint)}
                  className="bg-[#FFF04B] hover:bg-[#FFF79A] text-[#181816] px-3.5 py-2 rounded-xl text-xs font-bold font-clinical-mono uppercase tracking-wider flex items-center gap-1 cursor-pointer transition-all hover:scale-105 active:scale-95"
                >
                  <span>Book Your Appointment</span>
                  <ArrowRight size={12} />
                </button>
              </div>

            </div>

          </div>

          {/* Bottom Trust Indicators Strip inside the Framed Hero */}
          <div className="mt-6 pt-4 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-clinical-mono text-neutral-200">
            <div className="flex items-center gap-2">
              <Star size={14} className="fill-[#FFF04B] text-[#FFF04B] shrink-0" />
              <span>
                <strong className="text-white">4.96/5.0</strong> (2,840+ Outcomes)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={14} className="text-emerald-400 shrink-0" />
              <span>
                <strong className="text-white">&lt; 15-Min</strong> Punctuality
              </span>
            </div>
            <div className="flex items-center gap-2">
              <UserCheck size={14} className="text-[#FFF04B] shrink-0" />
              <span>
                <strong className="text-white">60-Min</strong> 1-on-1 Doctoral Care
              </span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck size={14} className="text-emerald-400 shrink-0" />
              <span>
                <strong className="text-white">100% Cashless</strong> In-Network TPA
              </span>
            </div>
          </div>

        </div>


        {/* ══════════════════════════════════════════════════════════════════
            2. FULL-WIDTH FIND CARE CONSOLE (MA INTERVAL & WASHI TEXTURE)
            ══════════════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="w-full bg-white rounded-3xl border border-[#E5E1D8] real-shadow-xl overflow-hidden"
        >
          {/* Quick Joint Focus Tabs Strip */}
          <div className="bg-[#F9F8F5] border-b border-[#E5E1D8] px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-2 shrink-0">
              <span className="w-2 h-2 rounded-full bg-[#181816]" />
              <span className="text-[11px] font-clinical-mono uppercase tracking-wider font-bold text-[#5A5750]">
                Anatomical Focus:
              </span>
            </div>
            
            <div className="flex items-center gap-1.5 shrink-0">
              {quickCategories.map((cat) => {
                const isActive = searchJoint === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handlePillClick(cat.id)}
                    className={`text-xs px-3 py-1 rounded-xl font-medium font-editorial-sans transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#181816] text-white shadow-xs scale-105'
                        : 'bg-white text-[#4A4843] border border-[#E5E1D8] hover:bg-[#F2EFE8]'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Full-Width 4-Segment Connected Search Console */}
          <form onSubmit={handleSearchSubmit} className="p-3 sm:p-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              
              {/* Segment 1: Condition / Joint (md:col-span-3) */}
              <div className="md:col-span-3 flex items-center gap-2.5 px-3.5 py-2.5 bg-neutral-50 rounded-2xl border-2 border-neutral-200 hover:border-neutral-950 focus-within:border-neutral-950 focus-within:bg-white transition-all duration-150">
                <div className="w-8 h-8 rounded-xl bg-neutral-200/80 flex items-center justify-center shrink-0 text-neutral-800">
                  <Search size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <label className="block text-[9px] font-clinical-mono uppercase font-bold text-neutral-500 tracking-wider">
                    Condition / Joint
                  </label>
                  <select
                    aria-label="Condition or Joint"
                    value={searchJoint}
                    onChange={(e) => {
                      const val = e.target.value as JointId;
                      setSearchJoint(val);
                      onSelectJoint(val);
                    }}
                    className="w-full text-xs font-bold text-neutral-900 bg-transparent focus:outline-hidden cursor-pointer"
                  >
                    <option value="knee">Knee · ACL, Meniscus & Patella</option>
                    <option value="spine">Lower Back · Disc & Sciatica</option>
                    <option value="shoulder">Shoulder · Rotator Cuff & Labrum</option>
                    <option value="hip">Hip · Impingement & Pelvis</option>
                    <option value="ankle">Ankle · Achilles & Plantar Fascia</option>
                    <option value="cervical">Neck · Cervical & Posture</option>
                  </select>
                </div>
              </div>

              {/* Segment 2: Flagship Motion Lab Location (md:col-span-3) */}
              <div className="md:col-span-3 flex items-center gap-2.5 px-3.5 py-2.5 bg-neutral-50 rounded-2xl border-2 border-neutral-200 hover:border-neutral-950 focus-within:border-neutral-950 focus-within:bg-white transition-all duration-150">
                <div className="w-8 h-8 rounded-xl bg-neutral-200/80 flex items-center justify-center shrink-0 text-neutral-800">
                  <MapPin size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <label className="block text-[9px] font-clinical-mono uppercase font-bold text-neutral-500 tracking-wider">
                    Flagship Lab Location
                  </label>
                  <select
                    aria-label="Location or Motion Lab"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    className="w-full text-xs font-bold text-neutral-900 bg-transparent focus:outline-hidden cursor-pointer"
                  >
                    <option value="Bandra West, Mumbai">Bandra West · Mumbai Flagship</option>
                    <option value="Indiranagar, Bengaluru">Indiranagar · Bengaluru Flagship</option>
                    <option value="Vasant Vihar, New Delhi">Vasant Vihar · New Delhi Flagship</option>
                    <option value="Mayfair, London">Mayfair · London Kinematic Lab</option>
                    <option value="Tele-Rehab / Video">Tele-Rehab · High-Def Video Suite</option>
                  </select>
                </div>
              </div>

              {/* Segment 3: Insurance Carrier & Co-pay (md:col-span-3) */}
              <div className="md:col-span-3 flex items-center gap-2.5 px-3.5 py-2.5 bg-neutral-50 rounded-2xl border-2 border-neutral-200 hover:border-neutral-950 focus-within:border-neutral-950 focus-within:bg-white transition-all duration-150">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0 text-emerald-800">
                  <ShieldCheck size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <label className="block text-[9px] font-clinical-mono uppercase font-bold text-neutral-500 tracking-wider">
                      Insurance (Cashless)
                    </label>
                    <span className="text-[10px] font-clinical-mono text-emerald-700 font-extrabold">
                      ₹{estimatedCopay}
                    </span>
                  </div>
                  <select
                    aria-label="Insurance Carrier"
                    value={searchInsurance}
                    onChange={(e) => handleInsuranceChange(e.target.value)}
                    className="w-full text-xs font-bold text-neutral-900 bg-transparent focus:outline-hidden cursor-pointer truncate"
                  >
                    {insuranceOptions.map((opt) => (
                      <option key={opt.name} value={opt.name}>
                        {opt.name.split('(')[0]}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Segment 4: Preferred Date & Full-Height Primary Action CTA (md:col-span-3) */}
              <div className="md:col-span-3 flex items-center gap-2">
                
                {/* Date Preference Dropdown */}
                <div className="flex-1 min-w-0 flex items-center gap-2 px-3 py-2.5 bg-neutral-50 rounded-2xl border-2 border-neutral-200 hover:border-neutral-950 focus-within:border-neutral-950 focus-within:bg-white transition-all duration-150">
                  <Calendar size={15} className="text-neutral-500 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <label className="block text-[9px] font-clinical-mono uppercase font-bold text-neutral-500 tracking-wider">
                      Date
                    </label>
                    <select
                      aria-label="Appointment Date"
                      value={searchDate}
                      onChange={(e) => setSearchDate(e.target.value)}
                      className="w-full text-xs font-bold text-neutral-900 bg-transparent focus:outline-hidden cursor-pointer truncate"
                    >
                      <option value="Today (Immediate Openings)">Today (Immediate)</option>
                      <option value="Tomorrow (Morning & Eve)">Tomorrow</option>
                      <option value="This Week (Flexible)">This Week</option>
                      <option value="Saturday Special Lab">Saturday Clinic</option>
                    </select>
                  </div>
                </div>

                {/* The Big Kinetic "FIND CARE" Button in Shibui Craft */}
                <button
                  type="submit"
                  className="bg-[#FFF04B] hover:bg-[#FFF79A] text-[#181816] font-semibold text-xs uppercase tracking-wider px-6 py-3.5 rounded-2xl transition-all duration-150 real-shadow-sm hover:real-shadow-md flex items-center justify-center gap-2 shrink-0 cursor-pointer border border-[#FFF04B] hover:border-[#FFF79A] hover:scale-105 active:scale-95"
                >
                  <Search size={15} className="text-[#181816]" />
                  <span className="font-clinical-mono">FIND CARE</span>
                  <ArrowRight size={14} className="text-[#181816]" />
                </button>

              </div>

            </div>

            {/* Bottom Real-Time Verification Strip inside the Search Console */}
            {/* <div className="mt-3 pt-3 border-t border-neutral-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs font-editorial-sans text-neutral-700">
              
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="flex items-center gap-1 font-bold text-emerald-800">
                  <CheckCircle2 size={13} className="text-emerald-600" />
                  {searchInsurance.split('(')[0]}
                </span>
                <span className="text-neutral-300">·</span>
                <span>
                  In-Network Cashless Co-pay: <strong className="text-emerald-700 font-extrabold font-clinical-mono">₹{estimatedCopay}</strong>
                  <span className="text-neutral-500 ml-1">(Regular: ₹1,840)</span>
                </span>
                <span className="text-neutral-300">·</span>
                <span className="text-neutral-600 font-medium">
                  Direct Access · Zero doctor referral required
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => onStartAssessment(selectedJoint)}
                  className="text-[#181816] hover:text-[#C59E5F] font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Instant Eligibility Verification</span>
                  <ArrowRight size={12} />
                </button>
              </div>

            </div> */}
          </form>
        </motion.div>

      </div>

      {/* 🛑 ARCHITECTURAL FLAGSHIP LABS FOOTER BANNER 🛑 */}
      {/* <div className="relative z-10 bg-[#FFF04B] backdrop-blur-md text-[#181816] py-3 text-xs font-clinical-mono border-t border-white/10 real-shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-2 text-[11px]">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold">✓</span>
            <span className="font-bold tracking-wider uppercase">
              FLAGSHIP MOTION LABS:
            </span>
            <span className="text-[#181816]">
              Mumbai (Bandra) · Bengaluru (Indiranagar) · New Delhi (Vasant Vihar) · London (Mayfair)
            </span>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <span>Star Health · HDFC ERGO · ICICI Lombard · Bupa</span>
            <span className="text-emerald-400 font-semibold">100% Cashless TPA Approved</span>
          </div>
        </div>
      </div> */}

    </section>
  );
};
