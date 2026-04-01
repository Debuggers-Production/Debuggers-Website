import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Code, PenTool, Server, ArrowUpRight, X, ExternalLink, Users } from 'lucide-react';

/** Locks body scroll while a modal is open. */
function useScrollLock(active) {
  useEffect(() => {
    if (!active) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [active]);
}

const teamMembers = [
  {
    id: 1,
    name: 'Siva',
    role: 'Lead UI/UX Designer',
    desc: 'Specializes in creating beautiful, easy-to-use interfaces that deliver a premium experience to every user.',
    icon: PenTool,
    skills: ['Figma', 'Prototyping', 'Design Systems', 'WCAG'],
    portfolioUrl: '#portfolio-siva',
    accentColor: '#f472b6',
    emoji: '🎨',
  },
  {
    id: 2,
    name: 'Alex',
    role: 'Senior Web Developer',
    desc: 'Expert in building fast and secure full-stack web applications with React, Node.js, and cloud-native tooling.',
    icon: Code,
    skills: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
    portfolioUrl: '#portfolio-alex',
    accentColor: '#60a5fa',
    emoji: '💻',
  },
  {
    id: 3,
    name: 'Jordan',
    role: 'DevOps Engineer',
    desc: 'Ensures our servers run 24/7 by building bulletproof CI/CD pipelines and automated cloud infrastructure.',
    icon: Server,
    skills: ['Kubernetes', 'Terraform', 'CI/CD', 'Docker'],
    portfolioUrl: '#portfolio-jordan',
    accentColor: '#34d399',
    emoji: '⚙️',
  },
];

// Minimized developer card for the popup
function MiniDevCard({ member, index }) {
  const Icon = member.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 sm:p-5 rounded-2xl bg-stone-50 dark:bg-white/3 border border-stone-200 dark:border-white/10 hover:border-stone-300 dark:hover:border-white/25 transition-all duration-300 overflow-hidden"
    >
      {/* Accent glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{ background: `radial-gradient(ellipse at left, ${member.accentColor}0d, transparent 70%)` }}
      />

      {/* Avatar */}
      <div
        className="relative w-14 h-14 shrink-0 rounded-2xl flex items-center justify-center text-2xl border-2"
        style={{ background: `${member.accentColor}18`, borderColor: `${member.accentColor}33` }}
      >
        <span>{member.emoji}</span>
        {/* Role badge */}
        <div
          className="absolute -bottom-1 -right-1 w-6 h-6 rounded-lg flex items-center justify-center border border-stone-100 dark:border-black"
          style={{ background: member.accentColor }}
        >
          <Icon className="w-3 h-3 text-white" />
        </div>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2 mb-0.5 flex-wrap">
          <h3 className="text-stone-900 dark:text-white font-black text-base tracking-tight">{member.name}</h3>
          <span className="text-stone-400 dark:text-neutral-500 text-xs font-medium">{member.role}</span>
        </div>
        {/* Skills */}
        <div className="flex flex-wrap gap-1.5 mt-2">
          {member.skills.map(skill => (
            <span
              key={skill}
              className="px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide border"
              style={{ color: member.accentColor, background: `${member.accentColor}12`, borderColor: `${member.accentColor}30` }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Portfolio link */}
      <a
        href={member.portfolioUrl}
        onClick={(e) => e.stopPropagation()}
        className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold border border-stone-200 dark:border-white/15 text-stone-600 dark:text-white hover:text-white dark:hover:text-black transition-all duration-300 shrink-0 whitespace-nowrap"
        style={{}}
        onMouseEnter={e => { e.currentTarget.style.background = member.accentColor; e.currentTarget.style.borderColor = member.accentColor; e.currentTarget.style.color = 'white'; }}
        onMouseLeave={e => { e.currentTarget.style.background = ''; e.currentTarget.style.borderColor = ''; e.currentTarget.style.color = ''; }}
      >
        Portfolio <ExternalLink className="w-3 h-3" />
      </a>
    </motion.div>
  );
}

export default function Team() {
  const [showAllDevs, setShowAllDevs] = useState(false);

  // Lock body scroll whenever the modal is open
  useScrollLock(showAllDevs);

  return (
    <section className="w-full py-24 sm:py-28 bg-[#f0ede8] dark:bg-black px-4 sm:px-6 relative z-10 border-t border-stone-200 dark:border-white/5 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-200 dark:bg-white/5 border border-stone-300 dark:border-white/10 text-stone-500 dark:text-neutral-500 text-xs font-bold tracking-widest uppercase mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            The People
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 dark:text-white tracking-tight mb-4">Our Top Developers.</h2>
          <p className="text-stone-500 dark:text-neutral-400 text-base sm:text-lg max-w-2xl mx-auto">
            Meet the experts who build your tools. Each member brings deep specialisation and a passion for quality.
          </p>
        </motion.div>

        {/* Team cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7 mb-12">
          {teamMembers.map((member, index) => {
            const Icon = member.icon;
            return (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -6 }}
                className="group relative bg-[#faf8f5] dark:bg-neutral-900/40 border border-stone-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 flex flex-col items-center text-center overflow-hidden shadow-[0_2px_16px_rgba(28,26,23,0.07)] dark:shadow-none hover:shadow-[0_12px_40px_rgba(28,26,23,0.12)] dark:hover:shadow-none transition-all duration-300"
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at top, ${member.accentColor}0f, transparent 70%)` }}
                />

                <div className="w-20 h-20 sm:w-24 sm:h-24 mb-5 sm:mb-6 rounded-full bg-stone-100 dark:bg-black border-2 border-stone-200 dark:border-neutral-700 flex items-center justify-center relative overflow-hidden transition-colors duration-500 z-10">
                  <User className="w-9 h-9 sm:w-10 sm:h-10 text-stone-400 dark:text-neutral-500 group-hover:text-stone-700 dark:group-hover:text-white transition-colors duration-500" />
                  <div
                    className="absolute bottom-0 right-0 w-7 h-7 rounded-tl-xl flex items-center justify-center border-t border-l"
                    style={{ background: `${member.accentColor}22`, borderColor: `${member.accentColor}44` }}
                  >
                    <Icon className="w-3.5 h-3.5" style={{ color: member.accentColor }} />
                  </div>
                </div>

                <div className="relative z-10 w-full">
                  <h3 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-white mb-1 tracking-tight">{member.name}</h3>
                  <p className="text-stone-500 dark:text-white/60 font-medium mb-3 text-sm">{member.role}</p>
                  <p className="text-stone-400 dark:text-neutral-400 font-light text-sm leading-relaxed mb-5">
                    {member.desc}
                  </p>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-1.5 justify-center mb-5">
                    {member.skills.map(skill => (
                      <span
                        key={skill}
                        className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide border"
                        style={{ color: member.accentColor, background: `${member.accentColor}12`, borderColor: `${member.accentColor}30` }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <a
                    href={member.portfolioUrl}
                    className="w-full py-3 rounded-full border border-stone-200 dark:border-neutral-700 text-stone-700 dark:text-white text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 hover:text-white"
                    onMouseEnter={e => { e.currentTarget.style.background = member.accentColor; e.currentTarget.style.borderColor = member.accentColor; e.currentTarget.style.color = 'white'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = ''; e.currentTarget.style.borderColor = ''; e.currentTarget.style.color = ''; }}
                  >
                    View Portfolio <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View All Developers button */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-center"
        >
          <button
            onClick={() => setShowAllDevs(true)}
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-stone-900 dark:bg-white text-white dark:text-black text-sm font-bold tracking-wide hover:bg-stone-700 dark:hover:bg-neutral-200 hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_4px_20px_rgba(28,26,23,0.15)] dark:shadow-[0_4px_20px_rgba(255,255,255,0.15)]"
          >
            <Users className="w-4 h-4" />
            View All Developers
          </button>
        </motion.div>
      </div>

      {/* ── All Developers Modal — rendered via portal to escape stacking context ── */}
      {ReactDOM.createPortal(
        <AnimatePresence>
          {showAllDevs && (
            <>
              {/* Backdrop */}
              <motion.div
                key="devs-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-stone-900/50 dark:bg-black/70 backdrop-blur-md"
                style={{ zIndex: 9998 }}
                onClick={() => setShowAllDevs(false)}
              />

              {/* Modal */}
              <motion.div
                key="devs-modal"
                initial={{ opacity: 0, scale: 0.92, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 30 }}
                transition={{ type: 'spring', stiffness: 130, damping: 20 }}
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] max-w-2xl max-h-[88vh] overflow-y-auto bg-[#faf8f5] dark:bg-neutral-950/95 backdrop-blur-2xl border border-stone-200 dark:border-white/10 rounded-3xl p-5 sm:p-8 shadow-2xl"
                style={{ zIndex: 9999 }}
              >
                {/* Modal header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-stone-900 dark:text-white tracking-tighter">Meet the Team</h2>
                    <p className="text-stone-400 dark:text-neutral-500 text-sm mt-1">All {teamMembers.length} developers — click portfolio to see their work.</p>
                  </div>
                  <button
                    onClick={() => setShowAllDevs(false)}
                    className="w-9 h-9 rounded-full bg-stone-100 dark:bg-white/5 border border-stone-200 dark:border-white/10 flex items-center justify-center text-stone-400 hover:text-stone-900 dark:hover:text-white hover:bg-stone-200 dark:hover:bg-white/10 transition-all duration-200 shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Developer mini-cards */}
                <div className="flex flex-col gap-3">
                  {teamMembers.map((member, i) => (
                    <MiniDevCard key={member.id} member={member} index={i} />
                  ))}
                </div>

                {/* Footer note */}
                <p className="text-center text-stone-400 dark:text-neutral-600 text-xs mt-6 font-medium">
                  Interested in joining? <a href="mailto:hello@debuggers.dev" className="underline hover:text-stone-700 dark:hover:text-neutral-400 transition-colors">Reach out to us</a>
                </p>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}
