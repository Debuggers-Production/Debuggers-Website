import React, { useEffect, useRef, useState } from 'react';

const DEFAULT_CLIENT = import.meta.env.VITE_ADSENSE_CLIENT || 'ca-pub-3222424909905554';
const DEFAULT_SLOT = import.meta.env.VITE_ADSENSE_SLOT || '';
const ADSENSE_ENABLED = import.meta.env.VITE_ADSENSE_ENABLED === 'true';

/**
 * Manual responsive Google AdSense unit.
 * Intended exclusively for the public Menukit landing page (/menukit/).
 * Does not load scripts or initialize ads unless VITE_ADSENSE_ENABLED=true and a slot ID is configured.
 */
export default function AdSenseUnit({
  slot = DEFAULT_SLOT,
  client = DEFAULT_CLIENT,
  format = 'auto',
  className = '',
}) {
  const adRef = useRef(null);
  const pushedRef = useRef(false);
  const [adError, setAdError] = useState(false);

  const canRenderLiveAd = Boolean(ADSENSE_ENABLED && client && slot);

  useEffect(() => {
    if (!canRenderLiveAd || pushedRef.current) return;

    const existingScript = document.querySelector('script[data-adsense-menukit="true"]');
    const initAd = () => {
      if (pushedRef.current || !adRef.current) return;
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        pushedRef.current = true;
      } catch {
        setAdError(true);
      }
    };

    if (!existingScript) {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(client)}`;
      script.crossOrigin = 'anonymous';
      script.setAttribute('data-adsense-menukit', 'true');
      script.onload = initAd;
      script.onerror = () => setAdError(true);
      document.head.appendChild(script);
    } else {
      initAd();
    }
  }, [canRenderLiveAd, client, slot]);

  if (!canRenderLiveAd || adError) {
    return (
      <aside
        aria-label="Advertisement"
        className={`my-8 rounded-2xl border border-dashed border-stone-300 dark:border-white/15 bg-stone-100/70 dark:bg-white/[0.03] px-6 py-8 text-center ${className}`}
      >
        <p className="text-[11px] font-bold tracking-widest uppercase text-stone-400 dark:text-neutral-500 mb-1">
          Sponsored Placement
        </p>
        <p className="text-xs text-stone-500 dark:text-neutral-400">
          {adError
            ? 'Advertisement is currently unavailable.'
            : 'Ad unit reserved for MenuKit public landing page once Google AdSense is activated.'}
        </p>
      </aside>
    );
  }

  return (
    <aside
      aria-label="Advertisement"
      className={`my-8 rounded-2xl border border-stone-200 dark:border-white/10 bg-white/60 dark:bg-white/[0.02] p-4 ${className}`}
    >
      <p className="text-[10px] font-bold tracking-widest uppercase text-stone-400 dark:text-neutral-500 mb-2 text-center">
        Advertisement
      </p>
      <ins
        ref={adRef}
        className="adsbygoogle block w-full"
        style={{ display: 'block' }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </aside>
  );
}

