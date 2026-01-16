"use client";

import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const styles = `
/* ===========================================
   AKELLA INMOTION - CLEAN MINIMAL STYLE
   =========================================== */

@import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&family=Outfit:wght@400;500;600;700&display=swap');

:root {
    --color-primary: #1a1a1a;
    --color-primary-hover: #333333;
    --color-text: #1a1a1a;
    --color-text-secondary: #666666;
    --color-text-muted: #888888;
    --color-background: #ffffff;
    --color-background-alt: #f8f8f8;
    --color-border: #e0e0e0;
    --color-border-light: #f0f0f0;

    --font-primary: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
    --font-display: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;

    --radius-sm: 6px;
    --radius-md: 8px;
    --radius-lg: 12px;
    --radius-xl: 16px;

    --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.06);
    --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.08);
    --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.12);

    --transition-fast: 0.15s ease;
    --transition-base: 0.2s ease;
    --transition-slow: 0.3s ease;
}

.services-header { padding: 0 5%; max-width: 1400px; margin: 0 auto 1.5rem; }
.services-header__title { font-family: var(--font-display); font-size: clamp(2rem, 4vw, 2.75rem); font-weight: 600; margin-bottom: 0.5rem; }
.services-header__tag { font-size: 0.75rem; letter-spacing: 2px; text-transform: uppercase; color: var(--color-text-muted); margin-bottom: 0.75rem; }
.services-header__description { max-width: 600px; margin: 0 auto; color: var(--color-text-secondary); font-size: 1.1rem; line-height: 1.7; }

.services-section--alt { background-color: var(--color-background-alt); padding: 5rem 5%; max-width: none; }

/* Horizontal Scroll Container */
.horizontal-scroll-wrapper {
  overflow: hidden;
  background-color: var(--color-background);
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 2rem;
}

.horizontal-scroll-container {
  display: flex;
  gap: 2rem;
  padding: 1.5rem 0;
  padding-left: calc((100vw - 55vw) / 2);
  padding-right: 50vw;
  width: max-content;
  will-change: transform;
}

/* Card Styles */
.service-card {
  position: relative;
  width: 55vw;
  max-width: 700px;
  min-width: 320px;
  background-color: var(--color-background);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-sm);
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  transition: transform 0.25s ease-out, box-shadow var(--transition-slow);
  transform-origin: center center;
}

.service-card:hover {
  box-shadow: var(--shadow-lg);
}

.card-inner { display: grid; grid-template-columns: 1fr 220px; gap: 2rem; }
.card-left { min-width: 0; }
.card-right { text-align: right; display: flex; flex-direction: column; justify-content: space-between; }

.card__icon { width: 48px; height: 48px; background-color: var(--color-background-alt); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; margin-bottom: 1.5rem; font-size: 1.5rem; font-weight: 700; }
.card__title { font-family: var(--font-display); font-size: 1.75rem; margin-bottom: 0.75rem; font-weight: 600; }
.card__desc { color: var(--color-text-secondary); font-size: 1rem; line-height: 1.6; margin-bottom: 1.5rem; }

.included-list { list-style: none; padding: 0; margin-top: 0.75rem; }
.included-list li { padding: 0.4rem 0; color: var(--color-text-secondary); font-size: 0.95rem; border-bottom: 1px solid var(--color-background-alt); }
.included-list li:last-child { border-bottom: none; }

.btn { display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; padding: 0.875rem 1.75rem; border-radius: var(--radius-md); font-weight: 600; font-size: 0.95rem; transition: all var(--transition-base); cursor: pointer; border: none; }
.btn--primary { background-color: var(--color-primary); color: var(--color-background); text-decoration: none; }
.btn--primary:hover { background-color: var(--color-primary-hover); transform: translateY(-2px); }
.btn--secondary { background-color: var(--color-background); color: var(--color-text); border: 1px solid var(--color-border); }
.btn--secondary:hover { border-color: var(--color-primary); }

.card-price { font-size: 1.5rem; font-weight: 700; color: var(--color-primary); }

/* Add-ons styling */
.addons-section { margin-top: 1.5rem; border-top: 1px solid var(--color-border); padding-top: 1.25rem; }
.addon-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.6rem; font-size: 0.95rem; }
.addon-label { display: flex; align-items: center; gap: 0.6rem; cursor: pointer; }
.checkbox-custom { width: 20px; height: 20px; border: 2px solid var(--color-border); border-radius: var(--radius-sm); display: flex; align-items: center; justify-content: center; transition: all var(--transition-base); }
input:checked + .checkbox-custom { background-color: var(--color-primary); border-color: var(--color-primary); color: var(--color-background); }

/* Utilities */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

.text-center { text-align: center; }

/* Mobile Adjustments */
@media (max-width: 1024px) {
  .service-card { width: 70vw; padding: 2rem; }
  .horizontal-scroll-container {
    padding-left: calc((100vw - 70vw) / 2);
    padding-right: 30vw;
  }
}

@media (max-width: 768px) {
  .service-card { width: 85vw; padding: 1.5rem; }
  .card-inner { grid-template-columns: 1fr; gap: 1.25rem; }
  .card-right { text-align: left; gap: 1rem; flex-direction: row; align-items: center; justify-content: space-between; }
  .horizontal-scroll-container {
    gap: 1.25rem;
    padding-left: calc((100vw - 85vw) / 2);
    padding-right: 15vw;
  }
  .card__title { font-size: 1.4rem; }
  .card__desc { font-size: 0.95rem; margin-bottom: 1rem; }
  .services-header { margin-bottom: 1rem; }
}
`;

