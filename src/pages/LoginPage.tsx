import React, { useState } from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/api'; // Adjust path if needed

// Define the expected response shape from your backend /auth/login
export type UserRole = 'admin' | 'therapist' | 'patient'

export type LoginResponse = {
  token: string
  role: UserRole
}

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  
  // 1. State for form data, loading, and errors
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 2. Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // Call your backend API
      const data = await api.post<LoginResponse>('/auth/login', { email, password });
      
      // 3. Save token, role, and patient email to localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);
      localStorage.setItem('email', email);

      // 4. Redirect to home page
      navigate('/');
    } catch (err: any) {
      // Your api.ts throws an Error with the backend's message
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md rounded-3xl border border-[#E3DED3] bg-white p-8 shadow-xl shadow-[#1F1F1F]/10">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1F4E45] text-white">
            <ShieldCheck size={24} />
          </div>
          <div>
            <span className="font-clinical-mono text-[11px] uppercase tracking-[0.24em] text-[#7A766E]">
              Kinetic Care
            </span>
            <h1 className="font-editorial-serif text-3xl font-bold text-[#181816]">
              Member Login
            </h1>
          </div>
        </div>

        {/* 5. Wrap in form for Enter-key submission */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Error Message Display */}
          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <div>
            <label className="mb-2 block font-clinical-mono text-[11px] uppercase tracking-widest text-[#5A5750]">
              Email address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-2xl border border-[#E3DED3] bg-[#F7F4EE] px-4 py-3 outline-none transition focus:border-[#8C3B2F] focus:ring-2 focus:ring-[#8C3B2F]/20 disabled:opacity-50"
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="mb-2 block font-clinical-mono text-[11px] uppercase tracking-widest text-[#5A5750]">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-2xl border border-[#E3DED3] bg-[#F7F4EE] px-4 py-3 outline-none transition focus:border-[#8C3B2F] focus:ring-2 focus:ring-[#8C3B2F]/20 disabled:opacity-50"
              disabled={isLoading}
            />
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="ui-btn ui-btn-primary mt-6 w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Logging in...' : 'Login to Dashboard'}
            {!isLoading && <ArrowRight size={14} />}
          </button>

          <div className="flex items-center justify-between text-[11px] font-medium text-[#5A5750]">
            <button 
              type="button" 
              className="ui-link" 
              onClick={() => navigate('/register')}
            >
              Create account
            </button>
            <button type="button" className="ui-link">
              Forgot password?
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};