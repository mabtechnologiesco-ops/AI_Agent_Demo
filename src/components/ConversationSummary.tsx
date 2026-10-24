import type { ConversationSummary } from '@/types/chat';

interface ConversationSummaryProps {
  summary: ConversationSummary;
}

export default function ConversationSummary({
  summary,
}: ConversationSummaryProps) {
  const hasData =
    summary.selectedIndustry ||
    Object.keys(summary.collectedInfo).length > 0;

  return (
    <aside className="hidden lg:flex lg:w-72 lg:flex-col">
      <div className="sticky top-24">
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-center gap-2 mb-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-600">
              <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Conversation Summary
            </h3>
          </div>

          <div className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">
            Collected information
          </div>

          {!hasData ? (
            <div className="text-center py-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No conversation data yet. Start chatting to see information collected here.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {summary.selectedIndustry && (
                <div className="flex items-start gap-2">
                  <span className="flex shrink-0 items-center rounded-full bg-brand-100 px-2 py-0.5 text-xs font-medium text-brand-700 dark:bg-brand-900/30 dark:text-brand-400">
                    Industry
                  </span>
                  <p className="text-sm text-gray-900 dark:text-white">
                    {summary.selectedIndustry}
                  </p>
                </div>
              )}

              {Object.entries(summary.collectedInfo).map(([key, value]) => (
                <div key={key} className="flex items-start gap-2">
                  <span
                    className="flex shrink-0 items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300"
                  >
                    {key}
                  </span>
                  <p className="text-sm text-gray-900 dark:text-white">{value}</p>
                </div>
              ))}
            </div>
          )}

          <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
            <p className="text-[11px] font-medium text-red-600 dark:text-red-400 leading-relaxed">
              DEMO ONLY — No real booking, order, payment, or appointment has been completed.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}