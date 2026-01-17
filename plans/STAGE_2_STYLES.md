# Stage 2: Consolidate Duplicate Styles

**Priority:** HIGH
**Estimated Effort:** 1-2 hours
**Dependencies:** None

---

## Overview

The same CSS classes are defined in multiple places, causing:
- Potential style conflicts
- Larger bundle size
- Harder maintenance

---

## Files to Modify

- `src/app/globals.css`
- `src/components/LandingPage.tsx`
- `src/app/about/page.tsx`

---

## Task 2.1: Identify Duplicates

### Classes Defined in Multiple Places

| Class | `globals.css` | `LandingPage.tsx` | `about/page.tsx` |
|-------|:-------------:|:-----------------:|:----------------:|
| `.glass` | ✓ | ✓ | - |
| `.glass-strong` | ✓ | ✓ | ✓ |
| `.gradient-text` | ✓ | ✓ | - |
| `.gradient-text-color` | ✓ | ✓ | - |
| `.btn-primary` | ✓ | ✓ | - |
| `.btn-secondary` | ✓ | ✓ | - |
| `.service-card` | ✓ | ✓ | - |
| `.pricing-card` | ✓ | ✓ | - |
| `.animate-marquee` | ✓ | ✓ | - |
| `.animate-marquee-slow` | ✓ | ✓ | - |
| `.vibe-card` | ✓ | ✓ | - |
| `.faq-item` | ✓ | ✓ | - |
| `.process-line` | ✓ | ✓ | - |
| `.hero-gradient` | ✓ | ✓ | - |
| `.orb` / `.orb-1,2,3` | ✓ | ✓ | - |
| `.grid-pattern` | ✓ | ✓ | - |

---

## Task 2.2: Clean Up LandingPage.tsx

### Remove from `customStyles` constant (keep only animations):

**KEEP these (animation-specific):**
```css
/* Hero load animations */
@keyframes slideInFromTop { ... }
@keyframes slideInFromBottom { ... }
@keyframes slideInFromLeft { ... }
@keyframes slideInFromRight { ... }
@keyframes scaleIn { ... }
@keyframes fadeInUp { ... }

.hero-load-badge { ... }
.hero-load-headline-1 { ... }
.hero-load-headline-2 { ... }
.hero-load-subtitle { ... }
.hero-load-cta { ... }
.hero-load-stat-1 { ... }
.hero-load-stat-2 { ... }
.hero-load-stat-3 { ... }

/* Bento load animations */
.bento-load-1 { ... }
.bento-load-2 { ... }
.bento-load-3 { ... }
.bento-load-4 { ... }
.bento-load-5 { ... }
.bento-load-6 { ... }

/* Nav load */
.nav-load { ... }
```

**REMOVE these (already in globals.css):**
```css
/* DELETE - Already in globals.css */
.hero-gradient { ... }
.grid-pattern { ... }
.orb { ... }
.orb-1 { ... }
.orb-2 { ... }
.orb-3 { ... }
@keyframes float { ... }
.glass { ... }
.glass-strong { ... }
.gradient-text { ... }
.gradient-text-color { ... }
.service-card { ... }
.btn-primary { ... }
.btn-secondary { ... }
.pricing-card { ... }
@keyframes marquee { ... }
.animate-marquee { ... }
.animate-marquee-slow { ... }
.process-line { ... }
.vibe-card { ... }
@keyframes bounce-slow { ... }
.animate-bounce-slow { ... }
.faq-item { ... }
.stat-number { ... }
```

### Updated `customStyles` constant:

