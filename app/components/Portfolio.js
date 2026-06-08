'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PORTFOLIO_CATEGORIES = [
  // ─── STILL PILLAR (PHOTOGRAPHY) ───────────────────────────────────
  {
    id: 'weddings',
    title: 'Weddings & Functions',
    pillar: 'photography',
    thumbnail: '/portfolio/wedding.jpg',
    isVideo: false,
    gallery: [
      '/portfolio/wedding.jpg',
      '/portfolio/portrait.JPG',
      '/portfolio/wedding-dress.JPG'
    ]
  },
  {
    id: 'corporate-events',
    title: 'Corporate Events',
    pillar: 'photography',
    thumbnail: '/portfolio/IMG_0019.jpg',
    isVideo: false,
    gallery: [
      '/portfolio/IMG_0019.jpg',
      '/portfolio/climbing-tall.JPG'
    ]
  },
  {
    id: 'shoots',
    title: 'Shoots',
    pillar: 'photography',
    thumbnail: '/portfolio/portrait.jpg',
    isVideo: false,
    gallery: [
      '/portfolio/portrait.jpg',
      '/portfolio/IMG_9966.jpg'
    ]
  },
  // ─── MOTION PILLAR (VIDEOGRAPHY) ───────────────────────────────────
  {
    id: 'documentaries',
    title: 'Documentaries',
    pillar: 'videography',
    thumbnail: 'https://www.youtube.com/embed/JItkPugT0ew?si=D9ul7qt63TcNgAHH&autoplay=1&mute=1&loop=1&playlist=JItkPugT0ew&controls=0&modestbranding=1&rel=0',
    isVideo: true,
    gallery: [
      'https://www.youtube.com/embed/JItkPugT0ew?si=D9ul7qt63TcNgAHH&autoplay=1&mute=1&modestbranding=1&rel=0'
    ]
  },
  {
    id: 'highlights',
    title: 'Highlights',
    pillar: 'videography',
    thumbnail: 'https://www.youtube.com/embed/udSpkN4qI-Q?si=j4CbhF3ayxLetr_u&autoplay=1&mute=1&loop=1&playlist=udSpkN4qI-Q&controls=0&modestbranding=1&rel=0',
    isVideo: true,
    gallery: [
      'https://www.youtube.com/embed/udSpkN4qI-Q?si=j4CbhF3ayxLetr_u&autoplay=1&mute=1&modestbranding=1&rel=0'
    ]
  },
  // ─── DESIGN PILLAR (GRAPHIC DESIGN) ────────────────────────────────
  {
    id: 'adverts',
    title: 'Adverts',
    pillar: 'graphic design',
    thumbnail: '/portfolio/landscape.JPG',
    isVideo: false,
    gallery: ['/portfolio/landscape.JPG']
  },
  {
    id: 'printables',
    title: 'Printables',
    pillar: 'graphic design',
    thumbnail: '/portfolio/climbing-wide.JPG',
    isVideo: false,
    gallery: ['/portfolio/climbing-wide.JPG']
  },
  {
    id: 'abstract',
    title: 'Abstract Design',
    pillar: 'graphic design',
    thumbnail: '/portfolio/DJI_0050.jpg',
    isVideo: false,
    gallery: ['/portfolio/DJI_0050.jpg']
  }
];

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [mounted, setMounted] = useState(false);
  const [activeGallery, setActiveGallery] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredCategories = PORTFOLIO_CATEGORIES.filter(
    cat => activeFilter === 'all' || cat.pillar === activeFilter
  );

  useEffect(() => {
    if (!mounted) return;

    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll('.category-card');
      if (!cards || cards.length === 0) return;
      
      gsap.fromTo(cards, 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [activeFilter, mounted]);

  const openCategoryGallery = (category) => {
    setActiveGallery(category.gallery);
    setCurrentIndex(0);
    document.body.style.overflow = 'hidden';
  };

  const closeCategoryGallery = () => {
    setActiveGallery(null);
    document.body.style.overflow = '';
  };

  return (
    <section id="portfolio" ref={sectionRef} className="w-full bg-zinc-950 px-6 md:px-24 py-24 border-t border-zinc-900 relative">
      
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <h2 className="text-xs tracking-[0.4em] uppercase text-zinc-500 font-bold mb-3">// ARCHIVE INDEX</h2>
          <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white">PORTFOLIO</h3>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs tracking-widest uppercase font-medium">
          {['all', 'photography', 'videography', 'graphic design'].map((pillar) => (
            <button
              key={pillar} onClick={() => setActiveFilter(pillar)}
              className={`pb-1 transition-all duration-300 ${
                activeFilter === pillar ? 'text-white border-b border-white font-bold' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {pillar === 'graphic design' ? 'Design' : pillar === 'videography' ? 'Motion' : pillar === 'photography' ? 'Still' : 'All'}
            </button>
          ))}
        </div>
      </div>

      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-auto">
        {mounted && filteredCategories.map((cat) => (
          <div 
            key={cat.id} 
            onClick={() => openCategoryGallery(cat)}
            className="category-card group relative aspect-square overflow-hidden cursor-pointer border border-zinc-900/60 bg-zinc-900/40 backdrop-blur-sm"
          >
            {cat.isVideo ? (
              <div className="absolute inset-0 w-full h-full pointer-events-none scale-105 transition-transform duration-700 ease-out group-hover:scale-100">
                <iframe 
                  src={cat.thumbnail}
                  className="w-full h-full object-cover pointer-events-none border-0 scale-[1.35]"
                  allow="autoplay; encrypted-media"
                  title={cat.title}
                />
              </div>
            ) : (
              <Image 
                src={cat.thumbnail} alt={cat.title} fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            )}

            <div className="absolute inset-0 z-10 bg-gradient-to-t from-zinc-950/95 via-zinc-950/20 to-transparent transition-opacity duration-300 opacity-90 group-hover:opacity-100" />
            
            <div className="absolute top-4 right-4 text-[9px] tracking-widest uppercase text-zinc-400 z-20 bg-zinc-950/80 px-2 py-1 backdrop-blur-md border border-zinc-900/80">
              {cat.gallery ? `${cat.gallery.length} Elements` : 'Collection'}
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-8 z-20 transform translate-y-1 transition-transform duration-500 ease-out group-hover:translate-y-0">
              <p className="text-[9px] tracking-[0.3em] uppercase text-zinc-500 font-bold mb-1.5">{cat.pillar}</p>
              <h4 className="text-md font-bold uppercase tracking-widest text-white group-hover:text-zinc-200 transition-colors">
                {cat.title}
              </h4>
              <p className="text-[10px] font-mono tracking-widest text-zinc-500 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75">
                VIEW COLLECTION →
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* LIGHTBOX OVERLAY */}
      {activeGallery && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-md select-none animate-fadeIn"
          onClick={closeCategoryGallery}
        >
          <button 
            className="absolute top-6 right-6 md:top-8 md:right-12 text-zinc-500 hover:text-white text-xs uppercase tracking-[0.3em] font-mono transition-colors z-50 py-2"
            onClick={closeCategoryGallery}
          >
            [ Exit Category × ]
          </button>

          <div className="relative w-full max-w-5xl h-[65vh] md:h-[75vh] flex items-center justify-center">
            {activeGallery[currentIndex].includes('youtube.com/embed') ? (
              <iframe 
                src={activeGallery[currentIndex]} 
                className="w-full h-full object-contain border-0 aspect-video"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                title="Category Deck Video Stream"
              />
            ) : (
              <div className="relative w-full h-full">
                <Image 
                  src={activeGallery[currentIndex]} 
                  alt="Collection Presentation Frame"
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </div>
            )}
          </div>

          {activeGallery.length > 1 && (
            <>
              <button 
                onClick={(e) => { e.stopPropagation(); setCurrentIndex((prev) => (prev - 1 + activeGallery.length) % activeGallery.length); }}
                className="absolute left-4 md:left-8 w-12 h-12 bg-zinc-900/50 hover:bg-white hover:text-black border border-zinc-800 text-white flex items-center justify-center text-sm font-mono transition-all duration-300"
              >
                ←
              </button>

              <button 
                onClick={(e) => { e.stopPropagation(); setCurrentIndex((prev) => (prev + 1) % activeGallery.length); }}
                className="absolute right-4 md:right-8 w-12 h-12 bg-zinc-900/50 hover:bg-white hover:text-black border border-zinc-800 text-white flex items-center justify-center text-sm font-mono transition-all duration-300"
              >
                →
              </button>

              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-[10px] font-mono tracking-[0.2em] text-zinc-500 uppercase">
                Item {currentIndex + 1} of {activeGallery.length}
              </div>
            </>
          )}
        </div>
      )}

    </section>
  );
}