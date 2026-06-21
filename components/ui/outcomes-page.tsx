'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/ui/navbar';
import FooterNewsletter from '@/components/ui/footer-column';
import HomeBackground from '@/components/ui/background-components';
import {
  Brain, TrendingUp, Users, Mic2, Trophy, Network,
  Building2, Megaphone, Handshake, Sprout, Factory, Flag,
} from 'lucide-react';

type Tab = 'students' | 'schools';

const tabs: { id: Tab; label: string; sublabel: string; num: string }[] = [
  { id: 'students', label: 'Students', sublabel: 'What every participant gains', num: '01' },
  { id: 'schools',  label: 'Schools',  sublabel: 'What every institution earns', num: '02' },
];

const content: Record<Tab, { icon: React.ReactNode; title: string; desc: string }[]> = {
  students: [
    { icon: <Brain size={20} />,      title: 'Become a Problem Solver',           desc: 'Students tackle real business challenges, developing the ability to identify problems and build practical solutions under pressure.' },
    { icon: <Building2 size={20} />,  title: 'Learn to Build a Company',          desc: 'From ideation to pitching, students experience every stage of building a business — hands-on, not just in theory.' },
    { icon: <TrendingUp size={20} />, title: 'Understand How Money Works',        desc: 'Budgeting, profit & loss, fundraising — WBC makes financial literacy practical and memorable for every participant.' },
    { icon: <Users size={20} />,      title: 'Learn Leadership and Teamwork',     desc: 'Students lead cross-functional teams under real deadlines, learning to delegate, motivate, and execute together.' },
    { icon: <Mic2 size={20} />,       title: 'Communication & Negotiation Skills', desc: 'Pitching to judges and negotiating with sponsors builds confident communication that translates into every future career.' },
    { icon: <Sprout size={20} />,     title: '"How Can I?" Attitude',             desc: 'WBC rewires a student\'s mindset — shifting from "I can\'t do this" to "How can I make this happen?"' },
    { icon: <Megaphone size={20} />,  title: 'Marketing & Sales Skills',          desc: 'Students learn to position, promote, and sell their ideas — skills that are valuable in every profession and venture.' },
  ],
  schools: [
    { icon: <Handshake size={20} />,  title: 'Parent Goodwill',                          desc: 'WBC creates powerful moments parents witness firsthand — building deep trust and pride in the school\'s vision.' },
    { icon: <Trophy size={20} />,     title: 'WBC Certified School',                     desc: 'Get certified by WBC as an Entrepreneurship-Driven School — a badge that signals future-ready education to every parent.' },
    { icon: <Megaphone size={20} />,  title: 'Organic Visibility',                       desc: 'Parent-driven social sharing after WBC events creates authentic, far-reaching visibility no paid campaign can replicate.' },
    { icon: <Factory size={20} />,    title: 'Factory for Young Entrepreneurs',          desc: 'Position your school as the institution that doesn\'t just teach students — it builds founders, leaders, and innovators.' },
    { icon: <Network size={20} />,    title: 'Catalyst for Inter-School Innovation',     desc: 'Be recognized as the school that sparked collaboration and healthy competition across institutions in your city.' },
    { icon: <Flag size={20} />,       title: 'Lead the Change',                          desc: 'Schools that host WBC don\'t follow education trends — they set them, becoming the benchmark others aspire to.' },
  ],
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] },
  }),
  exit: { opacity: 0, y: -12, transition: { duration: 0.2 } },
};

export default function OutcomesPage() {
  const [active, setActive] = useState<Tab>('students');

  return (
    <main className="relative overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[40vh] flex items-center justify-center pt-24 pb-12 px-4">
        <div className="absolute inset-0 z-0">
          <HomeBackground className="w-full h-full" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-zinc-900 leading-none mb-4">
            Outcomes
          </h1>
          <p className="text-base md:text-lg text-zinc-500 max-w-xl mx-auto">
            WBC creates measurable impact across every stakeholder — students and schools.
          </p>
        </div>
      </section>

      {/* Tabs + Content */}
      <section className="bg-white py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">

          {/* Segmented toggle */}
          <div className="flex justify-center mb-3">
            <div className="inline-flex items-center gap-1 rounded-full border border-zinc-200 bg-zinc-100 p-1.5">
              {tabs.map((tab) => {
                const isActive = active === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActive(tab.id)}
                    aria-pressed={isActive}
                    className="relative rounded-full px-7 sm:px-10 py-2.5 text-sm font-bold cursor-pointer outline-none"
                  >
                    {isActive && (
                      <motion.span
                        layoutId="outcomePill"
                        className="absolute inset-0 rounded-full bg-zinc-950 shadow-lg shadow-zinc-900/25"
                        transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                      />
                    )}
                    <span className={`relative z-10 transition-colors duration-300 ${isActive ? 'text-white' : 'text-zinc-500 hover:text-zinc-900'}`}>
                      {tab.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active sublabel */}
          <AnimatePresence mode="wait">
            <motion.p
              key={active}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="text-center text-zinc-500 text-sm mb-10"
            >
              {tabs.find((t) => t.id === active)?.sublabel}
            </motion.p>
          </AnimatePresence>

          {/* Animated content grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {content[active].map(({ icon, title, desc }, i) => (
                <motion.div
                  key={title}
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="group relative rounded-2xl border border-zinc-200 bg-white p-6 hover:bg-zinc-950 hover:border-zinc-950 hover:-translate-y-1 hover:shadow-xl hover:shadow-zinc-900/10 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-5">
                    {/* Icon */}
                    <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-zinc-100 text-zinc-900 group-hover:bg-white/10 group-hover:text-white transition-colors duration-300">
                      {icon}
                    </div>
                    {/* Number */}
                    <span className="text-sm font-black tracking-widest text-zinc-300 group-hover:text-white/30 transition-colors duration-300">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <h3 className="font-bold text-zinc-900 group-hover:text-white mb-2 text-base leading-snug transition-colors duration-300">
                    {title}
                  </h3>
                  <p className="text-sm text-zinc-500 group-hover:text-zinc-300 leading-relaxed transition-colors duration-300">
                    {desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

        </div>
      </section>

      <FooterNewsletter />
    </main>
  );
}
