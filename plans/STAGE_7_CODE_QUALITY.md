# Stage 7: Code Quality & Cleanup

**Priority:** LOW
**Estimated Effort:** 2-3 hours
**Dependencies:** Stages 1-6 completed

---

## Overview

Final cleanup stage focusing on:
- TypeScript improvements
- Code organization
- Error handling
- Technical debt

---

## Files to Modify

- Various component files
- `src/data/` (new directory)
- `src/components/ErrorBoundary.tsx` (new file)

---

## Task 7.1: Fix TypeScript Any Types

### `servicesWeProvide.tsx` - Line 179-180

```tsx
// Before:
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const flipState = useRef<any>(null);

// After:
import { Flip } from 'gsap/dist/Flip';

// Define proper type (GSAP Flip.FlipState)
type FlipState = ReturnType<typeof Flip.getState>;
const flipState = useRef<FlipState | null>(null);
```

### `ScrollReveal.tsx` - Line 506-507

```tsx
// Before:
// eslint-disable-next-line @typescript-eslint/no-explicit-any
? React.cloneElement(centerContent as React.ReactElement<any>, { scrollProgress })

// After:
interface ScrollProgressProps {
  scrollProgress?: number;
}

// Use proper typing:
? React.cloneElement(
    centerContent as React.ReactElement<ScrollProgressProps>,
    { scrollProgress }
  )
```

---

## Task 7.2: Extract Data Constants

### Create `src/data/services.ts`

```typescript
export interface Addon {
  name: string;
  price: number;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  included: string[];
  addons: Addon[];
  size: "large" | "medium" | "small";
}

export const services: Service[] = [
  {
    id: "landing",
    title: "Landing Pages",
    description: "High-conversion single page sites designed to sell.",
    price: 800,
    size: "large",
    included: [
      "Custom responsive design",
      "Next.js single page",
      "Conversion form + spam protection",
      "Basic SEO & meta tags",
      "GA4 + GDPR cookie banner",
      "1 round of post-launch tweaks",
    ],
    addons: [
      { name: "Copywriting", price: 120 },
      { name: "Hero promo video (15s)", price: 400 },
      { name: "A/B variant setup", price: 640 },
      { name: "Heatmaps & recordings", price: 200 },
      { name: "Paid-ads hookup", price: 240 },
      { name: "Edge hosting + CDN (1yr)", price: 300 },
    ],
  },
  // ... rest of services
];
```

### Create `src/data/testimonials.ts`

```typescript
export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  initials: string;
}

export const testimonials: Testimonial[] = [
  {
    quote: "Saved our launch. Delivered in 5 days—better than we imagined.",
    author: "John D.",
    role: "Startup CEO",
    initials: "JD",
  },
  {
    quote: "Conversion rate jumped 40% in the first month. Incredible ROI.",
    author: "Sarah M.",
    role: "E-Commerce Founder",
    initials: "SM",
  },
  // ... rest of testimonials
];
```

### Create `src/data/faqs.ts`

```typescript
export interface FAQ {
  question: string;
  answer: string;
}

export const faqs: FAQ[] = [
  {
    question: "What if my project scope changes?",
    answer:
      "We discuss it openly. Any scope changes get documented and quoted before we proceed. No surprises.",
  },
  {
    question: "Do you offer ongoing support?",
    answer:
      "Training included. Maintenance packages from €150/month if you need us on standby.",
  },
  // ... rest of FAQs
];
```

### Create `src/data/styles.ts`

```typescript
import { Layers, Box, Type, Zap, Feather, Scissors, Crown, Briefcase, Coffee } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

export interface StyleItem {
  id: string;
  title: string;
  category: string;
  description: string;
  traits: string[];
  image: string;
  icon: LucideIcon;
  span: string;
  color: string;
}

export const styles: StyleItem[] = [
  {
    id: "flowdesk",
    title: "Glassmorphism",
    category: "SaaS",
    description:
      "Frosted glass cards floating over gradient mesh backgrounds. Translucent panels with blur effects.",
    traits: ["Frosted Glass", "Soft Shadows", "Gradient Mesh"],
    image: "/assets/portfolio/saas-glass.jpg",
    icon: Layers,
    span: "md:col-span-1",
    color: "#6366f1",
  },
  // ... rest of styles
];
```

### Update Components to Use Data Files

```tsx
// servicesWeProvide.tsx
import { services, type Service } from '@/data/services';

// LandingPage.tsx
import { testimonials } from '@/data/testimonials';
import { faqs } from '@/data/faqs';

// StyleShowcase.tsx
import { styles } from '@/data/styles';
```

---

## Task 7.3: Create Error Boundary Component

### Create `src/components/ErrorBoundary.tsx`

```tsx
'use client';

import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    // Optional: Send to error tracking service
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="min-h-[400px] flex items-center justify-center bg-[#fafafa] rounded-3xl">
            <div className="text-center p-8">
              <h2 className="text-xl font-semibold text-[#1a1a1a] mb-2">
                Something went wrong
              </h2>
              <p className="text-[#666666] mb-4">
                We're having trouble loading this section.
              </p>
              <button
                onClick={() => this.setState({ hasError: false })}
                className="px-4 py-2 bg-[#1a1a1a] text-white rounded-lg hover:bg-[#333333] transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
```

