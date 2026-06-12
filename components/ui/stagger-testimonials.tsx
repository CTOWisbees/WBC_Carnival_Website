"use client"

import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const SQRT_5000 = Math.sqrt(5000);

export interface TestimonialItem {
  tempId: number;
  testimonial: string;
  by: string;
  imgSrc: string;
}

export const parentTestimonials: TestimonialItem[] = [
  { tempId: 0, testimonial: "My son came home and spent the entire dinner explaining business ideas he wanted to start. As a parent, I was surprised to see him so excited about building his own. Wisbees Business Carnival made him think beyond marks and careers.", by: "Parent of Arnav — Sanskriti School", imgSrc: "https://i.pravatar.cc/150?img=12" },
  { tempId: 1, testimonial: "Ritika was so inspired by the event that she and her friends are now actively brainstorming and exploring real-world business ideas they can implement.", by: "Parent of Ritika — Sri Chaitanya School", imgSrc: "https://i.pravatar.cc/150?img=47" },
  { tempId: 2, testimonial: "I had never seen my daughter beyond studies. This event has helped her to think differently.", by: "Anushka's Mother", imgSrc: "https://i.pravatar.cc/150?img=48" },
  { tempId: 3, testimonial: "What makes WBC different is that it doesn't tell children what to think — it teaches them how to think.", by: "Parent of Devansh", imgSrc: "https://i.pravatar.cc/150?img=15" },
  { tempId: 4, testimonial: "For the first time, my child understood concepts like budgeting, teamwork, and leadership through real experiences instead of textbooks.", by: "Parent of Vivaan — Sri Chaitanya School", imgSrc: "https://i.pravatar.cc/150?img=53" },
  { tempId: 5, testimonial: "What impressed me most was how engaged the students were throughout the event. They were thinking, discussing, pitching, and learning continuously.", by: "Parent of Reyansh — VIBGYOR School", imgSrc: "https://i.pravatar.cc/150?img=33" },
];

export const schoolTestimonials: TestimonialItem[] = [
  { tempId: 0, testimonial: "WBC was the highlight of our academic calendar. Students were engaged, energised and talking about it for weeks after the event.", by: "Principal Meera Sharma, Delhi Public School", imgSrc: "https://i.pravatar.cc/150?img=32" },
  { tempId: 1, testimonial: "The WBC team was professional, organised and incredibly supportive throughout. Seamless execution from start to finish.", by: "Vice Principal Arjun Bose, Heritage School Kolkata", imgSrc: "https://i.pravatar.cc/150?img=59" },
  { tempId: 2, testimonial: "We've hosted many events, but nothing has created the kind of buzz among students that WBC did. The energy on that day was electric.", by: "Ms. Lakshmi Patel, Coordinator — Ryan International", imgSrc: "https://i.pravatar.cc/150?img=36" },
  { tempId: 3, testimonial: "WBC aligned perfectly with our vision of holistic education. Our students didn't just learn — they led, they sold, they won.", by: "Principal Rajan Nair, The International School Bangalore", imgSrc: "https://i.pravatar.cc/150?img=67" },
  { tempId: 4, testimonial: "The sponsors were real, the money was real, the stakes felt real. That's the magic of WBC — it's not a simulation, it's the real thing.", by: "Ms. Pooja Mehta, Activity Head — Podar International", imgSrc: "https://i.pravatar.cc/150?img=40" },
  { tempId: 5, testimonial: "Our quietest students became the loudest voices on WBC day. The transformation in confidence was remarkable to witness.", by: "Mr. Sandeep Kulkarni, Principal — Orchid International", imgSrc: "https://i.pravatar.cc/150?img=61" },
  { tempId: 6, testimonial: "We had students from Grade 6 to Grade 12 participating together. WBC created a school-wide culture of entrepreneurship in a single day.", by: "Ms. Rina Gupta, Principal — Amity Global School", imgSrc: "https://i.pravatar.cc/150?img=42" },
  { tempId: 7, testimonial: "As educators, we want students to fail safely and learn fast. WBC is the perfect environment for exactly that.", by: "Mr. Vivek Tiwari, Dean — Billabong High International", imgSrc: "https://i.pravatar.cc/150?img=64" },
];

