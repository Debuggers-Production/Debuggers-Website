import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { blogArticles, BLOG_CATEGORIES } from './src/data/blogData.js';
import { caseStudies } from './src/data/caseStudiesData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.resolve(__dirname, 'dist');
const SITE_URL = 'https://debuggerstechnologies.com';

if (!fs.existsSync(DIST_DIR)) {
  console.error('Error: dist directory does not exist. Run "vite build" first.');
  process.exit(1);
}

const templatePath = path.join(DIST_DIR, 'index.html');
const templateHtml = fs.readFileSync(templatePath, 'utf-8');

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function writeRouteHtml(routePath, { title, description, keywords, canonical, schema, bodyContent }) {
  const cleanPath = routePath.replace(/^\/+|\/+$/g, '');
  const outDir = cleanPath ? path.join(DIST_DIR, cleanPath) : DIST_DIR;
  fs.mkdirSync(outDir, { recursive: true });
  const outFile = path.join(outDir, 'index.html');

  let html = templateHtml;

  // 1. Title tag
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(title)}</title>`);

  // 2. Meta description
  if (description) {
    if (/<meta name="description" content="[^"]*"\s*\/?>/i.test(html)) {
      html = html.replace(/<meta name="description" content="[^"]*"\s*\/?>/i, `<meta name="description" content="${escapeHtml(description)}" />`);
    } else {
      html = html.replace('</head>', `  <meta name="description" content="${escapeHtml(description)}" />\n</head>`);
    }
  }

  // 3. Keywords
  if (keywords) {
    const kwStr = Array.isArray(keywords) ? keywords.join(', ') : keywords;
    if (/<meta name="keywords" content="[^"]*"\s*\/?>/i.test(html)) {
      html = html.replace(/<meta name="keywords" content="[^"]*"\s*\/?>/i, `<meta name="keywords" content="${escapeHtml(kwStr)}" />`);
    }
  }

  // 4. Canonical & Open Graph URL
  const targetCanonical = canonical || `${SITE_URL}/${cleanPath ? `${cleanPath}/` : ''}`;
  html = html.replace(/<meta property="og:url" content="[^"]*"\s*\/?>/i, `<meta property="og:url" content="${escapeHtml(targetCanonical)}" />`);
  html = html.replace(/<meta property="og:title" content="[^"]*"\s*\/?>/i, `<meta property="og:title" content="${escapeHtml(title)}" />`);
  if (description) {
    html = html.replace(/<meta property="og:description" content="[^"]*"\s*\/?>/i, `<meta property="og:description" content="${escapeHtml(description)}" />`);
    html = html.replace(/<meta name="twitter:description" content="[^"]*"\s*\/?>/i, `<meta name="twitter:description" content="${escapeHtml(description)}" />`);
  }
  html = html.replace(/<meta name="twitter:title" content="[^"]*"\s*\/?>/i, `<meta name="twitter:title" content="${escapeHtml(title)}" />`);

  // Canonical tag
  if (!html.includes('<link rel="canonical"')) {
    html = html.replace('</head>', `  <link rel="canonical" href="${escapeHtml(targetCanonical)}" />\n</head>`);
  } else {
    html = html.replace(/<link rel="canonical" href="[^"]*"\s*\/?>/i, `<link rel="canonical" href="${escapeHtml(targetCanonical)}" />`);
  }

  // 5. Schema JSON-LD
  if (schema) {
    const schemaTag = `\n    <script type="application/ld+json">${JSON.stringify(schema)}</script>\n`;
    html = html.replace('</head>', `${schemaTag}</head>`);
  }

  // 6. Injected semantic body inside <div id="root">
  if (bodyContent && cleanPath !== '') {
    html = html.replace(
      '<div id="root"></div>',
      `<div id="root">${bodyContent}</div>`
    );
  }

  fs.writeFileSync(outFile, html, 'utf-8');
  console.log(`  ✓ Pre-rendered: /${cleanPath}`);
}

console.log('Starting static route pre-rendering...');

// 1. Home
writeRouteHtml('/', {
  title: 'Debuggers Technologies | Software Engineering, SaaS Products & Cloud Solutions',
  description: 'Debuggers Technologies builds scalable web applications, mobile apps, backend APIs, cloud infrastructure, and SaaS products including MenuKit and Dauth.',
  canonical: `${SITE_URL}/`,
});

// 2. About Us
writeRouteHtml('/about/', {
  title: 'About Us | Debuggers Technologies',
  description: 'Learn about Debuggers Technologies Pvt Limited—our software engineering expertise, mission, SaaS products, and practical development approach.',
  bodyContent: `
    <main style="max-width:960px;margin:40px auto;padding:0 20px;font-family:system-ui,sans-serif;">
      <h1>About Debuggers Technologies</h1>
      <p>Debuggers Technologies Pvt Limited is a product-based software engineering company headquartered in Madurai, Tamil Nadu, India. We architect in-house SaaS platforms and partner with startups and growing enterprises to design, build, and operate web applications, Flutter mobile apps, backend APIs, and cloud infrastructure.</p>
      <h2>Engineering Pillars</h2>
      <ul>
        <li><strong>Full-Stack Product Delivery:</strong> From UI/UX wireframes to production React frontends, Flutter mobile apps, and FastAPI backends.</li>
        <li><strong>Maintainable Infrastructure:</strong> Docker, PostgreSQL, Redis, and Nginx reverse proxy clusters.</li>
        <li><strong>Security by Design:</strong> Least-privilege firewalls, hashed credentials, and signed JWT session rotation.</li>
        <li><strong>In-House SaaS Innovation:</strong> Operating MenuKit, Dauth, Dwise, and Subakarya.</li>
      </ul>
    </main>
  `,
});

// 3. Contact Us
writeRouteHtml('/contact/', {
  title: 'Contact Us | Debuggers Technologies',
  description: 'Get in touch with Debuggers Technologies Pvt Limited for web development, mobile apps, backend APIs, cloud DevOps, or product inquiries.',
  bodyContent: `
    <main style="max-width:960px;margin:40px auto;padding:0 20px;font-family:system-ui,sans-serif;">
      <h1>Contact Debuggers Technologies</h1>
      <p>Have a software project, technical question, or service inquiry? Reach out to our engineering team.</p>
      <p>Email: <a href="mailto:debuggerstechs@gmail.com">debuggerstechs@gmail.com</a></p>
      <p>Location: Madurai, Tamil Nadu, India</p>
      <p>First response SLA: Less than 7 hours response time for all inquiries.</p>
    </main>
  `,
});

// 4. FAQ
writeRouteHtml('/faq/', {
  title: 'Frequently Asked Questions (FAQ) | Debuggers Technologies',
  description: 'Find answers to common questions about Debuggers Technologies software engineering services, web development, mobile apps, pricing, MenuKit, and technology stacks.',
  bodyContent: `
    <main style="max-width:960px;margin:40px auto;padding:0 20px;font-family:system-ui,sans-serif;">
      <h1>Frequently Asked Questions</h1>
      <p>Clear answers about our development process, technical architecture, SaaS products, pricing models, and team engagement terms.</p>
      <h2>What services do you offer?</h2>
      <p>Full-Stack Web Development, Flutter Mobile Apps, Cloud & DevOps Infrastructure, UI/UX Design, Cyber Security, and AI Integrations.</p>
      <h2>Where are you located?</h2>
      <p>Debuggers Technologies is headquartered in Madurai, Tamil Nadu, India.</p>
      <h2>What is MenuKit?</h2>
      <p>MenuKit is our proprietary digital QR menu and table ordering platform for restaurants and cafes.</p>
      <h2>What is Dauth?</h2>
      <p>Dauth is our unified authentication and identity service providing OAuth 2.0 and JWT token verification.</p>
    </main>
  `,
});

// 5. Products
writeRouteHtml('/products/', {
  title: 'Software Products | Debuggers Technologies',
  description: 'Explore proprietary software products by Debuggers Technologies including MenuKit (restaurant digital QR menu) and Dauth (unified identity platform).',
  bodyContent: `
    <main style="max-width:960px;margin:40px auto;padding:0 20px;font-family:system-ui,sans-serif;">
      <h1>Our Software Products</h1>
      <p>We build, launch, and operate proprietary SaaS platforms designed for real-world business efficiency.</p>
      <ul>
        <li><strong>MenuKit:</strong> Digital QR Menu and table-ordering platform for restaurants and cafes.</li>
        <li><strong>Dauth:</strong> Unified authentication and identity platform for multi-app ecosystems.</li>
        <li><strong>Dwise:</strong> Automated bill management and AI-assisted spend tracker.</li>
        <li><strong>Subakarya:</strong> All-in-one local service booking, order management, and social discovery platform.</li>
      </ul>
    </main>
  `,
});

// 6. MenuKit
writeRouteHtml('/menukit/', {
  title: 'MenuKit — Digital QR Menu & Table Ordering Platform | Debuggers Technologies',
  description: 'MenuKit by Debuggers Technologies: contactless digital QR code menus and table ordering system for modern restaurants, cafes, and food courts.',
  bodyContent: `
    <main style="max-width:960px;margin:40px auto;padding:0 20px;font-family:system-ui,sans-serif;">
      <h1>MenuKit — Contactless Digital QR Menu Platform</h1>
      <p>Replace paper menus with instant, mobile-friendly QR code menus. Update dish availability, prices, and seasonal specials in real time from any browser.</p>
    </main>
  `,
});

// 7. Case Studies
writeRouteHtml('/case-studies/', {
  title: 'Case Studies & Digital Products | Debuggers Technologies',
  description: 'Explore real-world software engineering case studies, product architectures, and technical implementations from Debuggers Technologies.',
  bodyContent: `
    <main style="max-width:960px;margin:40px auto;padding:0 20px;font-family:system-ui,sans-serif;">
      <h1>Project Case Studies &amp; Product Architectures</h1>
      <p>Deep dives into production architectures, backend engineering decisions, and client software implementations.</p>
    </main>
  `,
});

// 8. Individual Case Studies
for (const cs of caseStudies) {
  writeRouteHtml(`/case-studies/${cs.slug}`, {
    title: `${cs.name} — ${cs.tagline} | Debuggers Technologies`,
    description: cs.overview,
    bodyContent: `
      <article style="max-width:960px;margin:40px auto;padding:0 20px;font-family:system-ui,sans-serif;">
        <h1>${escapeHtml(cs.name)} — ${escapeHtml(cs.tagline)}</h1>
        <p><strong>Status:</strong> ${escapeHtml(cs.status)}</p>
        <p>${escapeHtml(cs.overview)}</p>
        <h2>Business Challenge</h2>
        <p>${escapeHtml(cs.businessProblem)}</p>
        <h2>Solution Architecture</h2>
        <p>${escapeHtml(cs.solutionArchitecture)}</p>
        <h2>Technology Stack</h2>
        <p>${escapeHtml(cs.techStack.join(', '))}</p>
        <h2>Key Features</h2>
        <ul>
          ${cs.features.map(f => `<li>${escapeHtml(f)}</li>`).join('')}
        </ul>
        <h2>Implementation Details</h2>
        <p>${escapeHtml(cs.implementationDetails)}</p>
      </article>
    `,
  });
}

// 9. Services
const services = [
  { slug: 'web-development', title: 'Web Development Services', desc: 'Custom high-performance web applications, portals, and full-stack platforms engineered with React, Vite, Tailwind CSS, and FastAPI.' },
  { slug: 'mobile-apps', title: 'Mobile & Desktop App Development', desc: 'Native and cross-platform mobile apps for iOS and Android powered by Flutter, Dart, and high-throughput backend APIs.' },
  { slug: 'cloud-devops', title: 'Cloud & DevOps Infrastructure Services', desc: 'Production Linux VPS setup, Docker containerization, systemd supervision, automated CI/CD pipelines, and Nginx edge proxying.' },
  { slug: 'ui-ux-design', title: 'UI/UX Design & Design Systems', desc: 'Conversion-optimized interfaces, scalable Figma component libraries, and interactive design prototypes.' },
  { slug: 'cyber-security', title: 'Cyber Security & Server Hardening', desc: 'Server vulnerability audits, UFW firewall configurations, JWT/OAuth authentication systems, and least-privilege security.' },
  { slug: 'artificial-intelligence', title: 'AI Solutions & Machine Learning', desc: 'Enterprise LLM integrations, Retrieval-Augmented Generation (RAG), vector databases, and intelligent workflow automation.' },
];

for (const s of services) {
  writeRouteHtml(`/services/${s.slug}`, {
    title: `${s.title} | Debuggers Technologies`,
    description: s.desc,
    bodyContent: `
      <main style="max-width:960px;margin:40px auto;padding:0 20px;font-family:system-ui,sans-serif;">
        <h1>${escapeHtml(s.title)}</h1>
        <p>${escapeHtml(s.desc)}</p>
        <p>Contact Debuggers Technologies at <a href="mailto:debuggerstechs@gmail.com">debuggerstechs@gmail.com</a> to discuss your project requirements.</p>
      </main>
    `,
  });
}

// 10. Legal Pages
writeRouteHtml('/privacy-policy/', {
  title: 'Privacy Policy | Debuggers Technologies',
  description: 'Privacy Policy for Debuggers Technologies (debuggerstechnologies.com), detailing contact form data handling, local storage, and Google AdSense on MenuKit.',
  bodyContent: `
    <main style="max-width:960px;margin:40px auto;padding:0 20px;font-family:system-ui,sans-serif;">
      <h1>Privacy Policy</h1>
      <p>Last updated: May 2026 · Debuggers Technologies Pvt Limited</p>
      <h2>1. Information We Collect</h2>
      <p>When you voluntarily submit an inquiry through our contact form, we collect the details you provide—such as your name, email address, phone number, and project description.</p>
      <h2>2. Browser Storage & Functional Preferences</h2>
      <p>We use browser localStorage to remember your light/dark theme preference.</p>
      <h2>3. Google AdSense & Third-Party Advertising</h2>
      <p>Advertisements provided by Google AdSense are configured to appear exclusively on the public MenuKit landing page (/menukit/) once enabled and approved.</p>
    </main>
  `,
});

writeRouteHtml('/terms-and-conditions/', {
  title: 'Terms and Conditions | Debuggers Technologies',
  description: 'Terms and Conditions governing the use of debuggerstechnologies.com, our technical articles, and software product information.',
  bodyContent: `
    <main style="max-width:960px;margin:40px auto;padding:0 20px;font-family:system-ui,sans-serif;">
      <h1>Terms and Conditions</h1>
      <p>Last updated: May 2026 · Debuggers Technologies Pvt Limited</p>
      <p>By accessing or using debuggerstechnologies.com, you agree to comply with these Terms and Conditions.</p>
    </main>
  `,
});

writeRouteHtml('/disclaimer/', {
  title: 'Disclaimer | Debuggers Technologies',
  description: 'Educational and informational disclaimer for technical tutorials, code examples, and product documentation published on debuggerstechnologies.com.',
  bodyContent: `
    <main style="max-width:960px;margin:40px auto;padding:0 20px;font-family:system-ui,sans-serif;">
      <h1>Disclaimer</h1>
      <p>Last updated: May 2026 · Debuggers Technologies Pvt Limited</p>
      <p>All articles, architecture notes, and configuration examples published in the Debuggers Technologies Technical Blog are provided strictly for educational and informational purposes.</p>
    </main>
  `,
});

// 11. Blog Listing
writeRouteHtml('/blog/', {
  title: 'Technical Blog | Debuggers Technologies',
  description: 'Original engineering guides on Python, FastAPI, PostgreSQL, Docker, Nginx, DevOps, Cloud Computing, Flutter, and scalable backend architectures.',
  keywords: BLOG_CATEGORIES,
  bodyContent: `
    <main style="max-width:960px;margin:40px auto;padding:0 20px;font-family:system-ui,sans-serif;">
      <h1>Debuggers Technologies Technical Blog</h1>
      <p>Practical architecture notes, deployment walkthroughs, and backend engineering guides written by the Debuggers Technologies engineering team.</p>
      <ul>
        ${blogArticles.map(a => `
          <li>
            <a href="/blog/${a.slug}"><strong>${escapeHtml(a.title)}</strong></a>
            <p>${escapeHtml(a.summary)}</p>
          </li>
        `).join('')}
      </ul>
    </main>
  `,
});

// 12. All 15 Blog Articles (Dynamic Pre-rendering with individual titles and deep content!)
for (const article of blogArticles) {
  const articleUrl = `${SITE_URL}/blog/${article.slug}`;

  const sectionsHtml = article.sections.map(sec => `
    <section style="margin-bottom:28px;">
      <h2 style="font-size:1.5rem;font-weight:700;margin:16px 0 8px;">${escapeHtml(sec.heading)}</h2>
      ${sec.paragraphs ? sec.paragraphs.map(p => `<p style="line-height:1.7;margin-bottom:12px;color:#334155;">${escapeHtml(p)}</p>`).join('') : ''}
      ${sec.bullets && sec.bullets.length > 0 ? `
        <ul style="padding-left:24px;line-height:1.7;margin-bottom:12px;color:#334155;">
          ${sec.bullets.map(b => `<li>${escapeHtml(b)}</li>`).join('')}
        </ul>
      ` : ''}
      ${sec.code ? `
        <div style="background:#0f172a;color:#f8fafc;padding:16px;border-radius:12px;overflow-x:auto;margin:16px 0;">
          ${sec.codeLabel ? `<div style="font-size:12px;color:#94a3b8;margin-bottom:8px;">${escapeHtml(sec.codeLabel)}</div>` : ''}
          <pre style="margin:0;font-family:monospace;font-size:13px;line-height:1.5;"><code>${escapeHtml(sec.code)}</code></pre>
        </div>
      ` : ''}
    </section>
  `).join('');

  const bodyContent = `
    <article style="max-width:880px;margin:40px auto;padding:0 20px;font-family:system-ui,sans-serif;">
      <header style="margin-bottom:32px;border-bottom:1px solid #e2e8f0;padding-bottom:24px;">
        <span style="display:inline-block;padding:4px 12px;border-radius:9999px;font-size:12px;font-weight:700;background:rgba(93,114,204,0.15);color:#5D72CC;margin-bottom:12px;">${escapeHtml(article.category)}</span>
        <h1 style="font-size:2.25rem;font-weight:800;line-height:1.25;margin:12px 0;">${escapeHtml(article.title)}</h1>
        <p style="font-size:1.125rem;color:#64748b;line-height:1.6;margin-bottom:16px;">${escapeHtml(article.summary)}</p>
        <p style="font-size:0.875rem;color:#94a3b8;">
          Author: <strong>${escapeHtml(article.author.name)}</strong> (${escapeHtml(article.author.role)}) · Published: ${escapeHtml(article.publishedAt)} · ${escapeHtml(article.readingTime)}
        </p>
      </header>
      <div>
        ${sectionsHtml}
      </div>
    </article>
  `;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.summary,
    articleSection: article.category,
    keywords: article.keywords?.join(', '),
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: {
      '@type': 'Organization',
      name: article.author.name,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Debuggers Technologies Pvt Limited',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: articleUrl,
  };

  writeRouteHtml(`/blog/${article.slug}`, {
    title: `${article.title} | Debuggers Technologies`,
    description: article.summary,
    keywords: article.keywords,
    canonical: articleUrl,
    schema,
    bodyContent,
  });
}

console.log('✓ All routes successfully pre-rendered!');
