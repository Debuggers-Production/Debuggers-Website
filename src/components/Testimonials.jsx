import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  Star, Quote, ChevronLeft, ChevronRight,
  Building2, ShoppingBag, HeartPulse, GraduationCap, Cpu, Truck,
  TrendingUp, Clock, Users, Award,
} from 'lucide-react';
import { div } from 'framer-motion/client';

/* ─── Data ─────────────────────────────────────────────────────────────────── */
const testimonials = [
  {
    id: 1, name: 'Arjun Mehta', role: 'CTO', company: 'FinVault Technologies',
    Icon: Building2, color: '#60a5fa',
    quote: "Debuggers completely transformed our legacy banking dashboard into a lightning-fast, modern platform. Their technical depth is unlike anything I've seen from an agency — delivery was ahead of schedule.",
    metric: '3×', metricLabel: 'speed boost',
  },
  {
    id: 2, name: 'Priya Nair', role: 'Founder & CEO', company: 'CartZen',
    Icon: ShoppingBag, color: '#34d399',
    quote: "We went from idea to a fully-deployed mobile app in just 6 weeks. The UI is gorgeous, customers keep complimenting it, and conversions jumped 40% after launch. Highly recommend for any product startup.",
    metric: '40%', metricLabel: 'more conversions',
  },
  {
    id: 3, name: 'Dr. Kavitha Rajan', role: 'Director of Engineering', company: 'MedChain Health',
    Icon: HeartPulse, color: '#f87171',
    quote: "Security and compliance were non-negotiable for us. Debuggers delivered HIPAA-ready infrastructure with zero vulnerabilities. Their DevOps pipeline is world-class and our uptime has been flawless.",
    metric: '99.99%', metricLabel: 'uptime',
  },
  {
    id: 4, name: 'Rohan Sharma', role: 'Product Lead', company: 'EduPulse Academy',
    Icon: GraduationCap, color: '#fbbf24',
    quote: "Our LMS needed a complete AI-powered overhaul. Debuggers integrated GPT-based personalization and rebuilt the entire frontend in React. Student engagement went through the roof.",
    metric: '68%', metricLabel: 'engagement gain',
  },
  {
    id: 5, name: 'Sneha Pillai', role: 'Head of Digital', company: 'LogixPro',
    Icon: Truck, color: '#a78bfa',
    quote: "The real-time fleet tracking dashboard they built handles 10,000+ concurrent vehicles without breaking a sweat. The WebSocket architecture is brilliant, and the UI is so clean our drivers figured it out on day one.",
    metric: '10K+', metricLabel: 'live vehicles',
  },
  {
    id: 6, name: 'Vikram Anand', role: 'Co-Founder', company: 'NeuralLabs',
    Icon: Cpu, color: '#e879f9',
    quote: "We needed an AI product built fast with a premium feel. Debuggers nailed both — a sleek frontend, a robust Python API, and RAG-powered search all shipped in 8 weeks. Our investors were blown away.",
    metric: '8wk', metricLabel: 'from idea to launch',
  },
];

const STATS = [
  { icon: TrendingUp, value: '50+',  label: 'Projects delivered', color: '#60a5fa' },
  { icon: Award,      value: '5.0',  label: 'Average rating',     color: '#fbbf24' },
  { icon: Users,      value: '100%', label: 'Client retention',   color: '#34d399' },
  { icon: Clock,      value: '<48h', label: 'First response',     color: '#a78bfa' },
];

/* ─── Stat item — only animates once on scroll-into-view ────────────────────── */
const StatItem = memo(function StatItem({ value, label, icon: Icon, color, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center gap-2"
    >
      <div
        className="w-10 h-10 rounded-2xl flex items-center justify-center mb-1"
        style={{ background: `${color}18`, border: `1px solid ${color}44` }}
      >
        <Icon size={18} style={{ color }} />
      </div>
      <span className="text-stone-900 dark:text-white font-black text-2xl tracking-tighter leading-none">{value}</span>
      <span className="text-stone-400 dark:text-neutral-500 text-xs font-medium text-center">{label}</span>
    </motion.div>
  );
});

