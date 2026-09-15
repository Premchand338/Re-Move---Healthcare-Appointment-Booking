// components/StickyBookingBar.tsx
import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { api } from '../lib/api';
import type { Therapist } from '../types/therapist';

type StickyBookingBarProps = {
  onQuickBook: (specialist: Therapist, slot: string) => void;
};

export function StickyBookingBar({ onQuickBook }: StickyBookingBarProps) {
  const [therapist, setTherapist] = useState<Therapist | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    api.get<Therapist[]>('/therapists')
      .then((list) => {
        const sorted = [...list].sort(
          (a, b) => Number(b.rating ?? 0) - Number(a.rating ?? 0)
        );
        if (sorted[0]) setTherapist(sorted[0]);
      })
      .catch(() => {});
  }, []);

  if (!therapist || dismissed) return null;

  const firstSlot = therapist.availableSlots?.[0] ?? '6:30 PM';

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 sm:inset-x-auto sm:right-6 sm:bottom-6">
      {/* Mobile: full-width slim bar */}
      <div className="sm:hidden bg-[#181816] text-[#F9F8F5] px-4 py-3 flex items-center justify-between border-t border-[#C59E5F]/40">
        <div className="min-w-0">
          <p className="text-sm font-editorial-serif truncate">{therapist.fullName}</p>
          <p className="text-[11px] font-clinical-mono text-[#DFBA73]">
            {therapist.rating ? `★ ${therapist.rating}` : 'Available'} · Next: {firstSlot}
          </p>
        </div>
        <button
          onClick={() => onQuickBook(therapist, firstSlot)}
          className="shrink-0 ml-3 bg-[#C59E5F] text-[#181816] text-xs font-bold uppercase tracking-wide px-4 py-2 rounded-full"
        >
          Book
        </button>
      </div>

      {/* Desktop: floating corner card */}
      <div className="hidden sm:flex items-center gap-3 bg-white border border-neutral-200 shadow-xl rounded-2xl p-3 pr-4 w-80">
        <img
          src={therapist.avatarUrl || 'https://via.placeholder.com/56'}
          alt={therapist.fullName}
          className="w-12 h-12 rounded-full object-cover border border-neutral-200 shrink-0"
        />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-editorial-serif font-semibold text-neutral-900 truncate">
            {therapist.fullName}
          </p>
          <p className="text-[11px] font-clinical-mono text-neutral-500">
            {therapist.rating ? `★ ${therapist.rating}` : 'Available'}
            {therapist.pricePerSession ? ` · ₹${therapist.pricePerSession}` : ''}
          </p>
          <p className="text-[11px] font-clinical-mono text-[#9B6A3D]">Next slot: {firstSlot}</p>
        </div>
        <button
          onClick={() => onQuickBook(therapist, firstSlot)}
          className="shrink-0 bg-[#181816] hover:bg-[#2A2A26] text-[#F9F8F5] text-xs font-bold uppercase tracking-wide px-4 py-2.5 rounded-xl transition-colors"
        >
          Book
        </button>
        <button
          onClick={() => setDismissed(true)}
          aria-label="Dismiss"
          className="absolute -top-2 -right-2 bg-neutral-900 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px]"
        >
          <X size={11} />
        </button>
      </div>
    </div>
  );
}