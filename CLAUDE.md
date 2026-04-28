# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

pdfs.com.br is a document/image processing SaaS platform. Users upload files, which get processed by background workers (PDF conversion, compression, etc.). It's a pnpm monorepo managed by TurboRepo.

## Commands

```bash
# Development (starts all apps + packages in watch mode)
pnpm dev

# Local infrastructure (MongoDB replica set, Redis, MinIO S3)
docker compose up -d

# Build
pnpm build              # all packages
pnpm --filter web build  # web only

# Lint & Format (Biome)
pnpm lint               # check
pnpm format             # auto-fix

# Type checking
pnpm --filter web typecheck
pnpm --filter worker typecheck

# Create admin user
pnpm --filter web create:admin
```

## Architecture

### Monorepo Structure

- **`apps/web`** — Next.js 16 (App Router, Turbopack) frontend with tRPC API layer
- **`apps/worker`** — Node.js BullMQ worker that processes file jobs (PDF, images, documents)
- **`packages/database`** — MongoDB connection + Typegoose models (Tool, Job, Category, Page, GlobalScript)
- **`packages/queue`** — BullMQ queue setup with Redis, rate limiting
- **`packages/storage`** — S3-compatible storage client (DigitalOcean Spaces / MinIO locally)
- **`packages/types`** — Shared TypeScript types and Zod schemas (JOB_TYPES, Status enum)
- **`packages/ui`** — Shared shadcn/ui component library (Radix UI, Tailwind CSS 4)
- **`packages/typescript-config`** — Shared tsconfig bases

### File Processing Pipeline

1. Frontend requests a presigned S3 URL via `POST /api/upload`
2. Browser uploads directly to S3
3. Job created via tRPC `jobs.create` → stored in MongoDB + enqueued in Redis (BullMQ)
4. Worker dequeues job → downloads from S3 → processes → uploads result to S3 → updates job status
5. Frontend polls `jobs.getById` for completion + download URL

### API Layer (tRPC)

- Server defined in `apps/web/modules/trpc/` with SuperJSON transformer
- Routers: `toolsRouter`, `jobsRouter`, `categoriesRouter`, `pagesRouter`, `globalScriptsRouter`
- Auth middleware: `protectedProcedure` checks `ctx.user` & `ctx.session`
- Auth handled by Better Auth with MongoDB adapter at `/api/auth/[...all]`

### Rate Limiting

Redis-based middleware in `proxy.ts`. Tiered: default 100/min, jobs 30/min, uploads 10/min. By IP.

### Key Tech Stack

- React 19, Next.js 16, Tailwind CSS 4, react-hook-form + Zod
- TanStack Query v5 for client state, tRPC v11 for API
- Mongoose 9 + Typegoose 13 (MongoDB ODM)
- BullMQ 5 (Redis job queue, concurrency: 10, lock: 10min)
- Biome for linting/formatting (spaces, 130 line width, double quotes)

## Environment

All env vars are defined in root `.env` and shared via `turbo.json` globalEnv. Key vars: `DATABASE_URL`, `REDIS_URL`, `DO_SPACES_*`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`.

## Code Style

Biome enforces: 2-space indent, double quotes, 130 char line width. CSS files are excluded from Biome. Import organization is off (manual ordering).
