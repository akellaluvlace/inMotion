'use client';

import React from 'react';
import { ArrowRight, MapPin, Award, Globe, Users } from 'lucide-react';
import Image from 'next/image';
import Navigation from '@/components/Navigation';

export default function AboutPage() {
  return (
    <div className="bg-white text-[#1a1a1a] font-sans min-h-screen selection:bg-black/10">

      {/* Navigation */}
      <Navigation currentPage="about" />

      {/* Main Content */}
      <main className="pt-28 px-4 pb-12 sm:pb-20">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <span className="text-xs tracking-[0.3em] uppercase text-[#888888] block mb-4">About</span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-[#1a1a1a]">
              The story.
            </h1>
          </div>

          {/* BENTO GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 sm:mb-8">

            {/* 1. Founder Photo - Large */}
            <div className="md:col-span-1 md:row-span-2 bg-[#fafafa] rounded-2xl sm:rounded-3xl overflow-hidden border border-[#e0e0e0] group hover:border-[#1a1a1a] transition-all">
              <div className="relative h-[300px] sm:h-[350px] md:h-full md:min-h-[400px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/aboutus/akella.jpeg"
                  alt="Founder"
                  className="absolute inset-0 w-full h-full object-cover object-top"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                  <p className="text-white font-bold text-lg sm:text-xl">Akella</p>
                  <p className="text-white/70 text-sm">Founder & Lead Developer</p>
                </div>
              </div>
            </div>

            {/* 2. Vision Statement - Wide */}
            <div className="md:col-span-2 bg-[#1a1a1a] rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 text-white flex flex-col justify-between min-h-[200px] group hover:bg-[#2a2a2a] transition-all">
              <div>
                <span className="text-xs tracking-[0.2em] uppercase text-white/50 mb-3 sm:mb-4 block">Vision</span>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight mb-3 sm:mb-4">
                  From enterprise infrastructure to <span className="text-[#27ca3f]">AI innovation.</span>
                </h2>
                <p className="text-white/70 leading-relaxed max-w-xl text-sm sm:text-base">
                  A veteran full-stack developer with a track record of hundreds of successful projects.
                  Recently relocated to Ireland, leading a hybrid team bridging top-tier Baltic engineering with Irish innovation.
                </p>
              </div>
              <div className="flex items-center gap-2 mt-4 sm:mt-6 text-white/50">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">Based in Dublin, Ireland</span>
              </div>
            </div>

            {/* 3. Ireland HQ */}
            <div className="bg-[#fafafa] rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-[#e0e0e0] hover:border-[#1a1a1a] transition-all group">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#e8fce8] rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 text-[#27ca3f] group-hover:scale-110 transition-transform">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="text-base sm:text-lg font-bold mb-2">HQ: Ireland</h3>
              <p className="text-xs text-[#888888] uppercase tracking-wider mb-2 sm:mb-3">Strategy & AI Architecture</p>
              <p className="text-sm text-[#666666] leading-relaxed">
                Based locally for face-to-face strategy sessions, architecture planning, and AI integration consulting.
              </p>
            </div>

            {/* 4. Lithuania Hub */}
            <div className="bg-[#fafafa] rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-[#e0e0e0] hover:border-[#1a1a1a] transition-all group">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#fef3c7] rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 text-[#d97706] group-hover:scale-110 transition-transform">
                <Users className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="text-base sm:text-lg font-bold mb-2">Hub: Lithuania</h3>
              <p className="text-xs text-[#888888] uppercase tracking-wider mb-2 sm:mb-3">Development & Scaling</p>
              <p className="text-sm text-[#666666] leading-relaxed">
                My dedicated team executes rapid development with cost-efficiency and uncompromising quality.
              </p>
            </div>
          </div>

          {/* AI CHALLENGE BANNER - Full Width */}
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden mb-6 sm:mb-8 group">
            <div className="relative h-[250px] sm:h-[300px] md:h-[400px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/aboutus/AI CHALLENGE.png"
                alt="TechIreland National AI Challenge"
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
              {/* Mobile: bottom gradient, Desktop: side gradient */}
              <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
              <div className="absolute inset-0 p-5 sm:p-8 md:p-12 flex flex-col justify-end sm:justify-center">
                <div className="inline-flex items-center gap-2 bg-[#27ca3f] text-white px-2.5 sm:px-3 py-1 rounded-full text-xs font-bold w-fit mb-3 sm:mb-4">
                  <Award className="w-3 h-3" />
                  2025 WINNER
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-4 max-w-lg">
                  National AI Challenge
                </h2>
                <p className="text-white/80 max-w-md leading-relaxed text-sm sm:text-base hidden sm:block">
                  Competed against Ireland&apos;s brightest technical minds and secured the top spot. We don&apos;t just build websites — we integrate intelligent automation.
                </p>
                <p className="text-white/80 leading-relaxed text-sm sm:hidden">
                  Top spot among Ireland&apos;s brightest technical minds.
                </p>
              </div>
            </div>
          </div>

          {/* JOURNEY SECTION */}
          <div className="mb-6 sm:mb-8">
            <div className="text-center mb-6 sm:mb-8">
              <span className="text-xs tracking-[0.3em] uppercase text-[#888888] block mb-2">Experience</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">The journey.</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {/* Ukio Bankas */}
              <div className="bg-[#fafafa] rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-[#e0e0e0] hover:border-[#3b82f6] transition-all group">
                <div className="h-10 sm:h-12 mb-4 sm:mb-6 flex items-center">
                  <Image
                    src="/assets/aboutus/UKIO BANKAS.png"
                    alt="Ukio Bankas"
                    width={100}
                    height={35}
                    className="object-contain grayscale group-hover:grayscale-0 transition-all"
                  />
                </div>
                <h4 className="font-bold text-base sm:text-lg mb-1">The Foundation</h4>
                <p className="text-xs text-[#3b82f6] uppercase tracking-wider mb-2 sm:mb-3">Engineering Intern</p>
                <p className="text-sm text-[#666666] leading-relaxed">
                  Learned fintech security protocols and data integrity in banking.
                </p>
              </div>

              {/* Hostinger */}
              <div className="bg-[#fafafa] rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-[#e0e0e0] hover:border-[#8b5cf6] transition-all group">
                <div className="h-10 sm:h-12 mb-4 sm:mb-6 flex items-center">
                  <Image
                    src="/assets/aboutus/HOSTINGER.png"
                    alt="Hostinger"
                    width={100}
                    height={35}
                    className="object-contain grayscale group-hover:grayscale-0 transition-all"
                  />
                </div>
                <h4 className="font-bold text-base sm:text-lg mb-1">The Scale</h4>
                <p className="text-xs text-[#8b5cf6] uppercase tracking-wider mb-2 sm:mb-3">Junior → Pro Developer</p>
                <p className="text-sm text-[#666666] leading-relaxed">
                  Mastered server-side optimization at a global tech giant.
                </p>
              </div>

              {/* IKI */}
              <div className="bg-[#fafafa] rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-[#e0e0e0] hover:border-[#f59e0b] transition-all group">
                <div className="h-10 sm:h-12 mb-4 sm:mb-6 flex items-center">
                  <Image
                    src="/assets/aboutus/IKI.png"
                    alt="IKI"
                    width={70}
                    height={35}
                    className="object-contain grayscale group-hover:grayscale-0 transition-all"
                  />
                </div>
                <h4 className="font-bold text-base sm:text-lg mb-1">The Enterprise</h4>
                <p className="text-xs text-[#f59e0b] uppercase tracking-wider mb-2 sm:mb-3">Lead Web Architect</p>
                <p className="text-sm text-[#666666] leading-relaxed">
                  Designed custom CMS for major retail, millions of visitors.
                </p>
              </div>

              {/* Studio */}
              <div className="bg-[#1a1a1a] rounded-2xl sm:rounded-3xl p-5 sm:p-6 text-white group hover:bg-[#2a2a2a] transition-all">
                <div className="h-10 sm:h-12 mb-4 sm:mb-6 flex items-center">
                  <Globe className="w-8 h-8 sm:w-10 sm:h-10 text-[#27ca3f]" />
                </div>
                <h4 className="font-bold text-base sm:text-lg mb-1">The Studio</h4>
                <p className="text-xs text-[#27ca3f] uppercase tracking-wider mb-2 sm:mb-3">Founder</p>
                <p className="text-sm text-white/70 leading-relaxed">
                  Founded my own studio. Hundreds of websites delivered.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-[#fafafa] rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 text-center border border-[#e0e0e0]">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">Ready to build something?</h3>
            <p className="text-[#666666] mb-6 sm:mb-8 max-w-md mx-auto text-sm sm:text-base">
              Let&apos;s discuss your project. Book a free discovery call and get a fixed quote within 24 hours.
            </p>
            <a
              href="/#contact"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-[#1a1a1a] hover:bg-[#333333] rounded-xl text-white font-semibold transition-all text-sm sm:text-base"
            >
              Start a Project
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="py-10 sm:py-16 px-4 border-t border-[#e0e0e0]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-8">
            <div className="flex items-center">
              <span className="text-lg font-semibold text-[#1a1a1a]">Akella <span className="font-normal text-[#888888]">inMotion</span></span>
            </div>
            <div className="text-sm text-[#888888]">
              © 2025 · Dublin, Ireland
            </div>
          </div>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        .glass-strong {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(40px);
          -webkit-backdrop-filter: blur(40px);
        }
      `}} />
    </div>
  );
}
