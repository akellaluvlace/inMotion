'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export interface ImageItem {
  src: string;
  alt?: string;
  label?: string;
  id?: string;
}

export interface ScrollRevealProps {
  centerContent?: React.ReactNode;
  endContent?: React.ReactNode;
  images?: ImageItem[];
  className?: string;
  showLabels?: boolean;
  onImageClick?: (image: ImageItem, index: number) => void;
  animationMode?: 'default' | 'pinned-sequence';
  transitionText?: string;
}

const styles = `
.scroll-reveal-wrapper {
  --sr-gutter: 2rem;
  --sr-gap: clamp(12px, 2vw, 20px);
  --sr-max-height: 100vh;
  position: relative;
  width: 100%;
  background: #ffffff;
  overflow: visible;
}

/* Subtle dot pattern background */
.scroll-reveal-wrapper::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle, #e0e0e0 1px, transparent 1px);
  background-size: 32px 32px;
  opacity: 0.5;
  pointer-events: none;
}

@media (max-width: 600px) {
  .scroll-reveal-wrapper {
    --sr-gutter: 1rem;
    --sr-gap: 10px;
  }
}

.scroll-reveal-wrapper .sr-section {
  height: var(--sr-max-height);
  position: relative;
  overflow: visible;
  display: flex;
  align-items: center;
  justify-content: center;
}

.scroll-reveal-wrapper .sr-content {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: visible;
}

/* 3x3 Grid */
.scroll-reveal-wrapper .sr-grid {
  width: min(1100px, 80%);
  height: 65vh;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: var(--sr-gap);
  position: relative;
  transform: translateY(2vh);
}

/* Grid items - minimalistic style */
.scroll-reveal-wrapper .sr-grid-item {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  opacity: 0;
  transform: scale(0);
  cursor: pointer;
  background: #fafafa;
  border: 1px solid #e8e8e8;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}

.scroll-reveal-wrapper .sr-grid-item:hover {
  transform: scale(1.03) translateY(-4px) !important;
  border-color: #1a1a1a;
  box-shadow: 0 20px 40px rgba(0,0,0,0.12);
}

.scroll-reveal-wrapper .sr-grid-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.scroll-reveal-wrapper .sr-grid-item:hover img {
  filter: brightness(0.95);
  transform: scale(1.05);
}

/* Minimal label */
.scroll-reveal-wrapper .sr-grid-item .sr-label {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  background: linear-gradient(to top, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.9) 60%, transparent 100%);
  color: #1a1a1a;
  font-size: clamp(0.65rem, 1vw, 0.75rem);
  font-weight: 500;
  text-align: center;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  transition: all 0.4s ease;
}

.scroll-reveal-wrapper .sr-grid-item:hover .sr-label {
  opacity: 0;
  transform: translateY(10px);
}

/* Click to preview overlay - minimal */
.scroll-reveal-wrapper .sr-grid-item .sr-preview-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(26,26,26,0.03);
  opacity: 0;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: none;
}

.scroll-reveal-wrapper .sr-grid-item:hover .sr-preview-overlay {
  opacity: 1;
  background: rgba(26,26,26,0.6);
}

.scroll-reveal-wrapper .sr-grid-item .sr-preview-text {
  color: white;
  font-size: clamp(0.7rem, 1.2vw, 0.85rem);
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 0.6rem 1.2rem;
  border: 1px solid rgba(255,255,255,0.6);
  border-radius: 100px;
  background: transparent;
  backdrop-filter: blur(8px);
  transform: translateY(8px);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.scroll-reveal-wrapper .sr-grid-item:hover .sr-preview-text {
  transform: translateY(0);
  border-color: white;
}

/* Center scaler - overlays the grid */
.scroll-reveal-wrapper .sr-scaler {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  border-radius: 1.5rem;
  overflow: hidden;
}

/* Transition Text - minimal */
.transition-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: clamp(1rem, 2vw, 1.2rem);
  font-weight: 400;
  text-align: center;
  opacity: 0;
  z-index: 5;
  color: #888888;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  pointer-events: none;
  width: 100%;
  padding: 0 1rem;
}

/* Center card styles - Split layout */
.sr-center-card {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 1.5rem;
  overflow: hidden;
  opacity: 0.9;
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
  }

  .sr-center-card .sr-card-left {
    padding: 1rem;
  }
}
`;

