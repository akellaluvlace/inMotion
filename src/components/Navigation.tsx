'use client';

import { useState } from 'react';
import { ArrowRight, Sparkles, Menu, X } from 'lucide-react';

interface NavigationProps {
  currentPage?: 'home' | 'about';
}

export default function Navigation({ currentPage = 'home' }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/#services', label: 'Services', highlight: false },
    { href: '/#services', label: 'Pricing', highlight: false },
    { href: '/#vibe-rescue', label: 'Vibe Rescue', icon: Sparkles, highlight: true },
    { href: '/#process', label: 'Process', highlight: false },
    { href: '/about', label: 'About', highlight: false },
  ];

  const isActive = (href: string) => {
    if (currentPage === 'about' && href === '/about') return true;
    return false;
  };

  return (
    <nav className="fixed w-full z-50 px-4 py-4 transition-all duration-300 nav-load">
      <div className="max-w-6xl mx-auto">
        <div className="glass-strong rounded-2xl px-4 sm:px-6 py-3 flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center group">
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight leading-none text-[#1a1a1a]">Akella</span>
              <span className="text-xs text-[#666666] font-medium tracking-wider">inMotion</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href + link.label}
                href={link.href}
                className={`px-4 py-2 text-sm transition-colors rounded-lg hover:bg-black/5 flex items-center gap-2
                  ${isActive(link.href)
                    ? 'text-[#1a1a1a] font-medium bg-black/5'
                    : link.highlight
                      ? 'text-[#1a1a1a] hover:text-[#333333]'
                      : 'text-[#666666] hover:text-[#1a1a1a]'
                  }`}
              >
                {link.icon && <link.icon className="w-4 h-4" />}
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA Button */}
          <a
            href="/#contact"
            className="hidden sm:flex btn-primary px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
          >
            <span className="flex items-center gap-2">
              Start Project
              <ArrowRight className="w-4 h-4" />
            </span>
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-black/5 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 glass-strong rounded-2xl overflow-hidden">
            <div className="flex flex-col p-4 gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href + link.label}
                  href={link.href}
                  className={`px-4 py-3 rounded-xl transition-colors flex items-center gap-2
                    ${isActive(link.href)
                      ? 'text-[#1a1a1a] font-medium bg-black/5'
                      : link.highlight
                        ? 'text-[#1a1a1a] hover:bg-black/5'
                        : 'text-[#666666] hover:text-[#1a1a1a] hover:bg-black/5'
                    }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.icon && <link.icon className="w-4 h-4" />}
                  {link.label}
                </a>
              ))}
              <a
                href="/#contact"
                className="mt-2 px-4 py-3 btn-primary text-white font-semibold rounded-xl text-center flex items-center justify-center gap-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Start Project
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
