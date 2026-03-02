# Story 4.1: Homepage Redesign

Status: done

## Story

As a **visitor**,
I want a compelling homepage that immediately shows me two paths to get help — chat with AI or check my score,
So that I engage with the site instead of bouncing.

## Acceptance Criteria

1. **AC-1**: Hero section has dual CTA buttons: "Chat with AI Advisor" and "Check Your Readiness Score"
2. **AC-2**: "How it works" 3-step process below the hero (Ask Wendy → Get Your Score → Connect with Expert)
3. **AC-3**: Existing loan type cards and California focus messaging retained
4. **AC-4**: Trust signals and compliance disclaimers present
5. **AC-5**: "Chat with AI Advisor" CTA opens the ChatWidget
6. **AC-6**: "Check Your Readiness Score" links to /readiness-score

## Tasks / Subtasks

- [x] Task 1: Add dual CTA buttons to hero (AC: #1, #5, #6)
  - [x] Add "Chat with AI Advisor" button via OpenChatButton component (dynamic import, ssr:false)
  - [x] Add "Check Your Readiness Score" link button to /readiness-score
  - [x] Keep existing "Compare Investor Rates" as primary, dual CTAs as secondary row below
- [x] Task 2: Add "How it works" 3-step section (AC: #2)
  - [x] Step 1: Ask Wendy (MessageCircle icon, teal)
  - [x] Step 2: Get Your Score (ClipboardCheck icon, blue)
  - [x] Step 3: Connect with Experts (Handshake icon, emerald)
- [x] Task 3: Verify existing sections (AC: #3, #4)
  - [x] Investor loan products, residential loans — present
  - [x] California markets section — present
  - [x] Compliance disclaimer — present
  - [x] Trust bar — present

## Dev Notes

### Architecture

- OpenChatButton is a separate client component that uses useChatContext to open the chat
- Imported via `dynamic()` with `ssr: false` to avoid SSR prerender error (ChatProvider not available during static generation)
- "How it works" section uses static Tailwind classes (not dynamic) to avoid JIT purging issues
- Existing hero content preserved; dual CTAs added as subtle secondary row

### References

- [Source: docs/tech-spec-epic-4.md]
- [Source: docs/epics.md#Epic-4] — Story 4.1 definition
- [Source: app/page.tsx] — Homepage
- [Source: docs/ux-redesign-mockup.html] — Design direction

## Change Log

| Change | Date | Description |
|--------|------|-------------|
| Created | 2026-03-02 | Initial story draft |
| Implemented | 2026-03-02 | Dual CTA, How it works section, OpenChatButton component |

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6

### Completion Notes

**Completed:** 2026-03-02
**Definition of Done:** All acceptance criteria met, 70 tests passing, build succeeds

### Completion Notes List

- Created OpenChatButton component for safe chat widget triggering from any page
- Used next/dynamic with ssr:false to avoid ChatProvider SSR error during static generation
- Added "How it works" 3-step section between hero and investor loans
- Dual CTA row shows "Chat with AI Advisor" and "Check Your Readiness Score" below hero primary CTA
- Avoided dynamic Tailwind classes — used explicit static class names for JIT compatibility

### File List

- `app/page.tsx` — MODIFIED: Dual CTA row, "How it works" section, dynamic import
- `components/chat/OpenChatButton.tsx` — NEW: Reusable button to open chat from any page
