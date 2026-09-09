import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  Globe, 
  Volume2, 
  ShieldCheck, 
  CheckCircle2,
  ExternalLink,
  Info,
  X,
  Sparkles,
  Award,
  Layers,
  ChevronRight,
  Clock,
  PhoneCall,
  Activity,
  Radio
} from 'lucide-react';

interface GovtHeaderProps {
  variant?: 'light' | 'dark';
  showOfficials?: boolean;
}

interface DignitaryProfile {
  nameHi: string;
  nameEn: string;
  roleHi: string;
  roleEn: string;
  badge: string;
  badgeColor: string;
  badgeBorder: string;
  themeGradient: string;
  accentBorder: string;
  ringColor: string;
  roleTextColor: string;
  image: string;
  fallbackImage: string;
  portfolio: string;
  office: string;
  portalUrl: string;
}

export const GovtHeader: React.FC<GovtHeaderProps> = ({ 
  variant = 'light',
  showOfficials = true 
}) => {
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'larger'>('normal');
  const [lang, setLang] = useState<'EN' | 'HI'>('EN');
  const [screenReaderActive, setScreenReaderActive] = useState(false);
  const [selectedOfficial, setSelectedOfficial] = useState<DignitaryProfile | null>(null);
  const [istTime, setIstTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
      const dateStr = now.toLocaleDateString('en-IN', {
        timeZone: 'Asia/Kolkata',
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
      setIstTime(`${dateStr} • ${timeStr} IST`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Lock body scroll and close on Escape key when official modal is open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedOfficial) {
        setSelectedOfficial(null);
      }
    };
    if (selectedOfficial) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedOfficial]);

  const dignitaries: DignitaryProfile[] = [
    {
      nameHi: "श्री नरेन्द्र मोदी",
      nameEn: "Shri Narendra Modi",
      roleHi: "माननीय प्रधानमंत्री",
      roleEn: "Hon'ble Prime Minister",
      badge: "PM",
      badgeColor: "bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black",
      badgeBorder: "border-amber-400",
      themeGradient: "bg-gradient-to-br from-amber-50/80 via-white to-orange-50/40",
      accentBorder: "border-t-[3px] border-t-amber-500 border-amber-200 hover:border-amber-400 shadow-amber-500/10",
      ringColor: "ring-2 ring-amber-400 ring-offset-1",
      roleTextColor: "text-amber-800",
      image: "/gov/pm_modi.jpg",
      fallbackImage: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Narendra_Modi_Portrait_2026.jpg",
      portfolio: "Prime Minister of India, In-charge of Ministry of Personnel, Public Grievances, Pensions, Atomic Energy & Space",
      office: "Prime Minister's Office (PMO), South Block, Raisina Hill, New Delhi - 110011",
      portalUrl: "https://www.pmindia.gov.in"
    },
    {
      nameHi: "राव इन्द्रजीत सिंह",
      nameEn: "Rao Inderjit Singh",
      roleHi: "माननीय केंद्रीय राज्य मंत्री (स्व.प्र.)",
      roleEn: "Hon'ble MoS (Ind. Charge)",
      badge: "MoS",
      badgeColor: "bg-[#0B3C68] text-white font-black",
      badgeBorder: "border-blue-400",
      themeGradient: "bg-gradient-to-br from-blue-50/80 via-white to-sky-50/40",
      accentBorder: "border-t-[3px] border-t-[#0B3C68] border-blue-200 hover:border-blue-500 shadow-blue-500/10",
      ringColor: "ring-2 ring-blue-600 ring-offset-1",
      roleTextColor: "text-blue-900",
      image: "/gov/minister_rao.jpg",
      fallbackImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Rao_Inderjit_Singh_taking_over_as_Minister_of_State_%28Independent_Charge%29_for_Planning_in_May_2014_%28cropped%29.jpg/500px-Rao_Inderjit_Singh_taking_over_as_Minister_of_State_%28Independent_Charge%29_for_Planning_in_May_2014_%28cropped%29.jpg",
      portfolio: "Ministry of Statistics & Programme Implementation; Ministry of Planning; Ministry of Culture",
      office: "Khurshid Lal Bhawan, Janpath, New Delhi - 110001",
      portalUrl: "https://www.mospi.gov.in"
    },
    {
      nameHi: "डॉ. सौरभ गर्ग, भा.प्र.से.",
      nameEn: "Dr. Saurabh Garg, IAS",
      roleHi: "सचिव एवं मुख्य सांख्यिकीविद्",
      roleEn: "Secretary & CSI (MoSPI)",
      badge: "IAS",
      badgeColor: "bg-emerald-700 text-white font-black",
      badgeBorder: "border-emerald-400",
      themeGradient: "bg-gradient-to-br from-emerald-50/80 via-white to-teal-50/40",
      accentBorder: "border-t-[3px] border-t-emerald-600 border-emerald-200 hover:border-emerald-500 shadow-emerald-500/10",
      ringColor: "ring-2 ring-emerald-600 ring-offset-1",
      roleTextColor: "text-emerald-800",
      image: "/gov/sec_garg.jpg",
      fallbackImage: "https://upload.wikimedia.org/wikipedia/commons/3/33/Dr._Saurabh_Garg.jpg",
      portfolio: "Secretary, Ministry of Statistics & PI, Chief Statistician of India (CSO & NSSO Central Administration)",
      office: "Sardar Patel Bhawan, Sansad Marg, New Delhi - 110001",
      portalUrl: "https://www.mospi.gov.in"
    }
  ];

  const handleScreenReaderToggle = () => {
    const nextState = !screenReaderActive;
    setScreenReaderActive(nextState);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      if (nextState) {
        const utterance = new SpeechSynthesisUtterance("Screen reader accessibility active for Official Government of India Portal. Jan-Drishti National Surveillance System.");
        utterance.rate = 0.95;
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  return (
    <div className="w-full bg-white text-slate-800 border-b border-slate-200 select-none shadow-xs transition-all relative z-40">
      
      {/* 1. NATIONAL TIRANGA TRICOLOUR ACCENT RIBBON */}
      <div className="h-1.5 w-full flex">
        <div className="flex-1 bg-[#FF9933]"></div> {/* Saffron */}
        <div className="flex-1 bg-white relative flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-[#000080]"></div> {/* Ashoka Navy Chakra */}
        </div>
        <div className="flex-1 bg-[#138808]"></div> {/* India Green */}
      </div>

      {/* 2. GIGW 3.0 ACCESSIBILITY & SOVEREIGN TOP UTILITY STRIP */}
      <div className="px-4 sm:px-6 lg:px-8 py-1.5 text-[11px] bg-slate-100/90 border-b border-slate-200">
        <div className="max-w-[1720px] mx-auto flex flex-wrap items-center justify-between gap-3">
          
          {/* Sovereign Authority Bilingual Title */}
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 font-bold tracking-wide text-slate-800">
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
              <span className="text-amber-800 font-bold">भारत सरकार</span>
              <span className="text-slate-400">|</span>
              <span className="text-slate-800 font-bold">GOVERNMENT OF INDIA</span>
            </span>
            <span className="hidden md:inline text-slate-400">•</span>
            <span className="hidden md:inline text-slate-600 font-semibold truncate">
              {lang === 'HI' ? 'सांख्यिकी और कार्यक्रम कार्यान्वयन मंत्रालय' : 'Ministry of Statistics & Programme Implementation (MoSPI)'}
            </span>
          </div>

          {/* Center: Live Grid Status, Helpline & Central Vigilance IST Clock */}
          <div className="hidden lg:flex items-center gap-3 text-[11px]">
            <span className="inline-flex items-center gap-1.5 text-emerald-900 font-bold bg-emerald-100/90 border border-emerald-300 px-2.5 py-0.5 rounded-full shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
              <span>MoSPI Central Grid: 543 Constituencies Online</span>
            </span>
            <span className="text-slate-300">|</span>
            <span className="inline-flex items-center gap-1.5 text-amber-900 font-bold bg-amber-100/80 border border-amber-300/80 px-2.5 py-0.5 rounded-full shadow-2xs">
              <PhoneCall size={11} className="text-amber-700" />
              <span>Helpline: 1800-11-2026</span>
            </span>
            <span className="text-slate-300">|</span>
            <span className="inline-flex items-center gap-1.5 text-[#0B3C68] font-mono font-bold bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full shadow-2xs">
              <Clock size={11} className="text-[#0B3C68]" />
              <span>{istTime || '08 Sep 2026 • 19:42:00 IST'}</span>
            </span>
          </div>

          {/* Accessibility & Language Controls */}
          <div className="flex items-center gap-3">
            
            {/* Screen Reader Access */}
            <button 
              onClick={handleScreenReaderToggle}
              title="Screen Reader Access (GIGW 3.0 Standard)"
              className={`hidden sm:flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[10px] font-semibold transition-all border ${
                screenReaderActive 
                  ? 'bg-[#0B3C68] text-white border-[#0B3C68] shadow-xs' 
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
              }`}
            >
              <Volume2 size={12} className={screenReaderActive ? 'animate-bounce text-amber-400' : 'text-slate-500'} />
              <span>{screenReaderActive ? 'Screen Reader ON' : 'Screen Reader'}</span>
            </button>

            {/* Font Size Adjusters */}
            <div className="flex items-center border border-slate-300 rounded bg-white px-1 py-0.5 gap-1 text-[10px] font-bold shadow-2xs">
              <button 
                onClick={() => setFontSize('normal')}
                className={`px-1.5 py-0.2 rounded transition-colors ${fontSize === 'normal' ? 'bg-[#0B3C68] text-white font-black' : 'text-slate-600 hover:text-slate-900'}`}
                title="Default Font Size"
              >
                A-
              </button>
              <button 
                onClick={() => setFontSize('large')}
                className={`px-1.5 py-0.2 rounded transition-colors ${fontSize === 'large' ? 'bg-[#0B3C68] text-white font-black' : 'text-slate-600 hover:text-slate-900'}`}
                title="Medium Font Size"
              >
                A
              </button>
              <button 
                onClick={() => setFontSize('larger')}
                className={`px-1.5 py-0.2 rounded transition-colors ${fontSize === 'larger' ? 'bg-[#0B3C68] text-white font-black' : 'text-slate-600 hover:text-slate-900'}`}
                title="Large Font Size"
              >
                A+
              </button>
            </div>

            {/* Language Toggle */}
            <div className="flex items-center border border-slate-300 rounded bg-white overflow-hidden text-[10px] font-bold shadow-2xs">
              <button 
                onClick={() => setLang('EN')}
                className={`px-2 py-0.5 transition-colors ${lang === 'EN' ? 'bg-[#0B3C68] text-white' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                English
              </button>
              <button 
                onClick={() => setLang('HI')}
                className={`px-2 py-0.5 transition-colors ${lang === 'HI' ? 'bg-[#FF9933] text-slate-950 font-black' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                हिन्दी
              </button>
            </div>

            {/* Official Gov Domain Verification */}
            <div className="hidden lg:flex items-center gap-1.5 text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 border border-emerald-300 text-emerald-800 font-bold">
              <ShieldCheck size={12} className="text-emerald-700" />
              <span>gov.in official</span>
            </div>

          </div>

        </div>
      </div>

      {/* 3. MAIN GOVERNMENT OF INDIA INSTITUTIONAL BANNER (CLEAN, EXPANSIVE & HIGH CONTRAST) */}
      <div className={`px-4 sm:px-6 lg:px-8 py-3 w-full max-w-[1720px] mx-auto flex flex-col xl:flex-row items-center justify-between gap-4 ${
        fontSize === 'large' ? 'scale-[1.01] origin-left' : fontSize === 'larger' ? 'scale-[1.02] origin-left' : ''
      }`}>
        
        {/* Left Column: Official State Emblem & Ministry Identity */}
        <div className="flex items-center gap-4 shrink-0">
          
          {/* State Emblem of India (Ashoka Lion Capital with Satyameva Jayate) */}
          <div className="flex flex-col items-center justify-center shrink-0">
            <div className="w-14 h-18 sm:w-16 sm:h-20 flex items-center justify-center p-1.5 bg-amber-50/50 rounded-xl border border-amber-300/80 shadow-xs hover:border-amber-400 transition-all cursor-pointer" title="State Emblem of India - Ashoka Lion Capital">
              <img 
                src="/gov/emblem_india.svg" 
                alt="State Emblem of India" 
                className="w-full h-full object-contain filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.dataset.tried) {
                    target.dataset.tried = 'true';
                    target.src = 'https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg';
                  }
                }}
              />
            </div>
            <span className="text-[9px] font-black text-amber-900 tracking-wider mt-1 font-serif">
              सत्यमेव जयते
            </span>
          </div>

          {/* Institutional Titles (Bilingual) */}
          <div className="border-l-2 border-slate-300 pl-4 space-y-0.5">
            <div className="text-sm sm:text-base font-black text-[#0B3C68] tracking-tight leading-tight">
              {lang === 'HI' ? 'सांख्यिकी और कार्यक्रम कार्यान्वयन मंत्रालय' : 'सांख्यिकी और कार्यक्रम कार्यान्वयन मंत्रालय'}
            </div>
            <div className="text-xs sm:text-sm font-black text-slate-900 tracking-wide leading-tight uppercase">
              Ministry of Statistics and Programme Implementation
            </div>
            <div className="flex flex-wrap items-center gap-2 pt-0.5">
              <span className="text-[11px] font-bold text-amber-800">
                केंद्रीय सतर्कता एवं एमपीलैड्स राष्ट्रीय निगरानी प्रणाली
              </span>
              <span className="text-slate-400 hidden sm:inline">•</span>
              <span className="text-[10px] font-bold text-blue-900 bg-blue-100/90 px-2 py-0.2 rounded border border-blue-300">
                JAN-DRISHTI SENTINEL
              </span>
            </div>
          </div>

        </div>

        {/* Center: National Flagship Initiatives Showcase (Compact, Balanced & High-Contrast) */}
        <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-slate-50/90 border border-slate-200 shadow-2xs shrink min-w-0">
          
          {/* Digital India */}
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white border border-slate-200/80 shadow-2xs hover:border-blue-300 transition-all cursor-pointer" title="Digital India - Power To Empower">
            <div className="w-7 h-7 flex items-center justify-center p-0.5 rounded bg-white">
              <img 
                src="/gov/digital_india.svg" 
                alt="Digital India" 
                className="w-full h-full object-contain"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.dataset.tried) {
                    target.dataset.tried = 'true';
                    target.src = 'https://upload.wikimedia.org/wikipedia/en/9/95/Digital_India_logo.svg';
                  }
                }}
              />
            </div>
            <div className="leading-tight">
              <div className="text-[10px] font-black text-slate-900">Digital India</div>
              <div className="text-[7.5px] text-slate-500 font-semibold">Power To Empower</div>
            </div>
          </div>

          <div className="w-px h-5 bg-slate-300"></div>

          {/* Viksit Bharat @ 2047 */}
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white border border-slate-200/80 shadow-2xs hover:border-amber-300 transition-all cursor-pointer" title="Viksit Bharat @ 2047 - Sovereign Governance">
            <div className="w-7 h-7 rounded bg-gradient-to-br from-amber-500/15 via-blue-500/10 to-emerald-500/15 border border-amber-400 flex flex-col items-center justify-center text-center p-0.5">
              <div className="text-[8.5px] font-black text-amber-900 leading-none">2047</div>
              <div className="text-[6px] text-emerald-800 font-black tracking-tighter">VIKSIT</div>
            </div>
            <div className="leading-tight">
              <div className="text-[10px] font-black text-amber-900">विकसित भारत</div>
              <div className="text-[7.5px] text-slate-500 font-semibold">@ 2047 Mission</div>
            </div>
          </div>

          <div className="w-px h-5 bg-slate-300"></div>

          {/* Swachh Bharat Mission */}
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white border border-slate-200/80 shadow-2xs hover:border-emerald-300 transition-all cursor-pointer" title="Swachh Bharat Mission - एक कदम स्वच्छता की ओर">
            <div className="w-8 h-7 flex items-center justify-center p-0.5 rounded bg-white">
              <img 
                src="/gov/swachh_bharat.svg" 
                alt="Swachh Bharat" 
                className="w-full h-full object-contain"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.dataset.tried) {
                    target.dataset.tried = 'true';
                    target.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Swachh_Bharat_Mission_Logo.svg/500px-Swachh_Bharat_Mission_Logo.svg.png';
                  }
                }}
              />
            </div>
            <div className="leading-tight">
              <div className="text-[10px] font-black text-emerald-900">स्वच्छ भारत</div>
              <div className="text-[7.5px] text-slate-500 font-semibold">स्वच्छता मिशन</div>
            </div>
          </div>

          <div className="w-px h-5 bg-slate-300"></div>

          {/* National Informatics Centre (NIC) */}
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white border border-slate-200/80 shadow-2xs hover:border-blue-300 transition-all cursor-pointer" title="National Informatics Centre - STQC Audited">
            <div className="w-8 h-7 flex items-center justify-center p-0.5 rounded bg-white">
              <img 
                src="/gov/nic_logo.svg" 
                alt="NIC" 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="leading-tight">
              <div className="text-[10px] font-black text-[#0B3C68]">NIC Grid</div>
              <div className="text-[7.5px] text-emerald-700 font-semibold flex items-center gap-0.5">
                <span className="w-1 h-1 rounded-full bg-emerald-500"></span> STQC Validated
              </div>
            </div>
          </div>

        </div>

        {/* Right: Key Government Dignitaries Showcase (All 3 Leaders Clearly Visible) */}
        {showOfficials && (
          <div className="flex items-center gap-2 sm:gap-2.5 xl:gap-3 shrink-0 py-1">
            {dignitaries.map((official) => (
              <button
                key={official.nameEn}
                onClick={() => setSelectedOfficial(official)}
                className={`w-[180px] sm:w-[195px] xl:w-[210px] h-[70px] shrink-0 flex items-center gap-2.5 p-2 rounded-xl border shadow-2xs hover:shadow-md transition-all text-left cursor-pointer group focus:outline-none focus:ring-2 focus:ring-[#0B3C68]/20 ${official.themeGradient} ${official.accentBorder}`}
                title={`Click for official details of ${official.nameEn}`}
              >
                <div className="relative shrink-0">
                  <img 
                    src={official.image} 
                    alt={official.nameEn}
                    className={`w-10 h-10 rounded-full object-cover shadow-xs group-hover:scale-105 transition-transform bg-white ${official.ringColor}`}
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.dataset.tried) {
                        target.dataset.tried = 'true';
                        target.src = official.fallbackImage;
                      }
                    }}
                  />
                  <span className={`absolute -bottom-1 -right-1 px-1 py-0.2 rounded-full ${official.badgeColor} text-[7.5px] flex items-center justify-center border border-white shadow-2xs leading-none`}>
                    {official.badge}
                  </span>
                </div>
                <div className="text-left min-w-0 flex-1">
                  <div className="text-[10.5px] font-black text-slate-900 group-hover:text-[#0B3C68] transition-colors leading-tight truncate">
                    {official.nameHi}
                  </div>
                  <div className="text-[9.5px] font-bold text-slate-700 leading-tight truncate mt-0.5">
                    {official.nameEn}
                  </div>
                  <div className={`text-[8.5px] font-bold tracking-wide leading-none truncate mt-0.5 ${official.roleTextColor}`}>
                    {lang === 'HI' ? official.roleHi : official.roleEn}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

      </div>

      {/* 4. OFFICIAL DIGNITARY CREDENTIAL MODAL / DETAILS DIALOG (PORTALED DIRECTLY TO BODY) */}
      {selectedOfficial && typeof document !== 'undefined' && createPortal(
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedOfficial(null)}
        >
          <div 
            className="w-full max-w-lg bg-white border border-slate-300 rounded-2xl p-6 shadow-2xl relative text-slate-800 z-[10000] animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Modal Close Button */}
            <button 
              onClick={() => setSelectedOfficial(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Close Dialog"
            >
              <X size={18} />
            </button>

            {/* Official Header */}
            <div className="flex items-start gap-4 pb-4 border-b border-slate-200">
              <img 
                src={selectedOfficial.image} 
                alt={selectedOfficial.nameEn}
                className="w-16 h-16 rounded-full object-cover border-2 border-amber-500 shadow-md shrink-0 bg-white"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.dataset.tried) {
                    target.dataset.tried = 'true';
                    target.src = selectedOfficial.fallbackImage;
                  }
                }}
              />
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 border border-amber-300 text-amber-900 mb-1">
                  <ShieldCheck size={11} className="text-amber-700" />
                  <span>Government of India Leadership</span>
                </div>
                <h3 className="text-lg font-black text-slate-900 leading-tight">
                  {selectedOfficial.nameEn}
                </h3>
                <p className="text-xs font-bold text-amber-800">
                  {selectedOfficial.nameHi}
                </p>
                <p className="text-xs text-slate-600 font-semibold mt-0.5">
                  {selectedOfficial.roleEn} | {selectedOfficial.roleHi}
                </p>
              </div>
            </div>

            {/* Official Dossier Body */}
            <div className="py-4 space-y-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block mb-1">
                  Official Portfolio & Charge
                </span>
                <p className="text-slate-800 leading-relaxed font-semibold">
                  {selectedOfficial.portfolio}
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block mb-1">
                  Secretariat & Ministry Office
                </span>
                <p className="text-slate-700 font-mono text-[11px] font-medium">
                  {selectedOfficial.office}
                </p>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                <span>Verified Authority Status:</span>
                <span className="font-mono text-emerald-700 font-bold flex items-center gap-1">
                  <CheckCircle2 size={12} /> GIGW 3.0 / NIC VALIDATED
                </span>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
              <a 
                href={selectedOfficial.portalUrl} 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B3C68] hover:underline"
              >
                <span>Visit Official Secretariat Portal</span>
                <ExternalLink size={13} />
              </a>
              <button 
                onClick={() => setSelectedOfficial(null)}
                className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>

          </div>
        </div>,
        document.body
      )}

    </div>
  );
};
