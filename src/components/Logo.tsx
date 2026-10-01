import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'emblem' | 'full';
  monochrome?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  variant = 'emblem',
  monochrome = false,
}) => {
  const sizeMap = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const emblemSize = sizeMap[size] || 'w-10 h-10';

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Precision Vector Emblem */}
      <svg
        viewBox="0 0 512 512"
        className={`${emblemSize} flex-shrink-0 transition-transform duration-300 group-hover:scale-105`}
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Inspire STEM Girls Initiative Logo"
      >
        <defs>
          <linearGradient id="compLogoBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#0a3328" />
            <stop offset="50%" stop-color="#0e4b3c" />
            <stop offset="100%" stop-color="#155e4b" />
          </linearGradient>

          <linearGradient id="compLogoGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#fbbf24" />
            <stop offset="50%" stop-color="#f59e0b" />
            <stop offset="100%" stop-color="#d97706" />
          </linearGradient>

          <filter id="compLogoShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#042017" flood-opacity="0.35" />
          </filter>
        </defs>

        {/* Squircle base */}
        <rect
          x="28"
          y="28"
          width="456"
          height="456"
          rx="112"
          fill={monochrome ? 'currentColor' : 'url(#compLogoBg)'}
          filter="url(#compLogoShadow)"
        />
        <rect
          x="28"
          y="28"
          width="456"
          height="456"
          rx="112"
          fill="none"
          stroke="#34d399"
          stroke-width="8"
          stroke-opacity="0.3"
        />

        {/* STEM Orbital Rings */}
        <ellipse
          cx="256"
          cy="256"
          rx="172"
          ry="65"
          fill="none"
          stroke={monochrome ? '#ffffff' : 'url(#compLogoGold)'}
          stroke-width="16"
          transform="rotate(-35 256 256)"
          opacity="0.95"
        />
        <ellipse
          cx="256"
          cy="256"
          rx="172"
          ry="65"
          fill="none"
          stroke="#34d399"
          stroke-width="14"
          stroke-opacity="0.85"
          transform="rotate(35 256 256)"
        />

        {/* Orbital Node Particles */}
        <circle cx="125" cy="165" r="14" fill="#fbbf24" stroke="#ffffff" stroke-width="3" />
        <circle cx="387" cy="347" r="14" fill="#fbbf24" stroke="#ffffff" stroke-width="3" />
        <circle cx="387" cy="165" r="12" fill="#34d399" stroke="#ffffff" stroke-width="3" />
        <circle cx="125" cy="347" r="12" fill="#34d399" stroke="#ffffff" stroke-width="3" />

        {/* Center STEM Flame & Core */}
        <g transform="translate(256 256)">
          <circle cx="0" cy="0" r="74" fill="#042017" opacity="0.65" />
          <circle cx="0" cy="0" r="58" fill={monochrome ? '#ffffff' : 'url(#compLogoGold)'} opacity="0.25" />

          {/* Compass / Spark */}
          <path
            d="M 0,-86 Q 8,-20 80,0 Q 8,20 0,86 Q -8,20 -80,0 Q -8,-20 0,-86 Z"
            fill={monochrome ? '#ffffff' : 'url(#compLogoGold)'}
          />
          <path
            d="M -40,-40 Q -6,-6 0,-40 Q 6,-6 40,-40 Q 6,6 40,40 Q -6,6 -40,40 Q -6,-6 -40,-40 Z"
            fill="#ffffff"
            opacity="0.5"
          />

          {/* Erlenmeyer Flask */}
          <path
            d="M -13,-32 L 13,-32 L 13,-17 L 30,22 C 34,30 28,39 19,39 L -19,39 C -28,39 -34,30 -30,22 L -13,-17 Z"
            fill="#ffffff"
          />
          <path
            d="M -9,-9 L 9,-9 L 22,24 C 24,28 20,34 14,34 L -14,34 C -20,34 -24,28 -22,24 Z"
            fill="#0e4b3c"
          />
          <circle cx="-5" cy="20" r="3.5" fill="#fbbf24" />
          <circle cx="6" cy="15" r="2.5" fill="#34d399" />
          <circle cx="2" cy="26" r="4" fill="#f59e0b" />

          {/* Guiding Sparkle Star */}
          <polygon
            points="0,-46 4,-37 13,-37 6,-31 8,-22 0,-27 -8,-22 -6,-31 -13,-37 -4,-37"
            fill="#ffffff"
          />
        </g>
      </svg>

      {variant === 'full' && (
        <div className="flex flex-col text-left">
          <span className="block text-lg font-bold tracking-tight text-slate-900 group-hover:text-[#0e4b3c] transition-colors leading-tight">
            Inspire STEM Girls
          </span>
          <span className="block text-[11px] font-semibold tracking-wider uppercase text-emerald-800">
            Initiative · Nigeria
          </span>
        </div>
      )}
    </div>
  );
};
