'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export interface ImageItem {
  src: string;
  alt?: string;
  label?: string;
}

export interface ScrollRevealProps {
  centerContent?: React.ReactNode;
  images?: ImageItem[];
  className?: string;
  showLabels?: boolean;
}

const styles = `
.scroll-reveal-wrapper {
  --sr-gutter: 2rem;
  --sr-gap: clamp(8px, 2vw, 16px);
  --sr-max-height: 80vh;
  position: relative;
  width: 100%;
  background: #030712;
  overflow: hidden;
}

@media (max-width: 600px) {
  .scroll-reveal-wrapper {
    --sr-gutter: 1rem;
    --sr-gap: 8px;
  }
}

.scroll-reveal-wrapper .sr-section {
  height: var(--sr-max-height);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 8vh;
}

.scroll-reveal-wrapper .sr-content {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

/* 3x3 Grid */
.scroll-reveal-wrapper .sr-grid {
  width: min(1200px, calc(100% - 2 * var(--sr-gutter)));
  height: min(calc(var(--sr-max-height) - 4rem), 600px);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: var(--sr-gap);
  position: relative;
}

/* Grid items */
.scroll-reveal-wrapper .sr-grid-item {
  position: relative;
  border-radius: 0.75rem;
  overflow: hidden;
  opacity: 0;
  transform: scale(0);
}

.scroll-reveal-wrapper .sr-grid-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.scroll-reveal-wrapper .sr-grid-item .sr-label {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0.75rem 0.5rem;
  background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 60%, transparent 100%);
  color: white;
  font-size: clamp(0.6rem, 1.2vw, 0.8rem);
  font-weight: 600;
  text-align: center;
  line-height: 1.2;
}

/* Center scaler - overlays the grid */
.scroll-reveal-wrapper .sr-scaler {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  border-radius: 1rem;
  overflow: hidden;
}

/* Center card styles - Split layout */
.sr-center-card {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%);
  border: 1px solid rgba(99, 102, 241, 0.3);
  border-radius: 1rem;
  overflow: hidden;
}

.sr-center-card .sr-card-left {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: clamp(1.5rem, 4vw, 3rem);
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, transparent 100%);
}

.sr-center-card .sr-card-left h3 {
  font-size: clamp(1.1rem, 3vw, 2rem);
  font-weight: 800;
  background: linear-gradient(135deg, #fff 0%, #c7d2fe 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0 0 0.5rem 0;
  line-height: 1.2;
}

.sr-center-card .sr-card-left p {
  font-size: clamp(0.7rem, 1.3vw, 1rem);
  color: #94a3b8;
  margin: 0;
  line-height: 1.4;
}

.sr-center-card .sr-card-right {
  position: relative;
  overflow: hidden;
  background: #000;
}

.sr-center-card .sr-card-right img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.sr-center-card .sr-card-right .sr-preview-label {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0.75rem;
  background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%);
  color: white;
  font-size: clamp(0.65rem, 1vw, 0.85rem);
  font-weight: 600;
}

@media (max-width: 600px) {
  .sr-center-card {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
  }

  .sr-center-card .sr-card-left {
    padding: 1rem;
  }
}
`;

export default function ScrollReveal({
  centerContent,
  images = [],
  className = '',
  showLabels = true,
}: ScrollRevealProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const scalerRef = useRef<HTMLDivElement>(null);
  const gridItemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const scaler = scalerRef.current;
    const gridItems = gridItemsRef.current.filter(Boolean);

    if (!section || !scaler || gridItems.length === 0) return;

    const gutter = window.innerWidth <= 600 ? 16 : 32;
    const maxHeight = window.innerHeight * 0.8;
    const fullWidth = Math.min(window.innerWidth - gutter * 2, 1000);
    const fullHeight = Math.min(maxHeight - gutter * 2, 500);

    // Set initial state - center card full size
    gsap.set(scaler, {
      width: fullWidth,
      height: fullHeight,
    });

    // Create main timeline with smooth scrub
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=250%',
        pin: true,
        scrub: 2, // Smoother scrub (higher = smoother)
        anticipatePin: 1,
      },
    });

    // Phase 1: Center shrinks smoothly, grid items appear
    tl.to(scaler, {
      width: 0,
      height: 0,
      opacity: 0,
      duration: 1.5,
      ease: 'power3.inOut',
    }, 0);

    // Stagger grid items appearing with smooth easing
    gridItems.forEach((item, index) => {
      const row = Math.floor(index / 3);
      const col = index % 3;
      const delay = 0.2 + (row * 0.08) + (col * 0.06);
      tl.to(item, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'power2.out',
      }, delay);
    });

    // Hold at fully revealed state
    tl.to({}, { duration: 0.8 });

    // Phase 2: Grid items disappear smoothly, center grows back
    gridItems.slice().reverse().forEach((item, index) => {
      tl.to(item, {
        opacity: 0,
        scale: 0.8,
        duration: 0.6,
        ease: 'power2.in',
      }, index === 0 ? '+=0' : `<0.04`);
    });

    tl.to(scaler, {
      width: fullWidth,
      height: fullHeight,
      opacity: 1,
      duration: 1.5,
      ease: 'power3.inOut',
    }, '<0.2');

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [images.length]);

  return (
    <div className={`scroll-reveal-wrapper ${className}`}>
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <section ref={sectionRef} className="sr-section">
        <div className="sr-content">
          {/* 3x3 Grid of images */}
          <div className="sr-grid">
            {images.slice(0, 9).map((img, i) => (
              <div
                key={`grid-${i}`}
                ref={(el) => { gridItemsRef.current[i] = el; }}
                className="sr-grid-item"
              >
                <img src={img.src} alt={img.alt || ''} />
                {showLabels && img.label && (
                  <div className="sr-label">{img.label}</div>
                )}
              </div>
            ))}
          </div>

          {/* Center card - overlays grid */}
          <div ref={scalerRef} className="sr-scaler">
            {centerContent || (
              <div className="sr-center-card">
                <div className="sr-card-left">
                  <h3>Our Work</h3>
                  <p>Website Examples</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
