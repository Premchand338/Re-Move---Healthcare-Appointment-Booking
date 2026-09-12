import type { Therapist } from '../types/therapist'

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
  return (
    <article className="group bg-[#FAFAF8] hover:bg-white border-2 border-neutral-200 hover:border-neutral-950 hover:-translate-y-1 rounded-3xl p-6 shadow-sm hover:shadow-xl flex flex-col justify-between transition-all duration-150">
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <img
          src={
            therapist.avatarUrl ||
            'https://via.placeholder.com/80'
          }
          alt={therapist.fullName}
          className="w-16 h-16 rounded-full object-cover border border-neutral-200"
        />

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-heading text-lg font-semibold text-neutral-900 truncate">
              {therapist.fullName}
            </h3>

            {therapist.matchScore != null && (
              <span className="shrink-0 bg-green-100 text-green-800 text-[11px] font-black px-2 py-1 rounded-full">
                {therapist.matchScore}% Match
              </span>
            )}
          </div>

          <p className="text-sm text-primary-700 font-medium">
            {therapist.title}
          </p>

          <p className="text-xs text-neutral-500 mt-1">
            {therapist.degrees}
          </p>

          {/* Rating & Price */}
          <div className="flex items-center gap-3 mt-2 text-sm">
            {therapist.rating != null && (
              <span className="flex items-center gap-1 text-amber-600 font-medium">
                ★ {therapist.rating}
                <span className="text-neutral-400 font-normal">
                  ({therapist.reviewCount ?? 0})
                </span>
              </span>
            )}

            {therapist.pricePerSession != null && (
              <span className="text-neutral-700 font-semibold">
                ₹{therapist.pricePerSession}/session
              </span>
            )}
          </div>

          {/* Focus Tags */}
          {therapist.focusTags &&
            therapist.focusTags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-3">
                {therapist.focusTags
                  .slice(0, 3)
                  .map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded-md border border-neutral-200"
                    >
                      {tag}
                    </span>
                  ))}
              </div>
            )}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 pt-3 border-t border-neutral-100">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <span
              className={`h-2 w-2 shrink-0 rounded-full ${
                therapist.active
                  ? 'bg-green-500'
                  : 'bg-neutral-300'
              }`}
            />

            <span className="text-xs text-neutral-500 truncate">
              {therapist.clinicLocation}
            </span>
          </div>

          {onBook && (
            <button
              onClick={() => onBook(therapist)}
              className="text-sm bg-[#181816] hover:bg-[#2A2A26] text-[#F9F8F5] px-4 py-1.5 rounded-lg font-medium transition-colors cursor-pointer"
            >
              Book
            </button>
          )}
        </div>

        {/* Admin Actions */}
        {(onEdit || onDeactivate) && (
          <div className="mt-3 flex gap-2">
            {onEdit && (
              <button
                onClick={() => onEdit(therapist)}
                className="flex-1 rounded-lg border border-neutral-300 px-3 py-2 text-xs font-bold text-neutral-800 hover:bg-neutral-100 transition-colors cursor-pointer"
              >
                Edit
              </button>
            )}

            {onDeactivate && (
              <button
                onClick={() => onDeactivate(therapist)}
                disabled={deactivating}
                className="flex-1 rounded-lg border border-red-200 px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-50 disabled:opacity-50 transition-colors cursor-pointer"
              >
                {deactivating
                  ? 'Deactivating...'
                  : 'Deactivate'}
              </button>
            )}
          </div>
        )}
      </div>
    </article>
  )
}