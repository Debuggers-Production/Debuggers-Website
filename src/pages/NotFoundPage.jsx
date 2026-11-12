import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import SeoHead from '../components/SeoHead';

export default function NotFoundPage() {
  return (
    <PageLayout>
      <SeoHead
        title="404 — Page Not Found | Debuggers Technologies"
        description="The page you are looking for could not be found."
        path="/404"
        noIndex
      />
      <div className="py-20 text-center space-y-5">
        <p className="text-sm font-bold tracking-widest uppercase text-[#5D72CC]">Error 404</p>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Page Not Found</h1>
        <p className="text-stone-600 dark:text-neutral-400 max-w-md mx-auto">
          The URL you requested does not exist or may have been moved. Explore our main pages below.
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-stone-900 dark:bg-white text-white dark:text-black text-sm font-bold"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <Link
            to="/blog/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-stone-300 dark:border-white/20 text-sm font-semibold"
          >
            Technical Blog
          </Link>
          <Link
            to="/case-studies/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-stone-300 dark:border-white/20 text-sm font-semibold"
          >
            Case Studies
          </Link>
        </div>
      </div>
    </PageLayout>
  );
}

