'use client';

import React from 'react';
import { ArrowRight, Sparkles, Layers, Box, Zap, Type, Coffee, Feather, Crown, Scissors, Briefcase } from 'lucide-react';
import { ImageItem } from './ScrollReveal';

interface StyleShowcaseProps {
  onExampleClick: (image: ImageItem, index: number) => void;
}

interface StyleItem {
  id: string;
  title: string;
  category: string;
  description: string;
  traits: string[];
  image: string;
  icon: React.ElementType;
  span: string;
  color: string;
}

const styles: StyleItem[] = [
  {
    id: 'flowdesk',
    title: 'Glassmorphism',
    category: 'SaaS',
    description: 'Frosted glass cards floating over gradient mesh backgrounds. Translucent panels with blur effects.',
    traits: ['Frosted Glass', 'Soft Shadows', 'Gradient Mesh'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
    icon: Layers,
    span: 'md:col-span-1',
    color: '#6366f1'
  },
  {
    id: 'loud',
    title: 'Neobrutalism',
    category: 'Agency',
    description: 'Bold black borders, raw edges, and bright clashing colors. High contrast aesthetic.',
    traits: ['Hard Edges', 'High Contrast', 'Bold Type'],
    image: '/assets/loud.png',
    icon: Box,
    span: 'md:col-span-1',
    color: '#000000'
  },
  {
    id: 'architect',
    title: 'Minimalist Swiss',
    category: 'Architecture',
    description: 'Extreme whitespace and grid-based layouts. Content is king, with clean typography.',
    traits: ['Grid Systems', 'Helvetica', 'Negative Space'],
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
    icon: Type,
    span: 'md:col-span-1',
    color: '#333333'
  },
  {
    id: 'surge',
    title: 'Bold Gradient',
    category: 'Fitness',
    description: 'Vibrant gradients and dynamic angles. High energy designs that convey movement.',
    traits: ['Vivid Colors', 'Dynamic Angles', 'Motion'],
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop',
    icon: Zap,
    span: 'md:col-span-1',
    color: '#f43f5e'
  },
  {
    id: 'bloom',
    title: 'Soft Organic',
    category: 'Wellness',
    description: 'Soft pastels, rounded shapes, and wavy dividers. A calming aesthetic.',
    traits: ['Pastel Tones', 'Fluid Shapes', 'Gentle'],
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=800&auto=format&fit=crop',
    icon: Feather,
    span: 'md:col-span-1',
    color: '#10b981'
  },
  {
    id: 'barbers',
    title: 'Dark Premium',
    category: 'Barber',
    description: 'Dark charcoal backgrounds with gold accents. Textured and masculine.',
    traits: ['Dark Mode', 'Gold Accents', 'Textured'],
    image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=800&auto=format&fit=crop',
    icon: Scissors,
    span: 'md:col-span-1',
    color: '#ca8a04'
  },
  {
    id: 'ashford',
    title: 'Elegant Luxury',
    category: 'Hospitality',
    description: 'Muted tones, delicate serif typography. Refined and sophisticated.',
    traits: ['Serif Type', 'Muted Gold', 'Refined'],
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=800&auto=format&fit=crop',
    icon: Crown,
    span: 'md:col-span-1',
    color: '#d4af37'
  },
  {
    id: 'murphy',
    title: 'Corporate Modern',
    category: 'Consulting',
    description: 'Navy blue, white, and subtle gold. Professional, trust-building geometric layouts.',
    traits: ['Trust', 'Geometric', 'Clean'],
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=800&auto=format&fit=crop',
    icon: Briefcase,
    span: 'md:col-span-1',
    color: '#1e3a8a'
  },
  {
    id: 'roasters',
    title: 'Retro Vintage',
    category: 'Artisan',
    description: 'Warm earth tones, textured backgrounds, and vintage typography.',
    traits: ['Texture', 'Warmth', 'Nostalgia'],
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=800&auto=format&fit=crop',
    icon: Coffee,
    span: 'md:col-span-1',
    color: '#92400e'
  }
];

export default function StyleShowcase({ onExampleClick }: StyleShowcaseProps) {
  const [activeCardId, setActiveCardId] = React.useState<string | null>(null);

  const handleCardClick = (style: StyleItem, index: number, e: React.MouseEvent) => {
    // Check if we are on mobile (using standard md breakpoint of 768px)
    const isMobile = window.innerWidth < 768;

    if (isMobile) {
      if (activeCardId === style.id) {
        // If already active, proceed to preview
        onExampleClick({ id: style.id, src: style.image, label: style.title }, index);
      } else {
        // Otherwise, activate this card to show overlay
        e.preventDefault(); // Prevent bubbling if needed
        setActiveCardId(style.id);
      }
    } else {
      // Desktop behavior: immediate action (hover handles overlay)
      onExampleClick({ id: style.id, src: style.image, label: style.title }, index);
    }
  };

  // Clear active card when clicking outside could be nice, but simple toggle is enough for now.
  // Or clicking another card switches active card automatically via logic above.

  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p data-aos="fade-up" className="text-xs tracking-[0.3em] uppercase text-[#888888] mb-4">Aesthetics</p>
          <h2 data-aos="fade-up" data-aos-delay="100" className="text-5xl sm:text-6xl font-bold tracking-tight text-[#1a1a1a]">Choose your vibe.</h2>
          <p data-aos="fade-up" data-aos-delay="200" className="text-[#666666] text-lg mt-4 max-w-2xl mx-auto">
            We don&apos;t just build websites. We craft digital identities. Which one speaks to you?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 auto-rows-[200px]">
          {styles.map((style, index) => (
            <div
              key={style.id}
              data-aos="fade-up"
              data-aos-delay={index * 50}
              className={`group relative rounded-xl overflow-hidden cursor-pointer transition-all duration-500 border border-[#e0e0e0] hover:border-transparent hover:shadow-xl ${style.span}`}
              onClick={(e) => handleCardClick(style, index, e)}
            >
              {/* Default Content (Visible initially) */}
              <div className={`h-full bg-[#fafafa] p-5 flex flex-col justify-between relative z-10 transition-opacity duration-300 ${activeCardId === style.id ? 'opacity-0' : 'opacity-100 group-hover:opacity-0'}`}>
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <div className="p-1.5 rounded-lg bg-white border border-[#e0e0e0]">
                      <style.icon className="w-4 h-4" style={{ color: style.color }} />
                    </div>
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded-full border border-[#e0e0e0] text-[#888888] uppercase tracking-wider">
                      {style.category}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-[#1a1a1a] mb-1.5 tracking-tight">{style.title}</h3>
                  <p className="text-[#666666] text-xs leading-relaxed mb-3 line-clamp-2">{style.description}</p>
                </div>

                <div className="flex gap-1.5 flex-wrap">
                  {style.traits.slice(0, 3).map((trait, i) => (
                    <span key={i} className="text-[9px] font-medium px-2 py-1 bg-white rounded-md text-[#666666] border border-[#e0e0e0]">
                      {trait}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hover Content (Revealed on hover OR active state) */}
              <div className={`absolute inset-0 z-20 transition-all duration-500 ease-out ${activeCardId === style.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                {/* Background Image */}
                <div 
                  className={`absolute inset-0 bg-cover bg-center transition-transform duration-700 ${activeCardId === style.id ? 'scale-105' : 'group-hover:scale-105'}`}
                  style={{ backgroundImage: `url(${style.image})` }}
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

                {/* Content */}
                <div className="absolute inset-0 p-5 flex flex-col justify-center items-center text-center text-white">
                  <h3 className={`text-2xl font-bold mb-1 transition-transform duration-500 delay-100 ${activeCardId === style.id ? 'translate-y-0' : 'translate-y-4 group-hover:translate-y-0'}`}>{style.title}</h3>
                  <p className={`text-white/80 text-xs mb-4 max-w-sm transition-transform duration-500 delay-150 ${activeCardId === style.id ? 'translate-y-0' : 'translate-y-4 group-hover:translate-y-0'}`}>Preview Style</p>
                  
                  <button className={`px-5 py-2 bg-white text-black rounded-full text-xs font-bold flex items-center gap-2 hover:gap-3 transition-all duration-300 delay-200 ${activeCardId === style.id ? 'translate-y-0' : 'translate-y-4 group-hover:translate-y-0'}`}>
                    View Project
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
