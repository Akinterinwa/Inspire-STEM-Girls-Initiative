import React, { useEffect, useRef, useState } from 'react';

interface AnimatedHeadingProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'div';
  subtitle?: string;
  subtitleClassName?: string;
  children: React.ReactNode;
  className?: string;
  accent?: boolean;
  delay?: number;
  align?: 'left' | 'center' | 'right';
}

export const AnimatedHeading: React.FC<AnimatedHeadingProps> = ({
  as: Component = 'h1',
  subtitle,
  subtitleClassName = '',
  children,
  className = '',
  accent = false,
  delay = 0,
  align = 'left',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Check if already in viewport or observe
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      // In view on mount
      const timer = setTimeout(() => setIsVisible(true), delay || 50);
      return () => clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay || 50);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [delay]);

  const alignClass =
    align === 'center'
      ? 'text-center items-center mx-auto'
      : align === 'right'
      ? 'text-right items-end ml-auto'
      : 'text-left items-start';

  return (
    <div ref={containerRef} className={`flex flex-col ${alignClass} ${className}`}>
      {subtitle && (
        <div
          className={`transition-all duration-700 ease-out mb-2.5 ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 -translate-y-2'
          } ${subtitleClassName}`}
        >
          {subtitle}
        </div>
      )}

      <Component
        className={`transition-all duration-800 ease-out ${
          isVisible
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 translate-y-6 scale-[0.98]'
        }`}
        style={{
          transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {children}
      </Component>

      {accent && (
        <div
          className={`h-1 bg-gradient-to-r from-[#0e4b3c] via-emerald-500 to-amber-400 rounded-full mt-3 transition-all duration-1000 ease-out ${
            isVisible ? 'w-24 opacity-100' : 'w-0 opacity-0'
          }`}
        />
      )}
    </div>
  );
};
