'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Folder, Search, GitBranch, Settings, X, ChevronRight, ChevronDown, Terminal as TerminalIcon, Globe, Layout, Image as ImageIcon, MousePointer2 } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

// --- Terminal Logic ---
const SEQUENCE = [
  { cmd: 'init_sequence.exe', action: 'init', log: 'INITIALIZING...' },
  { cmd: 'allocating_layout', action: 'layout', log: 'CREATING WIREFRAME...' },
  { cmd: 'inject --header', action: 'navbar', log: 'NAVBAR MODULE LOADED' },
  { cmd: 'inject --hero', action: 'hero', log: 'HERO SECTION RENDERED' },
  { cmd: 'inject --content', action: 'grid', log: 'CONTENT GRID ASSEMBLED' },
  { cmd: 'apply_styles --retro', action: 'styles', log: 'APPLYING STYLESHEETS...' },
  { cmd: 'optimize_assets', action: 'optimize', log: 'ASSETS OPTIMIZED' },
  { cmd: 'status_check', action: 'check', log: 'SYSTEM STABLE' },
  { cmd: 'load --max_power', action: 'stress', log: 'WARNING: OVERLOAD' },
  { cmd: 'CRITICAL_FAILURE', action: 'crash', log: 'FATAL ERROR 0xDEAD' },
];

const RealTerminal = ({ progress }: { progress: number }) => {
  const totalSteps = SEQUENCE.length;
  const safeProgress = Math.min(Math.max(progress * 2.2, 0), 1);
  const currentIndex = Math.floor(safeProgress * totalSteps);
  
  const visibleLogs = SEQUENCE.slice(0, currentIndex + 1);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [visibleLogs.length]);

  return (
    <div className="w-full h-full bg-black font-mono text-xs sm:text-sm flex flex-col relative overflow-hidden border-r border-white/10">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-green-900/5 to-transparent bg-[length:100%_3px]"></div>

      <div className="bg-[#1a1a1a] text-green-500 px-3 py-2 flex items-center gap-2 shrink-0 border-b border-green-900/30">
         <TerminalIcon size={14} />
         <span className="font-bold tracking-widest text-[10px]">ROOT_ACCESS_TERMINAL</span>
      </div>

      <div ref={scrollRef} className="flex-1 p-6 overflow-y-auto space-y-2 font-mono scroll-smooth">
        {visibleLogs.map((step, i) => (
          <div key={i} className="flex flex-col animate-in fade-in slide-in-from-left-2 duration-100">
            <div className="flex gap-2">
              <span className="text-green-700 font-bold">{'>'}</span>
              <span className="text-green-400 font-bold typing-effect">{step.cmd}</span>
            </div>
            {step.log && (
              <div className={cn(
                "pl-4 text-[10px] tracking-wider",
                step.log.includes("ERROR") || step.log.includes("WARNING") ? "text-red-500 font-bold blink" : "text-green-800"
              )}>
                {step.log}
              </div>
            )}
          </div>
        ))}
        <div className="flex items-center gap-2">
           <span className="text-green-500 font-bold">{'>'}</span>
           <span className="w-2 h-4 bg-green-500 animate-pulse block"></span>
        </div>
        <div className="h-8"></div>
      </div>
    </div>
  );
};

