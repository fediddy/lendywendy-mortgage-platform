# Story 2.1: Upgrade Chat API to SSE Streaming

Status: done

## Story

As a **visitor**,
I want to see the AI advisor's response appear word-by-word in real-time,
so that the conversation feels natural and responsive.

## Acceptance Criteria

1. **AC-1**: POST `/api/chat` returns `Content-Type: text/event-stream` with SSE-formatted token chunks
2. **AC-2**: Each SSE chunk is formatted as `data: {"content": "token"}\n\n`
3. **AC-3**: Stream ends with `data: [DONE]\n\n`
4. **AC-4**: After streaming completes, user message + full assistant response persisted to DB (fire-and-forget)
5. **AC-5**: GET `/api/chat?sessionId=xxx` returns conversation history (unchanged behavior)
6. **AC-6**: If DeepSeek API fails, response is non-streaming JSON with fallback message

## Tasks / Subtasks

- [x] Task 1: Upgrade POST handler to SSE streaming (AC: #1, #2, #3)
  - [x] Replace `sendChatMessage()` call with `streamChatMessage()` async generator
  - [x] Create a `ReadableStream` that pipes tokens from the async generator
  - [x] Format each token as SSE: `data: {"content": "token"}\n\n`
  - [x] Send `data: [DONE]\n\n` when generator exhausts
  - [x] Return `new Response(readableStream, { headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache", "Connection": "keep-alive" } })`
- [x] Task 2: Buffer full response for DB persistence (AC: #4)
  - [x] Accumulate tokens into a response buffer string during streaming
  - [x] After stream completes, fire-and-forget: persist user Message + assistant Message to existing Conversation
  - [x] Use sequential `prisma.message.create()` calls
  - [x] Ensure DB failure does not affect the SSE response (wrap in try/catch, log errors)
- [x] Task 3: Add DeepSeek error handling fallback (AC: #6)
  - [x] Wrap `streamChatMessage()` call in try/catch
  - [x] On error: return non-streaming JSON `{ "error": "Failed to process chat message", "fallback": "I'm having a moment! You can also get help at /get-quote" }`
  - [x] Return appropriate HTTP status (500 for API errors)
- [x] Task 4: Verify GET endpoint unchanged (AC: #5)
  - [x] Confirm GET handler for conversation history still works after POST refactor
  - [x] No modifications needed to GET handler
- [x] Task 5: Add SSE proxy header for Coolify/Traefik (AC: #1)
  - [x] Add `X-Accel-Buffering: no` header to SSE response to prevent proxy buffering
- [x] Task 6: Write tests for streaming API (AC: #1, #2, #3, #4, #6)
  - [x] Unit test: mock `streamChatMessage()` → verify SSE chunk format (`data: {"content": "..."}\n\n`)
  - [x] Unit test: verify `[DONE]` sentinel sent at stream end
  - [x] Unit test: mock DeepSeek failure → verify fallback JSON response
  - [x] Co-locate test file: `app/api/chat/route.test.ts`

## Dev Notes

### Architecture and Constraints

- **Existing async generator**: `lib/ai/deepseek.ts` exports `streamChatMessage()` which already handles SSE parsing from DeepSeek's OpenAI-compatible API. It yields `string` tokens via an async generator. This function requires NO changes — it is consumed as-is. [Source: docs/tech-spec-epic-2.md#Detailed-Design]
- **ReadableStream pattern**: Pipe the async generator into a `ReadableStream` using a `ReadableStream` constructor with `pull(controller)` that calls `generator.next()` per pull. Use `TextEncoder` to encode SSE-formatted strings. [Source: docs/architecture.md#AI-Streaming]
- **Fire-and-forget DB persistence**: Buffer the full assistant response while streaming. After the stream closes, persist messages via fire-and-forget `.catch()`. Also handles `cancel()` to persist partial responses if client disconnects mid-stream. [Source: docs/tech-spec-epic-2.md#Workflows-and-Sequencing]
- **Rate limiting**: Already enforced at 10 req/min on `/api/chat` via `middleware.ts` (Story 1.3). No changes needed. [Source: docs/stories/1-3-rate-limiting-middleware.md]
- **Prisma models**: `Conversation`, `Message` models already exist with all needed fields. `Message.role` uses `MessageRole` enum (USER, ASSISTANT, SYSTEM). [Source: docs/tech-spec-epic-2.md#Data-Models-and-Contracts]
- **SSE through reverse proxy**: Coolify uses Traefik — add `X-Accel-Buffering: no` header to SSE responses to prevent chunk buffering. [Source: docs/tech-spec-epic-2.md#Risks-Assumptions-Open-Questions, Risk #5]

### Testing Standards

- Tests co-located with source: `app/api/chat/route.test.ts` [Source: docs/tech-spec-epic-2.md#Test-File-Locations]
- Vitest with jsdom environment, path aliases `@/` configured [Source: docs/stories/1-6-testing-infrastructure.md]
- Target 70%+ coverage on `app/api/chat/route.ts` [Source: docs/tech-spec-epic-2.md#Coverage-Goals]
- Mock `streamChatMessage()` to return a controlled async generator for deterministic tests
- Mock Prisma client for DB persistence assertions

### Project Structure Notes

- Modified file: `app/api/chat/route.ts` — upgrade POST handler only, GET handler unchanged
- New test file: `app/api/chat/route.test.ts` — 12 tests for SSE streaming and GET endpoint
- No changes to `lib/ai/deepseek.ts` or `lib/ai/system-prompt.ts`
- No Prisma schema changes

### Learnings from Previous Story

**From Story 1-6-testing-infrastructure (Status: done)**

- **Test Infrastructure Ready**: Vitest + RTL configured with `vitest.config.ts`, jsdom environment, and path aliases (`@/`). Use `npm test` for watch mode, `npm test:run` for single run.
- **Test Co-location Pattern**: Tests placed next to source files (e.g., `lib/scoring/readiness.test.ts`). Follow same pattern: `app/api/chat/route.test.ts`.
- **Prisma Client Available**: Prisma enums resolve in test files because `prisma generate` was already run. Mock Prisma client for DB tests rather than connecting to real DB.
- **Technical Debt**: `calculateEnhancedLeadScore` has a scale mismatch (max ~16, not 100). Not relevant to this story — deferred to Epic 5.
- **21 Tests Passing**: Test suite runs in ~600ms. New tests should maintain this fast execution.

[Source: docs/stories/1-6-testing-infrastructure.md#Dev-Agent-Record]

### References

- [Source: docs/tech-spec-epic-2.md#Detailed-Design] — Module table, API contracts, workflow sequencing
- [Source: docs/tech-spec-epic-2.md#Acceptance-Criteria] — AC-2.1a through AC-2.1f (authoritative)
- [Source: docs/tech-spec-epic-2.md#Test-Strategy-Summary] — SSE streaming test priorities, coverage goals
- [Source: docs/tech-spec-epic-2.md#Risks-Assumptions-Open-Questions] — Risk #5 (Traefik SSE buffering)
- [Source: docs/epics.md#Epic-2] — Story 2.1 definition and technical notes
- [Source: docs/architecture.md] — Pattern 1 (Conversational Lead Qualification), ADR-003 (rate limiting)
- [Source: docs/stories/1-6-testing-infrastructure.md] — Test infrastructure setup and patterns

## Change Log

| Change | Date | Description |
|--------|------|-------------|
| Created | 2026-03-01 | Initial story draft from tech-spec-epic-2.md and epics.md |
| Implemented | 2026-03-01 | SSE streaming upgrade complete, 12 tests passing, all ACs met |

## Dev Agent Record

### Context Reference

<!-- No context XML generated — proceeded with story file only -->

### Agent Model Used

Claude Opus 4.6

### Debug Log References

- Implementation plan: Replace `sendChatMessage(messages, false)` with `streamChatMessage(messages)` async generator, pipe into `ReadableStream` with `pull()` model, buffer tokens for fire-and-forget DB persistence.
- Used `pull(controller)` approach rather than `start(controller)` with async iteration — `pull` is called on demand by the consumer, providing natural backpressure.
- Added `cancel()` handler on ReadableStream to persist partial responses when client disconnects mid-stream.

### Completion Notes

**Completed:** 2026-03-01
**Definition of Done:** All acceptance criteria met, code reviewed, tests passing

### Completion Notes List

- Upgraded POST `/api/chat` from non-streaming JSON response to SSE streaming
- `streamChatMessage()` async generator consumed via `ReadableStream` with `pull()` model
- Each token formatted as `data: {"content":"token"}\n\n`, stream ends with `data: [DONE]\n\n`
- Full response buffered during streaming, persisted to DB via fire-and-forget after stream completes
- `cancel()` handler persists partial responses on client disconnect
- Fallback: DeepSeek errors return JSON with `{ error, fallback }` directing to `/get-quote`
- GET endpoint unchanged — verified via tests
- `X-Accel-Buffering: no` header added for Traefik/Coolify proxy compatibility
- 12 new tests: SSE format, [DONE] sentinel, headers, DB persistence, error fallback, input validation, GET endpoint
- All 33 tests passing (21 existing + 12 new), build passes

### File List

- `app/api/chat/route.ts` — MODIFIED: POST handler upgraded to SSE streaming with ReadableStream
- `app/api/chat/route.test.ts` — NEW: 12 tests covering SSE streaming, error handling, GET endpoint