interface Addon {
  name: string;
  price: number;
}

interface Service {
  id: string;
  title: string;
  price: number;
  description: string;
  included: string[];
  addons: Addon[];
}

const servicesData: Service[] = [
  {
    id: "landing",
    title: "Landing Pages",
    price: 800,
    description: "High-converting, mobile-optimized landing pages designed for launches and campaigns.",
    included: [
      "Custom responsive hero & CTA design",
      "Lightweight Next.js single page",
      "Conversion form + spam protection",
      "Basic on-page SEO & meta tags",
      "GA4 setup + GDPR cookie banner",
      "1 round of post-launch tweaks"
    ],
    addons: [
      { name: "Copywriting", price: 120 },
      { name: "Hero promo video (15s)", price: 400 },
      { name: "A/B variant setup", price: 640 },
      { name: "Heatmaps & recordings", price: 200 },
      { name: "Paid-ads hookup", price: 240 }
    ]
  },
  {
    id: "business",
    title: "Business Websites",
    price: 1200,
    description: "Polished multi-page websites (5-10 pages) with CMS and admin training.",
    included: [
      "Multi-page responsive design",
      "CMS integration (Sanity/Strapi)",
      "Basic SEO: sitemap, robots, meta",
      "Contact forms + anti-spam",
      "GA4 + Search Console setup",
      "Admin training session"
    ],
    addons: [
      { name: "Blog setup", price: 480 },
      { name: "Multi-language (i18n)", price: 1200 },
      { name: "CRM Integration", price: 800 },
      { name: "SEO Starter pack", price: 640 }
    ]
  },
  {
    id: "ecommerce",
    title: "E-Commerce",
    price: 2400,
    description: "Online stores built to sell — secure payments, inventory and analytics.",
    included: [
      "Product catalogue & pages",
      "Secure payments (Stripe/PayPal)",
      "Inventory admin dashboard",
      "Shipping & tax basic config",
      "Promotions & discount codes",
      "Enhanced ecommerce tracking"
    ],
    addons: [
      { name: "Recurring billing", price: 1200 },
      { name: "Product photography", price: 800 },
      { name: "Shopify sync", price: 1600 },
      { name: "Reviews workflow", price: 400 }
    ]
  },
  {
    id: "mvp",
    title: "MVPs & AI Apps",
    price: 6000,
    description: "Prototype to production: web & mobile apps with API contracts and AI automation.",
    included: [
      "Product discovery & flow mapping",
      "Clickable prototype (Figma)",
      "Backend API & OpenAPI docs",
      "Auth & role-based access",
      "CI/CD, staging + production",
      "Docs + onboarding"
    ],
    addons: [
      { name: "AI Workflow Automation", price: 2400 },
      { name: "Chatbot / Assistant", price: 2000 },
      { name: "Data integration", price: 2400 },
      { name: "Security review", price: 1200 }
    ]
  }
];

function formatPrice(n: number) {
  return `€${n.toLocaleString(undefined, { minimumFractionDigits: 0 })}`;
}

interface ServiceCardProps {
  service: Service;
}

