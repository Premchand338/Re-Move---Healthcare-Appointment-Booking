import { useEffect, useState } from 'react'
import { ArrowRight, CheckCircle2, Clock3, MapPin, Star, X } from 'lucide-react'
import { api } from '../lib/api'
import type { Therapist } from '../types/therapist'
import { TherapistCard } from '../components/TherapistCard'
import { TherapistForm } from '../components/TherapistForm'

// ==========================================
// 1. Specialist Faculty
// ==========================================

type SpecialistFacultyProps = {
  onOpenDossier: (therapist: Therapist) => void
  onBookAppointment: (
    therapist: Therapist,
    slot: string
  ) => void
}

export function SpecialistFaculty({
  onOpenDossier,
  onBookAppointment,
}: SpecialistFacultyProps) {
  const [therapists, setTherapists] = useState<Therapist[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    api.get<Therapist[]>('/therapists')
      .then(setTherapists)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <section className="py-16 px-6 bg-[#F7F4EE]">
        <div className="mx-auto max-w-6xl text-center font-clinical-mono text-sm text-neutral-500 animate-pulse">
          Loading clinical faculty...
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-16 px-6 bg-[#F7F4EE]">
        <div className="mx-auto max-w-6xl text-center font-clinical-mono text-sm text-red-600 bg-red-50 p-4 rounded-xl border border-red-200">
          Error loading specialists: {error}
        </div>
      </section>
    )
  }

  return (
    <section id="specialists" className="py-16 px-6 bg-[#F7F4EE]">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-end justify-between gap-6">
          <div>
            <span className="font-clinical-mono uppercase text-xs tracking-[0.2em] text-[#8C3B2F]">
              Specialist directory
            </span>
            <h2 className="mt-2 font-editorial-serif text-4xl font-normal text-[#1F1F1F]">
              Meet your movement specialist
            </h2>
          </div>
          <span className="hidden md:block font-clinical-mono uppercase text-xs text-neutral-500">
            Matched Recovery Network
          </span>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {therapists.map((t) => {
            const matchScore = t.matchScore ? Number(t.matchScore) : null;
            const hasStats = t.rating || t.reviewCount || t.experienceYears;

            return (
              <article
                key={t.id}
                className="group relative overflow-hidden rounded-2xl border border-[#E3DED3] bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-[#8C3B2F]/50 hover:shadow-lg flex flex-col"
              >
                  <div className="absolute left-0 top-0 h-1 w-full bg-[#1F4E45] transition-colors group-hover:bg-[#8C3B2F]" />
                {matchScore != null && matchScore > 0 && (
                    <div className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-[#1F4E45]/8 border border-[#1F4E45]/20 px-3 py-1 text-[10px] font-clinical-mono font-bold uppercase tracking-wide text-[#1F4E45]">
                      <CheckCircle2 size={13} />
                    {matchScore}% Match
                  </div>
                )}

                <div className="flex items-center gap-4">
                  <img
                    src={t.avatarUrl || 'https://via.placeholder.com/80'}
                    alt={t.fullName}
                    className="h-[4.5rem] w-[4.5rem] rounded-2xl object-cover border border-[#E3DED3] shadow-sm"
                  />
                  <div className="min-w-0">
                    <div className="font-editorial-serif text-xl font-bold text-[#1F1F1F]">
                      {t.fullName}
                    </div>
                    {t.degrees && (
                      <div className="mt-1 font-clinical-mono text-[10px] uppercase tracking-wide text-[#5A5750]">
                        {t.degrees}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-4 text-sm font-semibold text-[#1F1F1F]">
                  {t.specialization}
                </div>

                {hasStats && (
                  <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-clinical-mono text-[#5A5750]">
                    {t.rating && (
                      <span className="inline-flex items-center gap-1 font-bold text-[#8C3B2F]"><Star size={13} fill="currentColor" /> {t.rating}</span>
                    )}
                    {t.reviewCount != null && t.reviewCount > 0 && (
                      <span className="text-neutral-400">({t.reviewCount} reviews)</span>
                    )}
                    {t.experienceYears != null && (
                      <>
                        <span className="text-neutral-300">·</span>
                        <span>{t.experienceYears}y exp</span>
                      </>
                    )}
                  </div>
                )}

                {t.clinicLocation && (
                  <div className="mt-2 flex items-center gap-1.5 text-xs text-[#5A5750]"><MapPin size={13} className="shrink-0 text-[#8C3B2F]" />{t.clinicLocation}</div>
                )}

                {t.focusTags && t.focusTags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {t.focusTags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-[#E3DED3] bg-[#F7F4EE] px-3 py-1 text-[10px] font-clinical-mono font-bold uppercase tracking-wide text-[#5A5750]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {t.pricePerSession != null && (
                  <div className="mt-4 border-t border-[#E3DED3] pt-3 text-sm font-clinical-mono font-bold text-[#1F1F1F]">
                    ₹{t.pricePerSession} <span className="font-normal text-[#5A5750] text-xs">/ session</span>
                  </div>
                )}

                {t.availableSlots && t.availableSlots.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {t.availableSlots.slice(0, 4).map((slot) => (
                      <span
                        key={slot}
                        className="rounded-lg border border-[#E3DED3] bg-white px-2.5 py-1 text-[11px] font-clinical-mono text-[#5A5750]"
                      >
                        {slot}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-auto pt-5 flex gap-2">
                  <button
                    className="ui-btn ui-btn-secondary ui-btn-small flex-1"
                    onClick={() => onOpenDossier(t)}
                  >
                    Profile
                  </button>
                  <button
                    className="ui-btn ui-btn-primary ui-btn-small flex-1"
                    onClick={() => onBookAppointment(t, t.availableSlots?.[0] || '6:30 PM')}
                  >
                    Book visit
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  )
}
// ==========================================
// 2. Specialist Dossier Modal
// ==========================================

type SpecialistDossierModalProps = {
  specialist: Therapist | null
  onClose: () => void
  onBook: (
    specialist: Therapist,
    slot: string
  ) => void
}

export function SpecialistDossierModal({
  specialist,
  onClose,
  onBook,
}: SpecialistDossierModalProps) {
  const [selectedSlot, setSelectedSlot] =
    useState<string>('6:30 PM')

  useEffect(() => {
    if (specialist) {
      setSelectedSlot(
        specialist.availableSlots?.[0] || '6:30 PM'
      )
    }
  }, [specialist])

  if (!specialist) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-3xl overflow-hidden rounded-3xl bg-[#F7F4EE] shadow-2xl border border-[#E3DED3]">
        <div className="relative flex items-center justify-between gap-5 bg-[#1F1F1F] px-6 py-6 text-[#F7F4EE] sm:px-8">
          <div className="flex min-w-0 items-center gap-5">
            <img
              src={
                specialist.avatarUrl ||
                'https://via.placeholder.com/80'
              }
              alt={specialist.fullName}
              className="h-20 w-20 shrink-0 rounded-2xl object-cover border-2 border-white/25 shadow-lg"
            />

            <div className="min-w-0">
              <div className="mb-1 font-clinical-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#F7F4EE]/70">
                Specialist profile
              </div>
              <div className="truncate font-editorial-serif text-2xl font-bold text-white sm:text-3xl">
                {specialist.fullName}
              </div>

              <div className="mt-1 font-clinical-mono text-[10px] uppercase tracking-wide text-[#F7F4EE]/70 sm:text-xs">
                {specialist.degrees}
              </div>
            </div>
          </div>

          <button
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:bg-white/10 hover:text-white cursor-pointer"
            onClick={onClose}
            aria-label="Close dossier"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6 sm:p-8">
          <div className="mb-5 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-[#F4E8E4] px-3 py-1 font-clinical-mono text-[10px] font-bold uppercase tracking-wide text-[#8C3B2F]">
              {specialist.title || specialist.specialization}
            </span>
            {specialist.active && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#1F4E45]/20 bg-[#1F4E45]/8 px-3 py-1 font-clinical-mono text-[10px] font-bold uppercase tracking-wide text-[#1F4E45]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#1F4E45]" /> Available
              </span>
            )}
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            <div className="rounded-xl border border-[#E3DED3] bg-white p-3 sm:p-4">
              <div className="font-editorial-serif text-xl font-bold text-[#1F1F1F]">{specialist.experienceYears ?? '—'}<span className="ml-1 text-xs font-sans font-normal text-[#5A5750]">yrs</span></div>
              <div className="mt-1 font-clinical-mono text-[9px] uppercase tracking-wide text-[#5A5750] sm:text-[10px]">Experience</div>
            </div>
            <div className="rounded-xl border border-[#E3DED3] bg-white p-3 sm:p-4">
              <div className="flex items-center gap-1 font-editorial-serif text-xl font-bold text-[#1F1F1F]"><Star size={15} className="text-[#8C3B2F]" fill="currentColor" />{specialist.rating ?? '—'}</div>
              <div className="mt-1 font-clinical-mono text-[9px] uppercase tracking-wide text-[#5A5750] sm:text-[10px]">{specialist.reviewCount ?? 0} reviews</div>
            </div>
            <div className="rounded-xl border border-[#E3DED3] bg-white p-3 sm:p-4">
              <div className="font-editorial-serif text-xl font-bold text-[#1F1F1F]">{specialist.pricePerSession != null ? `₹${specialist.pricePerSession}` : '—'}</div>
              <div className="mt-1 font-clinical-mono text-[9px] uppercase tracking-wide text-[#5A5750] sm:text-[10px]">Per session</div>
            </div>
          </div>

          <div className="mt-5 rounded-2xl border border-[#E3DED3] bg-white p-4 sm:p-5">
            <div className="mb-2 font-clinical-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#8C3B2F]">Clinical approach</div>
            <div className="text-sm leading-6 text-[#5A5750]">
            {specialist.clinicalFocus ||
              specialist.bio ||
              'No clinical focus available.'}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {specialist.focusTags?.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[#E3DED3] bg-[#F7F4EE] px-3 py-1.5 font-clinical-mono text-[9px] font-bold uppercase tracking-wide text-[#5A5750]"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-6 border-t border-[#E3DED3] pt-5">
            <div className="mb-3 flex items-center gap-2 font-clinical-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#5A5750]">
              <Clock3 size={14} className="text-[#8C3B2F]" /> Select an appointment time
            </div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap gap-2">
                {specialist.availableSlots?.map((slot) => (
                  <button
                    key={slot}
                    className={`rounded-full border px-3 py-2 font-clinical-mono text-[10px] font-bold uppercase transition-colors cursor-pointer ${
                      selectedSlot === slot
                        ? 'border-[#8C3B2F] bg-[#8C3B2F] text-white'
                        : 'border-[#E3DED3] bg-white text-[#5A5750] hover:border-[#8C3B2F] hover:text-[#8C3B2F]'
                    }`}
                    onClick={() => setSelectedSlot(slot)}
                  >
                    {slot}
                  </button>
                ))}
              </div>

              <button
                className="ui-btn ui-btn-primary w-full sm:w-auto"
                onClick={() => {
                  onBook(specialist, selectedSlot)
                  onClose()
                }}
              >
                <span>Book appointment</span><ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ==========================================
// 3. Therapist List Page
// ==========================================

// export function TherapistListPage() {
//   const [therapists, setTherapists] = useState<Therapist[]>([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)

//   const [showForm, setShowForm] = useState(false)
//   const [editingTherapist, setEditingTherapist] =
//     useState<Therapist | null>(null)

//   const [deactivatingId, setDeactivatingId] =
//     useState<number | null>(null)

//   const [actionError, setActionError] =
//     useState<string | null>(null)

//   const loadTherapists = () => {
//     setLoading(true)
//     setError(null)

//     api
//       .get<Therapist[]>('/therapists')
//       .then(setTherapists)
//       .catch((err) => setError(err.message))
//       .finally(() => setLoading(false))
//   }

//   useEffect(() => {
//     loadTherapists()
//   }, [])

//   const handleAdd = () => {
//     setActionError(null)
//     setEditingTherapist(null)
//     setShowForm(true)
//   }

//   const handleEdit = (therapist: Therapist) => {
//     setActionError(null)
//     setEditingTherapist(therapist)
//     setShowForm(true)
//   }

//   const handleDeactivate = async (
//     therapist: Therapist
//   ) => {
//     const confirmed = window.confirm(
//       `Deactivate ${therapist.fullName}? They will no longer appear in the active specialist list.`
//     )

//     if (!confirmed) return

//     try {
//       setActionError(null)
//       setDeactivatingId(therapist.id)

//       await api.delete(
//         `/therapists/${therapist.id}`
//       )

//       loadTherapists()
//     } catch (err: any) {
//       setActionError(
//         err.message ||
//           'Failed to deactivate specialist.'
//       )
//     } finally {
//       setDeactivatingId(null)
//     }
//   }

//   if (loading) {
//     return (
//       <div className="p-8 text-center text-neutral-500 font-clinical-mono">
//         Loading specialists...
//       </div>
//     )
//   }

//   if (error) {
//     return (
//       <div className="p-8 text-center text-red-500 font-clinical-mono">
//         Error: {error}
//       </div>
//     )
//   }

//   return (
//     <div className="max-w-5xl mx-auto p-6 flex flex-col gap-6">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
//         <div>
//           <h1 className="font-heading text-2xl font-bold text-neutral-900">
//             Our Specialists
//           </h1>

//           <p className="text-sm text-neutral-500 mt-1">
//             Board-certified therapists matched to your
//             biomechanical needs.
//           </p>
//         </div>

//         <button
//           onClick={handleAdd}
//           className="rounded-lg bg-[#181816] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#2A2A26] transition-colors cursor-pointer"
//         >
//           + Add Specialist
//         </button>
//       </div>

//       {/* Action Error */}
//       {actionError && (
//         <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
//           {actionError}
//         </div>
//       )}

//       {/* Add / Edit Form */}
//       {showForm && (
//         <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
//           <div className="mb-6">
//             <h2 className="font-heading text-xl font-bold text-neutral-900">
//               {editingTherapist
//                 ? 'Edit Specialist'
//                 : 'Add Specialist'}
//             </h2>

//             <p className="text-sm text-neutral-500 mt-1">
//               {editingTherapist
//                 ? 'Update specialist profile and clinical details.'
//                 : 'Create a new specialist profile.'}
//             </p>
//           </div>

//           <TherapistForm
//             therapist={editingTherapist}
//             onSuccess={() => {
//               setShowForm(false)
//               setEditingTherapist(null)
//               loadTherapists()
//             }}
//             onCancel={() => {
//               setShowForm(false)
//               setEditingTherapist(null)
//             }}
//           />
//         </div>
//       )}

//       {/* Therapist List */}
//       {therapists.length === 0 ? (
//         <div className="text-center py-12 bg-neutral-50 rounded-xl border border-dashed border-neutral-300">
//           <p className="text-neutral-500 font-clinical-mono text-sm">
//             No specialists available right now.
//           </p>
//         </div>
//       ) : (
//         <div className="grid gap-4 md:grid-cols-2">
//           {therapists.map((therapist) => (
//             <TherapistCard
//               key={therapist.id}
//               therapist={therapist}
//               onEdit={handleEdit}
//               onDeactivate={handleDeactivate}
//               deactivating={
//                 deactivatingId === therapist.id
//               }
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   )
// }