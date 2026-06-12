'use client';

import {
  useEffect,
  useRef,
  useState,
  useCallback,
  ReactNode,
} from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface ScrollExpandMediaProps {
  mediaType?: 'video' | 'image';
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc?: string;
  bgComponent?: ReactNode;
  title?: string;
  date?: ReactNode;
  tagline?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  children?: ReactNode;
}

const ScrollExpandMedia = ({
  mediaType = 'video',
  mediaSrc,
  posterSrc,
  bgImageSrc,
  bgComponent,
  title,
  date,
  tagline,
  scrollToExpand,
  textBlend,
  children,
}: ScrollExpandMediaProps) => {
  // ── Render state ──────────────────────────────────────────────────────────
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  // ── Refs used inside event handlers (never cause re-registration) ─────────
  const progressRef = useRef(0);
  const expandedRef = useRef(false);
  const touchStartRef = useRef(0);
  const isMobileRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  // Commit ref → state in next animation frame to avoid mid-event re-renders
  const flush = useCallback(() => {
    if (rafRef.current !== null) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const p = progressRef.current;
      setScrollProgress(p);
      if (p >= 1) setShowContent(true);
      else if (p < 0.75) setShowContent(false);
    });
  }, []);

  const applyProgress = useCallback((newP: number) => {
    progressRef.current = newP;
    if (newP >= 1) expandedRef.current = true;
    flush();
  }, [flush]);

  // ── Reset when mediaType changes ──────────────────────────────────────────
  useEffect(() => {
    progressRef.current = 0;
    expandedRef.current = false;
    setScrollProgress(0);
    setShowContent(false);
  }, [mediaType]);

  // ── Single registration of scroll / wheel / touch listeners ──────────────
  useEffect(() => {
    const onWheel = (e: Event) => {
      const we = e as WheelEvent;
      if (expandedRef.current) {
        if (we.deltaY < 0 && window.scrollY <= 5) {
          expandedRef.current = false;
          progressRef.current = 0.99;
          we.preventDefault();
          flush();
        }
        return;
      }
      we.preventDefault();
      const next = Math.min(Math.max(progressRef.current + we.deltaY * 0.0009, 0), 1);
      applyProgress(next);
    };

    const onScroll = () => {
      if (!expandedRef.current) window.scrollTo(0, 0);
    };

    const onTouchStart = (e: Event) => {
      touchStartRef.current = (e as TouchEvent).touches[0].clientY;
    };

    const onTouchMove = (e: Event) => {
      const te = e as TouchEvent;
      if (!touchStartRef.current) return;
      const touchY = te.touches[0].clientY;
      const deltaY = touchStartRef.current - touchY;

      if (expandedRef.current) {
        if (deltaY < -20 && window.scrollY <= 5) {
          expandedRef.current = false;
          progressRef.current = 0.99;
          te.preventDefault();
          flush();
        }
        touchStartRef.current = touchY;
        return;
      }
      te.preventDefault();
      const factor = deltaY < 0 ? 0.008 : 0.005;
      const next = Math.min(Math.max(progressRef.current + deltaY * factor, 0), 1);
      applyProgress(next);
      touchStartRef.current = touchY;
    };

    const onTouchEnd = () => { touchStartRef.current = 0; };

    const opts = { passive: false };
    window.addEventListener('wheel', onWheel, opts);
    window.addEventListener('scroll', onScroll);
    window.addEventListener('touchstart', onTouchStart, opts);
    window.addEventListener('touchmove', onTouchMove, opts);
    window.addEventListener('touchend', onTouchEnd);

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [applyProgress, flush]); // stable callbacks — registers exactly once

  // ── Mobile / tablet detection ─────────────────────────────────────────────
  useEffect(() => {
    const check = () => {
      const w = window.innerWidth;
      const m = w < 768;
      const t = w >= 768 && w < 1024;
      isMobileRef.current = m;
      setIsMobile(m);
      setIsTablet(t);
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // ── Derived layout values ─────────────────────────────────────────────────
  const mediaWidth    = 300 + scrollProgress * (isMobile ? 550 : isTablet ? 850 : 1250);
  const mediaHeight   = 400 + scrollProgress * (isMobile ? 180 : isTablet ? 280 : 400);
  const textTranslateX = scrollProgress * (isMobile ? 160 : isTablet ? 140 : 150);

  const firstWord   = title ? title.split(' ')[0] : '';
  const restOfTitle = title ? title.split(' ').slice(1).join(' ') : '';

  return (
    <div className='overflow-x-hidden'>
      <section className='relative flex flex-col items-center justify-start min-h-[100dvh]'>
        <div className='relative w-full flex flex-col items-center min-h-[100dvh]'>

          {/* Background */}
          <div
            className='absolute inset-0 z-0 h-full'
            style={{ opacity: 1 - scrollProgress, willChange: 'opacity' }}
          >
            {bgComponent ? (
              <div className='w-full h-full'>{bgComponent}</div>
            ) : bgImageSrc ? (
              <>
                <Image
                  src={bgImageSrc}
                  alt='Background'
                  width={1920}
                  height={1080}
                  className='w-screen h-screen'
                  style={{ objectFit: 'cover', objectPosition: 'center' }}
                  priority
                />
                <div className='absolute inset-0 bg-black/10' />
              </>
            ) : null}
          </div>

          <div className='container mx-auto flex flex-col items-center justify-start relative z-10'>
            <div className='flex flex-col items-center justify-center w-full h-[100dvh] relative'>

              {/* Expanding media box */}
              <div
                className='absolute z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl'
                style={{
                  width: `${mediaWidth}px`,
                  height: `${mediaHeight}px`,
                  maxWidth: '95vw',
                  maxHeight: '85vh',
                  boxShadow: '0px 0px 50px rgba(0,0,0,0.3)',
                  willChange: 'width, height',
                }}
              >
                {mediaType === 'video' ? (
                  mediaSrc.includes('youtube.com') ? (
                    <div className='relative w-full h-full pointer-events-none'>
                      <iframe
                        width='100%'
                        height='100%'
                        src={
                          mediaSrc.includes('embed')
                            ? mediaSrc + (mediaSrc.includes('?') ? '&' : '?') +
                              'autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1'
                            : mediaSrc.replace('watch?v=', 'embed/') +
                              '?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1&playlist=' +
                              mediaSrc.split('v=')[1]
                        }
                        className='w-full h-full rounded-xl border-0'
                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                        allowFullScreen
                      />
                      <div className='absolute inset-0 z-10' style={{ pointerEvents: 'none' }} />
                      <div
                        className='absolute inset-0 bg-black/30 rounded-xl'
                        style={{ opacity: 0.5 - scrollProgress * 0.3, willChange: 'opacity' }}
                      />
                    </div>
                  ) : (
                    <div className='relative w-full h-full pointer-events-none'>
                      <video
                        src={mediaSrc}
                        poster={posterSrc}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload='auto'
                        className='w-full h-full object-cover rounded-xl'
                        controls={false}
                        disablePictureInPicture
                        disableRemotePlayback
                      />
                      <div className='absolute inset-0 z-10' style={{ pointerEvents: 'none' }} />
                      <div
                        className='absolute inset-0 bg-black/30 rounded-xl'
                        style={{ opacity: 0.5 - scrollProgress * 0.3, willChange: 'opacity' }}
                      />
                    </div>
                  )
                ) : (
                  <div className='relative w-full h-full'>
                    <Image
                      src={mediaSrc}
                      alt={title || 'Media content'}
                      width={1280}
                      height={720}
                      className='w-full h-full object-cover rounded-xl'
                    />
                    <div
                      className='absolute inset-0 bg-black/50 rounded-xl'
                      style={{ opacity: 0.7 - scrollProgress * 0.3, willChange: 'opacity' }}
                    />
                  </div>
                )}

                {/* Date / tagline / scroll hint */}
                <div className='flex flex-col items-center text-center relative z-10 mt-4 gap-1'>
                  {date && (
                    <div
                      className='text-lg font-medium text-gray-900'
                      style={{ transform: `translateX(-${textTranslateX}vw)`, willChange: 'transform' }}
                    >
                      {date}
                    </div>
                  )}
                  {tagline && (
                    <p className='text-sm font-semibold tracking-widest text-gray-700 uppercase'>
                      {tagline}
                    </p>
                  )}
                  {scrollToExpand && (
                    <p
                      className='text-gray-900 font-medium text-center mt-1'
                      style={{ transform: `translateX(${textTranslateX}vw)`, willChange: 'transform' }}
                    >
                      {scrollToExpand}
                    </p>
                  )}
                </div>
              </div>

              {/* Title words that slide apart */}
              <div
                className='flex items-center justify-center text-center gap-4 w-full relative z-10 flex-col mix-blend-normal'
              >
                <motion.h2
                  className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold ${
                    textBlend && scrollProgress < 0.01
                      ? 'text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]'
                      : 'text-gray-900'
                  }`}
                  style={{ transform: `translateX(-${textTranslateX}vw)`, willChange: 'transform' }}
                >
                  {firstWord}
                </motion.h2>
                <motion.h2
                  className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center ${
                    textBlend && scrollProgress < 0.01
                      ? 'text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]'
                      : 'text-gray-900'
                  }`}
                  style={{ transform: `translateX(${textTranslateX}vw)`, willChange: 'transform' }}
                >
                  {restOfTitle}
                </motion.h2>
              </div>
            </div>

            {/* Content revealed after full expansion */}
            <motion.section
              className='flex flex-col w-full px-4 py-8 sm:px-8 sm:py-10 md:px-16 lg:py-20'
              animate={{ opacity: showContent ? 1 : 0 }}
              transition={{ duration: 0.7 }}
            >
              {children}
            </motion.section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScrollExpandMedia;
