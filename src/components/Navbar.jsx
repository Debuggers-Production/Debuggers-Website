import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

// Home-page nav links
const homeNavLinks = [
  { name: 'Home',         href: '#hero'      },
  { name: 'Services',     href: '#services'  },
  { name: 'Architecture', href: '#problem'   },
  { name: 'Customers',    href: '#customers' },
  { name: 'Team',         href: '#team'      },
];

// Service-detail-page section links
const serviceNavLinks = [
  { name: 'Our Work',       href: 'process'  },
  { name: "What's Included", href: 'features' },
  { name: 'Pricing',         href: 'pricing'  },
  { name: 'Q&A',             href: 'faq'      },
];

// backTo       → e.g. "/" — when set, renders the service-page layout
// serviceTitle → shown on the right (replaces Launch App)
export default function Navbar({ backTo = null, serviceTitle = null }) {
  const [activeSection, setActiveSection] = useState(backTo ? 'process' : 'hero');

  useEffect(() => {
    const links = backTo ? serviceNavLinks : homeNavLinks;
    const ids   = links.map(l => l.href.replace('#', ''));

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
  }, [backTo]);

  const smoothScroll = (e, href) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(id);
    }
  };

  return (
    <motion.nav
      initial={{ y: -150, scale: 0.5, opacity: 0 }}
      animate={{ y: 0, scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.1 }}
      className="fixed top-0 left-0 w-full z-50 py-4 flex justify-center pointer-events-none h-25"
    >
      <div className="w-[95%] lg:w-3/4 py-3 px-6 lg:px-8 bg-black/60 backdrop-blur-xl border border-white/10 rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.8)] flex items-center justify-between pointer-events-auto gap-4">

        {/* ── LEFT: back arrow (service pages) + Logo ── */}
        <div className="flex items-center gap-3 shrink-0">
          {backTo && (
            <Link
              to={backTo}
              className="flex items-center justify-center w-9 h-9 rounded-full bg-white/5 border border-white/10 text-neutral-400 hover:text-white hover:border-white/30 hover:bg-white/10 transition-all duration-200 group"
              aria-label="Go back"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-200" />
            </Link>
          )}

          {/* Logo / Brand */}
          <div
            className="flex items-center gap-1 cursor-pointer group px-2 py-0.5 rounded-full bg-white/10 text-white border border-white/20 font-bold tracking-wide hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.05)]"
            onClick={(e) => { if (!backTo) smoothScroll(e, '#hero'); }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-fuchsia-500/20 blur-xl rounded-full scale-150 group-hover:bg-fuchsia-500/40 transition-colors duration-500" />
              <img src="/logo.png" alt="Logo" className="relative w-auto h-7 md:h-8 object-contain group-hover:scale-110 transition-transform duration-300" />
            </div>
            <img src="/buggers_text.png" alt="Buggers" className="w-auto h-5 md:h-[22px] object-contain mt-1" />
          </div>
        </div>

        {/* ── CENTER: nav links (home = page sections | service = section quick-links) ── */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {(backTo ? serviceNavLinks : homeNavLinks).map((link) => {
            const id       = link.href.replace('#', '');
            const isActive = activeSection === id;
            return (
              <a
                key={link.name}
                href={backTo ? `#${link.href}` : link.href}
                onClick={(e) => smoothScroll(e, link.href)}
                className={`text-sm tracking-wide transition-colors relative group ${
                  isActive ? 'font-bold text-white' : 'font-semibold text-neutral-400 hover:text-white'
                }`}
              >
                {link.name}
                <span
                  className={`absolute -bottom-1 left-0 h-[2px] rounded-full transition-all duration-300 ${
                    isActive
                      ? 'w-full bg-linear-to-r from-white-400 via-white to-white-400 shadow-[0_0_12px_rgba(200,100,255,0.7)]'
                      : 'w-0 bg-white group-hover:w-full'
                  }`}
                />
              </a>
            );
          })}
        </div>

        {/* ── RIGHT: service name (service pages) OR Launch App (home) ── */}
        {serviceTitle ? (
          <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 shrink-0">
            <span className="text-white text-sm font-bold tracking-tight">{serviceTitle}</span>
          </div>
        ) : (
          null
        )}
      </div>
    </motion.nav>
  );
}
