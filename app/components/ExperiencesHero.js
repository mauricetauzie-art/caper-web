'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function ExperiencesHero() {
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
    <section className="relative w-full h-screen bg-zinc-950 flex flex-col justify-end p-8 md:p-16 lg:p-24 overflow-hidden select-none">
      
      {/* ─── 1. CINEMATIC BACKGROUND IMAGE LAYER ────────────────── */}
      <div className="absolute inset-0 z-0 bg-black">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/portfolio/caperexp-bg.png"
          alt="Caper Experiences Background"
          className="absolute inset-0 w-full h-full object-cover opacity-35 filter grayscale contrast-125"
        />
        {/* Deep vignette shade overlay matching your brand look */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-black/50" />
      </div>

      {/* ─── 2. HERO TYPOGRAPHY BLOCK (BOTTOM ANCHORED) ─────────── */}
      <div className="relative z-10 space-y-3 max-w-5xl pb-12">
        <p 
          ref={sublineRef} 
          className="text-[10px] md:text-xs font-mono tracking-[0.35em] text-zinc-400 uppercase font-bold"
        >
          // GAME DESIGN • TECH BUILDS • TEAM FACILITATION
        </p>
        
        <div ref={titleRef} className="space-y-1">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-white leading-none">
            ENGAGEMENT DESIGNED
          </h1>
          <h3 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter text-zinc-600/80 leading-none">
            REALITIES ACTIVATED.
          </h3>
        </div>

        <div 
          ref={ctaRef}
          className="pt-4 text-[10px] font-mono tracking-[0.3em] text-zinc-500 uppercase"
        >
          SCROLL TO EXPLORE ↓
        </div>
      </div>

    </section>
  );
}