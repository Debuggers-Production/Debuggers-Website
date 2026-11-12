import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ExternalLink, Store } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import Breadcrumbs from '../components/Breadcrumbs';
import SeoHead from '../components/SeoHead';
import { caseStudies } from '../data/caseStudiesData';

export default function ProductsPage() {
  return (
    <PageLayout maxWidth="max-w-6xl">
      <SeoHead
        title="Products | Debuggers Technologies"
        description="Explore all software products built by Debuggers Technologies: MenuKit, Dauth, Dwise, and Subakarya."
        path="/products/"
      />

      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Products' }]} />

      <header className="mb-12">
        <span className="inline-block px-3 py-1 rounded-full bg-stone-200 dark:bg-white/5 border border-stone-300 dark:border-white/10 text-stone-600 dark:text-neutral-400 text-xs font-bold tracking-widest uppercase mb-4">
          Our Products
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
          Software Products by Debuggers Technologies
        </h1>
        <p className="text-lg text-stone-600 dark:text-neutral-400 max-w-2xl leading-relaxed">
          From live SaaS platforms used in production to upcoming tools in active development, here is everything we are building.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {caseStudies.map((product) => (
          <div
            key={product.slug}
            className="group relative p-6 sm:p-8 rounded-3xl bg-white/45 dark:bg-white/[0.035] hover:bg-white/65 dark:hover:bg-white/[0.07] backdrop-blur-2xl border border-white/75 dark:border-white/10 hover:border-[#5D72CC]/60 transition-all duration-300 flex flex-col justify-between gap-6 overflow-hidden shadow-[0_8px_32px_rgba(15,23,42,0.05),inset_0_1px_1px_rgba(255,255,255,0.9)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.08)]"
          >
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/80 dark:via-white/20 to-transparent pointer-events-none" />
            <div>
              <div className="flex items-center justify-between gap-4 mb-5">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center backdrop-blur-md shadow-inner"
                  style={{ background: `${product.accent}18`, border: `1px solid ${product.accent}35` }}
                >
                  {product.logo ? (
                    <img src={product.logo} alt={`${product.name} logo`} width="32" height="32" loading="lazy" decoding="async" className="w-8 h-8 object-contain" />
                  ) : (
                    <Store className="w-7 h-7" style={{ color: product.accent }} />
                  )}
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold border ${
                    product.status === 'Live Product'
                      ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/25'
                      : 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/25'
                  }`}
                >
                  {product.status === 'Live Product' ? 'Live' : 'Coming Soon'}
                </span>
              </div>

              <h2 className="text-2xl font-bold mb-1.5 group-hover:text-[#5D72CC] transition-colors">{product.name}</h2>
              <p className="text-sm font-semibold text-stone-700 dark:text-neutral-300 mb-3">
                {product.tagline}
              </p>
              <p className="text-sm text-stone-600 dark:text-neutral-400 leading-relaxed">
                {product.overview}
              </p>
            </div>

            <div className="pt-4 border-t border-stone-200/60 dark:border-white/10 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-2">
                {product.slug === 'menukit' ? (
                  <Link
                    to="/menukit/"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-white hover:opacity-90 shadow-sm transition-all"
                    style={{ background: product.accent }}
                  >
                    Open MenuKit <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                ) : product.liveUrl ? (
                  <a
                    href={product.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-white hover:opacity-90 shadow-sm transition-all"
                    style={{ background: product.accent }}
                  >
                    Visit Live <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : null}

                <Link
                  to={`/case-studies/${product.slug}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/80 dark:border-white/15 bg-white/40 dark:bg-white/5 backdrop-blur-md text-xs font-semibold text-stone-800 dark:text-neutral-200 hover:bg-white/80 dark:hover:bg-white/15 transition-all shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
                >
                  Case Study <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </PageLayout>
  );
}

