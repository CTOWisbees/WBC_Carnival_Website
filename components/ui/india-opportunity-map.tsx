'use client';

import { useState, useRef } from 'react';
import { INDIA_MAP } from '@/lib/india-map-data';
import { STATE_STATS } from '@/lib/map-data';

/**
 * Interactive India map. Hover (or tap) a state to see its stats in a floating
 * overlay. National-level stats sit to the right on desktop, below on mobile.
 *
 * Per-state data lives in /lib/map-data — one editable file per metric.
 */

const NATIONAL_STATS = [
  {
    num: '01',
    title: 'Demographic — Average Age',
    desc: "India's median age is ~29 years, compared to Japan (~49.8), China (~40.1) and the USA (~38.5), giving India one of the world's largest young workforces.",
  },
  {
    num: '02',
    title: 'Youth Unemployment Challenge',
    desc: "India's youth unemployment rate is ~16%, significantly higher than countries like the USA (~9.4%), highlighting the growing need for entrepreneurship and job-creation skills among students.",
  },
  {
    num: '03',
    title: 'India Startup Ecosystem Growth',
    desc: "India is now the world's 3rd largest startup ecosystem, with 2.34+ lakh recognized startups and 110+ unicorns, after only the USA and China.",
  },
  {
    num: '04',
    title: 'Financial Literacy Gap',
    desc: 'India faces a significant financial literacy gap, with only 27% of Indian adults being financially literate — far below the ~52% average in advanced economies.',
  },
];

export default function IndiaOpportunityMap() {
  const DEFAULT_STATE = 'Maharashtra';
  const [active, setActive] = useState<string | null>(DEFAULT_STATE);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [following, setFollowing] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  function move(e: React.MouseEvent) {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    setFollowing(true);
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }

  const stat = active ? STATE_STATS[active] : null;
  const hasData =
    stat &&
    (stat.avgAge !== undefined ||
      stat.finLit !== undefined ||
      stat.startups !== undefined ||
      stat.urbanUnemp !== undefined ||
      stat.ruralUnemp !== undefined);

  return (
    <section className="bg-white py-14 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="mb-8 md:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-zinc-900 leading-tight">
            How Wisbees Business Carnival Is Unlocking the Massive
            <br className="hidden md:block" /> Entrepreneurial Potential of Young India
          </h2>
        </div>

        <div className="grid lg:grid-cols-[2fr_3fr] gap-8 lg:gap-12 items-start">
          {/* Map */}
          <div className="relative order-1 lg:order-2">
            <p className="text-center text-xs text-zinc-400 mb-2">
              Hover over a state to explore insights
            </p>
            <div
              ref={wrapRef}
              className="relative mx-auto max-w-xs sm:max-w-sm lg:max-w-md rounded-2xl border border-zinc-200 bg-zinc-50 p-2 sm:p-4"
              onMouseMove={move}
              onMouseLeave={() => {
                setFollowing(false);
                setActive(DEFAULT_STATE);
              }}
            >
              <svg
                viewBox={`0 0 ${INDIA_MAP.width} ${INDIA_MAP.height}`}
                className="w-full h-auto"
                role="img"
                aria-label="Map of India — hover states for statistics"
              >
                {Object.entries(INDIA_MAP.states).map(([name, d]) => {
                  const isActive = active === name;
                  return (
                    <path
                      key={name}
                      d={d}
                      onMouseEnter={() => setActive(name)}
                      onClick={() => setActive(name)}
                      className={`cursor-pointer transition-colors duration-150 outline-none ${
                        isActive
                          ? 'fill-zinc-900 stroke-zinc-900'
                          : 'fill-zinc-200 stroke-zinc-400 hover:fill-zinc-300'
                      }`}
                      strokeWidth={0.8}
                    />
                  );
                })}
              </svg>

              {/* Floating overlay */}
              {active && (
                <div
                  className="pointer-events-none absolute z-10 w-52 rounded-xl border border-zinc-800 bg-zinc-950 p-3 shadow-2xl"
                  style={
                    following
                      ? {
                          left: Math.min(pos.x + 14, (wrapRef.current?.clientWidth ?? 0) - 220),
                          top: pos.y + 18,
                        }
                      : { left: '50%', bottom: 12, transform: 'translateX(-50%)' }
                  }
                >
                  <p className="text-sm font-bold text-white">{active}</p>
                  {hasData ? (
                    <div className="mt-2 space-y-1.5">
                      {stat?.avgAge !== undefined && (
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-zinc-400">Average Age</span>
                          <span className="font-semibold text-white">{stat.avgAge} yrs</span>
                        </div>
                      )}
                      {stat?.finLit !== undefined && (
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-zinc-400">Financial Literacy</span>
                          <span className="font-semibold text-white">{stat.finLit}%</span>
                        </div>
                      )}
                      {stat?.startups !== undefined && (
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-zinc-400">Startups</span>
                          <span className="font-semibold text-white">{stat.startups.toLocaleString('en-IN')}</span>
                        </div>
                      )}
                      {stat?.urbanUnemp !== undefined && (
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-zinc-400">Urban Unemployment</span>
                          <span className="font-semibold text-white">{stat.urbanUnemp}%</span>
                        </div>
                      )}
                      {stat?.ruralUnemp !== undefined && (
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-zinc-400">Rural Unemployment</span>
                          <span className="font-semibold text-white">{stat.ruralUnemp}%</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="mt-1 text-xs text-zinc-500">Data not available</p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* National stats — right on desktop, below on mobile */}
          <div className="order-2 lg:order-1 space-y-3">
            {NATIONAL_STATS.map(({ num, title, desc }) => (
              <div
                key={num}
                className="group flex gap-3 p-4 rounded-2xl border border-zinc-200 bg-white hover:bg-zinc-950 hover:border-zinc-800 transition-all duration-300"
              >
                <span className="text-lg font-black text-zinc-200 group-hover:text-white/20 transition-colors duration-300 leading-none shrink-0 pt-0.5">
                  {num}
                </span>
                <div>
                  <h3 className="text-sm font-bold text-zinc-900 group-hover:text-white transition-colors duration-300 mb-1">
                    {title}
                  </h3>
                  <p className="text-[13px] text-zinc-600 group-hover:text-zinc-300 transition-colors duration-300 leading-relaxed">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
