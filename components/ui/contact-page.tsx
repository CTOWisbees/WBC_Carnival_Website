'use client';

import Navbar from '@/components/ui/navbar';
import FooterNewsletter from '@/components/ui/footer-column';
import HomeBackground from '@/components/ui/background-components';
import { useSiteContent } from '@/components/site-content-provider';
import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react';

// Fallbacks used when the backend is unreachable, so the page never looks empty.
const FALLBACK = {
  address: 'Pune, Maharashtra, India',
  mobile: '+91 98765 43210',
  whatsapp: '+91 98765 43210',
  email: 'info@wisbees.com',
};

/** Strip everything but digits so we can build a wa.me / tel: link. */
function digits(value: string) {
  return value.replace(/[^\d]/g, '');
}

export default function ContactPage() {
  const content = useSiteContent();
  const contact = {
    address: content?.contact?.address || FALLBACK.address,
    mobile: content?.contact?.mobile || FALLBACK.mobile,
    whatsapp: content?.contact?.whatsapp || FALLBACK.whatsapp,
    email: content?.contact?.email || FALLBACK.email,
  };

  const cards = [
    contact.address && {
      icon: MapPin,
      label: 'Address',
      value: contact.address,
      href: `https://maps.google.com/?q=${encodeURIComponent(contact.address)}`,
      external: true,
    },
    contact.mobile && {
      icon: Phone,
      label: 'Mobile',
      value: contact.mobile,
      href: `tel:${digits(contact.mobile)}`,
      external: false,
    },
    contact.whatsapp && {
      icon: MessageCircle,
      label: 'WhatsApp',
      value: contact.whatsapp,
      href: `https://wa.me/${digits(contact.whatsapp)}`,
      external: true,
    },
    contact.email && {
      icon: Mail,
      label: 'Email',
      value: contact.email,
      href: `mailto:${contact.email}`,
      external: false,
    },
  ].filter(Boolean) as {
    icon: typeof MapPin;
    label: string;
    value: string;
    href: string;
    external: boolean;
  }[];

  return (
    <main className="relative overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[40vh] flex items-center justify-center pt-24 pb-12 px-4">
        <div className="absolute inset-0 z-0">
          <HomeBackground className="w-full h-full" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-zinc-900 leading-tight mb-4">
            Contact Us
          </h1>
          <p className="text-zinc-500 text-base sm:text-lg mt-4 max-w-xl mx-auto leading-relaxed">
            Questions about the carnival, sponsorships, or bringing WBC to your school? Reach out — we&rsquo;d love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact cards */}
      <section className="bg-zinc-950 py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {cards.map(({ icon: Icon, label, value, href, external }) => (
            <a
              key={label}
              href={href}
              {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
              className="group flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-200"
            >
              <span className="shrink-0 flex items-center justify-center w-11 h-11 rounded-xl bg-white/10 text-white group-hover:bg-white group-hover:text-zinc-950 transition-colors duration-200">
                <Icon size={20} />
              </span>
              <div className="min-w-0">
                <p className="text-[11px] font-semibold tracking-widest uppercase text-zinc-500 mb-1">
                  {label}
                </p>
                <p className="text-white text-sm sm:text-base font-medium break-words leading-relaxed">
                  {value}
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>

      <FooterNewsletter />
    </main>
  );
}
