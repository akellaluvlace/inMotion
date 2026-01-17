"use client";

import React, { useRef, useState, useEffect, useLayoutEffect, useCallback } from "react";
import gsap from "gsap";
import { Flip } from "gsap/dist/Flip";

if (typeof window !== "undefined") {
  gsap.registerPlugin(Flip);
}

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

interface Addon {
  name: string;
  price: number;
}

interface Service {
  id: string;
  title: string;
  price: number;
  included: string[];
  addons: Addon[];
  size: "large" | "medium" | "small";
}

const servicesData: Service[] = [
  {
    id: "landing",
    title: "Landing Pages",
    price: 800,
    size: "large",
    included: [
      "Custom responsive design",
      "Next.js single page",
      "Conversion form + spam protection",
      "Basic SEO & meta tags",
      "GA4 + GDPR cookie banner",
      "1 round of post-launch tweaks"
    ],
    addons: [
      { name: "Copywriting", price: 120 },
      { name: "Hero promo video (15s)", price: 400 },
      { name: "A/B variant setup", price: 640 },
      { name: "Heatmaps & recordings", price: 200 },
      { name: "Paid-ads hookup", price: 240 },
      { name: "Edge hosting + CDN (1yr)", price: 300 }
    ]
  },
  {
    id: "business",
    title: "Business Sites",
    price: 1200,
    size: "small",
    included: [
      "Multi-page responsive design",
      "CMS integration (Sanity/Strapi)",
      "SEO: sitemap, robots, meta",
      "Contact forms + anti-spam",
      "GA4 + Search Console",
      "Admin training session"
    ],
    addons: [
      { name: "Blog setup (3 posts)", price: 480 },
      { name: "Multi-language (i18n)", price: 1200 },
      { name: "CRM Integration", price: 800 },
      { name: "SEO Starter pack", price: 640 },
      { name: "Photo editing", price: 600 },
      { name: "Booking system", price: 560 }
    ]
  },
  {
    id: "ecommerce",
    title: "E-Commerce",
    price: 2400,
    size: "medium",
    included: [
      "Product catalogue & pages",
      "Secure payments (Stripe)",
      "Inventory admin dashboard",
      "Shipping & tax config",
      "Promotions & discounts",
      "Enhanced GA4 tracking"
    ],
    addons: [
      { name: "Subscription billing", price: 960 },
      { name: "Multi-currency", price: 480 },
      { name: "Abandoned cart recovery", price: 400 },
      { name: "Email marketing (Klaviyo)", price: 640 },
      { name: "Reviews system", price: 400 },
      { name: "Product photography", price: 800 }
    ]
  },
  {
    id: "mvp",
    title: "MVPs",
    price: 4000,
    size: "small",
    included: [
      "Product discovery & flows",
      "Clickable prototype (Figma)",
      "Backend API & docs",
      "Auth & role-based access",
      "CI/CD + staging",
      "Docs + onboarding"
    ],
    addons: [
      { name: "Mobile app (React Native)", price: 2400 },
      { name: "Admin dashboard", price: 1600 },
      { name: "Data integration", price: 1200 },
      { name: "Security review", price: 1200 },
      { name: "Performance tuning", price: 640 },
      { name: "Extra dev sprint", price: 2000 }
    ]
  },
  {
    id: "ai",
    title: "AI Automation",
    price: 3000,
    size: "large",
    included: [
      "AI strategy consultation",
      "Workflow automation design",
      "API integrations",
      "Testing & validation",
      "Documentation",
      "Training session"
    ],
    addons: [
      { name: "Custom chatbot", price: 2000 },
      { name: "Document processing", price: 1600 },
      { name: "Data pipeline setup", price: 2400 },
      { name: "AI Dashboard", price: 1600 },
      { name: "Voice assistant", price: 2400 },
      { name: "Monthly maintenance", price: 800 }
    ]
  }
];

function formatPrice(n: number) {
  return `€${n.toLocaleString()}`;
}

