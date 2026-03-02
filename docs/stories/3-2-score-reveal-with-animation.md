# Story 3.2: Score Reveal with Animation

Status: done

## Story

As a **visitor**,
I want to see my readiness score revealed with an engaging animation and personalized breakdown,
so that I feel rewarded for completing the assessment and understand my mortgage readiness.

## Acceptance Criteria

1. **AC-1**: Animated counter counts up from 0 to total score over ~1.5 seconds
2. **AC-2**: Score category displayed with color: Green (80+), Blue (60-79), Yellow (40-59), Orange (0-39)
3. **AC-3**: Category description from calculateReadinessScore() is shown
4. **AC-4**: Dimensional breakdown shows progress bars with labels and scores
5. **AC-5**: Improvement tips from getImprovementTips() displayed
6. **AC-6**: `assessment_completed` GA4 event fires when score is revealed

## Tasks / Subtasks

- [x] Task 1: Add animated score counter (AC: #1)
  - [x] Use useEffect + requestAnimationFrame to animate 0 → totalScore over ~1.5s
  - [x] Easing function for satisfying count-up feel
- [x] Task 2: Add progress bars for dimensional breakdown (AC: #4)
  - [x] Replace text grid with visual progress bars for each dimension
  - [x] Show dimension name, score, and max value
- [x] Task 3: Fire assessment_completed GA4 event (AC: #6)
  - [x] trackEvent with score and category when results screen mounts
- [x] Task 4: Verify existing behavior (AC: #2, #3, #5)
  - [x] Color-coded categories — already exist
  - [x] Category description — already exists
  - [x] Improvement tips — already exist
- [x] Task 5: Write tests
  - [x] Test: assessment_completed GA4 event fires with score and category
  - [x] Test: score breakdown shows all 6 dimensions

## Dev Notes

### Architecture

- Score reveal section already exists in ReadinessAssessment.tsx (the `if (score)` branch)
- Color helpers: `getScoreColor()`, `getScoreBgColor()` — already used
- `getImprovementTips()` — already called and displayed
- Animated counter: custom hook using `requestAnimationFrame` + easing (ease-out cubic)
- Progress bars: use Tailwind width percentages (`width: ${(score/maxScore)*100}%`)

### References

- [Source: docs/tech-spec-epic-3.md] — Story gap analysis
- [Source: docs/epics.md#Epic-3] — Story 3.2 definition
- [Source: components/readiness/ReadinessAssessment.tsx] — Existing score display

## Change Log

| Change | Date | Description |
|--------|------|-------------|
| Created | 2026-03-02 | Initial story draft |
| Implemented | 2026-03-02 | Animated counter, progress bars, GA4 event, 2 tests |

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6

### Completion Notes

**Completed:** 2026-03-02
**Definition of Done:** All acceptance criteria met, 66 tests passing (2 new), build succeeds

### Completion Notes List

- Extracted `ScoreResults` component from `ReadinessAssessment` for cleaner separation
- `useAnimatedCounter` hook: uses `requestAnimationFrame` with ease-out cubic easing, counts 0→score over 1.5s
- Dimensional breakdown now shows visual progress bars (6 dimensions with labels, scores, colored fill bars)
- `assessment_completed` GA4 event fires on mount with score and category
- Progress bars use `getScoreBgColor()` for color consistency with score card header
- `dimensions` array defines the 6 scoring dimensions with max values for percentage calculation

### File List

- `components/readiness/ReadinessAssessment.tsx` — MODIFIED: ScoreResults component, useAnimatedCounter hook, progress bars, GA4 event
- `components/readiness/ReadinessAssessment.test.tsx` — MODIFIED: 2 new tests (GA4 event, dimensional breakdown)
