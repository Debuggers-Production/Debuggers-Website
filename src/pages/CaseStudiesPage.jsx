import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Store } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import Breadcrumbs from '../components/Breadcrumbs';
import SeoHead from '../components/SeoHead';
import { caseStudies } from '../data/caseStudiesData';

export default function CaseStudiesPage() {
  return (
    <PageLayout maxWidth="max-w-6xl">
      <SeoHead
        title="Case Studies & Products | Debuggers Technologies"
        description="Explore real software products and technical case studies engineered by Debuggers Technologies: MenuKit, Dauth, Dwise, and Subakarya."
        path="/case-studies/"
      />

      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Case Studies' }]} />

      <header className="mb-12">
        <span className="inline-block px-3 py-1 rounded-full bg-stone-200 dark:bg-white/5 border border-stone-300 dark:border-white/10 text-stone-600 dark:text-neutral-400 text-xs font-bold tracking-widest uppercase mb-4">
          Product Engineering
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
          Project Case Studies
        </h1>
        <p className="text-lg text-stone-600 dark:text-neutral-400 max-w-2xl leading-relaxed">
          An inside look at the architecture, problem statements, and implementation details behind the software platforms built by Debuggers Technologies.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {caseStudies.map((cs) => (
          <Link
            key={cs.slug}
            to={`/case-studies/${cs.slug}`}
            className="group relative p-6 sm:p-8 rounded-3xl bg-white/45 dark:bg-white/[0.035] hover:bg-white/65 dark:hover:bg-white/[0.07] backdrop-blur-2xl border border-white/75 dark:border-white/10 hover:border-[#5D72CC]/60 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-[0_8px_32px_rgba(15,23,42,0.05),inset_0_1px_1px_rgba(255,255,255,0.9)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.08)]"
          >
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/80 dark:via-white/20 to-transparent pointer-events-none" />
            <div>
              <div className="flex items-center justify-between gap-4 mb-5">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center backdrop-blur-md shadow-inner"
                  style={{ background: `${cs.accent}18`, border: `1px solid ${cs.accent}35` }}
                >
                  {cs.logo ? (
                    <img src={cs.logo} alt={`${cs.name} logo`} width="32" height="32" loading="lazy" decoding="async" className="w-8 h-8 object-contain" />
                  ) : (
                    <Store className="w-7 h-7" style={{ color: cs.accent }} />
                  )}
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold border ${
                    cs.status === 'Live Product'
                      ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/25'
                      : 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/25'
                  }`}
                >
                  {cs.status}
                </span>
              </div>

              <h2 className="text-2xl font-bold mb-2 group-hover:text-[#5D72CC] transition-colors">
                {cs.name}
              </h2>
              <p className="text-sm font-semibold text-stone-700 dark:text-neutral-300 mb-3">
                {cs.tagline}
              </p>
              <p className="text-sm text-stone-600 dark:text-neutral-400 leading-relaxed mb-6">
                {cs.overview}
              </p>
            </div>

            <div className="pt-4 border-t border-stone-200/60 dark:border-white/10 flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5">
                {cs.techStack.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-white/60 dark:bg-white/[0.05] border border-white/60 dark:border-white/10 text-stone-700 dark:text-neutral-300 backdrop-blur-md"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-[#5D72CC] shrink-0 group-hover:translate-x-0.5 transition-transform">
                Read Case Study <ArrowUpRight className="w-4 h-4" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </PageLayout>
  );
}

