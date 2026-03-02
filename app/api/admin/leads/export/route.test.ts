import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';

const mockFindMany = vi.fn();

vi.mock('@/lib/db', () => ({
  prisma: {
    lead: {
      findMany: (...args: any[]) => mockFindMany(...args),
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

describe('GET /api/admin/leads/export', () => {
  it('returns CSV with correct headers and data', async () => {
    mockFindMany.mockResolvedValue([
      {
        name: 'John Doe',
        email: 'john@test.com',
        phone: '555-1234',
        leadSource: 'AI_ADVISOR',
        segment: 'RESIDENTIAL',
        loanType: 'PURCHASE',
        score: 85,
        status: 'NEW',
        propertyLocation: 'Los Angeles, CA',
        createdAt: new Date('2026-01-15'),
        assignedAgent: { name: 'Agent Smith' },
      },
    ]);

    const req = new NextRequest('http://localhost/api/admin/leads/export');
    const res = await GET(req);

    expect(res.headers.get('Content-Type')).toBe('text/csv');
    expect(res.headers.get('Content-Disposition')).toContain('leads-export-');

    const csv = await res.text();
    const lines = csv.split('\n');

    expect(lines[0]).toBe('Name,Email,Phone,Source,Segment,Loan Type,Score,Status,Location,Date,Agent');
    expect(lines[1]).toContain('John Doe');
    expect(lines[1]).toContain('AI_ADVISOR');
    expect(lines[1]).toContain('Agent Smith');
  });

  it('respects source filter', async () => {
    mockFindMany.mockResolvedValue([]);

    const req = new NextRequest('http://localhost/api/admin/leads/export?source=READINESS_SCORE');
    await GET(req);

    expect(mockFindMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({ leadSource: 'READINESS_SCORE' }),
      })
    );
  });

  it('limits export to 10000 leads', async () => {
    mockFindMany.mockResolvedValue([]);

    const req = new NextRequest('http://localhost/api/admin/leads/export');
    await GET(req);

    expect(mockFindMany).toHaveBeenCalledWith(
      expect.objectContaining({ take: 10000 })
    );
  });

  it('escapes CSV fields with commas', async () => {
    mockFindMany.mockResolvedValue([
      {
        name: 'Doe, John',
        email: 'john@test.com',
        phone: null,
        leadSource: 'FORM',
        segment: 'INVESTMENT',
        loanType: 'DSCR',
        score: 70,
        status: 'NEW',
        propertyLocation: null,
        createdAt: new Date('2026-02-01'),
        assignedAgent: null,
      },
    ]);

    const req = new NextRequest('http://localhost/api/admin/leads/export');
    const res = await GET(req);
    const csv = await res.text();

    expect(csv).toContain('"Doe, John"');
  });
});
