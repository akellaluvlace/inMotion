import React from 'react';
import { ArrowUpRight, Code2, Globe, Zap, MousePointer2 } from 'lucide-react';

const DigitalExperienceHero = () => {
  return (
    <section className="bg-neutral-950 text-white p-4 md:p-8 flex items-center justify-center font-sans selection:bg-indigo-500 selection:text-white w-full h-full rounded-[1.5rem]">
      <div className="w-full grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-4 h-full">

        {/* 1. The "Old Way" Statement (Static, Monospace, Raw) */}
        <div className="md:col-span-2 md:row-span-1 bg-neutral-900/50 border border-neutral-800 rounded-3xl p-8 flex flex-col justify-center relative overflow-hidden group hover:border-neutral-600 transition-colors duration-500">
          <div className="absolute top-4 right-4 text-neutral-700">
            <Code2 size={24} />
          </div>
          <p className="font-mono text-neutral-500 text-sm mb-2 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
            &lt;legacy_mindset&gt;
          </p>
          <h2 className="text-2xl md:text-3xl text-neutral-400 font-medium group-hover:text-neutral-300 transition-colors">
            We don't just build <span className="line-through decoration-red-500/50 decoration-2">websites.</span>
          </h2>
        </div>

        {/* 2. Abstract Visual (Interactive Gradient) */}
        <div className="md:col-span-1 md:row-span-1 bg-neutral-900 border border-neutral-800 rounded-3xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>
          <div className="absolute -inset-4 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 grayscale"></div>
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center group-hover:scale-125 transition-transform duration-500 ease-out">
                <Globe className="text-white" size={24} />
             </div>
          </div>
        </div>

        {/* 3. Stat / Trust Indicator */}
        <div className="md:col-span-1 md:row-span-1 bg-[#111] border border-neutral-800 rounded-3xl p-6 flex flex-col justify-between group hover:bg-neutral-900 transition-colors">
            <div className="flex justify-between items-start">
                <div className="p-2 bg-neutral-800 rounded-full text-green-400">
                    <Zap size={18} fill="currentColor" />
                </div>
                <span className="text-neutral-500 text-xs font-mono">Lighthouse Score</span>
            </div>
            <div>
                <span className="text-4xl font-bold text-white block group-hover:translate-x-1 transition-transform duration-300">100<span className="text-green-500">%</span></span>
                <span className="text-neutral-500 text-xs">Performance Optimization</span>
            </div>
        </div>

        {/* 4. THE MAIN HERO: "Digital Experiences" */}
        <div className="md:col-span-3 md:row-span-2 bg-[#050505] border border-neutral-800 rounded-3xl relative overflow-hidden flex items-center p-8 md:p-12 group">
          
          {/* Animated Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_60%,transparent_100%)] group-hover:bg-[size:24px_24px] transition-all duration-1000 ease-in-out"></div>
          
          {/* Glow Effect behind text */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none group-hover:bg-indigo-500/30 transition-colors duration-700"></div>

          <div className="relative z-10 w-full">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium mb-6 animate-pulse">
                <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                The New Standard
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white leading-[0.9]">
              WE BUILD <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-200 to-indigo-400 group-hover:to-purple-400 transition-all duration-700">
                DIGITAL
              </span> <br />
              EXPERIENCES.
            </h1>
            
            <p className="mt-6 text-neutral-400 max-w-lg text-lg leading-relaxed">
              We merge aesthetic precision with engineering robustness to create software that feels like magic.
            </p>
          </div>
        </div>

        {/* 5. Interactive CTA / Cursor Follower */}
        <div className="md:col-span-1 md:row-span-2 bg-white text-black rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between group cursor-pointer hover:bg-indigo-50 transition-colors duration-300">
           <div className="absolute right-0 top-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ArrowUpRight size={32} />
           </div>

           <div className="mt-auto">
               <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <MousePointer2 size={20} />
               </div>
               <h3 className="text-3xl font-bold leading-tight mb-2">
                   Let's<br/>Talk.
               </h3>
               <p className="text-sm font-medium text-neutral-600 group-hover:text-indigo-600 transition-colors">
                   Start your project &rarr;
               </p>
           </div>
           
           {/* Abstract Circle Animation */}
           <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-indigo-300/30 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
        </div>

      </div>
    </section>
  );
};

export default DigitalExperienceHero;
