export const caseStudies = [
  {
    slug: 'menukit',
    name: 'MenuKit',
    tagline: 'Digital QR Menu & Table Ordering Platform for Restaurants and Cafes',
    status: 'Live Product',
    liveUrl: 'https://debuggerstechnologies.com/menukit/',
    logo: '/products/menukit-icon.png',
    accent: '#ff6b00',
    overview:
      'MenuKit is a web-based digital menu and table ordering platform built by Debuggers Technologies for restaurants, cafes, and quick-service food businesses. Instead of reprinting paper menus whenever prices or availability change, venues generate table-specific QR codes that open a fast, mobile-friendly menu.',
    businessProblem:
      'Independent restaurants and cafes frequently deal with outdated printed menus, high reprinting costs for seasonal items, slow table-side order taking during peak hours, and friction when customers need to ask staff about item availability or specials.',
    solutionArchitecture:
      'MenuKit separates the customer-facing QR menu experience from the restaurant management dashboard. Public menu pages are optimized for instant mobile rendering over cellular connections, while the merchant dashboard manages categories, item availability toggles, pricing, and table QR generation.',
    techStack: ['React', 'Vite', 'Tailwind CSS', 'FastAPI', 'PostgreSQL', 'Nginx', 'Docker'],
    features: [
      'Instant QR code generation per table or dining zone',
      'Real-time item availability toggles (mark items sold out immediately)',
      'Category filtering, dietary tags, and search on mobile devices',
      'Zero app installation required—opens directly in any mobile browser',
      'Centralized merchant dashboard for menu, pricing, and category updates',
    ],
    implementationDetails:
      'Menu payloads are structured around normalized categories and menu items with lightweight image delivery and HTTP caching headers via Nginx. Table identifiers are encoded as clean URL parameters so scanning a QR code routes directly to the venue menu with table context.',
    resultsNote:
      'MenuKit is actively deployed in production at debuggerstechnologies.com/menukit/ for restaurant and cafe onboarding.',
  },
  {
    slug: 'dauth',
    name: 'Dauth',
    tagline: 'Unified Authentication & Identity Platform for Multi-App Ecosystems',
    status: 'Live Product',
    liveUrl: 'https://dauth.debuggerstechnologies.com',
    logo: '/products/dauth-icon.png',
    accent: '#00d4ff',
    overview:
      'Dauth is a centralized authentication and identity service developed by Debuggers Technologies to provide consistent sign-in, token issuance, and session management across multiple web and mobile applications.',
    businessProblem:
      'Building separate login, password reset, token rotation, and role-checking logic inside every new microservice or SaaS product duplicates security-critical code and increases the risk of subtle authentication bugs.',
    solutionArchitecture:
      'Dauth acts as a dedicated identity provider issuing short-lived signed access tokens alongside refresh token rotation. Downstream services validate tokens statelessly using public/shared verification rules while relying on Dauth for user registration, credential verification, and session revocation.',
    techStack: ['Python', 'FastAPI', 'PostgreSQL', 'Redis', 'JWT', 'Docker', 'Nginx'],
    features: [
      'Centralized user sign-up, login, and credential verification',
      'Short-lived JWT access tokens paired with refresh token rotation',
      'Session tracking and revocation backed by fast key-value storage',
      'Role and permission claims scoped per client application',
      'Consistent API responses for web and mobile clients',
    ],
    implementationDetails:
      'Password hashes use modern adaptive hashing, while active refresh sessions and rate-limit counters are stored in Redis for sub-millisecond lookup. FastAPI dependency injection enforces token validation and scope checks cleanly across protected endpoints.',
    resultsNote:
      'Dauth is live at dauth.debuggerstechnologies.com and serves as the shared authentication backbone for internal and client applications.',
  },
  {
    slug: 'dwise',
    name: 'Dwise',
    tagline: 'Automated Bill Management & AI-Assisted Spend Tracker',
    status: 'In Development',
    liveUrl: null,
    logo: '/products/dwise-icon.png',
    accent: '#10b981',
    overview:
      'Dwise is an upcoming personal spend and receipt management application designed to replace scattered WhatsApp bill messages and manual expense spreadsheets with a single organized ledger.',
    businessProblem:
      'Everyday purchases across retail stores, pharmacies, and grocery shops increasingly generate digital receipts sent over messaging apps, creating notification clutter and making it hard to search past purchases or track household spending.',
    solutionArchitecture:
      'Dwise ingests structured invoices and receipt items into a searchable personal ledger, categorizing line items automatically. An AI query layer sits on top of the structured purchase history so users can ask natural-language questions about what they bought.',
    techStack: ['Flutter', 'Python', 'FastAPI', 'PostgreSQL', 'LLM Integration'],
    features: [
      'Automatic bill and invoice collection in one organized inbox',
      'Line-item parsing for groceries, retail, and recurring expenses',
      'Natural-language Q&A (e.g., "What did I buy yesterday?" or recipe ideas from recent groceries)',
      'Category-wise monthly spend summaries without manual data entry',
    ],
    implementationDetails:
      'Receipt line items are normalized into structured database records with merchant metadata, timestamps, and item categories. Natural-language queries are grounded strictly against the user’s retrieved purchase records to avoid hallucinated items.',
    resultsNote:
      'Dwise is currently in active development by the Debuggers Technologies product team.',
  },
  {
    slug: 'subakarya',
    name: 'Subakarya',
    tagline: 'All-in-One Service Booking, Order Management & Social Discovery Platform',
    status: 'In Development',
    liveUrl: null,
    logo: null,
    accent: '#8b5cf6',
    overview:
      'Subakarya is an integrated business and social discovery platform built for local service providers and merchants who want to manage bookings or orders and publish short-form updates without maintaining a separate website and ad stack.',
    businessProblem:
      'Small and medium service businesses often juggle a booking tool, an order tracker, a standalone website, and separate social media accounts—paying for ads just to drive traffic between disconnected systems.',
    solutionArchitecture:
      'Subakarya combines a structured storefront (supporting both appointment-based bookings and order-based services) with a native reels and stories feed. Public business profiles and posts are structured with clean semantic URLs and metadata for organic search discovery.',
    techStack: ['React', 'Flutter', 'FastAPI', 'PostgreSQL', 'Redis', 'Docker'],
    features: [
      'Unified workflow for booking-based and order-based services',
      'Built-in reels and stories feed for organic customer engagement',
      'SEO-structured public business profiles without building a custom website',
      'Direct customer-to-business inquiry and order tracking',
    ],
    implementationDetails:
      'The backend models service catalogs, time-slot availability, and media posts under a unified tenant schema, enabling instant transitions from viewing a reel or story to booking a slot or placing an order.',
    resultsNote:
      'Subakarya is currently in active development at Debuggers Technologies.',
  },
];

