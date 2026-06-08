'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, Menu, X, AlignJustify } from 'lucide-react';
import { useSiteContent } from '@/components/site-content-provider';

const services = [
  { label: 'Read', href: '#' },
  { label: 'Watch', href: '/founder-videos' },
];


const navLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Testimonials', href: '/testimonials' },
  { label: 'Past Events', href: '/past-events' },
  { label: 'Outcomes', href: '/outcomes' },
  { label: 'Stories', href: '#', dropdown: services },
  { label: 'Sponsors', href: '/sponsors' },
];

const wisbeesProducts = [
  {
    name: 'Buzz by Wisbees',
    tagline: 'Join Community & FAQs',
    href: '#',
  },
  {
    name: 'WisBees',
    tagline: 'Storytelling platform of business and finance',
    href: '#',
  },
  {
    name: 'Wisbees Wealth',
    tagline: 'Mutual fund investment platform',
    href: '#',
  },
];

function NavItem({ label, href }: { label: string; href: string }) {
  return (
    <li>
      <a href={href} className="relative inline-block group">
        <span className="relative z-10 block uppercase text-white font-semibold text-sm py-1.5 px-3 transition-colors duration-300 group-hover:text-gray-900">
          {label}
        </span>
        <span className="absolute inset-0 border-t border-b border-white transform scale-y-[2] opacity-0 transition-all duration-300 origin-center group-hover:scale-y-100 group-hover:opacity-100 rounded-sm" />
        <span className="absolute top-[1px] left-0 w-full h-full bg-white transform scale-0 opacity-0 transition-all duration-300 origin-top group-hover:scale-100 group-hover:opacity-100 rounded-sm" />
      </a>
    </li>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);

  const content = useSiteContent();
  const logoSrc = content?.site.logo || '/logo.png';

  return (
    <nav
      className="fixed left-0 right-0 z-30 px-4 sm:px-6 lg:px-8 transition-[top] duration-300"
      style={{ top: 'var(--fd-banner-height, 0px)' }}
    >
      <div className="mx-auto max-w-7xl mt-3">

        {/* Logo + bar row — relative so logo anchors only to this row */}
        <div className="relative">
          <Link href="/" className="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex items-center">
            <Image
              src={logoSrc}
              alt="Wisbees Business Carnival"
              width={220}
              height={72}
              className="h-16 w-auto object-contain drop-shadow-xl"
              priority
            />
          </Link>

        {/* Main bar */}
        <div className="flex items-center justify-between h-14 bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl pl-56 pr-5 shadow-lg shadow-black/40">

          {/* Desktop links — visible ≥900px */}
          <ul className="hidden min-[900px]:flex items-center">
            {navLinks.map((link) =>
              link.dropdown ? (
                <li
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <button
                    className="relative inline-flex items-center group"
                    onClick={() => setServicesOpen((v) => !v)}
                  >
                    <span className="relative z-10 flex items-center gap-1 uppercase text-white font-semibold text-sm py-1.5 px-3 transition-colors duration-300 group-hover:text-gray-900">
                      {link.label}
                      <ChevronDown
                        size={13}
                        className={`transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`}
                      />
                    </span>
                    <span className="absolute inset-0 border-t border-b border-white transform scale-y-[2] opacity-0 transition-all duration-300 origin-center group-hover:scale-y-100 group-hover:opacity-100 rounded-sm" />
                    <span className="absolute top-[1px] left-0 w-full h-full bg-white transform scale-0 opacity-0 transition-all duration-300 origin-top group-hover:scale-100 group-hover:opacity-100 rounded-sm" />
                  </button>

                  {/* Stories dropdown */}
                  <div
                    className={`absolute top-full left-1/2 -translate-x-1/2 pt-4 w-56 transition-all duration-200 ${
                      servicesOpen
                        ? 'opacity-100 translate-y-0 pointer-events-auto'
                        : 'opacity-0 -translate-y-2 pointer-events-none'
                    }`}
                  >
                    <div className="bg-black/85 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden">
                      {services.map((s, i) => (
                        <Link
                          key={s.label}
                          href={s.href}
                          className={`block px-4 py-3 text-sm text-white/80 hover:text-white hover:bg-white/10 transition-colors duration-150 ${
                            i !== services.length - 1 ? 'border-b border-white/[0.06]' : ''
                          }`}
                        >
                          {s.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </li>
              ) : (
                <NavItem key={link.label} label={link.label} href={link.href} />
              )
            )}
          </ul>

          {/* Right side */}
          <div className="flex items-center gap-2 ml-auto">
            {/* Register Now — desktop */}
            <Link
              href="#"
              className="hidden min-[900px]:inline-flex text-sm font-semibold text-black bg-white hover:bg-gray-100 border border-gray-200 px-4 py-2 rounded-lg transition-all duration-200"
            >
              Register Now
            </Link>

            {/* Products menu — desktop only */}
            <div
              className="relative hidden min-[900px]:block"
              onMouseEnter={() => setProductsOpen(true)}
              onMouseLeave={() => setProductsOpen(false)}
            >
              <button
                className="flex items-center justify-center w-9 h-9 rounded-lg border border-white/20 text-white hover:bg-white/10 transition-colors duration-200"
                onClick={() => setProductsOpen((v) => !v)}
                aria-label="Wisbees products"
              >
                <AlignJustify size={16} />
              </button>

              {/* Products dropdown — opens left */}
              <div
                className={`absolute top-full right-0 pt-4 w-72 transition-all duration-200 ${
                  productsOpen
                    ? 'opacity-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 -translate-y-2 pointer-events-none'
                }`}
              >
                <div className="bg-black/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden">
                  <div className="px-4 py-3 border-b border-white/[0.06]">
                    <p className="text-[10px] font-semibold tracking-widest uppercase text-white/40">
                      Wisbees Ecosystem
                    </p>
                  </div>
                  {wisbeesProducts.map((p, i) => (
                    <Link
                      key={p.name}
                      href={p.href}
                      className={`flex flex-col gap-0.5 px-4 py-3.5 hover:bg-white/10 transition-colors duration-150 ${
                        i !== wisbeesProducts.length - 1 ? 'border-b border-white/[0.06]' : ''
                      }`}
                    >
                      <span className="text-sm font-semibold text-white">{p.name}</span>
                      <span className="text-xs text-white/50">{p.tagline}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Hamburger — mobile (<900px) */}
            <button
              className="min-[900px]:hidden text-white p-1"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
        </div>{/* end logo + bar row */}

        {/* Mobile menu — visible <900px */}
        <div
          className={`min-[900px]:hidden mt-2 transition-all duration-300 overflow-hidden ${
            mobileOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="bg-black/85 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl">
            <ul className="space-y-1">
              {/* Nav links */}
              {navLinks.map((link) =>
                link.dropdown ? (
                  <li key={link.label}>
                    <button
                      className="w-full flex items-center justify-between px-4 py-3 text-white font-semibold uppercase text-sm rounded-lg hover:bg-white/10 transition"
                      onClick={() => setServicesOpen((v) => !v)}
                    >
                      {link.label}
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`}
                      />
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-200 ${
                        servicesOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <ul className="ml-4 mt-1 space-y-0.5">
                        {services.map((s) => (
                          <li key={s.label}>
                            <Link
                              href={s.href}
                              className="block px-4 py-2.5 text-sm text-white/60 hover:text-white rounded-lg hover:bg-white/10 transition"
                              onClick={() => setMobileOpen(false)}
                            >
                              {s.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                ) : (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="block px-4 py-3 text-white font-semibold uppercase text-sm rounded-lg hover:bg-white/10 transition"
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </a>
                  </li>
                )
              )}

              {/* Wisbees products section in mobile */}
              <li>
                <button
                  className="w-full flex items-center justify-between px-4 py-3 text-white font-semibold uppercase text-sm rounded-lg hover:bg-white/10 transition"
                  onClick={() => setMobileProductsOpen((v) => !v)}
                >
                  <span>Wisbees Ecosystem</span>
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${mobileProductsOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-200 ${
                    mobileProductsOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <ul className="ml-4 mt-1 space-y-0.5">
                    {wisbeesProducts.map((p) => (
                      <li key={p.name}>
                        <Link
                          href={p.href}
                          className="flex flex-col px-4 py-2.5 rounded-lg hover:bg-white/10 transition"
                          onClick={() => setMobileOpen(false)}
                        >
                          <span className="text-sm text-white/80 hover:text-white font-medium">{p.name}</span>
                          <span className="text-xs text-white/40">{p.tagline}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            </ul>

            {/* Register Now — mobile */}
            <div className="mt-4 pt-4 border-t border-white/10">
              <Link
                href="#"
                className="block text-center text-sm font-semibold text-black bg-white hover:bg-gray-100 border border-gray-200 px-4 py-3 rounded-lg transition"
                onClick={() => setMobileOpen(false)}
              >
                Register Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
