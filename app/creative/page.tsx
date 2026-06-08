'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

import Hero from '../components/Hero';
import About from '../components/About'; 
import Portfolio from '../components/Portfolio'; 
import Contact from '../components/Contact';

export default function CreativePage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !mainRef.current) return;

    const ctx = gsap.context(() => {
      if (document.querySelectorAll(".animate-studio").length > 0) {
        gsap.from(".animate-studio", {
          opacity: 0,
          y: 20,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out"
        });
      }
    }, mainRef);

    return () => ctx.revert();
  }, [mounted]);

  if (!mounted) return <div className="w-full h-screen bg-zinc-950" />;

  return (
    <main ref={mainRef} className="bg-zinc-950 min-h-screen text-white selection:bg-white selection:text-black relative overflow-x-hidden">

      {/* ─── 1. FULL-SCREEN MEDIA HERO (CONTAINS MAIN BRAND LOGO) ───── */}
      <Hero />
      
      {/* ─── 2. CONTENT TRACK CONTAINER WRAPPER ─────────────────────── */}
      <div className="relative z-10 pb-24 w-full">
        
        {/* SUB HUD LINE INTERFACE: Safely anchored below the hero to avoid overlaps */}
        <div className="px-6 md:px-24 pt-12 mx-auto max-w-7xl w-full">
          <div className="border-b border-zinc-900/60 pb-6">
            <button 
              onClick={() => router.push('/')}
              className="text-[10px] font-mono tracking-[0.3em] text-zinc-400 hover:text-white transition-colors duration-200"
            >
              ← BACK TO PORTAL
            </button>
          </div>
        </div>

        {/* Brand Ethos & Background Narrative Section */}
        <div className="px-6 md:px-24 pt-16 mx-auto max-w-7xl">
          <About />
        </div>
        
        <hr className="border-zinc-900/60 max-w-7xl mx-auto px-6 md:px-24" />
        
        {/* Deep-Dive Portfolio Project Galleries Display Grid */}
        <div className="px-6 md:px-24 mx-auto max-w-7xl">
          <Portfolio />
        </div>
        
        <hr className="border-zinc-900/60 max-w-7xl mx-auto px-6 md:px-24" />
        
        {/* Expanded Intake Form Section Layout Container */}
        <div className="px-6 md:px-24 mx-auto max-w-7xl w-full">
          <Contact />
        </div>

      </div>

    </main>
  );
}