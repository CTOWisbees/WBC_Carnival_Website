'use client';

import Navbar from '@/components/ui/navbar';
import FooterNewsletter from '@/components/ui/footer-column';
import HomeBackground from '@/components/ui/background-components';

export default function ProBonoPage() {
  return (
    <main className="relative overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[45vh] flex items-center justify-center pt-24 pb-14 px-4">
        <div className="absolute inset-0 z-0">
          <HomeBackground className="w-full h-full" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <p className="text-xs font-semibold tracking-widest uppercase text-zinc-500 mb-3">
            Wisbees Responsibility
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-zinc-900 leading-tight mb-4">
            Every Child Deserves<br />
            <span className="text-zinc-400">a Shot at</span> the Stage.
          </h1>
        </div>
      </section>

      {/* Main content */}
      <section className="bg-zinc-950 py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">

          {/* Quote-style opening */}
          <div className="border-l-2 border-white/20 pl-6 mb-12">
            <p className="text-white/50 text-xs font-semibold tracking-widest uppercase mb-3">
              Our Belief
            </p>
            <p className="text-white text-xl sm:text-2xl md:text-3xl font-bold leading-snug">
              Dreams should not be limited by circumstances.
            </p>
          </div>

          {/* Body text */}
          <div className="space-y-6 mb-14">
            <p className="text-zinc-300 text-base sm:text-lg leading-relaxed">
              Through our pro bono events, we bring entrepreneurial thinking,
              problem-solving skills, and a dream to orphaned and underprivileged
              children who may never otherwise get access to such opportunities.
              These events are conducted completely free of charge.
            </p>

            <div className="h-px bg-white/10" />

            <p className="text-zinc-300 text-base sm:text-lg leading-relaxed">
              Every child deserves a chance to dream, learn, grow, and believe
              in their potential.
            </p>

            <p className="text-white text-base sm:text-lg font-semibold leading-relaxed">
              Will you help us create that opportunity for them?
            </p>
          </div>

          {/* CTA block */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h3 className="text-white font-black text-lg mb-1">
                Sponsor a Pro Bono WBC Event
              </h3>
              <p className="text-zinc-500 text-sm">
                Your support puts a child on stage. That changes a life.
              </p>
            </div>
            <a
              href="#"
              className="shrink-0 inline-flex items-center gap-2 bg-white text-zinc-950 font-bold text-sm px-7 py-3.5 rounded-xl hover:bg-zinc-100 transition-all duration-200 whitespace-nowrap"
            >
              Sponsor Now <span aria-hidden>→</span>
            </a>
          </div>

        </div>
      </section>

      <FooterNewsletter />
    </main>
  );
}
