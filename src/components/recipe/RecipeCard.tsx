import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Heart, Star, Bookmark, Users } from 'lucide-react';
import { Recipe } from '@/types/recipe';

interface RecipeCardProps {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  const [isLiked, setIsLiked] = useState(recipe.isLiked);
  const [isSaved, setIsSaved] = useState(recipe.isSaved);
  const [likes, setLikes] = useState(recipe.likes);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSaved(!isSaved);
  };

  const getDifficultyClass = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'difficulty-easy';
      case 'medium':
        return 'difficulty-medium';
      case 'hard':
        return 'difficulty-hard';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Link to={`/recipe/${recipe.id}`} className="group">
      <article className="recipe-card">
        {/* Image Container */}
        <div className="recipe-card-image relative aspect-[4/3] overflow-hidden">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Difficulty Badge */}
          <div
            className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold capitalize ${getDifficultyClass(
              recipe.difficulty
            )}`}
          >
            {recipe.difficulty}
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full backdrop-blur-sm transition-all ${
              isSaved
                ? 'bg-primary text-primary-foreground'
                : 'bg-card/80 text-muted-foreground hover:bg-primary hover:text-primary-foreground'
            }`}
          >
            <Bookmark className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
          </button>

          {/* Overlay Content (visible on hover) */}
          <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="flex items-center gap-2 text-white">
              <Clock className="h-4 w-4" />
              <span className="text-sm font-medium">{recipe.cookingTime} min</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Category */}
          <span className="text-xs font-medium uppercase tracking-wider text-primary">
            {recipe.category}
          </span>

          {/* Title */}
          <h3 className="mt-2 line-clamp-2 font-serif text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
            {recipe.title}
          </h3>

          {/* Meta Info */}
          <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{recipe.cookingTime} min</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{recipe.servings} servings</span>
            </div>
          </div>

          {/* Author & Stats */}
          <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
            {/* Author */}
            <div className="flex items-center gap-2">
              <img
                src={recipe.author.avatar}
                alt={recipe.author.name}
                className="h-8 w-8 rounded-full object-cover ring-2 ring-background"
              />
              <span className="text-sm font-medium text-foreground">
                {recipe.author.name}
              </span>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-3">
              {/* Rating */}
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-recipe-medium text-recipe-medium" />
                <span className="text-sm font-medium">{recipe.rating}</span>
              </div>

              {/* Likes */}
              <button
                onClick={handleLike}
                className="flex items-center gap-1 transition-colors hover:text-accent"
              >
                <Heart
                  className={`h-4 w-4 transition-colors ${
                    isLiked ? 'fill-accent text-accent' : ''
                  }`}
                />
                <span className="text-sm">{likes}</span>
              </button>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
