import { useState } from 'react';
import { Search, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Hero() {
  const [searchQuery, setSearchQuery] = useState('');

  const popularSearches = ['Pasta', 'Chicken', 'Vegan', 'Quick Dinner', 'Desserts'];

  return (
    <section className="hero-gradient relative overflow-hidden py-20 lg:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute left-1/4 top-10 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute right-1/4 bottom-10 h-96 w-96 rounded-full bg-secondary/40 blur-3xl" />
      </div>

      <div className="container relative mx-auto">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="animate-fade-up mb-6 inline-flex items-center gap-2 rounded-full bg-secondary/80 px-4 py-2 text-sm font-medium text-secondary-foreground backdrop-blur-sm">
            <span className="text-lg">🍳</span>
            <span>Over 10,000+ recipes from home cooks</span>
          </div>

          {/* Headline */}
          <h1 className="animate-fade-up stagger-1 font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Discover & Share
            <span className="block text-primary">Delicious Recipes</span>
          </h1>

          {/* Subheadline */}
          <p className="animate-fade-up stagger-2 mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
            Find your next favorite dish from our community of passionate home cooks. 
            From quick weeknight dinners to impressive desserts.
          </p>

          {/* Search Bar */}
          <div className="animate-fade-up stagger-3 mx-auto mt-10 max-w-xl">
            <div className="relative flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search recipes, ingredients, or cuisines..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-14 rounded-xl border-2 border-border bg-card pl-12 pr-4 text-base shadow-card transition-all focus:border-primary focus:shadow-card-hover"
                />
              </div>
              <Button variant="hero" className="h-14 rounded-xl px-6">
                Search
              </Button>
            </div>

            {/* Popular Searches */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              <span className="text-sm text-muted-foreground">Popular:</span>
              {popularSearches.map((search) => (
                <button
                  key={search}
                  onClick={() => setSearchQuery(search)}
                  className="rounded-full bg-card px-3 py-1 text-sm text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  {search}
                </button>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div className="animate-fade-up stagger-4 mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button variant="hero" className="gap-2">
              Browse Recipes
              <ChevronRight className="h-5 w-5" />
            </Button>
            <Button variant="heroOutline">
              Share Your Recipe
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
