# Stage 5: Performance Optimization

**Priority:** MEDIUM
**Estimated Effort:** 3-4 hours
**Dependencies:** Stage 2 (Styles), Stage 4 (Images)

---

## Overview

The site loads three animation libraries (~224KB) and has performance opportunities:
- GSAP: ~60KB
- Framer Motion: ~150KB
- AOS: ~14KB

This stage focuses on reducing bundle size and improving runtime performance.

---

## Files to Modify

- `src/components/LandingPage.tsx`
- `src/components/ShowDontTellAnimation.tsx`
- `src/app/globals.css`
- `src/hooks/useScrollReveal.ts` (new file)
- `package.json`

---

## Task 5.1: Create Custom Scroll Reveal Hook (Replace AOS)

AOS is the simplest library but adds 14KB. Replace with native IntersectionObserver.

### Create `src/hooks/useScrollReveal.ts`

```typescript
'use client';

import { useEffect, useRef, useState } from 'react';

interface UseScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useScrollReveal<T extends HTMLElement>(
  options: UseScrollRevealOptions = {}
) {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    triggerOnce = true
  } = options;

  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isVisible };
}

// Utility hook for multiple elements
export function useScrollRevealMultiple(
  count: number,
  options: UseScrollRevealOptions = {}
) {
  const refs = useRef<(HTMLElement | null)[]>([]);
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    refs.current.forEach((element, index) => {
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleItems(prev => new Set(prev).add(index));
            if (options.triggerOnce !== false) {
              observer.unobserve(element);
            }
          }
        },
        {
          threshold: options.threshold || 0.1,
          rootMargin: options.rootMargin || '0px 0px -50px 0px'
        }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => observers.forEach(o => o.disconnect());
  }, [count, options.threshold, options.rootMargin, options.triggerOnce]);

  const setRef = (index: number) => (el: HTMLElement | null) => {
    refs.current[index] = el;
  };

  return { setRef, isVisible: (index: number) => visibleItems.has(index) };
}
```

---

## Task 5.2: Add Scroll Reveal CSS Classes

### Update `globals.css`

```css
@layer utilities {
  /* Scroll Reveal Animations */
  .scroll-reveal {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.8s ease-out, transform 0.8s ease-out;
  }

  .scroll-reveal.visible {
    opacity: 1;
    transform: translateY(0);
  }

  /* Variants */
  .scroll-reveal-fade {
    opacity: 0;
    transition: opacity 0.8s ease-out;
  }

  .scroll-reveal-fade.visible {
    opacity: 1;
  }

  .scroll-reveal-scale {
    opacity: 0;
    transform: scale(0.95);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  }

  .scroll-reveal-scale.visible {
    opacity: 1;
    transform: scale(1);
  }

  /* Stagger delays - use with nth-child or data attributes */
  .scroll-reveal-delay-1 { transition-delay: 0.1s; }
  .scroll-reveal-delay-2 { transition-delay: 0.2s; }
  .scroll-reveal-delay-3 { transition-delay: 0.3s; }
  .scroll-reveal-delay-4 { transition-delay: 0.4s; }
  .scroll-reveal-delay-5 { transition-delay: 0.5s; }
}
```

---

## Task 5.3: Replace AOS in LandingPage

### Update `LandingPage.tsx`

