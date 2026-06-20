'use client';

import {
  useEffect,
  useRef,
  useState,
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

// How many px of native scrolling fully expands the hero.
const EXPAND_DISTANCE = 900;

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
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  const wrapRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  // ── Drive progress from native scroll position (no scroll hijack) ──────────
  useEffect(() => {
    const update = () => {
      rafRef.current = null;
      const el = wrapRef.current;
      if (!el) return;
      // How far the top of the hero wrapper has scrolled past the viewport top.
      const scrolled = Math.min(Math.max(-el.getBoundingClientRect().top, 0), EXPAND_DISTANCE);
      setScrollProgress(scrolled / EXPAND_DISTANCE);
    };

    const onScroll = () => {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // ── Mobile / tablet detection ─────────────────────────────────────────────
  useEffect(() => {
    const check = () => {
      const w = window.innerWidth;
      setIsMobile(w < 768);
      setIsTablet(w >= 768 && w < 1024);
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // ── Derived layout values ─────────────────────────────────────────────────
  const animating = scrollProgress > 0 && scrollProgress < 1;
  const showContent = scrollProgress >= 1;
  const mediaWidth    = 300 + scrollProgress * (isMobile ? 550 : isTablet ? 850 : 1250);
  const mediaHeight   = 400 + scrollProgress * (isMobile ? 180 : isTablet ? 280 : 400);
  const textTranslateX = scrollProgress * (isMobile ? 160 : isTablet ? 140 : 150);

  const firstWord   = title ? title.split(' ')[0] : '';
  const restOfTitle = title ? title.split(' ').slice(1).join(' ') : '';

  return (
    <div className='overflow-x-clip'>
      {/* Tall spacer wrapper — its scroll length drives the expansion.        */}
      {/* Sticky inner pins the hero while you scroll through EXPAND_DISTANCE.  */}
      <div ref={wrapRef} style={{ height: `calc(100dvh + ${EXPAND_DISTANCE}px)` }} className='relative'>
        <section className='sticky top-0 h-[100dvh] w-full overflow-hidden flex flex-col items-center justify-center'>

          {/* Background */}
          <div
            className='absolute inset-0 z-0 h-full'
            style={{ opacity: 1 - scrollProgress, willChange: animating ? 'opacity' : 'auto' }}
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

          <div className='container mx-auto flex flex-col items-center justify-center relative z-10 h-full'>
            <div className='flex flex-col items-center justify-center w-full h-full relative'>

              {/* Expanding media box */}
              <div
                className='absolute z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl'
                style={{
                  width: `${mediaWidth}px`,
                  height: `${mediaHeight}px`,
                  maxWidth: '95vw',
                  maxHeight: '85vh',
                  boxShadow: '0px 0px 50px rgba(0,0,0,0.3)',
                  willChange: animating ? 'width, height' : 'auto',
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
                        style={{ opacity: 0.5 - scrollProgress * 0.3, willChange: animating ? 'opacity' : 'auto' }}
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
                        style={{ opacity: 0.5 - scrollProgress * 0.3, willChange: animating ? 'opacity' : 'auto' }}
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
                      style={{ opacity: 0.7 - scrollProgress * 0.3, willChange: animating ? 'opacity' : 'auto' }}
                    />
                  </div>
                )}

                {/* Date / tagline / scroll hint */}
                <div className='flex flex-col items-center text-center relative z-10 mt-4 gap-1'>
                  {date && (
                    <div
                      className='text-lg font-medium text-gray-900'
                      style={{ transform: `translateX(-${textTranslateX}vw)`, willChange: animating ? 'transform' : 'auto' }}
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
                      style={{ transform: `translateX(${textTranslateX}vw)`, opacity: 1 - scrollProgress, willChange: animating ? 'transform' : 'auto' }}
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
                  style={{ transform: `translateX(-${textTranslateX}vw)`, willChange: animating ? 'transform' : 'auto' }}
                >
                  {firstWord}
                </motion.h2>
                <motion.h2
                  className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center ${
                    textBlend && scrollProgress < 0.01
                      ? 'text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]'
                      : 'text-gray-900'
                  }`}
                  style={{ transform: `translateX(${textTranslateX}vw)`, willChange: animating ? 'transform' : 'auto' }}
                >
                  {restOfTitle}
                </motion.h2>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Content revealed after full expansion */}
      {children && (
        <motion.section
          className='flex flex-col w-full px-4 py-8 sm:px-8 sm:py-10 md:px-16 lg:py-20'
          animate={{ opacity: showContent ? 1 : 0 }}
          transition={{ duration: 0.7 }}
        >
          {children}
        </motion.section>
      )}
    </div>
  );
};

export default ScrollExpandMedia;
