import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Menu, X, Sun, Moon, ChevronDown, Check } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

// All services list for quick switcher dropdown
const ALL_SERVICES = [
  { slug: 'web-development', title: 'Web Development' },
  { slug: 'ui-ux-design', title: 'UI/UX Design' },
  { slug: 'cloud-devops', title: 'Cloud & DevOps' },
  { slug: 'mobile-apps', title: 'Mobile & Desktop Apps' },
  { slug: 'cyber-security', title: 'Cyber Security' },
  { slug: 'ai-ml', title: 'AI & Machine Learning' },
];

// Home-page section links
const homeNavLinks = [
  { name: 'Home', href: '#hero' },
  { name: 'Services', href: '#services' },
  { name: 'Products', to: '/products/' },
  { name: 'About', to: '/about/' },
  { name: 'Case Studies', to: '/case-studies/' },
  { name: 'Blog', to: '/blog/' },
  { name: 'Contact', to: '/contact/' },
];

// Top-level page links (when on secondary pages)
const pageNavLinks = [
  { name: 'Home', to: '/' },
  { name: 'Services', to: '/#services' },
  { name: 'Products', to: '/products/' },
  { name: 'About', to: '/about/' },
  { name: 'Case Studies', to: '/case-studies/' },
  { name: 'Blog', to: '/blog/' },
  { name: 'Contact', to: '/contact/' },
];

// Service-detail-page section links
const serviceNavLinks = [
  { name: 'Our Work', href: 'process' },
  { name: "What's Included", href: 'features' },
  { name: 'Pricing', href: 'pricing' },
  { name: 'Q&A', href: 'faq' },
];

