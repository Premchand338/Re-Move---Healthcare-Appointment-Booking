import React, { useState } from 'react';
import { Specialist } from '../types';
import { ArrowRight, X, ShieldCheck } from 'lucide-react';

interface StickyBookingBarProps {
  specialist: Specialist;
  onQuickBook: () => void;
}

export const StickyBookingBar: React.FC<StickyBookingBarProps> = ({ specialist, onQuickBook }) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Quick Booking Recommendation"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30 w-[94%] max-w-4xl bg-white/95 text-neutral-900 rounded-2xl p-3 sm:p-3.5 shadow-2xl border border-neutral-300 backdrop-blur-md animate-slideUp"
    >
      <div className="flex items-center justify-between gap-3">
        {/* Left: Specialist Avatar & Name */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center font-editorial-serif text-sm font-bold text-amber-900 shrink-0">
            SC
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5 text-[10px] font-clinical-mono text-emerald-800 font-bold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>TOP SPECIALIST MATCH</span>
            </div>
            <div className="font-editorial-serif text-sm sm:text-base font-bold text-neutral-900 truncate">
              {specialist.name}{' '}
              <span className="font-clinical-mono text-xs text-neutral-500 font-normal">
                · {specialist.matchScore}% Match
              </span>
            </div>
          </div>
        </div>

        {/* Removed - no backend support yet, see backend simplification plan */}
        {/* Removed - no backend support yet, see backend simplification plan */}
        {/* Center: Timing & Co-pay info */}
        {/* <div className="hidden md:flex items-center gap-6 text-xs font-clinical-mono border-x border-neutral-200 px-6 shrink-0"><div><div className="text-[10px] uppercase text-neutral-500 font-bold">NEXT OPEN SLOT</div><div className="font-bold text-neutral-900">TOMORROW · 6:30 PM</div></div><div><div className="text-[10px] uppercase text-neutral-500 font-bold">EST. IN-NETWORK</div><div className="font-bold text-emerald-700">₹{specialist.cashlessCopay} Co-pay</div></div></div> */}

        {/* Right: Quick Action & Dismiss */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            id="quick-book-button"
            onClick={onQuickBook}
            className="bg-[#181816] hover:bg-[#2A2A26] text-[#F9F8F5] font-clinical-mono font-bold uppercase tracking-wider text-xs px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl transition-all shadow-xs border border-[#C59E5F] hover:border-[#DFBA73] flex items-center gap-1.5 group cursor-pointer hover:shadow-md"
          >
            <span>Book Doctor</span>
            <ArrowRight size={13} className="text-[#DFBA73] transition-transform group-hover:translate-x-0.5" />
          </button>

          <button
            onClick={() => setIsVisible(false)}
            className="p-1.5 text-neutral-400 hover:text-neutral-700 transition-colors rounded-lg cursor-pointer"
            title="Dismiss bar"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
};
