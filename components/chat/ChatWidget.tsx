'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MessageCircle, X, Send, Loader2, Minimize2, Maximize2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { trackEvent } from '@/lib/analytics';
import { extractQualificationData } from '@/lib/ai/deepseek';
import { useChatContext } from './ChatProvider';

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

// Size constraints (desktop only)
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

// Map AI-extracted qualification strings to Prisma enum values
function mapSegment(loanType?: string): string {
  if (!loanType) return 'RESIDENTIAL';
  const upper = loanType.toUpperCase();
  if (upper.includes('INVESTMENT') || upper.includes('RENTAL') || upper.includes('FLIP')) return 'INVESTMENT';
  if (upper.includes('COMMERCIAL') || upper.includes('SBA')) return 'COMMERCIAL';
  return 'RESIDENTIAL';
}

function mapLoanType(loanType?: string): string {
  if (!loanType) return 'PURCHASE';
  const upper = loanType.toUpperCase();
  if (upper.includes('REFINANCE') && upper.includes('CASH')) return 'CASH_OUT_REFINANCE';
  if (upper.includes('REFINANCE')) return 'REFINANCE';
  if (upper.includes('FHA')) return 'FHA_LOAN';
  if (upper.includes('VA')) return 'VA_LOAN';
  if (upper.includes('USDA')) return 'USDA_LOAN';
  if (upper.includes('JUMBO')) return 'JUMBO_LOAN';
  if (upper.includes('INVESTMENT')) return 'INVESTMENT_PROPERTY';
  if (upper.includes('FLIP')) return 'FIX_AND_FLIP';
  if (upper.includes('COMMERCIAL')) return 'COMMERCIAL_PROPERTY';
  return 'PURCHASE';
}

function mapCreditRange(credit?: string): string | undefined {
  if (!credit) return undefined;
  const upper = credit.toUpperCase();
  if (upper.includes('EXCELLENT') || upper.includes('740')) return 'EXCELLENT_740_PLUS';
  if (upper.includes('GOOD') || upper.includes('670')) return 'GOOD_670_739';
  if (upper.includes('FAIR') || upper.includes('580')) return 'FAIR_580_669';
  if (upper.includes('POOR') || upper.includes('BELOW')) return 'POOR_BELOW_580';
  if (upper.includes('NOT') || upper.includes('SURE')) return 'NOT_SURE';
  return undefined;
}

function mapTimeline(timeline?: string): string | undefined {
  if (!timeline) return undefined;
  const upper = timeline.toUpperCase();
  if (upper.includes('ASAP') || upper.includes('IMMEDIATE')) return 'ASAP';
  if (upper.includes('30') || upper.includes('WITHIN')) return 'WITHIN_30_DAYS';
  if (upper.includes('1') && upper.includes('3')) return 'ONE_TO_THREE_MONTHS';
  if (upper.includes('3') && upper.includes('6')) return 'THREE_TO_SIX_MONTHS';
  if (upper.includes('6') || upper.includes('PLUS')) return 'SIX_PLUS_MONTHS';
  if (upper.includes('RESEARCH')) return 'JUST_RESEARCHING';
  return undefined;
}

// Parse SSE chunks from a text buffer, returning parsed tokens and remaining buffer
export function parseSSEChunks(buffer: string): { tokens: string[]; remaining: string } {
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
    } catch {
      // Skip invalid JSON
    }
  }

  return { tokens, remaining };
}

