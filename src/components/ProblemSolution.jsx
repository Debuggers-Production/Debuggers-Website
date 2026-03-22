import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const problemSolutions = [
  { problem: "Sluggish, monolithic architectures that can't scale under load.", solution: "Micro-frontend and headless architecture built for limitless, horizontal scale." },
  { problem: "Scattered data and disconnected workflows causing operational friction.", solution: "Unified data lakes with intelligent, real-time operational synchronization." },
  { problem: "Manual processes dragging down the engineering and product teams.", solution: "Automated machine learning pipelines eliminating repetitive overhead entirely." },
  { problem: "Generic, uninspiring user experiences that fail to convert.", solution: "Cinematic, high-performance interfaces tailored specifically for premium brands." }
];

export default function ProblemSolution() {
  return (
    <section className="w-full min-h-screen bg-black py-24 md:py-32 flex items-center justify-center relative z-10 px-4 sm:px-6 overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-full pointer-events-none">
        <div className="absolute top-[20%] left-0 w-[400px] h-[400px] bg-red-900/10 blur-[120px] rounded-full" />
        <div className="absolute top-[60%] right-0 w-[400px] h-[400px] bg-violet-900/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl w-full mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 md:mb-32 text-center flex flex-col items-center"
        >
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-white tracking-tighter mb-6">Evolution Paradigm.</h2>
          <p className="text-neutral-400 text-lg sm:text-xl md:text-2xl max-w-2xl font-medium tracking-tight">
            Transforming legacy bottlenecks into unprecedented velocity.
          </p>
        </motion.div>

        <div className="relative border-l border-white/5 md:border-none pl-4 md:pl-0 ml-2 md:ml-0">
          {/* Vertical connecting line for desktop hidden on extremely small screens */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-linear-to-b from-transparent via-white/10 to-transparent -translate-x-1/2" />

          <div className="flex flex-col gap-12 md:gap-8">
            {problemSolutions.map((item, index) => (
              <div 
                key={index} 
                className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-stretch gap-4 md:gap-12 group relative"
              >
                {/* ── Problem Side (Left) ── */}
                <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full relative order-1"
                >
                  <div className="h-full p-6 md:p-10 rounded-3xl bg-neutral-950 border border-red-500/10 md:group-hover:border-red-500/30 transition-colors duration-500 flex flex-col justify-center relative overflow-hidden">
                    {/* Subtle red noise glow */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(220,38,38,0.03),transparent)] pointer-events-none" />
                    
                    <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold text-red-500/50 mb-4 inline-flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500/50" />
                      The Friction
                    </span>
                    <p className="text-lg md:text-xl lg:text-2xl text-neutral-400 font-medium leading-relaxed group-hover:text-neutral-300 transition-colors duration-500">
                      {item.problem}
                    </p>
                  </div>
                </motion.div>

                {/* ── Center Node / Mobile Arrow ── */}
                
                {/* Desktop Node */}
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="hidden md:flex w-14 h-14 rounded-full border border-white/10 bg-black items-center justify-center relative z-10 order-2 self-center shrink-0 backdrop-blur-md"
                >
                  <div className="w-3 h-3 rounded-full bg-neutral-700 group-hover:bg-linear-to-r group-hover:from-violet-500 group-hover:to-fuchsia-500 group-hover:scale-[1.8] transition-all duration-500 shadow-[0_0_0px_rgba(168,85,247,0)] group-hover:shadow-[0_0_20px_rgba(168,85,247,0.8)]" />
                </motion.div>

                {/* Mobile Arrow (Replaces node on small screens) */}
                <div className="md:hidden flex justify-center -my-3 relative z-10 order-2">
                  <div className="w-8 h-8 rounded-full bg-black border border-white/10 flex items-center justify-center text-white/50">
                    <ArrowDown className="w-4 h-4" />
                  </div>
                </div>

                {/* ── Solution Side (Right) ── */}
                <motion.div 
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                  className="w-full relative order-3"
                >
                  <div className="h-full p-6 md:p-10 rounded-3xl bg-[radial-gradient(ellipse_at_top,rgba(168,85,247,0.08)_0%,rgba(0,0,0,0)_70%)] bg-neutral-950 border border-violet-500/20 md:group-hover:border-violet-400/50 transition-colors duration-500 flex flex-col justify-center shadow-[inset_0_0_30px_rgba(168,85,247,0.02)] md:group-hover:shadow-[inset_0_0_50px_rgba(168,85,247,0.08)] relative overflow-hidden">
                    {/* Animated shine line on hover */}
                    <div className="absolute top-0 left-0 w-[200%] h-px bg-linear-to-r from-transparent via-violet-400/50 to-transparent -translate-x-full md:group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />

                    <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold text-violet-400/70 mb-4 inline-flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-violet-500 shadow-[0_0_10px_rgba(139,92,246,0.8)]" />
                      The Resolution
                    </span>
                    <p className="text-lg md:text-xl lg:text-3xl text-white font-bold leading-tight md:leading-snug tracking-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.05)] md:group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all duration-500">
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
