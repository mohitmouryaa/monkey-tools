# syntax=docker/dockerfile:1.6
ARG NODE_VERSION=20.18.1

FROM node:${NODE_VERSION}-bookworm-slim AS base
ENV PNPM_HOME=/pnpm \
    PNPM_VERSION=10.26.2 \
    PATH="${PNPM_HOME}:${PATH}"
ENV CI=true
WORKDIR /app
# Corepack key retrieval can fail in minimal images; install pnpm directly to keep builds stable
RUN npm install -g pnpm@${PNPM_VERSION}

FROM base AS deps
RUN apt-get update \
 && apt-get install -y --no-install-recommends ca-certificates \
 && rm -rf /var/lib/apt/lists/*
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json tsconfig.json turbo.json biome.json ./
COPY apps/worker/package.json apps/worker/package.json
COPY packages/database/package.json packages/database/package.json
COPY packages/queue/package.json packages/queue/package.json
COPY packages/storage/package.json packages/storage/package.json
COPY packages/types/package.json packages/types/package.json
COPY packages/typescript-config/package.json packages/typescript-config/package.json
RUN pnpm install --frozen-lockfile

FROM deps AS build
COPY . .
RUN pnpm --filter worker... run build

FROM deps AS prod-deps
RUN pnpm prune --prod

FROM node:${NODE_VERSION}-bookworm-slim AS runner
RUN apt-get update \
 && apt-get install -y --no-install-recommends ghostscript ca-certificates \
 && rm -rf /var/lib/apt/lists/*
ENV NODE_ENV=production
WORKDIR /app
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=build /app/apps/worker/dist ./dist
COPY apps/worker/package.json ./package.json
USER node
CMD ["node", "dist/index.js"]
