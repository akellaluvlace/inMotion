'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function ShowDontTellAnimation({ scrollProgress = 0 }: { scrollProgress?: number }) {
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [showCursor, setShowCursor] = useState(true);

  // Terminal compilation sequence
  const compilationSteps = [
    '$ npm run build',
    '',
    '> akella-website@1.0.0 build',
    '> next build',
    '',
    '   Creating optimized build...',
    '   ✓ Compiled successfully',
    '   ✓ Linting passed',
    '   ✓ Type checking complete',
    '   ✓ Generating static pages',
    '',
    '   Route (app)              Size',
    '   ┌ ○ /                    4.2 kB',
    '   └ ○ /examples            2.8 kB',
    '',
    '   ✓ Build completed in 3.2s',
    '   ✓ Ready for deployment',
  ];

  // Show text phase (0-0.3) then terminal phase (0.3-0.6)
  const textPhase = scrollProgress < 0.3;
  const terminalPhase = scrollProgress >= 0.3 && scrollProgress < 0.6;
  const fadeOut = Math.min(Math.max((scrollProgress - 0.55) * 10, 0), 1);

  const textReveal = textPhase ? Math.min(scrollProgress * 4, 1) : 1;
  const textFadeToTerminal = textPhase ? 1 : Math.max(0, 1 - (scrollProgress - 0.3) * 10);

  const terminalReveal = terminalPhase ? Math.min((scrollProgress - 0.3) * 4, 1) : (scrollProgress >= 0.6 ? 1 : 0);

  useEffect(() => {
    if (terminalPhase && terminalLines.length < compilationSteps.length) {
      const progress = (scrollProgress - 0.3) / 0.3; // 0 to 1 during terminal phase
      const linesToShow = Math.floor(progress * compilationSteps.length);
      if (linesToShow > terminalLines.length) {
        setTerminalLines(compilationSteps.slice(0, linesToShow));
      }
    } else if (!terminalPhase && scrollProgress < 0.3) {
      setTerminalLines([]);
    }
  }, [scrollProgress, terminalPhase, terminalLines.length]);

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => setShowCursor(c => !c), 530);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden bg-white"
      style={{ opacity: 1 - fadeOut }}
    >
      {/* Text Phase - Quality brings clients */}
      <motion.div
        style={{
          opacity: textFadeToTerminal * textReveal,
          scale: 0.95 + textReveal * 0.05,
          position: 'absolute'
        }}
        className="text-center w-full px-4"
      >
        <p className="text-xs tracking-[0.3em] uppercase text-[#888888] mb-8">Portfolio</p>
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#1a1a1a] mb-4">
          Quality brings clients.
        </h2>
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#888888]">
          We build quality.
        </h2>
      </motion.div>

      {/* Terminal Phase - Compilation mockup */}
      <motion.div
        style={{
          opacity: terminalReveal,
          scale: 0.95 + terminalReveal * 0.05,
        }}
        className="w-full max-w-2xl px-4"
      >
        <div className="bg-[#1a1a1a] rounded-2xl overflow-hidden shadow-2xl">
          {/* Terminal header */}
          <div className="flex items-center gap-2 px-4 py-3 bg-[#2a2a2a] border-b border-[#333]">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
            <div className="w-3 h-3 rounded-full bg-[#27ca3f]"></div>
            <span className="ml-3 text-xs text-[#666] font-mono">terminal — build</span>
          </div>

          {/* Terminal content */}
          <div className="p-6 font-mono text-sm leading-relaxed min-h-[320px]">
            {terminalLines.map((line, i) => (
              <div
                key={i}
                className={`${
                  line.startsWith('$') ? 'text-[#27ca3f]' :
                  line.startsWith('   ✓') ? 'text-[#27ca3f]' :
                  line.startsWith('   ┌') || line.startsWith('   └') ? 'text-[#888]' :
                  line.startsWith('>') ? 'text-[#666]' :
                  'text-[#ccc]'
                }`}
                style={{
                  animation: 'terminalLine 0.15s ease-out',
                }}
              >
                {line || '\u00A0'}
              </div>
            ))}
            {terminalPhase && terminalLines.length < compilationSteps.length && (
              <span className={`text-[#27ca3f] ${showCursor ? 'opacity-100' : 'opacity-0'}`}>▋</span>
            )}
            {terminalLines.length === compilationSteps.length && (
              <div className="mt-4 text-[#888] text-xs">
                <span className="text-[#27ca3f]">→</span> Scroll to see examples
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Scroll hint - only during text phase */}
      <motion.div
        style={{ opacity: Math.max(0, 1 - scrollProgress * 5) }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-3">
          <span className="text-xs text-[#888888] tracking-wide">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-[#e0e0e0] to-transparent"></div>
        </div>
      </motion.div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes terminalLine {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </div>
  );
}
