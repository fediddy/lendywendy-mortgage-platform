# Story 5.2: Lead Detail View

Status: done

## Story

As an **admin**,
I want to see full details of any lead including their AI conversation or assessment data,
So that I can understand the lead's situation before reaching out.

## Acceptance Criteria

1. **AC-1**: Detail view shows all contact info and qualification data
2. **AC-2**: Lead score with breakdown shown
3. **AC-3**: AI Advisor leads show full conversation transcript
4. **AC-4**: Readiness Score leads show assessment responses and score breakdown
5. **AC-5**: TCPA consent details shown
6. **AC-6**: Detail view accessible via click on lead row or View button

## Tasks / Subtasks

- [x] Task 1: Created GET `/api/admin/leads/[id]` route with includes for conversation+messages, readinessAssessment, assignedAgent
- [x] Task 2: Updated detail dialog to fetch full details on open (lazy loading)
- [x] Task 3: Added conversation transcript with chat bubble UI (USER right-aligned, ASSISTANT left-aligned)
- [x] Task 4: Added assessment score breakdown with 7 dimension progress bars
- [x] Task 5: Added TCPA consent section with badge and timestamp
- [x] Task 6: Added 2 tests for single-lead API (success + 404)

## Dev Notes

### Data Relationships
- Lead → Conversation (1:1 optional, via leadId) → Messages (1:many)
- Lead → ReadinessAssessment (1:1 optional, via leadId)
- Conversation transcript: render Message[] as chat bubbles (USER vs ASSISTANT)
- Assessment: parse responses JSON, show dimension scores as progress bars

## Change Log

| Change | Date | Description |
|--------|------|-------------|
| Created | 2026-03-02 | Initial story draft |
| Implemented | 2026-03-02 | New detail API, enhanced dialog with transcript/assessment/TCPA |

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6

### Completion Notes

**Completed:** 2026-03-02
**Definition of Done:** All ACs met, 81 tests passing, build succeeds

### File List

- `app/api/admin/leads/[id]/route.ts` — NEW: Single-lead GET with conversation+messages, readinessAssessment, assignedAgent
- `app/api/admin/leads/[id]/route.test.ts` — NEW: 2 tests
- `app/admin/leads/page.tsx` — MODIFIED: Added LeadDetail type, lazy-load detail, conversation bubbles, assessment bars, TCPA section
