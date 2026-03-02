# Epic Technical Specification: Foundation & Deployment

Date: 2026-02-28
Author: BMad
Epic ID: 1
Status: Draft

---

## Overview

Epic 1 establishes the infrastructure foundation that all subsequent epics depend on. The existing Lendywendy.com brownfield codebase (Next.js 16.1.6, Prisma 6.19, React 19, 15 models, 40+ pages) must be configured for self-hosted Coolify deployment via Docker standalone output, instrumented with error tracking (Sentry) and analytics (GA4), protected by rate limiting middleware, equipped with a local development environment (docker-compose for PostgreSQL), and set up with a test runner (Vitest) so that all future stories can be built, tested, and deployed reliably.

This epic has no external dependencies — it is the first to execute and unblocks E2 (AI Advisor), E3 (Readiness Score), and all downstream work.

## Objectives and Scope

**In Scope:**

- Configure `next.config.ts` for standalone output and create multi-stage Dockerfile for Coolify
- Create `.dockerignore` and verify the Docker image builds and starts
- Create `docker-compose.yml` for local PostgreSQL 17 development
- Update `.env.example` with all required environment variables (Resend replacing SendGrid)
- Add rate limiting middleware (in-memory sliding window) to existing `middleware.ts`
- Integrate `@sentry/nextjs` for server + client error tracking with source maps
- Add GA4 `<Script>` component to root layout with typed custom event helpers
- Set up Vitest + React Testing Library with example tests for existing scoring algorithms
- Add `sharp` to production dependencies for self-hosted `next/image` optimization

**Out of Scope:**

- CI/CD pipeline (Coolify handles git-push → build → deploy)
- Redis or external cache layer (ADR-003: in-memory rate limiting sufficient)
- Cloudflare CDN or edge caching (can be added later)
- Any application features (chat, readiness score, lead management — those are E2+)
- Database schema changes (schema already has all needed models)
- CMS models or admin content features (post-MVP)

## System Architecture Alignment

This epic maps directly to the Architecture v2.0 decision table rows:

| Architecture Decision | This Epic's Implementation |
|----------------------|---------------------------|
| Deployment: Coolify (Docker standalone) | Stories 1.1 (Dockerfile), 1.2 (docker-compose) |
| Rate Limiting: In-memory sliding window (ADR-003) | Story 1.3 (middleware.ts) |
| Error Tracking: Sentry | Story 1.4 |
| Analytics: GA4 | Story 1.5 |
| Testing: Vitest + RTL (ADR-007) | Story 1.6 |
| Image Optimization: sharp (self-hosted) | Story 1.1 (Dockerfile) |

All work stays within the `next.config.ts`, `middleware.ts`, `Dockerfile`, `docker-compose.yml`, `lib/analytics.ts`, `vitest.config.ts`, and Sentry config files. No application-level business logic is created or modified.

---

## Detailed Design

### Services and Modules

| Module/File | Responsibility | Created/Modified | Story |
|-------------|---------------|------------------|-------|
| `next.config.ts` | Add `output: 'standalone'`, Sentry wrapper | Modified | 1.1, 1.4 |
| `Dockerfile` | Multi-stage build: deps → build → production runner | Created | 1.1 |
| `.dockerignore` | Exclude node_modules, .next, .env*, .git from Docker context | Created | 1.1 |
| `docker-compose.yml` | Local PostgreSQL 17 service | Created | 1.2 |
| `.env.example` | Full env var template (Resend, not SendGrid) | Modified | 1.2 |
| `middleware.ts` | Add rate limiting before auth checks | Modified | 1.3 |
| `lib/rate-limit.ts` | Sliding window rate limiter (Map-based) | Created | 1.3 |
| `sentry.client.config.ts` | Sentry browser SDK init | Created | 1.4 |
| `sentry.server.config.ts` | Sentry Node SDK init | Created | 1.4 |
| `sentry.edge.config.ts` | Sentry edge runtime init | Created | 1.4 |
| `instrumentation.ts` | Next.js instrumentation hook for Sentry | Created | 1.4 |
| `components/analytics/GoogleAnalytics.tsx` | GA4 script loader (`'use client'`) | Created | 1.5 |
| `lib/analytics.ts` | Typed GA4 event helpers | Created | 1.5 |
| `app/layout.tsx` | Add `<GoogleAnalytics />` component | Modified | 1.5 |
| `vitest.config.ts` | Vitest configuration with path aliases | Created | 1.6 |
| `vitest.setup.ts` | Testing Library setup (jsdom) | Created | 1.6 |
| `lib/scoring/readiness.test.ts` | Example tests for readiness scoring | Created | 1.6 |
| `lib/lead-scoring.test.ts` | Example tests for lead scoring | Created | 1.6 |
| `package.json` | Add test scripts, dev dependencies | Modified | 1.4, 1.5, 1.6 |

