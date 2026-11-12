import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Mail, MapPin, Clock, Send, CheckCircle,
  Layers, Smartphone, CloudCog, PenTool, ShieldCheck, BrainCircuit,
  HelpCircle, Package, ArrowRight,
} from 'lucide-react';
import PageLayout from '../components/PageLayout';
import Breadcrumbs from '../components/Breadcrumbs';
import SeoHead from '../components/SeoHead';
import CountryCodeSelector from '../components/CountryCodeSelector';
import { useTheme } from '../context/ThemeContext';
import { submitToWeb3Forms } from '../utils/web3forms';

const SERVICES = [
  {
    id: 'web-development',
    label: 'Web Development',
    icon: Layers,
    desc: 'High-performance websites, portals & full-stack web apps',
    color: '#60a5fa',
  },
  {
    id: 'mobile-apps',
    label: 'Mobile & Desktop Apps',
    icon: Smartphone,
    desc: 'Native and cross-platform apps for iOS, Android & Desktop',
    color: '#34d399',
  },
  {
    id: 'cloud-devops',
    label: 'Cloud & DevOps',
    icon: CloudCog,
    desc: 'VPS setup, Docker, CI/CD pipelines & 24/7 cloud infrastructure',
    color: '#38bdf8',
  },
  {
    id: 'ui-ux-design',
    label: 'UI/UX Design',
    icon: PenTool,
    desc: 'Design systems, Figma prototypes & conversion-focused interfaces',
    color: '#e879f9',
  },
  {
    id: 'cyber-security',
    label: 'Cyber Security',
    icon: ShieldCheck,
    desc: 'Vulnerability audits, server hardening & OWASP compliance',
    color: '#f87171',
  },
  {
    id: 'artificial-intelligence',
    label: 'AI & Machine Learning',
    icon: BrainCircuit,
    desc: 'LLMs, RAG, business automations & intelligent workflows',
    color: '#a78bfa',
  },
  {
    id: 'general',
    label: 'General / Other Inquiry',
    icon: HelpCircle,
    desc: 'Custom consulting, partnerships, or general questions',
    color: '#94a3b8',
  },
];

