# Story 3.3: Email Gate and Lead Creation

Status: done

## Story

As a **site operator**,
I want the detailed score breakdown gated behind an email capture,
so that completing the assessment generates a qualified lead.

## Acceptance Criteria

1. **AC-1**: Contact form asks for name, email, phone (optional), and TCPA consent
2. **AC-2**: Phone field encouraged but not required ("for priority matching")
3. **AC-3**: TCPA checkbox with compliance text required before submission
4. **AC-4**: POST /api/readiness creates ReadinessAssessment + Lead records
5. **AC-5**: Lead scoring applied via existing API
6. **AC-6**: After submission, full breakdown revealed (no page reload)
7. **AC-7**: `assessment_lead_captured` GA4 event fires on submission (new event type)

## Tasks / Subtasks

- [x] Task 1: Upgrade contact form with name, phone, TCPA (AC: #1, #2, #3)
  - [x] Add name field (required), phone field (optional), TCPA checkbox
  - [x] TCPA text: "I consent to be contacted about mortgage options..."
  - [x] Disable submit until name, email, and TCPA are filled
- [x] Task 2: Add name field to API and update submission (AC: #4, #5)
  - [x] Include name and phone in POST body
  - [x] Existing API already creates ReadinessAssessment + Lead records
- [x] Task 3: Add assessment_lead_captured GA4 event type (AC: #7)
  - [x] Add to analytics.ts GAEvent union type
  - [x] Fire on successful submission
- [x] Task 4: Write tests (AC: #1, #3, #7)
  - [x] Test: contact form requires name, email, TCPA before submit
  - [x] Test: assessment_lead_captured event fires on submission

## Dev Notes

### Architecture

- Contact form lives in ScoreResults component (ReadinessAssessment.tsx)
- Existing API `app/api/readiness/route.ts` already creates both records — just needs name/phone added
- TCPA pattern: same as ChatWidget (Story 2.4) — checkbox + compliance text + disabled submit

### References

- [Source: docs/tech-spec-epic-3.md]
- [Source: docs/epics.md#Epic-3] — Story 3.3 definition
- [Source: app/api/readiness/route.ts] — Existing readiness API

## Change Log

| Change | Date | Description |
|--------|------|-------------|
| Created | 2026-03-02 | Initial story draft |
| Implemented | 2026-03-02 | Contact form upgrade, API name/phone, GA4 event, 2 tests |

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6

### Completion Notes

**Completed:** 2026-03-02
**Definition of Done:** All acceptance criteria met, 68 tests passing (2 new), build succeeds

### Completion Notes List

- Refactored ScoreResults to manage its own contact form state (name, email, phone, tcpaConsent) instead of receiving props from parent
- Removed stale email/emailSubmitted state and handleEmailSubmit from parent ReadinessAssessment
- Added TCPA checkbox with compliance text matching ChatWidget pattern (Story 2.4)
- Phone field optional with "for priority matching" hint text
- Submit disabled until name, email, and TCPA consent are all provided
- API route updated to accept and persist name/phone fields on Lead record
- `assessment_lead_captured` GA4 event fires on successful submission
- Success state shows "Report Sent!" confirmation card

### File List

- `components/readiness/ReadinessAssessment.tsx` — MODIFIED: ScoreResults internal form, parent cleanup
- `components/readiness/ReadinessAssessment.test.tsx` — MODIFIED: 2 new tests (form gate, GA4 event), test helper extraction
- `app/api/readiness/route.ts` — MODIFIED: Accept name/phone fields
- `lib/analytics.ts` — MODIFIED: Added assessment_lead_captured event type
