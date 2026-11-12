import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Code2, Server, Smartphone, Palette, Cloud, Cpu } from 'lucide-react';

const EXPERTISE = [
  {
    title: 'Web Application Development',
    desc: 'Fast, responsive single-page and server-rendered web applications built with React, Next.js, and modern TypeScript.',
    icon: Code2,
  },
  {
    title: 'Mobile & Desktop Applications',
    desc: 'Cross-platform iOS, Android, and desktop apps engineered with Flutter and React Native for consistent performance.',
    icon: Smartphone,
  },
  {
    title: 'Backend & API Engineering',
    desc: 'Structured REST and real-time APIs built with Python, FastAPI, PostgreSQL, and Redis for reliable business logic.',
    icon: Server,
  },
  {
    title: 'UI/UX Product Design',
    desc: 'Clear, accessible interfaces and component systems designed around real customer workflows before code is written.',
    icon: Palette,
  },
  {
    title: 'Cloud Infrastructure & DevOps',
    desc: 'Containerized deployments with Docker, Nginx reverse proxies, automated CI/CD pipelines, and hardened Linux servers.',
    icon: Cloud,
  },
  {
    title: 'AI & Workflow Automation',
    desc: 'Practical LLM integrations, document parsing, and task automation grounded in your actual application data.',
    icon: Cpu,
  },
];

export default function CompanyOverview() {
  return (
    <section className="w-full py-20 sm:py-28 bg-[#eaedf2] dark:bg-neutral-950 border-t border-slate-300/70 dark:border-white/10 transition-colors duration-300 relative overflow-hidden">
      {/* Ambient background glow for glass refraction */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="absolute right-0 top-1/3 w-[550px] h-[550px] rounded-full blur-[150px] opacity-15 dark:opacity-10 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, #5D72CC 0%, #8b5cf6 50%, transparent 70%)',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 mb-16">
          <div className="lg:col-span-5">
            <span className="inline-block px-3 py-1 rounded-full bg-slate-300/60 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-700 dark:text-neutral-400 text-xs font-bold tracking-widest uppercase mb-4">
              Who We Are
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-5">
              Practical Software Engineering &amp; Product Craft.
            </h2>
            <p className="text-slate-600 dark:text-neutral-400 text-base sm:text-lg leading-relaxed mb-6">
              Debuggers Technologies Pvt Limited is a product-based software engineering company based in Madurai, Tamil Nadu, India. We build custom digital platforms for growing businesses and develop our own SaaS products—including MenuKit and Dauth.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/about/"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-black text-sm font-bold hover:opacity-90 transition-opacity"
              >
                About Our Company <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                to="/case-studies/"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-slate-300 dark:border-white/20 text-slate-800 dark:text-white text-sm font-semibold hover:bg-slate-300/50 dark:hover:bg-white/10 transition-colors"
              >
                Explore Case Studies
              </Link>
              <Link
                to="/blog/"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-slate-300 dark:border-white/20 text-slate-800 dark:text-white text-sm font-semibold hover:bg-slate-300/50 dark:hover:bg-white/10 transition-colors"
              >
                Read Technical Blog
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {EXPERTISE.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="group relative p-6 md:p-7 rounded-3xl bg-white/45 dark:bg-white/[0.035] hover:bg-white/65 dark:hover:bg-white/[0.08] backdrop-blur-2xl border border-white/75 dark:border-white/10 hover:border-white/95 dark:hover:border-white/25 flex flex-col gap-3.5 shadow-[0_8px_30px_rgba(15,23,42,0.05),inset_0_1px_1px_rgba(255,255,255,0.9)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.08)] transition-all duration-300 overflow-hidden"
                >
                  {/* Top specular sheen */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/80 dark:via-white/20 to-transparent pointer-events-none" />

                  <div className="w-11 h-11 rounded-2xl bg-white/65 dark:bg-white/[0.06] backdrop-blur-md border border-white/80 dark:border-white/15 flex items-center justify-center text-[#5D72CC] shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] dark:shadow-none group-hover:scale-105 transition-transform duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-neutral-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

