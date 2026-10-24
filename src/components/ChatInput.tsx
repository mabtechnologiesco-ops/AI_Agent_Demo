import { useRef, useState, type KeyboardEvent } from 'react';
import { ArrowUp, Square } from 'lucide-react';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled: boolean;
  onStop?: () => void;
}

const MAX_LENGTH = 4000;

export default function ChatInput({ onSend, disabled, onStop }: ChatInputProps) {
  const [text, setText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  };

  const handleInput = (value: string) => {
    if (value.length <= MAX_LENGTH) {
      setText(value);
    }
    adjustHeight();
  };

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setText('');
    requestAnimationFrame(() => {
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const canSend = text.trim().length > 0 && !disabled;

  return (
    <div className="safe-bottom border-t border-gray-100 bg-white/90 px-3 py-3 backdrop-blur-md sm:px-4 sm:py-4 dark:border-gray-800 dark:bg-gray-900/90">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-end gap-2 rounded-2xl border border-gray-200 bg-white px-3 py-2 shadow-sm transition-all duration-200 focus-within:border-brand-400 focus-within:shadow-md sm:gap-3 sm:px-4 dark:border-gray-700 dark:bg-gray-800">
          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => handleInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything..."
            rows={1}
            disabled={disabled}
            className="max-h-40 flex-1 resize-none bg-transparent text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none disabled:opacity-50 sm:text-[15px] dark:text-gray-100 dark:placeholder:text-gray-500"
            style={{ minHeight: '24px' }}
          />
          {disabled && onStop ? (
            <button
              onClick={onStop}
              className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-500 transition-colors duration-200 hover:bg-gray-200 sm:h-10 sm:w-10 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              aria-label="Stop generating"
            >
              <Square className="h-4 w-4 fill-current" />
            </button>
          ) : (
            <button
              onClick={handleSend}
              disabled={!canSend}
              className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl transition-all duration-200 sm:h-10 sm:w-10 ${
                canSend
                  ? 'bg-brand-600 text-white shadow-sm hover:bg-brand-700 hover:shadow-md active:scale-95'
                  : 'bg-gray-100 text-gray-300 dark:bg-gray-700 dark:text-gray-500'
              }`}
              aria-label="Send message"
            >
              <ArrowUp className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={2.5} />
            </button>
          )}
        </div>
        <p className="mt-1.5 text-center text-[10px] text-gray-300 sm:text-xs dark:text-gray-600">
          Press Enter to send, Shift+Enter for a new line
        </p>
      </div>
    </div>
  );
}
