import { useCallback, useEffect, useRef, useState } from 'react';
import { AlertCircle, X } from 'lucide-react';
import type {
  ChatMessage,
  IndustryScenario,
} from '@/types/chat';
import { sendChatMessage } from '@/lib/api';
import { DEFAULT_INTRO_MESSAGE, INDUSTRY_SCENARIOS } from '@/lib/scenarios';
import { industryKnowledgeBases } from '@/industries';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WelcomeScreen from '@/components/WelcomeScreen';
import MessageBubble from '@/components/MessageBubble';
import TypingIndicator from '@/components/TypingIndicator';
import ChatInput from '@/components/ChatInput';
import ScenarioSelector from '@/components/ScenarioSelector';

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

interface ChatInterfaceProps {
  selectedScenario: IndustryScenario | null;
  onScenarioSelect: (scenarioId: IndustryScenario | null) => void;
  onSummaryUpdate: (info: Record<string, string>) => void;
  onReset: () => void;
}

export default function ChatInterface({
  selectedScenario,
  onScenarioSelect,
  onSummaryUpdate,
  onReset,
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [demoMode, setDemoMode] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<boolean>(false);

  const scrollToBottom = useCallback(() => {
    const container = scrollContainerRef.current;
    if (container) {
      requestAnimationFrame(() => {
        container.scrollTo({
          top: container.scrollHeight,
          behavior: 'smooth',
        });
      });
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  // Each industry starts a fresh conversation with its own scoped knowledge.
  useEffect(() => {
    abortRef.current = true;
    setIsTyping(false);
    setError(null);
    setDemoMode(false);
    setMessages([{
      id: generateId(),
      role: 'ai',
      content: selectedScenario
        ? INDUSTRY_SCENARIOS.find((scenario) => scenario.id === selectedScenario)?.introMessage ?? DEFAULT_INTRO_MESSAGE
        : DEFAULT_INTRO_MESSAGE,
      timestamp: Date.now(),
    }]);
  }, [selectedScenario]);

  const handleSend = useCallback(
    async (text: string) => {
      if (!text.trim() || isTyping) return;

      setError(null);
      abortRef.current = false;

      const userMessage: ChatMessage = {
        id: generateId(),
        role: 'user',
        content: text,
        timestamp: Date.now(),
      };

      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);
      setIsTyping(true);

      try {
        const response = await sendChatMessage(
          updatedMessages,
          selectedScenario,
          selectedScenario ? industryKnowledgeBases[selectedScenario] : undefined
        );

        if (abortRef.current) return;

        const aiMessage: ChatMessage = {
          id: generateId(),
          role: 'ai',
          content: response.message,
          timestamp: Date.now(),
        };

        setMessages((prev) => [...prev, aiMessage]);
        setDemoMode(response.demoMode);

        // Extract simple info from user message for summary (demo purposes)
        const lower = text.toLowerCase();
        const infoToCollect: Record<string, string> = {};
        if (lower.includes('date') || lower.includes('day')) {
          infoToCollect['Date preference'] = text;
        }
        if (lower.includes('guest') || lower.includes('people')) {
          infoToCollect['Party size'] = text;
        }
        if (lower.includes('budget') || lower.includes('price')) {
          infoToCollect['Budget range'] = text;
        }
        if (lower.includes('service') || lower.includes('appointment')) {
          infoToCollect['Service interest'] = text;
        }
        if (Object.keys(infoToCollect).length > 0) {
          onSummaryUpdate(infoToCollect);
        }
      } catch (err) {
        if (abortRef.current) return;
        const errorMsg =
          err instanceof Error
            ? err.message
            : 'Something went wrong. Please try again.';
        setError(errorMsg);
      } finally {
        if (!abortRef.current) {
          setIsTyping(false);
        }
      }
    },
    [messages, isTyping, onSummaryUpdate, selectedScenario]
  );

  const handleStop = useCallback(() => {
    abortRef.current = true;
    setIsTyping(false);
  }, []);

  const handleScenarioChange = useCallback(
    (scenarioId: IndustryScenario | null) => {
      onScenarioSelect(scenarioId);
    },
    [onScenarioSelect]
  );

  const handleClear = useCallback(() => {
    setMessages([]);
    setError(null);
    setDemoMode(false);
    abortRef.current = true;
    setIsTyping(false);
    onReset();
  }, [onReset]);

  const hasMessages = messages.length > 0;

  return (
    <div className="flex h-full flex-col min-h-0">
      <Header />
      <div className="flex-1 overflow-x-hidden pt-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-8">
              <div className="flex h-full flex-col bg-white rounded-3xl border border-gray-200 shadow-sm dark:border-gray-800 dark:bg-gray-900 overflow-hidden">
                <div className="flex-shrink-0 border-b border-gray-200 bg-gray-50/50 p-5 sm:p-6 dark:border-gray-800 dark:bg-gray-900/50">
                  <ScenarioSelector
                    selectedScenario={selectedScenario}
                    onSelectScenario={handleScenarioChange}
                  />
                </div>

                <div
                  ref={scrollContainerRef}
                  className="flex-1 overflow-y-auto p-4 sm:p-6"
                >
                  {!hasMessages ? (
                    <div className="mx-auto max-w-3xl">
                      <WelcomeScreen onPromptClick={handleSend} />
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4 sm:gap-5">
                      {messages.map((msg) => (
                        <MessageBubble key={msg.id} message={msg} />
                      ))}
                      {isTyping && <TypingIndicator />}
                    <ChatInput
                      onSend={handleSend}
                      disabled={isTyping}
                      onStop={handleStop}
                    /></div>
                  )}

                  {error && (
                    <div className="mt-4 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 animate-fade-in sm:px-5 dark:border-red-800 dark:bg-red-900/30">
                      <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-500 dark:text-red-400" />
                      <div className="flex-1">
                        <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
                      </div>
                      <button
                        onClick={() => setError(null)}
                        className="text-red-400 transition-colors hover:text-red-600"
                        aria-label="Dismiss error"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  )}

                  {demoMode && messages.length > 0 && (
                    <div className="mt-4 flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 animate-fade-in sm:px-4 dark:border-amber-800 dark:bg-amber-900/20">
                      <span className="relative h-1.5 w-1.5 rounded-full bg-amber-500" />
                      <p className="text-xs text-amber-700 dark:text-amber-300">
                        Running in demonstration mode (live AI unavailable)
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <Footer onClear={handleClear} hasMessages={hasMessages} />

              <div className="border-t border-gray-100 bg-gray-50 px-5 py-3 dark:border-gray-800 dark:bg-gray-900/50">
                <p className="text-[10px] text-gray-400 dark:text-gray-500">
                  DEMO ONLY — No real booking, order, payment, or appointment
                  has been completed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
