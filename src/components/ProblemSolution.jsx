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
    <section className="w-full bg-[#f0ede8] dark:bg-black py-15 sm:py-28 md:py-15 flex items-center justify-center relative z-10 px-4 sm:px-6 overflow-hidden transition-colors duration-300">

      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-full pointer-events-none">
        <div className="absolute top-[20%] left-0 w-[450px] h-[450px] bg-red-500/6 dark:bg-red-900/10 blur-[140px] rounded-full" />
        <div className="absolute top-[60%] right-0 w-[450px] h-[450px] bg-violet-500/6 dark:bg-violet-900/10 blur-[140px] rounded-full" />
      </div>

      <div className="max-w-7xl w-full mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 md:mb-28 text-center flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-200 dark:bg-white/5 border border-stone-300 dark:border-white/10 text-stone-500 dark:text-neutral-500 text-xs font-bold tracking-widest uppercase mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
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
                  <div className="h-full p-6 md:p-8 rounded-3xl bg-red-50/60 dark:bg-neutral-950 border border-red-200/50 dark:border-red-500/10 md:group-hover:border-red-300/60 dark:md:group-hover:border-red-500/30 transition-colors duration-500 flex flex-col justify-center relative overflow-hidden shadow-[0_2px_12px_rgba(239,68,68,0.06)] dark:shadow-none">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(220,38,38,0.05),transparent)] pointer-events-none" />

                    <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold text-red-500/70 dark:text-red-500/50 mb-4 inline-flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500/70 dark:bg-red-500/50" />
                      The Friction
                    </span>
                    <p className="text-base md:text-lg lg:text-xl text-stone-600 dark:text-neutral-400 font-medium leading-relaxed group-hover:text-stone-800 dark:group-hover:text-neutral-300 transition-colors duration-500">
                      {item.problem}
                    </p>
                  </div>
                </motion.div>

                {/* Desktop Center Node */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="hidden md:flex w-12 h-12 rounded-full border border-stone-200 dark:border-white/10 bg-[#faf8f5] dark:bg-black items-center justify-center relative z-10 order-2 self-center shrink-0 shadow-[0_2px_12px_rgba(28,26,23,0.06)] dark:shadow-none"
                >
                  <div className="w-3 h-3 rounded-full bg-stone-300 dark:bg-neutral-700 group-hover:bg-gradient-to-r group-hover:from-violet-500 group-hover:to-fuchsia-500 group-hover:scale-[1.8] transition-all duration-500 shadow-[0_0_0px_rgba(168,85,247,0)] group-hover:shadow-[0_0_20px_rgba(168,85,247,0.8)]" />
                </motion.div>

                {/* Mobile Arrow */}
                <div className="md:hidden flex justify-center -my-3 relative z-10 order-2">
                  <div className="w-8 h-8 rounded-full bg-[#faf8f5] dark:bg-black border border-stone-200 dark:border-white/10 flex items-center justify-center text-stone-400 dark:text-white/50">
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
                  <div className="h-full p-6 md:p-8 rounded-3xl bg-violet-50/50 dark:bg-neutral-950 border border-violet-200/40 dark:border-violet-500/20 md:group-hover:border-violet-300/60 dark:md:group-hover:border-violet-400/50 transition-colors duration-500 flex flex-col justify-center relative overflow-hidden shadow-[0_2px_12px_rgba(139,92,246,0.06)] dark:shadow-none">
                    <div className="absolute top-0 left-0 w-[200%] h-px bg-gradient-to-r from-transparent via-violet-400/50 dark:via-violet-400/40 to-transparent -translate-x-full md:group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />

                    <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold text-violet-600/80 dark:text-violet-400/70 mb-4 inline-flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-violet-500 shadow-[0_0_10px_rgba(139,92,246,0.8)]" />
                      The Resolution
                    </span>
                    <p className="text-base md:text-lg lg:text-2xl text-stone-900 dark:text-white font-bold leading-tight md:leading-snug tracking-tight">
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
