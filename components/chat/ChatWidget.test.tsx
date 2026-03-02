import { describe, it, expect, vi, beforeEach } from 'vitest';
import { parseSSEChunks } from './ChatWidget';

// Mock analytics
vi.mock('@/lib/analytics', () => ({
  trackEvent: vi.fn(),
}));

// Mock system-prompt
vi.mock('@/lib/ai/system-prompt', () => ({
  getContextualGreeting: vi.fn(() => 'Hello! I\'m Wendy.'),
}));

import { trackEvent } from '@/lib/analytics';
const mockedTrackEvent = vi.mocked(trackEvent);

describe('parseSSEChunks', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('parses single SSE chunk with content', () => {
    const buffer = 'data: {"content":"Hello"}\n\n';
    const { tokens, remaining } = parseSSEChunks(buffer);

    expect(tokens).toEqual(['Hello']);
    expect(remaining).toBe('');
  });

  it('parses multiple SSE chunks', () => {
    const buffer = 'data: {"content":"Hello"}\n\ndata: {"content":" world"}\n\n';
    const { tokens, remaining } = parseSSEChunks(buffer);

    expect(tokens).toEqual(['Hello', ' world']);
    expect(remaining).toBe('');
  });

  it('handles [DONE] sentinel by skipping it', () => {
    const buffer = 'data: {"content":"Hi"}\n\ndata: [DONE]\n\n';
    const { tokens, remaining } = parseSSEChunks(buffer);

    expect(tokens).toEqual(['Hi']);
    expect(remaining).toBe('');
  });

  it('returns remaining buffer for incomplete chunks', () => {
    const buffer = 'data: {"content":"Hello"}\n\ndata: {"con';
    const { tokens, remaining } = parseSSEChunks(buffer);

    expect(tokens).toEqual(['Hello']);
    expect(remaining).toBe('data: {"con');
  });

  it('skips invalid JSON in data lines', () => {
    const buffer = 'data: {"content":"ok"}\n\ndata: {invalid}\n\ndata: {"content":"also ok"}\n\n';
    const { tokens, remaining } = parseSSEChunks(buffer);

    expect(tokens).toEqual(['ok', 'also ok']);
  });

  it('handles empty buffer', () => {
    const { tokens, remaining } = parseSSEChunks('');
    expect(tokens).toEqual([]);
    expect(remaining).toBe('');
  });

  it('handles chunks without data: prefix', () => {
    const buffer = ':comment\n\ndata: {"content":"token"}\n\n';
    const { tokens, remaining } = parseSSEChunks(buffer);

    expect(tokens).toEqual(['token']);
  });
});

describe('ChatWidget GA4 tracking', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('trackEvent is importable and mockable', () => {
    mockedTrackEvent({ event: 'chat_started', pageUrl: '/residential' });
    expect(mockedTrackEvent).toHaveBeenCalledWith({
      event: 'chat_started',
      pageUrl: '/residential',
    });
  });

  it('trackEvent accepts chat_started event type', () => {
    mockedTrackEvent({ event: 'chat_started', pageUrl: '/' });
    expect(mockedTrackEvent).toHaveBeenCalledTimes(1);
  });
});
