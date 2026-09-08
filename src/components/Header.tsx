import React, { useState } from 'react';
import { Globe, ArrowRight, Menu, X, ShieldCheck, CheckCircle2, Sparkles, Clock, MapPin } from 'lucide-react';

interface HeaderProps {
  onFindTherapist: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onFindTherapist, onNavigateSection }) => {
  const [currentLang, setCurrentLang] = useState<'EN' | 'HI'>('EN');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState<string>('kinetic-manifesto');

  const navLinks = [
    { label: 'Kinetic Principle', id: 'kinetic-manifesto' },
    { label: 'Find Doctors', id: 'specialists' },
    { label: '3D Body Triage', id: 'symptom-localization' },
    { label: 'Treatments & Evidence', id: 'modalities' },
    { label: 'Recovery Milestones', id: 'trajectory' },
    { label: 'Clinical Standards', id: 'clinical-standards' }
  ];

  const handleNavClick = (id: string) => {
    setActiveNav(id);
    onNavigateSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F9F8F5]/95 backdrop-blur-md border-b border-[#E5E1D8] transition-all real-shadow-xs">
      {/* Top subtle Japanese aesthetic advisory strip (Ma - Intentional Breathing Interval) */}
      <div className="hidden md:flex items-center justify-between px-6 py-1.5 bg-[#F2EFE8] border-b border-[#E5E1D8] text-[11px] font-clinical-mono text-[#4A4843]">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-[#2D4236] font-semibold bg-[#E7EFE9] px-2.5 py-0.5 rounded-full border border-[#B9D3C1]">
            <CheckCircle2 size={12} className="text-[#3E5647]" />
            DIRECT ACCESS · NO REFERRAL REQUIRED
          </span>
          <span className="text-[#5A5750]">
            Cashless TPA with Star Health · HDFC ERGO · ICICI Lombard · Bupa Global
          </span>
        </div>

        <div className="flex items-center gap-4 text-[#5A5750]">
          <span className="flex items-center gap-1.5 font-medium">
            <span className="w-2 h-2 rounded-full bg-[#3E5647] animate-pulse" />
            Flagship Movement Labs: Mumbai · Bengaluru · Delhi · Tokyo
          </span>
          <span className="text-[#D3CEC4]">|</span>
          <span className="font-semibold text-[#181816] flex items-center gap-1">
            <Clock size={11} className="text-[#7A766E]" />
            &lt; 15-Min Punctuality Guarantee
          </span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Brand Wordmark with Japanese Inkan / Hanko Seal Motif */}
        <a
          href="#"
          className="flex items-center gap-3 group cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          {/* Custom Shibui Hanko Emblem */}
          <div className="w-10 h-10 rounded-xl bg-[#181816] border border-[#C59E5F]/70 flex items-center justify-center font-mincho text-lg font-bold text-[#C59E5F] real-shadow-xs group-hover:scale-105 group-hover:border-[#C59E5F] transition-all duration-200">
            動
          </div>
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="font-editorial-serif text-2xl font-bold tracking-[0.18em] text-[#181816] group-hover:text-black transition-colors">
                KINETIC
              </span>
              <span className="font-clinical-mono text-[9px] uppercase tracking-widest text-[#C59E5F] font-bold">
                「間・渋」
              </span>
            </div>
            <span className="font-clinical-mono text-[9px] uppercase tracking-[0.22em] text-[#7A766E] -mt-0.5 font-medium">
              Physical Therapy &amp; Biomechanical Balance
            </span>
          </div>
        </a>

        {/* Center Desktop Navigation with Ma (Calm Spatial Rhythm) */}
        <nav className="hidden lg:flex items-center space-x-1 text-xs font-medium font-editorial-sans text-[#4A4843]">
          {navLinks.map((link) => {
            const isActive = activeNav === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`relative px-3.5 py-2 rounded-lg text-xs tracking-wider transition-all duration-200 cursor-pointer group ${
                  isActive
                    ? 'text-[#181816] font-bold bg-[#EFECE3]'
                    : 'text-[#4A4843] hover:text-[#181816] hover:bg-[#EFECE3]/70'
                }`}
              >
                <span>{link.label}</span>
                {/* Understated Kintsugi gold indicator */}
                <span
                  className={`absolute bottom-1 left-3.5 right-3.5 h-[1.5px] rounded-full transition-all duration-200 ${
                    isActive
                      ? 'bg-[#C59E5F]'
                      : 'bg-[#C59E5F] opacity-0 group-hover:opacity-80 scale-x-75 group-hover:scale-x-100'
                  }`}
                />
              </button>
            );
          })}
        </nav>

        {/* Right Action & Language Switcher */}
        <div className="flex items-center gap-3">
          
          {/* Status Pill in Koke-iro (Moss Green) */}
          <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 bg-[#E7EFE9] border border-[#B9D3C1] rounded-full text-[11px] font-clinical-mono text-[#2D4236] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3E5647] animate-pulse" />
            <span>CLINIC SESSIONS ACTIVE</span>
          </div>

          {/* Language Switcher Pill */}
          <div className="hidden sm:flex items-center gap-1 text-xs font-clinical-mono text-[#5A5750] bg-[#EFECE3] px-2 py-1 rounded-xl border border-[#E5E1D8]">
            <Globe size={13} className="text-[#7A766E] ml-1" />
            <button
              onClick={() => setCurrentLang('EN')}
              className={`px-1.5 py-0.5 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
                currentLang === 'EN'
                  ? 'bg-white text-[#181816] real-shadow-xs border border-[#E5E1D8]'
                  : 'text-[#7A766E] hover:text-[#181816]'
              }`}
            >
              EN
            </button>
            <span className="text-[#D3CEC4]">/</span>
            <button
              onClick={() => setCurrentLang('HI')}
              className={`px-1.5 py-0.5 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
                currentLang === 'HI'
                  ? 'bg-white text-[#181816] real-shadow-xs border border-[#E5E1D8]'
                  : 'text-[#7A766E] hover:text-[#181816]'
              }`}
            >
              HI
            </button>
          </div>

          {/* Shibui Restrained Primary Action Button */}
          <button
            onClick={onFindTherapist}
            className="bg-[#181816] hover:bg-[#252522] text-[#F9F8F5] font-semibold text-xs tracking-wider px-5 sm:px-6 py-2.5 rounded-full transition-all duration-200 flex items-center gap-2 group cursor-pointer border border-[#C59E5F]/70 real-shadow-xs hover:border-[#C59E5F] hover:scale-[1.02] active:scale-[0.98]"
          >
            <span className="font-clinical-mono">Reserve Session</span>
            <ArrowRight size={13} className="text-[#C59E5F] transition-transform group-hover:translate-x-0.5" />
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#4A4843] hover:text-[#181816] hover:bg-[#EFECE3] rounded-xl transition-colors cursor-pointer"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-neutral-200 px-4 py-4 space-y-2 font-editorial-sans text-sm real-shadow-md">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className="block w-full text-left py-2.5 px-3 rounded-xl text-neutral-800 hover:text-black hover:bg-neutral-100 font-bold transition-colors"
            >
              {link.label}
            </button>
          ))}
          <div className="pt-3 border-t border-neutral-200 flex items-center justify-between text-xs font-clinical-mono text-neutral-600 px-3">
            <span className="font-bold uppercase tracking-wider">Language Selection:</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentLang('EN')}
                className={`px-2 py-1 rounded-md ${currentLang === 'EN' ? 'bg-neutral-900 text-white font-bold' : 'text-neutral-600'}`}
              >
                English
              </button>
              <button
                onClick={() => setCurrentLang('HI')}
                className={`px-2 py-1 rounded-md ${currentLang === 'HI' ? 'bg-neutral-900 text-white font-bold' : 'text-neutral-600'}`}
              >
                हिंदी
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
