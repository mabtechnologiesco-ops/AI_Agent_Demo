import { Trash2, Bot } from 'lucide-react';

interface FooterProps {
  onClear: () => void;
  hasMessages: boolean;
}

export default function Footer({ onClear, hasMessages }: FooterProps) {
  return (
    <footer className="border-t border-gray-100 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3 sm:px-6">
        {hasMessages ? (
          <button
            onClick={onClear}
            className="flex items-center gap-1.5 text-xs font-medium text-gray-400 transition-colors duration-200 hover:text-red-500 sm:text-sm dark:text-gray-500"
          >
            <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            Clear conversation
          </button>
        ) : (
          <div className="flex items-center gap-1.5 text-xs text-gray-300 sm:text-sm dark:text-gray-600">
            <Bot className="h-3.5 w-3.5" />
            <span>Powered by MAB Technologies</span>
          </div>
        )}

        <div className="text-right leading-tight">
          <p className="text-[10px] font-medium text-gray-400 sm:text-xs dark:text-gray-500">
            AI solutions by MAB Technologies SL
          </p>
          <p className="text-[10px] font-semibold tracking-wide text-brand-600 sm:text-xs">
            YOU IMAGINE IT. WE BUILD IT.
          </p>
        </div>
      </div>
    </footer>
  );
}
