'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import ContactForm from '../components/ContactForm';
import ExperiencesHero from '../components/ExperiencesHero'; 

export default function ExperiencesPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !mainRef.current) return;

    const ctx = gsap.context(() => {
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

  const experiencePillars = [
    {
      index: "01",
      title: "Corporate Team-Building & Hosting",
      desc: "Designing and facilitating high-energy, high-impact interactive exercises, custom competitive formats, and icebreakers tailored for corporate team bonding and engagement."
    },
    {
      index: "02",
      title: "Gaming Activations & Competitions",
      desc: "Organizing structural gaming environments and tournament logistics. Experience executing multi-player formats, managing engagement tech, and hosting live gaming events."
    },
    {
      index: "03",
      title: "Interactive Application Design",
      desc: "Building custom digital experiences and standalone applications. Merging technical engineering frameworks with game design mechanics to drive active user engagement."
    }
  ];

  const coreActivities = [
    { 
      name: "Fast Mouths", 
      category: "App Builds", 
      status: "READY", 
      slug: "fast-mouths" 
    },
    { name: "Corporate Hosting", category: "Event Strategy", status: "ACTIVE" },
    { name: "Gaming Tournaments", category: "Activations", status: "READY" },
    { name: "Team Facilitation", category: "Group Logistics", status: "ACTIVE" },
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
            CAPER MALAWI // EXPERIENCES
          </span>
        </div>
      </div>

      {/* ─── FULL-SCREEN IMMERSIVE MEDIA HERO COMPONENT ──────────────── */}
      <ExperiencesHero />

      {/* ─── INNER SCROLL CONTAINER GRID AREA (MAIN BLOCK CODES) ─────── */}
      <div className="relative z-10 px-6 md:px-24 py-24 space-y-28 w-full">
        
        {/* TACTICAL INTERACTIVE CANVAS ACCENT FRAMES */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-30 select-none">
          <div className="absolute top-12 left-12 w-4 h-4 border-t-2 border-l-2 border-zinc-800" />
          <div className="absolute top-12 right-12 w-4 h-4 border-t-2 border-r-2 border-zinc-800" />
          <div className="absolute bottom-12 left-12 w-4 h-4 border-b-2 border-l-2 border-zinc-800" />
          <div className="absolute bottom-12 right-12 w-4 h-4 border-b-2 border-r-2 border-zinc-800" />
          <div className="absolute top-1/3 right-[-10%] w-[500px] h-[500px] rounded-full bg-violet-500/5 blur-[120px]" />
        </div>

        {/* Hero Copy Alignment Details Segment */}
        <div className="max-w-3xl animate-card pt-12 mx-auto md:ml-0">
          <h2 className="text-xs tracking-[0.4em] uppercase text-zinc-500 font-bold mb-3">// KINETIC CORE</h2>
          <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white mb-6">
            ENGAGEMENT & ACTIVATION
          </h3>
          <p className="text-sm md:text-md text-zinc-400 font-light leading-relaxed">
            Human connection thrives on shared energy and calculated design. Caper Experiences engineers interactive environments—blending live event facilitation, game design mechanics, and custom technical software to bring group dynamics to life.
          </p>
        </div>

        {/* High-End Matrix Activity Tracker Grid */}
        <div className="animate-card max-w-7xl mx-auto w-full">
          <div className="mb-10">
            <h4 className="text-xs tracking-[0.3em] text-zinc-500 font-bold uppercase">// SYSTEM PROJECT TRACKER</h4>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
            {coreActivities.map((activity) => {
              const CardContent = (
                <>
                  <div className="flex justify-between items-start w-full mb-4">
                    <span className="text-[8px] font-mono tracking-widest text-zinc-600 group-hover:text-zinc-400 transition-colors">
                      {activity.category}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[8px] font-mono text-zinc-500">{activity.status}</span>
                      <span className={`w-1.5 h-1.5 rounded-full ${activity.status === 'DEV' ? 'bg-amber-400 animate-pulse' : 'bg-violet-400'}`} />
                    </div>
                  </div>
                  
                  <div className="relative z-10 mt-auto">
                    <p className="text-xs md:text-sm font-bold uppercase tracking-wider text-white group-hover:text-violet-400 transition-colors duration-300">
                      {activity.name}
                    </p>
                    {activity.slug && (
                      <span className="text-[8px] font-mono text-zinc-600 block mt-1 group-hover:text-violet-400/70 transition-colors">
                        VIEW LIVE DOWNLOAD →
                      </span>
                    )}
                  </div>
                  
                  <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-transparent group-hover:border-violet-400 transition-colors duration-300" />
                  <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-transparent group-hover:border-violet-400 transition-colors duration-300" />
                </>
              );

              return activity.slug ? (
                <button
                  key={activity.name}
                  onClick={() => router.push(`/experiences/${activity.slug}`)}
                  className="border border-zinc-800 bg-zinc-900/10 p-5 relative group hover:border-violet-500/50 hover:bg-zinc-900/40 transition-all duration-300 rounded-sm flex flex-col justify-between min-h-[130px] text-left w-full cursor-pointer"
                >
                  {CardContent}
                </button>
              ) : (
                <div 
                  key={activity.name}
                  className="border border-zinc-800 bg-zinc-900/5 p-5 relative group hover:border-zinc-800/40 transition-all duration-300 rounded-sm flex flex-col justify-between min-h-[130px] w-full select-none"
                >
                  {CardContent}
                </div>
              );
            })}
          </div>
        </div>

        <hr className="border-zinc-900 max-w-7xl mx-auto" />

        {/* Structural Pillars of Competency */}
        <div className="space-y-12 max-w-7xl mx-auto w-full animate-card">
          <div>
            <h4 className="text-xs tracking-[0.3em] text-zinc-500 font-bold uppercase mb-8">// INTERACTIVE CORE COMPETENCIES</h4>
          </div>
          
          <div className="max-w-4xl space-y-12">
            {experiencePillars.map((pillar) => (
              <div 
                key={pillar.index} 
                className="group grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 pt-8 border-t border-zinc-900/60 first:border-t-0"
              >
                <div className="md:col-span-1 text-[11px] font-mono tracking-widest text-zinc-600 group-hover:text-violet-400 transition-colors duration-300">
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
        </div>

        <hr className="border-zinc-900 max-w-7xl mx-auto" />

        {/* Dynamic Context-Aware Contact Section */}
        <div className="animate-card max-w-7xl mx-auto w-full pb-12">
          <div className="max-w-xl">
            <h3 className="text-xs tracking-[0.3em] text-zinc-500 font-bold uppercase mb-2">// INITIATE ENGAGEMENT</h3>
            <h4 className="text-xl font-black uppercase tracking-wider mb-8 text-white">Let's Build an Experience</h4>
            <ContactForm currentPillar="experiences" />
          </div>
        </div>

      </div>
    </main>
  );
}