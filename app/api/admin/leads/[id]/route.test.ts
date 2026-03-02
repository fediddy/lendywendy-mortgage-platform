import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';

const mockFindUnique = vi.fn();

vi.mock('@/lib/db', () => ({
  prisma: {
    lead: {
      findUnique: (...args: any[]) => mockFindUnique(...args),
    },
  },
}));

vi.mock('@/lib/logger', () => ({
  logger: {
    info: vi.fn(),
    error: vi.fn(),
  },
}));

import { GET } from './route';

beforeEach(() => {
  vi.clearAllMocks();
});

describe('GET /api/admin/leads/[id]', () => {
  it('returns lead with conversation and assessment', async () => {
    mockFindUnique.mockResolvedValue({
      id: 'lead-1',
      name: 'Test User',
      email: 'test@test.com',
      conversation: {
        id: 'conv-1',
        messages: [
          { id: 'msg-1', role: 'USER', content: 'Hello', createdAt: new Date() },
          { id: 'msg-2', role: 'ASSISTANT', content: 'Hi!', createdAt: new Date() },
        ],
      },
      readinessAssessment: null,
      assignedAgent: null,
    });

    const req = new NextRequest('http://localhost/api/admin/leads/lead-1');
    const res = await GET(req, { params: Promise.resolve({ id: 'lead-1' }) });
    const body = await res.json();

    expect(body.success).toBe(true);
    expect(body.data.conversation.messages).toHaveLength(2);
    expect(mockFindUnique).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: 'lead-1' },
        include: expect.objectContaining({
          conversation: expect.objectContaining({
            include: expect.objectContaining({
              messages: expect.any(Object),
            }),
          }),
          readinessAssessment: true,
        }),
      })
    );
  });

  it('returns 404 for non-existent lead', async () => {
    mockFindUnique.mockResolvedValue(null);

    const req = new NextRequest('http://localhost/api/admin/leads/fake-id');
    const res = await GET(req, { params: Promise.resolve({ id: 'fake-id' }) });

    expect(res.status).toBe(404);
  });
});
