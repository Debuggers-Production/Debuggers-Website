import React, { useState, useRef, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { Search, ChevronDown, Check } from 'lucide-react';
import { COUNTRIES } from '../data/countriesData';

/**
 * Reusable searchable country code dropdown.
 * Supports searching by country name, ISO code, or dial code.
 * Rendered via createPortal to prevent parent modal clipping (overflow-hidden / rounded corners).
 */
export default function CountryCodeSelector({
  value = '+91',
  onChange,
  isDark = false,
  className = '',
  buttonStyle = {},
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [coords, setCoords] = useState(null);
  const containerRef = useRef(null);
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  // Find currently selected country
  const selectedCountry = useMemo(() => {
    return COUNTRIES.find((c) => c.code === value) || COUNTRIES[0];
  }, [value]);

  // Filter countries by query (name, code, or ISO)
  const filteredCountries = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return COUNTRIES;
    return COUNTRIES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.code.includes(q) ||
        c.iso.toLowerCase().includes(q)
    );
  }, [query]);

  // Update dropdown portal positioning relative to trigger button
  useEffect(() => {
    if (!isOpen) return;

    const updatePos = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      // If space below is constrained (< 280px) and more space above, open upwards
      const shouldOpenUp = spaceBelow < 280 && spaceAbove > spaceBelow;

      const maxH = shouldOpenUp
        ? Math.min(320, spaceAbove - 20)
        : Math.min(320, spaceBelow - 20);

      setCoords({
        top: shouldOpenUp ? rect.top - maxH - 6 : rect.bottom + 6,
        left: Math.max(12, Math.min(rect.left, window.innerWidth - 296)),
        width: Math.min(288, window.innerWidth - 24),
        maxHeight: maxH,
      });
    };

    updatePos();
    window.addEventListener('resize', updatePos);
    window.addEventListener('scroll', updatePos, true);

    return () => {
      window.removeEventListener('resize', updatePos);
      window.removeEventListener('scroll', updatePos, true);
    };
  }, [isOpen]);

  // Close on outside click (considering both trigger button and portal dropdown)
  useEffect(() => {
    function handleClickOutside(e) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Close on ESC
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') setIsOpen(false);
    }
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleSelect = (c) => {
    onChange?.(c.code);
    setIsOpen(false);
    setQuery('');
  };

  return (
    <div ref={containerRef} className={`relative shrink-0 ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        style={buttonStyle}
        className="flex items-center gap-1.5 px-3 py-3 rounded-xl border text-sm font-semibold transition-all select-none cursor-pointer focus:outline-none"
        aria-label="Select Country Code"
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-xs tracking-wider uppercase px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/10 opacity-80">
          {selectedCountry.iso}
        </span>
        <span className="tracking-tight font-medium">{selectedCountry.code}</span>
        <ChevronDown className={`w-3.5 h-3.5 opacity-60 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Popover Dropdown (Rendered in Portal to escape modal overflow/clipping) */}
      {isOpen && coords && typeof document !== 'undefined' && createPortal(
        <div
          ref={dropdownRef}
          className={`fixed z-[999999] rounded-2xl border shadow-2xl backdrop-blur-2xl flex flex-col overflow-hidden transition-all duration-150 ${
            isDark
              ? 'bg-[#121218]/95 border-white/15 text-white shadow-black/80'
              : 'bg-white/95 border-stone-200 text-stone-900 shadow-stone-400/25'
          }`}
          style={{
            top: coords.top,
            left: coords.left,
            width: coords.width,
            maxHeight: coords.maxHeight,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Search Box */}
          <div className={`p-2.5 border-b shrink-0 ${isDark ? 'border-white/10 bg-white/[0.03]' : 'border-stone-200 bg-stone-50'}`}>
            <div className="relative">
              <input
                ref={searchInputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search country or code..."
                className={`w-full pl-8 pr-3 py-1.5 rounded-lg text-xs outline-none border transition-colors ${
                  isDark
                    ? 'bg-black/60 border-white/10 text-white placeholder-stone-500 focus:border-[#5D72CC]'
                    : 'bg-white border-stone-200 text-stone-900 placeholder-stone-400 focus:border-[#5D72CC]'
                }`}
              />
              <Search className="w-3.5 h-3.5 text-stone-500 dark:text-neutral-300 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none z-10" />
            </div>
          </div>

          {/* Country List */}
          <div
            data-lenis-prevent="true"
            className="overflow-y-auto flex-1 custom-scrollbar divide-y divide-stone-100 dark:divide-white/5 overscroll-contain pr-1"
          >
            {filteredCountries.length === 0 ? (
              <div className="py-6 text-center text-xs text-stone-400">
                No matching country found
              </div>
            ) : (
              filteredCountries.map((c, i) => {
                const isSelected = c.code === value && (selectedCountry.iso === c.iso || !selectedCountry);
                return (
                  <button
                    key={`${c.iso}-${c.code}-${i}`}
                    type="button"
                    onClick={() => handleSelect(c)}
                    className={`w-full flex items-center justify-between px-3 py-2 text-left text-xs transition-colors cursor-pointer ${
                      isSelected
                        ? isDark
                          ? 'bg-[#5D72CC]/25 text-[#7e90db]'
                          : 'bg-[#5D72CC]/10 text-[#5D72CC]'
                        : isDark
                        ? 'hover:bg-white/5 text-neutral-300'
                        : 'hover:bg-stone-100 text-stone-700'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="font-mono text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/10 shrink-0 opacity-80">
                        {c.iso}
                      </span>
                      <span className="font-medium truncate">{c.name}</span>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0 ml-2">
                      <span className="font-mono text-[11px] opacity-75">{c.code}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-[#5D72CC]" />}
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}

