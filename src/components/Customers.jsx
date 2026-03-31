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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-12 sm:mb-16 text-center z-20 relative">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-200 dark:bg-white/5 border border-stone-300 dark:border-white/10 text-stone-500 dark:text-neutral-500 text-xs font-bold tracking-widest uppercase mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
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
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        >
          {[...industries, ...industries, ...industries].map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-3 md:gap-4 px-5 md:px-7 py-3 md:py-4 rounded-full bg-[#faf8f5] dark:bg-white/3 border border-stone-200 dark:border-white/10 shadow-[0_2px_12px_rgba(28,26,23,0.06)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.5)] cursor-default hover:bg-stone-100 dark:hover:bg-white/8 transition-colors duration-200"
              >
                <div className="w-9 h-9 md:w-11 md:h-11 rounded-full bg-stone-100 dark:bg-black border border-stone-200 dark:border-white/20 flex items-center justify-center">
                  <Icon className="w-4 h-4 md:w-5 md:h-5 text-stone-600 dark:text-neutral-300" />
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