export function ChatWidget() {
  const {
    messages,
    setMessages,
    sessionId,
    isOpen,
    setIsOpen,
    isLoading,
    sendMessage,
  } = useChatContext();

  const [input, setInput] = useState('');
  const [chatWidth, setChatWidth] = useState(420);
  const [chatHeight, setChatHeight] = useState(500);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', phone: '', tcpaConsent: false });
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
  const fontSize = isMobile ? 16 : Math.round(14 + ((chatWidth - MIN_WIDTH) / (MAX_WIDTH - MIN_WIDTH)) * 6);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, showContactForm]);

  // Check if we should show contact form after new assistant message
  useEffect(() => {
    if (messages.length > 0 && !contactSubmitted) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.role === 'assistant' && !lastMessage.isStreaming && checkForContactRequest(lastMessage.content)) {
        setShowContactForm(true);
      }
    }
  }, [messages, contactSubmitted]);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.phone || !contactForm.tcpaConsent) return;

    setIsSubmittingContact(true);
    try {
      // Extract qualification data from conversation via secondary AI call
      let qualification: { loanType?: string; propertyType?: string; location?: string; timeline?: string; creditRange?: string } = {};
      try {
        const extracted = await extractQualificationData(
          messages.map(m => ({ role: m.role, content: m.content }))
        );
        qualification = extracted;
      } catch (err) {
        console.error('Qualification extraction failed, using defaults:', err);
      }

      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: contactForm.name,
          email: contactForm.email,
          phone: contactForm.phone,
          segment: mapSegment(qualification.loanType),
          loanType: mapLoanType(qualification.loanType),
          creditRange: mapCreditRange(qualification.creditRange),
          timeline: mapTimeline(qualification.timeline),
          propertyLocation: qualification.location || undefined,
          leadSource: 'AI_ADVISOR',
          sessionId,
          tcpaConsent: true,
          consentTimestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        setContactSubmitted(true);
        setShowContactForm(false);
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: `Thanks ${contactForm.name.split(' ')[0]}! I've got your info and one of our matched lenders will reach out to you shortly at ${contactForm.phone}. They'll help you compare rates and options. Is there anything else I can help you with in the meantime?`
        }]);

        // Fire GA4 event for lead capture
        trackEvent({ event: 'chat_lead_captured', sessionId });
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

  // Focus input when chat opens + Escape to close
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setIsOpen(false);
      };
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, setIsOpen]);

  const sendUserMessage = useCallback(async () => {
    if (!input.trim() || isLoading) return;
    const content = input;
    setInput('');
    await sendMessage(content);
  }, [input, isLoading, sendMessage]);

  const handleQuickReply = (reply: string) => {
    sendMessage(reply);
  };

  const getQuickReplies = () => {
    if (isLoading) return [];
    if (messages.length <= 1) return INITIAL_QUICK_REPLIES;
    if (messages.length > 1 && messages.length < 6) return FOLLOW_UP_QUICK_REPLIES;
    return [];
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendUserMessage();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'fixed right-6 z-50 flex items-center gap-3 px-6 py-4 rounded-full shadow-2xl transition-all duration-300 cursor-pointer min-h-[44px]',
          isOpen
            ? 'bg-gray-200 hover:bg-gray-300 bottom-6'
            : 'bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 bottom-6 md:bottom-6',
          // Move above MobileCTA bar on mobile when not open
          !isOpen && 'max-md:bottom-24'
        )}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? (
          <>
            <X className="h-6 w-6 text-gray-900" />
            <span className="text-gray-900 font-bold text-base">Close</span>
          </>
        ) : (
          <>
            <MessageCircle className="h-7 w-7 text-white" />
            <span className="text-white font-bold text-base">Chat with AI Advisor</span>
          </>
        )}
      </button>

      {/* Notification Badge */}
      {!isOpen && messages.length === 0 && (
        <div className="fixed bottom-24 max-md:bottom-40 right-6 z-40">
          <div className="bg-white text-gray-900 text-sm font-medium px-4 py-2 rounded-lg shadow-lg border border-gray-200">
            Ask me anything about mortgages!
            <div className="absolute -bottom-1 right-8 w-3 h-3 bg-white border-b border-r border-gray-200 rotate-45" />
          </div>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card
          role="dialog"
          aria-modal={isMobile ? "true" : undefined}
          aria-label="LendyWendy AI Mortgage Advisor chat"
          className={cn(
            'z-50 flex flex-col shadow-2xl border-0 overflow-hidden transition-all duration-300',
            isMobile
              ? 'fixed inset-0 rounded-none'
              : 'fixed bottom-24 right-6 max-w-[calc(100vw-48px)]'
          )}
          style={isMobile
            ? { height: '100dvh' }
            : { width: `${chatWidth}px`, height: `${chatHeight}px`, maxHeight: 'calc(100vh - 120px)' }
          }
        >
          {/* Header */}
          <div className="bg-teal-600 text-white p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-teal-500 rounded-full flex items-center justify-center">
              <MessageCircle className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">LendyWendy AI Advisor</h3>
              <p className="text-xs text-teal-100">Usually responds instantly</p>
            </div>
            {/* Size Controls (desktop only) */}
            {!isMobile && (
              <div className="flex items-center gap-1">
                <button
                  onClick={() => resizeChat('down')}
                  disabled={chatWidth <= MIN_WIDTH && chatHeight <= MIN_HEIGHT}
                  className="p-1.5 rounded hover:bg-teal-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  title="Make smaller"
                  aria-label="Make chat window smaller"
                >
                  <Minimize2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => resizeChat('up')}
                  disabled={chatWidth >= MAX_WIDTH && chatHeight >= MAX_HEIGHT}
                  className="p-1.5 rounded hover:bg-teal-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  title="Make larger"
                  aria-label="Make chat window larger"
                >
                  <Maximize2 className="h-4 w-4" />
                </button>
              </div>
            )}
            {/* Close button in header on mobile */}
            {isMobile && (
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded hover:bg-teal-700 transition-colors"
                aria-label="Close chat"
              >
                <X className="h-5 w-5" />
              </button>
            )}
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
                      ? 'bg-teal-600 text-white rounded-br-md'
                      : 'bg-white text-gray-900 shadow-sm border rounded-bl-md'
                  )}
                  style={{ fontSize: `${fontSize}px` }}
                >
                  {message.content}
                  {message.isStreaming && (
                    <span className="inline-block w-1.5 h-4 bg-teal-600 ml-0.5 animate-pulse" />
                  )}
                </div>
              </div>
            ))}

            {isLoading && !messages.some(m => m.isStreaming) && (
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
                  <p className="text-sm font-medium text-gray-600 mb-3">
                    Fill out below to connect with an expert:
                  </p>
                  <label htmlFor="chat-contact-name" className="sr-only">Your Name</label>
                  <input
                    id="chat-contact-name"
                    type="text"
                    placeholder="Your Name"
                    value={contactForm.name}
                    onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                    style={{ fontSize: `${fontSize}px` }}
                    autoComplete="name"
                    required
                  />
                  <label htmlFor="chat-contact-email" className="sr-only">Email Address</label>
                  <input
                    id="chat-contact-email"
                    type="email"
                    placeholder="Email Address"
                    value={contactForm.email}
                    onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                    style={{ fontSize: `${fontSize}px` }}
                    autoComplete="email"
                    required
                  />
                  <label htmlFor="chat-contact-phone" className="sr-only">Phone Number</label>
                  <input
                    id="chat-contact-phone"
                    type="tel"
                    placeholder="Phone Number"
                    value={contactForm.phone}
                    onChange={(e) => setContactForm(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                    style={{ fontSize: `${fontSize}px` }}
                    autoComplete="tel"
                    required
                  />
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={contactForm.tcpaConsent}
                      onChange={(e) => setContactForm(prev => ({ ...prev, tcpaConsent: e.target.checked }))}
                      className="mt-1 h-4 w-4 accent-teal-600"
                      required
                    />
                    <span className="text-xs text-gray-500">
                      I agree to be contacted by phone, email, or text regarding mortgage options by LendyWendy
                      and matched lending partners. This is not a loan application. Standard message and data rates
                      may apply.{' '}
                      <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline">
                        Privacy Policy
                      </a>
                    </span>
                  </label>
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      disabled={isSubmittingContact || !contactForm.tcpaConsent}
                      className="flex-1 bg-teal-600 text-white py-2 px-4 rounded-lg font-bold hover:bg-teal-700 disabled:opacity-50 transition-colors"
                      style={{ fontSize: `${fontSize}px` }}
                    >
                      {isSubmittingContact ? 'Submitting...' : 'Connect Me!'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowContactForm(false)}
                      className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                      style={{ fontSize: `${fontSize - 2}px` }}
                    >
                      Later
                    </button>
                  </div>
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
                    className="px-4 py-2 min-h-[44px] bg-white border-2 border-teal-600 text-teal-600 rounded-full font-medium hover:bg-teal-50 hover:border-teal-700 transition-all shadow-sm cursor-pointer"
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
                aria-label="Type a message to the AI mortgage advisor"
                className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                style={{ fontSize: `${fontSize}px` }}
              />
              <Button
                onClick={sendUserMessage}
                disabled={!input.trim() || isLoading}
                size="icon"
                className="rounded-full h-10 w-10 bg-teal-600 hover:bg-teal-700 text-white"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Powered by AI. Your privacy is protected.
            </p>
          </div>
        </Card>
      )}
    </>
  );
}

export default ChatWidget;
