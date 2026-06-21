"use client";
import React, { useState } from "react";
import { motion } from "motion/react";
import { useSiteContent } from "@/components/site-content-provider";

interface Testimonial {
  text: string;
  image: string;
  name: string;
  role: string;
}

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
  isPaused?: boolean;
  onPause?: () => void;
  onResume?: () => void;
}) => {
  const duration = props.duration || 10;

  return (
    <div
      className={props.className}
      onMouseEnter={props.onPause}
      onMouseLeave={props.onResume}
    >
      <style>{`
        @keyframes wbcScrollY { from { transform: translate3d(0,0,0); } to { transform: translate3d(0,-50%,0); } }
      `}</style>
      <div
        className="flex flex-col gap-6 pb-6 bg-background will-change-transform"
        style={{
          animation: `wbcScrollY ${duration}s linear infinite`,
          animationPlayState: props.isPaused ? "paused" : "running",
        }}
      >
        {[...new Array(2).fill(0).map((_, index) => (
          <React.Fragment key={index}>
            {props.testimonials.map(({ text, image, name, role }, i) => (
              <div
                className="p-6 md:p-10 rounded-3xl border ring-1 ring-primary/10 shadow-md shadow-primary/10 max-w-[280px] md:max-w-xs w-full"
                key={i}
              >
                <div>{text}</div>
                <div className="flex items-center gap-2 mt-5">
                  <img
                    width={40}
                    height={40}
                    src={image}
                    alt={name}
                    className="h-10 w-10 rounded-full"
                  />
                  <div className="flex flex-col">
                    <div className="font-medium tracking-tight leading-5">
                      {name}
                    </div>
                    <div className="leading-5 opacity-60 tracking-tight">
                      {role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))]}
      </div>
    </div>
  );
};

const testimonials: Testimonial[] = [
  {
    text: "WBC Solutions transformed our operations entirely. Their strategic roadmap helped us reduce costs by 40% while improving output quality across the board.",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    name: "Briana Patton",
    role: "Operations Manager",
  },
  {
    text: "Working with WBC was seamless from day one. Their team understood our needs quickly and delivered results that exceeded every expectation we had.",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    name: "Bilal Ahmed",
    role: "IT Manager",
  },
  {
    text: "The support and guidance from WBC throughout our digital transformation was exceptional. They made a complex process feel entirely manageable.",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    name: "Saman Malik",
    role: "Customer Support Lead",
  },
  {
    text: "WBC's strategic insights were invaluable for our expansion into new markets. Their data-driven approach gave us the confidence to make bold moves.",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    name: "Omar Raza",
    role: "CEO",
  },
  {
    text: "Their robust methodology and quick turnaround transformed our entire workflow. We are significantly more efficient thanks to WBC Solutions.",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    name: "Zainab Hussain",
    role: "Project Manager",
  },
  {
    text: "The implementation was smooth and the results were immediate. WBC streamlined our processes in ways we hadn't imagined were possible.",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
    name: "Aliza Khan",
    role: "Business Analyst",
  },
  {
    text: "Our brand presence and customer reach improved dramatically after WBC's marketing strategy overhaul. Highly recommend their expertise.",
    image: "https://randomuser.me/api/portraits/men/7.jpg",
    name: "Farhan Siddiqui",
    role: "Marketing Director",
  },
  {
    text: "WBC delivered a solution that truly understood our business. Their consultants felt like part of our own team throughout the engagement.",
    image: "https://randomuser.me/api/portraits/women/8.jpg",
    name: "Sana Sheikh",
    role: "Sales Manager",
  },
  {
    text: "Our e-commerce performance has never been better. WBC's analytics-driven approach boosted our conversion rates by over 60% in just three months.",
    image: "https://randomuser.me/api/portraits/men/9.jpg",
    name: "Hassan Ali",
    role: "E-commerce Manager",
  },
];

export const Testimonials = () => {
  const [isPaused, setIsPaused] = useState(false);
  const content = useSiteContent();

  const data = content?.testimonials.homeColumn.length
    ? content.testimonials.homeColumn.map((t) => ({
        text: t.quote,
        image: t.image,
        name: t.name,
        role: t.role,
      }))
    : testimonials;

  const firstColumn = data.slice(0, 3);
  const secondColumn = data.slice(3, 6);
  const thirdColumn = data.slice(6, 9);

  return (
    <section className="bg-background my-10 md:my-20 relative">
      <div className="container z-10 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tighter mt-5">
            Testimonials
          </h2>
        </motion.div>

        <div className="relative max-h-[740px] overflow-hidden mt-10">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-32 z-10 bg-gradient-to-b from-background to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 z-10 bg-gradient-to-t from-background to-transparent" />
          <div className="flex justify-center gap-4 md:gap-6">
          <TestimonialsColumn
            testimonials={firstColumn}
            duration={15}
            isPaused={isPaused}
            onPause={() => setIsPaused(true)}
            onResume={() => setIsPaused(false)}
          />
          <TestimonialsColumn
            testimonials={secondColumn}
            className="hidden md:block"
            duration={19}
            isPaused={isPaused}
            onPause={() => setIsPaused(true)}
            onResume={() => setIsPaused(false)}
          />
          <TestimonialsColumn
            testimonials={thirdColumn}
            className="hidden lg:block"
            duration={17}
            isPaused={isPaused}
            onPause={() => setIsPaused(true)}
            onResume={() => setIsPaused(false)}
          />
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <a
            href="/testimonials"
            className="inline-flex items-center px-7 py-3 rounded-xl border border-zinc-300 bg-white text-zinc-900 text-sm font-semibold hover:bg-zinc-950 hover:text-white hover:border-zinc-950 transition-all duration-300"
          >
            Show More
          </a>
        </div>
      </div>
    </section>
  );
};
