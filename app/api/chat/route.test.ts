import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';

// Mock deepseek module
vi.mock('@/lib/ai/deepseek', () => ({
  streamChatMessage: vi.fn(),
}));

// Mock prisma
vi.mock('@/lib/db', () => ({
  prisma: {
    conversation: {
      findUnique: vi.fn(),
      create: vi.fn(),
    },
    message: {
      create: vi.fn(),
    },
  },
}));

import { POST, GET } from './route';
import { streamChatMessage } from '@/lib/ai/deepseek';
import { prisma } from '@/lib/db';

const mockedStreamChat = vi.mocked(streamChatMessage);
const mockedPrisma = vi.mocked(prisma, true);

function makeRequest(body: unknown, method = 'POST'): NextRequest {
  return new NextRequest('http://localhost:3000/api/chat', {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

function makeGetRequest(sessionId: string): NextRequest {
  return new NextRequest(
    `http://localhost:3000/api/chat?sessionId=${sessionId}`,
    { method: 'GET' }
  );
}

async function* fakeGenerator(tokens: string[]): AsyncGenerator<string> {
  for (const token of tokens) {
    yield token;
  }
}

async function readSSEStream(response: Response): Promise<string[]> {
  const reader = response.body!.getReader();
  const decoder = new TextDecoder();
  const events: string[] = [];

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    const text = decoder.decode(value);
    // Split on double newlines to get individual SSE events
    const parts = text.split('\n\n').filter(Boolean);
    events.push(...parts);
  }

  return events;
}

describe('POST /api/chat - SSE Streaming', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Default DB mocks for fire-and-forget
    mockedPrisma.conversation.findUnique.mockResolvedValue(null);
    mockedPrisma.conversation.create.mockResolvedValue({
      id: 'conv-1',
      sessionId: 'test-session',
      leadId: null,
      loanType: null,
      propertyType: null,
      location: null,
      timeline: null,
      creditRange: null,
      status: 'ACTIVE',
      leadCaptured: false,
      pageUrl: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    mockedPrisma.message.create.mockResolvedValue({
      id: 'msg-1',
      conversationId: 'conv-1',
      role: 'ASSISTANT',
      content: '',
      createdAt: new Date(),
    });
  });

  it('returns Content-Type text/event-stream', async () => {
    mockedStreamChat.mockReturnValue(fakeGenerator(['Hello']));

    const req = makeRequest({
      messages: [{ role: 'user', content: 'Hi' }],
      sessionId: 'test-session',
    });

    const response = await POST(req);
    expect(response.headers.get('Content-Type')).toBe('text/event-stream');
  });

  it('returns Cache-Control no-cache header', async () => {
    mockedStreamChat.mockReturnValue(fakeGenerator(['Hello']));

    const req = makeRequest({
      messages: [{ role: 'user', content: 'Hi' }],
      sessionId: 'test-session',
    });

    const response = await POST(req);
    expect(response.headers.get('Cache-Control')).toBe('no-cache');
  });

  it('returns X-Accel-Buffering no header for proxy compatibility', async () => {
    mockedStreamChat.mockReturnValue(fakeGenerator(['Hello']));

    const req = makeRequest({
      messages: [{ role: 'user', content: 'Hi' }],
      sessionId: 'test-session',
    });

    const response = await POST(req);
    expect(response.headers.get('X-Accel-Buffering')).toBe('no');
  });

  it('formats SSE chunks as data: {"content": "token"}', async () => {
    mockedStreamChat.mockReturnValue(fakeGenerator(['Hello', ' world']));

    const req = makeRequest({
      messages: [{ role: 'user', content: 'Hi' }],
      sessionId: 'test-session',
    });

    const response = await POST(req);
    const events = await readSSEStream(response);

    expect(events[0]).toBe('data: {"content":"Hello"}');
    expect(events[1]).toBe('data: {"content":" world"}');
  });

  it('ends stream with data: [DONE]', async () => {
    mockedStreamChat.mockReturnValue(fakeGenerator(['Hi']));

    const req = makeRequest({
      messages: [{ role: 'user', content: 'Hi' }],
      sessionId: 'test-session',
    });

    const response = await POST(req);
    const events = await readSSEStream(response);

    const lastEvent = events[events.length - 1];
    expect(lastEvent).toBe('data: [DONE]');
  });

  it('persists messages to DB after stream completes', async () => {
    mockedStreamChat.mockReturnValue(fakeGenerator(['Hello', ' there']));

    const req = makeRequest({
      messages: [{ role: 'user', content: 'Hi' }],
      sessionId: 'test-session',
    });

    const response = await POST(req);
    // Must consume the stream for fire-and-forget to trigger
    await readSSEStream(response);

    // Allow fire-and-forget promises to resolve
    await new Promise((r) => setTimeout(r, 50));

    expect(mockedPrisma.conversation.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        sessionId: 'test-session',
        status: 'ACTIVE',
      }),
    });

    // Should store both user message and assistant response
    expect(mockedPrisma.message.create).toHaveBeenCalledTimes(2);
    expect(mockedPrisma.message.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        role: 'USER',
        content: 'Hi',
      }),
    });
    expect(mockedPrisma.message.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        role: 'ASSISTANT',
        content: 'Hello there',
      }),
    });
  });

  it('returns fallback JSON when DeepSeek API fails', async () => {
    mockedStreamChat.mockImplementation(() => {
      throw new Error('DeepSeek API error: 503');
    });

    const req = makeRequest({
      messages: [{ role: 'user', content: 'Hi' }],
      sessionId: 'test-session',
    });

    const response = await POST(req);
    expect(response.status).toBe(500);

    const body = await response.json();
    expect(body.error).toBe('Failed to process chat message');
    expect(body.fallback).toContain('/get-quote');
  });

  it('returns 400 when messages array is missing', async () => {
    const req = makeRequest({ sessionId: 'test-session' });

    const response = await POST(req);
    expect(response.status).toBe(400);

    const body = await response.json();
    expect(body.error).toBe('Messages array is required');
  });

  it('returns 400 when sessionId is missing', async () => {
    const req = makeRequest({
      messages: [{ role: 'user', content: 'Hi' }],
    });

    const response = await POST(req);
    expect(response.status).toBe(400);

    const body = await response.json();
    expect(body.error).toBe('Session ID is required');
  });
});

