'use client';

import dynamic from 'next/dynamic';
import Navbar from '@/components/ui/navbar';
import ScrollExpandMedia from '@/components/ui/scroll-expansion-hero';
import { ShimmerText } from '@/components/ui/shimmer-text';
import { InfiniteSlider } from '@/components/ui/infinite-slider';
import { Facebook, Linkedin, Instagram, Youtube } from 'lucide-react';
import Image from 'next/image';
import { useSiteContent } from '@/components/site-content-provider';

// Below-fold components — code-split into separate chunks (ssr kept on, so
// server still renders initial HTML → no layout shift, no visual change).
const LogoCloud = dynamic(() =>
  import('@/components/ui/logo-cloud-3').then((m) => m.LogoCloud),
);
const IndiaOpportunityMap = dynamic(
  () => import('@/components/ui/india-opportunity-map'),
);
const Testimonials = dynamic(() =>
  import('@/components/ui/testimonials-columns-1').then((m) => m.Testimonials),
);
const AnimatedDock = dynamic(() =>
  import('@/components/ui/animated-dock').then((m) => m.AnimatedDock),
);
const FooterNewsletter = dynamic(
  () => import('@/components/ui/footer-column'),
);

const clientLogos = [
  { src: "/Ryan_International_Group_logo.png", alt: "Ryan International School" },
  { src: "/vibgyor.png", alt: "VIBGYOR High School" },
  { src: "/kairadevelopers.png", alt: "Kaira Developers" },
];

