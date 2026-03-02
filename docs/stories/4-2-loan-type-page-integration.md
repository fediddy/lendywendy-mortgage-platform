# Story 4.2: Loan Type Page Integration

Status: done

## Story

As a **visitor on a loan type page**,
I want the AI advisor pre-prompted for my loan type and a readiness score CTA,
So that I get relevant help without explaining my situation from scratch.

## Acceptance Criteria

1. **AC-1**: Each loan type page includes a "Check Your Readiness Score" CTA section
2. **AC-2**: FAQ section with FAQ schema markup (already implemented via StructuredData faqItems)
3. **AC-3**: Floating chat widget already global via layout — verified present

## Tasks / Subtasks

- [x] Task 1: Create shared ReadinessCTA component (AC: #1)
  - [x] Score visualization teaser with CTA to /readiness-score
  - [x] Reusable server component for all loan and metro pages
- [x] Task 2: Add ReadinessCTA to all 13 loan product pages (AC: #1)
  - [x] Investment: dscr-loans, fix-and-flip, bridge-loans, portfolio-loans, hard-money
  - [x] Residential: conventional, fha, va, jumbo
  - [x] Commercial: sba-7a-loans, sba-504-loans, conventional-cre, construction-loans
- [x] Task 3: Verify FAQ schema (AC: #2)
  - [x] faqItems prop passed to StructuredData on pages with FAQ content (already working)

## Dev Notes

### Architecture

- ReadinessCTA: Server component, no state — pure presentation + link
- Placed just before `</main>` on each loan page, giving natural flow from product info to assessment
- FAQ schema already handled by StructuredData component when faqItems prop is provided

### References

- [Source: docs/tech-spec-epic-4.md]
- [Source: docs/epics.md#Epic-4] — Story 4.2 definition

## Change Log

| Change | Date | Description |
|--------|------|-------------|
| Created | 2026-03-02 | Initial story draft |
| Implemented | 2026-03-02 | ReadinessCTA component, added to 13 loan pages |

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6

### Completion Notes

**Completed:** 2026-03-02
**Definition of Done:** All acceptance criteria met, 70 tests passing, build succeeds

### Completion Notes List

- Created ReadinessCTA as a reusable server component with teal/emerald gradient background
- Added to all 13 loan product pages (5 investment, 4 residential, 4 commercial)
- FAQ schema already implemented via StructuredData faqItems prop pattern
- ChatWidget already global via layout.tsx — no additional integration needed

### File List

- `components/readiness/ReadinessCTA.tsx` — NEW: Shared readiness score CTA component
- 13 loan product pages — MODIFIED: Added ReadinessCTA import and component
