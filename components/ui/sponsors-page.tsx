'use client';

import Navbar from '@/components/ui/navbar';
import FooterNewsletter from '@/components/ui/footer-column';
import HomeBackground from '@/components/ui/background-components';

const tiers = [
  {
    name: 'Silver',
    tagline: 'Economical exposure with real reach',
    badge: 'Great Value',
    accent: '#a8b5c8',
    accentMuted: 'rgba(168,181,200,0.09)',
    accentBorder: 'rgba(168,181,200,0.25)',
    accentGlow: '0 0 48px 0 rgba(168,181,200,0.08)',
    features: [
      'Name placement at bottom-most position on Shark Pitch / Bank Tables / Stage',
      'Included in Money Market PPT',
      'Included in social media promotions (no YouTube ads)',
      'Proof of Visibility report included',
    ],
  },
  {
    name: 'Gold',
    tagline: 'Strong visibility at a moderate budget',
    badge: 'Most Popular',
    accent: '#f5a623',
    accentMuted: 'rgba(245,166,35,0.10)',
    accentBorder: 'rgba(245,166,35,0.30)',
    accentGlow: '0 0 48px 0 rgba(245,166,35,0.10)',
    features: [
      'Branding on banners & posters (medium size)',
      'Inclusion in Money Market PPT',
      'Second-position branding on Shark Pitch / Bank Tables / Stage',
      'Opening Ceremony presence + mentions (5–7 shout-outs)',
      'Presence in social media videos only',
      '7-day pre-event social media campaign',
      'Stall allowed',
      'Brand presence at the Selfie Point',
      'Proof of Visibility report',
    ],
  },
  {
    name: 'Platinum',
    tagline: 'Maximum visibility & premium branding',
    badge: 'Most Exclusive',
    accent: '#e8c96d',
    accentMuted: 'rgba(232,201,109,0.12)',
    accentBorder: 'rgba(232,201,109,0.35)',
    accentGlow: '0 0 48px 0 rgba(232,201,109,0.13)',
    features: [
      'Branding as "Powered By" partner',
      'Large banners & posters across venue',
      'Branding on participation badges / ID cards',
      'Inclusion in Money Market PPT',
      'Top-most placement on Shark Pitch / Bank Tables / Stage / Nameplates',
      'Opening Ceremony presence + Host shout-outs (10+ mentions)',
      'Inclusion in YouTube Ads & full social media videos',
      '7-day pre-event promotional campaign',
      'Stall allowed for product display',
      'Brand presence at the Selfie Point',
      'Full Proof of Visibility report provided',
    ],
  },
];

