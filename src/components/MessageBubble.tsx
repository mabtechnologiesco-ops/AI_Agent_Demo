import { Bot, User } from 'lucide-react';
import type { ChatMessage } from '@/types/chat';

interface MessageBubbleProps {
  message: ChatMessage;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <div
      className={`flex animate-slide-in gap-2.5 sm:gap-3 ${
        isUser ? 'flex-row-reverse' : 'flex-row'
      }`}
    >
      {/* Avatar */}
      <div
        className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full sm:h-9 sm:w-9 ${
          isUser
            ? 'bg-gray-700 text-white'
            : 'bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-sm'
        }`}
      >
        {isUser ? (
          <User className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={2.2} />
        ) : (
          <Bot className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={2.2} />
        )}
      </div>

      {/* Bubble */}
      <div
        className={`max-w-[78%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm sm:max-w-[75%] sm:px-5 sm:py-3.5 sm:text-[15px] ${
          isUser
            ? 'rounded-tr-sm bg-gray-800 text-white'
            : 'rounded-tl-sm border border-gray-100 bg-white text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100'
        }`}
      >
        <p className="whitespace-pre-wrap break-words">{message.content}</p>
      </div>
    </div>
  );
}
