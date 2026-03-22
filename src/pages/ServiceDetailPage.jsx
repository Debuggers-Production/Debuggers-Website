import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ChevronDown, ChevronUp, Star, Zap, Crown, ArrowRight } from 'lucide-react';
import { servicesData } from '../data/servicesData';
import Navbar from '../components/Navbar';

// ── Visual Roadmap ────────────────────────────────────────────────────────────

function ProcessSection({ steps }) {
  return (
    <section id="process" className="py-28 px-6 border-t border-white/5">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tighter mb-4">How We Build</h2>
          <p className="text-neutral-400 text-lg max-w-xl mx-auto">A clear, structured journey from idea to launch.</p>
        </motion.div>

        {/* Roadmap */}
        <div className="relative">
          {/* Central spine line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-linear-to-b from-transparent via-white/20 to-transparent hidden md:block" />

          <div className="space-y-0">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isLeft = i % 2 === 0;

              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className={`relative flex items-center gap-0 md:gap-10 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} flex-row pb-16`}
                >
                  {/* Card */}
                  <div className={`w-full md:w-[calc(50%-2.5rem)] group`}>
                    <div className="relative p-6 rounded-2xl bg-white/3 border border-white/10 hover:border-white/25 hover:bg-white/5 transition-all duration-400 overflow-hidden">
                      {/* Step number watermark */}
                      <span className="absolute top-4 right-4 text-6xl font-black text-white/4 select-none leading-none">
                        {String(i + 1).padStart(2, '0')}
                      </span>

                      <div className="relative z-10">
                        <div className="w-10 h-10 rounded-xl bg-black border border-white/10 group-hover:border-white/30 flex items-center justify-center mb-4 transition-colors duration-300">
                          <Icon className="w-5 h-5 text-white/50 group-hover:text-white transition-colors duration-300" />
                        </div>
                        <p className="text-xs font-bold text-white/25 tracking-[0.2em] mb-2 uppercase">Step {String(i + 1).padStart(2, '0')}</p>
                        <h3 className="text-lg font-bold text-white mb-2 tracking-tight">{step.title}</h3>
                        <p className="text-neutral-400 text-sm leading-relaxed">{step.desc}</p>
                      </div>
                    </div>

                    {/* Connector arm (horizontal line from card to spine) — desktop only */}
                    <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 h-px w-10 bg-white/15 ${isLeft ? 'right-0 translate-x-full' : 'left-0 -translate-x-full'}`} />
                  </div>

                  {/* Center node on spine */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex-col items-center z-10">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.1 + 0.3, type: 'spring', stiffness: 200 }}
                      className="w-10 h-10 rounded-full bg-black border-2 border-white/30 flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.08)]"
                    >
                      <span className="text-white text-xs font-black">{i + 1}</span>
                    </motion.div>
                  </div>

                  {/* Empty spacer for the other side */}
                  <div className="hidden md:block w-[calc(50%-2.5rem)]" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Hero ─────────────────────────────────────────────────────────────────────

function HeroSection({ service }) {
  const isDesktop = window.matchMedia('(min-width: 768px)').matches;
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/3 blur-[120px] rounded-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-5xl mx-auto"
      >
        <div className="mb-8 flex justify-center">
          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-xl">
            <service.icon className="w-8 h-8 text-white" />
          </div>
        </div>

        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-none mb-8">
          {service.title}
        </h1>

        <p className="text-xl sm:text-2xl lg:text-3xl text-neutral-300 font-medium tracking-tight mb-6 whitespace-pre-line">
          {service.tagline}
        </p>

        <p className="text-base lg:text-lg text-neutral-500 max-w-2xl mx-auto leading-relaxed">
          {service.subtext}
        </p>

        
      </motion.div>

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

    </section>
  );
}

// ── Features ──────────────────────────────────────────────────────────────────

function FeaturesSection({ features }) {
  return (
    <section id="features" className="py-28 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tighter mb-4">What's Included</h2>
          <p className="text-neutral-400 text-lg max-w-xl mx-auto">Everything you need, nothing you don't.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group p-6 rounded-2xl bg-white/3 border border-white/10 hover:bg-white/6 hover:border-white/20 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-black border border-white/10 flex items-center justify-center mb-4 group-hover:border-white/30 transition-colors duration-300">
                  <Icon className="w-5 h-5 text-white/60 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-white font-bold mb-1 tracking-tight">{feature.title}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── Pricing ───────────────────────────────────────────────────────────────────

const tierConfig = [
  {
    icon: Star,
    glow: 'rgba(148,163,184,0.12)',
    accent: 'from-slate-400/20 to-slate-600/5',
    borderGrad: 'from-white/10 via-white/5 to-white/10',
    badgeColor: 'text-slate-300',
    iconBg: 'bg-slate-500/10 border-slate-400/20',
    iconColor: 'text-slate-300',
  },
  {
    icon: Zap,
    glow: 'rgba(168,85,247,0.18)',
    accent: 'from-violet-500/20 via-fuchsia-500/10 to-purple-600/5',
    borderGrad: 'from-violet-400/40 via-fuchsia-400/30 to-purple-400/40',
    badgeColor: 'text-violet-300',
    iconBg: 'bg-violet-500/15 border-violet-400/30',
    iconColor: 'text-violet-300',
  },
  {
    icon: Crown,
    glow: 'rgba(234,179,8,0.14)',
    accent: 'from-yellow-500/15 via-amber-400/10 to-orange-500/5',
    borderGrad: 'from-yellow-400/30 via-amber-300/20 to-orange-400/30',
    badgeColor: 'text-yellow-300',
    iconBg: 'bg-yellow-500/10 border-yellow-400/20',
    iconColor: 'text-yellow-300',
  },
];

function PricingSection({ pricing }) {
  return (
    <section id="pricing" className="py-28 px-6 border-t border-white/5 relative overflow-hidden">
      {/* Section ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-violet-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tighter mb-4">Simple, Honest Pricing</h2>
          <p className="text-neutral-400 text-lg max-w-xl mx-auto">No hidden fees. Pick the plan that fits your stage.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {pricing.map((plan, i) => {
            const cfg = tierConfig[i];
            const TierIcon = cfg.icon;
            const isHighlight = plan.highlight;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: isHighlight ? -4 : -6, transition: { duration: 0.3 } }}
                className={`relative flex flex-col ${isHighlight ? 'lg:-mt-6 lg:mb-0' : ''}`}
              >
                {/* Ambient glow behind card */}
                <div
                  className="absolute -inset-4 rounded-4xl blur-2xl opacity-60 pointer-events-none transition-opacity duration-500"
                  style={{ background: `radial-gradient(ellipse at center, ${cfg.glow} 0%, transparent 70%)` }}
                />

                {/* Gradient border wrapper */}
                <div className={`relative rounded-3xl p-px bg-linear-to-br ${cfg.borderGrad} ${isHighlight ? 'shadow-[0_0_80px_rgba(168,85,247,0.25)]' : ''}`}>
                  {/* Card body */}
                  <div className={`relative rounded-[calc(1.5rem-1px)] p-8 flex flex-col h-full
                    ${isHighlight
                      ? 'bg-[radial-gradient(ellipse_at_top,_rgba(109,40,217,0.18)_0%,_rgba(0,0,0,0.95)_60%)]'
                      : 'bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.04)_0%,_rgba(0,0,0,0.92)_60%)]'
                    } backdrop-blur-2xl`}
                  >
                    {/* Inner radial accent */}
                    <div className={`absolute inset-0 bg-linear-to-br ${cfg.accent} opacity-80 pointer-events-none rounded-3xl`} />

                    {/* Floating "MOST POPULAR" ribbon */}
                    {isHighlight && (
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[900]">
                        <motion.div
                          animate={{ boxShadow: ['0 0 12px rgba(168,85,247,0.5)', '0 0 28px rgba(168,85,247,0.8)', '0 0 12px rgba(168,85,247,0.5)'] }}
                          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                          className="px-5 py-1.5 rounded-full bg-white text-black shadow-[0_0_60px_rgba(255,255,255,0.15)] text-[10px] font-black tracking-[0.2em] whitespace-nowrap"
                        >
                          MOST POPULAR
                        </motion.div>
                      </div>
                    )}

                    {/* Tier header */}
                    <div className="relative z-10 flex items-center gap-3 mb-6 mt-2">
                      <div className={`w-11 h-11 rounded-xl border flex items-center justify-center ${cfg.iconBg}`}>
                        <TierIcon className={`w-5 h-5 ${cfg.iconColor}`} />
                      </div>
                      <div>
                        <p className={`text-xs font-bold tracking-[0.2em] uppercase ${cfg.badgeColor} opacity-70`}>Plan</p>
                        <p className="text-white font-black text-lg tracking-tight leading-tight">{plan.tier}</p>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="relative z-10 mb-6 pb-6 border-b border-white/8">
                      <p className="text-2xl font-black text-white tracking-tighter leading-none mb-2">{plan.price}</p>
                      <p className="text-neutral-500 text-sm leading-relaxed">{plan.description}</p>
                    </div>

                    {/* Features */}
                    <div className="relative z-10 flex-1 space-y-3 mb-8">
                      {plan.features.map((feature, j) => (
                        <div key={j} className="flex items-start gap-3">
                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${cfg.iconBg}`}>
                            <CheckCircle2 className={`w-3 h-3 ${cfg.iconColor}`} />
                          </div>
                          <span className="text-sm text-neutral-300 leading-relaxed">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="relative z-10">
                      {isHighlight ? (
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          className="w-full py-4 rounded-2xl text-sm font-black tracking-wide 
                          bg-white text-black 
                          flex items-center justify-center gap-2 
                          shadow-[0_0_25px_rgba(255,255,255,0.25)] 
                          hover:shadow-[0_0_45px_rgba(255,255,255,0.4)] 
                          hover:scale-[1.02] 
                          transition-all duration-300"
                        >
                          {plan.cta}
                          <ArrowRight className="w-4 h-4" />
                        </motion.button>
                      ) : (
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full py-4 rounded-2xl text-sm font-bold tracking-wide border border-white/15 text-neutral-300 hover:text-white hover:border-white/30 hover:bg-white/5 flex items-center justify-center gap-2 transition-all duration-300"
                        >
                          {plan.cta}
                          <ArrowRight className="w-4 h-4" />
                        </motion.button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


// ── FAQ ───────────────────────────────────────────────────────────────────────

function FAQSection({ faq }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="faq" className="py-28 px-6 border-t border-white/5">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tighter mb-4">Common Questions</h2>
        </motion.div>

        <div className="space-y-4">
          {faq.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-2xl bg-white/3 border border-white/10 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full text-left p-6 flex items-center justify-between gap-4 hover:bg-white/3 transition-colors duration-200"
              >
                <span className="text-white font-semibold tracking-tight">{item.q}</span>
                {openIndex === i
                  ? <ChevronUp className="w-5 h-5 text-neutral-400 shrink-0" />
                  : <ChevronDown className="w-5 h-5 text-neutral-400 shrink-0" />
                }
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-6 text-neutral-400 leading-relaxed">{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const service = servicesData[slug];

  if (!service) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white gap-6">
        <h1 className="text-4xl font-black tracking-tighter">Service Not Found</h1>
        <p className="text-neutral-400">That service doesn't exist yet.</p>
        <button
          onClick={() => navigate('/')}
          className="px-8 py-3 rounded-full border border-white/20 text-white text-sm font-bold hover:bg-white hover:text-black transition-all"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-black text-white"
    >
      {/* Main navbar with back button and service name */}
      <Navbar backTo="/" serviceTitle={service.title} />

      <div className="">
        <HeroSection service={service} />
        <ProcessSection steps={service.steps} />
        <FeaturesSection features={service.features} />
        <PricingSection pricing={service.pricing} />
        <FAQSection faq={service.faq} />

        {/* Footer CTA */}
        <section className="py-28 px-6 border-t border-white/5 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tighter mb-6">Ready to Get Started?</h2>
            <p className="text-neutral-400 text-lg mb-10">Let's talk about your project. No commitment, no pressure.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="px-10 py-4 rounded-full bg-white text-black text-sm font-bold tracking-wide hover:bg-neutral-200 hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.15)]">
                Book a Free Consultation
              </button>
              <Link to="/" className="px-10 py-4 rounded-full border border-white/20 text-white text-sm font-bold hover:bg-white/10 transition-all duration-300">
                Explore All Services
              </Link>
            </div>
          </div>
        </section>
      </div>
    </motion.div>
  );
}
