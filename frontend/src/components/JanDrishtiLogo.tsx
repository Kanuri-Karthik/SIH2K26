import React from 'react';

interface JanDrishtiLogoProps {
  size?: number;
  variant?: 'icon' | 'badge' | 'full';
  theme?: 'dark' | 'light';
  showTagline?: boolean;
  className?: string;
  onClick?: () => void;
}

export const JanDrishtiLogo: React.FC<JanDrishtiLogoProps> = ({
  size = 38,
  variant = 'badge',
  theme = 'dark',
  showTagline = true,
  className = '',
  onClick,
}) => {
  // Pure modern geometric vector SVG (Tiranga Eye of Drishti + Central Citizen Silhouette + GNN Orbit)
  const renderSvg = (dim: number, isInsideBadge: boolean = false) => (
    <svg
      viewBox="0 0 100 100"
      width={dim}
      height={dim}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 transition-transform duration-300 group-hover:scale-105 select-none"
    >
      <defs>
        {/* Saffron / Radiant Gold (Vigilance & Sovereign Energy) */}
        <linearGradient id="jd-saffron" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FF6B00" />
          <stop offset="50%" stopColor="#FF9933" />
          <stop offset="100%" stopColor="#FBBF24" />
        </linearGradient>

        {/* Emerald Green (Grassroots Public Development & Integrity) */}
        <linearGradient id="jd-green" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#34D399" />
          <stop offset="50%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>

        {/* Iris Deep Navy Fill */}
        <linearGradient id="jd-iris-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0E4377" />
          <stop offset="100%" stopColor="#06223F" />
        </linearGradient>

        {/* Satellite Orbit Gradient */}
        <linearGradient id="jd-orbit-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.2" />
          <stop offset="50%" stopColor="#FCD34D" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.3" />
        </linearGradient>

        {/* Subtle Glow */}
        <filter id="jd-subtle-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* When rendered without badge container, we provide the clean squircle frame */}
      {!isInsideBadge && (
        <rect
          x="2"
          y="2"
          width="96"
          height="96"
          rx="22"
          fill="#082746"
          stroke="#1E4D7B"
          strokeWidth="1.5"
        />
      )}

      {/* 1. Satellite Orbit / GNN Radar Ellipse */}
      <ellipse
        cx="50"
        cy="50"
        rx="37"
        ry="16"
        transform="rotate(-24 50 50)"
        fill="none"
        stroke="url(#jd-orbit-grad)"
        strokeWidth="1.8"
        strokeDasharray="5 3 2 3"
      />

      {/* Orbiting Telemetry Satellite Node */}
      <g transform="translate(80, 36) rotate(-24)">
        <circle cx="0" cy="0" r="2.8" fill="#FCD34D" filter="url(#jd-subtle-glow)" />
        <circle cx="0" cy="0" r="5" fill="none" stroke="#FCD34D" strokeWidth="1" strokeOpacity="0.5" />
      </g>

      {/* Ground Pulse Node */}
      <circle cx="21" cy="63" r="2" fill="#38BDF8" />

      {/* 2. DRISHTI (The Vigilant Sovereign Eye Arcs) */}
      {/* Upper Eyelid / Saffron Sweep (Vigilance & Sunshine) */}
      <path
        d="M 16 50 C 28 27 72 27 84 50"
        fill="none"
        stroke="url(#jd-saffron)"
        strokeWidth="5.5"
        strokeLinecap="round"
      />

      {/* Lower Eyelid / Green Sweep (Grassroots & Public Development) */}
      <path
        d="M 16 50 C 28 73 72 73 84 50"
        fill="none"
        stroke="url(#jd-green)"
        strokeWidth="5.5"
        strokeLinecap="round"
      />

      {/* 3. Eye Inner Lens Area */}
      <circle cx="50" cy="50" r="19" fill="url(#jd-iris-bg)" stroke="#0284C7" strokeWidth="1.8" />

      {/* AI Radar Ring */}
      <circle
        cx="50"
        cy="50"
        r="15"
        fill="none"
        stroke="#38BDF8"
        strokeWidth="1"
        strokeDasharray="2.5 2.5"
        opacity="0.8"
      />

      {/* 4. JAN (The People / Citizen Silhouette at the Center of Drishti) */}
      {/* Central Citizen */}
      <circle cx="50" cy="42" r="3.4" fill="#FFFFFF" />
      <path
        d="M 43.5 56.5 C 43.5 49 46 47 50 47 C 54 47 56.5 49 56.5 56.5 Z"
        fill="#FFFFFF"
      />

      {/* Community Left Silhouette (Amber/Gold Accent) */}
      <circle cx="39" cy="45" r="2.4" fill="#FCD34D" />
      <path
        d="M 34.5 56 C 34.5 50.5 36.5 49 39 49 C 41.5 49 43 50.5 43 56 Z"
        fill="#FCD34D"
        opacity="0.9"
      />

      {/* Community Right Silhouette (Green/Teal Accent) */}
      <circle cx="61" cy="45" r="2.4" fill="#6EE7B7" />
      <path
        d="M 57 56 C 57 50.5 58.5 49 61 49 C 63.5 49 65.5 50.5 65.5 56 Z"
        fill="#6EE7B7"
        opacity="0.9"
      />

      {/* Grounding Horizon Bar */}
      <path d="M 33 57.5 L 67 57.5" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />

      {/* 5. Apex Sovereign Crown Indicator */}
      <circle cx="45" cy="18" r="1.5" fill="#FF9933" />
      <circle cx="50" cy="16" r="2" fill="#FCD34D" />
      <circle cx="55" cy="18" r="1.5" fill="#FF9933" />
    </svg>
  );

  if (variant === 'icon') {
    return (
      <div
        onClick={onClick}
        className={`inline-flex items-center justify-center shrink-0 ${
          onClick ? 'cursor-pointer' : ''
        } ${className}`}
        style={{ width: size, height: size }}
        title="JAN-DRISHTI // Official MPLADS AI Sentinel Mark"
      >
        {renderSvg(size, true)}
      </div>
    );
  }

  if (variant === 'badge') {
    return (
      <div
        onClick={onClick}
        className={`relative inline-flex items-center justify-center rounded-xl p-1 shrink-0 transition-all duration-300 shadow-sm group ${
          theme === 'dark'
            ? 'bg-[#082746] border border-[#1E4D7B] hover:border-amber-400/60 shadow-amber-500/5'
            : 'bg-white border border-slate-200 hover:border-[#0B3C68]/40 shadow-xs'
        } ${onClick ? 'cursor-pointer' : ''} ${className}`}
        style={{ width: size, height: size }}
        title="JAN-DRISHTI // Official MPLADS AI Sentinel Emblem"
      >
        {renderSvg(size - 6, true)}
      </div>
    );
  }

  // variant === 'full' (Horizontal brand lockup)
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 select-none ${
        onClick ? 'cursor-pointer group' : ''
      } ${className}`}
    >
      <div
        className={`relative inline-flex items-center justify-center rounded-xl p-1 shrink-0 transition-all duration-300 shadow-sm ${
          theme === 'dark'
            ? 'bg-[#082746] border border-[#1E4D7B] group-hover:border-amber-400/60'
            : 'bg-white border border-slate-200 group-hover:border-[#0B3C68]/40'
        }`}
        style={{ width: size, height: size }}
      >
        {renderSvg(size - 6, true)}
      </div>

      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-2">
          <span
            className={`font-black text-lg tracking-tight leading-none ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}
          >
            JAN-DRISHTI
          </span>
          <span className="text-[10px] font-bold text-amber-500 font-serif leading-none">
            जन-दृष्टि
          </span>
          <span className="px-1.5 py-0.5 rounded text-[9px] font-black tracking-wider bg-amber-500 text-slate-950 leading-none">
            GOV.IN
          </span>
        </div>

        {showTagline && (
          <p
            className={`text-[10px] uppercase tracking-wider font-semibold mt-1 leading-none ${
              theme === 'dark' ? 'text-slate-200' : 'text-slate-500'
            }`}
          >
            Ministry of Statistics &amp; Programme Implementation
          </p>
        )}
      </div>
    </div>
  );
};
