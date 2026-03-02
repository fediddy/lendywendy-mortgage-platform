# Epic 6: Integrations & Routing — Technical Context

## Existing Infrastructure

### Email Service (`lib/integrations/email.ts` — 358 lines)
- `sendEmail(data)` — SendGrid REST API (needs swap to Resend)
- `notifyAdminOfNewLead(lead)` — Full HTML admin alert template
- `notifyAgentOfNewLead(lead, agent)` — Full HTML agent notification template
- `sendLeadConfirmation(lead)` — Full HTML borrower confirmation template
- `matchAndNotifyAgent(lead)` — Agent routing + notification (BUG: uses invalid `prisma.agent.fields.weeklyCapacity`)
- Helper functions: `stripHtml`, `getScoreLabel`, `getScoreColor`, `formatLoanType`

### MaxBounty Service (`lib/integrations/maxbounty.ts` — 231 lines)
- `sendToMaxBounty(lead)` — Full MaxBounty webhook submission with payload mapping
- `retryFailedSubmissions(limit)` — Retries failed leads from last 7 days with 100ms delay
- Updates `maxBountySubmitted` and `maxBountyResponse` on Lead model

### What's Missing
- No webhook retry endpoint exists
- Email uses SendGrid (should be Resend per story requirements)
- Agent routing has a Prisma bug (can't compare field to field in `where` clause)
- None of the email/routing functions are wired into lead creation flows

## Gap Analysis

### Story 6.1: Resend Email Integration
| Requirement | Current State | Gap |
|-------------|--------------|-----|
| Resend API | Using SendGrid | Swap sendEmail() implementation |
| Three emails on lead creation | Templates exist | Wire into lead creation flows |
| Fire-and-forget | Not called at all currently | Add to lead creation without blocking |

### Story 6.2: Webhook Retry Cron Endpoint
| Requirement | Current State | Gap |
|-------------|--------------|-----|
| POST /api/webhooks/retry | No endpoint exists | Create route calling retryFailedSubmissions() |
| CRON_SECRET protection | N/A | Add header check |
| Reports processed/successful/failed | Function returns this | Just expose via endpoint |

### Story 6.3: Agent Routing Algorithm
| Requirement | Current State | Gap |
|-------------|--------------|-----|
| Location + loan type + capacity match | matchAndNotifyAgent exists | Fix Prisma query (field comparison bug) |
| Round-robin | Orders by currentWeekLeads asc | Already correct |
| Runs during lead creation | Not wired in | Wire into lead creation flows |

### Story 6.4: Agent Notification on Assignment
| Requirement | Current State | Gap |
|-------------|--------------|-----|
| Email to agent on assignment | notifyAgentOfNewLead() exists | Already implemented, just needs Resend swap |
| Lead detail link | Template has admin link | Already has "View in Dashboard" |

## Implementation Plan

1. Install `resend` package, swap `sendEmail()` to use Resend API
2. Create webhook retry endpoint
3. Extract `matchAndNotifyAgent()` to proper `lib/agent-routing.ts`, fix Prisma query
4. Wire email + routing into lead creation API routes
