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
  X,
} from 'lucide-react';
import ShowDontTellAnimation from './ShowDontTellAnimation';
import ScrollReveal, { ImageItem } from './ScrollReveal';
import DigitalExperienceHero from './DigitalExperienceHero';
import imageExamples from './websitesExamples/imageExamples.png';
import websiteExamplesmobile from './websitesExamples/websiteExamplesmobile.png';
import Architect from './websitesExamples/Architect';
import AshfordHouse from './websitesExamples/AshfordHouse';
import CamdenBarbers from './websitesExamples/CamdenBarbers';
import FlowdeskProffesional from './websitesExamples/FlowdeskProffesional';
import KMurphy from './websitesExamples/KMurphy';
import LOUDStudio from './websitesExamples/LOUDStudio';
import BloomWellness from './websitesExamples/BloomWellness';
import HowthRoadRoasters from './websitesExamples/HowthRoadRoasters';
import SurgeFitness from './websitesExamples/SurgeFitness';
import ServicesCarousel from './servicesWeProvide';

import AkellaBadge from './AkellaBadge';

// Move styles to a constant to avoid hydration mismatch from styled-jsx hashing
const customStyles = `
  /* Animated gradient background - Clean minimal */
  .hero-gradient {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 100vh;
      background:
          radial-gradient(ellipse 80% 50% at 50% -20%, rgba(0, 0, 0, 0.03), transparent),
          radial-gradient(ellipse 60% 40% at 100% 0%, rgba(0, 0, 0, 0.02), transparent),
          radial-gradient(ellipse 50% 30% at 0% 100%, rgba(0, 0, 0, 0.02), transparent);
      pointer-events: none;
  }

  /* Subtle grid pattern - Clean minimal */
  .grid-pattern {
      position: absolute;
      inset: 0;
      background-image:
          linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px);
      background-size: 64px 64px;
      mask-image: radial-gradient(ellipse at center, black 20%, transparent 70%);
      pointer-events: none;
  }

  /* Floating orbs - Subtle neutral */
  .orb {
      position: absolute;
      border-radius: 50%;
      filter: blur(80px);
      opacity: 0.2;
      animation: float 20s ease-in-out infinite;
  }

  .orb-1 {
      width: 600px;
      height: 600px;
      background: #e0e0e0;
      top: -200px;
      left: -200px;
      animation-delay: 0s;
  }

  .orb-2 {
      width: 400px;
      height: 400px;
      background: #d0d0d0;
      bottom: -100px;
      right: -100px;
      animation-delay: -10s;
  }

  .orb-3 {
      width: 300px;
      height: 300px;
      background: #e8e8e8;
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

  /* Glass morphism - Clean minimal */
  .glass {
      background: rgba(255, 255, 255, 0.8);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(0, 0, 0, 0.06);
  }

  .glass-strong {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(40px);
      -webkit-backdrop-filter: blur(40px);
      border: 1px solid rgba(0, 0, 0, 0.08);
  }

  /* Gradient text - Clean minimal */
  .gradient-text {
      background: linear-gradient(135deg, #1a1a1a 0%, #666666 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
  }

  .gradient-text-color {
      background: linear-gradient(135deg, #1a1a1a 0%, #333333 50%, #1a1a1a 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
  }

  /* Service cards - Clean minimal */
  .service-card {
      position: relative;
      background: #ffffff;
      border: 1px solid #e0e0e0;
      border-radius: 24px;
      overflow: hidden;
      transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .service-card::before {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(0, 0, 0, 0.02), transparent 40%);
      opacity: 0;
      transition: opacity 0.4s;
  }

  .service-card:hover::before {
      opacity: 1;
  }

  .service-card:hover {
      transform: translateY(-8px);
      border-color: #1a1a1a;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
  }

  /* Primary button - Clean minimal */
  .btn-primary {
      position: relative;
      background: #1a1a1a;
      overflow: hidden;
      transition: all 0.3s ease;
  }

  .btn-primary::before {
      content: '';
      position: absolute;
      inset: 0;
      background: #333333;
      opacity: 0;
      transition: opacity 0.3s ease;
  }

  .btn-primary:hover::before {
      opacity: 1;
  }

  .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.2);
  }

  .btn-primary span {
      position: relative;
      z-index: 1;
  }

  /* Secondary button - Clean minimal */
  .btn-secondary {
      position: relative;
      background: #ffffff;
      border: 1px solid #e0e0e0;
      transition: all 0.3s ease;
  }

  .btn-secondary:hover {
      background: #f8f8f8;
      border-color: #1a1a1a;
      transform: translateY(-2px);
  }

  /* Pricing card - Clean minimal */
  .pricing-card {
      position: relative;
      background: #ffffff;
      border: 1px solid #e0e0e0;
      transition: all 0.4s ease;
  }

  .pricing-card:hover {
      border-color: #1a1a1a;
      transform: scale(1.02);
  }

  .pricing-card.featured {
      background: #f8f8f8;
      border-color: #1a1a1a;
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

  /* Process line - Clean minimal */
  .process-line {
      position: absolute;
      left: 28px;
      top: 70px;
      bottom: 20px;
      width: 2px;
      background: linear-gradient(180deg, #1a1a1a 0%, #e0e0e0 100%);
  }

  /* Vibe rescue special styling - Clean minimal */
  .vibe-card {
      background: #f8f8f8;
      border: 1px solid #e0e0e0;
  }

  .vibe-card:hover {
      border-color: #1a1a1a;
  }

  /* Scroll indicator */
  @keyframes bounce-slow {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(10px); }
  }

  .animate-bounce-slow {
      animation: bounce-slow 2s ease-in-out infinite;
  }

  /* FAQ accordion - Clean minimal */
  .faq-item {
      border-bottom: 1px solid #e0e0e0;
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
  const [activeExample, setActiveExample] = useState<string | null>(null);

  const handleExampleClick = (image: ImageItem, index: number) => {
    // Map image index/id to component
    if (index === 0 || image.id === 'architect') {
      setActiveExample('architect');
      document.body.style.overflow = 'hidden';
    } else if (image.id === 'ashford') {
      setActiveExample('ashford');
      document.body.style.overflow = 'hidden';
    } else if (image.id === 'barbers') {
      setActiveExample('barbers');
      document.body.style.overflow = 'hidden';
    } else if (image.id === 'flowdesk') {
      setActiveExample('flowdesk');
      document.body.style.overflow = 'hidden';
    } else if (image.id === 'murphy') {
      setActiveExample('murphy');
      document.body.style.overflow = 'hidden';
    } else if (image.id === 'loud') {
      setActiveExample('loud');
      document.body.style.overflow = 'hidden';
    } else if (image.id === 'bloom') {
      setActiveExample('bloom');
      document.body.style.overflow = 'hidden';
    } else if (image.id === 'roasters') {
      setActiveExample('roasters');
      document.body.style.overflow = 'hidden';
    } else if (image.id === 'surge') {
      setActiveExample('surge');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeExample = () => {
    setActiveExample(null);
    document.body.style.overflow = '';
  };

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

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeExample) {
        closeExample();
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeExample]);

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
    <div className="bg-white text-[#1a1a1a] font-sans min-h-screen relative selection:bg-black/10 selection:text-[#1a1a1a]">
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
      <nav className="fixed w-full z-50 px-4 py-4 transition-all duration-300">
        <div className="max-w-6xl mx-auto">
          <div className="glass-strong rounded-2xl px-6 py-3 flex items-center justify-between">
            {/* Logo */}
            <a href="#" className="flex items-center group">
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight leading-none text-[#1a1a1a]">Akella</span>
                <span className="text-xs text-[#666666] font-medium tracking-wider">inMotion</span>
              </div>
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              <a href="#services" className="px-4 py-2 text-sm text-[#666666] hover:text-[#1a1a1a] transition-colors rounded-lg hover:bg-black/5">Services</a>
              <a href="#pricing" className="px-4 py-2 text-sm text-[#666666] hover:text-[#1a1a1a] transition-colors rounded-lg hover:bg-black/5">Pricing</a>
              <a href="#vibe-rescue" className="px-4 py-2 text-sm text-[#1a1a1a] hover:text-[#333333] transition-colors rounded-lg hover:bg-black/5 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Vibe Rescue
              </a>
              <a href="#process" className="px-4 py-2 text-sm text-[#666666] hover:text-[#1a1a1a] transition-colors rounded-lg hover:bg-black/5">Process</a>
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

      {/* Hero Section - Ultra Minimal */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-24 pb-20">
        <div className="hero-gradient"></div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          {/* Minimal Badge */}
          <div data-aos="fade-down" data-aos-duration="600" className="mb-12">
            <span className="text-xs tracking-[0.3em] uppercase text-[#888888]">Dublin Web Studio</span>
          </div>

          {/* Headline - Bold & Simple */}
          <h1 data-aos="fade-up" data-aos-duration="1000" data-aos-delay="100" className="text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] font-bold tracking-tight mb-8 leading-[0.9]">
            <span className="text-[#1a1a1a]">Websites</span><br />
            <span className="text-[#1a1a1a]">that convert.</span>
          </h1>

          {/* Subheadline - Minimal */}
          <p data-aos="fade-up" data-aos-duration="800" data-aos-delay="300" className="text-lg text-[#666666] mb-12 max-w-lg mx-auto leading-relaxed">
            10+ years experience. 20% below agency rates. Fixed prices, no surprises.
          </p>

          {/* Single CTA - Ultra Minimal */}
          <div data-aos="fade-up" data-aos-duration="800" data-aos-delay="500" className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="#contact" className="group inline-flex items-center gap-3 px-8 py-4 bg-[#1a1a1a] hover:bg-[#333333] rounded-full text-white font-medium transition-all duration-300 hover:gap-5">
              Start a project
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          {/* Minimal Stats */}
          <div data-aos="fade-up" data-aos-duration="800" data-aos-delay="700" className="mt-24 flex justify-center gap-16 sm:gap-24">
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-light text-[#1a1a1a]">50+</div>
              <div className="text-xs text-[#888888] mt-2 tracking-wide">Projects</div>
            </div>
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-light text-[#1a1a1a]">10y</div>
              <div className="text-xs text-[#888888] mt-2 tracking-wide">Experience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-light text-[#1a1a1a]">24h</div>
              <div className="text-xs text-[#888888] mt-2 tracking-wide">Response</div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator - Minimal */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-[#e0e0e0] to-transparent animate-pulse"></div>
        </div>
      </section>

      {/* Tech Stack Marquee */}
      <section className="py-8 border-y border-black/5 overflow-hidden">
        <div className="flex animate-marquee">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-12 px-6 whitespace-nowrap">
              <span className="text-2xl font-bold text-black/10 hover:text-black/30 transition-colors cursor-default">React</span>
              <span className="text-black/5">◆</span>
              <span className="text-2xl font-bold text-black/10 hover:text-black/30 transition-colors cursor-default">Next.js</span>
              <span className="text-black/5">◆</span>
              <span className="text-2xl font-bold text-black/10 hover:text-black/30 transition-colors cursor-default">TypeScript</span>
              <span className="text-black/5">◆</span>
              <span className="text-2xl font-bold text-black/10 hover:text-black/30 transition-colors cursor-default">Django</span>
              <span className="text-black/5">◆</span>
              <span className="text-2xl font-bold text-black/10 hover:text-black/30 transition-colors cursor-default">React Native</span>
              <span className="text-black/5">◆</span>
              <span className="text-2xl font-bold text-black/10 hover:text-black/30 transition-colors cursor-default">PostgreSQL</span>
              <span className="text-black/5">◆</span>
              <span className="text-2xl font-bold text-black/10 hover:text-black/30 transition-colors cursor-default">Node.js</span>
              <span className="text-black/5">◆</span>
              <span className="text-2xl font-bold text-black/10 hover:text-black/30 transition-colors cursor-default">Tailwind</span>
              <span className="text-black/5">◆</span>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <div id="services">
        <ServicesCarousel />
      </div>

      {/* Vibe Code Rescue Section - Bento Grid */}
      <section id="vibe-rescue" className="py-32 px-4 bg-[#fafafa]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p data-aos="fade-up" className="text-xs tracking-[0.3em] uppercase text-[#888888] mb-4">Vibe Rescue</p>
            <h2 data-aos="fade-up" data-aos-delay="100" className="text-5xl sm:text-6xl font-bold tracking-tight text-[#1a1a1a]">AI got you stuck?</h2>
            <p data-aos="fade-up" data-aos-delay="200" className="text-[#666666] text-lg mt-4">We finish what you started.</p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Large Terminal Card */}
            <div data-aos="fade-up" className="md:col-span-2 md:row-span-2 bg-[#2a2a2a] rounded-3xl p-8 relative overflow-hidden">
              <div className="font-mono text-sm space-y-3">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#4a4a4a]"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#4a4a4a]"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#4a4a4a]"></div>
                </div>
                <div className="text-[#666666]">$ npm run build</div>
                <div className="text-[#888888]">✓ Compiled successfully</div>
                <div className="text-[#888888]">✓ No errors found</div>
                <div className="text-white mt-6">That&apos;s how we do it.</div>
              </div>
              <div className="absolute bottom-8 right-8">
                <span className="text-[#4a4a4a] text-7xl font-extralight">→</span>
              </div>
            </div>

            {/* Price Card */}
            <div data-aos="fade-up" data-aos-delay="100" className="bg-white rounded-3xl p-8 border border-[#e0e0e0] flex flex-col justify-between">
              <div>
                <p className="text-xs tracking-[0.2em] uppercase text-[#888888] mb-2">Starting at</p>
                <p className="text-4xl font-bold text-[#1a1a1a]">€200</p>
              </div>
              <p className="text-[#666666] text-sm mt-4">Fixed price. No surprises.</p>
            </div>

            {/* Time Card */}
            <div data-aos="fade-up" data-aos-delay="150" className="bg-white rounded-3xl p-8 border border-[#e0e0e0] flex flex-col justify-between">
              <div>
                <p className="text-xs tracking-[0.2em] uppercase text-[#888888] mb-2">Delivery</p>
                <p className="text-4xl font-bold text-[#1a1a1a]">3-7</p>
              </div>
              <p className="text-[#666666] text-sm mt-4">Days to production.</p>
            </div>

            {/* What we fix - spans 2 cols */}
            <div data-aos="fade-up" data-aos-delay="200" className="md:col-span-2 bg-white rounded-3xl p-8 border border-[#e0e0e0]">
              <p className="text-xs tracking-[0.2em] uppercase text-[#888888] mb-6">What we fix</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#1a1a1a]"></div>
                  <span className="text-[#1a1a1a]">Bug fixes</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#1a1a1a]"></div>
                  <span className="text-[#1a1a1a]">Deployment</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#1a1a1a]"></div>
                  <span className="text-[#1a1a1a]">Code cleanup</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#1a1a1a]"></div>
                  <span className="text-[#1a1a1a]">Responsiveness</span>
                </div>
              </div>
            </div>

            {/* CTA Card */}
            <div data-aos="fade-up" data-aos-delay="250" className="bg-[#1a1a1a] hover:bg-[#2a2a2a] rounded-3xl p-8 transition-all duration-500 group cursor-pointer" onClick={() => window.location.href='#contact'}>
              <p className="text-white font-medium mb-4">Send your project</p>
              <ArrowRight className="w-6 h-6 text-white group-hover:translate-x-2 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* Process Section - Immaculate */}
      <section id="process" className="py-32 px-4 relative">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <p data-aos="fade-up" className="text-xs tracking-[0.3em] uppercase text-[#888888] mb-4">Process</p>
            <h2 data-aos="fade-up" data-aos-delay="100" className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
              Immaculate.
            </h2>
          </div>

          {/* Asymmetric Bento Grid Process */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Step 1 - Large, spans 2 cols */}
            <div data-aos="fade-up" className="md:col-span-2 group bg-[#fafafa] hover:bg-[#f0f0f0] rounded-3xl p-10 md:p-12 transition-all duration-500 border border-transparent hover:border-[#e0e0e0]">
              <span className="text-8xl font-extralight text-[#e0e0e0] group-hover:text-[#1a1a1a] transition-colors duration-500">01</span>
              <h3 className="text-3xl font-semibold mt-6 mb-3 text-[#1a1a1a]">Discovery</h3>
              <p className="text-[#666666] text-lg leading-relaxed max-w-md">We listen. You talk. Fixed quote within 24 hours.</p>
            </div>

            {/* Step 2 - Small */}
            <div data-aos="fade-up" data-aos-delay="100" className="group bg-[#fafafa] hover:bg-[#f0f0f0] rounded-3xl p-8 transition-all duration-500 border border-transparent hover:border-[#e0e0e0]">
              <span className="text-5xl font-extralight text-[#e0e0e0] group-hover:text-[#1a1a1a] transition-colors duration-500">02</span>
              <h3 className="text-xl font-semibold mt-4 mb-2 text-[#1a1a1a]">Design</h3>
              <p className="text-[#666666] text-sm">Pixel-perfect mockups. Your approval.</p>
            </div>

            {/* Step 3 - Small */}
            <div data-aos="fade-up" data-aos-delay="150" className="group bg-[#fafafa] hover:bg-[#f0f0f0] rounded-3xl p-8 transition-all duration-500 border border-transparent hover:border-[#e0e0e0]">
              <span className="text-5xl font-extralight text-[#e0e0e0] group-hover:text-[#1a1a1a] transition-colors duration-500">03</span>
              <h3 className="text-xl font-semibold mt-4 mb-2 text-[#1a1a1a]">Build</h3>
              <p className="text-[#666666] text-sm">Weekly updates. Full transparency.</p>
            </div>

            {/* Step 4 - Dark, spans 2 cols */}
            <div data-aos="fade-up" data-aos-delay="200" className="md:col-span-2 group bg-[#2a2a2a] hover:bg-[#333333] rounded-3xl p-10 md:p-12 transition-all duration-500 relative overflow-hidden">
              <span className="text-8xl font-extralight text-[#3a3a3a] group-hover:text-[#4a4a4a] transition-colors duration-500">04</span>
              <h3 className="text-3xl font-semibold mt-6 mb-3 text-white">Launch</h3>
              <p className="text-[#888888] text-lg leading-relaxed max-w-md">Deploy. Train. Support. Always available.</p>
              <div className="absolute bottom-8 right-8">
                <Check className="w-12 h-12 text-[#3a3a3a] group-hover:text-[#4a4a4a] transition-colors" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Us Section - Bento Grid */}
      <section className="py-32 px-4 bg-[#fafafa]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p data-aos="fade-up" className="text-xs tracking-[0.3em] uppercase text-[#888888] mb-4">Why Us</p>
            <h2 data-aos="fade-up" data-aos-delay="100" className="text-5xl sm:text-6xl font-bold tracking-tight">Different.</h2>
          </div>

          {/* Asymmetric Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Dublin - Large */}
            <div data-aos="fade-up" className="md:col-span-2 md:row-span-2 group bg-white hover:bg-[#f5f5f5] rounded-3xl p-10 transition-all duration-500 border border-[#e0e0e0] relative overflow-hidden">
              <MapPin className="w-8 h-8 text-[#1a1a1a] mb-8" />
              <h3 className="text-4xl font-bold mb-4 text-[#1a1a1a]">Dublin.</h3>
              <h3 className="text-4xl font-bold mb-6 text-[#888888]">Actually.</h3>
              <p className="text-[#666666] text-lg max-w-sm">Same timezone. Real accountability. Here when you need us.</p>
            </div>

            {/* 20% Below - Dark */}
            <div data-aos="fade-up" data-aos-delay="100" className="md:col-span-2 group bg-[#2a2a2a] hover:bg-[#333333] rounded-3xl p-8 transition-all duration-500">
              <BadgePercent className="w-6 h-6 text-[#666666] mb-4" />
              <h3 className="text-3xl font-bold text-white">20% Below</h3>
              <p className="text-[#666666] text-sm mt-2">Agency rates. Senior expertise.</p>
            </div>

            {/* Fixed Price */}
            <div data-aos="fade-up" data-aos-delay="150" className="group bg-white hover:bg-[#f5f5f5] rounded-3xl p-8 transition-all duration-500 border border-[#e0e0e0]">
              <Lock className="w-5 h-5 text-[#1a1a1a] mb-3" />
              <h3 className="text-lg font-semibold text-[#1a1a1a]">Fixed Prices</h3>
              <p className="text-[#888888] text-xs mt-1">Always.</p>
            </div>

            {/* 24hr */}
            <div data-aos="fade-up" data-aos-delay="200" className="group bg-white hover:bg-[#f5f5f5] rounded-3xl p-8 transition-all duration-500 border border-[#e0e0e0]">
              <Clock className="w-5 h-5 text-[#1a1a1a] mb-3" />
              <h3 className="text-lg font-semibold text-[#1a1a1a]">&lt;24h</h3>
              <p className="text-[#888888] text-xs mt-1">Response time.</p>
            </div>

            {/* AI Rescue */}
            <div data-aos="fade-up" data-aos-delay="250" className="group bg-white hover:bg-[#f5f5f5] rounded-3xl p-8 transition-all duration-500 border border-[#e0e0e0]">
              <Sparkles className="w-5 h-5 text-[#1a1a1a] mb-3" />
              <h3 className="text-lg font-semibold text-[#1a1a1a]">AI Rescue</h3>
              <p className="text-[#888888] text-xs mt-1">We finish it.</p>
            </div>

            {/* Modern Stack - Wide */}
            <div data-aos="fade-up" data-aos-delay="300" className="md:col-span-3 group bg-white hover:bg-[#f5f5f5] rounded-3xl p-8 transition-all duration-500 border border-[#e0e0e0]">
              <div className="flex items-center justify-between">
                <div>
                  <Code2 className="w-5 h-5 text-[#1a1a1a] mb-3" />
                  <h3 className="text-lg font-semibold text-[#1a1a1a]">Modern Stack</h3>
                </div>
                <div className="flex gap-2 font-mono text-xs text-[#666666]">
                  <span className="px-3 py-1.5 bg-[#fafafa] rounded-full border border-[#e0e0e0]">React</span>
                  <span className="px-3 py-1.5 bg-[#fafafa] rounded-full border border-[#e0e0e0]">Next.js</span>
                  <span className="px-3 py-1.5 bg-[#fafafa] rounded-full border border-[#e0e0e0]">TypeScript</span>
                  <span className="px-3 py-1.5 bg-[#fafafa] rounded-full border border-[#e0e0e0]">Django</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof / Testimonials - Ultra Minimal */}
      <section className="py-32 overflow-hidden relative">
        <div className="max-w-6xl mx-auto px-4 mb-16 text-center">
          <p data-aos="fade-up" className="text-xs tracking-[0.3em] uppercase text-[#888888] mb-4">Testimonials</p>
          <h2 data-aos="fade-up" data-aos-delay="100" className="text-4xl sm:text-5xl font-bold tracking-tight text-[#1a1a1a]">Trusted.</h2>
        </div>

        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>

        {/* Carousel Container */}
        <div className="flex animate-marquee-slow gap-6 w-max hover:[animation-play-state:paused]">
          {[...Array(2)].map((_, i) => (
            <React.Fragment key={i}>
              <div className="w-[400px] bg-[#fafafa] p-8 rounded-3xl group hover:bg-[#f5f5f5] transition-all duration-500">
                <p className="text-[#1a1a1a] text-lg leading-relaxed mb-6">&quot;Saved our launch. Delivered in 5 days—better than we imagined.&quot;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center text-white text-sm font-medium">JD</div>
                  <div>
                    <div className="font-medium text-[#1a1a1a] text-sm">John D.</div>
                    <div className="text-xs text-[#888888]">Startup CEO</div>
                  </div>
                </div>
              </div>

              <div className="w-[400px] bg-[#fafafa] p-8 rounded-3xl group hover:bg-[#f5f5f5] transition-all duration-500">
                <p className="text-[#1a1a1a] text-lg leading-relaxed mb-6">&quot;Conversion rate jumped 40% in the first month. Incredible ROI.&quot;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center text-white text-sm font-medium">SM</div>
                  <div>
                    <div className="font-medium text-[#1a1a1a] text-sm">Sarah M.</div>
                    <div className="text-xs text-[#888888]">E-Commerce Founder</div>
                  </div>
                </div>
              </div>

              <div className="w-[400px] bg-[#fafafa] p-8 rounded-3xl group hover:bg-[#f5f5f5] transition-all duration-500">
                <p className="text-[#1a1a1a] text-lg leading-relaxed mb-6">&quot;Took my AI mess and made it production-ready in 48 hours.&quot;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center text-white text-sm font-medium">MP</div>
                  <div>
                    <div className="font-medium text-[#1a1a1a] text-sm">Michael P.</div>
                    <div className="text-xs text-[#888888]">Vibe Rescue Client</div>
                  </div>
                </div>
              </div>

              <div className="w-[400px] bg-[#fafafa] p-8 rounded-3xl group hover:bg-[#f5f5f5] transition-all duration-500">
                <p className="text-[#1a1a1a] text-lg leading-relaxed mb-6">&quot;Finally, a dev team that speaks plain English and answers emails.&quot;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center text-white text-sm font-medium">LK</div>
                  <div>
                    <div className="font-medium text-[#1a1a1a] text-sm">Lisa K.</div>
                    <div className="text-xs text-[#888888]">Marketing Director</div>
                  </div>
                </div>
              </div>

              <div className="w-[400px] bg-[#fafafa] p-8 rounded-3xl group hover:bg-[#f5f5f5] transition-all duration-500">
                <p className="text-[#1a1a1a] text-lg leading-relaxed mb-6">&quot;Code quality is top-tier. The design system makes scaling easy.&quot;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center text-white text-sm font-medium">RB</div>
                  <div>
                    <div className="font-medium text-[#1a1a1a] text-sm">Robert B.</div>
                    <div className="text-xs text-[#888888]">SaaS Founder</div>
                  </div>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* Scroll Reveal Gallery Section - Website Examples */}
      <ScrollReveal
        centerContent={<ShowDontTellAnimation />}
        animationMode="pinned-sequence"
        images={[
          { src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop', label: 'Kavanagh & Cole Architects', id: 'architect' },
          { src: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=800&auto=format&fit=crop', label: 'Camden Gentlemen Barbers', id: 'barbers' },
          { src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop', label: 'FlowDesk', id: 'flowdesk' },
          { src: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=800&auto=format&fit=crop', label: 'Kieran Murphy & Associates', id: 'murphy' },
          { src: '/assets/loud.png', label: 'LOUD Studio', id: 'loud' },
          { src: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=800&auto=format&fit=crop', label: 'Bloom Wellness', id: 'bloom' },
          { src: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=800&auto=format&fit=crop', label: 'Howth Road Roasters', id: 'roasters' },
          { src: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop', label: 'Surge Fitness', id: 'surge' },
          { src: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=800&auto=format&fit=crop', label: 'Ashford House Estate', id: 'ashford' },
        ]}
        showLabels={true}
        onImageClick={handleExampleClick}
        endContent={<DigitalExperienceHero />}
      />

      {/* Website Example Popup Modal */}
      {activeExample && (
        <div
          className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-sm"
          style={{ animation: 'fadeIn 0.3s ease-out' }}
        >
          {/* Exit Button - Fixed at top */}
          <div className="fixed top-0 left-0 right-0 z-[10001] bg-gradient-to-b from-black/80 to-transparent py-4 px-4">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
              <span className="text-white/60 text-sm">Preview Mode</span>
              <button
                onClick={closeExample}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/30 transition-all duration-300 group"
                aria-label="Exit preview"
              >
                <X className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                <span className="text-white text-sm font-medium">Exit Preview</span>
              </button>
            </div>
          </div>

          {/* Modal Content */}
          <div
            className="w-full h-full overflow-auto pt-16"
            style={{ animation: 'slideUp 0.4s ease-out' }}
          >
            {activeExample === 'architect' && <Architect />}
            {activeExample === 'ashford' && <AshfordHouse previewMode={true} />}
            {activeExample === 'barbers' && <CamdenBarbers previewMode={true} />}
            {activeExample === 'flowdesk' && <FlowdeskProffesional previewMode={true} />}
            {activeExample === 'murphy' && <KMurphy previewMode={true} />}
            {activeExample === 'loud' && <LOUDStudio previewMode={true} />}
            {activeExample === 'bloom' && <BloomWellness previewMode={true} />}
            {activeExample === 'roasters' && <HowthRoadRoasters previewMode={true} />}
            {activeExample === 'surge' && <SurgeFitness previewMode={true} />}
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />

      {/* FAQ Section - Ultra Minimal */}
      <section className="py-32 px-4 bg-[#fafafa]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <p data-aos="fade-up" className="text-xs tracking-[0.3em] uppercase text-[#888888] mb-4">FAQ</p>
            <h2 data-aos="fade-up" data-aos-delay="100" className="text-4xl sm:text-5xl font-bold tracking-tight text-[#1a1a1a]">Questions.</h2>
          </div>

          <div data-aos="fade-up" data-aos-delay="200" className="space-y-0">
            {[
              { q: "What if my project scope changes?", a: "We discuss it openly. Any scope changes get documented and quoted before we proceed. No surprises." },
              { q: "Do you offer ongoing support?", a: "Training included. Maintenance packages from €150/month if you need us on standby." },
              { q: "AI code rescue—will you judge me?", a: "Never. AI tools are impressive—you got further than most. We're here to finish it, not critique." },
              { q: "How fast can you deliver?", a: "Landing pages: 1-2 weeks. Business sites: 2-4 weeks. AI rescue: often days." },
              { q: "What's your tech stack?", a: "React, Next.js, TypeScript, Django. Modern tools that scale." }
            ].map((faq, index) => (
              <div key={index} className="border-b border-[#e0e0e0] last:border-none" onClick={() => toggleFaq(index)}>
                <div className="py-6 cursor-pointer group flex items-center justify-between">
                  <h3 className="font-medium text-[#1a1a1a] text-lg">{faq.q}</h3>
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center transition-colors group-hover:bg-[#1a1a1a]">
                    {openFaq === index ?
                      <Minus className="w-4 h-4 text-[#1a1a1a] group-hover:text-white transition-colors" /> :
                      <Plus className="w-4 h-4 text-[#1a1a1a] group-hover:text-white transition-colors" />
                    }
                  </div>
                </div>
                <div className={`pb-6 text-[#666666] leading-relaxed ${openFaq === index ? 'block' : 'hidden'}`}>
                  {faq.a}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section - Ultra Minimal */}
      <section id="contact" className="py-32 px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Available indicator */}
          <div data-aos="fade-up" className="inline-flex items-center gap-3 mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-xs tracking-[0.2em] uppercase text-[#888888]">Available for projects</span>
          </div>

          <h2 data-aos="fade-up" data-aos-delay="100" className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 tracking-tight text-[#1a1a1a]">
            Let&apos;s build.
          </h2>

          <p data-aos="fade-up" data-aos-delay="200" className="text-lg text-[#666666] mb-12 max-w-md mx-auto">
            Free quote. No pressure. Just a conversation.
          </p>

          <div data-aos="fade-up" data-aos-delay="300">
            <a href="mailto:hello@akellainmotion.ie" className="group inline-flex items-center gap-4 px-10 py-5 bg-[#1a1a1a] hover:bg-[#333333] rounded-full text-white font-medium text-lg transition-all duration-300 hover:gap-6">
              Get in touch
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          <p data-aos="fade-up" data-aos-delay="400" className="mt-8 text-sm text-[#888888]">
            Response within 4 hours
          </p>
        </div>
      </section>

      {/* Footer - Ultra Minimal */}
      <footer className="py-16 px-4 border-t border-[#e0e0e0]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            {/* Logo */}
            <div className="flex items-center">
              <span className="text-lg font-semibold text-[#1a1a1a]">Akella <span className="font-normal text-[#888888]">inMotion</span></span>
            </div>

            {/* Links */}
            <div className="flex items-center gap-8 text-sm text-[#666666]">
              <a href="#services" className="hover:text-[#1a1a1a] transition-colors">Services</a>
              <a href="#process" className="hover:text-[#1a1a1a] transition-colors">Process</a>
              <a href="#vibe-rescue" className="hover:text-[#1a1a1a] transition-colors">Vibe Rescue</a>
              <a href="#contact" className="hover:text-[#1a1a1a] transition-colors">Contact</a>
            </div>

            {/* Copyright */}
            <div className="text-sm text-[#888888]">
              © 2025 · Dublin
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
