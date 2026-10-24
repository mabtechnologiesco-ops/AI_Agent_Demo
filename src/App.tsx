import { useState, useCallback, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import IndustryShowcase from '@/components/IndustryShowcase';
import HowItWorks from '@/components/HowItWorks';
import ContactSection from '@/components/ContactSection';
import ChatInterface from '@/components/ChatInterface';
import ConversationSummaryComponent from '@/components/ConversationSummary';
import IndustryDemoPage from '@/components/IndustryDemoPage';
import type { ConversationSummary, IndustryScenario } from '@/types/chat';

function App() {
  const readDemoRoute = () => {
    const match = window.location.pathname.match(/^\/demo\/(hotel|restaurant|ecommerce|carrental|clinic|salon|construction)\/?$/);
    return match?.[1] as IndustryScenario | undefined;
  };
  const [demoIndustry, setDemoIndustry] = useState<IndustryScenario | undefined>(() => readDemoRoute());
  const [selectedScenario, setSelectedScenario] = useState<IndustryScenario | null>(null);
  const [conversationSummary, setConversationSummary] = useState<ConversationSummary>({
    selectedIndustry: null,
    collectedInfo: {},
    status: 'idle',
    demoOnly: true,
  });
  const scrollToSection = useCallback((sectionId: string) => {
    if (sectionId === 'chat') {
      const el = document.getElementById('chat-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (sectionId === 'contact') {
      const el = document.getElementById('contact-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  useEffect(() => {
    const syncRoute = () => setDemoIndustry(readDemoRoute());
    window.addEventListener('popstate', syncRoute);
    return () => window.removeEventListener('popstate', syncRoute);
  }, []);

  const launchDemo = useCallback((scenario: IndustryScenario) => {
    if (!scenario) return;
    window.history.pushState({}, '', `/demo/${scenario}`);
    setDemoIndustry(scenario);
    window.scrollTo(0, 0);
  }, []);

  const returnToShowroom = useCallback(() => {
    window.history.pushState({}, '', '/');
    setDemoIndustry(undefined);
    window.scrollTo(0, 0);
  }, []);

  const handleScenarioSelect = useCallback((scenarioId: IndustryScenario | null) => {
    setSelectedScenario(scenarioId);
    setConversationSummary(() => ({
      selectedIndustry: scenarioId
        ? ['hotel', 'restaurant', 'ecommerce', 'carrental', 'clinic', 'salon', 'construction'].find(
            (s) => s === scenarioId
          )!.replace(/^[a-z]/, (c) => c.toUpperCase()) +
          ' scenario selected'
        : null,
      collectedInfo: {},
      status: scenarioId ? 'collecting' : 'idle',
      demoOnly: true,
    }));
  }, []);

  const updateSummary = useCallback((info: Record<string, string>) => {
    setConversationSummary((prev: ConversationSummary) => ({
      ...prev,
      collectedInfo: { ...prev.collectedInfo, ...info },
      status: 'collecting',
    }));
  }, []);

  const resetConversation = useCallback(() => {
    setConversationSummary({
      selectedIndustry: null,
      collectedInfo: {},
      status: 'idle',
      demoOnly: true,
    });
  }, []);

  if (demoIndustry) {
    return <IndustryDemoPage industry={demoIndustry} onBack={returnToShowroom} />;
  }

  return (
    <div className="flex h-screen flex-col bg-white dark:bg-gray-950">
      <Navigation onScrollToSection={scrollToSection} />

      <main className="flex-1 overflow-x-hidden pt-16 relative">
        <Hero
          onScrollToChat={() => scrollToSection('chat')}
          onContact={() => scrollToSection('contact')}
        />

        <section
          id="chat-section"
          className="w-full bg-gray-50/50 dark:bg-gray-950 py-12"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-8">
                <ChatInterface
                  selectedScenario={selectedScenario}
                  onScenarioSelect={handleScenarioSelect}
                  onSummaryUpdate={updateSummary}
                  onReset={resetConversation}
                />
              </div>

              <ConversationSummaryComponent summary={conversationSummary} />

              <div className="lg:col-span-4 mt-8 lg:mt-0">
                <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Try a scenario
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                    Select an industry from the buttons above or below to see how
                    an AI Agent can assist your business. Each scenario is a
                    live demonstration — no login required.
                  </p>
                  <div className="mt-6">
                    <button
                      onClick={() => scrollToSection('industries')}
                      className="flex items-center gap-2 w-full rounded-xl border border-brand-200 bg-brand-50 px-4 py-3 text-sm font-semibold text-brand-700 hover:bg-brand-100 transition-colors dark:border-brand-900/30 dark:bg-brand-900/20 dark:text-brand-300 dark:hover:bg-brand-900/40"
                    >
                      Browse All Industries
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <IndustryShowcase onSelectScenario={handleScenarioSelect} onLaunchDemo={launchDemo} />
        <HowItWorks />
        <ContactSection />
      </main>

      
    </div>
  );
}

export default App;
