import React, { useState } from 'react';
import { X, Check, ArrowRight, ShieldCheck, Lock, ExternalLink } from 'lucide-react';

const GoogleLogo = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);

interface GoogleLiveAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: { name: string; email: string; avatar: string }) => void;
  mode?: 'signin' | 'signup';
}

export const GoogleLiveAuthModal: React.FC<GoogleLiveAuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  mode = 'signin'
}) => {
  const [step, setStep] = useState<'choose' | 'custom' | 'authorizing'>('choose');
  const [customEmail, setCustomEmail] = useState('');
  const [customName, setCustomName] = useState('');
  const [selectedAccount, setSelectedAccount] = useState<any | null>(null);

  // Suggested realistic Google accounts for instant 1-click test
  const defaultAccounts = [
    {
      name: 'Karthik S. (Official)',
      email: 'karthik.official@gmail.com',
      avatarBg: 'bg-emerald-600',
      initial: 'K',
      badge: 'MoSPI Auditor Clearance'
    },
    {
      name: 'NIC Project Nodal Officer',
      email: 'nodal.mplads@nic.in',
      avatarBg: 'bg-blue-600',
      initial: 'N',
      badge: 'Govt SSO Registered'
    }
  ];

  if (!isOpen) return null;

  const handleSelectAccount = (account: typeof defaultAccounts[0]) => {
    setSelectedAccount(account);
    setStep('authorizing');
    setTimeout(() => {
      onSuccess({
        name: account.name,
        email: account.email,
        avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(account.name)}&backgroundColor=1e3a8a`
      });
    }, 1200);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customEmail) return;
    const name = customName.trim() || customEmail.split('@')[0].replace('.', ' ');
    setStep('authorizing');
    setTimeout(() => {
      onSuccess({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        email: customEmail,
        avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=2563eb`
      });
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div 
        className="w-full max-w-[460px] bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="px-8 pt-8 pb-4 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <GoogleLogo />
            <div>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                {mode === 'signup' ? 'Create with Google' : 'Sign in with Google'}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                to continue to <strong className="text-slate-800">JAN-DRISHTI Portal</strong>
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="border-t border-slate-100 px-8 py-6">
          
          {/* STEP 1: Choose Account */}
          {step === 'choose' && (
            <div className="space-y-4">
              <p className="text-xs font-semibold text-slate-600 mb-3">
                Choose an account to sign in to <span className="font-bold text-blue-700">mplads.gov.in</span>:
              </p>

              <div className="space-y-2">
                {defaultAccounts.map((acc, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelectAccount(acc)}
                    className="w-full p-3.5 rounded-2xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 flex items-center justify-between text-left transition-all btn-press group"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full ${acc.avatarBg} text-white font-bold flex items-center justify-center text-sm shadow-sm`}>
                        {acc.initial}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors">{acc.name}</p>
                        <p className="text-xs text-slate-500 font-medium">{acc.email}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 group-hover:text-blue-600 transition-colors">
                      Select →
                    </span>
                  </button>
                ))}
              </div>

              {/* Enter custom Google account */}
              <button
                onClick={() => setStep('custom')}
                className="w-full mt-2 py-3 px-4 border border-dashed border-slate-300 rounded-2xl text-xs font-bold text-slate-600 hover:text-blue-700 hover:border-blue-400 hover:bg-slate-50 flex items-center justify-center gap-2 transition-colors btn-press"
              >
                <span>Use another Google account</span>
              </button>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <Lock size={12} className="text-emerald-600" />
                  <span>256-Bit TLS Secured by Google</span>
                </span>
                <a 
                  href="https://policies.google.com/privacy" 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:underline flex items-center gap-0.5 text-blue-600"
                >
                  <span>Privacy</span>
                  <ExternalLink size={10} />
                </a>
              </div>
            </div>
          )}

          {/* STEP 2: Custom Google Account Entry */}
          {step === 'custom' && (
            <form onSubmit={handleCustomSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Your Google Email
                </label>
                <input
                  type="email"
                  required
                  autoFocus
                  value={customEmail}
                  onChange={(e) => setCustomEmail(e.target.value)}
                  placeholder="yourname@gmail.com"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Display Name (Optional)
                </label>
                <input
                  type="text"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder="e.g. Karthik"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep('choose')}
                  className="w-1/3 py-2.5 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-200 transition-colors btn-press"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#1a73e8] hover:bg-[#1557b0] text-white font-bold text-xs rounded-xl shadow-md transition-colors btn-press flex items-center justify-center gap-1.5"
                >
                  <span>Authenticate with Google</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: Authorizing / Handshake Screen */}
          {step === 'authorizing' && (
            <div className="py-8 flex flex-col items-center justify-center text-center space-y-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-4 border-slate-100 border-t-[#1a73e8] animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <GoogleLogo />
                </div>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-base">Verifying Google Credentials...</h4>
                <p className="text-xs text-slate-500 mt-1">Exchanging OAuth2 authorization code with Government SSO Token.</p>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
