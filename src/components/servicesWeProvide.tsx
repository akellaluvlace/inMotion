"use client";

import React, { useRef, useState, useLayoutEffect, useEffect, useMemo } from "react";
import gsap from "gsap";
import { Flip } from "gsap/dist/Flip";
import { Check, ArrowRight, Plus } from "lucide-react";

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
  description: string;
  price: number;
  included: string[];
  addons: Addon[];
  size: "large" | "medium" | "small";
  isCustom?: boolean;
}

const servicesData: Service[] = [
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
    description: "Complete digital presence for growing companies.",
    price: 1200,
    size: "medium",
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
    description: "Robust online stores that scale with your sales.",
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
    description: "Rapid prototypes to validate your startup idea.",
    price: 4000,
    isCustom: true,
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
    description: "Smart workflows that save you 20+ hours a week.",
    price: 3000,
    isCustom: true,
    size: "small",
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
  },
  {
    id: "gsap",
    title: "GSAP",
    description: "High-end motion design and interactive storytelling.",
    price: 1500,
    size: "small",
    included: [
      "Scroll-based interactions",
      "SVG morphing & animation",
      "Advanced page transitions",
      "Micro-interactions",
      "Performance optimization"
    ],
    addons: [
      { name: "3D (Three.js) integration", price: 2000 },
      { name: "Physics-based motion", price: 800 }
    ]
  }
];

function formatPrice(n: number) {
  return `€${n.toLocaleString()}`;
}

interface ServicesBentoProps {
  onPreview?: (id: string) => void;
}