```tsx
const customStyles = `
  /* Initial load animations */
  @keyframes slideInFromTop {
    from { opacity: 0; transform: translateY(-40px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes slideInFromBottom {
    from { opacity: 0; transform: translateY(40px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes slideInFromLeft {
    from { opacity: 0; transform: translateX(-40px); }
    to { opacity: 1; transform: translateX(0); }
  }

  @keyframes slideInFromRight {
    from { opacity: 0; transform: translateX(40px); }
    to { opacity: 1; transform: translateX(0); }
  }

  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.9); }
    to { opacity: 1; transform: scale(1); }
  }

  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .hero-load-badge {
    animation: slideInFromTop 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    animation-delay: 0.1s;
    opacity: 0;
  }

  .hero-load-headline-1 {
    animation: slideInFromLeft 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    animation-delay: 0.3s;
    opacity: 0;
  }

  .hero-load-headline-2 {
    animation: slideInFromRight 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    animation-delay: 0.5s;
    opacity: 0;
  }

  .hero-load-subtitle {
    animation: fadeInUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    animation-delay: 0.7s;
    opacity: 0;
  }

  .hero-load-cta {
    animation: scaleIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    animation-delay: 0.9s;
    opacity: 0;
  }

  .hero-load-stat-1 {
    animation: slideInFromBottom 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    animation-delay: 1.1s;
    opacity: 0;
  }

  .hero-load-stat-2 {
    animation: slideInFromBottom 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    animation-delay: 1.2s;
    opacity: 0;
  }

  .hero-load-stat-3 {
    animation: slideInFromBottom 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    animation-delay: 1.3s;
    opacity: 0;
  }

  /* Bento grid load animations */
  .bento-load-1 { animation: slideInFromLeft 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
  .bento-load-2 { animation: slideInFromTop 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; animation-delay: 0.1s; opacity: 0; }
  .bento-load-3 { animation: slideInFromRight 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; animation-delay: 0.15s; opacity: 0; }
  .bento-load-4 { animation: slideInFromBottom 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; animation-delay: 0.2s; opacity: 0; }
  .bento-load-5 { animation: scaleIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; animation-delay: 0.25s; opacity: 0; }
  .bento-load-6 { animation: slideInFromRight 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; animation-delay: 0.3s; opacity: 0; }

  /* Navigation load animation */
  .nav-load {
    animation: slideInFromTop 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    opacity: 0;
  }
`;
```

---

## Task 2.3: Remove Inline Style from About Page

```tsx
// about/page.tsx

// DELETE lines 291-297:
<style dangerouslySetInnerHTML={{ __html: `
  .glass-strong {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(40px);
    -webkit-backdrop-filter: blur(40px);
  }
`}} />

// The .glass-strong class is already defined in globals.css
```

---

## Task 2.4: Standardize Color Values

### Update `globals.css` theme section:

```css
@theme {
  --font-sans: var(--font-sans);
  --font-mono: var(--font-mono);

  /* Standardized Colors */
  --color-primary: #1a1a1a;
  --color-primary-hover: #333333;
  --color-text: #1a1a1a;
  --color-text-secondary: #666666;    /* NOT #737373 */
  --color-text-muted: #888888;
  --color-background: #ffffff;
  --color-background-alt: #fafafa;
  --color-background-dark: #f8f8f8;
  --color-border: #e0e0e0;            /* NOT #e5e5e5 */
  --color-border-light: #f0f0f0;
  --color-accent-green: #27ca3f;
}
```

### Use CSS Variables Instead of Hardcoded Values

```tsx
// Instead of:
className="text-[#666666]"

// Consider using Tailwind extend or direct variable:
className="text-[var(--color-text-secondary)]"
```

---

## Task 2.5: Add Missing nav-load to globals.css

If not already present, add to `globals.css`:

```css
@layer utilities {
  /* Navigation load animation */
  .nav-load {
    animation: slideInFromTop 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    opacity: 0;
  }

  @keyframes slideInFromTop {
    from { opacity: 0; transform: translateY(-40px); }
    to { opacity: 1; transform: translateY(0); }
  }
}
```

---

## Acceptance Criteria

- [ ] `LandingPage.tsx` customStyles reduced to ~50 lines (animations only)
- [ ] No `<style>` tag in `about/page.tsx`
- [ ] All shared styles in `globals.css`
- [ ] No duplicate class definitions
- [ ] Site appearance unchanged after refactor
- [ ] Build succeeds with no errors

---

## Testing

1. Run `npm run build` - should complete without errors
2. Compare before/after screenshots of:
   - Homepage hero section
   - Services bento grid
   - About page
3. Verify all hover effects still work
4. Check glassmorphism effects on nav
5. Verify marquee animation works

---

## Notes

- Keep component-specific animations in components
- Shared utilities belong in `globals.css`
- Consider creating a `src/styles/animations.css` for complex animations in the future
