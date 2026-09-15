import { useEffect, useState } from 'react'
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
      <section className="py-16 px-6 bg-[#F7F4EA]">
        <div className="mx-auto max-w-6xl text-center font-clinical-mono text-sm text-neutral-500 animate-pulse">
          Loading clinical faculty...
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-16 px-6 bg-[#F7F4EA]">
        <div className="mx-auto max-w-6xl text-center font-clinical-mono text-sm text-red-600 bg-red-50 p-4 rounded-xl border border-red-200">
          Error loading specialists: {error}
        </div>
      </section>
    )
  }

  return (
    <section id="specialists" className="py-16 px-6 bg-[#F7F4EA]">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-end justify-between gap-6">
          <div>
            <span className="font-clinical-mono uppercase text-xs tracking-[0.24em] text-[#9B6A3D]">
              Section 02
            </span>
            <h2 className="mt-3 font-heading text-4xl font-bold tracking-tight text-neutral-900">
              Clinical Faculty
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
                className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition-all duration-150 hover:border-[#181816] hover:-translate-y-1 hover:shadow-md flex flex-col"
              >
                {matchScore != null && matchScore > 0 && (
                  <div className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-[11px] font-bold text-emerald-800">
                    {matchScore}% Match
                  </div>
                )}

                <div className="flex items-center gap-4">
                  <img
                    src={t.avatarUrl || 'https://via.placeholder.com/80'}
                    alt={t.fullName}
                    className="h-16 w-16 rounded-full object-cover border border-neutral-200"
                  />
                  <div className="min-w-0">
                    <div className="font-heading text-lg font-bold text-neutral-950">
                      {t.fullName}
                    </div>
                    {t.degrees && (
                      <div className="font-clinical-mono text-[11px] uppercase text-neutral-500">
                        {t.degrees}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-4 text-sm font-medium text-neutral-700">
                  {t.specialization}
                </div>

                {hasStats && (
                  <div className="mt-2 flex flex-wrap items-center gap-1.5 text-xs font-clinical-mono text-neutral-600">
                    {t.rating && (
                      <span className="text-amber-600 font-bold">★ {t.rating}</span>
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
                  <div className="mt-1 text-xs text-neutral-500">{t.clinicLocation}</div>
                )}

                {t.focusTags && t.focusTags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {t.focusTags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-neutral-200 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-neutral-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {t.pricePerSession != null && (
                  <div className="mt-4 text-sm font-clinical-mono text-neutral-800">
                    ₹{t.pricePerSession} <span className="text-neutral-400 text-xs">/ session</span>
                  </div>
                )}

                {t.availableSlots && t.availableSlots.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {t.availableSlots.slice(0, 4).map((slot) => (
                      <span
                        key={slot}
                        className="rounded-lg border border-neutral-200 px-2.5 py-1 text-[11px] font-clinical-mono text-neutral-600"
                      >
                        {slot}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-auto pt-6 flex gap-3">
                  <button
                    className="rounded-full border border-neutral-900 px-4 py-2 text-xs font-bold uppercase text-neutral-900 hover:bg-neutral-900 hover:text-white transition-colors cursor-pointer"
                    onClick={() => onOpenDossier(t)}
                  >
                    Dossier
                  </button>
                  <button
                    className="rounded-full bg-[#16291F] px-4 py-2 text-xs font-bold uppercase text-white hover:bg-[#233B28] transition-colors cursor-pointer"
                    onClick={() => onBookAppointment(t, t.availableSlots?.[0] || '6:30 PM')}
                  >
                    Book
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
      <div className="w-full max-w-2xl rounded-3xl bg-[#FDFBF7] p-7 shadow-2xl border border-neutral-200">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <img
              src={
                specialist.avatarUrl ||
                'https://via.placeholder.com/80'
              }
              alt={specialist.fullName}
              className="h-20 w-20 rounded-full object-cover border border-neutral-200"
            />

            <div>
              <div className="font-heading text-2xl font-bold text-neutral-950">
                {specialist.fullName}
              </div>

              <div className="font-clinical-mono text-xs uppercase text-neutral-500">
                {specialist.degrees}
              </div>
            </div>
          </div>

          <button
            className="text-2xl text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer"
            onClick={onClose}
            aria-label="Close dossier"
          >
            ×
          </button>
        </div>

        <div className="mt-6 grid gap-3">
          <div className="font-clinical-mono text-xs uppercase text-[#9B6A3D]">
            {specialist.title}
          </div>

          <div className="text-sm leading-6 text-neutral-700">
            {specialist.clinicalFocus ||
              specialist.bio ||
              'No clinical focus available.'}
          </div>

          <div className="flex flex-wrap gap-2">
            {specialist.focusTags?.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-neutral-200 px-3 py-1 text-[10px] font-semibold uppercase text-neutral-700"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-neutral-200 pt-5">
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            {specialist.availableSlots?.map((slot) => (
              <button
                key={slot}
                className={`rounded-full px-3 py-2 text-xs font-bold uppercase transition-colors cursor-pointer ${
                  selectedSlot === slot
                    ? 'bg-neutral-950 text-white'
                    : 'border border-neutral-300 text-neutral-700 hover:bg-neutral-100'
                }`}
                onClick={() => setSelectedSlot(slot)}
              >
                {slot}
              </button>
            ))}
          </div>

          <button
            className="w-full sm:w-auto rounded-full bg-[#16291F] px-5 py-3 text-xs font-bold uppercase text-white hover:bg-[#233B28] transition-colors cursor-pointer"
            onClick={() => {
              onBook(specialist, selectedSlot)
              onClose()
            }}
          >
            Book Appointment
          </button>
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