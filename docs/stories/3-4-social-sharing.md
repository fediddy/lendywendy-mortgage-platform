# Story 3.4: Social Sharing

Status: done

## Story

As a **visitor**,
I want to easily share my readiness score on social media,
so that I can show my progress and encourage friends to check their mortgage readiness.

## Acceptance Criteria

1. **AC-1**: Platform-specific share buttons (Twitter/X, Facebook, LinkedIn) displayed on results
2. **AC-2**: Share URL includes UTM parameters (`?utm_source=share&utm_medium=social`)
3. **AC-3**: Sharing works without requiring email capture first (score visible before gate)
4. **AC-4**: `assessment_shared` GA4 event fires when share is clicked
5. **AC-5**: Mobile uses Web Share API with fallback to direct platform links

## Tasks / Subtasks

- [x] Task 1: Add platform-specific share buttons (AC: #1, #5)
  - [x] Twitter/X intent link with score text
  - [x] Facebook sharer link
  - [x] LinkedIn share link
  - [x] Web Share API for mobile with fallback ("More" button)
- [x] Task 2: Add UTM parameters to share URLs (AC: #2)
  - [x] Base URL with `?utm_source=share&utm_medium=social&utm_campaign=readiness`
- [x] Task 3: Add assessment_shared GA4 event (AC: #4)
  - [x] Add to analytics.ts GAEvent union type
  - [x] Fire when any share button is clicked (includes platform in event data)
- [x] Task 4: Ensure sharing before email gate (AC: #3)
  - [x] Share buttons in separate card, visible alongside score before lead capture form
- [x] Task 5: Write tests (AC: #1, #4)
  - [x] Test: share buttons render on results screen (Twitter, Facebook, LinkedIn, More)
  - [x] Test: assessment_shared GA4 event fires on share click with platform

## Dev Notes

### Architecture

- Share buttons replace generic "Share Score" button in ScoreResults component
- Share logic moved from parent ReadinessAssessment into ScoreResults (self-contained)
- `SHARE_URL` constant with UTM parameters at module level
- Platform-specific: `window.open()` to intent/sharer URLs in new window
- "More" button uses Web Share API with clipboard fallback
- Share text: "I scored [score]/100 on the Mortgage Readiness Score! [category] Check yours:"

### References

- [Source: docs/tech-spec-epic-3.md]
- [Source: docs/epics.md#Epic-3] — Story 3.4 definition
- [Source: components/readiness/ReadinessAssessment.tsx] — ScoreResults component

## Change Log

| Change | Date | Description |
|--------|------|-------------|
| Created | 2026-03-02 | Initial story draft |
| Implemented | 2026-03-02 | Platform share buttons, UTM params, GA4 event, 2 tests |

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6

### Completion Notes

**Completed:** 2026-03-02
**Definition of Done:** All acceptance criteria met, 70 tests passing (2 new), build succeeds

### Completion Notes List

- Replaced single "Share Score" button with 4 platform-specific buttons: Twitter/X, Facebook, LinkedIn, More (Web Share API)
- Moved all share logic from parent ReadinessAssessment into ScoreResults — parent no longer has handleShare
- `SHARE_URL` module constant includes UTM parameters for attribution tracking
- `handleSharePlatform(platform)` opens intent URLs in popup window (600x400)
- `handleNativeShare()` uses Web Share API with clipboard fallback
- `assessment_shared` GA4 event includes score and platform name
- Share buttons placed in their own Card, between lead form and CTA — visible before email gate

### File List

- `components/readiness/ReadinessAssessment.tsx` — MODIFIED: Platform share buttons, share logic moved into ScoreResults, parent handleShare removed
- `components/readiness/ReadinessAssessment.test.tsx` — MODIFIED: 2 new tests (share buttons render, GA4 event on share)
- `lib/analytics.ts` — MODIFIED: Added assessment_shared event type with platform field
