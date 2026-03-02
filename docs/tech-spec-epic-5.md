# Epic 5: Lead Management & Admin — Technical Context

## Existing Infrastructure

### Admin Dashboard (`app/admin/leads/page.tsx` — 555 lines)
- **Stats cards**: Total, Hot (≥80), Warm (60-79), Cold (<60)
- **Status distribution**: Shows badge counts per LeadStatus
- **Filters**: Search (name/email/phone), Status, Segment, Min Score, Clear Filters
- **Table columns**: Name, Contact, Segment, Loan Type, Score, Status, Property Value, Created, Actions (View button)
- **Pagination**: 50/page with Previous/Next buttons
- **Lead detail dialog**: Basic Dialog with contact info grid + update form (status dropdown, assignedTo text input, notes textarea)

### Admin API (`app/api/admin/leads/route.ts` — 177 lines)
- **GET**: Paginated, filtered (status, segment, minScore, search), includes stats (byStatus, byTier)
- **PATCH**: Updates status, notes, assignedTo; sets contactedAt/convertedAt timestamps

### Prisma Models
- **Lead**: Full model with `leadSource` (LeadSource enum), `assignedAgentId` (FK to Agent), `conversation` (Conversation?), `readinessAssessment` (ReadinessAssessment?)
- **Agent**: name, email, phone, company, locations, states, loanTypes, segments, weeklyCapacity, status (AgentStatus)
- **Conversation**: messages (Message[]), sessionId, qualification data, leadId
- **Message**: role (USER/ASSISTANT/SYSTEM), content (Text)
- **ReadinessAssessment**: responses (JSON text), totalScore, 7 dimension scores, category, leadId

### Enums
- `LeadSource`: AI_ADVISOR, READINESS_SCORE, FORM, CALCULATOR
- `LeadStatus`: NEW, CONTACTED, QUALIFIED, QUOTE_SENT, IN_PROCESS, CONVERTED, CLOSED_LOST, NURTURE
- `AgentStatus`: ACTIVE, INACTIVE, SUSPENDED

## Gap Analysis

### Story 5.1: Lead Dashboard with Filters
| Requirement | Current State | Gap |
|-------------|--------------|-----|
| Source column + badge | Not shown | Add `leadSource` to Lead interface, source column, source badge colors |
| Source filter (AI_ADVISOR/READINESS_SCORE/FORM) | Not available | Add `source` filter dropdown + API param |
| Score category filter (hot/warm/cold) | Only `minScore` number input | Add tier filter dropdown |
| Date range filter | Not available | Add date range inputs + API params |
| Column sorting | Only `createdAt desc` | Add sortBy/sortOrder params + clickable headers |
| 20 leads/page | Currently 50 | Change limit to 20 |
| <2s load time | Already fast | Verify with indexes |

### Story 5.2: Lead Detail View
| Requirement | Current State | Gap |
|-------------|--------------|-----|
| All contact info | Basic info grid | Already sufficient |
| Score breakdown | Only total score shown | Fetch ReadinessAssessment dimension scores |
| AI conversation transcript | Not shown | Fetch Conversation with Messages, render chat bubbles |
| Assessment responses | Not shown | Fetch ReadinessAssessment responses JSON, render dimension bars |
| TCPA consent details | Not shown | Show tcpaConsent, consentTimestamp |
| Status history | Not tracked | Out of scope (no StatusHistory model) — show timestamps instead |

### Story 5.3: Lead Status Workflow and Agent Assignment
| Requirement | Current State | Gap |
|-------------|--------------|-----|
| Status dropdown | Already exists | Already implemented |
| Agent dropdown from DB | Text input for assignedTo | Replace with Select fetching from Agent model |
| Assignment timestamp | `assignedAt` field on Lead | Set in PATCH handler |
| Notes | Already exists | Already implemented |
| Immediate save | Already exists | Already implemented |

### Story 5.4: CSV Export
| Requirement | Current State | Gap |
|-------------|--------------|-----|
| Export button | Not present | Add button to dashboard |
| CSV endpoint | Not present | New GET `/api/admin/leads/export` |
| Applies current filters | N/A | Pass same filter params |
| Up to 10K leads | N/A | Stream response, no pagination limit |
| PII included | N/A | Admin-only route |

## Implementation Notes

- The Lead interface in the frontend needs `leadSource` and `assignedAgentId` fields added
- Agent assignment should use `assignedAgentId` (FK to Agent) not the free-text `assignedTo` field
- Conversation/Assessment data only fetched when opening detail view (separate API call or include on single-lead GET)
- CSV export can reuse the same filter logic from the GET handler
