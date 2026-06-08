'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import ContactForm from '../components/ContactForm';
import AnalyticsHero from '../components/AnalyticsHero';

export default function AnalyticsPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !mainRef.current) return;

    const ctx = gsap.context(() => {
      // Clean staggered entrance for analytical framework elements
      if (document.querySelectorAll(".animate-card").length > 0) {
        gsap.from(".animate-card", {
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

  const analyticalPillars = [
    {
      index: "01",
      title: "Field Operations & Data Collection",
      desc: "Architecting logical frameworks for large-scale enumerator coordination, operational workflow scheduling, and structural field protocol implementation to ensure pristine data pipelines."
    },
    {
      index: "02",
      title: "Statistical Modeling & Survey Architecture",
      desc: "Deploying high-fidelity statistical designs, random sampling methodologies, and clean dataset validation parameters built on quantitative modeling frameworks."
    },
    {
      index: "03",
      title: "Geospatial Mapping & Infrastructure Tracking",
      desc: "Integrating location-based tracking markers and geographical visualization data layers to monitor logistical deployment over vast spatial operational areas."
    }
  ];

  const highLevelMetrics = [
    { label: "REACH", value: "5,000+ Recipients", subtitle: "In Machinga, Chikwawa, Lilongwe, Salima, Kasungu, Mangochi, Phalombe... etc" },
    { label: "CORE SQUAD METRICS", value: "2-25 Personnel", subtitle: "Managed over across several projects respectively" },
    { label: "STATISTICAL VARIANCE", value: "σ² → 0", subtitle: "Rigorous Error Minimization" },
  ];

  if (!mounted) return <div className="w-full h-screen bg-black" />;

  return (
    <main ref={mainRef} className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-white selection:text-black relative overflow-x-hidden">
      
      {/* ─── GLOBAL HUD NAVIGATION OVERLAY (OVERLAP PREVENTED) ─────────── */}
      <div className="absolute top-0 left-0 w-full z-50 px-6 md:px-24 pt-8 pointer-events-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-900/40 pb-6">
          <button 
            onClick={() => router.push('/')}
            className="text-[10px] font-mono tracking-[0.3em] text-zinc-400 hover:text-white transition-colors duration-200 whitespace-nowrap"
          >
            ← BACK TO PORTAL
          </button>
          <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase block sm:inline-block">
            CAPER MALAWI // ANALYTICS
          </span>
        </div>
      </div>

      {/* ─── FULL-SCREEN IMMERSIVE MEDIA HERO COMPONENT ──────────────── */}
      <AnalyticsHero />

      {/* ─── INNER SCROLL CONTAINER GRID AREA (MAIN CONTENT) ─────────── */}
      <div className="relative z-10 px-6 md:px-24 py-24 space-y-28">

        {/* TECHNICAL ANALYTICAL BACKGROUND CANVAS */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20 select-none">
          {/* Subtle Horizontal Matrix Blueprint Grid Lines */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />
          
          {/* Soft Ambient Field Emerald Glow */}
          <div className="absolute top-1/4 left-[-10%] w-[500px] h-[500px] rounded-full bg-emerald-500/5 blur-[140px]" />
        </div>

        {/* Hero Header Area */}
        <div className="max-w-3xl animate-card pt-12">
          <h2 className="text-xs tracking-[0.4em] uppercase text-zinc-500 font-bold mb-3">// ARCHITECTURE & METRICS</h2>
          <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white mb-6">
            QUANTITATIVE SYSTEMS
          </h3>
          <p className="text-sm md:text-md text-zinc-400 font-light leading-relaxed">
            Data requires execution to find meaning. Caper Analytics builds high-integrity logistical pipelines and statistical models—combining hands-on field operation strategy with rigorous dataset processing frameworks to decode complex regional systems.
          </p>
        </div>

        {/* Operational High-Fidelity Metric Counters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-card relative z-10">
          {highLevelMetrics.map((metric) => (
            <div 
              key={metric.label}
              className="border-l border-zinc-800 hover:border-emerald-500/60 pl-6 py-4 transition-colors duration-500"
            >
              <p className="text-[9px] font-mono tracking-[0.25em] text-zinc-500 uppercase mb-2">
                // {metric.label}
              </p>
              <p className="text-3xl font-black tracking-tight text-white mb-1">
                {metric.value}
              </p>
              <p className="text-xs text-zinc-500 font-light">
                {metric.subtitle}
              </p>
            </div>
          ))}
        </div>

        <hr className="border-zinc-900" />

        {/* Structural Pillars of Competency */}
        <div className="space-y-12 max-w-4xl animate-card">
          <div>
            <h4 className="text-xs tracking-[0.3em] text-zinc-500 font-bold uppercase mb-8">// ANALYTICAL FRAMEWORKS</h4>
          </div>
          
          {analyticalPillars.map((pillar) => (
            <div 
              key={pillar.index} 
              className="group grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 pt-8 border-t border-zinc-900/60 first:border-t-0"
            >
              <div className="md:col-span-1 text-[11px] font-mono tracking-widest text-zinc-600 group-hover:text-emerald-400 transition-colors duration-300">
                [{pillar.index}]
              </div>
              <div className="md:col-span-4 text-md font-bold uppercase tracking-wider text-zinc-200 group-hover:text-white transition-colors duration-300">
                {pillar.title}
              </div>
              <div className="md:col-span-7 text-xs md:text-sm text-zinc-400 group-hover:text-zinc-300 font-light leading-relaxed transition-colors duration-300">
                {pillar.desc}
              </div>
            </div>
          ))}
        </div>

        <hr className="border-zinc-900" />

        {/* Context-Aware Contact Intake Layout */}
        <div className="animate-card max-w-xl pb-12">
          <h3 className="text-xs tracking-[0.3em] text-zinc-500 font-bold uppercase mb-2">// COMMISSION RESEARCH SYSTEM</h3>
          <h4 className="text-xl font-black uppercase tracking-wider mb-8 text-white">Initiate Project Architecture</h4>
          <ContactForm currentPillar="analytics" />
        </div>

      </div>
    </main>
  );
}