export default function Navbar({ backTo = null, serviceTitle = null }) {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';
  const isServiceDetail = Boolean(backTo && serviceTitle);

  const [activeSection, setActiveSection] = useState(isServiceDetail ? 'process' : 'hero');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false);
  const serviceDropdownRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(min-width: 768px)').matches : true
  );
  const { isDark, toggleTheme } = useTheme();

  // Close service switcher on outside click or ESC
  useEffect(() => {
    function handleClickOutside(e) {
      if (serviceDropdownRef.current && !serviceDropdownRef.current.contains(e.target)) {
        setIsServiceDropdownOpen(false);
      }
    }
    function handleKeyDown(e) {
      if (e.key === 'Escape') setIsServiceDropdownOpen(false);
    }
    if (isServiceDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isServiceDropdownOpen]);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const handler = (e) => setIsDesktop(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (!isHome && !isServiceDetail) return;
    const links = isServiceDetail
      ? serviceNavLinks
      : homeNavLinks.filter((l) => l.href);
    const ids = links.map((l) => l.href.replace('#', ''));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-35% 0px -60% 0px' }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isHome, isServiceDetail]);

  const smoothScroll = (e, href) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(id);
    }
  };

  const navItems = isServiceDetail
    ? serviceNavLinks
    : isHome
      ? homeNavLinks
      : pageNavLinks;

  const isLinkActive = (item) => {
    if (item.to) {
      if (item.to === '/') return location.pathname === '/';
      return location.pathname.startsWith(item.to);
    }
    const id = item.href.replace('#', '');
    return activeSection === id;
  };

  return (
    <motion.nav
      initial={{ y: -150, scale: 0.5, opacity: 0 }}
      animate={{ y: 0, scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.1 }}
      className="fixed top-0 left-0 w-full z-50 py-4 flex justify-center pointer-events-none h-25"
    >
      <div className="w-[95%] lg:w-4/5 max-w-6xl py-3 px-5 lg:px-8 bg-white/60 dark:bg-black/45 backdrop-blur-2xl border border-white/70 dark:border-white/15 rounded-full shadow-[0_8px_32px_rgba(28,26,23,0.06),inset_0_1px_1px_rgba(255,255,255,0.85)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.12)] flex items-center justify-between pointer-events-auto gap-4 transition-all duration-300">

        {/* ── LEFT: back arrow + Logo ── */}
        <div className="flex items-center gap-3 shrink-0">
          {backTo && (
            <Link
              to={backTo}
              className="flex items-center justify-center w-9 h-9 rounded-full bg-white/50 dark:bg-white/5 border border-white/60 dark:border-white/10 text-stone-500 dark:text-neutral-400 hover:text-stone-900 dark:hover:text-white hover:border-white hover:bg-white/80 dark:hover:bg-white/10 transition-all duration-200 group shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] dark:shadow-none"
              aria-label="Go back"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-200" />
            </Link>
          )}

          <div
            className={`items-center gap-1.5 cursor-pointer group px-3 py-1 rounded-full bg-white/50 dark:bg-white/10 text-stone-900 dark:text-white border border-white/60 dark:border-white/20 font-bold tracking-wide hover:bg-white/80 dark:hover:bg-white/20 transition-all duration-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] dark:shadow-none ${serviceTitle ? 'hidden sm:flex' : 'flex'}`}
            onClick={(e) => {
              if (isHome) smoothScroll(e, '#hero');
              else navigate('/');
            }}
          >
            <div className="relative">
              <img
                src="/logo-light.png"
                alt="Debuggers Technologies Logo"
                width="32"
                height="32"
                decoding="async"
                fetchPriority="high"
                className="relative w-auto h-7 md:h-8 object-contain block dark:hidden group-hover:scale-110 transition-transform duration-300"
              />
              <img
                src="/logo.png"
                alt="Debuggers Technologies Logo"
                width="32"
                height="32"
                decoding="async"
                fetchPriority="high"
                className="relative w-auto h-7 md:h-8 object-contain hidden dark:block group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <img
              src="/buggers_text_light.png"
              alt="Debuggers Technologies"
              width="120"
              height="18"
              decoding="async"
              fetchPriority="high"
              className="w-auto h-4 md:h-[18px] object-contain block dark:hidden"
            />
            <img
              src="/buggers_text.png"
              alt="Debuggers Technologies"
              width="120"
              height="18"
              decoding="async"
              fetchPriority="high"
              className="w-auto h-4 md:h-[18px] object-contain hidden dark:block"
            />
          </div>

          {serviceTitle && (
            <div className="flex sm:hidden items-center ml-1">
              <span className="text-slate-900 dark:text-white text-base font-black tracking-tight truncate max-w-[180px]">{serviceTitle}</span>
            </div>
          )}
        </div>

        {/* ── CENTER: nav links ── */}
        <div className="hidden md:flex items-center gap-5 lg:gap-7">
          {navItems.map((link) => {
            const active = isLinkActive(link);
            const cls = `text-sm tracking-wide transition-colors relative group whitespace-nowrap ${
              active
                ? 'font-bold text-stone-900 dark:text-white'
                : 'font-semibold text-stone-500 dark:text-neutral-400 hover:text-stone-900 dark:hover:text-white'
            }`;
            const underline = (
              <span
                className={`absolute -bottom-1 left-0 h-[2px] rounded-full transition-all duration-300 ${
                  active
                    ? 'bg-gradient-to-r w-full from-transparent via-black to-transparent dark:via-white shadow-[0_0_12px_rgba(93,114,204,0.7)]'
                    : 'w-0 bg-stone-900 dark:bg-white group-hover:w-full'
                }`}
              />
            );

            if (link.to) {
              return (
                <Link key={link.name} to={link.to} className={cls}>
                  {link.name}
                  {underline}
                </Link>
              );
            }

            return (
              <a
                key={link.name}
                href={backTo ? `#${link.href}` : link.href}
                onClick={(e) => smoothScroll(e, link.href)}
                className={cls}
              >
                {link.name}
                {underline}
              </a>
            );
          })}
        </div>

        {/* ── RIGHT: service name / theme toggle / hamburger ── */}
        <div className="flex items-center gap-2">
          {backTo && serviceTitle && !isMenuOpen && (
            <div ref={serviceDropdownRef} className="relative hidden md:block shrink-0">
              <button
                type="button"
                onClick={() => setIsServiceDropdownOpen((prev) => !prev)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-stone-100 dark:bg-white/5 border border-stone-200 dark:border-white/10 hover:border-[#5D72CC]/50 hover:bg-stone-200/60 dark:hover:bg-white/10 text-stone-900 dark:text-white transition-all cursor-pointer select-none group"
                aria-label="Change service"
                aria-expanded={isServiceDropdownOpen}
              >
                <span className="text-sm font-bold tracking-tight">{serviceTitle}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-transform duration-200 ${
                    isServiceDropdownOpen ? 'rotate-180 text-[#5D72CC]' : ''
                  }`}
                />
              </button>

              {/* Service Switcher Popover */}
              {isServiceDropdownOpen && (
                <div
                  className={`absolute right-0 top-full mt-2 w-64 rounded-2xl border shadow-2xl backdrop-blur-xl p-1.5 z-50 transition-all ${
                    isDark
                      ? 'bg-[#121218]/95 border-white/15 text-white shadow-black/80'
                      : 'bg-white/95 border-stone-200 text-stone-900 shadow-stone-400/25'
                  }`}
                >
                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-stone-400 dark:text-neutral-500">
                    Switch Service
                  </div>
                  <div className="flex flex-col gap-0.5">
                    {ALL_SERVICES.map((s) => {
                      const isCurrent = s.title.toLowerCase() === serviceTitle.toLowerCase();
                      return (
                        <button
                          key={s.slug}
                          type="button"
                          onClick={() => {
                            setIsServiceDropdownOpen(false);
                            navigate(`/services/${s.slug}`);
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors text-left cursor-pointer ${
                            isCurrent
                              ? isDark
                                ? 'bg-[#5D72CC]/25 text-[#7e90db]'
                                : 'bg-[#5D72CC]/10 text-[#5D72CC]'
                              : isDark
                              ? 'hover:bg-white/5 text-neutral-300'
                              : 'hover:bg-stone-100 text-stone-700'
                          }`}
                        >
                          <span>{s.title}</span>
                          {isCurrent && <Check className="w-3.5 h-3.5 text-[#5D72CC]" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-full bg-white/50 dark:bg-white/5 border border-white/60 dark:border-white/10 flex items-center justify-center text-stone-600 dark:text-neutral-300 hover:text-stone-950 dark:hover:text-white hover:bg-white/80 dark:hover:bg-white/10 transition-all duration-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] dark:shadow-none"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {!isDesktop && (
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex md:hidden items-center justify-center w-10 h-10 rounded-full bg-white/50 dark:bg-white/5 border border-white/60 dark:border-white/10 text-stone-700 dark:text-white hover:bg-white/80 dark:hover:bg-white/10 transition-all duration-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] dark:shadow-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          )}
        </div>
      </div>

      {/* ── MOBILE MENU OVERLAY ── */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-1/2 -translate-x-1/2 w-[90%] bg-white/75 dark:bg-black/85 backdrop-blur-2xl border border-white/70 dark:border-white/15 rounded-3xl p-6 shadow-[0_20px_50px_rgba(28,26,23,0.12),inset_0_1px_1px_rgba(255,255,255,0.8)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.1)] pointer-events-auto flex flex-col gap-3 z-40 md:hidden transition-colors duration-300"
          >
            {navItems.map((link) => {
              const active = isLinkActive(link);
              const cls = `text-lg tracking-wide py-2 px-4 rounded-xl transition-all duration-200 ${
                active
                  ? 'bg-stone-200/70 dark:bg-white/10 text-stone-900 dark:text-white font-bold'
                  : 'text-stone-500 dark:text-neutral-400 font-medium hover:text-stone-900 dark:hover:text-white'
              }`;

              if (link.to) {
                return (
                  <Link
                    key={link.name}
                    to={link.to}
                    onClick={() => setIsMenuOpen(false)}
                    className={cls}
                  >
                    {link.name}
                  </Link>
                );
              }

              return (
                <a
                  key={link.name}
                  href={backTo ? `#${link.href}` : link.href}
                  onClick={(e) => {
                    smoothScroll(e, link.href);
                    setIsMenuOpen(false);
                  }}
                  className={cls}
                >
                  {link.name}
                </a>
              );
            })}

            {serviceTitle && (
              <div className="mt-2 pt-3 border-t border-slate-200 dark:border-white/5 flex flex-col gap-1.5">
                <span className="text-[10px] font-bold tracking-widest text-slate-400 dark:text-neutral-500 uppercase px-4">
                  Switch Service
                </span>
                <div className="flex flex-col gap-0.5 px-2">
                  {ALL_SERVICES.map((s) => {
                    const isCurrent = s.title.toLowerCase() === serviceTitle.toLowerCase();
                    return (
                      <button
                        key={s.slug}
                        type="button"
                        onClick={() => {
                          setIsMenuOpen(false);
                          navigate(`/services/${s.slug}`);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-left transition-colors cursor-pointer ${
                          isCurrent
                            ? 'bg-[#5D72CC]/20 text-[#5D72CC] font-bold'
                            : 'text-stone-700 dark:text-neutral-300 hover:bg-stone-100 dark:hover:bg-white/5'
                        }`}
                      >
                        <span>{s.title}</span>
                        {isCurrent && <Check className="w-3.5 h-3.5 text-[#5D72CC]" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
