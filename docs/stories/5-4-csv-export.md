# Story 5.4: CSV Export

Status: done

## Story

As an **admin**,
I want to export filtered leads to CSV,
So that I can share lead data with partners or analyze in spreadsheets.

## Acceptance Criteria

1. **AC-1**: "Export CSV" button on leads dashboard
2. **AC-2**: CSV includes: Name, Email, Phone, Source, Segment, Loan Type, Score, Status, Location, Date, Agent
3. **AC-3**: Export respects current active filters
4. **AC-4**: Works for up to 10,000 leads

## Tasks / Subtasks

- [x] Task 1: Created GET `/api/admin/leads/export` — CSV response with same filter logic, 10K limit, proper escaping
- [x] Task 2: Added "Export CSV" button to dashboard header, passes all current filter params via window.open
- [x] Task 3: Added 4 tests: CSV format/headers, source filter, 10K limit, comma escaping

## Dev Notes

### Implementation
- Reuse filter logic from existing GET handler
- No pagination limit — fetch all matching leads up to 10K
- Return `Content-Type: text/csv` with `Content-Disposition: attachment`
- Frontend: construct URL with current filter params, trigger download via window.open or anchor tag

## Change Log

| Change | Date | Description |
|--------|------|-------------|
| Created | 2026-03-02 | Initial story draft |
| Implemented | 2026-03-02 | CSV export endpoint + dashboard button |

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6

### Completion Notes

**Completed:** 2026-03-02
**Definition of Done:** All ACs met, 86 tests passing, build succeeds

### File List

- `app/api/admin/leads/export/route.ts` — NEW: CSV export endpoint with filters, 10K limit, field escaping
- `app/api/admin/leads/export/route.test.ts` — NEW: 4 tests
- `app/admin/leads/page.tsx` — MODIFIED: Added "Export CSV" button in table card header
