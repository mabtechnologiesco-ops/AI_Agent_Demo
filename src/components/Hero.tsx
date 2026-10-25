import { ArrowDown, Bot, Sparkles } from 'lucide-react';
import { BackgroundBeams } from '@/components/ui/background-beams';

interface HeroProps {
  onScrollToChat: () => void;
  onContact: () => void;
}

export default function Hero({ onScrollToChat, onContact }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative w-full bg-gray-950 overflow-hidden"
    >
      <BackgroundBeams />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-900/20 px-3 py-1 text-xs font-semibold text-brand-300 uppercase tracking-tighter">
              <span className="relative h-1.5 w-1.5 rounded-full bg-brand-600" />
              Interactive AI Agent Showroom
            </span>

            <h1 className="text-balance text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Meet Your Next{' '}
              <span className="text-brand-400">AI Employee.</span>
            </h1>

            <p className="text-balance text-lg text-gray-300 sm:text-xl max-w-lg">
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
                className="flex items-center justify-center gap-2 rounded-xl border border-gray-700 px-8 py-3.5 text-sm font-semibold text-gray-100 hover:bg-gray-800 transition-colors"
              >
                Build My AI Agent
              </button>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="relative rounded-3xl border border-gray-800 bg-gray-900 p-6 shadow-2xl">
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-brand-500 to-brand-700 blur opacity-30" />
              <div className="relative flex flex-col gap-6">
                <div className="flex items-center gap-3 rounded-xl bg-brand-900/20 px-4 py-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-600">
                    <Bot className="h-5 w-5 text-white" strokeWidth={2.2} />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-brand-100 uppercase tracking-tighter">
                      Universal AI Assistant
                    </p>
                    <p className="text-xs text-gray-400">
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
                      <p className="text-sm font-medium text-white">
                        Customer Support
                      </p>
                      <p className="text-xs text-gray-400">
                        24/7 automated responses
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-100 text-brand-600 shrink-0">
                      <Sparkles className="h-4 w-4" strokeWidth={2} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">
                        Lead Capture
                      </p>
                      <p className="text-xs text-gray-400">
                        Qualify enquiries automatically
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-100 text-brand-600 shrink-0">
                      <Sparkles className="h-4 w-4" strokeWidth={2} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">
                        Booking Assistant
                      </p>
                      <p className="text-xs text-gray-400">
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
