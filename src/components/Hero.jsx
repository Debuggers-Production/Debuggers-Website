import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Store, ExternalLink } from 'lucide-react';

/** Locks body scroll while a modal is open. */
function useScrollLock(active) {
  useEffect(() => {
    if (!active) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [active]);
}

// 4 live & upcoming products across 3 rings
const ring1Products = [
  {
    id: 1,
    name: 'MenuKit',
    logo: '/products/menukit-icon.png',
    status: 'Live',
    url: 'https://debuggerstechnologies.com/menukit/',
    desc: 'Digital QR menu and smart ordering platform for restaurants and cafes—instant menu updates, zero printing costs, and effortless table ordering.',
    color: '#ff6b00',
    size: 56,
  },
  {
    id: 2,
    name: 'Dauth',
    logo: '/products/dauth-icon.png',
    status: 'Live',
    url: 'https://dauth.debuggerstechnologies.com',
    desc: 'Unified authentication and identity platform with zero-friction sign-in, session management, and enterprise-grade access control.',
    color: '#00d4ff',
    size: 54,
  },
];
const ring2Products = [
  {
    id: 3,
    name: 'Dwise',
    logo: '/products/dwise-icon.png',
    status: 'Coming Soon',
    url: null,
    desc: 'Smart spend & bill tracker where all your shop receipts and invoices arrive automatically in one place—no more WhatsApp bill spam. Ask AI "What did I buy yesterday?" or "What can I cook with it?"',
    color: '#10b981',
    size: 58,
  },
];
const ring3Products = [
  {
    id: 4,
    name: 'Subakarya',
    icon: Store,
    status: 'Coming Soon',
    url: null,
    desc: 'All your business in one platform—manage booking-based or order-based services while posting reels and stories on a built-in social feed. No separate website needed, with automatic SEO to bring customers to you.',
    color: '#8b5cf6',
    size: 56,
  },
];

const allProducts = [...ring1Products, ...ring2Products, ...ring3Products];

// Deterministic pseudo-random for stable SSR hydration
function seededRand(seed) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

// Pre-generate stable, realistic star data (optimized count for 60/120fps scrolling)
const STARS = Array.from({ length: 65 }, (_, i) => {
  const r1 = seededRand(i * 13);
  const r2 = seededRand(i * 27);
  const r3 = seededRand(i * 31);

  // Exponential sizing: mostly tiny stars
  const sizeMultiplier = Math.pow(r3, 4);
  const radius = 0.5 + sizeMultiplier * 1.4;

  return {
    id: i,
    cx: `${(r1 * 100).toFixed(2)}%`,
    cy: `${(r2 * 100).toFixed(2)}%`,
    r: radius,
    baseOpacity: (0.15 + r2 * 0.35).toFixed(2),
  };
});

// One orbital ring (GPU-accelerated CSS rotation for lag-free scrolling)
function OrbitRing({ products, radius, duration, counterDuration, glowColor, onHoverProduct }) {
  const total = products.length;
  return (
    <>
      {/* The visible orbit path */}
      <div
        className="absolute rounded-full border border-dashed border-stone-400/20 dark:border-white/[0.07] pointer-events-none"
        style={{ width: radius * 2, height: radius * 2 }}
      />

      {/* Rotating container with compositor-thread animation */}
      <div
        className="absolute flex items-center justify-center pointer-events-none"
        style={{
          width: radius * 2,
          height: radius * 2,
          animation: `heroSpin ${duration}s linear infinite`,
          willChange: 'transform',
        }}
      >
        {products.map((product, index) => {
          const angle = (index / total) * (2 * Math.PI);
          const x = Math.cos(angle) * radius - product.size / 2;
          const y = Math.sin(angle) * radius - product.size / 2;

          return (
            <div
              key={product.id}
              className="absolute pointer-events-auto"
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                animation: `heroCounterSpin ${counterDuration}s linear infinite`,
                willChange: 'transform',
              }}
            >
              <PlanetOrb product={product} onHoverProduct={onHoverProduct} />
            </div>
          );
        })}
      </div>
    </>
  );
}

