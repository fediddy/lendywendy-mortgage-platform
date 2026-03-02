# Story 1.5: Google Analytics 4

Status: done

## Story

As a **site operator**,
I want GA4 tracking on all pages with custom events for lead funnel tracking,
so that I can measure visitor behavior and conversion rates.

## Acceptance Criteria

1. **AC-1**: GA4 pageview is tracked on every page load
2. **AC-2**: `GoogleAnalytics` component loads gtag.js script via `next/script` (afterInteractive)
3. **AC-3**: Measurement ID loaded from `NEXT_PUBLIC_GA_MEASUREMENT_ID` environment variable
4. **AC-4**: Custom event helpers available for: `chat_started`, `chat_lead_captured`, `assessment_started`, `assessment_completed`, `lead_submitted`
5. **AC-5**: GA4 only loads in production (`NODE_ENV === 'production'`)

## Tasks / Subtasks

- [x] Task 1: Create `lib/analytics.ts` with typed event helpers (AC: #4)
  - [x] Discriminated union type `GAEvent` for all 5 event types
  - [x] `trackEvent()` function that calls `window.gtag()` with correct params
  - [x] No-op when gtag is not loaded (dev environment safety)
- [x] Task 2: Create `components/analytics/GoogleAnalytics.tsx` (AC: #1, #2, #3, #5)
  - [x] `'use client'` component using `next/script`
  - [x] Loads gtag.js with `afterInteractive` strategy (non-blocking)
  - [x] Returns null in non-production or when measurement ID is missing
- [x] Task 3: Add `<GoogleAnalytics />` to `app/layout.tsx` (AC: #1)
- [x] Task 4: Verify build succeeds

## Dev Notes

- The `GAEvent` type is a discriminated union — TypeScript enforces correct payload for each event
- `trackEvent()` is a no-op if `window.gtag` doesn't exist (safe in SSR and dev)
- `afterInteractive` strategy means the GA4 script loads after hydration — no LCP impact
- Events will be called from Epic 2 (chat) and Epic 3 (readiness) components when they're built

## Dev Agent Record

### Completion Notes
- Build verified successfully
- GA4 component placed in `<body>` before Header for earliest loading after hydration
- Event helpers typed with discriminated union — impossible to send malformed events

### Files Created/Modified
- `lib/analytics.ts` — NEW: typed GA4 event helpers (20 lines)
- `components/analytics/GoogleAnalytics.tsx` — NEW: GA4 script loader component
- `app/layout.tsx` — MODIFIED: added GoogleAnalytics import and component
