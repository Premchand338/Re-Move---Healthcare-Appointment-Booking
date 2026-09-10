/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { JointId, Specialist, Modality } from './types';
import { SPECIALISTS_DATA } from './data/clinicalData';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { KineticMovementManifesto } from './components/KineticMovementManifesto';
import { SymptomLocalization } from './components/SymptomLocalization';
import { SpecialistFaculty } from './components/SpecialistFaculty';
import { ClinicalModalities } from './components/ClinicalModalities';
import { RehabilitationTrajectory } from './components/RehabilitationTrajectory';
import { ClinicalStandards } from './components/ClinicalStandards';
import { Footer } from './components/Footer';
import { StickyBookingBar } from './components/StickyBookingBar';
import { AssessmentModal } from './components/AssessmentModal';
import { SpecialistDossierModal } from './components/SpecialistDossierModal';
import { ClinicalEvidenceModal } from './components/ClinicalEvidenceModal';
import { ContactUs } from './components/ContactUs';

export default function App() {
  const [selectedJoint, setSelectedJoint] = useState<JointId>('knee');
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);
  const [bookingSpecialist, setBookingSpecialist] = useState<Specialist | null>(null);
  const [bookingSlot, setBookingSlot] = useState<string>('6:30 PM');
  const [dossierSpecialist, setDossierSpecialist] = useState<Specialist | null>(null);
  const [evidenceModality, setEvidenceModality] = useState<Modality | null>(null);

  // Smooth scroll helper to section
  const handleNavigateSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleStartAssessment = (jointId?: JointId) => {
    if (jointId) {
      setSelectedJoint(jointId);
    }
    setBookingSpecialist(null);
    setIsAssessmentOpen(true);
  };

  const handleBookAppointment = (specialist: Specialist, slot: string) => {
    setBookingSpecialist(specialist);
    setBookingSlot(slot);
    setIsAssessmentOpen(true);
  };

  const handleOpenDossier = (specialist: Specialist) => {
    setDossierSpecialist(specialist);
  };

  const handleOpenEvidence = (modality: Modality) => {
    setEvidenceModality(modality);
  };

  return (
    <div className="min-h-screen bg-[#F9F8F5] text-[#181816] font-editorial-sans selection:bg-[#C59E5F]/30 selection:text-[#181816] flex flex-col bg-washi-grain">
      {/* Editorial Navigation Header */}
      <Header
        onFindTherapist={() => handleStartAssessment(selectedJoint)}
        onNavigateSection={handleNavigateSection}
      />

      {/* Main Content Sections */}
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
        {/* <ClinicalModalities onOpenEvidence={handleOpenEvidence} /> */}

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
      <StickyBookingBar
        specialist={SPECIALISTS_DATA[0]}
        onQuickBook={() => handleBookAppointment(SPECIALISTS_DATA[0], '6:30 PM')}
      />

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
    </div>
  );
}
