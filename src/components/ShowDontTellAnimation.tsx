'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Folder, Search, GitBranch, Settings, X, ChevronRight, ChevronDown, Terminal as TerminalIcon, Globe, Layout, Image as ImageIcon, MousePointer2, FileCode, FileJson, AlertTriangle, Play } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

// --- Realistic Build Sequence ---
const SEQUENCE = [
  { cmd: 'git clone repo-v1', action: 'git', log: 'Cloning into \'repo-v1\'' },
  { cmd: 'npm install', action: 'install', log: 'added 842 packages in 2s' },
  { cmd: 'npm run dev', action: 'run', log: 'ready in 1245ms' },
  { cmd: '', action: 'log', log: 'event - compiled client and server' },
  { cmd: '', action: 'log', log: 'wait  - compiling /page (client)...' },
  { cmd: '', action: 'log', log: 'event - compiled successfully' },
  { cmd: '', action: 'warn', log: 'Warning: Props did not match.' },
  { cmd: '', action: 'error', log: 'Error: Hydration failed because...' },
  { cmd: '', action: 'crash', log: 'FATAL ERROR: UNHANDLED REJECTION' },
];

const FILES = [
  { name: 'page.tsx', icon: FileCode, color: 'text-blue-400' },
  { name: 'layout.tsx', icon: FileCode, color: 'text-blue-400' },
  { name: 'globals.css', icon: FileCode, color: 'text-yellow-400' },
  { name: 'components', icon: Folder, color: 'text-green-400', isFolder: true },
  { name: 'package.json', icon: FileJson, color: 'text-red-400' },
];

