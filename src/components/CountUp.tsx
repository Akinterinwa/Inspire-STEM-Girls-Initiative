import React, { useEffect, useState, useRef } from 'react';

interface CountUpProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export const CountUp: React.FC<CountUpProps> = ({
  end,
  duration = 1800,
  prefix = '',
  suffix = '',
  className = '',
}) => {
  const [count, setCount] = useState(0);
  const [isReading, setIsReading] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Use IntersectionObserver to start counting when scrolled into view
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -20px 0px',
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;
    if (!end || end <= 0) {
      setCount(0);
      return;
    }

    setIsReading(true);
    let frameId: number;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic: rapidly climbs then decelerates smoothly
      const ease = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.round(ease * end);

      setCount(currentVal);

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      } else {
        setCount(end);
        setIsReading(false);
      }
    };

    frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [hasStarted, end, duration]);

  return (
    <span
      ref={elementRef}
      className={`inline-flex items-center tabular-nums transition-all ${
        isReading ? 'text-[#F0C747] scale-[1.02]' : ''
      } ${className}`}
    >
      <span>
        {prefix}
        {count.toLocaleString()}
        {suffix}
      </span>
      {isReading && (
        <span
          className="inline-block w-1.5 h-1.5 ml-1 rounded-full bg-[#F0C747] animate-ping"
          aria-hidden="true"
        />
      )}
    </span>
  );
};

export const SmartCounter: React.FC<{ value: string; className?: string; duration?: number }> = ({
  value,
  className = '',
  duration = 1800,
}) => {
  const cleanStr = value.replace(/,/g, '');
  const numericMatch = cleanStr.match(/\d+/);
  const numericValue = numericMatch ? parseInt(numericMatch[0], 10) : 0;
  const suffix = value.includes('+') ? '+' : value.includes('%') ? '%' : '';
  const prefix = value.startsWith('$') ? '$' : value.startsWith('₦') ? '₦' : '';

  if (numericValue === 0) {
    return <span className={className}>{value}</span>;
  }

  return (
    <CountUp
      end={numericValue}
      prefix={prefix}
      suffix={suffix}
      duration={duration}
      className={className}
    />
  );
};
