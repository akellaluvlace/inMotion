'use client';

import React, { useEffect, useState, useRef } from 'react';
import {
  Menu,
  X,
  ShoppingBag,
  ArrowRight,
  Plus,
  Leaf,
  Flame,
  HandHeart,
  Users,
  Globe,
  FlaskConical,
  Package,
  MapPin,
  Clock,
  Phone,
  Navigation,
  Star,
  CheckCircle,
  Instagram,
  Facebook,
  Twitter,
  Send,
  Award
} from 'lucide-react';

// Inject keyframe animations and styles
const injectStyles = () => {
  if (typeof document === 'undefined') return;
  if (document.getElementById('roast-styles')) return;

  const style = document.createElement('style');
  style.id = 'roast-styles';
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Source+Sans+3:wght@300;400;500;600&display=swap');

    .roast-wrapper * {
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      box-sizing: border-box;
    }

    .roast-wrapper {
        font-family: 'Source Sans 3', sans-serif;
        background: #F5F0E8;
        color: #3D2314;
        line-height: 1.7;
        overflow-x: hidden;
    }

    .roast-wrapper ::selection {
        background: #C67B4E;
        color: #F5F0E8;
    }

    .roast-wrapper h1, 
    .roast-wrapper h2, 
    .roast-wrapper h3, 
    .roast-wrapper h4, 
    .roast-wrapper h5 {
        font-family: 'Playfair Display', Georgia, serif;
        font-weight: 500;
        line-height: 1.2;
    }

    /* Grain/Noise Texture Overlay */
    .roast-wrapper .grain-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 50;
        opacity: 0.03;
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    }

    /* Vintage Badge */
    .roast-wrapper .vintage-badge {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 12px 24px;
        border: 2px solid #3D2314;
        position: relative;
        font-family: 'IBM Plex Mono', monospace;
        font-size: 11px;
        font-weight: 600;
        letter-spacing: 0.2em;
        text-transform: uppercase;
    }

    .roast-wrapper .vintage-badge::before,
    .roast-wrapper .vintage-badge::after {
        content: '◆';
        position: absolute;
        font-size: 8px;
    }

    .roast-wrapper .vintage-badge::before {
        left: 8px;
    }

    .roast-wrapper .vintage-badge::after {
        right: 8px;
    }

    /* Decorative Border */
    .roast-wrapper .decorative-border {
        position: relative;
        padding: 40px;
        border: 1px solid #3D2314;
    }

    .roast-wrapper .decorative-border::before {
        content: '';
        position: absolute;
        top: 8px;
        left: 8px;
        right: 8px;
        bottom: 8px;
        border: 1px solid #3D2314;
        pointer-events: none;
    }

    /* Stamp Style */
    .roast-wrapper .stamp {
        display: inline-block;
        padding: 16px 24px;
        border: 3px solid #C67B4E;
        border-radius: 4px;
        transform: rotate(-3deg);
        position: relative;
    }

    .roast-wrapper .stamp::after {
        content: '';
        position: absolute;
        inset: 4px;
        border: 1px dashed #C67B4E;
        border-radius: 2px;
    }

    /* Vintage Button */
    .roast-wrapper .btn-vintage {
        display: inline-flex;
        align-items: center;
        gap: 12px;
        padding: 16px 32px;
        background: #3D2314;
        color: #F5F0E8;
        font-family: 'IBM Plex Mono', monospace;
        font-size: 12px;
        font-weight: 600;
        letter-spacing: 0.15em;
        text-transform: uppercase;
        border: 2px solid #3D2314;
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
        cursor: pointer;
    }

    .roast-wrapper .btn-vintage::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
        transition: left 0.5s ease;
    }

    .roast-wrapper .btn-vintage:hover {
        background: #5C3D2E;
        transform: translateY(-2px);
    }

    .roast-wrapper .btn-vintage:hover::before {
        left: 100%;
    }

    .roast-wrapper .btn-vintage-outline {
        display: inline-flex;
        align-items: center;
        gap: 12px;
        padding: 14px 30px;
        background: transparent;
        color: #3D2314;
        font-family: 'IBM Plex Mono', monospace;
        font-size: 12px;
        font-weight: 600;
        letter-spacing: 0.15em;
        text-transform: uppercase;
        border: 2px solid #3D2314;
        transition: all 0.3s ease;
        cursor: pointer;
    }

    .roast-wrapper .btn-vintage-outline:hover {
        background: #3D2314;
        color: #F5F0E8;
    }

    /* Card with paper texture feel */
    .roast-wrapper .paper-card {
        background: #FFFDF8;
        border: 1px solid rgba(61, 35, 20, 0.1);
        box-shadow: 
            0 1px 3px rgba(61, 35, 20, 0.08),
            0 4px 12px rgba(61, 35, 20, 0.04);
        position: relative;
    }

    .roast-wrapper .paper-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paper'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.04' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23paper)'/%3E%3C/svg%3E");
        opacity: 0.02;
        pointer-events: none;
    }

    /* Coffee Ring Stain */
    .roast-wrapper .coffee-ring {
        position: absolute;
        width: 120px;
        height: 120px;
        border: 2px solid rgba(139, 94, 60, 0.15);
        border-radius: 50%;
        pointer-events: none;
    }

    .roast-wrapper .coffee-ring::before {
        content: '';
        position: absolute;
        inset: 4px;
        border: 1px solid rgba(139, 94, 60, 0.1);
        border-radius: 50%;
    }

    /* Divider with ornament */
    .roast-wrapper .ornament-divider {
        display: flex;
        align-items: center;
        gap: 20px;
        color: #8B5E3C;
    }

    .roast-wrapper .ornament-divider::before,
    .roast-wrapper .ornament-divider::after {
        content: '';
        flex: 1;
        height: 1px;
        background: linear-gradient(90deg, transparent, #8B5E3C, transparent);
    }

    /* Product card hover */
    .roast-wrapper .product-card {
        transition: all 0.4s ease;
    }

    .roast-wrapper .product-card:hover {
        transform: translateY(-8px);
        box-shadow: 
            0 8px 30px rgba(61, 35, 20, 0.12),
            0 2px 8px rgba(61, 35, 20, 0.08);
    }

    /* Handwritten style accent */
    .roast-wrapper .handwritten {
        font-family: 'Playfair Display', serif;
        font-style: italic;
        font-weight: 400;
    }

    /* Nav link */
    .roast-wrapper .nav-link-vintage {
        position: relative;
        font-family: 'IBM Plex Mono', monospace;
        font-size: 11px;
        font-weight: 500;
        letter-spacing: 0.15em;
        text-transform: uppercase;
        color: #3D2314;
        transition: color 0.3s ease;
        cursor: pointer;
    }

    .roast-wrapper .nav-link-vintage::after {
        content: '';
        position: absolute;
        bottom: -4px;
        left: 0;
        width: 0;
        height: 2px;
        background: #C67B4E;
        transition: width 0.3s ease;
    }

    .roast-wrapper .nav-link-vintage:hover {
        color: #C67B4E;
    }

    .roast-wrapper .nav-link-vintage:hover::after {
        width: 100%;
    }

    /* Roast level indicator */
    .roast-wrapper .roast-level {
        display: flex;
        gap: 4px;
    }

    .roast-wrapper .roast-dot {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        border: 1px solid #3D2314;
    }

    .roast-wrapper .roast-dot.filled {
        background: #3D2314;
    }

    /* Wax seal effect */
    .roast-wrapper .wax-seal {
        width: 80px;
        height: 80px;
        background: #A0522D;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 
            inset 0 2px 4px rgba(0,0,0,0.3),
            0 4px 8px rgba(0,0,0,0.2);
        position: relative;
    }

    .roast-wrapper .wax-seal::before {
        content: '';
        position: absolute;
        inset: 6px;
        border: 2px solid rgba(255,255,255,0.2);
        border-radius: 50%;
    }

    /* Process step */
    .roast-wrapper .process-step {
        position: relative;
    }

    .roast-wrapper .process-step::after {
        content: '';
        position: absolute;
        top: 40px;
        right: -50%;
        width: 100%;
        height: 2px;
        border-top: 2px dashed #8B5E3C;
    }

    .roast-wrapper .process-step:last-child::after {
        display: none;
    }

    /* Testimonial quote */
    .roast-wrapper .vintage-quote {
        position: relative;
        padding-left: 30px;
    }

    .roast-wrapper .vintage-quote::before {
        content: '"';
        position: absolute;
        top: -20px;
        left: 0;
        font-family: 'Playfair Display', serif;
        font-size: 80px;
        color: #C67B4E;
        opacity: 0.3;
        line-height: 1;
    }

    /* AOS Animations */
    .roast-fade-up {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s ease-out, transform 0.8s ease-out;
    }
    
    .roast-fade-left {
        opacity: 0;
        transform: translateX(30px);
        transition: opacity 0.8s ease-out, transform 0.8s ease-out;
    }

    .roast-fade-right {
        opacity: 0;
        transform: translateX(-30px);
        transition: opacity 0.8s ease-out, transform 0.8s ease-out;
    }

    .roast-animate {
        opacity: 1;
        transform: translate(0);
    }

    /* Mobile Menu Transition */
    .mobile-menu-enter {
        transform: translateX(100%);
    }
    .mobile-menu-enter-active {
        transform: translateX(0);
        transition: transform 300ms ease-in-out;
    }
    .mobile-menu-exit {
        transform: translateX(0);
    }
    .mobile-menu-exit-active {
        transform: translateX(100%);
        transition: transform 300ms ease-in-out;
    }
  `;
  document.head.appendChild(style);
};

export default function HowthRoadRoasters({ previewMode = false }: { previewMode?: boolean }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const aosRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    injectStyles();
  }, []);

  // Handle scroll for nav styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animation observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('roast-animate');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    aosRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    document.body.style.overflow = !mobileMenuOpen ? 'hidden' : '';
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    if (mobileMenuOpen) {
      toggleMobileMenu();
    }
  };

  const addAosRef = (el: HTMLElement | null) => {
    if (el && !aosRefs.current.includes(el)) {
      aosRefs.current.push(el);
    }
  };

  return (
    <div className="roast-wrapper relative min-h-screen">
        {/* Grain Overlay */}
        <div className="grain-overlay"></div>

        {/* Navigation */}
        <nav 
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${ 
                scrolled ? 'bg-[#F5F0E8]/95 backdrop-blur-sm border-b border-[#3D2314]/15' : 'bg-[#F5F0E8]/95 backdrop-blur-sm border-b border-[#3D2314]/10'
            }`}
            style={{ top: previewMode ? '64px' : '0' }}
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <a onClick={() => scrollToSection('top')} className="flex items-center gap-4 cursor-pointer">
                        <div className="relative">
                            {/* Circular Badge Logo */}
                            <div className="w-14 h-14 rounded-full border-2 border-[#3D2314] flex items-center justify-center bg-[#F5F0E8]">
                                <div className="text-center">
                                    <span className="block font-display text-lg leading-none text-[#3D2314]">HR</span>
                                    <span className="block text-[6px] font-mono tracking-widest text-[#8B5E3C] mt-0.5">EST. 2015</span>
                                </div>
                            </div>
                        </div>
                        <div className="hidden sm:block">
                            <span className="block font-display text-xl text-[#3D2314]">Howth Road</span>
                            <span className="block font-mono text-[10px] tracking-[0.3em] text-[#8B5E3C] uppercase -mt-1">Roasters</span>
                        </div>
                    </a>

                    {/* Desktop Nav */}
                    <div className="hidden lg:flex items-center gap-10">
                        {['Story', 'Coffee', 'Process', 'Cafe', 'Wholesale'].map((item) => (
                            <a 
                                key={item} 
                                onClick={() => scrollToSection(item.toLowerCase() === 'cafe' ? 'cafe' : item.toLowerCase())} 
                                className="nav-link-vintage"
                            >
                                {item === 'Story' ? 'Our Story' : item === 'Cafe' ? 'Café' : item}
                            </a>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="hidden lg:block">
                        <a onClick={() => scrollToSection('coffee')} className="btn-vintage">
                            Shop Beans
                            <ShoppingBag className="w-4 h-4" />
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button onClick={toggleMobileMenu} className="lg:hidden w-10 h-10 flex items-center justify-center text-[#3D2314]">
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>
        </nav>

        {/* Mobile Menu Overlay */}
        <div 
            className={`fixed inset-0 bg-[#F5F0E8] z-40 transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col justify-center items-center ${ 
                mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
            style={{ top: previewMode ? '64px' : '0' }}
        >
            <div className="flex flex-col items-center gap-8 mb-12">
                {['Story', 'Coffee', 'Process', 'Cafe', 'Wholesale'].map((item) => (
                    <a 
                        key={item}
                        onClick={() => scrollToSection(item.toLowerCase() === 'cafe' ? 'cafe' : item.toLowerCase())}
                        className="font-display text-3xl text-[#3D2314] hover:text-[#C67B4E] transition-colors cursor-pointer"
                    >
                        {item === 'Story' ? 'Our Story' : item === 'Cafe' ? 'Café' : item}
                    </a>
                ))}
            </div>
            
            <a onClick={() => scrollToSection('coffee')} className="btn-vintage px-10 py-4">
                Shop Beans
                <ShoppingBag className="w-4 h-4" />
            </a>
        </div>

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
            {/* Decorative Elements */}
            <div className="coffee-ring" style={{ top: '15%', right: '10%', transform: 'rotate(15deg)' }}></div>
            <div className="coffee-ring" style={{ bottom: '20%', left: '5%', transform: 'rotate(-10deg)' }}></div>
            
            <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left Content */}
                    <div>
                        <div ref={addAosRef} className="roast-fade-up vintage-badge mb-8">
                            Small Batch Roasters · Dublin
                        </div>
                        
                        <h1 ref={addAosRef} className="roast-fade-up text-5xl md:text-6xl lg:text-7xl font-display text-[#3D2314] mb-6 leading-tight" style={{ transitionDelay: '100ms' }}>
                            Crafted with <span className="handwritten text-[#C67B4E]">Passion,</span><br />
                            Roasted with Care
                        </h1>
                        
                        <p ref={addAosRef} className="roast-fade-up text-lg text-[#5C3D2E] mb-8 max-w-lg leading-relaxed" style={{ transitionDelay: '200ms' }}>
                            From the fishing village of Howth to your cup—we source exceptional single-origin beans and roast them to perfection in small batches, honouring the craft of specialty coffee.
                        </p>

                        {/* Stamp */}
                        <div ref={addAosRef} className="roast-fade-up stamp text-[#C67B4E] mb-10" style={{ transitionDelay: '250ms' }}>
                            <span className="font-mono text-xs tracking-wider">100% SPECIALTY GRADE</span>
                        </div>
                        
                        <div ref={addAosRef} className="roast-fade-up flex flex-wrap gap-4" style={{ transitionDelay: '300ms' }}>
                            <a onClick={() => scrollToSection('coffee')} className="btn-vintage">
                                Shop Our Beans
                                <ArrowRight className="w-4 h-4" />
                            </a>
                            <a onClick={() => scrollToSection('story')} className="btn-vintage-outline">
                                Our Story
                            </a>
                        </div>

                        {/* Trust Indicators */}
                        <div ref={addAosRef} className="roast-fade-up flex items-center gap-8 mt-12 pt-8 border-t border-[#3D2314]/20" style={{ transitionDelay: '400ms' }}>
                            <div className="text-center">
                                <span className="block text-3xl font-display text-[#3D2314]">9</span>
                                <span className="text-[10px] font-mono text-[#8B5E3C] uppercase tracking-wider">Years Roasting</span>
                            </div>
                            <div className="w-px h-12 bg-[#3D2314]/20"></div>
                            <div className="text-center">
                                <span className="block text-3xl font-display text-[#3D2314]">12</span>
                                <span className="text-[10px] font-mono text-[#8B5E3C] uppercase tracking-wider">Origin Countries</span>
                            </div>
                            <div className="w-px h-12 bg-[#3D2314]/20"></div>
                            <div className="text-center">
                                <span className="block text-3xl font-display text-[#3D2314]">50+</span>
                                <span className="text-[10px] font-mono text-[#8B5E3C] uppercase tracking-wider">Café Partners</span>
                            </div>
                        </div>
                    </div>

                    {/* Right - Hero Image */}
                    <div ref={addAosRef} className="roast-fade-left relative" style={{ transitionDelay: '200ms' }}>
                        <div className="relative">
                            {/* Main Image with frame */}
                            <div className="decorative-border bg-[#F5F0E8]">
                                <img src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600&h=700&fit=crop&q=80" 
                                     alt="Fresh roasted coffee beans" 
                                     className="w-full h-[500px] object-cover grayscale-[20%] sepia-[10%]" />
                            </div>
                            
                            {/* Wax Seal */}
                            <div className="absolute -bottom-6 -right-6 wax-seal">
                                <span className="text-[#F5F0E8] font-display text-xl">HR</span>
                            </div>
                        </div>

                        {/* Floating Card */}
                        <div className="absolute -left-8 top-1/2 -translate-y-1/2 paper-card p-6 max-w-[200px]">
                            <div className="flex items-center gap-3 mb-3">
                                <Award className="w-6 h-6 text-[#C67B4E]" />
                                <span className="font-mono text-[10px] tracking-wider text-[#8B5E3C] uppercase">Award Winner</span>
                            </div>
                            <p className="text-sm text-[#5C3D2E]">Irish Coffee Awards 2024 — Best Micro Roaster</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Featured Beans Section */}
        <section id="coffee" className="bg-[#3D2314] py-24 relative overflow-hidden">
            {/* Decorative */}
            <div className="absolute top-10 left-10 opacity-10">
                <svg width="200" height="200" viewBox="0 0 100 100" fill="none">
                    <circle cx="50" cy="50" r="45" stroke="#F5F0E8" strokeWidth="0.5"/>
                    <circle cx="50" cy="50" r="35" stroke="#F5F0E8" strokeWidth="0.5"/>
                    <circle cx="50" cy="50" r="25" stroke="#F5F0E8" strokeWidth="0.5"/>
                </svg>
            </div>
            
            <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <span ref={addAosRef} className="roast-fade-up font-mono text-xs tracking-[0.3em] text-[#D4956A] uppercase">Our Selection</span>
                    <h2 ref={addAosRef} className="roast-fade-up text-4xl md:text-5xl font-display text-[#F5F0E8] mt-4 mb-4" style={{ transitionDelay: '100ms' }}>
                        Current Roasts
                    </h2>
                    <div ref={addAosRef} className="roast-fade-up ornament-divider max-w-md mx-auto text-[#F5F0E8]/30" style={{ transitionDelay: '150ms' }}>
                        <span className="text-lg">☕</span>
                    </div>
                </div>

                {/* Products Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[ 
                        { title: "Yirgacheffe Natural", origin: "Ethiopia", price: "€14.50", desc: "Bright and fruity with notes of blueberry, jasmine, and dark chocolate. A stunning natural process from the Gedeo zone.", roast: 2, img: "1559056199-641a0ac8b55e" },
                        { title: "Huila Supremo", origin: "Colombia", price: "€13.50", desc: "Balanced and smooth with caramel sweetness, red apple acidity, and a nutty finish. Perfect for espresso or filter.", roast: 3, img: "1514432324607-a09d9b4aefdd" },
                        { title: "Howth Harbour", origin: "House Blend", price: "€12.00", desc: "Our signature blend. Brazilian & Guatemalan beans create a full body with chocolate, hazelnut, and sweet tobacco notes.", roast: 4, img: "1497636577773-f1231844b336" }
                    ].map((product, idx) => (
                        <div key={idx} ref={addAosRef} className="roast-fade-up paper-card product-card p-8 rounded-sm" style={{ transitionDelay: `${(idx + 1) * 100}ms` }}>
                            <div className="flex justify-between items-start mb-4">
                                <span className="font-mono text-[10px] tracking-wider text-[#C67B4E] uppercase">{product.origin}</span>
                                <span className="font-mono text-[10px] tracking-wider text-[#8B5E3C]">250g / {product.price}</span>
                            </div>
                            
                            <img src={`https://images.unsplash.com/photo-${product.img}?w=400&h=300&fit=crop&q=80`} 
                                 alt={`${product.origin} Coffee`} 
                                 className="w-full h-48 object-cover mb-6 grayscale-[20%] sepia-[10%]" />
                            
                            <h3 className="text-2xl font-display text-[#3D2314] mb-2">{product.title}</h3>
                            <p className="text-sm text-[#5C3D2E] mb-4 leading-relaxed">
                                {product.desc}
                            </p>
                            
                            {/* Roast Level */}
                            <div className="flex items-center justify-between mb-4">
                                <span className="font-mono text-[10px] tracking-wider text-[#8B5E3C] uppercase">Roast Level</span>
                                <div className="roast-level">
                                    {[1, 2, 3, 4, 5].map((lvl) => (
                                        <div key={lvl} className={`roast-dot ${lvl <= product.roast ? 'filled' : ''}`}></div>
                                    ))}
                                </div>
                            </div>
                            
                            <a className="btn-vintage-outline w-full justify-center text-[11px] cursor-pointer">
                                Add to Bag
                                <Plus className="w-4 h-4" />
                            </a>
                        </div>
                    ))}
                </div>

                {/* View All */}
                <div ref={addAosRef} className="roast-fade-up text-center mt-12">
                    <a className="inline-flex items-center gap-3 text-[#F5F0E8] font-mono text-sm tracking-wider hover:text-[#D4956A] transition-colors cursor-pointer">
                        View All Coffee <ArrowRight className="w-4 h-4" />
                    </a>
                </div>
            </div>
        </section>

        {/* Our Story Section */}
        <section id="story" className="py-24 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left - Images */}
                    <div ref={addAosRef} className="roast-fade-right relative">
                        {/* Main Image */}
                        <div className="decorative-border bg-[#F5F0E8] max-w-md">
                            <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&h=600&fit=crop&q=80" 
                                 alt="Coffee roasting" 
                                 className="w-full h-[450px] object-cover grayscale-[20%] sepia-[10%]" />
                        </div>
                        
                        {/* Secondary Image */}
                        <div className="absolute -bottom-8 -right-8 w-48 h-48 paper-card p-2">
                            <img src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=300&h=300&fit=crop&q=80" 
                                 alt="Coffee cup" 
                                 className="w-full h-full object-cover grayscale-[20%] sepia-[10%]" />
                        </div>

                        {/* Year Badge */}
                        <div className="absolute top-8 -left-4 bg-[#C67B4E] text-[#F5F0E8] px-4 py-2 transform -rotate-6">
                            <span className="font-mono text-xs tracking-wider">Since 2015</span>
                        </div>
                    </div>

                    {/* Right - Content */}
                    <div>
                        <span ref={addAosRef} className="roast-fade-up font-mono text-xs tracking-[0.3em] text-[#C67B4E] uppercase">Our Story</span>
                        
                        <h2 ref={addAosRef} className="roast-fade-up text-4xl md:text-5xl font-display text-[#3D2314] mt-4 mb-6 leading-tight" style={{ transitionDelay: '100ms' }}>
                            From a Fishing Village to Your Cup
                        </h2>
                        
                        <p ref={addAosRef} className="roast-fade-up text-[#5C3D2E] mb-6 leading-relaxed" style={{ transitionDelay: '200ms' }}>
                            It began in a small shed overlooking Howth Harbour. Declan Murphy, a former fisherman turned coffee obsessive, started roasting beans for friends and family on a vintage 1kg drum roaster he'd restored himself.
                        </p>
                        
                        <p ref={addAosRef} className="roast-fade-up text-[#5C3D2E] mb-8 leading-relaxed" style={{ transitionDelay: '300ms' }}>
                            What started as a weekend hobby quickly became a calling. By 2017, we'd outgrown the shed and moved to our current roastery—a converted Victorian warehouse on Howth Road. Today, we roast over 500kg weekly, supplying Dublin's best cafés while staying true to our small-batch philosophy.
                        </p>

                        {/* Values */}
                        <div ref={addAosRef} className="roast-fade-up grid grid-cols-2 gap-6 mb-8" style={{ transitionDelay: '400ms' }}>
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 border border-[#3D2314] rounded-full flex items-center justify-center flex-shrink-0">
                                    <Leaf className="w-5 h-5 text-[#6B7B3C]" />
                                </div>
                                <div>
                                    <h4 className="font-display text-lg text-[#3D2314] mb-1">Sustainably Sourced</h4>
                                    <p className="text-xs text-[#5C3D2E]">Direct trade relationships</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 border border-[#3D2314] rounded-full flex items-center justify-center flex-shrink-0">
                                    <Flame className="w-5 h-5 text-[#C67B4E]" />
                                </div>
                                <div>
                                    <h4 className="font-display text-lg text-[#3D2314] mb-1">Fresh Roasted</h4>
                                    <p className="text-xs text-[#5C3D2E]">Roasted to order weekly</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 border border-[#3D2314] rounded-full flex items-center justify-center flex-shrink-0">
                                    <HandHeart className="w-5 h-5 text-[#A0522D]" />
                                </div>
                                <div>
                                    <h4 className="font-display text-lg text-[#3D2314] mb-1">Hand Crafted</h4>
                                    <p className="text-xs text-[#5C3D2E]">Small batch artisan roasting</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 border border-[#3D2314] rounded-full flex items-center justify-center flex-shrink-0">
                                    <Users className="w-5 h-5 text-[#8B5E3C]" />
                                </div>
                                <div>
                                    <h4 className="font-display text-lg text-[#3D2314] mb-1">Community First</h4>
                                    <p className="text-xs text-[#5C3D2E]">Supporting local always</p>
                                </div>
                            </div>
                        </div>

                        <div ref={addAosRef} className="roast-fade-up" style={{ transitionDelay: '500ms' }}>
                            <a onClick={() => scrollToSection('cafe')} className="btn-vintage">
                                Visit Our Roastery
                                <MapPin className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Process Section */}
        <section id="process" className="bg-[#EBE4D8] py-24 relative">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <span ref={addAosRef} className="roast-fade-up font-mono text-xs tracking-[0.3em] text-[#C67B4E] uppercase">The Craft</span>
                    <h2 ref={addAosRef} className="roast-fade-up text-4xl md:text-5xl font-display text-[#3D2314] mt-4 mb-4" style={{ transitionDelay: '100ms' }}>
                        Our Roasting Process
                    </h2>
                    <div ref={addAosRef} className="roast-fade-up ornament-divider max-w-md mx-auto" style={{ transitionDelay: '150ms' }}>
                        <span className="text-[#8B5E3C] text-lg">◆</span>
                    </div>
                </div>

                {/* Process Steps */}
                <div className="grid md:grid-cols-4 gap-8">
                    {[ 
                        { icon: Globe, title: "Source", desc: "We travel to origin, building relationships with farmers who share our commitment to quality." },
                        { icon: FlaskConical, title: "Cup & Select", desc: "Every coffee is cupped rigorously. Only specialty grade beans make it to our roaster." },
                        { icon: Flame, title: "Roast", desc: "Small batches, careful attention. Each profile is crafted to highlight the bean's character." },
                        { icon: Package, title: "Deliver", desc: "Freshly packed and shipped within 48 hours of roasting for peak flavour." }
                    ].map((step, idx) => (
                        <div key={idx} ref={addAosRef} className="roast-fade-up process-step text-center" style={{ transitionDelay: `${(idx + 1) * 100}ms` }}>
                            <div className="w-20 h-20 mx-auto mb-6 border-2 border-[#3D2314] rounded-full flex items-center justify-center bg-[#F5F0E8]">
                                <step.icon className="w-8 h-8 text-[#3D2314]" />
                            </div>
                            <span className="font-mono text-xs tracking-wider text-[#C67B4E]">0{idx + 1}</span>
                            <h3 className="text-xl font-display text-[#3D2314] mt-2 mb-3">{step.title}</h3>
                            <p className="text-sm text-[#5C3D2E]">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* Café Section */}
        <section id="cafe" className="py-24 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left - Content */}
                    <div>
                        <span ref={addAosRef} className="roast-fade-up font-mono text-xs tracking-[0.3em] text-[#C67B4E] uppercase">The Tasting Room</span>
                        
                        <h2 ref={addAosRef} className="roast-fade-up text-4xl md:text-5xl font-display text-[#3D2314] mt-4 mb-6 leading-tight" style={{ transitionDelay: '100ms' }}>
                            Visit Our Café
                        </h2>
                        
                        <p ref={addAosRef} className="roast-fade-up text-[#5C3D2E] mb-8 leading-relaxed" style={{ transitionDelay: '200ms' }}>
                            Step into our tasting room on Howth Road, where you can watch the roasting process, sample our latest single origins, and enjoy expertly crafted espresso drinks. Our baristas are happy to guide you through our current offerings and help you find your perfect cup.
                        </p>

                        {/* Café Details */}
                        <div ref={addAosRef} className="roast-fade-up space-y-4 mb-8" style={{ transitionDelay: '300ms' }}>
                            <div className="paper-card p-4 flex items-center gap-4">
                                <MapPin className="w-5 h-5 text-[#C67B4E]" />
                                <div>
                                    <span className="font-mono text-[10px] tracking-wider text-[#8B5E3C] uppercase">Address</span>
                                    <p className="text-[#3D2314]">42 Howth Road, Clontarf, Dublin 3</p>
                                </div>
                            </div>
                            <div className="paper-card p-4 flex items-center gap-4">
                                <Clock className="w-5 h-5 text-[#C67B4E]" />
                                <div>
                                    <span className="font-mono text-[10px] tracking-wider text-[#8B5E3C] uppercase">Hours</span>
                                    <p className="text-[#3D2314]">Mon–Fri: 7am–5pm · Sat–Sun: 8am–6pm</p>
                                </div>
                            </div>
                            <div className="paper-card p-4 flex items-center gap-4">
                                <Phone className="w-5 h-5 text-[#C67B4E]" />
                                <div>
                                    <span className="font-mono text-[10px] tracking-wider text-[#8B5E3C] uppercase">Contact</span>
                                    <p className="text-[#3D2314]">+353 1 833 4567</p>
                                </div>
                            </div>
                        </div>

                        <div ref={addAosRef} className="roast-fade-up flex flex-wrap gap-4" style={{ transitionDelay: '400ms' }}>
                            <a href="#" className="btn-vintage">
                                Get Directions
                                <Navigation className="w-4 h-4" />
                            </a>
                            <a href="#" className="btn-vintage-outline">
                                View Menu
                            </a>
                        </div>
                    </div>

                    {/* Right - Images */}
                    <div ref={addAosRef} className="roast-fade-left relative">
                        <div className="decorative-border bg-[#F5F0E8]">
                            <img src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&h=500&fit=crop&q=80" 
                                 alt="Howth Road Roasters café interior" 
                                 className="w-full h-[450px] object-cover grayscale-[20%] sepia-[10%]" />
                        </div>
                        
                        {/* Floating testimonial */}
                        <div className="absolute -bottom-8 -left-8 paper-card p-6 max-w-[280px]">
                            <div className="flex gap-1 mb-3">
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <Star key={s} className="w-4 h-4 fill-[#C67B4E] text-[#C67B4E]" />
                                ))}
                            </div>
                            <p className="text-sm text-[#5C3D2E] italic mb-2">"Best flat white in Dublin. The atmosphere is so cosy, I come here to work every week."</p>
                            <span className="font-mono text-[10px] tracking-wider text-[#8B5E3C]"> — Sarah K., Google Review</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Wholesale Section */}
        <section id="wholesale" className="bg-[#1E1108] py-24 relative overflow-hidden">
            {/* Decorative */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23F5F0E8\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
            </div>
            
            <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left - Content */}
                    <div>
                        <span ref={addAosRef} className="roast-fade-up font-mono text-xs tracking-[0.3em] text-[#D4956A] uppercase">For Business</span>
                        
                        <h2 ref={addAosRef} className="roast-fade-up text-4xl md:text-5xl font-display text-[#F5F0E8] mt-4 mb-6 leading-tight" style={{ transitionDelay: '100ms' }}>
                            Wholesale Partners
                        </h2>
                        
                        <p ref={addAosRef} className="roast-fade-up text-[#D4C4A8]/80 mb-8 leading-relaxed" style={{ transitionDelay: '200ms' }}>
                            We're proud to supply over 50 cafés, restaurants, and offices across Ireland. Our wholesale programme includes training, equipment support, and flexible delivery schedules to help your business serve exceptional coffee.
                        </p>

                        {/* Benefits */}
                        <div ref={addAosRef} className="roast-fade-up space-y-4 mb-8" style={{ transitionDelay: '300ms' }}>
                            {[ 
                                "Free barista training for your team",
                                "Equipment maintenance & support",
                                "Flexible weekly or bi-weekly delivery",
                                "Custom blends available"
                            ].map((benefit, i) => (
                                <div key={i} className="flex items-center gap-4">
                                    <CheckCircle className="w-5 h-5 text-[#C67B4E]" />
                                    <span className="text-[#F5F0E8]">{benefit}</span>
                                </div>
                            ))}
                        </div>

                        <div ref={addAosRef} className="roast-fade-up" style={{ transitionDelay: '400ms' }}>
                            <a onClick={() => scrollToSection('contact')} className="inline-flex items-center gap-3 px-8 py-4 bg-[#C67B4E] text-[#F5F0E8] font-mono text-sm tracking-wider uppercase hover:bg-[#D4956A] transition-colors cursor-pointer">
                                Enquire Now
                                <ArrowRight className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Right - Partner Logos/Testimonial */}
                    <div ref={addAosRef} className="roast-fade-left text-center">
                        <div className="paper-card p-10">
                            <div className="vintage-quote mb-6">
                                <p className="text-xl font-display text-[#3D2314] italic leading-relaxed">
                                    "Howth Road Roasters transformed our coffee offering. Their training and support has been invaluable, and our customers constantly compliment the quality."
                                </p>
                            </div>
                            <div className="flex items-center justify-center gap-4">
                                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&q=80" 
                                     alt="Cafe owner" 
                                     className="w-14 h-14 rounded-full object-cover grayscale" />
                                <div className="text-left">
                                    <span className="block font-display text-[#3D2314]">Ciarán O'Sullivan</span>
                                    <span className="font-mono text-[10px] tracking-wider text-[#8B5E3C] uppercase">Owner, The Chestnut Café</span>
                                </div>
                            </div>
                        </div>

                        {/* Partner Count */}
                        <div className="mt-8 flex justify-center gap-12">
                            <div className="text-center">
                                <span className="block text-4xl font-display text-[#F5F0E8]">50+</span>
                                <span className="font-mono text-[10px] tracking-wider text-[#D4C4A8]/60 uppercase">Café Partners</span>
                            </div>
                            <div className="text-center">
                                <span className="block text-4xl font-display text-[#F5F0E8]">12</span>
                                <span className="font-mono text-[10px] tracking-wider text-[#D4C4A8]/60 uppercase">Restaurants</span>
                            </div>
                            <div className="text-center">
                                <span className="block text-4xl font-display text-[#F5F0E8]">8</span>
                                <span className="font-mono text-[10px] tracking-wider text-[#D4C4A8]/60 uppercase">Office Clients</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Newsletter & Contact Section */}
        <section id="contact" className="py-24 relative">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="grid lg:grid-cols-2 gap-16">
                    {/* Left - Newsletter */}
                    <div>
                        <span ref={addAosRef} className="roast-fade-up font-mono text-xs tracking-[0.3em] text-[#C67B4E] uppercase">Stay Connected</span>
                        
                        <h2 ref={addAosRef} className="roast-fade-up text-4xl font-display text-[#3D2314] mt-4 mb-6" style={{ transitionDelay: '100ms' }}>
                            Join the Roasters' Circle
                        </h2>
                        
                        <p ref={addAosRef} className="roast-fade-up text-[#5C3D2E] mb-8 leading-relaxed" style={{ transitionDelay: '200ms' }}>
                            Subscribe for early access to new roasts, brewing tips, and exclusive offers. We send one email per month—no spam, just great coffee.
                        </p>

                        <form ref={addAosRef} className="roast-fade-up space-y-4" style={{ transitionDelay: '300ms' }} onSubmit={(e) => e.preventDefault()}>
                            <div className="flex gap-4">
                                <input type="email" placeholder="Your email address" 
                                       className="flex-1 px-6 py-4 bg-[#EBE4D8] border border-[#3D2314]/20 text-[#3D2314] placeholder-[#8B5E3C]/50 focus:outline-none focus:border-[#C67B4E] transition-colors" />
                                <button type="submit" className="btn-vintage">
                                    Subscribe
                                </button>
                            </div>
                            <p className="text-xs text-[#5C3D2E]">
                                By subscribing, you agree to receive our newsletter. Unsubscribe anytime.
                            </p>
                        </form>

                        {/* Social Links */}
                        <div ref={addAosRef} className="roast-fade-up mt-10" style={{ transitionDelay: '400ms' }}>
                            <span className="font-mono text-[10px] tracking-wider text-[#8B5E3C] uppercase block mb-4">Follow Us</span>
                            <div className="flex gap-4">
                                <a href="#" className="w-12 h-12 border border-[#3D2314] flex items-center justify-center hover:bg-[#3D2314] hover:text-[#F5F0E8] transition-all">
                                    <Instagram className="w-5 h-5" />
                                </a>
                                <a href="#" className="w-12 h-12 border border-[#3D2314] flex items-center justify-center hover:bg-[#3D2314] hover:text-[#F5F0E8] transition-all">
                                    <Facebook className="w-5 h-5" />
                                </a>
                                <a href="#" className="w-12 h-12 border border-[#3D2314] flex items-center justify-center hover:bg-[#3D2314] hover:text-[#F5F0E8] transition-all">
                                    <Twitter className="w-5 h-5" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right - Contact Form */}
                    <div ref={addAosRef} className="roast-fade-left paper-card p-8 lg:p-10">
                        <h3 className="text-2xl font-display text-[#3D2314] mb-6">Get in Touch</h3>
                        
                        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block font-mono text-[10px] tracking-wider text-[#8B5E3C] uppercase mb-2">Name</label>
                                    <input type="text" className="w-full px-4 py-3 bg-[#F5F0E8] border border-[#3D2314]/20 text-[#3D2314] focus:outline-none focus:border-[#C67B4E] transition-colors" placeholder="Your name" />
                                </div>
                                <div>
                                    <label className="block font-mono text-[10px] tracking-wider text-[#8B5E3C] uppercase mb-2">Email</label>
                                    <input type="email" className="w-full px-4 py-3 bg-[#F5F0E8] border border-[#3D2314]/20 text-[#3D2314] focus:outline-none focus:border-[#C67B4E] transition-colors" placeholder="your@email.com" />
                                </div>
                            </div>
                            
                            <div>
                                <label className="block font-mono text-[10px] tracking-wider text-[#8B5E3C] uppercase mb-2">Subject</label>
                                <select className="w-full px-4 py-3 bg-[#F5F0E8] border border-[#3D2314]/20 text-[#3D2314] focus:outline-none focus:border-[#C67B4E] transition-colors">
                                    <option>General Enquiry</option>
                                    <option>Wholesale Partnership</option>
                                    <option>Roastery Visit</option>
                                    <option>Online Order Support</option>
                                </select>
                            </div>
                            
                            <div>
                                <label className="block font-mono text-[10px] tracking-wider text-[#8B5E3C] uppercase mb-2">Message</label>
                                <textarea rows={4} className="w-full px-4 py-3 bg-[#F5F0E8] border border-[#3D2314]/20 text-[#3D2314] focus:outline-none focus:border-[#C67B4E] transition-colors resize-none" placeholder="How can we help?"></textarea>
                            </div>
                            
                            <button type="submit" className="btn-vintage w-full justify-center">
                                Send Message
                                <Send className="w-4 h-4" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>

        {/* Footer */}
        <footer className="bg-[#3D2314] py-16">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div>
                        <a href="#" className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 rounded-full border-2 border-[#F5F0E8]/30 flex items-center justify-center">
                                <span className="font-display text-lg text-[#F5F0E8]">HR</span>
                            </div>
                            <div>
                                <span className="block font-display text-lg text-[#F5F0E8]">Howth Road</span>
                                <span className="block font-mono text-[9px] tracking-[0.2em] text-[#F5F0E8]/50 uppercase">Roasters</span>
                            </div>
                        </a>
                        <p className="text-sm text-[#F5F0E8]/60 leading-relaxed">
                            Small batch specialty coffee roasters based in Dublin since 2015.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-mono text-[10px] tracking-wider text-[#F5F0E8]/40 uppercase mb-4">Shop</h4>
                        <ul className="space-y-3 text-sm">
                            <li><a href="#" className="text-[#F5F0E8]/70 hover:text-[#D4956A] transition-colors">All Coffee</a></li>
                            <li><a href="#" className="text-[#F5F0E8]/70 hover:text-[#D4956A] transition-colors">Single Origins</a></li>
                            <li><a href="#" className="text-[#F5F0E8]/70 hover:text-[#D4956A] transition-colors">Blends</a></li>
                            <li><a href="#" className="text-[#F5F0E8]/70 hover:text-[#D4956A] transition-colors">Subscriptions</a></li>
                            <li><a href="#" className="text-[#F5F0E8]/70 hover:text-[#D4956A] transition-colors">Equipment</a></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="font-mono text-[10px] tracking-wider text-[#F5F0E8]/40 uppercase mb-4">Company</h4>
                        <ul className="space-y-3 text-sm">
                            <li><a href="#" className="text-[#F5F0E8]/70 hover:text-[#D4956A] transition-colors">Our Story</a></li>
                            <li><a href="#" className="text-[#F5F0E8]/70 hover:text-[#D4956A] transition-colors">The Café</a></li>
                            <li><a href="#" className="text-[#F5F0E8]/70 hover:text-[#D4956A] transition-colors">Wholesale</a></li>
                            <li><a href="#" className="text-[#F5F0E8]/70 hover:text-[#D4956A] transition-colors">Sustainability</a></li>
                            <li><a href="#" className="text-[#F5F0E8]/70 hover:text-[#D4956A] transition-colors">Careers</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-mono text-[10px] tracking-wider text-[#F5F0E8]/40 uppercase mb-4">Contact</h4>
                        <ul className="space-y-3 text-sm text-[#F5F0E8]/70">
                            <li>42 Howth Road</li>
                            <li>Clontarf, Dublin 3</li>
                            <li><a href="tel:+35318334567" className="hover:text-[#D4956A] transition-colors">+353 1 833 4567</a></li>
                            <li><a href="mailto:hello@howthroadroasters.ie" className="hover:text-[#D4956A] transition-colors">hello@howthroadroasters.ie</a></li>
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-[#F5F0E8]/10 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="font-mono text-[10px] tracking-wider text-[#F5F0E8]/40 uppercase">
                            © 2025 Howth Road Roasters. All rights reserved.
                        </p>
                        <div className="flex gap-6 font-mono text-[10px] tracking-wider text-[#F5F0E8]/40 uppercase">
                            <a href="#" className="hover:text-[#F5F0E8] transition-colors">Privacy</a>
                            <a href="#" className="hover:text-[#F5F0E8] transition-colors">Terms</a>
                            <a href="#" className="hover:text-[#F5F0E8] transition-colors">Shipping</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    </div>
  );
}
