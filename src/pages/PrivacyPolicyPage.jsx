import React from 'react';
import PageLayout from '../components/PageLayout';
import Breadcrumbs from '../components/Breadcrumbs';
import SeoHead from '../components/SeoHead';

export default function PrivacyPolicyPage() {
  return (
    <PageLayout maxWidth="max-w-4xl">
      <SeoHead
        title="Privacy Policy | Debuggers Technologies"
        description="Privacy Policy for Debuggers Technologies (debuggerstechnologies.com), detailing contact form data handling, local storage, and Google AdSense on MenuKit."
        path="/privacy-policy/"
      />

      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Privacy Policy' }]} />

      <article className="space-y-8">
        <header>
          <h1 className="text-4xl font-extrabold tracking-tight mb-3">Privacy Policy</h1>
          <p className="text-sm text-stone-500 dark:text-neutral-400">
            Last updated: May 2026 · Debuggers Technologies Pvt Limited
          </p>
        </header>

        <section className="space-y-3 text-stone-700 dark:text-neutral-300 leading-relaxed">
          <h2 className="text-xl font-bold text-stone-900 dark:text-white">1. Information We Collect</h2>
          <p>
            When you voluntarily submit an inquiry through our contact form or project modal on{' '}
            <strong>debuggerstechnologies.com</strong>, we collect the details you provide—such as your name, email address, phone number, selected service, preferred contact channel, and project description. Contact form submissions are transmitted via Formspree solely to respond to your inquiry.
          </p>
        </section>

        <section className="space-y-3 text-stone-700 dark:text-neutral-300 leading-relaxed">
          <h2 className="text-xl font-bold text-stone-900 dark:text-white">2. Browser Storage &amp; Functional Preferences</h2>
          <p>
            We use browser <code>localStorage</code> to remember your light/dark theme preference (<code>theme</code>) and <code>sessionStorage</code> to avoid replaying the introductory animation on repeated page views within the same browser session. These values remain on your device and are not used for cross-site behavioral profiling.
          </p>
        </section>

        <section className="space-y-3 text-stone-700 dark:text-neutral-300 leading-relaxed">
          <h2 className="text-xl font-bold text-stone-900 dark:text-white">3. Google AdSense &amp; Third-Party Advertising</h2>
          <p>
            Advertisements provided by Google AdSense are configured to appear exclusively on the public MenuKit landing page (<code>/menukit/</code>) once enabled and approved. Advertisements are not placed on our homepage, blog, case studies, about, contact, legal pages, or authenticated dashboards.
          </p>
          <p>
            When Google AdSense is active on <code>/menukit/</code>, third-party vendors, including Google, may use cookies or similar technologies to serve ads based on a user&apos;s prior visits to this website or other websites. Google&apos;s use of advertising cookies enables it and its partners to serve ads based on your visit to our site and/or other sites on the Internet.
          </p>
        </section>

        <section className="space-y-3 text-stone-700 dark:text-neutral-300 leading-relaxed">
          <h2 className="text-xl font-bold text-stone-900 dark:text-white">4. Your Privacy Choices</h2>
          <p>
            You may opt out of personalized advertising by visiting{' '}
            <a
              href="https://www.google.com/settings/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#5D72CC] font-semibold hover:underline"
            >
              Google Ads Settings
            </a>
            . Alternatively, you may opt out of third-party advertising cookies by visiting{' '}
            <a
              href="https://www.aboutads.info/choices/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#5D72CC] font-semibold hover:underline"
            >
              www.aboutads.info
            </a>
            , or by managing cookies directly in your browser settings. Disabling cookies may affect certain third-party embedded content.
          </p>
        </section>

        <section className="space-y-3 text-stone-700 dark:text-neutral-300 leading-relaxed">
          <h2 className="text-xl font-bold text-stone-900 dark:text-white">5. Contact for Privacy Questions</h2>
          <p>
            If you have any questions about this Privacy Policy or wish to request deletion of contact details you submitted, please email us at{' '}
            <a href="mailto:debuggerstechs@gmail.com" className="text-[#5D72CC] font-semibold hover:underline">
              debuggerstechs@gmail.com
            </a>
            .
          </p>
        </section>
      </article>
    </PageLayout>
  );
}

