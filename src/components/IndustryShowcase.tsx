import { useState } from 'react';
import {
  Building2,
  Utensils,
  ShoppingBag,
  Truck,
  Stethoscope,
  Scissors,
  HardHat,
  ArrowRight,
} from 'lucide-react';

const INDUSTRY_ICONS: Record<string, React.ElementType> = {
  Building2,
  Utensils,
  ShoppingBag,
  Truck,
  Stethoscope,
  Scissors,
  HardHat,
};

interface IndustryCard {
  id: string;
  name: string;
  shortName: string;
  description: string;
  icon: string;
  demoData: string[];
}

import type { IndustryScenario } from '@/types/chat';

interface IndustryShowcaseProps {
  onSelectScenario: (scenarioId: IndustryScenario | null) => void;
  onLaunchDemo: (scenarioId: IndustryScenario) => void;
}

export default function IndustryShowcase({
  onSelectScenario,
  onLaunchDemo,
}: IndustryShowcaseProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const industries: IndustryCard[] = [
    {
      id: 'hotel',
      name: 'Hotels and Hospitality',
      shortName: 'Hotel Reservations',
      description:
        'Answer guest enquiries, collect preferred dates and guest counts, and demonstrate reservation requests.',
      icon: 'Building2',
      demoData: ['Check-in date', 'Check-out date', 'Number of guests'],
    },
    {
      id: 'restaurant',
      name: 'Restaurants',
      shortName: 'Restaurant Orders',
      description:
        'Answer menu questions, help customers explore menu items, and demonstrate order collection.',
      icon: 'Utensils',
      demoData: ['Party size', 'Preferred dining time', 'Menu items of interest'],
    },
    {
      id: 'ecommerce',
      name: 'E-commerce',
      shortName: 'E-commerce Assistant',
      description: 'Help shoppers discover products, compare options, and understand delivery and returns.',
      icon: 'ShoppingBag',
      demoData: ['Product category', 'Budget range', 'Preferred features'],
    },
    {
      id: 'carrental',
      name: 'Car Rentals',
      shortName: 'Car Rental Enquiries',
      description:
        'Answer vehicle enquiries, collect preferred rental dates and vehicle preferences, and demonstrate rental requests.',
      icon: 'Truck',
      demoData: ['Pickup date', 'Return date', 'Vehicle category'],
    },
    {
      id: 'clinic',
      name: 'Clinics',
      shortName: 'Clinic Appointments',
      description:
        'Answer general service enquiries, collect basic appointment preferences, and demonstrate appointment requests.',
      icon: 'Stethoscope',
      demoData: ['Service type', 'Preferred appointment date', 'Preferred time'],
    },
    {
      id: 'salon',
      name: 'Salons and Barbershops',
      shortName: 'Salon Bookings',
      description:
        'Explain services, answer price-list questions when sample prices are clearly identified as demonstration data, and demonstrate appointment requests.',
      icon: 'Scissors',
      demoData: ['Service type', 'Stylist preference', 'Appointment date'],
    },
    {
      id: 'construction',
      name: 'Construction and Professional Services',
      shortName: 'Construction Enquiries',
      description:
        'Explain services, collect project requirements, and demonstrate quotation enquiries.',
      icon: 'HardHat',
      demoData: ['Project type', 'Project timeline', 'Budget range'],
    },
  ];

  return (
    <section
      id="industries"
      className="w-full bg-gray-50/50 dark:bg-gray-950"
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="text-center mb-16">
          <h2 className="text-balance text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
            One AI Agent. Multiple Business Possibilities.
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Explore how intelligent assistants can support different industries
            and customer workflows.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((industry) => {
            const Icon = INDUSTRY_ICONS[industry.icon] || Building2;
            const isSelected = selected === industry.id;
            return (
              <button
                key={industry.id}
                onClick={() => {
                  setSelected(industry.id);
                  const id = industry.id as IndustryScenario;
                  onSelectScenario(id);
                  onLaunchDemo(id);
                }}
                className={`group relative rounded-3xl border p-6 text-left hover:border-brand-300 hover:shadow-xl transition-all duration-200 ${
                  isSelected
                    ? 'border-brand-600 bg-brand-50 shadow-lg dark:border-brand-600 dark:bg-brand-900/30'
                    : 'border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900'
                }`}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 text-brand-600 group-hover:bg-brand-600 group-hover:text-white transition-colors mb-4">
                  <Icon className="h-5 w-5" strokeWidth={2} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {industry.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                  {industry.description}
                </p>
                <div className="mt-auto flex items-center gap-2 text-sm font-medium text-brand-600 dark:text-brand-400">
                  Try Demo <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </button>
            );
          })}
        </div>

        {selected && (
          <div className="mt-8 rounded-2xl border border-brand-100 bg-brand-50 px-6 py-4 dark:border-brand-900/30 dark:bg-brand-900/20">
            <p className="text-sm text-brand-900 dark:text-brand-100">
              Opening the <span className="font-semibold">{industries.find((i) => i.id === selected)?.name}</span> website demonstration.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
