import React from 'react';
import { motion } from 'framer-motion';

const problemSolutions = [
  { problem: "Sluggish, monolithic architectures that can't scale under load.", solution: "Micro-frontend and headless architecture built for limitless, horizontal scale." },
  { problem: "Scattered data and disconnected workflows causing operational friction.", solution: "Unified data lakes with intelligent, real-time operational synchronization." },
  { problem: "Manual processes dragging down the engineering and product teams.", solution: "Automated machine learning pipelines eliminating repetitive overhead entirely." },
  { problem: "Generic, uninspiring user experiences that fail to convert.", solution: "Cinematic, high-performance interfaces tailored specifically for premium brands." }
];

export default function ProblemSolution() {
  return (
    <section className="w-full min-h-screen bg-black py-25 flex items-center justify-center relative z-10 px-6">
      <div className="max-w-7xl w-full mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-16"
        >
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6">Evolution Paradigm.</h2>
            <p className="text-neutral-400 text-lg md:text-xl font-light">
              Transforming legacy bottlenecks into unprecedented velocity.
            </p>
          </div>
        </motion.div>

        <div className="relative">
          {/* Vertical connecting line for desktop hidden on extremely small screens */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-neutral-900 -translate-x-1/2" />

          <div className="flex flex-col gap-12 md:gap-0">
            {problemSolutions.map((item, index) => (
              <div 
                key={index} 
                className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-8 md:gap-16 group relative md:py-16"
              >
                {/* Problem Side */}
                <motion.div 
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full text-left md:text-right flex flex-col items-start md:items-end order-1 md:order-1"
                >
                   <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-600 mb-4 inline-block">The Friction</span>
                  <p className="text-xl md:text-2xl text-neutral-500 font-light leading-relaxed group-hover:text-neutral-400 transition-colors duration-500">
                    {item.problem}
                  </p>
                </motion.div>

                {/* Center Node */}
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="hidden md:flex w-12 h-12 rounded-full border border-neutral-800 bg-black items-center justify-center relative z-10 order-2"
                >
                  <div className="w-2 h-2 rounded-full bg-neutral-700 group-hover:bg-white group-hover:scale-150 transition-all duration-500 shadow-[0_0_20px_rgba(255,255,255,0)] group-hover:shadow-[0_0_20px_rgba(255,255,255,0.8)]" />
                </motion.div>

                {/* Solution Side */}
                <motion.div 
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                  className="w-full text-left flex flex-col items-start order-3 md:order-3 bg-white/[0.02] md:bg-transparent p-6 md:p-0 rounded-2xl md:rounded-none border border-white/5 md:border-none"
                >
                  <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/50 mb-4 inline-block">The Resolution</span>
                  <p className="text-xl md:text-3xl text-white font-medium leading-tight md:leading-snug tracking-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.05)] group-hover:drop-shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all duration-500">
                    {item.solution}
                  </p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
