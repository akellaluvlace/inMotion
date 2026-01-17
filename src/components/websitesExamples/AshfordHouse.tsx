'use client';

import React, { useEffect, useState, useRef } from 'react';
import { 
  Menu, 
  X, 
  Calendar, 
  ArrowRight, 
  Users, 
  Maximize, 
  Sparkles, 
  Sun, 
  Flower2, 
  Trees, 
  Tent, 
  Check, 
  Image as ImageIcon, 
  MapPin, 
  Phone, 
  Mail, 
  Instagram, 
  Facebook, 
  Linkedin, 
  Send 
} from 'lucide-react';

// Inject keyframe animations and styles
const injectStyles = () => {
  if (typeof document === 'undefined') return;
  if (document.getElementById('ashford-styles')) return;

  const style = document.createElement('style');
  style.id = 'ashford-styles';
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Great+Vibes&family=Montserrat:wght@300;400;500;600&display=swap');

    .ashford-wrapper * {
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      box-sizing: border-box;
    }

    .ashford-wrapper {
        font-family: 'Montserrat', system-ui, sans-serif;
        background: #FFFFF0;
        color: #36454F;
        line-height: 1.8;
        font-weight: 400;
        overflow-x: hidden;
    }

    .ashford-wrapper ::selection {
        background: #D4A5A5;
        color: #FFFFF0;
    }

    .ashford-wrapper h1, 
    .ashford-wrapper h2, 
    .ashford-wrapper h3, 
    .ashford-wrapper h4 {
        font-family: 'Cormorant Garamond', Georgia, serif;
        font-weight: 400;
        line-height: 1.2;
        color: #36454F;
    }

    .ashford-wrapper .font-script {
        font-family: 'Great Vibes', cursive;
    }
    
    .ashford-wrapper .font-display {
        font-family: 'Cormorant Garamond', Georgia, serif;
    }

    /* Elegant Divider */
    .ashford-wrapper .elegant-divider {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 20px;
    }

    .ashford-wrapper .elegant-divider::before,
    .ashford-wrapper .elegant-divider::after {
        content: '';
        width: 80px;
        height: 1px;
        background: linear-gradient(90deg, transparent, #C9A962, transparent);
    }

    /* Button Styles */
    .ashford-wrapper .btn-elegant-outline {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
        padding: 16px 38px;
        background: transparent;
        color: #36454F;
        font-family: 'Montserrat', sans-serif;
        font-size: 11px;
        font-weight: 600;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        border: 1px solid #36454F;
        transition: all 0.4s ease;
        cursor: pointer;
    }

    .ashford-wrapper .btn-elegant-outline:hover {
        background: #36454F;
        color: #FFFFF0;
    }

    .ashford-wrapper .btn-gold {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
        padding: 18px 40px;
        background: linear-gradient(135deg, #C9A962 0%, #D4BC7E 100%);
        color: #36454F;
        font-family: 'Montserrat', sans-serif;
        font-size: 11px;
        font-weight: 600;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        border: none;
        transition: all 0.4s ease;
        cursor: pointer;
    }

    .ashford-wrapper .btn-gold:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 30px rgba(201, 169, 98, 0.3);
    }

    /* Image Reveal Animation */
    .ashford-wrapper .image-elegant {
        position: relative;
        overflow: hidden;
    }

    .ashford-wrapper .image-elegant::after {
        content: '';
        position: absolute;
        top: 10px;
        left: 10px;
        right: 10px;
        bottom: 10px;
        border: 1px solid rgba(201, 169, 98, 0.5);
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.5s ease;
    }

    .ashford-wrapper .image-elegant:hover::after {
        opacity: 1;
    }

    .ashford-wrapper .image-elegant img {
        transition: transform 0.8s ease;
    }

    .ashford-wrapper .image-elegant:hover img {
        transform: scale(1.03);
    }

    /* Card Styles */
    .ashford-wrapper .venue-card {
        background: #FFFFF0;
        padding: 0;
        transition: all 0.5s ease;
        position: relative;
    }

    .ashford-wrapper .venue-card::before {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 3px;
        background: linear-gradient(90deg, #D4A5A5, #C9A962);
        transform: scaleX(0);
        transition: transform 0.5s ease;
    }

    .ashford-wrapper .venue-card:hover::before {
        transform: scaleX(1);
    }

    .ashford-wrapper .venue-card:hover {
        box-shadow: 0 30px 60px rgba(54, 69, 79, 0.1);
    }

    /* Testimonial Style */
    .ashford-wrapper .testimonial-elegant {
        position: relative;
        padding: 30px;
        background: linear-gradient(135deg, #F7E7CE 0%, #FBF3E4 100%);
    }

    @media (min-width: 768px) {
        .ashford-wrapper .testimonial-elegant {
            padding: 50px;
        }
    }

    .ashford-wrapper .testimonial-elegant::before {
        content: '"';
        position: absolute;
        top: 20px;
        left: 20px;
        font-family: 'Cormorant Garamond', serif;
        font-size: 80px;
        color: #C9A962;
        opacity: 0.3;
        line-height: 1;
    }

    @media (min-width: 768px) {
        .ashford-wrapper .testimonial-elegant::before {
            top: 20px;
            left: 40px;
            font-size: 120px;
        }
    }

    /* Nav Link */
    .ashford-wrapper .nav-link-elegant {
        position: relative;
        color: #36454F;
        font-size: 11px;
        font-weight: 600;
        letter-spacing: 0.15em;
        text-transform: uppercase;
        transition: color 0.3s ease;
        cursor: pointer;
    }

    .ashford-wrapper .nav-link-elegant::after {
        content: '';
        position: absolute;
        bottom: -4px;
        left: 50%;
        width: 0;
        height: 1px;
        background: #C9A962;
        transition: all 0.3s ease;
        transform: translateX(-50%);
    }

    .ashford-wrapper .nav-link-elegant:hover {
        color: #C9A962;
    }

    .ashford-wrapper .nav-link-elegant:hover::after {
        width: 100%;
    }

    /* Gallery Grid */
    .ashford-wrapper .gallery-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 15px;
    }

    @media (min-width: 480px) {
        .ashford-wrapper .gallery-grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media (min-width: 768px) {
        .ashford-wrapper .gallery-grid {
            grid-template-columns: repeat(4, 1fr);
            grid-template-rows: repeat(2, 250px);
        }
        .ashford-wrapper .gallery-grid .gallery-item:nth-child(1) {
            grid-column: span 2;
            grid-row: span 2;
        }
    }

    /* Decorative Elements */
    .ashford-wrapper .flourish {
        width: 200px;
        height: 30px;
        background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 30'%3E%3Cpath d='M0 15 Q50 0 100 15 Q150 30 200 15' stroke='%23C9A962' fill='none' stroke-width='1'/%3E%3C/svg%3E") no-repeat center;
    }

    /* Form Styling */
    .ashford-wrapper .form-elegant input,
    .ashford-wrapper .form-elegant select,
    .ashford-wrapper .form-elegant textarea {
        width: 100%;
        padding: 16px 20px;
        background: #FFFFF0;
        border: 1px solid #E8D4B8;
        font-family: 'Montserrat', sans-serif;
        font-size: 14px;
        color: #36454F;
        transition: all 0.3s ease;
        border-radius: 0;
        -webkit-appearance: none;
        appearance: none;
    }

    .ashford-wrapper .form-elegant select {
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
        background-position: right 0.5rem center;
        background-repeat: no-repeat;
        background-size: 1.5em 1.5em;
        padding-right: 2.5rem;
    }

    .ashford-wrapper .form-elegant input:focus,
    .ashford-wrapper .form-elegant select:focus,
    .ashford-wrapper .form-elegant textarea:focus {
        outline: none;
        border-color: #C9A962;
        box-shadow: 0 0 0 3px rgba(201, 169, 98, 0.1);
    }

    .ashford-wrapper .form-elegant label {
        display: block;
        font-size: 11px;
        font-weight: 600;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: #8B8378;
        margin-bottom: 8px;
    }

    /* AOS Replacement Classes */
    .ashford-fade-up {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s ease-out, transform 0.8s ease-out;
    }
    
    .ashford-fade-right {
        opacity: 0;
        transform: translateX(-30px);
        transition: opacity 0.8s ease-out, transform 0.8s ease-out;
    }

    .ashford-fade-left {
        opacity: 0;
        transform: translateX(30px);
        transition: opacity 0.8s ease-out, transform 0.8s ease-out;
    }

    .ashford-animate {
        opacity: 1;
        transform: translate(0);
    }
    
    /* Mobile Menu Transition */
    .mobile-menu-enter {
        transform: translateX(100%);
    }
    .mobile-menu-enter-active {
        transform: translateX(0);
        transition: transform 500ms ease-in-out;
    }
    .mobile-menu-exit {
        transform: translateX(0);
    }
    .mobile-menu-exit-active {
        transform: translateX(100%);
        transition: transform 500ms ease-in-out;
    }
  `;
  document.head.appendChild(style);
};

export default function AshfordHouse({ previewMode = false }: { previewMode?: boolean }) {
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

  // AOS animation observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('ashford-animate');
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
    <div className="ashford-wrapper relative">
      {/* Navigation */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 border-b border-transparent transition-all duration-300 ${
            scrolled ? 'bg-[#FFFFF0]/95 backdrop-blur-sm shadow-md border-b-[#C9A962]/20' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Mobile Menu Button */}
            <button 
              onClick={toggleMobileMenu}
              className="lg:hidden w-12 h-12 flex items-center justify-start text-[#36454F] z-50 relative -ml-2 focus:outline-none"
              aria-label="Open Menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Logo */}
            <a href="#" className="text-center absolute left-1/2 transform -translate-x-1/2 lg:static lg:transform-none lg:left-0">
              <span className="block font-script text-2xl lg:text-3xl text-[#C9A962]">Ashford House</span>
              <span className="block text-[8px] lg:text-[9px] tracking-[0.3em] lg:tracking-[0.4em] text-[#36454F] uppercase mt-1">Estate · Ireland</span>
            </a>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-10">
              <a onClick={() => scrollToSection('story')} className="nav-link-elegant">Our Story</a>
              <a onClick={() => scrollToSection('venues')} className="nav-link-elegant">Venues</a>
              <a onClick={() => scrollToSection('weddings')} className="nav-link-elegant">Weddings</a>
              <a onClick={() => scrollToSection('gallery')} className="nav-link-elegant">Gallery</a>
              <a onClick={() => scrollToSection('contact')} className="nav-link-elegant">Enquire</a>
            </div>

            {/* CTA (Desktop) */}
            <div className="hidden lg:block">
              <a onClick={() => scrollToSection('contact')} className="btn-gold text-[10px]">
                Book a Viewing
              </a>
            </div>

            {/* Mobile CTA Icon */}
            <a onClick={() => scrollToSection('contact')} className="lg:hidden text-[#C9A962] p-2 -mr-2 cursor-pointer" aria-label="Book a Viewing">
              <Calendar className="w-5 h-5" />
            </a>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-[#FFFFF0] z-[60] transform transition-transform duration-500 ease-in-out lg:hidden flex flex-col justify-center items-center ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <button 
            onClick={toggleMobileMenu}
            className="absolute top-6 left-6 text-[#36454F] p-2 focus:outline-none" 
            aria-label="Close Menu"
        >
          <X className="w-8 h-8" />
        </button>
        
        <div className="flex flex-col items-center gap-8 mb-10 w-full px-6 text-center">
          <a onClick={() => scrollToSection('story')} className="text-3xl font-display text-[#36454F] hover:text-[#C9A962] transition-colors cursor-pointer">Our Story</a>
          <a onClick={() => scrollToSection('venues')} className="text-3xl font-display text-[#36454F] hover:text-[#C9A962] transition-colors cursor-pointer">Venues</a>
          <a onClick={() => scrollToSection('weddings')} className="text-3xl font-display text-[#36454F] hover:text-[#C9A962] transition-colors cursor-pointer">Weddings</a>
          <a onClick={() => scrollToSection('gallery')} className="text-3xl font-display text-[#36454F] hover:text-[#C9A962] transition-colors cursor-pointer">Gallery</a>
          <a onClick={() => scrollToSection('contact')} className="text-3xl font-display text-[#36454F] hover:text-[#C9A962] transition-colors cursor-pointer">Contact</a>
        </div>
        
        <a onClick={() => scrollToSection('contact')} className="btn-gold text-[10px] min-w-[200px] cursor-pointer">
          Book a Viewing
        </a>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        {/* Full-bleed Background */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1920&h=1080&fit=crop&q=80"
            alt="Ashford House Estate"
            className="w-full h-full object-cover"
          />

          {/* High Contrast Overlays */}
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#36454F]/80 via-[#36454F]/50 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#36454F]/50 via-transparent to-[#36454F]/50"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24 md:py-32 relative z-10 w-full">
          <div className="max-w-2xl mx-auto lg:mx-0 text-center lg:text-left">
            <span className="font-script text-3xl md:text-4xl text-[#F7E7CE] mb-4 block drop-shadow-md">Where Dreams Begin</span>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display text-white mb-6 leading-[1.1] drop-shadow-lg">
              A Timeless Setting for Your{' '}
              <em className="italic text-[#FBF3E4]">Perfect Day</em>
            </h1>

            <p className="text-base md:text-lg text-white/90 mb-10 leading-relaxed max-w-lg mx-auto lg:mx-0 drop-shadow-md">
              Nestled in 500 acres of pristine Irish countryside, Ashford House Estate offers an unparalleled setting for celebrations of love.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a onClick={() => scrollToSection('contact')} className="btn-gold w-full sm:w-auto justify-center cursor-pointer">
                Arrange a Viewing
                <ArrowRight className="w-4 h-4" />
              </a>
              <a onClick={() => scrollToSection('venues')} className="btn-elegant-outline border-white/60 text-white hover:bg-white hover:text-[#36454F] w-full sm:w-auto justify-center backdrop-blur-sm cursor-pointer">
                Explore Venues
              </a>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
          <span className="block text-white/70 text-[9px] md:text-[10px] tracking-[0.3em] uppercase mb-4 drop-shadow-md">Scroll to Discover</span>
          <div className="w-px h-12 md:h-16 bg-gradient-to-b from-[#C9A962] to-transparent mx-auto"></div>
        </div>
      </section>

      {/* Introduction Section */}
      <section id="story" className="py-16 md:py-32 bg-[#FFFFF0] relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto">
            <div ref={addAosRef} className="ashford-fade-up flourish mx-auto mb-8"></div>
            
            <span ref={addAosRef} className="ashford-fade-up font-script text-2xl md:text-3xl text-[#C9A962] block mb-4">Welcome to</span>
            
            <h2 ref={addAosRef} className="ashford-fade-up text-3xl md:text-5xl lg:text-6xl font-display text-[#36454F] mb-6 md:mb-8" style={{ transitionDelay: '100ms' }}>
              Ashford House Estate
            </h2>
            
            <p ref={addAosRef} className="ashford-fade-up text-[#4A5568] leading-relaxed mb-6 text-sm md:text-base" style={{ transitionDelay: '200ms' }}>
              For over two centuries, Ashford House has been a beacon of elegance in the heart of County Wicklow. Originally built in 1780 for the Earl of Ashford, this Georgian masterpiece has hosted generations of celebrations, from royal visits to intimate family gatherings.
            </p>
            
            <p ref={addAosRef} className="ashford-fade-up text-[#4A5568] leading-relaxed mb-10 text-sm md:text-base" style={{ transitionDelay: '300ms' }}>
              Today, we open our doors to couples seeking a wedding venue that transcends the ordinary—where every detail whispers romance, and every moment becomes a cherished memory.
            </p>

            <div ref={addAosRef} className="ashford-fade-up elegant-divider" style={{ transitionDelay: '400ms' }}>
              <span className="text-[#C9A962]">✦</span>
            </div>
          </div>
        </div>
      </section>

      {/* Venues Section */}
      <section id="venues" className="py-16 md:py-24 bg-[#FBF3E4]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-20">
            <span ref={addAosRef} className="ashford-fade-up font-script text-2xl md:text-3xl text-[#C9A962] block mb-4">Discover</span>
            <h2 ref={addAosRef} className="ashford-fade-up text-3xl md:text-5xl font-display text-[#36454F] mb-6" style={{ transitionDelay: '100ms' }}>
              Our Exceptional Venues
            </h2>
            <p ref={addAosRef} className="ashford-fade-up text-[#4A5568] text-sm md:text-base px-4" style={{ transitionDelay: '200ms' }}>
              From grand ballrooms to intimate garden settings, choose the perfect backdrop for your celebration.
            </p>
          </div>

          {/* Venues Grid */}
          <div className="space-y-16 md:space-y-24">
            {/* Venue 1 */}
            <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
              <div ref={addAosRef} className="ashford-fade-right image-elegant order-1 lg:order-1">
                <img 
                  src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=700&h=500&fit=crop&q=80" 
                  alt="The Grand Ballroom" 
                  className="w-full h-[300px] md:h-[450px] object-cover"
                />
              </div>
              <div ref={addAosRef} className="ashford-fade-left order-2 lg:order-2">
                <span className="font-script text-xl md:text-2xl text-[#C9A962] block mb-2">01</span>
                <h3 className="text-2xl md:text-4xl font-display text-[#36454F] mb-4">The Grand Ballroom</h3>
                <p className="text-[#4A5568] mb-6 leading-relaxed text-sm md:text-base">
                  Our magnificent ballroom, with its soaring 18th-century ceilings, crystal chandeliers, and hand-painted murals, accommodates up to 200 guests for a truly regal celebration.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3 text-[#4A5568] text-xs md:text-sm">
                    <Users className="w-4 h-4 text-[#C9A962] flex-shrink-0" />
                    Capacity: 200 guests seated
                  </li>
                  <li className="flex items-center gap-3 text-[#4A5568] text-xs md:text-sm">
                    <Maximize className="w-4 h-4 text-[#C9A962] flex-shrink-0" />
                    500 square metres
                  </li>
                  <li className="flex items-center gap-3 text-[#4A5568] text-xs md:text-sm">
                    <Sparkles className="w-4 h-4 text-[#C9A962] flex-shrink-0" />
                    Original Georgian features
                  </li>
                </ul>
                <a onClick={() => scrollToSection('contact')} className="btn-elegant-outline text-[10px] w-full md:w-auto justify-center">
                  Enquire About This Venue
                </a>
              </div>
            </div>

            {/* Venue 2 */}
            <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
              <div ref={addAosRef} className="ashford-fade-right order-2 lg:order-1">
                <span className="font-script text-xl md:text-2xl text-[#C9A962] block mb-2">02</span>
                <h3 className="text-2xl md:text-4xl font-display text-[#36454F] mb-4">The Orangery</h3>
                <p className="text-[#4A5568] mb-6 leading-relaxed text-sm md:text-base">
                  A stunning Victorian glass conservatory filled with natural light and surrounded by manicured gardens. Perfect for ceremonies or intimate receptions of up to 80 guests.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3 text-[#4A5568] text-xs md:text-sm">
                    <Users className="w-4 h-4 text-[#C9A962] flex-shrink-0" />
                    Capacity: 80 guests seated
                  </li>
                  <li className="flex items-center gap-3 text-[#4A5568] text-xs md:text-sm">
                    <Sun className="w-4 h-4 text-[#C9A962] flex-shrink-0" />
                    Floor-to-ceiling windows
                  </li>
                  <li className="flex items-center gap-3 text-[#4A5568] text-xs md:text-sm">
                    <Flower2 className="w-4 h-4 text-[#C9A962] flex-shrink-0" />
                    Garden access
                  </li>
                </ul>
                <a onClick={() => scrollToSection('contact')} className="btn-elegant-outline text-[10px] w-full md:w-auto justify-center">
                  Enquire About This Venue
                </a>
              </div>
              <div ref={addAosRef} className="ashford-fade-left image-elegant order-1 lg:order-2">
                <img 
                  src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=700&h=500&fit=crop&q=80" 
                  alt="The Orangery" 
                  className="w-full h-[300px] md:h-[450px] object-cover"
                />
              </div>
            </div>

            {/* Venue 3 */}
            <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
              <div ref={addAosRef} className="ashford-fade-right image-elegant order-1 lg:order-1">
                <img 
                  src="https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=700&h=500&fit=crop&q=80" 
                  alt="The Walled Garden" 
                  className="w-full h-[300px] md:h-[450px] object-cover"
                />
              </div>
              <div ref={addAosRef} className="ashford-fade-left order-2 lg:order-2">
                <span className="font-script text-xl md:text-2xl text-[#C9A962] block mb-2">03</span>
                <h3 className="text-2xl md:text-4xl font-display text-[#36454F] mb-4">The Walled Garden</h3>
                <p className="text-[#4A5568] mb-6 leading-relaxed text-sm md:text-base">
                  An enchanting outdoor ceremony space within our historic walled garden. Ancient stone walls draped in climbing roses create a magical, secret garden atmosphere.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3 text-[#4A5568] text-xs md:text-sm">
                    <Users className="w-4 h-4 text-[#C9A962] flex-shrink-0" />
                    Capacity: 150 guests
                  </li>
                  <li className="flex items-center gap-3 text-[#4A5568] text-xs md:text-sm">
                    <Trees className="w-4 h-4 text-[#C9A962] flex-shrink-0" />
                    Heritage rose garden
                  </li>
                  <li className="flex items-center gap-3 text-[#4A5568] text-xs md:text-sm">
                    <Tent className="w-4 h-4 text-[#C9A962] flex-shrink-0" />
                    Marquee available
                  </li>
                </ul>
                <a onClick={() => scrollToSection('contact')} className="btn-elegant-outline text-[10px] w-full md:w-auto justify-center">
                  Enquire About This Venue
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Parallax Quote Section */}
      <section 
        className="relative py-20 md:py-40" 
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1920&h=800&fit=crop&q=80')",
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover'
        }}
      >
        <div className="absolute inset-0 bg-[#36454F]/70"></div>
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center relative z-10">
          <div ref={addAosRef} className="ashford-fade-up flourish mx-auto mb-6 md:mb-8 opacity-50"></div>
          <blockquote ref={addAosRef} className="ashford-fade-up text-2xl md:text-4xl lg:text-5xl font-display text-white italic leading-relaxed mb-8" style={{ transitionDelay: '100ms' }}>
            "A place where time stands still, and love blossoms eternal"
          </blockquote>
          <cite ref={addAosRef} className="ashford-fade-up text-[#F7E7CE] text-xs md:text-sm tracking-[0.2em] uppercase not-italic" style={{ transitionDelay: '200ms' }}>— Condé Nast Traveller</cite>
        </div>
      </section>

      {/* Wedding Packages Section */}
      <section id="weddings" className="py-16 md:py-24 bg-[#FFFFF0]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
            <span ref={addAosRef} className="ashford-fade-up font-script text-2xl md:text-3xl text-[#C9A962] block mb-4">Celebrate</span>
            <h2 ref={addAosRef} className="ashford-fade-up text-3xl md:text-5xl font-display text-[#36454F] mb-6" style={{ transitionDelay: '100ms' }}>
              Wedding Experiences
            </h2>
            <p ref={addAosRef} className="ashford-fade-up text-[#4A5568] text-sm md:text-base" style={{ transitionDelay: '200ms' }}>
              Every wedding at Ashford House is as unique as the love it celebrates. Our dedicated team crafts bespoke experiences tailored to your vision.
            </p>
          </div>

          {/* Packages Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-0 md:gap-8">
            {/* Package 1 */}
            <div ref={addAosRef} className="ashford-fade-up venue-card bg-white shadow-lg flex flex-col mb-8 md:mb-0" style={{ transitionDelay: '100ms' }}>
              <div className="p-8 md:p-10 text-center border-b border-[#E8D4B8]">
                <span className="font-script text-2xl text-[#C9A962] block mb-2">The</span>
                <h3 className="text-2xl font-display text-[#36454F] mb-4">Intimate Celebration</h3>
                <p className="text-[#4A5568] text-sm">Up to 50 guests</p>
              </div>
              <div className="p-8 md:p-10 flex flex-col flex-grow">
                <ul className="space-y-4 mb-8 flex-grow">
                  <li className="flex items-start gap-3 text-[#4A5568] text-sm">
                    <Check className="w-4 h-4 text-[#C9A962] flex-shrink-0 mt-0.5" />
                    Exclusive use of The Orangery
                  </li>
                  <li className="flex items-start gap-3 text-[#4A5568] text-sm">
                    <Check className="w-4 h-4 text-[#C9A962] flex-shrink-0 mt-0.5" />
                    Champagne reception
                  </li>
                  <li className="flex items-start gap-3 text-[#4A5568] text-sm">
                    <Check className="w-4 h-4 text-[#C9A962] flex-shrink-0 mt-0.5" />
                    Five-course tasting menu
                  </li>
                  <li className="flex items-start gap-3 text-[#4A5568] text-sm">
                    <Check className="w-4 h-4 text-[#C9A962] flex-shrink-0 mt-0.5" />
                    Bridal suite overnight stay
                  </li>
                </ul>
                <div className="text-center mt-auto">
                  <span className="block text-sm text-[#8B8378] mb-2">From</span>
                  <span className="block text-3xl font-display text-[#36454F] mb-6">€15,000</span>
                  <a onClick={() => scrollToSection('contact')} className="btn-elegant-outline text-[10px] w-full justify-center">
                    Request Details
                  </a>
                </div>
              </div>
            </div>

            {/* Package 2 (Featured) */}
            <div ref={addAosRef} className="ashford-fade-up venue-card bg-white shadow-xl relative flex flex-col transform md:-translate-y-4 mb-8 md:mb-0" style={{ transitionDelay: '200ms' }}>
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#C9A962] text-[#36454F] text-[10px] tracking-[0.15em] uppercase font-semibold px-6 py-2 shadow-md z-10">
                Most Popular
              </div>
              <div className="p-8 md:p-10 text-center border-b border-[#E8D4B8] bg-[#FBF3E4]">
                <span className="font-script text-2xl text-[#C9A962] block mb-2">The</span>
                <h3 className="text-2xl font-display text-[#36454F] mb-4">Grand Affair</h3>
                <p className="text-[#4A5568] text-sm">Up to 150 guests</p>
              </div>
              <div className="p-8 md:p-10 flex flex-col flex-grow">
                <ul className="space-y-4 mb-8 flex-grow">
                  <li className="flex items-start gap-3 text-[#4A5568] text-sm">
                    <Check className="w-4 h-4 text-[#C9A962] flex-shrink-0 mt-0.5" />
                    Grand Ballroom & gardens
                  </li>
                  <li className="flex items-start gap-3 text-[#4A5568] text-sm">
                    <Check className="w-4 h-4 text-[#C9A962] flex-shrink-0 mt-0.5" />
                    Premium drinks package
                  </li>
                  <li className="flex items-start gap-3 text-[#4A5568] text-sm">
                    <Check className="w-4 h-4 text-[#C9A962] flex-shrink-0 mt-0.5" />
                    Seven-course banquet
                  </li>
                  <li className="flex items-start gap-3 text-[#4A5568] text-sm">
                    <Check className="w-4 h-4 text-[#C9A962] flex-shrink-0 mt-0.5" />
                    Two nights accommodation
                  </li>
                </ul>
                <div className="text-center mt-auto">
                  <span className="block text-sm text-[#8B8378] mb-2">From</span>
                  <span className="block text-3xl font-display text-[#36454F] mb-6">€35,000</span>
                  <a onClick={() => scrollToSection('contact')} className="btn-gold text-[10px] w-full justify-center">
                    Request Details
                  </a>
                </div>
              </div>
            </div>

            {/* Package 3 */}
            <div ref={addAosRef} className="ashford-fade-up venue-card bg-white shadow-lg flex flex-col md:col-span-2 lg:col-span-1" style={{ transitionDelay: '300ms' }}>
              <div className="p-8 md:p-10 text-center border-b border-[#E8D4B8]">
                <span className="font-script text-2xl text-[#C9A962] block mb-2">The</span>
                <h3 className="text-2xl font-display text-[#36454F] mb-4">Estate Exclusive</h3>
                <p className="text-[#4A5568] text-sm">Up to 200 guests</p>
              </div>
              <div className="p-8 md:p-10 flex flex-col flex-grow">
                <ul className="space-y-4 mb-8 flex-grow">
                  <li className="flex items-start gap-3 text-[#4A5568] text-sm">
                    <Check className="w-4 h-4 text-[#C9A962] flex-shrink-0 mt-0.5" />
                    Full estate exclusivity
                  </li>
                  <li className="flex items-start gap-3 text-[#4A5568] text-sm">
                    <Check className="w-4 h-4 text-[#C9A962] flex-shrink-0 mt-0.5" />
                    Unlimited premium bar
                  </li>
                  <li className="flex items-start gap-3 text-[#4A5568] text-sm">
                    <Check className="w-4 h-4 text-[#C9A962] flex-shrink-0 mt-0.5" />
                    Bespoke menu design
                  </li>
                  <li className="flex items-start gap-3 text-[#4A5568] text-sm">
                    <Check className="w-4 h-4 text-[#C9A962] flex-shrink-0 mt-0.5" />
                    Three nights for 20 guests
                  </li>
                </ul>
                <div className="text-center mt-auto">
                  <span className="block text-sm text-[#8B8378] mb-2">From</span>
                  <span className="block text-3xl font-display text-[#36454F] mb-6">€65,000</span>
                  <a onClick={() => scrollToSection('contact')} className="btn-elegant-outline text-[10px] w-full justify-center">
                    Request Details
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Note */}
          <p ref={addAosRef} className="ashford-fade-up text-center text-[#8B8378] text-xs md:text-sm mt-12 px-4">
            All packages are fully customisable. Contact us to discuss your unique requirements.
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-16 md:py-24 bg-[#FBF3E4]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <span ref={addAosRef} className="ashford-fade-up font-script text-2xl md:text-3xl text-[#C9A962] block mb-4">Memories</span>
            <h2 ref={addAosRef} className="ashford-fade-up text-3xl md:text-5xl font-display text-[#36454F] mb-6" style={{ transitionDelay: '100ms' }}>
              A Glimpse of Magic
            </h2>
          </div>

          {/* Gallery Grid */}
          <div ref={addAosRef} className="ashford-fade-up gallery-grid">
            <div className="gallery-item image-elegant h-64 md:h-auto">
              <img 
                src="https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop&q=80" 
                alt="Wedding ceremony" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="gallery-item image-elegant h-64 md:h-auto">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&q=80" 
                alt="Reception details" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="gallery-item image-elegant h-64 md:h-auto">
              <img 
                src="https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=400&h=300&fit=crop&q=80" 
                alt="Floral arrangements" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="gallery-item image-elegant h-64 md:h-auto">
              <img 
                src="https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=400&h=300&fit=crop&q=80" 
                alt="Estate grounds" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="gallery-item image-elegant h-64 md:h-auto">
              <img 
                src="https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=400&h=300&fit=crop&q=80" 
                alt="Couple portrait" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* View More */}
          <div ref={addAosRef} className="ashford-fade-up text-center mt-12">
            <a onClick={() => {}} className="btn-elegant-outline text-[10px] w-full md:w-auto justify-center cursor-pointer">
              View Full Gallery
              <ImageIcon className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-[#FFFFF0]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <span ref={addAosRef} className="ashford-fade-up font-script text-2xl md:text-3xl text-[#C9A962] block mb-4">Love Stories</span>
            <h2 ref={addAosRef} className="ashford-fade-up text-3xl md:text-5xl font-display text-[#36454F] mb-6" style={{ transitionDelay: '100ms' }}>
              From Our Couples
            </h2>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Testimonial 1 */}
            <div ref={addAosRef} className="ashford-fade-up testimonial-elegant" style={{ transitionDelay: '100ms' }}>
              <div className="relative z-10">
                <p className="text-[#36454F] italic text-base md:text-lg leading-relaxed mb-8">
                  "From the moment we visited Ashford House, we knew it was the one. The team made every detail feel effortless, and our guests are still talking about it two years later. It was truly the wedding of our dreams."
                </p>
                <div className="flex items-center gap-4">
                  <img 
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&q=80" 
                    alt="Sarah & James" 
                    className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover border-2 border-[#C9A962]"
                  />
                  <div>
                    <span className="block font-display text-lg md:text-xl text-[#36454F]">Sarah & James</span>
                    <span className="text-xs md:text-sm text-[#8B8378]">September 2024</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div ref={addAosRef} className="ashford-fade-up testimonial-elegant" style={{ transitionDelay: '200ms' }}>
              <div className="relative z-10">
                <p className="text-[#36454F] italic text-base md:text-lg leading-relaxed mb-8">
                  "The Walled Garden ceremony was absolutely magical—there wasn't a dry eye. The staff anticipated our every need, and the food was exceptional. Ashford House exceeded all expectations."
                </p>
                <div className="flex items-center gap-4">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&q=80" 
                    alt="Emma & Michael" 
                    className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover border-2 border-[#C9A962]"
                  />
                  <div>
                    <span className="block font-display text-lg md:text-xl text-[#36454F]">Emma & Michael</span>
                    <span className="text-xs md:text-sm text-[#8B8378]">June 2024</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Awards & Press Section */}
      <section className="py-16 bg-[#36454F]">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-10">
            <span className="text-[#F7E7CE] text-[10px] md:text-[11px] tracking-[0.2em] uppercase">As Featured In</span>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-6 lg:gap-20">
            <span className="text-lg md:text-xl font-display text-[#F7E7CE]/50 hover:text-[#F7E7CE] transition-colors cursor-default">Vogue</span>
            <span className="text-lg md:text-xl font-display text-[#F7E7CE]/50 hover:text-[#F7E7CE] transition-colors cursor-default">Tatler</span>
            <span className="text-lg md:text-xl font-display text-[#F7E7CE]/50 hover:text-[#F7E7CE] transition-colors cursor-default">Country Life</span>
            <span className="text-lg md:text-xl font-display text-[#F7E7CE]/50 hover:text-[#F7E7CE] transition-colors cursor-default">The Irish Times</span>
            <span className="text-lg md:text-xl font-display text-[#F7E7CE]/50 hover:text-[#F7E7CE] transition-colors cursor-default">Condé Nast</span>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-24 bg-[#FFFFF0]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left - Content */}
            <div className="text-center lg:text-left">
              <span ref={addAosRef} className="ashford-fade-up font-script text-2xl md:text-3xl text-[#C9A962] block mb-4">Begin Your Story</span>
              
              <h2 ref={addAosRef} className="ashford-fade-up text-3xl md:text-5xl font-display text-[#36454F] mb-6" style={{ transitionDelay: '100ms' }}>
                We Would Be Honoured to Host Your Celebration
              </h2>
              
              <p ref={addAosRef} className="ashford-fade-up text-[#4A5568] mb-10 leading-relaxed text-sm md:text-base" style={{ transitionDelay: '200ms' }}>
                To arrange a private viewing of our estate and discuss your wedding vision, please complete the enquiry form or contact our wedding team directly.
              </p>

              {/* Contact Details */}
              <div ref={addAosRef} className="ashford-fade-up space-y-6 mb-10 text-left max-w-md mx-auto lg:mx-0" style={{ transitionDelay: '300ms' }}>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-[#F7E7CE] rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 md:w-5 md:h-5 text-[#C9A962]" />
                  </div>
                  <div>
                    <h4 className="font-display text-base md:text-lg text-[#36454F] mb-1">Location</h4>
                    <p className="text-[#4A5568] text-xs md:text-sm">Ashford House Estate<br />Roundwood, County Wicklow<br />A98 X2Y1, Ireland</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-[#F7E7CE] rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 md:w-5 md:h-5 text-[#C9A962]" />
                  </div>
                  <div>
                    <h4 className="font-display text-base md:text-lg text-[#36454F] mb-1">Telephone</h4>
                    <a href="tel:+353404567890" className="text-[#4A5568] text-xs md:text-sm hover:text-[#C9A962] transition-colors">+353 404 567 890</a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-[#F7E7CE] rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 md:w-5 md:h-5 text-[#C9A962]" />
                  </div>
                  <div>
                    <h4 className="font-display text-base md:text-lg text-[#36454F] mb-1">Email</h4>
                    <a href="mailto:weddings@ashfordhouse.ie" className="text-[#4A5568] text-xs md:text-sm hover:text-[#C9A962] transition-colors">weddings@ashfordhouse.ie</a>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div ref={addAosRef} className="ashford-fade-up flex gap-4 justify-center lg:justify-start" style={{ transitionDelay: '400ms' }}>
                <a href="#" className="w-10 h-10 border border-[#E8D4B8] rounded-full flex items-center justify-center text-[#8B8378] hover:bg-[#C9A962] hover:border-[#C9A962] hover:text-white transition-all">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#" className="w-10 h-10 border border-[#E8D4B8] rounded-full flex items-center justify-center text-[#8B8378] hover:bg-[#C9A962] hover:border-[#C9A962] hover:text-white transition-all">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#" className="w-10 h-10 border border-[#E8D4B8] rounded-full flex items-center justify-center text-[#8B8378] hover:bg-[#C9A962] hover:border-[#C9A962] hover:text-white transition-all">
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Right - Enquiry Form */}
            <div ref={addAosRef} className="ashford-fade-left bg-white p-6 md:p-10 lg:p-12 shadow-lg">
              <h3 className="text-xl md:text-2xl font-display text-[#36454F] mb-6 md:mb-8 text-center">Wedding Enquiry</h3>
              
              <form className="form-elegant space-y-4 md:space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <label>Your Name *</label>
                    <input type="text" placeholder="First & Last Name" />
                  </div>
                  <div>
                    <label>Partner's Name</label>
                    <input type="text" placeholder="First & Last Name" />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <label>Email Address *</label>
                    <input type="email" placeholder="your@email.com" />
                  </div>
                  <div>
                    <label>Phone Number *</label>
                    <input type="tel" placeholder="+353" />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <label>Proposed Wedding Date</label>
                    <input type="date" />
                  </div>
                  <div>
                    <label>Estimated Guests</label>
                    <select>
                      <option>Please select</option>
                      <option>Under 50</option>
                      <option>50 - 100</option>
                      <option>100 - 150</option>
                      <option>150 - 200</option>
                      <option>200+</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label>How did you hear about us?</label>
                  <select>
                    <option>Please select</option>
                    <option>Wedding Magazine</option>
                    <option>Social Media</option>
                    <option>Google Search</option>
                    <option>Recommendation</option>
                    <option>Other</option>
                  </select>
                </div>
                
                <div>
                  <label>Tell us about your vision</label>
                  <textarea rows={4} placeholder="Share your dreams for your special day..."></textarea>
                </div>
                
                <button type="submit" className="btn-gold w-full justify-center">
                  Submit Enquiry
                  <Send className="w-4 h-4" />
                </button>
                
                <p className="text-xs text-[#8B8378] text-center">
                  We respond to all enquiries within 48 hours.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#36454F] py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12">
            {/* Brand */}
            <div className="text-center md:text-left">
              <a href="#" className="block mb-6">
                <span className="block font-script text-3xl text-[#F7E7CE]">Ashford House</span>
                <span className="block text-[9px] tracking-[0.4em] text-[#F7E7CE]/50 uppercase mt-1">Estate · Ireland</span>
              </a>
              <p className="text-sm text-[#F7E7CE]/60 leading-relaxed">
                A historic Georgian estate offering unparalleled luxury for weddings and celebrations in County Wicklow.
              </p>
            </div>

            {/* Quick Links */}
            <div className="text-center md:text-left">
              <h4 className="font-display text-lg text-[#F7E7CE] mb-4">Explore</h4>
              <ul className="space-y-3 text-sm">
                <li><a onClick={() => scrollToSection('story')} className="text-[#F7E7CE]/60 hover:text-[#C9A962] transition-colors cursor-pointer">Our Story</a></li>
                <li><a onClick={() => scrollToSection('venues')} className="text-[#F7E7CE]/60 hover:text-[#C9A962] transition-colors cursor-pointer">Venues</a></li>
                <li><a onClick={() => scrollToSection('weddings')} className="text-[#F7E7CE]/60 hover:text-[#C9A962] transition-colors cursor-pointer">Weddings</a></li>
                <li><a onClick={() => scrollToSection('gallery')} className="text-[#F7E7CE]/60 hover:text-[#C9A962] transition-colors cursor-pointer">Gallery</a></li>
                <li><a href="#" className="text-[#F7E7CE]/60 hover:text-[#C9A962] transition-colors">Accommodation</a></li>
              </ul>
            </div>

            {/* Events */}
            <div className="text-center md:text-left">
              <h4 className="font-display text-lg text-[#F7E7CE] mb-4">Events</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="text-[#F7E7CE]/60 hover:text-[#C9A962] transition-colors">Weddings</a></li>
                <li><a href="#" className="text-[#F7E7CE]/60 hover:text-[#C9A962] transition-colors">Corporate Events</a></li>
                <li><a href="#" className="text-[#F7E7CE]/60 hover:text-[#C9A962] transition-colors">Private Dining</a></li>
                <li><a href="#" className="text-[#F7E7CE]/60 hover:text-[#C9A962] transition-colors">Celebrations</a></li>
                <li><a href="#" className="text-[#F7E7CE]/60 hover:text-[#C9A962] transition-colors">Film & Photography</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div className="text-center md:text-left">
              <h4 className="font-display text-lg text-[#F7E7CE] mb-4">Contact</h4>
              <ul className="space-y-3 text-sm text-[#F7E7CE]/60">
                <li>Roundwood, County Wicklow</li>
                <li>A98 X2Y1, Ireland</li>
                <li><a href="tel:+353404567890" className="hover:text-[#C9A962] transition-colors">+353 404 567 890</a></li>
                <li><a href="mailto:weddings@ashfordhouse.ie" className="hover:text-[#C9A962] transition-colors">weddings@ashfordhouse.ie</a></li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="elegant-divider my-10 opacity-30">
            <span className="text-[#C9A962]">✦</span>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
            <p className="text-xs text-[#F7E7CE]/40">
              © 2025 Ashford House Estate. All rights reserved.
            </p>
            <div className="flex gap-6 text-xs text-[#F7E7CE]/40">
              <a href="#" className="hover:text-[#F7E7CE] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#F7E7CE] transition-colors">Terms & Conditions</a>
              <a href="#" className="hover:text-[#F7E7CE] transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}