import React, { useState } from 'react'
import { ArrowRight, CheckCircle2, ClipboardCheck, Headphones, ShieldCheck, UserRound } from 'lucide-react'
import { JointId } from '../types'
import { api } from '../lib/api'

interface ContactUsProps {
  onNavigateHome?: () => void
  onStartAssessment?: (joint?: JointId) => void
}

export function ContactUs({ onNavigateHome, onStartAssessment }: ContactUsProps) {
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [notes, setNotes] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await api.post('/inquiries', { fullName, phone, notes })
      setSubmitted(true)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact-us" className="relative py-16 md:py-20 border-t border-[#E5E1D8] bg-[#F9F8F5] bg-washi-grain">
      <div className="absolute inset-0 bg-grid-subtle opacity-30" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-clinical-mono text-[11px] uppercase tracking-[0.22em] text-neutral-500 font-extrabold">
                Human Care Coordination
              </span>
            </div>

            <h1 className="font-editorial-serif text-4xl sm:text-5xl md:text-6xl leading-none text-neutral-900 tracking-tight">
              Start your recovery pathway.
            </h1>

            <p className="mt-4 max-w-2xl text-sm sm:text-base text-neutral-600 font-editorial-sans leading-relaxed">
              Choose the route that matches your pace. We will connect you with a specialist-led triage and a recovery plan.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigateHome?.()}
            className="bg-[#FFF04B] hover:bg-[#FFF79A] text-[#181816] font-clinical-mono text-[11px] font-extrabold uppercase tracking-wider px-6 py-3 rounded-2xl transition-all duration-150 real-shadow-sm hover:real-shadow-md flex items-center justify-center gap-2 shrink-0 cursor-pointer border border-[#FFF04B] hover:border-[#FFF79A] hover:scale-105 active:scale-95"
          >
            <ArrowRight size={14} className="-rotate-45" />
            <span>Back to top</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <section className="bg-white border-2 border-neutral-200 hover:border-neutral-950 rounded-3xl p-8 sm:p-10 real-shadow-sm hover:real-shadow-xl flex flex-col justify-between transition-all duration-150 group">
            <div className="flex items-center justify-between mb-6">
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#F6EEDF] border border-[#C59E5F]/50 text-[#8C6D34]">
                <ClipboardCheck size={22} />
              </span>
              <span className="font-clinical-mono text-[11px] uppercase tracking-[0.2em] text-neutral-500 font-extrabold">
                Path A · Assessment
              </span>
            </div>

            <div className="mb-5">
              <h2 className="font-editorial-serif text-3xl sm:text-4xl text-neutral-900 tracking-tight leading-snug">
                Detailed assessment
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600 font-editorial-sans">
                Share your symptom pattern and receive a specialist-matched assessment pathway curated for your clinical priority.
              </p>
            </div>

            <div className="border-t border-[#E5E1D8] pt-5">
              <div className="flex items-center gap-2 text-[11px] font-clinical-mono text-neutral-700 uppercase tracking-wider">
                <ShieldCheck size={15} className="text-emerald-700" />
                Peer-reviewed triage flow
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => onStartAssessment?.('knee')}
                  className="bg-[#FFF04B] hover:bg-[#FFF79A] text-[#181816] font-clinical-mono text-[11px] font-extrabold uppercase tracking-wider px-6 py-3 rounded-2xl transition-all duration-150 real-shadow-sm hover:real-shadow-md flex items-center justify-center gap-2 shrink-0 cursor-pointer border border-[#FFF04B] hover:border-[#FFF79A] hover:scale-105 active:scale-95"
                >
                  <span>Start assessment</span>
                  <ArrowRight size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigateHome?.()}
                  className="bg-white hover:bg-neutral-100 text-neutral-950 border-2 border-neutral-900 font-clinical-mono text-[11px] font-extrabold uppercase tracking-wider px-6 py-3 rounded-2xl transition-all cursor-pointer real-shadow-xs hover:real-shadow-md"
                >
                  <span>Explore care</span>
                </button>
              </div>
            </div>
          </section>

          <section className="bg-[#FAFAF8] border-2 border-neutral-200 hover:border-neutral-950 rounded-3xl p-8 sm:p-10 real-shadow-sm hover:real-shadow-xl flex flex-col justify-between transition-all duration-150 group">
            <div className="flex items-center justify-between mb-6">
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white border border-[#E5E1D8] text-[#8C6D34]">
                <Headphones size={22} />
              </span>
              <span className="font-clinical-mono text-[11px] uppercase tracking-[0.2em] text-neutral-500 font-extrabold">
                Path B · Callback
              </span>
            </div>

            <div className="mb-5">
              <h2 className="font-editorial-serif text-3xl sm:text-4xl text-neutral-900 tracking-tight leading-snug">
                Quick inquiry
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600 font-editorial-sans">
                Leave your details and a recovery care coordinator will help you choose the next best step.
              </p>
            </div>

            {submitted ? (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-5 flex items-start gap-3">
                <CheckCircle2 size={20} className="text-emerald-700 mt-0.5" />
                <div>
                  <p className="font-clinical-mono text-[11px] uppercase tracking-wider font-extrabold text-emerald-800">
                    Inquiry received
                  </p>
                  <p className="mt-1 text-sm text-neutral-700 font-editorial-sans">
                    Our clinical team will call you shortly.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <div className="grid gap-3">
                  <label className="sr-only" htmlFor="fullName">Full name</label>
                  <input
                    id="fullName"
                    type="text"
                    placeholder="Full Name"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full border border-[#E5E1D8] bg-white rounded-2xl px-4 py-3 text-sm text-neutral-800 font-editorial-sans outline-none transition-all focus:border-[#C59E5F] focus:ring-2 focus:ring-[#C59E5F]/30"
                  />
                  <label className="sr-only" htmlFor="phone">Phone number</label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="Phone Number"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full border border-[#E5E1D8] bg-white rounded-2xl px-4 py-3 text-sm text-neutral-800 font-editorial-sans outline-none transition-all focus:border-[#C59E5F] focus:ring-2 focus:ring-[#C59E5F]/30"
                  />
                  <label className="sr-only" htmlFor="notes">Clinical notes</label>
                  <textarea
                    id="notes"
                    placeholder="Notes (optional)"
                    rows={4}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full border border-[#E5E1D8] bg-white rounded-2xl px-4 py-3 text-sm text-neutral-800 font-editorial-sans outline-none transition-all resize-none focus:border-[#C59E5F] focus:ring-2 focus:ring-[#C59E5F]/30"
                  />
                </div>

                {error && (
                  <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs font-clinical-mono text-rose-700">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#FFF04B] hover:bg-[#FFF79A] text-[#181816] font-clinical-mono text-[11px] font-extrabold uppercase tracking-wider px-6 py-3.5 rounded-2xl transition-all duration-150 real-shadow-sm hover:real-shadow-md flex items-center justify-center gap-2 shrink-0 cursor-pointer border border-[#FFF04B] hover:border-[#FFF79A] hover:scale-105 active:scale-95 disabled:opacity-60"
                >
                  <UserRound size={15} className="text-[#181816]" />
                  <span>{loading ? 'Sending...' : 'Send Inquiry'}</span>
                  <ArrowRight size={14} className="text-[#181816]" />
                </button>
              </form>
            )}
          </section>
        </div>
      </div>
    </section>
  )
}