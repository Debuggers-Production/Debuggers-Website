import React from 'react';
import { motion } from 'framer-motion';
import { HeartPulse, Landmark, ShoppingBag, GraduationCap, Truck, Building2, Cpu, Factory, Tv } from 'lucide-react';

const industries = [
  { name: "Healthcare", icon: HeartPulse },
  { name: "Finance", icon: Landmark },
  { name: "E-Commerce", icon: ShoppingBag },
  { name: "Education", icon: GraduationCap },
  { name: "Logistics", icon: Truck },
  { name: "Real Estate", icon: Building2 },
  { name: "SaaS", icon: Cpu },
  { name: "Manufacturing", icon: Factory },
  { name: "Media", icon: Tv },
];

export default function Customers() {
  return (
    <section className="w-full py-20 sm:py-28 bg-[#f0ede8] dark:bg-black border-t border-stone-200 dark:border-white/5 relative z-10 overflow-hidden transition-colors duration-300">
      {/* Ambient background glow for glass refraction */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="absolute left-1/4 top-1/2 -translate-y-1/2 w-[550px] h-[350px] rounded-full blur-[140px] opacity-15 dark:opacity-20 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, #5D72CC 0%, #8b5cf6 50%, transparent 70%)',
          }}
        />
        <div
          className="absolute right-1/4 top-1/2 -translate-y-1/2 w-[550px] h-[350px] rounded-full blur-[140px] opacity-15 dark:opacity-15 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, #38bdf8 0%, #5D72CC 50%, transparent 70%)',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-12 sm:mb-16 text-center z-20 relative">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-200 dark:bg-white/5 border border-stone-300 dark:border-white/10 text-stone-500 dark:text-neutral-500 text-xs font-bold tracking-widest uppercase mb-5">
          Our Reach
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-stone-900 dark:text-white tracking-tight mb-4">
          Trusted by Top Industries.
        </h2>
        <p className="text-stone-500 dark:text-neutral-400 text-lg md:text-xl font-light">
          Powering scalable infrastructure across 9 major sectors worldwide.
        </p>
      </div>

      <div className="relative w-full flex items-center overflow-hidden py-4">
        {/* Gradient Masks */}
        <div className="absolute top-0 left-0 w-24 md:w-64 h-full bg-gradient-to-r from-[#f0ede8] dark:from-black via-[#f0ede8]/70 dark:via-black/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-24 md:w-64 h-full bg-gradient-to-l from-[#f0ede8] dark:from-black via-[#f0ede8]/70 dark:via-black/80 to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex whitespace-nowrap gap-5 pl-6"
          style={{ willChange: 'transform' }}
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        >
          {[...industries, ...industries, ...industries].map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="group flex items-center gap-3 md:gap-4 px-5 md:px-7 py-3 md:py-4 rounded-full bg-white/45 dark:bg-white/[0.04] hover:bg-white/60 dark:hover:bg-white/[0.08] backdrop-blur-xl border border-white/70 dark:border-white/15 hover:border-white/90 dark:hover:border-white/30 shadow-[0_8px_30px_rgba(28,26,23,0.05),inset_0_1px_1px_rgba(255,255,255,0.9)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.12)] cursor-default transition-all duration-300 relative overflow-hidden"
              >
                {/* Top specular sheen line */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/80 dark:via-white/20 to-transparent pointer-events-none" />

                <div className="w-9 h-9 md:w-11 md:h-11 rounded-full bg-white/60 dark:bg-white/[0.06] backdrop-blur-md border border-white/80 dark:border-white/20 flex items-center justify-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] group-hover:scale-105 transition-transform duration-300">
                  <Icon className="w-4 h-4 md:w-5 md:h-5 text-stone-700 dark:text-white transition-colors duration-200" />
                </div>
                <span className="text-sm md:text-lg font-bold text-stone-800 dark:text-white tracking-tight pr-1">{item.name}</span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
