import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

/**
 * Product-reactive ambient themes that cycle automatically.
 * Mild glows derived from Debuggers Technologies SaaS products:
 * - Dauth: #00d4ff (cyan) & #5D72CC (indigo)
 * - MenuKit: #ff6b00 (warm orange) & #f59e0b (amber)
 * - Subakarya: #8b5cf6 (violet) & #ec4899 (magenta)
 * - Dwise: #10b981 (emerald) & #06b6d4 (teal)
 * - Debuggers: #5D72CC (brand blue) & #8b5cf6 (purple)
 */
export const AMBIENT_PRODUCT_THEMES = [
  { id: 'dauth', primary: '#00d4ff', secondary: '#5D72CC', tertiary: '#38bdf8' },
  { id: 'menukit', primary: '#ff6b00', secondary: '#f59e0b', tertiary: '#fb923c' },
  { id: 'subakarya', primary: '#8b5cf6', secondary: '#a855f7', tertiary: '#6366f1' },
  { id: 'dwise', primary: '#10b981', secondary: '#059669', tertiary: '#14b8a6' },
  { id: 'debuggers', primary: '#5D72CC', secondary: '#4355A5', tertiary: '#818cf8' },
];

export default function PageLayout({
  children,
  maxWidth = 'max-w-5xl',
  ambientTheme,
  accentColor,
}) {
  // If ambientTheme is provided (e.g. 'menukit', 'dauth', 'dwise', 'subakarya') or accentColor,
  // lock the ambient background strictly to that product's color (no dynamic cycling).
  const matchedTheme = ambientTheme
    ? AMBIENT_PRODUCT_THEMES.find(
        (t) => t.id.toLowerCase() === ambientTheme.toLowerCase()
      ) || (accentColor ? { id: ambientTheme, primary: accentColor, secondary: accentColor, tertiary: accentColor } : null)
    : (accentColor ? { id: 'custom', primary: accentColor, secondary: accentColor, tertiary: accentColor } : null);

  const isStatic = Boolean(matchedTheme);
  const [themeIndex, setThemeIndex] = useState(0);

  // Automatically cycle through product ambient colors only when NOT locked to a static product
  useEffect(() => {
    if (isStatic) return;
    const timer = setInterval(() => {
      setThemeIndex((prev) => (prev + 1) % AMBIENT_PRODUCT_THEMES.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [isStatic]);

  return (
    <div className="min-h-screen flex flex-col bg-[#eaedf2] dark:bg-black text-stone-900 dark:text-white transition-colors duration-300 relative overflow-hidden">
      {/* Ambient background glow: static product color when inside product/case study, otherwise soft cycle */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        {isStatic && matchedTheme ? (
          <div className="absolute inset-0 pointer-events-none">
            {/* Top-right orb */}
            <div
              className="absolute -top-36 -right-36 w-[580px] h-[580px] rounded-full blur-[140px] opacity-25 dark:opacity-20"
              style={{
                background: `radial-gradient(circle, ${matchedTheme.primary} 0%, ${matchedTheme.secondary} 60%, transparent 80%)`,
              }}
            />

            {/* Center-left orb */}
            <div
              className="absolute top-1/3 -left-40 w-[600px] h-[600px] rounded-full blur-[160px] opacity-20 dark:opacity-15"
              style={{
                background: `radial-gradient(circle, ${matchedTheme.secondary} 0%, ${matchedTheme.tertiary} 50%, transparent 80%)`,
              }}
            />

            {/* Bottom-right orb */}
            <div
              className="absolute -bottom-36 right-1/4 w-[520px] h-[520px] rounded-full blur-[150px] opacity-15 dark:opacity-12"
              style={{
                background: `radial-gradient(circle, ${matchedTheme.tertiary} 0%, ${matchedTheme.primary} 45%, transparent 75%)`,
              }}
            />
          </div>
        ) : (
          AMBIENT_PRODUCT_THEMES.map((theme, i) => {
            const isActive = themeIndex === i;
            return (
              <div
                key={theme.id}
                className="absolute inset-0 transition-opacity duration-[2000ms] ease-in-out pointer-events-none"
                style={{ opacity: isActive ? 1 : 0 }}
              >
                {/* Top-right orb */}
                <div
                  className="absolute -top-36 -right-36 w-[580px] h-[580px] rounded-full blur-[140px] opacity-25 dark:opacity-20"
                  style={{
                    background: `radial-gradient(circle, ${theme.primary} 0%, ${theme.secondary} 60%, transparent 80%)`,
                  }}
                />

                {/* Center-left orb */}
                <div
                  className="absolute top-1/3 -left-40 w-[600px] h-[600px] rounded-full blur-[160px] opacity-20 dark:opacity-15"
                  style={{
                    background: `radial-gradient(circle, ${theme.secondary} 0%, ${theme.tertiary} 50%, transparent 80%)`,
                  }}
                />

                {/* Bottom-right orb */}
                <div
                  className="absolute -bottom-36 right-1/4 w-[520px] h-[520px] rounded-full blur-[150px] opacity-15 dark:opacity-12"
                  style={{
                    background: `radial-gradient(circle, ${theme.tertiary} 0%, ${theme.primary} 45%, transparent 75%)`,
                  }}
                />
              </div>
            );
          })
        )}
      </div>

      <Navbar />
      <main className={`flex-1 w-full ${maxWidth} mx-auto px-5 sm:px-8 pt-28 sm:pt-32 pb-20 relative z-10`}>
        {children}
      </main>
      <Footer />
    </div>
  );
}

