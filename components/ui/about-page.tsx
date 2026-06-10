'use client';

import Navbar from '@/components/ui/navbar';
import HomeBackground from '@/components/ui/background-components';
import FooterNewsletter from '@/components/ui/footer-column';
import { AnimatedDock } from '@/components/ui/animated-dock';
import RadialOrbitalTimeline, { type TimelineItem } from '@/components/ui/radial-orbital-timeline';
import {
  Github,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  Award,
  BookOpen,
  Globe,
  Tv,
  PiggyBank,
} from 'lucide-react';

const coreValues: TimelineItem[] = [
  {
    id: 1,
    title: 'Flagship Business Event',
    date: 'Core Offering',
    content: 'An immersive, large-scale one-day business event designed to inspire innovation, entrepreneurship, and real-world learning for school students.',
    category: 'Event',
    icon: Award,
    status: 'completed',
  },
  {
    id: 2,
    title: 'School Learning Programs',
    date: 'Curriculum',
    content: 'Structured business-building sessions seamlessly integrated into the school curriculum to nurture entrepreneurial thinking from an early stage.',
    category: 'Education',
    icon: BookOpen,
    status: 'completed',
  },
  {
    id: 3,
    title: 'International Exposure',
    date: 'Global',
    content: 'A unique platform providing students with global business insights, cross-cultural exposure, and opportunities to connect with international entrepreneurial ecosystems.',
    category: 'Global',
    icon: Globe,
    status: 'completed',
  },
  {
    id: 4,
    title: 'Student Reality Show',
    date: 'Upcoming',
    content: 'A reality-show-style platform where students conceptualize, build, and pitch real business ideas through team challenges, mentorship, and live evaluations.',
    category: 'Media',
    icon: Tv,
    status: 'completed',
  },
  {
    id: 5,
    title: 'Financial Literacy - Impact Workshops',
    date: 'Community',
    content: 'Inclusive financial literacy workshops for women, students, parents, and teachers focused on money management, financial planning, mutual fund awareness, and stock investment simulations.',
    category: 'Finance',
    icon: PiggyBank,
    status: 'completed',
  },
];

const dockItems = [
  { link: 'https://github.com', target: '_blank', Icon: <Github size={22} /> },
  { link: 'https://twitter.com', target: '_blank', Icon: <Twitter size={22} /> },
  { link: 'https://linkedin.com', target: '_blank', Icon: <Linkedin size={22} /> },
  { link: 'https://instagram.com', target: '_blank', Icon: <Instagram size={22} /> },
  { link: 'https://youtube.com', target: '_blank', Icon: <Youtube size={22} /> },
];

export default function AboutPage() {
  return (
    <main className="relative overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center pt-24 pb-16 px-4">
        <div className="absolute inset-0 z-0">
          <HomeBackground className="w-full h-full" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <p className="text-xs font-semibold tracking-widest uppercase text-zinc-500 mb-4">
            Who We Are
          </p>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight text-zinc-900 leading-none mb-6">
            About <span className="border-b-4 border-zinc-900">Wisbees</span>
          </h1>

          <p className="text-lg md:text-xl text-zinc-600 max-w-2xl mx-auto leading-relaxed">
            &ldquo;Our mission at WBC is to strengthen school-level entrepreneurial and financial literacy in India through first-principles thinking.&rdquo;
          </p>
        </div>
      </section>

      {/* What is WBC */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-semibold tracking-widest uppercase text-zinc-400 mb-3">
            Our Story
          </p>

          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-zinc-900 mb-6">
            About WisBees &amp; WBC
          </h2>

          <div className="h-1 w-16 bg-zinc-900 mb-6 rounded-full" />

          <p className="text-zinc-600 text-base leading-relaxed mb-4">
            Founded in 2022, WisBees began as an accessible financial magazine and research
            platform. It has evolved into a wealth management and investment research firm,
            delivering structured advisory and data-driven insights.
          </p>

          <p className="text-zinc-600 text-base leading-relaxed mb-4">
            WisBees focuses on simplifying finance while enabling disciplined, informed
            investing. As part of its financial literacy and entrepreneurship mission, it
            launched The WisBees Business Carnival.
          </p>

          <p className="text-zinc-600 text-base leading-relaxed">
            The initiative delivers real-world business and money education through
            practical, activity-based, and highly engaging learning experiences — building
            strong financial foundations and entrepreneurial thinking from an early stage.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="bg-zinc-950">
        <div className="text-center pt-16 pb-2 px-4">
          <p className="text-xs font-semibold tracking-widest uppercase text-zinc-500 mb-3">
            What We Offer
          </p>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white">
            Our Services
          </h2>
          <p className="text-zinc-500 text-sm mt-2">Click any node to explore</p>
        </div>
        <RadialOrbitalTimeline timelineData={coreValues} />
      </section>

      {/* Awards */}
      <section className="bg-zinc-950 py-14 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-5 py-2 mb-6">
            <Award size={16} className="text-white" />
            <span className="text-white text-sm font-semibold">
              Recognised by leading institutions
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl font-black text-white mb-4">
            Building India&apos;s Next Generation of Entrepreneurs
          </h2>

          <p className="text-white/60 text-base max-w-2xl mx-auto leading-relaxed">
            WBC has been recognised by education boards, featured in national media,
            and partnered with top corporations — all united by the belief that
            entrepreneurship education must start early.
          </p>
        </div>
      </section>

      {/* Social Dock */}
      <div className="flex justify-center py-12 bg-background">
        <div className="flex flex-col items-center gap-4">
          <p className="text-foreground/60 text-sm tracking-wide uppercase">
            Connect with us
          </p>

          <AnimatedDock items={dockItems} />
        </div>
      </div>

      <FooterNewsletter />
    </main>
  );
}
