# Story 5.3: Lead Status Workflow and Agent Assignment

Status: done

## Story

As an **admin**,
I want to update lead status and assign leads to agents,
So that I can manage the sales pipeline.

## Acceptance Criteria

1. **AC-1**: Status dropdown with full workflow (NEW → CONTACTED → QUALIFIED → IN_PROCESS → CONVERTED/CLOSED_LOST)
2. **AC-2**: Agent assigned from dropdown of active agents (from DB)
3. **AC-3**: Assignment recorded with timestamp
4. **AC-4**: Notes can be added to lead record
5. **AC-5**: Status changes saved immediately via API

## Tasks / Subtasks

- [x] Task 1: Created GET `/api/admin/agents` endpoint returning active agents (id, name, email)
- [x] Task 2: Replaced text input with agent Select dropdown in detail dialog (fetches on mount)
- [x] Task 3: Updated PATCH handler: `assignedTo` → `assignedAgentId`, sets `assignedAt` timestamp on assignment
- [x] Task 4: Added test for agent assignment with assignedAt timestamp

## Dev Notes

### Existing Infrastructure
- Status dropdown already exists and works
- Notes textarea already exists and works
- PATCH handler already updates status/notes/assignedTo
- Need to: convert assignedTo text → assignedAgentId FK, add agents endpoint, add assignedAt timestamp

## Change Log

| Change | Date | Description |
|--------|------|-------------|
| Created | 2026-03-02 | Initial story draft |
| Implemented | 2026-03-02 | Agents endpoint, agent dropdown, assignedAgentId + assignedAt in PATCH |

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6

### Completion Notes

**Completed:** 2026-03-02
**Definition of Done:** All ACs met, 82 tests passing, build succeeds

### File List

- `app/api/admin/agents/route.ts` — NEW: GET active agents endpoint
- `app/api/admin/leads/route.ts` — MODIFIED: PATCH uses assignedAgentId + assignedAt
- `app/admin/leads/page.tsx` — MODIFIED: Agent dropdown replaces text input, fetches agents on mount
- `app/api/admin/leads/route.test.ts` — MODIFIED: Added agent assignment test
