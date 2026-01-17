'use client';

import React, { useEffect, useState, useRef } from 'react';
import { 
  ArrowRight, 
  Menu, 
  X, 
  Target, 
  Users, 
  Globe, 
  Handshake, 
  TrendingUp, 
  GitMerge, 
  Settings, 
  RefreshCw, 
  PieChart, 
  Users2, 
  Linkedin, 
  Mail, 
  MapPin, 
  Phone, 
  Send 
} from 'lucide-react';

// Inject keyframe animations and styles
const injectStyles = () => {
  if (typeof document === 'undefined') return;
  if (document.getElementById('kmurphy-styles')) return;

  const style = document.createElement('style');
  style.id = 'kmurphy-styles';
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

    .kmurphy-wrapper * {
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      box-sizing: border-box;
    }

    .kmurphy-wrapper { 
        font-family: 'Inter', system-ui, sans-serif;
        background: #FFFFFF;
        color: #334155;
        line-height: 1.7;
    }

    .kmurphy-wrapper ::selection {
        background: #0F1B2D;
        color: #FFFFFF;
    }

    .kmurphy-wrapper h1, 
    .kmurphy-wrapper h2, 
    .kmurphy-wrapper h3, 
    .kmurphy-wrapper h4, 
    .kmurphy-wrapper h5 {
        font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
        font-weight: 600;
        line-height: 1.2;
        color: #0F1B2D;
    }

    /* Navy Button */
    .kmurphy-wrapper .btn-navy {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        padding: 16px 32px;
        background: #0F1B2D;
        color: #FFFFFF;
        font-size: 14px;
        font-weight: 600;
        letter-spacing: 0.02em;
        border-radius: 4px;
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
        cursor: pointer;
    }

    .kmurphy-wrapper .btn-navy::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(201, 162, 39, 0.2), transparent);
        transition: left 0.5s ease;
    }

    .kmurphy-wrapper .btn-navy:hover {
        background: #1A2A42;
        transform: translateY(-2px);
        box-shadow: 0 10px 30px rgba(15, 27, 45, 0.2);
    }

    .kmurphy-wrapper .btn-navy:hover::before {
        left: 100%;
    }

    .kmurphy-wrapper .btn-outline {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        padding: 14px 30px;
        background: transparent;
        color: #0F1B2D;
        font-size: 14px;
        font-weight: 600;
        letter-spacing: 0.02em;
        border: 2px solid #0F1B2D;
        border-radius: 4px;
        transition: all 0.3s ease;
        cursor: pointer;
    }

    .kmurphy-wrapper .btn-outline:hover {
        background: #0F1B2D;
        color: #FFFFFF;
    }

    .kmurphy-wrapper .btn-gold {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        padding: 16px 32px;
        background: linear-gradient(135deg, #C9A227 0%, #E3C565 100%);
        color: #0F1B2D;
        font-size: 14px;
        font-weight: 600;
        letter-spacing: 0.02em;
        border-radius: 4px;
        transition: all 0.3s ease;
        cursor: pointer;
    }

    .kmurphy-wrapper .btn-gold:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 30px rgba(201, 162, 39, 0.3);
    }

    /* Card Styles */
    .kmurphy-wrapper .service-card {
        background: #FFFFFF;
        border: 1px solid #E2E8F0;
        border-radius: 8px;
        padding: 40px;
        transition: all 0.4s ease;
        position: relative;
        overflow: hidden;
    }

    .kmurphy-wrapper .service-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 4px;
        height: 0;
        background: linear-gradient(180deg, #C9A227, #E3C565);
        transition: height 0.4s ease;
    }

    .kmurphy-wrapper .service-card:hover {
        border-color: #C9A227;
        box-shadow: 0 20px 60px rgba(15, 27, 45, 0.08);
        transform: translateY(-4px);
    }

    .kmurphy-wrapper .service-card:hover::before {
        height: 100%;
    }

    /* Stats Card */
    .kmurphy-wrapper .stat-card {
        background: linear-gradient(135deg, #0F1B2D 0%, #1A2A42 100%);
        border-radius: 8px;
        padding: 40px;
        text-align: center;
        position: relative;
        overflow: hidden;
    }

    .kmurphy-wrapper .stat-card::after {
        content: '';
        position: absolute;
        top: -50%;
        right: -50%;
        width: 100%;
        height: 100%;
        background: radial-gradient(circle, rgba(201, 162, 39, 0.1) 0%, transparent 70%);
        pointer-events: none;
    }

    /* Team Card */
    .kmurphy-wrapper .team-card {
        background: #FFFFFF;
        border-radius: 8px;
        overflow: hidden;
        transition: all 0.4s ease;
        box-shadow: 0 4px 20px rgba(15, 27, 45, 0.05);
    }

    .kmurphy-wrapper .team-card:hover {
        transform: translateY(-8px);
        box-shadow: 0 20px 60px rgba(15, 27, 45, 0.1);
    }

    /* Testimonial Card */
    .kmurphy-wrapper .testimonial-card {
        background: #F8F9FA;
        border-radius: 8px;
        padding: 40px;
        position: relative;
    }

    .kmurphy-wrapper .testimonial-card::before {
        content: '"';
        position: absolute;
        top: 20px;
        left: 30px;
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-size: 80px;
        font-weight: 800;
        color: #C9A227;
        opacity: 0.2;
        line-height: 1;
    }

    /* Nav Link */
    .kmurphy-wrapper .nav-link {
        position: relative;
        color: #334155;
        font-weight: 500;
        font-size: 14px;
        transition: color 0.3s ease;
        cursor: pointer;
    }

    .kmurphy-wrapper .nav-link::after {
        content: '';
        position: absolute;
        bottom: -4px;
        left: 0;
        width: 0;
        height: 2px;
        background: #C9A227;
        transition: width 0.3s ease;
    }

    .kmurphy-wrapper .nav-link:hover {
        color: #0F1B2D;
    }

    .kmurphy-wrapper .nav-link:hover::after {
        width: 100%;
    }

    /* Section Label */
    .kmurphy-wrapper .section-label {
        display: block;
        font-size: 12px;
        font-weight: 600;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: #C9A227;
    }

    /* Geometric Shapes */
    .kmurphy-wrapper .geo-shape {
        position: absolute;
        pointer-events: none;
    }

    .kmurphy-wrapper .geo-square {
        width: 200px;
        height: 200px;
        border: 1px solid rgba(201, 162, 39, 0.2);
        transform: rotate(45deg);
    }

    .kmurphy-wrapper .geo-circle {
        width: 300px;
        height: 300px;
        border: 1px solid rgba(15, 27, 45, 0.05);
        border-radius: 50%;
    }

    /* Process Step */
    .kmurphy-wrapper .process-step {
        position: relative;
        padding-left: 80px;
    }

    .kmurphy-wrapper .process-step::before {
        content: attr(data-step);
        position: absolute;
        left: 0;
        top: 0;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #C9A227, #E3C565);
        color: #0F1B2D;
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-weight: 700;
        font-size: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
    }

    .kmurphy-wrapper .process-step::after {
        content: '';
        position: absolute;
        left: 25px;
        top: 60px;
        width: 1px;
        height: calc(100% + 20px);
        background: linear-gradient(180deg, #C9A227, transparent);
    }

    .kmurphy-wrapper .process-step:last-child::after {
        display: none;
    }

    /* Client Logo */
    .kmurphy-wrapper .client-logo {
        filter: grayscale(100%);
        opacity: 0.5;
        transition: all 0.3s ease;
    }

    .kmurphy-wrapper .client-logo:hover {
        filter: grayscale(0%);
        opacity: 1;
    }
    
    /* Mobile Menu */
    .kmurphy-wrapper .mobile-menu {
        transition: all 0.3s ease-in-out;
        max-height: 0;
        overflow: hidden;
        opacity: 0;
    }
    
    .kmurphy-wrapper .mobile-menu.active {
        max-height: 400px;
        opacity: 1;
    }

    /* Animations */
    .kmurphy-fade-up {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s ease-out, transform 0.8s ease-out;
    }
    
    .kmurphy-fade-left {
        opacity: 0;
        transform: translateX(30px);
        transition: opacity 0.8s ease-out, transform 0.8s ease-out;
    }

    .kmurphy-animate {
        opacity: 1;
        transform: translate(0);
    }
  `;
  document.head.appendChild(style);
};

export default function KieranMurphy({ previewMode = false }: { previewMode?: boolean }) {
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
            entry.target.classList.add('kmurphy-animate');
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
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  const addAosRef = (el: HTMLElement | null) => {
    if (el && !aosRefs.current.includes(el)) {
      aosRefs.current.push(el);
    }
  };

  return (
    <div className="kmurphy-wrapper relative">
        {/* Navigation */}
        <nav 
            className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#E2E8F0] transition-all duration-300 ${
                scrolled ? 'shadow-md' : ''
            }`}
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <a onClick={() => scrollToSection('top')} className="flex items-center gap-3 cursor-pointer">
                        <div className="flex items-center">
                            <div className="w-10 h-10 bg-[#0F1B2D] flex items-center justify-center">
                                <span className="text-white font-display font-bold text-lg">KM</span>
                            </div>
                            <div className="w-1 h-10 bg-[#C9A227] ml-0.5"></div>
                        </div>
                        <div className="hidden sm:block">
                            <span className="block font-display font-semibold text-[#0F1B2D] text-lg leading-tight">Kieran Murphy</span>
                            <span className="block text-[10px] tracking-[0.2em] text-[#64748B] uppercase">& Associates</span>
                        </div>
                    </a>

                    {/* Desktop Nav */}
                    <div className="hidden lg:flex items-center gap-10">
                        {['About', 'Services', 'Approach', 'Team', 'Insights', 'Contact'].map((item) => (
                            <a 
                                key={item} 
                                onClick={() => scrollToSection(item.toLowerCase())} 
                                className="nav-link"
                            >
                                {item === 'Approach' ? 'Our Approach' : item}
                            </a>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="hidden lg:block">
                        <a onClick={() => scrollToSection('contact')} className="btn-navy">
                            Schedule Consultation
                            <ArrowRight className="w-4 h-4" />
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button onClick={toggleMobileMenu} className="lg:hidden w-10 h-10 flex items-center justify-center text-[#0F1B2D] hover:text-[#C9A227] transition-colors">
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
                
                {/* Mobile Menu Dropdown */}
                <div className={`mobile-menu lg:hidden border-t border-[#E2E8F0] pb-4 ${mobileMenuOpen ? 'active' : ''}`}>
                    <div className="flex flex-col space-y-4 pt-4">
                        {['About', 'Services', 'Approach', 'Team', 'Insights', 'Contact'].map((item) => (
                            <a 
                                key={item} 
                                onClick={() => scrollToSection(item.toLowerCase())} 
                                className="block text-[#0F1B2D] font-medium hover:text-[#C9A227] cursor-pointer"
                            >
                                {item === 'Approach' ? 'Our Approach' : item}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </nav>

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-[#F8F9FA]">
            {/* Geometric Decorations */}
            <div className="kmurphy-wrapper geo-shape geo-square" style={{ top: '20%', right: '5%' }}></div>
            <div className="kmurphy-wrapper geo-shape geo-circle" style={{ bottom: '-10%', left: '-5%' }}></div>
            
            <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left Content */}
                    <div>
                        <span ref={addAosRef} className="kmurphy-fade-up section-label mb-6">Strategic Business Consulting</span>
                        
                        <h1 ref={addAosRef} className="kmurphy-fade-up text-4xl md:text-5xl lg:text-6xl font-display font-bold text-[#0F1B2D] mb-6 leading-tight" style={{ transitionDelay: '100ms' }}>
                            Driving Growth Through <br />
                            <span className="text-[#C9A227]">Strategic Excellence</span>
                        </h1>
                        
                        <p ref={addAosRef} className="kmurphy-fade-up text-lg text-[#475569] mb-8 max-w-xl leading-relaxed" style={{ transitionDelay: '200ms' }}>
                            For over 20 years, we've partnered with Ireland's leading businesses to navigate complex challenges, unlock new opportunities, and achieve sustainable growth.
                        </p>
                        
                        <div ref={addAosRef} className="kmurphy-fade-up flex flex-wrap gap-4 mb-12" style={{ transitionDelay: '300ms' }}>
                            <a onClick={() => scrollToSection('contact')} className="btn-navy">
                                Start a Conversation
                                <ArrowRight className="w-4 h-4" />
                            </a>
                            <a onClick={() => scrollToSection('services')} className="btn-outline">
                                Our Services
                            </a>
                        </div>

                        {/* Trust Indicators */}
                        <div ref={addAosRef} className="kmurphy-fade-up flex items-center gap-8 pt-8 border-t border-[#E2E8F0]" style={{ transitionDelay: '400ms' }}>
                            <div>
                                <span className="block text-3xl font-display font-bold text-[#0F1B2D]">20+</span>
                                <span className="text-sm text-[#64748B]">Years Experience</span>
                            </div>
                            <div className="w-px h-12 bg-[#CBD5E1]"></div>
                            <div>
                                <span className="block text-3xl font-display font-bold text-[#0F1B2D]">150+</span>
                                <span className="text-sm text-[#64748B]">Clients Served</span>
                            </div>
                            <div className="w-px h-12 bg-[#CBD5E1]"></div>
                            <div>
                                <span className="block text-3xl font-display font-bold text-[#0F1B2D]">€2B+</span>
                                <span className="text-sm text-[#64748B]">Value Created</span>
                            </div>
                        </div>
                    </div>

                    {/* Right - Image */}
                    <div ref={addAosRef} className="kmurphy-fade-left relative" style={{ transitionDelay: '200ms' }}>
                        <div className="relative">
                            <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=700&h=800&fit=crop&q=80" 
                                 alt="Business consulting team" 
                                 className="w-full h-[550px] object-cover rounded-lg shadow-2xl" />
                            
                            {/* Floating Stats Card */}
                            <div className="absolute -bottom-8 -left-8 stat-card max-w-[240px]">
                                <div className="relative z-10">
                                    <span className="block text-4xl font-display font-bold text-white mb-1">94%</span>
                                    <span className="text-sm text-[#94A3B8]">Client Retention Rate</span>
                                </div>
                            </div>

                            {/* Gold Accent */}
                            <div className="absolute -top-4 -right-4 w-24 h-24 border-4 border-[#C9A227] rounded-lg"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Client Logos */}
        <section className="py-16 bg-white border-y border-[#E2E8F0]">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="text-center mb-10">
                    <span className="text-sm text-[#64748B] font-medium">Trusted by Ireland's Leading Organisations</span>
                </div>
                <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-20">
                    {['AIB', 'ESB', 'Musgrave', 'Glanbia', 'Kerry Group', 'CRH'].map((logo) => (
                        <div key={logo} className="client-logo text-2xl font-display font-bold text-[#0F1B2D] cursor-default">{logo}</div>
                    ))}
                </div>
            </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 bg-white relative overflow-hidden">
            <div className="kmurphy-wrapper geo-shape geo-circle" style={{ top: 0, right: '-10%' }}></div>
            
            <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left - Content */}
                    <div>
                        <span ref={addAosRef} className="kmurphy-fade-up section-label mb-4">About Us</span>
                        
                        <h2 ref={addAosRef} className="kmurphy-fade-up text-3xl md:text-4xl lg:text-5xl font-display font-bold text-[#0F1B2D] mb-6" style={{ transitionDelay: '100ms' }}>
                            Trusted Advisors for Complex Challenges
                        </h2>
                        
                        <p ref={addAosRef} className="kmurphy-fade-up text-[#475569] mb-6 leading-relaxed" style={{ transitionDelay: '200ms' }}>
                            Founded in 2003 by Kieran Murphy, our firm has grown from a boutique consultancy to one of Ireland's most respected strategic advisory practices. We combine deep industry expertise with rigorous analytical frameworks to deliver measurable results.
                        </p>
                        
                        <p ref={addAosRef} className="kmurphy-fade-up text-[#475569] mb-8 leading-relaxed" style={{ transitionDelay: '300ms' }}>
                            Our team of 25 consultants brings diverse experience from leading global firms and industry roles, enabling us to offer perspectives that bridge strategy and execution.
                        </p>

                        {/* Key Differentiators */}
                        <div ref={addAosRef} className="kmurphy-fade-up grid grid-cols-2 gap-6" style={{ transitionDelay: '400ms' }}>
                            {[
                                { icon: Target, title: "Results-Focused", desc: "Measurable outcomes, not just reports" },
                                { icon: Users, title: "Senior-Led", desc: "Partners on every engagement" },
                                { icon: Globe, title: "Local Expertise", desc: "Deep Irish market knowledge" },
                                { icon: Handshake, title: "Partnership Model", desc: "We succeed when you succeed" }
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <div className="w-10 h-10 bg-[#C9A227]/10 rounded flex items-center justify-center flex-shrink-0">
                                        <item.icon className="w-5 h-5 text-[#C9A227]" />
                                    </div>
                                    <div>
                                        <h4 className="font-display font-semibold text-[#0F1B2D] mb-1">{item.title}</h4>
                                        <p className="text-xs text-[#64748B]">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right - Image Grid */}
                    <div ref={addAosRef} className="kmurphy-fade-left relative">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-4">
                                <img src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop&q=80" alt="Team meeting" className="w-full h-48 object-cover rounded-lg" />
                                <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=400&fit=crop&q=80" alt="Strategy session" className="w-full h-56 object-cover rounded-lg" />
                            </div>
                            <div className="space-y-4 pt-8">
                                <img src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=400&h=400&fit=crop&q=80" alt="Executive consulting" className="w-full h-56 object-cover rounded-lg" />
                                <img src="https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=400&h=300&fit=crop&q=80" alt="Data analysis" className="w-full h-48 object-cover rounded-lg" />
                            </div>
                        </div>
                        <div className="absolute -bottom-4 -left-4 w-32 h-1 bg-[#C9A227]"></div>
                    </div>
                </div>
            </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-24 bg-[#F8F9FA]">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="max-w-3xl mb-16">
                    <span ref={addAosRef} className="kmurphy-fade-up section-label mb-4">Our Services</span>
                    <h2 ref={addAosRef} className="kmurphy-fade-up text-3xl md:text-4xl lg:text-5xl font-display font-bold text-[#0F1B2D] mb-6" style={{ transitionDelay: '100ms' }}>
                        Comprehensive Strategic Solutions
                    </h2>
                    <p ref={addAosRef} className="kmurphy-fade-up text-[#475569] leading-relaxed" style={{ transitionDelay: '200ms' }}>
                        We offer a full spectrum of consulting services designed to address your most pressing business challenges and capitalize on emerging opportunities.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        { icon: TrendingUp, title: "Corporate Strategy", desc: "Define your competitive advantage and chart a clear path to sustainable growth with our rigorous strategic planning process.", list: ["Market entry strategy", "Competitive positioning", "Portfolio optimization"] },
                        { icon: GitMerge, title: "M&A Advisory", desc: "Navigate transactions with confidence. From target identification to post-merger integration, we guide you through every stage.", list: ["Due diligence support", "Valuation analysis", "Integration planning"] },
                        { icon: Settings, title: "Operational Excellence", desc: "Unlock efficiency gains and optimize your operations to improve margins and enhance customer experience.", list: ["Process optimization", "Cost reduction", "Supply chain strategy"] },
                        { icon: RefreshCw, title: "Digital Transformation", desc: "Harness technology to transform your business model, enhance capabilities, and create new value for customers.", list: ["Digital strategy", "Technology roadmaps", "Change management"] },
                        { icon: PieChart, title: "Financial Advisory", desc: "Strengthen your financial foundation with expert guidance on capital structure, funding, and financial planning.", list: ["Capital raising", "Financial modelling", "Restructuring support"] },
                        { icon: Users2, title: "Organisational Design", desc: "Build high-performing teams and structures that enable your strategy and create lasting competitive advantage.", list: ["Operating model design", "Talent strategy", "Culture transformation"] }
                    ].map((s, idx) => (
                        <div key={idx} ref={addAosRef} className="kmurphy-fade-up service-card" style={{ transitionDelay: `${(idx % 3) * 100}ms` }}>
                            <div className="w-14 h-14 bg-[#0F1B2D] rounded-lg flex items-center justify-center mb-6">
                                <s.icon className="w-7 h-7 text-[#C9A227]" />
                            </div>
                            <h3 className="text-xl font-display font-semibold text-[#0F1B2D] mb-3">{s.title}</h3>
                            <p className="text-[#475569] text-sm mb-6 leading-relaxed">{s.desc}</p>
                            <ul className="space-y-2 text-sm text-[#64748B]">
                                {s.list.map((li, i) => (
                                    <li key={i} className="flex items-center gap-2">
                                        <div className="w-1 h-1 bg-[#C9A227] rounded-full"></div>
                                        {li}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* Our Approach Section */}
        <section id="approach" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <span ref={addAosRef} className="kmurphy-fade-up section-label mb-4">Our Approach</span>
                        <h2 ref={addAosRef} className="kmurphy-fade-up text-3xl md:text-4xl lg:text-5xl font-display font-bold text-[#0F1B2D] mb-6" style={{ transitionDelay: '100ms' }}>
                            A Proven Framework for Success
                        </h2>
                        <p ref={addAosRef} className="kmurphy-fade-up text-[#475569] mb-10 leading-relaxed" style={{ transitionDelay: '200ms' }}>
                            Our methodology combines analytical rigour with practical implementation expertise. We work alongside your team to ensure insights translate into action and lasting results.
                        </p>

                        <div className="space-y-10">
                            {[
                                { step: "1", title: "Discovery & Diagnosis", desc: "Deep dive into your business, market dynamics, and competitive landscape to identify root causes and opportunities." },
                                { step: "2", title: "Strategy Development", desc: "Collaborative development of strategic options, supported by rigorous analysis and financial modelling." },
                                { step: "3", title: "Implementation Planning", desc: "Detailed roadmaps with clear milestones, responsibilities, and KPIs to guide execution." },
                                { step: "4", title: "Execution Support", desc: "Hands-on support during implementation to overcome obstacles and ensure momentum." }
                            ].map((s, i) => (
                                <div key={i} ref={addAosRef} className="kmurphy-fade-up process-step" data-step={s.step} style={{ transitionDelay: `${300 + (i * 100)}ms` }}>
                                    <h3 className="text-lg font-display font-semibold text-[#0F1B2D] mb-2">{s.title}</h3>
                                    <p className="text-sm text-[#475569] leading-relaxed">{s.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div ref={addAosRef} className="kmurphy-fade-left">
                        <div className="relative">
                            <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=700&fit=crop&q=80" alt="Strategic planning" className="w-full h-[500px] object-cover rounded-lg shadow-xl" />
                            <div className="absolute -bottom-12 -left-12 bg-[#0F1B2D] p-8 rounded-lg shadow-2xl max-w-[300px]">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="text-center">
                                        <span className="block text-3xl font-display font-bold text-[#C9A227]">87%</span>
                                        <span className="text-xs text-[#94A3B8]">Implementation</span>
                                    </div>
                                    <div className="text-center">
                                        <span className="block text-3xl font-display font-bold text-[#C9A227]">3.2x</span>
                                        <span className="text-xs text-[#94A3B8]">Average ROI</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 bg-[#F8F9FA]">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="grid lg:grid-cols-2 gap-16">
                    <div>
                        <span ref={addAosRef} className="kmurphy-fade-up section-label mb-4">Get in Touch</span>
                        <h2 ref={addAosRef} className="kmurphy-fade-up text-3xl md:text-4xl lg:text-5xl font-display font-bold text-[#0F1B2D] mb-6" style={{ transitionDelay: '100ms' }}>
                            Let's Discuss Your Challenge
                        </h2>
                        <p ref={addAosRef} className="kmurphy-fade-up text-[#475569] mb-10 leading-relaxed" style={{ transitionDelay: '200ms' }}>
                            Every great partnership begins with a conversation. Whether you're facing a specific challenge or exploring strategic options, we'd welcome the opportunity to learn about your business.
                        </p>

                        <div ref={addAosRef} className="kmurphy-fade-up space-y-6" style={{ transitionDelay: '300ms' }}>
                            {[
                                { icon: MapPin, title: "Office", desc: "25 St Stephen's Green, Dublin 2" },
                                { icon: Phone, title: "Phone", desc: "+353 1 612 3456", href: "tel:+35316123456" },
                                { icon: Mail, title: "Email", desc: "info@kmassociates.ie", href: "mailto:info@kmassociates.ie" }
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-[#0F1B2D] rounded-lg flex items-center justify-center flex-shrink-0">
                                        <item.icon className="w-5 h-5 text-[#C9A227]" />
                                    </div>
                                    <div>
                                        <h4 className="font-display font-semibold text-[#0F1B2D] mb-1">{item.title}</h4>
                                        {item.href ? (
                                            <a href={item.href} className="text-sm text-[#475569] hover:text-[#C9A227] transition-colors">{item.desc}</a>
                                        ) : (
                                            <p className="text-sm text-[#475569]">{item.desc}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div ref={addAosRef} className="kmurphy-fade-left bg-white rounded-lg p-8 lg:p-12 shadow-lg">
                        <h3 className="text-2xl font-display font-semibold text-[#0F1B2D] mb-6">Schedule a Consultation</h3>
                        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid md:grid-cols-2 gap-6">
                                <input type="text" className="w-full px-4 py-3 border border-[#E2E8F0] rounded text-[#0F1B2D] focus:outline-none focus:border-[#C9A227] transition-colors" placeholder="First Name" />
                                <input type="text" className="w-full px-4 py-3 border border-[#E2E8F0] rounded text-[#0F1B2D] focus:outline-none focus:border-[#C9A227] transition-colors" placeholder="Last Name" />
                            </div>
                            <input type="email" className="w-full px-4 py-3 border border-[#E2E8F0] rounded text-[#0F1B2D] focus:outline-none focus:border-[#C9A227] transition-colors" placeholder="Work Email" />
                            <select className="w-full px-4 py-3 border border-[#E2E8F0] rounded text-[#64748B] focus:outline-none focus:border-[#C9A227] transition-colors">
                                <option>Select a service area</option>
                                <option>Corporate Strategy</option>
                                <option>M&A Advisory</option>
                                <option>Operational Excellence</option>
                            </select>
                            <textarea rows={4} className="w-full px-4 py-3 border border-[#E2E8F0] rounded text-[#0F1B2D] focus:outline-none focus:border-[#C9A227] transition-colors resize-none" placeholder="Message"></textarea>
                            <button type="submit" className="btn-gold w-full justify-center">
                                Submit Enquiry
                                <Send className="w-4 h-4" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>

        {/* Footer */}
        <footer className="bg-[#0F1B2D] py-16">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-t border-[#334E68]/30 pt-8">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-[#1A2A42] border border-[#334E68] flex items-center justify-center">
                            <span className="text-white font-display font-bold text-sm">KM</span>
                        </div>
                        <span className="text-white font-display font-semibold">Kieran Murphy & Associates</span>
                    </div>
                    <p className="text-xs text-[#64748B]">© 2025 Kieran Murphy & Associates. All rights reserved.</p>
                </div>
            </div>
        </footer>
    </div>
  );
}
