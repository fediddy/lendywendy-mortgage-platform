# Story 1.2: Local Development Environment

Status: done

## Story

As a **developer**,
I want a `docker-compose.yml` for local PostgreSQL and an `.env.example` template,
so that any developer can set up the project locally in minutes.

## Acceptance Criteria

1. **AC-1**: `docker compose up -d` starts a PostgreSQL 17 container on port 5432
2. **AC-2**: `.env.example` lists all required environment variables with placeholder values (Resend, not SendGrid)
3. **AC-3**: After copying `.env.example` to `.env.local` and running `npx prisma migrate dev`, the database is ready
4. **AC-4**: `npm run dev` starts the development server successfully

## Tasks / Subtasks

- [x] Task 1: Create `docker-compose.yml` (AC: #1)
  - [x] PostgreSQL 17 Alpine image
  - [x] Credentials: lendywendy/localdev
  - [x] Named volume for data persistence
- [x] Task 2: Update `.env.example` (AC: #2)
  - [x] Replace SendGrid vars with Resend vars
  - [x] Add CRON_SECRET for webhook retry endpoint
  - [x] Add SENTRY_AUTH_TOKEN for build-time source maps
  - [x] Document all vars with comments
- [x] Task 3: Verify setup flow (AC: #3, #4)

## Dev Notes

### Learnings from Previous Story

**From Story 1-1-configure-coolify-deployment (Status: done)**

- **New File Created**: `Dockerfile` — multi-stage build at project root
- **New File Created**: `.dockerignore` — excludes docs, bmad, node_modules
- **Architectural Decision**: `outputFileTracingRoot: path.join(__dirname)` required in `next.config.ts` due to nested directory structure
- **sharp installed**: Production dependency for self-hosted `next/image`
- **Standalone verified**: `.next/standalone/server.js` at 158MB

[Source: docs/stories/1-1-configure-coolify-deployment.md#Dev-Agent-Record]

### References

- [Source: docs/architecture.md#Development-Environment] — docker-compose template, setup commands
- [Source: docs/architecture.md#Environment-Variables] — Full env var list
- [Source: docs/tech-spec-epic-1.md#Dependencies-and-Integrations] — External services table
- [Source: docs/epics.md#Story-1.2] — Original story definition

## Changelog

| Date | Change | Author |
|------|--------|--------|
| 2026-03-01 | Story drafted and implemented | Claude Opus 4.6 (Dev) |

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6

### Debug Log References

No issues encountered.

### Completion Notes List

- `docker-compose.yml` uses PostgreSQL 17 Alpine for consistency with production (Coolify also runs PG 17)
- Local DATABASE_URL uses `lendywendy:localdev@localhost:5432/lendywendy` — matches architecture doc
- `.env.example` updated to use Resend instead of SendGrid per ADR-005
- Added `CRON_SECRET` for webhook retry endpoint auth (Story 6.2 will use this)
- Added `SENTRY_AUTH_TOKEN` comment noting it's build-time only

### File List

- **NEW**: `docker-compose.yml` — Local PostgreSQL 17 service with named volume
- **MODIFIED**: `.env.example` — Replaced SendGrid with Resend, added CRON_SECRET and SENTRY_AUTH_TOKEN
