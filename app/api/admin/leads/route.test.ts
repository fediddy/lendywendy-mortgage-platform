import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';

// Mock prisma
const mockFindMany = vi.fn();
const mockCount = vi.fn();
const mockGroupBy = vi.fn();
const mockUpdate = vi.fn();

vi.mock('@/lib/db', () => ({
  prisma: {
    lead: {
      findMany: (...args: any[]) => mockFindMany(...args),
      count: (...args: any[]) => mockCount(...args),
      groupBy: (...args: any[]) => mockGroupBy(...args),
      update: (...args: any[]) => mockUpdate(...args),
    },
  },
}));

vi.mock('@/lib/logger', () => ({
  logger: {
    info: vi.fn(),
    error: vi.fn(),
  },
}));

import { GET, PATCH } from './route';

beforeEach(() => {
  vi.clearAllMocks();
  mockFindMany.mockResolvedValue([]);
  mockCount.mockResolvedValue(0);
  mockGroupBy.mockResolvedValue([]);
});

function makeRequest(params: Record<string, string> = {}) {
  const url = new URL('http://localhost/api/admin/leads');
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  return new NextRequest(url);
}

describe('GET /api/admin/leads', () => {
  it('returns paginated leads with 20/page default', async () => {
    const res = await GET(makeRequest());
    const body = await res.json();

    expect(body.success).toBe(true);
    expect(body.data.pagination.limit).toBe(20);
    expect(mockFindMany).toHaveBeenCalledWith(
      expect.objectContaining({ take: 20, skip: 0 })
    );
  });

  it('filters by source', async () => {
    await GET(makeRequest({ source: 'AI_ADVISOR' }));

    expect(mockFindMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({ leadSource: 'AI_ADVISOR' }),
      })
    );
  });

  it('filters by tier (hot = score >= 80)', async () => {
    await GET(makeRequest({ tier: 'hot' }));

    expect(mockFindMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({ score: { gte: 80 } }),
      })
    );
  });

  it('filters by tier (warm = 60-79)', async () => {
    await GET(makeRequest({ tier: 'warm' }));

    expect(mockFindMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({ score: { gte: 60, lt: 80 } }),
      })
    );
  });

  it('filters by date range', async () => {
    await GET(makeRequest({ dateFrom: '2026-01-01', dateTo: '2026-01-31' }));

    expect(mockFindMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          createdAt: {
            gte: new Date('2026-01-01'),
            lte: new Date('2026-01-31T23:59:59.999Z'),
          },
        }),
      })
    );
  });

  it('sorts by specified field and order', async () => {
    await GET(makeRequest({ sortBy: 'score', sortOrder: 'desc' }));

    expect(mockFindMany).toHaveBeenCalledWith(
      expect.objectContaining({
        orderBy: { score: 'desc' },
      })
    );
  });

  it('rejects invalid sortBy fields', async () => {
    await GET(makeRequest({ sortBy: 'DROP TABLE leads;--' }));

    expect(mockFindMany).toHaveBeenCalledWith(
      expect.objectContaining({
        orderBy: { createdAt: 'desc' },
      })
    );
  });
});

describe('PATCH /api/admin/leads', () => {
  it('updates lead status and sets contactedAt timestamp', async () => {
    mockUpdate.mockResolvedValue({ id: 'lead-1', status: 'CONTACTED' });

    const req = new NextRequest('http://localhost/api/admin/leads', {
      method: 'PATCH',
      body: JSON.stringify({ leadId: 'lead-1', status: 'CONTACTED' }),
    });
    const res = await PATCH(req);
    const body = await res.json();

    expect(body.success).toBe(true);
    expect(mockUpdate).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: 'lead-1' },
        data: expect.objectContaining({
          status: 'CONTACTED',
          contactedAt: expect.any(Date),
        }),
      })
    );
  });

  it('sets assignedAgentId and assignedAt when agent assigned', async () => {
    mockUpdate.mockResolvedValue({ id: 'lead-1', assignedAgentId: 'agent-1' });

    const req = new NextRequest('http://localhost/api/admin/leads', {
      method: 'PATCH',
      body: JSON.stringify({ leadId: 'lead-1', assignedAgentId: 'agent-1' }),
    });
    const res = await PATCH(req);
    const body = await res.json();

    expect(body.success).toBe(true);
    expect(mockUpdate).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          assignedAgentId: 'agent-1',
          assignedAt: expect.any(Date),
        }),
      })
    );
  });

  it('returns 400 when leadId is missing', async () => {
    const req = new NextRequest('http://localhost/api/admin/leads', {
      method: 'PATCH',
      body: JSON.stringify({ status: 'NEW' }),
    });
    const res = await PATCH(req);
    expect(res.status).toBe(400);
  });
});
