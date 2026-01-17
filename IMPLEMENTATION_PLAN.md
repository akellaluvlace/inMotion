# Implementation Plan: Website Fixes & Improvements

**Based on:** WEBSITE_ANALYSIS_REPORT.md
**Total Stages:** 7
**Estimated Scope:** Incremental improvements, can be done stage by stage

---

## Stage 1: Fix Critical Navigation Issues

**Priority:** HIGH
**Files to Modify:**
- `src/components/LandingPage.tsx`
- `src/app/about/page.tsx`

### Tasks

#### 1.1 Fix Dead `#pricing` Link
The navigation links to `#pricing` but no element has that ID.

**Option A - Add pricing ID to services section:**
```tsx
// LandingPage.tsx - Line 672
<div id="services">
  <div id="pricing"> {/* Add this wrapper */}
    <ServicesCarousel onPreview={handleServicePreview} />
  </div>
</div>
```

**Option B - Change nav links to point to services:**
```tsx
// LandingPage.tsx - Lines 517, 557
// Change:
<a href="#pricing" ...>Pricing</a>
// To:
<a href="#services" ...>Pricing</a>
```

**Recommendation:** Option A - keeps semantic meaning of "Pricing" link

#### 1.2 Create Shared Navigation Component
Extract navigation to a reusable component.

**Create:** `src/components/Navigation.tsx`
```tsx
'use client';

import { useState } from 'react';
import { ArrowRight, Sparkles, Menu, X } from 'lucide-react';

interface NavigationProps {
  currentPage?: 'home' | 'about';
}

export default function Navigation({ currentPage = 'home' }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/#services', label: 'Services' },
    { href: '/#pricing', label: 'Pricing' },
    { href: '/#vibe-rescue', label: 'Vibe Rescue', icon: Sparkles, highlight: true },
    { href: '/#process', label: 'Process' },
    { href: '/about', label: 'About' },
  ];

  return (
    <nav className="fixed w-full z-50 px-4 py-4 nav-load">
      {/* ... unified nav implementation ... */}
    </nav>
  );
}
```

#### 1.3 Update Both Pages to Use Shared Navigation
- Import `Navigation` in `LandingPage.tsx`
- Import `Navigation` in `about/page.tsx`
- Remove duplicate nav code from both files

### Acceptance Criteria
- [ ] `#pricing` link scrolls to pricing/services section
- [ ] Both pages have identical navigation
- [ ] Mobile menu works on both pages
- [ ] Nav animation consistent across pages

---

## Stage 2: Consolidate Duplicate Styles

**Priority:** HIGH
**Files to Modify:**
- `src/app/globals.css`
- `src/components/LandingPage.tsx`
- `src/app/about/page.tsx`

### Tasks

#### 2.1 Audit Duplicate Styles
Remove these duplicates from `LandingPage.tsx` (already in `globals.css`):
- `.glass` / `.glass-strong`
- `.gradient-text` / `.gradient-text-color`
- `.btn-primary` / `.btn-secondary`
- `.service-card`
- `.pricing-card`
- `.animate-marquee` / `.animate-marquee-slow`
- `.vibe-card`
- `.faq-item`
- `.process-line`

#### 2.2 Keep Only Animation Keyframes in Component
The `customStyles` constant in `LandingPage.tsx` should only contain:
- Hero load animations (`hero-load-*` classes)
- Bento load animations (`bento-load-*` classes)
- Nav load animation
- Orb float animation (if not in globals)

#### 2.3 Remove Inline Style from About Page
```tsx
// about/page.tsx - Remove lines 291-297
// The <style dangerouslySetInnerHTML> for .glass-strong
// Already defined in globals.css
```

#### 2.4 Standardize Colors
Create CSS variables in `globals.css`:
```css
@theme {
  --color-text-secondary: #666666; /* Not #737373 */
  --color-border: #e0e0e0; /* Not #e5e5e5 */
}
```

### Acceptance Criteria
- [ ] No duplicate class definitions across files
- [ ] All shared styles in `globals.css`
- [ ] Component-specific animations stay in components
- [ ] Color values consistent throughout

---

## Stage 3: Accessibility Improvements

**Priority:** HIGH
**Files to Modify:**
- `src/components/LandingPage.tsx`
- `src/components/servicesWeProvide.tsx`
- `src/components/StyleShowcase.tsx`
- `src/app/layout.tsx`

### Tasks

#### 3.1 Make FAQ Accordion Keyboard Accessible
```tsx
// LandingPage.tsx - Around line 1011
// Change from:
<div key={index} className="border-b..." onClick={() => toggleFaq(index)}>

// To:
<div
  key={index}
  className="border-b..."
  role="button"
  tabIndex={0}
  onClick={() => toggleFaq(index)}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleFaq(index);
    }
  }}
  aria-expanded={openFaq === index}
>
```

#### 3.2 Add Skip to Content Link
```tsx
// layout.tsx - Add after <body> opening tag
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded"
>
  Skip to content
</a>

// LandingPage.tsx - Add id to main content
<section id="main-content" className="relative min-h-screen...">
```

