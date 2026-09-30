import type { Therapist } from '../types/therapist'
import { Calendar, CheckCircle2, Edit3, MapPin, PowerOff, Sparkles, Star } from 'lucide-react'

type TherapistCardProps = {
  therapist: Therapist
  onBook?: (therapist: Therapist) => void
  onEdit?: (therapist: Therapist) => void
  onDeactivate?: (therapist: Therapist) => void
  deactivating?: boolean
}

export function TherapistCard({
  therapist,
  onBook,
  onEdit,
  onDeactivate,
  deactivating,
}: TherapistCardProps) {
  const rating = therapist.rating ?? null
  const reviewCount = therapist.reviewCount ?? 0

  return (
    <article className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#E3DED3] bg-white p-5 real-shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-[#8C3B2F]/50 hover:real-shadow-xl">
      <div className="absolute left-0 top-0 h-1 w-full bg-[#1F4E45] transition-colors group-hover:bg-[#8C3B2F]" />
      <div className="flex items-start gap-4">
        <img
          src={therapist.avatarUrl || 'https://via.placeholder.com/80'}
          alt={therapist.fullName}
          className="h-16 w-16 rounded-2xl object-cover border border-[#E3DED3] shadow-sm"
        />

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-editorial-serif text-xl font-bold text-[#1F1F1F] truncate">
              {therapist.fullName}
            </h3>

            {therapist.matchScore != null && (
              <span className="ui-badge ui-badge-success shrink-0">
                {therapist.matchScore}% Match
              </span>
            )}
          </div>

          <p className="text-sm font-semibold text-[#1F4E45]">
            {therapist.title}
          </p>

          <p className="mt-1 font-clinical-mono text-[10px] uppercase tracking-wide text-[#5A5750]">
            {therapist.degrees}
          </p>

          <div className="flex items-center gap-3 mt-2 text-sm">
            {rating != null && (
              <span className="flex items-center gap-1 text-[#8C3B2F] font-medium">
                <Star size={13} fill="currentColor" /> {rating}
                <span className="text-[#5A5750] font-normal">
                  ({reviewCount})
                </span>
              </span>
            )}

            {therapist.pricePerSession != null && (
              <span className="font-clinical-mono text-xs font-semibold text-[#1F1F1F]">
                ₹{therapist.pricePerSession}/session
              </span>
            )}
          </div>

          {therapist.focusTags && therapist.focusTags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {therapist.focusTags.slice(0, 3).map((tag, idx) => (
                <span key={idx} className="rounded-full border border-[#E3DED3] bg-[#F7F4EE] px-2.5 py-1 font-clinical-mono text-[9px] font-bold uppercase tracking-wide text-[#5A5750]">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 border-t border-[#E3DED3] pt-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <span className={`h-2 w-2 shrink-0 rounded-full ${therapist.active ? 'bg-[#1F4E45]' : 'bg-[#E3DED3]'}`}></span>
            <span className="truncate text-xs text-[#5A5750]">
              {therapist.clinicLocation}
            </span>
          </div>

          {onBook && (
            <button
              onClick={() => onBook(therapist)}
              className="ui-btn ui-btn-primary ui-btn-small"
            >
              Book
            </button>
          )}
        </div>

        {(onEdit || onDeactivate) && (
          <div className="mt-3 flex gap-2">
            {onEdit && (
              <button
                onClick={() => onEdit(therapist)}
                className="ui-btn ui-btn-secondary ui-btn-small flex-1"
              >
                Edit
              </button>
            )}

            {onDeactivate && (
              <button
                onClick={() => onDeactivate(therapist)}
                disabled={deactivating}
                className="ui-btn ui-btn-danger ui-btn-small flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {deactivating ? 'Deactivating...' : 'Deactivate'}
              </button>
            )}
          </div>
        )}
      </div>
    </article>
  )
}