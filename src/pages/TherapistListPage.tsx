import { useState, useEffect } from 'react'
import { api } from '../lib/api'
import type { Therapist } from '../types/therapist'
import { TherapistForm } from '../components/TherapistForm'
import { Plus, User, Star, CheckCircle2, X, Loader2 } from 'lucide-react'

export function TherapistListPage() {
  const [therapists, setTherapists] = useState<Therapist[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [showForm, setShowForm] = useState(false)
  const [editingTherapist, setEditingTherapist] = useState<Therapist | null>(null)
  const [deactivatingId, setDeactivatingId] = useState<string  | null>(null)

  const loadTherapists = () => {
    setLoading(true)
    setError(null)

    api.get<Therapist[]>('/therapists')
      .then(setTherapists)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    loadTherapists()
  }, [])

  // CREATE / EDIT success
  const handleSuccess = () => {
    setShowForm(false)
    setEditingTherapist(null)
    loadTherapists()
  }

  // EDIT
  const handleEdit = (therapist: Therapist) => {
    setEditingTherapist(therapist)
    setShowForm(true)
  }

  // DEACTIVATE
  const handleDeactivate = async (therapist: Therapist) => {
    const confirmed = window.confirm(
      `Deactivate ${therapist.fullName}? This specialist will no longer appear as active.`
    )

    if (!confirmed) return

    setDeactivatingId(therapist.id)
    setError(null)

    try {
      await api.delete(`/therapists/${therapist.id}`)

      loadTherapists()
    } catch (err: any) {
      setError(err.message || 'Failed to deactivate specialist')
    } finally {
      setDeactivatingId(null)
    }
  }

  const handleAdd = () => {
    setEditingTherapist(null)
    setShowForm(true)
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setEditingTherapist(null)
  }

  if (loading) {
    return (
      <div className="py-24 text-center font-mono text-sm text-neutral-500 animate-pulse">
        Loading specialists database...
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-10">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="font-editorial-serif text-3xl font-bold text-neutral-900">
            Manage Specialists
          </h1>

          <p className="text-neutral-600 mt-1 font-editorial-sans text-sm">
            View, add, and manage clinical professionals in the network.
          </p>
        </div>

        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-[#181816] hover:bg-[#2A2A26] text-[#F9F8F5] px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm cursor-pointer"
        >
          <Plus size={16} />
          <span>Add Specialist</span>
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Grid */}
      {therapists.length === 0 ? (
        <div className="text-center py-16 bg-neutral-50 rounded-2xl border border-dashed border-neutral-300">
          <p className="text-neutral-500 font-mono text-sm">
            No specialists found in the database.
          </p>

          <button
            onClick={handleAdd}
            className="mt-4 text-primary-700 font-bold text-sm hover:underline"
          >
            Add your first specialist
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {therapists.map((t) => (
            <div
              key={t.id}
              className="bg-white border border-neutral-200 rounded-2xl p-5 flex flex-col justify-between transition-all duration-150 hover:border-neutral-400 hover:shadow-md"
            >

              {/* Specialist Info */}
              <div>
                <div className="flex items-start justify-between mb-3">

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center border border-neutral-200">
                      <User size={18} className="text-neutral-600" />
                    </div>

                    <div>
                      <h3 className="font-editorial-serif text-lg font-bold text-neutral-950 leading-tight">
                        {t.fullName}
                      </h3>

                      <p className="text-[11px] font-clinical-mono text-neutral-600 uppercase tracking-wide mt-0.5">
                        {t.specialization}
                      </p>
                    </div>
                  </div>

                  {t.active ? (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <CheckCircle2 size={10} />
                      Active
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded-full border border-neutral-200">
                      Inactive
                    </span>
                  )}
                </div>

                {/* Metrics */}
                <div className="flex items-center gap-1 text-xs font-clinical-mono text-neutral-600 mb-3">
                  <Star size={12} className="fill-amber-400 text-amber-400" />

                  <span className="font-bold">
                    {t.rating || 'N/A'}
                  </span>

                  <span className="text-neutral-400">
                    ({t.reviewCount || 0} reviews)
                  </span>

                  <span className="mx-1 text-neutral-300">
                    •
                  </span>

                  <span>
                    ₹{t.pricePerSession || 0}/session
                  </span>
                </div>
              </div>

              {/* Admin Actions */}
              <div className="mt-4 pt-3 border-t border-neutral-100 flex gap-2">

                {/* Edit */}
                <button
                  onClick={() => handleEdit(t)}
                  className="flex-1 text-xs font-bold text-neutral-600 hover:text-neutral-900 py-2 rounded-lg hover:bg-neutral-50 transition-colors cursor-pointer"
                >
                  Edit Details
                </button>

                {/* Deactivate */}
                {t.active && (
                  <button
                    onClick={() => handleDeactivate(t)}
                    disabled={deactivatingId === t.id}
                    className="flex-1 flex items-center justify-center gap-1 text-xs font-bold text-red-600 hover:text-red-700 py-2 rounded-lg hover:bg-red-50 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {deactivatingId === t.id ? (
                      <>
                        <Loader2 size={13} className="animate-spin" />
                        Deactivating...
                      </>
                    ) : (
                      'Deactivate'
                    )}
                  </button>
                )}

              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create / Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">

          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-neutral-200 animate-slideUp">

            {/* Modal Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-neutral-200 bg-white/95 backdrop-blur-sm rounded-t-2xl">

              <h2 className="font-editorial-serif text-xl font-bold text-neutral-900">
                {editingTherapist
                  ? 'Edit Specialist'
                  : 'Add New Specialist'}
              </h2>

              <button
                onClick={handleCloseForm}
                className="p-2 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 rounded-full transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>

            </div>

            {/* Form */}
            <div className="p-6">
              <TherapistForm
                therapist={editingTherapist}
                onSuccess={handleSuccess}
                onCancel={handleCloseForm}
              />
            </div>

          </div>
        </div>
      )}

    </div>
  )
}