### Wrap Dynamic Components

```tsx
// LandingPage.tsx
import { ErrorBoundary } from './ErrorBoundary';

// Wrap potentially problematic sections
<ErrorBoundary fallback={<div className="py-24" />}>
  <ScrollReveal
    centerContent={<ShowDontTellAnimation scrollProgress={0} />}
    // ...
  />
</ErrorBoundary>

<ErrorBoundary>
  <ServicesCarousel onPreview={handleServicePreview} />
</ErrorBoundary>
```

---

## Task 7.4: Use Next.js Image Everywhere

### `about/page.tsx`

```tsx
// Change all <img> to <Image>
import Image from 'next/image';

// Example:
<Image
  src="/assets/aboutus/akella.jpeg"
  alt="Akella - Founder & Lead Developer"
  fill
  sizes="(max-width: 768px) 100vw, 33vw"
  className="object-cover object-top"
  priority
/>
```

### Remove ESLint Disable Comments

```tsx
// DELETE these lines:
// eslint-disable-next-line @next/next/no-img-element
```

---

## Task 7.5: Add Proper Event Handler Types

### Fix onClick handlers

```tsx
// Before:
onClick={() => window.location.href='#contact'}

// After (better practice):
onClick={() => {
  const contactSection = document.getElementById('contact');
  contactSection?.scrollIntoView({ behavior: 'smooth' });
}}

// Or use Link:
import Link from 'next/link';
<Link href="#contact">...</Link>
```

---

## Task 7.6: Create Utility Functions

### Create `src/lib/utils.ts`

```typescript
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Merge Tailwind classes safely
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format price
export function formatPrice(amount: number, currency = '€'): string {
  return `${currency}${amount.toLocaleString()}`;
}

// Format date
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-IE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

// Smooth scroll to element
export function scrollToElement(id: string): void {
  const element = document.getElementById(id);
  element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
```

### Update Components to Use Utils

```tsx
// servicesWeProvide.tsx
import { formatPrice } from '@/lib/utils';

// Instead of inline function:
// function formatPrice(n: number) {
//   return `€${n.toLocaleString()}`;
// }
```

---

## Task 7.7: Add Loading States

### Create `src/components/ui/Skeleton.tsx`

```tsx
interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-[#e0e0e0] rounded ${className}`}
      aria-hidden="true"
    />
  );
}

// Card skeleton
export function CardSkeleton() {
  return (
    <div className="bg-[#fafafa] rounded-3xl p-8 border border-[#e0e0e0]">
      <Skeleton className="h-6 w-24 mb-4" />
      <Skeleton className="h-8 w-48 mb-2" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  );
}
```

---

## Task 7.8: Clean Up Console Logs

Search and remove any console.log statements:

```bash
# Find all console.log in src
grep -r "console.log" src/
```

Replace with proper error handling or remove entirely.

---

## Final Project Structure

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── about/
│   │   └── page.tsx
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── Navigation.tsx          # Shared nav
│   ├── LandingPage.tsx
│   ├── ErrorBoundary.tsx
│   ├── ScrollReveal.tsx
│   ├── StyleShowcase.tsx
│   ├── ShowDontTellAnimation.tsx
│   ├── servicesWeProvide.tsx
│   ├── ui/
│   │   └── Skeleton.tsx
│   └── websitesExamples/
│       └── *.tsx
├── data/
│   ├── services.ts
│   ├── testimonials.ts
│   ├── faqs.ts
│   └── styles.ts
├── hooks/
│   └── useScrollReveal.ts
└── lib/
    └── utils.ts
```

---

## Acceptance Criteria

- [ ] No TypeScript `any` types
- [ ] No ESLint disable comments (except justified ones)
- [ ] All `<img>` replaced with `<Image>`
- [ ] Data extracted to `/data` directory
- [ ] Utility functions in `/lib/utils.ts`
- [ ] Error boundaries around dynamic components
- [ ] No console.log statements in production code
- [ ] Clean, consistent code style

---

## Testing

1. Run `npm run lint` - should pass with no errors
2. Run `npm run build` - should complete successfully
3. Run `npx tsc --noEmit` - no TypeScript errors
4. Test error boundary by forcing an error
5. Verify all features still work after refactoring

---

## Code Review Checklist

- [ ] Consistent naming conventions
- [ ] Proper TypeScript types throughout
- [ ] No unused imports or variables
- [ ] Proper error handling
- [ ] Accessible interactive elements
- [ ] Performance considerations (lazy loading, memoization)
- [ ] Responsive design maintained
- [ ] Clean git history (squash commits if needed)

---

## Notes

- This stage is about maintainability and developer experience
- Don't break working functionality for "clean code"
- Consider adding unit tests in a future stage
- Document any non-obvious code decisions
