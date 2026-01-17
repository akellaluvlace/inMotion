# Stage 6: SEO & Metadata Enhancements

**Priority:** MEDIUM
**Estimated Effort:** 1-2 hours
**Dependencies:** None

---

## Overview

The site has basic metadata but is missing:
- OpenGraph tags for social sharing
- Twitter Card metadata
- JSON-LD structured data
- Page-specific metadata
- Canonical URLs

---

## Files to Modify

- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/app/about/page.tsx`
- `/public/og-image.png` (create)

---

## Task 6.1: Create OpenGraph Image

### Design Specifications

Create `/public/og-image.png`:
- **Dimensions:** 1200 x 630 pixels
- **Content:**
  - Logo "Akella inMotion"
  - Tagline: "Websites that convert"
  - Location: "Dublin Web Studio"
  - Brand colors: #1a1a1a, #ffffff, #27ca3f accent

### Alternative: Use Vercel OG Image Generation

```tsx
// src/app/api/og/route.tsx (optional - dynamic OG images)
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#1a1a1a',
        }}
      >
        <div style={{ color: 'white', fontSize: 60, fontWeight: 'bold' }}>
          Akella inMotion
        </div>
        <div style={{ color: '#888888', fontSize: 30, marginTop: 20 }}>
          Dublin Web Development Studio
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
```

---

## Task 6.2: Update Root Layout Metadata

### Update `src/app/layout.tsx`

```tsx
import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  // Basic Metadata
  title: {
    default: "Akella inMotion — Dublin Web Development Studio",
    template: "%s | Akella inMotion",
  },
  description:
    "Dublin web development studio specializing in landing pages, business websites & AI project rescue. Transparent pricing, 10+ years experience, 20% below agency rates.",
  keywords: [
    "web development Dublin",
    "web design Ireland",
    "Next.js developer",
    "React developer Dublin",
    "landing page design",
    "business website",
    "AI code rescue",
    "vibe coding",
    "website development",
  ],
  authors: [{ name: "Akella inMotion", url: "https://akellainmotion.ie" }],
  creator: "Akella inMotion",
  publisher: "Akella inMotion",

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Icons
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  // OpenGraph
  openGraph: {
    type: "website",
    locale: "en_IE",
    url: "https://akellainmotion.ie",
    siteName: "Akella inMotion",
    title: "Akella inMotion — Dublin Web Development Studio",
    description:
      "Dublin web development studio. Landing pages, business websites & AI project rescue. Transparent pricing, 10+ years experience.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Akella inMotion - Dublin Web Development Studio",
        type: "image/png",
      },
    ],
  },

  // Twitter
  twitter: {
    card: "summary_large_image",
    title: "Akella inMotion — Dublin Web Development Studio",
    description:
      "Dublin web development studio. Landing pages, business websites & AI project rescue.",
    images: ["/og-image.png"],
    creator: "@akellainmotion", // Add if you have Twitter
  },

  // Verification (add your IDs when available)
  // verification: {
  //   google: "google-site-verification-id",
  // },

  // Alternate languages (if applicable)
  // alternates: {
  //   canonical: "https://akellainmotion.ie",
  // },

  // Category
  category: "technology",
};

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
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-[#1a1a1a] focus:text-white focus:rounded-lg"
        >
          Skip to main content
        </a>

        {children}

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": "https://akellainmotion.ie",
              name: "Akella inMotion",
              description:
                "Dublin web development studio specializing in landing pages, business websites & AI project rescue.",
              url: "https://akellainmotion.ie",
              email: "hello@akellainmotion.ie",
              telephone: "", // Add when available
              address: {
                "@type": "PostalAddress",
                addressLocality: "Dublin",
                addressCountry: "IE",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 53.3498,
                longitude: -6.2603,
              },
              priceRange: "$$",
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                opens: "09:00",
                closes: "18:00",
              },
              sameAs: [
                // Add social media URLs when available
                // "https://twitter.com/akellainmotion",
                // "https://linkedin.com/company/akellainmotion",
              ],
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Web Development Services",
                itemListElement: [
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Landing Pages",
                      description: "High-conversion single page sites",
                    },
                    price: "800",
                    priceCurrency: "EUR",
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Business Websites",
                      description: "Complete digital presence for growing companies",
                    },
                    price: "1200",
                    priceCurrency: "EUR",
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "AI Code Rescue",
                      description: "We finish AI-generated projects",
                    },
                    price: "200",
                    priceCurrency: "EUR",
                  },
                ],
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
```

---

## Task 6.3: Add About Page Metadata

### Update `src/app/about/page.tsx`

```tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet the team behind Akella inMotion. 10+ years experience in web development, TechIreland AI Challenge 2025 winner. Bridging Baltic engineering excellence with Irish innovation.",
  openGraph: {
    title: "About | Akella inMotion",
    description:
      "Meet the founder of Akella inMotion. From enterprise infrastructure to AI innovation.",
    images: ["/og-image.png"],
  },
  twitter: {
    title: "About | Akella inMotion",
    description:
      "Meet the founder of Akella inMotion. From enterprise infrastructure to AI innovation.",
  },
};

