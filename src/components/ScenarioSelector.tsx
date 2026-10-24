import {
  Building2,
  Utensils,
  ShoppingBag,
  Truck,
  Stethoscope,
  Scissors,
  HardHat,
  Sparkles,
} from 'lucide-react';
import type { IndustryScenario } from '@/types/chat';
import { INDUSTRY_SCENARIOS } from '@/lib/scenarios';

interface ScenarioSelectorProps {
  selectedScenario: IndustryScenario | null;
  onSelectScenario: (scenarioId: IndustryScenario | null) => void;
}

export default function ScenarioSelector({
  selectedScenario,
  onSelectScenario,
}: ScenarioSelectorProps) {
  const handleSelectScenario = (scenarioId: IndustryScenario | null) => onSelectScenario(scenarioId);

  return (
    <div className="max-w-lg space-y-3">
      <div className="flex items-center gap-3 rounded-xl bg-brand-50 px-4 py-3 dark:bg-brand-900/20 mb-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600">
          <Sparkles className="h-4 w-4 text-white" strokeWidth={2} />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-700 dark:text-brand-400">
            Choose a scenario
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {selectedScenario ? INDUSTRY_SCENARIOS.find((s) => s.id === selectedScenario)?.name : 'Explore any business type'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {[
          { id: null as IndustryScenario | null, label: 'General Assistant', icon: Sparkles },
          { id: 'hotel' as IndustryScenario, label: 'Hotel Reservations', icon: Building2 },
          { id: 'restaurant' as IndustryScenario, label: 'Restaurant Orders', icon: Utensils },
          { id: 'ecommerce' as IndustryScenario, label: 'E-commerce', icon: ShoppingBag },
          { id: 'carrental' as IndustryScenario, label: 'Car Rentals', icon: Truck },
          { id: 'clinic' as IndustryScenario, label: 'Clinic Appointments', icon: Stethoscope },
          { id: 'salon' as IndustryScenario, label: 'Salon Bookings', icon: Scissors },
          { id: 'construction' as IndustryScenario, label: 'Construction', icon: HardHat },
        ].map((item) => {
          const Icon = item.icon;
          const isSelected = selectedScenario === item.id;
          return (
            <button
              key={String(item.id)}
              onClick={() => {
                handleSelectScenario(item.id);
              }}
              className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 text-left text-sm transition-all duration-200 ${
                isSelected
                  ? 'border-brand-600 bg-brand-50 text-brand-700 dark:border-brand-600 dark:bg-brand-900/30 dark:text-brand-300'
                  : 'border-gray-200 text-gray-600 hover:border-brand-300 hover:bg-brand-50 dark:border-gray-700 dark:text-gray-300 dark:hover:border-brand-500 dark:hover:bg-brand-900/30'
              }`}
            >
              <Icon className="h-4 w-4" strokeWidth={2} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

    </div>
  );
}
