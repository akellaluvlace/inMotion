'use client';

import React, { useEffect, useState, useRef } from 'react';
import { 
  Menu, 
  X, 
  Zap, 
  ArrowRight, 
  Smartphone, 
  Flame, 
  Clock, 
  Heart, 
  Calendar, 
  Check, 
  Star, 
  MapPin, 
  Phone, 
  Instagram, 
  Facebook, 
  Twitter, 
  Youtube,
  Trophy,
  PlayCircle,
  BarChart3,
  CalendarCheck
} from 'lucide-react';

// Inject keyframe animations and styles
const injectStyles = () => {
  if (typeof document === 'undefined') return;
  if (document.getElementById('surge-styles')) return;

  const style = document.createElement('style');
  style.id = 'surge-styles';
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700;800;900&display=swap');

    .surge-wrapper * {
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      box-sizing: border-box;
    }

    .surge-wrapper { 
        font-family: 'Inter', system-ui, sans-serif;
        background: #0A0A0A;
        color: #FFFFFF;
        line-height: 1.6;
        overflow-x: hidden;
    }

    .surge-wrapper ::selection {
        background: #FF6B35;
        color: #0A0A0A;
    }

    .surge-wrapper h1, 
    .surge-wrapper h2, 
    .surge-wrapper h3 {
        font-family: 'Bebas Neue', Impact, sans-serif;
        font-weight: 400;
        letter-spacing: 0.02em;
        line-height: 0.95;
    }

    /* Gradient Backgrounds */
    .surge-wrapper .gradient-orange-pink {
        background: linear-gradient(135deg, #FF6B35 0%, #FF3366 100%);
    }

    .surge-wrapper .gradient-pink-purple {
        background: linear-gradient(135deg, #FF3366 0%, #7B2CBF 100%);
    }

    .surge-wrapper .gradient-purple-blue {
        background: linear-gradient(135deg, #7B2CBF 0%, #3A86FF 100%);
    }

    .surge-wrapper .gradient-blue-cyan {
        background: linear-gradient(135deg, #3A86FF 0%, #00D9FF 100%);
    }

    .surge-wrapper .gradient-full {
        background: linear-gradient(135deg, #FF6B35 0%, #FF3366 25%, #7B2CBF 50%, #3A86FF 75%, #00D9FF 100%);
    }

    /* Gradient Text */
    .surge-wrapper .gradient-text {
        background: linear-gradient(135deg, #FF6B35 0%, #FF3366 50%, #7B2CBF 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    .surge-wrapper .gradient-text-blue {
        background: linear-gradient(135deg, #3A86FF 0%, #00D9FF 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    /* Animated Gradient Border */
    .surge-wrapper .gradient-border {
        position: relative;
        background: #121212;
        border-radius: 16px;
    }

    .surge-wrapper .gradient-border::before {
        content: '';
        position: absolute;
        inset: -2px;
        background: linear-gradient(135deg, #FF6B35, #FF3366, #7B2CBF, #3A86FF, #00D9FF);
        border-radius: 18px;
        z-index: -1;
        opacity: 0;
        transition: opacity 0.4s ease;
    }

    .surge-wrapper .gradient-border:hover::before {
        opacity: 1;
    }

    /* Button Styles */
    .surge-wrapper .btn-gradient {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        padding: 18px 36px;
        background: linear-gradient(135deg, #FF6B35 0%, #FF3366 100%);
        color: #FFFFFF;
        font-size: 14px;
        font-weight: 700;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        border-radius: 50px;
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
        z-index: 10;
        cursor: pointer;
    }

    .surge-wrapper .btn-gradient::before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(135deg, #FF3366 0%, #7B2CBF 100%);
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: -1;
    }

    .surge-wrapper .btn-gradient:hover {
        transform: translateY(-3px);
        box-shadow: 0 20px 40px rgba(255, 51, 102, 0.4);
    }

    .surge-wrapper .btn-gradient:hover::before {
        opacity: 1;
    }

    .surge-wrapper .btn-gradient span {
        position: relative;
        z-index: 1;
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .surge-wrapper .btn-outline-white {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        padding: 16px 34px;
        background: transparent;
        color: #FFFFFF;
        font-size: 14px;
        font-weight: 700;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-radius: 50px;
        transition: all 0.3s ease;
        cursor: pointer;
    }

    .surge-wrapper .btn-outline-white:hover {
        border-color: #FF6B35;
        color: #FF6B35;
        transform: translateY(-3px);
    }

    /* Card Styles */
    .surge-wrapper .feature-card {
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 20px;
        padding: 40px;
        transition: all 0.4s ease;
        position: relative;
        overflow: hidden;
    }

    .surge-wrapper .feature-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: linear-gradient(90deg, #FF6B35, #FF3366, #7B2CBF);
        opacity: 0;
        transition: opacity 0.4s ease;
    }

    .surge-wrapper .feature-card:hover {
        transform: translateY(-10px);
        border-color: rgba(255, 107, 53, 0.3);
        box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5);
    }

    .surge-wrapper .feature-card:hover::before {
        opacity: 1;
    }

    /* Class Card */
    .surge-wrapper .class-card {
        position: relative;
        border-radius: 20px;
        overflow: hidden;
        height: 400px;
    }

    .surge-wrapper .class-card-overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(to top, rgba(10, 10, 10, 0.95) 0%, rgba(10, 10, 10, 0.3) 50%, transparent 100%);
        padding: 30px;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        transition: all 0.4s ease;
    }

    .surge-wrapper .class-card:hover .class-card-overlay {
        background: linear-gradient(to top, rgba(255, 51, 102, 0.9) 0%, rgba(123, 44, 191, 0.6) 50%, transparent 100%);
    }

    /* App Mockup */
    .surge-wrapper .phone-mockup {
        position: relative;
        width: 280px;
        height: 580px;
        background: #1A1A1A;
        border-radius: 40px;
        padding: 12px;
        border: 3px solid #2A2A2A;
        box-shadow: 0 50px 100px rgba(0, 0, 0, 0.6);
        margin: 0 auto;
    }

    .surge-wrapper .phone-mockup-screen {
        width: 100%;
        height: 100%;
        background: linear-gradient(180deg, #121212 0%, #1A1A1A 100%);
        border-radius: 32px;
        overflow: hidden;
    }

    .surge-wrapper .phone-notch {
        position: absolute;
        top: 12px;
        left: 50%;
        transform: translateX(-50%);
        width: 100px;
        height: 28px;
        background: #0A0A0A;
        border-radius: 20px;
        z-index: 10;
    }

    /* Trainer Card */
    .surge-wrapper .trainer-card {
        position: relative;
        border-radius: 20px;
        overflow: hidden;
        transition: all 0.4s ease;
    }

    .surge-wrapper .trainer-card:hover {
        transform: scale(1.03);
    }

    .surge-wrapper .trainer-card-info {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 30px;
        background: linear-gradient(to top, rgba(10, 10, 10, 0.95) 0%, transparent 100%);
        z-index: 20;
    }

    /* Marquee Styles */
    .surge-wrapper .text-stroke {
        -webkit-text-stroke: 1px rgba(255, 255, 255, 0.3);
        -webkit-text-fill-color: transparent;
    }
    
    .surge-wrapper .img-grayscale {
        filter: grayscale(100%) contrast(1.1);
        transition: filter 0.5s ease;
    }

    .surge-wrapper .trainer-card:hover .img-grayscale {
        filter: grayscale(0%) contrast(1);
    }

    /* Nav Link */
    .surge-wrapper .nav-link {
        position: relative;
        color: rgba(255, 255, 255, 0.7);
        font-weight: 600;
        font-size: 13px;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        transition: color 0.3s ease;
        cursor: pointer;
    }

    .surge-wrapper .nav-link:hover {
        color: #FF6B35;
    }
    
    /* Mobile Menu */
    .surge-wrapper .mobile-menu-overlay {
        position: fixed;
        inset: 0;
        background: #0A0A0A;
        z-index: 40;
        transform: translateX(100%);
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .surge-wrapper .mobile-menu-overlay.open {
        transform: translateX(0);
    }

    /* Testimonial */
    .surge-wrapper .testimonial-card {
        background: linear-gradient(135deg, rgba(255, 107, 53, 0.1) 0%, rgba(255, 51, 102, 0.05) 100%);
        border: 1px solid rgba(255, 107, 53, 0.2);
        border-radius: 20px;
        padding: 40px;
    }

    /* Pricing Card */
    .surge-wrapper .pricing-card {
        background: #121212;
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 24px;
        padding: 40px;
        transition: all 0.4s ease;
        position: relative;
    }

    .surge-wrapper .pricing-card:hover {
        border-color: rgba(255, 107, 53, 0.5);
        transform: translateY(-10px);
    }

    .surge-wrapper .pricing-card.featured {
        background: linear-gradient(135deg, rgba(255, 107, 53, 0.15) 0%, rgba(255, 51, 102, 0.1) 100%);
        border-color: #FF6B35;
    }

    .surge-wrapper .pricing-card.featured::before {
        content: 'MOST POPULAR';
        position: absolute;
        top: -12px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #FF6B35, #FF3366);
        color: white;
        font-size: 10px;
        font-weight: 700;
        letter-spacing: 0.1em;
        padding: 6px 16px;
        border-radius: 20px;
    }

    /* Marquee Animation */
    @keyframes marquee-surge {
        0% { transform: translateX(0%); }
        100% { transform: translateX(-100%); }
    }

    .surge-wrapper .animate-marquee-surge {
        animation: marquee-surge 25s linear infinite;
    }

    /* AOS Animations */
    .surge-fade-up {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s ease-out, transform 0.8s ease-out;
    }
    
    .surge-fade-right {
        opacity: 0;
        transform: translateX(-30px);
        transition: opacity 0.8s ease-out, transform 0.8s ease-out;
    }

    .surge-fade-left {
        opacity: 0;
        transform: translateX(30px);
        transition: opacity 0.8s ease-out, transform 0.8s ease-out;
    }

    .surge-animate {
        opacity: 1;
        transform: translate(0);
    }
  `;
  document.head.appendChild(style);
};

export default function SurgeFitness({ previewMode = false }: { previewMode?: boolean }) {
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
            entry.target.classList.add('surge-animate');
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
    <div className="surge-wrapper relative min-h-screen">
        {/* Navigation */}
        <nav 
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-white/5 ${
                scrolled ? 'bg-[#0A0A0A]/95 backdrop-blur-md shadow-lg' : 'bg-[#0A0A0A]/90 backdrop-blur-md'
            }`}
            style={{ top: previewMode ? '64px' : '0' }}
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <a onClick={() => scrollToSection('top')} className="flex items-center gap-2 relative z-50 cursor-pointer">
                        <div className="w-10 h-10 gradient-orange-pink rounded-lg flex items-center justify-center">
                            <Zap className="w-6 h-6 text-white" />
                        </div>
                        <span className="font-display text-3xl text-white tracking-wide">SURGE</span>
                    </a>

                    {/* Desktop Nav */}
                    <div className="hidden lg:flex items-center gap-8">
                        {['Classes', 'App', 'Trainers', 'Pricing', 'Locations'].map((item) => (
                            <a 
                                key={item} 
                                onClick={() => scrollToSection(item.toLowerCase())} 
                                className="nav-link"
                            >
                                {item}
                            </a>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="hidden lg:flex items-center gap-4">
                        <a href="#" className="text-white/70 hover:text-white transition-colors font-semibold text-sm uppercase tracking-wide">Log In</a>
                        <a onClick={() => scrollToSection('pricing')} className="btn-gradient">
                            <span>Start Free Trial</span>
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button onClick={toggleMobileMenu} className="lg:hidden w-10 h-10 flex items-center justify-center text-white relative z-50">
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>
        </nav>

        {/* Mobile Menu Overlay */}
        <div 
            className={`mobile-menu-overlay ${mobileMenuOpen ? 'open' : ''}`}
            style={{ top: previewMode ? '64px' : '0' }}
        >
            <div className="flex flex-col gap-8 text-center">
                {['Classes', 'App', 'Trainers', 'Pricing', 'Locations'].map((item) => (
                    <a 
                        key={item} 
                        onClick={() => scrollToSection(item.toLowerCase())} 
                        className="text-3xl font-display text-white hover:text-[#FF6B35] cursor-pointer"
                    >
                        {item}
                    </a>
                ))}
                <div className="h-px w-20 bg-white/20 mx-auto my-4"></div>
                <a href="#" className="text-lg font-medium text-white/70 hover:text-white">Log In</a>
                <a onClick={() => scrollToSection('pricing')} className="btn-gradient cursor-pointer">
                    <span>Start Free Trial</span>
                </a>
            </div>
        </div>

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0">
                <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&h=1080&fit=crop&q=80" 
                     alt="Gym background" 
                     className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/90 to-[#0A0A0A]/70"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent"></div>
            </div>
            
            <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-20 relative z-10">
                <div className="max-w-3xl">
                    <div ref={addAosRef} className="surge-fade-up inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-8">
                        <span className="w-2 h-2 bg-[#CCFF00] rounded-full animate-pulse"></span>
                        <span className="text-xs md:text-sm font-semibold text-white/80 uppercase tracking-wider">Now Open in Dublin City Centre</span>
                    </div>
                    
                    <h1 ref={addAosRef} className="surge-fade-up text-5xl md:text-7xl lg:text-8xl xl:text-9xl text-white mb-6 break-words" style={{ transitionDelay: '100ms' }}>
                        TRAIN<br />
                        <span className="gradient-text">HARDER.</span><br />
                        GET STRONGER.
                    </h1>
                    
                    <p ref={addAosRef} className="surge-fade-up text-base md:text-xl text-white/60 mb-10 max-w-xl leading-relaxed" style={{ transitionDelay: '200ms' }}>
                        High-intensity training, world-class coaches, and a community that pushes you to be your best. This is SURGE.
                    </p>
                    
                    <div ref={addAosRef} className="surge-fade-up flex flex-wrap gap-4 mb-16" style={{ transitionDelay: '300ms' }}>
                        <a onClick={() => scrollToSection('pricing')} className="btn-gradient w-full md:w-auto">
                            <span>
                                Start 7-Day Free Trial
                                <ArrowRight className="w-5 h-5" />
                            </span>
                        </a>
                        <a onClick={() => scrollToSection('app')} className="btn-outline-white w-full md:w-auto cursor-pointer">
                            Download App
                            <Smartphone className="w-5 h-5" />
                        </a>
                    </div>

                    {/* Stats */}
                    <div ref={addAosRef} className="surge-fade-up flex flex-wrap items-center gap-8 md:gap-12" style={{ transitionDelay: '400ms' }}>
                        <div>
                            <span className="block text-4xl md:text-5xl font-display text-white">5K+</span>
                            <span className="text-xs md:text-sm text-white/50 uppercase tracking-wider">Active Members</span>
                        </div>
                        <div className="hidden md:block w-px h-12 bg-white/20"></div>
                        <div>
                            <span className="block text-4xl md:text-5xl font-display text-white">50+</span>
                            <span className="text-xs md:text-sm text-white/50 uppercase tracking-wider">Classes Weekly</span>
                        </div>
                        <div className="hidden md:block w-px h-12 bg-white/20"></div>
                        <div>
                            <span className="block text-4xl md:text-5xl font-display text-white">4.9</span>
                            <span className="text-xs md:text-sm text-white/50 uppercase tracking-wider">App Rating</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Marquee Section */}
        <div className="py-4 bg-[#FF6B35] rotate-1 scale-105 z-20 relative overflow-hidden border-y-4 border-black mb-12">
            <div className="flex whitespace-nowrap animate-marquee-surge">
                <span className="text-4xl font-display text-black mx-8">TRAIN LIKE A PRO</span>
                <span className="text-4xl font-display text-white text-stroke mx-8">///</span>
                <span className="text-4xl font-display text-black mx-8">NO EXCUSES</span>
                <span className="text-4xl font-display text-white text-stroke mx-8">///</span>
                <span className="text-4xl font-display text-black mx-8">SWEAT IT OUT</span>
                <span className="text-4xl font-display text-white text-stroke mx-8">///</span>
                <span className="text-4xl font-display text-black mx-8">DEFY LIMITS</span>
                <span className="text-4xl font-display text-white text-stroke mx-8">///</span>
                <span className="text-4xl font-display text-black mx-8">TRAIN LIKE A PRO</span>
                <span className="text-4xl font-display text-white text-stroke mx-8">///</span>
                <span className="text-4xl font-display text-black mx-8">NO EXCUSES</span>
                <span className="text-4xl font-display text-white text-stroke mx-8">///</span>
                <span className="text-4xl font-display text-black mx-8">SWEAT IT OUT</span>
                <span className="text-4xl font-display text-white text-stroke mx-8">///</span>
                <span className="text-4xl font-display text-black mx-8">DEFY LIMITS</span>
                <span className="text-4xl font-display text-white text-stroke mx-8">///</span>
            </div>
        </div>

        {/* Classes Section */}
        <section id="classes" className="py-16 lg:py-24 bg-[#0A0A0A] relative">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span ref={addAosRef} className="surge-fade-up inline-block px-4 py-2 bg-[#FF6B35]/10 border border-[#FF6B35]/20 rounded-full text-[#FF6B35] text-sm font-bold uppercase tracking-wider mb-4">Our Classes</span>
                    <h2 ref={addAosRef} className="surge-fade-up text-5xl md:text-6xl lg:text-7xl text-white mb-6" style={{ transitionDelay: '100ms' }}>
                        FIND YOUR <span className="gradient-text">FIRE</span>
                    </h2>
                    <p ref={addAosRef} className="surge-fade-up text-white/60 text-lg" style={{ transitionDelay: '200ms' }}>
                        From high-intensity interval training to strength and conditioning, we have a class for every fitness level and goal.
                    </p>
                </div>

                {/* Classes Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        { title: "SURGE HIIT", type: "High Intensity", desc: "45 minutes of heart-pumping, calorie-torching intervals that'll leave you breathless.", time: "45 min", cal: "600 cal", img: "1599058945522-28d584b6f0ff", color: "#FF6B35" },
                        { title: "POWER LIFT", type: "Strength", desc: "Build muscle and increase strength with our signature barbell and dumbbell program.", time: "60 min", cal: "450 cal", img: "1517836357463-d25dfeac3438", color: "#9D4EDD" },
                        { title: "SPIN SURGE", type: "Cardio", desc: "High-energy cycling with immersive lighting and beats that'll push you to your limits.", time: "45 min", cal: "550 cal", img: "1518611012118-696072aa579a", color: "#5E9FFF" },
                        { title: "RESTORE", type: "Recovery", desc: "Yoga-inspired stretching and mobility to help you recover and prevent injury.", time: "60 min", cal: "Mind & Body", img: "1544367567-0f2fcb009e0b", color: "#00D9FF", icon: Heart },
                        { title: "BOX FIT", type: "Combat", desc: "Boxing-inspired cardio workout with bags, pads, and footwork drills.", time: "50 min", cal: "700 cal", img: "1549576490-b0b4831ef60a", color: "#FF5C8A" },
                        { title: "SURGE BOOTCAMP", type: "Signature", desc: "Our signature full-body workout combining strength, cardio, and functional training.", time: "55 min", cal: "650 cal", img: "1571019614242-c5c5dee9f50b", color: "#FF8F5E" }
                    ].map((cls, idx) => (
                        <div key={idx} ref={addAosRef} className="surge-fade-up class-card group" style={{ transitionDelay: `${(idx % 3) * 100}ms` }}>
                            <img src={`https://images.unsplash.com/photo-${cls.img}?w=500&h=600&fit=crop&q=80`} 
                                 alt={cls.title} 
                                 className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            <div className="class-card-overlay">
                                <span 
                                    className="inline-block px-3 py-1 border rounded text-xs font-bold uppercase tracking-wider mb-3"
                                    style={{ 
                                        backgroundColor: `${cls.color}33`, 
                                        borderColor: `${cls.color}66`, 
                                        color: cls.color 
                                    }}
                                >
                                    {cls.type}
                                </span>
                                <h3 className="text-3xl text-white mb-2">{cls.title}</h3>
                                <p className="text-white/60 text-sm mb-4">{cls.desc}</p>
                                <div className="flex items-center gap-4 text-sm">
                                    <span className="text-white/50"><Clock className="w-4 h-4 inline mr-1" /> {cls.time}</span>
                                    <span className="text-white/50">
                                        {cls.icon ? <cls.icon className="w-4 h-4 inline mr-1" /> : <Flame className="w-4 h-4 inline mr-1" />} {cls.cal}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View Schedule CTA */}
                <div ref={addAosRef} className="surge-fade-up text-center mt-12">
                    <a className="btn-outline-white cursor-pointer">
                        View Full Schedule
                        <Calendar className="w-5 h-5" />
                    </a>
                </div>
            </div>
        </section>

        {/* App Section */}
        <section id="app" className="py-16 lg:py-24 relative overflow-hidden">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF3366]/20 via-[#7B2CBF]/10 to-[#0A0A0A]"></div>
            
            <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left - Content */}
                    <div>
                        <span ref={addAosRef} className="surge-fade-up inline-block px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[#00D9FF] text-sm font-bold uppercase tracking-wider mb-6">The SURGE App</span>
                        
                        <h2 ref={addAosRef} className="surge-fade-up text-5xl md:text-6xl lg:text-7xl text-white mb-6" style={{ transitionDelay: '100ms' }}>
                            YOUR GYM IN<br /><span className="gradient-text-blue">YOUR POCKET</span>
                        </h2>
                        
                        <p ref={addAosRef} className="surge-fade-up text-white/60 text-lg mb-10 leading-relaxed" style={{ transitionDelay: '200ms' }}>
                            Book classes, track workouts, compete with friends, and access 500+ on-demand workouts. The SURGE app is your ultimate fitness companion.
                        </p>

                        {/* App Features */}
                        <div ref={addAosRef} className="surge-fade-up grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10" style={{ transitionDelay: '300ms' }}>
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 gradient-orange-pink rounded-xl flex items-center justify-center flex-shrink-0">
                                    <CalendarCheck className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white mb-1">Easy Booking</h4>
                                    <p className="text-sm text-white/50">Reserve your spot in seconds</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 gradient-pink-purple rounded-xl flex items-center justify-center flex-shrink-0">
                                    <Trophy className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white mb-1">Leaderboards</h4>
                                    <p className="text-sm text-white/50">Compete with friends</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 gradient-purple-blue rounded-xl flex items-center justify-center flex-shrink-0">
                                    <PlayCircle className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white mb-1">500+ Workouts</h4>
                                    <p className="text-sm text-white/50">Train anywhere, anytime</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 gradient-blue-cyan rounded-xl flex items-center justify-center flex-shrink-0">
                                    <BarChart3 className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white mb-1">Progress Tracking</h4>
                                    <p className="text-sm text-white/50">See your gains over time</p>
                                </div>
                            </div>
                        </div>

                        {/* App Store Buttons */}
                        <div ref={addAosRef} className="surge-fade-up flex flex-wrap gap-4" style={{ transitionDelay: '400ms' }}>
                            <a href="#" className="inline-flex items-center gap-3 px-6 py-4 bg-white rounded-xl hover:bg-white/90 transition-colors flex-1 sm:flex-none justify-center sm:justify-start">
                                <div className="text-left">
                                    <span className="block text-[10px] text-[#0A0A0A]/60 uppercase">Download on the</span>
                                    <span className="block text-lg font-bold text-[#0A0A0A] leading-tight">App Store</span>
                                </div>
                            </a>
                            <a href="#" className="inline-flex items-center gap-3 px-6 py-4 bg-white rounded-xl hover:bg-white/90 transition-colors flex-1 sm:flex-none justify-center sm:justify-start">
                                <div className="text-left">
                                    <span className="block text-[10px] text-[#0A0A0A]/60 uppercase">Get it on</span>
                                    <span className="block text-lg font-bold text-[#0A0A0A] leading-tight">Google Play</span>
                                </div>
                            </a>
                        </div>
                    </div>

                    {/* Right - Phone Mockup */}
                    <div ref={addAosRef} className="surge-fade-left flex justify-center lg:justify-end mt-12 lg:mt-0">
                        <div className="phone-mockup">
                            <div className="phone-notch"></div>
                            <div className="phone-mockup-screen p-4">
                                <img src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=600&fit=crop&q=80" 
                                     alt="SURGE App Screenshot" 
                                     className="w-full h-full object-cover rounded-3xl" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Trainers Section */}
        <section id="trainers" className="py-16 lg:py-24 bg-[#121212]">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span ref={addAosRef} className="surge-fade-up inline-block px-4 py-2 bg-[#FF6B35]/10 border border-[#FF6B35]/20 rounded-full text-[#FF6B35] text-sm font-bold uppercase tracking-wider mb-4">Our Coaches</span>
                    <h2 ref={addAosRef} className="surge-fade-up text-5xl md:text-6xl lg:text-7xl text-white mb-6" style={{ transitionDelay: '100ms' }}>
                        WORLD-CLASS <span className="gradient-text">TRAINERS</span>
                    </h2>
                    <p ref={addAosRef} className="surge-fade-up text-white/60 text-lg" style={{ transitionDelay: '200ms' }}>
                        Our certified coaches are here to push you, motivate you, and help you achieve results you never thought possible.
                    </p>
                </div>

                {/* Trainers Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { name: "MARCUS O'BRIEN", role: "Head Coach / HIIT Specialist", desc: "Former pro athlete. 10+ years coaching experience.", color: "text-[#FF6B35]", img: "1567013127542-490d757e51fc" },
                        { name: "AISLING KELLY", role: "Spin & Cardio Lead", desc: "Certified spin instructor. Energy queen.", color: "text-[#FF3366]", img: "1594381898411-846e7d193883" },
                        { name: "DARREN WALSH", role: "Strength & Conditioning", desc: "Powerlifting champion. Form perfectionist.", color: "text-[#9D4EDD]", img: "1583454110551-21f2fa2afe61" },
                        { name: "NIAMH FITZGERALD", role: "Yoga & Recovery", desc: "200hr RYT certified. Mindfulness advocate.", color: "text-[#00D9FF]", img: "1571731956672-f2b94d7dd0cb" }
                    ].map((trainer, idx) => (
                        <div key={idx} ref={addAosRef} className="surge-fade-up trainer-card" style={{ transitionDelay: `${(idx + 1) * 100}ms` }}>
                            <img src={`https://images.unsplash.com/photo-${trainer.img}?w=400&h=500&fit=crop&q=80`} 
                                 alt={`Coach ${trainer.name}`} 
                                 className="w-full h-96 object-cover img-grayscale" />
                            <div className="trainer-card-info">
                                <h3 className="text-2xl font-display text-white mb-1">{trainer.name}</h3>
                                <p className={`text-sm font-semibold mb-2 ${trainer.color}`}>{trainer.role}</p>
                                <p className="text-white/50 text-xs">{trainer.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-16 lg:py-24 bg-[#0A0A0A] relative overflow-hidden">
            {/* Gradient Orbs */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-[#FF6B35]/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#7B2CBF]/20 rounded-full blur-3xl"></div>
            
            <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span ref={addAosRef} className="surge-fade-up inline-block px-4 py-2 bg-[#FF6B35]/10 border border-[#FF6B35]/20 rounded-full text-[#FF6B35] text-sm font-bold uppercase tracking-wider mb-4">Membership</span>
                    <h2 ref={addAosRef} className="surge-fade-up text-5xl md:text-6xl lg:text-7xl text-white mb-6" style={{ transitionDelay: '100ms' }}>
                        INVEST IN <span className="gradient-text">YOURSELF</span>
                    </h2>
                    <p ref={addAosRef} className="surge-fade-up text-white/60 text-lg" style={{ transitionDelay: '200ms' }}>
                        Choose the plan that fits your lifestyle. All memberships include full app access.
                    </p>
                </div>

                {/* Pricing Grid */}
                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {/* Basic Plan */}
                    <div ref={addAosRef} className="surge-fade-up pricing-card" style={{ transitionDelay: '100ms' }}>
                        <div className="mb-8">
                            <h3 className="text-2xl font-display text-white mb-2">BASIC</h3>
                            <p className="text-white/50 text-sm">Perfect for getting started</p>
                        </div>
                        <div className="mb-8">
                            <span className="text-5xl font-display text-white">€49</span>
                            <span className="text-white/50">/month</span>
                        </div>
                        <ul className="space-y-4 mb-10">
                            {[
                                { text: "8 classes per month", check: true },
                                { text: "Full gym access", check: true },
                                { text: "SURGE app access", check: true },
                                { text: "On-demand workouts", check: false },
                                { text: "Guest passes", check: false }
                            ].map((item, i) => (
                                <li key={i} className={`flex items-center gap-3 ${item.check ? 'text-white/70' : 'text-white/40'}`}>
                                    {item.check ? <Check className="w-5 h-5 text-[#FF6B35]" /> : <X className="w-5 h-5" />}
                                    {item.text}
                                </li>
                            ))}
                        </ul>
                        <a href="#" className="btn-outline-white w-full">
                            Get Started
                        </a>
                    </div>

                    {/* Pro Plan (Featured) */}
                    <div ref={addAosRef} className="surge-fade-up pricing-card featured transform lg:-translate-y-4" style={{ transitionDelay: '200ms' }}>
                        <div className="mb-8">
                            <h3 className="text-2xl font-display text-white mb-2">UNLIMITED</h3>
                            <p className="text-white/50 text-sm">For the serious athlete</p>
                        </div>
                        <div className="mb-8">
                            <span className="text-5xl font-display gradient-text">€89</span>
                            <span className="text-white/50">/month</span>
                        </div>
                        <ul className="space-y-4 mb-10">
                            {[
                                "Unlimited classes",
                                "Full gym access",
                                "SURGE app + on-demand",
                                "2 guest passes/month",
                                "Priority booking"
                            ].map((text, i) => (
                                <li key={i} className="flex items-center gap-3 text-white/70">
                                    <Check className="w-5 h-5 text-[#FF6B35]" />
                                    {text}
                                </li>
                            ))}
                        </ul>
                        <a onClick={() => scrollToSection('pricing')} className="btn-gradient w-full cursor-pointer">
                            <span>Start Free Trial</span>
                        </a>
                    </div>

                    {/* Elite Plan */}
                    <div ref={addAosRef} className="surge-fade-up pricing-card" style={{ transitionDelay: '300ms' }}>
                        <div className="mb-8">
                            <h3 className="text-2xl font-display text-white mb-2">ELITE</h3>
                            <p className="text-white/50 text-sm">The ultimate experience</p>
                        </div>
                        <div className="mb-8">
                            <span className="text-5xl font-display text-white">€149</span>
                            <span className="text-white/50">/month</span>
                        </div>
                        <ul className="space-y-4 mb-10">
                            {[
                                "Everything in Unlimited",
                                "1-on-1 PT session/month",
                                "Nutrition coaching",
                                "Recovery lounge access",
                                "5 guest passes/month"
                            ].map((text, i) => (
                                <li key={i} className="flex items-center gap-3 text-white/70">
                                    <Check className="w-5 h-5 text-[#FF6B35]" />
                                    {text}
                                </li>
                            ))}
                        </ul>
                        <a href="#" className="btn-outline-white w-full">
                            Get Started
                        </a>
                    </div>
                </div>

                {/* Trial CTA */}
                <div ref={addAosRef} className="surge-fade-up text-center mt-12">
                    <p className="text-white/50 text-sm">All plans include a 7-day free trial. Cancel anytime.</p>
                </div>
            </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 lg:py-24 bg-[#121212]">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span ref={addAosRef} className="surge-fade-up inline-block px-4 py-2 bg-[#FF6B35]/10 border border-[#FF6B35]/20 rounded-full text-[#FF6B35] text-sm font-bold uppercase tracking-wider mb-4">Success Stories</span>
                    <h2 ref={addAosRef} className="surge-fade-up text-5xl md:text-6xl lg:text-7xl text-white mb-6" style={{ transitionDelay: '100ms' }}>
                        REAL PEOPLE. <span className="gradient-text">REAL RESULTS.</span>
                    </h2>
                </div>

                {/* Testimonials Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        { text: "I've tried every gym in Dublin. SURGE is different. The energy, the community, the results—I've lost 15kg in 4 months and I actually look forward to working out.", name: "Sarah M.", member: "Member since 2023", img: "1494790108377-be9c29b29330" },
                        { text: "The coaches here are incredible. They remember your name, your goals, and they push you just the right amount. Best investment I've made in myself.", name: "David K.", member: "Member since 2022", img: "1507003211169-0a1dd7228f2d" },
                        { text: "The app is a game-changer. I can book classes at 6am when I wake up, track my progress, and even do workouts when I'm traveling. So convenient!", name: "Emma O.", member: "Member since 2024", img: "1534528741775-53994a69daeb" }
                    ].map((t, i) => (
                        <div key={i} ref={addAosRef} className="surge-fade-up testimonial-card" style={{ transitionDelay: `${(i + 1) * 100}ms` }}>
                            <div className="flex gap-1 mb-4">
                                {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="w-5 h-5 fill-[#FF6B35] text-[#FF6B35]" />)}
                            </div>
                            <p className="text-white/80 mb-6 leading-relaxed">"{t.text}"</p>
                            <div className="flex items-center gap-4">
                                <img src={`https://images.unsplash.com/photo-${t.img}?w=80&h=80&fit=crop&q=80`} 
                                     alt="" 
                                     className="w-12 h-12 rounded-full object-cover border-2 border-[#FF6B35]" />
                                <div>
                                    <span className="block font-bold text-white">{t.name}</span>
                                    <span className="text-xs text-white/50">{t.member}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* Location Section */}
        <section id="locations" className="py-16 lg:py-24 bg-[#0A0A0A] relative">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left - Map/Image */}
                    <div ref={addAosRef} className="surge-fade-right relative">
                        <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=700&h=500&fit=crop&q=80" 
                             alt="SURGE Fitness Dublin" 
                             className="w-full h-[500px] object-cover rounded-2xl" />
                        
                        {/* Location Card */}
                        <div className="absolute -bottom-8 -right-8 bg-[#1A1A1A] p-6 rounded-2xl border border-white/10 max-w-[280px]">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 gradient-orange-pink rounded-xl flex items-center justify-center">
                                    <MapPin className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white">Dublin City Centre</h4>
                                    <p className="text-sm text-white/50">Now Open</p>
                                </div>
                            </div>
                            <p className="text-sm text-white/70">45 Pearse Street, Dublin 2<br />D02 XK88</p>
                        </div>
                    </div>

                    {/* Right - Content */}
                    <div>
                        <span ref={addAosRef} className="surge-fade-up inline-block px-4 py-2 bg-[#FF6B35]/10 border border-[#FF6B35]/20 rounded-full text-[#FF6B35] text-sm font-bold uppercase tracking-wider mb-6">Visit Us</span>
                        
                        <h2 ref={addAosRef} className="surge-fade-up text-5xl md:text-6xl lg:text-7xl text-white mb-6" style={{ transitionDelay: '100ms' }}>
                            COME <span className="gradient-text">FEEL THE ENERGY</span>
                        </h2>
                        
                        <p ref={addAosRef} className="surge-fade-up text-white/60 text-lg mb-10 leading-relaxed" style={{ transitionDelay: '200ms' }}>
                            Our 1,500 sqm flagship studio features state-of-the-art equipment, immersive lighting, premium sound systems, and everything you need to crush your workout.
                        </p>

                        {/* Opening Hours */}
                        <div ref={addAosRef} className="surge-fade-up space-y-4 mb-10" style={{ transitionDelay: '300ms' }}>
                            {[
                                { day: "Monday – Friday", time: "6:00 AM – 10:00 PM" },
                                { day: "Saturday", time: "7:00 AM – 8:00 PM" },
                                { day: "Sunday", time: "8:00 AM – 6:00 PM" }
                            ].map((h, i) => (
                                <div key={i} className="flex justify-between items-center py-3 border-b border-white/10">
                                    <span className="text-white font-medium">{h.day}</span>
                                    <span className="text-white/60">{h.time}</span>
                                </div>
                            ))}
                        </div>

                        <div ref={addAosRef} className="surge-fade-up flex flex-wrap gap-4" style={{ transitionDelay: '400ms' }}>
                            <a href="#" className="btn-gradient">
                                <span>
                                    Book a Tour
                                    <ArrowRight className="w-5 h-5" />
                                </span>
                            </a>
                            <a href="tel:+35318765432" className="btn-outline-white">
                                <Phone className="w-5 h-5" />
                                +353 1 876 5432
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24 relative overflow-hidden">
            <div className="absolute inset-0 gradient-full opacity-90"></div>
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1920&h=600&fit=crop&q=80')] bg-cover bg-center mix-blend-overlay opacity-30"></div>
            
            <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center relative z-10">
                <h2 ref={addAosRef} className="surge-fade-up text-5xl md:text-6xl lg:text-8xl text-white mb-6">
                    READY TO<br />TRANSFORM?
                </h2>
                <p ref={addAosRef} className="surge-fade-up text-xl text-white/80 mb-10" style={{ transitionDelay: '100ms' }}>
                    Start your 7-day free trial today. No commitment. No credit card required.
                </p>
                <div ref={addAosRef} className="surge-fade-up flex flex-wrap justify-center gap-4" style={{ transitionDelay: '200ms' }}>
                    <a onClick={() => scrollToSection('pricing')} className="inline-flex items-center gap-3 px-10 py-5 bg-white text-[#0A0A0A] font-bold text-lg uppercase tracking-wide rounded-full hover:bg-white/90 transition-all hover:transform hover:-translate-y-1 cursor-pointer">
                        Start Free Trial
                        <ArrowRight className="w-6 h-6" />
                    </a>
                </div>
            </div>
        </section>

        {/* Footer */}
        <footer className="bg-[#0A0A0A] py-16 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div>
                        <a href="#" className="flex items-center gap-2 mb-6">
                            <div className="w-10 h-10 gradient-orange-pink rounded-lg flex items-center justify-center">
                                <Zap className="w-6 h-6 text-white" />
                            </div>
                            <span className="font-display text-3xl text-white tracking-wide">SURGE</span>
                        </a>
                        <p className="text-sm text-white/50 leading-relaxed mb-6">
                            Dublin's most electrifying fitness experience. Train harder. Get stronger. Join the movement.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-white/60 hover:bg-[#FF6B35] hover:text-white transition-all">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-white/60 hover:bg-[#FF6B35] hover:text-white transition-all">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-white/60 hover:bg-[#FF6B35] hover:text-white transition-all">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-white/60 hover:bg-[#FF6B35] hover:text-white transition-all">
                                <Youtube className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold text-white mb-4 uppercase tracking-wider text-sm">Quick Links</h4>
                        <ul className="space-y-3 text-sm">
                            <li><a href="#" className="text-white/50 hover:text-[#FF6B35] transition-colors">Classes</a></li>
                            <li><a href="#" className="text-white/50 hover:text-[#FF6B35] transition-colors">Membership</a></li>
                            <li><a href="#" className="text-white/50 hover:text-[#FF6B35] transition-colors">Personal Training</a></li>
                            <li><a href="#" className="text-white/50 hover:text-[#FF6B35] transition-colors">Corporate Wellness</a></li>
                            <li><a href="#" className="text-white/50 hover:text-[#FF6B35] transition-colors">Gift Cards</a></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="font-bold text-white mb-4 uppercase tracking-wider text-sm">Company</h4>
                        <ul className="space-y-3 text-sm">
                            <li><a href="#" className="text-white/50 hover:text-[#FF6B35] transition-colors">About Us</a></li>
                            <li><a href="#" className="text-white/50 hover:text-[#FF6B35] transition-colors">Careers</a></li>
                            <li><a href="#" className="text-white/50 hover:text-[#FF6B35] transition-colors">Blog</a></li>
                            <li><a href="#" className="text-white/50 hover:text-[#FF6B35] transition-colors">Press</a></li>
                            <li><a href="#" className="text-white/50 hover:text-[#FF6B35] transition-colors">Contact</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-bold text-white mb-4 uppercase tracking-wider text-sm">Contact</h4>
                        <ul className="space-y-3 text-sm text-white/50">
                            <li>45 Pearse Street</li>
                            <li>Dublin 2, D02 XK88</li>
                            <li><a href="tel:+35318765432" className="hover:text-[#FF6B35] transition-colors">+353 1 876 5432</a></li>
                            <li><a href="mailto:hello@surgefitness.ie" className="hover:text-[#FF6B35] transition-colors">hello@surgefitness.ie</a></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-white/40">
                        © 2025 SURGE Fitness. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-xs text-white/40">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    </div>
  );
}
