'use client';

import Navbar from '@/components/ui/navbar';
import FooterNewsletter from '@/components/ui/footer-column';
import HomeBackground from '@/components/ui/background-components';
import { StaggerTestimonials, parentTestimonials } from '@/components/ui/stagger-testimonials';
import { useSiteContent } from '@/components/site-content-provider';

const studentVideos = [
  {
    id: 'dD-97KGGfqA',
    title: '"WBC changed the way I think about business"',
    student: 'Aarav Mehta, Grade 10',
  },
  {
    id: 'dD-97KGGfqA',
    title: '"I pitched my idea to real investors at 15"',
    student: 'Priya Sharma, Grade 11',
  },
];

export default function TestimonialsPage() {
  const content = useSiteContent();

  const studentVids = content?.videos.student.length
    ? content.videos.student.map((v) => ({ id: v.youtubeId, title: v.title, student: v.subtitle }))
    : studentVideos;

  const parentData = content?.testimonials.parent.length
    ? content.testimonials.parent.map((t, i) => ({
        tempId: i,
        testimonial: t.quote,
        by: t.name,
        imgSrc: t.image,
      }))
    : parentTestimonials;

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
            Testimonials
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-zinc-900 leading-none mb-4">
            What They Say
          </h1>
          <p className="text-base md:text-lg text-zinc-500 max-w-xl mx-auto">
            Real words from students, schools, and sponsors who experienced WBC first‑hand.
          </p>
        </div>
      </section>

      {/* Hear from our students */}
      <section className="bg-zinc-950 py-14 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold tracking-widest uppercase text-zinc-500 mb-3">
              Student Stories
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white">
              Hear from Our Students
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
            {studentVids.map((v) => (
              <div key={v.title} className="flex flex-col gap-3">
                <div className="w-full aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-lg">
                  <iframe
                    src={`https://www.youtube.com/embed/${v.id}`}
                    title={v.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
                <div className="px-1">
                  <p className="text-white font-semibold text-sm leading-snug">{v.title}</p>
                  <p className="text-zinc-500 text-xs mt-0.5">{v.student}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Parents Say */}
      <section className="bg-zinc-50 py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10">
          <p className="text-xs font-semibold tracking-widest uppercase text-zinc-400 mb-3">
            Community Voices
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-zinc-900">
            Heard from Parents &amp; Schools
          </h2>
        </div>
        <StaggerTestimonials data={parentData} autoPlayInterval={3500} />
      </section>

<FooterNewsletter />
    </main>
  );
}
