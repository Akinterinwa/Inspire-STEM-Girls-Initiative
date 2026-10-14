import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'emblem' | 'full';
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  variant = 'emblem',
}) => {
  const sizeMap = {
    sm: 'w-24 h-12',
    md: 'w-32 h-16',
    lg: 'w-40 h-20',
    xl: 'w-48 h-24',
  };

  const emblemSize = sizeMap[size] || 'w-10 h-10';

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className={`${emblemSize} relative block flex-shrink-0 overflow-hidden rounded-xl`}>
        <img
          src="/isg-logo.jpg"
          alt="Inspire STEM Girls Initiative Logo"
          className="absolute left-1/2 top-1/2 h-auto w-[145%] max-w-none -translate-x-1/2 -translate-y-1/2 object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </span>

      {variant === 'full' && (
        <div className="flex flex-col text-left">
          <span className="block text-lg font-bold tracking-tight text-slate-900 group-hover:text-[#2C0E40] transition-colors leading-tight">
            Inspire STEM Girls
          </span>
          <span className="block text-[11px] font-semibold tracking-wider uppercase text-[#2C0E40]">
            Initiative · Nigeria
          </span>
        </div>
      )}
    </div>
  );
};
