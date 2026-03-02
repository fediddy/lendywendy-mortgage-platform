# Story 8.1: Mobile Optimization

Status: done

## Story

As a **mobile visitor**,
I want every page and feature to work flawlessly on my phone,
So that I can engage with the site on any device.

## Acceptance Criteria

1. **AC-1**: All content readable without horizontal scrolling at 375px width
2. **AC-2**: Chat widget opens as full-screen overlay on mobile (already done)
3. **AC-3**: All tap targets are at least 44x44px
4. **AC-4**: Mobile CTA bar is visible and functional
5. **AC-5**: Chat toggle button doesn't overlap MobileCTA on mobile
6. **AC-6**: Mobile hamburger button has aria-label

## Tasks / Subtasks

- [x] Task 1: Fix chat toggle button position overlap with MobileCTA — added `max-md:bottom-24`
- [x] Task 2: Ensure quick-reply bubbles in chat have min 44px height — added `min-h-[44px]`
- [x] Task 3: Add aria-label to mobile hamburger button in header — added `aria-label` + `aria-expanded`
- [x] Task 4: Increase mobile menu link tap targets — changed `py-1.5` to `py-2.5 min-h-[44px]`
- [x] Task 5: Add aria-label to MobileCTA link + ensure 44px min height
- [x] Task 6: Move notification badge above MobileCTA on mobile — `max-md:bottom-40`

## Dev Notes

### Already Complete
- ChatWidget full-screen overlay on mobile (`inset-0`, `100dvh`)
- MobileCTA component with `md:hidden` and page-aware hiding
- Header mobile menu with full nav sections
- Layout `pb-20 md:pb-0` for MobileCTA clearance
- Chat input font-size 16px on mobile (prevents iOS auto-zoom)

### Key Changes
- Chat toggle: hide on mobile (let MobileCTA + OpenChatButton handle it) OR move above MobileCTA
- Quick reply buttons: add `min-h-[44px]` for tap target compliance
- Header hamburger: add `aria-label="Toggle menu"`

## Change Log

| Change | Date | Description |
|--------|------|-------------|
| Created | 2026-03-02 | Initial story draft |
| Completed | 2026-03-02 | All mobile fixes applied |

## Dev Agent Record
### Agent Model Used
Claude Opus 4.6

### Completion Notes
**Completed:** 2026-03-02
**Definition of Done:** All ACs met — tap targets 44px, chat button repositioned above MobileCTA on mobile, aria-labels added. 94 tests passing, build succeeds.

### File List
- `components/layout/header.tsx` — MODIFIED: aria-label + aria-expanded on hamburger, 44px tap targets on mobile menu links
- `components/chat/ChatWidget.tsx` — MODIFIED: repositioned toggle above MobileCTA on mobile, 44px quick-reply buttons, moved notification badge
- `components/layout/mobile-cta.tsx` — MODIFIED: added aria-label, min-h 44px
