# Stage 3: Accessibility Improvements

**Priority:** HIGH
**Estimated Effort:** 3-4 hours
**Dependencies:** None

---

## Overview

The site has several accessibility issues that prevent keyboard users and screen reader users from fully interacting with the content.

---

## Files to Modify

- `src/app/layout.tsx`
- `src/app/globals.css`
- `src/components/LandingPage.tsx`
- `src/components/servicesWeProvide.tsx`
- `src/components/StyleShowcase.tsx`
- `src/components/ScrollReveal.tsx`

---

## Task 3.1: Add Skip to Content Link

### Update `layout.tsx`

```tsx
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${plusJakartaSans.variable} ${jetBrainsMono.variable} antialiased bg-white text-[#1a1a1a]`}
      >
        {/* Skip to content link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-[#1a1a1a] focus:text-white focus:rounded-lg focus:outline-none"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
```

### Update `LandingPage.tsx` - Add main content ID

```tsx
// Around line 599, add id to hero section:
<section id="main-content" className="relative min-h-screen flex items-center justify-center px-4 pt-24 pb-20">
```

---

## Task 3.2: Make FAQ Accordion Keyboard Accessible

### Update `LandingPage.tsx` - FAQ Section (~line 1004-1026)

```tsx
{/* FAQ Section */}
<section className="py-32 px-4 bg-[#fafafa]">
  <div className="max-w-3xl mx-auto">
    <div className="text-center mb-16">
      <p data-aos="fade-up" className="text-xs tracking-[0.3em] uppercase text-[#888888] mb-4">FAQ</p>
      <h2 data-aos="fade-up" data-aos-delay="100" className="text-4xl sm:text-5xl font-bold tracking-tight text-[#1a1a1a]">Questions.</h2>
    </div>

    <div data-aos="fade-up" data-aos-delay="200" className="space-y-0" role="list">
      {[
        { q: "What if my project scope changes?", a: "We discuss it openly. Any scope changes get documented and quoted before we proceed. No surprises." },
        { q: "Do you offer ongoing support?", a: "Training included. Maintenance packages from €150/month if you need us on standby." },
        { q: "AI code rescue—will you judge me?", a: "Never. AI tools are impressive—you got further than most. We're here to finish it, not critique." },
        { q: "How fast can you deliver?", a: "Landing pages: 1-2 weeks. Business sites: 2-4 weeks. AI rescue: often days." },
        { q: "What's your tech stack?", a: "React, Next.js, TypeScript, Django. Modern tools that scale." }
      ].map((faq, index) => (
        <div
          key={index}
          className="border-b border-[#e0e0e0] last:border-none"
          role="listitem"
        >
          <button
            type="button"
            className="w-full py-6 cursor-pointer group flex items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1a1a1a] focus-visible:ring-offset-2 rounded-lg"
            onClick={() => toggleFaq(index)}
            aria-expanded={openFaq === index}
            aria-controls={`faq-answer-${index}`}
          >
            <h3 className="font-medium text-[#1a1a1a] text-lg pr-4">{faq.q}</h3>
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center transition-colors group-hover:bg-[#1a1a1a] flex-shrink-0">
              {openFaq === index ?
                <Minus className="w-4 h-4 text-[#1a1a1a] group-hover:text-white transition-colors" /> :
                <Plus className="w-4 h-4 text-[#1a1a1a] group-hover:text-white transition-colors" />
              }
            </div>
          </button>
          <div
            id={`faq-answer-${index}`}
            className={`overflow-hidden transition-all duration-300 ${openFaq === index ? 'max-h-40 pb-6' : 'max-h-0'}`}
            role="region"
            aria-labelledby={`faq-question-${index}`}
          >
            <p className="text-[#666666] leading-relaxed">{faq.a}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
```

---

## Task 3.3: Make Service Cards Keyboard Accessible

### Update `servicesWeProvide.tsx` - Overview Mode Cards (~line 257-291)

```tsx
{!selectedId && servicesData.map((service, index) => {
  const isLarge = service.size === "large";
  const isMedium = service.size === "medium";
  const spanClass = isLarge
    ? "md:col-span-2"
    : isMedium
      ? "md:col-span-1 md:row-span-2"
      : "md:col-span-1";

  return (
    <div
      key={service.id}
      data-flip-id={`card-${service.id}`}
      className={`bento-item group relative bg-[#fafafa] rounded-3xl p-8 border border-transparent hover:border-[#1a1a1a] hover:shadow-xl cursor-pointer flex flex-col justify-between overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1a1a1a] focus-visible:ring-offset-2 ${spanClass}`}
      onClick={() => toggleService(service.id)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleService(service.id);
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`${service.title} - from ${formatPrice(service.price)}. Click to see details.`}
    >
      {/* ... rest of card content ... */}
    </div>
  );
})}
```

---

## Task 3.4: Add Reduced Motion Support

### Update `globals.css`

```css
/* Reduced Motion Support */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }

  .animate-marquee,
  .animate-marquee-slow {
    animation: none !important;
  }

  .hero-load-badge,
  .hero-load-headline-1,
  .hero-load-headline-2,
  .hero-load-subtitle,
  .hero-load-cta,
  .hero-load-stat-1,
  .hero-load-stat-2,
  .hero-load-stat-3,
  .bento-load-1,
  .bento-load-2,
  .bento-load-3,
  .bento-load-4,
  .bento-load-5,
  .bento-load-6,
  .nav-load {
    animation: none !important;
    opacity: 1 !important;
    transform: none !important;
  }

  .orb {
    animation: none !important;
  }
}
```

---

## Task 3.5: Add Focus Visible Styles

### Update `globals.css`

```css
@layer utilities {
  /* Focus Visible Styles */
  :focus {
    outline: none;
  }

  :focus-visible {
    outline: 2px solid #1a1a1a;
    outline-offset: 2px;
    border-radius: 4px;
  }

  /* Custom focus styles for specific elements */
  a:focus-visible,
  button:focus-visible,
  [role="button"]:focus-visible {
    outline: 2px solid #1a1a1a;
    outline-offset: 2px;
  }

  /* Remove focus outline on mouse click, keep for keyboard */
  .focus-visible-only:focus:not(:focus-visible) {
    outline: none;
  }
}
```

---

## Task 3.6: Fix Image Alt Text in ScrollReveal

### Update `ScrollReveal.tsx` (~line 479-494)

```tsx
{images.slice(0, 9).map((img, i) => (
  <div
    key={`grid-${i}`}
    ref={(el) => { gridItemsRef.current[i] = el; }}
    className="sr-grid-item"
    onClick={() => onImageClick?.(img, i)}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onImageClick?.(img, i);
      }
    }}
    role="button"
    tabIndex={0}
    aria-label={`View ${img.label || 'portfolio example'}`}
  >
    <img
      src={img.src}
      alt={img.alt || img.label || 'Portfolio website example'}
      loading="lazy"
    />
    {showLabels && img.label && (
      <div className="sr-label">{img.label}</div>
    )}
    <div className="sr-preview-overlay" aria-hidden="true">
      <span className="sr-preview-text">Click to Preview</span>
    </div>
  </div>
))}
```

---

## Task 3.7: Make Style Showcase Cards Keyboard Accessible

### Update `StyleShowcase.tsx` (~line 162-218)

```tsx
{styles.map((style, index) => (
  <div
    key={style.id}
    data-aos="fade-up"
    data-aos-delay={index * 50}
    className={`group relative rounded-xl overflow-hidden cursor-pointer transition-all duration-500 border border-[#e0e0e0] hover:border-transparent hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1a1a1a] focus-visible:ring-offset-2 ${style.span}`}
    onClick={(e) => handleCardClick(style, index, e)}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleCardClick(style, index, e as unknown as React.MouseEvent);
      }
    }}
    role="button"
    tabIndex={0}
    aria-label={`${style.title} - ${style.category} style. ${style.description}`}
  >
    {/* ... rest of card content ... */}
  </div>
))}
```

---

## Task 3.8: Add ARIA Labels to Interactive Elements

### Update various components:

```tsx
// Mobile menu button (already has aria-label - good!)
<button aria-label="Toggle menu">

