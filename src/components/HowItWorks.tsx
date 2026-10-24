const steps = [
  {
    number: '01',
    title: 'Choose a Business Scenario',
    description:
      'Select an industry or describe a business task you want the AI agent to handle.',
    icon: 'Building2',
  },
  {
    number: '02',
    title: 'Interact With the AI Agent',
    description:
      'Ask questions and experience a sample business workflow in real time.',
    icon: 'Bot',
  },
  {
    number: '03',
    title: 'Build Your Custom Solution',
    description:
      'Contact MAB Technologies SL to discuss an AI Agent tailored to your business.',
    icon: 'ArrowRight',
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="w-full bg-white dark:bg-gray-950"
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="text-center mb-16">
          <h2 className="text-balance text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Experience an AI Agent in three simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div
              key={step.number}
              className="rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm hover:shadow-md transition-colors dark:border-gray-800 dark:bg-gray-900"
            >
              <div className="flex items-center justify-center gap-2 rounded-full bg-brand-50 px-4 py-2 mb-6 inline-block dark:bg-brand-900/20">
                <span className="text-sm font-bold text-brand-700 dark:text-brand-400">
                  {step.number}
                </span>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                {step.title}
              </h3>

              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
