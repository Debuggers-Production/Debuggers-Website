import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Database, Sparkles, Cloud, Shield, X, Cpu, Zap } from 'lucide-react';

/** Locks body scroll while a modal is open. */
function useScrollLock(active) {
  useEffect(() => {
    if (!active) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [active]);
}

// 7 products across 3 rings
const ring1Products = [
  { id: 1, name: 'Core Engine', icon: Database, desc: 'Central data processing architecture with real-time sync and multi-tenant support.', color: '#60a5fa', size: 52 },
  { id: 2, name: 'Shield Def', icon: Shield, desc: 'Enterprise-grade security matrix protecting your systems 24/7.', color: '#34d399', size: 44 },
];
const ring2Products = [
  { id: 3, name: 'Cloud Hub', icon: Cloud, desc: 'Decentralized cloud infrastructure for limitless horizontal scale.', color: '#a78bfa', size: 60 },
  { id: 4, name: 'Nova AI', icon: Sparkles, desc: 'Advanced machine learning integration that learns your business patterns.', color: '#f472b6', size: 56 },
  { id: 5, name: 'App Forge', icon: Box, desc: 'Universal platform deployment system with zero-config CI/CD.', color: '#fb923c', size: 52 },
];
const ring3Products = [
  { id: 6, name: 'Neural Core', icon: Cpu, desc: 'High-performance compute fabric powering your AI workloads at scale.', color: '#facc15', size: 48 },
  { id: 7, name: 'Flash Grid', icon: Zap, desc: 'Ultra-low latency API mesh for sub-10ms global response times.', color: '#2dd4bf', size: 44 },
];

const allProducts = [...ring1Products, ...ring2Products, ...ring3Products];

// Deterministic pseudo-random for stable SSR hydration
function seededRand(seed) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

// Pre-generate stable, realistic star data
const STARS = Array.from({ length: 350 }, (_, i) => {
  const r1 = seededRand(i * 13);
  const r2 = seededRand(i * 27);
  const r3 = seededRand(i * 31);
  const r4 = seededRand(i * 47);

  // Exponential sizing: mostly tiny stars, a rare few larger ones
  const sizeMultiplier = Math.pow(r3, 4); 
  const radius = 0.4 + sizeMultiplier * 1.5; 

  // ~40% of stars blink
  const isBlinking = r4 > 0.6;

  return {
    id: i,
    cx: `${r1 * 100}%`,
    cy: `${r2 * 100}%`,
    r: radius,
    blink: isBlinking,
    dur: 2 + r1 * 4,        // 2s to 6s
    baseOpacity: 0.1 + r2 * 0.3, // 0.1 to 0.4 base
    peakOpacity: 0.5 + r3 * 0.5, // 0.5 to 1.0 peak
  };
});

// One orbital ring
function OrbitRing({ products, radius, duration, counterDuration, glowColor }) {
  const total = products.length;
  return (
    <>
      {/* The visible orbit path */}
      <div
        className="absolute rounded-full border border-dashed border-stone-400/20 dark:border-white/[0.07] pointer-events-none"
        style={{ width: radius * 2, height: radius * 2 }}
      />

      {/* Rotating container */}
      <motion.div
        className="absolute flex items-center justify-center pointer-events-none"
        style={{ width: radius * 2, height: radius * 2 }}
        animate={{ rotate: 360 }}
        transition={{ duration, repeat: Infinity, ease: 'linear' }}
      >
        {products.map((product, index) => {
          const angle = (index / total) * (2 * Math.PI);
          const x = Math.cos(angle) * radius - product.size / 2;
          const y = Math.sin(angle) * radius - product.size / 2;
          const Icon = product.icon;

          return (
            <motion.div
              key={product.id}
              className="absolute pointer-events-auto"
              style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)` }}
              animate={{ rotate: -360 }}
              transition={{ duration: counterDuration, repeat: Infinity, ease: 'linear' }}
            >
              <PlanetOrb product={product} />
            </motion.div>
          );
        })}
      </motion.div>
    </>
  );
}

function PlanetOrb({ product }) {
  const [showTip, setShowTip] = useState(false);
  const [activeProduct, setActiveProduct] = useState(null);
  const Icon = product.icon;

  return (
    <>
      <div
        className="relative flex items-center justify-center rounded-full cursor-pointer group"
        style={{ width: product.size, height: product.size }}
        onMouseEnter={() => setShowTip(true)}
        onMouseLeave={() => setShowTip(false)}
        onClick={() => setActiveProduct(product)}
      >
        {/* Planet glow */}
        <motion.div
          className="absolute inset-0 rounded-full opacity-30 blur-md"
          style={{ background: product.color }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.25, 0.55, 0.25] }}
          transition={{ duration: 3 + product.id * 0.4, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Planet body */}
        <div
          className="relative rounded-full flex items-center justify-center border border-white/20 shadow-lg transition-transform duration-300 group-hover:scale-125"
          style={{
            width: product.size,
            height: product.size,
            background: `radial-gradient(circle at 35% 35%, ${product.color}cc, ${product.color}44)`,
            boxShadow: `0 0 20px ${product.color}55, inset 0 1px 0 rgba(255,255,255,0.3)`,
          }}
        >
          <Icon className="w-4 h-4 text-white drop-shadow-md" style={{ width: product.size * 0.38, height: product.size * 0.38 }} />
        </div>

        {/* Tooltip */}
        <AnimatePresence>
          {showTip && (
            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.9 }}
              transition={{ duration: 0.15 }}
              className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1.5 rounded-full bg-stone-900/90 dark:bg-black/90 text-white text-[10px] font-bold tracking-widest uppercase pointer-events-none z-50 shadow-xl"
            >
              {product.name}
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-stone-900/90 dark:bg-black/90 rotate-45" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Planet detail modal — via portal so it always escapes stacking contexts */}
      {ReactDOM.createPortal(
        <AnimatePresence>
          {activeProduct && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-stone-900/40 dark:bg-black/60 backdrop-blur-sm"
                style={{ zIndex: 9998 }}
                onClick={() => setActiveProduct(null)}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#faf8f5] dark:bg-neutral-950/95 backdrop-blur-2xl border border-stone-200 dark:border-white/10 p-8 sm:p-10 rounded-3xl max-w-md w-11/12 shadow-2xl flex flex-col items-center text-center"
                style={{ zIndex: 9999 }}
              >
                <button
                  onClick={() => setActiveProduct(null)}
                  className="absolute top-5 right-5 text-stone-400 dark:text-neutral-500 hover:text-stone-900 dark:hover:text-white transition-colors p-2 bg-stone-100 dark:bg-white/5 hover:bg-stone-200 dark:hover:bg-white/10 rounded-full"
                >
                  <X className="w-4 h-4" />
                </button>
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                  style={{ background: `${activeProduct.color}22`, border: `1px solid ${activeProduct.color}44` }}
                >
                  <activeProduct.icon className="w-8 h-8" style={{ color: activeProduct.color }} />
                </div>
                <h3 className="text-2xl font-black text-stone-900 dark:text-white tracking-tight mb-3">{activeProduct.name}</h3>
                <p className="text-stone-500 dark:text-neutral-400 text-base leading-relaxed mb-8">{activeProduct.desc}</p>
                <button
                  className="px-8 py-3 rounded-full font-bold text-sm tracking-wide text-white w-full transition-all duration-300 hover:opacity-90 hover:scale-105"
                  style={{ background: activeProduct.color }}
                >
                  Explore Product
                </button>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}

export default function Hero() {
  const [showAllProducts, setShowAllProducts] = useState(false);
  const isDesktop = window.matchMedia('(min-width: 768px)').matches;

  // Lock body scroll when either modal is open
  useScrollLock(showAllProducts);

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-start overflow-hidden bg-[#f0ede8] dark:bg-black pt-25 lg:pt-35 transition-colors duration-300">

      {/* Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Warm ambient glow in light mode */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] opacity-[0.18] dark:opacity-[0.04] blur-[180px] rounded-full"
          style={{ background: 'radial-gradient(circle, #f59e0b 0%, #a78bfa 50%, transparent 80%)' }}
        />

        {/* Stars */}
        <svg className="absolute inset-0 w-full h-full opacity-60 dark:opacity-100 pointer-events-none">
          {STARS.map((star) => (
            <motion.circle
              key={star.id}
              cx={star.cx}
              cy={star.cy}
              r={star.r}
              className="fill-stone-400 dark:fill-white"
              initial={{ opacity: star.blink ? star.baseOpacity : star.baseOpacity }}
              animate={star.blink ? { opacity: [star.baseOpacity, star.peakOpacity, star.baseOpacity] } : { opacity: star.baseOpacity }}
              transition={star.blink ? { duration: star.dur, repeat: Infinity, ease: 'easeInOut' } : {}}
            />
          ))}
        </svg>
      </div>

      {/* Main Contents */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-12 px-6">

        {/* Left Side: Typography & CTA */}
        <div className="w-full lg:w-1/2 lg:pr-10 text-center lg:text-left flex flex-col items-center lg:items-start pt-10 lg:pt-0">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-5 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-stone-200/80 dark:bg-white/5 border border-stone-300 dark:border-white/10 text-stone-600 dark:text-neutral-400 text-xs font-bold tracking-widest uppercase"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Now Accepting New Projects
          </motion.div>

          <motion.h1
            className="text-6xl sm:text-7xl lg:text-[130px] font-extrabold text-stone-900 dark:text-white mb-6 lg:mb-8 tracking-tighter leading-none"
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            Debuggers
          </motion.h1>

          <motion.p
            className="text-2xl lg:text-3xl text-stone-700 dark:text-neutral-300 font-semibold tracking-tight mb-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          >
            Smart Solutions for Growing Businesses.
          </motion.p>

          <motion.p
            className="text-base lg:text-lg text-stone-500 dark:text-neutral-500 max-w-xl mx-auto lg:mx-0 leading-relaxed mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          >
            We build high-quality software, mobile apps, and cloud systems that are fast and easy to use. Ready for the future, made simple for you.
          </motion.p>

          {/* Stats row */}
          <motion.div
            className="flex items-center gap-8 mb-10 w-full lg:w-auto justify-center lg:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            {[['50+', 'Projects'], ['6', 'Services'], ['100%', 'Satisfaction']].map(([val, label]) => (
              <div key={label} className="flex flex-col items-center lg:items-start">
                <span className="text-2xl font-black text-stone-900 dark:text-white tracking-tight">{val}</span>
                <span className="text-xs font-semibold text-stone-400 dark:text-neutral-500 tracking-wider uppercase">{label}</span>
              </div>
            ))}
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
          >
            <button
              onClick={() => setShowAllProducts(true)}
              className="px-10 py-4 rounded-full bg-stone-900 dark:bg-white text-white dark:text-black text-sm lg:text-base font-bold tracking-wide hover:bg-stone-700 dark:hover:bg-neutral-200 hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_40px_rgba(28,26,23,0.2)] dark:shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_50px_rgba(28,26,23,0.35)] dark:hover:shadow-[0_0_50px_rgba(255,255,255,0.4)]"
            >
              Discover Our Products
            </button>
            <a
              href="#services"
              onClick={(e) => { e.preventDefault(); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="px-10 py-4 rounded-full border border-stone-300 dark:border-white/20 text-stone-700 dark:text-white text-sm font-bold hover:bg-stone-900 dark:hover:bg-white hover:text-white dark:hover:text-black hover:border-stone-900 dark:hover:border-white transition-all duration-300"
            >
              View Services
            </a>
          </motion.div>
        </div>

        {/* Right Side: Solar System */}
        <motion.div
          className="w-full lg:w-1/2 flex items-center justify-center relative"
          style={{ height: 620 }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
        >
          <div className="relative flex items-center justify-center" style={{ width: 580, height: 580 }}>

            {/* ── Ring 1 (innermost, fast) ── */}
            <div className="absolute inset-0 flex items-center justify-center">
              <OrbitRing products={ring1Products} radius={130} duration={18} counterDuration={18} />
            </div>

            {/* ── Ring 2 (middle, medium) ── */}
            <div className="absolute inset-0 flex items-center justify-center">
              <OrbitRing products={ring2Products} radius={215} duration={36} counterDuration={36} />
            </div>

            {/* ── Ring 3 (outer, slow) ── */}
            <div className="absolute inset-0 flex items-center justify-center">
              <OrbitRing products={ring3Products} radius={290} duration={60} counterDuration={60} />
            </div>

            {/* ── Sun / Center ── */}
            <div className="absolute z-20 flex items-center justify-center">
              {/* Outer corona */}
              <motion.div
                className="absolute rounded-full opacity-20 dark:opacity-30"
                style={{ width: 140, height: 140, background: 'radial-gradient(circle, #fbbf24, #f59e0b, transparent)' }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />
              {/* Inner corona */}
              <motion.div
                className="absolute rounded-full"
                style={{ width: 90, height: 90, background: 'radial-gradient(circle, #fef3c7, #fbbf24 60%, transparent)', opacity: 0.35 }}
                animate={{ scale: [1, 1.15, 1], rotate: [0, 360] }}
                transition={{ scale: { duration: 3, repeat: Infinity, ease: 'easeInOut' }, rotate: { duration: 30, repeat: Infinity, ease: 'linear' } }}
              />
              {/* Spinning ring around sun */}
              <motion.div
                className="absolute rounded-full border-2 border-amber-400/50 dark:border-amber-400/30"
                style={{ width: 78, height: 78 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              />
              {/* Sun body */}
              <div
                className="relative w-16 h-16 rounded-full flex items-center justify-center cursor-pointer"
                style={{
                  background: 'radial-gradient(circle at 35% 35%, #fef08a, #f59e0b 60%, #d97706)',
                  boxShadow: '0 0 30px rgba(251,191,36,0.6), 0 0 60px rgba(251,191,36,0.3), 0 0 100px rgba(251,191,36,0.15), inset 0 2px 0 rgba(255,255,255,0.4)',
                }}
                onClick={() => setShowAllProducts(true)}
              >
                <div className="flex flex-col items-center select-none">
                  <span className="text-amber-900 font-black tracking-[0.15em] text-[7px] leading-none">OUR</span>
                  <span className="text-amber-900 font-black tracking-[0.1em] text-[9px] leading-none mt-0.5">PRODUCTS</span>
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      {isDesktop && (
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="w-6 h-10 rounded-full border border-stone-300 dark:border-white/20 flex items-start justify-center pt-2">
            <div className="w-1 h-3 rounded-full bg-stone-400 dark:bg-white/40" />
          </div>
        </motion.div>
      )}

      {/* All Products Modal — portal so it always renders above everything */}
      {ReactDOM.createPortal(
        <AnimatePresence>
          {showAllProducts && (
            <>
              <motion.div
                key="all-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-stone-900/50 dark:bg-black/70 backdrop-blur-md"
                style={{ zIndex: 9998 }}
                onClick={() => setShowAllProducts(false)}
              />
              <motion.div
                key="all-modal"
                initial={{ opacity: 0, scale: 0.92, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 30 }}
                transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] max-w-3xl max-h-[90vh] overflow-y-auto bg-[#faf8f5] dark:bg-neutral-950/95 backdrop-blur-2xl border border-stone-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl"
                style={{ zIndex: 9999 }}
              >
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl font-black text-stone-900 dark:text-white tracking-tighter">Our Products</h2>
                    <p className="text-stone-400 dark:text-neutral-500 text-sm mt-1">Everything we've built for you.</p>
                  </div>
                  <button
                    onClick={() => setShowAllProducts(false)}
                    className="w-9 h-9 rounded-full bg-stone-100 dark:bg-white/5 border border-stone-200 dark:border-white/10 flex items-center justify-center text-stone-400 dark:text-neutral-400 hover:text-stone-900 dark:hover:text-white hover:bg-stone-200 dark:hover:bg-white/10 transition-all duration-200"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {allProducts.map((product, i) => {
                    const Icon = product.icon;
                    return (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.06, duration: 0.4 }}
                        className="group flex flex-col gap-3 p-5 rounded-2xl bg-stone-50 dark:bg-white/3 border border-stone-200 dark:border-white/10 hover:border-stone-300 dark:hover:border-white/25 hover:bg-stone-100 dark:hover:bg-white/6 transition-all duration-300 cursor-pointer"
                      >
                        <div
                          className="w-11 h-11 rounded-xl flex items-center justify-center transition-colors duration-300"
                          style={{ background: `${product.color}18`, border: `1px solid ${product.color}33` }}
                        >
                          <Icon className="w-5 h-5" style={{ color: product.color }} />
                        </div>
                        <div>
                          <h3 className="text-stone-900 dark:text-white font-bold text-sm tracking-tight mb-1">{product.name}</h3>
                          <p className="text-stone-400 dark:text-neutral-500 text-xs leading-relaxed">{product.desc}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}
