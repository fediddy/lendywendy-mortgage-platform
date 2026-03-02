import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';

const mockRetry = vi.fn();

vi.mock('@/lib/integrations/maxbounty', () => ({
  retryFailedSubmissions: (...args: any[]) => mockRetry(...args),
}));

vi.mock('@/lib/logger', () => ({
  logger: { info: vi.fn(), error: vi.fn() },
}));

// Set CRON_SECRET for tests
vi.stubEnv('CRON_SECRET', 'test-secret');

import { POST } from './route';

beforeEach(() => {
  vi.clearAllMocks();
});

describe('POST /api/webhooks/retry', () => {
  it('returns 401 without valid auth header', async () => {
    const req = new NextRequest('http://localhost/api/webhooks/retry', {
      method: 'POST',
    });
    const res = await POST(req);
    expect(res.status).toBe(401);
  });

  it('returns 401 with wrong secret', async () => {
    const req = new NextRequest('http://localhost/api/webhooks/retry', {
      method: 'POST',
      headers: { authorization: 'Bearer wrong-secret' },
    });
    const res = await POST(req);
    expect(res.status).toBe(401);
  });

  it('calls retryFailedSubmissions and returns result', async () => {
    mockRetry.mockResolvedValue({ processed: 5, successful: 3, failed: 2 });

    const req = new NextRequest('http://localhost/api/webhooks/retry', {
      method: 'POST',
      headers: { authorization: 'Bearer test-secret' },
    });
    const res = await POST(req);
    const body = await res.json();

    expect(body.success).toBe(true);
    expect(body.processed).toBe(5);
    expect(body.successful).toBe(3);
    expect(body.failed).toBe(2);
    expect(mockRetry).toHaveBeenCalledWith(100);
  });
});
