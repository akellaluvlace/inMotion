'use client';

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { Observer } from "gsap/dist/Observer";
// We'll use basic text animation since SplitText is a paid plugin
// If the user has it, they can uncomment. For now, we simulate.
// import SplitText from "gsap/SplitText"; 

if (typeof window !== "undefined") {
    gsap.registerPlugin(Observer);
}

const sectionsData = [
  {
    id: "first",
    title: "Digital Architecture",
    image: "/assets/Samuel Beckett Bridge.png",
    position: "center bottom",
  },
  {
    id: "second",
    title: "Structured Precision",
    image: "/assets/Giant's Causeway.png",
    position: "center center",
  },
  {
    id: "third",
    title: "Immersive Experience",
    image: "/assets/Whiskey Glass.png",
    position: "center center",
  },
  {
    id: "fourth",
    title: "Global Vision",
    image: "/assets/Boardroom Window.png",
    position: "center center",
  },
  {
    id: "fifth",
    title: "Limitless Potential",
    image: "/assets/Cliffs of Moher.png",
    position: "20% center",
  },
];

interface GSAPDemoProps {
    previewMode?: boolean;
}

export default function GSAPDemo({ previewMode = false }: GSAPDemoProps) {
  const comp = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // Only run if we have a valid ref
    if (!comp.current) return;

    const ctx = gsap.context(() => {
      // --- Setup Variables ---
      // Scope selectors to the component ref
      const sections = gsap.utils.toArray<HTMLElement>(".gsap-section"),
        images = gsap.utils.toArray<HTMLElement>(".bg-image"),
        headings = gsap.utils.toArray<HTMLElement>(".gsap-heading"),
        outerWrappers = gsap.utils.toArray<HTMLElement>(".outer-wrapper"),
        innerWrappers = gsap.utils.toArray<HTMLElement>(".inner-wrapper");

      let currentIndex = -1,
        animating = false;
        
      const wrap = gsap.utils.wrap(0, sections.length);

      // --- Initial States ---
      gsap.set(outerWrappers, { yPercent: 100 });
      gsap.set(innerWrappers, { yPercent: -100 });

      // --- Main Animation Function ---
      function gotoSection(index: number, direction: number) {
        index = wrap(index);
        animating = true;
        
        const fromTop = direction === -1,
          dFactor = fromTop ? -1 : 1,
          tl = gsap.timeline({
            defaults: { duration: 1.25, ease: "power1.inOut" },
            onComplete: () => { animating = false; },
          });

        if (currentIndex >= 0) {
          gsap.set(sections[currentIndex], { zIndex: 0 });
          tl.to(images[currentIndex], { yPercent: -15 * dFactor }).set(
            sections[currentIndex],
            { autoAlpha: 0 }
          );
        }

        gsap.set(sections[index], { autoAlpha: 1, zIndex: 1 });
        
        tl.fromTo(
          [outerWrappers[index], innerWrappers[index]],
          {
            yPercent: (i) => (i ? -100 * dFactor : 100 * dFactor),
          },
          {
            yPercent: 0,
          },
          0
        )
          .fromTo(images[index], { yPercent: 15 * dFactor }, { yPercent: 0 }, 0)
          
        
        // --- High-End Masked Random Character Reveal ---
        const chars = headings[index].querySelectorAll(".char-inner");
        tl.fromTo(
            chars,
            {
              autoAlpha: 0,
              yPercent: 150 * dFactor,
            },
            {
              autoAlpha: 1,
              yPercent: 0,
              duration: 1,
              ease: "power2.out",
              stagger: {
                each: 0.02,
                from: "random",
              },
            },
            0.2
        );

        currentIndex = index;
      }

      // --- Observer Setup ---
      // We attach the observer to the containerRef to prevent global scroll hijacking when in a modal/preview
      Observer.create({
        target: containerRef.current, // Target specific element
        type: "wheel,touch,pointer",
        wheelSpeed: -1,
        onDown: () => !animating && gotoSection(currentIndex - 1, -1),
        onUp: () => !animating && gotoSection(currentIndex + 1, 1),
        tolerance: 10,
        preventDefault: true,
      });

      // --- Start ---
      gotoSection(0, 1);
    }, comp);

    return () => ctx.revert(); // Cleanup on unmount
  }, []);

  return (
    <div 
        ref={comp} 
        className="relative bg-black text-white font-sans overflow-hidden"
        style={{ height: previewMode ? '100%' : '100vh' }}
    >
      {/* Styles Injected Locally for this component */}
      <style jsx global>{`
        .gsap-section {
          height: 100%;
          width: 100%;
          top: 0;
          position: absolute;
          visibility: hidden;
        }
        .outer-wrapper, .inner-wrapper {
          width: 100%;
          height: 100%;
          overflow-y: hidden;
        }
        .bg-image {
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          height: 100%;
          width: 100%;
          top: 0;
          background-size: cover;
        }
        .clip-text {
          overflow: hidden;
          line-height: 1.1;
        }
        .word-wrapper {
          display: inline-block;
          white-space: nowrap;
          margin-right: 0.25em; /* Space between words */
        }
        .char-wrapper {
          display: inline-block;
          overflow: hidden; /* Ensure char is masked */
        }
        .char-inner {
          display: inline-block;
          will-change: transform, opacity;
        }
      `}</style>

      {/* Container for Observer target */}
      <div ref={containerRef} className="w-full h-full relative">
          
        {/* Header - Absolute to overlay */}
        <header className="absolute top-0 left-0 w-full z-10 flex items-center justify-between px-8 py-8 uppercase tracking-widest text-xs md:text-sm mix-blend-difference text-white">
            <div>Dev Studio Ireland</div>
            <div className="flex items-center gap-4">
               {/* Close button handled by parent if previewMode */}
               {!previewMode && <a href="#contact" className="hover:opacity-70 transition-opacity">Start a Project</a>}
            </div>
        </header>

        {sectionsData.map((section) => (
            <section key={section.id} className="gsap-section">
            <div className="outer-wrapper">
                <div className="inner-wrapper">
                <div
                    className="bg-image"
                    style={{
                        // Using a darker gradient overlay for better text contrast
                        backgroundImage: `linear-gradient(180deg, rgba(10, 25, 47, 0.4) 0%, rgba(0, 0, 0, 0.6) 100%), url("${section.image}")`,
                        backgroundPosition: section.position,
                    }}
                >
                    <h2 className="gsap-heading text-4xl md:text-6xl lg:text-8xl font-bold text-center max-w-5xl px-4 drop-shadow-2xl clip-text">
                        {section.title.split(" ").map((word, wordIndex) => (
                            <span key={wordIndex} className="word-wrapper">
                                {word.split("").map((char, charIndex) => (
                                    <span key={charIndex} className="char-wrapper">
                                        <span className="char-inner">{char}</span>
                                    </span>
                                ))}
                            </span>
                        ))}
                    </h2>
                </div>
                </div>
            </div>
            </section>
        ))}
      </div>
    </div>
  );
}
