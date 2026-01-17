'use client';

import React from 'react';
import { ArrowRight, MapPin } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-white text-[#1a1a1a] font-sans min-h-screen selection:bg-black/10 selection:text-[#1a1a1a]">
      
      {/* Navigation - Duplicated for consistency or Import Component if extracted */}
      <nav className="fixed w-full z-50 px-4 py-4">
        <div className="max-w-6xl mx-auto">
          <div className="glass-strong rounded-2xl px-6 py-3 flex items-center justify-between border border-[#e0e0e0]">
            {/* Logo */}
            <a href="/" className="flex items-center group">
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight leading-none text-[#1a1a1a]">Akella</span>
                <span className="text-xs text-[#666666] font-medium tracking-wider">inMotion</span>
              </div>
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              <a href="/#services" className="px-4 py-2 text-sm text-[#666666] hover:text-[#1a1a1a] transition-colors rounded-lg hover:bg-black/5">Services</a>
              <a href="/#pricing" className="px-4 py-2 text-sm text-[#666666] hover:text-[#1a1a1a] transition-colors rounded-lg hover:bg-black/5">Pricing</a>
              <a href="/about" className="px-4 py-2 text-sm text-[#1a1a1a] font-medium bg-black/5 rounded-lg transition-colors">About</a>
            </div>

            {/* CTA Button */}
            <a href="/#contact" className="px-5 py-2.5 bg-[#1a1a1a] hover:bg-[#333333] rounded-xl text-sm font-semibold text-white transition-all">
              <span className="flex items-center gap-2">
                Start Project
                <ArrowRight className="w-4 h-4" />
              </span>
            </a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-32 px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          
          <div className="mb-16">
            <span className="text-xs tracking-[0.3em] uppercase text-[#888888] block mb-4">About Us</span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-[#1a1a1a] mb-8">
              Digital craftsmanship <br />
              <span className="text-[#666666]">from Dublin.</span>
            </h1>
            <p className="text-xl text-[#666666] leading-relaxed max-w-2xl">
              We are a small, dedicated team of developers and designers based in Dublin, Ireland. 
              We believe in clean code, clear communication, and websites that actually work for your business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Our Philosophy</h2>
              <p className="text-[#666666] leading-relaxed">
                The web has become cluttered. Heavy frameworks, slow load times, and generic templates. 
                We stand for the opposite. We build bespoke, lightweight, and high-performance digital experiences.
              </p>
              <p className="text-[#666666] leading-relaxed">
                No bloated page builders. No hidden fees. Just handcrafted digital products built to last.
              </p>
            </div>
            
            <div className="bg-[#fafafa] rounded-3xl p-8 border border-[#e0e0e0]">
              <div className="flex items-start gap-4 mb-6">
                <MapPin className="w-6 h-6 text-[#1a1a1a]" />
                <div>
                  <h3 className="font-bold text-[#1a1a1a]">Dublin HQ</h3>
                  <p className="text-sm text-[#666666] mt-1">Available for in-person meetings in Dublin city centre.</p>
                </div>
              </div>
              <div className="h-48 bg-[#e0e0e0] rounded-xl flex items-center justify-center text-[#888888]">
                {/* Placeholder for map or office image */}
                <span className="text-xs tracking-widest uppercase">Dublin, IE</span>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Footer - Consistent with Landing */}
      <footer className="py-16 px-4 border-t border-[#e0e0e0] mt-auto">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center">
              <span className="text-lg font-semibold text-[#1a1a1a]">Akella <span className="font-normal text-[#888888]">inMotion</span></span>
            </div>
            <div className="text-sm text-[#888888]">
              © 2025 · Dublin
            </div>
          </div>
        </div>
      </footer>

      {/* Styles for glass effect match landing page */}
      <style jsx global>{`
        .glass-strong {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(40px);
            -webkit-backdrop-filter: blur(40px);
        }
      `}</style>
    </div>
  );
}