// --- Retro Website Preview ---
const WebsitePreview = ({ progress }: { progress: number }) => {
  const totalSteps = SEQUENCE.length;
  const safeProgress = Math.min(Math.max(progress * 2.2, 0), 1);
  const currentIndex = Math.floor(safeProgress * totalSteps);
  
  const hasLayout = currentIndex >= 1;
  const hasNavbar = currentIndex >= 2;
  const hasHero = currentIndex >= 3;
  const hasGrid = currentIndex >= 4;
  const hasStyles = currentIndex >= 5;
  const isCrashed = progress > 0.45 && progress < 0.6;

  return (
    <div className={cn(
      "w-full h-full bg-[#111] p-8 flex items-center justify-center transition-colors duration-100 relative overflow-hidden font-mono",
      isCrashed && "bg-red-950"
    )}>
      <div className="absolute inset-0 opacity-20 pointer-events-none" 
           style={{ 
             backgroundImage: `linear-gradient(${isCrashed ? '#500' : '#030'} 1px, transparent 1px), linear-gradient(90deg, ${isCrashed ? '#500' : '#030'} 1px, transparent 1px)`, 
             backgroundSize: '20px 20px' 
           }}>
      </div>

      {isCrashed && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
           <div className="border-4 border-red-600 p-8 bg-black text-red-600 font-black text-5xl tracking-widest transform -rotate-6 shadow-[0_0_30px_rgba(220,38,38,0.6)]">
             FATAL ERROR
           </div>
        </div>
      )}

      {/* Browser Window Frame (Retro Style) */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: hasLayout ? 1 : 0, scale: hasLayout ? 1 : 0.8 }}
        className="w-full h-full max-w-md bg-[#000] border border-green-800 flex flex-col shadow-[0_0_20px_rgba(0,50,0,0.3)] relative z-10 overflow-hidden"
      >
        {/* Browser Header */}
        <div className="h-6 bg-green-900/20 border-b border-green-800 flex items-center px-2 justify-between shrink-0">
           <div className="text-[9px] text-green-600 font-bold">NETSCAPE NAVIGATOR v1.0</div>
           <div className="flex gap-1">
             <div className="w-2 h-2 border border-green-700 bg-green-900/50"></div>
             <div className="w-2 h-2 border border-green-700 bg-green-900/50"></div>
           </div>
        </div>

        {/* Website Canvas */}
        <div className="flex-1 p-4 flex flex-col gap-4 overflow-hidden relative">
           {/* Scanline overlay for retro feel */}
           <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-20 bg-[length:100%_2px,3px_100%]"></div>

           {/* Navbar */}
           <motion.div 
             initial={{ opacity: 0, y: -20 }}
             animate={{ opacity: hasNavbar ? 1 : 0, y: hasNavbar ? 0 : -20 }}
             className={cn(
               "h-8 w-full border border-dashed border-green-700/50 flex items-center justify-between px-3 shrink-0",
               hasStyles && "border-solid bg-green-900/20 border-green-600"
             )}
           >
              <div className={cn("w-20 h-2 bg-green-900/30", hasStyles && "bg-green-500")}></div>
              <div className="flex gap-2">
                <div className={cn("w-8 h-2 bg-green-900/20", hasStyles && "bg-green-700")}></div>
                <div className={cn("w-8 h-2 bg-green-900/20", hasStyles && "bg-green-700")}></div>
              </div>
           </motion.div>

           {/* Hero */}
           <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: hasHero ? 1 : 0, scale: hasHero ? 1 : 0.9 }}
             className={cn(
               "h-32 w-full border border-dashed border-green-700/50 flex flex-col items-center justify-center gap-3 shrink-0",
               hasStyles && "border-solid bg-green-900/10 border-green-600"
             )}
           >
              <Layout className={cn("w-8 h-8 text-green-900", hasStyles && "text-green-500")} />
              <div className={cn("w-32 h-2 bg-green-900/30", hasStyles && "bg-green-500")}></div>
              
              {hasStyles && (
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center gap-2 mt-1 px-3 py-1 border border-green-500 text-[8px] text-green-500 font-bold hover:bg-green-500 hover:text-black cursor-pointer"
                >
                  <MousePointer2 size={8} />
                  CLICK ME
                </motion.div>
              )}
           </motion.div>

           {/* Grid */}
           <div className="flex-1 grid grid-cols-2 gap-3 min-h-0">
             {[1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: hasGrid ? 1 : 0, y: hasGrid ? 0 : 10 }}
                  transition={{ delay: i * 0.05 }}
                  className={cn(
                    "w-full h-full border border-dashed border-green-800/50 min-h-[40px]",
                    hasStyles && "border-solid bg-green-900/20 border-green-700"
                  )}
                />
             ))}
           </div>

        </div>
      </motion.div>
    </div>
  );
};

