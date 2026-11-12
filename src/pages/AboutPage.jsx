import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Layers, ShieldCheck, Cpu, CloudCog } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import Breadcrumbs from '../components/Breadcrumbs';
import SeoHead from '../components/SeoHead';

const PILLARS = [
  {
    icon: Layers,
    title: 'Full-Stack Product Delivery',
    desc: 'From UI/UX wireframes to production React frontends, Flutter mobile apps, and FastAPI backends, we own the complete engineering lifecycle.',
  },
  {
    icon: CloudCog,
    title: 'Maintainable Infrastructure',
    desc: 'We deploy containerized workloads using Docker, PostgreSQL, Redis, and Nginx so systems stay predictable, observable, and cost-effective.',
  },
  {
    icon: ShieldCheck,
    title: 'Security by Design',
    desc: 'We apply least-privilege firewalling, hashed credentials, short-lived signed tokens, and strict input validation from day one.',
  },
  {
    icon: Cpu,
    title: 'In-House SaaS Innovation',
    desc: 'Alongside client engineering, we build and operate our own software products—including MenuKit, Dauth, Dwise, and Subakarya.',
  },
];

export default function AboutPage() {
  return (
    <PageLayout>
      <SeoHead
        title="About Us | Debuggers Technologies"
        description="Learn about Debuggers Technologies Pvt Limited—our software engineering expertise, mission, SaaS products, and practical development approach."
        path="/about/"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Debuggers Technologies Pvt Limited',
          url: 'https://debuggerstechnologies.com/',
          logo: 'https://debuggerstechnologies.com/logo.png',
          email: 'debuggerstechs@gmail.com',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Madurai',
            addressRegion: 'Tamil Nadu',
            addressCountry: 'IN',
          },
        }}
      />

      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'About Us' }]} />

      <header className="mb-12">
        <span className="inline-block px-3 py-1 rounded-full bg-stone-200 dark:bg-white/5 border border-stone-300 dark:border-white/10 text-stone-600 dark:text-neutral-400 text-xs font-bold tracking-widest uppercase mb-4">
          About Debuggers Technologies
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-5">
          Engineering Reliable Software &amp; Practical SaaS Products.
        </h1>
        <p className="text-lg text-stone-600 dark:text-neutral-400 leading-relaxed max-w-3xl">
          Debuggers Technologies Pvt Limited is a product-based software engineering company headquartered in Madurai, Tamil Nadu, India. We build in-house SaaS platforms and partner with startups and growing businesses to design, build, and operate web platforms, mobile applications, backend APIs, and cloud infrastructure.
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-14">
        {PILLARS.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="p-6 sm:p-8 rounded-2xl bg-[#faf8f5] dark:bg-white/[0.03] border border-stone-200 dark:border-white/10"
            >
              <div className="w-11 h-11 rounded-xl bg-stone-100 dark:bg-white/5 border border-stone-200 dark:border-white/10 flex items-center justify-center text-[#5D72CC] mb-4">
                <Icon className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold mb-2">{item.title}</h2>
              <p className="text-sm sm:text-base text-stone-600 dark:text-neutral-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          );
        })}
      </section>

      <section className="p-8 rounded-3xl bg-[#faf8f5] dark:bg-white/[0.03] border border-stone-200 dark:border-white/10 mb-12">
        <h2 className="text-2xl font-bold mb-4">Our Mission &amp; Engineering Philosophy</h2>
        <div className="space-y-4 text-stone-600 dark:text-neutral-400 leading-relaxed">
          <p>
            Software should solve real operational problems without introducing unnecessary complexity. Instead of over-engineering early products or shipping fragile prototypes, we focus on clean architecture, measurable performance, and straightforward maintainability.
          </p>
          <p>
            Our engineering team also publishes practical technical guides on our{' '}
            <Link to="/blog/" className="text-[#5D72CC] font-semibold hover:underline">
              Technical Blog
            </Link>{' '}
            covering Python, FastAPI, PostgreSQL, Docker, Nginx, and backend architecture—sharing patterns we use in real production systems.
          </p>
        </div>
      </section>

      <div className="flex flex-wrap gap-4">
        <Link
          to="/case-studies/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-stone-900 dark:bg-white text-white dark:text-black text-sm font-bold hover:opacity-90 transition-opacity"
        >
          View Project Case Studies <ArrowUpRight className="w-4 h-4" />
        </Link>
        <Link
          to="/contact/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-stone-300 dark:border-white/20 text-sm font-semibold hover:bg-stone-200/60 dark:hover:bg-white/10 transition-colors"
        >
          Contact Our Team
        </Link>
      </div>
    </PageLayout>
  );
}

