# -------------------------
# Stage 1 - Build React App
# -------------------------
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

RUN npm run build

# -------------------------
# Stage 2 - Nginx
# -------------------------
FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/dist /usr/share/nginx/html

# Write optimized Nginx configuration
RUN printf 'server {\n\
    listen 80;\n\
    server_name localhost;\n\
    root /usr/share/nginx/html;\n\
    index index.html;\n\
\n\
    # Gzip Compression\n\
    gzip on;\n\
    gzip_vary on;\n\
    gzip_proxied any;\n\
    gzip_comp_level 6;\n\
    gzip_types text/plain text/css text/xml application/json application/javascript application/xml+rss application/atom+xml image/svg+xml;\n\
\n\
    # Security Headers\n\
    add_header X-Content-Type-Options "nosniff" always;\n\
    add_header X-Frame-Options "SAMEORIGIN" always;\n\
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;\n\
\n\
    # Special files\n\
    location = /sitemap.xml {\n\
        default_type application/xml;\n\
        add_header Cache-Control "public, max-age=3600";\n\
    }\n\
    location = /ads.txt {\n\
        default_type text/plain;\n\
        add_header Cache-Control "public, max-age=3600";\n\
    }\n\
    location = /robots.txt {\n\
        default_type text/plain;\n\
        add_header Cache-Control "public, max-age=3600";\n\
    }\n\
\n\
    # Cache Static Assets\n\
    location ~* \\.(?:css|js|jpg|jpeg|gif|png|ico|svg|woff2|woff)$ {\n\
        expires 1y;\n\
        access_log off;\n\
        add_header Cache-Control "public, max-age=31536000, immutable";\n\
    }\n\
\n\
    # Static and SPA routing fallback\n\
    location / {\n\
        try_files $uri $uri/ /index.html;\n\
    }\n\
\n\
    error_page 500 502 503 504 /50x.html;\n\
    location = /50x.html {\n\
        root /usr/share/nginx/html;\n\
    }\n\
}\n' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]