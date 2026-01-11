import { Loader2 } from 'lucide-react';
import { RecipeCardCompact } from '@/components/recipe/RecipeCardCompact';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';

export function RecipeFeed() {
  const { recipes, loading, hasMore, lastRecipeRef } = useInfiniteScroll(6);

  return (
    <section className="py-8 lg:py-12">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="font-serif text-2xl font-bold text-foreground lg:text-3xl">
              Discover Recipes
            </h2>
            <p className="mt-1 text-muted-foreground">
              Scroll to explore more delicious dishes
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              {recipes.length}+ recipes
            </span>
          </div>
        </div>

        {/* Recipe Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recipes.map((recipe, index) => (
            <div
              key={recipe.id}
              ref={index === recipes.length - 1 ? lastRecipeRef : null}
              className="animate-fade-up opacity-0"
              style={{
                animationDelay: `${(index % 6) * 0.05}s`,
                animationFillMode: 'forwards',
              }}
            >
              <RecipeCardCompact recipe={recipe} />
            </div>
          ))}
        </div>

        {/* Loading Indicator */}
        {loading && (
          <div className="mt-8 flex items-center justify-center gap-2 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Loading more recipes...</span>
          </div>
        )}

        {/* End Message */}
        {!hasMore && !loading && (
          <div className="mt-12 text-center">
            <p className="text-muted-foreground">
              You've seen all the recipes! 🎉
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Check back later for new additions
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
