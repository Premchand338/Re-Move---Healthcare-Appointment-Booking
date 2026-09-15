/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { JointId, Modality } from './types';
import type { Therapist } from './types/therapist';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { KineticMovementManifesto } from './components/KineticMovementManifesto';
import { SymptomLocalization } from './components/SymptomLocalization';
import { ClinicalModalities } from './components/ClinicalModalities';
import { SpecialistFaculty, SpecialistDossierModal } from './components/TherapistListPage';
import { ClinicalStandards } from './components/ClinicalStandards';
import { Footer } from './components/Footer';
import { AssessmentModal } from './components/AssessmentModal';
import { ClinicalEvidenceModal } from './components/ClinicalEvidenceModal';
import { AboutUs } from './components/AboutUs';
import { ContactUs } from './components/ContactUs';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { TherapistListPage } from './pages/TherapistListPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import { StickyBookingBar } from './components/StickyBookingBar';

function LandingExperience() {
  const [selectedJoint, setSelectedJoint] = useState<JointId>('knee');
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);
  const [bookingSpecialist, setBookingSpecialist] = useState<Therapist | null>(null);
  const [bookingSlot, setBookingSlot] = useState<string>('6:30 PM');
  const [dossierSpecialist, setDossierSpecialist] = useState<Therapist | null>(null);
  const [evidenceModality, setEvidenceModality] = useState<Modality | null>(null);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (!el) return;
    const header = document.querySelector('header');
    const headerHeight = header ? Math.round(header.getBoundingClientRect().height) : 82;
    const top = el.getBoundingClientRect().top + window.scrollY - headerHeight - 8;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  const handleNavigateSection = (sectionId: string) => {
    scrollToSection(sectionId);
  };

  const handleStartAssessment = (jointId?: JointId) => {
    if (jointId) setSelectedJoint(jointId);
    setBookingSpecialist(null);
    setIsAssessmentOpen(true);
  };

  const handleBookAppointment = (specialist: Therapist, slot: string) => {
    setBookingSpecialist(specialist);
    setBookingSlot(slot);
    setIsAssessmentOpen(true);
  };

  const handleOpenDossier = (specialist: Therapist) => {
    setDossierSpecialist(specialist);
  };

  const handleOpenEvidence = (modality: Modality) => {
    setEvidenceModality(modality);
  };

  return (
    <>
      <main className="flex-1">
        <HeroSection
          selectedJoint={selectedJoint}
          onSelectJoint={setSelectedJoint}
          onStartAssessment={handleStartAssessment}
          onExploreBody={() => handleNavigateSection('symptom-localization')}
        />

        <KineticMovementManifesto
          onExploreTriage={() => handleNavigateSection('symptom-localization')}
        />

        <SymptomLocalization
          selectedJoint={selectedJoint}
          onSelectJoint={setSelectedJoint}
          onStartAssessment={handleStartAssessment}
        />

        <SpecialistFaculty
          onOpenDossier={handleOpenDossier}
          onBookAppointment={handleBookAppointment}
        />

        {/* <ClinicalModalities onOpenEvidence={handleOpenEvidence} /> */}

        <ClinicalStandards onStartAssessment={() => handleStartAssessment(selectedJoint)} />

        <AboutUs
          onNavigateHome={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          onNavigateContact={() => handleNavigateSection('contact-us')}
          onStartAssessment={(joint?: JointId) => handleStartAssessment(joint)}
        />

        <ContactUs
          onNavigateHome={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          onStartAssessment={(joint?: JointId) => handleStartAssessment(joint)}
        />
      </main>

      <Footer onNavigateSection={handleNavigateSection} />
      
<StickyBookingBar onQuickBook={handleBookAppointment} />

      <AssessmentModal
        isOpen={isAssessmentOpen}
        onClose={() => setIsAssessmentOpen(false)}
        initialJoint={selectedJoint}
        preselectedSpecialist={bookingSpecialist}
        preselectedSlot={bookingSlot}
      />

      <SpecialistDossierModal
        specialist={dossierSpecialist}
        onClose={() => setDossierSpecialist(null)}
        onBook={(specialist, slot) => {
          setDossierSpecialist(null);
          handleBookAppointment(specialist, slot);
        }}
      />

      <ClinicalEvidenceModal
        modality={evidenceModality}
        onClose={() => setEvidenceModality(null)}
      />
    </>
  );
}

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedJoint, setSelectedJoint] = useState<JointId>('knee');

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (!el) return;
    const header = document.querySelector('header');
    const headerHeight = header ? Math.round(header.getBoundingClientRect().height) : 82;
    const top = el.getBoundingClientRect().top + window.scrollY - headerHeight - 8;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  const handleNavigateSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => scrollToSection(sectionId), 60);
      return;
    }
    scrollToSection(sectionId);
  };

  const handleStartAssessment = (jointId?: JointId) => {
    if (jointId) setSelectedJoint(jointId);
    navigate('/');
  };

  const handleLogin = () => navigate('/login');
  const handleRegister = () => navigate('/register');
  const handleNavigateHome = () => navigate('/');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('email');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#F9F8F5] text-[#181816] font-editorial-sans selection:bg-[#C59E5F]/30 selection:text-[#181816] flex flex-col bg-washi-grain">
      <Header
        onFindTherapist={() => handleStartAssessment(selectedJoint)}
        onNavigateSection={handleNavigateSection}
        onNavigateHome={handleNavigateHome}
        onLogin={handleLogin}
        onRegister={handleRegister}
        onLogout={handleLogout}
      />

      <Routes>
        <Route path="/" element={<LandingExperience />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/therapists"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <TherapistListPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}