```tsx
// REMOVE these imports:
// import AOS from 'aos';
// import 'aos/dist/aos.css';

// ADD this import:
import { useScrollReveal, useScrollRevealMultiple } from '@/hooks/useScrollReveal';

// REMOVE AOS.init from useEffect:
// useEffect(() => {
//   AOS.init({
//     duration: 800,
//     once: true,
//     easing: 'ease-out-cubic',
//     offset: 50,
//   });
//   ...
// }, []);

// REPLACE data-aos attributes with hook usage:

// Example - Section Header
// Before:
<p data-aos="fade-up" className="text-xs tracking-[0.3em]...">Vibe Rescue</p>
<h2 data-aos="fade-up" data-aos-delay="100" className="text-5xl...">AI got you stuck?</h2>

// After:
function SectionHeader({ label, title, subtitle }: { label: string; title: string; subtitle?: string }) {
  const { ref: labelRef, isVisible: labelVisible } = useScrollReveal();
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal();

  return (
    <div className="text-center mb-16">
      <p
        ref={labelRef}
        className={`text-xs tracking-[0.3em] uppercase text-[#888888] mb-4 scroll-reveal ${labelVisible ? 'visible' : ''}`}
      >
        {label}
      </p>
      <h2
        ref={titleRef}
        className={`text-5xl sm:text-6xl font-bold tracking-tight text-[#1a1a1a] scroll-reveal scroll-reveal-delay-1 ${titleVisible ? 'visible' : ''}`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="text-[#666666] text-lg mt-4">{subtitle}</p>
      )}
    </div>
  );
}
```

### Simplified Pattern - Add visible class via ref callback

```tsx
// Alternative: Use a component wrapper
function ScrollReveal({
  children,
  className = '',
  delay = 0
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`scroll-reveal ${isVisible ? 'visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}

// Usage:
<ScrollReveal>
  <p className="text-xs...">Vibe Rescue</p>
</ScrollReveal>
<ScrollReveal delay={0.1}>
  <h2 className="text-5xl...">AI got you stuck?</h2>
</ScrollReveal>
```

---

## Task 5.4: Evaluate Framer Motion Usage

Framer Motion (~150KB) is only used in `ShowDontTellAnimation.tsx` for simple opacity/scale animations.

### Option A: Replace with CSS (Recommended)

```tsx
// ShowDontTellAnimation.tsx

// REMOVE:
// import { motion } from 'framer-motion';

// REPLACE motion.div with regular div + CSS:

// Before:
<motion.div
  style={{
    opacity: textFadeToTerminal * textReveal,
    scale: 0.95 + textReveal * 0.05,
    position: 'absolute'
  }}
  className="text-center w-full px-4"
>

// After:
<div
  style={{
    opacity: textFadeToTerminal * textReveal,
    transform: `scale(${0.95 + textReveal * 0.05})`,
    position: 'absolute',
    transition: 'opacity 0.3s ease-out, transform 0.3s ease-out'
  }}
  className="text-center w-full px-4"
>
```

### Full Replacement for ShowDontTellAnimation.tsx

```tsx
'use client';

import React, { useState, useEffect } from 'react';

export default function ShowDontTellAnimation({ scrollProgress = 0 }: { scrollProgress?: number }) {
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [showCursor, setShowCursor] = useState(true);

  const compilationSteps = [
    '$ npm run build',
    '',
    '> akella-website@1.0.0 build',
    '> next build',
    '',
    '   Creating optimized build...',
    '   ✓ Compiled successfully',
    '   ✓ Linting passed',
    '   ✓ Type checking complete',
    '   ✓ Generating static pages',
    '',
    '   Route (app)              Size',
    '   ┌ ○ /                    4.2 kB',
    '   └ ○ /examples            2.8 kB',
    '',
    '   ✓ Build completed in 3.2s',
    '   ✓ Ready for deployment',
  ];

  const textPhase = scrollProgress < 0.3;
  const terminalPhase = scrollProgress >= 0.3 && scrollProgress < 0.6;
  const fadeOut = Math.min(Math.max((scrollProgress - 0.55) * 10, 0), 1);

  const textReveal = textPhase ? Math.min(scrollProgress * 4, 1) : 1;
  const textFadeToTerminal = textPhase ? 1 : Math.max(0, 1 - (scrollProgress - 0.3) * 10);
  const terminalReveal = terminalPhase ? Math.min((scrollProgress - 0.3) * 4, 1) : (scrollProgress >= 0.6 ? 1 : 0);

  useEffect(() => {
    if (terminalPhase && terminalLines.length < compilationSteps.length) {
      const progress = (scrollProgress - 0.3) / 0.3;
      const linesToShow = Math.floor(progress * compilationSteps.length);
      if (linesToShow > terminalLines.length) {
        setTerminalLines(compilationSteps.slice(0, linesToShow));
      }
    } else if (!terminalPhase && scrollProgress < 0.3) {
      setTerminalLines([]);
    }
  }, [scrollProgress, terminalPhase, terminalLines.length]);

  useEffect(() => {
    const interval = setInterval(() => setShowCursor(c => !c), 530);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden bg-white"
      style={{ opacity: 1 - fadeOut }}
    >
      {/* Text Phase */}
      <div
        style={{
          opacity: textFadeToTerminal * textReveal,
          transform: `scale(${0.95 + textReveal * 0.05})`,
          position: 'absolute',
          transition: 'transform 0.1s ease-out'
        }}
        className="text-center w-full px-4"
      >
        <p className="text-xs tracking-[0.3em] uppercase text-[#888888] mb-8">Portfolio</p>
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#1a1a1a] mb-4">
          Quality brings clients.
        </h2>
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#888888]">
          We build quality.
        </h2>
      </div>

      {/* Terminal Phase */}
      <div
        style={{
          opacity: terminalReveal,
          transform: `scale(${0.95 + terminalReveal * 0.05})`,
          transition: 'transform 0.1s ease-out'
        }}
        className="w-full max-w-2xl px-4"
      >
        {/* Terminal content same as before */}
      </div>

      {/* Scroll hint */}
      <div
        style={{ opacity: Math.max(0, 1 - scrollProgress * 5) }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-3">
          <span className="text-xs text-[#888888] tracking-wide">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-[#e0e0e0] to-transparent"></div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes terminalLine {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </div>
  );
}
```

---

## Task 5.5: Remove Unused Dependencies

### Update `package.json`

After replacing AOS and Framer Motion:

```bash
npm uninstall aos framer-motion
npm uninstall @types/aos  # if exists
```

**Note:** Only do this after confirming all replacements work.

---

## Task 5.6: Lazy Load Heavy Components

### Update `LandingPage.tsx`

```tsx
import dynamic from 'next/dynamic';

// Lazy load components that aren't immediately visible
const ScrollRevealSection = dynamic(() => import('./ScrollReveal'), {
  loading: () => <div className="min-h-screen bg-white" />,
  ssr: false, // GSAP needs client-side
});

const StyleShowcase = dynamic(() => import('./StyleShowcase'), {
  loading: () => <div className="py-24 bg-white" />,
});

const ServicesCarousel = dynamic(() => import('./servicesWeProvide'), {
  loading: () => <div className="py-24 bg-white" />,
});

// Use in JSX same as before
```

---

## Task 5.7: Optimize GSAP Imports

### Update imports in GSAP-using components

```tsx
// Instead of importing all of GSAP:
// import gsap from 'gsap';

// Import only what you need:
import { gsap } from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { Flip } from 'gsap/dist/Flip';

// Register only needed plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, Flip);
}
```

---

## Bundle Size Impact

| Library | Before | After |
|---------|--------|-------|
| AOS | 14KB | 0KB (removed) |
| Framer Motion | 150KB | 0KB (removed) |
| Custom Hook | 0KB | ~1KB |
| GSAP | 60KB | 60KB (keep - heavily used) |
| **Total Animation** | **224KB** | **~61KB** |

**Savings: ~163KB (73% reduction in animation code)**

---

## Acceptance Criteria

- [ ] AOS removed, scroll reveal works via custom hook
- [ ] Framer Motion removed, animations work via CSS/inline styles
- [ ] Heavy components lazy loaded
- [ ] GSAP imports optimized
- [ ] All animations still work correctly
- [ ] No visible performance degradation
- [ ] Bundle size reduced

---

## Testing

1. Run `npm run build` - check bundle size output
2. Test all scroll reveal animations on homepage
3. Test terminal animation in ScrollReveal section
4. Test service carousel GSAP Flip animations
5. Run Lighthouse performance audit

---

## Notes

- GSAP is kept because it powers complex animations (Flip, ScrollTrigger)
- The custom scroll reveal hook is ~50 lines vs 14KB library
- CSS transforms are GPU-accelerated and performant
- Lazy loading reduces initial JavaScript payload
