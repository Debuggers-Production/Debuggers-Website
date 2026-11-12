import React from 'react';
import PageLayout from '../components/PageLayout';
import Breadcrumbs from '../components/Breadcrumbs';
import SeoHead from '../components/SeoHead';

export default function TermsPage() {
  return (
    <PageLayout maxWidth="max-w-4xl">
      <SeoHead
        title="Terms and Conditions | Debuggers Technologies"
        description="Terms and Conditions governing the use of debuggerstechnologies.com, our technical articles, and software product information."
        path="/terms-and-conditions/"
      />

      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Terms & Conditions' }]} />

      <article className="space-y-8">
        <header>
          <h1 className="text-4xl font-extrabold tracking-tight mb-3">Terms and Conditions</h1>
          <p className="text-sm text-stone-500 dark:text-neutral-400">
            Last updated: May 2026 · Debuggers Technologies Pvt Limited
          </p>
        </header>

        <section className="space-y-3 text-stone-700 dark:text-neutral-300 leading-relaxed">
          <h2 className="text-xl font-bold text-stone-900 dark:text-white">1. Acceptance of Terms</h2>
          <p>
            By accessing or using <strong>debuggerstechnologies.com</strong>, you agree to comply with these Terms and Conditions and all applicable laws. If you do not agree with any part of these terms, please discontinue using the website.
          </p>
        </section>

        <section className="space-y-3 text-stone-700 dark:text-neutral-300 leading-relaxed">
          <h2 className="text-xl font-bold text-stone-900 dark:text-white">2. Intellectual Property</h2>
          <p>
            All brand assets, logos (including Debuggers Technologies, MenuKit, and Dauth), written articles, case studies, and interface designs published on this website are the intellectual property of Debuggers Technologies Pvt Limited unless otherwise noted. You may reference or quote brief excerpts from our technical blog with clear attribution and a link back to the original article.
          </p>
        </section>

        <section className="space-y-3 text-stone-700 dark:text-neutral-300 leading-relaxed">
          <h2 className="text-xl font-bold text-stone-900 dark:text-white">3. Service Scope &amp; Project Agreements</h2>
          <p>
            Information on our service pages, pricing tiers, and product descriptions is provided for general informational purposes. Custom software development engagements are governed by separate written proposals, statements of work, and service agreements executed between Debuggers Technologies Pvt Limited and the client.
          </p>
        </section>

        <section className="space-y-3 text-stone-700 dark:text-neutral-300 leading-relaxed">
          <h2 className="text-xl font-bold text-stone-900 dark:text-white">4. User Responsibilities</h2>
          <p>
            You agree not to misuse our contact forms, attempt unauthorized access to any connected infrastructure, scrape content in violation of our policies, or transmit malicious payloads through this website.
          </p>
        </section>

        <section className="space-y-3 text-stone-700 dark:text-neutral-300 leading-relaxed">
          <h2 className="text-xl font-bold text-stone-900 dark:text-white">5. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, Debuggers Technologies Pvt Limited shall not be liable for any indirect, incidental, or consequential damages arising from your use of this website or reliance on informational content published here.
          </p>
        </section>
      </article>
    </PageLayout>
  );
}

