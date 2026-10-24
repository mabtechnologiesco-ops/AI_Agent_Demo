import { Bot, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/lib/theme';

export default function Header() {
  const { theme, toggle } = useTheme();

  return (
    <header className="sticky top-0 z-30 border-b border-gray-100 bg-white dark:bg-gray-900">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 shadow-sm sm:h-10 sm:w-10">
            <Bot className="h-5 w-5 text-white sm:h-6 sm:w-6" strokeWidth={2.2} />
          </div>
          <div className="leading-tight">
            <h1 className="text-sm font-semibold text-gray-900 sm:text-base dark:text-white">
              MAB TECHNOLOGIES SL
            </h1>
            <p className="text-[10px] font-medium uppercase tracking-wider text-brand-600 sm:text-xs">
              AI Agent Demo
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 rounded-full border border-gray-200 px-3 py-1.5 sm:flex dark:border-gray-700">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Online</span>
          </div>

          <button
            onClick={toggle}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 transition-colors duration-200 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 sm:h-10 sm:w-10"
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={2.2} />
            ) : (
              <Moon className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={2.2} />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
