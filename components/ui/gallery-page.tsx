'use client';

import { useState } from 'react';
import Image from 'next/image';
import Navbar from '@/components/ui/navbar';
import FooterNewsletter from '@/components/ui/footer-column';
import HomeBackground from '@/components/ui/background-components';
import { ImageIcon, PlayCircle } from 'lucide-react';
import { useSiteContent } from '@/components/site-content-provider';

const allImages = [
  { src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80&fit=crop', alt: 'WBC Event 2024' },
  { src: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80&fit=crop', alt: 'Students presenting' },
  { src: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80&fit=crop', alt: 'Business pitch' },
  { src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80&fit=crop', alt: 'Panel discussion' },
  { src: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80&fit=crop', alt: 'Team collaboration' },
  { src: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80&fit=crop', alt: 'Students at work' },
  { src: 'https://images.unsplash.com/photo-1544531585-9847b68c8c86?w=800&q=80&fit=crop', alt: 'Conference hall' },
  { src: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80&fit=crop', alt: 'School students' },
  { src: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80&fit=crop', alt: 'Team working' },
  { src: 'https://images.unsplash.com/photo-1496180470114-6ef490f3ff22?w=800&q=80&fit=crop', alt: 'Live presentation' },
  { src: 'https://images.unsplash.com/photo-1568992688065-536aad8a12f6?w=800&q=80&fit=crop', alt: 'Business workshop' },
  { src: 'https://images.unsplash.com/photo-1474631245212-32dc3c8310c6?w=800&q=80&fit=crop', alt: 'Award ceremony' },
  { src: 'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=800&q=80&fit=crop', alt: 'Group activity' },
  { src: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80&fit=crop', alt: 'Entrepreneur talk' },
  { src: 'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=800&q=80&fit=crop', alt: 'Workshop session' },
  { src: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&q=80&fit=crop', alt: 'Student pitch' },
];

const allVideos = [
  { id: 'dD-97KGGfqA', title: 'WBC 2024 Highlights' },
  { id: 'dD-97KGGfqA', title: 'Student Pitches & Moments' },
  { id: 'dD-97KGGfqA', title: 'WBC Behind the Scenes' },
  { id: 'dD-97KGGfqA', title: 'Award Ceremony 2024' },
  { id: 'dD-97KGGfqA', title: 'Sponsor Spotlight' },
  { id: 'dD-97KGGfqA', title: 'WBC 2023 Recap' },
];

type Tab = 'photos' | 'videos';

export default function GalleryPage() {
  const [tab, setTab] = useState<Tab>('photos');
  const content = useSiteContent();

  const images = content?.gallery.length
    ? content.gallery.map((g) => ({ src: g.image, alt: g.caption }))
    : allImages;
  const videos = content?.videos.gallery.length
    ? content.videos.gallery.map((v) => ({ id: v.youtubeId, title: v.title }))
    : allVideos;

  return (
    <main className="relative overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[40vh] flex items-center justify-center pt-24 pb-12 px-4">
        <div className="absolute inset-0 z-0">
          <HomeBackground className="w-full h-full" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <p className="text-xs font-semibold tracking-widest uppercase text-zinc-500 mb-3">
            Past Events
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-zinc-900 leading-none mb-4">
            Glimpses from the Past
          </h1>
          <p className="text-base md:text-lg text-zinc-500 max-w-xl mx-auto">
            Moments that captured the energy, innovation, and spirit of Wisbees Business Carnival.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">

          {/* Toggle */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex items-center bg-zinc-100 rounded-xl p-1 gap-1">
              <button
                onClick={() => setTab('photos')}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  tab === 'photos'
                    ? 'bg-zinc-950 text-white shadow-sm'
                    : 'text-zinc-500 hover:text-zinc-900'
                }`}
              >
                <ImageIcon size={15} />
                Photos
              </button>
              <button
                onClick={() => setTab('videos')}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  tab === 'videos'
                    ? 'bg-zinc-950 text-white shadow-sm'
                    : 'text-zinc-500 hover:text-zinc-900'
                }`}
              >
                <PlayCircle size={15} />
                Videos
              </button>
            </div>
          </div>

          {/* Photos grid */}
          {tab === 'photos' && (
            <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 sm:gap-4">
              {images.map((img, i) => (
                <div
                  key={img.src}
                  className="break-inside-avoid mb-3 sm:mb-4 overflow-hidden rounded-xl group"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={800}
                    height={i % 4 === 0 ? 560 : 420}
                    className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          )}

          {/* Videos grid */}
          {tab === 'videos' && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {videos.map((v) => (
                <div key={`${v.id}-${v.title}`} className="flex flex-col gap-2">
                  <div className="w-full aspect-video rounded-2xl overflow-hidden border border-zinc-200 shadow-sm">
                    <iframe
                      src={`https://www.youtube.com/embed/${v.id}`}
                      title={v.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                  <p className="text-sm font-semibold text-zinc-700 px-1">{v.title}</p>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>

      <FooterNewsletter />
    </main>
  );
}
