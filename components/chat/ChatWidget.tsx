'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MessageCircle, X, Send, Loader2, Minimize2, Maximize2, Square } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getContextualGreeting } from '@/lib/ai/system-prompt';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatWidgetProps {
  pageContext?: 'residential' | 'investment' | 'commercial' | 'refinance' | 'default';
}

// Quick reply options based on conversation stage
const INITIAL_QUICK_REPLIES = [
  "🏠 Buying my first home",
  "💰 Refinance my mortgage",
  "🏢 Investment property loan",
  "📊 Check my readiness score",
];

const FOLLOW_UP_QUICK_REPLIES = [
  "What rates are available?",
  "How much can I afford?",
  "What documents do I need?",
  "Talk to a human",
];

// Size constraints
const MIN_WIDTH = 300;
const MAX_WIDTH = 1000;
const MIN_HEIGHT = 350;
const MAX_HEIGHT = 900;
const SIZE_STEP = 60;

// Keywords that indicate the AI is asking for contact info
const CONTACT_REQUEST_KEYWORDS = [
  'name, email, and phone',
  'your name',
  'your email',
  'your phone',
  'contact info',
  'contact information',
  'reach out to you',
  'get in touch',
  'connect you with',
];

export function ChatWidget({ pageContext = 'default' }: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>('');
  const [chatWidth, setChatWidth] = useState(420);
  const [chatHeight, setChatHeight] = useState(500);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', phone: '' });
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Check if the last assistant message is asking for contact info
  const checkForContactRequest = (message: string) => {
    const lowerMessage = message.toLowerCase();
    return CONTACT_REQUEST_KEYWORDS.some(keyword => lowerMessage.includes(keyword));
  };

  const resizeChat = (direction: 'up' | 'down') => {
    if (direction === 'up') {
      setChatWidth(prev => Math.min(prev + SIZE_STEP, MAX_WIDTH));
      setChatHeight(prev => Math.min(prev + SIZE_STEP, MAX_HEIGHT));
    } else {
      setChatWidth(prev => Math.max(prev - SIZE_STEP, MIN_WIDTH));
      setChatHeight(prev => Math.max(prev - SIZE_STEP, MIN_HEIGHT));
    }
  };

  // Calculate font size based on chat width (scales from 14px to 20px)
  const fontSize = Math.round(14 + ((chatWidth - MIN_WIDTH) / (MAX_WIDTH - MIN_WIDTH)) * 6);

  // Generate session ID on mount
  useEffect(() => {
    const storedSessionId = sessionStorage.getItem('lw-chat-session');
    if (storedSessionId) {
      setSessionId(storedSessionId);
      // Load existing conversation
      loadConversation(storedSessionId);
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

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, showContactForm]);

  // Check if we should show contact form after new assistant message
  useEffect(() => {
    if (messages.length > 0 && !contactSubmitted) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.role === 'assistant' && checkForContactRequest(lastMessage.content)) {
        setShowContactForm(true);
      }
    }
  }, [messages, contactSubmitted]);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.phone) return;

    setIsSubmittingContact(true);
    try {
      // Submit lead to API
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: contactForm.name.split(' ')[0],
          lastName: contactForm.name.split(' ').slice(1).join(' ') || '',
          email: contactForm.email,
          phone: contactForm.phone,
          leadSource: 'AI_ADVISOR',
          notes: `Chat session: ${sessionId}`,
          tcpaConsent: true,
        }),
      });

      if (response.ok) {
        setContactSubmitted(true);
        setShowContactForm(false);
        // Add confirmation message
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: `Thanks ${contactForm.name.split(' ')[0]}! 🎉 I've got your info and one of our mortgage experts will reach out to you shortly at ${contactForm.phone}. They'll help you get exact numbers for your situation. Is there anything else I can help you with in the meantime?`
        }]);
      } else {
        throw new Error('Failed to submit');
      }
    } catch (error) {
      console.error('Failed to submit contact:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "I'm having trouble saving your info. Could you try again?"
      }]);
    } finally {
      setIsSubmittingContact(false);
    }
  };

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const loadConversation = async (sid: string) => {
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
    }
  };

  const sendMessageWithContent = useCallback(async (messageContent: string) => {
    if (!messageContent.trim() || isLoading) return;

    const userMessage = messageContent.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      // Build message history for API
      const messageHistory = [...messages, { role: 'user' as const, content: userMessage }];

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: messageHistory,
          sessionId,
          pageUrl: window.location.pathname,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      setMessages((prev) => [...prev, { role: 'assistant', content: data.message }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: "I'm having trouble connecting right now. Please try again in a moment, or feel free to call us directly!",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, messages, sessionId]);

  const sendMessage = useCallback(async () => {
    if (!input.trim() || isLoading) return;
    await sendMessageWithContent(input);
  }, [input, isLoading, sendMessageWithContent]);

  const handleQuickReply = (reply: string) => {
    sendMessageWithContent(reply);
  };

  // Determine which quick replies to show
  const getQuickReplies = () => {
    if (isLoading) return [];
    if (messages.length <= 1) return INITIAL_QUICK_REPLIES;
    if (messages.length > 1 && messages.length < 6) return FOLLOW_UP_QUICK_REPLIES;
    return [];
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'fixed bottom-24 right-6 z-50 flex items-center gap-4 px-8 py-5 rounded-full shadow-2xl transition-all duration-300 cursor-pointer',
          isOpen
            ? 'bg-gray-700 hover:bg-gray-800'
            : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 animate-pulse'
        )}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? (
          <>
            <X className="h-9 w-9 text-white" />
            <span className="text-white font-bold text-xl">Close</span>
          </>
        ) : (
          <>
            <MessageCircle className="h-10 w-10 text-white" />
            <span className="text-white font-bold text-xl">Chat with Wendy</span>
          </>
        )}
      </button>

      {/* Notification Badge */}
      {!isOpen && messages.length === 0 && (
        <div className="fixed bottom-44 right-6 z-40">
          <div className="bg-yellow-400 text-gray-900 text-sm font-medium px-4 py-2 rounded-lg shadow-lg">
            👋 Ask me anything about mortgages!
            <div className="absolute -bottom-1 right-8 w-3 h-3 bg-yellow-400 rotate-45" />
          </div>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card
          className="fixed bottom-44 right-6 z-50 max-w-[calc(100vw-48px)] flex flex-col shadow-2xl border-0 overflow-hidden transition-all duration-300"
          style={{ width: `${chatWidth}px`, height: `${chatHeight}px`, maxHeight: 'calc(100vh - 180px)' }}
        >
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
              <MessageCircle className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">Wendy - AI Mortgage Advisor</h3>
              <p className="text-xs text-blue-100">Usually responds instantly</p>
            </div>
            {/* Size Controls */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => resizeChat('down')}
                disabled={chatWidth <= MIN_WIDTH && chatHeight <= MIN_HEIGHT}
                className="p-1.5 rounded hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                title="Make smaller"
              >
                <Minimize2 className="h-4 w-4" />
              </button>
              <button
                onClick={() => resizeChat('up')}
                disabled={chatWidth >= MAX_WIDTH && chatHeight >= MAX_HEIGHT}
                className="p-1.5 rounded hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                title="Make larger"
              >
                <Maximize2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  'flex',
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                <div
                  className={cn(
                    'max-w-[80%] rounded-2xl px-4 py-2',
                    message.role === 'user'
                      ? 'bg-blue-600 text-white rounded-br-md'
                      : 'bg-white text-gray-800 shadow-sm border rounded-bl-md'
                  )}
                  style={{ fontSize: `${fontSize}px` }}
                >
                  {message.content}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white rounded-2xl rounded-bl-md px-4 py-2 shadow-sm border">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.1s]" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                  </div>
                </div>
              </div>
            )}

            {/* Inline Contact Form */}
            {showContactForm && !contactSubmitted && (
              <div className="bg-white rounded-2xl p-4 shadow-sm border">
                <form onSubmit={handleContactSubmit} className="space-y-3">
                  <p className="text-sm font-medium text-gray-700 mb-3">
                    📋 Fill out below to connect with an expert:
                  </p>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={contactForm.name}
                    onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ fontSize: `${fontSize}px` }}
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={contactForm.email}
                    onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ fontSize: `${fontSize}px` }}
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={contactForm.phone}
                    onChange={(e) => setContactForm(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ fontSize: `${fontSize}px` }}
                    required
                  />
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      disabled={isSubmittingContact}
                      className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
                      style={{ fontSize: `${fontSize}px` }}
                    >
                      {isSubmittingContact ? 'Submitting...' : 'Connect Me!'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowContactForm(false)}
                      className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
                      style={{ fontSize: `${fontSize - 2}px` }}
                    >
                      Later
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 text-center">
                    By submitting, you agree to be contacted about mortgage options.
                  </p>
                </form>
              </div>
            )}

            {/* Quick Reply Bubbles */}
            {getQuickReplies().length > 0 && !showContactForm && (
              <div className="flex flex-wrap gap-2 pt-2">
                {getQuickReplies().map((reply, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickReply(reply)}
                    className="px-4 py-2 bg-white border-2 border-blue-500 text-blue-600 rounded-full font-medium hover:bg-blue-50 hover:border-blue-600 transition-all shadow-sm cursor-pointer"
                    style={{ fontSize: `${fontSize - 2}px` }}
                  >
                    {reply}
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                disabled={isLoading}
                className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                style={{ fontSize: `${fontSize}px` }}
              />
              <Button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                size="icon"
                className="rounded-full h-10 w-10 bg-blue-600 hover:bg-blue-700"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
            <p className="text-xs text-gray-400 mt-2 text-center">
              Powered by AI. Your privacy is protected.
            </p>
          </div>
        </Card>
      )}
    </>
  );
}

export default ChatWidget;
