import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs sm:text-sm text-stone-500 dark:text-neutral-400">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={item.label} className="inline-flex items-center gap-1.5">
              {idx > 0 && <ChevronRight className="w-3.5 h-3.5 opacity-60" aria-hidden="true" />}
              {isLast || !item.to ? (
                <span className="font-semibold text-stone-900 dark:text-white" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.to}
                  className="hover:text-stone-900 dark:hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

