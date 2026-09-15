import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'EN' | 'HI';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  EN: {
    // Top Bar
    directAccess: 'DIRECT ACCESS · NO REFERRAL REQUIRED',
    mumbaiThaneBhiwandi: 'Movement Clinics: Mumbai · Thane · Bhiwandi',
    callDesk: 'Helpline: +91 22 6821 4400',

    // Nav
    navHome: 'Home',
    navTriage: 'Symptom Triage',
    navSpecialists: 'Specialists',
    navManifesto: 'Care Approach',
    navAbout: 'About Us',
    navContact: 'Contact & Clinics',
    patientPortal: 'Patient Portal',
    login: 'Login',
    reserveSession: 'Book Appointment',

    // Hero
    heroPill: 'PHYSICAL THERAPY & MOVEMENT CLINIC',
    heroDirectNotice: 'Direct Appointments (No Doctor Referral Needed)',
    heroTitlePrefix: 'Expert physiotherapy for',
    heroHeadlineSuffix: 'designed to help you heal faster.',
    heroSubtitle: 'Personalized 1-on-1 care with doctoral physical therapists in Mumbai, Thane, and Bhiwandi. We identify the root cause of your pain and guide you through safe, lasting recovery.',
    heroLocationsTag: 'Serving Mumbai · Thane · Bhiwandi',

    // Rotating Conditions (Simple, readable, low cognitive load)
    cond1Title: 'Back Pain & Sciatica',
    cond1Sub: 'Gentle spinal decompression and posture strengthening',
    cond2Title: 'Knee Pain & ACL Recovery',
    cond2Sub: 'Strengthen joints and return to active walking and sports',
    cond3Title: 'Neck Stiffness & Cervical Relief',
    cond3Sub: 'Relieve desk-work tension and restore free neck movement',
    cond4Title: 'Shoulder & Rotator Cuff Healing',
    cond4Sub: 'Hands-on therapy to reach overhead without pain',
    cond5Title: 'Sports Injury Rehabilitation',
    cond5Sub: 'Guided recovery plans for runners, gym athletes & players',
    cond6Title: 'Post-Surgery Recovery',
    cond6Sub: 'Doctor-guided rehabilitation following orthopedic surgery',

    // Quick Search
    searchLabelPain: 'Where does it hurt?',
    searchLabelLocation: 'Select Clinic Location',
    searchLabelInsurance: 'Health Insurance',
    searchButton: 'FIND DOCTOR',
    quickSearchTitle: 'Common conditions we treat:',

    // Locations
    locMumbai: 'Bandra West & BKC, Mumbai',
    locThane: 'Ghodbunder Road, Thane West',
    locBhiwandi: 'Kalyan-Bhiwandi Hub (Anjurphata)',

    // Key Trust Badges
    badge1Title: '1-on-1 Doctoral Care',
    badge1Sub: 'Full 60-min sessions, no junior aides',
    badge2Title: 'Direct Cashless Claims',
    badge2Sub: 'Star Health, HDFC ERGO, ICICI, Bupa & Care',
    badge3Title: 'Prompt Appointments',
    badge3Sub: 'Same-day & next-day slots available',
    badge4Title: '4.9/5 Rating',
    badge4Sub: '2,800+ patients successfully treated',

    // Live Doctor Snapshot
    activeClinicNotice: 'TODAY\'S CLINICAL DESK',
    nextAvailableSlot: 'Next Available Slot',
    quickBookBtn: 'Book Now',
    todayAvailable: 'Today at 5:30 PM',

    // Triage Section
    triageHeading: 'Interactive 3D Body Symptom Checker',
    triageSubheading: 'Select where you feel discomfort to see recommended recovery options and available therapists.',
    triageBookBtn: 'View Specialists for',

    // Common UI
    close: 'Close',
    viewProfile: 'View Profile',
    bookConsultation: 'Book Session',
    signOut: 'Sign Out'
  },
  HI: {
    // Top Bar
    directAccess: 'सीधा संपर्क · डॉक्टर के रेफरल की आवश्यकता नहीं',
    mumbaiThaneBhiwandi: 'क्लिनिक केंद्र: मुंबई · ठाणे · भिवंडी',
    callDesk: 'हेल्पलाइन: +91 22 6821 4400',

    // Nav
    navHome: 'होम',
    navTriage: 'दर्द जांच',
    navSpecialists: 'विशेषज्ञ डॉक्टर',
    navManifesto: 'इलाज का तरीका',
    navAbout: 'हमारे बारे में',
    navContact: 'संपर्क व क्लिनिक',
    patientPortal: 'मरीज़ पोर्टल',
    login: 'लॉगिन',
    reserveSession: 'अपॉइंटमेंट बुक करें',

    // Hero
    heroPill: 'विशेषज्ञ फिजियोथेरेपी व मूवमेंट क्लिनिक',
    heroDirectNotice: 'सीधा अपॉइंटमेंट (रेफरल की आवश्यकता नहीं)',
    heroTitlePrefix: 'विशेषज्ञ फिजियोथेरेपी इलाज',
    heroHeadlineSuffix: 'ताकि आप बिना दर्द तेजी से ठीक हो सकें।',
    heroSubtitle: 'मुंबई, ठाणे और भिवंडी में अनुभवी फिजियोथेरेपिस्ट डॉक्टरों द्वारा 1-on-1 व्यक्तिगत देखभाल। दर्द के मूल कारण को समझें और सुरक्षित, स्थायी राहत पाएं।',
    heroLocationsTag: 'मुंबई · ठाणे · भिवंडी में उपलब्ध',

    // Rotating Conditions
    cond1Title: 'कमर दर्द और सायटिका',
    cond1Sub: 'रीढ़ की हड्डी के दबाव से राहत और सुरक्षित मजबूती',
    cond2Title: 'घुटने का दर्द और लिगामेंट रिकवरी',
    cond2Sub: 'जोड़ों को मजबूत करें और बिना दर्द चलना शुरू करें',
    cond3Title: 'गर्दन का दर्द और सर्वाइकल तनाव',
    cond3Sub: 'कंप्यूटर और डेस्क काम के तनाव से तुरंत मुक्ति',
    cond4Title: 'कंधे का दर्द और फ्रोजन शोल्डर',
    cond4Sub: 'हाथ को ऊपर उठाने और घुमाने में सहज राहत',
    cond5Title: 'खेल व जिम की चोट का उपचार',
    cond5Sub: 'धावकों, खिलाड़ियों और फिटनेस प्रेमियों के लिए गाइडेंस',
    cond6Title: 'सर्जरी के बाद पुनर्वास',
    cond6Sub: 'ऑर्थोपेडिक ऑपरेशन के बाद डॉक्टर निर्देशित रिकवरी',

    // Quick Search
    searchLabelPain: 'आपको कहाँ दर्द है?',
    searchLabelLocation: 'क्लिनिक का स्थान चुनें',
    searchLabelInsurance: 'हेल्थ इंश्योरेंस',
    searchButton: 'डॉक्टर खोजें',
    quickSearchTitle: 'प्रमुख समस्याएं जिनका हम इलाज करते हैं:',

    // Locations
    locMumbai: 'बांद्रा वेस्ट व बीकेसी, मुंबई',
    locThane: 'घोड़बंदर रोड, ठाणे वेस्ट',
    locBhiwandi: 'कल्याण-भिवंडी हब (अंजुरफाटा)',

    // Key Trust Badges
    badge1Title: '60 मिनट व्यक्तिगत सत्र',
    badge1Sub: 'हर मरीज़ को पूरा 1-on-1 समय',
    badge2Title: 'कैशलेस मेडिक्लेम सुविधा',
    badge2Sub: 'स्टार हेल्थ, एचडीएफसी, आईसीआईसीआई आदि',
    badge3Title: 'तुरंत अपॉइंटमेंट',
    badge3Sub: 'आज और कल के स्लॉट तुरंत उपलब्ध',
    badge4Title: '4.9/5 रेटिंग',
    badge4Sub: '2,800+ मरीज़ों ने पाया स्थायी लाभ',

    // Live Doctor Snapshot
    activeClinicNotice: 'आज का क्लिनिकल डेस्क',
    nextAvailableSlot: 'अगला उपलब्ध स्लॉट',
    quickBookBtn: 'अभी बुक करें',
    todayAvailable: 'आज शाम 5:30 बजे',

    // Triage Section
    triageHeading: '3D बॉडी दर्द जांच टूल',
    triageSubheading: 'जिस अंग में दर्द हो उस पर क्लिक करें और उपयुक्त विशेषज्ञ डॉक्टर की जानकारी पाएं।',
    triageBookBtn: 'विशेषज्ञ डॉक्टर देखें:',

    // Common UI
    close: 'बंद करें',
    viewProfile: 'प्रोफाइल देखें',
    bookConsultation: 'परामर्श बुक करें',
    signOut: 'लॉग आउट'
  }
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'EN',
  setLanguage: () => {},
  t: (key: string) => key
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('kinetic_lang');
    return saved === 'HI' ? 'HI' : 'EN';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('kinetic_lang', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || translations.EN[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
