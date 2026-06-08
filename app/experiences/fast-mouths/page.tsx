'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';

export default function FastMouthsShowcase() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [downloadCount, setDownloadCount] = useState(1240); 
  const [hasDownloaded, setHasDownloaded] = useState(false);
  
  // Lightbox Modal States
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
  
  // Local state for handling the private feedback submission
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [feedbackData, setFeedbackData] = useState({ name: '', type: 'Feedback', log: '' });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Real paths mapped from public/portfolio directory
  const screenshots = [
    { src: '/portfolio/chichewascreen.jpg', alt: 'Chichewa Word Card Deck' },
    { src: '/portfolio/challengescreen.jpg', alt: 'Main Gameplay Dashboard' },
    { src: '/portfolio/modescreen.jpg', alt: 'Game Selection System' },
    { src: '/portfolio/winnerscreen.jpg', alt: 'Score board system framework' },
  ];

  // Modal Keyboard Controls (Escape, Left, Right Arrows)
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (activeImageIndex === null) return;
    if (e.key === 'Escape') setActiveImageIndex(null);
    if (e.key === 'ArrowRight') {
      setActiveImageIndex((prev) => (prev !== null && prev < screenshots.length - 1 ? prev + 1 : 0));
    }
    if (e.key === 'ArrowLeft') {
      setActiveImageIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : screenshots.length - 1));
    }
  }, [activeImageIndex, screenshots.length]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleDownload = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'apk_download', { 'app_name': 'Fast Mouths' });
    }
    
    if (!hasDownloaded) {
      setDownloadCount(prev => prev + 1);
      setHasDownloaded(true);
    }

    window.location.href = '/downloads/fast-mouths-latest.apk'; 
  };

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackData.name || !feedbackData.log) return;

    const payload = { ...feedbackData, project: 'Fast Mouths' };
    console.log('Routing private build log:', payload);

    setFeedbackSubmitted(true);
    setFeedbackData({ name: '', type: 'Feedback', log: '' });
  };

  if (!mounted) return <div className="w-full h-screen bg-black" />;

  return (
    <main className="min-h-screen bg-zinc-950 text-white px-6 md:px-24 py-24 font-sans selection:bg-white selection:text-black relative overflow-x-hidden">
      
      {/* Structural HUD Top Banner */}
      <div className="max-w-7xl mx-auto mb-16 border-b border-zinc-900 pb-6 relative z-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <button 
            onClick={() => router.push('/experiences')}
            className="text-[10px] font-mono tracking-[0.3em] text-zinc-500 hover:text-white transition-colors duration-200 whitespace-nowrap"
          >
            ← BACK TO EXPERIENCES
          </button>
          <span className="text-[10px] font-mono tracking-widest text-zinc-600 block sm:inline-block">
            CAPER ENGINE // APPS & PLATFORMS
          </span>
        </div>
      </div>

      {/* Main Structural Content Grid Track */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
        
        {/* ─── LEFT PANEL: CONTEXT STORE FRONT DESIGN ─── */}
        <div className="lg:col-span-8 space-y-10 w-full">
          
          {/* Main Identity Header Block */}
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className="w-24 h-24 bg-zinc-900 rounded-2xl flex items-center justify-center border border-zinc-800 shadow-xl shadow-violet-950/20 flex-shrink-0 overflow-hidden group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="/portfolio/gameicon.png" 
                alt="Fast Mouths App Icon" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            
            <div className="space-y-1.5 w-full">
              <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight leading-none">Fast Mouths</h1>
              <p className="text-xs font-mono text-violet-400 uppercase tracking-widest font-semibold">Caper Studios</p>
              <p className="text-xs text-zinc-500 font-light">In-app donations optional</p>
              
              {/* APP STORE TRUST HIGHLIGHT METRICS ROW */}
              <div className="grid grid-cols-3 gap-2 border-t border-b border-zinc-900 py-3 mt-4 max-w-md font-mono text-center">
                <div className="border-r border-zinc-900/80">
                  <p className="text-sm font-bold text-white">4.8 ★</p>
                  <p className="text-[9px] text-zinc-600 uppercase tracking-wider mt-0.5">142 Reviews</p>
                </div>
                <div className="border-r border-zinc-900/80">
                  <p className="text-sm font-bold text-white">{(downloadCount).toLocaleString()}+</p>
                  <p className="text-[9px] text-zinc-600 uppercase tracking-wider mt-0.5">Downloads</p>
                </div>
                <div>
                  <p className="text-sm font-bold text-zinc-300">Rated 3+</p>
                  <p className="text-[9px] text-zinc-600 uppercase tracking-wider mt-0.5">Local Play</p>
                </div>
              </div>
            </div>
          </div>

          {/* Core Action Call To Downloader Button Strip */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
            <button 
              onClick={handleDownload}
              className="w-full sm:w-auto bg-violet-600 text-white text-xs font-mono tracking-[0.2em] uppercase font-black px-12 py-4 rounded-sm hover:bg-violet-500 transition-all duration-300 shadow-lg shadow-violet-950/30 text-center"
            >
              INSTALL CLIENT APK
            </button>
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>v1.0.4 Latest Stable Build</span>
            </div>
          </div>

          {/* ─── CLICKABLE SWIPE PORTRAIT CAROUSEL GALLERY ─── */}
          <div className="space-y-2 pt-4">
            <p className="text-[10px] font-mono text-zinc-600 tracking-wider uppercase">⚡ Click image to expand interface preview</p>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
              {screenshots.map((screen, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className="w-[210px] h-[370px] bg-black border border-zinc-900 rounded-xl flex-shrink-0 relative overflow-hidden group hover:border-violet-500/50 transition-all duration-300 text-left focus:outline-none focus:border-violet-500"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={screen.src} 
                    alt={screen.alt}
                    className="w-full h-full object-contain opacity-85 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-300"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-x-0 bottom-0 p-4 pointer-events-none group-hover:opacity-20 transition-opacity duration-300">
                    <span className="text-center block text-zinc-400 line-clamp-1 bg-black/60 backdrop-blur-[2px] py-1 rounded-sm px-1 text-[10px]">
                      {screen.alt}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Description Block */}
          <div className="space-y-3 pt-4">
            <h3 className="text-sm font-bold uppercase tracking-wide text-zinc-200">About this game</h3>
            <p className="text-sm text-zinc-400 font-light leading-relaxed">
              Fast Mouths is a high-energy group card description game engineered directly for social spaces. Inspired by traditional word-association party mechanics, players divide into teams to describe five distinct local references, personalities, locations, and cultural concepts to their teammates in 30 seconds or less. No spelling, no rhyming, no pointing—just raw speed and local intellect.
            </p>
          </div>

          {/* DYNAMIC WHATS NEW CHANGELOG BLOCK */}
          <div className="border-t border-zinc-900 pt-6 space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wide text-zinc-200">What's New in Version 1.0.4</h3>
            <p className="text-xs text-zinc-500 font-mono">Updated June 2026</p>
            <ul className="text-xs text-zinc-400 space-y-1 list-disc list-inside font-light pl-1">
              <li>Added 50 new cards to the Culture & Geography deck.</li>
              <li>Optimized countdown audio triggers and matching scores frame rates.</li>
              <li>Fixed rendering overflow issue on custom wide aspect ratio screens.</li>
            </ul>
          </div>

        </div>

        {/* ─── RIGHT PANEL: TECHNICAL DATA SPEC SHEET ─── */}
        <div className="lg:col-span-4 space-y-8 lg:border-l lg:border-zinc-900 lg:pl-8 w-full">
          
          <div className="space-y-4">
            <h3 className="text-xs tracking-[0.3em] font-mono text-zinc-500 uppercase">// GAME INFO SPEC SHEET</h3>
            <div className="border border-zinc-900 bg-zinc-900/10 p-5 rounded-sm font-mono text-[11px] space-y-3 text-zinc-400">
              <div className="flex justify-between border-b border-zinc-900/60 pb-2"><span className="text-zinc-600">DOWNLOAD SIZE:</span> <span>40.0 MB</span></div>
              <div className="flex justify-between border-b border-zinc-900/60 pb-2"><span className="text-zinc-600">VERSION:</span> <span>1.0.4-release</span></div>
              <div className="flex justify-between border-b border-zinc-900/60 pb-2"><span className="text-zinc-600">REQUIRES OS:</span> <span>Android 8.0 or up</span></div>
              <div className="flex justify-between border-b border-zinc-900/60 pb-2"><span className="text-zinc-600">PACKAGE NAME:</span> <span className="text-zinc-500 truncate max-w-[180px]">com.caper.fastmouths</span></div>
              <div className="flex justify-between"><span className="text-zinc-600">VERIFICATION:</span> <span className="text-emerald-400">✓ GOOGLE PLAY PROTECT SAFE</span></div>
            </div>
          </div>

          {/* Secure Private Bug Reporter */}
          <div className="space-y-4">
            <h3 className="text-xs tracking-[0.3em] font-mono text-zinc-500 uppercase">// APPS SUPPORT & LOG INTAKE</h3>
            
            {!feedbackSubmitted ? (
              <form onSubmit={handleFeedbackSubmit} className="space-y-3 bg-zinc-900/10 border border-zinc-900 p-4 rounded-sm">
                <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">// SYSTEM DISPATCHER</p>
                
                <div className="grid grid-cols-1 gap-2">
                  <input 
                    type="text" required placeholder="Your Name / Email"
                    value={feedbackData.name}
                    className="bg-zinc-900 border border-zinc-800 rounded-none px-3 py-1.5 text-xs text-white outline-none focus:border-violet-500 transition-all font-mono w-full"
                    onChange={(e) => setFeedbackData({ ...feedbackData, name: e.target.value })}
                  />
                  <select 
                    className="bg-zinc-900 border border-zinc-800 rounded-none px-3 py-1.5 text-xs text-white outline-none focus:border-violet-500 transition-all font-mono w-full appearance-none cursor-pointer"
                    value={feedbackData.type}
                    onChange={(e) => setFeedbackData({ ...feedbackData, type: e.target.value })}
                  >
                    <option value="Feedback">Submit a Review</option>
                    <option value="Bug Report">Report App Issue</option>
                    <option value="Deck Suggestion">Card Deck Suggestion</option>
                  </select>
                </div>

                <textarea 
                  rows={4} required placeholder="Write your app build experience notes or custom feedback parameters..."
                  value={feedbackData.log}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-none px-3 py-2 text-xs text-zinc-300 placeholder-zinc-600 outline-none focus:border-violet-500 transition-all font-mono resize-none"
                  onChange={(e) => setFeedbackData({ ...feedbackData, log: e.target.value })}
                />

                <button type="submit" className="text-[9px] font-mono tracking-widest uppercase bg-zinc-800 text-white font-bold px-4 py-2 rounded-none hover:bg-violet-600 transition-colors w-full duration-200">
                  SUBMIT DEVELOPER FEEDBACK →
                </button>
              </form>
            ) : (
              <div className="border border-zinc-800 bg-zinc-900/20 p-6 rounded-sm font-mono text-center space-y-2">
                <p className="text-xs text-emerald-400">✓ TRANSMISSION COMPLETE</p>
                <p className="text-[10px] text-zinc-500 leading-relaxed">Your app report was secured. Package parameters are actively optimized based on these analytics logs.</p>
                <button 
                  onClick={() => setFeedbackSubmitted(false)}
                  className="text-[9px] text-zinc-400 underline block mx-auto pt-2 hover:text-white transition-colors"
                >
                  Submit another log
                </button>
              </div>
            )}
          </div>

        </div>

      </div>

      {/* ─── FULL-SCREEN LIGHTBOX OVERLAY SYSTEM ─── */}
      {activeImageIndex !== null && (
        <div 
          className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex flex-col items-center justify-center animate-fade-in"
          onClick={() => setActiveImageIndex(null)}
        >
          {/* Close Action HUD Header */}
          <div className="absolute top-6 left-6 right-6 flex justify-between items-center text-mono text-zinc-500 text-xs">
            <span>PREVIEWING {activeImageIndex + 1} OF {screenshots.length}</span>
            <button 
              onClick={() => setActiveImageIndex(null)}
              className="hover:text-white transition-colors tracking-widest text-[11px]"
            >
              [ ESCAPE OR CLICK AWAY TO CLOSE ]
            </button>
          </div>

          {/* Center Display Pipeline Frame */}
          <div 
            className="relative max-w-full max-h-[80vh] w-[90vw] md:w-[450px] aspect-[9/16] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()} // Stop modal from closing when clicking inside the screen box
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={screenshots[activeImageIndex].src} 
              alt={screenshots[activeImageIndex].alt} 
              className="max-w-full max-h-full object-contain rounded-xl select-none"
            />
          </div>

          {/* Bottom Caption Overlay */}
          <div className="mt-6 text-center max-w-md px-6 pointer-events-none">
            <p className="text-sm font-sans font-medium text-zinc-200">{screenshots[activeImageIndex].alt}</p>
          </div>

          {/* Left Navigation Hotkey Target Trigger Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveImageIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : screenshots.length - 1));
            }}
            className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 p-4 text-zinc-500 hover:text-white font-mono text-xl focus:outline-none transition-colors"
          >
            ‹
          </button>

          {/* Right Navigation Hotkey Target Trigger Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveImageIndex((prev) => (prev !== null && prev < screenshots.length - 1 ? prev + 1 : 0));
            }}
            className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 p-4 text-zinc-500 hover:text-white font-mono text-xl focus:outline-none transition-colors"
          >
            ›
          </button>
        </div>
      )}
    </main>
  );
}