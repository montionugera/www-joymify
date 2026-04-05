# syntax=docker/dockerfile:1
# ─────────────────────────────────────────────────────────────
#  Joymify Portal — Multi-stage Dockerfile
#  Stage 1: build (Node 20 Alpine)
#  Stage 2: run  (Node 20 Alpine slim)
#  Port: 3000
# ─────────────────────────────────────────────────────────────

# ── Stage 1: Builder ─────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency manifests first (layer cache)
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Copy source and build
COPY . .
RUN pnpm run build

# ── Stage 2: Runner ──────────────────────────────────────────
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0

# Copy only what's needed to run
COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./

# Install production deps only
RUN npm install -g pnpm && pnpm install --prod --frozen-lockfile

EXPOSE 3000

CMD ["node", "build"]
