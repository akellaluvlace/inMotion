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
      <nav style={{
        position: 'fixed',
        width: '100%',
        zIndex: 50,
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(8px)',
        transition: 'all 0.3s',
        borderBottom: scrolled ? '1px solid #e5e5e5' : '1px solid transparent'
      }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 80, borderBottom: '1px solid #f5f5f5', transition: 'all 0.3s' }}>
            {/* Logo */}
            <a href="#" style={{ display: 'flex', alignItems: 'center', zIndex: 50, position: 'relative', textDecoration: 'none', color: 'inherit' }}>
              <span style={{ fontSize: 18, letterSpacing: '-0.02em', fontWeight: 400 }}>Kavanagh <span style={{ color: '#a3a3a3' }}>&</span> Cole</span>
            </a>

            {/* Desktop Nav */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 48 }} className="hidden-mobile">
              <a onClick={() => scrollToSection('work')} className="nav-link" style={{ cursor: 'pointer' }}>Work</a>
              <a onClick={() => scrollToSection('about')} className="nav-link" style={{ cursor: 'pointer' }}>About</a>
              <a onClick={() => scrollToSection('services')} className="nav-link" style={{ cursor: 'pointer' }}>Services</a>
              <a onClick={() => scrollToSection('contact')} className="nav-link" style={{ cursor: 'pointer' }}>Contact</a>
            </div>

            {/* CTA */}
            <a onClick={() => scrollToSection('contact')} style={{ fontSize: 12, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', transition: 'color 0.3s' }} className="hidden-mobile-sm">
              Start a Project
            </a>

            {/* Mobile Menu Button */}
            <button onClick={toggleMobileMenu} style={{ background: 'none', border: 'none', cursor: 'pointer', zIndex: 50, position: 'relative' }} className="mobile-only">
              {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className="mobile-menu-architect" style={{
        position: 'fixed',
        inset: 0,
        background: '#ffffff',
        zIndex: 40,
        transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(100%)',
        paddingTop: 128,
        paddingLeft: 24,
        paddingRight: 24,
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <a onClick={() => scrollToSection('work')} className="mobile-nav-link" style={{ cursor: 'pointer' }}>Work</a>
          <a onClick={() => scrollToSection('about')} className="mobile-nav-link" style={{ cursor: 'pointer' }}>About</a>
          <a onClick={() => scrollToSection('services')} className="mobile-nav-link" style={{ cursor: 'pointer' }}>Services</a>
          <a onClick={() => scrollToSection('contact')} className="mobile-nav-link" style={{ cursor: 'pointer' }}>Contact</a>
        </div>
        <div style={{ marginTop: 'auto', paddingBottom: 48 }}>
          <p style={{ fontSize: 12, color: '#a3a3a3', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Get in touch</p>
          <a href="mailto:studio@kavanaghcole.ie" style={{ fontSize: 18, textDecoration: 'none', color: 'inherit' }}>studio@kavanaghcole.ie</a>
        </div>
      </div>

      {/* Hero Section */}
      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'flex-end', padding: '128px 24px 48px', paddingBottom: 96 }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', width: '100%' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 48, alignItems: 'flex-end' }}>
            {/* Left Content */}
            <div style={{ gridColumn: 'span 7' }}>
              <p ref={addAosRef} className="aos-fade-up" style={{ fontSize: 12, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#a3a3a3', marginBottom: 32 }}>
                Architecture & Interior Design
              </p>

              <h1 ref={addAosRef} className="aos-fade-up" style={{ fontSize: 'clamp(48px, 8vw, 96px)', fontWeight: 300, lineHeight: 0.95, marginBottom: 48, marginLeft: -4 }}>
                Designing spaces<br />
                <span style={{ color: '#a3a3a3' }}>that inspire.</span>
              </h1>

              <div ref={addAosRef} className="aos-fade-up" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 32 }}>
                <a onClick={() => scrollToSection('work')} className="btn-minimal-filled" style={{ cursor: 'pointer', justifyContent: 'center' }}>
                  View Projects
                  <ArrowRight />
                </a>
                <a onClick={() => scrollToSection('about')} className="btn-minimal" style={{ cursor: 'pointer', justifyContent: 'center' }}>
                  Our Approach
                  <ArrowDown />
                </a>
              </div>
            </div>

            {/* Right - Stats */}
            <div style={{ gridColumn: 'span 5', borderLeft: '1px solid #e5e5e5', paddingLeft: 48 }}>
              <div ref={addAosRef} className="aos-fade-up" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
                <div>
                  <div style={{ fontSize: 'clamp(36px, 4vw, 48px)', fontWeight: 300, marginBottom: 8 }}>25</div>
                  <div style={{ fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#a3a3a3' }}>Years</div>
                </div>
                <div>
                  <div style={{ fontSize: 'clamp(36px, 4vw, 48px)', fontWeight: 300, marginBottom: 8 }}>180</div>
                  <div style={{ fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#a3a3a3' }}>Projects</div>
                </div>
                <div>
                  <div style={{ fontSize: 'clamp(36px, 4vw, 48px)', fontWeight: 300, marginBottom: 8 }}>12</div>
                  <div style={{ fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#a3a3a3' }}>Awards</div>
                </div>
              </div>

              <div ref={addAosRef} className="aos-fade-up" style={{ marginTop: 48, paddingTop: 32, borderTop: '1px solid #e5e5e5' }}>
                <p style={{ color: '#737373', lineHeight: 1.7 }}>
                  Award-winning Dublin architecture studio specializing in residential, commercial, and cultural spaces. Thoughtful design, timeless execution.
                </p>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div ref={addAosRef} className="aos-fade-up hidden-mobile" style={{ marginTop: 64, display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 1, height: 64, background: '#d4d4d4' }}></div>
            <span style={{ fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#a3a3a3' }}>Scroll</span>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section style={{ padding: '48px 24px' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div ref={addAosRef} className="aos-fade-up" style={{ position: 'relative' }}>
            <div ref={addImageRevealRef} className="image-reveal" style={{ aspectRatio: '21/9', width: '100%' }}>
              <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2560&auto=format&fit=crop" alt="Brennan Residence" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div className="hidden-mobile" style={{ position: 'absolute', bottom: 0, left: 0, padding: 32, background: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(8px)', margin: 24 }}>
              <div style={{ fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#737373', marginBottom: 4 }}>Featured Project</div>
              <div style={{ fontSize: 20, fontWeight: 300 }}>Brennan Residence / Dublin Mountains</div>
            </div>
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section id="work" style={{ padding: '96px 24px 128px' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          {/* Section Header */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 48, marginBottom: 80 }}>
            <div style={{ gridColumn: 'span 4' }}>
              <span ref={addAosRef} className="aos-fade-up index-number" style={{ marginBottom: 16 }}>01</span>
              <h2 ref={addAosRef} className="aos-fade-up" style={{ fontSize: 'clamp(36px, 4vw, 48px)', fontWeight: 300 }}>Selected Work</h2>
            </div>
            <div style={{ gridColumn: '7 / span 6' }}>
              <p ref={addAosRef} className="aos-fade-up" style={{ color: '#737373', lineHeight: 1.7 }}>
                Each project is a unique response to its context, program, and the aspirations of our clients. We believe in architecture that serves people while pushing creative boundaries.
              </p>
            </div>
          </div>

          {/* Projects Grid */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 128 }}>
            {/* Project 1 */}
            <div className="group" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 32, alignItems: 'flex-start' }}>
              <div ref={addAosRef} className="aos-fade-up" style={{ gridColumn: 'span 7', order: 1 }}>
                <div ref={addImageRevealRef} className="image-reveal" style={{ aspectRatio: '4/3', width: '100%' }}>
                  <img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1974&auto=format&fit=crop" alt="Brennan Residence Interior" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>
              <div ref={addAosRef} className="aos-fade-up" style={{ gridColumn: '9 / span 4', order: 2, position: 'sticky', top: 128 }}>
                <span className="index-number" style={{ marginBottom: 8, display: 'block' }}>2024</span>
                <h3 style={{ fontSize: 'clamp(24px, 2.5vw, 32px)', fontWeight: 300, marginBottom: 16 }}>Brennan Residence</h3>
                <p style={{ color: '#737373', fontSize: 14, lineHeight: 1.7, marginBottom: 24 }}>
                  A contemporary home nestled in the Dublin Mountains, designed to frame panoramic views while maintaining privacy and sustainability.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginBottom: 32 }}>
                  <span style={{ fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#a3a3a3' }}>Residential</span>
                  <span style={{ color: '#d4d4d4' }}>·</span>
                  <span style={{ fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#a3a3a3' }}>450 m²</span>
                </div>
                <a href="#" className="btn-minimal">
                  View Project
                  <ArrowRight />
                </a>
              </div>
            </div>

            {/* Project 2 */}
            <div className="group" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 32, alignItems: 'flex-start' }}>
              <div ref={addAosRef} className="aos-fade-up" style={{ gridColumn: 'span 4', order: 1, position: 'sticky', top: 128 }}>
                <span className="index-number" style={{ marginBottom: 8, display: 'block' }}>2023</span>
                <h3 style={{ fontSize: 'clamp(24px, 2.5vw, 32px)', fontWeight: 300, marginBottom: 16 }}>The Granary</h3>
                <p style={{ color: '#737373', fontSize: 14, lineHeight: 1.7, marginBottom: 24 }}>
                  Adaptive reuse of a 19th-century grain warehouse into a mixed-use development featuring offices, retail, and public spaces.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginBottom: 32 }}>
                  <span style={{ fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#a3a3a3' }}>Commercial</span>
                  <span style={{ color: '#d4d4d4' }}>·</span>
                  <span style={{ fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#a3a3a3' }}>2,800 m²</span>
                </div>
                <a href="#" className="btn-minimal">
                  View Project
                  <ArrowRight />
                </a>
              </div>
              <div ref={addAosRef} className="aos-fade-up" style={{ gridColumn: '6 / span 7', order: 2 }}>
                <div ref={addImageRevealRef} className="image-reveal" style={{ aspectRatio: '4/3', width: '100%' }}>
                  <img src="https://images.unsplash.com/photo-1555636222-cae831e670b3?q=80&w=2077&auto=format&fit=crop" alt="The Granary" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>
            </div>

            {/* Project 3 */}
            <div className="group" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 32, alignItems: 'flex-start' }}>
              <div ref={addAosRef} className="aos-fade-up" style={{ gridColumn: 'span 7', order: 1 }}>
                <div ref={addImageRevealRef} className="image-reveal" style={{ aspectRatio: '4/3', width: '100%' }}>
                  <img src="https://images.unsplash.com/photo-1577083288073-40892c0860a4?q=80&w=2076&auto=format&fit=crop" alt="Harbour Gallery" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>
              <div ref={addAosRef} className="aos-fade-up" style={{ gridColumn: '9 / span 4', order: 2, position: 'sticky', top: 128 }}>
                <span className="index-number" style={{ marginBottom: 8, display: 'block' }}>2023</span>
                <h3 style={{ fontSize: 'clamp(24px, 2.5vw, 32px)', fontWeight: 300, marginBottom: 16 }}>Harbour Gallery</h3>
                <p style={{ color: '#737373', fontSize: 14, lineHeight: 1.7, marginBottom: 24 }}>
                  A new cultural institution on the Dublin waterfront, designed to celebrate Irish contemporary art while engaging with its maritime context.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginBottom: 32 }}>
                  <span style={{ fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#a3a3a3' }}>Cultural</span>
                  <span style={{ color: '#d4d4d4' }}>·</span>
                  <span style={{ fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#a3a3a3' }}>1,200 m²</span>
                </div>
                <a href="#" className="btn-minimal">
                  View Project
                  <ArrowRight />
                </a>
              </div>
            </div>

            {/* Project 4 */}
            <div className="group" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 32, alignItems: 'flex-start' }}>
              <div ref={addAosRef} className="aos-fade-up" style={{ gridColumn: 'span 4', order: 1, position: 'sticky', top: 128 }}>
                <span className="index-number" style={{ marginBottom: 8, display: 'block' }}>2022</span>
                <h3 style={{ fontSize: 'clamp(24px, 2.5vw, 32px)', fontWeight: 300, marginBottom: 16 }}>Clontarf House</h3>
                <p style={{ color: '#737373', fontSize: 14, lineHeight: 1.7, marginBottom: 24 }}>
                  Sensitive renovation and extension of a Victorian residence, balancing heritage preservation with contemporary living requirements.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginBottom: 32 }}>
                  <span style={{ fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#a3a3a3' }}>Residential</span>
                  <span style={{ color: '#d4d4d4' }}>·</span>
                  <span style={{ fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#a3a3a3' }}>320 m²</span>
                </div>
                <a href="#" className="btn-minimal">
                  View Project
                  <ArrowRight />
                </a>
              </div>
              <div ref={addAosRef} className="aos-fade-up" style={{ gridColumn: '6 / span 7', order: 2 }}>
                <div ref={addImageRevealRef} className="image-reveal" style={{ aspectRatio: '4/3', width: '100%' }}>
                  <img src="https://images.unsplash.com/photo-1505577058444-a3dab90d4253?q=80&w=2670&auto=format&fit=crop" alt="Clontarf House" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>
            </div>
          </div>

          {/* View All */}
          <div ref={addAosRef} className="aos-fade-up" style={{ marginTop: 96, textAlign: 'center' }}>
            <a href="#" className="btn-minimal-outline">
              View All Projects
              <ArrowRight />
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" style={{ padding: '128px 24px', background: '#fafafa' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 64 }}>
            {/* Left - Large Text */}
            <div style={{ gridColumn: 'span 6' }}>
              <span ref={addAosRef} className="aos-fade-up index-number" style={{ marginBottom: 16 }}>02</span>
              <h2 ref={addAosRef} className="aos-fade-up" style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 300, marginBottom: 32, lineHeight: 1.1 }}>
                Architecture should elevate the everyday.
              </h2>
              <p ref={addAosRef} className="aos-fade-up" style={{ color: '#737373', lineHeight: 1.7, marginBottom: 32 }}>
                Founded in 1999 by Eoin Kavanagh and Claire Cole, our practice has grown from a two-person studio to a team of fifteen dedicated architects and designers. Our work spans residential, commercial, cultural, and hospitality sectors.
              </p>
              <p ref={addAosRef} className="aos-fade-up" style={{ color: '#737373', lineHeight: 1.7 }}>
                We believe that thoughtful design has the power to transform not just spaces, but lives. Every project begins with listening — to our clients, to the site, to the community — before putting pencil to paper.
              </p>
            </div>

            {/* Right - Team & Values */}
            <div style={{ gridColumn: '8 / span 5' }}>
              {/* Founders */}
              <div ref={addAosRef} className="aos-fade-up" style={{ marginBottom: 64 }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24, marginBottom: 32 }}>
                  <div className="group">
                    <div ref={addImageRevealRef} className="image-reveal" style={{ aspectRatio: '3/4', width: '100%', marginBottom: 16 }}>
                      <img src="https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=1974&auto=format&fit=crop" alt="Eoin Kavanagh" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%)', transition: 'filter 0.7s' }} />
                    </div>
                    <h4 style={{ fontWeight: 500, marginBottom: 4 }}>Eoin Kavanagh</h4>
                    <p style={{ fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#a3a3a3' }}>Founding Partner</p>
                  </div>
                  <div className="group">
                    <div ref={addImageRevealRef} className="image-reveal" style={{ aspectRatio: '3/4', width: '100%', marginBottom: 16 }}>
                      <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop" alt="Claire Cole" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%)', transition: 'filter 0.7s' }} />
                    </div>
                    <h4 style={{ fontWeight: 500, marginBottom: 4 }}>Claire Cole</h4>
                    <p style={{ fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#a3a3a3' }}>Founding Partner</p>
                  </div>
                </div>
              </div>

              {/* Values */}
              <div ref={addAosRef} className="aos-fade-up" style={{ display: 'flex', flexDirection: 'column', gap: 32, paddingTop: 32, borderTop: '1px solid #e5e5e5' }}>
                <div>
                  <h4 style={{ fontSize: 14, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>Context</h4>
                  <p style={{ color: '#737373', fontSize: 14, lineHeight: 1.7 }}>Every design responds to its unique physical, cultural, and historical context.</p>
                </div>
                <div>
                  <h4 style={{ fontSize: 14, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>Craft</h4>
                  <p style={{ color: '#737373', fontSize: 14, lineHeight: 1.7 }}>We obsess over details, materials, and the quality of construction.</p>
                </div>
                <div>
                  <h4 style={{ fontSize: 14, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>Sustainability</h4>
                  <p style={{ color: '#737373', fontSize: 14, lineHeight: 1.7 }}>Environmental responsibility is embedded in every decision we make.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" style={{ padding: '128px 24px' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          {/* Section Header */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 48, marginBottom: 80 }}>
            <div style={{ gridColumn: 'span 4' }}>
              <span ref={addAosRef} className="aos-fade-up index-number" style={{ marginBottom: 16 }}>03</span>
              <h2 ref={addAosRef} className="aos-fade-up" style={{ fontSize: 'clamp(36px, 4vw, 48px)', fontWeight: 300 }}>Services</h2>
            </div>
            <div style={{ gridColumn: '7 / span 6' }}>
              <p ref={addAosRef} className="aos-fade-up" style={{ color: '#737373', lineHeight: 1.7 }}>
                From initial concept through to completion, we offer a comprehensive range of architectural services tailored to each project's unique requirements.
              </p>
            </div>
          </div>

          {/* Services List */}
          <div>
            {[
              { num: '01', title: 'Architecture', desc: 'Full architectural services from concept design through construction, including planning and building regulations.' },
              { num: '02', title: 'Interior Design', desc: 'Comprehensive interior design services including space planning, material selection, and bespoke furniture design.' },
              { num: '03', title: 'Master Planning', desc: 'Strategic site planning for large-scale developments, campus designs, and urban regeneration projects.' },
              { num: '04', title: 'Conservation', desc: 'Sensitive restoration and adaptation of historic buildings, with specialist expertise in protected structures.' },
              { num: '05', title: 'Consultation', desc: 'Expert advice on feasibility, site analysis, and design direction for clients at the earliest stages of a project.' },
            ].map((service, index) => (
              <div
                key={service.num}
                ref={addAosRef}
                className="aos-fade-up service-item"
                style={{
                  padding: '32px 0',
                  borderTop: '1px solid #e5e5e5',
                  borderBottom: index === 4 ? '1px solid #e5e5e5' : 'none',
                  cursor: 'pointer',
                  transition: 'background 0.5s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#fafafa'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 32, alignItems: 'center' }}>
                  <div style={{ gridColumn: 'span 1' }}>
                    <span className="index-number">{service.num}</span>
                  </div>
                  <div style={{ gridColumn: 'span 3' }}>
                    <h3 style={{ fontSize: 'clamp(20px, 2vw, 24px)', fontWeight: 300, transition: 'transform 0.3s' }}>{service.title}</h3>
                  </div>
                  <div style={{ gridColumn: 'span 5' }}>
                    <p style={{ color: '#737373', fontSize: 14, lineHeight: 1.7 }}>{service.desc}</p>
                  </div>
                  <div style={{ gridColumn: 'span 3', textAlign: 'right' }}>
                    <a href="#" className="link-minimal" style={{ fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Learn More</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recognition Section */}
      <section style={{ padding: '128px 24px', background: '#0a0a0a', color: '#ffffff' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 64 }}>
            <div style={{ gridColumn: 'span 4' }}>
              <span ref={addAosRef} className="aos-fade-up" style={{ fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#737373' }}>Recognition</span>
              <h2 ref={addAosRef} className="aos-fade-up" style={{ fontSize: 'clamp(36px, 4vw, 48px)', fontWeight: 300, marginTop: 16 }}>Awards & Press</h2>
            </div>

            <div style={{ gridColumn: '6 / span 7' }}>
              <div ref={addAosRef} className="aos-fade-up" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                {[
                  { title: 'RIAI Award for Housing', subtitle: 'Brennan Residence / 2024' },
                  { title: 'Irish Architecture Award', subtitle: 'The Granary / 2023' },
                  { title: 'Architectural Review Emerging Practice', subtitle: 'Studio / 2022' },
                  { title: 'World Architecture Festival Shortlist', subtitle: 'Harbour Gallery / 2023' },
                ].map((award) => (
                  <div
                    key={award.title}
                    style={{ padding: '24px 0', borderBottom: '1px solid #262626', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'default' }}
                    className="group"
                    onMouseEnter={(e) => {
                      const h4 = e.currentTarget.querySelector('h4');
                      const icon = e.currentTarget.querySelector('.award-icon');
                      if (h4) (h4 as HTMLElement).style.color = '#a3a3a3';
                      if (icon) (icon as HTMLElement).style.opacity = '1';
                    }}
                    onMouseLeave={(e) => {
                      const h4 = e.currentTarget.querySelector('h4');
                      const icon = e.currentTarget.querySelector('.award-icon');
                      if (h4) (h4 as HTMLElement).style.color = '#ffffff';
                      if (icon) (icon as HTMLElement).style.opacity = '0';
                    }}
                  >
                    <div>
                      <h4 style={{ fontSize: 18, fontWeight: 300, marginBottom: 4, transition: 'color 0.3s' }}>{award.title}</h4>
                      <p style={{ fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#737373' }}>{award.subtitle}</p>
                    </div>
                    <div className="award-icon" style={{ opacity: 0, transition: 'opacity 0.3s' }}>
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
      <section id="contact" style={{ padding: '128px 24px' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 64 }}>
            {/* Left - CTA */}
            <div style={{ gridColumn: 'span 6' }}>
              <span ref={addAosRef} className="aos-fade-up index-number" style={{ marginBottom: 16 }}>04</span>
              <h2 ref={addAosRef} className="aos-fade-up" style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 300, marginTop: 16, marginBottom: 32, lineHeight: 1.1 }}>
                Let's create something meaningful together.
              </h2>
              <p ref={addAosRef} className="aos-fade-up" style={{ color: '#737373', lineHeight: 1.7, marginBottom: 48, maxWidth: 400 }}>
                Whether you're planning a new build, renovation, or simply exploring possibilities, we'd love to hear from you. Every great project starts with a conversation.
              </p>
              <div ref={addAosRef} className="aos-fade-up">
                <a href="mailto:studio@kavanaghcole.ie" className="btn-minimal-filled">
                  Start a Conversation
                  <ArrowRight />
                </a>
              </div>
            </div>

            {/* Right - Contact Info */}
            <div style={{ gridColumn: '9 / span 4' }}>
              <div ref={addAosRef} className="aos-fade-up" style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
                <div>
                  <h4 style={{ fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#a3a3a3', marginBottom: 16 }}>General Enquiries</h4>
                  <a href="mailto:studio@kavanaghcole.ie" className="link-minimal" style={{ fontSize: 18 }}>studio@kavanaghcole.ie</a>
                </div>
                <div>
                  <h4 style={{ fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#a3a3a3', marginBottom: 16 }}>Telephone</h4>
                  <a href="tel:+35312345678" className="link-minimal" style={{ fontSize: 18 }}>+353 1 234 5678</a>
                </div>
                <div>
                  <h4 style={{ fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#a3a3a3', marginBottom: 16 }}>Studio</h4>
                  <p style={{ fontSize: 18, lineHeight: 1.7 }}>
                    14 Merrion Square<br />
                    Dublin 2, D02 VR66<br />
                    Ireland
                  </p>
                </div>
                <div>
                  <h4 style={{ fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#a3a3a3', marginBottom: 16 }}>Follow</h4>
                  <div style={{ display: 'flex', gap: 24 }}>
                    <a href="#" className="link-minimal" style={{ fontSize: 14 }}>Instagram</a>
                    <a href="#" className="link-minimal" style={{ fontSize: 14 }}>LinkedIn</a>
                    <a href="#" className="link-minimal" style={{ fontSize: 14 }}>Pinterest</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '32px 24px', borderTop: '1px solid #e5e5e5' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
            <div style={{ fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#a3a3a3' }}>
              © 2025 Kavanagh & Cole Architects
            </div>
            <div style={{ display: 'flex', gap: 32, fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#a3a3a3' }}>
              <a href="#" style={{ textDecoration: 'none', color: 'inherit', transition: 'color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#0a0a0a'} onMouseLeave={(e) => e.currentTarget.style.color = '#a3a3a3'}>Privacy</a>
              <a href="#" style={{ textDecoration: 'none', color: 'inherit', transition: 'color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#0a0a0a'} onMouseLeave={(e) => e.currentTarget.style.color = '#a3a3a3'}>Terms</a>
              <a href="#" style={{ textDecoration: 'none', color: 'inherit', transition: 'color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#0a0a0a'} onMouseLeave={(e) => e.currentTarget.style.color = '#a3a3a3'}>Sitemap</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Responsive styles */}
      <style jsx>{`
        @media (max-width: 1024px) {
          .architect-wrapper section > div > div[style*="gridTemplateColumns"] {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 768px) {
          .hidden-mobile {
            display: none !important;
          }
          .mobile-only {
            display: block !important;
          }
        }
        @media (min-width: 769px) {
          .mobile-only {
            display: none !important;
          }
        }
        @media (max-width: 640px) {
          .hidden-mobile-sm {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
