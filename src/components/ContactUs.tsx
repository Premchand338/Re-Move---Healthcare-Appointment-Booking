import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { JointId } from '../types';

interface ContactUsProps {
  onNavigateHome: () => void;
  onStartAssessment: (joint?: JointId) => void;
}

interface SanctuaryLocation {
  id: string;
  city: string;
  kanji: string;
  name: string;
  district: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  transit: string;
  chiefDoctor: string;
}

export const ContactUs: React.FC<ContactUsProps> = ({
  onNavigateHome,
  onStartAssessment
}) => {
  const [selectedSanctuary, setSelectedSanctuary] = useState<string>('mumbai');
  const [inquiryType, setInquiryType] = useState<string>('new-patient');
  const [selectedJoint, setSelectedJoint] = useState<JointId>('knee');
  
  // Form input states
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    timeWindow: 'morning',
    notes: '',
    hasMriScan: false
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');

  const sanctuaries: SanctuaryLocation[] = [
    {
      id: 'mumbai',
      city: 'Mumbai',
      kanji: '孟買',
      name: 'BKC Movement Sanctuary',
      district: 'Bandra Kurla Complex, Bandra East',
      address: 'Suite 402, Maker Maxity North Tower, BKC, Mumbai 400051',
      phone: '+91 22 4910 8820',
      email: 'bkc@kinetic-health.com',
      hours: 'Mon – Sat: 07:30 – 20:30 · Sun: 09:00 – 16:00',
      transit: 'Valet parking available at North Tower Lobby · 5 min from Bandra Terminus',
      chiefDoctor: 'Dr. Kenjiro Takahashi, DPT, OCS'
    },
    {
      id: 'bengaluru',
      city: 'Bengaluru',
      kanji: '班加羅爾',
      name: 'Indiranagar Kinematic Lab',
      district: '100ft Road, HAL 2nd Stage',
      address: 'Plot 784, 100ft Road, Indiranagar, Bengaluru 560038',
      phone: '+91 80 4729 3310',
      email: 'blr@kinetic-health.com',
      hours: 'Mon – Sat: 07:30 – 20:30 · Sun: 09:00 – 15:00',
      transit: 'Dedicated patient parking bays · 400m from Indiranagar Metro Station',
      chiefDoctor: 'Dr. Ananya Iyer, DPT, SCS'
    },
    {
      id: 'delhi',
      city: 'New Delhi',
      kanji: '新徳里',
      name: 'Chanakyapuri Orthopedic Sanctuary',
      district: 'Diplomatic Enclave',
      address: '14 Shantipath, Chanakyapuri, New Delhi 110021',
      phone: '+91 11 4820 1190',
      email: 'delhi@kinetic-health.com',
      hours: 'Mon – Sat: 08:00 – 20:00 · Sun: 09:00 – 14:00',
      transit: 'Diplomatic precinct valet · 10 min from Dhaula Kuan',
      chiefDoctor: 'Dr. Vikram Malhotra, DPT, FAAOMPT'
    },
    {
      id: 'tokyo',
      city: 'Tokyo',
      kanji: '東京',
      name: 'Roppongi Biomechanics Lab',
      district: 'Minato-ku, Roppongi',
      address: 'Roppongi Hills Mori Tower Level 18, 6-10-1 Roppongi, Minato City, Tokyo 106-6118',
      phone: '+81 3 5410 7700',
      email: 'tokyo@kinetic-health.com',
      hours: 'Mon – Fri: 08:00 – 19:30 · Sat: 09:00 – 17:00',
      transit: 'Direct underground concourse from Roppongi Station (Hibiya / Oedo Lines)',
      chiefDoctor: 'Dr. Kenjiro Takahashi, DPT & Dr. S. Watanabe'
    }
  ];

  const activeSanctuaryData = sanctuaries.find((s) => s.id === selectedSanctuary) || sanctuaries[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) return;
    
    // Generate an authentic clinical ticket ID
    const ref = `KIN-${Math.floor(10000 + Math.random() * 90000)}`;
    setTicketId(ref);
    setIsSubmitted(true);
  };

  return (
    <section id="contact-us" className="bg-[#FFFFFF] text-[#181816] min-h-screen py-10 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-xs font-clinical-mono text-[#7A766E] mb-8 pb-4 border-b border-[#E5E1D8]">
          <button onClick={onNavigateHome} className="hover:text-[#181816] transition-colors cursor-pointer">HOME</button>
          <span>/</span>
          <span className="text-[#C59E5F] font-bold">CONTACT US </span>
        </div>

        <div className="pb-12 border-b border-[#E5E1D8] mb-12">
          <div className="flex items-center gap-2 text-xs font-clinical-mono uppercase tracking-[0.2em] text-[#C59E5F] font-bold mb-3">
            <Sparkles size={14} />
            <span>Clinical Concierge</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <h1 className="font-editorial-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#181816] leading-[1.12]">
                Begin with a conversation.
              </h1>
            </div>
            <div className="lg:col-span-4">
              <p className="font-editorial-sans text-sm text-[#5A5750] leading-relaxed">
                Reach our clinical desk for a direct movement assessment, local clinic guidance, or a care pathway that is calm and clear.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="text-[11px] font-clinical-mono uppercase tracking-widest text-[#7A766E] mb-3 font-bold">
                Sanctuary
              </div>
              <div className="grid grid-cols-2 gap-2">
                {sanctuaries.map((s) => {
                  const isActive = selectedSanctuary === s.id;
                  return (
                    <button key={s.id} onClick={() => setSelectedSanctuary(s.id)} className={`p-3 rounded-2xl text-left border transition-all duration-150 cursor-pointer flex items-center justify-between ${isActive ? 'bg-[#181816] text-[#F9F8F5] border-[#C59E5F] real-shadow-xs scale-[1.01]' : 'bg-white text-[#4A4843] border-[#E5E1D8] hover:bg-[#F2EFE8]'}`}>
                      <div>
                        <div className="font-editorial-serif text-sm font-semibold">{s.city}</div>
                        <div className={`text-[10px] font-clinical-mono ${isActive ? 'text-[#DFBA73]' : 'text-[#7A766E]'}`}>{s.district.split(',')[0]}</div>
                      </div>
                      <span className={`font-mincho text-sm ${isActive ? 'text-[#C59E5F]' : 'text-neutral-400'}`}>{s.kanji}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E5E1D8] real-shadow-md relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-[#F2EFE8] mb-4">
                <span className="font-clinical-mono text-xs uppercase tracking-wider text-[#C59E5F] font-bold">Sanctuary · {activeSanctuaryData.city.toUpperCase()}</span>
                <span className="font-mincho text-xl font-bold text-[#181816]/30">{activeSanctuaryData.kanji}</span>
              </div>

              <h3 className="font-editorial-serif text-2xl text-[#181816] font-normal mb-1">{activeSanctuaryData.name}</h3>
              <p className="text-xs text-[#7A766E] font-editorial-sans mb-5">Clinical Lead: <strong className="text-[#181816]">{activeSanctuaryData.chiefDoctor}</strong></p>

              <div className="space-y-3.5 text-xs font-editorial-sans text-[#5A5750]">
                <div className="flex items-start gap-3"><MapPin size={15} className="text-[#C59E5F] shrink-0 mt-0.5" /><span>{activeSanctuaryData.address}</span></div>
                <div className="flex items-center gap-3"><Phone size={15} className="text-[#C59E5F] shrink-0" /><span className="font-clinical-mono font-bold text-[#181816]">{activeSanctuaryData.phone}</span></div>
                <div className="flex items-center gap-3"><Mail size={15} className="text-[#C59E5F] shrink-0" /><span className="font-clinical-mono">{activeSanctuaryData.email}</span></div>
                <div className="flex items-start gap-3"><Clock size={15} className="text-[#C59E5F] shrink-0 mt-0.5" /><span className="font-clinical-mono text-[11px]">{activeSanctuaryData.hours}</span></div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#F2EFE8] text-[11px] font-editorial-sans text-[#7A766E] flex items-center justify-between">
                <span>{activeSanctuaryData.transit}</span>
              </div>
            </div>

            <div className="bg-[#181816] text-[#F9F8F5] p-6 rounded-3xl border border-[#C59E5F]/50 real-shadow-md">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-clinical-mono uppercase tracking-widest text-[#DFBA73] font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Direct WhatsApp Desk
                </span>
                <span className="text-[10px] font-clinical-mono bg-white/10 px-2 py-0.5 rounded-full text-neutral-300">&lt; 15 min</span>
              </div>
              <p className="text-xs text-neutral-300 font-editorial-sans leading-relaxed mb-4">For urgent movement concerns, send your location and symptoms to our team.</p>
              <a href={`https://wa.me/919820144520?text=Hello%20Kinetic%20Health,%20I%20would%20like%20to%20inquire%20about%20a%20doctoral%20consultation%20at%20${activeSanctuaryData.city}`} target="_blank" rel="noreferrer" className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white px-4 py-2.5 rounded-xl text-xs font-clinical-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs hover:scale-[1.01]">
                <MessageSquare size={14} />
                <span>Message Clinic Desk</span>
              </a>
            </div>
          </div> */}

          <div className="lg:col-span-12">
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#E5E1D8] shadow-xs relative overflow-hidden">

              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <span className="text-xs font-clinical-mono uppercase tracking-widest text-[#C59E5F] font-bold block mb-1">Direct Appointment Desk</span>
                    <h2 className="font-editorial-serif text-3xl text-[#181816] font-normal mb-2">Request a Consultation</h2>
                    <p className="text-xs sm:text-sm text-[#5A5750] font-editorial-sans leading-relaxed">Share your concern and our care desk will coordinate the right movement pathway for you.</p>
                  </div>

                  {/* Purpose Selector Pills */}
                  {/* <div>
                    <label className="block text-[11px] font-clinical-mono uppercase tracking-wider text-[#7A766E] font-bold mb-2">
                      Nature of Inquiry
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { id: 'new-patient', label: 'New Evaluation' },
                        { id: 'second-opinion', label: 'Second Opinion' },
                        { id: 'post-op', label: 'Post-Op Rehab' },
                        { id: 'corporate', label: 'Biomechanics Lab' }
                      ].map((type) => (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => setInquiryType(type.id)}
                          className={`py-2 px-2.5 rounded-xl text-xs font-editorial-sans transition-all cursor-pointer font-medium ${
                            inquiryType === type.id
                              ? 'bg-[#181816] text-white shadow-xs'
                              : 'bg-[#F9F8F5] text-[#5A5750] border border-[#E5E1D8] hover:bg-[#F2EFE8]'
                          }`}
                        >
                          {type.label}
                        </button>
                      ))}
                    </div>
                  </div> */}

                  {/* Anatomical Area of Concern Selection */}
                  {/* <div>
                    <label className="block text-[11px] font-clinical-mono uppercase tracking-wider text-[#7A766E] font-bold mb-2">
                      Primary Anatomical Concern
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        { id: 'knee', label: 'Knee & ACL' },
                        { id: 'spine', label: 'Lumbar & Sciatica' },
                        { id: 'shoulder', label: 'Rotator Cuff' },
                        { id: 'cervical', label: 'Neck & Cervical' },
                        { id: 'hip', label: 'Hip & Pelvis' },
                        { id: 'ankle', label: 'Foot & Ankle' }
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setSelectedJoint(item.id as JointId)}
                          className={`text-xs px-3 py-1.5 rounded-xl font-clinical-mono transition-all cursor-pointer ${
                            selectedJoint === item.id
                              ? 'bg-[#181816] text-[#DFBA73] font-bold border border-[#C59E5F]'
                              : 'bg-white text-[#5A5750] border border-[#E5E1D8] hover:bg-[#F9F8F5]'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div> */}

                  {/* Patient Contact Inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-clinical-mono uppercase tracking-wider text-[#7A766E] font-bold mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Kenji Tanaka"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full bg-[#F9F8F5] border border-[#E5E1D8] rounded-xl px-3.5 py-2.5 text-sm text-[#181816] placeholder:text-neutral-400 focus:outline-none focus:border-[#C59E5F] focus:bg-white transition-all font-editorial-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-clinical-mono uppercase tracking-wider text-[#7A766E] font-bold mb-1.5">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98200 00000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-[#F9F8F5] border border-[#E5E1D8] rounded-xl px-3.5 py-2.5 text-sm text-[#181816] placeholder:text-neutral-400 focus:outline-none focus:border-[#C59E5F] focus:bg-white transition-all font-clinical-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-clinical-mono uppercase tracking-wider text-[#7A766E] font-bold mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="patient@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-[#F9F8F5] border border-[#E5E1D8] rounded-xl px-3.5 py-2.5 text-sm text-[#181816] placeholder:text-neutral-400 focus:outline-none focus:border-[#C59E5F] focus:bg-white transition-all font-editorial-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-clinical-mono uppercase tracking-wider text-[#7A766E] font-bold mb-1.5">
                        Preferred Arrival Window
                      </label>
                      <select
                        value={formData.timeWindow}
                        onChange={(e) => setFormData({ ...formData, timeWindow: e.target.value })}
                        className="w-full bg-[#F9F8F5] border border-[#E5E1D8] rounded-xl px-3.5 py-2.5 text-sm text-[#181816] focus:outline-none focus:border-[#C59E5F] focus:bg-white transition-all font-clinical-mono"
                      >
                        <option value="morning">Morning (08:00 – 12:00)</option>
                        <option value="afternoon">Afternoon (12:00 – 16:00)</option>
                        <option value="evening">Evening (16:00 – 20:00)</option>
                      </select>
                    </div>
                  </div>

                  {/* Clinical Description Notes */}
                  {/* <div>
                    <label className="block text-[11px] font-clinical-mono uppercase tracking-wider text-[#7A766E] font-bold mb-1.5">
                      Symptoms &amp; Clinical Background (Optional)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Briefly describe pain onset, prior diagnoses, or surgical history..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full bg-[#F9F8F5] border border-[#E5E1D8] rounded-xl p-3.5 text-sm text-[#181816] placeholder:text-neutral-400 focus:outline-none focus:border-[#C59E5F] focus:bg-white transition-all font-editorial-sans"
                    />
                  </div> */}

                  {/* Toggle: I have recent MRI/X-ray scans */}
                  <label className="flex items-center gap-2.5 cursor-pointer text-xs font-editorial-sans text-[#5A5750]">
                    <input
                      type="checkbox"
                      checked={formData.hasMriScan}
                      onChange={(e) => setFormData({ ...formData, hasMriScan: e.target.checked })}
                      className="rounded border-[#E5E1D8] text-[#181816] focus:ring-[#C59E5F] w-4 h-4"
                    />
                    <span>I have recent MRI / X-ray imaging reports to review during consultation</span>
                  </label>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full bg-[#181816] hover:bg-[#252522] text-[#F9F8F5] py-4 px-6 rounded-2xl text-xs font-clinical-mono uppercase tracking-wider font-semibold border border-[#C59E5F] hover:border-[#DFBA73] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md hover:scale-[1.01] active:scale-[0.99]"
                    >
                      <span>Dispatch to Doctoral Clinical Desk</span>
                      <Send size={14} className="text-[#DFBA73]" />
                    </button>
                    
                    <p className="text-[11px] font-clinical-mono text-[#7A766E] text-center mt-3">
                      Protected under HIPAA &amp; Medical Confidentiality Standards · Zero Referral Needed
                    </p>
                  </div>

                </form>
              ) : (
                /* Confirmation Screen with Japanese Seal Effect */
                <div className="py-8 text-center space-y-6">
                  
                  {/* Japanese Inkan / Hanko Seal */}
                  <div className="w-20 h-20 mx-auto rounded-2xl bg-[#EFECE3] border-2 border-[#C59E5F] flex flex-col items-center justify-center text-[#8C6D34] real-shadow-sm">
                    <span className="font-mincho text-2xl font-bold">受付</span>
                    <span className="text-[9px] font-clinical-mono tracking-widest uppercase font-bold">VERIFIED</span>
                  </div>

                  <div>
                    <span className="text-xs font-clinical-mono uppercase tracking-widest text-[#C59E5F] font-bold block mb-1">
                      DISPATCH REFERENCE · {ticketId}
                    </span>
                    <h3 className="font-editorial-serif text-3xl text-[#181816] font-normal mb-2">
                      Inquiry Received at {activeSanctuaryData.city} Sanctuary
                    </h3>
                    <p className="text-sm text-[#5A5750] font-editorial-sans max-w-md mx-auto leading-relaxed">
                      Thank you, <strong className="text-[#181816]">{formData.fullName}</strong>. Dr. {activeSanctuaryData.chiefDoctor.split(',')[0]} and the clinical triage team have been notified. A senior coordinator will call you at <strong className="font-clinical-mono text-[#181816]">{formData.phone}</strong> within 15 minutes during operating hours.
                    </p>
                  </div>

                  {/* Summary Box */}
                  <div className="bg-[#F9F8F5] p-5 rounded-2xl border border-[#E5E1D8] text-xs font-clinical-mono text-left max-w-md mx-auto space-y-2">
                    <div className="flex justify-between pb-1.5 border-b border-[#E5E1D8]">
                      <span className="text-[#7A766E]">Assigned Sanctuary:</span>
                      <span className="font-bold text-[#181816]">{activeSanctuaryData.name}</span>
                    </div>
                    <div className="flex justify-between pb-1.5 border-b border-[#E5E1D8]">
                      <span className="text-[#7A766E]">Anatomical Focus:</span>
                      <span className="font-bold text-[#C59E5F] uppercase">{selectedJoint}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#7A766E]">Direct Access Status:</span>
                      <span className="text-emerald-700 font-bold">Pre-Approved (No Referral Needed)</span>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
                    <button
                      onClick={() => onStartAssessment(selectedJoint)}
                      className="bg-[#181816] text-[#F9F8F5] hover:bg-[#252522] px-6 py-3 rounded-xl text-xs font-clinical-mono uppercase tracking-wider font-semibold border border-[#C59E5F] cursor-pointer"
                    >
                      Complete 2-Min 3D Body Triage
                    </button>
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({ fullName: '', phone: '', email: '', timeWindow: 'morning', notes: '', hasMriScan: false });
                      }}
                      className="bg-white hover:bg-[#F2EFE8] text-[#181816] border border-[#E5E1D8] px-6 py-3 rounded-xl text-xs font-clinical-mono uppercase tracking-wider font-bold cursor-pointer"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>

                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