/* ─── Card — GPU-only transforms, NO filter/blur/boxShadow animations ─────── */
const TestimonialCard = memo(function TestimonialCard({ t, isCenter, onClick }) {
  const Icon = t.Icon;

  return (
    <motion.div
      onClick={onClick}
      initial={false}
      animate={{
        scale:   isCenter ? 1 : 0.83,
        opacity: isCenter ? 1 : 0.35,
        /* NO filter/blur — kills perf. Use opacity only for de-emphasis */
      }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      style={{
        cursor: isCenter ? 'default' : 'pointer',
        willChange: 'transform, opacity',
      }}
      className={`relative flex-1 min-w-0 rounded-3xl flex flex-col gap-4 border p-6 ${
        isCenter
          ? 'bg-white dark:bg-white/[0.04] border-stone-200 dark:border-white/10 shadow-[0_12px_40px_rgba(28,26,23,0.1)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.65)]'
          : 'bg-stone-50/70 dark:bg-white/[0.018] border-stone-100 dark:border-white/5 hidden md:flex'
      }`}
    >
      {/* Accent top bar — CSS only, no animation */}
      {isCenter && (
        <div
          className="absolute top-0 left-8 right-8 h-[2px] rounded-full"
          style={{ background: `linear-gradient(90deg,transparent,${t.color}BB,transparent)` }}
        />
      )}

      {/* Quote icon — static, no infinite animation */}
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{
          background: isCenter ? `${t.color}14` : 'transparent',
          border: isCenter ? `1px solid ${t.color}30` : 'none',
        }}
      >
        <Quote size={18} style={{ color: isCenter ? t.color : '#9ca3af', opacity: isCenter ? 0.65 : 0.25 }} />
      </div>

      {/* Quote */}
      <p className="text-stone-600 dark:text-neutral-300 leading-relaxed text-sm flex-1">
        "{t.quote}"
      </p>

      {/* Metric pill — CSS transition, no AnimatePresence */}
      <div
        className="flex items-center gap-2 px-3 py-1.5 rounded-full self-start transition-opacity duration-300"
        style={{
          background: `${t.color}14`,
          border: `1px solid ${t.color}38`,
          opacity: isCenter ? 1 : 0,
        }}
      >
        {/* Static dot — no animation */}
        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: t.color }} />
        <span className="text-xs font-black tracking-wide" style={{ color: t.color }}>
          {t.metric} <span className="font-medium opacity-70">{t.metricLabel}</span>
        </span>
      </div>

      <div className="w-full h-px bg-stone-100 dark:bg-white/8" />

      {/* Author */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: `${t.color}16`, border: `1px solid ${t.color}40` }}
          >
            <Icon size={16} style={{ color: t.color }} />
          </div>
          <div>
            <p className="text-stone-900 dark:text-white font-bold text-sm tracking-tight leading-tight">{t.name}</p>
            <p className="text-stone-400 dark:text-neutral-500 text-xs">{t.role} · {t.company}</p>
          </div>
        </div>
        {/* Stars — CSS opacity transition, no motion per-star */}
        <div
          className="flex gap-0.5 transition-opacity duration-300"
          style={{ opacity: isCenter ? 1 : 0 }}
        >
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={12} style={{ color: '#fbbf24', fill: '#fbbf24' }} />
          ))}
        </div>
      </div>
    </motion.div>
  );
});

