# Story 8.2: Accessibility Audit

Status: done

## Story

As a **visitor with disabilities**,
I want the site to be accessible with screen readers and keyboard navigation,
So that I can use the site regardless of ability.

## Acceptance Criteria

1. **AC-1**: All form inputs have associated labels
2. **AC-2**: Chat widget is keyboard-navigable (Tab, Enter, Escape to close)
3. **AC-3**: Focus indicators visible on all interactive elements
4. **AC-4**: ARIA labels present on chat widget and assessment
5. **AC-5**: Score reveal animation respects `prefers-reduced-motion`
6. **AC-6**: All images have descriptive alt text

## Tasks / Subtasks

- [x] Task 1: Add Escape key handler to close chat widget
- [x] Task 2: Add `role="dialog"` and `aria-modal` to chat Card when open
- [x] Task 3: Add `prefers-reduced-motion` global CSS rule to disable animations
- [x] Task 4: Add aria-labels to chat resize buttons
- [x] Task 5: Add sr-only labels + htmlFor/id to chat contact form inputs
- [x] Task 6: Add aria-label to main chat text input
- [x] Task 7: Add autoComplete attributes to contact form (name, email, tel)
- [x] Task 8: Add `:focus-visible` outline rule in globals.css

## Change Log

| Change | Date | Description |
|--------|------|-------------|
| Created | 2026-03-02 | Initial story draft |
| Completed | 2026-03-02 | All accessibility fixes applied |

## Dev Agent Record
### Agent Model Used
Claude Opus 4.6

### Completion Notes
**Completed:** 2026-03-02
**Definition of Done:** All ACs met — Escape key closes chat, role=dialog + aria-modal, prefers-reduced-motion CSS, aria-labels on all interactive elements, form labels linked, focus-visible outline. 94 tests passing, build succeeds.

### File List
- `components/chat/ChatWidget.tsx` — MODIFIED: Escape handler, role=dialog, aria-labels, form label connections, autoComplete
- `app/globals.css` — MODIFIED: prefers-reduced-motion rule, focus-visible outline
