'use client';

import React, { useEffect, useState, useRef } from 'react';
import { 
  LayoutGrid, 
  ArrowRight, 
  Menu, 
  X, 
  PlayCircle, 
  Check, 
  Zap, 
  Brain, 
  Bot, 
  Users, 
  GanttChart, 
  Plug, 
  Slack, 
  Github, 
  Figma, 
  ShieldCheck, 
  Lock, 
  Twitter, 
  Linkedin, 
  Calendar
} from 'lucide-react';

// Inject keyframe animations and styles
const injectStyles = () => {
  if (typeof document === 'undefined') return;
  if (document.getElementById('flowdesk-styles')) return;

  const style = document.createElement('style');
  style.id = 'flowdesk-styles';
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Instrument+Serif:ital@0;1&display=swap');

    .flowdesk-wrapper * {
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      box-sizing: border-box;
    }

    .flowdesk-wrapper { 
        font-family: 'DM Sans', system-ui, sans-serif;
        background: #FAFAF9;
        color: #0A1628;
        line-height: 1.7;
        font-weight: 400;
    }

    .flowdesk-wrapper ::selection {
        background: #2563EB;
        color: #FFFFFF;
    }

    .flowdesk-wrapper h1, 
    .flowdesk-wrapper h2, 
    .flowdesk-wrapper h3, 
    .flowdesk-wrapper h4 {
        font-family: 'Instrument Serif', Georgia, serif;
        font-weight: 400;
        line-height: 1.15;
        color: #0A1628;
    }

    /* Elegant Line Divider */
    .flowdesk-wrapper .line-divider {
        display: flex;
        align-items: center;
        gap: 16px;
    }

    .flowdesk-wrapper .line-divider::before,
    .flowdesk-wrapper .line-divider::after {
        content: '';
        flex: 1;
        height: 1px;
        background: linear-gradient(90deg, transparent, #E5E7EB, transparent);
    }

    /* Navigation Link */
    .flowdesk-wrapper .nav-link {
        position: relative;
        font-size: 14px;
        font-weight: 500;
        color: #64748B;
        transition: color 0.3s ease;
        cursor: pointer;
    }

    .flowdesk-wrapper .nav-link::after {
        content: '';
        position: absolute;
        bottom: -4px;
        left: 0;
        width: 0;
        height: 2px;
        background: #2563EB;
        transition: width 0.3s ease;
    }

    .flowdesk-wrapper .nav-link:hover {
        color: #0A1628;
    }

    .flowdesk-wrapper .nav-link:hover::after {
        width: 100%;
    }

    /* Buttons */
    .flowdesk-wrapper .btn-primary {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        padding: 14px 28px;
        background: #0A1628;
        color: #FFFFFF;
        font-family: 'DM Sans', sans-serif;
        font-size: 14px;
        font-weight: 600;
        border-radius: 8px;
        border: none;
        transition: all 0.3s ease;
        cursor: pointer;
    }

    .flowdesk-wrapper .btn-primary:hover {
        background: #2563EB;
        transform: translateY(-2px);
        box-shadow: 0 10px 30px rgba(37, 99, 235, 0.25);
    }

    .flowdesk-wrapper .btn-secondary {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        padding: 13px 27px;
        background: transparent;
        color: #0A1628;
        font-family: 'DM Sans', sans-serif;
        font-size: 14px;
        font-weight: 600;
        border-radius: 8px;
        border: 1px solid #E5E7EB;
        transition: all 0.3s ease;
        cursor: pointer;
    }

    .flowdesk-wrapper .btn-secondary:hover {
        background: #0A1628;
        color: #FFFFFF;
        border-color: #0A1628;
    }

    .flowdesk-wrapper .btn-accent {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        padding: 14px 28px;
        background: #2563EB;
        color: #FFFFFF;
        font-family: 'DM Sans', sans-serif;
        font-size: 14px;
        font-weight: 600;
        border-radius: 8px;
        border: none;
        transition: all 0.3s ease;
        cursor: pointer;
    }

    .flowdesk-wrapper .btn-accent:hover {
        background: #1D4ED8;
        transform: translateY(-2px);
        box-shadow: 0 10px 30px rgba(37, 99, 235, 0.3);
    }

    /* Feature Card */
    .flowdesk-wrapper .feature-card {
        background: #FFFFFF;
        border: 1px solid #F1F5F9;
        border-radius: 16px;
        padding: 32px;
        transition: all 0.4s ease;
    }

    .flowdesk-wrapper .feature-card:hover {
        border-color: #E5E7EB;
        box-shadow: 0 20px 40px rgba(10, 22, 40, 0.08);
        transform: translateY(-4px);
    }

    /* Dashboard Preview */
    .flowdesk-wrapper .dashboard-frame {
        background: #FFFFFF;
        border: 1px solid #E5E7EB;
        border-radius: 16px;
        overflow: hidden;
        box-shadow: 
            0 4px 6px rgba(10, 22, 40, 0.02),
            0 20px 40px rgba(10, 22, 40, 0.06);
    }

    .flowdesk-wrapper .dashboard-header {
        background: #FAFAF9;
        border-bottom: 1px solid #F1F5F9;
        padding: 12px 16px;
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .flowdesk-wrapper .window-dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
    }

    /* Pricing Card */
    .flowdesk-wrapper .pricing-card {
        background: #FFFFFF;
        border: 1px solid #F1F5F9;
        border-radius: 20px;
        padding: 40px;
        transition: all 0.4s ease;
    }

    .flowdesk-wrapper .pricing-card:hover {
        box-shadow: 0 20px 50px rgba(10, 22, 40, 0.1);
    }

    .flowdesk-wrapper .pricing-card.featured {
        background: #0A1628;
        border-color: #0A1628;
    }

    .flowdesk-wrapper .pricing-card.featured h3,
    .flowdesk-wrapper .pricing-card.featured p,
    .flowdesk-wrapper .pricing-card.featured span,
    .flowdesk-wrapper .pricing-card.featured li {
        color: #FFFFFF;
    }

    .flowdesk-wrapper .pricing-card.featured .text-muted {
        color: #94A3B8;
    }

    /* Testimonial */
    .flowdesk-wrapper .testimonial-card {
        background: #FFFFFF;
        border: 1px solid #F1F5F9;
        border-radius: 16px;
        padding: 32px;
        position: relative;
    }

    .flowdesk-wrapper .testimonial-card::before {
        content: '"';
        position: absolute;
        top: 20px;
        left: 28px;
        font-family: 'Instrument Serif', Georgia, serif;
        font-size: 80px;
        color: #2563EB;
        opacity: 0.15;
        line-height: 1;
    }

    /* Badge */
    .flowdesk-wrapper .badge {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 8px 16px;
        background: #F1F5F9;
        border-radius: 100px;
        font-size: 13px;
        font-weight: 500;
        color: #64748B;
    }

    .flowdesk-wrapper .badge-accent {
        background: #EFF6FF;
        color: #2563EB;
    }

    /* Logo ticker */
    .flowdesk-wrapper .logo-ticker {
        display: flex;
        gap: 48px;
        animation: ticker 30s linear infinite;
    }

    @keyframes ticker {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
    }

    /* Stats */
    .flowdesk-wrapper .stat-number {
        font-family: 'Instrument Serif', Georgia, serif;
        font-size: 48px;
        line-height: 1;
        color: #0A1628;
    }

    /* Grid pattern background */
    .flowdesk-wrapper .grid-bg {
        background-image: 
            linear-gradient(rgba(10, 22, 40, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(10, 22, 40, 0.02) 1px, transparent 1px);
        background-size: 40px 40px;
    }

    /* Mobile menu */
    .flowdesk-wrapper .mobile-menu {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: #FFFFFF;
        z-index: 100;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    }

    .flowdesk-wrapper .mobile-menu.active {
        transform: translateX(0);
    }

    /* Subtle gradient accent */
    .flowdesk-wrapper .accent-gradient {
        background: linear-gradient(135deg, #2563EB 0%, #3B82F6 100%);
    }

    /* Icon container */
    .flowdesk-wrapper .icon-box {
        width: 48px;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #EFF6FF;
        border-radius: 12px;
    }

    .flowdesk-wrapper .icon-box-dark {
        background: #1E3A5F;
    }

    /* AOS Animations */
    .flowdesk-fade-up {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s ease-out, transform 0.8s ease-out;
    }
    
    .flowdesk-fade-left {
        opacity: 0;
        transform: translateX(30px);
        transition: opacity 0.8s ease-out, transform 0.8s ease-out;
    }

    .flowdesk-animate {
        opacity: 1;
        transform: translate(0);
    }
  `;
  document.head.appendChild(style);
};

export default function FlowdeskProffesional({ previewMode = false }: { previewMode?: boolean }) {
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
            entry.target.classList.add('flowdesk-animate');
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
    <div className="flowdesk-wrapper relative">
        {/* Navigation */}
        <nav 
            className={`fixed top-0 left-0 right-0 z-50 bg-[#FAFAF9]/95 backdrop-blur-sm border-b border-gray-100 transition-all duration-300 ${
                scrolled ? 'shadow-sm' : ''
            }`}
            style={{ top: previewMode ? '64px' : '0' }}
        >
            <div className="max-w-6xl mx-auto px-6">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <a href="#" className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-[#0A1628] rounded-lg flex items-center justify-center">
                            <LayoutGrid className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-semibold text-[#0A1628]">FlowDesk</span>
                    </a>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        {['Features', 'Pricing', 'Testimonials'].map((item) => (
                            <a 
                                key={item} 
                                onClick={() => scrollToSection(item.toLowerCase())} 
                                className="nav-link"
                            >
                                {item === 'Testimonials' ? 'Reviews' : item}
                            </a>
                        ))}
                        <a href="#" className="nav-link">Blog</a>
                    </div>

                    {/* CTA */}
                    <div className="hidden md:flex items-center gap-4">
                        <a href="#" className="text-sm font-medium text-[#64748B] hover:text-[#0A1628] transition-colors">Sign In</a>
                        <a href="#" className="btn-primary">
                            Start Free
                            <ArrowRight className="w-4 h-4" />
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button onClick={toggleMobileMenu} className="md:hidden w-10 h-10 flex items-center justify-center text-[#0A1628]">
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </nav>

        {/* Mobile Menu */}
        <div 
            className={`mobile-menu ${mobileMenuOpen ? 'active' : ''}`}
            style={{ top: previewMode ? '64px' : '0' }}
        >
            <div className="p-6">
                <div className="flex items-center justify-between mb-12">
                    <a href="#" className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-[#0A1628] rounded-lg flex items-center justify-center">
                            <LayoutGrid className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-semibold text-[#0A1628]">FlowDesk</span>
                    </a>
                    <button onClick={toggleMobileMenu} className="w-10 h-10 flex items-center justify-center text-[#0A1628]">
                        <X className="w-6 h-6" />
                    </button>
                </div>
                <div className="space-y-6">
                    {['Features', 'Pricing', 'Testimonials'].map((item) => (
                        <a 
                            key={item}
                            onClick={() => scrollToSection(item.toLowerCase())}
                            className="block text-2xl font-medium text-[#0A1628] cursor-pointer"
                        >
                            {item === 'Testimonials' ? 'Reviews' : item}
                        </a>
                    ))}
                    <a href="#" className="block text-2xl font-medium text-[#0A1628]">Blog</a>
                </div>
                <div className="mt-12 space-y-4">
                    <a href="#" className="btn-secondary w-full justify-center">Sign In</a>
                    <a href="#" className="btn-primary w-full justify-center">
                        Start Free Trial
                        <ArrowRight className="w-4 h-4" />
                    </a>
                </div>
            </div>
        </div>

        {/* Hero Section */}
        <section className="pt-32 pb-20 md:pt-40 md:pb-32 grid-bg">
            <div className="max-w-6xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left Content */}
                    <div>
                        <div ref={addAosRef} className="flowdesk-fade-up badge badge-accent mb-6">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2563EB] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2563EB]"></span>
                            </span>
                            Now with AI-powered insights
                        </div>

                        <h1 ref={addAosRef} className="flowdesk-fade-up text-4xl sm:text-5xl lg:text-6xl text-[#0A1628] mb-6" style={{ transitionDelay: '50ms' }}>
                            Project chaos,<br />
                            <em className="italic">meet clarity.</em>
                        </h1>

                        <p ref={addAosRef} className="flowdesk-fade-up text-lg text-[#64748B] mb-8 max-w-md" style={{ transitionDelay: '100ms' }}>
                            FlowDesk brings your tasks, team, and timelines together in one beautiful workspace. Stop drowning in tabs — start shipping.
                        </p>

                        <div ref={addAosRef} className="flowdesk-fade-up flex flex-col sm:flex-row gap-4 mb-10" style={{ transitionDelay: '150ms' }}>
                            <a href="#" className="btn-accent">
                                Start Free Trial
                                <ArrowRight className="w-4 h-4" />
                            </a>
                            <a href="#" className="btn-secondary">
                                <PlayCircle className="w-4 h-4" />
                                Watch Demo
                            </a>
                        </div>

                        {/* Trust indicators */}
                        <div ref={addAosRef} className="flowdesk-fade-up flex items-center gap-4" style={{ transitionDelay: '200ms' }}>
                            <div className="flex -space-x-2">
                                {[1, 2, 3, 4].map((i) => (
                                    <img 
                                        key={i}
                                        src={`https://images.unsplash.com/photo-${i === 1 ? '1494790108377-be9c29b29330' : i === 2 ? '1507003211169-0a1dd7228f2d' : i === 3 ? '1438761681033-6461ffad8d80' : '1472099645785-5658abf4ff4e'}?w=100&h=100&fit=crop`} 
                                        alt="User" 
                                        className="w-9 h-9 rounded-full border-2 border-[#FAFAF9] object-cover"
                                    />
                                ))}
                            </div>
                            <p className="text-sm text-[#64748B]">
                                <span className="font-semibold text-[#0A1628]">2,400+</span> teams shipping faster
                            </p>
                        </div>
                    </div>

                    {/* Right - Dashboard Preview */}
                    <div ref={addAosRef} className="flowdesk-fade-left relative" style={{ transitionDelay: '100ms' }}>
                        <div className="dashboard-frame">
                            {/* Header */}
                            <div className="dashboard-header">
                                <div className="window-dot bg-rose-400"></div>
                                <div className="window-dot bg-amber-400"></div>
                                <div className="window-dot bg-emerald-400"></div>
                                <span className="ml-3 text-xs text-[#64748B]">FlowDesk — Marketing Sprint</span>
                            </div>
                            
                            {/* Content */}
                            <div className="p-5 space-y-4">
                                {/* Stats Row */}
                                <div className="grid grid-cols-3 gap-3">
                                    <div className="bg-[#F5F5F4] rounded-xl p-4">
                                        <p className="text-xs text-[#64748B] mb-1">Tasks</p>
                                        <p className="text-2xl font-semibold text-[#0A1628]">24</p>
                                    </div>
                                    <div className="bg-[#F5F5F4] rounded-xl p-4">
                                        <p className="text-xs text-[#64748B] mb-1">In Progress</p>
                                        <p className="text-2xl font-semibold text-[#2563EB]">8</p>
                                    </div>
                                    <div className="bg-[#F5F5F4] rounded-xl p-4">
                                        <p className="text-xs text-[#64748B] mb-1">Done</p>
                                        <p className="text-2xl font-semibold text-[#10B981]">16</p>
                                    </div>
                                </div>

                                {/* Task List */}
                                <div className="space-y-2">
                                    <div className="bg-[#F5F5F4] rounded-xl p-4 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-5 h-5 rounded border-2 border-[#10B981] bg-[#10B981] flex items-center justify-center">
                                                <Check className="w-3 h-3 text-white" />
                                            </div>
                                            <span className="text-sm text-[#0A1628]">Design landing page</span>
                                        </div>
                                        <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 font-medium">Done</span>
                                    </div>
                                    <div className="bg-[#F5F5F4] rounded-xl p-4 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-5 h-5 rounded border-2 border-[#2563EB]"></div>
                                            <span className="text-sm text-[#0A1628]">Build API endpoints</span>
                                        </div>
                                        <span className="text-xs px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 font-medium">In Progress</span>
                                    </div>
                                    <div className="bg-[#F5F5F4] rounded-xl p-4 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-5 h-5 rounded border-2 border-gray-300"></div>
                                            <span className="text-sm text-[#0A1628]">User testing session</span>
                                        </div>
                                        <span className="text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 font-medium">Todo</span>
                                    </div>
                                </div>

                                {/* Progress */}
                                <div className="bg-[#F5F5F4] rounded-xl p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs text-[#64748B]">Sprint Progress</span>
                                        <span className="text-xs font-semibold text-[#0A1628]">67%</span>
                                    </div>
                                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div className="h-full w-[67%] bg-[#2563EB] rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Floating Card */}
                        <div className="absolute -top-4 -right-4 md:-right-8 bg-white rounded-xl p-4 shadow-lg border border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                                    <Zap className="w-5 h-5 text-amber-600" />
                                </div>
                                <div>
                                    <p className="text-xs text-[#64748B]">AI Suggestion</p>
                                    <p className="text-sm font-medium text-[#0A1628]">Move to sprint 2</p>
                                </div>
                            </div>
                        </div>

                        {/* Floating Card 2 */}
                        <div className="absolute -bottom-4 -left-4 md:-left-8 bg-white rounded-xl p-3 shadow-lg border border-gray-100">
                            <div className="flex items-center gap-2">
                                <div className="flex -space-x-1">
                                    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop" alt="User" className="w-6 h-6 rounded-full border border-white object-cover" />
                                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop" alt="User" className="w-6 h-6 rounded-full border border-white object-cover" />
                                </div>
                                <span className="text-xs text-[#64748B]">2 collaborating</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Logos Section */}
        <section className="py-16 border-y border-gray-100 bg-white overflow-hidden">
            <div className="max-w-6xl mx-auto px-6">
                <p ref={addAosRef} className="flowdesk-fade-up text-center text-sm text-[#64748B] mb-10">Trusted by teams at leading companies</p>
                <div className="relative">
                    <div className="logo-ticker">
                        {[1, 2].map((i) => (
                            <div key={i} className="flex items-center gap-12 md:gap-16">
                                <span className="text-2xl font-semibold text-gray-300 whitespace-nowrap">Dropbox</span>
                                <span className="text-2xl font-semibold text-gray-300 whitespace-nowrap">Spotify</span>
                                <span className="text-2xl font-semibold text-gray-300 whitespace-nowrap">Airbnb</span>
                                <span className="text-2xl font-semibold text-gray-300 whitespace-nowrap">Stripe</span>
                                <span className="text-2xl font-semibold text-gray-300 whitespace-nowrap">Notion</span>
                                <span className="text-2xl font-semibold text-gray-300 whitespace-nowrap">Figma</span>
                                <span className="text-2xl font-semibold text-gray-300 whitespace-nowrap">Slack</span>
                                <span className="text-2xl font-semibold text-gray-300 whitespace-nowrap">Linear</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 md:py-32 bg-[#FAFAF9]">
            <div className="max-w-6xl mx-auto px-6">
                {/* Section Header */}
                <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
                    <span ref={addAosRef} className="flowdesk-fade-up badge badge-accent mb-6">Features</span>
                    <h2 ref={addAosRef} className="flowdesk-fade-up text-3xl md:text-4xl lg:text-5xl text-[#0A1628] mb-6" style={{ transitionDelay: '50ms' }}>
                        Everything you need<br /><em className="italic">to ship faster</em>
                    </h2>
                    <p ref={addAosRef} className="flowdesk-fade-up text-[#64748B]" style={{ transitionDelay: '100ms' }}>
                        Powerful features wrapped in a beautiful interface. No learning curve, just results.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {/* Feature 1 */}
                    <div ref={addAosRef} className="flowdesk-fade-up feature-card lg:col-span-2" style={{ transitionDelay: '100ms' }}>
                        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                            <div className="flex-1">
                                <div className="icon-box mb-5">
                                    <Brain className="w-6 h-6 text-[#2563EB]" />
                                </div>
                                <h3 className="text-2xl text-[#0A1628] mb-3">AI-Powered Assistant</h3>
                                <p className="text-[#64748B] mb-6">
                                    Let AI prioritize your tasks, predict bottlenecks, and suggest optimizations. It's like having a project manager that never sleeps.
                                </p>
                                <div className="bg-[#F5F5F4] rounded-xl p-4">
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-[#2563EB] flex items-center justify-center flex-shrink-0">
                                            <Bot className="w-4 h-4 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-[#2563EB] font-medium mb-1">AI Insight</p>
                                            <p className="text-sm text-[#0A1628]">"Based on velocity, your team can complete 3 more tasks this sprint."</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Feature 2 */}
                    <div ref={addAosRef} className="flowdesk-fade-up feature-card" style={{ transitionDelay: '150ms' }}>
                        <div className="icon-box mb-5">
                            <Users className="w-6 h-6 text-[#2563EB]" />
                        </div>
                        <h3 className="text-xl text-[#0A1628] mb-3">Real-time Collaboration</h3>
                        <p className="text-[#64748B] text-sm mb-6">
                            See who's working on what. Live cursors, instant updates, no more version confusion.
                        </p>
                        <div className="flex -space-x-2">
                            {[1, 2, 3].map((i) => (
                                <img 
                                    key={i}
                                    src={`https://images.unsplash.com/photo-${i === 1 ? '1494790108377-be9c29b29330' : i === 2 ? '1507003211169-0a1dd7228f2d' : '1438761681033-6461ffad8d80'}?w=50&h=50&fit=crop`} 
                                    alt="User" 
                                    className="w-8 h-8 rounded-full border-2 border-white object-cover"
                                />
                            ))}
                            <div className="w-8 h-8 rounded-full border-2 border-white bg-[#0A1628] flex items-center justify-center text-xs text-white font-medium">+5</div>
                        </div>
                    </div>

                    {/* Feature 3 */}
                    <div ref={addAosRef} className="flowdesk-fade-up feature-card" style={{ transitionDelay: '200ms' }}>
                        <div className="icon-box mb-5">
                            <GanttChart className="w-6 h-6 text-[#2563EB]" />
                        </div>
                        <h3 className="text-xl text-[#0A1628] mb-3">Timeline View</h3>
                        <p className="text-[#64748B] text-sm mb-6">
                            Visualize your project timeline with drag-and-drop Gantt charts.
                        </p>
                        <div className="space-y-2">
                            <div className="h-2 bg-[#2563EB] rounded-full w-3/4"></div>
                            <div className="h-2 bg-[#10B981] rounded-full w-1/2 ml-6"></div>
                            <div className="h-2 bg-amber-400 rounded-full w-2/3 ml-3"></div>
                        </div>
                    </div>

                    {/* Feature 4 */}
                    <div ref={addAosRef} className="flowdesk-fade-up feature-card" style={{ transitionDelay: '250ms' }}>
                        <div className="icon-box mb-5">
                            <Plug className="w-6 h-6 text-[#2563EB]" />
                        </div>
                        <h3 className="text-xl text-[#0A1628] mb-3">100+ Integrations</h3>
                        <p className="text-[#64748B] text-sm mb-6">
                            Connect with Slack, GitHub, Figma, Jira, and all your favorite tools.
                        </p>
                        <div className="flex gap-3">
                            <div className="w-10 h-10 bg-[#F5F5F4] rounded-lg flex items-center justify-center">
                                <Slack className="w-5 h-5 text-[#64748B]" />
                            </div>
                            <div className="w-10 h-10 bg-[#F5F5F4] rounded-lg flex items-center justify-center">
                                <Github className="w-5 h-5 text-[#64748B]" />
                            </div>
                            <div className="w-10 h-10 bg-[#F5F5F4] rounded-lg flex items-center justify-center">
                                <Figma className="w-5 h-5 text-[#64748B]" />
                            </div>
                            <div className="w-10 h-10 bg-[#F5F5F4] rounded-lg flex items-center justify-center text-sm font-semibold text-[#64748B]">
                                +97
                            </div>
                        </div>
                    </div>

                    {/* Feature 5 */}
                    <div ref={addAosRef} className="flowdesk-fade-up feature-card" style={{ transitionDelay: '300ms' }}>
                        <div className="icon-box mb-5">
                            <ShieldCheck className="w-6 h-6 text-[#2563EB]" />
                        </div>
                        <h3 className="text-xl text-[#0A1628] mb-3">Enterprise Security</h3>
                        <p className="text-[#64748B] text-sm mb-6">
                            SOC 2 compliant, SSO ready, and end-to-end encrypted. Your data is safe with us.
                        </p>
                        <div className="flex items-center gap-2">
                            <Lock className="w-4 h-4 text-[#10B981]" />
                            <span className="text-sm text-[#10B981] font-medium">SOC 2 Type II Certified</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 md:py-24 bg-[#0A1628]">
            <div className="max-w-6xl mx-auto px-6">
                <div ref={addAosRef} className="flowdesk-fade-up grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                    <div className="text-center">
                        <p className="stat-number text-white mb-2">2,400+</p>
                        <p className="text-[#94A3B8] text-sm">Active Teams</p>
                    </div>
                    <div className="text-center">
                        <p className="stat-number text-white mb-2">50M+</p>
                        <p className="text-[#94A3B8] text-sm">Tasks Completed</p>
                    </div>
                    <div className="text-center">
                        <p className="stat-number text-white mb-2">99.9%</p>
                        <p className="text-[#94A3B8] text-sm">Uptime SLA</p>
                    </div>
                    <div className="text-center">
                        <p className="stat-number text-white mb-2">4.9★</p>
                        <p className="text-[#94A3B8] text-sm">User Rating</p>
                    </div>
                </div>
            </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-24 md:py-32 bg-white">
            <div className="max-w-5xl mx-auto px-6">
                {/* Section Header */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span ref={addAosRef} className="flowdesk-fade-up badge badge-accent mb-6">Pricing</span>
                    <h2 ref={addAosRef} className="flowdesk-fade-up text-3xl md:text-4xl lg:text-5xl text-[#0A1628] mb-6" style={{ transitionDelay: '50ms' }}>
                        Simple, transparent<br /><em className="italic">pricing</em>
                    </h2>
                    <p ref={addAosRef} className="flowdesk-fade-up text-[#64748B]" style={{ transitionDelay: '100ms' }}>
                        Start free, scale when ready. No hidden fees, no surprises.
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                    {/* Free */}
                    <div ref={addAosRef} className="flowdesk-fade-up pricing-card" style={{ transitionDelay: '100ms' }}>
                        <div className="mb-8">
                            <h3 className="text-xl font-semibold text-[#0A1628] mb-2">Free</h3>
                            <p className="text-sm text-[#64748B]">Perfect for individuals</p>
                        </div>
                        <div className="mb-8">
                            <span className="text-5xl font-display text-[#0A1628]">€0</span>
                            <span className="text-[#64748B]">/month</span>
                        </div>
                        <ul className="space-y-4 mb-10">
                            {[
                                "Up to 5 projects",
                                "Basic integrations",
                                "1GB storage"
                            ].map((feature, i) => (
                                <li key={i} className="flex items-center gap-3 text-sm text-[#0A1628]">
                                    <Check className="w-5 h-5 text-[#10B981] flex-shrink-0" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                        <a href="#" className="btn-secondary w-full justify-center">
                            Get Started
                        </a>
                    </div>

                    {/* Pro */}
                    <div ref={addAosRef} className="flowdesk-fade-up pricing-card featured relative" style={{ transitionDelay: '150ms' }}>
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#2563EB] text-white text-xs font-semibold px-4 py-1.5 rounded-full">
                            Most Popular
                        </div>
                        <div className="mb-8">
                            <h3 className="text-xl font-semibold mb-2">Pro</h3>
                            <p className="text-sm text-muted">For growing teams</p>
                        </div>
                        <div className="mb-8">
                            <span className="text-5xl font-display">€12</span>
                            <span className="text-muted">/user/month</span>
                        </div>
                        <ul className="space-y-4 mb-10">
                            {[
                                "Unlimited projects",
                                "All integrations",
                                "AI assistant",
                                "100GB storage",
                                "Priority support"
                            ].map((feature, i) => (
                                <li key={i} className="flex items-center gap-3 text-sm">
                                    <Check className="w-5 h-5 text-[#10B981] flex-shrink-0" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                        <a href="#" className="btn-accent w-full justify-center">
                            Start Free Trial
                        </a>
                    </div>

                    {/* Enterprise */}
                    <div ref={addAosRef} className="flowdesk-fade-up pricing-card" style={{ transitionDelay: '200ms' }}>
                        <div className="mb-8">
                            <h3 className="text-xl font-semibold text-[#0A1628] mb-2">Enterprise</h3>
                            <p className="text-sm text-[#64748B]">For large organizations</p>
                        </div>
                        <div className="mb-8">
                            <span className="text-5xl font-display text-[#0A1628]">Custom</span>
                        </div>
                        <ul className="space-y-4 mb-10">
                            {[
                                "Everything in Pro",
                                "SSO & SAML",
                                "Dedicated support",
                                "Custom contracts"
                            ].map((feature, i) => (
                                <li key={i} className="flex items-center gap-3 text-sm text-[#0A1628]">
                                    <Check className="w-5 h-5 text-[#10B981] flex-shrink-0" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                        <a href="#" className="btn-secondary w-full justify-center">
                            Contact Sales
                        </a>
                    </div>
                </div>
            </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-24 md:py-32 bg-[#FAFAF9]">
            <div className="max-w-6xl mx-auto px-6">
                {/* Section Header */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span ref={addAosRef} className="flowdesk-fade-up badge badge-accent mb-6">Testimonials</span>
                    <h2 ref={addAosRef} className="flowdesk-fade-up text-3xl md:text-4xl lg:text-5xl text-[#0A1628] mb-6" style={{ transitionDelay: '50ms' }}>
                        Loved by teams<br /><em className="italic">worldwide</em>
                    </h2>
                </div>

                {/* Testimonials Grid */}
                <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                    {[
                        { quote: "FlowDesk transformed how our team ships. We went from constant chaos to shipping features 2x faster.", name: "Sarah Chen", role: "CTO, StartupXYZ", img: "1494790108377-be9c29b29330" },
                        { quote: "The AI suggestions are genuinely useful, not gimmicky. It's like having a senior PM always looking over the project.", name: "Marcus O'Brien", role: "Engineering Lead, TechCorp", img: "1507003211169-0a1dd7228f2d" },
                        { quote: "Finally, project management software that doesn't feel like it was designed in 2010. Beautiful and functional.", name: "Emma Rodriguez", role: "Design Director, CreativeHQ", img: "1438761681033-6461ffad8d80" }
                    ].map((t, i) => (
                        <div key={i} ref={addAosRef} className="flowdesk-fade-up testimonial-card" style={{ transitionDelay: `${100 + (i * 50)}ms` }}>
                            <p className="text-[#0A1628] mb-8 relative z-10">
                                "{t.quote}"
                            </p>
                            <div className="flex items-center gap-4">
                                <img src={`https://images.unsplash.com/photo-${t.img}?w=100&h=100&fit=crop`} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                                <div>
                                    <p className="font-semibold text-[#0A1628]">{t.name}</p>
                                    <p className="text-sm text-[#64748B]">{t.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 md:py-32 bg-[#0A1628]">
            <div className="max-w-4xl mx-auto px-6 text-center">
                <h2 ref={addAosRef} className="flowdesk-fade-up text-3xl md:text-4xl lg:text-5xl text-white mb-6">
                    Ready to ship<br /><em className="italic">faster?</em>
                </h2>
                <p ref={addAosRef} className="flowdesk-fade-up text-lg text-[#94A3B8] mb-10 max-w-lg mx-auto" style={{ transitionDelay: '50ms' }}>
                    Join 2,400+ teams already using FlowDesk. Start your free trial today — no credit card required.
                </p>
                
                <div ref={addAosRef} className="flowdesk-fade-up flex flex-col sm:flex-row gap-4 justify-center" style={{ transitionDelay: '100ms' }}>
                    <a href="#" className="btn-accent">
                        Start Free Trial
                        <ArrowRight className="w-4 h-4" />
                    </a>
                    <a href="#" className="btn-secondary bg-white/10 border-white/20 text-white hover:bg-white hover:text-[#0A1628]">
                        <Calendar className="w-4 h-4" />
                        Book a Demo
                    </a>
                </div>
            </div>
        </section>

        {/* Footer */}
        <footer className="py-16 bg-[#FAFAF9] border-t border-gray-100">
            <div className="max-w-6xl mx-auto px-6">
                <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
                    {/* Logo & Description */}
                    <div className="lg:col-span-2">
                        <a href="#" className="flex items-center gap-3 mb-4">
                            <div className="w-9 h-9 bg-[#0A1628] rounded-lg flex items-center justify-center">
                                <LayoutGrid className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-semibold text-[#0A1628]">FlowDesk</span>
                        </a>
                        <p className="text-[#64748B] text-sm max-w-xs mb-6">
                            Project management reimagined for modern teams. Built with care in Dublin.
                        </p>
                        <div className="flex items-center gap-3">
                            <a href="#" className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-[#64748B] hover:text-[#0A1628] hover:border-[#0A1628] transition-colors">
                                <Twitter className="w-4 h-4" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-[#64748B] hover:text-[#0A1628] hover:border-[#0A1628] transition-colors">
                                <Linkedin className="w-4 h-4" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-[#64748B] hover:text-[#0A1628] hover:border-[#0A1628] transition-colors">
                                <Github className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-semibold text-[#0A1628] mb-4">Product</h4>
                        <ul className="space-y-3 text-sm">
                            <li><a href="#" className="text-[#64748B] hover:text-[#0A1628] transition-colors">Features</a></li>
                            <li><a href="#" className="text-[#64748B] hover:text-[#0A1628] transition-colors">Pricing</a></li>
                            <li><a href="#" className="text-[#64748B] hover:text-[#0A1628] transition-colors">Integrations</a></li>
                            <li><a href="#" className="text-[#64748B] hover:text-[#0A1628] transition-colors">Changelog</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-[#0A1628] mb-4">Company</h4>
                        <ul className="space-y-3 text-sm">
                            <li><a href="#" className="text-[#64748B] hover:text-[#0A1628] transition-colors">About</a></li>
                            <li><a href="#" className="text-[#64748B] hover:text-[#0A1628] transition-colors">Blog</a></li>
                            <li><a href="#" className="text-[#64748B] hover:text-[#0A1628] transition-colors">Careers</a></li>
                            <li><a href="#" className="text-[#64748B] hover:text-[#0A1628] transition-colors">Contact</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-[#0A1628] mb-4">Legal</h4>
                        <ul className="space-y-3 text-sm">
                            <li><a href="#" className="text-[#64748B] hover:text-[#0A1628] transition-colors">Privacy</a></li>
                            <li><a href="#" className="text-[#64748B] hover:text-[#0A1628] transition-colors">Terms</a></li>
                            <li><a href="#" className="text-[#64748B] hover:text-[#0A1628] transition-colors">Security</a></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-[#64748B]">
                        © 2025 FlowDesk. All rights reserved.
                    </p>
                    <p className="text-sm text-[#64748B]">
                        Made with <span className="text-[#F43F5E]">♥</span> in Dublin
                    </p>
                </div>
            </div>
        </footer>
    </div>
  );
}
