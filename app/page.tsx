'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function BrandGateway() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const pillars = [
    {
      id: 'creative',
      title: 'CAPER STUDIOS',
      number: '[01]',
      desc: 'Still, Motion, & Brand Identity Systems.',
      path: '/creative', //
      bgType: 'video',
      bgSrc: '/portfolio/hero-bg.mp4',
    },
    {
      id: 'analytics',
      title: 'CAPER ANALYTICS',
      number: '[02]',
      desc: 'Research, Metrics, & Project Architecture.',
      path: '/analytics',
      bgType: 'image', 
      bgSrc: '/portfolio/analytics-bg.jpg',
    },
    {
      id: 'experiences',
      title: 'CAPER EXPERIENCES',
      number: '[03]',
      desc: 'Game Design, Tech Builds, & Team Facilitation.',
      path: '/experiences',
      bgType: 'image',
      bgSrc: '/portfolio/caperexp-bg.png',
    }
  ];

  if (!mounted) return <div className="w-full h-screen bg-black" />;

  return (
    <main className="w-full h-screen bg-black overflow-hidden relative flex flex-col md:flex-row select-none font-sans">
      
      {/* Global Minimal HUD Header */}
      <div className="absolute top-6 left-6 md:left-12 z-30 pointer-events-none">
        <h1 className="text-xs tracking-[0.4em] font-black uppercase text-white">CAPER MALAWI.</h1>
      </div>
      <div className="absolute top-6 right-6 md:right-12 z-30 pointer-events-none hidden md:block">
        <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">[ GLOBAL PORTAL ]</span>
      </div>

      {/* Dynamic Flex Panel Grid System */}
      {pillars.map((pillar) => (
        <Link
          key={pillar.id}
          href={pillar.path}
          className="flex-1 relative group overflow-hidden flex flex-col justify-between p-8 md:p-12 pt-20 cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] md:hover:flex-[1.4] border-b md:border-b-0 border-zinc-900 last:border-b-0 text-left decoration-transparent"
        >
          
          {/* Background Media Engine Layer */}
          <div className="absolute inset-0 w-full h-full z-0 pointer-events-none bg-zinc-950">
            {pillar.bgType === 'video' && (
              <video
                src={pillar.bgSrc} 
                autoPlay 
                loop 
                muted 
                playsInline
                className="w-full h-full object-cover transition-transform duration-1000 scale-105 group-hover:scale-100 opacity-20 group-hover:opacity-40"
              />
            )}
            
            {pillar.bgType === 'image' && (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={pillar.bgSrc}
                alt={pillar.title}
                className="w-full h-full object-cover transition-transform duration-1000 scale-105 group-hover:scale-100 opacity-20 group-hover:opacity-45 filter grayscale contrast-125"
              />
            )}
          </div>

          {/* Vignette Shading Filter Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/95 z-10 transition-opacity duration-500 group-hover:opacity-40" />

          {/* Index Counter */}
          <div className="relative z-20 text-[11px] font-mono tracking-widest text-zinc-600 group-hover:text-zinc-400 transition-colors duration-300">
            {pillar.number}
          </div>

          {/* Main Copy Metadata Block */}
          <div className="relative z-20 space-y-3 my-auto">
            <h2 className="text-xl md:text-2xl font-black tracking-[0.2em] uppercase text-white group-hover:text-zinc-200 transition-colors duration-300">
              {pillar.title}
            </h2>
            <p className="text-xs md:text-sm text-zinc-500 group-hover:text-zinc-400 font-light max-w-xs transition-colors duration-300 leading-relaxed">
              {pillar.desc}
            </p>
          </div>

          {/* Interactive Entry Action Prompt */}
          <div className="relative z-20 text-[10px] font-mono tracking-[0.3em] text-zinc-500 opacity-0 transform translate-y-2 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-y-0 group-hover:text-white uppercase py-2">
            ( Click to Enter )
          </div>
        </Link>
      ))}
    </main>
  );
}