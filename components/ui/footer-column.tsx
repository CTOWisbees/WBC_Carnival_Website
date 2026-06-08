'use client';

import { Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';

const navLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Contact Us', href: '#' },
  { label: 'Partner With Us', href: '/sponsors' },
  { label: 'Wisbees Responsibility', href: '/pro-bono' },
];

const socialIcons = [
  { icon: <Instagram className="h-5 w-5" />, href: '#', label: 'Instagram' },
  { icon: <Twitter className="h-5 w-5" />, href: '#', label: 'Twitter' },
  { icon: <Linkedin className="h-5 w-5" />, href: '#', label: 'LinkedIn' },
  { icon: <Youtube className="h-5 w-5" />, href: '#', label: 'YouTube' },
];

export default function FooterNewsletter() {
  return (
    <footer className="bg-zinc-950 text-white w-full">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 flex flex-col items-center gap-6">

        {/* Newsletter */}
        <div className="w-full flex flex-col items-center gap-2 text-center">
          <h3 className="text-lg sm:text-xl font-bold text-white">
            Subscribe to Wisbees Newsletter
          </h3>
          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md mt-1">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-xl border border-zinc-700 bg-zinc-900 text-white placeholder-zinc-500 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-white/20"
            />
            <button className="rounded-xl bg-white text-zinc-950 font-semibold text-sm px-6 py-3 hover:bg-zinc-100 transition-colors duration-200 shrink-0">
              Subscribe
            </button>
          </div>
        </div>

        {/* Nav links */}
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-3">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-zinc-400 hover:text-white transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Social icons */}
        <div className="flex items-center gap-4">
          {socialIcons.map((item) => (
            <a
              key={item.label}
              href={item.href}
              aria-label={item.label}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-400 transition-colors duration-200"
            >
              {item.icon}
            </a>
          ))}
        </div>

        {/* Divider + copyright */}
        <div className="w-full border-t border-zinc-800 pt-6 text-center">
          <p className="text-xs text-zinc-500">
            © {new Date().getFullYear()} Wisbees Business Carnival. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
