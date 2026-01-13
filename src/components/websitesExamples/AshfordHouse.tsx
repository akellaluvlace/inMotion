'use client';

import { useEffect, useState, useRef } from 'react';

// Inject styles
const injectStyles = () => {
  if (typeof document === 'undefined') return;
  if (document.getElementById('ashford-house-styles')) return;

  const style = document.createElement('style');
  style.id = 'ashford-house-styles';
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Great+Vibes&family=Montserrat:wght@300;400;500;600&display=swap');

    .ashford-wrapper * {
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      box-sizing: border-box;
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

    .font-script {
      font-family: 'Great Vibes', cursive;
    }

    .font-display {
      font-family: 'Cormorant Garamond', Georgia, serif;
    }

    .elegant-divider {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 20px;
    }

    .elegant-divider::before,
    .elegant-divider::after {
      content: '';
      width: 80px;
      height: 1px;
      background: linear-gradient(90deg, transparent, #C9A962, transparent);
    }

    .btn-elegant {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      padding: 18px 40px;
      background: #36454F;
      color: #FFFFF0;
      font-family: 'Montserrat', sans-serif;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      border: none;
      transition: all 0.4s ease;
      cursor: pointer;
    }

    .btn-elegant:hover {
      background: #C9A962;
      color: #36454F;
    }

    .btn-elegant-outline {
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

    .btn-elegant-outline:hover {
      background: #36454F;
      color: #FFFFF0;
    }

    .btn-gold {
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

    .btn-gold:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 30px rgba(201, 169, 98, 0.3);
    }

    .image-elegant {
      position: relative;
      overflow: hidden;
    }

    .image-elegant::after {
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

    .image-elegant:hover::after {
      opacity: 1;
    }

    .image-elegant img {
      transition: transform 0.8s ease;
    }

    .image-elegant:hover img {
      transform: scale(1.03);
    }

    .venue-card {
      background: #FFFFF0;
      padding: 0;
      transition: all 0.5s ease;
      position: relative;
    }

    .venue-card::before {
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

    .venue-card:hover::before {
      transform: scaleX(1);
    }

    .venue-card:hover {
      box-shadow: 0 30px 60px rgba(54, 69, 79, 0.1);
    }

    .testimonial-elegant {
      position: relative;
      padding: 30px;
      background: linear-gradient(135deg, #F7E7CE 0%, #FBF3E4 100%);
    }

    @media (min-width: 768px) {
      .testimonial-elegant {
        padding: 50px;
      }
    }

    .testimonial-elegant::before {
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
      .testimonial-elegant::before {
        top: 20px;
        left: 40px;
        font-size: 120px;
      }
    }

    .nav-link-elegant {
      position: relative;
      color: #36454F;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      transition: color 0.3s ease;
    }

    .nav-link-elegant::after {
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

    .nav-link-elegant:hover {
      color: #C9A962;
    }

    .nav-link-elegant:hover::after {
      width: 100%;
    }

    .gallery-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 15px;
    }

    @media (min-width: 480px) {
      .gallery-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (min-width: 768px) {
      .gallery-grid {
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: repeat(2, 250px);
      }
      .gallery-grid .gallery-item:first-child {
        grid-column: span 2;
        grid-row: span 2;
      }
    }

    .flourish {
      width: 200px;
      height: 30px;
      background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 30'%3E%3Cpath d='M0 15 Q50 0 100 15 Q150 30 200 15' stroke='%23C9A962' fill='none' stroke-width='1'/%3E%3C/svg%3E") no-repeat center;
    }

    .form-elegant input,
    .form-elegant select,
    .form-elegant textarea {
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

    .form-elegant select {
      background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
      background-position: right 0.5rem center;
      background-repeat: no-repeat;
      background-size: 1.5em 1.5em;
      padding-right: 2.5rem;
    }

    .form-elegant input:focus,
    .form-elegant select:focus,
    .form-elegant textarea:focus {
      outline: none;
      border-color: #C9A962;
      box-shadow: 0 0 0 3px rgba(201, 169, 98, 0.1);
    }

    .form-elegant label {
      display: block;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: #8B8378;
      margin-bottom: 8px;
    }

    .aos-fade-up {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 1s ease-out, transform 1s ease-out;
    }

    .aos-fade-up.aos-animate {
      opacity: 1;
      transform: translateY(0);
    }

    .aos-fade-right {
      opacity: 0;
      transform: translateX(-30px);
      transition: opacity 1s ease-out, transform 1s ease-out;
    }

    .aos-fade-right.aos-animate {
      opacity: 1;
      transform: translateX(0);
    }

    .aos-fade-left {
      opacity: 0;
      transform: translateX(30px);
      transition: opacity 1s ease-out, transform 1s ease-out;
    }

    .aos-fade-left.aos-animate {
      opacity: 1;
      transform: translateX(0);
    }
  `;
  document.head.appendChild(style);
};

// Icons
const ArrowRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
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
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

const MaximizeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
  </svg>
);

const SparklesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path>
  </svg>
);

const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4"></circle>
    <path d="M12 2v2"></path>
    <path d="M12 20v2"></path>
    <path d="m4.93 4.93 1.41 1.41"></path>
    <path d="m17.66 17.66 1.41 1.41"></path>
    <path d="M2 12h2"></path>
    <path d="M20 12h2"></path>
    <path d="m6.34 17.66-1.41 1.41"></path>
    <path d="m19.07 4.93-1.41 1.41"></path>
  </svg>
);

const FlowerIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 7.5a4.5 4.5 0 1 1 4.5 4.5M12 7.5A4.5 4.5 0 1 0 7.5 12M12 7.5V9m-4.5 3a4.5 4.5 0 1 0 4.5 4.5M7.5 12H9m7.5 0a4.5 4.5 0 1 1-4.5 4.5m4.5-4.5H15m-3 4.5V15"></path>
    <circle cx="12" cy="12" r="3"></circle>
    <path d="m8 16 1.5-1.5"></path>
    <path d="M14.5 9.5 16 8"></path>
    <path d="m8 8 1.5 1.5"></path>
    <path d="M14.5 14.5 16 16"></path>
  </svg>
);

const TreesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 10v.2A3 3 0 0 1 8.9 16v0H5v0h0a3 3 0 0 1-1-5.8V10a3 3 0 0 1 6 0Z"></path>
    <path d="M7 16v6"></path>
    <path d="M13 19v3"></path>
    <path d="M10.3 14.9 10 15l.3-.1Z"></path>
    <path d="M17 10v.2a3 3 0 0 1-1.1 5.8v0h-3.9v0h0a3 3 0 0 1-1-5.8V10a3 3 0 0 1 6 0Z"></path>
  </svg>
);

const TentIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3.5 21 14 3"></path>
    <path d="M20.5 21 10 3"></path>
    <path d="M15.5 21 12 15l-3.5 6"></path>
    <path d="M2 21h20"></path>
  </svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const ImageIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
    <circle cx="8.5" cy="8.5" r="1.5"></circle>
    <polyline points="21 15 16 10 5 21"></polyline>
  </svg>
);

const MapPinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
);

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"></rect>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
  </svg>
);

const SendIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m22 2-7 20-4-9-9-4Z"></path>
    <path d="M22 2 11 13"></path>
  </svg>
);

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

export default function AshfordHouse() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const aosRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    injectStyles();
  }, []);

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
            entry.target.classList.add('aos-animate');
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
    <div className="ashford-wrapper" style={{ fontFamily: "'Montserrat', system-ui, sans-serif", background: '#FFFFF0', color: '#36454F', lineHeight: 1.8, fontWeight: 400, overflowX: 'hidden' }}>
      {/* Navigation */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: scrolled ? 'rgba(255, 255, 240, 0.95)' : 'rgba(255, 255, 240, 0.95)',
        backdropFilter: 'blur(8px)',
        borderBottom: scrolled ? '1px solid rgba(201, 169, 98, 0.2)' : '1px solid transparent',
        boxShadow: scrolled ? '0 4px 6px -1px rgba(0, 0, 0, 0.05)' : 'none',
        transition: 'all 0.3s'
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 80 }}>
            {/* Mobile Menu Button */}
            <button onClick={toggleMobileMenu} className="lg-hidden" style={{ background: 'none', border: 'none', cursor: 'pointer', marginLeft: -8 }}>
              <MenuIcon />
            </button>

            {/* Logo */}
            <a href="#" style={{ textAlign: 'center', position: 'absolute', left: '50%', transform: 'translateX(-50%)', textDecoration: 'none' }}>
              <span className="font-script" style={{ display: 'block', fontSize: 24, color: '#C9A962' }}>Ashford House</span>
              <span style={{ display: 'block', fontSize: 8, letterSpacing: '0.3em', color: '#36454F', textTransform: 'uppercase', marginTop: 4 }}>Estate · Ireland</span>
            </a>

            {/* Desktop Nav */}
            <div className="hidden-mobile" style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
              <a onClick={() => scrollToSection('story')} className="nav-link-elegant" style={{ cursor: 'pointer' }}>Our Story</a>
              <a onClick={() => scrollToSection('venues')} className="nav-link-elegant" style={{ cursor: 'pointer' }}>Venues</a>
              <a onClick={() => scrollToSection('weddings')} className="nav-link-elegant" style={{ cursor: 'pointer' }}>Weddings</a>
              <a onClick={() => scrollToSection('gallery')} className="nav-link-elegant" style={{ cursor: 'pointer' }}>Gallery</a>
              <a onClick={() => scrollToSection('contact')} className="nav-link-elegant" style={{ cursor: 'pointer' }}>Enquire</a>
            </div>

            {/* CTA */}
            <div className="hidden-mobile">
              <a onClick={() => scrollToSection('contact')} className="btn-gold" style={{ fontSize: 10, cursor: 'pointer' }}>Book a Viewing</a>
            </div>

            {/* Mobile CTA */}
            <a onClick={() => scrollToSection('contact')} className="lg-hidden" style={{ color: '#C9A962', padding: 8, marginRight: -8, cursor: 'pointer' }}>
              <CalendarIcon />
            </a>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div style={{
        position: 'fixed',
        inset: 0,
        background: '#FFFFF0',
        zIndex: 60,
        transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.5s ease-in-out',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <button onClick={toggleMobileMenu} style={{ position: 'absolute', top: 24, left: 24, background: 'none', border: 'none', cursor: 'pointer', color: '#36454F' }}>
          <CloseIcon />
        </button>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32, marginBottom: 40 }}>
          <a onClick={() => scrollToSection('story')} className="font-display" style={{ fontSize: 28, color: '#36454F', cursor: 'pointer', textDecoration: 'none' }}>Our Story</a>
          <a onClick={() => scrollToSection('venues')} className="font-display" style={{ fontSize: 28, color: '#36454F', cursor: 'pointer', textDecoration: 'none' }}>Venues</a>
          <a onClick={() => scrollToSection('weddings')} className="font-display" style={{ fontSize: 28, color: '#36454F', cursor: 'pointer', textDecoration: 'none' }}>Weddings</a>
          <a onClick={() => scrollToSection('gallery')} className="font-display" style={{ fontSize: 28, color: '#36454F', cursor: 'pointer', textDecoration: 'none' }}>Gallery</a>
          <a onClick={() => scrollToSection('contact')} className="font-display" style={{ fontSize: 28, color: '#36454F', cursor: 'pointer', textDecoration: 'none' }}>Contact</a>
        </div>
        <a onClick={() => scrollToSection('contact')} className="btn-gold" style={{ fontSize: 10, minWidth: 200, cursor: 'pointer' }}>Book a Viewing</a>
      </div>

      {/* Hero Section */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1920&h=1080&fit=crop&q=80" alt="Ashford House Estate" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)' }}></div>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(54, 69, 79, 0.8), rgba(54, 69, 79, 0.5), transparent)' }}></div>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(54, 69, 79, 0.5), transparent, rgba(54, 69, 79, 0.5))' }}></div>
        </div>

        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '96px 24px 128px', position: 'relative', zIndex: 10, width: '100%' }}>
          <div style={{ maxWidth: 672, margin: '0 auto', textAlign: 'center' }}>
            <span ref={addAosRef} className="aos-fade-up font-script" style={{ fontSize: 'clamp(24px, 4vw, 36px)', color: '#F7E7CE', marginBottom: 16, display: 'block', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>Where Dreams Begin</span>

            <h1 ref={addAosRef} className="aos-fade-up font-display" style={{ fontSize: 'clamp(36px, 6vw, 72px)', color: '#fff', marginBottom: 24, lineHeight: 1.1, textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
              A Timeless Setting for Your <em style={{ fontStyle: 'italic', color: '#FBF3E4' }}>Perfect Day</em>
            </h1>

            <p ref={addAosRef} className="aos-fade-up" style={{ fontSize: 'clamp(14px, 2vw, 18px)', color: 'rgba(255,255,255,0.9)', marginBottom: 40, lineHeight: 1.8, maxWidth: 512, margin: '0 auto 40px', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
              Nestled in 500 acres of pristine Irish countryside, Ashford House Estate offers an unparalleled setting for celebrations of love.
            </p>

            <div ref={addAosRef} className="aos-fade-up" style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center' }}>
              <a onClick={() => scrollToSection('contact')} className="btn-gold" style={{ cursor: 'pointer' }}>
                Arrange a Viewing
                <ArrowRight />
              </a>
              <a onClick={() => scrollToSection('venues')} className="btn-elegant-outline" style={{ borderColor: 'rgba(255,255,255,0.6)', color: '#fff', cursor: 'pointer', backdropFilter: 'blur(4px)' }}>
                Explore Venues
              </a>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}>
          <span style={{ display: 'block', color: 'rgba(255,255,255,0.7)', fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: 16, textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>Scroll to Discover</span>
          <div style={{ width: 1, height: 64, background: 'linear-gradient(to bottom, #C9A962, transparent)', margin: '0 auto' }}></div>
        </div>
      </section>

      {/* Introduction Section */}
      <section id="story" style={{ padding: '64px 24px 128px', background: '#FFFFF0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1024, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: 768, margin: '0 auto' }}>
            <div ref={addAosRef} className="aos-fade-up flourish" style={{ margin: '0 auto 32px' }}></div>

            <span ref={addAosRef} className="aos-fade-up font-script" style={{ fontSize: 'clamp(20px, 3vw, 28px)', color: '#C9A962', display: 'block', marginBottom: 16 }}>Welcome to</span>

            <h2 ref={addAosRef} className="aos-fade-up font-display" style={{ fontSize: 'clamp(28px, 5vw, 56px)', color: '#36454F', marginBottom: 32 }}>Ashford House Estate</h2>

            <p ref={addAosRef} className="aos-fade-up" style={{ color: '#4A5568', lineHeight: 1.8, marginBottom: 24, fontSize: 'clamp(14px, 1.5vw, 16px)' }}>
              For over two centuries, Ashford House has been a beacon of elegance in the heart of County Wicklow. Originally built in 1780 for the Earl of Ashford, this Georgian masterpiece has hosted generations of celebrations, from royal visits to intimate family gatherings.
            </p>

            <p ref={addAosRef} className="aos-fade-up" style={{ color: '#4A5568', lineHeight: 1.8, marginBottom: 40, fontSize: 'clamp(14px, 1.5vw, 16px)' }}>
              Today, we open our doors to couples seeking a wedding venue that transcends the ordinary—where every detail whispers romance, and every moment becomes a cherished memory.
            </p>

            <div ref={addAosRef} className="aos-fade-up elegant-divider">
              <span style={{ color: '#C9A962' }}>✦</span>
            </div>
          </div>
        </div>
      </section>

      {/* Venues Section */}
      <section id="venues" style={{ padding: '64px 24px 96px', background: '#FBF3E4' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          {/* Section Header */}
          <div style={{ textAlign: 'center', maxWidth: 768, margin: '0 auto 80px' }}>
            <span ref={addAosRef} className="aos-fade-up font-script" style={{ fontSize: 'clamp(20px, 3vw, 28px)', color: '#C9A962', display: 'block', marginBottom: 16 }}>Discover</span>
            <h2 ref={addAosRef} className="aos-fade-up font-display" style={{ fontSize: 'clamp(28px, 4vw, 48px)', color: '#36454F', marginBottom: 24 }}>Our Exceptional Venues</h2>
            <p ref={addAosRef} className="aos-fade-up" style={{ color: '#4A5568', fontSize: 'clamp(14px, 1.5vw, 16px)' }}>
              From grand ballrooms to intimate garden settings, choose the perfect backdrop for your celebration.
            </p>
          </div>

          {/* Venues */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 96 }}>
            {/* Venue 1 */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 64, alignItems: 'center' }}>
              <div ref={addAosRef} className="aos-fade-right image-elegant">
                <img src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=700&h=500&fit=crop&q=80" alt="The Grand Ballroom" style={{ width: '100%', height: 'clamp(300px, 40vw, 450px)', objectFit: 'cover' }} />
              </div>
              <div ref={addAosRef} className="aos-fade-left">
                <span className="font-script" style={{ fontSize: 'clamp(18px, 2vw, 24px)', color: '#C9A962', display: 'block', marginBottom: 8 }}>01</span>
                <h3 className="font-display" style={{ fontSize: 'clamp(24px, 3vw, 36px)', color: '#36454F', marginBottom: 16 }}>The Grand Ballroom</h3>
                <p style={{ color: '#4A5568', marginBottom: 24, lineHeight: 1.8, fontSize: 'clamp(14px, 1.5vw, 16px)' }}>
                  Our magnificent ballroom, with its soaring 18th-century ceilings, crystal chandeliers, and hand-painted murals, accommodates up to 200 guests for a truly regal celebration.
                </p>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#4A5568', fontSize: 14 }}>
                    <span style={{ color: '#C9A962' }}><UsersIcon /></span>
                    Capacity: 200 guests seated
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#4A5568', fontSize: 14 }}>
                    <span style={{ color: '#C9A962' }}><MaximizeIcon /></span>
                    500 square metres
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#4A5568', fontSize: 14 }}>
                    <span style={{ color: '#C9A962' }}><SparklesIcon /></span>
                    Original Georgian features
                  </li>
                </ul>
                <a onClick={() => scrollToSection('contact')} className="btn-elegant-outline" style={{ fontSize: 10, cursor: 'pointer' }}>Enquire About This Venue</a>
              </div>
            </div>

            {/* Venue 2 */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 64, alignItems: 'center' }}>
              <div ref={addAosRef} className="aos-fade-right" style={{ order: 2 }}>
                <span className="font-script" style={{ fontSize: 'clamp(18px, 2vw, 24px)', color: '#C9A962', display: 'block', marginBottom: 8 }}>02</span>
                <h3 className="font-display" style={{ fontSize: 'clamp(24px, 3vw, 36px)', color: '#36454F', marginBottom: 16 }}>The Orangery</h3>
                <p style={{ color: '#4A5568', marginBottom: 24, lineHeight: 1.8, fontSize: 'clamp(14px, 1.5vw, 16px)' }}>
                  A stunning Victorian glass conservatory filled with natural light and surrounded by manicured gardens. Perfect for ceremonies or intimate receptions of up to 80 guests.
                </p>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#4A5568', fontSize: 14 }}>
                    <span style={{ color: '#C9A962' }}><UsersIcon /></span>
                    Capacity: 80 guests seated
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#4A5568', fontSize: 14 }}>
                    <span style={{ color: '#C9A962' }}><SunIcon /></span>
                    Floor-to-ceiling windows
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#4A5568', fontSize: 14 }}>
                    <span style={{ color: '#C9A962' }}><FlowerIcon /></span>
                    Garden access
                  </li>
                </ul>
                <a onClick={() => scrollToSection('contact')} className="btn-elegant-outline" style={{ fontSize: 10, cursor: 'pointer' }}>Enquire About This Venue</a>
              </div>
              <div ref={addAosRef} className="aos-fade-left image-elegant" style={{ order: 1 }}>
                <img src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=700&h=500&fit=crop&q=80" alt="The Orangery" style={{ width: '100%', height: 'clamp(300px, 40vw, 450px)', objectFit: 'cover' }} />
              </div>
            </div>

            {/* Venue 3 */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 64, alignItems: 'center' }}>
              <div ref={addAosRef} className="aos-fade-right image-elegant">
                <img src="https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=700&h=500&fit=crop&q=80" alt="The Walled Garden" style={{ width: '100%', height: 'clamp(300px, 40vw, 450px)', objectFit: 'cover' }} />
              </div>
              <div ref={addAosRef} className="aos-fade-left">
                <span className="font-script" style={{ fontSize: 'clamp(18px, 2vw, 24px)', color: '#C9A962', display: 'block', marginBottom: 8 }}>03</span>
                <h3 className="font-display" style={{ fontSize: 'clamp(24px, 3vw, 36px)', color: '#36454F', marginBottom: 16 }}>The Walled Garden</h3>
                <p style={{ color: '#4A5568', marginBottom: 24, lineHeight: 1.8, fontSize: 'clamp(14px, 1.5vw, 16px)' }}>
                  An enchanting outdoor ceremony space within our historic walled garden. Ancient stone walls draped in climbing roses create a magical, secret garden atmosphere.
                </p>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#4A5568', fontSize: 14 }}>
                    <span style={{ color: '#C9A962' }}><UsersIcon /></span>
                    Capacity: 150 guests
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#4A5568', fontSize: 14 }}>
                    <span style={{ color: '#C9A962' }}><TreesIcon /></span>
                    Heritage rose garden
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#4A5568', fontSize: 14 }}>
                    <span style={{ color: '#C9A962' }}><TentIcon /></span>
                    Marquee available
                  </li>
                </ul>
                <a onClick={() => scrollToSection('contact')} className="btn-elegant-outline" style={{ fontSize: 10, cursor: 'pointer' }}>Enquire About This Venue</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Parallax Quote */}
      <section style={{ position: 'relative', padding: '80px 24px 160px', backgroundImage: "url('https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1920&h=800&fit=crop&q=80')", backgroundAttachment: 'fixed', backgroundPosition: 'center', backgroundSize: 'cover' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(54, 69, 79, 0.7)' }}></div>
        <div style={{ maxWidth: 896, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 10 }}>
          <div ref={addAosRef} className="aos-fade-up flourish" style={{ margin: '0 auto 32px', opacity: 0.5 }}></div>
          <blockquote ref={addAosRef} className="aos-fade-up font-display" style={{ fontSize: 'clamp(24px, 4vw, 48px)', color: '#fff', fontStyle: 'italic', lineHeight: 1.4, marginBottom: 32 }}>
            "A place where time stands still, and love blossoms eternal"
          </blockquote>
          <cite ref={addAosRef} className="aos-fade-up" style={{ color: '#F7E7CE', fontSize: 'clamp(11px, 1.5vw, 14px)', letterSpacing: '0.2em', textTransform: 'uppercase', fontStyle: 'normal' }}>— Condé Nast Traveller</cite>
        </div>
      </section>

      {/* Wedding Packages */}
      <section id="weddings" style={{ padding: '64px 24px 96px', background: '#FFFFF0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          {/* Section Header */}
          <div style={{ textAlign: 'center', maxWidth: 768, margin: '0 auto 80px' }}>
            <span ref={addAosRef} className="aos-fade-up font-script" style={{ fontSize: 'clamp(20px, 3vw, 28px)', color: '#C9A962', display: 'block', marginBottom: 16 }}>Celebrate</span>
            <h2 ref={addAosRef} className="aos-fade-up font-display" style={{ fontSize: 'clamp(28px, 4vw, 48px)', color: '#36454F', marginBottom: 24 }}>Wedding Experiences</h2>
            <p ref={addAosRef} className="aos-fade-up" style={{ color: '#4A5568', fontSize: 'clamp(14px, 1.5vw, 16px)' }}>
              Every wedding at Ashford House is as unique as the love it celebrates. Our dedicated team crafts bespoke experiences tailored to your vision.
            </p>
          </div>

          {/* Packages Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32 }}>
            {/* Package 1 */}
            <div ref={addAosRef} className="aos-fade-up venue-card" style={{ background: '#fff', boxShadow: '0 10px 40px -10px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ padding: '32px 40px', textAlign: 'center', borderBottom: '1px solid #E8D4B8' }}>
                <span className="font-script" style={{ fontSize: 24, color: '#C9A962', display: 'block', marginBottom: 8 }}>The</span>
                <h3 className="font-display" style={{ fontSize: 24, color: '#36454F', marginBottom: 16 }}>Intimate Celebration</h3>
                <p style={{ color: '#4A5568', fontSize: 14 }}>Up to 50 guests</p>
              </div>
              <div style={{ padding: '32px 40px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 32, flex: 1 }}>
                  {['Exclusive use of The Orangery', 'Champagne reception', 'Five-course tasting menu', 'Bridal suite overnight stay'].map((item, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, color: '#4A5568', fontSize: 14 }}>
                      <span style={{ color: '#C9A962', flexShrink: 0, marginTop: 2 }}><CheckIcon /></span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div style={{ textAlign: 'center', marginTop: 'auto' }}>
                  <span style={{ display: 'block', fontSize: 14, color: '#8B8378', marginBottom: 8 }}>From</span>
                  <span className="font-display" style={{ display: 'block', fontSize: 32, color: '#36454F', marginBottom: 24 }}>€15,000</span>
                  <a onClick={() => scrollToSection('contact')} className="btn-elegant-outline" style={{ fontSize: 10, width: '100%', cursor: 'pointer' }}>Request Details</a>
                </div>
              </div>
            </div>

            {/* Package 2 - Featured */}
            <div ref={addAosRef} className="aos-fade-up venue-card" style={{ background: '#fff', boxShadow: '0 20px 50px -10px rgba(0,0,0,0.12)', display: 'flex', flexDirection: 'column', position: 'relative', transform: 'translateY(-16px)' }}>
              <div style={{ position: 'absolute', top: -16, left: '50%', transform: 'translateX(-50%)', background: '#C9A962', color: '#36454F', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600, padding: '8px 24px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', zIndex: 10 }}>Most Popular</div>
              <div style={{ padding: '32px 40px', textAlign: 'center', borderBottom: '1px solid #E8D4B8', background: '#FBF3E4' }}>
                <span className="font-script" style={{ fontSize: 24, color: '#C9A962', display: 'block', marginBottom: 8 }}>The</span>
                <h3 className="font-display" style={{ fontSize: 24, color: '#36454F', marginBottom: 16 }}>Grand Affair</h3>
                <p style={{ color: '#4A5568', fontSize: 14 }}>Up to 150 guests</p>
              </div>
              <div style={{ padding: '32px 40px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 32, flex: 1 }}>
                  {['Grand Ballroom & gardens', 'Premium drinks package', 'Seven-course banquet', 'Two nights accommodation'].map((item, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, color: '#4A5568', fontSize: 14 }}>
                      <span style={{ color: '#C9A962', flexShrink: 0, marginTop: 2 }}><CheckIcon /></span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div style={{ textAlign: 'center', marginTop: 'auto' }}>
                  <span style={{ display: 'block', fontSize: 14, color: '#8B8378', marginBottom: 8 }}>From</span>
                  <span className="font-display" style={{ display: 'block', fontSize: 32, color: '#36454F', marginBottom: 24 }}>€35,000</span>
                  <a onClick={() => scrollToSection('contact')} className="btn-gold" style={{ fontSize: 10, width: '100%', cursor: 'pointer' }}>Request Details</a>
                </div>
              </div>
            </div>

            {/* Package 3 */}
            <div ref={addAosRef} className="aos-fade-up venue-card" style={{ background: '#fff', boxShadow: '0 10px 40px -10px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ padding: '32px 40px', textAlign: 'center', borderBottom: '1px solid #E8D4B8' }}>
                <span className="font-script" style={{ fontSize: 24, color: '#C9A962', display: 'block', marginBottom: 8 }}>The</span>
                <h3 className="font-display" style={{ fontSize: 24, color: '#36454F', marginBottom: 16 }}>Estate Exclusive</h3>
                <p style={{ color: '#4A5568', fontSize: 14 }}>Up to 200 guests</p>
              </div>
              <div style={{ padding: '32px 40px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 32, flex: 1 }}>
                  {['Full estate exclusivity', 'Unlimited premium bar', 'Bespoke menu design', 'Three nights for 20 guests'].map((item, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, color: '#4A5568', fontSize: 14 }}>
                      <span style={{ color: '#C9A962', flexShrink: 0, marginTop: 2 }}><CheckIcon /></span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div style={{ textAlign: 'center', marginTop: 'auto' }}>
                  <span style={{ display: 'block', fontSize: 14, color: '#8B8378', marginBottom: 8 }}>From</span>
                  <span className="font-display" style={{ display: 'block', fontSize: 32, color: '#36454F', marginBottom: 24 }}>€65,000</span>
                  <a onClick={() => scrollToSection('contact')} className="btn-elegant-outline" style={{ fontSize: 10, width: '100%', cursor: 'pointer' }}>Request Details</a>
                </div>
              </div>
            </div>
          </div>

          <p ref={addAosRef} className="aos-fade-up" style={{ textAlign: 'center', color: '#8B8378', fontSize: 14, marginTop: 48 }}>
            All packages are fully customisable. Contact us to discuss your unique requirements.
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" style={{ padding: '64px 24px 96px', background: '#FBF3E4' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          {/* Section Header */}
          <div style={{ textAlign: 'center', maxWidth: 768, margin: '0 auto 64px' }}>
            <span ref={addAosRef} className="aos-fade-up font-script" style={{ fontSize: 'clamp(20px, 3vw, 28px)', color: '#C9A962', display: 'block', marginBottom: 16 }}>Memories</span>
            <h2 ref={addAosRef} className="aos-fade-up font-display" style={{ fontSize: 'clamp(28px, 4vw, 48px)', color: '#36454F', marginBottom: 24 }}>A Glimpse of Magic</h2>
          </div>

          {/* Gallery Grid */}
          <div ref={addAosRef} className="aos-fade-up gallery-grid">
            <div className="gallery-item image-elegant" style={{ height: 256 }}>
              <img src="https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop&q=80" alt="Wedding ceremony" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div className="gallery-item image-elegant" style={{ height: 256 }}>
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&q=80" alt="Reception details" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div className="gallery-item image-elegant" style={{ height: 256 }}>
              <img src="https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=400&h=300&fit=crop&q=80" alt="Floral arrangements" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div className="gallery-item image-elegant" style={{ height: 256 }}>
              <img src="https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=400&h=300&fit=crop&q=80" alt="Estate grounds" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div className="gallery-item image-elegant" style={{ height: 256 }}>
              <img src="https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=400&h=300&fit=crop&q=80" alt="Couple portrait" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>

          {/* View More */}
          <div ref={addAosRef} className="aos-fade-up" style={{ textAlign: 'center', marginTop: 48 }}>
            <a href="#" className="btn-elegant-outline" style={{ fontSize: 10 }}>
              View Full Gallery
              <ImageIcon />
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: '64px 24px 96px', background: '#FFFFF0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          {/* Section Header */}
          <div style={{ textAlign: 'center', maxWidth: 768, margin: '0 auto 64px' }}>
            <span ref={addAosRef} className="aos-fade-up font-script" style={{ fontSize: 'clamp(20px, 3vw, 28px)', color: '#C9A962', display: 'block', marginBottom: 16 }}>Love Stories</span>
            <h2 ref={addAosRef} className="aos-fade-up font-display" style={{ fontSize: 'clamp(28px, 4vw, 48px)', color: '#36454F', marginBottom: 24 }}>From Our Couples</h2>
          </div>

          {/* Testimonials Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32 }}>
            <div ref={addAosRef} className="aos-fade-up testimonial-elegant">
              <div style={{ position: 'relative', zIndex: 10 }}>
                <p style={{ color: '#36454F', fontStyle: 'italic', fontSize: 'clamp(14px, 1.5vw, 18px)', lineHeight: 1.8, marginBottom: 32 }}>
                  "From the moment we visited Ashford House, we knew it was the one. The team made every detail feel effortless, and our guests are still talking about it two years later. It was truly the wedding of our dreams."
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&q=80" alt="Sarah & James" style={{ width: 56, height: 56, borderRadius: '50%', objectFit: 'cover', border: '2px solid #C9A962' }} />
                  <div>
                    <span className="font-display" style={{ display: 'block', fontSize: 20, color: '#36454F' }}>Sarah & James</span>
                    <span style={{ fontSize: 14, color: '#8B8378' }}>September 2024</span>
                  </div>
                </div>
              </div>
            </div>

            <div ref={addAosRef} className="aos-fade-up testimonial-elegant">
              <div style={{ position: 'relative', zIndex: 10 }}>
                <p style={{ color: '#36454F', fontStyle: 'italic', fontSize: 'clamp(14px, 1.5vw, 18px)', lineHeight: 1.8, marginBottom: 32 }}>
                  "The Walled Garden ceremony was absolutely magical—there wasn't a dry eye. The staff anticipated our every need, and the food was exceptional. Ashford House exceeded all expectations."
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&q=80" alt="Emma & Michael" style={{ width: 56, height: 56, borderRadius: '50%', objectFit: 'cover', border: '2px solid #C9A962' }} />
                  <div>
                    <span className="font-display" style={{ display: 'block', fontSize: 20, color: '#36454F' }}>Emma & Michael</span>
                    <span style={{ fontSize: 14, color: '#8B8378' }}>June 2024</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Press Section */}
      <section style={{ padding: '64px 24px', background: '#36454F' }}>
        <div style={{ maxWidth: 1024, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <span style={{ color: '#F7E7CE', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase' }}>As Featured In</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '32px 80px' }}>
            {['Vogue', 'Tatler', 'Country Life', 'The Irish Times', 'Condé Nast'].map((pub) => (
              <span key={pub} className="font-display" style={{ fontSize: 20, color: 'rgba(247, 231, 206, 0.5)', cursor: 'default', transition: 'color 0.3s' }}>{pub}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" style={{ padding: '64px 24px 96px', background: '#FFFFF0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 64 }}>
            {/* Left - Content */}
            <div style={{ textAlign: 'center' }}>
              <span ref={addAosRef} className="aos-fade-up font-script" style={{ fontSize: 'clamp(20px, 3vw, 28px)', color: '#C9A962', display: 'block', marginBottom: 16 }}>Begin Your Story</span>

              <h2 ref={addAosRef} className="aos-fade-up font-display" style={{ fontSize: 'clamp(28px, 4vw, 48px)', color: '#36454F', marginBottom: 24 }}>We Would Be Honoured to Host Your Celebration</h2>

              <p ref={addAosRef} className="aos-fade-up" style={{ color: '#4A5568', marginBottom: 40, lineHeight: 1.8, fontSize: 'clamp(14px, 1.5vw, 16px)' }}>
                To arrange a private viewing of our estate and discuss your wedding vision, please complete the enquiry form or contact our wedding team directly.
              </p>

              {/* Contact Details */}
              <div ref={addAosRef} className="aos-fade-up" style={{ display: 'flex', flexDirection: 'column', gap: 24, marginBottom: 40, textAlign: 'left', maxWidth: 400, margin: '0 auto 40px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                  <div style={{ width: 48, height: 48, background: '#F7E7CE', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ color: '#C9A962' }}><MapPinIcon /></span>
                  </div>
                  <div>
                    <h4 className="font-display" style={{ fontSize: 18, color: '#36454F', marginBottom: 4 }}>Location</h4>
                    <p style={{ color: '#4A5568', fontSize: 14, lineHeight: 1.6 }}>Ashford House Estate<br />Roundwood, County Wicklow<br />A98 X2Y1, Ireland</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                  <div style={{ width: 48, height: 48, background: '#F7E7CE', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ color: '#C9A962' }}><PhoneIcon /></span>
                  </div>
                  <div>
                    <h4 className="font-display" style={{ fontSize: 18, color: '#36454F', marginBottom: 4 }}>Telephone</h4>
                    <a href="tel:+353404567890" style={{ color: '#4A5568', fontSize: 14, textDecoration: 'none' }}>+353 404 567 890</a>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                  <div style={{ width: 48, height: 48, background: '#F7E7CE', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ color: '#C9A962' }}><MailIcon /></span>
                  </div>
                  <div>
                    <h4 className="font-display" style={{ fontSize: 18, color: '#36454F', marginBottom: 4 }}>Email</h4>
                    <a href="mailto:weddings@ashfordhouse.ie" style={{ color: '#4A5568', fontSize: 14, textDecoration: 'none' }}>weddings@ashfordhouse.ie</a>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div ref={addAosRef} className="aos-fade-up" style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
                {[InstagramIcon, FacebookIcon, LinkedinIcon].map((Icon, i) => (
                  <a key={i} href="#" style={{ width: 40, height: 40, border: '1px solid #E8D4B8', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8B8378', transition: 'all 0.3s' }}>
                    <Icon />
                  </a>
                ))}
              </div>
            </div>

            {/* Right - Form */}
            <div ref={addAosRef} className="aos-fade-left" style={{ background: '#fff', padding: 'clamp(24px, 4vw, 48px)', boxShadow: '0 10px 40px -10px rgba(0,0,0,0.08)' }}>
              <h3 className="font-display" style={{ fontSize: 24, color: '#36454F', marginBottom: 32, textAlign: 'center' }}>Wedding Enquiry</h3>

              <form className="form-elegant" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 24 }}>
                  <div>
                    <label>Your Name *</label>
                    <input type="text" placeholder="First & Last Name" />
                  </div>
                  <div>
                    <label>Partner's Name</label>
                    <input type="text" placeholder="First & Last Name" />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 24 }}>
                  <div>
                    <label>Email Address *</label>
                    <input type="email" placeholder="your@email.com" />
                  </div>
                  <div>
                    <label>Phone Number *</label>
                    <input type="tel" placeholder="+353" />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 24 }}>
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

                <button type="submit" className="btn-gold" style={{ width: '100%' }}>
                  Submit Enquiry
                  <SendIcon />
                </button>

                <p style={{ fontSize: 12, color: '#8B8378', textAlign: 'center' }}>
                  We respond to all enquiries within 48 hours.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#36454F', padding: '64px 24px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 48, marginBottom: 48 }}>
            {/* Brand */}
            <div style={{ textAlign: 'center' }}>
              <a href="#" style={{ display: 'block', marginBottom: 24, textDecoration: 'none' }}>
                <span className="font-script" style={{ display: 'block', fontSize: 32, color: '#F7E7CE' }}>Ashford House</span>
                <span style={{ display: 'block', fontSize: 9, letterSpacing: '0.4em', color: 'rgba(247, 231, 206, 0.5)', textTransform: 'uppercase', marginTop: 4 }}>Estate · Ireland</span>
              </a>
              <p style={{ fontSize: 14, color: 'rgba(247, 231, 206, 0.6)', lineHeight: 1.8 }}>
                A historic Georgian estate offering unparalleled luxury for weddings and celebrations in County Wicklow.
              </p>
            </div>

            {/* Quick Links */}
            <div style={{ textAlign: 'center' }}>
              <h4 className="font-display" style={{ fontSize: 18, color: '#F7E7CE', marginBottom: 16 }}>Explore</h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 12, fontSize: 14 }}>
                {['Our Story', 'Venues', 'Weddings', 'Gallery', 'Accommodation'].map((item) => (
                  <li key={item}><a href="#" style={{ color: 'rgba(247, 231, 206, 0.6)', textDecoration: 'none', transition: 'color 0.3s' }}>{item}</a></li>
                ))}
              </ul>
            </div>

            {/* Events */}
            <div style={{ textAlign: 'center' }}>
              <h4 className="font-display" style={{ fontSize: 18, color: '#F7E7CE', marginBottom: 16 }}>Events</h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 12, fontSize: 14 }}>
                {['Weddings', 'Corporate Events', 'Private Dining', 'Celebrations', 'Film & Photography'].map((item) => (
                  <li key={item}><a href="#" style={{ color: 'rgba(247, 231, 206, 0.6)', textDecoration: 'none', transition: 'color 0.3s' }}>{item}</a></li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div style={{ textAlign: 'center' }}>
              <h4 className="font-display" style={{ fontSize: 18, color: '#F7E7CE', marginBottom: 16 }}>Contact</h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 12, fontSize: 14, color: 'rgba(247, 231, 206, 0.6)' }}>
                <li>Roundwood, County Wicklow</li>
                <li>A98 X2Y1, Ireland</li>
                <li><a href="tel:+353404567890" style={{ color: 'inherit', textDecoration: 'none' }}>+353 404 567 890</a></li>
                <li><a href="mailto:weddings@ashfordhouse.ie" style={{ color: 'inherit', textDecoration: 'none' }}>weddings@ashfordhouse.ie</a></li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="elegant-divider" style={{ margin: '40px 0', opacity: 0.3 }}>
            <span style={{ color: '#C9A962' }}>✦</span>
          </div>

          {/* Bottom Bar */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 16, textAlign: 'center' }}>
            <p style={{ fontSize: 12, color: 'rgba(247, 231, 206, 0.4)' }}>© 2025 Ashford House Estate. All rights reserved.</p>
            <div style={{ display: 'flex', gap: 24, fontSize: 12, color: 'rgba(247, 231, 206, 0.4)' }}>
              <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy Policy</a>
              <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Terms & Conditions</a>
              <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Responsive styles */}
      <style jsx>{`
        @media (max-width: 1024px) {
          .hidden-mobile {
            display: none !important;
          }
          .lg-hidden {
            display: block !important;
          }
        }
        @media (min-width: 1025px) {
          .lg-hidden {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
