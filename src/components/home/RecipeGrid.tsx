import { recipes } from '@/data/mockData';
import { RecipeCard } from '@/components/recipe/RecipeCard';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function RecipeGrid() {
  return (
    <section className="py-12 lg:py-20">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="mb-10 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div>
            <h2 className="font-serif text-3xl font-bold text-foreground lg:text-4xl">
              Trending Recipes
            </h2>
            <p className="mt-2 text-muted-foreground">
              Discover what our community is cooking this week
            </p>
          </div>
          <Button variant="outline" className="gap-2">
            View All Recipes
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Recipe Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recipes.map((recipe, index) => (
            <div
              key={recipe.id}
              className="animate-fade-up opacity-0"
              style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
            >
              <RecipeCard recipe={recipe} />
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-12 text-center">
          <Button variant="outline" size="lg" className="gap-2">
            Load More Recipes
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
