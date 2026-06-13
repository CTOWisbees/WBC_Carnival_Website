'use client';

import { useState, useRef } from 'react';
import { INDIA_MAP } from '@/lib/india-map-data';

/**
 * Interactive India map. Hover (or tap) a state to see its stats in a floating
 * overlay. National-level stats sit to the right on desktop, below on mobile.
 */

type StateStat = {
  avgAge?: number;
  finLit?: number;
  startups?: number;
  urbanUnemp?: number;
  ruralUnemp?: number;
};

// avgAge = 2021 census projection. finLit = % financially literate (NCFE-FLIS 2019).
// startups = DPIIT recognized startups. urban/ruralUnemp = PLFS FY2023 unemployment %.
// Keys match geojson names in INDIA_MAP (note: Telangana merged into Andhra Pradesh).
const STATE_STATS: Record<string, StateStat> = {
  'Andhra Pradesh': { avgAge: 32.5, finLit: 32, startups: 3886, urbanUnemp: 6.5, ruralUnemp: 3.3 },
  'Arunachal Pradesh': { finLit: 12, startups: 85, urbanUnemp: 10.9, ruralUnemp: 3.9 },
  'Assam': { avgAge: 27.4, finLit: 31, startups: 2014, urbanUnemp: 6.1, ruralUnemp: 1.5 },
  'Bihar': { avgAge: 22.0, finLit: 18, startups: 4564, urbanUnemp: 7.7, ruralUnemp: 3.6 },
  'Chandigarh': { finLit: 50, startups: 659, urbanUnemp: 4.0, ruralUnemp: 3.2 },
  'Chhattisgarh': { avgAge: 26.9, finLit: 9, startups: 2245, urbanUnemp: 7.8, ruralUnemp: 1.4 },
  'Delhi': { avgAge: 30.0, finLit: 53, startups: 19916, urbanUnemp: 1.7, ruralUnemp: 10.2 },
  'Goa': { finLit: 56, startups: 773, urbanUnemp: 8.7, ruralUnemp: 11.3 },
  'Gujarat': { avgAge: 29.3, finLit: 34, startups: 17692, urbanUnemp: 2.2, ruralUnemp: 1.4 },
  'Haryana': { avgAge: 28.5, finLit: 27, startups: 10744, urbanUnemp: 6.5, ruralUnemp: 5.8 },
  'Himachal Pradesh': { avgAge: 27.5, finLit: 36, startups: 762, urbanUnemp: 14.1, ruralUnemp: 3.5 },
  'Jammu and Kashmir': { avgAge: 28.4, finLit: 28, startups: 1397, urbanUnemp: 10.2, ruralUnemp: 3.4 },
  'Jharkhand': { avgAge: 25.3, finLit: 22, startups: 1944, urbanUnemp: 6.3, ruralUnemp: 0.9 },
  'Karnataka': { avgAge: 31.5, finLit: 33, startups: 21165, urbanUnemp: 4.2, ruralUnemp: 1.5 },
  'Kerala': { avgAge: 35.1, finLit: 36, startups: 8090, urbanUnemp: 7.6, ruralUnemp: 6.5 },
  'Madhya Pradesh': { avgAge: 26.0, finLit: 23, startups: 6819, urbanUnemp: 4.8, ruralUnemp: 0.8 },
  'Maharashtra': { avgAge: 31.3, finLit: 33, startups: 35994, urbanUnemp: 4.6, ruralUnemp: 2.2 },
  'Manipur': { finLit: 30, startups: 251, urbanUnemp: 5.3, ruralUnemp: 4.5 },
  'Meghalaya': { finLit: 22, startups: 89, urbanUnemp: 12.3, ruralUnemp: 5.0 },
  'Mizoram': { finLit: 6, startups: 62, urbanUnemp: 3.5, ruralUnemp: 1.2 },
  'Nagaland': { finLit: 8, startups: 114, urbanUnemp: 8.6, ruralUnemp: 2.9 },
  'Odisha': { avgAge: 30.2, finLit: 11, startups: 3589, urbanUnemp: 6.2, ruralUnemp: 3.6 },
  'Puducherry': { finLit: 28, startups: 219, urbanUnemp: 5.4, ruralUnemp: 5.9 },
  'Punjab': { avgAge: 32.0, finLit: 35, startups: 2306, urbanUnemp: 6.0, ruralUnemp: 6.2 },
  'Rajasthan': { avgAge: 25.6, finLit: 25, startups: 7490, urbanUnemp: 8.5, ruralUnemp: 3.4 },
  'Sikkim': { finLit: 10, startups: 18, urbanUnemp: 2.2, ruralUnemp: 2.2 },
  'Tamil Nadu': { avgAge: 34.2, finLit: 16, startups: 13778, urbanUnemp: 5.1, ruralUnemp: 3.8 },
  'Tripura': { finLit: 20, startups: 191, urbanUnemp: 3.0, ruralUnemp: 1.1 },
  'Uttar Pradesh': { avgAge: 24.7, finLit: 24, startups: 20162, urbanUnemp: 6.5, ruralUnemp: 1.5 },
  'Uttarakhand': { avgAge: 28.5, finLit: 42, startups: 1708, urbanUnemp: 6.6, ruralUnemp: 3.9 },
  'West Bengal': { avgAge: 31.5, finLit: 21, startups: 6768, urbanUnemp: 3.8, ruralUnemp: 1.5 },
  'Telangana': { avgAge: 31.2, startups: 11434, urbanUnemp: 7.8, ruralUnemp: 2.8 },
  'Ladakh': { startups: 25, urbanUnemp: 10.8, ruralUnemp: 5.7 },
  'Andaman and Nicobar Islands': { startups: 89, urbanUnemp: 14.0, ruralUnemp: 6.6 },
  'Dadra and Nagar Haveli and Daman and Diu': { startups: 89, urbanUnemp: 1.4, ruralUnemp: 4.1 },
  'Lakshadweep': { startups: 3, urbanUnemp: 12.8, ruralUnemp: 5.6 },
};

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
  const [active, setActive] = useState<string | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const wrapRef = useRef<HTMLDivElement>(null);

  function move(e: React.MouseEvent) {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
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
          <p className="text-xs font-semibold tracking-widest uppercase text-zinc-400 mb-3">
            The Opportunity
          </p>
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
              onMouseLeave={() => setActive(null)}
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
                  style={{
                    left: Math.min(pos.x + 14, (wrapRef.current?.clientWidth ?? 0) - 220),
                    top: pos.y + 18,
                  }}
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
