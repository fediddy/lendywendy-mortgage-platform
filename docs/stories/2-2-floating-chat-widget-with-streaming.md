# Story 2.2: Floating Chat Widget with Streaming

Status: done

## Story

As a **visitor**,
I want a floating chat bubble on every page that opens into a conversation window with real-time streaming responses,
so that I can ask mortgage questions from anywhere on the site and see Wendy's answers appear naturally.

## Acceptance Criteria

1. **AC-1**: Chat widget opens/closes on bubble click, persists across pages
2. **AC-2**: AI responses render token-by-token (typing effect) during streaming
3. **AC-3**: Widget works on desktop (floating panel, bottom-right) and mobile (full-screen overlay)
4. **AC-4**: `chat_started` GA4 event fires when user sends first message in session

## Tasks / Subtasks

- [x] Task 1: Upgrade `sendMessageWithContent` to consume SSE stream (AC: #2)
  - [x] Replace `response.json()` with `response.body.getReader()` + `TextDecoder`
  - [x] Parse SSE chunks: split on `\n\n`, extract `data:` prefix, parse JSON `{"content":"token"}`
  - [x] Append each token to a streaming message in state (typing effect)
  - [x] Handle `data: [DONE]` sentinel to finalize the message
  - [x] Handle non-SSE error responses (JSON fallback from API)
- [x] Task 2: Add mobile-responsive full-screen overlay (AC: #3)
  - [x] Detect mobile viewport via `window.innerWidth < 768` with resize listener
  - [x] On mobile: render chat as full-screen overlay with `fixed inset-0` instead of positioned card
  - [x] On desktop: keep existing floating panel (bottom-right) behavior
  - [x] Use `100dvh` for mobile height to handle iOS Safari dynamic viewport
- [x] Task 3: Fire `chat_started` GA4 event (AC: #4)
  - [x] Import `trackEvent` from `@/lib/analytics`
  - [x] On first user message in session, fire `trackEvent({ event: 'chat_started', pageUrl })`
  - [x] Use ref (`chatStartedRef`) to ensure event fires only once per session
- [x] Task 4: Verify open/close and cross-page persistence (AC: #1)
  - [x] Bubble click toggles chat window open/close
  - [x] Widget mounted in `app/layout.tsx` for cross-page persistence (already done)
  - [x] sessionId persists in sessionStorage across navigation
- [x] Task 5: Write tests for streaming consumption and GA4 event (AC: #2, #4)
  - [x] 7 unit tests for `parseSSEChunks`: single chunk, multiple chunks, [DONE] sentinel, incomplete buffer, invalid JSON, empty buffer, non-data lines
  - [x] 2 unit tests for GA4 `trackEvent` mock validation
  - [x] Co-located test file: `components/chat/ChatWidget.test.tsx`

## Dev Notes

### Architecture and Constraints

- **Existing ChatWidget**: `components/chat/ChatWidget.tsx` was a 481-line client component with floating bubble, resize controls, quick replies, inline contact form with keyword detection, and sessionStorage for sessionId. Used `response.json()` for non-streaming response — now upgraded to SSE stream consumption. [Source: docs/tech-spec-epic-2.md#Detailed-Design]
- **SSE stream consumption**: Client reads `response.body.getReader()` + `TextDecoder`, parses SSE chunks via exported `parseSSEChunks()` utility. Each token appended to streaming message via functional state update to avoid stale closures. Streaming cursor (pulsing `|`) shown during stream. [Source: docs/tech-spec-epic-2.md#Workflows-and-Sequencing]
- **Mobile overlay**: `isMobile` state driven by `window.innerWidth < 768` with resize listener. Mobile renders `fixed inset-0` full-screen with `100dvh` height. Close button added to header on mobile (no resize controls). Desktop retains positioned floating panel. [Source: docs/tech-spec-epic-2.md#Risks-Assumptions-Open-Questions, Risk #7]
- **Contact form guard**: Contact keyword detection now skips messages with `isStreaming: true` to avoid premature form display during incomplete responses.

### Testing Standards

- Tests co-located: `components/chat/ChatWidget.test.tsx` [Source: docs/tech-spec-epic-2.md#Test-File-Locations]
- `parseSSEChunks` exported as pure function for easy unit testing
- GA4 tracking tested via mock — `trackEvent` is mocked at module level

### Project Structure Notes

- Modified file: `components/chat/ChatWidget.tsx` — SSE streaming, mobile responsive, GA4 event
- New test file: `components/chat/ChatWidget.test.tsx` — 9 tests

### Learnings from Previous Story

**From Story 2-1-upgrade-chat-api-to-sse-streaming (Status: done)**

- **SSE API Format**: `data: {"content":"token"}\n\n` with `data: [DONE]\n\n` sentinel. Error fallback returns JSON `{ error, fallback }`. Client must detect Content-Type to handle both.
- **ReadableStream API Pattern**: Use `response.body.getReader()` + `TextDecoder` on client. Buffer incomplete chunks between reads.
- **12 API tests exist**: `app/api/chat/route.test.ts` covers server-side SSE format. Client tests complement these.
- **X-Accel-Buffering header**: SSE chunks should arrive unbuffered through Traefik proxy.

[Source: docs/stories/2-1-upgrade-chat-api-to-sse-streaming.md#Dev-Agent-Record]

### References

- [Source: docs/tech-spec-epic-2.md#Detailed-Design] — ChatWidget module responsibility
- [Source: docs/tech-spec-epic-2.md#Acceptance-Criteria] — AC-2.2a through AC-2.2d
- [Source: docs/tech-spec-epic-2.md#Workflows-and-Sequencing] — Chat message flow steps 7-9
- [Source: docs/tech-spec-epic-2.md#Risks-Assumptions-Open-Questions] — Risk #7 (iOS Safari)
- [Source: docs/epics.md#Epic-2] — Story 2.2 definition
- [Source: docs/stories/2-1-upgrade-chat-api-to-sse-streaming.md] — SSE format contract

## Change Log

| Change | Date | Description |
|--------|------|-------------|
| Created | 2026-03-01 | Initial story draft from tech-spec-epic-2.md and epics.md |
| Implemented | 2026-03-01 | SSE streaming consumption, mobile overlay, GA4 event, 9 tests passing |

## Dev Agent Record

### Context Reference

<!-- No context XML generated -->

### Agent Model Used

Claude Opus 4.6

### Debug Log References

- Extracted `parseSSEChunks()` as exported pure function for testability
- Used `isStreaming` flag on Message interface to track which message is currently streaming
- Functional state updates (`setMessages(prev => ...)`) to avoid stale closure issues during async stream loop
- `chatStartedRef` (useRef) guards GA4 event to fire exactly once per component lifecycle
- Contact form keyword detection skips `isStreaming` messages to prevent premature triggers
- Loading dots only shown when no streaming message exists (avoids double indicator)

### Completion Notes

**Completed:** 2026-03-01
**Definition of Done:** All acceptance criteria met, tests passing

### Completion Notes List

- Upgraded ChatWidget from `response.json()` to SSE stream consumption via `ReadableStream` reader
- Tokens appended incrementally to streaming message with pulsing cursor indicator
- `parseSSEChunks()` exported for unit testing: handles multi-chunk parsing, [DONE] sentinel, incomplete buffers
- Mobile full-screen overlay: `fixed inset-0` with `100dvh`, close button in header, no resize controls
- Desktop: existing floating panel behavior preserved
- `chat_started` GA4 event fires on first user message per session (ref-guarded)
- Content-Type detection: handles both SSE stream and JSON fallback responses
- 9 new tests (42 total), build passes

### File List

- `components/chat/ChatWidget.tsx` — MODIFIED: SSE streaming consumption, mobile responsive, GA4 event
- `components/chat/ChatWidget.test.tsx` — NEW: 9 tests for parseSSEChunks and GA4 tracking
