'use client';

import React, { useEffect, useState, useRef } from 'react';
import { 
  Menu, 
  X, 
  ArrowDown, 
  Star, 
  Clock, 
  ArrowUpRight, 
  Download, 
  Instagram, 
  Twitter, 
  Facebook 
} from 'lucide-react';

// Inject keyframe animations and styles
const injectStyles = () => {
  if (typeof document === 'undefined') return;
  if (document.getElementById('camden-styles')) return;

  const style = document.createElement('style');
  style.id = 'camden-styles';
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&display=swap');

    .camden-wrapper * {
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      box-sizing: border-box;
    }

    .camden-wrapper {
        background-color: #050505;
        color: #e5e5e5;
        overflow-x: hidden;
        font-family: 'Manrope', sans-serif;
    }

    .camden-wrapper .font-serif {
        font-family: 'Playfair Display', serif;
    }

    .camden-wrapper .font-sans {
        font-family: 'Manrope', sans-serif;
    }

    /* Film Grain Overlay */
    .camden-wrapper .noise-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 50;
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.04'/%3E%3C/svg%3E");
    }

    /* Text Gradient */
    .camden-wrapper .text-gradient-gold {
        background: linear-gradient(135deg, #F3E5AB 0%, #C5A059 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    /* Image Hover Zoom */
    .camden-wrapper .img-zoom-container {
        overflow: hidden;
    }
    .camden-wrapper .img-zoom {
        transition: transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    .camden-wrapper .group:hover .img-zoom {
        transform: scale(1.05);
    }

    /* Button Hover Effect */
    .camden-wrapper .btn-hover-slide {
        background: linear-gradient(to right, transparent 50%, #C5A059 50%);
        background-size: 200% 100%;
        transition: background-position 0.4s cubic-bezier(0.19, 1, 0.22, 1);
    }
    .camden-wrapper .btn-hover-slide:hover {
        background-position: -100% 0;
        color: #000;
    }

    /* Animations */
    .camden-fade-up {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s ease-out, transform 0.8s ease-out;
    }
    
    .camden-animate {
        opacity: 1;
        transform: translateY(0);
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

export default function CamdenBarbers({ previewMode = false }: { previewMode?: boolean }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const aosRefs = useRef<(HTMLElement | null)[]>([]);
  const heroImageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    injectStyles();
  }, []);

  // Handle scroll for nav styling and parallax
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Parallax logic
      if (heroImageRef.current && window.scrollY < 800) {
        heroImageRef.current.style.transform = `translateY(${window.scrollY * 0.4}px) scale(1.1)`;
      }
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
            entry.target.classList.add('camden-animate');
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
    <div className="camden-wrapper relative min-h-screen">
        {/* Global Noise Overlay */}
        <div className="noise-overlay"></div>

        {/* Navigation */}
        <nav 
            className={`fixed top-0 w-full z-40 transition-all duration-300 backdrop-blur-md border-b border-white/5 ${
                scrolled ? 'bg-[#050505]/95' : 'bg-[#050505]/80'
            }`}
        >
            <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
                {/* Logo */}
                <a href="#" className="group flex flex-col items-start">
                    <span className="font-serif text-2xl text-white tracking-tight leading-none group-hover:text-[#C5A059] transition-colors">Camden</span>
                    <span className="text-[9px] uppercase tracking-[0.3em] text-white/60">Gentleman</span>
                </a>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-12">
                    {['About', 'Services', 'Team', 'Contact'].map((item) => (
                        <a 
                            key={item} 
                            onClick={() => scrollToSection(item.toLowerCase() === 'team' ? 'barbers' : item.toLowerCase())} 
                            className="text-sm font-medium text-white/70 hover:text-white transition-colors tracking-wide cursor-pointer"
                        >
                            {item === 'About' ? 'Studio' : item}
                        </a>
                    ))}
                </div>

                {/* CTA */}
                <a onClick={() => scrollToSection('book')} className="hidden md:flex items-center gap-2 text-xs font-semibold uppercase tracking-widest border border-white/20 px-6 py-3 rounded-full hover:bg-[#C5A059] hover:border-[#C5A059] hover:text-[#050505] transition-all duration-300 cursor-pointer">
                    <span>Book Now</span>
                </a>

                {/* Mobile Menu Btn */}
                <button onClick={toggleMobileMenu} className="md:hidden text-white">
                    <Menu className="w-6 h-6" />
                </button>
            </div>
        </nav>

        {/* Mobile Menu Overlay */}
        <div 
            className={`fixed inset-0 bg-[#050505] z-50 transform transition-transform duration-300 ease-in-out md:hidden flex flex-col justify-center items-center ${
                mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
        >
            <button onClick={toggleMobileMenu} className="absolute top-6 right-6 text-white">
                <X className="w-8 h-8" />
            </button>
            
            <div className="flex flex-col items-center gap-8 mb-12">
                {['About', 'Services', 'Team', 'Contact'].map((item) => (
                    <a 
                        key={item}
                        onClick={() => scrollToSection(item.toLowerCase() === 'team' ? 'barbers' : item.toLowerCase())}
                        className="font-serif text-3xl text-white hover:text-[#C5A059] transition-colors cursor-pointer"
                    >
                        {item === 'About' ? 'Studio' : item}
                    </a>
                ))}
            </div>
            
            <a onClick={() => scrollToSection('book')} className="text-xs font-semibold uppercase tracking-widest bg-[#C5A059] text-[#050505] px-8 py-4 rounded-full cursor-pointer">
                Book Now
            </a>
        </div>

        {/* Hero Section */}
        <header className="relative min-h-screen flex items-center pt-16 overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent z-10"></div>
                <div className="absolute inset-0 bg-black/40 z-10"></div>
                <img 
                    ref={heroImageRef}
                    src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=2074&auto=format&fit=crop" 
                    className="w-full h-full object-cover origin-center" 
                    alt="Barber Shop Interior"
                />
            </div>

            <div className="relative z-20 w-full max-w-[1400px] mx-auto px-6">
                <div className="max-w-4xl">
                    <div ref={addAosRef} className="camden-fade-up flex items-center gap-4 mb-6">
                        <div className="h-[1px] w-12 bg-[#C5A059]"></div>
                        <span className="text-[#C5A059] uppercase tracking-[0.2em] text-xs font-semibold">Est. 2018 · Dublin</span>
                    </div>
                    
                    <h1 ref={addAosRef} className="camden-fade-up font-serif text-5xl md:text-7xl lg:text-8xl leading-[1.1] text-white mb-8" style={{ transitionDelay: '100ms' }}>
                        The Art of <br />
                        <span className="italic text-white/90">Modern Grooming.</span>
                    </h1>

                    <p ref={addAosRef} className="camden-fade-up text-white/60 text-lg md:text-xl max-w-lg mb-12 font-light leading-relaxed" style={{ transitionDelay: '200ms' }}>
                        A sanctuary for the modern gentleman. Where traditional techniques meet contemporary style in the heart of Dublin.
                    </p>

                    <div ref={addAosRef} className="camden-fade-up flex flex-col sm:flex-row gap-6" style={{ transitionDelay: '300ms' }}>
                        <a onClick={() => scrollToSection('book')} className="btn-hover-slide border border-[#C5A059] text-[#C5A059] px-8 py-4 text-xs font-bold uppercase tracking-widest text-center cursor-pointer">
                            Book Appointment
                        </a>
                        <a onClick={() => scrollToSection('services')} className="flex items-center gap-2 text-white/80 hover:text-white transition-colors px-4 py-4 text-xs font-bold uppercase tracking-widest cursor-pointer">
                            View Services <ArrowDown className="w-4 h-4" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce text-white/30">
                <ArrowDown className="w-6 h-6" />
            </div>
        </header>

        {/* Bento Grid (About & Vibe) */}
        <section id="about" className="py-24 bg-[#050505] px-6">
            <div className="max-w-[1400px] mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div>
                        <h2 className="font-serif text-4xl md:text-5xl text-white mb-4">The Experience</h2>
                        <p className="text-white/50 max-w-md">More than a haircut. It's a ritual.</p>
                    </div>
                    <div className="flex items-center gap-2 text-[#C5A059] text-sm font-medium">
                        <Star className="w-4 h-4 fill-current" />
                        <span>4.9/5 Average Rating from 500+ Reviews</span>
                    </div>
                </div>

                {/* Bento Layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 grid-rows-auto gap-4 md:h-[800px]">
                    
                    {/* Card 1: Main Image (Tall) */}
                    <div ref={addAosRef} className="camden-fade-up group relative md:col-span-2 md:row-span-2 rounded-2xl overflow-hidden bg-[#141414] border border-white/5">
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
                        <img src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover img-zoom" alt="Shave" />
                        <div className="absolute bottom-0 left-0 p-8 z-20">
                            <h3 className="font-serif text-3xl text-white mb-2">Signature Hot Towel</h3>
                            <p className="text-white/70 text-sm">Experience the closest shave of your life.</p>
                        </div>
                    </div>

                    {/* Card 2: Hours (Small) */}
                    <div ref={addAosRef} className="camden-fade-up md:col-span-1 md:row-span-1 bg-[#141414] rounded-2xl p-8 border border-white/5 hover:border-[#C5A059]/30 transition-colors flex flex-col justify-center" style={{ transitionDelay: '100ms' }}>
                        <div className="w-10 h-10 rounded-full bg-[#C5A059]/10 flex items-center justify-center text-[#C5A059] mb-6">
                            <Clock className="w-5 h-5" />
                        </div>
                        <h4 className="text-white font-serif text-xl mb-4">Open 7 Days</h4>
                        <ul className="text-sm text-white/50 space-y-2">
                            <li className="flex justify-between"><span>Mon - Fri</span> <span className="text-white">09:00 - 20:00</span></li>
                            <li className="flex justify-between"><span>Sat</span> <span className="text-white">09:00 - 18:00</span></li>
                            <li className="flex justify-between"><span>Sun</span> <span className="text-white">10:00 - 16:00</span></li>
                        </ul>
                    </div>

                    {/* Card 3: Location (Small) */}
                    <div ref={addAosRef} className="camden-fade-up md:col-span-1 md:row-span-1 bg-[#141414] rounded-2xl p-8 border border-white/5 hover:border-[#C5A059]/30 transition-colors relative overflow-hidden group" style={{ transitionDelay: '200ms' }}>
                        <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-100 transition-opacity">
                             <ArrowUpRight className="w-6 h-6 text-[#C5A059]" />
                        </div>
                        <h4 className="text-white font-serif text-xl mb-2 mt-auto">Find Us</h4>
                        <p className="text-white/50 text-sm mb-4">42 Camden Street Lower,<br />Dublin 2</p>
                        <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full w-2/3 bg-[#C5A059]"></div>
                        </div>
                        <p className="text-[10px] text-white/40 mt-2 uppercase tracking-wider">In the heart of the city</p>
                    </div>

                    {/* Card 4: Products (Wide) */}
                    <div ref={addAosRef} className="camden-fade-up md:col-span-2 md:row-span-1 relative rounded-2xl overflow-hidden bg-[#141414] border border-white/5 group" style={{ transitionDelay: '300ms' }}>
                        <img src="https://images.unsplash.com/photo-1621607512214-68297480165e?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover img-zoom opacity-60 group-hover:opacity-80 transition-opacity" alt="Products" />
                        <div className="absolute inset-0 flex flex-col justify-center items-center p-6 text-center z-10">
                            <span className="text-[#C5A059] uppercase tracking-widest text-xs font-bold mb-2">Premium Products</span>
                            <h3 className="font-serif text-2xl text-white">Curated Grooming Essentials</h3>
                        </div>
                    </div>

                </div>
            </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-24 bg-black relative">
            {/* Subtle Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

            <div className="max-w-[1400px] mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-24">
                    
                    {/* Left Sticky Title */}
                    <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
                        <span className="text-[#C5A059] uppercase tracking-[0.2em] text-xs font-semibold block mb-4">Our Menu</span>
                        <h2 className="font-serif text-5xl md:text-6xl text-white mb-8">Precision <br /><span className="text-white/40 italic">Services.</span></h2>
                        <p className="text-white/50 text-lg mb-8 leading-relaxed">
                            Every cut is a consultation. Every shave is a process. We don't rush perfection. Enjoy a complimentary beverage with every service.
                        </p>
                        <a onClick={() => scrollToSection('book')} className="inline-flex items-center gap-2 text-white border-b border-white/30 pb-1 hover:border-[#C5A059] hover:text-[#C5A059] transition-colors cursor-pointer">
                            Download Full Price List <Download className="w-4 h-4" />
                        </a>
                    </div>

                    {/* Right Menu List */}
                    <div className="lg:col-span-8 space-y-4">
                        
                        {[
                            { name: "The Gentleman's Cut", price: "€35", desc: "Consultation, precision cut, wash, hot towel finish and styling.", time: "45 Min" },
                            { name: "Hot Towel Shave", price: "€40", desc: "Traditional straight razor shave, pre-shave oils, hot towels, post-shave balm.", time: "45 Min" },
                            { name: "The Full Service", price: "€70", desc: "Combination of our signature haircut and luxury hot towel shave.", time: "75 Min" },
                            { name: "Beard Sculpt & Shape", price: "€25", desc: "Razor line-up, trim, shape, and conditioning oil treatment.", time: "30 Min" }
                        ].map((service, idx) => (
                            <div key={idx} ref={addAosRef} className="camden-fade-up group bg-[#141414] p-8 border border-white/5 hover:border-[#C5A059]/40 transition-all duration-300 rounded-lg" style={{ transitionDelay: `${idx * 100}ms` }}>
                                <div className="flex justify-between items-baseline mb-2">
                                    <h3 className="text-2xl font-serif text-white group-hover:text-[#C5A059] transition-colors">{service.name}</h3>
                                    <span className="text-xl text-white font-medium">{service.price}</span>
                                </div>
                                <div className="flex justify-between items-end">
                                    <p className="text-white/50 text-sm max-w-md">{service.desc}</p>
                                    <span className="text-xs text-white/30 uppercase tracking-widest">{service.time}</span>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </section>

        {/* Barbers / Team */}
        <section id="barbers" className="py-24 bg-[#0F0F0F] border-t border-white/5">
            <div className="max-w-[1400px] mx-auto px-6">
                <div className="text-center mb-16">
                    <span className="text-[#C5A059] uppercase tracking-[0.2em] text-xs font-semibold block mb-4">The Talent</span>
                    <h2 className="font-serif text-4xl text-white">Master <span className="italic text-[#C5A059]">Barbers</span></h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        { name: "James O'Connor", role: "Founder / Master Barber", img: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?q=80&w=2080&auto=format&fit=crop" },
                        { name: "Marcus Webb", role: "Senior Barber", img: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=2070&auto=format&fit=crop" },
                        { name: "David Sullivan", role: "Stylist", img: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=1974&auto=format&fit=crop" }
                    ].map((barber, idx) => (
                        <div key={idx} ref={addAosRef} className="camden-fade-up group" style={{ transitionDelay: `${idx * 100}ms` }}>
                            <div className="overflow-hidden mb-6 rounded-lg relative aspect-[3/4]">
                                <img src={barber.img} alt={barber.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 img-zoom" />
                                <div className="absolute bottom-4 left-4 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">
                                    <a href="#" className="p-2 bg-white text-black rounded-full hover:bg-[#C5A059] transition-colors"><Instagram className="w-4 h-4" /></a>
                                </div>
                            </div>
                            <div className="text-center">
                                <h3 className="font-serif text-2xl text-white">{barber.name}</h3>
                                <p className="text-xs uppercase tracking-widest text-[#C5A059] mt-1">{barber.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* Booking / CTA Section */}
        <section id="book" className="py-32 px-6 relative overflow-hidden flex items-center justify-center">
            {/* Abstract Decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C5A059]/10 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="relative z-10 max-w-3xl mx-auto text-center">
                <h2 ref={addAosRef} className="camden-fade-up font-serif text-5xl md:text-7xl text-white mb-8">Ready to look <br /><span className="text-gradient-gold italic">Your Best?</span></h2>
                <p ref={addAosRef} className="camden-fade-up text-white/60 text-lg mb-12 max-w-lg mx-auto" style={{ transitionDelay: '100ms' }}>
                    Appointments are highly recommended. Walk-ins accommodated based on availability.
                </p>
                
                <div ref={addAosRef} className="camden-fade-up flex flex-col sm:flex-row justify-center gap-4" style={{ transitionDelay: '200ms' }}>
                    <button className="bg-[#C5A059] text-[#050505] px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-white transition-colors duration-300 shadow-[0_0_20px_rgba(197,160,89,0.3)]">
                        Book Online Now
                    </button>
                    <button className="bg-transparent border border-white/20 text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-white/10 transition-colors duration-300">
                        Call: (01) 555-0123
                    </button>
                </div>
            </div>
        </section>

        {/* Footer */}
        <footer className="bg-black border-t border-white/10 py-16 px-6">
            <div className="max-w-[1400px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="md:col-span-1">
                        <a href="#" className="block font-serif text-2xl text-white mb-4">The Camden <br /><span className="text-sm font-sans tracking-[0.3em] text-[#C5A059] uppercase">Gentleman</span></a>
                        <p className="text-white/40 text-sm">Elevating the standard of male grooming in Dublin since 2018.</p>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="text-white font-medium mb-6">Explore</h4>
                        <ul className="space-y-4 text-sm text-white/50">
                            <li><a onClick={() => scrollToSection('about')} className="hover:text-[#C5A059] transition-colors cursor-pointer">Our Story</a></li>
                            <li><a onClick={() => scrollToSection('services')} className="hover:text-[#C5A059] transition-colors cursor-pointer">Services</a></li>
                            <li><a onClick={() => scrollToSection('barbers')} className="hover:text-[#C5A059] transition-colors cursor-pointer">Team</a></li>
                            <li><a href="#" className="hover:text-[#C5A059] transition-colors">Careers</a></li>
                        </ul>
                    </div>

                    {/* Socials */}
                    <div>
                        <h4 className="text-white font-medium mb-6">Social</h4>
                        <ul className="space-y-4 text-sm text-white/50">
                            <li><a href="#" className="hover:text-[#C5A059] transition-colors">Instagram</a></li>
                            <li><a href="#" className="hover:text-[#C5A059] transition-colors">Facebook</a></li>
                            <li><a href="#" className="hover:text-[#C5A059] transition-colors">Twitter</a></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-white font-medium mb-6">Stay Sharp</h4>
                        <form className="flex gap-2 border-b border-white/20 pb-2" onSubmit={(e) => e.preventDefault()}>
                            <input type="email" placeholder="Email Address" className="bg-transparent border-none outline-none text-white w-full placeholder:text-white/20 text-sm" />
                            <button type="submit" className="text-white/50 hover:text-[#C5A059] uppercase text-xs font-bold tracking-widest">Join</button>
                        </form>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-xs text-white/30">
                    <p>&copy; 2025 The Camden Gentleman. All rights reserved.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-white">Privacy Policy</a>
                        <a href="#" className="hover:text-white">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    </div>
  );
}