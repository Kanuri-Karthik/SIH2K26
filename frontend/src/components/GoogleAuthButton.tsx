import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLiveAuthModal } from './GoogleLiveAuthModal';
import { Activity } from 'lucide-react';

const GoogleIcon = () => (
  <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);

interface GoogleAuthButtonProps {
  mode?: 'signin' | 'signup';
  className?: string;
  disabled?: boolean;
}

export const GoogleAuthButton: React.FC<GoogleAuthButtonProps> = ({
  mode = 'signin',
  className = '',
  disabled = false
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handleAuthSuccess = (user: { name: string; email: string; avatar: string }) => {
    setIsProcessing(true);
    setIsModalOpen(false);

    // Store live authenticated user profile in localStorage
    localStorage.setItem('jan_drishti_auth', 'true');
    if (!localStorage.getItem('jan_drishti_role')) {
      localStorage.setItem('jan_drishti_role', 'district_magistrate');
    }
    localStorage.setItem(
      'jan_drishti_user',
      JSON.stringify({
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        provider: 'google',
        role: 'Verified Vigilance Officer',
        authTime: new Date().toISOString()
      })
    );

    // Redirect smoothly to dashboard
    setTimeout(() => {
      navigate('/');
    }, 600);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        disabled={disabled || isProcessing}
        className={`w-full flex items-center justify-center gap-3 bg-white border border-slate-200 text-slate-700 font-bold px-4 py-3 rounded-xl shadow-sm hover:bg-slate-50 hover:shadow-md hover:border-slate-300 transition-all duration-300 btn-press disabled:opacity-50 ${className}`}
      >
        {isProcessing ? (
          <Activity className="w-5 h-5 animate-spin text-blue-600" />
        ) : (
          <GoogleIcon />
        )}
        <span>
          {isProcessing 
            ? 'Authenticating Google SSO...' 
            : mode === 'signup' 
              ? 'Sign up with Google' 
              : 'Continue with Google'}
        </span>
      </button>

      {/* Interactive Google Live Auth Modal */}
      <GoogleLiveAuthModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleAuthSuccess}
        mode={mode}
      />
    </>
  );
};
