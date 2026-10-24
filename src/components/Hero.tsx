import { ArrowDown, Bot, Sparkles } from 'lucide-react';

interface HeroProps {
  onScrollToChat: () => void;
  onContact: () => void;
}

export default function Hero({ onScrollToChat, onContact }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative w-full bg-white dark:bg-gray-950 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 uppercase tracking-tighter dark:bg-brand-900/20 dark:text-brand-300">
              <span className="relative h-1.5 w-1.5 rounded-full bg-brand-600" />
              Interactive AI Agent Showroom
            </span>

            <h1 className="text-balance text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl dark:text-white">
              Meet Your Next{' '}
              <span className="text-brand-600 dark:text-brand-400">AI Employee.</span>
            </h1>

            <p className="text-balance text-lg text-gray-600 sm:text-xl dark:text-gray-300 max-w-lg">
              Discover how AI Agents can answer customer questions, capture
              enquiries, assist with bookings, recommend products, and streamline
              everyday business tasks.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={onScrollToChat}
                className="flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 hover:bg-brand-700 hover:shadow-brand-600/35 transition-all active:scale-95"
              >
                Try the AI Agent <ArrowDown className="h-4 w-4" />
              </button>
              <button
                onClick={onContact}
                className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-8 py-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 transition-colors dark:border-gray-700 dark:text-gray-100 dark:hover:bg-gray-800"
              >
                Build My AI Agent
              </button>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="relative rounded-3xl border border-gray-200 bg-white p-6 shadow-2xl dark:border-gray-800 dark:bg-gray-900">
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-brand-500 to-brand-700 blur opacity-30" />
              <div className="relative flex flex-col gap-6">
                <div className="flex items-center gap-3 rounded-xl bg-brand-50 px-4 py-3 dark:bg-brand-900/20">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-600">
                    <Bot className="h-5 w-5 text-white" strokeWidth={2.2} />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-brand-900 dark:text-brand-100 uppercase tracking-tighter">
                      Universal AI Assistant
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Status: Online
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-100 text-brand-600 shrink-0">
                      <Sparkles className="h-4 w-4" strokeWidth={2} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        Customer Support
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        24/7 automated responses
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-100 text-brand-600 shrink-0">
                      <Sparkles className="h-4 w-4" strokeWidth={2} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        Lead Capture
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Qualify enquiries automatically
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-100 text-brand-600 shrink-0">
                      <Sparkles className="h-4 w-4" strokeWidth={2} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        Booking Assistant
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Streamline appointments
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}