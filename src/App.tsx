/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { JointId, Modality } from './types';
import type { Therapist } from './types/therapist';
// import { SPECIALISTS_DATA } from './data/clinicalData';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { KineticMovementManifesto } from './components/KineticMovementManifesto';
import { SymptomLocalization } from './components/SymptomLocalization';
import { ClinicalModalities } from './components/ClinicalModalities';
import { SpecialistFaculty, SpecialistDossierModal } from './components/TherapistListPage';
import { RehabilitationTrajectory } from './components/RehabilitationTrajectory';
import { ClinicalStandards } from './components/ClinicalStandards';
import { Footer } from './components/Footer';
import { StickyBookingBar } from './components/StickyBookingBar';
import { AssessmentModal } from './components/AssessmentModal';
import { ClinicalEvidenceModal } from './components/ClinicalEvidenceModal';
import { ContactUs } from './components/ContactUs';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { AdminTherapistListPage } from './pages/admin/AdminTherapistListPage' // Admin page

function LandingExperience() {
  const [selectedJoint, setSelectedJoint] = useState<JointId>('knee');
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);
  const [bookingSpecialist, setBookingSpecialist] = useState<Therapist | null>(null);
  const [bookingSlot, setBookingSlot] = useState<string>('6:30 PM');
  const [dossierSpecialist, setDossierSpecialist] = useState<Therapist | null>(null);
  const [evidenceModality, setEvidenceModality] = useState<Modality | null>(null);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (!el) {
      return;
    }

    const header = document.querySelector('header');
    const headerHeight = header ? Math.round(header.getBoundingClientRect().height) : 82;
    const top = el.getBoundingClientRect().top + window.scrollY - headerHeight - 8;

    window.scrollTo({ top, behavior: 'smooth' });
  };

  // Smooth scroll helper to section
  const handleNavigateSection = (sectionId: string) => {
    scrollToSection(sectionId);
  };

  const handleStartAssessment = (jointId?: JointId) => {
    if (jointId) {
      setSelectedJoint(jointId);
    }
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
        {/* Hero Section with Live 3D Musculoskeletal Visualizer & Clinical Stats */}
        <HeroSection
          selectedJoint={selectedJoint}
          onSelectJoint={setSelectedJoint}
          onStartAssessment={handleStartAssessment}
          onExploreBody={() => handleNavigateSection('symptom-localization')}
        />

        {/* The Kinetic Foundation & Biomechanical Movement Manifesto */}
        <KineticMovementManifesto
          onExploreTriage={() => handleNavigateSection('symptom-localization')}
        />

        {/* Section 1: Symptom Localization (Dual Layout & 360° Real Body Engine) */}
        <SymptomLocalization
          selectedJoint={selectedJoint}
          onSelectJoint={setSelectedJoint}
          onStartAssessment={handleStartAssessment}
        />

        {/* Section 2: Dedicated Clinical Faculty (Matched Cards with Audio Rationale) */}
       <SpecialistFaculty 
  onOpenDossier={handleOpenDossier}
  onBookAppointment={handleBookAppointment}
/>

        {/* Section 3: Clinical Modalities & Peer-Reviewed Literature */}
        <ClinicalModalities onOpenEvidence={handleOpenEvidence} />

        {/* Section 4: Rehabilitation Trajectory (5-Phase Progression Timeline) */}
        {/* <RehabilitationTrajectory /> */}

        {/* Section 5: The Kinetic Standard in India & Worldwide */}
        <ClinicalStandards onStartAssessment={() => handleStartAssessment(selectedJoint)} />

        <ContactUs
          onNavigateHome={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          onStartAssessment={(joint?: JointId) => handleStartAssessment(joint)}
        />
      </main>

      {/* Architectural Dark Footer */}
      <Footer onNavigateSection={handleNavigateSection} />

      {/* Pinned Sticky Quick Booking Bar */}
      {/* <StickyBookingBar
        specialist={SPECIALISTS_DATA[0]}
        onQuickBook={() => handleBookAppointment(SPECIALISTS_DATA[0], '6:30 PM')}
      /> */}

      {/* Modals */}
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
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);
  const [bookingSpecialist, setBookingSpecialist] = useState<Therapist | null>(null);
  const [bookingSlot, setBookingSlot] = useState<string>('6:30 PM');
  const [dossierSpecialist, setDossierSpecialist] = useState<Therapist | null>(null);
  const [evidenceModality, setEvidenceModality] = useState<Modality | null>(null);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (!el) {
      return;
    }

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
    if (jointId) {
      setSelectedJoint(jointId);
    }
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

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  const handleNavigateHome = () => {
    navigate('/');
  };

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
        <Route path="/admin/therapists" element={<AdminTherapistListPage />} />
      </Routes>
    </div>
  );
}
