import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ExternalLink, ArrowLeft, CheckCircle2, Store } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import Breadcrumbs from '../components/Breadcrumbs';
import SeoHead from '../components/SeoHead';
import { caseStudies } from '../data/caseStudiesData';

export default function CaseStudyDetailPage() {
  const { slug } = useParams();
  const cs = caseStudies.find((item) => item.slug === slug);

  if (!cs) {
    return (
      <PageLayout>
        <SeoHead
          title="Case Study Not Found | Debuggers Technologies"
          description="The requested case study could not be found."
          path={`/case-studies/${slug || ''}`}
          noIndex
        />
        <div className="py-16 text-center space-y-4">
          <h1 className="text-3xl font-extrabold">Case Study Not Found</h1>
          <Link
            to="/case-studies/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#5D72CC] text-white text-sm font-bold"
          >
            <ArrowLeft className="w-4 h-4" /> All Case Studies
          </Link>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout maxWidth="max-w-4xl" ambientTheme={cs.slug} accentColor={cs.accent}>
      <SeoHead
        title={`${cs.name} Case Study | Debuggers Technologies`}
        description={cs.overview}
        path={`/case-studies/${cs.slug}`}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: cs.name,
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'Web',
          description: cs.overview,
          creator: {
            '@type': 'Organization',
            name: 'Debuggers Technologies Pvt Limited',
          },
        }}
      />

      <Breadcrumbs
        items={[
          { label: 'Home', to: '/' },
          { label: 'Case Studies', to: '/case-studies/' },
          { label: cs.name },
        ]}
      />

      <header className="mb-10 pb-8 border-b border-stone-200 dark:border-white/10">
        <div className="flex flex-wrap items-center gap-4 mb-5">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{ background: `${cs.accent}18`, border: `1px solid ${cs.accent}35` }}
          >
            {cs.logo ? (
              <img src={cs.logo} alt={`${cs.name} logo`} width="40" height="40" decoding="async" className="w-10 h-10 object-contain" />
            ) : (
              <Store className="w-8 h-8" style={{ color: cs.accent }} />
            )}
          </div>
          <div>
            <span
              className={`inline-block px-3 py-0.5 rounded-full text-xs font-bold mb-1 ${
                cs.status === 'Live Product'
                  ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                  : 'bg-amber-500/15 text-amber-600 dark:text-amber-400'
              }`}
            >
              {cs.status}
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">{cs.name}</h1>
          </div>
        </div>
        <p className="text-lg text-stone-600 dark:text-neutral-300 font-medium mb-4">{cs.tagline}</p>
        {cs.liveUrl && (
          <a
            href={cs.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-bold hover:opacity-90 transition-opacity"
            style={{ background: cs.accent }}
          >
            Visit Live Product <ExternalLink className="w-4 h-4" />
          </a>
        )}
      </header>

      <div className="space-y-8 text-stone-700 dark:text-neutral-300 leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-stone-900 dark:text-white mb-2">Project Overview</h2>
          <p>{cs.overview}</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-stone-900 dark:text-white mb-2">Business Problem</h2>
          <p>{cs.businessProblem}</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-stone-900 dark:text-white mb-2">Solution Architecture</h2>
          <p>{cs.solutionArchitecture}</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-stone-900 dark:text-white mb-3">Technology Stack</h2>
          <div className="flex flex-wrap gap-2">
            {cs.techStack.map((t) => (
              <span
                key={t}
                className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-white/50 dark:bg-white/[0.035] backdrop-blur-md border border-white/75 dark:border-white/10 shadow-sm"
              >
                {t}
              </span>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-stone-900 dark:text-white mb-3">Key Features</h2>
          <ul className="space-y-2.5">
            {cs.features.map((feat) => (
              <li key={feat} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#5D72CC] mt-1 shrink-0" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-stone-900 dark:text-white mb-2">Technical Implementation</h2>
          <p>{cs.implementationDetails}</p>
        </section>

        <section className="relative p-6 sm:p-7 rounded-3xl bg-white/45 dark:bg-white/[0.035] backdrop-blur-2xl border border-white/75 dark:border-white/10 overflow-hidden shadow-[0_8px_32px_rgba(15,23,42,0.05),inset_0_1px_1px_rgba(255,255,255,0.9)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.08)]">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/80 dark:via-white/20 to-transparent pointer-events-none" />
          <h2 className="text-lg font-bold text-stone-900 dark:text-white mb-1">Current Status</h2>
          <p className="text-sm">{cs.resultsNote}</p>
        </section>
      </div>
    </PageLayout>
  );
}

