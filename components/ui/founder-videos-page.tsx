'use client';

import Navbar from '@/components/ui/navbar';
import FooterNewsletter from '@/components/ui/footer-column';
import HomeBackground from '@/components/ui/background-components';
import { useSiteContent } from '@/components/site-content-provider';

const moreVideos = [
  { id: 'dD-97KGGfqA', title: 'The Problem with School Education in India' },
  { id: 'dD-97KGGfqA', title: 'What Financial Literacy Means for a 14-Year-Old' },
  { id: 'dD-97KGGfqA', title: 'How WBC Works — The Full Model Explained' },
  { id: 'dD-97KGGfqA', title: 'From 1 School to 500+ — Our Growth Story' },
  { id: 'dD-97KGGfqA', title: 'What Sponsors Get from WBC' },
  { id: 'dD-97KGGfqA', title: 'The Vision: WBC in Every Indian School by 2030' },
];

export default function FounderVideosPage() {
  const content = useSiteContent();
  const videos = content?.videos.founder.length
    ? content.videos.founder.map((v) => ({ id: v.youtubeId, title: v.title }))
    : moreVideos;

  return (
    <main className="relative overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[38vh] flex items-center justify-center pt-24 pb-10 px-4">
        <div className="absolute inset-0 z-0">
          <HomeBackground className="w-full h-full" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <p className="text-xs font-semibold tracking-widest uppercase text-zinc-500 mb-3">
            Stories · Watch
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-zinc-900 leading-none mb-4">
            From the Founder
          </h1>
          <p className="text-base md:text-lg text-zinc-500 max-w-xl mx-auto">
            Unfiltered conversations, ideas, and the thinking behind Wisbees Business Carnival.
          </p>
        </div>
      </section>

      {/* More videos */}
      <section className="bg-white py-14 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
           
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-900">
              Founder Talks and Business Stories
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((v, i) => (
              <div key={`${v.id}-${i}`} className="group flex flex-col gap-3">
                <div className="w-full aspect-video rounded-2xl overflow-hidden border border-zinc-200 group-hover:border-zinc-400 transition-colors duration-300 shadow-sm">
                  <iframe
                    src={`https://www.youtube.com/embed/${v.id}`}
                    title={v.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
                <div className="flex items-start gap-3 px-1">
                  <span className="text-xs font-black text-zinc-300 tabular-nums pt-0.5 shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="text-sm font-semibold text-zinc-800 leading-snug group-hover:text-zinc-950 transition-colors duration-200">
                    {v.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FooterNewsletter />
    </main>
  );
}
