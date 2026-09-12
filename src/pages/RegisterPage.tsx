import React from 'react';
import { ArrowRight, UserRound, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-lg rounded-[2rem] border border-[#E5E1D8] bg-white p-8 shadow-xl shadow-[#181816]/10">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#181816] text-[#F9F8F5]">
            <UserRound size={24} />
          </div>
          <div>
            <span className="font-clinical-mono text-[11px] uppercase tracking-[0.24em] text-[#7A766E]">
              Kinetic Care
            </span>
            <h1 className="font-editorial-serif text-3xl font-bold text-[#181816]">
              Create Account
            </h1>
          </div>
        </div>

        <div className="space-y-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block font-clinical-mono text-[11px] uppercase tracking-widest text-[#5A5750]">
                First name
              </label>
              <input
                type="text"
                placeholder="First name"
                className="w-full rounded-2xl border border-[#E5E1D8] bg-[#F9F8F5] px-4 py-3 outline-none transition focus:border-[#C59E5F] focus:ring-2 focus:ring-[#C59E5F]/30"
              />
            </div>
            <div>
              <label className="mb-2 block font-clinical-mono text-[11px] uppercase tracking-widest text-[#5A5750]">
                Last name
              </label>
              <input
                type="text"
                placeholder="Last name"
                className="w-full rounded-2xl border border-[#E5E1D8] bg-[#F9F8F5] px-4 py-3 outline-none transition focus:border-[#C59E5F] focus:ring-2 focus:ring-[#C59E5F]/30"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block font-clinical-mono text-[11px] uppercase tracking-widest text-[#5A5750]">
              Email address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-2xl border border-[#E5E1D8] bg-[#F9F8F5] px-4 py-3 outline-none transition focus:border-[#C59E5F] focus:ring-2 focus:ring-[#C59E5F]/30"
            />
          </div>

          <div>
            <label className="mb-2 block font-clinical-mono text-[11px] uppercase tracking-widest text-[#5A5750]">
              Phone number
            </label>
            <input
              type="tel"
              placeholder="+91 98765 43210"
              className="w-full rounded-2xl border border-[#E5E1D8] bg-[#F9F8F5] px-4 py-3 outline-none transition focus:border-[#C59E5F] focus:ring-2 focus:ring-[#C59E5F]/30"
            />
          </div>

          <div>
            <label className="mb-2 block font-clinical-mono text-[11px] uppercase tracking-widest text-[#5A5750]">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full rounded-2xl border border-[#E5E1D8] bg-[#F9F8F5] px-4 py-3 outline-none transition focus:border-[#C59E5F] focus:ring-2 focus:ring-[#C59E5F]/30"
            />
          </div>

          <button className="flex w-1/2 mx-auto mt-6 items-center justify-center gap-2 rounded-full bg-[#FFF04B] px-6 py-3 font-clinical-mono text-xs font-bold uppercase tracking-[0.2em] text-[#181816] transition hover:bg-[#F8E86B] border border-[#181816]">
            Create My Account
            <ArrowRight size={14} className="text-[#181816]" />
          </button>

          <div className="flex items-center justify-center gap-2 text-[11px] font-medium text-[#5A5750]">
            <span>Already have an account?</span>
            <button className="font-bold text-[#181816] hover:text-[#C59E5F]" onClick={() => navigate('/login')}>
              Login here
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
