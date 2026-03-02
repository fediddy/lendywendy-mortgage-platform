# Technical Specification — Epic 3: Mortgage Readiness Score

**Author:** Claude Opus 4.6
**Date:** 2026-03-02
**Epic:** E3 — Mortgage Readiness Score
**Type:** Brownfield Upgrade (significant existing code)

---

## Overview

Epic 3 upgrades the existing mortgage readiness assessment with animated transitions, score counter animation, proper email-gated lead capture with TCPA compliance, and platform-specific social sharing.

## Existing Code Inventory

| Component | File | Status | Notes |
|-----------|------|--------|-------|
| Scoring Algorithm | `lib/scoring/readiness.ts` | **Complete** | 7 dimensions, 100-point scale, 10 tests |
| Wizard Component | `components/readiness/ReadinessAssessment.tsx` | **Needs Upgrade** | 398 lines, 10 questions, basic score display |
| Page | `app/readiness-score/page.tsx` | **Complete** | Hero, assessment, trust section |
| API Endpoint | `app/api/readiness/route.ts` | **Needs Upgrade** | Basic POST, no Zod validation, no TCPA |
| Scoring Tests | `lib/scoring/readiness.test.ts` | **Complete** | 10 tests passing |

## Story Gap Analysis

### Story 3.1: Assessment Wizard UI
- **Existing:** Questions array, step navigation, progress bar, back button, auto-advance, location text input
- **Gaps:** CSS transitions (fade between questions), mobile viewport optimization, GA4 `assessment_started` event
- **Estimate:** Small upgrade

### Story 3.2: Score Reveal with Animation
- **Existing:** Score display with color coding, category label/description, improvement tips
- **Gaps:** Animated counter (0 → score via requestAnimationFrame), progress bars for dimensional breakdown (currently text grid), stagger animation for tips
- **Estimate:** Medium upgrade

### Story 3.3: Email Gate and Lead Creation
- **Existing:** Email input + submit, API creates ReadinessAssessment + Lead records, enum mapping helpers
- **Gaps:** Name/phone fields, TCPA consent checkbox, email "gate" (teaser vs full breakdown), Zod validation in API, `assessment_completed` and `assessment_lead_captured` GA4 events, lead scoring integration
- **Estimate:** Medium upgrade

### Story 3.4: Social Sharing
- **Existing:** Web Share API + clipboard fallback, share text template
- **Gaps:** Platform-specific buttons (Twitter, Facebook, LinkedIn), UTM parameters, `assessment_shared` GA4 event, share available before email capture
- **Estimate:** Small upgrade

## Architecture Decisions

1. **All state client-side:** No DB writes until email capture. Score calculated via `calculateReadinessScore()` client-side.
2. **Single component:** Keep all wizard logic in `ReadinessAssessment.tsx` — not worth splitting into sub-components for 4 screens (wizard, score, email, share).
3. **API validation:** Add Zod schema to `/api/readiness` matching the pattern from `/api/leads`.
4. **GA4 events:** `assessment_started` (first question), `assessment_completed` (score shown), `assessment_lead_captured` (email submitted), `assessment_shared` (share clicked).

## Acceptance Criteria Cross-Reference

| AC | Story | Implementation Location |
|----|-------|------------------------|
| AC-3.1a: One question per screen | 3.1 | ReadinessAssessment.tsx (exists) |
| AC-3.1b: Progress bar | 3.1 | ReadinessAssessment.tsx (exists) |
| AC-3.1c: Auto-advance | 3.1 | ReadinessAssessment.tsx (exists) |
| AC-3.1d: Back navigation | 3.1 | ReadinessAssessment.tsx (exists) |
| AC-3.1e: CSS transitions | 3.1 | ReadinessAssessment.tsx (new) |
| AC-3.2a: Animated counter | 3.2 | ReadinessAssessment.tsx (new) |
| AC-3.2b: Color-coded categories | 3.2 | ReadinessAssessment.tsx (exists) |
| AC-3.2c: Progress bars for breakdown | 3.2 | ReadinessAssessment.tsx (new) |
| AC-3.2d: Improvement tips | 3.2 | ReadinessAssessment.tsx (exists) |
| AC-3.3a: Name/email/phone form | 3.3 | ReadinessAssessment.tsx (new) |
| AC-3.3b: TCPA consent | 3.3 | ReadinessAssessment.tsx (new) |
| AC-3.3c: API with Zod | 3.3 | app/api/readiness/route.ts (upgrade) |
| AC-3.3d: Lead scoring | 3.3 | app/api/readiness/route.ts (new) |
| AC-3.3e: Email gate reveal | 3.3 | ReadinessAssessment.tsx (new) |
| AC-3.4a: Platform share buttons | 3.4 | ReadinessAssessment.tsx (new) |
| AC-3.4b: UTM parameters | 3.4 | ReadinessAssessment.tsx (new) |
| AC-3.4c: Share without email | 3.4 | ReadinessAssessment.tsx (new) |
| AC-3.4d: GA4 event | 3.4 | ReadinessAssessment.tsx (new) |
