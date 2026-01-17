# Stage 4: Image Optimization

**Priority:** MEDIUM
**Estimated Effort:** 2-3 hours
**Dependencies:** None

---

## Overview

The site uses a mix of local and external images without consistent optimization. This stage addresses:
- External images not using Next.js Image optimization
- Missing lazy loading
- Layout shift from unspecified dimensions
- External font loaded in component

---

## Files to Modify

- `next.config.ts`
- `src/components/LandingPage.tsx`
- `src/components/StyleShowcase.tsx`
- `src/components/ScrollReveal.tsx`
- `src/app/about/page.tsx`
- `src/components/websitesExamples/Architect.tsx`

---

## Task 4.1: Configure Next.js for External Images

### Update `next.config.ts`

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
    // Optional: Add image optimization settings
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },
};

export default nextConfig;
```

---

## Task 4.2: Update About Page Images

### Replace `<img>` with `<Image>` in `about/page.tsx`

```tsx
// Add import at top
import Image from 'next/image';

// Founder Photo (~line 96-109)
// Change from:
<img
  src="/assets/aboutus/akella.jpeg"
  alt="Founder"
  className="absolute inset-0 w-full h-full object-cover object-top"
/>

// To:
<Image
  src="/assets/aboutus/akella.jpeg"
  alt="Akella - Founder & Lead Developer"
  fill
  sizes="(max-width: 768px) 100vw, 33vw"
  className="object-cover object-top"
  priority
/>

// AI Challenge Banner (~line 157-162)
// Change from:
<img
  src="/assets/aboutus/AI CHALLENGE.png"
  alt="TechIreland National AI Challenge"
  className="absolute inset-0 w-full h-full object-cover object-center"
/>

// To:
<Image
  src="/assets/aboutus/AI CHALLENGE.png"
  alt="TechIreland National AI Challenge 2025 Winner"
  fill
  sizes="100vw"
  className="object-cover object-center"
/>

// Company logos in journey section - use Image with explicit dimensions
<Image
  src="/assets/aboutus/UKIO BANKAS.png"
  alt="Ukio Bankas"
  width={100}
  height={35}
  className="object-contain grayscale group-hover:grayscale-0 transition-all"
/>
```

---

## Task 4.3: Optimize Tech Stack Marquee Images

### Update `LandingPage.tsx` (~line 652-668)

The tech logos are SVGs which are already optimized, but we can improve:

```tsx
// Add import at top
import Image from 'next/image';

// Tech Stack Marquee section
<section className="py-10 border-y border-black/5 overflow-hidden bg-white group">
  <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
    {[...Array(2)].map((_, i) => (
      <div key={i} className="flex flex-shrink-0 items-center gap-16 md:gap-48 pr-16 md:pr-48 whitespace-nowrap">
        <Image
          src="/assets/logos/react_light.svg"
          alt="React"
          width={64}
          height={64}
          className="flex-shrink-0 grayscale opacity-30 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
        />
        <Image
          src="/assets/logos/nextjs_logo_light.svg"
          alt="Next.js"
          width={80}
          height={32}
          className="flex-shrink-0 grayscale opacity-30 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
        />
        {/* Continue for all logos... */}
      </div>
    ))}
  </div>
</section>
```

---

## Task 4.4: Download External Images Locally (Recommended)

External Unsplash images are used in:
- `StyleShowcase.tsx`
- `Architect.tsx`

### Option A: Download and host locally

1. Create directory: `/public/assets/portfolio/`

2. Download images used in `StyleShowcase.tsx`:
```bash
# Example - download these images:
# https://images.unsplash.com/photo-1460925895917-afdab827c52f (SaaS)
# https://images.unsplash.com/photo-1600585154340-be6161a56a0c (Architecture)
# etc.

