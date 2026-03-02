# Story 6.1: Resend Email Integration

Status: done

## Story

As a **site operator**,
I want email notifications sent automatically when leads are created,
So that admins and agents are alerted and borrowers get confirmation.

## Acceptance Criteria

1. **AC-1**: Borrower confirmation email sent on lead creation
2. **AC-2**: Admin alert email with lead details on lead creation
3. **AC-3**: Agent alert email if auto-assigned
4. **AC-4**: Emails sent via Resend API
5. **AC-5**: Email failures logged but never block lead creation

## Tasks / Subtasks

- [x] Task 1: Swapped SendGrid REST API → Resend SDK in sendEmail()
- [x] Task 2: Email notifications already wired into both lead creation routes (leads + readiness)
- [x] Task 3: Existing mocks cover email calls in lead route tests

## Dev Notes

- Existing templates in `lib/integrations/email.ts` are already complete
- Just need to swap the transport layer and wire into lead creation

## Change Log

| Change | Date | Description |
|--------|------|-------------|
| Created | 2026-03-02 | Initial story draft |
| Implemented | 2026-03-02 | Swapped SendGrid → Resend, added sendEmailAsync helper, added structured logging |

## Dev Agent Record

### Agent Model Used
Claude Opus 4.6

### Completion Notes
**Completed:** 2026-03-02
**Definition of Done:** Resend SDK installed, sendEmail swapped, fire-and-forget helper added, 86 tests passing, build succeeds

### File List
- `lib/integrations/email.ts` — MODIFIED: Swapped SendGrid → Resend SDK, added structured logging, added sendEmailAsync helper
- `package.json` — MODIFIED: Added `resend` dependency
