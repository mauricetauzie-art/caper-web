'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Hero() {
  const titleRef = useRef(null);
  const sublineRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    // Smooth initial boot animations using standard GSAP curves
    const tl = gsap.timeline();

    tl.fromTo(titleRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power4.out' }
    );

    tl.fromTo(sublineRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.8' // Staggers slightly over the main heading animation reveal
    );

    tl.fromTo(ctaRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: 'linear' },
      '-=0.4'
    );
  }, []);

  return (
    <section className="min-h-screen md:min-h-[90vh] flex flex-col justify-between py-12 px-6 md:px-24 relative w-full overflow-hidden">
      
      {/* 1. Cinematic Background Video Layer Loop */}
      <div className="absolute inset-0 z-0 bg-black">
        <video
          src="/portfolio/hero-bg.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-45 mix-blend-screen pointer-events-none"
        />
        {/* Soft dark vignette to ensure the white text always pops perfectly */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-black/60 z-10" />
      </div>

      {/* 2. Top Branding Header */}
      <div className="relative z-40 flex items-center justify-between w-full pt-4">
        <a href="#" className="text-sm tracking-[0.4em] font-black uppercase text-white hover:opacity-80 transition-opacity">
          CAPER STUDIOS.
        </a>
      </div>

      {/* 3. Hero Copy Content Layout */}
      <div className="relative z-20 max-w-4xl my-auto pt-12">
        <p 
          ref={sublineRef}
          className="text-[10px] md:text-xs tracking-[0.4em] text-zinc-400 uppercase font-bold mb-4 ml-1"
        >
          Photography • Videography • Graphic Design
        </p>
        
        <h1 
          ref={titleRef}
          className="text-4xl sm:text-6xl md:text-8xl font-black uppercase tracking-tight text-white leading-[0.9]"
        >
          STORIES TOLD <br />
          <span className="text-zinc-600">WITH PURPOSE.</span>
        </h1>
      </div>

      {/* 4. Combined Scroll Indicator & Left-Aligned Navigation Controls */}
      <div 
        ref={ctaRef}
        className="relative z-20 flex flex-col gap-y-4 w-full pt-8 border-t border-zinc-900/40"
      >
        {/* Ambient Scroll Element */}
        <div className="flex items-center gap-x-3 text-[10px] tracking-[0.3em] text-zinc-500 uppercase font-medium">
          <div className="w-8 h-[1px] bg-zinc-800 animate-pulse" />
          <span>Scroll to Explore</span>
        </div>

        {/* Repositioned Links - Stacked perfectly underneath on the left */}
        <nav className="flex flex-wrap items-center gap-x-8 gap-y-2 pl-11 text-[10px] sm:text-xs tracking-[0.3em] text-zinc-400 uppercase font-medium">
          <a href="#about" className="hover:text-white transition-colors duration-300">About</a>
          <a href="#portfolio" className="hover:text-white transition-colors duration-300">Portfolio</a>
          <a href="#contact" className="hover:text-white transition-colors duration-300">Contact</a>
        </nav>
      </div>

    </section>
  );
}