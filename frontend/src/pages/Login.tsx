import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ShieldAlert, 
  Mail, 
  Lock, 
  LogIn, 
  ArrowRight, 
  Activity, 
  CheckCircle2, 
  ShieldCheck, 
  Globe, 
  Eye, 
  EyeOff, 
  Building2,
  Landmark,
  KeyRound,
  FileText,
  Scale,
  Sparkles,
  Users
} from 'lucide-react';
import { GoogleAuthButton } from '../components/GoogleAuthButton';
import { JanDrishtiLogo } from '../components/JanDrishtiLogo';
import { useRole, OFFICER_PROFILES, OFFICER_ROLES, type OfficerRole } from '../context/RoleContext';

export const Login = () => {
  const { switchRole } = useRole();
  const [selectedRole, setSelectedRole] = useState<OfficerRole>('district_magistrate');
  const [email, setEmail] = useState('dm.pune@nic.in');
  const [password, setPassword] = useState('Collector#Pune2026');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      switchRole(selectedRole);
      navigate('/');
    }, 800);
  };

  const handleInstantOfficerLogin = (roleKey: OfficerRole) => {
    setIsLoading(true);
    const profile = OFFICER_PROFILES[roleKey];
    setSelectedRole(roleKey);
    setEmail(profile.email);
    setPassword('OfficialGov#2026');
    setTimeout(() => {
      switchRole(roleKey);
      navigate('/');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-between selection:bg-[#0B3C68] selection:text-white">
      
      {/* 1. TOP NATIONAL TIRANGA RIBBON */}
      <div className="h-1.5 w-full flex shrink-0 shadow-xs">
        <div className="flex-1 bg-[#FF9933]"></div>
        <div className="flex-1 bg-white relative flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-[#000080]"></div>
        </div>
        <div className="flex-1 bg-[#138808]"></div>
      </div>

      {/* 2. TOP GOVERNMENT IDENTITY BAR */}
      <header className="bg-white border-b border-slate-200 px-6 sm:px-12 py-3 shrink-0">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          <div className="flex items-center gap-3.5 cursor-pointer" onClick={() => navigate('/landing')}>
            <div className="w-11 h-13 flex items-center justify-center p-1 bg-amber-50 rounded-lg border border-amber-300 shrink-0 shadow-2xs">
              <img 
                src="/gov/emblem_india.svg" 
                alt="State Emblem of India" 
                className="w-full h-full object-contain filter drop-shadow-xs" 
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.dataset.tried) {
                    target.dataset.tried = 'true';
                    target.src = 'https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg';
                  }
                }}
              />
            </div>
            <div>
              <div className="text-xs font-black text-[#0B3C68] leading-tight">
                सांख्यिकी और कार्यक्रम कार्यान्वयन मंत्रालय
              </div>
              <div className="text-xs font-black text-slate-900 leading-tight uppercase tracking-tight">
                Ministry of Statistics and Programme Implementation
              </div>
              <div className="text-[10px] text-amber-800 font-bold tracking-wide mt-0.5">
                भारत सरकार | GOVERNMENT OF INDIA
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link 
              to="/landing" 
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:text-[#0B3C68] hover:bg-slate-50 text-xs font-bold transition-all shadow-2xs"
            >
              <Globe size={14} className="text-[#0B3C68]" />
              <span>सार्वजनिक पोर्टल | Public Portal</span>
            </Link>

            <div className="hidden sm:flex items-center gap-1 text-[10px] font-mono px-2.5 py-1 rounded bg-emerald-50 border border-emerald-300 text-emerald-800 font-bold">
              <ShieldCheck size={12} className="text-emerald-700" />
              <span>NIC Cyber Certified</span>
            </div>
          </div>

        </div>
      </header>

      {/* 3. MAIN AUTHENTICATION CONTAINER (2-COLUMN OFFICIAL LAYOUT) */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8 flex items-center justify-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 rounded-3xl border-2 border-slate-300 bg-white shadow-xl overflow-hidden min-h-[660px]">
          
          {/* Left Column: Official Sovereign Security Pillar */}
          <div className="lg:col-span-5 bg-[#0B3C68] text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden border-b lg:border-b-0 lg:border-r-2 border-slate-300">
            
            <div className="absolute -right-16 -top-16 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>
            <div className="absolute -left-16 -bottom-16 w-64 h-64 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-amber-300 text-[11px] font-mono font-bold mb-6">
                <Landmark size={13} />
                <span>OFFICIAL CLEARANCE // GIGW 3.0</span>
              </div>

              <div className="flex items-center gap-3.5 mb-4">
                <JanDrishtiLogo size={48} variant="badge" theme="dark" />
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-black text-white tracking-tight leading-none">
                      JAN-DRISHTI
                    </h2>
                    <span className="text-sm font-bold text-amber-400 font-serif">जन-दृष्टि</span>
                  </div>
                  <p className="text-[11px] text-slate-300 font-bold uppercase tracking-widest mt-1">
                    Government of India Sovereign Network
                  </p>
                </div>
              </div>

              <h3 className="text-xl font-bold text-slate-100 leading-snug mt-4">
                Role-Based Statutory Clearance
              </h3>
              <p className="text-xs text-blue-100 mt-2 font-medium leading-relaxed">
                Jan-Drishti enforces role-based access control (RBAC) across 4 statutory governance levels: District Magistrate, Vigilance Auditor, MoSPI Ministry Admin, and Hon'ble MP.
              </p>

              {/* 4 Officer Quick-Selection Showcase */}
              <div className="mt-6 space-y-2.5">
                <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider block">
                  Select Clearance Tier to Enter:
                </span>

                {OFFICER_ROLES.map((roleKey) => {
                  const p = OFFICER_PROFILES[roleKey];
                  const isSelected = selectedRole === roleKey;
                  return (
                    <button
                      key={roleKey}
                      type="button"
                      onClick={() => {
                        setSelectedRole(roleKey);
                        setEmail(p.email);
                        setPassword('GovPass#2026');
                      }}
                      className={`w-full flex items-start gap-2.5 p-2.5 rounded-xl text-left transition-all cursor-pointer border ${
                        isSelected 
                          ? 'bg-white/20 border-amber-400 text-white shadow-xs' 
                          : 'bg-white/5 border-white/15 text-slate-200 hover:bg-white/10'
                      }`}
                    >
                      <span className={`px-2 py-0.5 rounded text-[9px] font-black shrink-0 mt-0.5 ${p.badgeBg} ${p.badgeColor}`}>
                        {p.sealBadge}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold leading-tight truncate">{p.title}</div>
                        <div className="text-[10px] text-slate-300 truncate mt-0.5">{p.name} • {p.jurisdiction}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/15 text-[10px] text-slate-300 leading-relaxed">
              <p className="font-bold text-amber-300 mb-0.5">STATUTORY LEGAL NOTICE:</p>
              This is a sovereign Government of India portal. Access is logged and audited under Information Technology Act, 2000.
            </div>

          </div>

          {/* Right Column: Officer Clearance & Login Form */}
          <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-between bg-white text-slate-900">
            
            <div className="max-w-md w-full mx-auto">
              
              <div className="mb-5">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-[10px] font-bold uppercase tracking-wider mb-2">
                  <KeyRound size={11} className="text-amber-800" />
                  <span>अधिकारी सत्यापन | OFFICER CLEARANCE GATEWAY</span>
                </div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                  Sovereign Portal Login / प्रवेश
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  Active Tier: <strong className="text-slate-900">{OFFICER_PROFILES[selectedRole].title}</strong> ({OFFICER_PROFILES[selectedRole].sealBadge})
                </p>
              </div>

              {/* 1. 1-Click Instant Evaluation Buttons */}
              <div className="mb-5 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider block mb-2">
                  1-CLICK INSTANT OFFICER LOGIN (EVALUATION READY):
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {OFFICER_ROLES.map((roleKey) => {
                    const p = OFFICER_PROFILES[roleKey];
                    return (
                      <button
                        key={roleKey}
                        type="button"
                        onClick={() => handleInstantOfficerLogin(roleKey)}
                        disabled={isLoading}
                        className="p-2 rounded-xl bg-white border border-slate-300 hover:border-[#0B3C68] hover:bg-blue-50/60 text-left transition-all btn-press cursor-pointer shadow-2xs group flex items-center gap-2.5"
                      >
                        <div className="relative shrink-0">
                          <img 
                            src={p.avatar} 
                            alt={p.name} 
                            className="w-9 h-9 rounded-full object-cover border border-slate-300 bg-white shrink-0" 
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/gov/emblem_india.svg';
                            }}
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className={`px-1 py-0.2 rounded text-[7.5px] font-black ${p.badgeBg} ${p.badgeColor} inline-block mb-0.5`}>
                            {p.sealBadge}
                          </span>
                          <span className="text-[11px] font-black text-slate-900 block leading-tight truncate group-hover:text-blue-900">
                            {p.name.split(',')[0]}
                          </span>
                          <span className="text-[9px] text-slate-500 block truncate">{p.title.split('&')[0]}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Live Google Single Sign-On Button */}
              <GoogleAuthButton mode="signin" disabled={isLoading} />

              {/* 3. Divider */}
              <div className="relative my-5">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-300"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-3 bg-white text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                    या पासवर्ड द्वारा प्रवेश | OR PASSWORD LOGIN
                  </span>
                </div>
              </div>

              {/* 4. Credentials Form */}
              <form onSubmit={handleLogin} className="space-y-3.5 text-left">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Selected Officer Clearance Tier
                  </label>
                  <select
                    value={selectedRole}
                    onChange={(e) => {
                      const newRole = e.target.value as OfficerRole;
                      setSelectedRole(newRole);
                      setEmail(OFFICER_PROFILES[newRole].email);
                    }}
                    className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:bg-white focus:border-[#0B3C68] transition-all font-bold text-slate-900 cursor-pointer"
                  >
                    <option value="district_magistrate">District Magistrate & Collector (Pune) - DM (IAS)</option>
                    <option value="vigilance_auditor">Chief Vigilance Officer & Auditor (CVC) - CVO (IRS)</option>
                    <option value="mospi_admin">Union Ministry Secretary & Admin - MoSPI (SEC)</option>
                    <option value="member_parliament">Hon'ble Member of Parliament - MP (LOK SABHA)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Official Government Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="dm.pune@nic.in" 
                      className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl pl-10 pr-4 py-2 text-xs focus:outline-none focus:bg-white focus:border-[#0B3C68] transition-all font-semibold text-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Security Clearance Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input 
                      type={showPassword ? "text" : "password"} 
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••" 
                      className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl pl-10 pr-10 py-2 text-xs focus:outline-none focus:bg-white focus:border-[#0B3C68] transition-all font-semibold text-slate-900"
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1"
                    >
                      {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 bg-[#0B3C68] hover:bg-[#072848] text-white font-black text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all btn-press disabled:opacity-50 mt-3 cursor-pointer"
                >
                  {isLoading ? <Activity className="w-4 h-4 animate-spin text-amber-400" /> : <LogIn size={15} />}
                  <span>{isLoading ? 'Verifying Clearance Credentials...' : `Enter as ${OFFICER_PROFILES[selectedRole].sealBadge}`}</span>
                </button>
              </form>

              <div className="mt-5 pt-3 border-t border-slate-200 text-center text-xs font-semibold text-slate-600">
                New officer or authority?{' '}
                <Link to="/signup" className="text-[#0B3C68] font-bold hover:underline inline-flex items-center gap-1">
                  Register Clearance Tier <ArrowRight size={13} />
                </Link>
              </div>

            </div>

            <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-medium">
              <span className="flex items-center gap-1 text-emerald-700 font-bold">
                <CheckCircle2 size={12} /> NIC National Cloud Verified
              </span>
              <span>GIGW 3.0 / Parichay Standard</span>
            </div>

          </div>

        </div>
      </div>

      {/* 4. OFFICIAL FOOTER STRIP */}
      <footer className="bg-slate-100 border-t border-slate-200 px-6 sm:px-12 py-3 text-center text-xs text-slate-500 font-medium shrink-0">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-[11px]">
          <span>&copy; 2026 सांख्यिकी और कार्यक्रम कार्यान्वयन मंत्रालय | Ministry of Statistics and Programme Implementation, Government of India.</span>
          <div className="flex items-center gap-3 text-slate-600 font-semibold">
            <Link to="/landing" className="hover:text-[#0B3C68]">Public Portal</Link>
            <span>•</span>
            <a href="https://www.india.gov.in" target="_blank" rel="noreferrer" className="hover:text-[#0B3C68]">India.gov.in</a>
            <span>•</span>
            <a href="https://www.cvc.gov.in" target="_blank" rel="noreferrer" className="hover:text-[#0B3C68]">CVC Vigilance</a>
          </div>
        </div>
      </footer>

    </div>
  );
};