export default function ContactPage() {
  const { isDark } = useTheme();
  const [searchParams] = useSearchParams();
  const serviceParam = searchParams.get('service') || '';
  const planParam = searchParams.get('plan') || '';

  const matchedService = SERVICES.find(
    (s) => s.id === serviceParam || s.label.toLowerCase() === serviceParam.toLowerCase()
  );

  const [form, setForm] = useState({
    name: '',
    email: '',
    countryCode: '+91',
    phone: '',
    service: matchedService ? matchedService.id : (serviceParam || 'web-development'),
    plan: planParam,
    subject: planParam
      ? `${matchedService?.label || serviceParam} — ${planParam} Plan Inquiry`
      : (matchedService ? `Inquiry regarding ${matchedService.label}` : ''),
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  // Update form if URL parameters change
  useEffect(() => {
    if (serviceParam) {
      const match = SERVICES.find(
        (s) => s.id === serviceParam || s.label.toLowerCase() === serviceParam.toLowerCase()
      );
      if (match) {
        setForm((prev) => ({
          ...prev,
          service: match.id,
          plan: planParam || prev.plan,
          subject: prev.subject || (planParam
            ? `${match.label} — ${planParam} Plan Inquiry`
            : `Inquiry regarding ${match.label}`),
        }));
      }
    }
  }, [serviceParam, planParam]);

  const selectedServiceObj = SERVICES.find((s) => s.id === form.service) || SERVICES[0];

  const handleSelectService = (serviceId) => {
    const sObj = SERVICES.find((s) => s.id === serviceId);
    setForm((prev) => ({
      ...prev,
      service: serviceId,
      subject: prev.subject && !prev.subject.startsWith('Inquiry regarding')
        ? prev.subject
        : `Inquiry regarding ${sObj?.label || serviceId}`,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    const serviceTitle = selectedServiceObj?.label || form.service;
    const planText = form.plan ? ` (${form.plan})` : '';
    const emailSubject = form.subject.trim()
      ? `[Service: ${serviceTitle}] ${form.subject} — from ${form.name}`
      : `[Service: ${serviceTitle}] New Project Inquiry from ${form.name}${planText}`;

    try {
      await submitToWeb3Forms({
        subject: emailSubject,
        name: form.name,
        email: form.email,
        fields: {
          inquiredService: serviceTitle,
          serviceId: form.service,
          selectedPlan: form.plan || 'Not specified',
          clientName: form.name,
          clientEmail: form.email,
          phone: form.phone.trim() ? `${form.countryCode} ${form.phone.trim()}` : 'Not provided',
          subject: form.subject || `Inquiry for ${serviceTitle}`,
          message: form.message,
          sourceUrl: window.location.href,
          sourcePage: window.location.pathname + window.location.search,
          referrer: typeof document !== 'undefined' ? (document.referrer || 'Direct') : 'Direct',
          submittedAt: new Date().toISOString(),
        },
      });
      setSubmitted(true);
    } catch (err) {
      setError(err.message || 'Unable to send message right now. Please email us directly at debuggerstechs@gmail.com.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageLayout>
      <SeoHead
        title="Contact Us | Debuggers Technologies"
        description="Get in touch with Debuggers Technologies Pvt Limited for web development, mobile apps, backend APIs, cloud DevOps, or product inquiries."
        path="/contact/"
      />

      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Contact Us' }]} />

      <header className="mb-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">Contact Us</h1>
        <p className="text-lg text-stone-600 dark:text-neutral-400 max-w-2xl leading-relaxed">
          Have a software project, technical question, or service inquiry? Reach out to our team directly below or email us.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Contact Info Sidebar */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-6 rounded-2xl bg-[#faf8f5] dark:bg-white/[0.03] border border-stone-200 dark:border-white/10">
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-[#5D72CC] mt-0.5" />
              <div>
                <h2 className="font-bold text-base mb-1">Email</h2>
                <a
                  href="mailto:debuggerstechs@gmail.com"
                  className="text-sm text-stone-600 dark:text-neutral-400 hover:text-stone-900 dark:hover:text-white"
                >
                  debuggerstechs@gmail.com
                </a>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#faf8f5] dark:bg-white/[0.03] border border-stone-200 dark:border-white/10">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#5D72CC] mt-0.5" />
              <div>
                <h2 className="font-bold text-base mb-1">Office Location</h2>
                <p className="text-sm text-stone-600 dark:text-neutral-400">
                  Debuggers Technologies Pvt Limited<br />
                  Madurai, Tamil Nadu, India
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#faf8f5] dark:bg-white/[0.03] border border-stone-200 dark:border-white/10">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-[#5D72CC] mt-0.5" />
              <div>
                <h2 className="font-bold text-base mb-1">First Response SLA</h2>
                <p className="text-sm text-stone-600 dark:text-neutral-400">
                  &lt;7 hours response time for all project inquiries.
                </p>
              </div>
            </div>
          </div>

          {/* Quick link to explore services */}
          <div className="p-6 rounded-2xl bg-[#5D72CC]/10 border border-[#5D72CC]/25">
            <h3 className="font-bold text-sm text-[#5D72CC] mb-2 flex items-center gap-1.5">
              <Package className="w-4 h-4" /> Looking for service packages?
            </h3>
            <p className="text-xs text-stone-600 dark:text-neutral-400 mb-3 leading-relaxed">
              Explore our tech stacks, delivery roadmaps, and pricing models for each IT domain.
            </p>
            <Link
              to="/#services"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#5D72CC] hover:underline"
            >
              Explore IT Services <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Main Form Area */}
        <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-[#faf8f5] dark:bg-white/[0.03] border border-stone-200 dark:border-white/10">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <CheckCircle className="w-14 h-14 text-emerald-500 mx-auto" />
              <h2 className="text-2xl sm:text-3xl font-bold">Inquiry Received!</h2>
              <p className="text-sm text-stone-600 dark:text-neutral-400 max-w-md mx-auto leading-relaxed">
                Thank you for contacting Debuggers Technologies. We have logged your inquiry regarding{' '}
                <span className="font-semibold text-stone-900 dark:text-white">
                  {selectedServiceObj?.label || 'our services'}
                </span>
                {form.plan ? ` (${form.plan})` : ''}. Our team will review your requirements and respond within{' '}
                <span className="font-semibold text-[#5D72CC]">&lt;7 hours</span>.
              </p>
              <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({
                      name: '',
                      email: '',
                      phone: '',
                      service: form.service,
                      plan: '',
                      subject: '',
                      message: '',
                    });
                  }}
                  className="px-6 py-2.5 rounded-full bg-stone-900 dark:bg-white text-white dark:text-black text-sm font-bold hover:opacity-90"
                >
                  Send Another Message
                </button>
                <Link
                  to="/"
                  className="px-6 py-2.5 rounded-full border border-stone-300 dark:border-white/20 text-sm font-bold hover:bg-stone-100 dark:hover:bg-white/10"
                >
                  Return to Home
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Selected service badge if coming from a service link */}
              {matchedService && (
                <div className="p-3.5 rounded-2xl bg-[#5D72CC]/10 border border-[#5D72CC]/25 flex items-center justify-between text-xs">
                  <span className="text-stone-700 dark:text-neutral-300">
                    Inquiring about service:{' '}
                    <strong className="text-[#5D72CC] font-bold">{matchedService.label}</strong>
                    {form.plan ? ` · ${form.plan} Plan` : ''}
                  </span>
                  <Link
                    to={`/services/${matchedService.id}`}
                    className="text-[#5D72CC] font-semibold hover:underline"
                  >
                    View Details →
                  </Link>
                </div>
              )}

              {/* Service Selection Grid */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-2.5 text-stone-600 dark:text-neutral-400">
                  Select Service / Area of Interest *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {SERVICES.map((s) => {
                    const Icon = s.icon;
                    const isSelected = form.service === s.id;
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => handleSelectService(s.id)}
                        className={`flex items-start gap-3 p-3 rounded-xl border text-left transition-all ${
                          isSelected
                            ? 'bg-[#5D72CC]/10 border-[#5D72CC] shadow-sm'
                            : 'bg-white dark:bg-black/40 border-stone-200 dark:border-white/10 hover:border-stone-400 dark:hover:border-white/25'
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                            isSelected
                              ? 'bg-[#5D72CC] text-white'
                              : 'bg-stone-100 dark:bg-white/10 text-stone-600 dark:text-neutral-300'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-stone-900 dark:text-white truncate">
                            {s.label}
                          </p>
                          <p className="text-[11px] text-stone-500 dark:text-neutral-400 line-clamp-1">
                            {s.desc}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Name & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-stone-600 dark:text-neutral-400">
                    Full Name *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-black/60 border border-stone-300 dark:border-white/15 text-sm outline-none focus:border-[#5D72CC]"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-stone-600 dark:text-neutral-400">
                    Email Address *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@company.com"
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-black/60 border border-stone-300 dark:border-white/15 text-sm outline-none focus:border-[#5D72CC]"
                  />
                </div>
              </div>

              {/* Phone & Subject Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-phone" className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-stone-600 dark:text-neutral-400">
                    Phone / WhatsApp Number
                  </label>
                  <div className="flex items-center gap-2">
                    <CountryCodeSelector
                      value={form.countryCode}
                      onChange={(code) => setForm({ ...form, countryCode: code })}
                      isDark={isDark}
                      buttonStyle={{
                        background: isDark ? 'rgba(0,0,0,0.6)' : '#ffffff',
                        borderColor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(214,211,209,1)',
                      }}
                    />
                    <input
                      id="contact-phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="98765 43210"
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-black/60 border border-stone-300 dark:border-white/15 text-sm outline-none focus:border-[#5D72CC]"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="contact-subject" className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-stone-600 dark:text-neutral-400">
                    Subject *
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    required
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    placeholder="e.g. Website Overhaul or API Backend"
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-black/60 border border-stone-300 dark:border-white/15 text-sm outline-none focus:border-[#5D72CC]"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="contact-message" className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-stone-600 dark:text-neutral-400">
                  Project Details / Requirements *
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us about your project requirements, target platform, desired timeline, or any specific questions..."
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-black/60 border border-stone-300 dark:border-white/15 text-sm outline-none focus:border-[#5D72CC]"
                />
              </div>

              {error && <p className="text-sm text-red-500">{error}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="w-full flex items-center justify-center gap-2.5 py-4 rounded-xl bg-[#5D72CC] text-white text-sm sm:text-base font-bold hover:opacity-90 transition-all disabled:opacity-60 shadow-[0_0_25px_rgba(93,114,204,0.35)] cursor-pointer"
              >
                <Send className="w-4 h-4" />
                {submitting ? 'Sending Inquiry...' : 'Submit Service Inquiry'}
              </button>
            </form>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
