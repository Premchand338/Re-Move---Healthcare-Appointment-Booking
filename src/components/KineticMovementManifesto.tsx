import React, { useState } from 'react';
import { Activity, ArrowRight, ShieldCheck, Zap, Sparkles, Layers, RefreshCw } from 'lucide-react';

interface KineticMovementManifestoProps {
  onExploreTriage?: () => void;
}

export const KineticMovementManifesto: React.FC<KineticMovementManifestoProps> = ({
  onExploreTriage
}) => {
  const [activePillar, setActivePillar] = useState<number>(0);

  return null;

  // const pillars = [
  //   {
  //     id: 'ma',
  //     kanji: '間',
  //     tag: '間 · MA · PRINCIPLE 01',
  //     title: 'The Spatial Interval: Decompression & Kinetic Space',
  //     metric: 'Micro-Joint Space Restoration',
  //     subtitle: 'Healing requires anatomical breathing room between compressed structures',
  //     description:
  //       'In Japanese philosophy, "Ma" (間) defines the sacred interval and pause that gives form its purpose. In human kinematics, chronic pain is born when intervertebral discs, nerve roots, and articular cartilage lose their spatial interval under prolonged compression. We restore this architectural breathing room through precision vector mobilization.',
  //     clinicalTakeaway: 'Restores joint congruence and inter-articular interval.'
  //   },
  //   {
  //     id: 'shibui',
  //     kanji: '渋',
  //     tag: '渋 · SHIBUI · PRINCIPLE 02',
  //     title: 'Unadorned Clinical Precision Over Superficial Gimmicks',
  //     metric: '100% Active Doctoral Care',
  //     subtitle: 'Subtle, restrained mastery replaces noisy passive gadgetry',
  //     description:
  //       '"Shibui" (渋い) represents profound understated elegance, deep competence, and the rejection of superficial noise. While conventional clinics rely on heat pads, ultrasound placebos, and unsupervised machine rows, our doctoral faculty practice quiet, disciplined hands-on manual recalibration and calibrated mechanobiology.',
  //     clinicalTakeaway: 'Zero passive machine placebos. Dedicated doctor-to-patient focus.'
  //   },
  //   {
  //     id: 'wabi-sabi',
  //     kanji: '侘寂',
  //     tag: '侘寂 · WABI-SABI · PRINCIPLE 03',
  //     title: 'Harmonizing Asymmetry Into Organic Resilient Equilibrium',
  //     metric: 'Bilateral Dynamic Equilibrium',
  //     subtitle: 'Honoring natural lived anatomy rather than forcing rigid synthetic mechanics',
  //     description:
  //       '"Wabi-Sabi" (侘寂) finds harmony in natural simplicity and organic human form. The skeletal system is not a rigid factory-stamped assembly; everyday dominance and past injuries create natural asymmetry. Rather than enforcing rigid artificial geometry, we cultivate organic, resilient kinetic harmony that moves effortlessly.',
  //     clinicalTakeaway: 'Personalized kinetic trajectory tailored to lived anatomy.'
  //   }
  // ];

  // return (
  //   <section id="kinetic-manifesto" className="py-20 md:py-28 bg-[#F9F8F5] border-b border-[#E5E1D8] relative overflow-hidden">
  //     {/* Subtle architectural Shoji background guide lines (Ma Interval) */}
  //     <div className="absolute inset-0 bg-grid-subtle opacity-60 pointer-events-none" />

  //     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
  //       {/* Top Editorial Ribbon: Etymology & Japanese Clinical Philosophy */}
  //       <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#E5E1D8] mb-12">
  //         <div className="max-w-2xl">
  //           <div className="flex items-center gap-2.5 mb-3">
  //             <span className="w-2 h-2 rounded-full bg-[#181816]" />
  //             <span className="font-clinical-mono text-xs uppercase tracking-[0.2em] text-[#7A766E] font-bold">
  //               Clinical Philosophy · 「間・渋・侘寂」 The Kinetic Thesis
  //             </span>
  //           </div>

  //           <h2 className="font-editorial-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-normal tracking-tight text-[#181816] leading-[1.14]">
  //             Where anatomical interval restores natural balance: The <span className="italic font-light">Kinetic</span> standard.
  //           </h2>
  //         </div>

  //         {/* Japanese & Greek Etymological Dossier Badge */}
  //         <div className="bg-white p-5 rounded-2xl border border-[#E5E1D8] real-shadow-sm max-w-sm shrink-0">
  //           <div className="flex items-center justify-between font-clinical-mono text-[11px] text-[#7A766E] mb-1.5 border-b border-[#F2EFE8] pb-1.5">
  //             <span className="font-bold text-[#181816] uppercase tracking-wider">Root Philosophy</span>
  //             <span>間 (Ma) · κίνησις (Kinesis)</span>
  //           </div>
  //           <div className="font-editorial-serif text-base text-[#181816] font-medium">
  //             From Greek <span className="font-bold">κίνησις</span> (motion) &amp; Japanese <span className="font-bold font-mincho text-[#C59E5F]">間</span> (sacred spatial interval).
  //           </div>
  //           <p className="text-xs text-[#6B6861] font-editorial-sans mt-1.5 leading-relaxed">
  //             Biological joints heal through restored decompression intervals and organic symmetry, not rigid passive immobilization.
  //           </p>
  //         </div>
  //       </div>

  //       {/* 3 Master Architectural Pillar Cards with Ma & Shibui Typographic Contrast */}
  //       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
  //         {pillars.map((pillar, idx) => {
  //           const isSelected = activePillar === idx;
  //           return (
  //             <div
  //               key={pillar.id}
  //               onClick={() => setActivePillar(idx)}
  //               className={`relative p-7 sm:p-8 rounded-3xl transition-all duration-200 cursor-pointer flex flex-col justify-between border ${
  //                 isSelected
  //                   ? 'bg-white border-[#C59E5F] real-shadow-lg scale-[1.01]'
  //                   : 'bg-white/80 border-[#E5E1D8] hover:bg-white hover:border-[#181816] hover:-translate-y-1 real-shadow-xs hover:real-shadow-md active:scale-[0.99]'
  //               }`}
  //             >
  //               {/* Delicate Japanese Kanji Watermark */}
  //               <div className="absolute top-4 right-5 font-mincho text-6xl font-bold text-[#181816]/[0.04] select-none pointer-events-none">
  //                 {pillar.kanji}
  //               </div>

  //               <div className="relative z-10">
  //                 {/* Top Metadata Header */}
  //                 <div className="flex items-center justify-between pb-3.5 border-b border-[#F2EFE8] mb-5">
  //                   <span className="font-clinical-mono text-xs font-bold uppercase tracking-wider text-[#7A766E]">
  //                     {pillar.tag}
  //                   </span>
  //                   <span className="font-clinical-mono text-[11px] bg-[#F6EEDF] text-[#8C6D34] border border-[#EADCC2] font-semibold px-2.5 py-0.5 rounded-full">
  //                     {pillar.metric}
  //                   </span>
  //                 </div>

  //                 {/* Title & Subtitle */}
  //                 <h3 className="font-editorial-serif text-2xl font-normal text-[#181816] mb-2 leading-snug">
  //                   {pillar.title}
  //                 </h3>
  //                 <div className="text-xs font-clinical-mono text-[#3E5647] font-semibold mb-4">
  //                   {pillar.subtitle}
  //                 </div>

  //                 {/* Body Copy */}
  //                 <p className="text-sm text-[#5A5750] font-editorial-sans leading-relaxed">
  //                   {pillar.description}
  //                 </p>
  //               </div>

  //               {/* Footer Takeaway Tag */}
  //               <div className="mt-7 pt-4 border-t border-[#F2EFE8] flex items-center justify-between text-xs relative z-10">
  //                 <span className="font-editorial-sans font-semibold text-[#181816]">
  //                   {pillar.clinicalTakeaway}
  //                 </span>
  //                 <span className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
  //                   isSelected ? 'bg-[#181816] text-[#DFBA73]' : 'bg-[#F2EFE8] text-[#7A766E]'
  //                 }`}>
  //                   <ArrowRight size={12} />
  //                 </span>
  //               </div>
  //             </div>
  //           );
  //         })}
  //       </div>

  //       {/* High-Elegance Comparison Banner: Conventional Care vs. Japanese Kinetic Precision */}
  //       <div className="mt-12 p-7 sm:p-9 rounded-3xl bg-[#181816] text-[#F9F8F5] real-shadow-xl border border-[#2C2C28]">
  //         <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
  //           {/* Left Context (7 cols) */}
  //           <div className="md:col-span-7">
  //             <div className="inline-flex items-center gap-2 mb-2.5 font-clinical-mono text-[11px] uppercase tracking-widest text-[#DFBA73]">
  //               <Activity size={13} className="text-[#C59E5F]" />
  //               <span>「簡素」Kanso · The Clinical Difference</span>
  //             </div>
  //             <h4 className="font-editorial-serif text-2xl sm:text-3xl font-normal text-white mb-2.5 leading-tight">
  //               Conventional PT isolates the symptom. Kinetic restores the unbroken chain.
  //             </h4>
  //             <p className="text-sm text-neutral-300 font-editorial-sans leading-relaxed">
  //               Most clinics attach heat packs and ultrasound machines before leaving patients unsupervised with resistance bands. At Kinetic, every session is a disciplined, doctor-led biomechanical investigation using continuous motion capture and targeted manual joint alignment.
  //             </p>
  //           </div>

  //           {/* Right Comparison Metric Box (5 cols) */}
  //           <div className="md:col-span-5 bg-[#22221F] p-5 rounded-2xl border border-[#33322E] flex flex-col gap-3">
  //             <div className="flex items-center justify-between text-xs pb-2.5 border-b border-[#33322E]">
  //               <span className="text-neutral-400 font-clinical-mono">Conventional Physical Therapy</span>
  //               <span className="text-rose-300 font-mono">15m PT / 45m Aide</span>
  //             </div>
  //             <div className="flex items-center justify-between text-xs pb-2.5 border-b border-[#33322E]">
  //               <span className="text-white font-bold font-clinical-mono">Kinetic Doctoral Standard</span>
  //               <span className="text-[#DFBA73] font-mono font-bold">60m 1-on-1 Doctoral</span>
  //             </div>
  //             <div className="flex items-center justify-between text-xs pt-1">
  //               <span className="text-neutral-300 text-xs">Typical Recurrence Rate</span>
  //               <span className="text-emerald-400 font-clinical-mono font-bold">&lt; 4.2% (vs 38% industry)</span>
  //             </div>
  //           </div>

  //         </div>
  //       </div>

  //     </div>
  //   </section>
  // );
};
