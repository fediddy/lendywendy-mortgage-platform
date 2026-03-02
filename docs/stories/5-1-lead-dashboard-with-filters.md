# Story 5.1: Lead Dashboard with Filters

Status: done

## Story

As an **admin**,
I want a dashboard showing all leads with filters and sorting,
So that I can quickly find and prioritize leads.

## Acceptance Criteria

1. **AC-1**: Table shows leads with columns: Name, Email, Source, Score, Status, Date
2. **AC-2**: Filters available for: source (AI Advisor/Score/Form), score category (hot/warm/cold), status, segment, date range
3. **AC-3**: Text search works on name, email, phone
4. **AC-4**: Sorting works on all columns
5. **AC-5**: Pagination shows 20 leads per page
6. **AC-6**: Dashboard loads in <2 seconds

## Tasks / Subtasks

- [x] Task 1: Add `leadSource` filter to API and `source` query param
- [x] Task 2: Add `tier` filter (hot/warm/cold) to API
- [x] Task 3: Add date range filters (`dateFrom`/`dateTo`) to API
- [x] Task 4: Add `sortBy`/`sortOrder` params to API with field validation
- [x] Task 5: Update frontend — add Source column with badge colors, source filter, tier filter
- [x] Task 6: Update frontend — add date range inputs
- [x] Task 7: Update frontend — sortable column headers with sort indicators
- [x] Task 8: Change pagination to 20/page (was 50)
- [x] Task 9: Add 9 tests for admin API (source/tier/date/sort filters + PATCH)

## Dev Notes

### Existing Code (Upgrades Only)
- Dashboard already has stats cards, status/segment/search/minScore filters, table, pagination, detail dialog
- API already has GET with filtering and PATCH for updates
- This story adds missing filters and sorting to existing infrastructure

### Source Badge Colors
- AI_ADVISOR → purple (`bg-purple-500`)
- READINESS_SCORE → blue (`bg-blue-500`)
- FORM → gray (`bg-gray-500`)
- CALCULATOR → teal (`bg-teal-500`)

## Change Log

| Change | Date | Description |
|--------|------|-------------|
| Created | 2026-03-02 | Initial story draft |
| Implemented | 2026-03-02 | Upgraded API + frontend with all new filters, sorting, source badges |

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6

### Completion Notes

**Completed:** 2026-03-02
**Definition of Done:** All ACs met, 79 tests passing, build succeeds

### File List

- `app/api/admin/leads/route.ts` — MODIFIED: Added source/tier/date filters, sorting, field validation, 20/page default, select clause
- `app/admin/leads/page.tsx` — MODIFIED: Added Source column with badges, source/tier/date filters, sortable headers, Lead interface updated with leadSource
- `app/api/admin/leads/route.test.ts` — NEW: 9 tests covering source/tier/date/sort filters and PATCH
