'use client';

import React, { useEffect, useState, useRef } from 'react';
import { 
  Menu, 
  X, 
  Calendar, 
  ArrowRight, 
  Flower2, 
  Sparkles, 
  Leaf, 
  Wind, 
  Gem, 
  Sun, 
  BookOpen, 
  Heart, 
  HeartHandshake, 
  ShieldCheck, 
  Recycle, 
  Clock, 
  Euro, 
  Gift, 
  Users, 
  Star, 
  MapPin, 
  Phone, 
  Mail, 
  Instagram, 
  Facebook, 
  Linkedin,
  Send,
  ChevronDown
} from 'lucide-react';

// Inject keyframe animations and styles
const injectStyles = () => {
  if (typeof document === 'undefined') return;
  if (document.getElementById('bloom-styles')) return;

  const style = document.createElement('style');
  style.id = 'bloom-styles';
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap');

    .bloom-wrapper * {
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      box-sizing: border-box;
    }

    .bloom-wrapper { 
        font-family: 'DM Sans', sans-serif;
        background: #FDF8F3;
        color: #4A4A4A;
        line-height: 1.7;
        overflow-x: hidden;
    }

    .bloom-wrapper ::selection {
        background: #9CAF88;
        color: #ffffff;
    }

    .bloom-wrapper h1, 
    .bloom-wrapper h2, 
    .bloom-wrapper h3, 
    .bloom-wrapper h4, 
    .bloom-wrapper h5 {
        font-family: 'Cormorant Garamond', Georgia, serif;
        font-weight: 400;
        line-height: 1.2;
    }

    /* Organic Blob Shapes */
    .bloom-wrapper .blob-shape {
        border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
        animation: blob-morph 8s ease-in-out infinite;
    }

    .bloom-wrapper .blob-shape-2 {
        border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
        animation: blob-morph-2 10s ease-in-out infinite;
    }

    @keyframes blob-morph {
        0%, 100% {
            border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
        }
        50% {
            border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
        }
    }

    @keyframes blob-morph-2 {
        0%, 100% {
            border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
        }
        50% {
            border-radius: 70% 30% 30% 70% / 70% 70% 30% 30%;
        }
    }

    /* Wavy Divider */
    .bloom-wrapper .wave-divider {
        position: relative;
        height: 100px;
        overflow: hidden;
    }

    .bloom-wrapper .wave-divider svg {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    .bloom-wrapper .wave-divider-top svg {
        position: absolute;
        top: 0;
        left: 0;
        transform: rotate(180deg);
    }

    /* Soft Button Styles */
    .bloom-wrapper .btn-bloom {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        padding: 16px 32px;
        background: linear-gradient(135deg, #9CAF88 0%, #7A9166 100%);
        color: #ffffff;
        font-size: 14px;
        font-weight: 500;
        letter-spacing: 0.05em;
        text-transform: none; /* Reset if needed */
        border-radius: 50px;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 4px 20px rgba(156, 175, 136, 0.3);
        cursor: pointer;
        border: none;
    }

    .bloom-wrapper .btn-bloom:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 30px rgba(156, 175, 136, 0.4);
        gap: 14px;
    }

    .bloom-wrapper .btn-bloom-outline {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        padding: 14px 30px;
        background: transparent;
        color: #9CAF88;
        font-size: 14px;
        font-weight: 500;
        letter-spacing: 0.05em;
        border: 2px solid #9CAF88;
        border-radius: 50px;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        cursor: pointer;
    }

    .bloom-wrapper .btn-bloom-outline:hover {
        background: #9CAF88;
        color: #ffffff;
        gap: 14px;
    }

    /* Card Styles */
    .bloom-wrapper .bloom-card {
        background: #ffffff;
        border-radius: 24px;
        padding: 40px;
        transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.04);
    }

    .bloom-wrapper .bloom-card:hover {
        transform: translateY(-8px);
        box-shadow: 0 20px 60px rgba(156, 175, 136, 0.15);
    }

    /* Image Styles */
    .bloom-wrapper .organic-image {
        border-radius: 24px;
        overflow: hidden;
        position: relative;
    }

    .bloom-wrapper .organic-image::before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(135deg, rgba(156, 175, 136, 0.1) 0%, transparent 50%);
        z-index: 1;
        pointer-events: none;
    }

    .bloom-wrapper .organic-image img {
        transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .bloom-wrapper .organic-image:hover img {
        transform: scale(1.05);
    }

    /* Floating Elements Animation */
    .bloom-wrapper .float-gentle {
        animation: float-gentle 6s ease-in-out infinite;
    }

    .bloom-wrapper .float-gentle-delayed {
        animation: float-gentle 6s ease-in-out 2s infinite;
    }

    @keyframes float-gentle {
        0%, 100% {
            transform: translateY(0) rotate(0deg);
        }
        50% {
            transform: translateY(-20px) rotate(5deg);
        }
    }

    /* Petal Decorations */
    .bloom-wrapper .petal {
        position: absolute;
        width: 30px;
        height: 40px;
        background: linear-gradient(135deg, #E8C4C4 0%, #F5E1E1 100%);
        border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
        opacity: 0.6;
    }

    /* Leaf Decorations */
    .bloom-wrapper .leaf {
        position: absolute;
        width: 60px;
        height: 80px;
        background: linear-gradient(135deg, #9CAF88 0%, #B8C9A3 100%);
        border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
        opacity: 0.2;
    }

    /* Testimonial Card */
    .bloom-wrapper .testimonial-card {
        background: linear-gradient(135deg, #ffffff 0%, #FDF8F3 100%);
        border-radius: 32px;
        padding: 48px;
        position: relative;
        overflow: hidden;
    }

    .bloom-wrapper .testimonial-card::before {
        content: '"';
        position: absolute;
        top: 20px;
        left: 30px;
        font-family: 'Cormorant Garamond', serif;
        font-size: 120px;
        color: #9CAF88;
        opacity: 0.15;
        line-height: 1;
    }

    /* Nav Link */
    .bloom-wrapper .nav-link {
        position: relative;
        color: #4A4A4A;
        transition: color 0.3s ease;
        cursor: pointer;
    }

    .bloom-wrapper .nav-link::after {
        content: '';
        position: absolute;
        bottom: -4px;
        left: 0;
        width: 0;
        height: 2px;
        background: #9CAF88;
        border-radius: 2px;
        transition: width 0.3s ease;
    }

    .bloom-wrapper .nav-link:hover {
        color: #9CAF88;
    }

    .bloom-wrapper .nav-link:hover::after {
        width: 100%;
    }

    /* Pill Tag */
    .bloom-wrapper .pill-tag {
        display: inline-block;
        padding: 8px 20px;
        background: rgba(156, 175, 136, 0.1);
        color: #7A9166;
        font-size: 12px;
        font-weight: 500;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        border-radius: 50px;
    }

    /* Team Member */
    .bloom-wrapper .team-member {
        text-align: center;
    }

    .bloom-wrapper .team-member-image {
        width: 200px;
        height: 200px;
        margin: 0 auto 24px;
        border-radius: 50%;
        overflow: hidden;
        border: 4px solid #ffffff;
        box-shadow: 0 10px 40px rgba(156, 175, 136, 0.2);
    }

    /* Gradient Text */
    .bloom-wrapper .gradient-text {
        background: linear-gradient(135deg, #9CAF88 0%, #7A9166 50%, #A7C4BC 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    /* Scroll indicator */
    .bloom-wrapper .scroll-indicator {
        animation: bounce 2s ease-in-out infinite;
    }

    @keyframes bounce {
        0%, 100% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(10px);
        }
    }

    /* AOS Animations */
    .bloom-fade-up {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s ease-out, transform 0.8s ease-out;
    }
    
    .bloom-fade-left {
        opacity: 0;
        transform: translateX(30px);
        transition: opacity 0.8s ease-out, transform 0.8s ease-out;
    }

    .bloom-fade-right {
        opacity: 0;
        transform: translateX(-30px);
        transition: opacity 0.8s ease-out, transform 0.8s ease-out;
    }

    .bloom-animate {
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

export default function BloomWellness({ previewMode = false }: { previewMode?: boolean }) {
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
            entry.target.classList.add('bloom-animate');
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
    <div className="bloom-wrapper relative min-h-screen">
        {/* Decorative Background Elements */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            <div className="leaf float-gentle" style={{ top: '15%', left: '5%', transform: 'rotate(-30deg)' }}></div>
            <div className="leaf float-gentle-delayed" style={{ top: '60%', right: '8%', transform: 'rotate(45deg)' }}></div>
            <div className="petal float-gentle" style={{ top: '25%', right: '15%', transform: 'rotate(20deg)' }}></div>
            <div className="petal float-gentle-delayed" style={{ top: '70%', left: '10%', transform: 'rotate(-15deg)' }}></div>
        </div>

        {/* Navigation */}
        <nav 
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                scrolled ? 'bg-[#FDF8F3]/95 backdrop-blur-md shadow-sm' : 'bg-[#FDF8F3]/90 backdrop-blur-md'
            }`}
            style={{ top: previewMode ? '64px' : '0' }}
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <a onClick={() => scrollToSection('top')} className="flex items-center gap-3 cursor-pointer">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#9CAF88] to-[#7A9166] rounded-full flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.76 0 3.41-.46 4.85-1.26-1.77-1.29-2.92-3.38-2.92-5.74 0-3.87 3.13-7 7-7 .34 0 .67.03 1 .08C20.14 4.89 16.39 2 12 2zm0 9c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/>
                            </svg>
                        </div>
                        <div>
                            <span className="font-serif text-2xl text-[#4A4A4A]">Bloom</span>
                            <span className="block text-[10px] tracking-[0.3em] text-[#9CAF88] uppercase -mt-1">Wellness</span>
                        </div>
                    </a>

                    {/* Desktop Nav */}
                    <div className="hidden lg:flex items-center gap-10">
                        {['Treatments', 'About', 'Team', 'Testimonials', 'Contact'].map((item) => (
                            <a 
                                key={item} 
                                onClick={() => scrollToSection(item.toLowerCase() === 'team' ? 'team' : item.toLowerCase())} 
                                className="nav-link text-sm"
                            >
                                {item === 'Team' ? 'Our Team' : item === 'Testimonials' ? 'Stories' : item}
                            </a>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="hidden lg:block">
                        <a onClick={() => scrollToSection('booking')} className="btn-bloom text-sm">
                            Book Now
                            <Calendar className="w-4 h-4" />
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button onClick={toggleMobileMenu} className="lg:hidden w-10 h-10 flex items-center justify-center text-[#4A4A4A]">
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>
        </nav>

        {/* Mobile Menu Overlay */}
        <div 
            className={`fixed inset-0 bg-[#FDF8F3] z-40 transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col justify-center items-center ${
                mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
            style={{ top: previewMode ? '64px' : '0' }}
        >
            <div className="flex flex-col items-center gap-8 mb-12">
                {['Treatments', 'About', 'Team', 'Testimonials', 'Contact'].map((item) => (
                    <a 
                        key={item}
                        onClick={() => scrollToSection(item.toLowerCase() === 'team' ? 'team' : item.toLowerCase())}
                        className="font-serif text-3xl text-[#4A4A4A] hover:text-[#9CAF88] transition-colors cursor-pointer"
                    >
                        {item === 'Team' ? 'Our Team' : item === 'Testimonials' ? 'Stories' : item}
                    </a>
                ))}
            </div>
            
            <a onClick={() => scrollToSection('booking')} className="btn-bloom text-sm px-10 py-4">
                Book a Treatment
                <ArrowRight className="w-4 h-4" />
            </a>
        </div>

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
            {/* Background Blobs */}
            <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-[#F5E1E1]/40 blob-shape pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#B8C9A3]/30 blob-shape-2 pointer-events-none"></div>
            
            <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left Content */}
                    <div>
                        <span ref={addAosRef} className="bloom-fade-up pill-tag mb-6">Dublin's Premier Wellness Sanctuary</span>
                        
                        <h1 ref={addAosRef} className="bloom-fade-up text-5xl md:text-6xl lg:text-7xl font-serif text-[#4A4A4A] mb-6 leading-tight" style={{ transitionDelay: '100ms' }}>
                            Nurture Your Mind, Body & <br />
                            <span className="gradient-text italic">Soul</span>
                        </h1>
                        
                        <p ref={addAosRef} className="bloom-fade-up text-lg text-[#7A7A7A] mb-10 max-w-lg leading-relaxed" style={{ transitionDelay: '200ms' }}>
                            Escape to a haven of tranquility in the heart of Dublin. Our holistic treatments blend ancient wisdom with modern wellness practices to restore your natural balance.
                        </p>
                        
                        <div ref={addAosRef} className="bloom-fade-up flex flex-wrap gap-4" style={{ transitionDelay: '300ms' }}>
                            <a onClick={() => scrollToSection('booking')} className="btn-bloom">
                                Book a Treatment
                                <ArrowRight className="w-4 h-4" />
                            </a>
                            <a onClick={() => scrollToSection('treatments')} className="btn-bloom-outline">
                                Explore Services
                            </a>
                        </div>

                        {/* Trust Indicators */}
                        <div ref={addAosRef} className="bloom-fade-up flex items-center gap-8 mt-12 pt-8 border-t border-[#9CAF88]/20" style={{ transitionDelay: '400ms' }}>
                            <div className="text-center">
                                <span className="block text-3xl font-serif text-[#9CAF88]">2,500+</span>
                                <span className="text-xs text-[#7A7A7A] uppercase tracking-wider">Happy Guests</span>
                            </div>
                            <div className="w-px h-12 bg-[#9CAF88]/20"></div>
                            <div className="text-center">
                                <span className="block text-3xl font-serif text-[#9CAF88]">4.9</span>
                                <span className="text-xs text-[#7A7A7A] uppercase tracking-wider">Google Rating</span>
                            </div>
                            <div className="w-px h-12 bg-[#9CAF88]/20"></div>
                            <div className="text-center">
                                <span className="block text-3xl font-serif text-[#9CAF88]">15+</span>
                                <span className="text-xs text-[#7A7A7A] uppercase tracking-wider">Treatments</span>
                            </div>
                        </div>
                    </div>

                    {/* Right - Hero Image */}
                    <div ref={addAosRef} className="bloom-fade-left relative" style={{ transitionDelay: '200ms' }}>
                        <div className="organic-image">
                            <img src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&h=1000&fit=crop&q=80" 
                                 alt="Relaxing spa treatment" 
                                 className="w-full h-[600px] object-cover" />
                        </div>
                        
                        {/* Floating Card */}
                        <div className="absolute -bottom-8 -left-8 bg-white rounded-2xl p-6 shadow-xl max-w-[240px] float-gentle">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 bg-[#E8C4C4] rounded-full flex items-center justify-center">
                                    <Heart className="w-5 h-5 text-[#D4A5A5]" />
                                </div>
                                <span className="text-sm font-medium text-[#4A4A4A]">Self-Care First</span>
                            </div>
                            <p className="text-xs text-[#7A7A7A]">Award-winning treatments designed for your complete wellbeing</p>
                        </div>

                        {/* Decorative Element */}
                        <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#EDE6F5] rounded-full blur-2xl"></div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 scroll-indicator">
                <ChevronDown className="w-6 h-6 text-[#9CAF88]" />
            </div>
        </section>

        {/* Wave Divider */}
        <div className="wave-divider bg-[#FDF8F3]">
            <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                <path d="M0 50C240 100 480 0 720 50C960 100 1200 0 1440 50V100H0V50Z" fill="white"/>
            </svg>
        </div>

        {/* Treatments Section */}
        <section id="treatments" className="bg-white py-24">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                {/* Section Header */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span ref={addAosRef} className="bloom-fade-up pill-tag mb-4">Our Treatments</span>
                    <h2 ref={addAosRef} className="bloom-fade-up text-4xl md:text-5xl font-serif text-[#4A4A4A] mb-6" style={{ transitionDelay: '100ms' }}>
                        Discover Your Path to Wellness
                    </h2>
                    <p ref={addAosRef} className="bloom-fade-up text-[#7A7A7A]" style={{ transitionDelay: '200ms' }}>
                        Each treatment is thoughtfully crafted to address your unique needs, combining therapeutic touch with natural ingredients.
                    </p>
                </div>

                {/* Treatment Categories */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        { icon: Flower2, title: "Signature Massage", desc: "Our signature full-body massage combines Swedish and deep tissue techniques with aromatherapy oils chosen for your needs.", price: "From €95", color: "#F5E1E1", iconColor: "#D4A5A5" },
                        { icon: Sparkles, title: "Facial Rituals", desc: "Luxurious facials using organic botanicals to cleanse, nourish, and rejuvenate your skin to its natural radiance.", price: "From €85", color: "#EDE6F5", iconColor: "#D4C4E8" },
                        { icon: Leaf, title: "Body Treatments", desc: "Detoxifying wraps, exfoliating scrubs, and hydrating treatments to revitalise and restore your body.", price: "From €110", color: "#B8C9A3", iconColor: "#7A9166", opacity: 0.5 },
                        { icon: Wind, title: "Holistic Therapies", desc: "Reiki, reflexology, and energy healing sessions to restore balance and promote inner harmony.", price: "From €75", color: "#A7C4BC", iconColor: "#A7C4BC", opacity: 0.3 },
                        { icon: Gem, title: "Couples Retreat", desc: "Share a blissful experience together with side-by-side treatments in our couples suite with champagne.", price: "From €195", color: "#C9A9A6", iconColor: "#C9A9A6", opacity: 0.3 },
                        { icon: Sun, title: "Wellness Packages", desc: "Half-day and full-day spa experiences combining multiple treatments for ultimate relaxation.", price: "From €245", color: "#E5DDD3", iconColor: "#7A7A7A", opacity: 0.5 }
                    ].map((item, idx) => (
                        <div key={idx} ref={addAosRef} className="bloom-fade-up bloom-card group" style={{ transitionDelay: `${(idx % 3) * 100}ms` }}>
                            <div 
                                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                                style={{ backgroundColor: item.opacity ? `rgba(${parseInt(item.color.slice(1,3),16)}, ${parseInt(item.color.slice(3,5),16)}, ${parseInt(item.color.slice(5,7),16)}, ${item.opacity})` : item.color }}
                            >
                                <item.icon className="w-8 h-8" style={{ color: item.iconColor }} />
                            </div>
                            <h3 className="text-2xl font-serif text-[#4A4A4A] mb-3">{item.title}</h3>
                            <p className="text-[#7A7A7A] mb-6 text-sm leading-relaxed">
                                {item.desc}
                            </p>
                            <div className="flex items-center justify-between">
                                <span className="text-[#9CAF88] font-medium">{item.price}</span>
                                <a className="text-[#9CAF88] hover:text-[#7A9166] transition-colors flex items-center gap-2 text-sm cursor-pointer">
                                    Learn more <ArrowRight className="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View All CTA */}
                <div ref={addAosRef} className="bloom-fade-up text-center mt-12">
                    <a className="btn-bloom-outline cursor-pointer">
                        View Full Treatment Menu
                        <BookOpen className="w-4 h-4" />
                    </a>
                </div>
            </div>
        </section>

        {/* Wave Divider (Top) */}
        <div className="wave-divider-top bg-[#B8C9A3]/20">
            <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                <path d="M0 50C240 100 480 0 720 50C960 100 1200 0 1440 50V100H0V50Z" fill="white"/>
            </svg>
        </div>

        {/* About Section */}
        <section id="about" className="bg-[#B8C9A3]/20 py-24 relative overflow-hidden">
            {/* Decorative Blobs */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#EDE6F5]/30 blob-shape-2 -translate-y-1/2 pointer-events-none"></div>
            
            <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left - Images */}
                    <div ref={addAosRef} className="bloom-fade-right relative">
                        <div className="organic-image">
                            <img src="https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=600&h=700&fit=crop&q=80" 
                                 alt="Bloom Wellness interior" 
                                 className="w-full h-[500px] object-cover" />
                        </div>
                        
                        {/* Floating Secondary Image */}
                        <div className="absolute -bottom-12 -right-12 w-64 h-64 organic-image shadow-2xl">
                            <img src="https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=400&h=400&fit=crop&q=80" 
                                 alt="Natural spa products" 
                                 className="w-full h-full object-cover" />
                        </div>

                        {/* Stats Card */}
                        <div className="absolute top-8 -left-8 bg-white rounded-2xl p-6 shadow-xl">
                            <span className="block text-4xl font-serif text-[#9CAF88] mb-1">8+</span>
                            <span className="text-sm text-[#7A7A7A]">Years of Excellence</span>
                        </div>
                    </div>

                    {/* Right - Content */}
                    <div className="lg:pl-8">
                        <span ref={addAosRef} className="bloom-fade-up pill-tag mb-4">Our Story</span>
                        
                        <h2 ref={addAosRef} className="bloom-fade-up text-4xl md:text-5xl font-serif text-[#4A4A4A] mb-6 leading-tight" style={{ transitionDelay: '100ms' }}>
                            A Sanctuary Born from <span className="italic text-[#9CAF88]">Passion</span>
                        </h2>
                        
                        <p ref={addAosRef} className="bloom-fade-up text-[#7A7A7A] mb-6 leading-relaxed" style={{ transitionDelay: '200ms' }}>
                            Founded in 2016 by wellness practitioner Aoife Brennan, Bloom Wellness was born from a simple belief: that everyone deserves a space to pause, breathe, and reconnect with themselves.
                        </p>
                        
                        <p ref={addAosRef} className="bloom-fade-up text-[#7A7A7A] mb-8 leading-relaxed" style={{ transitionDelay: '300ms' }}>
                            Nestled in a beautifully restored Georgian townhouse on Merrion Square, our spa combines the elegance of old Dublin with contemporary wellness practices. Every detail—from our organic Irish skincare products to our sustainably sourced linens—reflects our commitment to mindful luxury.
                        </p>

                        {/* Values */}
                        <div ref={addAosRef} className="bloom-fade-up grid grid-cols-2 gap-6 mb-8" style={{ transitionDelay: '400ms' }}>
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 bg-[#F5E1E1] rounded-full flex items-center justify-center flex-shrink-0">
                                    <Leaf className="w-5 h-5 text-[#D4A5A5]" />
                                </div>
                                <div>
                                    <h4 className="font-medium text-[#4A4A4A] mb-1">Organic & Natural</h4>
                                    <p className="text-xs text-[#7A7A7A]">100% natural products</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 bg-[#B8C9A3] rounded-full flex items-center justify-center flex-shrink-0">
                                    <HeartHandshake className="w-5 h-5 text-[#7A9166]" />
                                </div>
                                <div>
                                    <h4 className="font-medium text-[#4A4A4A] mb-1">Holistic Approach</h4>
                                    <p className="text-xs text-[#7A7A7A]">Mind, body & spirit</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 bg-[#EDE6F5] rounded-full flex items-center justify-center flex-shrink-0">
                                    <ShieldCheck className="w-5 h-5 text-[#D4C4E8]" />
                                </div>
                                <div>
                                    <h4 className="font-medium text-[#4A4A4A] mb-1">Certified Therapists</h4>
                                    <p className="text-xs text-[#7A7A7A]">Expert trained team</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 bg-[#A7C4BC]/30 rounded-full flex items-center justify-center flex-shrink-0">
                                    <Recycle className="w-5 h-5 text-[#A7C4BC]" />
                                </div>
                                <div>
                                    <h4 className="font-medium text-[#4A4A4A] mb-1">Eco-Conscious</h4>
                                    <p className="text-xs text-[#7A7A7A]">Sustainable practices</p>
                                </div>
                            </div>
                        </div>

                        <div ref={addAosRef} className="bloom-fade-up" style={{ transitionDelay: '500ms' }}>
                            <a onClick={() => scrollToSection('team')} className="btn-bloom cursor-pointer">
                                Meet Our Team
                                <Users className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Wave Divider */}
        <div className="wave-divider bg-[#B8C9A3]/20">
            <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                <path d="M0 50C240 100 480 0 720 50C960 100 1200 0 1440 50V100H0V50Z" fill="#FDF8F3"/>
            </svg>
        </div>

        {/* Featured Treatment */}
        <section className="bg-[#FDF8F3] py-24 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left - Content */}
                    <div>
                        <span ref={addAosRef} className="bloom-fade-up pill-tag mb-4">Seasonal Special</span>
                        
                        <h2 ref={addAosRef} className="bloom-fade-up text-4xl md:text-5xl font-serif text-[#4A4A4A] mb-6 leading-tight" style={{ transitionDelay: '100ms' }}>
                            Winter Warming Ritual
                        </h2>
                        
                        <p ref={addAosRef} className="bloom-fade-up text-[#7A7A7A] mb-8 leading-relaxed" style={{ transitionDelay: '200ms' }}>
                            Escape the Dublin chill with our exclusive winter treatment. Beginning with a warming ginger and cinnamon body wrap, followed by a hot stone massage using volcanic basalt stones, and finishing with a nourishing facial using winter botanical extracts.
                        </p>

                        {/* Treatment Details */}
                        <div ref={addAosRef} className="bloom-fade-up bg-white rounded-2xl p-6 mb-8" style={{ transitionDelay: '300ms' }}>
                            <div className="grid grid-cols-3 gap-4 text-center">
                                <div>
                                    <Clock className="w-6 h-6 mx-auto mb-2 text-[#9CAF88]" />
                                    <span className="block text-lg font-serif text-[#4A4A4A]">120 min</span>
                                    <span className="text-xs text-[#7A7A7A]">Duration</span>
                                </div>
                                <div>
                                    <Euro className="w-6 h-6 mx-auto mb-2 text-[#9CAF88]" />
                                    <span className="block text-lg font-serif text-[#4A4A4A]">€185</span>
                                    <span className="text-xs text-[#7A7A7A]">Price</span>
                                </div>
                                <div>
                                    <Gift className="w-6 h-6 mx-auto mb-2 text-[#9CAF88]" />
                                    <span className="block text-lg font-serif text-[#4A4A4A]">Tea</span>
                                    <span className="text-xs text-[#7A7A7A]">Included</span>
                                </div>
                            </div>
                        </div>

                        <div ref={addAosRef} className="bloom-fade-up flex flex-wrap gap-4" style={{ transitionDelay: '400ms' }}>
                            <a onClick={() => scrollToSection('booking')} className="btn-bloom cursor-pointer">
                                Book This Treatment
                                <Calendar className="w-4 h-4" />
                            </a>
                            <a className="btn-bloom-outline cursor-pointer">
                                Gift Voucher
                            </a>
                        </div>
                    </div>

                    {/* Right - Image */}
                    <div ref={addAosRef} className="bloom-fade-left relative">
                        <div className="organic-image">
                            <img src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&h=600&fit=crop&q=80" 
                                 alt="Hot stone massage treatment" 
                                 className="w-full h-[500px] object-cover" />
                        </div>
                        
                        {/* Price Tag */}
                        <div className="absolute top-6 right-6 bg-[#9CAF88] text-white px-6 py-3 rounded-full">
                            <span className="text-sm font-medium">Save €45</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Team Section */}
        <section id="team" className="bg-white py-24">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                {/* Section Header */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span ref={addAosRef} className="bloom-fade-up pill-tag mb-4">Our Team</span>
                    <h2 ref={addAosRef} className="bloom-fade-up text-4xl md:text-5xl font-serif text-[#4A4A4A] mb-6" style={{ transitionDelay: '100ms' }}>
                        Caring Hands, Healing Hearts
                    </h2>
                    <p ref={addAosRef} className="bloom-fade-up text-[#7A7A7A]" style={{ transitionDelay: '200ms' }}>
                        Our team of certified therapists brings decades of combined experience and a genuine passion for wellness.
                    </p>
                </div>

                {/* Team Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        { name: "Aoife Brennan", role: "Founder & Director", desc: "15+ years in holistic wellness, certified in aromatherapy and Reiki master.", img: "1594744803329-e58b31de8bf5" },
                        { name: "Siobhán Kelly", role: "Senior Therapist", desc: "Specialises in deep tissue massage and sports therapy.", img: "1580489944761-15a19d654956" },
                        { name: "Emma O'Brien", role: "Facial Specialist", desc: "Expert in organic facials and advanced skincare treatments.", img: "1607746882042-944635dfe10e" },
                        { name: "Fiona Murphy", role: "Holistic Therapist", desc: "Reflexology and energy healing practitioner with 10 years experience.", img: "1438761681033-6461ffad8d80" }
                    ].map((member, idx) => (
                        <div key={idx} ref={addAosRef} className="bloom-fade-up team-member" style={{ transitionDelay: `${(idx + 1) * 100}ms` }}>
                            <div className="team-member-image">
                                <img src={`https://images.unsplash.com/photo-${member.img}?w=400&h=400&fit=crop&q=80`} 
                                     alt={member.name} 
                                     className="w-full h-full object-cover" />
                            </div>
                            <h3 className="text-xl font-serif text-[#4A4A4A] mb-1">{member.name}</h3>
                            <p className="text-sm text-[#9CAF88] mb-3">{member.role}</p>
                            <p className="text-xs text-[#7A7A7A] leading-relaxed">{member.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="bg-[#FDF8F3] py-24 relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#F5E1E1]/30 blob-shape pointer-events-none"></div>
            
            <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
                {/* Section Header */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span ref={addAosRef} className="bloom-fade-up pill-tag mb-4">Guest Stories</span>
                    <h2 ref={addAosRef} className="bloom-fade-up text-4xl md:text-5xl font-serif text-[#4A4A4A] mb-6" style={{ transitionDelay: '100ms' }}>
                        Words from Our Guests
                    </h2>
                </div>

                {/* Testimonials Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        { text: "The most peaceful experience I've ever had. From the moment I walked in, I felt the stress melt away. Aoife's massage was absolutely divine.", name: "Sarah M.", location: "Dublin 4", img: "1494790108377-be9c29b29330", color: "#B8C9A3" },
                        { text: "My husband and I did the couples retreat for our anniversary. The champagne, the treatments, the ambiance—everything was perfect. Already planning our return!", name: "Claire & David R.", location: "Howth", img: "1534528741775-53994a69daeb", color: "#F5E1E1" },
                        { text: "I've tried many spas in Dublin, but Bloom is in a different league. The attention to detail, the organic products, and Emma's facials have transformed my skin.", name: "Michael T.", location: "Ballsbridge", img: "1507003211169-0a1dd7228f2d", color: "#EDE6F5" }
                    ].map((t, idx) => (
                        <div key={idx} ref={addAosRef} className="bloom-fade-up testimonial-card" style={{ transitionDelay: `${(idx + 1) * 100}ms` }}>
                            <div className="relative z-10">
                                <div className="flex gap-1 mb-4">
                                    {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="w-4 h-4 fill-[#9CAF88] text-[#9CAF88]" />)}
                                </div>
                                <p className="text-[#4A4A4A] mb-6 italic leading-relaxed">"{t.text}"</p>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full overflow-hidden" style={{ backgroundColor: t.color }}>
                                        <img src={`https://images.unsplash.com/photo-${t.img}?w=100&h=100&fit=crop&q=80`} alt="" className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <span className="block font-medium text-[#4A4A4A]">{t.name}</span>
                                        <span className="text-xs text-[#7A7A7A]">{t.location}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* Contact & Booking Section */}
        <section id="contact" className="bg-white py-24">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="grid lg:grid-cols-2 gap-16">
                    {/* Left - Contact Info */}
                    <div>
                        <span ref={addAosRef} className="bloom-fade-up pill-tag mb-4">Visit Us</span>
                        
                        <h2 ref={addAosRef} className="bloom-fade-up text-4xl md:text-5xl font-serif text-[#4A4A4A] mb-6 leading-tight" style={{ transitionDelay: '100ms' }}>
                            Begin Your Wellness Journey
                        </h2>
                        
                        <p ref={addAosRef} className="bloom-fade-up text-[#7A7A7A] mb-10 leading-relaxed" style={{ transitionDelay: '200ms' }}>
                            We'd love to welcome you to Bloom. Whether you have questions about our treatments or want to book your first visit, we're here to help.
                        </p>

                        {/* Contact Details */}
                        <div ref={addAosRef} className="bloom-fade-up space-y-6 mb-10" style={{ transitionDelay: '300ms' }}>
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-[#B8C9A3] rounded-full flex items-center justify-center flex-shrink-0">
                                    <MapPin className="w-5 h-5 text-[#7A9166]" />
                                </div>
                                <div>
                                    <h4 className="font-medium text-[#4A4A4A] mb-1">Location</h4>
                                    <p className="text-[#7A7A7A] text-sm">18 Merrion Square<br />Dublin 2, D02 YT89</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-[#F5E1E1] rounded-full flex items-center justify-center flex-shrink-0">
                                    <Phone className="w-5 h-5 text-[#D4A5A5]" />
                                </div>
                                <div>
                                    <h4 className="font-medium text-[#4A4A4A] mb-1">Phone</h4>
                                    <a href="tel:+35312345678" className="text-[#7A7A7A] text-sm hover:text-[#9CAF88] transition-colors">+353 1 234 5678</a>
                                </div>
                            </div>
                            
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-[#EDE6F5] rounded-full flex items-center justify-center flex-shrink-0">
                                    <Mail className="w-5 h-5 text-[#D4C4E8]" />
                                </div>
                                <div>
                                    <h4 className="font-medium text-[#4A4A4A] mb-1">Email</h4>
                                    <a href="mailto:hello@bloomwellness.ie" className="text-[#7A7A7A] text-sm hover:text-[#9CAF88] transition-colors">hello@bloomwellness.ie</a>
                                </div>
                            </div>
                            
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-[#A7C4BC]/30 rounded-full flex items-center justify-center flex-shrink-0">
                                    <Clock className="w-5 h-5 text-[#A7C4BC]" />
                                </div>
                                <div>
                                    <h4 className="font-medium text-[#4A4A4A] mb-1">Opening Hours</h4>
                                    <p className="text-[#7A7A7A] text-sm">Mon–Fri: 9am – 8pm<br />Sat–Sun: 10am – 6pm</p>
                                </div>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div ref={addAosRef} className="bloom-fade-up flex gap-4" style={{ transitionDelay: '400ms' }}>
                            <a href="#" className="w-10 h-10 bg-[#FDF8F3] rounded-full flex items-center justify-center hover:bg-[#9CAF88] hover:text-white transition-all">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-[#FDF8F3] rounded-full flex items-center justify-center hover:bg-[#9CAF88] hover:text-white transition-all">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-[#FDF8F3] rounded-full flex items-center justify-center hover:bg-[#9CAF88] hover:text-white transition-all">
                                <Linkedin className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Right - Booking Form */}
                    <div id="booking" ref={addAosRef} className="bloom-fade-left bg-[#FDF8F3] rounded-3xl p-8 lg:p-12">
                        <h3 className="text-2xl font-serif text-[#4A4A4A] mb-6">Book an Appointment</h3>
                        
                        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm text-[#7A7A7A] mb-2">First Name</label>
                                    <input type="text" className="w-full px-4 py-3 rounded-xl border border-[#9CAF88]/20 bg-white focus:outline-none focus:border-[#9CAF88] transition-colors" placeholder="Your name" />
                                </div>
                                <div>
                                    <label className="block text-sm text-[#7A7A7A] mb-2">Phone</label>
                                    <input type="tel" className="w-full px-4 py-3 rounded-xl border border-[#9CAF88]/20 bg-white focus:outline-none focus:border-[#9CAF88] transition-colors" placeholder="Your phone" />
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-sm text-[#7A7A7A] mb-2">Email</label>
                                <input type="email" className="w-full px-4 py-3 rounded-xl border border-[#9CAF88]/20 bg-white focus:outline-none focus:border-[#9CAF88] transition-colors" placeholder="your@email.com" />
                            </div>
                            
                            <div>
                                <label className="block text-sm text-[#7A7A7A] mb-2">Treatment</label>
                                <select className="w-full px-4 py-3 rounded-xl border border-[#9CAF88]/20 bg-white focus:outline-none focus:border-[#9CAF88] transition-colors text-[#7A7A7A]">
                                    <option>Select a treatment</option>
                                    <option>Signature Massage (from €95)</option>
                                    <option>Facial Rituals (from €85)</option>
                                    <option>Body Treatments (from €110)</option>
                                    <option>Holistic Therapies (from €75)</option>
                                    <option>Couples Retreat (from €195)</option>
                                    <option>Winter Warming Ritual (€185)</option>
                                </select>
                            </div>
                            
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm text-[#7A7A7A] mb-2">Preferred Date</label>
                                    <input type="date" className="w-full px-4 py-3 rounded-xl border border-[#9CAF88]/20 bg-white focus:outline-none focus:border-[#9CAF88] transition-colors" />
                                </div>
                                <div>
                                    <label className="block text-sm text-[#7A7A7A] mb-2">Preferred Time</label>
                                    <select className="w-full px-4 py-3 rounded-xl border border-[#9CAF88]/20 bg-white focus:outline-none focus:border-[#9CAF88] transition-colors text-[#7A7A7A]">
                                        <option>Morning (9am–12pm)</option>
                                        <option>Afternoon (12pm–4pm)</option>
                                        <option>Evening (4pm–8pm)</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-sm text-[#7A7A7A] mb-2">Special Requests</label>
                                <textarea rows={3} className="w-full px-4 py-3 rounded-xl border border-[#9CAF88]/20 bg-white focus:outline-none focus:border-[#9CAF88] transition-colors resize-none" placeholder="Any allergies, preferences, or special occasions..."></textarea>
                            </div>
                            
                            <button type="submit" className="btn-bloom w-full justify-center">
                                Request Booking
                                <Send className="w-4 h-4" />
                            </button>
                            
                            <p className="text-xs text-[#7A7A7A] text-center">
                                We'll confirm your appointment within 24 hours.
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>

        {/* Newsletter Section */}
        <section className="bg-[#9CAF88] py-16">
            <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
                <h3 ref={addAosRef} className="bloom-fade-up text-3xl font-serif text-white mb-4">Join Our Wellness Circle</h3>
                <p ref={addAosRef} className="bloom-fade-up text-white/80 mb-8" style={{ transitionDelay: '100ms' }}>Subscribe for exclusive offers, wellness tips, and be the first to know about new treatments.</p>
                
                <form ref={addAosRef} className="bloom-fade-up flex flex-col sm:flex-row gap-4 max-w-lg mx-auto" style={{ transitionDelay: '200ms' }} onSubmit={(e) => e.preventDefault()}>
                    <input type="email" placeholder="Enter your email" className="flex-1 px-6 py-4 rounded-full border-2 border-white/20 bg-white/10 text-white placeholder-white/60 focus:outline-none focus:border-white/40 transition-colors" />
                    <button type="submit" className="px-8 py-4 bg-white text-[#9CAF88] rounded-full font-medium hover:bg-[#FDF8F3] transition-colors">
                        Subscribe
                    </button>
                </form>
            </div>
        </section>

        {/* Footer */}
        <footer className="bg-[#F5EDE4] py-16">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div>
                        <a href="#" className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-gradient-to-br from-[#9CAF88] to-[#7A9166] rounded-full flex items-center justify-center">
                                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.76 0 3.41-.46 4.85-1.26-1.77-1.29-2.92-3.38-2.92-5.74 0-3.87 3.13-7 7-7 .34 0 .67.03 1 .08C20.14 4.89 16.39 2 12 2zm0 9c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/>
                                </svg>
                            </div>
                            <div>
                                <span className="font-serif text-xl text-[#4A4A4A]">Bloom Wellness</span>
                            </div>
                        </a>
                        <p className="text-sm text-[#7A7A7A] leading-relaxed">
                            Dublin's sanctuary for holistic wellness, offering transformative treatments in a serene Georgian setting.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-medium text-[#4A4A4A] mb-4">Quick Links</h4>
                        <ul className="space-y-3 text-sm">
                            <li><a href="#treatments" className="text-[#7A7A7A] hover:text-[#9CAF88] transition-colors">Treatments</a></li>
                            <li><a href="#about" className="text-[#7A7A7A] hover:text-[#9CAF88] transition-colors">About Us</a></li>
                            <li><a href="#team" className="text-[#7A7A7A] hover:text-[#9CAF88] transition-colors">Our Team</a></li>
                            <li><a href="#" className="text-[#7A7A7A] hover:text-[#9CAF88] transition-colors">Gift Vouchers</a></li>
                            <li><a href="#contact" className="text-[#7A7A7A] hover:text-[#9CAF88] transition-colors">Contact</a></li>
                        </ul>
                    </div>

                    {/* Treatments */}
                    <div>
                        <h4 className="font-medium text-[#4A4A4A] mb-4">Treatments</h4>
                        <ul className="space-y-3 text-sm">
                            <li><a href="#" className="text-[#7A7A7A] hover:text-[#9CAF88] transition-colors">Massage Therapies</a></li>
                            <li><a href="#" className="text-[#7A7A7A] hover:text-[#9CAF88] transition-colors">Facial Treatments</a></li>
                            <li><a href="#" className="text-[#7A7A7A] hover:text-[#9CAF88] transition-colors">Body Rituals</a></li>
                            <li><a href="#" className="text-[#7A7A7A] hover:text-[#9CAF88] transition-colors">Holistic Healing</a></li>
                            <li><a href="#" className="text-[#7A7A7A] hover:text-[#9CAF88] transition-colors">Packages</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-medium text-[#4A4A4A] mb-4">Get in Touch</h4>
                        <ul className="space-y-3 text-sm text-[#7A7A7A]">
                            <li>18 Merrion Square</li>
                            <li>Dublin 2, D02 YT89</li>
                            <li><a href="tel:+35312345678" className="hover:text-[#9CAF88] transition-colors">+353 1 234 5678</a></li>
                            <li><a href="mailto:hello@bloomwellness.ie" className="hover:text-[#9CAF88] transition-colors">hello@bloomwellness.ie</a></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-[#9CAF88]/10 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-[#7A7A7A]">© 2025 Bloom Wellness Dublin. All rights reserved.</p>
                    <div className="flex gap-6 text-xs text-[#7A7A7A]">
                        <a href="#" className="hover:text-[#9CAF88] transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-[#9CAF88] transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-[#9CAF88] transition-colors">Cancellation Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    </div>
  );
}