### Data Models and Contracts

No data model changes in this epic. The existing Prisma schema with 15 models is unchanged. All models needed for MVP (Lead, Conversation, Message, ReadinessAssessment, Agent) are already defined.

**Relevant existing schema references:**
- `Lead.maxBountySubmitted` / `Lead.maxBountyResponse` — used by webhook retry cron (Story 6.2, not this epic)
- `User` model — used by NextAuth for admin auth (already working)

### APIs and Interfaces

**No new API routes in this epic.** The only API-adjacent work is:

**Rate Limiter Interface (Story 1.3):**

```typescript
// lib/rate-limit.ts
interface RateLimitConfig {
  windowMs: number      // e.g. 60_000 (1 minute)
  maxRequests: number   // e.g. 10
}

interface RateLimitResult {
  allowed: boolean
  remaining: number
  resetAt: number       // Unix timestamp ms
}

function checkRateLimit(key: string, config: RateLimitConfig): RateLimitResult

// Rate limit tiers (configured in middleware.ts):
// /api/chat:      10 req/min per IP
// /api/leads:      5 req/min per IP
// /api/readiness:  5 req/min per IP
// /api/*:        100 req/min per IP
```

**GA4 Event Interface (Story 1.5):**

```typescript
// lib/analytics.ts
type GAEvent =
  | { event: 'chat_started'; pageUrl: string }
  | { event: 'chat_lead_captured'; sessionId: string }
  | { event: 'assessment_started' }
  | { event: 'assessment_completed'; score: number; category: string }
  | { event: 'lead_submitted'; source: string }

function trackEvent(event: GAEvent): void
```

### Workflows and Sequencing

**Story Execution Order:**

```
1.1 Configure Coolify Deployment ─┐
1.2 Local Dev Environment ────────┤ (can be parallel)
1.3 Rate Limiting Middleware ──────┤ (can be parallel)
1.5 Google Analytics 4 ────────────┤ (can be parallel)
1.6 Testing Infrastructure ────────┘ (can be parallel)
                                   │
1.4 Sentry Error Tracking ────────┘ (depends on 1.1 — needs Dockerfile for source map config)
```

Stories 1.1-1.3, 1.5, and 1.6 have no inter-dependencies and can be built in parallel. Story 1.4 depends on 1.1 because Sentry source map upload requires the build pipeline to be in place.

**Docker Build Flow (Story 1.1):**

```
1. Dockerfile stage: deps → npm ci
2. Dockerfile stage: builder → prisma generate → npm run build
3. Dockerfile stage: runner → copy standalone + static + public + prisma
4. docker build -t lendywendy . → verify success
5. docker run -p 3000:3000 lendywendy → verify serves app
```

**Middleware Request Flow (Story 1.3):**

```
Incoming request
  → middleware.ts
    → Extract IP from headers (x-forwarded-for or x-real-ip)
    → Determine rate limit tier by path prefix
    → checkRateLimit(ip + path-tier, config)
      → If not allowed → return 429 { error: "Too many requests" }
      → If allowed → continue to auth checks (existing code)
        → NextResponse.next() or redirect
```

---

## Non-Functional Requirements

### Performance

| Metric | Target | Story | Validation |
|--------|--------|-------|------------|
| Docker image size | < 250MB (alpine-based, standalone) | 1.1 | `docker images lendywendy` |
| Docker build time | < 3 minutes (fresh build) | 1.1 | Time `docker build` |
| Container cold start | < 5 seconds to serving | 1.1 | Time from `docker run` to first response |
| Rate limiter overhead | < 1ms per request | 1.3 | Map lookup is O(1) |
| GA4 script load | Non-blocking (async) | 1.5 | Lighthouse performance score unaffected |
| Vitest suite runtime | < 5 seconds for example tests | 1.6 | `npm run test:run` timing |

