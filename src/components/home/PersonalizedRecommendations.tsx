import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Clock, Star, Sparkles, Heart, TrendingUp } from 'lucide-react';
import { Recipe } from '@/types/recipe';
import { recipes } from '@/data/mockData';
import { Button } from '@/components/ui/button';

interface RecommendationSection {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  recipes: Recipe[];
  gradient: string;
}

// Simulate personalized recommendations based on user data
const getPersonalizedRecommendations = (): RecommendationSection[] => {
  // In a real app, these would be fetched from an API based on user's:
  // - Saved recipes
  // - Search history
  // - Diet preferences
  // - Interaction patterns

  return [
    {
      id: 'recommended',
      title: 'Recommended for You',
      subtitle: 'Curated based on your taste profile',
      icon: <Sparkles className="h-5 w-5" />,
      recipes: recipes.filter(r => r.rating >= 4.7).slice(0, 8),
      gradient: 'from-primary/20 via-primary/10 to-transparent',
    },
    {
      id: 'based-on-taste',
      title: 'Based on Your Taste',
      subtitle: 'Similar to recipes you\'ve loved',
      icon: <Heart className="h-5 w-5" />,
      recipes: recipes.filter(r => r.isLiked || r.isSaved).concat(
        recipes.filter(r => r.category === 'Dinner' || r.category === 'Breakfast')
      ).slice(0, 8),
      gradient: 'from-accent/20 via-accent/10 to-transparent',
    },
    {
      id: 'trending',
      title: 'Trending This Week',
      subtitle: 'Popular among food lovers',
      icon: <TrendingUp className="h-5 w-5" />,
      recipes: [...recipes].sort((a, b) => b.likes - a.likes).slice(0, 8),
      gradient: 'from-secondary/40 via-secondary/20 to-transparent',
    },
  ];
};

function RecommendationCard({ recipe }: { recipe: Recipe }) {
  return (
    <Link
      to={`/recipe/${recipe.id}`}
      className="group flex-shrink-0 w-[280px] sm:w-[320px] h-full"
    >
      <article className="relative h-full overflow-hidden rounded-2xl bg-card shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col">
        {/* Image - Clean without text overlay */}
        <div className="relative aspect-[4/3] overflow-hidden flex-shrink-0">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />

          {/* Category Badge */}
          <div className="absolute left-3 top-3 rounded-full bg-card/90 px-3 py-1 text-xs font-semibold backdrop-blur-sm">
            {recipe.category}
          </div>

          {/* Difficulty Badge */}
          <div className={`absolute right-3 top-3 rounded-full px-2.5 py-1 text-xs font-semibold backdrop-blur-sm ${recipe.difficulty === 'easy'
            ? 'bg-green-500/90 text-white'
            : recipe.difficulty === 'medium'
              ? 'bg-yellow-500/90 text-foreground'
              : 'bg-red-500/90 text-white'
            }`}>
            {recipe.difficulty.charAt(0).toUpperCase() + recipe.difficulty.slice(1)}
          </div>
        </div>

        {/* Content Section - Below Image */}
        <div className="p-4 flex-grow flex flex-col">
          {/* Dish Title */}
          <h3 className="line-clamp-2 min-h-[3.5rem] font-serif text-lg font-bold text-foreground transition-colors group-hover:text-primary">
            {recipe.title}
          </h3>

          {/* Time & Rating Row */}
          <div className="mt-3 flex items-center justify-between text-sm">
            {/* Cooking Time */}
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{recipe.cookingTime} min</span>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-recipe-medium text-recipe-medium" />
              <span className="font-medium text-foreground">{recipe.rating}</span>
            </div>
          </div>

          {/* Author Row */}
          <div className="mt-auto flex items-center gap-2 border-t border-border pt-3">
            <img
              src={recipe.author.avatar}
              alt={recipe.author.name}
              className="h-7 w-7 flex-shrink-0 rounded-full object-cover ring-1 ring-border"
            />
            <span className="text-sm text-muted-foreground truncate">
              by <span className="font-medium text-foreground">{recipe.author.name}</span>
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}


function RecommendationRow({ section }: { section: RecommendationSection }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 340;
      const newScrollLeft = scrollContainerRef.current.scrollLeft +
        (direction === 'left' ? -scrollAmount : scrollAmount);

      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="relative">
      {/* Section Header */}
      <div className={`mb-6 flex items-center justify-between rounded-xl bg-gradient-to-r ${section.gradient} px-4 py-3`}>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-primary">
            {section.icon}
          </div>
          <div>
            <h3 className="font-serif text-xl font-bold text-foreground">
              {section.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {section.subtitle}
            </p>
          </div>
        </div>

        {/* Navigation Arrows */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9 rounded-full border-border/50 bg-card/80 backdrop-blur-sm hover:bg-card"
            onClick={() => scroll('left')}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9 rounded-full border-border/50 bg-card/80 backdrop-blur-sm hover:bg-card"
            onClick={() => scroll('right')}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Scrollable Cards Container */}
      <div
        ref={scrollContainerRef}
        className="hide-scrollbar flex items-stretch gap-5 overflow-x-auto pb-4 scroll-smooth"
      >
        {section.recipes.map((recipe, index) => (
          <div
            key={`${section.id}-${recipe.id}-${index}`}
            className="animate-fade-up opacity-0 flex"
            style={{
              animationDelay: `${index * 0.05}s`,
              animationFillMode: 'forwards',
            }}
          >
            <RecommendationCard recipe={recipe} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function PersonalizedRecommendations() {
  const recommendations = getPersonalizedRecommendations();

  return (
    <section className="py-8 lg:py-12">
      <div className="container mx-auto space-y-12">
        {/* Main Section Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            <Sparkles className="h-4 w-4" />
            Personalized For You
          </div>
          <h2 className="mt-4 font-serif text-3xl font-bold text-foreground lg:text-4xl">
            Discover Your Perfect Recipe
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-muted-foreground">
            Handpicked recommendations based on your saved recipes, search history, and dietary preferences
          </p>
        </div>

        {/* Recommendation Rows */}
        {recommendations.map((section) => (
          <RecommendationRow key={section.id} section={section} />
        ))}
      </div>
    </section>
  );
}