export default function ScrollReveal({
  centerContent,
  endContent,
  images = [],
  className = '',
  showLabels = true,
  onImageClick,
  animationMode = 'default',
  transitionText = "Check examples for yourself",
}: ScrollRevealProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const scalerRef = useRef<HTMLDivElement>(null);
  const startContentRef = useRef<HTMLDivElement>(null);
  const endContentRef = useRef<HTMLDivElement>(null);
  const gridItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const transitionTextRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = React.useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const scaler = scalerRef.current;
    const startContent = startContentRef.current;
    const endContentEl = endContentRef.current;
    const gridItems = gridItemsRef.current.filter(Boolean);
    const transitionTextEl = transitionTextRef.current;

    if (!section || !scaler) return;

    const fullWidth = window.innerWidth * 0.9;
    const fullHeight = window.innerHeight * 0.9;

    // Set initial state
    gsap.set(scaler, {
      width: fullWidth,
      height: fullHeight,
    });
    
    if (endContent) {
      gsap.set(endContentEl, { display: 'none', opacity: 0 });
      gsap.set(startContent, { display: 'block', opacity: 1 });
    }

    if (animationMode === 'pinned-sequence') {
      // Keep grid items hidden initially
      gsap.set(gridItems, { opacity: 0, scale: 0.8 });
      if (transitionTextEl) gsap.set(transitionTextEl, { opacity: 0, scale: 0.9 });

      // Just pin and track progress
      const st = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: '+=300%', // Pin for 300% of viewport height
        pin: true,
        scrub: 0.6,
        onUpdate: (self) => {
          setScrollProgress(self.progress);

          // 1. VS Code / Center Content Fades Out (0.65 -> 0.75)
          if (scalerRef.current) {
            if (self.progress > 0.65) {
              const opacity = 1 - (self.progress - 0.65) * 10; // Fades out completely by 0.75
              gsap.set(scalerRef.current, {
                opacity: Math.max(0, opacity),
                pointerEvents: opacity < 0.1 ? 'none' : 'auto'
              });
            } else {
              gsap.set(scalerRef.current, {
                opacity: 1,
                pointerEvents: 'auto'
              });
            }
          }

          // 2. Transition Text Fades In then Out (0.70 -> 0.90)
          if (transitionTextEl) {
            let textOpacity = 0;
            let textScale = 0.9;
            
            if (self.progress > 0.70 && self.progress <= 0.82) {
               // Fade In
               const p = (self.progress - 0.70) / 0.12; // 0 to 1
               textOpacity = p;
               textScale = 0.9 + (p * 0.1); // 0.9 -> 1.0
            } else if (self.progress > 0.82 && self.progress <= 0.92) {
               // Fade Out
               const p = (self.progress - 0.82) / 0.10; // 0 to 1
               textOpacity = 1 - p;
               textScale = 1.0 + (p * 0.1); // 1.0 -> 1.1
            }
            
            gsap.set(transitionTextEl, { 
                opacity: Math.max(0, textOpacity),
                scale: textScale
            });
          }

          // 3. Grid items appear (0.85 -> 1.0)
          if (self.progress > 0.85) {
            const gridProgress = (self.progress - 0.85) / 0.15; // 0 to 1 over the range 0.85-1.0
            gridItems.forEach((item, index) => {
              const itemDelay = index * 0.05;
              const itemProgress = Math.max(0, Math.min(1, (gridProgress - itemDelay) * 3));
              gsap.set(item, {
                opacity: itemProgress,
                scale: 0.8 + itemProgress * 0.2,
              });
            });
          } else {
            // Keep grid hidden before 0.85
            gridItems.forEach((item) => {
              gsap.set(item, { opacity: 0, scale: 0.8 });
            });
          }
        },
      });
      return () => {
        st.kill();
      };
    }

    if (gridItems.length === 0) return;

    // Create main timeline with smooth scrub
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=250%',
        pin: true,
        scrub: 2,
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

    // Swap content while hidden
    if (endContent) {
      tl.set(startContent, { display: 'none', opacity: 0 }, 1.5);
      tl.set(endContentEl, { display: 'block', opacity: 1 }, 1.5);
    }

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
    };
  }, [images.length, endContent, animationMode]);

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
                onClick={() => onImageClick?.(img, i)}
              >
                <img src={img.src} alt={img.alt || ''} />
                {showLabels && img.label && (
                  <div className="sr-label">{img.label}</div>
                )}
                <div className="sr-preview-overlay">
                  <span className="sr-preview-text">Click to Preview</span>
                </div>
              </div>
            ))}
          </div>

          {/* Transition Text */}
          <div ref={transitionTextRef} className="transition-text">
            {transitionText}
          </div>

          {/* Center card - overlays grid */}
          <div ref={scalerRef} className="sr-scaler" style={animationMode === 'pinned-sequence' ? { width: '100%', height: '100vh', borderRadius: 0 } : {}}>
            <div ref={startContentRef} className="w-full h-full">
              {React.isValidElement(centerContent) 
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                ? React.cloneElement(centerContent as React.ReactElement<any>, { scrollProgress }) 
                : centerContent}
            </div>
            {endContent && (
              <div ref={endContentRef} className="w-full h-full">
                {endContent}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}