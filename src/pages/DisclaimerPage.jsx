import React from 'react';
import PageLayout from '../components/PageLayout';
import Breadcrumbs from '../components/Breadcrumbs';
import SeoHead from '../components/SeoHead';

export default function DisclaimerPage() {
  return (
    <PageLayout maxWidth="max-w-4xl">
      <SeoHead
        title="Disclaimer | Debuggers Technologies"
        description="Educational and informational disclaimer for technical tutorials, code examples, and product documentation published on debuggerstechnologies.com."
        path="/disclaimer/"
      />

      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Disclaimer' }]} />

      <article className="space-y-8">
        <header>
          <h1 className="text-4xl font-extrabold tracking-tight mb-3">Disclaimer</h1>
          <p className="text-sm text-stone-500 dark:text-neutral-400">
            Last updated: May 2026 · Debuggers Technologies Pvt Limited
          </p>
        </header>

        <section className="space-y-3 text-stone-700 dark:text-neutral-300 leading-relaxed">
          <h2 className="text-xl font-bold text-stone-900 dark:text-white">1. Educational &amp; Informational Content</h2>
          <p>
            All articles, architecture notes, and configuration examples published in the Debuggers Technologies Technical Blog are provided strictly for educational and informational purposes. While we strive to keep technical guidance accurate and up to date, software ecosystems evolve rapidly and configurations may require adaptation for your specific environment.
          </p>
        </section>

        <section className="space-y-3 text-stone-700 dark:text-neutral-300 leading-relaxed">
          <h2 className="text-xl font-bold text-stone-900 dark:text-white">2. Code &amp; Configuration Examples</h2>
          <p>
            Code snippets in our blog clearly distinguish between tested configuration patterns and illustrative examples. Before applying any command, firewall rule, Nginx directive, or authentication snippet to a production server, review it thoroughly and test it in a staging environment.
          </p>
        </section>

        <section className="space-y-3 text-stone-700 dark:text-neutral-300 leading-relaxed">
          <h2 className="text-xl font-bold text-stone-900 dark:text-white">3. External Links</h2>
          <p>
            Our website may include links to external documentation, live product subdomains, or third-party resources. Debuggers Technologies does not control and is not responsible for the content or availability of external websites.
          </p>
        </section>
      </article>
    </PageLayout>
  );
}

