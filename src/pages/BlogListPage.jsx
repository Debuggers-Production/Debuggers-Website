import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Clock, Calendar, ArrowUpRight } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import Breadcrumbs from '../components/Breadcrumbs';
import SeoHead from '../components/SeoHead';
import { BLOG_CATEGORIES, blogArticles } from '../data/blogData';

export default function BlogListPage() {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return blogArticles.filter((article) => {
      const matchesCat =
        selectedCategory === 'All' ||
        article.category === selectedCategory ||
        article.tags.includes(selectedCategory);
      const matchesQuery =
        !q ||
        article.title.toLowerCase().includes(q) ||
        article.summary.toLowerCase().includes(q) ||
        article.category.toLowerCase().includes(q) ||
        article.keywords?.some((k) => k.toLowerCase().includes(q));
      return matchesCat && matchesQuery;
    });
  }, [query, selectedCategory]);

  return (
    <PageLayout maxWidth="max-w-6xl">
      <SeoHead
        title="Technical Blog | Debuggers Technologies"
        description="Original engineering guides on Python, FastAPI, PostgreSQL, Docker, Nginx, DevOps, Cloud Computing, Flutter, and scalable backend architectures."
        keywords={[
          ...BLOG_CATEGORIES,
          'FastAPI deployment',
          'PostgreSQL vs MongoDB',
          'Docker networking',
          'Redis caching Python',
          'Ubuntu VPS security',
          'Nginx reverse proxy',
        ]}
        path="/blog/"
      />

      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Blog' }]} />

      <header className="mb-10">
        <span className="inline-block px-3 py-1 rounded-full bg-stone-200 dark:bg-white/5 border border-stone-300 dark:border-white/10 text-stone-600 dark:text-neutral-400 text-xs font-bold tracking-widest uppercase mb-4">
          Engineering Publication
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
          Technical Blog
        </h1>
        <p className="text-lg text-stone-600 dark:text-neutral-400 max-w-2xl leading-relaxed">
          Practical architecture notes, deployment walkthroughs, and backend engineering guides written by the Debuggers Technologies team.
        </p>
      </header>

      {/* Search & Category Filters */}
      <div className="mb-10 space-y-4">
        <div className="relative max-w-md">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles (e.g., FastAPI, Docker, Redis)..."
            aria-label="Search blog articles"
            className="w-full pl-11 pr-4 py-3 rounded-full bg-white/50 dark:bg-white/[0.035] backdrop-blur-xl border border-white/80 dark:border-white/10 text-sm outline-none focus:border-[#5D72CC] shadow-[0_4px_16px_rgba(0,0,0,0.03),inset_0_1px_1px_rgba(255,255,255,0.8)] dark:shadow-none text-stone-900 dark:text-white placeholder:text-stone-400 dark:placeholder:text-neutral-400 transition-colors"
          />
          <Search className="w-4 h-4 text-stone-500 dark:text-neutral-300 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none z-10" />
        </div>

        <div className="flex flex-wrap gap-2">
          {['All', ...BLOG_CATEGORIES].map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold backdrop-blur-xl transition-all ${
                  active
                    ? 'bg-[#5D72CC] text-white shadow-[0_4px_12px_rgba(93,114,204,0.35)]'
                    : 'bg-white/50 dark:bg-white/[0.035] border border-white/80 dark:border-white/10 text-stone-600 dark:text-neutral-400 hover:text-stone-900 dark:hover:text-white hover:bg-white/70 dark:hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Article Grid */}
      {filtered.length === 0 ? (
        <div className="relative p-10 rounded-3xl bg-white/45 dark:bg-white/[0.035] backdrop-blur-2xl border border-white/75 dark:border-white/10 text-center overflow-hidden shadow-[0_8px_32px_rgba(15,23,42,0.05),inset_0_1px_1px_rgba(255,255,255,0.9)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.08)]">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/80 dark:via-white/20 to-transparent pointer-events-none" />
          <p className="text-stone-600 dark:text-neutral-400">
            No articles matched &ldquo;{query}&rdquo; in {selectedCategory}.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((article) => (
            <Link
              key={article.slug}
              to={`/blog/${article.slug}`}
              className="group relative p-6 sm:p-7 rounded-3xl bg-white/45 dark:bg-white/[0.035] hover:bg-white/65 dark:hover:bg-white/[0.07] backdrop-blur-2xl border border-white/75 dark:border-white/10 hover:border-[#5D72CC]/60 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-[0_8px_32px_rgba(15,23,42,0.05),inset_0_1px_1px_rgba(255,255,255,0.9)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.08)]"
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/80 dark:via-white/20 to-transparent pointer-events-none" />
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#5D72CC]/15 text-[#5D72CC] border border-[#5D72CC]/20">
                    {article.category}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-stone-500 dark:text-neutral-400">
                    <Clock className="w-3.5 h-3.5" />
                    {article.readingTime}
                  </span>
                </div>
                <h2 className="text-xl font-bold tracking-tight mb-2 group-hover:text-[#5D72CC] transition-colors">
                  {article.title}
                </h2>
                <p className="text-sm text-stone-600 dark:text-neutral-400 leading-relaxed mb-5">
                  {article.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-stone-200/60 dark:border-white/10 flex items-center justify-between text-xs text-stone-500 dark:text-neutral-400">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  Updated {article.updatedAt}
                </span>
                <span className="inline-flex items-center gap-1 font-bold text-stone-900 dark:text-white group-hover:text-[#5D72CC] transition-colors">
                  Read Article <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </PageLayout>
  );
}