#### 3.3 Add Reduced Motion Support
```css
/* globals.css */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }

  .animate-marquee,
  .animate-marquee-slow {
    animation: none;
  }
}
```

#### 3.4 Fix Service Card Keyboard Navigation
```tsx
// servicesWeProvide.tsx - Service cards
<div
  key={service.id}
  role="button"
  tabIndex={0}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleService(service.id);
    }
  }}
  onClick={() => toggleService(service.id)}
  // ... rest of props
>
```

#### 3.5 Add Focus Visible Styles
```css
/* globals.css */
:focus-visible {
  outline: 2px solid #1a1a1a;
  outline-offset: 2px;
}

button:focus-visible,
a:focus-visible,
[role="button"]:focus-visible {
  outline: 2px solid #1a1a1a;
  outline-offset: 2px;
}
```

### Acceptance Criteria
- [ ] FAQ can be navigated with Tab and opened with Enter/Space
- [ ] Skip link visible on focus
- [ ] Animations respect reduced motion preference
- [ ] All interactive elements have visible focus states
- [ ] Service cards keyboard accessible

---

## Stage 4: Image Optimization

**Priority:** MEDIUM
**Files to Modify:**
- `src/components/LandingPage.tsx`
- `src/components/StyleShowcase.tsx`
- `src/components/ScrollReveal.tsx`
- `next.config.ts`

### Tasks

#### 4.1 Configure Next.js for External Images
```typescript
// next.config.ts
const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};
```

#### 4.2 Replace `<img>` with Next.js `<Image>`

**Tech Stack Marquee (LandingPage.tsx ~655-665):**
```tsx
// These local images are fine as-is since they're SVGs
// But add explicit width/height:
<Image
  src="/assets/logos/react_light.svg"
  alt="React"
  width={64}
  height={64}
  className="grayscale opacity-30 group-hover:grayscale-0..."
/>
```

**StyleShowcase External Images:**
```tsx
// StyleShowcase.tsx - Use Next.js Image for backgrounds
// This requires restructuring the background-image approach
// Alternative: Download Unsplash images locally
```

#### 4.3 Add Proper Alt Text to ScrollReveal Images
```tsx
// ScrollReveal.tsx - Line 486
<img
  src={img.src}
  alt={img.alt || img.label || 'Portfolio example'}
  loading="lazy"
/>
```

#### 4.4 Download External Images Locally (Recommended)
Create script or manually download Unsplash images used in:
- `StyleShowcase.tsx`
- `Architect.tsx`

Save to `/public/assets/portfolio/` and update references.

### Acceptance Criteria
- [ ] No external image requests blocking page load
- [ ] All images have meaningful alt text
- [ ] Images lazy-loaded where appropriate
- [ ] No layout shift from images loading

---

## Stage 5: Performance Optimization

**Priority:** MEDIUM
**Files to Modify:**
- `src/components/LandingPage.tsx`
- `src/components/websitesExamples/Architect.tsx`
- `package.json` (potentially)

### Tasks

#### 5.1 Remove AOS Library (Replace with CSS/GSAP)
AOS is the smallest but least powerful. Replace with Intersection Observer + CSS.

```tsx
// LandingPage.tsx - Remove AOS
// Delete: import AOS from 'aos';
// Delete: import 'aos/dist/aos.css';
// Delete: AOS.init({...});

// Replace data-aos attributes with custom hook
// Create: src/hooks/useScrollReveal.ts
```

**Custom Hook Replacement:**
```tsx
// src/hooks/useScrollReveal.ts
import { useEffect, useRef } from 'react';

export function useScrollReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return ref;
}
```

```css
/* globals.css */
.scroll-reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}

.scroll-reveal.revealed {
  opacity: 1;
  transform: translateY(0);
}
```

#### 5.2 Remove External Font from Architect Component
```tsx
// Architect.tsx - Line 13
// Delete the @import url for Inter font
// Use the site's Plus Jakarta Sans instead
```

#### 5.3 Consider Lazy Loading Heavy Components
```tsx
// LandingPage.tsx
import dynamic from 'next/dynamic';

const ScrollReveal = dynamic(() => import('./ScrollReveal'), {
  loading: () => <div className="min-h-screen" />,
});

const StyleShowcase = dynamic(() => import('./StyleShowcase'), {
  loading: () => <div className="py-24" />,
});
```

#### 5.4 Evaluate Framer Motion Usage
Current usage in `ShowDontTellAnimation.tsx` is minimal. Consider:
- Replacing with GSAP (already loaded)
- Or CSS animations

### Acceptance Criteria
- [ ] AOS removed, replaced with custom solution
- [ ] No external font requests from components
- [ ] Heavy components lazy loaded
- [ ] Total animation library size reduced

---

## Stage 6: SEO & Metadata Enhancements

