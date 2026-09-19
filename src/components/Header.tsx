import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Added useNavigate
import { Globe, ArrowRight, Menu, X, ShieldCheck, CheckCircle2, Sparkles, Clock, MapPin, LogOut } from 'lucide-react';

interface HeaderProps {
  onFindTherapist: () => void;
  onNavigateSection: (sectionId: string) => void;
  onNavigateHome: () => void;
  onLogin: () => void;
  onRegister: () => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  onFindTherapist, 
  onNavigateSection, 
  onNavigateHome, 
  onLogin, 
  onRegister, 
  onLogout 
}) => {
  const navigate = useNavigate(); // ✅ Initialize navigate
  const [currentLang, setCurrentLang] = useState<'EN' | 'HI'>('EN');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLogoutMenu, setShowLogoutMenu] = useState(false);
  const [activeNav, setActiveNav] = useState<string>('kinetic-manifesto');

  const token = localStorage.getItem('token');
  const userEmail = localStorage.getItem('email');
  const userRole = localStorage.getItem('role'); // ✅ Get user role
  const isLoggedIn = Boolean(token);
  const emailInitial = userEmail ? userEmail.trim().charAt(0).toUpperCase() : 'P';
  const isAdmin = userRole === 'admin'; // ✅ Check if admin

  const navLinks = [
     {label: 'About Us', id: 'about-us' },
    { label: 'Find Doctors', id: 'specialists' },
    // { label: 'Treatments & Evidence', id: 'modalities' },
    // { label: 'Clinical Standards', id: 'clinical-standards' },

    { label: 'Contact Us', id: 'contact-us' }
  ];

  const handleNavClick = (id: string) => {
    setActiveNav(id);
    onNavigateSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F9F8F5]/95 backdrop-blur-md border-b border-[#E5E1D8] transition-all real-shadow-xs">
      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-3">
        
        {/* Brand Wordmark */}
        <a
          href="/"
          className="flex items-center gap-3 group cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            onNavigateHome();
          }}
        >
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="font-editorial-serif text-2xl font-bold tracking-[0.18em] text-[#181816] group-hover:text-black transition-colors">
                KINETIC
              </span>
            </div>
            <span className="font-clinical-mono text-[9px] uppercase tracking-[0.22em] text-[#7A766E] -mt-0.5 font-medium">
              Physical Therapy &amp; Biomechanical Balance
            </span>
          </div>
        </a>

        {/* Center Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1 text-xs font-medium font-editorial-sans text-[#4A4843] flex-nowrap whitespace-nowrap">
          {navLinks.map((link) => {
            const isActive = activeNav === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`relative px-3.5 py-2 rounded-lg text-xs tracking-wider transition-all duration-200 cursor-pointer group whitespace-nowrap ${
                  isActive
                    ? 'text-[#181816] font-bold bg-[#FFF04B]'
                    : 'text-[#4A4843] hover:text-[#181816] hover:bg-[#EFECE3]/70'
                }`}
              >
                <span>{link.label}</span>
                <span
                  className={`absolute bottom-1 left-3.5 right-3.5 h-[1.5px] rounded-full transition-all duration-200 ${
                    isActive
                      ? 'bg-[#181816]'
                      : 'bg-[#C59E5F] opacity-0 group-hover:opacity-80 scale-x-75 group-hover:scale-x-100'
                  }`}
                />
              </button>
            );
          })}
        </nav>

        {/* Right Action & Language Switcher */}
        <div className="flex items-center gap-3 flex-nowrap whitespace-nowrap">
          
          {/* ✅ ADMIN BUTTON (Only visible to admins) */}
          {isAdmin && (
            <button
              onClick={() =>navigate('/admin')}
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-[#181816] text-[#F9F8F5] text-[11px] font-clinical-mono font-bold uppercase tracking-wider hover:bg-[#2A2A26] transition-all cursor-pointer border border-[#C59E5F] hover:border-[#DFBA73]"
              title="Manage Specialists"
            >
              <ShieldCheck size={14} className="text-[#C59E5F]" />
              <span>Admin</span>
            </button>
          )}

          {/* Language Switcher Pill */}
          <div className="hidden sm:flex items-center gap-1 text-xs font-clinical-mono text-[#5A5750] bg-[#EFECE3] px-2 py-1 rounded-xl border border-[#E5E1D8] mx-3">
            <Globe size={13} className="text-[#7A766E] ml-1" />
            <button
              onClick={() => setCurrentLang('EN')}
              className={`px-1.5 py-0.5 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
                currentLang === 'EN'
                  ? 'bg-[#FFF04B] text-[#181816] real-shadow-xs border-2 border-[#181816]'
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
                  ? 'bg-[#FFF04B] text-[#181816] real-shadow-xs border-2 border-[#181816]'
                  : 'text-[#7A766E] hover:text-[#181816]'
              }`}
            >
              HI
            </button>
          </div>
          
          {isLoggedIn ? (
            <div className="relative flex items-center gap-2">
              <button
                onClick={() => setShowLogoutMenu((prev) => !prev)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFF04B] text-[#181816] border border-[#181816] font-editorial-serif text-lg font-bold shadow-sm cursor-pointer hover:bg-[#F8E86B] transition-all"
                aria-label="Open user menu"
              >
                {emailInitial}
              </button>

              {showLogoutMenu && (
                <div className="absolute right-0 top-12 z-50 min-w-37.5 rounded-2xl border border-[#E5E1D8] bg-white p-2 shadow-xl">
                  {/* ✅ Admin Link in Mobile/Dropdown Menu too */}
                  {isAdmin && (
                    <button
                      onClick={() => {
                        setShowLogoutMenu(false);
                      navigate('/admin');
                      }}
                      className="w-full flex items-center gap-2 rounded-xl px-4 py-2.5 text-[#181816] font-clinical-mono text-[11px] font-bold uppercase tracking-wider hover:bg-[#EFECE3] transition-colors mb-1"
                    >
                      <ShieldCheck size={14} className="text-[#C59E5F]" />
                      <span>Admin Dashboard</span>
                    </button>
                  )}
                  
                  <button
                    onClick={() => {
                      setShowLogoutMenu(false);
                      onLogout();
                    }}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#181816] px-4 py-2.5 text-[#F9F8F5] font-clinical-mono text-[11px] font-bold uppercase tracking-wider transition hover:bg-[#252522]"
                  >
                    <LogOut size={14} className="text-[#C59E5F]" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <button
                onClick={onLogin}
                className="bg-[#FFF04B] hover:bg-[#F8E86B] text-[#181816] font-semibold text-xs tracking-wider px-5 sm:px-6 py-2.5 rounded-full transition-all duration-200 flex items-center gap-2 group cursor-pointer border border-[#181816] real-shadow-xs hover:border-[#181816] hover:scale-[1.02] active:scale-[0.98] mx-3"
              >
                <span className="font-clinical-mono">Login</span>
                <ArrowRight size={13} className="text-[#181816] transition-transform group-hover:translate-x-0.5" />
              </button>

              {/* <button
                onClick={onRegister}
                className="bg-[#FFF04B] hover:bg-[#F8E86B] text-[#181816] font-semibold text-xs tracking-wider px-5 sm:px-6 py-2.5 rounded-full transition-all duration-200 flex items-center gap-2 group cursor-pointer border border-[#181816] real-shadow-xs hover:border-[#181816] hover:scale-[1.02] active:scale-[0.98] mx-3"
              >
                <span className="font-clinical-mono">Register</span>
                <ArrowRight size={13} className="text-[#181816] transition-transform group-hover:translate-x-0.5" />
              </button> */}
            </>
          )}

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
          {/* ✅ Admin Link in Mobile Menu */}
          {isAdmin && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                navigate('/admin/therapists');
              }}
              className="w-full flex items-center gap-2 rounded-xl bg-[#181816] px-4 py-3 text-[#F9F8F5] font-clinical-mono text-xs font-bold uppercase tracking-wider transition hover:bg-[#252522]"
            >
              <ShieldCheck size={16} className="text-[#C59E5F]" />
              <span>Admin Dashboard</span>
            </button>
          )}

          {navLinks.map((link) => {
            const isActive = activeNav === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`block w-full text-left py-2.5 px-3 rounded-xl font-bold transition-colors ${
                  isActive
                    ? 'bg-[#FFF04B] text-[#181816] border-2 border-[#181816]'
                    : 'text-neutral-800 hover:text-black hover:bg-neutral-100'
                }`}
              >
                {link.label}
              </button>
            );
          })}
          
          <div className="pt-3 border-t border-neutral-200 flex items-center justify-between text-xs font-clinical-mono text-neutral-600 px-3">
            <span className="font-bold uppercase tracking-wider">Language Selection:</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentLang('EN')}
                className={`px-2 py-1 rounded-md ${currentLang === 'EN' ? 'bg-[#FFF04B] text-[#181816] border-2 border-[#181816] font-bold' : 'text-neutral-600'}`}
              >
                English
              </button>
              <button
                onClick={() => setCurrentLang('HI')}
                className={`px-2 py-1 rounded-md ${currentLang === 'HI' ? 'bg-[#FFF04B] text-[#181816] border-2 border-[#181816] font-bold' : 'text-neutral-600'}`}
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