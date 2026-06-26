'use client';

import { useState, useEffect } from 'react';
import { useSiteContent } from '@/components/site-content-provider';

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

// Fallbacks used when the admin hasn't set these in the content backend.
const DEFAULT_TARGET = '2026-06-15T23:59:59';
const DEFAULT_LOCATION = 'Pune';
// Shorter on phones, taller from sm up. Exposed as --fd-banner-height so the
// layout can offset content by the real banner height at each breakpoint.
const BANNER_HEIGHT_MOBILE = '2.25rem';
const BANNER_HEIGHT = '3rem';

export default function CountdownBanner({ ctaHref = '#' }: { ctaHref?: string }) {
  const content = useSiteContent();
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  // Admin-controlled date + city from the backend; fall back to defaults.
  const targetIso = content?.site.countdownDate || DEFAULT_TARGET;
  const location = content?.site.countdownLocation || DEFAULT_LOCATION;

  useEffect(() => {
    const target = new Date(targetIso);
    setTimeLeft(getTimeLeft(target));
    const id = setInterval(() => setTimeLeft(getTimeLeft(target)), 1000);
    return () => clearInterval(id);
  }, [targetIso]);

  return (
    <>
      <style>{`
        :root { --fd-banner-height: ${BANNER_HEIGHT_MOBILE}; }
        @media (min-width: 640px) {
          :root { --fd-banner-height: ${BANNER_HEIGHT}; }
        }
        @keyframes wbcBannerShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes wbcDotPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.35; transform: scale(0.7); }
        }
        @keyframes wbcShimmer {
          0% { background-position: -150% 0; }
          100% { background-position: 250% 0; }
        }
      `}</style>

      <div
        className="sticky top-0 z-40 flex items-center justify-between px-2 sm:px-8 text-white text-sm font-medium select-none overflow-hidden"
        style={{
          height: 'var(--fd-banner-height)',
          background:
            'linear-gradient(90deg, #6b0e0e 0%, #2d1606 30%, #0e2d0e 60%, #2d1606 80%, #6b0e0e 100%)',
          backgroundSize: '200% 100%',
          animation: 'wbcBannerShift 12s ease infinite',
        }}
      >
        {/* Left — live pulse */}
        <span className="shrink-0 flex items-center gap-1.5" aria-hidden>
          <span
            className="inline-block w-2 h-2 rounded-full bg-yellow-300"
            style={{ animation: 'wbcDotPulse 1.4s ease-in-out infinite' }}
          />
        </span>

        {/* Center — countdown */}
        <div className="flex items-center gap-1 sm:gap-2 absolute left-1/2 -translate-x-1/2">
          <span
            className="text-[9px] sm:text-xs mr-1 sm:mr-2 whitespace-nowrap font-bold tracking-wide bg-clip-text text-transparent"
            style={{
              backgroundImage:
                'linear-gradient(90deg, #fff 0%, #fde047 50%, #fff 100%)',
              backgroundSize: '200% 100%',
              animation: 'wbcShimmer 3.5s linear infinite',
            }}
          >
            <span className="hidden sm:inline">
              Coming to{' '}
              <span className="text-sm sm:text-base font-extrabold text-yellow-300 tracking-tight">
                {location}
              </span>{' '}
              in
            </span>
            <span className="sm:hidden">Coming in</span>
          </span>

          {(['DAYS', 'HRS', 'MIN', 'SEC'] as const).map((label) => {
            const value = timeLeft
              ? label === 'DAYS' ? timeLeft.days
              : label === 'HRS'  ? timeLeft.hours
              : label === 'MIN'  ? timeLeft.mins
              :                    timeLeft.secs
              : null;
            return (
              <span
                key={label}
                className="flex flex-col items-center justify-center leading-none rounded-md bg-white/10 ring-1 ring-white/15 px-1 sm:px-2 py-0.5 min-w-[22px] sm:min-w-[34px]"
              >
                <span className="font-extrabold tabular-nums text-[10px] sm:text-sm text-white">
                  {value === null ? '--' : label === 'DAYS' ? value : pad(value)}
                </span>
                <span className="text-white/55 text-[7px] sm:text-[8px] tracking-widest">
                  {label}
                </span>
              </span>
            );
          })}
        </div>

        {/* Right — CTA */}
        <a
          href={ctaHref}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] sm:text-xs font-bold whitespace-nowrap shrink-0 rounded-full px-2.5 sm:px-3 py-1 sm:py-1.5 transition-colors text-yellow-300 bg-transparent sm:text-zinc-900 sm:bg-yellow-300 sm:hover:bg-yellow-200"
        >
          <span className="sm:hidden">Register </span>
          <span className="hidden sm:inline">Register Now </span>
          <span aria-hidden>→</span>
        </a>
      </div>
    </>
  );
}
