'use client';

import { cn } from '@/lib/utils';
import { useState, type CSSProperties } from 'react';

type InfiniteSliderProps = {
  children: React.ReactNode;
  gap?: number;
  duration?: number;
  durationOnHover?: number;
  direction?: 'horizontal' | 'vertical';
  reverse?: boolean;
  className?: string;
};

export function InfiniteSlider({
  children,
  gap = 16,
  duration = 25,
  durationOnHover,
  direction = 'horizontal',
  reverse = false,
  className,
}: InfiniteSliderProps) {
  const [dur, setDur] = useState(duration);
  const isHorizontal = direction === 'horizontal';

  // Track holds children twice. Advancing exactly one copy = -50% minus half a
  // gap (the gap that separates the two copies splits evenly) → seamless loop.
  const shift = `calc(-50% - ${gap / 2}px)`;

  const hoverProps = durationOnHover
    ? {
        onMouseEnter: () => setDur(durationOnHover),
        onMouseLeave: () => setDur(duration),
      }
    : {};

  return (
    <div className={cn('overflow-hidden', className)}>
      <div
        className='flex w-max'
        style={
          {
            gap: `${gap}px`,
            flexDirection: isHorizontal ? 'row' : 'column',
            animationName: isHorizontal ? 'infinite-marquee-x' : 'infinite-marquee-y',
            animationDuration: `${dur}s`,
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
            animationDirection: reverse ? 'reverse' : 'normal',
            willChange: 'transform',
            '--marquee-shift': shift,
          } as CSSProperties
        }
        {...hoverProps}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
