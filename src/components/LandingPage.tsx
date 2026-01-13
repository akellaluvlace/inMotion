'use client';

import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
  Zap,
  Sparkles,
  ArrowRight,
  Layers,
  Layout,
  Globe,
  ShoppingBag,
  Rocket,
  Check,
  GitBranch,
  Receipt,
  ShieldCheck,
  BadgePercent,
  Lock,
  Clock,
  Code2,
  MapPin,
  HelpCircle,
  Plus,
  Minus,
} from 'lucide-react';

// Move styles to a constant to avoid hydration mismatch from styled-jsx hashing
const customStyles = `
  /* Animated gradient background */
  .hero-gradient {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 100vh;
      background: 
          radial-gradient(ellipse 80% 50% at 50% -20%, rgba(99, 102, 241, 0.15), transparent),
          radial-gradient(ellipse 60% 40% at 100% 0%, rgba(168, 85, 247, 0.1), transparent),
          radial-gradient(ellipse 50% 30% at 0% 100%, rgba(59, 130, 246, 0.1), transparent);
      pointer-events: none;
  }

  /* Subtle grid pattern */
  .grid-pattern {
      position: absolute;
      inset: 0;
      background-image: 
          linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
      background-size: 64px 64px;
      mask-image: radial-gradient(ellipse at center, black 20%, transparent 70%);
      pointer-events: none;
  }

  /* Floating orbs */
  .orb {
      position: absolute;
      border-radius: 50%;
      filter: blur(80px);
      opacity: 0.4;
      animation: float 20s ease-in-out infinite;
  }

  .orb-1 {
      width: 600px;
      height: 600px;
      background: linear-gradient(135deg, #6366f1, #8b5cf6);
      top: -200px;
      left: -200px;
      animation-delay: 0s;
  }

  .orb-2 {
      width: 400px;
      height: 400px;
      background: linear-gradient(135deg, #3b82f6, #06b6d4);
      bottom: -100px;
      right: -100px;
      animation-delay: -10s;
  }

  .orb-3 {
      width: 300px;
      height: 300px;
      background: linear-gradient(135deg, #ec4899, #8b5cf6);
      top: 50%;
      right: 10%;
      animation-delay: -5s;
  }

  @keyframes float {
      0%, 100% { transform: translate(0, 0) scale(1); }
      25% { transform: translate(30px, -30px) scale(1.05); }
      50% { transform: translate(-20px, 20px) scale(0.95); }
      75% { transform: translate(20px, 10px) scale(1.02); }
  }

  /* Glass morphism */
  .glass {
      background: rgba(255, 255, 255, 0.03);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.06);
  }

  .glass-strong {
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(40px);
      -webkit-backdrop-filter: blur(40px);
      border: 1px solid rgba(255, 255, 255, 0.1);
  }

  /* Gradient text */
  .gradient-text {
      background: linear-gradient(135deg, #fff 0%, #94a3b8 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
  }

  .gradient-text-color {
      background: linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
  }

  /* Service cards */
  .service-card {
      position: relative;
      background: linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%);
      border: 1px solid rgba(255,255,255,0.06);
      border-radius: 24px;
      overflow: hidden;
      transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .service-card::before {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(99, 102, 241, 0.1), transparent 40%);
      opacity: 0;
      transition: opacity 0.4s;
  }

  .service-card:hover::before {
      opacity: 1;
  }

  .service-card:hover {
      transform: translateY(-8px);
      border-color: rgba(99, 102, 241, 0.3);
      box-shadow: 0 25px 50px -12px rgba(99, 102, 241, 0.15);
  }

  /* Primary button */
  .btn-primary {
      position: relative;
      background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
      overflow: hidden;
      transition: all 0.3s ease;
  }

  .btn-primary::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, #818cf8 0%, #a78bfa 100%);
      opacity: 0;
      transition: opacity 0.3s ease;
  }

  .btn-primary:hover::before {
      opacity: 1;
  }

  .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 20px 40px -15px rgba(99, 102, 241, 0.5);
  }

  .btn-primary span {
      position: relative;
      z-index: 1;
  }

  /* Secondary button */
  .btn-secondary {
      position: relative;
      background: transparent;
      border: 1px solid rgba(255,255,255,0.2);
      transition: all 0.3s ease;
  }

  .btn-secondary:hover {
      background: rgba(255,255,255,0.05);
      border-color: rgba(255,255,255,0.3);
      transform: translateY(-2px);
  }

  /* Pricing card */
  .pricing-card {
      position: relative;
      background: linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%);
      border: 1px solid rgba(255,255,255,0.08);
      transition: all 0.4s ease;
  }

  .pricing-card:hover {
      border-color: rgba(99, 102, 241, 0.4);
      transform: scale(1.02);
  }

  .pricing-card.featured {
      background: linear-gradient(180deg, rgba(99, 102, 241, 0.15) 0%, rgba(139, 92, 246, 0.05) 100%);
      border-color: rgba(99, 102, 241, 0.3);
  }

  /* Marquee animation */
  @keyframes marquee {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
  }

  .animate-marquee {
      animation: marquee 30s linear infinite;
  }
  
  .animate-marquee-slow {
      animation: marquee 60s linear infinite;
  }

  .animate-marquee:hover, 
  .animate-marquee-slow:hover {
      animation-play-state: paused;
  }

  /* Process line */
  .process-line {
      position: absolute;
      left: 28px;
      top: 70px;
      bottom: 20px;
      width: 2px;
      background: linear-gradient(180deg, rgba(99, 102, 241, 0.5) 0%, rgba(139, 92, 246, 0.1) 100%);
  }

  /* Vibe rescue special styling */
  .vibe-card {
      background: linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(236, 72, 153, 0.05) 100%);
      border: 1px solid rgba(245, 158, 11, 0.2);
  }

  .vibe-card:hover {
      border-color: rgba(245, 158, 11, 0.4);
  }

  /* Scroll indicator */
  @keyframes bounce-slow {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(10px); }
  }

  .animate-bounce-slow {
      animation: bounce-slow 2s ease-in-out infinite;
  }

  /* FAQ accordion */
  .faq-item {
      border-bottom: 1px solid rgba(255,255,255,0.06);
  }

  .faq-item:last-child {
      border-bottom: none;
  }
  
  /* Stats counter effect */
  .stat-number {
      font-feature-settings: 'tnum';
      font-variant-numeric: tabular-nums;
  }
`;

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out-cubic',
      offset: 50,
    });

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mouse-x', `${x}%`);
    card.style.setProperty('--mouse-y', `${y}%`);
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="bg-[#030712] text-[#f1f5f9] font-sans overflow-x-hidden min-h-screen relative selection:bg-indigo-500/30 selection:text-white">
      {/* 
        FIXED: Replaced <style jsx global> with standard style injection 
        to prevent class name hydration mismatches 
      */}
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />

      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
        <div className="grid-pattern"></div>
      </div>

      {/* Navigation */}
      <nav className={`fixed w-full z-50 px-4 py-4 transition-all duration-300 ${isScrolled ? 'backdrop-blur-xl' : ''}`}>
        <div className="max-w-6xl mx-auto">
          <div className="glass-strong rounded-2xl px-6 py-3 flex items-center justify-between">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight leading-none">Akella</span>
                <span className="text-xs text-indigo-400 font-medium tracking-wider">inMotion</span>
              </div>
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              <a href="#services" className="px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-white/5">Services</a>
              <a href="#pricing" className="px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-white/5">Pricing</a>
              <a href="#vibe-rescue" className="px-4 py-2 text-sm text-amber-400 hover:text-amber-300 transition-colors rounded-lg hover:bg-amber-500/10 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Vibe Rescue
              </a>
              <a href="#process" className="px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-white/5">Process</a>
            </div>

            {/* CTA Button */}
            <a href="#contact" className="btn-primary px-5 py-2.5 rounded-xl text-sm font-semibold text-white">
              <span className="flex items-center gap-2">
                Start Project
                <ArrowRight className="w-4 h-4" />
              </span>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-32 pb-20">
        <div className="hero-gradient"></div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          {/* Badge */}
          <div data-aos="fade-down" data-aos-duration="600" className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-sm text-slate-300">Dublin&apos;s Modern Web Studio</span>
          </div>

          {/* Headline */}
          <h1 data-aos="fade-up" data-aos-duration="800" data-aos-delay="100" className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6 leading-[0.95]">
            <span className="gradient-text">Websites that</span><br />
            <span className="gradient-text-color">actually convert.</span>
          </h1>

          {/* Subheadline */}
          <p data-aos="fade-up" data-aos-duration="800" data-aos-delay="200" className="text-lg sm:text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Landing pages and business websites built by a Dublin team with 10+ years experience. 
            <span className="text-white font-medium"> 20% below agency rates.</span> No hidden fees, ever.
          </p>

          {/* CTA Buttons */}
          <div data-aos="fade-up" data-aos-duration="800" data-aos-delay="300" className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="#contact" className="btn-primary px-8 py-4 rounded-2xl text-lg font-semibold text-white w-full sm:w-auto">
              <span className="flex items-center justify-center gap-2">
                Get a Free Quote
                <ArrowRight className="w-5 h-5" />
              </span>
            </a>
            <a href="#vibe-rescue" className="btn-secondary px-8 py-4 rounded-2xl text-lg font-semibold text-white w-full sm:w-auto flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              Vibe Code Rescue
            </a>
          </div>

          {/* Trust Indicators */}
          <div data-aos="fade-up" data-aos-duration="800" data-aos-delay="400" className="mt-16 flex flex-wrap justify-center gap-8 sm:gap-12">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold stat-number">10+</div>
              <div className="text-xs text-slate-500 uppercase tracking-widest mt-1">Years Experience</div>
            </div>
            <div className="w-px h-12 bg-white/10 hidden sm:block"></div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold stat-number">50+</div>
              <div className="text-xs text-slate-500 uppercase tracking-widest mt-1">Projects Delivered</div>
            </div>
            <div className="w-px h-12 bg-white/10 hidden sm:block"></div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold stat-number text-green-400">&lt;24h</div>
              <div className="text-xs text-slate-500 uppercase tracking-widest mt-1">Response Time</div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-slow">
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-white/40 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Tech Stack Marquee */}
      <section className="py-8 border-y border-white/5 overflow-hidden">
        <div className="flex animate-marquee">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-12 px-6 whitespace-nowrap">
              <span className="text-2xl font-bold text-white/10 hover:text-white/30 transition-colors cursor-default">React</span>
              <span className="text-white/5">◆</span>
              <span className="text-2xl font-bold text-white/10 hover:text-white/30 transition-colors cursor-default">Next.js</span>
              <span className="text-white/5">◆</span>
              <span className="text-2xl font-bold text-white/10 hover:text-white/30 transition-colors cursor-default">TypeScript</span>
              <span className="text-white/5">◆</span>
              <span className="text-2xl font-bold text-white/10 hover:text-white/30 transition-colors cursor-default">Django</span>
              <span className="text-white/5">◆</span>
              <span className="text-2xl font-bold text-white/10 hover:text-white/30 transition-colors cursor-default">React Native</span>
              <span className="text-white/5">◆</span>
              <span className="text-2xl font-bold text-white/10 hover:text-white/30 transition-colors cursor-default">PostgreSQL</span>
              <span className="text-white/5">◆</span>
              <span className="text-2xl font-bold text-white/10 hover:text-white/30 transition-colors cursor-default">Node.js</span>
              <span className="text-white/5">◆</span>
              <span className="text-2xl font-bold text-white/10 hover:text-white/30 transition-colors cursor-default">Tailwind</span>
              <span className="text-white/5">◆</span>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div data-aos="fade-up" className="inline-flex items-center gap-2 text-indigo-400 text-sm font-medium mb-4">
              <Layers className="w-4 h-4" />
              SERVICES
            </div>
            <h2 data-aos="fade-up" data-aos-delay="100" className="text-4xl sm:text-5xl font-bold mb-4">What we build</h2>
            <p data-aos="fade-up" data-aos-delay="200" className="text-slate-400 max-w-xl mx-auto">From quick landing pages to complex applications. All priced honestly, delivered professionally.</p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            
            {/* Landing Pages */}
            <div data-aos="fade-up" data-aos-delay="100" className="service-card p-8 group" onMouseMove={handleMouseMove}>
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Layout className="w-7 h-7 text-blue-400" />
                </div>
                <span className="text-2xl font-bold text-blue-400">€800</span>
              </div>
              <h3 className="text-2xl font-bold mb-3">Landing Pages</h3>
              <p className="text-slate-400 mb-6 leading-relaxed">High-converting, mobile-optimized landing pages designed to turn visitors into customers. Perfect for launches and campaigns.</p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 text-xs font-medium bg-white/5 rounded-full text-slate-300">Custom Design</span>
                <span className="px-3 py-1 text-xs font-medium bg-white/5 rounded-full text-slate-300">Mobile First</span>
                <span className="px-3 py-1 text-xs font-medium bg-white/5 rounded-full text-slate-300">SEO Ready</span>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <span className="text-sm text-slate-500">1-2 weeks delivery</span>
                <a href="#contact" className="flex items-center gap-2 text-sm font-medium text-white group-hover:text-indigo-400 transition-colors">
                  Get Quote <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            {/* Business Websites */}
            <div data-aos="fade-up" data-aos-delay="200" className="service-card p-8 group" onMouseMove={handleMouseMove}>
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Globe className="w-7 h-7 text-indigo-400" />
                </div>
                <span className="text-2xl font-bold text-indigo-400">€1,200</span>
              </div>
              <h3 className="text-2xl font-bold mb-3">Business Websites</h3>
              <p className="text-slate-400 mb-6 leading-relaxed">Full 5-10 page websites that represent your business professionally. CMS included so you can update content yourself.</p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 text-xs font-medium bg-white/5 rounded-full text-slate-300">5-10 Pages</span>
                <span className="px-3 py-1 text-xs font-medium bg-white/5 rounded-full text-slate-300">CMS Included</span>
                <span className="px-3 py-1 text-xs font-medium bg-white/5 rounded-full text-slate-300">Training</span>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <span className="text-sm text-slate-500">2-4 weeks delivery</span>
                <a href="#contact" className="flex items-center gap-2 text-sm font-medium text-white group-hover:text-indigo-400 transition-colors">
                  Get Quote <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            {/* E-Commerce */}
            <div data-aos="fade-up" data-aos-delay="300" className="service-card p-8 group" onMouseMove={handleMouseMove}>
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ShoppingBag className="w-7 h-7 text-emerald-400" />
                </div>
                <span className="text-2xl font-bold text-emerald-400">€2,400</span>
              </div>
              <h3 className="text-2xl font-bold mb-3">E-Commerce</h3>
              <p className="text-slate-400 mb-6 leading-relaxed">Online stores that sell. Secure payments, inventory management, and beautiful product showcases built to convert.</p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 text-xs font-medium bg-white/5 rounded-full text-slate-300">Secure Payments</span>
                <span className="px-3 py-1 text-xs font-medium bg-white/5 rounded-full text-slate-300">Inventory</span>
                <span className="px-3 py-1 text-xs font-medium bg-white/5 rounded-full text-slate-300">Analytics</span>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <span className="text-sm text-slate-500">3-5 weeks delivery</span>
                <a href="#contact" className="flex items-center gap-2 text-sm font-medium text-white group-hover:text-indigo-400 transition-colors">
                  Get Quote <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            {/* Custom Projects */}
            <div data-aos="fade-up" data-aos-delay="400" className="service-card p-8 group bg-gradient-to-br from-indigo-500/10 to-purple-500/5 border-indigo-500/20" onMouseMove={handleMouseMove}>
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Rocket className="w-7 h-7 text-purple-400" />
                </div>
                <span className="text-lg font-bold text-purple-400">Custom Quote</span>
              </div>
              <h3 className="text-2xl font-bold mb-3">MVPs & Apps</h3>
              <p className="text-slate-400 mb-6 leading-relaxed">Web applications, mobile apps (iOS & Android), SaaS platforms, and AI automation. Scoped and quoted individually.</p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 text-xs font-medium bg-white/5 rounded-full text-slate-300">Web Apps</span>
                <span className="px-3 py-1 text-xs font-medium bg-white/5 rounded-full text-slate-300">Mobile Apps</span>
                <span className="px-3 py-1 text-xs font-medium bg-white/5 rounded-full text-slate-300">AI & Automation</span>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <span className="text-sm text-slate-500">Discovery call required</span>
                <a href="#contact" className="flex items-center gap-2 text-sm font-medium text-white group-hover:text-indigo-400 transition-colors">
                  Book Call <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vibe Code Rescue Section */}
      <section id="vibe-rescue" className="py-24 px-4 relative overflow-hidden">
        {/* Amber glow background */}
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 via-transparent to-transparent"></div>
        
        <div className="max-w-6xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <div>
              <div data-aos="fade-right" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                First in Dublin — Only Here
              </div>
              
              <h2 data-aos="fade-right" data-aos-delay="100" className="text-4xl sm:text-5xl font-bold mb-6">
                Stuck on your<br />
                <span className="bg-gradient-to-r from-amber-400 to-pink-500 bg-clip-text text-transparent">AI-coded website?</span>
              </h2>
              
              <p data-aos="fade-right" data-aos-delay="200" className="text-lg text-slate-400 mb-8 leading-relaxed">
                You tried Cursor, Bolt, or Lovable. Got 80% there but hit a wall. We take your AI-built project and make it production-ready. No judgement, no starting over.
              </p>

              <div data-aos="fade-right" data-aos-delay="300" className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-amber-400" />
                  </div>
                  <span className="text-slate-300">Bug fixes & code cleanup</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-amber-400" />
                  </div>
                  <span className="text-slate-300">Deployment & hosting setup</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-amber-400" />
                  </div>
                  <span className="text-slate-300">Professional polish & responsiveness</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-amber-400" />
                  </div>
                  <span className="text-slate-300">Handover with documentation</span>
                </div>
              </div>

              <div data-aos="fade-right" data-aos-delay="400" className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <a href="#contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-pink-500 text-white font-semibold hover:opacity-90 transition-opacity">
                  Send Us Your Project
                  <ArrowRight className="w-5 h-5" />
                </a>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-white">€200</span>
                  <span className="text-slate-500">starting price</span>
                </div>
              </div>
            </div>

            {/* Right Visual */}
            <div data-aos="fade-left" data-aos-delay="200" className="relative">
              <div className="vibe-card rounded-3xl p-8 backdrop-blur-sm">
                {/* Code block visual */}
                <div className="bg-black/50 rounded-2xl p-6 font-mono text-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-slate-500 text-xs ml-2">your-project.tsx</span>
                  </div>
                  <div className="space-y-2 text-xs sm:text-sm">
                    <div><span className="text-pink-400">const</span> <span className="text-blue-400">YourProject</span> <span className="text-white">=</span> <span className="text-yellow-400">()</span> <span className="text-white">=&gt;</span> <span className="text-yellow-400">{'{'}</span></div>
                    <div className="pl-4"><span className="text-slate-500">{'// AI got you 80% there...'}</span></div>
                    <div className="pl-4"><span className="text-pink-400">return</span> <span className="text-blue-400">&lt;App</span> <span className="text-purple-400">status</span><span className="text-white">=</span><span className="text-amber-400">&quot;almost&quot;</span> <span className="text-blue-400">/&gt;</span></div>
                    <div><span className="text-yellow-400">{'}'}</span></div>
                    <div className="pt-4 border-t border-white/10 mt-4">
                      <span className="text-green-400">{'// We finish it ✓'}</span>
                    </div>
                  </div>
                </div>
                
                {/* Floating badges */}
                <div className="absolute -top-4 -right-4 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500 to-pink-500 text-white text-sm font-bold shadow-lg">
                  3-7 days
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-amber-500/20 rounded-full blur-[100px]"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div data-aos="fade-up" className="inline-flex items-center gap-2 text-indigo-400 text-sm font-medium mb-4">
              <GitBranch className="w-4 h-4" />
              PROCESS
            </div>
            <h2 data-aos="fade-up" data-aos-delay="100" className="text-4xl sm:text-5xl font-bold mb-4">How we work</h2>
            <p data-aos="fade-up" data-aos-delay="200" className="text-slate-400 max-w-xl mx-auto">Simple, transparent process. No drama, no surprises.</p>
          </div>

          {/* Process Steps */}
          <div className="relative">
            <div className="process-line hidden sm:block"></div>
            
            <div className="space-y-8">
              {/* Step 1 */}
              <div data-aos="fade-up" className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg relative z-10">
                  1
                </div>
                <div className="glass rounded-2xl p-6 flex-1">
                  <h3 className="text-xl font-bold mb-2">Discovery Call</h3>
                  <p className="text-slate-400">We learn your goals and give you a fixed quote. No obligation, no hidden fees. You know exactly what it costs before we start.</p>
                </div>
              </div>

              {/* Step 2 */}
              <div data-aos="fade-up" data-aos-delay="100" className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg relative z-10">
                  2
                </div>
                <div className="glass rounded-2xl p-6 flex-1">
                  <h3 className="text-xl font-bold mb-2">Design First</h3>
                  <p className="text-slate-400">You see and approve designs before any code is written. No &quot;that&apos;s not what I asked for&quot; moments.</p>
                </div>
              </div>

              {/* Step 3 */}
              <div data-aos="fade-up" data-aos-delay="200" className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg relative z-10">
                  3
                </div>
                <div className="glass rounded-2xl p-6 flex-1">
                  <h3 className="text-xl font-bold mb-2">Build & Update</h3>
                  <p className="text-slate-400">Weekly updates keep you in the loop. You always know where your project stands. No radio silence.</p>
                </div>
              </div>

              {/* Step 4 */}
              <div data-aos="fade-up" data-aos-delay="300" className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold text-lg relative z-10">
                  <Check className="w-6 h-6" />
                </div>
                <div className="glass rounded-2xl p-6 flex-1 border-emerald-500/30">
                  <h3 className="text-xl font-bold mb-2">Launch & Support</h3>
                  <p className="text-slate-400">We launch, train your team, and stick around for questions. No abandonment after the invoice.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-4 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div data-aos="fade-up" className="inline-flex items-center gap-2 text-indigo-400 text-sm font-medium mb-4">
              <Receipt className="w-4 h-4" />
              PRICING
            </div>
            <h2 data-aos="fade-up" data-aos-delay="100" className="text-4xl sm:text-5xl font-bold mb-4">Transparent pricing</h2>
            <p data-aos="fade-up" data-aos-delay="200" className="text-slate-400 max-w-xl mx-auto">The price we quote is the price you pay. No surprises, no &quot;scope creep&quot; bills.</p>
          </div>

          {/* Pricing Table */}
          <div className="space-y-4">
            <div data-aos="fade-up" className="pricing-card rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <Layout className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Landing Page</h3>
                  <p className="text-sm text-slate-500">Single page, conversion-focused</p>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <span className="text-slate-400 text-sm">1-2 weeks</span>
                <span className="text-2xl font-bold text-blue-400">€800</span>
              </div>
            </div>

            <div data-aos="fade-up" data-aos-delay="50" className="pricing-card featured rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                  <Globe className="w-6 h-6 text-indigo-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Business Website</h3>
                  <p className="text-sm text-slate-500">5-10 pages with CMS</p>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <span className="inline-flex items-center px-2 py-1 rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-medium">Popular</span>
                <span className="text-slate-400 text-sm">2-4 weeks</span>
                <span className="text-2xl font-bold text-indigo-400">€1,200</span>
              </div>
            </div>

            <div data-aos="fade-up" data-aos-delay="100" className="pricing-card rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">E-Commerce</h3>
                  <p className="text-sm text-slate-500">Full online store</p>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <span className="text-slate-400 text-sm">3-5 weeks</span>
                <span className="text-2xl font-bold text-emerald-400">€2,400</span>
              </div>
            </div>

            <div data-aos="fade-up" data-aos-delay="150" className="pricing-card rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 vibe-card">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Vibe Code Rescue</h3>
                  <p className="text-sm text-slate-500">AI project finishing</p>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <span className="text-slate-400 text-sm">3-7 days</span>
                <span className="text-2xl font-bold text-amber-400">€200+</span>
              </div>
            </div>

            <div data-aos="fade-up" data-aos-delay="200" className="pricing-card rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                  <Rocket className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">MVP / App Development</h3>
                  <p className="text-sm text-slate-500">Custom web & mobile apps</p>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <span className="text-slate-400 text-sm">6-16 weeks</span>
                <span className="text-2xl font-bold text-purple-400">Custom</span>
              </div>
            </div>
          </div>

          {/* Price Note */}
          <p data-aos="fade-up" className="text-center text-slate-500 text-sm mt-8">
            All prices are fixed quotes. Ongoing support available from €150/month.
          </p>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div data-aos="fade-up" className="inline-flex items-center gap-2 text-indigo-400 text-sm font-medium mb-4">
              <ShieldCheck className="w-4 h-4" />
              WHY US
            </div>
            <h2 data-aos="fade-up" data-aos-delay="100" className="text-4xl sm:text-5xl font-bold mb-4">The difference</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div data-aos="fade-up" data-aos-delay="100" className="glass rounded-2xl p-6 hover:bg-white/5 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="font-bold text-lg mb-2">Actually in Dublin</h3>
              <p className="text-slate-400 text-sm">Not &quot;we have a Dublin address.&quot; We&apos;re here. Same timezone, real accountability.</p>
            </div>

            <div data-aos="fade-up" data-aos-delay="150" className="glass rounded-2xl p-6 hover:bg-white/5 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4">
                <BadgePercent className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="font-bold text-lg mb-2">20% Below Agency Rates</h3>
              <p className="text-slate-400 text-sm">Senior expertise without senior markup. We keep overhead lean.</p>
            </div>

            <div data-aos="fade-up" data-aos-delay="200" className="glass rounded-2xl p-6 hover:bg-white/5 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4">
                <Lock className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="font-bold text-lg mb-2">Fixed Prices</h3>
              <p className="text-slate-400 text-sm">The quote is the quote. No &quot;scope creep&quot; surprises, no hidden extras.</p>
            </div>

            <div data-aos="fade-up" data-aos-delay="250" className="glass rounded-2xl p-6 hover:bg-white/5 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="font-bold text-lg mb-2">24-Hour Response</h3>
              <p className="text-slate-400 text-sm">Email us, hear back within one business day. Every time. Guaranteed.</p>
            </div>

            <div data-aos="fade-up" data-aos-delay="300" className="glass rounded-2xl p-6 hover:bg-white/5 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="font-bold text-lg mb-2">AI Project Rescue</h3>
              <p className="text-slate-400 text-sm">First and only Dublin studio that finishes your vibe-coded projects.</p>
            </div>

            <div data-aos="fade-up" data-aos-delay="350" className="glass rounded-2xl p-6 hover:bg-white/5 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center mb-4">
                <Code2 className="w-6 h-6 text-pink-400" />
              </div>
              <h3 className="font-bold text-lg mb-2">Modern Stack</h3>
              <p className="text-slate-400 text-sm">React, Next.js, TypeScript. Tech that scales, not legacy systems.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof / Testimonials */}
      <section className="py-24 border-y border-white/5 overflow-hidden relative">
        <div className="max-w-6xl mx-auto px-4 mb-12 text-center">
          <h2 data-aos="fade-up" className="text-3xl sm:text-4xl font-bold mb-4">Trusted by Dublin Founders</h2>
        </div>

        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-32 z-10 bg-gradient-to-r from-[#030712] to-transparent pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-32 z-10 bg-gradient-to-l from-[#030712] to-transparent pointer-events-none"></div>

        {/* Carousel Container */}
        <div className="flex animate-marquee-slow gap-6 w-max hover:[animation-play-state:paused]">
          {[...Array(2)].map((_, i) => (
            <React.Fragment key={i}>
              <div className="w-[350px] glass p-6 rounded-2xl border border-white/10 relative group hover:border-indigo-500/30 transition-colors">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold">JD</div>
                  <div>
                    <div className="font-bold text-white">John D.</div>
                    <div className="text-xs text-indigo-400">Tech Startup CEO</div>
                  </div>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">&quot;Akella inMotion saved our launch. We needed a landing page in 5 days and they delivered something better than we imagined. The responsiveness is unmatched.&quot;</p>
              </div>

              <div className="w-[350px] glass p-6 rounded-2xl border border-white/10 relative group hover:border-emerald-500/30 transition-colors">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold">SM</div>
                  <div>
                    <div className="font-bold text-white">Sarah M.</div>
                    <div className="text-xs text-emerald-400">E-Commerce Founder</div>
                  </div>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">&quot;Our previous site was slow and confusing. The new Next.js site is lightning fast and our conversion rate jumped 40% in the first month. Incredible ROI.&quot;</p>
              </div>

              <div className="w-[350px] glass p-6 rounded-2xl border border-white/10 relative group hover:border-amber-500/30 transition-colors">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-bold">MP</div>
                  <div>
                    <div className="font-bold text-white">Michael P.</div>
                    <div className="text-xs text-amber-400">Vibe Rescue Client</div>
                  </div>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">&quot;I tried building with AI and hit a wall. Akella took my messy code and made it production-ready in 48 hours. No judgement, just solutions.&quot;</p>
              </div>

              <div className="w-[350px] glass p-6 rounded-2xl border border-white/10 relative group hover:border-blue-500/30 transition-colors">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-white font-bold">LK</div>
                  <div>
                    <div className="font-bold text-white">Lisa K.</div>
                    <div className="text-xs text-blue-400">Marketing Director</div>
                  </div>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">&quot;Finally, a dev team in Dublin that speaks plain English. No jargon, transparent pricing, and they actually answer emails. Highly recommended.&quot;</p>
              </div>

              <div className="w-[350px] glass p-6 rounded-2xl border border-white/10 relative group hover:border-purple-500/30 transition-colors">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white font-bold">RB</div>
                  <div>
                    <div className="font-bold text-white">Robert B.</div>
                    <div className="text-xs text-purple-400">SaaS Founder</div>
                  </div>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">&quot;We needed a custom MVP built quickly. The code quality is top-tier and the design system they set up makes scaling easy. Real pros.&quot;</p>
              </div>
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <div data-aos="fade-up" className="inline-flex items-center gap-2 text-indigo-400 text-sm font-medium mb-4">
              <HelpCircle className="w-4 h-4" />
              FAQ
            </div>
            <h2 data-aos="fade-up" data-aos-delay="100" className="text-4xl sm:text-5xl font-bold mb-4">Questions</h2>
          </div>

          <div data-aos="fade-up" data-aos-delay="200" className="glass rounded-3xl overflow-hidden">
            {[
              { q: "What if my project scope changes?", a: "We discuss it openly. Any scope changes get documented and quoted before we proceed. You'll never get a surprise bill." },
              { q: "Do you offer ongoing support?", a: "Yes. Training is included so you can handle basics yourself. We also offer maintenance packages starting at €150/month for ongoing support." },
              { q: "I tried building with AI and it's a mess. Will you judge me?", a: "Not even slightly. AI coding tools are genuinely impressive—you got further than most people would. We're here to help finish it, not criticise your attempt." },
              { q: "How fast can you deliver?", a: "Landing pages: 1-2 weeks. Business websites: 2-4 weeks. Vibe Code Rescue: often within days. Custom projects scoped individually." },
              { q: "What technologies do you use?", a: "React, Next.js, Django, TypeScript, and React Native for mobile. Modern stack that scales—no WordPress unless you specifically want it." }
            ].map((faq, index) => (
              <div key={index} className="faq-item p-6 cursor-pointer group" onClick={() => toggleFaq(index)}>
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{faq.q}</h3>
                  {openFaq === index ? <Minus className="w-5 h-5 text-white transition-colors" /> : <Plus className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />}
                </div>
                <div className={`faq-answer mt-4 text-slate-400 text-sm leading-relaxed ${openFaq === index ? 'block' : 'hidden'}`}>
                  {faq.a}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-4 relative">
        <div className="max-w-4xl mx-auto">
          <div data-aos="zoom-in" className="relative glass-strong rounded-[2.5rem] p-10 sm:p-16 text-center overflow-hidden">
            {/* Background glow */}
            <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-indigo-600/30 rounded-full blur-[100px]"></div>
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-purple-600/30 rounded-full blur-[100px]"></div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 text-indigo-400 text-sm font-medium mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Available for new projects
              </div>
              
              <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                Ready to build<br />something great?
              </h2>
              
              <p className="text-lg text-slate-400 mb-10 max-w-md mx-auto">
                Drop us a line. Free quote, no pressure, no obligation. Just a conversation about your project.
              </p>
              
              <a href="mailto:hello@akellainmotion.ie" className="btn-primary inline-flex items-center gap-3 px-10 py-5 rounded-2xl text-lg font-semibold text-white">
                <span>Get Your Free Quote</span>
                <ArrowRight className="w-5 h-5" />
              </a>
              
              <p className="mt-8 text-sm text-slate-500">
                Typically responds in under 4 hours
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold">Akella <span className="text-indigo-400">inMotion</span></span>
            </div>

            {/* Links */}
            <div className="flex items-center gap-8 text-sm text-slate-400">
              <a href="#services" className="hover:text-white transition-colors">Services</a>
              <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
              <a href="#vibe-rescue" className="hover:text-white transition-colors">Vibe Rescue</a>
              <a href="#contact" className="hover:text-white transition-colors">Contact</a>
            </div>

            {/* Copyright */}
            <div className="text-sm text-slate-500">
              © 2025 Akella inMotion · Dublin, Ireland 🇮🇪
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
