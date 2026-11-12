import React from 'react';
import { Link } from 'react-router-dom';
import { QrCode, Smartphone, RefreshCw, Layers, CheckCircle2, ArrowUpRight } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import Breadcrumbs from '../components/Breadcrumbs';
import SeoHead from '../components/SeoHead';
import AdSenseUnit from '../components/AdSenseUnit';

const FEATURES = [
  {
    icon: QrCode,
    title: 'Instant Table QR Menus',
    desc: 'Generate clean, table-specific QR codes that open your digital menu directly in any mobile browser—no app download required.',
  },
  {
    icon: RefreshCw,
    title: 'Real-Time Price & Stock Updates',
    desc: 'Update dish availability, seasonal specials, or pricing in seconds without reprinting paper menus.',
  },
  {
    icon: Smartphone,
    title: 'Fast Mobile Experience',
    desc: 'Lightweight layouts designed to load smoothly on 4G connections inside busy dining rooms and cafes.',
  },
  {
    icon: Layers,
    title: 'Organized Categories & Tags',
    desc: 'Structure menus by courses, dietary preferences, combos, and add-ons so guests find what they want quickly.',
  },
];

export default function MenukitPage() {
  return (
    <PageLayout maxWidth="max-w-5xl" ambientTheme="menukit" accentColor="#ff6b00">
      <SeoHead
        title="MenuKit — Digital QR Menu & Ordering Platform | Debuggers Technologies"
        description="MenuKit helps restaurants and cafes launch fast, mobile-friendly QR menus with real-time item updates and zero reprinting costs."
        path="/menukit/"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: 'MenuKit',
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'Web',
          url: 'https://debuggerstechnologies.com/menukit/',
          publisher: {
            '@type': 'Organization',
            name: 'Debuggers Technologies Pvt Limited',
          },
        }}
      />

      <Breadcrumbs
        items={[
          { label: 'Home', to: '/' },
          { label: 'Products', to: '/case-studies/' },
          { label: 'MenuKit' },
        ]}
      />

      <header className="mb-12">
        <div className="flex items-center gap-4 mb-5">
          <div className="w-16 h-16 rounded-2xl bg-[#ff6b00]/15 border border-[#ff6b00]/30 flex items-center justify-center">
            <img src="/products/menukit-icon.png" alt="MenuKit Logo" width="40" height="40" decoding="async" className="w-10 h-10 object-contain" />
          </div>
          <div>
            <span className="inline-block px-3 py-0.5 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 mb-1">
              Live Product
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">MenuKit</h1>
          </div>
        </div>
        <p className="text-lg text-stone-600 dark:text-neutral-400 max-w-3xl leading-relaxed mb-6">
          MenuKit is a digital QR menu and table ordering platform built by Debuggers Technologies for restaurants, cafes, bakeries, and cloud kitchens. Keep your menu accurate in real time without paper reprinting overhead.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/contact/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#ff6b00] text-white text-sm font-bold hover:opacity-90 transition-opacity"
          >
            Request MenuKit Onboarding <ArrowUpRight className="w-4 h-4" />
          </Link>
          <Link
            to="/case-studies/menukit"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-stone-300 dark:border-white/20 text-sm font-semibold hover:bg-stone-200/60 dark:hover:bg-white/10 transition-colors"
          >
            Read Technical Case Study
          </Link>
        </div>
      </header>

      {/* Feature Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
        {FEATURES.map((f) => {
          const Icon = f.icon;
          return (
            <div
              key={f.title}
              className="p-6 sm:p-7 rounded-2xl bg-[#faf8f5] dark:bg-white/[0.03] border border-stone-200 dark:border-white/10"
            >
              <div className="w-11 h-11 rounded-xl bg-[#ff6b00]/15 text-[#ff6b00] flex items-center justify-center mb-4">
                <Icon className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold mb-2">{f.title}</h2>
              <p className="text-sm text-stone-600 dark:text-neutral-400 leading-relaxed">{f.desc}</p>
            </div>
          );
        })}
      </section>

      {/* Manual AdSense Unit — Exclusively on /menukit/ public landing page */}
      <AdSenseUnit />

      <section className="p-8 rounded-3xl bg-[#faf8f5] dark:bg-white/[0.03] border border-stone-200 dark:border-white/10 mt-10">
        <h2 className="text-2xl font-bold mb-4">Why Restaurants Switch to Digital QR Menus</h2>
        <ul className="space-y-3 text-stone-600 dark:text-neutral-300">
          {[
            'Eliminate recurring menu printing costs when prices or seasonal dishes change.',
            'Hide sold-out items immediately so guests never order unavailable dishes.',
            'Present clear item descriptions, categories, and pricing on any smartphone.',
          ].map((point) => (
            <li key={point} className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#ff6b00] mt-1 shrink-0" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </section>
    </PageLayout>
  );
}

