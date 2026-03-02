'use client';

import { useChatContext } from './ChatProvider';
import { MessageCircle } from 'lucide-react';

export function OpenChatButton({ className }: { className?: string }) {
  const { setIsOpen } = useChatContext();
  return (
    <button
      onClick={() => setIsOpen(true)}
      className={className || "flex items-center gap-2 text-sm text-slate-300 hover:text-teal-300 transition-colors cursor-pointer"}
    >
      <MessageCircle className="h-4 w-4" />
      Chat with AI Advisor
    </button>
  );
}
