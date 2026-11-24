import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowRight, HelpCircle } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import Breadcrumbs from '../components/Breadcrumbs';
import SeoHead from '../components/SeoHead';

const FAQS = [
  {
    q: 'What services does Debuggers Technologies offer?',
    a: 'Debuggers Technologies provides end-to-end custom software engineering services. Our core offerings include Full-Stack Web Development, Native & Cross-Platform Mobile Application Development (iOS, Android, Flutter), Cloud & DevOps Infrastructure (VPS hosting, Docker containerization, CI/CD pipelines, Nginx reverse proxies), UI/UX Design & Design Systems, Cyber Security & Server Hardening, and AI/Machine Learning integrations.',
  },
  {
    q: 'Where is Debuggers Technologies headquartered?',
    a: 'We are a product-based software engineering firm headquartered in Madurai, Tamil Nadu, India. We partner with fast-growing startups, small-to-medium businesses, and global enterprises to build scalable web, mobile, and cloud software systems.',
  },
  {
    q: 'What technology stacks and frameworks do you specialize in?',
    a: 'Our engineering team specializes in modern, production-hardened stacks. On the backend, we work extensively with Python (FastAPI, Django), Node.js, PostgreSQL, Redis, and MongoDB. On the frontend and mobile, we engineer responsive applications using React, Vite, Tailwind CSS, Next.js, and Flutter. For infrastructure and cloud delivery, we deploy using Docker, Nginx, Linux/Ubuntu VPS environments, AWS, and DigitalOcean.',
  },
  {
    q: 'How do I request a quote or start a project consultation?',
    a: 'You can submit your requirements through our online Contact form or email us directly at debuggerstechs@gmail.com. Our engineering leads review all project inquiries and guarantee a response with initial technical feedback and scope estimation in less than 7 hours.',
  },
  {
    q: 'What is MenuKit and how does it work?',
    a: 'MenuKit is our proprietary digital QR menu and table-ordering platform designed for restaurants, cafes, and hospitality businesses. It eliminates recurring paper menu printing costs by enabling guests to scan table-specific QR codes to view real-time menus with dish photos, dietary filters, and pricing. Managers can update items, prices, and sold-out statuses instantly through an intuitive web dashboard.',
  },
  {
    q: 'What is Dauth and why was it developed?',
    a: 'Dauth is our centralized authentication and identity service. It provides secure sign-in, short-lived JWT token issuance, refresh token rotation, and multi-device session tracking across client applications. Instead of rebuilding auth logic into every microservice, teams integrate Dauth to ensure industry-standard security and OAuth compliance.',
  },
  {
    q: 'Do you provide cloud deployment, server migration, and DevOps support?',
    a: 'Yes. We configure and manage Linux VPS servers (Ubuntu, Debian), setup systemd process supervisors, configure Gunicorn/Uvicorn ASGI clusters, install and renew SSL/TLS certificates via Certbot, enforce UFW firewall rules, and configure optimized Nginx reverse proxies with rate limiting and Brotli/gzip compression.',
  },
  {
    q: 'How long does a typical software development project take?',
    a: 'Project timelines vary based on functional complexity and scope. MVP (Minimum Viable Product) prototypes and marketing portals typically take 2 to 4 weeks. Full-featured SaaS web applications or cross-platform Flutter mobile applications generally range between 6 to 12 weeks with weekly sprint demos, staging deployments, and automated testing.',
  },
  {
    q: 'Do you provide ongoing maintenance, bug fixes, and SLA support?',
    a: 'Yes. We offer structured post-launch maintenance packages covering dependency updates, server uptime monitoring, database backups, security patches, and priority bug resolution with clear service-level agreements (SLAs).',
  },
  {
    q: 'How do you handle client communication and project milestones during development?',
    a: 'We practice agile development with transparent progress tracking. Clients receive private access to staging servers, weekly progress demonstrations, direct communication channels via Slack or WhatsApp, and sprint-based deliverable signoffs.',
  },
  {
    q: 'Can I hire Debuggers Technologies for specific technical consulting or code audits?',
    a: 'Yes. In addition to full project build-outs, we offer technical architecture consulting, database query optimization (PostgreSQL indexing, Redis caching), API security audits, and legacy server-to-Docker migration services.',
  },
  {
    q: 'What industries and business sectors have you served?',
    a: 'We have delivered software solutions for hospitality and food service (MenuKit), fintech and identity platforms (Dauth), personal finance management (Dwise), local business booking systems (Subakarya), e-commerce portals, and logistics operations.',
  },
];

