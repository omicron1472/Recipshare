import { useState } from 'react';
import { categories } from '@/data/mockData';

export function CategoryFilter() {
  const [activeCategory, setActiveCategory] = useState('1');

  return (
    <section className="py-8">
      <div className="container mx-auto">
        <div className="flex flex-wrap items-center justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`category-chip ${
                activeCategory === category.id ? 'active' : ''
              }`}
            >
              <span className="text-lg">{category.icon}</span>
              <span>{category.name}</span>
              {category.count > 0 && (
                <span className="ml-1 text-xs opacity-70">({category.count})</span>
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
