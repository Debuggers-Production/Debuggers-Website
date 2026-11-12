import { useEffect } from 'react';

const SITE_URL = 'https://debuggerstechnologies.com';
const DEFAULT_IMAGE = `${SITE_URL}/logo.png`;

function upsertMeta(attr, key, content) {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/**
 * Updates document metadata, canonical URL, Open Graph, Twitter cards, and JSON-LD structured data.
 */
export default function SeoHead({
  title,
  description,
  keywords = '',
  path = '/',
  type = 'website',
  image = DEFAULT_IMAGE,
  noIndex = false,
  schema = null,
}) {
  const keywordsContent = Array.isArray(keywords) ? keywords.join(', ') : keywords;

  useEffect(() => {
    const canonical = `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
    if (title) document.title = title;
    if (description) upsertMeta('name', 'description', description);
    if (keywordsContent) upsertMeta('name', 'keywords', keywordsContent);
    upsertLink('canonical', canonical);

    upsertMeta('name', 'robots', noIndex ? 'noindex, nofollow' : 'index, follow');

    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', canonical);
    upsertMeta('property', 'og:type', type);
    upsertMeta('property', 'og:image', image);

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', image);

    const existingScript = document.head.querySelector('script[data-seo-schema="true"]');
    if (existingScript) existingScript.remove();

    if (schema) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-seo-schema', 'true');
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    }

    return () => {
      const s = document.head.querySelector('script[data-seo-schema="true"]');
      if (s) s.remove();
    };
  }, [title, description, keywordsContent, path, type, image, noIndex, schema]);

  return null;
}