function CheckIcon({ color }: { color: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5">
      <circle cx="8" cy="8" r="8" fill={color} fillOpacity="0.15" />
      <path d="M4.5 8.5L6.5 10.5L11.5 5.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function SponsorsPage() {
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
            Partner With Us
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-zinc-900 leading-tight mb-4">
            Why Sponsor Us
          </h1>
          <p className="text-zinc-500 text-lg sm:text-xl mt-4 max-w-xl mx-auto leading-relaxed">
            Not just an event. A first spark.
          </p>
        </div>
      </section>

      {/* Tiers section */}
      <section className="bg-zinc-950 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">

          {/* Section header */}
          <div className="text-center mb-14 pt-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-white/40 inline-block" />
              <span className="text-xs font-semibold tracking-widest uppercase text-white/40">Sponsorship Tiers</span>
              <span className="w-1.5 h-1.5 rounded-full bg-white/40 inline-block" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
              Choose Your Impact Level
            </h2>
            <p className="text-zinc-500 text-base sm:text-lg max-w-xl mx-auto">
              Every tier puts your brand in front of the next generation of entrepreneurs.
            </p>
          </div>

          {/* Tier cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {tiers.map((tier, idx) => (
              <div
                key={tier.name}
                className="relative rounded-2xl overflow-hidden flex flex-col"
                style={{
                  border: `1px solid ${tier.accentBorder}`,
                  background: `linear-gradient(160deg, ${tier.accentMuted} 0%, rgba(9,9,11,0.95) 55%)`,
                  boxShadow: idx === 2 ? tier.accentGlow : 'none',
                }}
              >
                {/* Top accent bar */}
                <div
                  className="h-[3px] w-full"
                  style={{ background: `linear-gradient(90deg, transparent, ${tier.accent}, transparent)` }}
                />

                {/* Badge */}
                <div className="px-6 pt-6 pb-0 flex items-start justify-between">
                  <span
                    className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full"
                    style={{
                      color: tier.accent,
                      background: `${tier.accentMuted}`,
                      border: `1px solid ${tier.accentBorder}`,
                    }}
                  >
                    {tier.badge}
                  </span>
                </div>

                {/* Name + tagline */}
                <div className="px-6 pt-4 pb-6">
                  <div className="flex items-center gap-3 mb-2">
                    {/* Tier icon circle */}
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: tier.accentMuted, border: `1px solid ${tier.accentBorder}` }}
                    >
                      <span className="text-lg font-black" style={{ color: tier.accent }}>
                        {tier.name[0]}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-white text-xl font-black tracking-tight">{tier.name}</h3>
                      <p className="text-zinc-500 text-xs leading-snug">{tier.tagline}</p>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px mx-6" style={{ background: tier.accentBorder }} />

                {/* Features */}
                <ul className="px-6 py-6 space-y-3 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <CheckIcon color={tier.accent} />
                      <span className="text-zinc-300 text-sm leading-relaxed">{f}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <div className="px-6 pb-6 pt-2">
                  <a
                    href="#"
                    className="group w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all duration-200"
                    style={{
                      background: tier.accentMuted,
                      border: `1px solid ${tier.accentBorder}`,
                      color: tier.accent,
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.background = tier.accent;
                      (e.currentTarget as HTMLAnchorElement).style.color = '#09090b';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.background = tier.accentMuted;
                      (e.currentTarget as HTMLAnchorElement).style.color = tier.accent;
                    }}
                  >
                    Get {tier.name} Sponsorship
                    <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-14 rounded-2xl border border-white/10 bg-white/5 p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h3 className="text-white font-black text-lg mb-1">
                Not sure which tier fits?
              </h3>
              <p className="text-zinc-500 text-sm">
                Talk to us — we&rsquo;ll find the right partnership for your brand.
              </p>
            </div>
            <a
              href="#"
              className="shrink-0 inline-flex items-center gap-2 bg-white text-zinc-950 font-bold text-sm px-7 py-3.5 rounded-xl hover:bg-zinc-100 transition-all duration-200 whitespace-nowrap"
            >
              Contact Us <span aria-hidden>→</span>
            </a>
          </div>

        </div>
      </section>

      {/* Why section */}
      <section className="bg-zinc-950 py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">

          <div className="border-l-2 border-white/20 pl-6 mb-14">
            <p className="text-white/50 text-xs font-semibold tracking-widest uppercase mb-3">
              The Belief
            </p>
            <p className="text-white text-xl sm:text-2xl md:text-3xl font-bold leading-snug">
              A first idea. A first plan. A first belief.
            </p>
          </div>

          <div className="space-y-8 mb-14">
            <p className="text-zinc-300 text-base sm:text-lg leading-relaxed">
              Your support turns early courage into real possibility. Every entrepreneur starts small —
              your backing meets them at the starting line.
            </p>

            <div className="h-px bg-white/10" />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { headline: 'Small push.', sub: 'Big confidence.' },
                { headline: 'Lasting impact.', sub: 'Support that lives beyond the prize.' },
                { headline: 'Simple support.', sub: 'Big ripple.' },
              ].map((item) => (
                <div
                  key={item.headline}
                  className="rounded-xl border border-white/10 bg-white/5 px-5 py-4"
                >
                  <p className="text-white font-bold text-sm mb-1">{item.headline}</p>
                  <p className="text-zinc-500 text-xs leading-relaxed">{item.sub}</p>
                </div>
              ))}
            </div>

            <div className="h-px bg-white/10" />

            <p className="text-zinc-300 text-base sm:text-lg leading-relaxed">
              You&rsquo;re not funding a day. You&rsquo;re fueling young ambition — boosting tools,
              resources, and real-world learning for the entrepreneurs of tomorrow.
            </p>
          </div>

          <blockquote className="border border-white/10 rounded-2xl bg-white/5 px-8 py-8 mb-0">
            <p className="text-white text-base sm:text-lg md:text-xl leading-relaxed font-medium italic">
              &ldquo;Partner with us not just to sponsor an event, but to shape the entrepreneurial
              future of young India while building meaningful brand equity within a trusted
              educational ecosystem.&rdquo;
            </p>
          </blockquote>

        </div>
      </section>

      <FooterNewsletter />
    </main>
  );
}
