# Story 2.3: Chat Session Persistence

Status: done

## Story

As a **visitor**,
I want my chat conversation to persist as I navigate between pages,
so that I don't lose my conversation when browsing different loan types.

## Acceptance Criteria

1. **AC-1**: `sessionId` generated on first interaction and stored in `sessionStorage`
2. **AC-2**: Message history maintained in React Context (survives page navigation)
3. **AC-3**: Browser tab close clears session — fresh start on next visit
4. **AC-4**: On mount with existing sessionId, optionally hydrate messages from GET API

## Tasks / Subtasks

- [x] Task 1: Create `ChatProvider` React Context (AC: #1, #2)
  - [x] Create `components/chat/ChatProvider.tsx` with context for messages, sessionId, isOpen, isLoading
  - [x] Export `ChatProvider` component and `useChatContext` hook
  - [x] Move sessionId generation and sessionStorage logic from ChatWidget into ChatProvider
  - [x] Move messages state from ChatWidget into ChatProvider
  - [x] Move `sendMessageWithContent` function to ChatProvider (business logic layer)
- [x] Task 2: Wire ChatProvider into layout (AC: #2)
  - [x] Wrap ChatWidget in `app/layout.tsx` with `<ChatProvider>`
  - [x] Refactor ChatWidget to consume context via `useChatContext()` instead of local state
  - [x] Remove duplicated state from ChatWidget (sessionId, messages, isLoading)
- [x] Task 3: Hydrate from GET API on mount (AC: #4)
  - [x] In ChatProvider, on mount with existing sessionId from sessionStorage, call GET `/api/chat?sessionId=xxx`
  - [x] Populate messages state from response
  - [x] Handle missing/empty conversation gracefully (no error, just empty state)
- [x] Task 4: Verify sessionStorage behavior (AC: #1, #3)
  - [x] sessionId stored in sessionStorage on first interaction
  - [x] Tab close clears sessionStorage (browser-native behavior)
  - [x] New tab gets fresh sessionId
- [x] Task 5: Write tests for ChatProvider (AC: #1, #2, #4)
  - [x] Unit test: sessionId generated on mount and stored in sessionStorage
  - [x] Unit test: messages persist in context across re-renders
  - [x] Unit test: hydrate from GET API when sessionId exists
  - [x] Co-locate test file: `components/chat/ChatProvider.test.tsx`

## Dev Notes

### Architecture and Constraints

- **ChatProvider pattern**: Create React Context wrapping root layout. Provides `{ messages, sessionId, isOpen, isLoading, sendMessage, setIsOpen }`. ChatWidget becomes a pure UI component consuming context. [Source: docs/tech-spec-epic-2.md#Detailed-Design]
- **sessionStorage is native behavior**: `sessionStorage` is automatically cleared when a browser tab closes. No code needed for AC-3 — it's a browser guarantee. [Source: docs/tech-spec-epic-2.md#Risks-Assumptions-Open-Questions, Assumption #6]
- **Bundle size**: ChatProvider should be < 5KB gzipped. It's a thin context wrapper with no external dependencies. [Source: docs/tech-spec-epic-2.md#Non-Functional-Requirements, Performance]
- **Hydration strategy**: On mount, if sessionStorage has a sessionId, GET `/api/chat?sessionId=xxx` returns historical messages. This is optional — if the API fails or returns empty, chat starts with greeting. [Source: docs/tech-spec-epic-2.md#Workflows-and-Sequencing]

### Testing Standards

- Tests co-located: `components/chat/ChatProvider.test.tsx` [Source: docs/tech-spec-epic-2.md#Test-File-Locations]
- Target 80%+ coverage on ChatProvider [Source: docs/tech-spec-epic-2.md#Coverage-Goals]
- Mock sessionStorage and fetch for isolated unit tests

### Project Structure Notes

- New file: `components/chat/ChatProvider.tsx` — React Context for chat state
- Modified file: `components/chat/ChatWidget.tsx` — refactored to consume context
- Modified file: `app/layout.tsx` — wrap with ChatProvider
- New test file: `components/chat/ChatProvider.test.tsx`

### Learnings from Previous Story

**From Story 2-2-floating-chat-widget-with-streaming (Status: done)**

- **SSE Streaming in ChatWidget**: `sendMessageWithContent` now uses `response.body.getReader()` + `parseSSEChunks()` for incremental token rendering. This function needs to move to ChatProvider.
- **isStreaming flag**: Messages have optional `isStreaming` boolean. Context form keyword detection skips streaming messages. Preserve this behavior.
- **Mobile responsive**: `isMobile` state with resize listener. This remains in ChatWidget (UI concern, not state).
- **chatStartedRef**: GA4 event guard. Move to ChatProvider since it tracks session state.
- **9 tests in ChatWidget.test.tsx**: `parseSSEChunks` tests stay in ChatWidget.test.tsx. GA4 mock tests may need updating.

[Source: docs/stories/2-2-floating-chat-widget-with-streaming.md#Dev-Agent-Record]

### References

- [Source: docs/tech-spec-epic-2.md#Detailed-Design] — ChatProvider module responsibility
- [Source: docs/tech-spec-epic-2.md#Acceptance-Criteria] — AC-2.3a through AC-2.3d
- [Source: docs/tech-spec-epic-2.md#Workflows-and-Sequencing] — Session persistence flow
- [Source: docs/tech-spec-epic-2.md#Non-Functional-Requirements] — Bundle size < 5KB
- [Source: docs/epics.md#Epic-2] — Story 2.3 definition and technical notes
- [Source: docs/stories/2-2-floating-chat-widget-with-streaming.md] — SSE streaming implementation details

## Change Log

| Change | Date | Description |
|--------|------|-------------|
| Created | 2026-03-01 | Initial story draft |
| Implemented | 2026-03-02 | ChatProvider context extraction, layout wiring, 8 tests passing |

## Dev Agent Record

### Context Reference

### Agent Model Used

Claude Opus 4.6

### Debug Log References

- ChatProvider imports `parseSSEChunks` from ChatWidget — avoids circular dependency since ChatWidget imports `useChatContext` from ChatProvider (different exports, not circular)
- `chatStartedRef` moved to ChatProvider to track session-level GA4 event alongside session state
- `loadConversation` renamed to `hydrateMessages` in ChatProvider for clarity
- ChatWidget `sendMessage` renamed to `sendUserMessage` internally to avoid shadowing context's `sendMessage`
- Contact form state (`showContactForm`, `contactForm`, `contactSubmitted`) stays in ChatWidget — these are UI-only concerns
- `isMobile`, `chatWidth/chatHeight` resize controls stay in ChatWidget — presentation layer only

### Completion Notes

**Completed:** 2026-03-02
**Definition of Done:** All acceptance criteria met, 50 tests passing (8 new), build succeeds

### Completion Notes List

- Created `ChatProvider` React Context with `messages`, `sessionId`, `isOpen`, `isLoading`, `sendMessage`, `setIsOpen`, `pageContext`, `setPageContext`
- Extracted session management (sessionId generation + sessionStorage) from ChatWidget to ChatProvider
- Extracted message state and sendMessage business logic (SSE streaming, GA4 tracking) to ChatProvider
- `hydrateMessages()` calls GET `/api/chat?sessionId=xxx` on mount when sessionId found in sessionStorage
- ChatWidget refactored to pure UI component consuming `useChatContext()` hook
- Wrapped `<ChatWidget>` with `<ChatProvider>` in `app/layout.tsx`
- 8 new unit tests in `ChatProvider.test.tsx`: sessionId generation, sessionStorage restore, GET API hydration, empty/failed API response, message persistence across re-renders, context error boundary, isOpen toggle
- All 50 tests passing (8 ChatProvider + 9 ChatWidget + 12 API + 11 lead-scoring + 10 readiness), build passes

### File List

- `components/chat/ChatProvider.tsx` — NEW: React Context for chat session state and business logic
- `components/chat/ChatProvider.test.tsx` — NEW: 8 unit tests
- `components/chat/ChatWidget.tsx` — MODIFIED: refactored to consume context via `useChatContext()`
- `components/chat/index.ts` — MODIFIED: exports ChatProvider, useChatContext, Message type
- `app/layout.tsx` — MODIFIED: wrapped ChatWidget with ChatProvider