// Modal close button (LandingPage.tsx ~954)
<button
  onClick={closeExample}
  className="..."
  aria-label="Close preview"
>

// Vibe Rescue CTA card (LandingPage.tsx ~747)
<div
  className="..."
  onClick={() => window.location.href='#contact'}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      window.location.href='#contact';
    }
  }}
  role="button"
  tabIndex={0}
  aria-label="Send your project for Vibe Rescue"
>
```

---

## Acceptance Criteria

- [ ] Skip link appears on Tab and jumps to main content
- [ ] FAQ can be navigated and toggled with keyboard only
- [ ] Service cards can be selected with keyboard
- [ ] Style showcase cards can be previewed with keyboard
- [ ] All focus states are clearly visible
- [ ] Animations respect `prefers-reduced-motion`
- [ ] Screen reader announces meaningful content for all interactive elements
- [ ] No keyboard traps in modals

---

## Testing

### Keyboard Navigation Test
1. Press Tab from page load - skip link should appear
2. Continue Tab through nav links
3. Tab to FAQ section, use Enter/Space to open/close
4. Tab to service cards, use Enter to select
5. Tab through style showcase cards

### Screen Reader Test (VoiceOver/NVDA)
1. Verify skip link is announced
2. Verify FAQ questions are announced with expand/collapse state
3. Verify service cards announce their content and role
4. Verify images have meaningful alt text

### Reduced Motion Test
1. Enable "Reduce motion" in OS accessibility settings
2. Reload page - verify no animations play
3. Verify marquee is static
4. Verify page is fully functional without animations

---

## Notes

- Use `aria-expanded` for expandable content (FAQ, dropdowns)
- Use `aria-controls` to link buttons to the content they control
- Use `role="button"` with `tabIndex={0}` for clickable non-button elements
- Always provide keyboard alternatives for click handlers