interface TestimonialCardProps {
  position: number;
  testimonial: TestimonialItem;
  handleMove: (steps: number) => void;
  cardSize: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ position, testimonial, handleMove, cardSize }) => {
  const isCenter = position === 0;

  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer border-2 p-8 transition-all duration-500 ease-in-out",
        isCenter
          ? "z-10 bg-zinc-950 text-white border-zinc-950"
          : "z-0 bg-white text-zinc-900 border-zinc-200 hover:border-zinc-400"
      )}
      style={{
        width: cardSize,
        height: cardSize,
        clipPath: `polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)`,
        transform: `
          translate(-50%, -50%)
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        boxShadow: isCenter ? "0px 8px 0px 4px rgba(0,0,0,0.15)" : "0px 0px 0px 0px transparent"
      }}
    >
      <span
        className={cn("absolute block origin-top-right rotate-45", isCenter ? "bg-white/20" : "bg-zinc-200")}
        style={{ right: -2, top: 48, width: SQRT_5000, height: 2 }}
      />
      <img
        src={testimonial.imgSrc}
        alt={testimonial.by.split(',')[0]}
        className="mb-4 h-14 w-12 object-cover object-top"
        style={{ boxShadow: isCenter ? "3px 3px 0px rgba(255,255,255,0.1)" : "3px 3px 0px rgba(0,0,0,0.08)" }}
      />
      <h3 className={cn("text-sm sm:text-base font-medium leading-snug", isCenter ? "text-white" : "text-zinc-800")}>
        &ldquo;{testimonial.testimonial}&rdquo;
      </h3>
      <p className={cn("absolute bottom-8 left-8 right-8 mt-2 text-xs italic", isCenter ? "text-white/70" : "text-zinc-400")}>
        — {testimonial.by}
      </p>
    </div>
  );
};

interface StaggerTestimonialsProps {
  data: TestimonialItem[];
  autoPlayInterval?: number;
}

export const StaggerTestimonials: React.FC<StaggerTestimonialsProps> = ({
  data,
  autoPlayInterval = 3500,
}) => {
  const [cardSize, setCardSize] = useState(365);
  const [list, setList] = useState(data);
  const pausedRef = useRef(false);

  // Re-sync when the underlying data changes (e.g. live content loads after
  // mount, replacing the build-time/fallback list). Keyed on a content
  // signature rather than the array ref, which is rebuilt every render.
  const dataKey = data.map((d) => d.by + d.testimonial).join('|');
  useEffect(() => {
    setList(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataKey]);

  const handleMove = (steps: number) => {
    pausedRef.current = true;
    setTimeout(() => { pausedRef.current = false; }, 6000);
    shift(steps);
  };

  const shift = (steps: number) => {
    setList((prev) => {
      const next = [...prev];
      if (steps > 0) {
        for (let i = steps; i > 0; i--) {
          const item = next.shift();
          if (!item) break;
          next.push({ ...item, tempId: Math.random() });
        }
      } else {
        for (let i = steps; i < 0; i++) {
          const item = next.pop();
          if (!item) break;
          next.unshift({ ...item, tempId: Math.random() });
        }
      }
      return next;
    });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (!pausedRef.current) shift(1);
    }, autoPlayInterval);
    return () => clearInterval(timer);
  }, [autoPlayInterval]);

  useEffect(() => {
    const updateSize = () => {
      setCardSize(window.matchMedia("(min-width: 640px)").matches ? 365 : 290);
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden bg-zinc-50"
      style={{ height: 600 }}
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}
    >
      {list.map((testimonial, index) => {
        const position = list.length % 2
          ? index - (list.length + 1) / 2
          : index - list.length / 2;
        return (
          <TestimonialCard
            key={testimonial.tempId}
            testimonial={testimonial}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
          />
        );
      })}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        <button
          onClick={() => handleMove(-1)}
          className="flex h-12 w-12 items-center justify-center border-2 border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-950 hover:text-white hover:border-zinc-950 transition-all duration-200 focus-visible:outline-none"
          aria-label="Previous"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={() => handleMove(1)}
          className="flex h-12 w-12 items-center justify-center border-2 border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-950 hover:text-white hover:border-zinc-950 transition-all duration-200 focus-visible:outline-none"
          aria-label="Next"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};
