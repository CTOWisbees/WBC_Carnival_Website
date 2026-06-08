'use client';

import { useState, useEffect } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  mins: number;
  secs: number;
}

function getTimeLeft(target: Date): TimeLeft {
  const diff = Math.max(0, target.getTime() - Date.now());
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    mins: Math.floor((diff / 60000) % 60),
    secs: Math.floor((diff / 1000) % 60),
  };
}

const pad = (n: number) => String(n).padStart(2, '0');

const TARGET_DATE = new Date('2026-06-15T23:59:59');
const BANNER_HEIGHT = '3rem';

export default function CountdownBanner({ ctaHref = '#' }: { ctaHref?: string }) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTimeLeft(getTimeLeft(TARGET_DATE));
    const id = setInterval(() => setTimeLeft(getTimeLeft(TARGET_DATE)), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <style>{`:root { --fd-banner-height: ${BANNER_HEIGHT}; }`}</style>

      <div
        className="sticky top-0 z-40 flex items-center justify-between px-3 sm:px-8 text-white text-sm font-medium select-none"
        style={{
          height: BANNER_HEIGHT,
          background: 'linear-gradient(to right, #6b0e0e 0%, #2d1606 45%, #0e2d0e 100%)',
        }}
      >
        {/* Left — label */}
        <span className="text-white/70 text-[10px] sm:text-xs tracking-wide whitespace-nowrap shrink-0">
          <span className="hidden sm:inline">Limited Offer</span>
          <span className="sm:hidden">🎟</span>
        </span>

        {/* Center — countdown */}
        <div className="flex items-center gap-0.5 sm:gap-1.5 absolute left-1/2 -translate-x-1/2">
          <span className="text-white/90 text-[10px] sm:text-xs mr-0.5 sm:mr-1 whitespace-nowrap">
            <span className="hidden sm:inline">Early Bird ends in</span>
            <span className="sm:hidden">Ends in</span>
          </span>

          {(['DAYS', 'HRS', 'MIN', 'SEC'] as const).map((label, i) => {
            const value = timeLeft
              ? label === 'DAYS' ? timeLeft.days
              : label === 'HRS'  ? timeLeft.hours
              : label === 'MIN'  ? timeLeft.mins
              :                    timeLeft.secs
              : null;
            return (
              <span key={label} className="flex items-baseline gap-0.5">
                {i > 0 && <span className="text-white/40 mx-0.5">·</span>}
                <span className="font-bold tabular-nums text-[11px] sm:text-sm">
                  {value === null ? '--' : label === 'DAYS' ? value : pad(value)}
                </span>
                <span className="text-white/60 text-[8px] sm:text-[9px] tracking-widest">
                  {label}
                </span>
              </span>
            );
          })}
        </div>

        {/* Right — CTA */}
        <a
          href={ctaHref}
          className="text-[10px] sm:text-xs font-semibold text-white hover:text-yellow-300 transition-colors whitespace-nowrap shrink-0"
        >
          <span className="hidden sm:inline">Register Now </span>
          <span aria-hidden>→</span>
        </a>
      </div>
    </>
  );
}