/* ─── Main ──────────────────────────────────────────────────────────────────── */
export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const total = testimonials.length;
  const sectionRef = useRef(null);
  const titleInView = useInView(sectionRef, { once: true, margin: '-80px' });

  /* Auto-play */
  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(() => setActive(a => (a + 1) % total), 5000);
    return () => clearInterval(id);
  }, [isPaused, total]);

  const go = useCallback((dir) => setActive(a => (a + dir + total) % total), [total]);

  /* Keyboard nav */
  useEffect(() => {
    const h = (e) => { if (e.key === 'ArrowLeft') go(-1); if (e.key === 'ArrowRight') go(1); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [go]);

  const prev = (active - 1 + total) % total;
  const next = (active + 1) % total;

  return (
    <section
      id='testimonials'
      ref={sectionRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="w-full py-20 sm:py-28 bg-[#f0ede8] dark:bg-black border-t border-stone-200 dark:border-white/5 relative overflow-hidden transition-colors duration-300"
    >
      {/* Static ambient gradient — NO animation, just CSS */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] rounded-full pointer-events-none opacity-[0.06] dark:opacity-[0.05]"
        style={{ background: 'radial-gradient(circle, #7c3aed 0%, #3b82f6 50%, transparent 80%)', filter: 'blur(80px)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

        {/* ── Header ── */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-200 dark:bg-white/5 border border-stone-300 dark:border-white/10 text-stone-500 dark:text-neutral-500 text-xs font-bold tracking-widest uppercase mb-5"
          >
            {/* Static pulsing dot via CSS animation */}
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#7c3aed' }} />
            Client Stories
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl md:text-5xl font-extrabold text-stone-900 dark:text-white tracking-tight mb-4"
          >
            Trusted by Builders{' '}
            <span className="relative inline-block">
              Who Ship.
              <motion.span
                initial={{ scaleX: 0 }}
                animate={titleInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.65, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="absolute bottom-0 left-0 w-full h-[3px] rounded-full origin-left"
                style={{ background: 'linear-gradient(90deg,#7c3aed,#3b82f6)', willChange: 'transform' }}
              />
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-stone-500 dark:text-neutral-400 text-lg font-light max-w-lg mx-auto"
          >
            Real results from companies that chose to build with Debuggers.
          </motion.p>
        </div>

        {/* ── Progress dots ── */}
        <div className="flex justify-center mb-8 gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="relative h-[5px] rounded-full overflow-hidden transition-all duration-300"
              style={{ width: i === active ? 28 : 18, background: 'rgba(120,113,108,0.18)' }}
            >
              {/* CSS animation via keyframes injected below */}
              {i === active && !isPaused && (
                <div className="absolute inset-y-0 left-0 rounded-full testimonial-progress" style={{ background: '#7c3aed' }} />
              )}
              {i === active && (
                <div className="absolute inset-0 rounded-full" style={{ background: 'rgba(124,58,237,0.35)' }} />
              )}
            </button>
          ))}
        </div>

        {/* ── 3-card row ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-stretch gap-4"
        >
          {/* Prev arrow */}
          <button
            onClick={() => go(-1)}
            className="hidden sm:flex w-9 h-9 self-center flex-shrink-0 rounded-full bg-white dark:bg-white/5 border border-stone-200 dark:border-white/10 items-center justify-center text-stone-400 dark:text-neutral-400 hover:text-stone-900 dark:hover:text-white hover:border-stone-300 dark:hover:border-white/20 transition-colors duration-200 shadow-sm"
          >
            <ChevronLeft size={16} />
          </button>

          {/* Cards — keyed by id so React diffs correctly */}
          <div className="flex items-stretch gap-4 flex-1 min-w-0">
            <TestimonialCard key={`l-${testimonials[prev].id}`} t={testimonials[prev]} isCenter={false} onClick={() => go(-1)} />
            <TestimonialCard key={`c-${testimonials[active].id}`} t={testimonials[active]} isCenter={true}  onClick={() => {}} />
            <TestimonialCard key={`r-${testimonials[next].id}`}  t={testimonials[next]}  isCenter={false} onClick={() => go(1)}  />
          </div>

          {/* Next arrow */}
          <button
            onClick={() => go(1)}
            className="hidden sm:flex w-9 h-9 self-center flex-shrink-0 rounded-full bg-white dark:bg-white/5 border border-stone-200 dark:border-white/10 items-center justify-center text-stone-400 dark:text-neutral-400 hover:text-stone-900 dark:hover:text-white hover:border-stone-300 dark:hover:border-white/20 transition-colors duration-200 shadow-sm"
          >
            <ChevronRight size={16} />
          </button>
        </motion.div>

        {/* Mobile controls */}
        <div className="flex sm:hidden items-center justify-center gap-4 mt-6">
          <button onClick={() => go(-1)} className="w-10 h-10 rounded-full bg-white dark:bg-white/5 border border-stone-200 dark:border-white/10 flex items-center justify-center text-stone-400">
            <ChevronLeft size={16} />
          </button>
          <span className="text-stone-400 dark:text-neutral-500 text-sm font-semibold tabular-nums">{active + 1} / {total}</span>
          <button onClick={() => go(1)} className="w-10 h-10 rounded-full bg-white dark:bg-white/5 border border-stone-200 dark:border-white/10 flex items-center justify-center text-stone-400">
            <ChevronRight size={16} />
          </button>
        </div>

        {/* ── Stats ── */}
        <div className="mt-14 pt-10 border-t border-stone-200 dark:border-white/8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {STATS.map((s, i) => (
              <StatItem key={s.label} value={s.value} label={s.label} icon={s.icon} color={s.color} delay={i * 0.08} />
            ))}
          </div>
        </div>
      </div>

      {/* Progress bar keyframe — one global injection */}
      <style>{`
        .testimonial-progress {
          animation: tprogress 5s linear forwards;
          width: 0%;
        }
        @keyframes tprogress { to { width: 100%; } }
      `}</style>
    </section>
  );
}