// --- VS Code Window (Underneath) ---
const VSCodeWindow = () => {
  return (
    <div className="w-full h-full bg-[#1e1e1e] rounded-xl border border-white/10 shadow-2xl overflow-hidden flex flex-col font-sans relative z-0">
      {/* Title Bar */}
      <div className="h-10 bg-[#3c3c3c] flex items-center justify-between px-4 select-none shrink-0 border-b border-black/20">
        <div className="flex items-center gap-4 text-xs text-slate-400">
          <div className="flex gap-2 group">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
          </div>
          <span className="ml-4">akella-in-motion — src/components/LandingPage.tsx</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Activity Bar */}
        <div className="w-12 bg-[#333333] border-r border-[#1e1e1e] flex flex-col items-center py-4 gap-6 shrink-0 z-10">
          <Folder className="w-6 h-6 text-white" />
          <Search className="w-6 h-6 text-slate-500" />
          <GitBranch className="w-6 h-6 text-slate-500" />
        </div>

        {/* Sidebar */}
        <div className="w-64 bg-[#252526] border-r border-[#1e1e1e] flex flex-col shrink-0 hidden md:flex">
          <div className="p-4">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-4 pt-2">Explorer</div>
            <div className="space-y-0.5">
              <div className="flex items-center gap-1 text-sm text-slate-300 px-2 py-1 cursor-pointer hover:bg-[#2a2d2e]">
                <ChevronDown className="w-4 h-4" />
                <span className="font-bold text-xs">AKELLA-IN-MOTION</span>
              </div>
              <div className="pl-4">
                <div className="flex items-center gap-1 text-sm text-slate-400 px-2 py-1 cursor-pointer hover:bg-[#2a2d2e]">
                  <ChevronRight className="w-4 h-4" />
                  <Folder className="w-3 h-3 text-blue-400" />
                  <span>src</span>
                </div>
                <div className="pl-4">
                  <div className="flex items-center gap-1 text-sm text-slate-400 px-2 py-1 cursor-pointer hover:bg-[#2a2d2e]">
                    <ChevronRight className="w-4 h-4" />
                    <Folder className="w-3 h-3 text-green-400" />
                    <span>components</span>
                  </div>
                  <div className="pl-4">
                    <div className="flex items-center gap-2 text-sm text-white bg-[#37373d] px-2 py-1 cursor-pointer">
                      <Code2 className="w-4 h-4 text-blue-300" />
                      <span>page.tsx</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Editor Area */}
        <div className="flex-1 flex flex-col bg-[#1e1e1e] overflow-hidden min-w-0">
          <div className="h-9 bg-[#2d2d2d] flex items-center border-b border-[#1e1e1e] overflow-x-auto no-scrollbar shrink-0">
            <div className="flex items-center gap-2 text-sm text-white bg-[#1e1e1e] border-t-2 border-indigo-400 h-full px-3 min-w-fit">
              <Code2 className="w-4 h-4 text-blue-400" />
              <span>page.tsx</span>
              <X className="w-3 h-3 ml-2 opacity-50 hover:bg-slate-700 rounded" />
            </div>
          </div>
          <div className="flex-1 p-4 overflow-hidden relative font-mono text-sm">
            <div className="flex gap-4 h-full">
               <div className="flex flex-col text-[#858585] select-none text-right pr-4 border-r border-[#404040]">
                {Array.from({length: 15}).map((_, i) => (
                  <span key={i} className="leading-6">{i + 1}</span>
                ))}
              </div>
              <div className="flex flex-col text-slate-300 leading-6 whitespace-pre">
                <div><span className="text-[#c586c0]">export</span> <span className="text-[#c586c0]">default</span> <span className="text-[#569cd6]">function</span> <span className="text-[#dcdcaa]">Home</span>() {'{'}</div>
                <div>  <span className="text-[#c586c0]">return</span> (</div>
                <div>    <span className="text-[#808080]">&lt;</span><span className="text-[#569cd6]">main</span> <span className="text-[#9cdcfe]">className</span>=<span className="text-[#ce9178]">&quot;min-h-screen p-24&quot;</span><span className="text-[#808080]">&gt;</span></div>
                <div>      <span className="text-[#808080]">&lt;</span><span className="text-[#4ec9b0]">Hero</span></div>
                <div>        <span className="text-[#9cdcfe]">title</span>=<span className="text-[#ce9178]">&quot;Show. Don&apos;t tell.&quot;</span></div>
                <div>        <span className="text-[#9cdcfe]">description</span>=<span className="text-[#ce9178]">&quot;Experience over explanation.&quot;</span> <span className="text-[#808080]">/&gt;</span></div>
                <div>      <span className="text-[#808080]">&lt;</span><span className="text-[#4ec9b0]">Features</span> <span className="text-[#9cdcfe]">grid</span>=<span className="text-[#569cd6]">{'{'}</span><span className="text-[#b5cea8]">true</span><span className="text-[#569cd6]">{'}'}</span> <span className="text-[#808080]">/&gt;</span></div>
                <div>      <span className="text-[#808080]">&lt;</span><span className="text-[#4ec9b0]">Pricing</span> <span className="text-[#9cdcfe]">highlight</span>=<span className="text-[#ce9178]">&quot;pro&quot;</span> <span className="text-[#808080]">/&gt;</span></div>
                <div>    <span className="text-[#808080]">&lt;/</span><span className="text-[#569cd6]">main</span><span className="text-[#808080]">&gt;</span></div>
                <div>  );</div>
                <div>{'}'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ShowDontTellAnimation({ scrollProgress = 0 }: { scrollProgress?: number }) {
  // Phases:
  // 0.0 - 0.45: Building Phase (Left: Terminal typing, Right: Website building)
  // 0.45 - 0.55: Crash Phase (Red flash, error logs)
  // 0.55 - 0.65: Reveal Phase (Slide out)
  // 0.65 - 1.0: VS Code Phase (Underneath visible)

  // Calculate reveal split
  // Starts at 0.55, ends at 0.65
  const revealProgress = Math.min(Math.max((scrollProgress - 0.55) * 10, 0), 1);
  
  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden font-sans">
      <motion.div 
        style={{ opacity: 1 - Math.min(scrollProgress * 2, 1) }}
        className="absolute top-[5%] z-30 text-center w-full px-4"
      >
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 mb-4 tracking-tight">
          We code just like you&apos;ve seen in movies.
        </h2>
      </motion.div>

      <div className="relative w-full h-screen p-0 md:p-10 flex items-center justify-center">
        
        {/* Layer 1: VS Code (Underneath) */}
        {/* This is what we see when the doors open */}
        <div className="absolute inset-0 md:inset-10 z-0 flex items-center justify-center">
           <div className="w-full h-full shadow-[0_0_100px_rgba(99,102,241,0.2)]">
             <VSCodeWindow />
           </div>
        </div>

        {/* Layer 2: Split Overlay (Terminal Left | Website Right) */}
        {/* This covers Layer 1 until split */}
        <div className="absolute inset-0 z-10 flex pointer-events-none md:p-10 overflow-hidden">
           {/* We use a container that matches the VS Code size exactly so the split feels like the 'screen' cracking open */}
           <div className="w-full h-full relative flex">
              
              {/* Left Half: Terminal */}
              <motion.div 
                style={{ 
                   x: `${revealProgress * -100}%`,
                   opacity: revealProgress > 0.9 ? 0 : 1
                }}
                className="w-1/2 h-full bg-[#1e1e1e] border-r border-green-900 overflow-hidden relative shadow-2xl z-20"
              >
                  {/* Inner width 200% */}
                 <div className="w-[200%] h-full absolute top-0 left-0">
                    <RealTerminal progress={scrollProgress} />
                 </div>
              </motion.div>

              {/* Right Half: Website Preview */}
              <motion.div 
                style={{ 
                   x: `${revealProgress * 100}%`,
                   opacity: revealProgress > 0.9 ? 0 : 1
                }}
                className="w-1/2 h-full bg-[#111] overflow-hidden relative shadow-2xl z-20"
              >
                 {/* Inner width 200%, shifted left by 100% */}
                 <div className="w-[200%] h-full absolute top-0 -left-[100%]">
                    <WebsitePreview progress={scrollProgress} />
                 </div>
              </motion.div>
           </div>
        </div>

      </div>
    </div>
  );
}