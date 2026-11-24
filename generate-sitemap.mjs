import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { blogArticles } from './src/data/blogData.js';
import { caseStudies } from './src/data/caseStudiesData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SITE_URL = 'https://debuggerstechnologies.com';

const routes = [
  { loc: '/', priority: '1.0', changefreq: 'weekly', lastmod: '2026-11-24' },
  { loc: '/about/', priority: '0.8', changefreq: 'monthly', lastmod: '2026-11-24' },
  { loc: '/contact/', priority: '0.8', changefreq: 'monthly', lastmod: '2026-11-24' },
  { loc: '/faq/', priority: '0.8', changefreq: 'monthly', lastmod: '2026-11-24' },
  { loc: '/products/', priority: '0.9', changefreq: 'weekly', lastmod: '2026-11-24' },
  { loc: '/menukit/', priority: '0.9', changefreq: 'weekly', lastmod: '2026-11-24' },
  { loc: '/case-studies/', priority: '0.9', changefreq: 'weekly', lastmod: '2026-11-24' },
];

// Add case studies
for (const cs of caseStudies) {
  routes.push({
    loc: `/case-studies/${cs.slug}`,
    priority: '0.8',
    changefreq: 'monthly',
    lastmod: '2026-11-24',
  });
}

// Add blog listing
routes.push({ loc: '/blog/', priority: '0.9', changefreq: 'weekly', lastmod: '2026-11-24' });

// Add all 15 blog articles with their specific updatedAt / publishedAt
for (const article of blogArticles) {
  routes.push({
    loc: `/blog/${article.slug}`,
    priority: '0.8',
    changefreq: 'monthly',
    lastmod: article.updatedAt || article.publishedAt,
  });
}

// Add services
const services = [
  'web-development',
  'ui-ux-design',
  'cloud-devops',
  'mobile-apps',
  'cyber-security',
  'artificial-intelligence',
];
for (const s of services) {
  routes.push({
    loc: `/services/${s}`,
    priority: '0.8',
    changefreq: 'monthly',
    lastmod: '2026-11-24',
  });
}

// Legal
routes.push({ loc: '/privacy-policy/', priority: '0.5', changefreq: 'yearly', lastmod: '2026-11-24' });
routes.push({ loc: '/terms-and-conditions/', priority: '0.5', changefreq: 'yearly', lastmod: '2026-11-24' });
routes.push({ loc: '/disclaimer/', priority: '0.5', changefreq: 'yearly', lastmod: '2026-11-24' });

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) => `  <url>
    <loc>${SITE_URL}${r.loc}</loc>
    <lastmod>${r.lastmod}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

const publicPath = path.resolve(__dirname, 'public', 'sitemap.xml');
fs.writeFileSync(publicPath, sitemapXml, 'utf-8');
console.log('✓ Generated public/sitemap.xml (Total URLs:', routes.length, ')');

const distPath = path.resolve(__dirname, 'dist', 'sitemap.xml');
if (fs.existsSync(path.resolve(__dirname, 'dist'))) {
  fs.writeFileSync(distPath, sitemapXml, 'utf-8');
  console.log('✓ Generated dist/sitemap.xml');
}
