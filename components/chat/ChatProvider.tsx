'use client';

import { createContext, useContext, useState, useEffect, useRef, useCallback, type ReactNode } from 'react';
import * as Sentry from '@sentry/nextjs';
import { getContextualGreeting } from '@/lib/ai/system-prompt';
import { trackEvent } from '@/lib/analytics';
import { parseSSEChunks } from './ChatWidget';

const CHAT_TIMEOUT_MS = 15_000;

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  isStreaming?: boolean;
}

interface ChatContextValue {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  sessionId: string;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  isLoading: boolean;
  sendMessage: (content: string) => Promise<void>;
  pageContext: string;
  setPageContext: (ctx: string) => void;
}

const ChatContext = createContext<ChatContextValue | null>(null);

export function useChatContext() {
  const ctx = useContext(ChatContext);
  if (!ctx) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return ctx;
}

export function ChatProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [sessionId, setSessionId] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pageContext, setPageContext] = useState('default');
  const chatStartedRef = useRef(false);

  // Generate or restore sessionId from sessionStorage on mount
  useEffect(() => {
    const storedSessionId = sessionStorage.getItem('lw-chat-session');
    if (storedSessionId) {
      setSessionId(storedSessionId);
      hydrateMessages(storedSessionId);
    } else {
      const newSessionId = `chat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('lw-chat-session', newSessionId);
      setSessionId(newSessionId);
    }
  }, []);

  // Add greeting when chat opens for the first time
  useEffect(() => {
    if (isOpen && messages.length === 0 && sessionId) {
      const greeting = getContextualGreeting(pageContext);
      setMessages([{ role: 'assistant', content: greeting }]);
    }
  }, [isOpen, messages.length, sessionId, pageContext]);

  // Hydrate messages from GET API when sessionId found in sessionStorage
  async function hydrateMessages(sid: string) {
    try {
      const response = await fetch(`/api/chat?sessionId=${sid}`);
      if (response.ok) {
        const data = await response.json();
        if (data.messages && data.messages.length > 0) {
          setMessages(data.messages.map((m: { role: string; content: string }) => ({
            role: m.role as 'user' | 'assistant',
            content: m.content,
          })));
        }
      }
    } catch (error) {
      console.error('Failed to load conversation:', error);
      // Graceful fallback — empty state, no error shown
    }
  }

  const sendMessage = useCallback(async (messageContent: string) => {
    if (!messageContent.trim() || isLoading) return;

    const userMessage = messageContent.trim();

    // Fire chat_started GA4 event on first user message in session
    const hasUserMessages = messages.some(m => m.role === 'user');
    if (!hasUserMessages && !chatStartedRef.current) {
      chatStartedRef.current = true;
      trackEvent({ event: 'chat_started', pageUrl: window.location.pathname });
    }

    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    // Set up 15-second timeout via AbortController
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), CHAT_TIMEOUT_MS);

    try {
      const messageHistory = [...messages, { role: 'user' as const, content: userMessage }];

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: messageHistory,
          sessionId,
          pageUrl: window.location.pathname,
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        if (response.status === 429) {
          // Rate limited — expected behavior, don't log to Sentry
          setMessages(prev => [...prev, {
            role: 'assistant',
            content: "I'm getting a lot of questions right now. Please try again in a minute!",
          }]);
          return;
        }

        // Other errors — log to Sentry and show fallback with /get-quote
        const errorData = await response.json().catch(() => null);
        Sentry.captureException(new Error(`Chat API error: ${response.status}`), {
          tags: { component: 'chat' },
          extra: { sessionId, status: response.status, errorData },
        });
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: "I'm having a moment! You can also get help by filling out our quick form at /get-quote",
        }]);
        return;
      }

      const contentType = response.headers.get('Content-Type') || '';

      if (contentType.includes('text/event-stream') && response.body) {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let sseBuffer = '';

        setMessages(prev => [...prev, { role: 'assistant', content: '', isStreaming: true }]);

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          sseBuffer += decoder.decode(value, { stream: true });
          const { tokens, remaining } = parseSSEChunks(sseBuffer);
          sseBuffer = remaining;

          if (tokens.length > 0) {
            const combined = tokens.join('');
            setMessages(prev => {
              const updated = [...prev];
              const last = updated[updated.length - 1];
              if (last && last.isStreaming) {
                updated[updated.length - 1] = { ...last, content: last.content + combined };
              }
              return updated;
            });
          }
        }

        // Finalize: remove streaming flag
        setMessages(prev => {
          const updated = [...prev];
          const last = updated[updated.length - 1];
          if (last && last.isStreaming) {
            updated[updated.length - 1] = { role: last.role, content: last.content };
          }
          return updated;
        });
      } else {
        const data = await response.json();
        setMessages(prev => [...prev, { role: 'assistant', content: data.message }]);
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        // Timeout — show fallback
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: "I'm taking too long to respond. You can also get help by filling out our quick form at /get-quote",
        }]);
        Sentry.captureException(new Error('Chat API timeout (15s)'), {
          tags: { component: 'chat' },
          extra: { sessionId },
        });
      } else {
        console.error('Chat error:', error);
        Sentry.captureException(error, {
          tags: { component: 'chat' },
          extra: { sessionId },
        });
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: "I'm having a moment! You can also get help by filling out our quick form at /get-quote",
        }]);
      }
    } finally {
      clearTimeout(timeoutId);
      setIsLoading(false);
    }
  }, [isLoading, messages, sessionId]);

  return (
    <ChatContext.Provider
      value={{
        messages,
        setMessages,
        sessionId,
        isOpen,
        setIsOpen,
        isLoading,
        sendMessage,
        pageContext,
        setPageContext,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