**Priority:** MEDIUM
**Files to Modify:**
- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/app/about/page.tsx`

### Tasks

#### 6.1 Add OpenGraph & Twitter Metadata
```tsx
// layout.tsx
export const metadata: Metadata = {
  title: {
    default: 'Akella inMotion — Dublin Web Development Studio',
    template: '%s | Akella inMotion',
  },
  description: 'Dublin web development studio. Landing pages, business websites & AI project rescue. Transparent pricing, 10+ years experience.',
  keywords: ['web development', 'Dublin', 'Next.js', 'React', 'AI', 'website design'],
  authors: [{ name: 'Akella inMotion' }],
  creator: 'Akella inMotion',
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: 'https://akellainmotion.ie',
    siteName: 'Akella inMotion',
    title: 'Akella inMotion — Dublin Web Development Studio',
    description: 'Dublin web development studio. Landing pages, business websites & AI project rescue.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Akella inMotion - Dublin Web Development',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Akella inMotion — Dublin Web Development Studio',
    description: 'Dublin web development studio. Landing pages, business websites & AI project rescue.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};
```

#### 6.2 Add Page-Specific Metadata for About
```tsx
// about/page.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'Meet the team behind Akella inMotion. 10+ years experience, AI Challenge 2025 winner, bridging Baltic engineering with Irish innovation.',
  openGraph: {
    title: 'About | Akella inMotion',
    description: 'Meet the team behind Akella inMotion.',
  },
};
```

#### 6.3 Add JSON-LD Structured Data
```tsx
// layout.tsx - Add to body
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'Akella inMotion',
      description: 'Dublin web development studio',
      url: 'https://akellainmotion.ie',
      email: 'hello@akellainmotion.ie',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Dublin',
        addressCountry: 'IE',
      },
      priceRange: '$$',
      sameAs: [
        // Add social media URLs when available
      ],
    }),
  }}
/>
```

#### 6.4 Create OG Image
Create `/public/og-image.png` (1200x630px) with:
- Logo
- Tagline
- Brand colors

### Acceptance Criteria
- [ ] OpenGraph preview works when sharing links
- [ ] Twitter card displays correctly
- [ ] Each page has unique metadata
- [ ] Structured data validates in Google's tool

---

## Stage 7: Code Quality & Cleanup

**Priority:** LOW
**Files to Modify:** Various

### Tasks

#### 7.1 Fix TypeScript Any Types
```tsx
// servicesWeProvide.tsx - Line 179-180
// Change:
const flipState = useRef<any>(null);
// To:
const flipState = useRef<Flip.FlipState | null>(null);

// ScrollReveal.tsx - Line 506-507
// Add proper typing for cloneElement
```

#### 7.2 Use Next.js Image Component Everywhere
```tsx
// about/page.tsx - Lines 98-103
// Change <img> to <Image>
import Image from 'next/image';

<Image
  src="/assets/aboutus/akella.jpeg"
  alt="Founder"
  fill
  className="object-cover object-top"
/>
```

#### 7.3 Add AOS Cleanup
If keeping AOS (not recommended per Stage 5):
```tsx
// LandingPage.tsx
useEffect(() => {
  AOS.init({...});

  return () => {
    // AOS doesn't have a destroy method, but we can remove observers
    const aosElements = document.querySelectorAll('[data-aos]');
    aosElements.forEach(el => {
      el.removeAttribute('data-aos');
      el.removeAttribute('data-aos-delay');
    });
  };
}, []);
```

#### 7.4 Extract Constants
Move hardcoded data to separate files:
```
src/
  data/
    services.ts      # Service definitions from servicesWeProvide.tsx
    testimonials.ts  # Testimonials from LandingPage.tsx
    faqs.ts          # FAQs from LandingPage.tsx
    styles.ts        # Style definitions from StyleShowcase.tsx
```

#### 7.5 Add Error Boundaries
```tsx
// src/components/ErrorBoundary.tsx
'use client';

import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <div>Something went wrong.</div>;
    }
    return this.props.children;
  }
}
```

### Acceptance Criteria
- [ ] No ESLint warnings/errors
- [ ] No TypeScript `any` types
- [ ] All `<img>` replaced with `<Image>`
- [ ] Constants extracted to data files
- [ ] Error boundaries around dynamic components

---

## Implementation Order Recommendation

```
Week 1: Stage 1 (Navigation) + Stage 2 (Styles)
         └── Critical fixes, immediate impact

Week 2: Stage 3 (Accessibility)
         └── Important for users and compliance

Week 3: Stage 4 (Images) + Stage 5 (Performance)
         └── Loading speed improvements

Week 4: Stage 6 (SEO) + Stage 7 (Code Quality)
         └── Discoverability and maintainability
```

---

## Testing Checklist

After each stage, verify:

- [ ] Site builds without errors (`npm run build`)
- [ ] No console errors in browser
- [ ] All navigation links work
- [ ] Mobile responsive behavior intact
- [ ] Animations still working
- [ ] Modal previews functional
- [ ] Form/email links working

---

## Resources

- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Schema.org LocalBusiness](https://schema.org/LocalBusiness)
- [OpenGraph Protocol](https://ogp.me/)
- [GSAP Documentation](https://greensock.com/docs/)

---

*Plan created based on WEBSITE_ANALYSIS_REPORT.md*
