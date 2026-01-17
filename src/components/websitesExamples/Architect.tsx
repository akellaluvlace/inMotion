'use client';

import { useEffect, useState, useRef } from 'react';

// Inject keyframe animations and styles
const injectStyles = () => {
  if (typeof document === 'undefined') return;
  if (document.getElementById('architect-styles')) return;

  const style = document.createElement('style');
  style.id = 'architect-styles';
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');

    .architect-wrapper * {
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    .architect-wrapper ::selection {
      background: #0a0a0a;
      color: #ffffff;
    }

    .architect-wrapper h1,
    .architect-wrapper h2,
    .architect-wrapper h3,
    .architect-wrapper h4,
    .architect-wrapper h5,
    .architect-wrapper h6 {
      font-weight: 400;
      letter-spacing: -0.03em;
      line-height: 1.1;
    }

    .link-minimal {
      position: relative;
      display: inline-block;
      text-decoration: none;
    }

    .link-minimal::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 100%;
      height: 1px;
      background: currentColor;
      transform: scaleX(0);
      transform-origin: right;
      transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .link-minimal:hover::after {
      transform: scaleX(1);
      transform-origin: left;
    }

    .image-reveal {
      position: relative;
      overflow: hidden;
      display: block;
    }

    .image-reveal::after {
      content: '';
      position: absolute;
      inset: 0;
      background: #f0f0f0;
      transform: scaleX(1);
      transform-origin: right;
      transition: transform 1.2s cubic-bezier(0.25, 1, 0.5, 1);
      z-index: 20;
    }

    .image-reveal.revealed::after {
      transform: scaleX(0);
    }

    .image-reveal img {
      transition: transform 1.5s cubic-bezier(0.25, 1, 0.5, 1);
      will-change: transform;
    }

    .group:hover .image-reveal img {
      transform: scale(1.05);
    }

    .btn-minimal {
      position: relative;
      display: inline-flex;
      align-items: center;
      gap: 12px;
      padding: 16px 0;
      font-size: 13px;
      font-weight: 500;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      transition: all 0.3s ease;
    }

    .btn-minimal::before {
      content: '';
      position: absolute;
      bottom: 12px;
      left: 0;
      width: 100%;
      height: 1px;
      background: currentColor;
    }

    .btn-minimal:hover {
      gap: 20px;
    }

    .btn-minimal-filled {
      display: inline-flex;
      align-items: center;
      gap: 12px;
      padding: 18px 32px;
      background: #0a0a0a;
      color: #ffffff;
      font-size: 12px;
      font-weight: 500;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .btn-minimal-filled:hover {
      background: #262626;
      gap: 20px;
    }

    .btn-minimal-outline {
      display: inline-flex;
      align-items: center;
      gap: 12px;
      padding: 18px 32px;
      background: transparent;
      color: #0a0a0a;
      font-size: 12px;
      font-weight: 500;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      border: 1px solid #0a0a0a;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .btn-minimal-outline:hover {
      background: #0a0a0a;
      color: #ffffff;
      gap: 20px;
    }

    .index-number {
      font-size: 11px;
      font-weight: 500;
      letter-spacing: 0.2em;
      color: #a3a3a3;
      display: block;
    }

    .nav-link {
      position: relative;
      font-size: 12px;
      font-weight: 500;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: #525252;
      transition: color 0.3s ease;
    }

    .nav-link:hover {
      color: #0a0a0a;
    }

    .page-overlay {
      position: fixed;
      inset: 0;
      background: #0a0a0a;
      z-index: 9999;
      transform: scaleY(1);
      transform-origin: top;
      animation: revealPage 1s cubic-bezier(0.8, 0, 0.2, 1) forwards;
    }

    @keyframes revealPage {
      to {
        transform: scaleY(0);
        transform-origin: top;
      }
    }

    .mobile-menu-architect {
      transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .mobile-nav-link {
      font-size: 2rem;
      font-weight: 300;
      color: #0a0a0a;
      padding: 10px 0;
      border-bottom: 1px solid #f0f0f0;
      display: block;
    }

    .aos-fade-up {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.8s ease-out, transform 0.8s ease-out;
    }

    .aos-fade-up.aos-animate {
      opacity: 1;
      transform: translateY(0);
    }

    .service-item:hover h3 {
      transform: translateX(8px);
    }
  `;
  document.head.appendChild(style);
};

// Arrow icons
const ArrowRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

const ArrowDown = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <polyline points="19 12 12 19 5 12"></polyline>
  </svg>
);

const ArrowUpRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="7" y1="17" x2="17" y2="7"></line>
    <polyline points="7 7 17 7 17 17"></polyline>
  </svg>
);

const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

export default function Architect() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const imageRevealRefs = useRef<(HTMLDivElement | null)[]>([]);
  const aosRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    injectStyles();
  }, []);

  // Handle scroll for nav styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Image reveal observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.3 }
    );

    imageRevealRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  // AOS animation observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -80px 0px' }
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

  const addImageRevealRef = (el: HTMLDivElement | null) => {
    if (el && !imageRevealRefs.current.includes(el)) {
      imageRevealRefs.current.push(el);
    }
  };

  const addAosRef = (el: HTMLElement | null) => {
    if (el && !aosRefs.current.includes(el)) {
      aosRefs.current.push(el);
    }
  };

  return (
    <div className="architect-wrapper" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", background: '#ffffff', color: '#0a0a0a', lineHeight: 1.6, letterSpacing: '-0.01em', overflowX: 'hidden' }}>
      {/* Page Load Overlay */}
      <div className="page-overlay"></div>

      {/* Navigation */}
      <nav 
        className={`fixed w-full z-50 transition-all duration-300 backdrop-blur-md ${
          scrolled ? 'bg-white/95 border-b border-gray-200' : 'bg-white/80 border-b border-transparent'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex items-center justify-between h-20 border-b border-gray-50 transition-all duration-300">
            {/* Logo */}
            <a href="#" className="flex items-center z-50 relative no-underline color-inherit">
              <span className="text-lg tracking-tight font-normal">
                Kavanagh <span className="text-[#a3a3a3]">&</span> Cole
              </span>
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8 lg:gap-12">
              <a onClick={() => scrollToSection('work')} className="nav-link cursor-pointer">Work</a>
              <a onClick={() => scrollToSection('about')} className="nav-link cursor-pointer">About</a>
              <a onClick={() => scrollToSection('services')} className="nav-link cursor-pointer">Services</a>
              <a onClick={() => scrollToSection('contact')} className="nav-link cursor-pointer">Contact</a>
            </div>

            {/* Desktop CTA */}
            <div className="flex items-center gap-6">
              <a 
                onClick={() => scrollToSection('contact')} 
                className="hidden sm:block text-[11px] font-medium tracking-[0.15em] uppercase cursor-pointer transition-colors hover:text-[#a3a3a3]"
              >
                Start a Project
              </a>

              {/* Mobile Menu Button */}
              <button 
                onClick={toggleMobileMenu} 
                className="md:hidden bg-transparent border-none cursor-pointer z-50 relative p-2"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-white z-40 transform transition-transform duration-500 ease-in-out flex flex-col p-6 pt-32 ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col gap-6">
          <a onClick={() => scrollToSection('work')} className="mobile-nav-link cursor-pointer">Work</a>
          <a onClick={() => scrollToSection('about')} className="mobile-nav-link cursor-pointer">About</a>
          <a onClick={() => scrollToSection('services')} className="mobile-nav-link cursor-pointer">Services</a>
          <a onClick={() => scrollToSection('contact')} className="mobile-nav-link cursor-pointer">Contact</a>
        </div>
        <div className="mt-auto pb-12">
          <p className="text-[11px] text-[#a3a3a3] uppercase tracking-[0.2em] mb-4">Get in touch</p>
          <a href="mailto:studio@kavanaghcole.ie" className="text-xl no-underline color-inherit">studio@kavanaghcole.ie</a>
        </div>
      </div>

      {/* Hero Section */}
      <section className="min-h-screen flex items-end pt-24 pb-12 md:pb-24 px-6">
        <div className="max-w-[1400px] mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-12 items-end">
            {/* Left Content */}
            <div className="md:col-span-7">
              <p ref={addAosRef} className="aos-fade-up text-[11px] font-medium tracking-[0.2em] uppercase text-[#a3a3a3] mb-8">
                Architecture & Interior Design
              </p>

              <h1 ref={addAosRef} className="aos-fade-up text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-light leading-[0.95] mb-12 -ml-1">
                Designing spaces<br />
                <span className="text-[#a3a3a3]">that inspire.</span>
              </h1>

              <div ref={addAosRef} className="aos-fade-up flex flex-wrap items-center gap-8">
                <a onClick={() => scrollToSection('work')} className="btn-minimal-filled cursor-pointer w-full sm:w-auto justify-center">
                  View Projects
                  <ArrowRight />
                </a>
                <a onClick={() => scrollToSection('about')} className="btn-minimal cursor-pointer w-full sm:w-auto justify-center">
                  Our Approach
                  <ArrowDown />
                </a>
              </div>
            </div>

            {/* Right - Stats */}
            <div className="md:col-span-5 border-t md:border-t-0 md:border-l border-gray-200 pt-12 md:pt-0 md:pl-12">
              <div ref={addAosRef} className="aos-fade-up grid grid-cols-3 gap-8">
                <div>
                  <div className="text-4xl lg:text-5xl font-light mb-2">25</div>
                  <div className="text-[10px] tracking-[0.1em] uppercase text-[#a3a3a3]">Years</div>
                </div>
                <div>
                  <div className="text-4xl lg:text-5xl font-light mb-2">180</div>
                  <div className="text-[10px] tracking-[0.1em] uppercase text-[#a3a3a3]">Projects</div>
                </div>
                <div>
                  <div className="text-4xl lg:text-5xl font-light mb-2">12</div>
                  <div className="text-[10px] tracking-[0.1em] uppercase text-[#a3a3a3]">Awards</div>
                </div>
              </div>

              <div ref={addAosRef} className="aos-fade-up mt-12 pt-8 border-t border-gray-100">
                <p className="text-[#737373] leading-relaxed max-w-sm">
                  Award-winning Dublin architecture studio specializing in residential, commercial, and cultural spaces. Thoughtful design, timeless execution.
                </p>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div ref={addAosRef} className="aos-fade-up hidden md:flex mt-16 items-center gap-4">
            <div className="w-px h-16 bg-gray-200"></div>
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#a3a3a3]">Scroll</span>
          </div>
        </div>
      </section>

      {/* Featured Image Section */}
      <section className="py-12 md:py-24 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div ref={addAosRef} className="aos-fade-up relative group cursor-pointer">
            <div ref={addImageRevealRef} className="image-reveal aspect-[4/3] md:aspect-[21/9] w-full">
              <img 
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2560&auto=format&fit=crop" 
                alt="Brennan Residence" 
                className="w-full h-full object-cover" 
              />
            </div>
            
            {/* Caption - Adaptive positioning */}
            <div className="mt-6 md:mt-0 md:absolute md:bottom-8 md:left-8 md:p-8 bg-white/90 md:backdrop-blur-md md:shadow-xl">
              <div className="text-[10px] tracking-[0.2em] uppercase text-[#737373] mb-2 md:mb-1">Featured Project</div>
              <div className="text-xl md:text-2xl font-light">Brennan Residence / Dublin Mountains</div>
            </div>
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="py-24 md:py-32 px-6">
        <div className="max-w-[1400px] mx-auto">
          {/* Section Header */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-20 md:mb-32">
            <div className="md:col-span-4">
              <span ref={addAosRef} className="aos-fade-up index-number mb-4">01</span>
              <h2 ref={addAosRef} className="aos-fade-up text-4xl md:text-5xl font-light">Selected Work</h2>
            </div>
            <div className="md:col-span-6 md:col-start-7">
              <p ref={addAosRef} className="aos-fade-up text-[#737373] leading-relaxed">
                Each project is a unique response to its context, program, and the aspirations of our clients. We believe in architecture that serves people while pushing creative boundaries.
              </p>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="flex flex-col gap-24 md:gap-32">
            {/* Project 1 */}
            <div className="group grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
              <div ref={addAosRef} className="aos-fade-up md:col-span-7">
                <div ref={addImageRevealRef} className="image-reveal aspect-[4/3] w-full">
                  <img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1974&auto=format&fit=crop" alt="Brennan Residence Interior" className="w-full h-full object-cover" />
                </div>
              </div>
              <div ref={addAosRef} className="aos-fade-up md:col-span-4 md:col-start-9 md:sticky md:top-32">
                <span className="index-number mb-2 block">2024</span>
                <h3 className="text-2xl md:text-3xl font-light mb-4">Brennan Residence</h3>
                <p className="text-[#737373] text-sm leading-relaxed mb-6">
                  A contemporary home nestled in the Dublin Mountains, designed to frame panoramic views while maintaining privacy and sustainability.
                </p>
                <div className="flex flex-wrap gap-4 mb-8">
                  <span className="text-[11px] font-medium tracking-[0.1em] uppercase text-[#a3a3a3]">Residential</span>
                  <span className="text-gray-200">·</span>
                  <span className="text-[11px] font-medium tracking-[0.1em] uppercase text-[#a3a3a3]">450 m²</span>
                </div>
                <a href="#" className="btn-minimal">
                  View Project
                  <ArrowRight />
                </a>
              </div>
            </div>

            {/* Project 2 */}
            <div className="group grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
              <div ref={addAosRef} className="aos-fade-up md:col-span-4 order-2 md:order-1 md:sticky md:top-32">
                <span className="index-number mb-2 block">2023</span>
                <h3 className="text-2xl md:text-3xl font-light mb-4">The Granary</h3>
                <p className="text-[#737373] text-sm leading-relaxed mb-6">
                  Adaptive reuse of a 19th-century grain warehouse into a mixed-use development featuring offices, retail, and public spaces.
                </p>
                <div className="flex flex-wrap gap-4 mb-8">
                  <span className="text-[11px] font-medium tracking-[0.1em] uppercase text-[#a3a3a3]">Commercial</span>
                  <span className="text-gray-200">·</span>
                  <span className="text-[11px] font-medium tracking-[0.1em] uppercase text-[#a3a3a3]">2,800 m²</span>
                </div>
                <a href="#" className="btn-minimal">
                  View Project
                  <ArrowRight />
                </a>
              </div>
              <div ref={addAosRef} className="aos-fade-up md:col-span-7 md:col-start-6 order-1 md:order-2">
                <div ref={addImageRevealRef} className="image-reveal aspect-[4/3] w-full">
                  <img src="https://images.unsplash.com/photo-1555636222-cae831e670b3?q=80&w=2077&auto=format&fit=crop" alt="The Granary" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>

            {/* Project 3 */}
            <div className="group grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
              <div ref={addAosRef} className="aos-fade-up md:col-span-7">
                <div ref={addImageRevealRef} className="image-reveal aspect-[4/3] w-full">
                  <img src="https://images.unsplash.com/photo-1577083288073-40892c0860a4?q=80&w=2076&auto=format&fit=crop" alt="Harbour Gallery" className="w-full h-full object-cover" />
                </div>
              </div>
              <div ref={addAosRef} className="aos-fade-up md:col-span-4 md:col-start-9 md:sticky md:top-32">
                <span className="index-number mb-2 block">2023</span>
                <h3 className="text-2xl md:text-3xl font-light mb-4">Harbour Gallery</h3>
                <p className="text-[#737373] text-sm leading-relaxed mb-6">
                  A new cultural institution on the Dublin waterfront, designed to celebrate Irish contemporary art while engaging with its maritime context.
                </p>
                <div className="flex flex-wrap gap-4 mb-8">
                  <span className="text-[11px] font-medium tracking-[0.1em] uppercase text-[#a3a3a3]">Cultural</span>
                  <span className="text-gray-200">·</span>
                  <span className="text-[11px] font-medium tracking-[0.1em] uppercase text-[#a3a3a3]">1,200 m²</span>
                </div>
                <a href="#" className="btn-minimal">
                  View Project
                  <ArrowRight />
                </a>
              </div>
            </div>

            {/* Project 4 */}
            <div className="group grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
              <div ref={addAosRef} className="aos-fade-up md:col-span-4 order-2 md:order-1 md:sticky md:top-32">
                <span className="index-number mb-2 block">2022</span>
                <h3 className="text-2xl md:text-3xl font-light mb-4">Clontarf House</h3>
                <p className="text-[#737373] text-sm leading-relaxed mb-6">
                  Sensitive renovation and extension of a Victorian residence, balancing heritage preservation with contemporary living requirements.
                </p>
                <div className="flex flex-wrap gap-4 mb-8">
                  <span className="text-[11px] font-medium tracking-[0.1em] uppercase text-[#a3a3a3]">Residential</span>
                  <span className="text-gray-200">·</span>
                  <span className="text-[11px] font-medium tracking-[0.1em] uppercase text-[#a3a3a3]">320 m²</span>
                </div>
                <a href="#" className="btn-minimal">
                  View Project
                  <ArrowRight />
                </a>
              </div>
              <div ref={addAosRef} className="aos-fade-up md:col-span-7 md:col-start-6 order-1 md:order-2">
                <div ref={addImageRevealRef} className="image-reveal aspect-[4/3] w-full">
                  <img src="https://images.unsplash.com/photo-1505577058444-a3dab90d4253?q=80&w=2670&auto=format&fit=crop" alt="Clontarf House" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>

          {/* View All */}
          <div ref={addAosRef} className="aos-fade-up mt-24 text-center">
            <a href="#" className="btn-minimal-outline">
              View All Projects
              <ArrowRight />
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 md:py-32 bg-[#fafafa] px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
            {/* Left - Large Text */}
            <div className="md:col-span-6">
              <span ref={addAosRef} className="aos-fade-up index-number mb-4">02</span>
              <h2 ref={addAosRef} className="aos-fade-up text-4xl md:text-5xl lg:text-6xl font-light mb-8 leading-tight">
                Architecture should elevate the everyday.
              </h2>
              <p ref={addAosRef} className="aos-fade-up text-[#737373] leading-relaxed mb-8">
                Founded in 1999 by Eoin Kavanagh and Claire Cole, our practice has grown from a two-person studio to a team of fifteen dedicated architects and designers. Our work spans residential, commercial, cultural, and hospitality sectors.
              </p>
              <p ref={addAosRef} className="aos-fade-up text-[#737373] leading-relaxed">
                We believe that thoughtful design has the power to transform not just spaces, but lives. Every project begins with listening — to our clients, to the site, to the community — before putting pencil to paper.
              </p>
            </div>

            {/* Right - Team & Values */}
            <div className="md:col-span-5 md:col-start-8">
              {/* Founders */}
              <div ref={addAosRef} className="aos-fade-up mb-16 md:mb-20">
                <div className="grid grid-cols-2 gap-6 md:gap-8 mb-12">
                  <div className="group">
                    <div ref={addImageRevealRef} className="image-reveal aspect-[3/4] w-full mb-4">
                      <img src="https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=1974&auto=format&fit=crop" alt="Eoin Kavanagh" className="w-full h-full object-cover filter grayscale transition-all duration-700 group-hover:grayscale-0" />
                    </div>
                    <h4 className="font-medium mb-1">Eoin Kavanagh</h4>
                    <p className="text-[10px] tracking-[0.1em] uppercase text-[#a3a3a3]">Founding Partner</p>
                  </div>
                  <div className="group">
                    <div ref={addImageRevealRef} className="image-reveal aspect-[3/4] w-full mb-4">
                      <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop" alt="Claire Cole" className="w-full h-full object-cover filter grayscale transition-all duration-700 group-hover:grayscale-0" />
                    </div>
                    <h4 className="font-medium mb-1">Claire Cole</h4>
                    <p className="text-[10px] tracking-[0.1em] uppercase text-[#a3a3a3]">Founding Partner</p>
                  </div>
                </div>
              </div>

              {/* Values */}
              <div ref={addAosRef} className="aos-fade-up flex flex-col gap-12 pt-12 border-t border-gray-200">
                <div>
                  <h4 className="text-sm tracking-[0.1em] uppercase mb-3">Context</h4>
                  <p className="text-[#737373] text-sm leading-relaxed">Every design responds to its unique physical, cultural, and historical context.</p>
                </div>
                <div>
                  <h4 className="text-sm tracking-[0.1em] uppercase mb-3">Craft</h4>
                  <p className="text-[#737373] text-sm leading-relaxed">We obsess over details, materials, and the quality of construction.</p>
                </div>
                <div>
                  <h4 className="text-sm tracking-[0.1em] uppercase mb-3">Sustainability</h4>
                  <p className="text-[#737373] text-sm leading-relaxed">Environmental responsibility is embedded in every decision we make.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 md:py-32 px-6">
        <div className="max-w-[1400px] mx-auto">
          {/* Section Header */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-20 md:mb-32">
            <div className="md:col-span-4">
              <span ref={addAosRef} className="aos-fade-up index-number mb-4">03</span>
              <h2 ref={addAosRef} className="aos-fade-up text-4xl md:text-5xl font-light">Services</h2>
            </div>
            <div className="md:col-span-6 md:col-start-7">
              <p ref={addAosRef} className="aos-fade-up text-[#737373] leading-relaxed">
                From initial concept through to completion, we offer a comprehensive range of architectural services tailored to each project's unique requirements.
              </p>
            </div>
          </div>

          {/* Services List */}
          <div className="border-b border-gray-200">
            {[
              { num: '01', title: 'Architecture', desc: 'Full architectural services from concept design through construction, including planning and building regulations.' },
              { num: '02', title: 'Interior Design', desc: 'Comprehensive interior design services including space planning, material selection, and bespoke furniture design.' },
              { num: '03', title: 'Master Planning', desc: 'Strategic site planning for large-scale developments, campus designs, and urban regeneration projects.' },
              { num: '04', title: 'Conservation', desc: 'Sensitive restoration and adaptation of historic buildings, with specialist expertise in protected structures.' },
              { num: '05', title: 'Consultation', desc: 'Expert advice on feasibility, site analysis, and design direction for clients at the earliest stages of a project.' },
            ].map((service) => (
              <div
                key={service.num}
                ref={addAosRef}
                className="aos-fade-up service-item group border-t border-gray-200 py-10 md:py-12 cursor-pointer transition-all duration-500 hover:bg-[#fafafa]"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-center">
                  <div className="md:col-span-1">
                    <span className="index-number">{service.num}</span>
                  </div>
                  <div className="md:col-span-3">
                    <h3 className="text-2xl font-light transition-transform duration-300">{service.title}</h3>
                  </div>
                  <div className="md:col-span-5">
                    <p className="text-[#737373] text-sm leading-relaxed">{service.desc}</p>
                  </div>
                  <div className="md:col-span-3 text-left md:text-right">
                    <a href="#" className="link-minimal text-[11px] font-medium tracking-[0.1em] uppercase">Learn More</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recognition Section */}
      <section className="py-24 md:py-32 bg-[#0a0a0a] text-white px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
            <div className="md:col-span-4">
              <span ref={addAosRef} className="aos-fade-up text-[11px] font-medium tracking-[0.2em] uppercase text-[#737373]">Recognition</span>
              <h2 ref={addAosRef} className="aos-fade-up text-4xl md:text-5xl font-light mt-6">Awards & Press</h2>
            </div>

            <div className="md:col-span-7 md:col-start-6">
              <div ref={addAosRef} className="aos-fade-up flex flex-col gap-6">
                {[
                  { title: 'RIAI Award for Housing', subtitle: 'Brennan Residence / 2024' },
                  { title: 'Irish Architecture Award', subtitle: 'The Granary / 2023' },
                  { title: 'Architectural Review Emerging Practice', subtitle: 'Studio / 2022' },
                  { title: 'World Architecture Festival Shortlist', subtitle: 'Harbour Gallery / 2023' },
                ].map((award) => (
                  <div
                    key={award.title}
                    className="group flex items-center justify-between py-8 border-b border-white/10 cursor-default"
                  >
                    <div>
                      <h4 className="text-xl font-light mb-2 transition-colors duration-300 group-hover:text-[#a3a3a3]">{award.title}</h4>
                      <p className="text-[10px] tracking-[0.1em] uppercase text-[#737373]">{award.subtitle}</p>
                    </div>
                    <div className="opacity-0 transition-all duration-300 transform translate-x-4 group-hover:opacity-100 group-hover:translate-x-0">
                      <ArrowUpRight />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 md:py-32 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-16">
            {/* Left - CTA */}
            <div className="md:col-span-6">
              <span ref={addAosRef} className="aos-fade-up index-number mb-4">04</span>
              <h2 ref={addAosRef} className="aos-fade-up text-4xl md:text-5xl lg:text-6xl font-light mt-6 mb-12 leading-tight">
                Let's create something meaningful together.
              </h2>
              <p ref={addAosRef} className="aos-fade-up text-[#737373] leading-relaxed mb-12 max-w-md">
                Whether you're planning a new build, renovation, or simply exploring possibilities, we'd love to hear from you. Every great project starts with a conversation.
              </p>
              <div ref={addAosRef} className="aos-fade-up">
                <a href="mailto:studio@kavanaghcole.ie" className="btn-minimal-filled w-full sm:w-auto justify-center">
                  Start a Conversation
                  <ArrowRight />
                </a>
              </div>
            </div>

            {/* Right - Contact Info */}
            <div className="md:col-span-4 md:col-start-9">
              <div ref={addAosRef} className="aos-fade-up flex flex-col gap-12 md:gap-16">
                <div>
                  <h4 className="text-[11px] font-medium tracking-[0.1em] uppercase text-[#a3a3a3] mb-4">General Enquiries</h4>
                  <a href="mailto:studio@kavanaghcole.ie" className="link-minimal text-xl">studio@kavanaghcole.ie</a>
                </div>
                <div>
                  <h4 className="text-[11px] font-medium tracking-[0.1em] uppercase text-[#a3a3a3] mb-4">Telephone</h4>
                  <a href="tel:+35312345678" className="link-minimal text-xl">+353 1 234 5678</a>
                </div>
                <div>
                  <h4 className="text-[11px] font-medium tracking-[0.1em] uppercase text-[#a3a3a3] mb-4">Studio</h4>
                  <p className="text-xl leading-relaxed">
                    14 Merrion Square<br />
                    Dublin 2, D02 VR66<br />
                    Ireland
                  </p>
                </div>
                <div>
                  <h4 className="text-[11px] font-medium tracking-[0.1em] uppercase text-[#a3a3a3] mb-4">Follow</h4>
                  <div className="flex gap-8">
                    <a href="#" className="link-minimal text-sm">Instagram</a>
                    <a href="#" className="link-minimal text-sm">LinkedIn</a>
                    <a href="#" className="link-minimal text-sm">Pinterest</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 md:py-16 px-6 border-t border-gray-100">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-[10px] tracking-[0.1em] uppercase text-[#a3a3a3] text-center md:text-left">
              © 2025 Kavanagh & Cole Architects
            </div>
            <div className="flex gap-8 text-[10px] tracking-[0.1em] uppercase text-[#a3a3a3]">
              <a href="#" className="no-underline color-inherit transition-colors hover:text-[#0a0a0a]">Privacy</a>
              <a href="#" className="no-underline color-inherit transition-colors hover:text-[#0a0a0a]">Terms</a>
              <a href="#" className="no-underline color-inherit transition-colors hover:text-[#0a0a0a]">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
