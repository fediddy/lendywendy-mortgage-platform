# Story 8.5: Launch Monitoring Setup

Status: done

## Story

As a **site operator**,
I want monitoring and alerting configured before launch,
So that I'm immediately aware of any production issues.

## Acceptance Criteria

1. **AC-1**: Sentry is capturing errors with proper source maps
2. **AC-2**: Coolify health checks configured (HTTP check on `/`)
3. **AC-3**: Basic runbook exists (deploy, rollback, check logs)
4. **AC-4**: Database backup awareness documented

## Tasks / Subtasks

- [x] Task 1: Verified Sentry source map config — `widenClientFileUpload: true` already set
- [x] Task 2: Created `app/api/health/route.ts` — checks app + database, returns 200/503
- [x] Task 3: Created `docs/runbook.md` — deploy, rollback, health checks, monitoring, logs, DB backup, common issues
- [x] Task 4: Created `app/api/health/route.test.ts` — 2 tests (healthy + degraded)

## Dev Notes

### Already Complete
- Sentry configured with `withSentryConfig` in next.config.ts (widenClientFileUpload: true)
- GA4 configured with afterInteractive loading
- Coolify deployment configured in Story 1.1

## Change Log

| Change | Date | Description |
|--------|------|-------------|
| Created | 2026-03-02 | Initial story draft |
| Completed | 2026-03-02 | Health endpoint, runbook, and tests added |

## Dev Agent Record
### Agent Model Used
Claude Opus 4.6

### Completion Notes
**Completed:** 2026-03-02
**Definition of Done:** All ACs met — health check endpoint with DB check, production runbook, Sentry source maps verified. 96 tests passing, build succeeds.

### File List
- `app/api/health/route.ts` — NEW: Health check endpoint (app + database)
- `app/api/health/route.test.ts` — NEW: 2 tests (healthy, degraded)
- `docs/runbook.md` — NEW: Production runbook (deploy, rollback, monitoring, logs, DB, troubleshooting)