export default function ServicesCarousel() {
  const gridRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const flipStateRef = useRef<any>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [flippedId, setFlippedId] = useState<string | null>(null);
  const [selectedAddons, setSelectedAddons] = useState<Record<string, Set<number>>>({});

  const toggleExpand = useCallback((id: string) => {
    if (!gridRef.current) return;
    if (expandedId === id) {
      setFlippedId(null);
    }
    flipStateRef.current = Flip.getState(".service-card");
    setExpandedId(prev => prev === id ? null : id);
  }, [expandedId]);

  const toggleFlip = useCallback((id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFlippedId(prev => prev === id ? null : id);
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (!flipStateRef.current) return;
    const state = flipStateRef.current;
    flipStateRef.current = null;
    Flip.from(state, {
      duration: 0.5,
      ease: "power2.inOut",
      absolute: true,
    });
  }, [expandedId]);

  const toggleAddon = (serviceId: string, addonIdx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedAddons(prev => {
      const current = prev[serviceId] || new Set<number>();
      const next = new Set(current);
      if (next.has(addonIdx)) {
        next.delete(addonIdx);
      } else {
        next.add(addonIdx);
      }
      return { ...prev, [serviceId]: next };
    });
  };

  const getTotal = (service: Service) => {
    const addons = selectedAddons[service.id] || new Set<number>();
    return service.price + Array.from(addons).reduce((acc, idx) => acc + service.addons[idx].price, 0);
  };

  return (
    <div>
      <style dangerouslySetInnerHTML={{ __html: `
        .services-section {
          padding: 6rem 5%;
          background: #ffffff;
        }
        .services-header {
          text-align: center;
          max-width: 600px;
          margin: 0 auto 4rem;
        }
        .services-header__tag {
          font-size: 0.75rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #888888;
          margin-bottom: 1rem;
        }
        .services-header__title {
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 700;
          color: #1a1a1a;
          letter-spacing: -0.02em;
        }

        /* Irregular bento grid */
        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-auto-rows: 140px;
          gap: 1rem;
          max-width: 900px;
          margin: 0 auto;
        }
        @media (max-width: 768px) {
          .services-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 500px) {
          .services-grid {
            grid-template-columns: 1fr;
          }
        }

        /* Card sizes for irregular look */
        .service-card {
          position: relative;
          background: #fafafa;
          border-radius: 20px;
          overflow: hidden;
          cursor: pointer;
          transition: background 0.3s, box-shadow 0.3s, border-color 0.3s;
          border: 1px solid transparent;
          perspective: 1000px;
        }
        .service-card:hover {
          background: #f0f0f0;
          border-color: #1a1a1a;
          box-shadow: 0 8px 24px rgba(0,0,0,0.08);
        }
        .service-card.size-large {
          grid-column: span 2;
          grid-row: span 1;
        }
        .service-card.size-medium {
          grid-column: span 1;
          grid-row: span 2;
        }
        .service-card.size-small {
          grid-column: span 1;
          grid-row: span 1;
        }
        @media (max-width: 500px) {
          .service-card.size-large,
          .service-card.size-medium,
          .service-card.size-small {
            grid-column: span 1;
            grid-row: span 1;
          }
        }

        /* Expanded */
        .service-card.expanded {
          grid-column: span 2;
          grid-row: span 2;
          cursor: default;
          z-index: 10;
        }
        @media (max-width: 500px) {
          .service-card.expanded {
            grid-column: span 1;
            grid-row: span 2;
          }
        }

        /* Flip */
        .flip-container {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          transition: transform 0.5s ease;
        }
        .service-card.flipped .flip-container {
          transform: rotateY(180deg);
        }
        .flip-face {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          border-radius: 20px;
        }
        .flip-front {
          background: #fafafa;
        }
        .flip-back {
          background: #1a1a1a;
          transform: rotateY(180deg);
        }

        /* Collapsed - minimal */
        .card-collapsed {
          padding: 1.5rem;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
        }
        .card__number {
          font-size: 4rem;
          font-weight: 200;
          color: #e0e0e0;
          line-height: 1;
          position: absolute;
          top: 1rem;
          left: 1.5rem;
          transition: color 0.3s;
        }
        .service-card:hover .card__number {
          color: #1a1a1a;
        }
        .card__title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #1a1a1a;
        }
        .card__price {
          font-size: 0.85rem;
          color: #888888;
          margin-top: 0.25rem;
        }

        /* Expanded front - just buttons */
        .card-expanded {
          padding: 2rem;
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .card-expanded__header {
          margin-bottom: auto;
        }
        .card-expanded .card__title {
          font-size: 1.75rem;
          margin-bottom: 0.25rem;
        }
        .card-expanded .card__price {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1a1a1a;
        }
        .card-expanded .card__price span {
          font-size: 0.7rem;
          font-weight: 400;
          color: #888;
          margin-left: 0.5rem;
        }

        /* Action buttons container */
        .card-actions {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-top: auto;
        }

        /* Included button with hover dropdown */
        .included-btn-wrapper {
          position: relative;
        }
        .btn {
          width: 100%;
          padding: 1rem 1.25rem;
          border-radius: 12px;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          border: none;
          transition: all 0.2s;
          text-align: left;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .btn--included {
          background: #f0f0f0;
          color: #1a1a1a;
        }
        .btn--included:hover {
          background: #e8e8e8;
        }
        .btn--addons {
          background: #1a1a1a;
          color: white;
        }
        .btn--addons:hover {
          background: #333;
        }
        .btn--close {
          background: transparent;
          color: #888;
          padding: 0.75rem;
          text-align: center;
          justify-content: center;
        }
        .btn--close:hover {
          color: #1a1a1a;
        }

        /* Hover dropdown for included */
        .included-dropdown {
          position: absolute;
          bottom: 100%;
          left: 0;
          right: 0;
          background: white;
          border: 1px solid #e0e0e0;
          border-radius: 12px;
          padding: 1rem;
          margin-bottom: 0.5rem;
          opacity: 0;
          visibility: hidden;
          transform: translateY(10px);
          transition: all 0.2s ease;
          box-shadow: 0 8px 24px rgba(0,0,0,0.1);
          z-index: 20;
        }
        .included-btn-wrapper:hover .included-dropdown {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }
        .included-dropdown h4 {
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #888;
          margin: 0 0 0.75rem 0;
        }
        .included-dropdown ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .included-dropdown li {
          padding: 0.35rem 0;
          font-size: 0.8rem;
          color: #1a1a1a;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .included-dropdown li::before {
          content: "✓";
          color: #27ca3f;
          font-size: 0.7rem;
          font-weight: 600;
        }

        /* Back face - addons */
        .addons-content {
          padding: 1.5rem;
          height: 100%;
          display: flex;
          flex-direction: column;
          color: white;
        }
        .addons-content h3 {
          font-size: 1.25rem;
          font-weight: 600;
          margin: 0 0 0.5rem 0;
        }
        .addons-content .price-display {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 1rem;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        .addons-list {
          flex: 1;
          overflow-y: auto;
        }
        .addon-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.5rem 0.75rem;
          margin-bottom: 0.35rem;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
        }
        .addon-row:hover {
          background: rgba(255,255,255,0.1);
        }
        .addon-row.selected {
          background: rgba(39, 202, 63, 0.2);
          border-color: #27ca3f;
        }
        .addon-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8rem;
        }
        .checkbox-custom {
          width: 14px;
          height: 14px;
          border: 2px solid rgba(255,255,255,0.3);
          border-radius: 3px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .addon-row.selected .checkbox-custom {
          background: #27ca3f;
          border-color: #27ca3f;
        }
        .addon-price {
          font-weight: 600;
          color: #666;
          font-size: 0.75rem;
        }
        .addon-row.selected .addon-price {
          color: #27ca3f;
        }

        .addons-footer {
          margin-top: 0.75rem;
          padding-top: 0.75rem;
          border-top: 1px solid rgba(255,255,255,0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .total-section {
          display: flex;
          flex-direction: column;
        }
        .total-label {
          font-size: 0.6rem;
          color: #888;
          text-transform: uppercase;
        }
        .total-price {
          font-size: 1.25rem;
          font-weight: 700;
        }
        .footer-btns {
          display: flex;
          gap: 0.4rem;
        }
        .btn--back {
          background: white;
          color: #1a1a1a;
          padding: 0.6rem 1rem;
          width: auto;
          font-size: 0.8rem;
        }
        .btn--back:hover {
          background: #f0f0f0;
        }
        .btn--cta {
          background: #27ca3f;
          color: white;
          text-decoration: none;
          padding: 0.6rem 1rem;
          width: auto;
          font-size: 0.8rem;
          border-radius: 8px;
          font-weight: 600;
        }
        .btn--cta:hover {
          filter: brightness(1.1);
        }

        /* CTA section */
        .services-cta {
          text-align: center;
          padding: 5rem 5%;
          background: #f8f8f8;
        }
        .services-cta__title {
          font-size: clamp(1.75rem, 3vw, 2.25rem);
          font-weight: 600;
          margin-bottom: 1rem;
        }
        .services-cta__desc {
          color: #666666;
          margin-bottom: 2rem;
        }
        .services-cta .btn--cta {
          display: inline-block;
          padding: 1rem 2rem;
          font-size: 1rem;
          border-radius: 12px;
        }
      `}} />

      <section className="services-section">
        <div className="services-header">
          <div className="services-header__tag">Services</div>
          <h2 className="services-header__title">What we build.</h2>
        </div>

        <div ref={gridRef} className="services-grid">
          {servicesData.map((service, index) => {
            const isExpanded = expandedId === service.id;
            const isFlipped = flippedId === service.id;
            const serviceAddons = selectedAddons[service.id] || new Set<number>();

            const sizeClass = isExpanded ? "" : `size-${service.size}`;

            return (
              <div
                key={service.id}
                className={`service-card ${sizeClass} ${isExpanded ? 'expanded' : ''} ${isFlipped ? 'flipped' : ''}`}
                onClick={() => !isExpanded && toggleExpand(service.id)}
                data-flip-id={service.id}
              >
                <div className="flip-container">
                  {/* FRONT */}
                  <div className="flip-face flip-front">
                    {!isExpanded ? (
                      <div className="card-collapsed">
                        <span className="card__number">0{index + 1}</span>
                        <h3 className="card__title">{service.title}</h3>
                        <p className="card__price">from {formatPrice(service.price)}</p>
                      </div>
                    ) : (
                      <div className="card-expanded">
                        <div className="card-expanded__header">
                          <h3 className="card__title">{service.title}</h3>
                          <p className="card__price">
                            {formatPrice(service.price)}
                            <span>starting</span>
                          </p>
                        </div>

                        <div className="card-actions">
                          <div className="included-btn-wrapper">
                            <div className="included-dropdown">
                              <h4>What&apos;s Included</h4>
                              <ul>
                                {service.included.map((item, i) => (
                                  <li key={i}>{item}</li>
                                ))}
                              </ul>
                            </div>
                            <button type="button" className="btn btn--included">
                              What&apos;s Included
                              <span>↑</span>
                            </button>
                          </div>

                          <button
                            type="button"
                            className="btn btn--addons"
                            onClick={(e) => toggleFlip(service.id, e)}
                          >
                            Customize Add-ons
                            <span>→</span>
                          </button>

                          <button
                            type="button"
                            className="btn btn--close"
                            onClick={(e) => { e.stopPropagation(); toggleExpand(service.id); }}
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* BACK */}
                  <div className="flip-face flip-back">
                    <div className="addons-content">
                      <h3>{service.title}</h3>
                      <div className="price-display">
                        {formatPrice(getTotal(service))}
                      </div>

                      <div className="addons-list">
                        {service.addons.map((addon, i) => (
                          <div
                            key={i}
                            className={`addon-row ${serviceAddons.has(i) ? 'selected' : ''}`}
                            onClick={(e) => toggleAddon(service.id, i, e)}
                          >
                            <div className="addon-label">
                              <span className="checkbox-custom">
                                {serviceAddons.has(i) && (
                                  <svg viewBox="0 0 24 24" width="8" height="8" stroke="currentColor" strokeWidth="3" fill="none">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                  </svg>
                                )}
                              </span>
                              <span>{addon.name}</span>
                            </div>
                            <span className="addon-price">+{formatPrice(addon.price)}</span>
                          </div>
                        ))}
                      </div>

                      <div className="addons-footer">
                        <div className="total-section">
                          <span className="total-label">Total</span>
                          <span className="total-price">{formatPrice(getTotal(service))}</span>
                        </div>
                        <div className="footer-btns">
                          <button
                            type="button"
                            className="btn btn--back"
                            onClick={(e) => toggleFlip(service.id, e)}
                          >
                            ← Back
                          </button>
                          <a href="#contact" className="btn btn--cta" onClick={(e) => e.stopPropagation()}>
                            Get Quote
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="services-cta">
        <h3 className="services-cta__title">Ready to start?</h3>
        <p className="services-cta__desc">Book a free discovery call to get a fixed quote.</p>
        <a href="#contact" className="btn btn--cta">Book Discovery Call</a>
      </section>
    </div>
  );
}
