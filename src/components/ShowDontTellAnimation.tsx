'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function ShowDontTellAnimation({ scrollProgress = 0 }: { scrollProgress?: number }) {
  const textReveal = Math.min(scrollProgress * 2.5, 1);
  const fadeOut = Math.min(Math.max((scrollProgress - 0.6) * 2.5, 0), 1);

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden bg-white"
      style={{ opacity: 1 - fadeOut }}
    >
      {/* Section Label */}
      <motion.div
        style={{ opacity: Math.min(textReveal * 1.5, 1) }}
        className="text-center w-full px-4 mb-6"
      >
        <p className="text-xs tracking-[0.3em] uppercase text-[#888888]">Portfolio</p>
      </motion.div>

      {/* Main Headline */}
      <motion.div
        style={{
          opacity: textReveal,
          y: (1 - textReveal) * 30
        }}
        className="text-center w-full px-4"
      >
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#1a1a1a] mb-4">
          Quality brings clients.
        </h2>
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#888888]">
          We build quality.
        </h2>
      </motion.div>

      {/* Minimal decoration */}
      <motion.div
        style={{ opacity: Math.min(textReveal * 1.2, 1) }}
        className="mt-16"
      >
        <div className="w-12 h-px bg-[#e0e0e0]"></div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        style={{ opacity: Math.max(0, 1 - scrollProgress * 2) }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-3">
          <span className="text-xs text-[#888888] tracking-wide">Scroll to explore</span>
          <div className="w-px h-8 bg-gradient-to-b from-[#e0e0e0] to-transparent"></div>
        </div>
      </motion.div>
    </div>
  );
}
