import React from 'react';

interface PartnerLogoProps {
  type: 'school' | 'community' | 'tech' | 'stem' | 'advisory';
  name: string;
  badgeText?: string;
  className?: string;
}

export const PartnerLogo: React.FC<PartnerLogoProps> = ({
  type,
  name,
  badgeText,
  className = '',
}) => {
  // Return tailored, recognizable SVG insignia for each partner category in brand colors
  if (type === 'school') {
    return (
      <div
        className={`w-14 h-14 rounded-xl bg-[#2C0E40] text-white flex flex-col items-center justify-center p-1.5 shadow-sm border border-[#41175E] flex-shrink-0 ${className}`}
        title={name}
      >
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-2 text-[#F0C747]">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </svg>
        <span className="text-[8px] font-bold tracking-tighter text-[#EFEFF0] uppercase truncate max-w-full">
          {badgeText || 'EDU'}
        </span>
      </div>
    );
  }

  if (type === 'community') {
    return (
      <div
        className={`w-14 h-14 rounded-xl bg-[#1E082C] text-white flex flex-col items-center justify-center p-1.5 shadow-sm border border-[#F0C747]/40 flex-shrink-0 ${className}`}
        title={name}
      >
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-2 text-[#F0C747]">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
        <span className="text-[8px] font-bold tracking-tighter text-[#F0C747] uppercase truncate max-w-full">
          {badgeText || 'COMM'}
        </span>
      </div>
    );
  }

  if (type === 'tech') {
    return (
      <div
        className={`w-14 h-14 rounded-xl bg-[#2C0E40] text-white flex flex-col items-center justify-center p-1.5 shadow-sm border border-[#41175E] flex-shrink-0 ${className}`}
        title={name}
      >
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-2 text-[#EFEFF0]">
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <rect x="9" y="9" width="6" height="6" />
          <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" />
        </svg>
        <span className="text-[8px] font-bold tracking-tighter text-[#F0C747] uppercase truncate max-w-full">
          {badgeText || 'TECH'}
        </span>
      </div>
    );
  }

  if (type === 'stem') {
    return (
      <div
        className={`w-14 h-14 rounded-xl bg-[#2C0E40] text-white flex flex-col items-center justify-center p-1.5 shadow-sm border border-[#F0C747]/50 flex-shrink-0 ${className}`}
        title={name}
      >
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-2 text-[#F0C747]">
          <circle cx="12" cy="12" r="2" />
          <path d="M12 2a10 5 0 1 0 0 20 10 5 0 1 0 0-20" />
          <path d="M2 12a5 10 0 1 0 20 0 5 10 0 1 0-20 0" />
        </svg>
        <span className="text-[8px] font-bold tracking-tighter text-[#F0C747] uppercase truncate max-w-full">
          {badgeText || 'WiSTEM'}
        </span>
      </div>
    );
  }

  // Advisory / Education default
  return (
    <div
      className={`w-14 h-14 rounded-xl bg-[#150520] text-white flex flex-col items-center justify-center p-1.5 shadow-sm border border-[#41175E] flex-shrink-0 ${className}`}
      title={name}
    >
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-2 text-[#F0C747]">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
      <span className="text-[8px] font-bold tracking-tighter text-[#EFEFF0] uppercase truncate max-w-full">
        {badgeText || 'ADVISORY'}
      </span>
    </div>
  );
};
