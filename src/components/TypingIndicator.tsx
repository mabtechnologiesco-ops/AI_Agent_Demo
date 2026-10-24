import { Bot } from 'lucide-react';

export default function TypingIndicator() {
  return (
    <div className="flex animate-fade-in gap-2.5 sm:gap-3">
      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-sm sm:h-9 sm:w-9">
        <Bot className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={2.2} />
      </div>
      <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm border border-gray-100 bg-white px-5 py-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <span
          className="h-2 w-2 rounded-full bg-brand-400 animate-bounce-dot"
          style={{ animationDelay: '0ms' }}
        />
        <span
          className="h-2 w-2 rounded-full bg-brand-400 animate-bounce-dot"
          style={{ animationDelay: '200ms' }}
        />
        <span
          className="h-2 w-2 rounded-full bg-brand-400 animate-bounce-dot"
          style={{ animationDelay: '400ms' }}
        />
      </div>
    </div>
  );
}
