import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Database, Sparkles, Cloud, Shield, Code2, X } from 'lucide-react';

const products = [
  { id: 1, name: 'Core Engine', icon: Database, size: 48, desc: 'Central data processing architecture.' },
  { id: 2, name: 'Cloud Hub', icon: Cloud, size: 56, desc: 'Decentralized cloud infrastructure.' },
  { id: 3, name: 'Nova AI', icon: Sparkles, size: 64, desc: 'Advanced machine learning integration.' },
  { id: 4, name: 'Shield Def', icon: Shield, size: 48, desc: 'Enterprise-grade security matrix.' },
  { id: 5, name: 'App Forge', icon: Box, size: 56, desc: 'Universal platform deployment system.' },

];

export default function Hero() {
  const [activeProduct, setActiveProduct] = useState(null);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const isDesktop = window.matchMedia('(min-width: 768px)').matches;

  // Orbit geometry
  const radius = 220;
  const total = products.length;

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-start overflow-hidden bg-black pt-32 lg:pt-50">

      {/* Refined Deep Space Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] lg:w-[800px] lg:h-[800px] bg-white opacity-[0.03] blur-[150px] rounded-full" />

        {/* Subtle Static and Blinking Stars - Optimized for Performance */}
        <svg className="absolute inset-0 w-full h-full opacity-60 pointer-events-none">
          {[...Array(150)].map((_, i) => {
            // Give some stars a specific blinking animation via motion
            return (
              <motion.circle
                key={i}
                cx={`${Math.random() * 100}%`}
                cy={`${Math.random() * 100}%`}
                r={Math.random() * 1.5 + 0.5}
                fill="white"
                initial={{ opacity: Math.random() * 0.8 + 0.2 }}
                animate={{
                  opacity: Math.random() > 0.5 ? [0.2, 1, 0.2] : Math.random() * 0.8 + 0.2
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            );
          })}
        </svg>
      </div>

      {/* Main Contents */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-32">

        {/* Left Side: Typography & CTA */}
        <div className="w-full lg:w-1/2 lg:pr-10 text-center lg:text-left flex flex-col items-center lg:items-start pt-10 lg:pt-0">
          <motion.h1
            className="text-6xl sm:text-7xl lg:text-[140px] font-extrabold text-white mb-6 lg:mb-8 tracking-tighter leading-none"
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            Debuggers
          </motion.h1>

          <motion.p
            className="text-2xl lg:text-3xl text-neutral-300 font-medium tracking-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          >
            Smart Solutions for Growing Businesses.
          </motion.p>

          <motion.p
            className="text-base lg:text-lg text-neutral-500 max-w-xl mx-auto lg:mx-0 leading-relaxed mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          >
            We build high-quality software, mobile apps, and cloud systems that are fast and easy to use. Ready for the future, made simple for you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
          >
            <button
              onClick={() => setShowAllProducts(true)}
              className="px-10 py-5 rounded-full bg-white text-black text-sm lg:text-base font-semibold tracking-wide hover:bg-neutral-200 hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_50px_rgba(255,255,255,0.4)]"
            >
              Discover Our Products
            </button>
          </motion.div>
        </div>

        {/* Right Side: High-Tech Orbit System */}
        <motion.div
          className="w-full lg:w-1/2 flex items-center justify-center relative min-h-[500px] lg:scale-100 scale-75 md:scale-90"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
        >
          {/* SVG Complex Radar/Lock Background */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.svg
              className="w-[700px] h-[700px] opacity-[0.15]"
              viewBox="0 0 700 700"
              animate={{ rotate: 360 }}
              transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
            >
              {/* Added more circles to match the multi-ring system */}
              <circle cx="350" cy="350" r="300" fill="none" stroke="white" strokeWidth="1" strokeDasharray="2 6" />
              <circle cx="350" cy="350" r="220" fill="none" stroke="white" strokeWidth="1.5" strokeDasharray="1 12" />
              <circle cx="350" cy="350" r="140" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="40 4" />

              {/* Hexagon or geometric inner ring */}
              <polygon points="350,210 471,280 471,420 350,490 229,420 229,280" fill="none" stroke="white" strokeWidth="0.5" opacity="0.5" />

              {/* Precision Crosshairs intersecting the orbit */}
              <line x1="350" y1="15" x2="350" y2="685" stroke="white" strokeWidth="0.5" opacity="0.8" strokeDasharray="4 4" />
              <line x1="15" y1="350" x2="685" y2="350" stroke="white" strokeWidth="0.5" opacity="0.8" strokeDasharray="4 4" />
            </motion.svg>

            {/* Counter-rotating dashed security ring */}
            <motion.div
              className="absolute w-[600px] h-[600px] rounded-full border border-white/10"
              style={{ borderStyle: 'dashed', borderWidth: '2px' }}
              animate={{ rotate: -360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            />
          </div>

          {/* Secure Core Orb */}
          <div className="absolute z-10 flex items-center justify-center pointer-events-auto">
            {/* Outer rotating brackets */}
            <motion.div
              className="absolute w-40 h-40 lg:w-48 lg:h-48 border-[3px] border-white text-transparent rounded-full border-t-white/30 border-b-white/30 border-l-transparent border-r-transparent"
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />

            <div className="w-28 h-28 lg:w-36 lg:h-36 rounded-full bg-black border border-white/30 flex items-center justify-center relative shadow-[inset_0_0_30px_rgba(255,255,255,0.1),_0_0_50px_rgba(255,255,255,0.05)] backdrop-blur-md cursor-pointer hover:border-white/60 transition-colors duration-300">
              <motion.div
                className="absolute inset-0 rounded-full bg-white blur-2xl opacity-20"
                animate={{ opacity: [0.1, 0.4, 0.1], scale: [0.95, 1.05, 0.95] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="flex flex-col items-center z-10" onClick={() => setShowAllProducts(true)}>
                <Shield className="w-5 h-5 lg:w-6 lg:h-6 text-white mb-1 opacity-70" />
                <span className="text-white font-bold tracking-[0.3em] text-[10px] lg:text-xs">OUR</span>
                <span className="text-white font-bold tracking-[0.2em] text-xs lg:text-sm mt-0.5">PRODUCTS</span>
              </div>
            </div>
          </div>

          {/* Orbiting Elements container */}
          <motion.div
            className="absolute w-full h-full flex items-center justify-center pointer-events-none"
            animate={{ rotate: 360 }}
            transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
          >
            {products.map((product, index) => {
              const angle = (index / total) * (2 * Math.PI);
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              const Icon = product.icon;

              return (
                <div
                  key={product.id}
                  className="absolute pointer-events-auto flex flex-col items-center justify-center"
                  style={{ transform: `translate(${x}px, ${y}px)` }}
                >
                  {/* Counter rotation to keep icons upright */}
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
                    className="flex flex-col items-center group cursor-pointer relative"
                    onClick={() => setActiveProduct(product)}
                  >
                    {/* Hover connection line hint */}
                    <div className="absolute top-1/2 left-1/2 w-[120px] h-[1px] bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none origin-left"
                      style={{ transform: `rotate(${(angle * 180 / Math.PI) + 180}deg)` }}
                    />

                    <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-neutral-950 border border-neutral-700 flex items-center justify-center relative transition-all duration-500 group-hover:bg-white group-hover:border-white shadow-[0_0_20px_rgba(255,255,255,0.05)] group-hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] group-hover:scale-110 z-10">
                      <Icon className="w-6 h-6 lg:w-7 lg:h-7 text-neutral-300 group-hover:text-black transition-colors duration-500" />
                    </div>

                    <div className="absolute top-[130%] opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-4 py-1.5 bg-neutral-900/90 backdrop-blur-md border border-white/20 rounded-md whitespace-nowrap pointer-events-none z-20 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                      <span className="text-[10px] lg:text-xs font-bold tracking-widest text-white uppercase">
                        {product.name}
                      </span>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator - absolute positioned perfectly center bottom */}
      {isDesktop && <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="w-6 h-10 rounded-full border border-white/20 flex items-start justify-center pt-2">
          <div className="w-1 h-3 rounded-full bg-white/40" />
        </div>
      </motion.div>}

      {/* Product Detail Overlay */}
      <AnimatePresence>
        {activeProduct && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-neutral-950/90 backdrop-blur-2xl border border-white/10 p-6 sm:p-10 rounded-3xl max-w-md w-11/12 max-h-[90vh] overflow-y-auto z-50 shadow-[0_40px_100px_rgba(0,0,0,0.8)] flex flex-col items-center text-center no-scrollbar"
          >
            <button
              onClick={() => setActiveProduct(null)}
              className="absolute top-6 right-6 text-neutral-500 hover:text-white transition-colors p-2 bg-white/5 hover:bg-white/10 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
            <activeProduct.icon className="w-16 h-16 text-white mb-6" />
            <h3 className="text-3xl font-bold text-white tracking-tight mb-3">{activeProduct.name}</h3>
            <p className="text-neutral-400 text-lg leading-relaxed mb-8">{activeProduct.desc}</p>
            <button className="px-8 py-3 bg-white text-black font-semibold tracking-wide rounded-full hover:scale-105 transition-transform duration-300 w-full">
              Explore Documentation
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Modal Dimmer */}
      <AnimatePresence>
        {activeProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={() => setActiveProduct(null)}
          />
        )}
      </AnimatePresence>
      {/* ── All Products Modal ─────────────────────────────────────── */}
      <AnimatePresence>
        {showAllProducts && (
          <>
            {/* Backdrop */}
            <motion.div
              key="all-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-md z-40"
              onClick={() => setShowAllProducts(false)}
            />

            {/* Modal */}
            <motion.div
              key="all-modal"
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 30 }}
              transition={{ type: 'spring', stiffness: 120, damping: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[95vw] max-w-3xl max-h-[90vh] overflow-y-auto bg-neutral-950/95 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-[0_40px_100px_rgba(0,0,0,0.9)] no-scrollbar"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-black text-white tracking-tighter">Our Products</h2>
                  <p className="text-neutral-500 text-sm mt-1">Everything we've built for you.</p>
                </div>
                <button
                  onClick={() => setShowAllProducts(false)}
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 transition-all duration-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((product, i) => {
                  const Icon = product.icon;
                  return (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.07, duration: 0.4 }}
                      className="group flex flex-col gap-3 p-5 rounded-2xl bg-white/3 border border-white/10 hover:border-white/25 hover:bg-white/6 transition-all duration-300 cursor-pointer"
                      onClick={() => { setShowAllProducts(false); }}
                    >
                      {/* Icon */}
                      <div className="w-11 h-11 rounded-xl bg-black border border-white/10 group-hover:border-white/30 flex items-center justify-center transition-colors duration-300">
                        <Icon className="w-5 h-5 text-white/60 group-hover:text-white transition-colors duration-300" />
                      </div>
                      {/* Text */}
                      <div>
                        <h3 className="text-white font-bold text-sm tracking-tight mb-1">{product.name}</h3>
                        <p className="text-neutral-500 text-xs leading-relaxed">{product.desc}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </section>
  );
}
