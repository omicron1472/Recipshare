import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Heart, Star } from 'lucide-react';
import { Recipe } from '@/types/recipe';

interface RecipeCardCompactProps {
  recipe: Recipe;
}

export function RecipeCardCompact({ recipe }: RecipeCardCompactProps) {
  const [isLiked, setIsLiked] = useState(recipe.isLiked);
  const [likes, setLikes] = useState(recipe.likes);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  return (
    <Link to={`/recipe/${recipe.id.split('-')[0]}`} className="group block">
      <article className="recipe-card overflow-hidden rounded-2xl bg-card">
        {/* Image Container */}
        <div className="recipe-card-image relative aspect-[4/3] overflow-hidden">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          
          {/* Category Tag */}
          <div className="absolute left-3 top-3 rounded-full bg-card/90 px-3 py-1 text-xs font-semibold text-foreground backdrop-blur-sm">
            {recipe.category}
          </div>

          {/* Favorite Button */}
          <button
            onClick={handleLike}
            className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full backdrop-blur-sm transition-all ${
              isLiked
                ? 'bg-accent text-accent-foreground'
                : 'bg-card/80 text-muted-foreground hover:bg-accent hover:text-accent-foreground'
            }`}
          >
            <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
          </button>

          {/* Gradient Overlay */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Title */}
          <h3 className="line-clamp-2 font-serif text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
            {recipe.title}
          </h3>

          {/* Meta Row */}
          <div className="mt-3 flex items-center justify-between">
            {/* Cooking Time */}
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{recipe.cookingTime} min</span>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-recipe-medium text-recipe-medium" />
              <span className="text-sm font-medium text-foreground">{recipe.rating}</span>
            </div>
          </div>

          {/* Author */}
          <div className="mt-3 flex items-center gap-2 border-t border-border pt-3">
            <img
              src={recipe.author.avatar}
              alt={recipe.author.name}
              className="h-7 w-7 rounded-full object-cover ring-1 ring-border"
            />
            <span className="text-sm text-muted-foreground">
              by <span className="font-medium text-foreground">{recipe.author.name}</span>
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