### Security

| Concern | Mitigation | Story |
|---------|-----------|-------|
| Rate limiting bypass | Use `x-forwarded-for` or `x-real-ip` from Traefik (trusted proxy) | 1.3 |
| API abuse | Tiered rate limits: 10/min chat, 5/min leads, 100/min default | 1.3 |
| Memory exhaustion (rate limit map) | Periodic cleanup of expired entries every 60 seconds | 1.3 |
| Sentry token exposure | `SENTRY_AUTH_TOKEN` in Coolify secrets (build-time only) | 1.4 |
| GA4 measurement ID | Public (`NEXT_PUBLIC_*`) — expected, no PII sent in events | 1.5 |
| Env vars in Docker | Never baked into image, injected at runtime via Coolify | 1.1 |
| Docker image security | Alpine-based, minimal attack surface, no dev dependencies in production | 1.1 |

### Reliability/Availability

- **Rate limiter**: State is in-memory, lost on restart. Acceptable — rate limits simply reset, which is brief and non-harmful (ADR-003)
- **Sentry**: If Sentry is unreachable, errors are silently dropped — no impact on application availability
- **GA4**: If GA4 script fails to load, no impact on application functionality
- **Docker restart**: Coolify configures `restart: unless-stopped` by default — container auto-recovers
- **Database connection**: Prisma singleton in `lib/db.ts` handles reconnection automatically

### Observability

| Signal | Tool | What it captures | Story |
|--------|------|------------------|-------|
| Errors | Sentry | Unhandled exceptions (server + client), stack traces, source maps | 1.4 |
| User behavior | GA4 | Page views, custom events (chat, assessment, leads) | 1.5 |
| Container logs | Coolify | stdout/stderr from `node server.js` | 1.1 |
| Application logs | `lib/logger.ts` (existing) | Structured JSON to stdout, captured by Coolify | — |
| Test results | Vitest | Test pass/fail, coverage (optional) | 1.6 |

---

## Dependencies and Integrations

### New npm Dependencies

| Package | Version | Type | Story | Purpose |
|---------|---------|------|-------|---------|
| `@sentry/nextjs` | latest | prod | 1.4 | Sentry integration for Next.js |
| `sharp` | latest | prod | 1.1 | Image optimization for self-hosted next/image |
| `vitest` | latest | dev | 1.6 | Test runner |
| `@testing-library/react` | latest | dev | 1.6 | React component testing |
| `@testing-library/jest-dom` | latest | dev | 1.6 | DOM assertion matchers |
| `@testing-library/user-event` | latest | dev | 1.6 | User interaction simulation |
| `jsdom` | latest | dev | 1.6 | DOM environment for tests |

### Existing Dependencies (no changes)

- `next@16.1.6`, `react@19.2.0`, `react-dom@19.2.0` — framework
- `@prisma/client@6.19.0`, `prisma@6.19.0` — ORM
- `next-auth@5.0.0-beta.30` — authentication
- `zod@4.1.12` — validation
- All shadcn/ui Radix packages — UI components

### External Services

| Service | Story | Auth Method | Env Var |
|---------|-------|------------|---------|
| Sentry (cloud) | 1.4 | DSN + auth token | `SENTRY_DSN`, `SENTRY_AUTH_TOKEN` |
| Google Analytics 4 | 1.5 | Measurement ID (public) | `NEXT_PUBLIC_GA_MEASUREMENT_ID` |
| PostgreSQL 17 (local via docker-compose) | 1.2 | Connection string | `DATABASE_URL` |

### Infrastructure

