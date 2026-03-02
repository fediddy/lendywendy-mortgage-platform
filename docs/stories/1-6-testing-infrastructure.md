# Story 1.6: Testing Infrastructure

Status: done

## Story

As a **developer**,
I want Vitest and React Testing Library configured with example tests,
so that subsequent stories can include tests for business-critical logic.

## Acceptance Criteria

1. **AC-1**: `npm test` runs Vitest with all `*.test.ts` and `*.test.tsx` files
2. **AC-2**: `vitest.config.ts` configured with path aliases (`@/`), jsdom environment, and RTL setup
3. **AC-3**: Example unit test for `lib/scoring/readiness.ts` passes
4. **AC-4**: Example unit test for `lib/lead-scoring.ts` passes
5. **AC-5**: `npm test` passes with all tests green

## Tasks / Subtasks

- [x] Task 1: Install test dependencies (AC: all)
  - [x] vitest, @testing-library/react, @testing-library/jest-dom, jsdom, @testing-library/user-event
- [x] Task 2: Create `vitest.config.ts` (AC: #2)
  - [x] jsdom environment
  - [x] Setup file for jest-dom matchers
  - [x] Path alias `@/` matching tsconfig
- [x] Task 3: Create `vitest.setup.ts` (AC: #2)
  - [x] Import @testing-library/jest-dom/vitest
- [x] Task 4: Add scripts to package.json (AC: #1)
  - [x] `"test": "vitest"` (watch mode)
  - [x] `"test:run": "vitest run"` (single run)
- [x] Task 5: Write readiness scoring tests (AC: #3)
  - [x] 10 tests covering all categories, dimension scoring, color helpers
- [x] Task 6: Write lead scoring tests (AC: #4)
  - [x] 11 tests covering scoring, breakdown, qualification, DTI, recommendations
  - [x] Documented pre-existing scoring scale bug (max 16 instead of 100)
- [x] Task 7: Verify all tests pass (AC: #5)

## Dev Notes

- Tests co-located with source: `lib/scoring/readiness.test.ts`, `lib/lead-scoring.test.ts`
- Lead scoring imports Prisma enums — they resolve because Prisma client was already generated
- **Bug discovered**: `calculateEnhancedLeadScore` has a scale mismatch — weighted sub-scores max at ~16, not 100. Tier thresholds (80/60) are unreachable. All leads classify as "cold". This needs fixing when lead scoring is revisited in Epic 5.

## Dev Agent Record

### Completion Notes
- 21 tests across 2 files, all passing
- Test suite runs in ~600ms
- Readiness scoring tests: 10 tests covering all 4 categories, individual dimension scoring, and color helpers
- Lead scoring tests: 11 tests including DTI calculations, qualification determination, and investment vs residential comparison
- Discovered and documented pre-existing scoring scale bug

### Files Created/Modified
- `vitest.config.ts` — NEW: test configuration with jsdom + path aliases
- `vitest.setup.ts` — NEW: testing library setup
- `lib/scoring/readiness.test.ts` — NEW: 10 readiness scoring tests
- `lib/lead-scoring.test.ts` — NEW: 11 lead scoring tests
- `package.json` — MODIFIED: added test and test:run scripts
