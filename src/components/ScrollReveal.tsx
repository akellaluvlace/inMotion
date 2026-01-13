'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export interface ImageItem {
  src: string;
  alt?: string;
}

export interface ScrollRevealProps {
  centerImage: ImageItem;
  layer1Images?: ImageItem[];
  layer2Images?: ImageItem[];
  layer3Images?: ImageItem[];
  className?: string;
}

const defaultLayer1: ImageItem[] = [
  { src: 'https://images.unsplash.com/photo-1463100099107-aa0980c362e6?w=800&auto=format&fit=crop&q=60' },
  { src: 'https://images.unsplash.com/photo-1556304044-0699e31c6a34?w=800&auto=format&fit=crop&q=60' },
  { src: 'https://images.unsplash.com/photo-1590330297626-d7aff25a0431?w=800&auto=format&fit=crop&q=60' },
  { src: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=800&auto=format&fit=crop&q=60' },
  { src: 'https://images.unsplash.com/photo-1488161628813-04466f872be2?w=800&auto=format&fit=crop&q=60' },
  { src: 'https://images.unsplash.com/photo-1565321590372-09331b9dd1eb?w=800&auto=format&fit=crop&q=60' },
];

const defaultLayer2: ImageItem[] = [
  { src: 'https://images.unsplash.com/photo-1531525645387-7f14be1bdbbd?w=800&auto=format&fit=crop&q=60' },
  { src: 'https://images.unsplash.com/photo-1637414165749-9b3cd88b8271?w=800&auto=format&fit=crop&q=60' },
  { src: 'https://images.unsplash.com/photo-1699911251220-8e0de3b5ce88?w=800&auto=format&fit=crop&q=60' },
  { src: 'https://images.unsplash.com/photo-1667483629944-6414ad0648c5?w=800&auto=format&fit=crop&q=60' },
  { src: 'https://plus.unsplash.com/premium_photo-1706078438060-d76ced26d8d5?w=800&auto=format&fit=crop&q=60' },
  { src: 'https://images.unsplash.com/photo-1525385444278-b7968e7e28dc?w=800&auto=format&fit=crop&q=60' },
];

const defaultLayer3: ImageItem[] = [
  { src: 'https://images.unsplash.com/reserve/LJIZlzHgQ7WPSh5KVTCB_Typewriter.jpg?w=800&auto=format&fit=crop&q=60' },
  { src: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=60' },
];

const defaultCenter: ImageItem = {
  src: 'https://assets.codepen.io/605876/model-shades.jpg?format=auto&quality=100',
};

const styles = `
.scroll-reveal-wrapper {
  --sr-gutter: 2rem;
  --sr-gap: clamp(10px, 7.35vw, 80px);
  position: relative;
  width: 100%;
  background: #000;
}

@media (max-width: 600px) {
  .scroll-reveal-wrapper {
    --sr-gutter: 1rem;
  }
}

.scroll-reveal-wrapper .sr-section {
  height: 100vh;
  position: relative;
  overflow: hidden;
}

.scroll-reveal-wrapper .sr-content {
  height: 100vh;
  width: 100%;
  display: flex;
  place-items: center;
  align-content: center;
  position: relative;
  overflow: hidden;
}

.scroll-reveal-wrapper .sr-grid {
  --sr-offset: 0;
  width: 1600px;
  max-width: calc(100% - (2 * var(--sr-gutter)));
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(3, auto);
  gap: var(--sr-gap);
  margin: 0 auto;
  align-content: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

@media (max-width: 600px) {
  .scroll-reveal-wrapper .sr-grid {
    grid-template-columns: repeat(3, 1fr);
    --sr-offset: -1;
  }
  .scroll-reveal-wrapper .sr-grid > div:nth-of-type(1) {
    display: none;
  }
}

.scroll-reveal-wrapper .sr-layer {
  display: grid;
  grid-column: 1 / -1;
  grid-row: 1 / -1;
  grid-template-columns: subgrid;
  grid-template-rows: subgrid;
  opacity: 0;
  transform: scale(0);
}

.scroll-reveal-wrapper .sr-grid > div:nth-of-type(1) div:nth-of-type(odd) {
  grid-column: 1;
}
.scroll-reveal-wrapper .sr-grid > div:nth-of-type(1) div:nth-of-type(even) {
  grid-column: -2;
}

.scroll-reveal-wrapper .sr-grid > div:nth-of-type(2) div:nth-of-type(odd) {
  grid-column: calc(2 + var(--sr-offset));
}
.scroll-reveal-wrapper .sr-grid > div:nth-of-type(2) div:nth-of-type(even) {
  grid-column: calc(-3 - var(--sr-offset));
}

.scroll-reveal-wrapper .sr-grid > div:nth-of-type(3) div {
  grid-column: calc(3 + var(--sr-offset));
}
.scroll-reveal-wrapper .sr-grid > div:nth-of-type(3) div:last-of-type {
  grid-row: -1;
}

.scroll-reveal-wrapper .sr-scaler {
  z-index: 2;
  width: 100%;
  height: 100%;
  position: relative;
  grid-area: 2 / calc(3 + var(--sr-offset));
}

.scroll-reveal-wrapper .sr-scaler img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  object-fit: cover;
  border-radius: 1rem;
}

.scroll-reveal-wrapper .sr-grid img {
  width: 100%;
  aspect-ratio: 4 / 5;
  object-fit: cover;
  border-radius: 1rem;
}
`;

export default function ScrollReveal({
  centerImage = defaultCenter,
  layer1Images = defaultLayer1,
  layer2Images = defaultLayer2,
  layer3Images = defaultLayer3,
  className = '',
}: ScrollRevealProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const scalerImgRef = useRef<HTMLImageElement>(null);
  const layer1Ref = useRef<HTMLDivElement>(null);
  const layer2Ref = useRef<HTMLDivElement>(null);
  const layer3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const scalerImg = scalerImgRef.current;
    const layer1 = layer1Ref.current;
    const layer2 = layer2Ref.current;
    const layer3 = layer3Ref.current;

    if (!section || !scalerImg || !layer1 || !layer2 || !layer3) return;

    const gutter = window.innerWidth <= 600 ? 16 : 32;
    const fullWidth = window.innerWidth - gutter * 2;
    const fullHeight = window.innerHeight - gutter * 2;

    // Set initial state - center image full screen
    gsap.set(scalerImg, {
      width: fullWidth,
      height: fullHeight,
    });

    // Create main timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=300%', // Pin for 3x viewport height of scrolling
        pin: true,
        scrub: 1,
        anticipatePin: 1,
      },
    });

    // Phase 1: Bull shrinks, images appear (0% to 50% of scroll)
    tl.to(scalerImg, {
      width: '100%',
      height: '100%',
      duration: 1,
      ease: 'power2.inOut',
    }, 0);

    tl.to(layer3, {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: 'power2.out',
    }, 0.1);

    tl.to(layer2, {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: 'power3.out',
    }, 0.2);

    tl.to(layer1, {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: 'power4.out',
    }, 0.3);

    // Hold at fully revealed state
    tl.to({}, { duration: 0.5 });

    // Phase 2: Images assemble back, bull grows (50% to 100% of scroll)
    tl.to(layer1, {
      opacity: 0,
      scale: 0,
      duration: 0.8,
      ease: 'power4.in',
    }, '+=0');

    tl.to(layer2, {
      opacity: 0,
      scale: 0,
      duration: 0.8,
      ease: 'power3.in',
    }, '<0.1');

    tl.to(layer3, {
      opacity: 0,
      scale: 0,
      duration: 0.8,
      ease: 'power2.in',
    }, '<0.1');

    tl.to(scalerImg, {
      width: fullWidth,
      height: fullHeight,
      duration: 1,
      ease: 'power2.inOut',
    }, '<0.2');

    // Cleanup
    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <div ref={wrapperRef} className={`scroll-reveal-wrapper ${className}`}>
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <section ref={sectionRef} className="sr-section">
        <div className="sr-content">
          <div className="sr-grid">
            {/* Layer 1 - Outer layer (6 images) */}
            <div ref={layer1Ref} className="sr-layer">
              {layer1Images.slice(0, 6).map((img, i) => (
                <div key={`l1-${i}`}>
                  <img src={img.src} alt={img.alt || ''} />
                </div>
              ))}
            </div>

            {/* Layer 2 - Middle layer (6 images) */}
            <div ref={layer2Ref} className="sr-layer">
              {layer2Images.slice(0, 6).map((img, i) => (
                <div key={`l2-${i}`}>
                  <img src={img.src} alt={img.alt || ''} />
                </div>
              ))}
            </div>

            {/* Layer 3 - Inner layer (2 images) */}
            <div ref={layer3Ref} className="sr-layer">
              {layer3Images.slice(0, 2).map((img, i) => (
                <div key={`l3-${i}`}>
                  <img src={img.src} alt={img.alt || ''} />
                </div>
              ))}
            </div>

            {/* Center/Scaler image - starts full screen */}
            <div className="sr-scaler">
              <img ref={scalerImgRef} src={centerImage.src} alt={centerImage.alt || ''} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
