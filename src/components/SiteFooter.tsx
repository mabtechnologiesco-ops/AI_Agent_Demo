import { Bot } from 'lucide-react';

export default function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-100 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-600">
              <Bot className="h-4 w-4 text-white" strokeWidth={2.2} />
            </div>
            <div className="leading-tight">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                MAB TECHNOLOGIES SL
              </h3>
              <p className="text-[10px] font-medium uppercase tracking-wider text-brand-600 dark:text-brand-400">
                AI Agent Showroom
              </p>
            </div>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-6 md:justify-end text-sm">
            <a
              href="#explore"
              className="text-gray-600 hover:text-brand-600 transition-colors dark:text-gray-300 dark:hover:text-brand-400"
            >
              Explore AI Agents
            </a>
            <a
              href="#how-it-works"
              className="text-gray-600 hover:text-brand-600 transition-colors dark:text-gray-300 dark:hover:text-brand-400"
            >
              How It Works
            </a>
            <a
              href="#industries"
              className="text-gray-600 hover:text-brand-600 transition-colors dark:text-gray-300 dark:hover:text-brand-400"
            >
              Industries
            </a>
            <a
              href="#contact"
              className="text-brand-600 hover:text-brand-400 transition-colors dark:text-brand-400"
            >
              Build My AI Agent
            </a>
          </nav>

          <p className="text-[11px] text-gray-400 dark:text-gray-500">
            &copy; {currentYear} MAB Technologies SL. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}