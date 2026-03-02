# Story 2.5: Chat Error Handling and Edge Cases

Status: done

## Story

As a **visitor**,
I want the chat to handle errors gracefully without crashing,
so that I always have a path to get help even if something goes wrong.

## Acceptance Criteria

1. **AC-1**: DeepSeek failure shows friendly fallback with link to `/get-quote`
2. **AC-2**: Rate limit (429) shows "try again in a minute" message
3. **AC-3**: 15-second client timeout on API call
4. **AC-4**: Errors logged to Sentry with sessionId context
5. **AC-5**: Empty/whitespace messages cannot be sent
6. **AC-6**: Typing indicator shows during AI response, disappears on error

## Tasks / Subtasks

- [x] Task 1: Add 15-second timeout to chat API fetch (AC: #3)
  - [x] Wrap fetch call with AbortController + setTimeout(15000)
  - [x] On timeout, show fallback message and clean up loading state
- [x] Task 2: Differentiate 429 vs other errors (AC: #1, #2)
  - [x] Check response.status for 429 specifically
  - [x] 429: "I'm getting a lot of questions right now. Please try again in a minute!"
  - [x] Other errors: include link to /get-quote in fallback
- [x] Task 3: Add Sentry error logging for chat errors (AC: #4)
  - [x] Import Sentry client-side
  - [x] On chat error, call captureException with sessionId context
  - [x] Do NOT log 429 to Sentry (expected behavior from rate limiting)
- [x] Task 4: Verify existing behavior (AC: #5, #6)
  - [x] Empty/whitespace messages already blocked by sendMessage guard
  - [x] Typing indicator (isLoading + loading dots) already shows during API call
  - [x] Verify isLoading resets on error (already in finally block)
- [x] Task 5: Write tests (AC: #1, #2, #3)
  - [x] Unit test: 429 response shows rate limit message (and no Sentry call)
  - [x] Unit test: 500 response shows fallback with /get-quote reference (and Sentry call)
  - [x] Unit test: network error shows fallback with /get-quote (and Sentry call)

## Dev Notes

### Architecture and Constraints

- **Error handling lives in ChatProvider**: The `sendMessage` function in ChatProvider.tsx handles all API calls. Error handling, timeout, and Sentry logging happen here. [Source: components/chat/ChatProvider.tsx]
- **Sentry client-side**: `@sentry/nextjs` is installed and configured in `sentry.client.config.ts`. Use `Sentry.captureException()` for error reporting. ChatProvider is a client component ('use client'). [Source: sentry.client.config.ts]
- **Rate limiting already exists**: 10 req/min per IP on `/api/chat` from Epic 1 (Story 1.3). When exceeded, API returns 429. Client needs to detect and show appropriate message. [Source: docs/tech-spec-epic-2.md]
- **AbortController for timeout**: Use `AbortController` + `signal` option on fetch. `setTimeout` triggers `controller.abort()` after 15 seconds. Catch `AbortError` for timeout-specific handling. [Source: docs/tech-spec-epic-2.md#Reliability-Availability]
- **Empty message guard**: Already exists — `if (!messageContent.trim() || isLoading) return;` in ChatProvider.sendMessage. Button also disabled when `!input.trim()` in ChatWidget. [Source: components/chat/ChatProvider.tsx, components/chat/ChatWidget.tsx]
- **Typing indicator**: Already works — `isLoading` state drives loading dots display. `isLoading` set in `finally` block guarantees cleanup on error. [Source: components/chat/ChatProvider.tsx]

### Learnings from Previous Story

**From Story 2-4-chat-to-lead-conversion (Status: done)**

- **ChatProvider owns sendMessage**: All API call logic is in `ChatProvider.sendMessage`. Error handling changes go here.
- **ChatWidget is pure UI**: Widget consumes `isLoading` from context for typing indicator. No error handling logic in ChatWidget.
- **56 tests passing**: 8 ChatProvider + 9 ChatWidget + 12 API chat + 6 API leads + 11 lead-scoring + 10 readiness.

[Source: docs/stories/2-4-chat-to-lead-conversion.md#Dev-Agent-Record]

### References

- [Source: docs/tech-spec-epic-2.md#Acceptance-Criteria] — AC-2.5a through AC-2.5f
- [Source: docs/tech-spec-epic-2.md#Reliability-Availability] — Error handling strategy
- [Source: docs/tech-spec-epic-2.md#Observability-Matrix] — Sentry error tracking
- [Source: docs/epics.md#Epic-2] — Story 2.5 definition
- [Source: docs/stories/2-4-chat-to-lead-conversion.md] — Current ChatProvider architecture

## Change Log

| Change | Date | Description |
|--------|------|-------------|
| Created | 2026-03-02 | Initial story draft |
| Implemented | 2026-03-02 | Timeout, error differentiation, Sentry logging, 3 tests |

## Dev Agent Record

### Context Reference

### Agent Model Used

Claude Opus 4.6

### Debug Log References

- `AbortController` + `setTimeout(15_000)` for 15-second timeout — `clearTimeout` in `finally` prevents memory leaks
- `AbortError` is caught separately from other errors for timeout-specific fallback message
- 429 detection: `response.status === 429` checked before generic error handling — deliberately not logged to Sentry (rate limiting is expected behavior)
- `Sentry.captureException` called with `{ tags: { component: 'chat' }, extra: { sessionId, status } }` for context
- AC-5 (empty messages) and AC-6 (typing indicator) were already implemented — verified existing guards work correctly

### Completion Notes

**Completed:** 2026-03-02
**Definition of Done:** All acceptance criteria met, 59 tests passing (3 new), build succeeds

### Completion Notes List

- Added `AbortController` with 15-second timeout to chat API fetch in ChatProvider
- Differentiated 429 (rate limit) vs other HTTP errors — different user-facing messages
- 429 shows: "I'm getting a lot of questions right now. Please try again in a minute!"
- 500/other errors show: "I'm having a moment! You can also get help by filling out our quick form at /get-quote"
- Timeout shows: "I'm taking too long to respond. You can also get help by filling out our quick form at /get-quote"
- `Sentry.captureException` logs all errors except 429 with sessionId context and component tag
- Empty message guard already existed (`!messageContent.trim()` check) — verified working
- Typing indicator (loading dots) already worked — `isLoading` set/cleared correctly, `finally` block guarantees cleanup
- 3 new tests: 429 rate limit message + no Sentry, 500 fallback with /get-quote + Sentry, network error + Sentry
- All 59 tests passing (11 ChatProvider + 9 ChatWidget + 12 API chat + 6 API leads + 11 lead-scoring + 10 readiness), build passes

### File List

- `components/chat/ChatProvider.tsx` — MODIFIED: AbortController timeout, 429 detection, Sentry logging, /get-quote fallback messages
- `components/chat/ChatProvider.test.tsx` — MODIFIED: 3 new error handling tests (429, 500, network error)
