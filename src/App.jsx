import React, { useState, useEffect, Suspense, lazy } from 'react';
import { useLenis, getLenis } from './hooks/useLenis';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import CompanyOverview from './components/CompanyOverview';
import ProblemSolution from './components/ProblemSolution';
import Testimonials from './components/Testimonials';
import Customers from './components/Customers';
import Footer from './components/Footer';
import SeoHead from './components/SeoHead';

const ServiceDetailPage = lazy(() => import('./pages/ServiceDetailPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));
const DisclaimerPage = lazy(() => import('./pages/DisclaimerPage'));
const FaqPage = lazy(() => import('./pages/FaqPage'));
const BlogListPage = lazy(() => import('./pages/BlogListPage'));
const BlogDetailPage = lazy(() => import('./pages/BlogDetailPage'));
const CaseStudiesPage = lazy(() => import('./pages/CaseStudiesPage'));
const CaseStudyDetailPage = lazy(() => import('./pages/CaseStudyDetailPage'));
const MenukitPage = lazy(() => import('./pages/MenukitPage'));
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function PageFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0ede8] dark:bg-black text-stone-500 dark:text-neutral-400 text-sm">
      Loading...
    </div>
  );
}

// ── Home Page ──────────────────────────────────────────────────────────────
function HomePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#f0ede8] dark:bg-black min-h-screen w-full relative selection:bg-[#5D72CC] selection:text-white transition-colors duration-300">
      <SeoHead
        title="Debuggers Technologies | Software Engineering, SaaS Products & Cloud Solutions"
        description="Debuggers Technologies builds scalable web applications, mobile apps, backend APIs, cloud infrastructure, and SaaS products including MenuKit and Dauth."
        path="/"
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

      <main>
        <Navbar />
        <div id="hero"><Hero /></div>
        <div id="services"><Services /></div>
        <div id="about-overview"><CompanyOverview /></div>
        <div id="problem"><ProblemSolution /></div>
        <div id="customers"><Customers /></div>
        <div id="testimonials"><Testimonials /></div>
        <Footer />
      </main>
    </div>
  );
}

// ── Service Page ──────────────────────────────────────────────────────────
function ServicePage() {
  return (
    <div className="bg-[#eaedf2] dark:bg-black min-h-screen w-full relative transition-colors duration-300">
      <ServiceDetailPage />
    </div>
  );
}

// ── Scroll reset on route change (syncs with Lenis) ───────────────────────
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// ── Root App with Router ──────────────────────────────────────────────────
function App() {
  useLenis();
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ScrollToTop />
        <CustomCursor />
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/about/" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/contact/" element={<ContactPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/privacy-policy/" element={<PrivacyPolicyPage />} />
            <Route path="/terms-and-conditions" element={<TermsPage />} />
            <Route path="/terms-and-conditions/" element={<TermsPage />} />
            <Route path="/disclaimer" element={<DisclaimerPage />} />
            <Route path="/disclaimer/" element={<DisclaimerPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/faq/" element={<FaqPage />} />
            <Route path="/blog" element={<BlogListPage />} />
            <Route path="/blog/" element={<BlogListPage />} />
            <Route path="/blog/:slug" element={<BlogDetailPage />} />
            <Route path="/case-studies" element={<CaseStudiesPage />} />
            <Route path="/case-studies/" element={<CaseStudiesPage />} />
            <Route path="/case-studies/:slug" element={<CaseStudyDetailPage />} />
            <Route path="/menukit" element={<MenukitPage />} />
            <Route path="/menukit/" element={<MenukitPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/" element={<ProductsPage />} />
            <Route path="/services/:slug" element={<ServicePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
