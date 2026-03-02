import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, act, renderHook, waitFor } from '@testing-library/react';
import { ChatProvider, useChatContext } from './ChatProvider';
import * as Sentry from '@sentry/nextjs';

// Mock Sentry
vi.mock('@sentry/nextjs', () => ({
  captureException: vi.fn(),
}));

// Mock analytics
vi.mock('@/lib/analytics', () => ({
  trackEvent: vi.fn(),
}));

// Mock system-prompt
vi.mock('@/lib/ai/system-prompt', () => ({
  getContextualGreeting: vi.fn(() => 'Hello! I\'m Wendy.'),
}));

// Mock parseSSEChunks (imported by ChatProvider from ChatWidget)
vi.mock('./ChatWidget', () => ({
  parseSSEChunks: vi.fn((buffer: string) => {
    const tokens: string[] = [];
    const parts = buffer.split('\n\n');
    const remaining = parts.pop() || '';
    for (const part of parts) {
      const trimmed = part.trim();
      if (!trimmed.startsWith('data: ')) continue;
      const data = trimmed.slice(6);
      if (data === '[DONE]') continue;
      try {
        const parsed = JSON.parse(data);
        if (parsed.content) tokens.push(parsed.content);
      } catch { /* skip */ }
    }
    return { tokens, remaining };
  }),
}));

describe('ChatProvider', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    sessionStorage.clear();
    vi.spyOn(global, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ messages: [] }), { status: 200 })
    );
  });

  it('generates sessionId on mount and stores in sessionStorage', async () => {
    let contextValue: ReturnType<typeof useChatContext> | null = null;

    function TestConsumer() {
      contextValue = useChatContext();
      return null;
    }

    await act(async () => {
      render(
        <ChatProvider>
          <TestConsumer />
        </ChatProvider>
      );
    });

    expect(contextValue!.sessionId).toMatch(/^chat_\d+_[a-z0-9]+$/);
    expect(sessionStorage.getItem('lw-chat-session')).toBe(contextValue!.sessionId);
  });

  it('restores sessionId from sessionStorage on mount', async () => {
    const existingId = 'chat_12345_abc123def';
    sessionStorage.setItem('lw-chat-session', existingId);

    let contextValue: ReturnType<typeof useChatContext> | null = null;

    function TestConsumer() {
      contextValue = useChatContext();
      return null;
    }

    await act(async () => {
      render(
        <ChatProvider>
          <TestConsumer />
        </ChatProvider>
      );
    });

    expect(contextValue!.sessionId).toBe(existingId);
  });

  it('hydrates messages from GET API when sessionId exists in sessionStorage', async () => {
    const existingId = 'chat_12345_abc123def';
    sessionStorage.setItem('lw-chat-session', existingId);

    const mockMessages = [
      { role: 'assistant', content: 'Hello!' },
      { role: 'user', content: 'Hi there' },
    ];

    vi.spyOn(global, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ messages: mockMessages }), { status: 200 })
    );

    let contextValue: ReturnType<typeof useChatContext> | null = null;

    function TestConsumer() {
      contextValue = useChatContext();
      return null;
    }

    await act(async () => {
      render(
        <ChatProvider>
          <TestConsumer />
        </ChatProvider>
      );
    });

    await waitFor(() => {
      expect(contextValue!.messages).toHaveLength(2);
    });

    expect(contextValue!.messages[0]).toEqual({ role: 'assistant', content: 'Hello!' });
    expect(contextValue!.messages[1]).toEqual({ role: 'user', content: 'Hi there' });
    expect(fetch).toHaveBeenCalledWith(`/api/chat?sessionId=${existingId}`);
  });

  it('handles empty GET API response gracefully', async () => {
    const existingId = 'chat_12345_abc123def';
    sessionStorage.setItem('lw-chat-session', existingId);

    vi.spyOn(global, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ messages: [] }), { status: 200 })
    );

    let contextValue: ReturnType<typeof useChatContext> | null = null;

    function TestConsumer() {
      contextValue = useChatContext();
      return null;
    }

    await act(async () => {
      render(
        <ChatProvider>
          <TestConsumer />
        </ChatProvider>
      );
    });

    expect(contextValue!.messages).toHaveLength(0);
  });

  it('handles GET API failure gracefully (no error, empty state)', async () => {
    const existingId = 'chat_12345_abc123def';
    sessionStorage.setItem('lw-chat-session', existingId);

    vi.spyOn(global, 'fetch').mockRejectedValue(new Error('Network error'));
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    let contextValue: ReturnType<typeof useChatContext> | null = null;

    function TestConsumer() {
      contextValue = useChatContext();
      return null;
    }

    await act(async () => {
      render(
        <ChatProvider>
          <TestConsumer />
        </ChatProvider>
      );
    });

    // Messages should be empty — no crash, no error shown
    expect(contextValue!.messages).toHaveLength(0);
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  it('messages persist in context across re-renders', async () => {
    let contextValue: ReturnType<typeof useChatContext> | null = null;
    let renderCount = 0;

    function TestConsumer() {
      contextValue = useChatContext();
      renderCount++;
      return <div>{contextValue.messages.length}</div>;
    }

    const { rerender } = render(
      <ChatProvider>
        <TestConsumer />
      </ChatProvider>
    );

    // Set messages via setMessages
    await act(async () => {
      contextValue!.setMessages([
        { role: 'user', content: 'Test message' },
        { role: 'assistant', content: 'Test reply' },
      ]);
    });

    // Force a re-render
    rerender(
      <ChatProvider>
        <TestConsumer />
      </ChatProvider>
    );

    expect(contextValue!.messages).toHaveLength(2);
    expect(contextValue!.messages[0].content).toBe('Test message');
    expect(contextValue!.messages[1].content).toBe('Test reply');
  });

  it('throws error when useChatContext used outside ChatProvider', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    function BadConsumer() {
      useChatContext();
      return null;
    }

    expect(() => render(<BadConsumer />)).toThrow(
      'useChatContext must be used within a ChatProvider'
    );

    consoleSpy.mockRestore();
  });

  it('provides isOpen state and setIsOpen toggle', async () => {
    let contextValue: ReturnType<typeof useChatContext> | null = null;

    function TestConsumer() {
      contextValue = useChatContext();
      return null;
    }

    render(
      <ChatProvider>
        <TestConsumer />
      </ChatProvider>
    );

    expect(contextValue!.isOpen).toBe(false);

    await act(async () => {
      contextValue!.setIsOpen(true);
    });

    expect(contextValue!.isOpen).toBe(true);
  });
});