# Save as:
/public/assets/portfolio/saas-glass.jpg
/public/assets/portfolio/architecture-minimal.jpg
/public/assets/portfolio/fitness-gradient.jpg
/public/assets/portfolio/wellness-organic.jpg
/public/assets/portfolio/barber-premium.jpg
/public/assets/portfolio/hospitality-luxury.jpg
/public/assets/portfolio/consulting-modern.jpg
/public/assets/portfolio/artisan-vintage.jpg
```

3. Update `StyleShowcase.tsx`:
```tsx
const styles: StyleItem[] = [
  {
    id: 'flowdesk',
    title: 'Glassmorphism',
    // Change from:
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f...',
    // To:
    image: '/assets/portfolio/saas-glass.jpg',
    // ...
  },
  // ... update all
];
```

### Option B: Keep external but optimize

If keeping external images, ensure proper loading:

```tsx
// StyleShowcase.tsx - Update background image usage
<div
  className={`absolute inset-0 bg-cover bg-center transition-transform duration-700 ${activeCardId === style.id ? 'scale-105' : 'group-hover:scale-105'}`}
  style={{
    backgroundImage: `url(${style.image})`,
    // Add loading optimization
  }}
  role="img"
  aria-label={style.title}
/>
```

---

## Task 4.5: Add Lazy Loading to ScrollReveal Images

### Update `ScrollReveal.tsx` (~line 479-494)

```tsx
{images.slice(0, 9).map((img, i) => (
  <div
    key={`grid-${i}`}
    ref={(el) => { gridItemsRef.current[i] = el; }}
    className="sr-grid-item"
    onClick={() => onImageClick?.(img, i)}
    role="button"
    tabIndex={0}
  >
    <img
      src={img.src}
      alt={img.alt || img.label || 'Portfolio example'}
      loading="lazy"
      decoding="async"
      // Add dimensions to prevent layout shift
      style={{ aspectRatio: '16/9' }}
    />
    {/* ... rest */}
  </div>
))}
```

---

## Task 4.6: Remove External Font from Architect Component

### Update `Architect.tsx`

```tsx
// Remove from injectStyles function (~line 13):
// DELETE THIS LINE:
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');

// Update the wrapper style to use the site's font:
// Change from:
<div className="architect-wrapper" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", ... }}>

// To (uses site's Plus Jakarta Sans via CSS variable):
<div className="architect-wrapper" style={{ fontFamily: "var(--font-sans), 'Helvetica Neue', Helvetica, Arial, sans-serif", ... }}>
```

---

## Task 4.7: Create Blur Placeholder Images (Optional Enhancement)

### Generate blur data URLs for key images

```tsx
// For hero images, add blur placeholder
<Image
  src="/assets/aboutus/akella.jpeg"
  alt="Founder"
  fill
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRg..." // Generate this
/>
```

### Generate blur placeholders script (optional):
```javascript
// scripts/generate-blur.js
const { getPlaiceholder } = require('plaiceholder');
const fs = require('fs');

async function generateBlur(imagePath) {
  const file = fs.readFileSync(imagePath);
  const { base64 } = await getPlaiceholder(file);
  console.log(`${imagePath}: ${base64}`);
}
```

---

## Image Inventory

### Local Images (Already Optimized)
| Path | Used In | Status |
|------|---------|--------|
| `/assets/logos/*.svg` | LandingPage | OK (SVG) |
| `/assets/aboutus/*.png` | About page | Needs `<Image>` |
| `/assets/*.png` | GSAPDemo | OK |

### External Images (Need Attention)
| URL Pattern | Used In | Action |
|-------------|---------|--------|
| `images.unsplash.com/*` | StyleShowcase | Download locally or keep with config |
| `images.unsplash.com/*` | Architect | Download locally or keep with config |

---

## Acceptance Criteria

- [ ] `next.config.ts` allows Unsplash images
- [ ] About page uses `<Image>` component
- [ ] Tech stack logos use `<Image>` with dimensions
- [ ] All images have meaningful alt text
- [ ] ScrollReveal images have `loading="lazy"`
- [ ] No external font requests from components
- [ ] No layout shift when images load
- [ ] Build succeeds with no image errors

---

## Testing

1. Run `npm run build` - check for image optimization warnings
2. Open Network tab in DevTools:
   - Verify images load with WebP/AVIF format
   - Verify lazy loading works (images load on scroll)
3. Run Lighthouse audit - check "Properly size images"
4. Test on slow connection - verify placeholders appear

---

## Performance Impact

| Metric | Before | After (Expected) |
|--------|--------|------------------|
| Image requests | Mixed formats | WebP/AVIF |
| Initial load | All images | Lazy loaded |
| Layout shift | Present | Eliminated |
| External requests | Multiple | Reduced |

---

## Notes

- Next.js Image component automatically optimizes images
- SVG files don't need optimization but should have width/height
- Consider using blur placeholders for above-the-fold images
- External images require `remotePatterns` configuration