// --- Building IDE (Overlay Layer - Left Side) ---
const BuildingIDE = ({ progress }: { progress: number }) => {
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
    <div className="w-full h-full bg-[#1e1e1e] flex font-mono text-xs overflow-hidden border-r border-white/10 relative">
      {/* Decorative Grid Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none"></div>

      {/* Sidebar: Files */}
      <div className="w-48 bg-[#252526] border-r border-[#333] flex flex-col shrink-0 hidden sm:flex">
        <div className="p-3 text-[10px] font-bold text-slate-500 tracking-wider mb-2">EXPLORER</div>
        <div className="space-y-1">
          <div className="flex items-center gap-1 px-3 py-1 text-slate-300">
            <ChevronDown size={12} />
            <span className="font-bold">PROJECT-V1</span>
          </div>
          <div className="pl-4 space-y-1">
            {FILES.map((file, i) => (
              <div key={i} className="flex items-center gap-2 px-3 py-1 text-slate-400 hover:bg-[#2a2d2e] cursor-default transition-colors">
                <file.icon size={14} className={file.color} />
                <span>{file.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Area: Terminal */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Fake Tabs */}
        <div className="h-9 bg-[#2d2d2d] flex items-center border-b border-[#1e1e1e] px-3 shrink-0">
           <div className="flex items-center gap-2 text-slate-400 px-3 py-1 bg-[#1e1e1e] border-t border-blue-500 text-xs">
              <TerminalIcon size={12} />
              <span>Terminal</span>
           </div>
        </div>

        {/* Terminal Output */}
        <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-2 font-mono scroll-smooth bg-[#1e1e1e] text-slate-300">
          {visibleLogs.map((step, i) => (
            <div key={i} className="flex flex-col animate-in fade-in slide-in-from-left-2 duration-100">
              {step.cmd && (
                <div className="flex gap-2 items-center text-white mb-1">
                  <span className="text-green-500">➜</span>
                  <span className="text-blue-400">~/project</span>
                  <span>{step.cmd}</span>
                </div>
              )}
              {step.log && (
                <div className={cn(
                  "pl-4",
                  step.action === 'error' || step.action === 'crash' ? "text-red-400 font-bold" : 
                  step.action === 'warn' ? "text-yellow-400" : "text-slate-400"
                )}>
                  {step.action === 'crash' && <AlertTriangle size={12} className="inline mr-2" />}
                  {step.log}
                </div>
              )}
            </div>
          ))}
          
          {/* Active Line Cursor */}
          <div className="flex items-center gap-2 mt-2">
             <span className="text-green-500">➜</span>
             <span className="text-blue-400">~/project</span>
             <span className="w-2 h-4 bg-slate-400 animate-pulse block"></span>
          </div>
          <div className="h-8"></div>
        </div>
      </div>
    </div>
  );
};

// --- Beauty In Motion HTML Content ---
const BEAUTY_IN_MOTION_HTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LUMIÈRE | Modern Beauty Sanctuary</title>
    
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Manrope:wght@300;400;500;600&display=swap" rel="stylesheet">
    
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

    <style>
        /* --- VARIABLES & RESET --- */
        :root {
            --bg-color: #FAF9F6;
            --white: #FFFFFF;
            --text-main: #2C2C2C;
            --text-muted: #666666;
            --accent: #D4AF37;
            --accent-soft: #F4F1EA;
            --border-radius: 20px;
            --font-serif: 'Cormorant Garamond', serif;
            --font-sans: 'Manrope', sans-serif;
            --transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            --container-width: 1320px;
            --nav-height: 80px;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        html {
            scroll-behavior: smooth;
        }

        body {
            background-color: var(--bg-color);
            color: var(--text-main);
            font-family: var(--font-sans);
            line-height: 1.7;
            overflow-x: hidden;
            -webkit-font-smoothing: antialiased;
        }

        img {
            display: block;
            width: 100%;
        }

        /* --- TYPOGRAPHY --- */
        h1, h2, h3, h4 {
            font-family: var(--font-serif);
            font-weight: 400;
            line-height: 1.15;
        }

        .display-text {
            font-size: clamp(3rem, 7vw, 5.5rem);
            letter-spacing: -0.02em;
        }

        .section-title {
            font-size: clamp(2rem, 4vw, 3rem);
            margin-bottom: 1rem;
            text-align: center;
        }

        .subtitle {
            text-align: center;
            color: var(--text-muted);
            max-width: 600px;
            margin: 0 auto 3.5rem auto;
            font-size: 1.1rem;
            padding: 0 1rem;
        }

        a { text-decoration: none; color: inherit; transition: var(--transition); }

        /* --- UTILITIES --- */
        .container {
            max-width: var(--container-width);
            margin: 0 auto;
            padding: 0 24px;
        }

        .btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 1rem 2.5rem;
            border-radius: 50px;
            background: var(--text-main);
            color: #fff;
            font-family: var(--font-sans);
            text-transform: uppercase;
            font-size: 0.8rem;
            font-weight: 600;
            letter-spacing: 1px;
            transition: var(--transition);
            cursor: pointer;
            border: 1px solid var(--text-main);
            white-space: nowrap;
        }

        /* --- HERO SECTION --- */
        header {
            height: 100vh;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            position: relative;
            overflow: hidden;
        }

        .hero-bg {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            z-index: -1;
            filter: brightness(0.85); 
        }

        .hero-content {
            z-index: 2;
            color: #fff;
            padding: 0 1rem;
        }

        .hero-tag {
            display: inline-block;
            padding: 0.5rem 1.2rem;
            border: 1px solid rgba(255,255,255,0.4);
            border-radius: 50px;
            font-size: 0.75rem;
            margin-bottom: 2rem;
            background: rgba(0,0,0,0.2);
            backdrop-filter: blur(5px);
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .hero-btn {
            background: #fff;
            color: #000;
            border: none;
            margin-top: 1rem;
        }
    </style>
</head>
<body>
    <header id="home">
        <img src="https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=2070&auto=format&fit=crop" alt="Smiling girl" class="hero-bg">
        <div class="hero-content">
            <span class="hero-tag">Est. 2024 New York</span>
            <h1 class="display-text">Beauty in <br> Joyful Motion.</h1>
            <p style="margin: 20px auto 30px auto; font-size: 1.15rem; max-width: 480px; line-height: 1.6; opacity: 0.9;">
                More than just a salon. We are a destination for confidence.
            </p>
            <a href="#" class="btn hero-btn">Explore Treatments</a>
        </div>
    </header>
</body>
</html>
`;

// --- Retro Website Preview (Overlay Layer - "First Terminal") ---
const WebsitePreview = ({ progress }: { progress: number }) => {
  const safeProgress = Math.min(Math.max(progress * 2.5, 0), 1);

  // Smooth step progression for uniform appearance
  const step1 = Math.min(safeProgress * 10, 1); // Browser frame
  const step2 = Math.min(Math.max((safeProgress - 0.1) * 5, 0), 1); // Navbar
  const step3 = Math.min(Math.max((safeProgress - 0.25) * 4, 0), 1); // Hero
  const step4 = Math.min(Math.max((safeProgress - 0.4) * 3, 0), 1); // Content cards
  const step5 = Math.min(Math.max((safeProgress - 0.6) * 3, 0), 1); // Footer
  const stylesApplied = safeProgress > 0.7;

  const isCrashed = progress > 0.45 && progress < 0.6;

  return (
    <div className={cn(
      "w-full h-full bg-[#0a0a0a] p-3 md:p-4 flex items-center justify-center transition-colors duration-200 relative overflow-hidden",
      isCrashed && "bg-red-950"
    )}>
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none"
           style={{
             backgroundImage: `linear-gradient(${isCrashed ? '#500' : '#1a1a1a'} 1px, transparent 1px), linear-gradient(90deg, ${isCrashed ? '#500' : '#1a1a1a'} 1px, transparent 1px)`,
             backgroundSize: '24px 24px'
           }}>
      </div>

      {isCrashed && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
           <div className="border-4 border-red-600 p-6 bg-black text-red-600 font-black text-3xl md:text-5xl tracking-widest transform -rotate-3 shadow-[0_0_40px_rgba(220,38,38,0.5)]">
             FATAL ERROR
           </div>
        </div>
      )}

      {/* Browser Window */}
      <motion.div
        style={{ opacity: step1, scale: 0.9 + step1 * 0.1 }}
        className="w-full h-full max-w-md bg-[#0f0f0f] border border-neutral-800 rounded-lg flex flex-col shadow-2xl relative z-10 overflow-hidden"
      >
        {/* Browser Chrome */}
        <div className="h-8 bg-neutral-900 border-b border-neutral-800 flex items-center px-3 gap-2 shrink-0">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
          </div>
          <div className="flex-1 mx-3">
            <div className="bg-neutral-800 rounded px-3 py-1 text-[9px] text-neutral-500 font-mono">
              https://mysite.local
            </div>
          </div>
        </div>

        {/* Website Content - Static Mock */}
        <div className="flex-1 bg-neutral-950 p-3 flex flex-col gap-3 overflow-hidden relative">

          {/* Navbar */}
          <motion.div
            style={{ opacity: step2, y: (1 - step2) * -15 }}
            className={cn(
              "h-10 w-full rounded border flex items-center justify-between px-4 shrink-0 transition-all duration-300",
              stylesApplied
                ? "bg-indigo-600/20 border-indigo-500/50"
                : "border-dashed border-neutral-700 bg-neutral-900/50"
            )}
          >
            <div className={cn(
              "h-2 rounded transition-all duration-300",
              stylesApplied ? "w-16 bg-indigo-400" : "w-12 bg-neutral-700"
            )}></div>
            <div className="flex gap-3">
              <div className={cn(
                "h-2 rounded transition-all duration-300",
                stylesApplied ? "w-10 bg-indigo-400/60" : "w-8 bg-neutral-700/60"
              )}></div>
              <div className={cn(
                "h-2 rounded transition-all duration-300",
                stylesApplied ? "w-10 bg-indigo-400/60" : "w-8 bg-neutral-700/60"
              )}></div>
              <div className={cn(
                "h-2 rounded transition-all duration-300",
                stylesApplied ? "w-14 bg-indigo-500" : "w-10 bg-neutral-600"
              )}></div>
            </div>
          </motion.div>

          {/* Hero Section */}
          <motion.div
            style={{ opacity: step3, scale: 0.95 + step3 * 0.05 }}
            className={cn(
              "h-28 md:h-36 w-full rounded border flex flex-col items-center justify-center gap-2 shrink-0 transition-all duration-300",
              stylesApplied
                ? "bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border-indigo-500/30"
                : "border-dashed border-neutral-700 bg-neutral-900/30"
            )}
          >
            <div className={cn(
              "h-3 rounded transition-all duration-300",
              stylesApplied ? "w-40 bg-white" : "w-32 bg-neutral-600"
            )}></div>
            <div className={cn(
              "h-2 rounded transition-all duration-300",
              stylesApplied ? "w-48 bg-neutral-400" : "w-40 bg-neutral-700"
            )}></div>
            {stylesApplied && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="mt-2 px-4 py-1.5 bg-indigo-500 rounded text-[8px] text-white font-bold tracking-wide"
              >
                GET STARTED
              </motion.div>
            )}
          </motion.div>

          {/* Content Cards Grid */}
          <div className="flex-1 grid grid-cols-2 gap-2 min-h-0">
            {[0, 1, 2, 3].map((i) => {
              const cardProgress = Math.min(Math.max((step4 - i * 0.15) * 2, 0), 1);
              return (
                <motion.div
                  key={i}
                  style={{ opacity: cardProgress, y: (1 - cardProgress) * 20 }}
                  className={cn(
                    "w-full h-full rounded border flex flex-col p-2 gap-1.5 min-h-[50px] transition-all duration-300",
                    stylesApplied
                      ? "bg-neutral-900/80 border-neutral-700"
                      : "border-dashed border-neutral-800 bg-neutral-900/20"
                  )}
                >
                  <div className={cn(
                    "w-full h-8 rounded transition-all duration-300",
                    stylesApplied ? "bg-neutral-800" : "bg-neutral-800/50"
                  )}></div>
                  <div className={cn(
                    "h-1.5 rounded transition-all duration-300",
                    stylesApplied ? "w-3/4 bg-neutral-600" : "w-2/3 bg-neutral-700/50"
                  )}></div>
                  <div className={cn(
                    "h-1.5 rounded transition-all duration-300",
                    stylesApplied ? "w-1/2 bg-neutral-700" : "w-1/2 bg-neutral-700/30"
                  )}></div>
                </motion.div>
              );
            })}
          </div>

          {/* Footer */}
          <motion.div
            style={{ opacity: step5, y: (1 - step5) * 10 }}
            className={cn(
              "h-6 w-full rounded border flex items-center justify-center shrink-0 transition-all duration-300",
              stylesApplied
                ? "bg-neutral-900 border-neutral-800"
                : "border-dashed border-neutral-800 bg-neutral-900/20"
            )}
          >
            <div className={cn(
              "h-1.5 rounded transition-all duration-300",
              stylesApplied ? "w-24 bg-neutral-600" : "w-20 bg-neutral-700/50"
            )}></div>
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
};

// --- VS Code Window (Base Layer - "Second Terminal") ---
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
        
        {/* Left Column: Editor + Terminal */}
        <div className="flex-1 flex flex-col min-w-0 border-r border-[#333]">
          
          {/* Editor Area */}
          <div className="flex-1 flex flex-col bg-[#1e1e1e] overflow-hidden">
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

          {/* Terminal Area */}
          <div className="h-[35%] bg-[#1e1e1e] border-t border-[#333] flex flex-col">
            {/* Terminal Header */}
            <div className="h-8 bg-[#2d2d2d] flex items-center px-3 border-b border-[#1e1e1e] shrink-0">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <TerminalIcon size={14} className="text-slate-400" />
                <span>Terminal</span>
              </div>
              <div className="ml-4 flex gap-2 text-[10px] text-slate-500">
                <span className="px-2 py-0.5 bg-[#1e1e1e] rounded">zsh</span>
              </div>
            </div>
            {/* Terminal Content */}
            <div className="flex-1 p-3 font-mono text-xs overflow-hidden">
              <div className="space-y-1 text-slate-300">
                <div className="flex gap-2">
                  <span className="text-green-400">➜</span>
                  <span className="text-indigo-400">~/akella-in-motion</span>
                  <span className="text-slate-500">git:(</span><span className="text-red-400">main</span><span className="text-slate-500">)</span>
                  <span className="text-white">npm run dev</span>
                </div>
                <div className="text-slate-500 pl-4">
                  <div>&gt; akella-in-motion@1.0.0 dev</div>
                  <div>&gt; next dev</div>
                </div>
                <div className="text-green-400 pl-4">✓ Ready in 1.2s</div>
                <div className="text-slate-400 pl-4">○ Compiling / ...</div>
                <div className="text-green-400 pl-4">✓ Compiled /page in 234ms</div>
                <div className="flex gap-2 mt-2">
                  <span className="text-green-400">➜</span>
                  <span className="text-indigo-400">~/akella-in-motion</span>
                  <span className="w-2 h-4 bg-slate-400 animate-pulse"></span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Website Preview Panel (Full Height) */}
        <div className="w-[45%] flex flex-col bg-[#0f0f0f] border-l border-[#333]">
          {/* Preview Header */}
          <div className="h-9 bg-[#2d2d2d] flex items-center px-3 border-b border-[#1e1e1e] shrink-0">
            <div className="flex gap-1.5 mr-3">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
            </div>
            <div className="flex-1 bg-[#1e1e1e] rounded px-2 py-1 text-[10px] text-slate-400 font-mono">
              localhost:3000
            </div>
          </div>
          {/* Preview Content - NOW USING THE IFRAME FOR BEAUTY IN MOTION */}
          <div className="flex-1 bg-neutral-950 overflow-hidden relative">
            <iframe 
                srcDoc={BEAUTY_IN_MOTION_HTML}
                className="absolute inset-0 w-[200%] h-[200%] border-none origin-top-left"
                style={{ transform: 'scale(0.5)' }}
                title="Beauty In Motion Preview"
            />
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
      {/* First headline - "This is how our competitors code" */}
      <motion.div
        style={{ opacity: 1 - Math.min(scrollProgress * 2, 1) }}
        className="absolute top-[12%] z-30 text-center w-full px-4"
      >
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 tracking-tight">
          This is how our competitors code.
        </h2>
      </motion.div>

      {/* Second headline - "This is how we code" (appears after reveal) */}
      <motion.div
        style={{ opacity: Math.min(Math.max((scrollProgress - 0.5) * 4, 0), 1) }}
        className="absolute top-[12%] z-30 text-center w-full px-4"
      >
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 tracking-tight">
          This is how we code.
        </h2>
      </motion.div>

      <div className="relative w-full h-screen flex items-end justify-center pb-6">

        {/* Shared container for both layers - same size and position */}
        <div className="relative w-[98%] h-[70%] max-w-[1800px]">

          {/* Layer 1: VS Code (Underneath) */}
          <div className="absolute inset-0 z-0">
            <div className="w-full h-full shadow-[0_0_100px_rgba(99,102,241,0.2)] rounded-lg overflow-hidden">
              <VSCodeWindow />
            </div>
          </div>

          {/* Layer 2: Split Overlay (Terminal Left | Website Right) */}
          <div className="absolute inset-0 z-10 flex pointer-events-none overflow-hidden rounded-lg">

            {/* Left Half: Terminal */}
            <motion.div
              style={{
                x: `${revealProgress * -100}%`,
                opacity: revealProgress > 0.9 ? 0 : 1
              }}
              className="w-1/2 h-full bg-black border-r border-green-900/50 overflow-hidden flex-shrink-0 shadow-2xl"
            >
              <BuildingIDE progress={scrollProgress} />
            </motion.div>

            {/* Right Half: Website Preview */}
            <motion.div
              style={{
                x: `${revealProgress * 100}%`,
                opacity: revealProgress > 0.9 ? 0 : 1
              }}
              className="w-1/2 h-full bg-[#0a0a0a] overflow-hidden flex-shrink-0 shadow-2xl"
            >
              <WebsitePreview progress={scrollProgress} />
            </motion.div>
          </div>

        </div>

      </div>
    </div>
  );
}