export default function FaqPage() {
  const [openIdx, setOpenIdx] = useState(0);

  const toggle = (idx) => {
    setOpenIdx(openIdx === idx ? -1 : idx);
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  return (
    <PageLayout maxWidth="max-w-4xl">
      <SeoHead
        title="Frequently Asked Questions (FAQ) | Debuggers Technologies"
        description="Find answers to common questions about Debuggers Technologies software engineering services, web development, mobile apps, pricing, MenuKit, and technology stacks."
        keywords={[
          'Debuggers Technologies FAQ',
          'software development questions',
          'web development Madurai',
          'FastAPI consulting',
          'MenuKit QR ordering',
          'custom software engineering FAQ',
        ]}
        path="/faq/"
        schema={faqSchema}
      />

      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'FAQ' }]} />

      <header className="mb-10 text-center sm:text-left">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-200 dark:bg-white/5 border border-stone-300 dark:border-white/10 text-stone-600 dark:text-neutral-400 text-xs font-bold tracking-widest uppercase mb-4">
          <HelpCircle className="w-3.5 h-3.5 text-[#5D72CC]" /> Frequently Asked Questions
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
          Everything You Need to Know.
        </h1>
        <p className="text-lg text-stone-600 dark:text-neutral-400 max-w-2xl leading-relaxed">
          Clear answers about our development process, technical architecture, SaaS products, pricing models, and team engagement terms.
        </p>
      </header>

      {/* FAQ Accordion List */}
      <div className="space-y-4 mb-14">
        {FAQS.map((item, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="relative rounded-3xl bg-white/45 dark:bg-white/[0.035] backdrop-blur-2xl border border-white/75 dark:border-white/10 overflow-hidden shadow-[0_8px_32px_rgba(15,23,42,0.05),inset_0_1px_1px_rgba(255,255,255,0.9)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.08)] transition-all duration-200"
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/80 dark:via-white/20 to-transparent pointer-events-none" />
              <button
                type="button"
                onClick={() => toggle(idx)}
                aria-expanded={isOpen}
                className="w-full text-left p-6 sm:p-7 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
              >
                <span className="text-base sm:text-lg font-bold text-stone-900 dark:text-white leading-snug">
                  {item.q}
                </span>
                <span
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border border-stone-300 dark:border-white/15 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 bg-[#5D72CC] text-white border-[#5D72CC]' : 'bg-stone-100 dark:bg-white/5 text-stone-600 dark:text-neutral-300'
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </span>
              </button>
              {isOpen && (
                <div className="px-6 pb-6 sm:px-7 sm:pb-7 text-stone-700 dark:text-neutral-300 text-sm sm:text-base leading-relaxed border-t border-stone-200/50 dark:border-white/5 pt-4">
                  {item.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Still Have Questions CTA */}
      <section className="relative p-8 sm:p-10 rounded-3xl bg-white/45 dark:bg-white/[0.035] backdrop-blur-2xl border border-white/75 dark:border-white/10 overflow-hidden text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_8px_32px_rgba(15,23,42,0.05),inset_0_1px_1px_rgba(255,255,255,0.9)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.08)]">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/80 dark:via-white/20 to-transparent pointer-events-none" />
        <div>
          <h2 className="text-2xl font-bold mb-2">Have a specific technical question?</h2>
          <p className="text-sm text-stone-600 dark:text-neutral-400 max-w-lg">
            Our engineering leads are ready to review your project roadmap and provide practical architecture recommendations.
          </p>
        </div>
        <Link
          to="/contact/"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#5D72CC] text-white text-sm font-bold shadow-[0_0_20px_rgba(93,114,204,0.35)] hover:opacity-95 transition-opacity shrink-0"
        >
          Contact Our Engineers <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </PageLayout>
  );
}