const ServiceCard = ({ service }: ServiceCardProps) => {
  const [addonsOpen, setAddonsOpen] = useState(false);
  const [selectedAddons, setSelectedAddons] = useState<Set<number>>(new Set());

  const toggleAddon = (idx: number) => {
    const next = new Set(selectedAddons);
    if (next.has(idx)) next.delete(idx);
    else next.add(idx);
    setSelectedAddons(next);
  };

  const currentTotal = service.price + Array.from(selectedAddons).reduce((acc, idx) => acc + service.addons[idx].price, 0);

  return (
    <div className="service-card">
      <div className="card-inner">
        <div className="card-left">
          <div className="card__icon" aria-hidden>{service.title.charAt(0)}</div>
          <h3 className="card__title">{service.title}</h3>
          <p className="card__desc">{service.description}</p>

          <div>
            <h4 style={{ fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--color-text-muted)", marginBottom: "0.4rem" }}>Included</h4>
            <ul className="included-list">
              {service.included.map((inc, i) => <li key={i}>{inc}</li>)}
            </ul>
          </div>

          <div className="addons-section">
            <button
              className="btn btn--secondary"
              style={{ width: "100%", justifyContent: "space-between" }}
              onClick={() => setAddonsOpen(!addonsOpen)}
            >
              <span>{addonsOpen ? "Hide Add-ons" : "Customize & Add-ons"}</span>
              <span style={{ fontSize: "1.2em" }}>{addonsOpen ? "−" : "+"}</span>
            </button>

            {addonsOpen && (
              <div style={{ marginTop: "0.75rem" }}>
                {service.addons.map((addon, i) => (
                  <div key={i} className="addon-row">
                    <label className="addon-label">
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={selectedAddons.has(i)}
                        onChange={() => toggleAddon(i)}
                      />
                      <span className="checkbox-custom">
                        {selectedAddons.has(i) && <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="3" fill="none"><polyline points="20 6 9 17 4 12"></polyline></svg>}
                      </span>
                      <span>{addon.name}</span>
                    </label>
                    <span style={{ fontWeight: 600 }}>+{formatPrice(addon.price)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="card-right">
          <div>
            <div style={{ color: "var(--color-text-muted)", fontSize: "0.85rem", marginBottom: "0.25rem" }}>Total Estimated</div>
            <div className="card-price">{formatPrice(currentTotal)}</div>
          </div>

          <div style={{ marginTop: "auto", paddingTop: "1.5rem" }}>
            <a href="#contact" className="btn btn--primary" style={{ width: "100%" }}>
              Get Started
            </a>
            <p style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", marginTop: "0.75rem", textAlign: "center" }}>
              Fixed price. No surprises.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ServicesCarousel() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const trigger = triggerRef.current;

    if (!container || !trigger) return;

    const ctx = gsap.context(() => {
      const getScrollDistance = () => {
        const scrollWidth = container.scrollWidth;
        const viewportWidth = window.innerWidth;
        return scrollWidth - viewportWidth;
      };

      // Entrance animation - slide up when section enters viewport (one-time, not scrubbed)
      gsap.from(container, {
        y: 60,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: trigger,
          start: "top 80%",
          toggleActions: "play none none none",
        }
      });

      // Horizontal scroll - separate, starts when pinned
      gsap.to(container, {
        x: () => -getScrollDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: trigger,
          start: "top top",
          end: () => `+=${getScrollDistance()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef}>
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <div ref={triggerRef} className="horizontal-scroll-wrapper">
        <div className="services-header text-center">
          <div className="services-header__tag">Services</div>
          <h2 className="services-header__title">What we build</h2>
          <p className="services-header__description">
            From landing pages to complex apps. Scroll to explore our packages.
          </p>
        </div>

        <div ref={containerRef} className="horizontal-scroll-container">
          {servicesData.map((svc) => (
            <ServiceCard key={svc.id} service={svc} />
          ))}
        </div>
      </div>

      <section className="services-section--alt">
        <div className="text-center" style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <h3 className="services-header__title">Ready to start?</h3>
          <p className="services-header__description">
            Book a free discovery call to get a fixed quote for your project.
          </p>
          <div style={{ marginTop: "2rem" }}>
            <a href="#contact" className="btn btn--primary">Book Discovery Call</a>
          </div>
        </div>
      </section>
    </div>
  );
}
