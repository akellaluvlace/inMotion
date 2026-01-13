'use client';

import React, { useEffect, useState, useRef } from 'react';
import { 
  LayoutGrid, 
  ArrowRight, 
  Menu, 
  X, 
  ArrowUpRight, 
  Palette, 
  Monitor, 
  Smartphone, 
  Play, 
  Box, 
  Zap, 
  Mail, 
  Instagram, 
  Dribbble, 
  Linkedin,
  Star
} from 'lucide-react';

// Inject keyframe animations and styles
const injectStyles = () => {
  if (typeof document === 'undefined') return;
  if (document.getElementById('loud-styles')) return;

  const style = document.createElement('style');
  style.id = 'loud-styles';
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&display=swap');

    .loud-wrapper * {
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      box-sizing: border-box;
    }

    .loud-wrapper { 
        font-family: 'Inter', system-ui, sans-serif; 
        background: #FFFDF5;
        color: #121212;
        overflow-x: hidden;
    }

    /* Noise Texture Overlay */
    .loud-wrapper .noise-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        pointer-events: none;
        z-index: 9999;
        opacity: 0.03;
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    }

    .loud-wrapper ::selection {
        background: #FAFF00;
        color: #000;
    }

    /* Components */
    .loud-wrapper .neo-box {
        background: #FFFFFF;
        border: 3px solid #121212;
        box-shadow: 5px 5px 0px 0px #121212;
        transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }

    .loud-wrapper .neo-nav-box {
        background: #FFFFFF;
        border: 3px solid #121212;
        box-shadow: 4px 4px 0px 0px #121212;
        transition: all 0.2s ease;
    }

    .loud-wrapper .neo-box:hover {
        transform: translate(-2px, -2px);
        box-shadow: 7px 7px 0px 0px #121212;
    }

    .loud-wrapper .neo-box:active {
        transform: translate(3px, 3px);
        box-shadow: 2px 2px 0px 0px #121212;
    }

    /* Buttons */
    .loud-wrapper .neo-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        padding: 1rem 2rem;
        border: 3px solid #121212;
        background: #121212;
        color: #FAFF00;
        box-shadow: 4px 4px 0 0 #FAFF00;
        transition: all 0.15s ease;
        white-space: nowrap;
        cursor: pointer;
    }

    .loud-wrapper .neo-btn:hover {
        transform: translate(-2px, -2px);
        box-shadow: 6px 6px 0 0 #FAFF00;
    }

    .loud-wrapper .neo-btn:active {
        transform: translate(4px, 4px);
        box-shadow: 0 0 0 0 #FAFF00;
    }

    .loud-wrapper .neo-btn-outline {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        padding: 1rem 2rem;
        border: 3px solid #121212;
        background: transparent;
        color: #121212;
        box-shadow: 4px 4px 0 0 #121212;
        transition: all 0.15s ease;
        white-space: nowrap;
        cursor: pointer;
    }

    .loud-wrapper .neo-btn-outline:hover {
        background: #FAFF00;
        transform: translate(-2px, -2px);
        box-shadow: 6px 6px 0 0 #121212;
    }

    .loud-wrapper .neo-btn-outline:active {
        transform: translate(4px, 4px);
        box-shadow: 0 0 0 0 #121212;
    }

    /* Utilities */
    .loud-wrapper .text-stroke {
        -webkit-text-stroke: 1px #121212;
        -webkit-text-fill-color: transparent;
    }
    
    .loud-wrapper .text-stroke-white {
        -webkit-text-stroke: 1px #FFF;
        -webkit-text-fill-color: transparent;
    }

    .loud-wrapper .neo-badge {
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.75rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        border: 2px solid #121212;
        background: #FAFF00;
        padding: 0.25rem 0.75rem;
        box-shadow: 2px 2px 0 0 #121212;
    }

    /* Background Patterns */
    .loud-wrapper .bg-grid {
        background-size: 40px 40px;
        background-image: linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px),
                          linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px);
    }

    .loud-wrapper .bg-dots {
        background-image: radial-gradient(#121212 1px, transparent 1px);
        background-size: 20px 20px;
        opacity: 0.4;
    }

    .loud-wrapper .img-grayscale {
        filter: grayscale(100%) contrast(1.1);
        transition: filter 0.8s cubic-bezier(0.33, 1, 0.68, 1);
        will-change: filter;
    }

    @media (min-width: 1024px) {
        .loud-wrapper .group:hover .img-grayscale {
            filter: grayscale(0%) contrast(1);
        }
    }

    .loud-wrapper .img-grayscale.revealed {
        filter: grayscale(0%) contrast(1);
    }

    .loud-wrapper .nav-link {
        position: relative;
        cursor: pointer;
    }
    .loud-wrapper .nav-link::after {
        content: '';
        position: absolute;
        bottom: -4px;
        left: 0;
        width: 0%;
        height: 3px;
        background: #FAFF00;
        border: 1px solid #121212;
        transition: width 0.2s ease;
    }
    .loud-wrapper .nav-link:hover::after {
        width: 100%;
    }

    .loud-wrapper .hover-wiggle:hover { animation: wiggle 0.4s ease-in-out infinite; }
    @keyframes wiggle {
        0%, 100% { transform: rotate(-3deg); }
        50% { transform: rotate(3deg); }
    }

    .loud-wrapper .floating { animation: float 6s ease-in-out infinite; }
    @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-15px); }
    }

    /* Marquee Animation */
    @keyframes marquee-loud {
        0% { transform: translateX(0%); }
        100% { transform: translateX(-50%); }
    }

    .loud-wrapper .animate-marquee-loud {
        animation: marquee-loud 25s linear infinite;
    }

    /* AOS Replacement Classes */
    .loud-fade-up {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    
    .loud-fade-left {
        opacity: 0;
        transform: translateX(30px);
        transition: opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }

    .loud-fade-right {
        opacity: 0;
        transform: translateX(-30px);
        transition: opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }

    .loud-animate {
        opacity: 1;
        transform: translate(0);
    }
  `;
  document.head.appendChild(style);
};

export default function LOUDStudio({ previewMode = false }: { previewMode?: boolean }) {
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
            entry.target.classList.add('loud-animate');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    aosRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    // Also observe images for grayscale reveal
    const imgObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        },
        { threshold: 0.2 }
    );

    document.querySelectorAll('.img-grayscale').forEach((img) => {
        imgObserver.observe(img);
    });

    return () => {
        observer.disconnect();
        imgObserver.disconnect();
    };
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
    <div className="loud-wrapper relative min-h-screen">
        {/* Noise Texture */}
        <div className="noise-overlay"></div>

        {/* Floating Decor */}
        <div className="fixed top-32 left-10 w-12 h-12 bg-[#FAFF00] border-[3px] border-[#121212] rounded-full floating hidden lg:block" style={{ animationDelay: '0s' }}></div>
        <div className="fixed bottom-20 right-10 w-8 h-8 bg-[#FF6B9D] border-[3px] border-[#121212] rotate-12 floating hidden lg:block" style={{ animationDelay: '1.5s' }}></div>

        {/* Navigation */}
        <nav 
            className="fixed top-0 left-0 right-0 z-50 px-4 py-4 lg:py-6 w-full"
            style={{ top: previewMode ? '64px' : '0' }}
        >
            <div className="max-w-7xl mx-auto">
                <div className="neo-nav-box px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between bg-white relative">
                    {/* Logo */}
                    <a onClick={() => scrollToSection('top')} className="flex items-center gap-2 sm:gap-3 group z-50 relative cursor-pointer">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#FAFF00] border-[3px] border-[#121212] flex items-center justify-center font-black text-lg sm:text-xl hover-wiggle">
                            L
                        </div>
                        <span className="text-lg sm:text-xl font-black tracking-tighter">LOUD<span className="text-[#FF6B9D]">.</span></span>
                    </a>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-6 lg:gap-8">
                        {['Work', 'Services', 'About'].map((item) => (
                            <a 
                                key={item}
                                onClick={() => scrollToSection(item.toLowerCase())}
                                className="nav-link font-bold text-sm uppercase tracking-widest"
                            >
                                {item}
                            </a>
                        ))}
                        <a onClick={() => scrollToSection('contact')} className="neo-btn py-2 px-6 text-xs shadow-[3px_3px_0px_0px_#121212] hover:shadow-[5px_5px_0px_0px_#121212]">
                            Let's Talk
                        </a>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button onClick={toggleMobileMenu} className="md:hidden w-10 h-10 border-[3px] border-[#121212] bg-[#121212] text-white flex items-center justify-center shadow-[3px_3px_0px_0px_#121212] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all z-50 relative">
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>

                    {/* Mobile Menu Overlay */}
                    <div 
                        className={`fixed inset-0 bg-[#FAFF00] z-40 transform transition-transform duration-300 ease-in-out flex flex-col justify-center items-center border-l-4 border-[#121212] w-screen h-screen ${
                            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                        }`}
                    >
                        <div className="flex flex-col gap-6 sm:gap-8 text-center">
                            {['Work', 'Services', 'About'].map((item) => (
                                <a 
                                    key={item}
                                    onClick={() => scrollToSection(item.toLowerCase())}
                                    className="text-3xl sm:text-4xl font-black uppercase text-stroke hover:text-[#121212] transition-colors cursor-pointer"
                                >
                                    {item}
                                </a>
                            ))}
                            <a onClick={() => scrollToSection('contact')} className="text-3xl sm:text-4xl font-black uppercase text-[#121212] underline decoration-4 underline-offset-4 decoration-white cursor-pointer">Contact</a>
                        </div>
                        <div className="absolute bottom-10 text-sm font-mono font-bold">LOUD STUDIO 2025</div>
                    </div>
                </div>
            </div>
        </nav>

        {/* Hero Section */}
        <section className="min-h-screen flex items-center pt-32 pb-20 relative bg-grid overflow-hidden">
            <div className="max-w-7xl mx-auto w-full px-4 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left Content */}
                    <div className="relative z-10 order-2 lg:order-1">
                        <div ref={addAosRef} className="loud-fade-up mb-6 sm:mb-8">
                            <span className="neo-badge inline-flex items-center gap-2">
                                <span className="w-2 h-2 bg-[#FF6B9D] rounded-full animate-pulse"></span>
                                Accepting New Projects
                            </span>
                        </div>

                        <h1 ref={addAosRef} className="loud-fade-up text-4xl sm:text-6xl md:text-7xl xl:text-8xl font-black leading-[0.95] sm:leading-[0.9] mb-6 sm:mb-8 tracking-tight break-words" style={{ transitionDelay: '100ms' }}>
                            We make<br />
                            brands<br />
                            <span className="relative inline-block px-2">
                                <span className="absolute inset-0 bg-[#FF6B9D] border-[3px] border-[#121212] transform -rotate-2 -z-10 shadow-[3px_3px_0px_0px_#121212]"></span>
                                impossible
                            </span><br />
                            to ignore<span className="text-[#FF6B9D]">.</span>
                        </h1>

                        <p ref={addAosRef} className="loud-fade-up text-base sm:text-lg sm:text-xl font-medium mb-8 sm:mb-10 max-w-lg leading-relaxed border-l-4 border-[#FAFF00] pl-4 sm:pl-6" style={{ transitionDelay: '200ms' }}>
                            Bold design for bold brands. We create visual identities that slap, websites that convert, and campaigns that stick.
                        </p>

                        <div ref={addAosRef} className="loud-fade-up flex flex-col sm:flex-row gap-4 w-full sm:w-auto" style={{ transitionDelay: '300ms' }}>
                            <a onClick={() => scrollToSection('work')} className="neo-btn w-full sm:w-auto">See Our Work</a>
                            <a onClick={() => scrollToSection('contact')} className="neo-btn-outline w-full sm:w-auto">Start a Project</a>
                        </div>

                        <div ref={addAosRef} className="loud-fade-up flex gap-8 mt-12 sm:mt-16 pt-8 border-t-[3px] border-[#121212]/10" style={{ transitionDelay: '400ms' }}>
                            <div>
                                <div className="text-2xl sm:text-3xl font-black">150+</div>
                                <div className="text-xs font-mono uppercase font-bold text-gray-500">Projects</div>
                            </div>
                            <div>
                                <div className="text-2xl sm:text-3xl font-black">8Y</div>
                                <div className="text-xs font-mono uppercase font-bold text-gray-500">Experience</div>
                            </div>
                        </div>
                    </div>

                    {/* Right Visual */}
                    <div ref={addAosRef} className="loud-fade-left relative order-1 lg:order-2 flex justify-center lg:justify-end mb-8 lg:mb-0" style={{ transitionDelay: '200ms' }}>
                        <div className="relative w-full max-w-sm sm:max-w-md">
                            <div className="absolute top-4 left-4 w-full h-full bg-[#FF6B9D] border-[3px] border-[#121212] z-0"></div>
                            <div className="relative z-10 bg-[#FAFF00] border-[3px] border-[#121212] p-4 sm:p-6 shadow-[5px_5px_0px_0px_#121212]">
                                <div className="flex justify-between items-center mb-4 border-b-[3px] border-[#121212] pb-4">
                                    <span className="font-mono text-xs font-bold uppercase">Featured Project</span>
                                    <div className="flex gap-1">
                                        <div className="w-3 h-3 rounded-full border-2 border-[#121212] bg-white"></div>
                                        <div className="w-3 h-3 rounded-full border-2 border-[#121212] bg-white"></div>
                                    </div>
                                </div>
                                <div className="aspect-[4/3] w-full border-[3px] border-[#121212] overflow-hidden mb-4 relative group cursor-pointer">
                                    <img src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2787&auto=format&fit=crop" 
                                         alt="Neon Brand Project" 
                                         className="w-full h-full object-cover img-grayscale transform group-hover:scale-110 transition-transform duration-500" />
                                    <div className="absolute inset-0 bg-[#4D9FFF]/20 group-hover:bg-transparent transition-colors"></div>
                                </div>
                                <div className="flex justify-between items-end">
                                    <div>
                                        <h3 className="text-xl sm:text-2xl font-black leading-none">Neon Fitness</h3>
                                        <p className="font-mono text-xs mt-1">Brand Identity / Web</p>
                                    </div>
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#121212] text-white flex items-center justify-center border-2 border-[#121212] hover:bg-white hover:text-[#121212] transition-colors">
                                        <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
                                    </div>
                                </div>
                            </div>
                            <div className="absolute -top-4 -right-2 sm:-top-6 sm:-right-6 bg-white border-[3px] border-[#121212] px-3 py-1 sm:px-4 sm:py-2 shadow-[3px_3px_0px_0px_#121212] transform rotate-6 z-20">
                                <span className="font-black text-xs sm:text-sm">★ TOP RATED</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Infinite Marquee */}
        <div className="py-6 bg-[#121212] text-white border-y-[3px] border-white overflow-hidden relative z-20 w-full">
            <div className="flex whitespace-nowrap w-max animate-marquee-loud">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-8 sm:gap-12 mx-4 sm:mx-6">
                        <span className="text-2xl sm:text-4xl font-black italic">BRANDING</span>
                        <span className="text-xl sm:text-2xl text-[#FAFF00]">✦</span>
                        <span className="text-2xl sm:text-4xl font-black text-stroke-white">WEB DESIGN</span>
                        <span className="text-xl sm:text-2xl text-[#FF6B9D]">✦</span>
                        <span className="text-2xl sm:text-4xl font-black italic">UI/UX</span>
                        <span className="text-xl sm:text-2xl text-[#4D9FFF]">✦</span>
                        <span className="text-2xl sm:text-4xl font-black text-stroke-white">MOTION</span>
                        <span className="text-xl sm:text-2xl text-[#B8FF00]">✦</span>
                        <span className="text-2xl sm:text-4xl font-black italic">STRATEGY</span>
                        <span className="text-xl sm:text-2xl text-[#FAFF00]">✦</span>
                    </div>
                ))}
            </div>
        </div>

        {/* Work Section */}
        <section id="work" className="py-16 sm:py-24 px-4 relative">
            <div className="absolute inset-0 bg-dots z-0"></div>
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 sm:mb-16">
                    <div>
                        <span ref={addAosRef} className="loud-fade-up neo-badge inline-block mb-4">Selected Work</span>
                        <h2 ref={addAosRef} className="loud-fade-up text-4xl sm:text-5xl md:text-7xl font-black leading-none" style={{ transitionDelay: '100ms' }}>
                            Projects that<br />
                            <span className="bg-[#B8FF00] px-2 border-[3px] border-[#121212] shadow-[3px_3px_0px_0px_#121212] inline-block transform -rotate-1 mt-1">make noise</span>
                        </h2>
                    </div>
                    <div ref={addAosRef} className="loud-fade-left" style={{ transitionDelay: '200ms' }}>
                        <a href="#" className="neo-btn-outline group w-full md:w-auto">
                            View All Projects
                            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 md:gap-10">
                    {[
                        { title: "Volt Energy", tags: "Brand Identity / Packaging", badge: "Tech", bg: "#FF6B9D", img: "1550745165-9bc0b252726f", year: "2024" },
                        { title: "Stack Finance", tags: "Web Design / App UI", badge: "Fintech", bg: "#4D9FFF", img: "1611162617474-5b21e879e113", year: "2024", offset: true },
                        { title: "Sprout Market", tags: "Brand / E-commerce", badge: "Retail", bg: "#B8FF00", img: "1542838132-92c53300491e", year: "2023" },
                        { title: "Pulse Music", tags: "App Design / Motion", badge: "SaaS", bg: "#FF9F1C", img: "1493225255756-d9584f8606e9", year: "2023", offset: true }
                    ].map((item, i) => (
                        <div key={i} ref={addAosRef} className={`loud-fade-up group cursor-pointer ${item.offset ? 'md:mt-16' : ''}`} style={{ transitionDelay: `${(i % 2) * 100}ms` }}>
                            <div className="neo-box p-3 sm:p-4 mb-4 sm:mb-5" style={{ background: item.bg }}>
                                <div className="aspect-[4/3] border-[3px] border-[#121212] overflow-hidden relative">
                                    <img src={`https://images.unsplash.com/photo-${item.img}?q=80&w=2070&auto=format&fit=crop`} 
                                         alt={item.title} 
                                         className="w-full h-full object-cover img-grayscale transform group-hover:scale-105 transition-all duration-500" />
                                    <div className="absolute top-3 left-3 sm:top-4 sm:left-4 neo-badge">{item.badge}</div>
                                </div>
                            </div>
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-2xl sm:text-3xl font-black mb-1 group-hover:text-[#4D9FFF] transition-colors">{item.title}</h3>
                                    <p className="font-mono text-xs sm:text-sm font-bold text-gray-500">{item.tags}</p>
                                </div>
                                <span className="font-mono text-xs sm:text-sm font-bold border-2 border-[#121212] px-2 py-1">{item.year}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-16 sm:py-24 px-4 bg-[#121212] text-white relative border-y-[3px] border-[#121212]">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12 sm:mb-16">
                    <span ref={addAosRef} className="flowdesk-fade-up inline-block px-3 py-1 border-2 border-white bg-[#121212] text-white font-mono text-xs font-bold uppercase tracking-widest mb-4">What We Do</span>
                    <h2 ref={addAosRef} className="flowdesk-fade-up text-4xl sm:text-5xl md:text-6xl font-black" style={{ transitionDelay: '100ms' }}>
                        Our <span className="text-[#FAFF00]">Firepower</span>.
                    </h2>
                    <p ref={addAosRef} className="flowdesk-fade-up text-gray-400 mt-4 max-w-xl mx-auto text-base sm:text-lg" style={{ transitionDelay: '200ms' }}>
                        We don't do boring. Every project gets our full creative arsenal to ensure you stand out.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        { icon: Palette, title: "Brand Identity", desc: "Logos, visual systems, and guidelines that make your brand unforgettable.", tags: ["Logo", "Strategy"], bg: "#FAFF00" },
                        { icon: Monitor, title: "Web Design", desc: "Websites that look incredible and actually convert visitors into customers.", tags: ["UI/UX", "Framer"], bg: "#FF6B9D" },
                        { icon: Smartphone, title: "App Design", desc: "Mobile experiences that users actually enjoy using. Novel concept, right?", tags: ["iOS", "Android"], bg: "#4D9FFF" },
                        { icon: Play, title: "Motion", desc: "Animations that bring your brand to life and stop the endless scroll.", tags: ["3D", "Lottie"], bg: "#B8FF00" },
                        { icon: Box, title: "Packaging", desc: "Tangible goods that fly off the shelves and look good on the 'gram.", tags: ["Print", "Merch"], bg: "#FF9F1C" },
                        { icon: Zap, title: "Growth", desc: "Campaigns and content strategies that actually move the needle.", tags: ["Social", "Ads"], bg: "#C77DFF" }
                    ].map((s, i) => (
                        <div key={i} ref={addAosRef} className="loud-fade-up p-6 sm:p-8 border-[3px] border-white shadow-[6px_6px_0_0_#FFF] text-[#121212] hover:translate-y-1 hover:shadow-[2px_2px_0_0_#FFF] transition-all duration-200" style={{ background: s.bg, transitionDelay: `${i * 100}ms` }}>
                            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#121212] border-[3px] border-[#121212] flex items-center justify-center mb-6" style={{ color: s.bg }}>
                                <s.icon className="w-6 h-6 sm:w-7 sm:h-7" />
                            </div>
                            <h3 className="text-2xl font-black mb-3">{s.title}</h3>
                            <p className="font-medium text-sm leading-relaxed mb-6">{s.desc}</p>
                            <ul className="flex flex-wrap gap-2">
                                {s.tags.map((tag) => (
                                    <li key={tag} className="bg-white border-2 border-[#121212] px-2 py-1 text-xs font-mono font-bold">{tag}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 sm:py-24 px-4 relative overflow-hidden">
            <div className="absolute -left-20 top-40 w-40 h-40 sm:w-64 sm:h-64 bg-[#FAFF00] rounded-full border-[3px] border-[#121212] -z-10 opacity-50"></div>
            <div className="absolute -right-20 bottom-40 w-40 h-40 sm:w-64 sm:h-64 bg-[#FF6B9D] rounded-full border-[3px] border-[#121212] -z-10 opacity-50"></div>

            <div className="max-w-6xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                    <div ref={addAosRef} className="loud-fade-right relative max-w-sm mx-auto lg:max-w-none">
                        <div className="bg-white border-[3px] border-[#121212] p-3 sm:p-4 rotate-2 shadow-[5px_5px_0px_0px_#121212]">
                            <div className="aspect-square bg-[#121212] relative overflow-hidden border-[3px] border-[#121212]">
                                <img src="https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop" 
                                     alt="The Team" 
                                     className="w-full h-full object-cover opacity-90 transition-opacity duration-500" />
                            </div>
                        </div>
                    </div>

                    <div className="text-center lg:text-left">
                        <span ref={addAosRef} className="loud-fade-up neo-badge inline-block mb-4">Who We Are</span>
                        <h2 ref={addAosRef} className="loud-fade-up text-3xl sm:text-4xl md:text-5xl font-black leading-none mb-6" style={{ transitionDelay: '100ms' }}>
                            Small team.<br />
                            <span className="text-[#FF6B9D] underline decoration-4 decoration-[#121212] underline-offset-4">Big Mouth.</span>
                        </h2>
                        
                        <p ref={addAosRef} className="loud-fade-up text-base sm:text-lg mb-6 leading-relaxed font-medium" style={{ transitionDelay: '200ms' }}>
                            We're a Dublin-based design studio that believes in standing out, not fitting in. Founded in 2016, we've helped over 150 brands find their voice and make it heard.
                        </p>
                        
                        <p ref={addAosRef} className="loud-fade-up text-base sm:text-lg mb-8 leading-relaxed text-gray-700" style={{ transitionDelay: '300ms' }}>
                            Our approach? Skip the corporate BS. We work fast, think bold, and deliver work that actually gets results. No fluff, no filler, just designs that hit different.
                        </p>

                        <div ref={addAosRef} className="loud-fade-up grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 mb-8 text-left max-w-sm mx-auto lg:mx-0" style={{ transitionDelay: '400ms' }}>
                            {[
                                { text: "No Boring Work", bg: "#FAFF00" },
                                { text: "Fast Turnaround", bg: "#FF6B9D" },
                                { text: "Fixed Pricing", bg: "#4D9FFF" },
                                { text: "Unlimited Revisions", bg: "#B8FF00" }
                            ].map((check) => (
                                <div key={check.text} className="flex items-center gap-3">
                                    <div className="w-6 h-6 border-2 border-[#121212] flex items-center justify-center font-black text-xs" style={{ background: check.bg }}>✓</div>
                                    <span className="font-bold">{check.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 sm:py-24 px-4 bg-[#FAFF00] border-y-[3px] border-[#121212]">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12 sm:mb-16">
                    <span ref={addAosRef} className="bg-[#121212] text-white px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest inline-block mb-4">Kind Words</span>
                    <h2 ref={addAosRef} className="loud-fade-up text-4xl sm:text-5xl font-black leading-none" style={{ transitionDelay: '100ms' }}>
                        Don't take our<br />word for it.
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {[
                        { name: "Sarah Mitchell", role: "CEO, Volt", quote: "LOUD absolutely nailed our rebrand. Our conversion rate jumped 40% after launching the new site. Best investment we've made.", bg: "#FF6B9D" },
                        { name: "Marcus Chen", role: "Founder, Stack", quote: "They actually listened to what we wanted, then made it 10x better. No ego, just results. Rare in this industry.", bg: "#4D9FFF" },
                        { name: "Emma O'Brien", role: "CMO, Sprout", quote: "Our packaging now gets shared on social more than our actual products. LOUD understood the assignment perfectly.", bg: "#B8FF00" }
                    ].map((t, i) => (
                        <div key={i} ref={addAosRef} className="loud-fade-up bg-white border-[3px] border-[#121212] p-6 sm:p-8 shadow-[5px_5px_0px_0px_#121212] hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_#121212] transition-all" style={{ transitionDelay: `${100 + (i * 100)}ms` }}>
                            <div className="flex gap-1 text-[#121212] mb-4">
                                {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="w-5 h-5 fill-current" />)}
                            </div>
                            <p className="font-bold text-base sm:text-lg mb-6 leading-snug">"{t.quote}"</p>
                            <div className="flex items-center gap-3 pt-4 border-t-2 border-[#121212]">
                                <div className="w-10 h-10 border-2 border-[#121212] rounded-full" style={{ background: t.bg }}></div>
                                <div>
                                    <div className="font-black text-sm">{t.name}</div>
                                    <div className="font-mono text-xs text-gray-500 font-bold uppercase">{t.role}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* CTA / Contact */}
        <section id="contact" className="py-16 sm:py-24 px-4 bg-grid">
            <div className="max-w-4xl mx-auto">
                <div ref={addAosRef} className="loud-fade-up relative">
                    <div className="absolute top-3 left-3 sm:top-4 sm:left-4 w-full h-full bg-[#FF6B9D] border-[3px] border-[#121212]"></div>
                    <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 w-full h-full bg-[#FAFF00] border-[3px] border-[#121212]"></div>
                    
                    <div className="bg-white border-[3px] border-[#121212] p-8 md:p-16 relative text-center">
                        <span className="neo-badge inline-block mb-6">Start a Project</span>
                        
                        <h2 className="text-3xl sm:text-4xl md:text-6xl font-black leading-none mb-6">
                            Got a project?<br />
                            <span className="bg-[#121212] text-white px-2">Let's make noise.</span>
                        </h2>
                        
                        <p className="text-base sm:text-lg md:text-xl font-medium mb-10 text-gray-600 max-w-lg mx-auto">
                            Drop us a line. We typically respond within 24 hours. No forms, no friction — just shoot us an email.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                            <a href="mailto:hello@loudstudio.ie" className="neo-btn text-lg py-4 px-8 w-full sm:w-auto">
                                <Mail className="w-5 h-5 mr-2" />
                                hello@loudstudio.ie
                            </a>
                            <a href="tel:+35312345678" className="font-mono font-bold border-b-2 border-[#121212] hover:bg-[#FAFF00] transition-colors mt-4 sm:mt-0">
                                +353 1 234 5678
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Footer */}
        <footer className="bg-[#121212] text-white border-t-[3px] border-[#FAFF00] py-12 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    <div className="lg:col-span-2">
                        <a onClick={() => scrollToSection('top')} className="flex items-center gap-2 mb-4 group cursor-pointer">
                            <div className="w-10 h-10 bg-[#FAFF00] border-[3px] border-white flex items-center justify-center font-black text-xl text-[#121212] group-hover:rotate-12 transition-transform">
                                L
                            </div>
                            <span className="text-xl font-black">LOUD<span className="text-[#FF6B9D]">.</span></span>
                        </a>
                        <p className="text-gray-400 max-w-sm mb-6">
                            Dublin's loudest design studio. We make brands impossible to ignore since 2016.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 border-2 border-white flex items-center justify-center hover:bg-[#FAFF00] hover:text-[#121212] hover:border-[#FAFF00] transition-all">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 border-2 border-white flex items-center justify-center hover:bg-[#FF6B9D] hover:text-[#121212] hover:border-[#FF6B9D] transition-all">
                                <Dribbble className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 border-2 border-white flex items-center justify-center hover:bg-[#4D9FFF] hover:text-[#121212] hover:border-[#4D9FFF] transition-all">
                                <Linkedin className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-black text-lg mb-4 uppercase text-[#FAFF00]">Studio</h4>
                        <ul className="space-y-3 font-medium text-gray-400">
                            <li><a onClick={() => scrollToSection('work')} className="hover:text-white transition-colors cursor-pointer">Work</a></li>
                            <li><a onClick={() => scrollToSection('services')} className="hover:text-white transition-colors cursor-pointer">Services</a></li>
                            <li><a onClick={() => scrollToSection('about')} className="hover:text-white transition-colors cursor-pointer">About</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-black text-lg mb-4 uppercase text-[#FAFF00]">Contact</h4>
                        <ul className="space-y-3 font-medium text-gray-400">
                            <li>hello@loudstudio.ie</li>
                            <li>+353 1 234 5678</li>
                            <li className="pt-2 text-sm text-gray-500">
                                42 Camden Street<br />
                                Dublin 2, Ireland
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm font-mono text-gray-500">
                    <div>© 2025 LOUD Studio. All rights reserved.</div>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white transition-colors">Privacy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms</a>
                    </div>
                </div>
            </div>
        </footer>
    </div>
  );
}
