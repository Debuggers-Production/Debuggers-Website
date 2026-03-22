import React from 'react';
import { motion } from 'framer-motion';
import { HeartPulse, Landmark, ShoppingBag, GraduationCap, Truck, Building2 } from 'lucide-react';

const industries = [
  { name: "Healthcare", icon: HeartPulse },
  { name: "Finance", icon: Landmark },
  { name: "E-Commerce", icon: ShoppingBag },
  { name: "Education", icon: GraduationCap },
  { name: "Logistics", icon: Truck },
  { name: "Real Estate", icon: Building2 }
];

export default function Customers() {
  return (
    <section className="w-full py-25 bg-black border-t border-white/5 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center z-20 relative">
        <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
          Trusted by Top Industries.
        </h2>
        <p className="text-neutral-400 text-lg md:text-xl font-light">
          Powering scalable infrastructure worldwide.
        </p>
      </div>

      <div className="relative w-full flex items-center overflow-hidden py-4">
        {/* Left and Right Gradient Masks */}
        <div className="absolute top-0 left-0 w-24 md:w-64 h-full bg-linear-to-r from-black via-black/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-24 md:w-64 h-full bg-linear-to-l from-black via-black/80 to-transparent z-10 pointer-events-none" />

        <motion.div 
          className="flex whitespace-nowrap gap-6 pl-6"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          {/* Tripled the array for smooth seamless infinite scroll on ultra wide screens */}
          {[...industries, ...industries, ...industries].map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index}
                className="flex items-center gap-3 md:gap-5 px-5 md:px-8 py-3 md:py-5 rounded-full bg-white/3 border border-white/10 backdrop-blur-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] cursor-default transition-colors hover:bg-white/8"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-black border border-white/20 flex items-center justify-center shadow-inner">
                  <Icon className="w-4 h-4 md:w-5 md:h-5 text-neutral-300" />
                </div>
                <span className="text-base md:text-xl font-bold text-white tracking-tight pr-1 md:pr-2">{item.name}</span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
