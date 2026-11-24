import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full py-14 lg:py-16 border-t border-slate-300/70 dark:border-white/10 bg-[#e3e7ed] dark:bg-black relative z-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-300/70 dark:border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-2 flex flex-col items-start">
            <Link to="/" className="inline-block group mb-4" aria-label="Debuggers Technologies Home">
              <div className="relative">
                <img
                  src="/logo-full-light.png"
                  alt="Debuggers Technologies"
                  width="180"
                  height="80"
                  loading="lazy"
                  decoding="async"
                  className="relative w-auto h-20 object-contain block dark:hidden"
                />
                <img
                  src="/logo-full-dark.png"
                  alt="Debuggers Technologies"
                  width="180"
                  height="80"
                  loading="lazy"
                  decoding="async"
                  className="relative w-auto h-20 object-contain hidden dark:block"
                />
              </div>
            </Link>
            <p className="text-sm text-slate-600 dark:text-neutral-400 leading-relaxed max-w-sm mb-4">
              Product-based software engineering company building in-house SaaS platforms, custom web applications, mobile apps, and cloud infrastructure.
            </p>
            <div className="flex flex-col gap-2 text-xs text-slate-600 dark:text-neutral-400">
              <a
                href="mailto:debuggerstechs@gmail.com"
                className="inline-flex items-center gap-2 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#5D72CC]" />
                debuggerstechs@gmail.com
              </a>
              <span className="inline-flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#5D72CC]" />
                Madurai, Tamil Nadu, India
              </span>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900 dark:text-white mb-4">
              Company
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-600 dark:text-neutral-400">
              <li><Link to="/about/" className="hover:text-slate-900 dark:hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/faq/" className="hover:text-slate-900 dark:hover:text-white transition-colors">FAQ</Link></li>
              <li><Link to="/case-studies/" className="hover:text-slate-900 dark:hover:text-white transition-colors">Case Studies</Link></li>
              <li><Link to="/blog/" className="hover:text-slate-900 dark:hover:text-white transition-colors">Technical Blog</Link></li>
              <li><Link to="/contact/" className="hover:text-slate-900 dark:hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Products & Services */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900 dark:text-white mb-4">
              Products &amp; Services
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-600 dark:text-neutral-400">
              <li><Link to="/menukit/" className="hover:text-slate-900 dark:hover:text-white transition-colors">MenuKit</Link></li>
              <li><a href="https://dauth.debuggerstechnologies.com" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 dark:hover:text-white transition-colors">Dauth</a></li>
              <li><Link to="/services/web-development" className="hover:text-slate-900 dark:hover:text-white transition-colors">Web Development</Link></li>
              <li><Link to="/services/mobile-apps" className="hover:text-slate-900 dark:hover:text-white transition-colors">Mobile &amp; Desktop Apps</Link></li>
              <li><Link to="/services/cloud-devops" className="hover:text-slate-900 dark:hover:text-white transition-colors">Cloud &amp; DevOps</Link></li>
              <li><Link to="/services/artificial-intelligence" className="hover:text-slate-900 dark:hover:text-white transition-colors">AI Solutions</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900 dark:text-white mb-4">
              Legal
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-600 dark:text-neutral-400">
              <li><Link to="/privacy-policy/" className="hover:text-slate-900 dark:hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms-and-conditions/" className="hover:text-slate-900 dark:hover:text-white transition-colors">Terms &amp; Conditions</Link></li>
              <li><Link to="/disclaimer/" className="hover:text-slate-900 dark:hover:text-white transition-colors">Disclaimer</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600 dark:text-neutral-300 font-medium">
          <p>© {new Date().getFullYear()} Debuggers Technologies Pvt Limited. All rights reserved.</p>
          <p>Product-Based &amp; IT Services · Engineering Web, Mobile, SaaS &amp; Cloud Systems</p>
        </div>
      </div>
    </footer>
  );
}

