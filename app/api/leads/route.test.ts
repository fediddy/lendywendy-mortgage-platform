import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';

// Mock prisma
vi.mock('@/lib/db', () => ({
  prisma: {
    lead: {
      create: vi.fn(),
    },
    conversation: {
      findUnique: vi.fn(),
      update: vi.fn(),
    },
  },
}));

// Mock lead-scoring
vi.mock('@/lib/lead-scoring', () => ({
  calculateEnhancedLeadScore: vi.fn(() => ({
    score: 75,
    tier: 'warm',
    qualification: 'qualified',
    breakdown: {},
    recommendations: [],
  })),
}));

// Mock logger
vi.mock('@/lib/logger', () => ({
  logger: {
    info: vi.fn(),
    error: vi.fn(),
    warn: vi.fn(),
  },
}));

// Mock webhooks
vi.mock('@/lib/webhooks', () => ({
  sendWebhook: vi.fn(() => Promise.resolve()),
}));

// Mock MaxBounty
vi.mock('@/lib/integrations/maxbounty', () => ({
  sendToMaxBounty: vi.fn(() => Promise.resolve()),
}));

// Mock email
vi.mock('@/lib/integrations/email', () => ({
  notifyAdminOfNewLead: vi.fn(() => Promise.resolve()),
  sendLeadConfirmation: vi.fn(() => Promise.resolve()),
  matchAndNotifyAgent: vi.fn(() => Promise.resolve()),
}));

import { POST } from './route';
import { prisma } from '@/lib/db';

const mockedPrisma = vi.mocked(prisma);

function makeRequest(body: Record<string, unknown>) {
  return new NextRequest('http://localhost:3000/api/leads', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

const validLeadBody = {
  name: 'John Doe',
  email: 'john@example.com',
  phone: '555-0123',
  segment: 'RESIDENTIAL',
  loanType: 'PURCHASE',
};

describe('POST /api/leads', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockedPrisma.lead.create.mockResolvedValue({
      id: 'lead_123',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '555-0123',
      segment: 'RESIDENTIAL',
      loanType: 'PURCHASE',
      score: 75,
      status: 'NEW',
    } as never);
  });

  it('creates a lead with valid data', async () => {
    const response = await POST(makeRequest(validLeadBody));
    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data.success).toBe(true);
    expect(data.leadId).toBe('lead_123');
    expect(mockedPrisma.lead.create).toHaveBeenCalledTimes(1);
  });

  it('returns 400 for missing required fields', async () => {
    const response = await POST(makeRequest({ name: 'Test' }));
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
  });

  it('accepts sessionId and links lead to conversation', async () => {
    mockedPrisma.conversation.findUnique.mockResolvedValue({
      id: 'conv_123',
      sessionId: 'chat_123_abc',
    } as never);
    mockedPrisma.conversation.update.mockResolvedValue({} as never);

    const response = await POST(makeRequest({
      ...validLeadBody,
      sessionId: 'chat_123_abc',
      leadSource: 'AI_ADVISOR',
    }));

    expect(response.status).toBe(201);

    // Wait for the async fire-and-forget to complete
    await new Promise(resolve => setTimeout(resolve, 50));

    expect(mockedPrisma.conversation.findUnique).toHaveBeenCalledWith({
      where: { sessionId: 'chat_123_abc' },
    });
    expect(mockedPrisma.conversation.update).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: 'conv_123' },
        data: expect.objectContaining({
          leadId: 'lead_123',
          leadCaptured: true,
        }),
      })
    );
  });

  it('handles missing conversation gracefully when sessionId provided', async () => {
    mockedPrisma.conversation.findUnique.mockResolvedValue(null);

    const response = await POST(makeRequest({
      ...validLeadBody,
      sessionId: 'chat_nonexistent',
    }));

    expect(response.status).toBe(201);

    // Wait for async operation
    await new Promise(resolve => setTimeout(resolve, 50));

    expect(mockedPrisma.conversation.update).not.toHaveBeenCalled();
  });

  it('accepts tcpaConsent and consentTimestamp fields', async () => {
    const timestamp = '2026-03-02T12:00:00Z';

    const response = await POST(makeRequest({
      ...validLeadBody,
      tcpaConsent: true,
      consentTimestamp: timestamp,
    }));

    expect(response.status).toBe(201);
    expect(mockedPrisma.lead.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          tcpaConsent: true,
          consentTimestamp: new Date(timestamp),
        }),
      })
    );
  });

  it('accepts leadSource field', async () => {
    const response = await POST(makeRequest({
      ...validLeadBody,
      leadSource: 'AI_ADVISOR',
    }));

    expect(response.status).toBe(201);
    expect(mockedPrisma.lead.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          leadSource: 'AI_ADVISOR',
        }),
      })
    );
  });
});
