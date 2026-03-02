# Story 6.2: Webhook Retry Cron Endpoint

Status: done

## Story

As a **site operator**,
I want failed MaxBounty webhook submissions to be automatically retried,
So that no leads are lost due to transient failures.

## Acceptance Criteria

1. **AC-1**: POST `/api/webhooks/retry` retries failed MaxBounty submissions
2. **AC-2**: Endpoint processes up to 100 failed leads per run
3. **AC-3**: Response reports processed/successful/failed counts
4. **AC-4**: Endpoint protected with CRON_SECRET header

## Tasks / Subtasks

- [x] Task 1: Created POST `/api/webhooks/retry` calling retryFailedSubmissions(100)
- [x] Task 2: Added Bearer CRON_SECRET header check (read at request time for testability)
- [x] Task 3: Added 3 tests: unauthorized (no header), wrong secret, successful retry with counts

## Change Log

| Change | Date | Description |
|--------|------|-------------|
| Created | 2026-03-02 | Initial story draft |
| Implemented | 2026-03-02 | Cron endpoint with auth + structured logging |

## Dev Agent Record
### Agent Model Used
Claude Opus 4.6

### Completion Notes
**Completed:** 2026-03-02
**Definition of Done:** All ACs met, 89 tests passing, build succeeds

### File List
- `app/api/webhooks/retry/route.ts` — NEW: POST endpoint with CRON_SECRET auth
- `app/api/webhooks/retry/route.test.ts` — NEW: 3 tests
