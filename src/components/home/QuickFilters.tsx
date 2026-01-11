import { useState } from 'react';
import { Clock, Flame, Leaf, Sparkles, Coffee, UtensilsCrossed, Cake, Zap } from 'lucide-react';

const filters = [
  { id: 'all', label: 'All', icon: Sparkles },
  { id: 'trending', label: 'Trending', icon: Flame },
  { id: 'quick', label: 'Under 30 min', icon: Zap },
  { id: 'breakfast', label: 'Breakfast', icon: Coffee },
  { id: 'lunch', label: 'Lunch', icon: UtensilsCrossed },
  { id: 'dinner', label: 'Dinner', icon: UtensilsCrossed },
  { id: 'dessert', label: 'Dessert', icon: Cake },
  { id: 'vegetarian', label: 'Vegetarian', icon: Leaf },
];

export function QuickFilters() {
  const [activeFilter, setActiveFilter] = useState('all');

  return (
    <section className="border-b border-border bg-muted/30 py-4">
      <div className="container mx-auto">
        <div className="hide-scrollbar flex gap-2 overflow-x-auto pb-1">
          {filters.map((filter) => {
            const Icon = filter.icon;
            const isActive = activeFilter === filter.id;
            
            return (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-button'
                    : 'bg-card text-muted-foreground hover:bg-secondary hover:text-secondary-foreground'
                }`}
              >
                <Icon className="h-4 w-4" />
                {filter.label}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