describe('ChatProvider error handling', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    sessionStorage.clear();
    // Default: hydration returns empty
    vi.spyOn(global, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ messages: [] }), { status: 200 })
    );
  });

  it('shows rate limit message on 429 response', async () => {
    let contextValue: ReturnType<typeof useChatContext> | null = null;

    function TestConsumer() {
      contextValue = useChatContext();
      return null;
    }

    await act(async () => {
      render(
        <ChatProvider>
          <TestConsumer />
        </ChatProvider>
      );
    });

    // Override fetch for the sendMessage call
    vi.spyOn(global, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ error: 'Rate limited' }), { status: 429 })
    );

    await act(async () => {
      await contextValue!.sendMessage('Hello');
    });

    const lastMsg = contextValue!.messages[contextValue!.messages.length - 1];
    expect(lastMsg.content).toContain('try again in a minute');
    // 429 should NOT be logged to Sentry
    expect(Sentry.captureException).not.toHaveBeenCalled();
  });

  it('shows fallback with /get-quote on 500 response and logs to Sentry', async () => {
    let contextValue: ReturnType<typeof useChatContext> | null = null;

    function TestConsumer() {
      contextValue = useChatContext();
      return null;
    }

    await act(async () => {
      render(
        <ChatProvider>
          <TestConsumer />
        </ChatProvider>
      );
    });

    vi.spyOn(global, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ error: 'Server error' }), { status: 500 })
    );

    await act(async () => {
      await contextValue!.sendMessage('Hello');
    });

    const lastMsg = contextValue!.messages[contextValue!.messages.length - 1];
    expect(lastMsg.content).toContain('/get-quote');
    expect(Sentry.captureException).toHaveBeenCalled();
  });

  it('shows fallback on network error and logs to Sentry', async () => {
    let contextValue: ReturnType<typeof useChatContext> | null = null;
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    function TestConsumer() {
      contextValue = useChatContext();
      return null;
    }

    await act(async () => {
      render(
        <ChatProvider>
          <TestConsumer />
        </ChatProvider>
      );
    });

    vi.spyOn(global, 'fetch').mockRejectedValue(new Error('Network failure'));

    await act(async () => {
      await contextValue!.sendMessage('Hello');
    });

    const lastMsg = contextValue!.messages[contextValue!.messages.length - 1];
    expect(lastMsg.content).toContain('/get-quote');
    expect(Sentry.captureException).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});