describe('GET /api/chat - Conversation History', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns message history for existing session', async () => {
    const now = new Date();
    mockedPrisma.conversation.findUnique.mockResolvedValue({
      id: 'conv-1',
      sessionId: 'test-session',
      leadId: null,
      loanType: null,
      propertyType: null,
      location: null,
      timeline: null,
      creditRange: null,
      status: 'ACTIVE',
      leadCaptured: false,
      pageUrl: null,
      createdAt: now,
      updatedAt: now,
      messages: [
        { id: 'msg-1', conversationId: 'conv-1', role: 'USER', content: 'Hi', createdAt: now },
        { id: 'msg-2', conversationId: 'conv-1', role: 'ASSISTANT', content: 'Hello!', createdAt: now },
      ],
    } as never);

    const req = makeGetRequest('test-session');
    const response = await GET(req);
    const body = await response.json();

    expect(body.messages).toHaveLength(2);
    expect(body.messages[0].role).toBe('user');
    expect(body.messages[1].role).toBe('assistant');
  });

  it('returns empty array for unknown session', async () => {
    mockedPrisma.conversation.findUnique.mockResolvedValue(null);

    const req = makeGetRequest('unknown-session');
    const response = await GET(req);
    const body = await response.json();

    expect(body.messages).toEqual([]);
  });

  it('returns 400 when sessionId is missing', async () => {
    const req = new NextRequest('http://localhost:3000/api/chat', {
      method: 'GET',
    });

    const response = await GET(req);
    expect(response.status).toBe(400);
  });
});