function PlanetOrb({ product, onHoverProduct }) {
  const [showTip, setShowTip] = useState(false);
  const [activeProduct, setActiveProduct] = useState(null);
  const Icon = product.icon;

  return (
    <>
      <div
        className="relative flex items-center justify-center rounded-full cursor-pointer group"
        style={{ width: product.size, height: product.size }}
        onMouseEnter={() => { setShowTip(true); onHoverProduct?.(product.color); }}
        onMouseLeave={() => { setShowTip(false); onHoverProduct?.(null); }}
        onClick={() => setActiveProduct(product)}
      >
        {/* Planet glow */}
        <div
          className="absolute inset-0 rounded-full opacity-40 blur-md pointer-events-none transition-transform duration-300 group-hover:scale-125"
          style={{ background: product.color }}
        />
        {/* Planet body */}
        <div
          className="relative rounded-full flex items-center justify-center border border-white/25 shadow-lg transition-transform duration-300 group-hover:scale-125 bg-white/90 dark:bg-neutral-950/90"
          style={{
            width: product.size,
            height: product.size,
            boxShadow: `0 0 20px ${product.color}55, inset 0 1px 0 rgba(255,255,255,0.3)`,
          }}
        >
          {product.logo ? (
            <img
              src={product.logo}
              alt={product.name}
              width={Math.round(product.size * 0.6)}
              height={Math.round(product.size * 0.6)}
              decoding="async"
              className="object-contain drop-shadow-sm"
              style={{ width: product.size * 0.6, height: product.size * 0.6 }}
            />
          ) : (
            <Icon className="drop-shadow-md" style={{ width: product.size * 0.42, height: product.size * 0.42, color: product.color }} />
          )}
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
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
                  style={{ background: `${activeProduct.color}18`, border: `1px solid ${activeProduct.color}44` }}
                >
                  {activeProduct.logo ? (
                    <img src={activeProduct.logo} alt={activeProduct.name} width="40" height="40" decoding="async" className="w-10 h-10 object-contain" />
                  ) : (
                    <activeProduct.icon className="w-8 h-8" style={{ color: activeProduct.color }} />
                  )}
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase mb-3 ${
                    activeProduct.status === 'Live'
                      ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                      : 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30'
                  }`}
                >
                  {activeProduct.status}
                </span>
                <h3 className="text-2xl font-black text-stone-900 dark:text-white tracking-tight mb-3">{activeProduct.name}</h3>
                <p className="text-stone-500 dark:text-neutral-400 text-sm sm:text-base leading-relaxed mb-8">{activeProduct.desc}</p>
                {activeProduct.url ? (
                  <a
                    href={activeProduct.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full font-bold text-sm tracking-wide text-white w-full transition-all duration-300 hover:opacity-90 hover:scale-105"
                    style={{ background: activeProduct.color }}
                  >
                    Visit Live Product <ExternalLink className="w-4 h-4" />
                  </a>
                ) : (
                  <span className="inline-flex items-center justify-center px-8 py-3 rounded-full font-bold text-sm tracking-wide text-stone-500 dark:text-neutral-400 bg-stone-200 dark:bg-white/10 w-full cursor-default">
                    Coming Soon
                  </span>
                )}
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
  const [hoveredColor, setHoveredColor] = useState(null);
  const [colorIndex, setColorIndex] = useState(0);
  const isDesktop = window.matchMedia('(min-width: 768px)').matches;

  // Cycle hero background glow through product colors every 2 seconds
  useEffect(() => {
    const id = setInterval(() => {
      setColorIndex((prev) => (prev + 1) % allProducts.length);
    }, 2000);
    return () => clearInterval(id);
  }, []);

  const activeBgColor = hoveredColor || allProducts[colorIndex].color;

  // Lock body scroll when either modal is open
  useScrollLock(showAllProducts);

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-start overflow-hidden bg-[#f0ede8] dark:bg-black pt-25 lg:pt-35 transition-colors duration-300">

      {/* Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Product-reactive ambient background tint (stacked layers for smooth opacity crossfade) */}
        {allProducts.map((product) => {
          const isActive = activeBgColor === product.color;
          return (
            <div
              key={`tint-${product.id}`}
              className="absolute inset-0 transition-opacity duration-[1500ms] ease-in-out"
              style={{
                opacity: isActive ? 1 : 0,
                background: `radial-gradient(circle at 65% 50%, ${product.color}28 0%, ${product.color}10 45%, transparent 78%)`,
              }}
            />
          );
        })}
        {/* Ambient glow cycling through MenuKit, Dauth, Dwise, Subakarya */}
        <div
          className="absolute top-1/2 left-1/2 w-[700px] h-[700px] opacity-[0.20] dark:opacity-[0.14] blur-[90px] rounded-full pointer-events-none"
          style={{ transform: 'translate3d(-50%, -50%, 0)', willChange: 'opacity' }}
        >
          {allProducts.map((product) => {
            const isActive = activeBgColor === product.color;
            return (
              <div
                key={`glow-${product.id}`}
                className="absolute inset-0 rounded-full transition-opacity duration-[1500ms] ease-in-out"
                style={{
                  opacity: isActive ? 1 : 0,
                  background: `radial-gradient(circle, ${product.color} 0%, ${product.color}66 50%, transparent 80%)`,
                }}
              />
            );
          })}
        </div>

        {/* Stars (lightweight static vector render) */}
        <svg className="absolute inset-0 w-full h-full opacity-60 dark:opacity-100 pointer-events-none" aria-hidden="true">
          {STARS.map((star) => (
            <circle
              key={star.id}
              cx={star.cx}
              cy={star.cy}
              r={star.r}
              className="fill-stone-400 dark:fill-white"
              opacity={star.baseOpacity}
            />
          ))}
        </svg>
      </div>

      {/* Main Contents */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-12 px-6">

        {/* Left Side: Typography & CTA */}
        <div className="w-full lg:w-1/2 lg:pr-10 text-center lg:text-left flex flex-col items-center lg:items-start pt-10 lg:pt-0">
          <motion.h1
            className="text-5xl sm:text-6xl lg:text-[78px] xl:text-[88px] font-extrabold text-stone-900 dark:text-white mb-6 lg:mb-8 tracking-tighter leading-[1.02]"
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            Debuggers Technologies
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
            {[['10+', 'Projects'], ['6', 'Services'], ['100%', 'Satisfaction']].map(([val, label]) => (
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
              <OrbitRing products={ring1Products} radius={130} duration={18} counterDuration={18} onHoverProduct={setHoveredColor} />
            </div>

            {/* ── Ring 2 (middle, medium) ── */}
            <div className="absolute inset-0 flex items-center justify-center">
              <OrbitRing products={ring2Products} radius={215} duration={36} counterDuration={36} onHoverProduct={setHoveredColor} />
            </div>

            {/* ── Ring 3 (outer, slow) ── */}
            <div className="absolute inset-0 flex items-center justify-center">
              <OrbitRing products={ring3Products} radius={290} duration={60} counterDuration={60} onHoverProduct={setHoveredColor} />
            </div>

            {/* ── Sun / Center ── */}
            <div className="absolute z-20 flex items-center justify-center">
              {/* Outer corona */}
              <div
                className="absolute rounded-full opacity-20 dark:opacity-30 pointer-events-none"
                style={{ width: 140, height: 140, background: 'radial-gradient(circle, #fbbf24, #f59e0b, transparent)' }}
              />
              {/* Inner corona */}
              <div
                className="absolute rounded-full pointer-events-none"
                style={{
                  width: 90,
                  height: 90,
                  background: 'radial-gradient(circle, #fef3c7, #fbbf24 60%, transparent)',
                  opacity: 0.35,
                  animation: 'heroSpin 30s linear infinite',
                }}
              />
              {/* Spinning ring around sun */}
              <div
                className="absolute rounded-full border-2 border-amber-400/50 dark:border-amber-400/30 pointer-events-none"
                style={{ width: 78, height: 78, animation: 'heroSpin 10s linear infinite' }}
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {allProducts.map((product, i) => {
                    const Icon = product.icon;
                    const CardTag = product.url ? motion.a : motion.div;
                    const linkProps = product.url
                      ? { href: product.url, target: '_blank', rel: 'noopener noreferrer' }
                      : {};
                    return (
                      <CardTag
                        key={product.id}
                        {...linkProps}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.06, duration: 0.4 }}
                        className="group flex flex-col justify-between gap-4 p-5 rounded-2xl bg-stone-50 dark:bg-white/3 border border-stone-200 dark:border-white/10 hover:border-stone-300 dark:hover:border-white/25 hover:bg-stone-100 dark:hover:bg-white/6 transition-all duration-300 cursor-pointer"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <div
                              className="w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300"
                              style={{ background: `${product.color}18`, border: `1px solid ${product.color}33` }}
                            >
                              {product.logo ? (
                                <img src={product.logo} alt={product.name} width="28" height="28" decoding="async" className="w-7 h-7 object-contain" />
                              ) : (
                                <Icon className="w-6 h-6" style={{ color: product.color }} />
                              )}
                            </div>
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase ${
                                product.status === 'Live'
                                  ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                                  : 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30'
                              }`}
                            >
                              {product.status}
                            </span>
                          </div>
                          <h3 className="text-stone-900 dark:text-white font-bold text-base tracking-tight mb-1.5 flex items-center gap-1.5">
                            {product.name}
                            {product.url && <ExternalLink className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />}
                          </h3>
                          <p className="text-stone-500 dark:text-neutral-400 text-xs leading-relaxed">{product.desc}</p>
                        </div>
                      </CardTag>
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
