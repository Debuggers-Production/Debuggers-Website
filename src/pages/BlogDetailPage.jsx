import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, User, Share2, Copy, Check, ArrowLeft } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import Breadcrumbs from '../components/Breadcrumbs';
import SeoHead from '../components/SeoHead';
import { blogArticles } from '../data/blogData';

export default function BlogDetailPage() {
  const { slug } = useParams();
  const article = blogArticles.find((a) => a.slug === slug);
  const [copiedKey, setCopiedKey] = useState(null);
  const [sharedCopied, setSharedCopied] = useState(false);

  if (!article) {
    return (
      <PageLayout>
        <SeoHead
          title="Article Not Found | Debuggers Technologies"
          description="The requested technical article could not be found."
          path={`/blog/${slug || ''}`}
          noIndex
        />
        <div className="py-16 text-center space-y-4">
          <h1 className="text-3xl font-extrabold">Article Not Found</h1>
          <p className="text-stone-600 dark:text-neutral-400">
            The article you requested does not exist or may have moved.
          </p>
          <Link
            to="/blog/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#5D72CC] text-white text-sm font-bold"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Technical Blog
          </Link>
        </div>
      </PageLayout>
    );
  }

  const related = blogArticles
    .filter(
      (a) =>
        a.slug !== article.slug &&
        (a.category === article.category || a.tags.some((t) => article.tags.includes(t)))
    )
    .slice(0, 3);

  const canonicalUrl = `https://debuggerstechnologies.com/blog/${article.slug}`;

  const copyText = async (text, key) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 1800);
    } catch {
      // Clipboard unavailable
    }
  };

  const copyShareUrl = async () => {
    try {
      await navigator.clipboard.writeText(canonicalUrl);
      setSharedCopied(true);
      setTimeout(() => setSharedCopied(false), 1800);
    } catch {
      // Clipboard unavailable
    }
  };

  return (
    <PageLayout maxWidth="max-w-6xl">
      <SeoHead
        title={`${article.title} | Debuggers Technologies`}
        description={article.summary}
        keywords={article.keywords}
        path={`/blog/${article.slug}`}
        type="article"
        schema={[
          {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: article.title,
            description: article.summary,
            articleSection: article.category,
            keywords: article.keywords?.join(', '),
            datePublished: article.publishedAt,
            dateModified: article.updatedAt,
            author: {
              '@type': 'Organization',
              name: article.author.name,
            },
            publisher: {
              '@type': 'Organization',
              name: 'Debuggers Technologies Pvt Limited',
              logo: {
                '@type': 'ImageObject',
                url: 'https://debuggerstechnologies.com/logo.png',
              },
            },
            mainEntityOfPage: canonicalUrl,
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://debuggerstechnologies.com/' },
              { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://debuggerstechnologies.com/blog/' },
              { '@type': 'ListItem', position: 3, name: article.title, item: canonicalUrl },
            ],
          },
        ]}
      />

      <Breadcrumbs
        items={[
          { label: 'Home', to: '/' },
          { label: 'Blog', to: '/blog/' },
          { label: article.title },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main Article */}
        <article className="lg:col-span-8">
          <header className="mb-8 pb-8 border-b border-stone-200 dark:border-white/10">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#5D72CC]/15 text-[#5D72CC] mb-4">
              {article.category}
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight mb-4">
              {article.title}
            </h1>
            <p className="text-base sm:text-lg text-stone-600 dark:text-neutral-400 leading-relaxed mb-6">
              {article.summary}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500 dark:text-neutral-400">
              <span className="inline-flex items-center gap-1.5 font-semibold text-stone-800 dark:text-neutral-200">
                <User className="w-3.5 h-3.5 text-[#5D72CC]" />
                {article.author.name}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                Published {article.publishedAt} · Updated {article.updatedAt}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {article.readingTime}
              </span>
            </div>
          </header>

          <div className="space-y-10">
            {article.sections.map((sec) => (
              <section key={sec.id} id={sec.id} className="scroll-mt-28 space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">{sec.heading}</h2>
                {sec.paragraphs.map((p, i) => (
                  <p key={i} className="text-stone-700 dark:text-neutral-300 leading-relaxed">
                    {p}
                  </p>
                ))}
                {sec.bullets && sec.bullets.length > 0 && (
                  <ul className="list-disc pl-6 space-y-2 text-stone-700 dark:text-neutral-300 leading-relaxed">
                    {sec.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                )}
                {sec.code && (
                  <div className="rounded-2xl overflow-hidden border border-stone-300 dark:border-white/15 bg-stone-950 text-stone-100">
                    <div className="flex items-center justify-between px-4 py-2.5 bg-stone-900 border-b border-white/10 text-xs text-stone-400">
                      <span>{sec.codeLabel || 'Code Example'}</span>
                      <button
                        type="button"
                        onClick={() => copyText(sec.code, sec.id)}
                        className="inline-flex items-center gap-1 hover:text-white transition-colors"
                      >
                        {copiedKey === sec.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        {copiedKey === sec.id ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                    <pre className="p-4 overflow-x-auto text-xs sm:text-sm leading-relaxed">
                      <code>{sec.code}</code>
                    </pre>
                  </div>
                )}
              </section>
            ))}
          </div>

          {article.keywords && article.keywords.length > 0 && (
            <div className="mt-10 pt-6 border-t border-stone-200 dark:border-white/10">
              <p className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-neutral-400 mb-3">
                Related Topics & Keywords
              </p>
              <div className="flex flex-wrap gap-2">
                {article.keywords.map((kw) => (
                  <span
                    key={kw}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-stone-200/70 dark:bg-white/5 text-stone-700 dark:text-neutral-300 border border-stone-300/70 dark:border-white/10"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Share & Author Box */}
          <div className="mt-8 pt-8 border-t border-stone-200 dark:border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold">{article.author.name}</p>
              <p className="text-xs text-stone-500 dark:text-neutral-400">{article.author.role}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-stone-500 dark:text-neutral-400 inline-flex items-center gap-1">
                <Share2 className="w-3.5 h-3.5" /> Share:
              </span>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(canonicalUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-full text-xs font-semibold border border-stone-300 dark:border-white/15 hover:bg-stone-200 dark:hover:bg-white/10"
              >
                LinkedIn
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(canonicalUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-full text-xs font-semibold border border-stone-300 dark:border-white/15 hover:bg-stone-200 dark:hover:bg-white/10"
              >
                X
              </a>
              <button
                type="button"
                onClick={copyShareUrl}
                className="px-3 py-1.5 rounded-full text-xs font-semibold border border-stone-300 dark:border-white/15 hover:bg-stone-200 dark:hover:bg-white/10"
              >
                {sharedCopied ? 'Link Copied' : 'Copy Link'}
              </button>
            </div>
          </div>
        </article>

        {/* Sidebar: Table of Contents + Related */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="lg:sticky lg:top-28 space-y-6">
            <div className="relative p-6 rounded-3xl bg-white/45 dark:bg-white/[0.035] backdrop-blur-2xl border border-white/75 dark:border-white/10 overflow-hidden shadow-[0_8px_32px_rgba(15,23,42,0.05),inset_0_1px_1px_rgba(255,255,255,0.9)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.08)]">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/80 dark:via-white/20 to-transparent pointer-events-none" />
              <h2 className="text-xs font-bold uppercase tracking-widest text-stone-500 dark:text-neutral-400 mb-3">
                Table of Contents
              </h2>
              <ul className="space-y-2 text-sm">
                {article.sections.map((sec) => (
                  <li key={sec.id}>
                    <a
                      href={`#${sec.id}`}
                      className="text-stone-600 dark:text-neutral-400 hover:text-[#5D72CC] transition-colors block"
                    >
                      {sec.heading}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {related.length > 0 && (
              <div className="relative p-6 rounded-3xl bg-white/45 dark:bg-white/[0.035] backdrop-blur-2xl border border-white/75 dark:border-white/10 overflow-hidden shadow-[0_8px_32px_rgba(15,23,42,0.05),inset_0_1px_1px_rgba(255,255,255,0.9)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.08)]">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/80 dark:via-white/20 to-transparent pointer-events-none" />
                <h2 className="text-xs font-bold uppercase tracking-widest text-stone-500 dark:text-neutral-400 mb-4">
                  Related Articles
                </h2>
                <div className="space-y-4">
                  {related.map((item) => (
                    <Link
                      key={item.slug}
                      to={`/blog/${item.slug}`}
                      className="block group"
                    >
                      <p className="text-xs text-[#5D72CC] font-semibold mb-0.5">{item.category}</p>
                      <p className="text-sm font-bold group-hover:text-[#5D72CC] transition-colors leading-snug">
                        {item.title}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </aside>
      </div>
    </PageLayout>
  );
}

