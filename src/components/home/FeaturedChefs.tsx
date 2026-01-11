import { ChefHat, Users, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

const featuredChefs = [
  {
    id: '1',
    name: 'Sarah Chen',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    specialty: 'Asian Fusion',
    recipes: 45,
    followers: 12400,
  },
  {
    id: '2',
    name: 'Giovanni Bianchi',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    specialty: 'Italian Classics',
    recipes: 62,
    followers: 18900,
  },
  {
    id: '3',
    name: 'Maria Rossi',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80',
    specialty: 'Mediterranean',
    recipes: 38,
    followers: 9800,
  },
  {
    id: '4',
    name: 'Kenji Tanaka',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    specialty: 'Japanese Cuisine',
    recipes: 54,
    followers: 22300,
  },
];

export function FeaturedChefs() {
  return (
    <section className="bg-muted/50 py-16 lg:py-24">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            <ChefHat className="h-4 w-4" />
            <span>Community Spotlight</span>
          </div>
          <h2 className="font-serif text-3xl font-bold text-foreground lg:text-4xl">
            Featured Home Chefs
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Meet the talented cooks behind our most loved recipes
          </p>
        </div>

        {/* Chefs Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredChefs.map((chef, index) => (
            <div
              key={chef.id}
              className="animate-fade-up group rounded-2xl bg-card p-6 text-center shadow-card transition-all hover:shadow-card-hover opacity-0"
              style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
            >
              {/* Avatar */}
              <div className="relative mx-auto mb-4 h-24 w-24">
                <img
                  src={chef.avatar}
                  alt={chef.name}
                  className="h-full w-full rounded-full object-cover ring-4 ring-background transition-transform group-hover:scale-105"
                />
                <div className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <ChefHat className="h-4 w-4" />
                </div>
              </div>

              {/* Info */}
              <h3 className="font-serif text-lg font-semibold text-foreground">
                {chef.name}
              </h3>
              <p className="mt-1 text-sm text-primary">{chef.specialty}</p>

              {/* Stats */}
              <div className="mt-4 flex items-center justify-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  <span>{chef.recipes}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{(chef.followers / 1000).toFixed(1)}k</span>
                </div>
              </div>

              {/* Follow Button */}
              <Button variant="outline" size="sm" className="mt-4 w-full">
                Follow
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
