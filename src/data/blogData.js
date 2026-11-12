export const BLOG_CATEGORIES = [
  'Python Development',
  'FastAPI',
  'Backend Development',
  'Database Engineering',
  'DevOps',
  'Docker',
  'Cloud Computing',
  'Flutter Development',
  'Software Architecture',
  'Artificial Intelligence',
];

export const blogArticles = [
  {
    slug: 'how-to-deploy-fastapi-on-ubuntu-vps-using-nginx',
    title: 'How to Deploy FastAPI on Ubuntu VPS Using Nginx',
    category: 'FastAPI',
    tags: ['FastAPI', 'DevOps', 'Python Development'],
    keywords: [
      'deploy FastAPI on Ubuntu VPS',
      'FastAPI Nginx reverse proxy',
      'Gunicorn UvicornWorker systemd',
      'FastAPI production deployment',
      'Ubuntu 24.04 FastAPI Certbot HTTPS',
      'Python ASGI server setup',
    ],
    author: {
      name: 'Debuggers Technologies Engineering',
      role: 'Backend & Infrastructure Team',
    },
    publishedAt: '2026-11-12',
    updatedAt: '2026-11-12',
    readingTime: '12 min read',
    summary:
      'A complete production guide to deploying FastAPI on an Ubuntu VPS using Gunicorn, Uvicorn workers, systemd process supervision, Nginx reverse proxying, and Certbot HTTPS.',
    sections: [
      {
        id: 'why-process-manager-and-reverse-proxy',
        heading: 'Why Uvicorn Alone Is Not Enough in Production',
        paragraphs: [
          'Running uvicorn main:app --reload is convenient on a local development machine, but it is unsafe and fragile in production. The --reload flag watches files for changes and restarts the process, adding unnecessary CPU overhead and memory churn. More importantly, a single Uvicorn process cannot automatically recover if the server reboots, cannot utilize multiple CPU cores efficiently, and should never be exposed directly to untrusted internet traffic.',
          'In a production Linux environment, each layer has a focused responsibility. Gunicorn acts as the master process manager that spawns and supervises multiple Uvicorn ASGI worker processes across CPU cores. systemd ensures the Gunicorn master starts on boot, restarts on failure, and streams structured logs to journald. Finally, Nginx sits at the edge to terminate TLS/HTTPS, buffer slow client connections, enforce upload limits, and proxy clean HTTP requests to your private loopback socket.',
        ],
        bullets: [
          'Process supervision: systemd automatically restarts crashed services and starts them on OS reboot.',
          'Multi-core concurrency: Gunicorn manages multiple UvicornWorker processes without blocking the event loop.',
          'Edge security & TLS: Nginx handles HTTPS certificates, rate limiting, gzip compression, and header sanitization.',
          'Private application binding: FastAPI listens only on 127.0.0.1:8000, unreachable from outside the host.',
        ],
      },
      {
        id: 'prepare-python-environment',
        heading: '1. Prepare a Dedicated User and Virtual Environment',
        paragraphs: [
          'Never run your web application as the root user. Creating a dedicated system user with no interactive login shell limits the blast radius if a dependency vulnerability is ever exploited. Keep your application code and virtual environment under /opt or /srv with strict ownership.',
          'Pin your dependencies in a requirements.txt or pyproject.toml lockfile before deploying so production never surprises you with an untested minor release. Always install uvicorn[standard] so uvloop and httptools are compiled and active for high-throughput async I/O.',
        ],
        codeLabel: 'Ubuntu 22.04 / 24.04 user and virtualenv setup',
        code: `sudo apt update && sudo apt install -y python3-venv python3-pip nginx certbot python3-certbot-nginx
sudo adduser --system --group --no-create-home fastapi
sudo mkdir -p /opt/myapi && sudo chown -R fastapi:fastapi /opt/myapi

cd /opt/myapi
sudo -u fastapi python3 -m venv .venv
sudo -u fastapi /opt/myapi/.venv/bin/pip install --upgrade pip
sudo -u fastapi /opt/myapi/.venv/bin/pip install fastapi "uvicorn[standard]" gunicorn`,
      },
      {
        id: 'systemd-service-unit',
        heading: '2. Manage Workers and Environment Variables With systemd',
        paragraphs: [
          'Store secrets such as database URLs, JWT signing keys, and third-party API tokens in a root-owned environment file (/etc/myapi.env with chmod 600) rather than committing .env files into Git or hardcoding them inside unit files. systemd loads this file cleanly via EnvironmentFile.',
          'For worker sizing, a reliable starting formula for mixed I/O and CPU FastAPI workloads is (2 * CPU_CORES) + 1, or simply 1 worker per core if your endpoints are mostly async database and HTTP calls. Adding --max-requests and --max-requests-jitter periodically recycles workers to guard against slow memory growth in C-extension libraries.',
        ],
        codeLabel: 'Production systemd unit (/etc/systemd/system/myapi.service)',
        code: `[Unit]
Description=FastAPI Application Service
After=network.target postgresql.service

[Service]
User=fastapi
Group=fastapi
WorkingDirectory=/opt/myapi
EnvironmentFile=/etc/myapi.env
Environment="PATH=/opt/myapi/.venv/bin"
ExecStart=/opt/myapi/.venv/bin/gunicorn main:app \\
  --workers 4 \\
  --worker-class uvicorn.workers.UvicornWorker \\
  --bind 127.0.0.1:8000 \\
  --timeout 60 \\
  --graceful-timeout 30 \\
  --max-requests 1000 \\
  --max-requests-jitter 100 \\
  --access-logfile - \\
  --error-logfile -
Restart=always
RestartSec=3

[Install]
WantedBy=multi-user.target`,
      },
      {
        id: 'configure-nginx-proxy',
        heading: '3. Configure Nginx as a Reverse Proxy With HTTPS',
        paragraphs: [
          'Nginx forwards incoming HTTP/HTTPS traffic to 127.0.0.1:8000 while preserving Host, X-Real-IP, X-Forwarded-For, and X-Forwarded-Proto headers. Passing X-Forwarded-Proto is especially critical when your FastAPI app generates pagination links, OAuth callback URLs, or HSTS/redirect responses.',
          'Set client_max_body_size explicitly if your API accepts file uploads (Nginx defaults to 1 MB and returns 413 Request Entity Too Large otherwise). If your FastAPI app uses WebSockets or Server-Sent Events, include proxy_http_version 1.1 and Upgrade/Connection headers.',
        ],
        codeLabel: 'Nginx server block (/etc/nginx/sites-available/myapi)',
        code: `server {
    listen 80;
    server_name api.example.com;

    client_max_body_size 20M;

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 60s;
    }
}`,
      },
      {
        id: 'zero-downtime-and-verification',
        heading: '4. Enabling, Issuing TLS, and Post-Deployment Verification',
        paragraphs: [
          'Once both files are in place, enable and start the systemd unit, symlink the Nginx configuration into sites-enabled, validate syntax with nginx -t, and reload Nginx. Then run Certbot to issue a free Let’s Encrypt TLS certificate and configure automatic renewal.',
          'To support zero-downtime code deployments, pull your updated code, run database migrations, and send a graceful reload (systemctl reload-or-restart myapi) while monitoring journalctl logs for startup errors or failed health checks.',
        ],
        bullets: [
          'Verify service health: sudo systemctl status myapi and sudo journalctl -u myapi -n 50 --no-pager.',
          'Verify local binding: curl -I http://127.0.0.1:8000/health should return HTTP/1.1 200 OK.',
          'Verify Nginx syntax: sudo nginx -t && sudo systemctl reload nginx.',
          'Issue HTTPS certificate: sudo certbot --nginx -d api.example.com --redirect.',
          'Verify Certbot auto-renewal timer: sudo certbot renew --dry-run.',
        ],
      },
    ],
  },
  {
    slug: 'postgresql-vs-mongodb-when-should-developers-use-each',
    title: 'PostgreSQL vs MongoDB: When Should Developers Use Each?',
    category: 'Database Engineering',
    tags: ['Database Engineering', 'Backend Development', 'Software Architecture'],
    keywords: [
      'PostgreSQL vs MongoDB',
      'SQL vs NoSQL database comparison',
      'PostgreSQL JSONB GIN index',
      'ACID transactions vs document model',
      'when to use PostgreSQL or MongoDB',
      'relational vs document database architecture',
    ],
    author: {
      name: 'Debuggers Technologies Engineering',
      role: 'Data & Backend Architecture',
    },
    publishedAt: '2026-11-12',
    updatedAt: '2026-11-12',
    readingTime: '11 min read',
    summary:
      'A deep engineering comparison of PostgreSQL and MongoDB across data modeling, ACID transactions, indexing, scaling patterns, and hybrid JSONB workloads.',
    sections: [
      {
        id: 'core-data-model-difference',
        heading: 'Relational Tables vs BSON Documents',
        paragraphs: [
          'The fundamental difference between PostgreSQL and MongoDB is not performance—it is how your application models and queries relationships. PostgreSQL organizes data into normalized tables with strict column types, foreign key constraints, and declarative SQL joins. Every row conforms to a known contract enforced by the database engine itself.',
          'MongoDB stores self-contained BSON (Binary JSON) documents inside collections. Related child data—such as an order and its line items, or a blog post and its metadata—can be embedded inside a single document so the entire aggregate can be fetched in one disk read without joins.',
        ],
      },
      {
        id: 'when-postgresql-fits-best',
        heading: 'When PostgreSQL Is the Stronger Choice',
        paragraphs: [
          'Choose PostgreSQL whenever your business logic depends on multi-entity integrity, financial accuracy, or ad-hoc analytical queries. Billing systems, SaaS multi-tenant platforms, inventory ledgers, and booking engines almost always have interconnected entities: users, organizations, roles, invoices, payments, and audit logs.',
          'A common myth is that PostgreSQL cannot handle flexible schemas. In reality, PostgreSQL JSONB columns combined with GIN indexes let you store arbitrary per-tenant settings or dynamic form fields alongside strongly typed relational columns, giving you the best of both worlds without sacrificing foreign keys.',
        ],
        codeLabel: 'PostgreSQL schema combining strict relational integrity with JSONB',
        code: `CREATE TABLE invoices (
  id BIGSERIAL PRIMARY KEY,
  customer_id BIGINT NOT NULL REFERENCES customers(id) ON DELETE RESTRICT,
  status TEXT NOT NULL CHECK (status IN ('draft', 'issued', 'paid', 'void')),
  total_cents INTEGER NOT NULL CHECK (total_cents >= 0),
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_invoices_customer_status ON invoices (customer_id, status);
CREATE INDEX idx_invoices_metadata_gin ON invoices USING GIN (metadata);`,
      },
      {
        id: 'when-mongodb-fits-best',
        heading: 'When MongoDB Makes Sense',
        paragraphs: [
          'MongoDB shines when your data is naturally hierarchical, self-contained, and polymorphic—meaning different records in the same collection legitimately have different shapes. Examples include e-commerce product catalogs where a laptop has CPU/RAM specs while a shirt has fabric/size attributes, headless CMS page trees, and IoT telemetry payloads.',
          'It also fits write-heavy ingestion pipelines where records are appended and queried by primary key or time window, and where horizontal sharding across commodity nodes is planned early in the product lifecycle.',
        ],
        bullets: [
          'Polymorphic catalogs: records have wildly varying attribute structures per category.',
          'Document-centric CMS: pages, sections, and localized content blocks fetched as one tree.',
          'Event & telemetry streams: high-throughput writes queried by device ID and timestamp.',
          'Built-in replica sets & sharding: horizontal write scaling when a single primary node saturates.',
        ],
      },
      {
        id: 'transactions-joins-and-consistency',
        heading: 'Transactions, Joins, and Common Pitfalls',
        paragraphs: [
          'Modern MongoDB supports multi-document ACID transactions, but they carry higher latency and operational complexity than single-document atomic updates. Designing a good MongoDB schema requires modeling around your exact read/write access patterns from day one—if you end up relying heavily on $lookup (MongoDB’s join operator), you are fighting the document model.',
          'Conversely, teams using PostgreSQL sometimes over-normalize trivial metadata into dozens of tiny lookup tables, slowing down reads. Keep core entities normalized, use composite indexes intentionally, and use JSONB for genuinely sparse or dynamic attributes.',
        ],
      },
      {
        id: 'practical-decision-rule',
        heading: 'A Practical Decision Checklist for Teams',
        paragraphs: [
          'If you are building a typical SaaS, fintech, marketplace, or business operations platform and are unsure which database to pick, default to PostgreSQL. Its ecosystem—including pgvector for AI embeddings, PostGIS for geospatial queries, partitioning, and rock-solid backups—covers 90% of production workloads cleanly.',
          'Pick MongoDB deliberately when you have clear document boundaries, minimal cross-collection joins, and high schema variability that maps directly to BSON documents.',
        ],
      },
    ],
  },
  {
    slug: 'understanding-docker-networking-between-multiple-containers',
    title: 'Understanding Docker Networking Between Multiple Containers',
    category: 'Docker',
    tags: ['Docker', 'DevOps', 'Backend Development'],
    keywords: [
      'Docker networking tutorial',
      'Docker Compose bridge network',
      'Docker embedded DNS 127.0.0.11',
      'isolate database container network',
      'Docker localhost connection refused fix',
      'multi-container Docker communication',
    ],
    author: {
      name: 'Debuggers Technologies Engineering',
      role: 'Infrastructure Team',
    },
    publishedAt: '2026-11-12',
    updatedAt: '2026-11-12',
    readingTime: '10 min read',
    summary:
      'A practical breakdown of Docker bridge networks, embedded DNS resolution, network segmentation in Compose, port publishing, and debugging container connectivity.',
    sections: [
      {
        id: 'default-bridge-vs-custom-bridge',
        heading: 'Default Bridge vs User-Defined Bridge Networks',
        paragraphs: [
          'When you run containers with docker run without specifying a network, Docker attaches them to the default bridge network (bridge / docker0). On the default bridge, containers can only communicate using raw IP addresses—which change whenever a container restarts—and automatic DNS name resolution is disabled.',
          'By contrast, when you create a user-defined bridge network (docker network create app_net) or launch a stack with Docker Compose, Docker automatically runs an embedded DNS server at 127.0.0.11 inside each container. Any container on that network can reach another container simply by its service name, such as db, redis, or auth-api.',
        ],
      },
      {
        id: 'compose-network-isolation',
        heading: 'Isolating Public and Internal Traffic With Multiple Networks',
        paragraphs: [
          'Production stacks should never place every container on a single flat network with exposed database ports. Instead, separate your topology into a public_net (shared between Nginx and your API) and an internal-only private_net (shared between your API, PostgreSQL, and Redis).',
          'Marking private_net with internal: true prevents containers on that network from initiating outbound internet traffic or being reachable from external hosts, dramatically reducing exposure if an internal component is misconfigured.',
        ],
        codeLabel: 'Docker Compose dual-network segmentation pattern',
        code: `services:
  nginx:
    image: nginx:1.27-alpine
    ports:
      - "80:80"
      - "443:443"
    networks:
      - public_net
    depends_on:
      - api

  api:
    image: my-api:latest
    environment:
      DATABASE_URL: postgres://app:secret@db:5432/appdb
      REDIS_URL: redis://redis:6379/0
    networks:
      - public_net
      - private_net
    depends_on:
      db:
        condition: service_healthy

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: app
      POSTGRES_PASSWORD: secret
      POSTGRES_DB: appdb
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U app -d appdb"]
      interval: 5s
      timeout: 5s
      retries: 5
    networks:
      - private_net

  redis:
    image: redis:7-alpine
    networks:
      - private_net

networks:
  public_net:
  private_net:
    internal: true`,
      },
      {
        id: 'localhost-pitfall',
        heading: 'The Common localhost and Port Publishing Mistakes',
        paragraphs: [
          'Inside a container, localhost (127.0.0.1) always refers to that container’s own network namespace—never the host machine and never sibling containers. If your API tries to connect to postgres://localhost:5432 inside Docker, it will fail with Connection Refused because Postgres is running in a separate container.',
          'Similarly, remember the difference between EXPOSE and ports. EXPOSE is purely metadata documentation; containers on the same Docker network can already reach each other on any listening port without ports: mapping. Only use ports: (preferably bound to 127.0.0.1:8000:8000) when the host machine itself needs direct access.',
        ],
        bullets: [
          'Use service names (db, redis) instead of localhost or hardcoded container IPs.',
          'Use ports: ["127.0.0.1:5432:5432"] instead of "5432:5432" if you only need local SSH tunnel access—otherwise UFW rules can be bypassed by Docker iptables.',
          'Use depends_on with service_healthy so your API waits until Postgres is actually accepting connections, not merely started.',
        ],
      },
      {
        id: 'debugging-container-networks',
        heading: 'Debugging Connectivity Between Containers',
        paragraphs: [
          'When two containers fail to talk, inspect the network first rather than guessing. Running docker network inspect <network_name> shows every attached container, its assigned IP, and its DNS aliases.',
          'From inside a running container, you can test DNS resolution and TCP reachability with getent hosts db or curl -v http://api:8000/health. If DNS fails, verify both containers belong to the exact same user-defined network.',
        ],
        codeLabel: 'Quick Docker network inspection commands',
        code: `docker network ls
docker network inspect myproject_private_net
docker compose exec api getent hosts db
docker compose exec api nc -zv db 5432`,
      },
    ],
  },
  {
    slug: 'building-jwt-authentication-using-fastapi',
    title: 'Building JWT Authentication Using FastAPI',
    category: 'FastAPI',
    tags: ['FastAPI', 'Python Development', 'Backend Development'],
    keywords: [
      'FastAPI JWT authentication',
      'PyJWT FastAPI OAuth2PasswordBearer',
      'FastAPI Argon2 password hashing',
      'short-lived access token refresh rotation',
      'FastAPI RBAC role based access control',
      'Python REST API authentication best practices',
    ],
    author: {
      name: 'Debuggers Technologies Engineering',
      role: 'Security & Identity Team',
    },
    publishedAt: '2026-11-12',
    updatedAt: '2026-11-12',
    readingTime: '13 min read',
    summary:
      'A production-ready guide to password hashing with Argon2/bcrypt, short-lived JWT access tokens, refresh token rotation, and FastAPI dependency injection.',
    sections: [
      {
        id: 'access-vs-refresh-tokens',
        heading: 'Why Access Tokens Must Be Short-Lived',
        paragraphs: [
          'JSON Web Tokens (JWTs) are self-contained signed tokens. Because the server validates them cryptographically without hitting a database on every request, they scale effortlessly across stateless API instances. However, that same statelessness means you cannot instantly revoke a leaked access token without maintaining a blocklist.',
          'To balance performance and security, keep JWT access tokens short-lived (10 to 15 minutes) and pair them with a longer-lived refresh token stored in an HttpOnly, Secure, SameSite cookie (for web apps) or encrypted device storage (for mobile apps). When the access token expires, the client exchanges the refresh token for a new pair, allowing you to revoke sessions server-side at refresh time.',
        ],
      },
      {
        id: 'password-hashing',
        heading: '1. Hash Passwords Properly Before Issuing Tokens',
        paragraphs: [
          'Never store plaintext passwords or use fast hashes like SHA-256. Always use a memory-hard password hashing algorithm such as Argon2id (via argon2-cffi or pwdlib) or bcrypt, which automatically handles per-password random salting and resists GPU brute-force attacks.',
        ],
        codeLabel: 'Password hashing helper using pwdlib (Argon2)',
        code: `from pwdlib import PasswordHash

password_hash = PasswordHash.recommended()

def hash_password(plain: str) -> str:
    return password_hash.hash(plain)

def verify_password(plain: str, hashed: str) -> bool:
    return password_hash.verify(plain, hashed)`,
      },
      {
        id: 'token-creation-and-verification',
        heading: '2. Signing and Verifying JWTs in FastAPI',
        paragraphs: [
          'Load your signing key from environment variables and fail fast at startup if it is missing. Always explicitly pass algorithms=[ALGORITHM] to jwt.decode() to prevent algorithm-confusion attacks, and validate standard claims like exp (expiration) and sub (subject).',
          'FastAPI’s Depends() system makes route protection declarative: any endpoint that declares current_user: str = Depends(get_current_user) automatically enforces Bearer token validation and surfaces clean OpenAPI security schemas in /docs.',
        ],
        codeLabel: 'FastAPI JWT creation and Depends() guard using PyJWT',
        code: `from datetime import datetime, timedelta, timezone
import os
import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer

SECRET_KEY = os.environ["JWT_SECRET"]
ALGORITHM = "HS256"
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/token")

def create_access_token(subject: str, role: str, expires_minutes: int = 15) -> str:
    now = datetime.now(timezone.utc)
    payload = {
        "sub": subject,
        "role": role,
        "iat": now,
        "exp": now + timedelta(minutes=expires_minutes),
    }
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

def get_current_user(token: str = Depends(oauth2_scheme)) -> dict:
    credentials_err = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        subject = payload.get("sub")
        if not subject:
            raise credentials_err
        return {"user_id": subject, "role": payload.get("role", "user")}
    except jwt.PyJWTError:
        raise credentials_err`,
      },
      {
        id: 'role-based-access-control',
        heading: '3. Enforcing Role-Based Access Control (RBAC)',
        paragraphs: [
          'Authentication answers who the user is; authorization answers what they are allowed to do. You can compose reusable role dependencies on top of get_current_user so admin-only endpoints stay concise and consistent.',
        ],
        codeLabel: 'Composable role guard dependency',
        code: `def require_role(required_role: str):
    def checker(user: dict = Depends(get_current_user)):
        if user["role"] != required_role:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Insufficient permissions",
            )
        return user
    return checker`,
      },
      {
        id: 'security-reminders',
        heading: '4. Production Security Checklist',
        paragraphs: [
          'Remember that JWT payloads are Base64URL-encoded, not encrypted—anyone holding the token can decode and read its JSON claims. Never place passwords, personal phone numbers, or sensitive secrets inside a JWT.',
        ],
        bullets: [
          'Generate at least a 256-bit random secret (openssl rand -hex 32) and never commit it to Git.',
          'Serve all /auth/* endpoints strictly over HTTPS so Bearer tokens cannot be sniffed.',
          'Rate-limit login and token-refresh endpoints to block credential stuffing.',
          'Rotate refresh tokens on every use and revoke the token family if reuse is detected.',
        ],
      },
    ],
  },
  {
    slug: 'deploying-multiple-microservices-on-a-single-vps',
    title: 'Deploying Multiple Microservices on a Single VPS',
    category: 'DevOps',
    tags: ['DevOps', 'Docker', 'Cloud Computing'],
    keywords: [
      'deploy multiple microservices single VPS',
      'Docker Compose memory limits mem_limit',
      'Nginx subdomain reverse proxy',
      'Docker json-file log rotation',
      'VPS hosting without Kubernetes',
      'single server microservices architecture',
    ],
    author: {
      name: 'Debuggers Technologies Engineering',
      role: 'Infrastructure Team',
    },
    publishedAt: '2026-11-12',
    updatedAt: '2026-11-12',
    readingTime: '11 min read',
    summary:
      'How to run multiple independent services, databases, and subdomains cleanly on one VPS using Docker Compose, Nginx routing, memory limits, and log rotation.',
    sections: [
      {
        id: 'when-single-vps-works',
        heading: 'Modular Services Without Kubernetes Overhead',
        paragraphs: [
          'Early-stage and mid-scale products rarely need a multi-node Kubernetes cluster. A modern 4 vCPU / 8 GB RAM VPS can comfortably run an API gateway, an auth service, a core business backend, background workers, PostgreSQL, and Redis at a fraction of managed-cluster cost.',
          'Keeping services containerized on a single host lets your team preserve clean domain boundaries and independent release cycles while avoiding distributed networking headaches until traffic genuinely demands horizontal multi-node scaling.',
        ],
      },
      {
        id: 'resource-limits-and-logging',
        heading: 'Preventing Noisy Neighbors With Memory Caps and Log Rotation',
        paragraphs: [
          'The biggest operational risk when co-locating multiple services on one Linux host is resource contention. Without limits, a memory leak in a PDF generator or image worker can exhaust host RAM and trigger the Linux OOM killer—potentially terminating your PostgreSQL container.',
          'Similarly, unrotated Docker JSON logs can silently fill your root disk over a few months. Configure explicit memory limits and json-file log rotation on every service in Compose.',
        ],
        codeLabel: 'Resource-bounded Compose service with log rotation',
        code: `services:
  auth_service:
    image: dauth:latest
    restart: unless-stopped
    mem_limit: 512m
    cpus: 1.0
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"

  billing_worker:
    image: billing-worker:latest
    restart: unless-stopped
    mem_limit: 512m
    cpus: 0.5
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"`,
      },
      {
        id: 'routing-by-subdomain',
        heading: 'Routing Subdomains and Paths Through One Edge Proxy',
        paragraphs: [
          'Bind each backend service to an internal loopback port (such as 127.0.0.1:8001 for auth, 127.0.0.1:8002 for orders) or attach them to a shared Docker proxy network. Nginx or Caddy then terminates TLS for auth.example.com, api.example.com, and app.example.com and routes requests to the matching upstream.',
          'Keeping one shared Nginx edge layer also centralizes security headers, rate limiting, and access logs in a single place.',
        ],
      },
      {
        id: 'backups-and-monitoring',
        heading: 'Automated Backups and Disk Monitoring',
        paragraphs: [
          'Before celebrating a clean multi-service setup, automate daily pg_dump backups to off-host object storage (such as S3 or Backblaze B2) and test restoring them onto a scratch database. Set up basic CPU, RAM, and disk-usage alerts so you get notified at 80% disk usage rather than after a database crash.',
        ],
        bullets: [
          'Isolate each service’s database schema or logical database even if they share one Postgres instance.',
          'Configure 2–4 GB of swap space as an emergency buffer against brief memory spikes.',
          'Pin image tags (for example, v1.4.2) instead of :latest so rollbacks take seconds.',
          'Run unattended-upgrades for OS security patches and schedule reboots cleanly.',
        ],
      },
    ],
  },
  {
    slug: 'redis-caching-explained-with-real-python-examples',
    title: 'Redis Caching Explained With Real Python Examples',
    category: 'Python Development',
    tags: ['Python Development', 'Backend Development', 'Database Engineering'],
    keywords: [
      'Redis caching Python examples',
      'cache-aside pattern redis-py',
      'FastAPI async Redis caching',
      'Redis cache invalidation TTL strategy',
      'prevent Redis cache stampede',
      'Redis allkeys-lru eviction policy',
    ],
    author: {
      name: 'Debuggers Technologies Engineering',
      role: 'Backend Team',
    },
    publishedAt: '2026-11-12',
    updatedAt: '2026-11-12',
    readingTime: '11 min read',
    summary:
      'Mastering Redis caching in Python: cache-aside implementation, async FastAPI integration, TTLs, invalidation patterns, and preventing cache stampedes.',
    sections: [
      {
        id: 'why-redis-and-cache-aside',
        heading: 'Why Redis and the Cache-Aside Pattern',
        paragraphs: [
          'Relational databases are built for durability and complex queries, which means repeated identical reads—such as restaurant menus, feature flags, user profiles, or product catalogs—spend unnecessary disk and CPU cycles. Redis stores data in memory with sub-millisecond read latency, offloading up to 90% of read traffic from PostgreSQL.',
          'The most reliable pattern for application caching is cache-aside (lazy loading): the application checks Redis first; on a cache hit it returns immediately; on a cache miss it queries PostgreSQL, stores the serialized result in Redis with a Time-To-Live (TTL), and returns the data.',
        ],
        codeLabel: 'Python cache-aside helper using redis-py',
        code: `import json
import redis

r = redis.Redis(host="localhost", port=6379, decode_responses=True)

def get_menu_cached(venue_id: str, fetch_from_db):
    key = f"menu:v1:{venue_id}"
    cached = r.get(key)
    if cached is not None:
        return json.loads(cached)

    data = fetch_from_db(venue_id)
    if data is not None:
        r.setex(key, 300, json.dumps(data))  # 5-minute TTL
    return data`,
      },
      {
        id: 'async-redis-in-fastapi',
        heading: 'Using Async Redis in FastAPI Without Blocking the Event Loop',
        paragraphs: [
          'If your FastAPI endpoints are defined with async def, calling synchronous redis.Redis() inside them blocks the asyncio event loop during network I/O. Always use redis.asyncio with a shared connection pool initialized during app lifespan.',
        ],
        codeLabel: 'Async Redis usage in FastAPI',
        code: `from redis.asyncio import Redis

redis_client = Redis.from_url("redis://localhost:6379/0", decode_responses=True)

async def get_cached_profile(user_id: str, db_fetch):
    key = f"profile:v1:{user_id}"
    cached = await redis_client.get(key)
    if cached:
        return json.loads(cached)

    profile = await db_fetch(user_id)
    await redis_client.setex(key, 600, json.dumps(profile))
    return profile`,
      },
      {
        id: 'invalidation-and-ttls',
        heading: 'Cache Invalidation, Versioning, and TTL Safety Nets',
        paragraphs: [
          'Stale data is the most common source of caching bugs. Whenever a write endpoint updates a record in PostgreSQL, immediately delete the corresponding Redis key after the database transaction commits. Always include a finite TTL on every cached key so even if a worker crashes between commit and delete, stale data expires automatically.',
          'Prefix keys with a schema version (for example, menu:v1:123). When you change the cached JSON shape during a deployment, bumping v1 to v2 prevents old and new app instances from deserializing incompatible payloads.',
        ],
      },
      {
        id: 'cache-stampede-and-penetration',
        heading: 'Guarding Against Cache Stampedes and Miss Floods',
        paragraphs: [
          'Two subtle production failures affect high-traffic caches: cache stampedes (when a hot key expires and hundreds of concurrent requests simultaneously hit the database) and cache penetration (when attackers query non-existent IDs that never get cached).',
        ],
        bullets: [
          'Add small random jitter to TTLs (e.g., 300s + random(0, 60s)) so keys do not expire in one synchronized wave.',
          'Cache negative/empty lookups briefly (30–60s) with a sentinel value to stop repeated DB queries for missing IDs.',
          'Never use KEYS * in production Redis—it blocks the single-threaded server; use SCAN or explicit key sets.',
          'Configure maxmemory and maxmemory-policy allkeys-lru in redis.conf so Redis evicts cold keys gracefully instead of crashing.',
        ],
      },
    ],
  },
  {
    slug: 'building-rest-apis-using-fastapi-and-sqlalchemy',
    title: 'Building REST APIs Using FastAPI and SQLAlchemy',
    category: 'Backend Development',
    tags: ['Backend Development', 'FastAPI', 'Database Engineering'],
    keywords: [
      'FastAPI SQLAlchemy 2.0 REST API',
      'Pydantic v2 ConfigDict from_attributes',
      'FastAPI Depends database session',
      'SQLAlchemy N+1 query selectinload',
      'Alembic database migrations FastAPI',
      'Python backend clean architecture',
    ],
    author: {
      name: 'Debuggers Technologies Engineering',
      role: 'Backend Team',
    },
    publishedAt: '2026-11-12',
    updatedAt: '2026-11-12',
    readingTime: '12 min read',
    summary:
      'Structuring clean FastAPI + SQLAlchemy 2.0 backends: project layout, session lifecycle dependencies, Pydantic DTOs, N+1 prevention, and Alembic migrations.',
    sections: [
      {
        id: 'clean-project-structure',
        heading: 'Organize by Domain Layers, Not One Giant main.py',
        paragraphs: [
          'As a backend grows beyond a handful of routes, separating HTTP routing, Pydantic validation schemas, business services, and SQLAlchemy ORM models keeps codebases readable and testable. Routers handle HTTP status codes and dependencies; services enforce business rules; models define database tables.',
        ],
        bullets: [
          'app/models/ — SQLAlchemy 2.0 declarative table definitions and relationships.',
          'app/schemas/ — Pydantic v2 request/response models (Create, Update, Out).',
          'app/routers/ — FastAPI APIRouter modules grouped by resource.',
          'app/services/ — Pure business logic and transaction boundaries.',
        ],
      },
      {
        id: 'separate-orm-and-api-schemas',
        heading: 'Separate ORM Models From Pydantic Schemas',
        paragraphs: [
          'Never return raw SQLAlchemy objects directly without an explicit response_model. Separating ORM models from Pydantic schemas guarantees internal fields like password_hash, deleted_at, or internal audit notes are never leaked to clients, and allows your API contract to evolve independently of database columns.',
        ],
        codeLabel: 'SQLAlchemy 2.0 session dependency & typed FastAPI endpoint',
        code: `from fastapi import Depends, FastAPI, HTTPException, status
from pydantic import BaseModel, ConfigDict
from sqlalchemy import select
from sqlalchemy.orm import Session

app = FastAPI()

class ItemCreate(BaseModel):
    name: str
    price_cents: int

class ItemOut(BaseModel):
    id: int
    name: str
    price_cents: int
    model_config = ConfigDict(from_attributes=True)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/items/{item_id}", response_model=ItemOut)
def read_item(item_id: int, db: Session = Depends(get_db)):
    item = db.scalar(select(ItemModel).where(ItemModel.id == item_id))
    if not item:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Item not found")
    return item`,
      },
      {
        id: 'avoiding-n-plus-one-and-pagination',
        heading: 'Prevent N+1 Queries and Always Paginate Lists',
        paragraphs: [
          'SQLAlchemy lazy loading can silently fire dozens of extra SELECT queries when serializing nested relationships in a list endpoint. Use selectinload() or joinedload() explicitly for relationships your response schema includes, and enforce limit/offset or cursor pagination on every collection endpoint.',
          'Set pool_pre_ping=True on create_engine() so stale or dropped database connections are detected and refreshed automatically before an endpoint fails.',
        ],
      },
      {
        id: 'migrations-and-indexes',
        heading: 'Manage Schema Evolution With Alembic',
        paragraphs: [
          'Never use Base.metadata.create_all() in production—it cannot add columns, alter constraints, or create indexes on existing tables. Initialize Alembic early and review every autogenerated migration script before running alembic upgrade head in CI/CD.',
        ],
        codeLabel: 'Standard Alembic migration workflow',
        code: `alembic init alembic
alembic revision --autogenerate -m "add items table and price check"
alembic upgrade head`,
      },
    ],
  },
  {
    slug: 'securing-an-ubuntu-vps-using-ufw-and-ssh',
    title: 'Securing an Ubuntu VPS Using UFW and SSH',
    category: 'Cloud Computing',
    tags: ['Cloud Computing', 'DevOps', 'Software Architecture'],
    keywords: [
      'secure Ubuntu VPS UFW SSH',
      'disable root SSH password login',
      'Ed25519 SSH key authentication Ubuntu',
      'UFW firewall rules Nginx OpenSSH',
      'Fail2ban unattended-upgrades Ubuntu server',
      'Linux cloud server hardening checklist',
    ],
    author: {
      name: 'Debuggers Technologies Engineering',
      role: 'Infrastructure & Security Team',
    },
    publishedAt: '2026-11-12',
    updatedAt: '2026-11-12',
    readingTime: '10 min read',
    summary:
      'A step-by-step first-hour security baseline for Ubuntu cloud servers: non-root sudo users, Ed25519 SSH keys, SSH daemon hardening, UFW firewall rules, and Fail2ban.',
    sections: [
      {
        id: 'create-sudo-user',
        heading: '1. Create a Non-Root Sudo User Before Anything Else',
        paragraphs: [
          'Fresh cloud VPS instances often ship with root access enabled. Your first step should be creating a named administrative user, granting sudo privileges, and copying your SSH public key to that user’s ~/.ssh/authorized_keys file.',
          'Keep your original root SSH terminal open while testing login as the new user in a second terminal window. Only after confirming sudo works should you lock down SSH daemon settings.',
        ],
        codeLabel: 'Create sudo user and copy authorized SSH keys',
        code: `adduser deploy
usermod -aG sudo deploy
rsync --archive --chown=deploy:deploy ~/.ssh /home/deploy`,
      },
      {
        id: 'ssh-key-authentication',
        heading: '2. Enforce Ed25519 SSH Keys and Disable Password Login',
        paragraphs: [
          'Automated bots scan public IPv4 ranges continuously for weak SSH passwords. Generating an Ed25519 key pair on your workstation and disabling password authentication eliminates brute-force password attacks completely.',
          'Edit /etc/ssh/sshd_config (or add a drop-in file under /etc/ssh/sshd_config.d/99-hardening.conf on Ubuntu 22.04/24.04), validate the configuration with sudo sshd -t, and reload SSH.',
        ],
        codeLabel: '/etc/ssh/sshd_config.d/99-hardening.conf',
        code: `PermitRootLogin no
PasswordAuthentication no
KbdInteractiveAuthentication no
PubkeyAuthentication yes
MaxAuthTries 3
X11Forwarding no`,
      },
      {
        id: 'ufw-firewall-baseline',
        heading: '3. Configure UFW Default-Deny Inbound Rules',
        paragraphs: [
          'Uncomplicated Firewall (UFW) gives you a clean, auditable host firewall on top of nftables/iptables. Always default-deny incoming traffic, default-allow outgoing traffic, and open only the exact ports your edge proxy requires: OpenSSH (22) and Nginx Full (80, 443).',
          'Never expose PostgreSQL (5432), MySQL (3306), or Redis (6379) to 0.0.0.0/0. When you need to inspect a production database from your laptop, use an encrypted SSH tunnel (ssh -L 5432:127.0.0.1:5432 deploy@your-vps) instead.',
        ],
        codeLabel: 'Tested UFW baseline setup',
        code: `sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
sudo ufw status verbose`,
      },
      {
        id: 'fail2ban-and-auto-updates',
        heading: '4. Enable Fail2ban and Unattended Security Updates',
        paragraphs: [
          'Even with password login disabled, Fail2ban reduces log noise and blocks abusive IPs that hammer SSH or Nginx endpoints. Pair it with unattended-upgrades so critical kernel and OpenSSL patches install automatically.',
        ],
        bullets: [
          'Install Fail2ban: sudo apt install -y fail2ban && sudo systemctl enable --now fail2ban.',
          'Enable automatic security updates: sudo dpkg-reconfigure -plow unattended-upgrades.',
          'Audit open listening sockets anytime with: sudo ss -tulnp.',
          'Watch out for Docker port publishing: Docker bypasses UFW unless you bind ports to 127.0.0.1.',
        ],
      },
    ],
  },
  {
    slug: 'understanding-nginx-reverse-proxy-configuration',
    title: 'Understanding Nginx Reverse Proxy Configuration',
    category: 'DevOps',
    tags: ['DevOps', 'Cloud Computing', 'Backend Development'],
    keywords: [
      'Nginx reverse proxy configuration',
      'Nginx proxy_pass trailing slash',
      'Nginx WebSocket Upgrade header',
      'Nginx X-Forwarded-For X-Real-IP',
      'Nginx limit_req_zone rate limiting',
      'fix Nginx 502 Bad Gateway 504 timeout',
    ],
    author: {
      name: 'Debuggers Technologies Engineering',
      role: 'Infrastructure Team',
    },
    publishedAt: '2026-11-12',
    updatedAt: '2026-11-12',
    readingTime: '11 min read',
    summary:
      'A clear, practical guide to Nginx reverse proxying: proxy_pass trailing-slash rules, forwarding headers, WebSocket upgrades, timeouts, compression, and rate limiting.',
    sections: [
      {
        id: 'how-proxy-pass-works',
        heading: 'How proxy_pass and Forwarding Headers Work',
        paragraphs: [
          'A reverse proxy receives client HTTP/HTTPS connections at the public edge and forwards them to internal backend servers (such as Gunicorn, Node.js, or Go) listening on loopback or private Docker networks. Without explicit proxy_set_header directives, your backend sees 127.0.0.1 as every user’s IP address and assumes requests arrived over plain HTTP.',
          'Setting proxy_http_version 1.1 is essential for modern backends: it enables persistent upstream keep-alive connections and allows Connection "upgrade" headers required by WebSockets.',
        ],
        codeLabel: 'Production Nginx reverse proxy & WebSocket block',
        code: `location /api/ {
    proxy_pass http://127.0.0.1:8000/;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;

    proxy_connect_timeout 10s;
    proxy_send_timeout 60s;
    proxy_read_timeout 60s;
}`,
      },
      {
        id: 'trailing-slash-behavior',
        heading: 'The Trailing Slash Rule in proxy_pass',
        paragraphs: [
          'One of the most common Nginx surprises is how a trailing slash in proxy_pass changes the forwarded URL path. If your location is /api/ and proxy_pass is http://127.0.0.1:8000/; (with a trailing slash), Nginx strips /api/ so a request to /api/users arrives at your backend as /users.',
          'If you omit the trailing slash (proxy_pass http://127.0.0.1:8000;), Nginx preserves the full original URI and forwards /api/users untouched. Knowing this single rule eliminates hours of mysterious 404 errors.',
        ],
      },
      {
        id: 'static-assets-gzip-and-rate-limiting',
        heading: 'Serving Static Assets, Compression, and Rate Limiting',
        paragraphs: [
          'Let Nginx serve static files and SPAs directly from disk while proxying only /api/ or dynamic routes to your application server. Enabling gzip compression for JSON, CSS, and JS payloads cuts bandwidth dramatically without taxing your Python or Node workers.',
          'For public authentication or contact endpoints, Nginx’s limit_req_zone provides lightweight DDoS and brute-force protection right at the edge before requests ever reach your application.',
        ],
        codeLabel: 'Rate limiting and gzip snippet in nginx.conf / server block',
        code: `limit_req_zone $binary_remote_addr zone=auth_limit:10m rate=10r/m;

server {
    gzip on;
    gzip_types application/json text/css application/javascript text/plain;
    gzip_min_length 1024;

    location /api/auth/ {
        limit_req zone=auth_limit burst=5 nodelay;
        proxy_pass http://127.0.0.1:8000;
    }
}`,
      },
      {
        id: 'troubleshooting-502-504',
        heading: 'Troubleshooting 502 Bad Gateway and 504 Gateway Timeout',
        paragraphs: [
          'Every Nginx operator eventually encounters 502 and 504 errors. Knowing which log to check makes diagnosis immediate:',
        ],
        bullets: [
          '502 Bad Gateway: Nginx reached the socket, but the backend process is down, crashed, or listening on a different port. Check systemctl status myapi and /var/log/nginx/error.log.',
          '504 Gateway Timeout: The backend accepted the request but took longer than proxy_read_timeout (default 60s). Optimize slow DB queries or offload heavy jobs to a background queue.',
          '413 Request Entity Too Large: Increase client_max_body_size (e.g., 25M) inside the server or location block.',
        ],
      },
    ],
  },
  {
    slug: 'building-scalable-backend-architectures',
    title: 'Building Scalable Backend Architectures',
    category: 'Software Architecture',
    tags: ['Software Architecture', 'Backend Development', 'Artificial Intelligence', 'Flutter Development'],
    keywords: [
      'scalable backend architecture patterns',
      'modular monolith vs microservices',
      'stateless REST API horizontal scaling',
      'Redis background job queues Celery ARQ',
      'PostgreSQL PgBouncer EXPLAIN ANALYZE',
      'backend observability request ID idempotency',
    ],
    author: {
      name: 'Debuggers Technologies Engineering',
      role: 'Architecture Team',
    },
    publishedAt: '2026-11-12',
    updatedAt: '2026-11-12',
    readingTime: '13 min read',
    summary:
      'Practical principles for scaling real-world backend systems: modular monoliths, stateless APIs, async job queues, database indexing, idempotency, and observability.',
    sections: [
      {
        id: 'start-with-modular-monolith',
        heading: '1. Start With a Modular Monolith and Stateless APIs',
        paragraphs: [
          'Scalability begins with clean internal domain boundaries—not with splitting a young product into fifteen network microservices. Premature microservices introduce distributed transactions, network latency, version skew, and complex deployments long before traffic justifies them.',
          'Instead, build a modular monolith with strict module boundaries (auth, billing, notifications, core domain) and keep HTTP handlers completely stateless. Store sessions in Redis or signed tokens, and store uploaded files in object storage (S3/R2) rather than local server disk. A stateless backend can scale horizontally behind a load balancer in minutes.',
        ],
      },
      {
        id: 'offload-slow-work-to-queues',
        heading: '2. Offload Slow and External Work to Background Queues',
        paragraphs: [
          'Web and Flutter mobile clients expect sub-300ms API responses. Never block an HTTP request thread waiting for SMTP email servers, PDF invoice generation, image compression, webhook retries, or LLM/AI inference calls.',
          'Push slow tasks onto a durable queue (such as Celery, ARQ, or BullMQ backed by Redis/RabbitMQ), return HTTP 202 Accepted with a job ID, and let dedicated worker processes execute and retry them independently with exponential backoff.',
        ],
        bullets: [
          'Keep request-response paths limited to fast validation, cache lookups, and primary DB writes.',
          'Design background jobs to be idempotent so automatic retries never double-charge a customer or send duplicate emails.',
          'Scale worker replicas independently of web API replicas during batch spikes.',
        ],
      },
      {
        id: 'database-scaling-fundamentals',
        heading: '3. Fix Database Bottlenecks Before Adding Complexity',
        paragraphs: [
          'In 9 out of 10 slow applications, the bottleneck is not the programming language—it is unindexed queries, N+1 loops, missing connection pooling, or unbounded list endpoints. Before introducing read replicas or sharding, inspect EXPLAIN ANALYZE on your slowest queries.',
          'Add composite indexes matching your WHERE and ORDER BY clauses, use keyset/cursor pagination for large tables, and place PgBouncer in front of PostgreSQL when hundreds of stateless workers open simultaneous connections.',
        ],
      },
      {
        id: 'resilience-and-observability',
        heading: '4. Build Resilience and Observability From Day One',
        paragraphs: [
          'You cannot scale what you cannot measure. Attach a unique X-Request-ID to every incoming request, log structured JSON with latency and status codes, and expose lightweight /health/live and /health/ready endpoints for your load balancer.',
          'For every outbound HTTP call to payment gateways, AI providers, or third-party APIs, configure strict connect/read timeouts and circuit-breaker fallbacks so one slow external vendor never exhausts your entire API worker pool.',
        ],
        bullets: [
          'Structured JSON logs with request_id, user_id, route, status_code, and duration_ms.',
          'Idempotency keys on payment, order creation, and webhook endpoints.',
          'Explicit timeouts on every external HTTP client and database query.',
          'Automated alerts on 5xx error rate spikes, p95 latency, queue depth, and disk saturation.',
        ],
      },
    ],
  },
];