export default function AboutPage() {
  // ... component code
}
```

---

## Task 6.4: Add Service-Specific Structured Data (Optional)

### Add to relevant sections or create dedicated pages

```tsx
// For a future /services page
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Web Development",
  provider: {
    "@type": "LocalBusiness",
    name: "Akella inMotion",
  },
  areaServed: {
    "@type": "Country",
    name: "Ireland",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Web Development Services",
    itemListElement: [
      // ... services
    ],
  },
};
```

---

## Task 6.5: Add FAQ Structured Data

### Update FAQ section in `LandingPage.tsx`

```tsx
// Add JSON-LD for FAQ
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What if my project scope changes?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We discuss it openly. Any scope changes get documented and quoted before we proceed. No surprises.",
      },
    },
    {
      "@type": "Question",
      name: "Do you offer ongoing support?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Training included. Maintenance packages from €150/month if you need us on standby.",
      },
    },
    // ... add all FAQs
  ],
};

// Add to component JSX (before closing div)
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
/>
```

---

## Task 6.6: Create Sitemap

### Create `src/app/sitemap.ts`

```typescript
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://akellainmotion.ie";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    // Add more pages as they're created
  ];
}
```

---

## Task 6.7: Create Robots.txt

### Create `src/app/robots.ts`

```typescript
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/_next/"],
    },
    sitemap: "https://akellainmotion.ie/sitemap.xml",
  };
}
```

---

## Files to Create

| File | Purpose |
|------|---------|
| `/public/og-image.png` | OpenGraph social sharing image |
| `/public/apple-touch-icon.png` | iOS home screen icon |
| `src/app/sitemap.ts` | Dynamic sitemap |
| `src/app/robots.ts` | Robots.txt rules |

---

## Acceptance Criteria

- [ ] OpenGraph image created and referenced
- [ ] Metadata shows correctly in browser tab
- [ ] Social sharing preview works (test with https://metatags.io)
- [ ] JSON-LD validates in Google's Rich Results Test
- [ ] Sitemap accessible at /sitemap.xml
- [ ] Robots.txt accessible at /robots.txt
- [ ] About page has unique title and description

---

## Testing

1. **Meta Tags:** Use https://metatags.io to preview
2. **OpenGraph:** Share link on LinkedIn/Twitter to test preview
3. **Structured Data:** Use https://search.google.com/test/rich-results
4. **Sitemap:** Visit https://yourdomain.com/sitemap.xml
5. **Lighthouse SEO:** Run Lighthouse audit, check SEO score

---

## SEO Checklist

| Item | Status |
|------|--------|
| Title tag (50-60 chars) | ✓ Implemented |
| Meta description (150-160 chars) | ✓ Implemented |
| H1 tag on each page | ✓ Present |
| OpenGraph tags | ✓ Added |
| Twitter Card | ✓ Added |
| Canonical URL | To add |
| JSON-LD LocalBusiness | ✓ Added |
| JSON-LD FAQPage | To add |
| Sitemap.xml | ✓ Added |
| Robots.txt | ✓ Added |
| Mobile-friendly | ✓ Responsive |
| HTTPS | Depends on hosting |

---

## Notes

- Update the domain URL once live
- Add Google Search Console verification when ready
- Consider adding hreflang if targeting multiple regions
- Monitor Core Web Vitals after deployment