const glimpses = [
  { src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=700&h=460&q=80&fit=crop', alt: 'WBC Event 2024' },
  { src: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=700&h=460&q=80&fit=crop', alt: 'Students presenting' },
  { src: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=700&h=460&q=80&fit=crop', alt: 'Business pitch' },
  { src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=700&h=460&q=80&fit=crop', alt: 'Panel discussion' },
];

function GlimpsesSection({ images = glimpses }: { images?: { src: string; alt: string }[] }) {
  return (
    <section className="bg-white py-14 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 md:mb-10 text-center">
        <h2 className="text-3xl md:text-4xl font-black tracking-tight text-zinc-900">
          Glimpses from the Past
        </h2>
        <div className="mx-auto mt-4 h-px w-16 bg-zinc-900 rounded-full" />
      </div>

      {/* Auto-scroll strip with edge fade */}
      <div className="[mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <InfiniteSlider gap={16} duration={35} durationOnHover={80}>
          {images.map((img) => (
            <div
              key={img.src}
              className="relative shrink-0 w-[280px] sm:w-[360px] md:w-[420px] h-[190px] sm:h-[240px] md:h-[280px] rounded-2xl overflow-hidden group"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                unoptimized
              />
            </div>
          ))}
        </InfiniteSlider>
      </div>

      {/* Show More */}
      <div className="mt-10 flex justify-center">
        <a
          href="/past-events"
          className="inline-flex items-center px-7 py-3 rounded-xl border border-zinc-300 bg-white text-zinc-900 text-sm font-semibold hover:bg-zinc-950 hover:text-white hover:border-zinc-950 transition-all duration-300"
        >
          Show More
        </a>
      </div>
    </section>
  );
}

const dockItems = [
  { link: 'https://www.facebook.com/wisbeesmedia', target: '_blank', Icon: <Facebook size={22} /> },
  { link: 'https://www.linkedin.com/company/wisbees', target: '_blank', Icon: <Linkedin size={22} /> },
  { link: 'https://www.instagram.com/wisbeesbuzz/', target: '_blank', Icon: <Instagram size={22} /> },
  { link: 'https://www.youtube.com/@wisbees2023', target: '_blank', Icon: <Youtube size={22} /> },
];

export default function Home() {
  const content = useSiteContent();

  const partners = content?.partners.length
    ? content.partners.map((p) => ({ src: p.image, alt: p.name }))
    : clientLogos;

  const homeGlimpses = content?.gallery.some((g) => g.showOnHome)
    ? content.gallery.filter((g) => g.showOnHome).map((g) => ({ src: g.image, alt: g.caption }))
    : glimpses;

  const heroVideo = content?.site.heroVideo || '/hero-video.mp4';
  const heroBg =
    content?.site.heroBackground ||
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&q=85&fit=crop';
  const heroTitle = content?.site.heroTitle || 'Wisbees Business Carnival';
  const heroSubtitle = content?.site.heroSubtitle;
  const whyVideoId = content?.videos.homeWhy[0]?.youtubeId || 'dD-97KGGfqA';

  return (
    <main>
      <Navbar />

      <ScrollExpandMedia
        mediaType="video"
        mediaSrc={heroVideo}
        bgImageSrc={heroBg}
        title={heroTitle}
        date={
          heroSubtitle ? (
            <ShimmerText className="text-sm sm:text-base md:text-lg font-medium text-gray-900 text-center whitespace-normal md:whitespace-nowrap" duration={2.5} delay={1}>
              {heroSubtitle}
            </ShimmerText>
          ) : (
            <ShimmerText className="text-sm sm:text-base md:text-lg font-medium text-gray-900 text-center whitespace-normal md:whitespace-nowrap" duration={2.5} delay={1}>
              India&apos;s <strong>first</strong> experiential entrepreneurship &amp; financial literacy program for <strong>schools</strong>
            </ShimmerText>
          )
        }
        scrollToExpand="Scroll to explore"
        textBlend
      />

      {/* Trusted by — logo cloud */}
      <section className="relative mx-auto max-w-3xl px-4 py-6 md:py-10">
        <h2 className="mb-5 text-center font-medium text-foreground text-xl tracking-tight md:text-3xl">
          <span className="font-semibold">Trusted by schools</span>
        </h2>
        <div className="mx-auto my-5 h-px max-w-sm bg-border [mask-image:linear-gradient(to_right,transparent,black,transparent)]" />
        <LogoCloud logos={partners} />
        <div className="mt-5 h-px bg-border [mask-image:linear-gradient(to_right,transparent,black,transparent)]" />
      </section>

      {/* Why WBC section */}
      <section className="bg-white py-14 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">

          {/* Heading */}
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-zinc-900 leading-tight">
              Why does your child need the Wisbees Business Carnival, 2026?
            </h2>
          </div>

          {/* 3 points + video side by side */}
          <div className="grid lg:grid-cols-[2fr_3fr] gap-6 lg:gap-10 items-center">

          {/* Left — 5 points */}
          <div>
            <div className="space-y-2.5">
              {[
                {
                  num: '01',
                  desc: 'Self-employment may be one of the most effective solutions to India\'s unemployment challenge.',
                },
                {
                  num: '02',
                  desc: 'The event shifts a child\'s mindset from "I can\'t build that" to "How can I build that?"',
                },
                {
                  num: '03',
                  desc: 'Students learn how wealth is created through businesses and investments.',
                },
                {
                  num: '04',
                  desc: 'They understand that talent alone is not enough; success requires monetising and leveraging their skills.',
                },
                {
                  num: '05',
                  desc: 'They develop first-principles thinking and gain exposure to the fundamentals of starting and building a business.',
                },
              ].map(({ num, desc }) => (
                <div
                  key={num}
                  className="group flex gap-3 p-3 rounded-2xl border border-zinc-200 bg-white hover:bg-zinc-950 hover:border-zinc-800 transition-all duration-300"
                >
                  <span className="text-lg font-black text-zinc-200 group-hover:text-white/20 transition-colors duration-300 leading-none shrink-0 pt-0.5">
                    {num}
                  </span>
                  <p className="text-sm text-zinc-600 group-hover:text-zinc-300 transition-colors duration-300 leading-relaxed">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — YouTube embed */}
          <div className="w-full rounded-2xl overflow-hidden shadow-xl border border-zinc-200 aspect-video">
            <iframe
              src={`https://www.youtube.com/embed/${whyVideoId}`}
              title="Why Wisbees Business Carnival 2026"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>

          </div>{/* end inner grid */}
        </div>
      </section>

      {/* The Opportunity — interactive India map */}
      <IndiaOpportunityMap />

      {/* Glimpses from the Past */}
      <GlimpsesSection images={homeGlimpses} />

      <Testimonials />

      {/* Wisbees Responsibility */}
      <section
        className="relative bg-zinc-950 bg-cover bg-center py-16 md:py-20 px-4 text-center"
        style={{ backgroundImage: 'url(/Picture1.png)' }}
      >
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-zinc-950/75" aria-hidden />
        <div className="relative z-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight mb-4">
            Entrepreneurial Education is a<br />
            <span className="text-white/50">Basic Right of Every Child,</span> Regardless of Economic Background.
          </h2>
          <p className="text-zinc-200 text-base max-w-xl mx-auto mb-10">
            We run pro bono WBC events for underprivileged children — because every child deserves a stage, regardless of where they come from. Help us make this a reality.
          </p>
          <a
            href="/pro-bono"
            className="inline-flex items-center gap-2 bg-white text-zinc-950 font-bold text-sm px-7 py-3.5 rounded-xl hover:bg-zinc-100 transition-all duration-200"
          >
            Support a Pro Bono WBC Event <span aria-hidden>→</span>
          </a>
        </div>
      </section>

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
