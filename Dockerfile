# syntax=docker/dockerfile:1

# ---- Stage 1: build ----------------------------------------------------------
FROM node:24-alpine AS build

WORKDIR /app

# Install dependencies first so the layer is cached while only sources change.
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# ---- Stage 2: runtime --------------------------------------------------------
# Unprivileged nginx: runs as uid 101, no root, works on Cloud Run, ECS,
# Kubernetes with restricted pod security, Fly.io and plain `docker run`.
FROM nginxinc/nginx-unprivileged:1.29-alpine AS runtime

# The base image runs envsubst over /etc/nginx/templates/*.template at startup,
# so PORT can be overridden by the host (Cloud Run injects it).
ENV PORT=5174

COPY docker/nginx.conf.template /etc/nginx/templates/default.conf.template
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 5174

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --spider -q "http://127.0.0.1:${PORT}/healthz" || exit 1
