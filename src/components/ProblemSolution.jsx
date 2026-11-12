import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const problemSolutions = [
  { problem: "Sluggish, monolithic architectures that can't scale under load.", solution: "Micro-frontend and headless architecture built for limitless, horizontal scale." },
  { problem: "Scattered data and disconnected workflows causing operational friction.", solution: "Unified data lakes with intelligent, real-time operational synchronization." },
  { problem: "Manual processes dragging down the engineering and product teams.", solution: "Automated machine learning pipelines eliminating repetitive overhead entirely." },
  { problem: "Generic, uninspiring user experiences that fail to convert.", solution: "Cinematic, high-performance interfaces tailored specifically for premium brands." },
  { problem: "Security vulnerabilities leaving business-critical data exposed to threat actors.", solution: "Zero-trust architecture with continuous penetration testing and real-time threat detection." },
  { problem: "Skyrocketing infrastructure costs eating into your engineering budget.", solution: "FinOps-driven cloud architecture that cuts waste and auto-scales to demand." },
];

export default function ProblemSolution() {
  return (
    <section className="w-full bg-[#eaedf2] dark:bg-black py-15 sm:py-28 md:py-15 flex items-center justify-center relative z-10 px-4 sm:px-6 overflow-hidden transition-colors duration-300">

      {/* Background Ambience: Tasteful, refined ambient splash effect */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Left Side: Soft ambient red splash */}
        <div
          className="absolute -left-20 top-1/4 w-[520px] h-[680px] rounded-full blur-[140px] opacity-[0.16] dark:opacity-[0.18] pointer-events-none"
          style={{
            background: 'radial-gradient(circle, #ef4444 0%, #f43f5e 45%, transparent 70%)',
          }}
        />

        {/* Right Side: Soft ambient violet splash */}
        <div
          className="absolute -right-20 top-1/3 w-[520px] h-[680px] rounded-full blur-[140px] opacity-[0.16] dark:opacity-[0.20] pointer-events-none"
          style={{
            background: 'radial-gradient(circle, #8b5cf6 0%, #a855f7 45%, transparent 70%)',
          }}
        />

        {/* Center subtle bridging splash */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[150px] opacity-[0.08] dark:opacity-[0.12] pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(168,85,247,0.4) 0%, rgba(239,68,68,0.2) 50%, transparent 70%)',
          }}
        />
      </div>

      <div className="max-w-7xl w-full mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 md:mb-28 text-center flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-200 dark:bg-white/5 border border-stone-300 dark:border-white/10 text-stone-500 dark:text-neutral-500 text-xs font-bold tracking-widest uppercase mb-5">
            How We Think
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-stone-900 dark:text-white tracking-tighter mb-6">Evolution Paradigm.</h2>
          <p className="text-stone-500 dark:text-neutral-400 text-lg sm:text-xl md:text-2xl max-w-2xl font-medium tracking-tight">
            Transforming legacy bottlenecks into unprecedented velocity.
          </p>
        </motion.div>

        <div className="relative border-l border-stone-200 dark:border-white/5 md:border-none pl-4 md:pl-0 ml-2 md:ml-0">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-stone-300/40 dark:via-white/10 to-transparent -translate-x-1/2" />

          <div className="flex flex-col gap-10 md:gap-6">
            {problemSolutions.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-stretch gap-4 md:gap-10 group relative"
              >
                {/* Problem Side */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full relative order-1"
                >
                  <div className="h-full p-6 md:p-8 rounded-3xl bg-white/45 dark:bg-white/[0.035] backdrop-blur-xl border border-white/60 dark:border-white/10 md:group-hover:border-red-400/40 dark:md:group-hover:border-red-500/30 transition-all duration-500 flex flex-col justify-center relative overflow-hidden shadow-[0_8px_30px_rgba(28,26,23,0.04),inset_0_1px_1px_rgba(255,255,255,0.8)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.06)] hover:bg-white/60 dark:hover:bg-white/[0.06]">
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/80 dark:via-white/15 to-transparent pointer-events-none" />
                    {/* Subtle red corner splash */}
                    <div className="absolute -top-10 -left-10 w-36 h-36 rounded-full bg-red-500/10 dark:bg-red-500/15 blur-2xl pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

                    <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold text-red-500/80 dark:text-red-400/80 mb-4 inline-flex items-center gap-2 relative z-10">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_5px_rgba(239,68,68,0.4)]" />
                      The Friction
                    </span>
                    <p className="text-base md:text-lg lg:text-xl text-stone-600 dark:text-neutral-400 font-medium leading-relaxed group-hover:text-stone-900 dark:group-hover:text-neutral-200 transition-colors duration-500 relative z-10">
                      {item.problem}
                    </p>
                  </div>
                </motion.div>

                {/* Desktop Center Node: Left side Red, Right side Purple */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="hidden md:flex w-10 h-10 md:w-11 md:h-11 rounded-full border border-white/70 dark:border-white/15 bg-white/60 dark:bg-white/5 backdrop-blur-xl items-center justify-center relative z-10 order-2 self-center shrink-0 shadow-sm md:group-hover:border-white/90 dark:md:group-hover:border-white/30 transition-all duration-300"
                >
                  {/* Inner Node: Clean, crisp Red to Purple dot */}
                  <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-r from-red-500 to-violet-600 opacity-90 group-hover:opacity-100 group-hover:scale-115 transition-all duration-300" />
                </motion.div>

                {/* Mobile Arrow */}
                <div className="md:hidden flex justify-center -my-3 relative z-10 order-2">
                  <div className="w-8 h-8 rounded-full bg-white/50 dark:bg-white/5 backdrop-blur-xl border border-white/60 dark:border-white/15 flex items-center justify-center text-stone-500 dark:text-white/60">
                    <ArrowDown className="w-4 h-4" />
                  </div>
                </div>

                {/* Solution Side */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                  className="w-full relative order-3"
                >
                  <div className="h-full p-6 md:p-8 rounded-3xl bg-white/45 dark:bg-white/[0.035] backdrop-blur-xl border border-white/60 dark:border-white/10 md:group-hover:border-violet-400/40 dark:md:group-hover:border-violet-500/30 transition-all duration-500 flex flex-col justify-center relative overflow-hidden shadow-[0_8px_30px_rgba(28,26,23,0.04),inset_0_1px_1px_rgba(255,255,255,0.8)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.06)] hover:bg-white/60 dark:hover:bg-white/[0.06]">
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/80 dark:via-white/15 to-transparent pointer-events-none" />
                    <div className="absolute top-0 left-0 w-[200%] h-px bg-gradient-to-r from-transparent via-violet-400/25 dark:via-violet-400/20 to-transparent -translate-x-full md:group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
                    
                    {/* Subtle violet corner splash */}
                    <div className="absolute -top-10 -right-10 w-36 h-36 rounded-full bg-violet-500/10 dark:bg-violet-500/15 blur-2xl pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

                    <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold text-violet-600/90 dark:text-violet-400/80 mb-4 inline-flex items-center gap-2 relative z-10">
                      <div className="w-1.5 h-1.5 rounded-full bg-violet-500 shadow-[0_0_6px_rgba(139,92,246,0.5)]" />
                      The Resolution
                    </span>
                    <p className="text-base md:text-lg lg:text-2xl text-stone-900 dark:text-white font-bold leading-tight md:leading-snug tracking-tight relative z-10">
                      {item.solution}
                    </p>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
