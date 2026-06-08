'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin with GSAP core
gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);

  useEffect(() => {
    // Context keeps animations safely scoped to this component instance
    const ctx = gsap.context(() => {
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",       // Animation kicks off when the section is 80% from the top of the viewport
          end: "top 30%",         // Reaches full execution when the section hits 30% from the top
          scrub: 1,               // Links the animation timeline directly to the scrollbar with a 1s catch-up smooth delay
        }
      });

      // Subtitle line slide-in
      tl.fromTo(titleRef.current, 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, ease: "power2.out" }
      );

      // Main statement cascade reveal
      tl.fromTo(text1Ref.current, 
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, ease: "power2.out" },
        "-=0.3" // Slight execution overlap for natural movement
      );

      // Paragraph body block narrative reveal
      tl.fromTo(text2Ref.current, 
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, ease: "power2.out" },
        "-=0.3"
      );

    }, sectionRef);

    // Clean up all running scroll event triggers when the layout changes
    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="min-h-screen w-full bg-zinc-950 flex flex-col justify-center px-6 md:px-24 py-20 border-t border-zinc-900"
    >
      <div className="max-w-4xl space-y-8">
        
        {/* Section Tag */}
        <h2 
          ref={titleRef} 
          className="text-xs tracking-[0.4em] uppercase text-zinc-500 font-bold"
        >
          // THE FOUNDER & THE VISION
        </h2>
        
        {/* Main Brand Hook */}
        <p 
          ref={text1Ref} 
          className="text-3xl md:text-5xl font-light text-zinc-100 leading-tight tracking-tight"
        >
          Even though he studied <span className="text-white font-medium underline decoration-zinc-700 underline-offset-8">Statistics and Mathematics</span>, his deep-seated passion led to the creation of a premier media space.
        </p>
        
        {/* Supporting Narrative */}
        <p 
          ref={text2Ref} 
          className="text-lg md:text-xl text-zinc-400 font-light max-w-2xl leading-relaxed"
        >
          Caper Studios is a steadily maturing photography, videography and graphic design services provider founded with a definite vision: to provide top-notch creative, artistic, and life-filled visuals that align beautifully with our clients' needs and ideas.
        </p>
        
      </div>
    </section>
  );
}