| Component | Story | Provider |
|-----------|-------|----------|
| Docker image registry | 1.1 | Coolify (builds locally on VPS) |
| SSL/TLS termination | 1.1 | Coolify Traefik proxy (Let's Encrypt) |
| PostgreSQL 17 (production) | 1.2 | Coolify-managed service |
| Cron scheduler | — | Coolify (used in E6, configured here in infra) |

---

## Acceptance Criteria (Authoritative)

1. **AC-1.1a**: `npm run build` produces a `.next/standalone` directory with `server.js` when `output: 'standalone'` is set in `next.config.ts`
2. **AC-1.1b**: `docker build -t lendywendy .` completes successfully using the multi-stage Dockerfile
3. **AC-1.1c**: `docker run -p 3000:3000 lendywendy` starts the container and serves the app on port 3000
4. **AC-1.1d**: `.dockerignore` excludes `node_modules`, `.next`, `.env*`, `.git`
5. **AC-1.2a**: `docker compose up -d` starts PostgreSQL 17 on port 5432
6. **AC-1.2b**: `.env.example` lists all required env vars with placeholder values (Resend, not SendGrid)
7. **AC-1.2c**: After `cp .env.example .env.local && npx prisma migrate dev`, database is ready
8. **AC-1.3a**: Requests exceeding rate limit receive `429` with `{ error: "Too many requests" }`
9. **AC-1.3b**: `/api/chat` limited to 10 req/min per IP
10. **AC-1.3c**: `/api/leads` and `/api/readiness` limited to 5 req/min per IP
11. **AC-1.3d**: All other `/api/*` limited to 100 req/min per IP
12. **AC-1.3e**: Rate limiter cleans expired entries to prevent memory leaks
13. **AC-1.4a**: `@sentry/nextjs` captures unhandled server and client errors with stack traces
14. **AC-1.4b**: Sentry DSN loaded from `SENTRY_DSN` environment variable
15. **AC-1.4c**: Source maps uploaded during build for readable stack traces
16. **AC-1.5a**: GA4 pageview tracked on every page load
17. **AC-1.5b**: Custom event helpers fire correctly for: `chat_started`, `chat_lead_captured`, `assessment_started`, `assessment_completed`, `lead_submitted`
18. **AC-1.5c**: GA4 only loads in production (`NODE_ENV === 'production'`)
19. **AC-1.6a**: `npm test` runs Vitest with all `*.test.ts` and `*.test.tsx` files
20. **AC-1.6b**: Path aliases (`@/`) resolve correctly in tests
21. **AC-1.6c**: Example test for `lib/scoring/readiness.ts` passes
22. **AC-1.6d**: Example test for `lib/lead-scoring.ts` passes

---

## Traceability Mapping

| AC | Spec Section | Component(s) | Test Idea |
|----|-------------|---------------|-----------|
| AC-1.1a | Detailed Design → next.config.ts | `next.config.ts` | Build output check: `.next/standalone/server.js` exists |
| AC-1.1b | Detailed Design → Dockerfile | `Dockerfile` | `docker build` exit code 0 |
| AC-1.1c | Detailed Design → Dockerfile | `Dockerfile`, standalone server | HTTP GET `localhost:3000` returns 200 |
| AC-1.1d | Detailed Design → .dockerignore | `.dockerignore` | Verify file contents include expected patterns |
| AC-1.2a | Detailed Design → docker-compose | `docker-compose.yml` | `docker compose up -d` + `pg_isready` |
| AC-1.2b | Detailed Design → .env.example | `.env.example` | Verify RESEND_API_KEY present, SENDGRID absent |
| AC-1.2c | Dependencies → PostgreSQL | `prisma/schema.prisma` | `prisma migrate dev` exit code 0 |
| AC-1.3a | APIs → Rate Limiter | `middleware.ts`, `lib/rate-limit.ts` | Send 11 requests to /api/chat, assert 11th returns 429 |
| AC-1.3b | APIs → Rate Limiter | `middleware.ts` | Verify /api/chat config = 10/min |
| AC-1.3c | APIs → Rate Limiter | `middleware.ts` | Verify /api/leads config = 5/min |
| AC-1.3d | APIs → Rate Limiter | `middleware.ts` | Verify default config = 100/min |
| AC-1.3e | APIs → Rate Limiter | `lib/rate-limit.ts` | Unit test: expired entries removed after cleanup interval |
| AC-1.4a | Observability → Sentry | `sentry.*.config.ts` | Throw test error, verify appears in Sentry dashboard |
| AC-1.4b | Observability → Sentry | `sentry.*.config.ts` | Check env var usage in config |
| AC-1.4c | NFR Security → Sentry | `next.config.ts` (withSentryConfig) | Verify source maps in Sentry release |
| AC-1.5a | Observability → GA4 | `GoogleAnalytics.tsx` | Check gtag pageview call on navigation |
| AC-1.5b | APIs → GA4 Events | `lib/analytics.ts` | Unit test: each event function calls gtag correctly |
| AC-1.5c | NFR Performance → GA4 | `GoogleAnalytics.tsx` | Verify NODE_ENV check in component |
| AC-1.6a | Detailed Design → vitest.config | `vitest.config.ts`, `package.json` | `npm test` runs and exits cleanly |
| AC-1.6b | Detailed Design → vitest.config | `vitest.config.ts` | Import with `@/lib/...` resolves in test |
| AC-1.6c | Detailed Design → readiness.test | `lib/scoring/readiness.test.ts` | Test asserts correct score for known input |
| AC-1.6d | Detailed Design → lead-scoring.test | `lib/lead-scoring.test.ts` | Test asserts correct tier for known input |

---

## Risks, Assumptions, Open Questions

| # | Type | Description | Mitigation / Next Step |
|---|------|-------------|----------------------|
| 1 | **Assumption** | Coolify VPS has Docker installed and sufficient resources (2GB+ RAM, 20GB+ disk) | Verify before first deployment |
| 2 | **Assumption** | `sharp` works in `node:20-alpine` Docker image without additional system deps | Alpine includes needed libs; if not, add `libc6-compat` to Dockerfile |
| 3 | **Risk** | Sentry source map upload requires `SENTRY_AUTH_TOKEN` at build time, which must be available in Coolify's build environment | Configure as Coolify build-time secret |
| 4 | **Risk** | Existing `middleware.ts` auth logic may conflict with rate limiting order of operations | Rate limiting runs first (before auth check), short-circuits on 429 |
| 5 | **Assumption** | Coolify Traefik proxy passes `x-forwarded-for` or `x-real-ip` headers for accurate IP-based rate limiting | Verify in Coolify Traefik config |
| 6 | **Question** | Should rate limiting apply to static asset requests? | **No** — middleware matcher already excludes static assets via `matcher` config |
| 7 | **Assumption** | Prisma migrations work inside Docker build (network access to DB not needed — `prisma generate` is offline) | `prisma migrate deploy` runs at container start, not build time |
| 8 | **Risk** | GA4 debug mode requires separate verification in GA4 dashboard | Include setup instructions in story |

---

## Test Strategy Summary

### Test Levels

| Level | Framework | Scope | Story |
|-------|-----------|-------|-------|
| Unit tests | Vitest | `lib/rate-limit.ts`, `lib/analytics.ts`, scoring algorithms | 1.3, 1.5, 1.6 |
| Integration tests | Manual | Docker build + run, docker-compose up, middleware behavior | 1.1, 1.2, 1.3 |
| Smoke tests | Manual | Sentry error capture, GA4 event firing, container health | 1.4, 1.5, 1.1 |

### Testing Priorities

1. **Rate limiter** — Unit tests for sliding window logic, cleanup, and tier routing (business-critical security)
2. **Scoring algorithms** — Unit tests for `calculateReadinessScore()` and `calculateEnhancedLeadScore()` (business-critical math, already exist and are testable)
3. **GA4 event helpers** — Unit tests for correct gtag call format per event type
4. **Docker build** — Manual integration test: build → run → serve
5. **Sentry** — Manual smoke test: throw error → verify in Sentry dashboard

### Coverage Goals

- `lib/rate-limit.ts`: 90%+ (all branches: allowed, denied, cleanup, tier selection)
- `lib/scoring/readiness.ts`: 80%+ (edge cases: min/max scores, each category boundary)
- `lib/lead-scoring.ts`: 80%+ (edge cases: each tier boundary, each factor)
- `lib/analytics.ts`: 60%+ (verify event shape, mock gtag)

### Test File Locations

Tests co-located with source files per architecture convention:
- `lib/rate-limit.test.ts`
- `lib/scoring/readiness.test.ts`
- `lib/lead-scoring.test.ts`
- `lib/analytics.test.ts`
