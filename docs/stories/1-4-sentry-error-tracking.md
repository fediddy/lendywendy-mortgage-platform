# Story 1.4: Sentry Error Tracking

Status: done

## Story

As a **site operator**,
I want Sentry integrated for error tracking on both server and client,
so that I'm alerted to production errors and can debug them with stack traces.

## Acceptance Criteria

1. **AC-1**: `@sentry/nextjs` captures unhandled server and client errors with stack traces
2. **AC-2**: Sentry DSN loaded from `SENTRY_DSN` (server) and `NEXT_PUBLIC_SENTRY_DSN` (client) environment variables
3. **AC-3**: Source maps uploaded via `SENTRY_AUTH_TOKEN` at build time for readable stack traces
4. **AC-4**: Edge runtime errors (middleware) captured via `sentry.edge.config.ts`
5. **AC-5**: Session replay captures 100% of error sessions for debugging context

## Tasks / Subtasks

- [x] Task 1: Install `@sentry/nextjs` (AC: all)
- [x] Task 2: Create `sentry.client.config.ts` (AC: #1, #2, #5)
  - [x] Init with NEXT_PUBLIC_SENTRY_DSN
  - [x] Error replay at 100%, session replay at 0% (errors only)
  - [x] Performance traces at 10% prod / 100% dev
  - [x] Export onRouterTransitionStart for navigation tracing
- [x] Task 3: Create `sentry.server.config.ts` (AC: #1, #2)
  - [x] Init with SENTRY_DSN
  - [x] Performance traces at 10% prod / 100% dev
- [x] Task 4: Create `sentry.edge.config.ts` (AC: #4)
  - [x] Init with SENTRY_DSN for edge runtime
- [x] Task 5: Create `instrumentation.ts` (AC: #1, #4)
  - [x] Dynamic import of server/edge configs based on NEXT_RUNTIME
  - [x] Export onRequestError for server component + middleware error capture
- [x] Task 6: Wrap `next.config.ts` with `withSentryConfig` (AC: #3)
  - [x] Source map upload via SENTRY_AUTH_TOKEN
  - [x] widenClientFileUpload for better stack traces
  - [x] Silent in non-CI environments
- [x] Task 7: Update `.env.example` (AC: #2)
  - [x] Add NEXT_PUBLIC_SENTRY_DSN, SENTRY_ORG, SENTRY_PROJECT
- [x] Task 8: Verify build succeeds

## Dev Notes

- Sentry needs 3 separate config files for 3 runtimes: Node.js, Edge, Browser
- `instrumentation.ts` is the Next.js instrumentation hook — Sentry uses it to load server/edge configs at startup
- `SENTRY_AUTH_TOKEN` is build-time only — set in Coolify build secrets, not in runtime env
- Source map upload only happens when `SENTRY_AUTH_TOKEN` is set (graceful no-op otherwise)
- Client uses `NEXT_PUBLIC_SENTRY_DSN` (public prefix required for client-side access)

## Dev Agent Record

### Completion Notes
- Installed @sentry/nextjs (206 packages added)
- Build verified successfully with Sentry wrapping next.config.ts
- Source maps won't upload locally since SENTRY_AUTH_TOKEN isn't set — this is expected behavior
- Replay integration included for 100% error session capture (0% normal sessions to save quota)

### Files Created/Modified
- `sentry.client.config.ts` — NEW: browser SDK init
- `sentry.server.config.ts` — NEW: Node.js SDK init
- `sentry.edge.config.ts` — NEW: edge runtime SDK init
- `instrumentation.ts` — NEW: Next.js instrumentation hook
- `next.config.ts` — MODIFIED: wrapped with withSentryConfig
- `.env.example` — MODIFIED: added NEXT_PUBLIC_SENTRY_DSN, SENTRY_ORG, SENTRY_PROJECT
