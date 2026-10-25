import { Mail, Smartphone } from 'lucide-react';

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="w-full bg-brand-900 text-white"
    >
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">
            Ready for an AI Agent Built for Your Business?
          </h2>
          <p className="mt-4 text-lg text-brand-100 max-w-xl mx-auto">
            Let MAB Technologies SL help you identify the right AI solution for
            your business, from customer support and appointment requests to
            product assistance and workflow automation.
          </p>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://mab-technologies-new.onrender.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-8 py-4 text-sm font-semibold hover:bg-brand-700 transition-colors sm:px-10 sm:py-4"
          >
            <Mail className="h-5 w-5" /> Talk to MAB Technologies
          </a>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-brand-200">
          <div className="flex items-center gap-3">
            <Mail className="h-4 w-4" />
            <a
              href="mailto:mabtechnologies.co@gmail.com"
              className="hover:text-brand-400 transition-colors"
            >
              mabtechnologies.co@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Smartphone className="h-4 w-4" />
            <a
              href="https://wa.me/23270451369"
              className="hover:text-brand-400 transition-colors"
            >
              +232 704 51369
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Smartphone className="h-4 w-4" />
            <a
              href="https://wa.me/23278968909"
              className="hover:text-brand-400 transition-colors"
            >
              +232 789 68909
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}