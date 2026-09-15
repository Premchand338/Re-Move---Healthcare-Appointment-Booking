import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award,
  BookOpen,
  Activity,
  HeartHandshake,
  CheckCircle2,
  Calendar,
  Compass,
  ArrowUpRight,
  MapPin,
  Clock,
  Users
} from 'lucide-react';
// import labSpaceImg from '../assets/images/kinetic_lab_space_1788954694336.jpg';
import labSpaceImg from '../assets/images/hero_physiotherapy_1788460964008.jpg';
import { useLanguage } from '../context/LanguageContext';

interface AboutUsProps {
  onNavigateHome: () => void;
  onNavigateContact: () => void;
  onStartAssessment: () => void;
}

export const AboutUs: React.FC<AboutUsProps> = ({
  onNavigateHome,
  onNavigateContact,
  onStartAssessment
}) => {
  const { language, t } = useLanguage();
  const [activePrinciple, setActivePrinciple] = useState<number>(0);

  const clinicalPrinciples = [
    {
      num: '01',
      titleEN: 'Natural Asymmetry & Dynamic Equilibrium',
      titleHI: 'स्वाभाविक शारीरिक संतुलन व गतिशीलता',
      meaningEN:
        'The human body is never mathematically identical on both sides. Imposing rigid, artificial symmetry causes joint impingement. We harmonize your lived asymmetry into effortless dynamic balance.',
      meaningHI:
        'मानव शरीर दोनों तरफ गणितीय रूप से बिल्कुल एक जैसा नहीं होता। कठोर कृत्रिम नियमों के बजाय हम आपके शरीर के स्वाभाविक लचीलेपन और संतुलन को पुनर्स्थापित करते हैं।',
      metricEN: 'Bilateral Dynamic Equilibrium',
      metricHI: 'द्विपक्षीय गतिशील संतुलन'
    },
    {
      num: '02',
      titleEN: 'Clinical Clarity: Zero Clutter or Placebos',
      titleHI: 'स्पष्ट वैज्ञानिक उपचार: कोई दिखावा या खानापूर्ति नहीं',
      meaningEN:
        'Conventional clinics overwhelm patients with passive machines, ultrasound wands, and confusing jargon. We focus exclusively on active doctoral manual care and progressive load training.',
      meaningHI:
        'पारंपरिक क्लीनिकों में मरीजों को हीटिंग पैड लगाकर छोड़ दिया जाता है। हम केवल वरिष्ठ डॉक्टर द्वारा निर्देशित 1-on-1 मैनुअल थेरेपी और वैज्ञानिक अभ्यासों पर केंद्रित रहते हैं।',
      metricEN: 'Zero Passive Machine Placebos',
      metricHI: 'शून्य निष्क्रिय मशीनें'
    },
    {
      num: '03',
      titleEN: 'The Spatial Interval: Joint Decompression',
      titleHI: 'प्राकृतिक अंतराल (MA): जोड़ों और नसों का तनाव-मुक्त होना',
      meaningEN:
        'Applying the principle of "Ma" (spatial pause and breathing room), compressed spinal nerves and cartilage heal when tension is released through precision vector mobilization.',
      meaningHI:
        'स्पेशल अंतराल सिद्धांत के अनुसार, जब संकुचित डिस्क और दबी हुई नसों के बीच का दबाव हटता है, तो शरीर प्राकृतिक रूप से दर्द से मुक्त होकर तेजी से ठीक होता है।',
      metricEN: 'Micro-Joint Decompression',
      metricHI: 'माइक्रो-जॉइंट डीकंप्रेशन'
    },
    {
      num: '04',
      titleEN: 'Understated Mastery & Doctoral Care',
      titleHI: 'वरिष्ठ डॉक्टरों की प्रत्यक्ष देखरेख और अनुभव',
      meaningEN:
        'Clinical excellence requires neither flash nor hype. Our doctoral specialists practice quiet, deeply honed manual mobilization, letting patient outcomes speak through restored mobility.',
      meaningHI:
        'हमारा क्लिनिकल स्टाफ उच्च योग्यता प्राप्त फिजियोथेरेपिस्टों से युक्त है जो शांति और धैर्य के साथ हर मरीज की समस्या की जड़ तक जाकर उसका समाधान करते हैं।',
      metricEN: '100% Doctoral-Led Care',
      metricHI: '१००% डॉक्टर-निर्देशित उपचार'
    },
    {
      num: '05',
      titleEN: 'Tranquil Movement Environment',
      titleHI: 'शांत और आरामदायक क्लिनिकल वातावरण',
      meaningEN:
        'We reject chaotic, sterile, noisy hospital corridors. Kinetic clinics in Mumbai, Thane, and Bhiwandi offer quiet, private treatment suites with acoustic calm and focused attention.',
      meaningHI:
        'अस्पताल के शोर-शराबे और तनाव से दूर, हमारे मुंबई, ठाणे और भिवंडी के केंद्र शांतिपूर्ण, निजी और आरामदायक वातावरण प्रदान करते हैं।',
      metricEN: 'Private 1-on-1 Suites',
      metricHI: 'निजी उपचार केबिन'
    },
    {
      num: '06',
      titleEN: 'Neuromuscular Reassurance & Confident Living',
      titleHI: 'आत्मविश्वास से भरपूर गतिविधि और भय-मुक्त गति',
      meaningEN:
        'Recovery demands calming the nervous system. By cultivating calm physiological states during movement, the neuromuscular system safely integrates new patterns without pain guarding.',
      meaningHI:
        'दर्द के डर को दूर कर शरीर में दोबारा आत्मविश्वास जगाना आवश्यक है, ताकि आप दैनिक गतिविधियों में बिना किसी झिझक के स्वतंत्र रूप से चल-फिर सकें।',
      metricEN: 'Neuromuscular Calming',
      metricHI: 'न्यूरोमस्कुलर री-एजुकेशन'
    }
  ];

  const milestones = [
    {
      year: '2019',
      titleEN: 'Bandra West & BKC Movement Lab',
      titleHI: 'बांद्रा वेस्ट व बीकेसी फ्लैगशिप क्लिनिक',
      descriptionEN:
        'Established our first comprehensive movement and biomechanics center in Bandra West, introducing doctoral direct-access physical therapy with zero referral delays.',
      descriptionHI:
        'बांद्रा वेस्ट में आधुनिक मूवमेंट व बायोमैकेनिक्स लैब की शुरुआत, बिना किसी रेफरल के सीधे डॉक्टर परामर्श की सुविधा।'
    },
    {
      year: '2021',
      titleEN: 'Thane West Center (Ghodbunder Road)',
      titleHI: 'ठाणे वेस्ट मूवमेंट सेंटर (घोडबंदर रोड)',
      descriptionEN:
        'Opened a dedicated orthopedic and sports injury center at Viviana Galleria, serving families and professionals across Thane, Mulund, and surrounding corridors.',
      descriptionHI:
        'विवियाना गैलेरिया घोडबंदर रोड पर हड्डी व स्पोर्ट्स इंजरी क्लिनिक की स्थापना, ठाणे और मुलुंड के निवासियों के लिए सुलभ।'
    },
    {
      year: '2023',
      titleEN: 'Bhiwandi Comprehensive Hub (Anjurphata)',
      titleHI: 'भिवंडी कॉम्प्रिहेंसिव रिहैब हब (अंजुरफाटा)',
      descriptionEN:
        'Launched our expansive rehabilitation hub near Anjurphata Junction, providing affordable, world-class physical therapy and direct cashless TPA processing.',
      descriptionHI:
        'अंजुरफाटा जंक्शन के पास विशाल पुनर्वास केंद्र का शुभारंभ, जहां विश्वस्तरीय फिजियोथेरेपी व कैशलेस टीपीए डेस्क उपलब्ध है।'
    },
    {
      year: 'Present',
      titleEN: 'Connected Network Across Mumbai Region',
      titleHI: 'मुंबई, ठाणे व भिवंडी में अग्रणी नेटवर्क',
      descriptionEN:
        'Treating over 3,400 active patients annually across Mumbai, Thane, and Bhiwandi with direct cashless approval across Star Health, HDFC ERGO, ICICI Lombard, and Care.',
      descriptionHI:
        'मुंबई, ठाणे और भिवंडी में प्रतिवर्ष ३,४०० से अधिक मरीजों का सफल उपचार और स्टार हेल्थ, एचडीएफसी अर्गो आदि से कैशलेस टीपीए सुविधा।'
    }
  ];

  return (
    <section id="about-us" className="bg-[#FFFDF4] text-[#181816] min-h-screen py-10 lg:py-16">
      
      {/* Top Breadcrumb & Asymmetrical Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-clinical-mono text-[#7A766E] mb-8 pb-4 border-b border-[#E8E3CE]">
          <button
            onClick={onNavigateHome}
            className="hover:text-[#181816] transition-colors cursor-pointer"
          >
            {t('navHome')}
          </button>
          <span>/</span>
          <span className="text-[#181816] font-bold">
            {language === 'HI' ? 'हमारे बारे में · क्लिनिकल दृष्टिकोण' : 'ABOUT KINETIC · CLINICAL CARE PHILOSOPHY'}
          </span>
        </div>

        {/* Asymmetrical Hero Grid: 7-col text + 5-col image balance */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center pb-16 lg:pb-24 border-b border-[#E8E3CE]">
          
          {/* Left Column (7 cols): Editorial Narrative */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FEF9C3] border border-[#181816] rounded-full text-xs font-clinical-mono text-[#181816] mb-4 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#181816]" />
              <span className="uppercase tracking-widest">
                {language === 'HI' ? 'प्राकृतिक स्पेस और संतुलन' : 'MA PRINCIPLE · SPATIAL INTERVAL & EQUILIBRIUM'}
              </span>
            </div>

            <h1 className="font-editorial-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#181816] leading-[1.12] mb-6">
              {language === 'HI' 
                ? 'जहां जोड़ों का प्राकृतिक स्पेस और समर्पित डॉक्टर आपको बिना दर्द चलने की आजादी देते हैं।'
                : 'Where anatomical breathing room meets doctoral orthopedic physical therapy.'}
            </h1>

            <p className="font-editorial-sans text-base sm:text-lg text-[#5A5750] leading-relaxed mb-6 max-w-2xl">
              {language === 'HI'
                ? 'काइनेटिक की स्थापना एक स्पष्ट विश्वास के साथ की गई थी: मानव शरीर भीड़भाड़ वाले, मशीनों से भरे अस्पतालों में नहीं, बल्कि शांत वातावरण में वरिष्ठ डॉक्टरों की प्रत्यक्ष मैनुअल थेरेपी और व्यक्तिगत मार्गदर्शन से स्वस्थ होता है।'
                : 'Kinetic was founded on a singular conviction: human joints do not heal in noisy, factory-like hospital rows with passive machines. They recover when doctoral physical therapists honor the natural movement of the body through gentle joint decompression and 1-on-1 guided recovery.'}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onStartAssessment}
                className="bg-[#FFF04B] hover:bg-[#FEE135] text-[#181816] px-6 py-3.5 rounded-2xl text-xs font-clinical-mono uppercase tracking-wider font-bold border-2 border-[#181816] transition-all flex items-center gap-2 cursor-pointer shadow-sm hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>{t('reserveSession')}</span>
                <ArrowRight size={13} className="text-[#181816]" />
              </button>

              <button
                onClick={onNavigateContact}
                className="bg-white hover:bg-[#FEF9C3] text-[#181816] px-6 py-3.5 rounded-2xl text-xs font-clinical-mono uppercase tracking-wider font-bold border border-[#E8E3CE] hover:border-[#181816] transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>{language === 'HI' ? 'क्लिनिक केंद्र देखें' : 'Explore Mumbai Clinics'}</span>
                <Compass size={14} className="text-[#7A766E]" />
              </button>
            </div>
          </div>

          {/* Right Column (5 cols): Photographic Sanctuary Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="absolute -top-4 -right-4 w-full h-full bg-[#FEF9C3] rounded-3xl -z-10 border border-[#E8E3CE] transform rotate-1" />
            
            <div className="bg-white p-3 rounded-3xl border-2 border-[#E8E3CE] real-shadow-xl overflow-hidden group">
              <div className="relative aspect-4/3 rounded-2xl overflow-hidden">
                <img
                  src={labSpaceImg}
                  alt="Kinetic Movement Lab architectural interior with calm natural light"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                {/* Floating Architectural Annotation Tag */}
                <div className="absolute bottom-3 left-3 bg-[#181816]/95 backdrop-blur-md text-[#FFF04B] px-3 py-1.5 rounded-xl border border-white/20 text-[11px] font-clinical-mono flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFF04B] animate-pulse" />
                  <span>Bandra West &amp; BKC Movement Lab</span>
                </div>
              </div>

              <div className="p-4 flex items-center justify-between text-xs font-clinical-mono text-[#7A766E]">
                <span>Acoustic Calm &amp; Ample Natural Light</span>
                <span className="text-[#181816] font-bold">Mumbai · Thane · Bhiwandi</span>
              </div>
            </div>
          </div>

        </div>

        {/* SECTION 2: THE 6 CLINICAL PRINCIPLES (INTERACTIVE) */}
        <div className="py-16 lg:py-24 border-b border-[#E8E3CE]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="flex items-center gap-2 text-xs font-clinical-mono uppercase tracking-[0.2em] text-[#181816] mb-2 font-bold">
                <Sparkles size={13} className="text-[#181816]" />
                <span>{language === 'HI' ? 'उपचार के मूल सिद्धांत' : 'The Architecture of Healing'}</span>
              </div>
              <h2 className="font-editorial-serif text-3xl sm:text-4xl text-[#181816] font-normal">
                {language === 'HI' ? 'काइनेटिक के ६ क्लिनिकल सिद्धांत' : 'The Six Kinetic Clinical Tenets'}
              </h2>
            </div>
            <p className="text-sm text-[#5A5750] font-editorial-sans max-w-md leading-relaxed">
              {language === 'HI'
                ? 'प्राकृतिक स्थान (Ma) और वैज्ञानिक फिजियोथेरेपी का सामंजस्य आपके जोड़ों को तनावमुक्त कर स्वाभाविक रूप से दर्द समाप्त करता है।'
                : 'The principle of Ma (spatial breathing room) guides how we decompress nerves, restore posture, and eliminate chronic pain permanently.'}
            </p>
          </div>

          {/* Asymmetrical 2-Column Presentation */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Col (5 cols): Interactive Principles List */}
            <div className="lg:col-span-5 space-y-3">
              {clinicalPrinciples.map((p, idx) => {
                const isSelected = activePrinciple === idx;
                return (
                  <button
                    key={p.num}
                    onClick={() => setActivePrinciple(idx)}
                    className={`w-full text-left p-4.5 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-[#FEF9C3] border-2 border-[#181816] real-shadow-sm scale-[1.01]'
                        : 'bg-white border-[#E8E3CE] hover:bg-[#FDFBF0] hover:border-[#181816]'
                    }`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <span className="w-7 h-7 rounded-xl bg-[#181816] text-[#FFF04B] font-clinical-mono text-xs font-bold flex items-center justify-center shrink-0">
                        {p.num}
                      </span>
                      <div className="truncate">
                        <div className="font-editorial-serif text-base text-[#181816] font-medium truncate">
                          {language === 'HI' ? p.titleHI : p.titleEN}
                        </div>
                        <div className="text-[11px] font-clinical-mono text-[#7A766E] truncate">
                          {language === 'HI' ? p.metricHI : p.metricEN}
                        </div>
                      </div>
                    </div>

                    <ArrowRight
                      size={14}
                      className={`shrink-0 transition-transform ${
                        isSelected ? 'text-[#181816] translate-x-1' : 'text-[#7A766E]'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Right Col (7 cols): Deep-Dive Principle Detail Card */}
            <div className="lg:col-span-7">
              {clinicalPrinciples[activePrinciple] && (
                <div className="bg-white rounded-3xl border-2 border-[#181816] p-7 sm:p-9 real-shadow-lg relative overflow-hidden">
                  <div className="flex items-center justify-between border-b border-[#E8E3CE] pb-4 mb-6">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-clinical-mono font-bold uppercase tracking-wider text-[#7A766E]">
                        {language === 'HI' ? 'विस्तृत विवरण' : 'Core Biomechanical Principle'}
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#181816]" />
                      <span className="text-xs font-clinical-mono font-bold text-[#181816]">
                        #{clinicalPrinciples[activePrinciple].num}
                      </span>
                    </div>

                    <span className="text-xs font-clinical-mono font-bold bg-[#FFF04B] text-[#181816] px-3 py-1 rounded-full border border-[#181816]">
                      {language === 'HI' ? clinicalPrinciples[activePrinciple].metricHI : clinicalPrinciples[activePrinciple].metricEN}
                    </span>
                  </div>

                  <h3 className="font-editorial-serif text-2xl sm:text-3xl text-[#181816] font-normal mb-4 leading-snug">
                    {language === 'HI' ? clinicalPrinciples[activePrinciple].titleHI : clinicalPrinciples[activePrinciple].titleEN}
                  </h3>

                  <p className="font-editorial-sans text-base text-[#5A5750] leading-relaxed mb-6">
                    {language === 'HI' ? clinicalPrinciples[activePrinciple].meaningHI : clinicalPrinciples[activePrinciple].meaningEN}
                  </p>

                  <div className="bg-[#FDFBF0] p-4 rounded-2xl border border-[#E8E3CE] flex items-center justify-between gap-4">
                    <div className="text-xs font-clinical-mono text-[#5A5750]">
                      {language === 'HI' 
                        ? 'प्रत्येक सत्र में 1-on-1 डॉक्टर देखरेख और निरंतर रिकवरी ट्रैकिंग'
                        : 'Dedicated 60-min sessions with continuous objective kinematic evaluation.'}
                    </div>
                    <button
                      onClick={onStartAssessment}
                      className="bg-[#181816] text-[#FFF04B] px-4 py-2 rounded-xl text-xs font-clinical-mono font-bold hover:bg-[#2A2A26] transition-colors cursor-pointer shrink-0"
                    >
                      {t('quickBookBtn')}
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* SECTION 3: MILESTONES & MUMBAI / THANE / BHIWANDI NETWORK */}
        <div className="py-16 lg:py-24">
          <div className="max-w-2xl mb-12">
            <div className="flex items-center gap-2 text-xs font-clinical-mono uppercase tracking-[0.2em] text-[#181816] mb-2 font-bold">
              <MapPin size={13} className="text-[#181816]" />
              <span>{language === 'HI' ? 'हमारा सफर' : 'Our Clinical Journey'}</span>
            </div>
            <h2 className="font-editorial-serif text-3xl sm:text-4xl text-[#181816] font-normal">
              {language === 'HI' ? 'मुंबई, ठाणे और भिवंडी में उत्कृष्टता' : 'Expanding Care Across Mumbai, Thane & Bhiwandi'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((m) => (
              <div
                key={m.year}
                className="bg-white p-6 rounded-3xl border border-[#E8E3CE] hover:border-[#181816] transition-all real-shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="font-clinical-mono text-2xl font-black text-[#181816] mb-2">
                    {m.year}
                  </div>
                  <h4 className="font-editorial-serif text-lg font-bold text-[#181816] mb-2">
                    {language === 'HI' ? m.titleHI : m.titleEN}
                  </h4>
                  <p className="font-editorial-sans text-xs text-[#5A5750] leading-relaxed">
                    {language === 'HI' ? m.descriptionHI : m.descriptionEN}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#E8E3CE] text-[11px] font-clinical-mono text-[#7A766E] flex items-center justify-between">
                  <span>Direct Access</span>
                  <CheckCircle2 size={13} className="text-emerald-600" />
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Action CTA */}
          <div className="mt-14 bg-[#181816] text-[#F9F8F5] rounded-3xl p-8 sm:p-10 border-2 border-[#181816] flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-editorial-serif text-2xl sm:text-3xl text-white font-normal mb-2">
                {language === 'HI' ? 'क्या आप पुराने दर्द से मुक्ति चाहते हैं?' : 'Ready to restore your movement without pain?'}
              </h3>
              <p className="font-editorial-sans text-sm text-neutral-300 max-w-xl">
                {language === 'HI'
                  ? 'हमारे बांद्रा वेस्ट, ठाणे या भिवंडी क्लिनिक में परामर्श बुक करें। कैशलेस टीपीए सुविधा उपलब्ध।'
                  : 'Book a comprehensive consultation at Bandra West, Thane, or Bhiwandi. Instant cashless TPA approval.'}
              </p>
            </div>

            <button
              onClick={onStartAssessment}
              className="bg-[#FFF04B] hover:bg-[#FEE135] text-[#181816] px-6 py-3.5 rounded-2xl text-xs font-clinical-mono uppercase tracking-wider font-bold border-2 border-[#181816] transition-all flex items-center gap-2 cursor-pointer shrink-0 shadow-sm hover:scale-105 active:scale-95"
            >
              <span>{t('reserveSession')}</span>
              <ArrowRight size={14} className="text-[#181816]" />
            </button>
          </div>

        </div>

      </div>

    </section>
  );
};
