import { Sparkles } from 'lucide-react';

interface WelcomeScreenProps {
  onPromptClick: (prompt: string) => void;
}

const SUGGESTED_PROMPTS = [
  'What can an AI agent do for my business?',
  'How can AI help me serve customers?',
  'Show me how AI automation works.',
];

export default function WelcomeScreen({ onPromptClick }: WelcomeScreenProps) {
  return (
    <div className="flex flex-col items-center px-4 py-8 text-center sm:px-6 sm:py-12">
      {/* AI Assistant Icon */}
      <div className="relative mb-6 sm:mb-8">
        <div className="absolute inset-0 animate-pulse-ring rounded-3xl bg-brand-400" />
        <div className="relative flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-brand-500 to-brand-700 shadow-lg shadow-brand-500/30 sm:h-20 sm:w-20">
          <Sparkles className="h-8 w-8 text-white sm:h-10 sm:w-10" strokeWidth={2} />
        </div>
      </div>

      {/* Greeting */}
      <h2 className="mb-3 max-w-lg text-balance text-xl font-semibold leading-snug text-gray-900 sm:text-2xl sm:leading-tight dark:text-white">
        Hello there!{' '}
        <span className="inline-block animate-fade-in">👋</span>
        <br />
        I&apos;m your AI Assistant.
      </h2>

      <p className="mb-2 max-w-md text-balance text-sm leading-relaxed text-gray-600 sm:text-base dark:text-gray-300">
        Welcome to the future of smarter business communication. Ask me anything and
        experience how an AI agent can help your business.
      </p>

      <p className="mb-7 text-xs text-gray-400 sm:mb-8 sm:text-sm dark:text-gray-500">
        Start a conversation below to explore what AI can do.
      </p>

      {/* Suggested Prompts */}
      <div className="flex w-full max-w-lg flex-col gap-2.5 sm:gap-3">
        {SUGGESTED_PROMPTS.map((prompt, index) => (
          <button
            key={prompt}
            onClick={() => onPromptClick(prompt)}
            style={{ animationDelay: `${index * 100}ms` }}
            className="group flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3.5 text-left text-sm font-medium text-gray-700 shadow-sm transition-all duration-200 hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700 hover:shadow-md animate-fade-in-up sm:px-5 sm:py-4 sm:text-[15px] dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:border-brand-500 dark:hover:bg-brand-900/30 dark:hover:text-brand-300"
          >
            <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 text-brand-600 transition-colors duration-200 group-hover:bg-brand-100 dark:bg-gray-700 dark:text-brand-400 dark:group-hover:bg-brand-900/40">
              <Sparkles className="h-3.5 w-3.5" strokeWidth={2.5} />
            </span>
            <span className="flex-1">{prompt}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
