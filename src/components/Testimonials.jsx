import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  Star, Quote, ChevronLeft, ChevronRight,
  Building2, ShoppingBag, HeartPulse, GraduationCap, Cpu, Truck, Cloud,
  TrendingUp, Clock, Users, Award,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

/* ─── Data ─────────────────────────────────────────────────────────────────── */
const testimonials = [
  {
    id: 1, name: 'Vexatech', role: 'Founder', company: 'Vexatech.in',
    Icon: Building2, color: '#60a5fa', darkColor: '#1d4ed8',
    quote: "Working with Debuggers Technologies on our web architecture, backend systems, and server management was seamless. Their code quality, attention to performance, and proactive maintenance helped us scale reliably with confidence.",
    metric: 'Vexatech.in', metricLabel: 'Web, Backend & Server Management',
  },
  {
    id: 2, name: 'Antaris Softwares', role: 'Founder', company: 'Inventq.in',
    Icon: Cpu, color: '#34d399', darkColor: '#047857',
    quote: "Debuggers Technologies built the full Inventq.in software ecosystem from the ground up—including the frontend web platform, backend APIs, and mobile application. Their end-to-end execution and performance delivered a complete product our users love.",
    metric: 'Inventq.in', metricLabel: 'Full Software: Web, Mobile App & APIs',
  },
  {
    id: 3,
    name: 'NexSkill Advisory',
    role: 'Founder',
    company: 'Powered by Waay2Tech',
    Icon: Cloud,
    color: '#38bdf8',
    darkColor: '#0369a1',
    quote: "Debuggers Technologies architected and built our entire cloud infrastructure from the ground up. Their implementation gave us rock-solid scalability, automated CI/CD pipelines, and high-performance cloud security.",
    metric: 'Cloud Infra',
    metricLabel: 'Architecture & DevOps',
  },
];

const STATS = [
  { icon: TrendingUp, value: '10+',  label: 'Projects delivered', color: '#60a5fa' },
  { icon: Award,      value: '5.0',  label: 'Average rating',     color: '#fbbf24' },
  { icon: Users,      value: '100%', label: 'Client retention',   color: '#34d399' },
  { icon: Clock,      value: '<7hrs', label: 'First response',     color: '#a78bfa' },
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
  const { isDark } = useTheme();
  const Icon = t.Icon;
  const pillTextColor = isDark ? t.color : (t.darkColor || t.color);

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
          ? 'bg-white/95 dark:bg-white/[0.04] border-slate-300/80 dark:border-white/10 shadow-[0_12px_40px_rgba(15,23,42,0.08)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.65)]'
          : 'bg-white/60 dark:bg-white/[0.018] border-slate-200/80 dark:border-white/5 hidden md:flex'
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

      {/* Metric pill — high-contrast crisp text in light and dark mode */}
      <div
        className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full self-start transition-opacity duration-300"
        style={{
          background: isDark ? `${t.color}18` : `${t.darkColor || t.color}12`,
          border: `1px solid ${isDark ? `${t.color}45` : `${t.darkColor || t.color}40`}`,
          opacity: isCenter ? 1 : 0,
        }}
      >
        <span
          className="text-xs tracking-tight"
          style={{ color: pillTextColor }}
        >
          <span className="font-extrabold">{t.metric}</span>
          <span className="mx-1.5 opacity-40">·</span>
          <span className="font-semibold">{t.metricLabel}</span>
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
      className="w-full py-20 sm:py-28 bg-[#eaedf2] dark:bg-black border-t border-slate-300/70 dark:border-white/5 relative overflow-hidden transition-colors duration-300"
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
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-300/60 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-600 dark:text-neutral-400 text-xs font-bold tracking-widest uppercase mb-5"
          >
            Client Stories
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4"
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
            className="text-slate-600 dark:text-neutral-400 text-lg font-light max-w-lg mx-auto"
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