export default function ServicesBento({ onPreview }: ServicesBentoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedAddons, setSelectedAddons] = useState<Record<string, Set<number>>>({});
  
  // Ref to store the Flip state
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const flipState = useRef<any>(null);

  const activeService = useMemo(() => 
    servicesData.find(s => s.id === selectedId), 
  [selectedId]);

  const toggleService = (id: string | null) => {
    if (!containerRef.current) return;
    
    // Capture state before change
    // We capture the items AND the container to animate height smoothly
    flipState.current = Flip.getState(".bento-item, .bento-content, .grid-container, .section-header");
    
    setSelectedId(id);
  };

  useIsomorphicLayoutEffect(() => {
    if (!flipState.current || !containerRef.current) return;

    // Animate from captured state
    Flip.from(flipState.current, {
      duration: 0.5,
      ease: "power3.inOut",
      absolute: ".bento-item, .bento-content", // Only items should be absolute, container stays in flow
      targets: ".bento-item, .bento-content, .grid-container, .section-header",
      nested: true,
      zIndex: 20, // Ensure moving items stay on top
      scale: true,
      onEnter: elements => gsap.fromTo(elements, 
        { opacity: 0, scale: 0.95 }, 
        { opacity: 1, scale: 1, duration: 0.4, delay: 0.05, ease: "power2.out" }
      ),
      onLeave: elements => gsap.to(elements, 
        { opacity: 0, scale: 0.95, duration: 0.2, ease: "power2.in" }
      ),
    });
    
    flipState.current = null;
  }, [selectedId]);

  const toggleAddon = (serviceId: string, addonIdx: number) => {
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
    <div className="py-24 px-4 bg-white relative min-h-screen flex flex-col justify-center">
      <div className="max-w-6xl mx-auto w-full">
        
        {/* Header - Only visible when no service selected or subtle transition */}
        <div className={`section-header text-center overflow-hidden ${selectedId ? 'opacity-0 h-0 mb-0' : 'opacity-100 mb-16'}`}>
          <div data-aos="fade-up">
            <div className="text-xs tracking-[0.3em] uppercase text-[#888888] mb-4">Services</div>
            <h2 className="text-5xl sm:text-6xl font-bold tracking-tight text-[#1a1a1a]">What we build.</h2>
            <p className="md:hidden text-xs text-[#27ca3f] font-mono mt-4 animate-pulse">Tap items to explore details</p>
          </div>
        </div>

        <div ref={containerRef} className={`
          grid gap-4 grid-container
          ${selectedId 
            ? 'grid-cols-1 md:grid-cols-4 auto-rows-auto' 
            : 'grid-cols-1 md:grid-cols-3 grid-auto-rows-[280px]'
          }
        `}>
          
          {/* OVERVIEW MODE */}
          {!selectedId && servicesData.map((service, index) => {
             // Determine span based on design
             const isLarge = service.size === "large";
             const isMedium = service.size === "medium";
             const spanClass = isLarge 
                ? "md:col-span-2" 
                : isMedium 
                  ? "md:col-span-1 md:row-span-2" 
                  : "md:col-span-1";

             // Mobile adjustment logic handled by grid-cols-1
             
            return (
              <div 
                key={service.id}
                data-flip-id={`card-${service.id}`}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className={`bento-item group relative bg-[#fafafa] rounded-3xl p-8 border border-transparent hover:border-[#1a1a1a] hover:shadow-xl cursor-pointer flex flex-col justify-between overflow-hidden ${spanClass}`}
                onClick={() => toggleService(service.id)}
              >
                {/* Background Number */}
                <span className="absolute top-4 right-6 text-6xl font-mono font-medium text-[#1a1a1a] opacity-5 group-hover:opacity-10 transition-opacity">
                  0{index + 1}
                </span>

                <div className="relative z-10 mt-auto">
                   <h3 className="text-3xl font-bold text-[#1a1a1a] mb-2 font-sans tracking-tight">{service.title}</h3>
                   <p className="text-[#666666] mb-4 max-w-[80%]">{service.description}</p>
                   <div className="flex items-center gap-2 font-mono text-sm text-[#888888] group-hover:text-[#1a1a1a] transition-colors">
                      <span>{service.isCustom ? "Custom Pricing" : `from ${formatPrice(service.price)}`}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                   </div>
                </div>
              </div>
            );
          })}

          {/* DETAIL MODE */}
          {selectedId && activeService && (
            <>
              {/* 1. Header Card (Title + Desc) - Morph from original card */}
              <div 
                data-flip-id={`card-${activeService.id}`}
                className="bento-item md:col-span-3 bg-[#1a1a1a] rounded-3xl p-10 flex flex-col justify-between text-white relative overflow-hidden min-h-[300px]"
              >
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <button 
                      onClick={(e) => { e.stopPropagation(); toggleService(null); }}
                      className="px-4 py-2 rounded-full border border-white/20 hover:bg-white/10 text-xs uppercase tracking-widest transition-colors"
                    >
                      ← Back
                    </button>
                    <span className="font-mono text-white/40">0{servicesData.findIndex(s => s.id === selectedId) + 1}</span>
                  </div>
                  
                  <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">{activeService.title}</h2>
                  <p className="text-xl text-white/70 max-w-md leading-relaxed">{activeService.description}</p>
                </div>

                {/* Decorative blob */}
                <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
              </div>

              {/* 2. Add-ons Selection (Tall column on right) */}
              <div className="bento-content md:col-span-1 md:row-span-2 bg-white rounded-3xl p-8 border border-[#e0e0e0] flex flex-col hover:border-[#1a1a1a] transition-colors relative overflow-hidden group">
                <h3 className="text-sm font-bold uppercase tracking-widest text-[#888888] mb-6">Add-ons</h3>
                <div className="space-y-2 overflow-y-auto pr-2 custom-scrollbar flex-1">
                  {activeService.addons.map((addon, i) => {
                    const isSelected = selectedAddons[activeService.id]?.has(i);
                    return (
                      <div 
                        key={i}
                        onClick={() => toggleAddon(activeService.id, i)}
                        className={`
                          flex flex-col gap-2 p-3 rounded-xl cursor-pointer border transition-all duration-200
                          ${isSelected 
                            ? 'bg-[#1a1a1a] border-[#1a1a1a] text-white' 
                            : 'bg-white border-[#f0f0f0] hover:border-[#d0d0d0] text-[#1a1a1a]'
                          }
                        `}
                      >
                        <div className="flex justify-between items-center w-full">
                           <span className="text-sm font-medium leading-tight">{addon.name}</span>
                           {isSelected ? <Check className="w-3 h-3 shrink-0" /> : <Plus className="w-3 h-3 shrink-0" />}
                        </div>
                        <span className={`text-xs font-mono self-end ${isSelected ? 'text-white/60' : 'text-[#888888]'}`}>
                             +{formatPrice(addon.price)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 3. Included List */}
              <div className="bento-content md:col-span-2 bg-[#fafafa] rounded-3xl p-8 border border-[#e0e0e0] flex flex-col">
                <h3 className="text-sm font-bold uppercase tracking-widest text-[#888888] mb-6">Included</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 flex-1">
                  {activeService.included.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-[#333333]">
                      <Check className="w-4 h-4 text-[#27ca3f] shrink-0 mt-0.5 stroke-[3]" />
                      <span className="leading-snug font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

               {/* 4. Total & Call to Action (Bottom center) */}
               <div className="bento-content md:col-span-1 bg-[#f8f8f8] rounded-3xl p-8 border border-[#e0e0e0] flex flex-col justify-between gap-8">
                <div>
                   <p className="text-xs uppercase tracking-widest text-[#888888] mb-2">{activeService.isCustom ? "Pricing" : "Estimated Total"}</p>
                   <div className="text-4xl font-bold text-[#1a1a1a] tracking-tight font-mono">
                     {activeService.isCustom ? "Custom" : formatPrice(getTotal(activeService))}
                   </div>
                   <p className="text-sm text-[#666666] mt-2">{activeService.isCustom ? "Consultation required." : "Fixed price."}</p>
                </div>

                <div className="flex flex-col gap-3 w-full">
                   {activeService.id === 'gsap' && onPreview && (
                     <button 
                       onClick={() => onPreview('gsap')}
                       className="w-full px-6 py-3 rounded-xl bg-[#1a1a1a] text-white font-bold hover:bg-[#333333] transition-all text-center flex items-center justify-center gap-2"
                     >
                       Live Demo
                       <ArrowRight className="w-4 h-4" />
                     </button>
                   )}
                   <a 
                     href="#contact" 
                     className="w-full px-6 py-3 rounded-xl bg-[#27ca3f] text-white font-bold hover:brightness-110 shadow-lg shadow-[#27ca3f]/20 transition-all text-center flex items-center justify-center gap-2"
                   >
                     Book Call
                     <ArrowRight className="w-4 h-4" />
                   </a>
                   <button 
                     onClick={() => toggleService(null)}
                     className="w-full px-6 py-3 rounded-xl border border-[#e0e0e0] text-[#1a1a1a] font-bold hover:bg-white hover:border-[#1a1a1a] transition-all text-center"
                   >
                     Close
                   </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
