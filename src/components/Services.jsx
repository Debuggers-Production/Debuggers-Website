import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Layers, BrainCircuit, CloudCog, ArrowUpRight, ShieldCheck, Smartphone, PenTool } from 'lucide-react';

const bentoItems = [
  {
    id: 1,
    title: 'Web Development',
    slug: 'web-development',
    desc: 'We build fast, secure, and beautiful websites that work perfectly on any device.',
    icon: Layers,
    colSpan: 'md:col-span-2',
    rowSpan: 'md:row-span-1',
    tag: 'Full-Stack',
    accentColor: 'from-blue-500/10 to-blue-600/5',
    borderHover: 'hover:border-blue-200 dark:hover:border-blue-500/20',
    iconColor: 'text-blue-600 dark:text-blue-400',
  },
  {
    id: 2,
    title: 'UI/UX Design',
    slug: 'ui-ux-design',
    desc: 'Creating easy-to-use and stunning designs that your customers will love.',
    icon: PenTool,
    colSpan: 'md:col-span-1',
    rowSpan: 'md:row-span-1',
    tag: 'Design',
    accentColor: 'from-fuchsia-500/10 to-pink-600/5',
    borderHover: 'hover:border-fuchsia-200 dark:hover:border-fuchsia-500/20',
    iconColor: 'text-fuchsia-600 dark:text-fuchsia-400',
  },
  {
    id: 3,
    title: 'Cloud & DevOps',
    slug: 'cloud-devops',
    desc: 'Keeping your apps running smoothly 24/7 with secure cloud servers and automated updates.',
    icon: CloudCog,
    colSpan: 'md:col-span-1',
    rowSpan: 'md:row-span-2',
    tag: 'Infrastructure',
    accentColor: 'from-sky-500/10 to-cyan-600/5',
    borderHover: 'hover:border-sky-200 dark:hover:border-sky-500/20',
    iconColor: 'text-sky-600 dark:text-sky-400',
  },
  {
    id: 4,
    title: 'Mobile & Desktop Apps',
    slug: 'mobile-apps',
    desc: 'Custom iOS, Android, and desktop applications to help you reach customers anywhere.',
    icon: Smartphone,
    colSpan: 'md:col-span-1',
    rowSpan: 'md:row-span-1',
    tag: 'Cross-Platform',
    accentColor: 'from-emerald-500/10 to-green-600/5',
    borderHover: 'hover:border-emerald-200 dark:hover:border-emerald-500/20',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
  },
  {
    id: 5,
    title: 'Cyber Security',
    slug: 'cyber-security',
    desc: 'Protecting your business data with the highest level of digital security.',
    icon: ShieldCheck,
    colSpan: 'md:col-span-1',
    rowSpan: 'md:row-span-1',
    tag: 'Security',
    accentColor: 'from-red-500/10 to-rose-600/5',
    borderHover: 'hover:border-red-200 dark:hover:border-red-500/20',
    iconColor: 'text-red-600 dark:text-red-400',
  },
  {
    id: 6,
    title: 'Artificial Intelligence',
    slug: 'artificial-intelligence',
    desc: 'Smart tools that learn and automate your daily business tasks to save you time.',
    icon: BrainCircuit,
    colSpan: 'md:col-span-2',
    rowSpan: 'md:row-span-1',
    tag: 'AI & ML',
    accentColor: 'from-violet-500/10 to-purple-600/5',
    borderHover: 'hover:border-violet-200 dark:hover:border-violet-500/20',
    iconColor: 'text-violet-600 dark:text-violet-400',
  },
];

export default function Services() {
  return (
    <section className="w-full bg-[#eaedf2] dark:bg-black py-20 sm:py-28 px-4 sm:px-6 relative z-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-300/60 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-600 dark:text-neutral-400 text-xs font-bold tracking-widest uppercase mb-4">
              What We Do
            </div>
            <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-5">Our IT Services.</h2>
            <p className="text-slate-600 dark:text-neutral-400 text-lg md:text-xl font-light leading-relaxed">
              We provide everything your business needs to succeed in the digital world. From design to security, we have you covered.
            </p>
          </motion.div>
          <Link
            to="/case-studies/"
            className="hidden md:flex items-center gap-2 px-6 py-3 border border-slate-300 dark:border-white/20 rounded-full text-slate-800 dark:text-white text-sm font-semibold hover:bg-slate-900 dark:hover:bg-white hover:text-white dark:hover:text-black hover:border-slate-900 dark:hover:border-white transition-all duration-300"
          >
            View Case Studies <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 md:auto-rows-[260px]">
          {bentoItems.map((service, index) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.id}
                to={`/services/${service.slug}`}
                className={`block ${service.colSpan} ${service.rowSpan} md:h-auto h-[220px] sm:h-[250px]`}
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 0.98 }}
                  className={`relative group p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-white/45 dark:bg-white/[0.035] backdrop-blur-xl border border-white/70 dark:border-white/10 ${service.borderHover} dark:hover:border-white/25 overflow-hidden flex flex-col justify-between transition-all duration-300 cursor-pointer h-full shadow-[0_8px_30px_rgba(28,26,23,0.04),inset_0_1px_1px_rgba(255,255,255,0.9)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.08)] hover:bg-white/65 dark:hover:bg-white/[0.06] hover:shadow-[0_16px_40px_rgba(93,114,204,0.12),inset_0_1px_1px_rgba(255,255,255,1)] dark:hover:shadow-[0_16px_40px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.15)]`}
                >
                  {/* Accent gradient hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.accentColor} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />

                  {/* Top row: icon + tag on left, navigation button on right */}
                  <div className="relative z-10 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-13 h-13 rounded-2xl bg-white/60 dark:bg-white/5 border border-white/80 dark:border-white/15 backdrop-blur-md flex items-center justify-center group-hover:border-stone-300 dark:group-hover:border-white/35 transition-colors duration-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] dark:shadow-none shrink-0" style={{ width: '52px', height: '52px' }}>
                        <Icon className={`w-6 h-6 ${service.iconColor}`} />
                      </div>
                      <span className="px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase text-stone-600 dark:text-neutral-400 bg-white/50 dark:bg-white/5 border border-white/70 dark:border-white/10 backdrop-blur-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] dark:shadow-none truncate">
                        {service.tag}
                      </span>
                    </div>

                    <div className="w-10 h-10 rounded-full bg-stone-900 dark:bg-white text-white dark:text-black flex items-center justify-center opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-lg shrink-0">
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="relative z-10 mt-auto">
                    <h3 className="text-2xl md:text-3xl font-bold text-stone-900 dark:text-white mb-2 tracking-tight">
                      {service.title}
                    </h3>
                    <p className="text-stone-500 dark:text-neutral-400 font-light leading-relaxed max-w-md text-sm md:text-base">
                      {service.desc}
                    </p>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
