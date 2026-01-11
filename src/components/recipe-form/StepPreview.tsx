import { Clock, Users, Flame, ChefHat, Check } from 'lucide-react';
import { RecipeFormData } from '@/pages/NewRecipe';

interface StepPreviewProps {
  formData: RecipeFormData;
}

export function StepPreview({ formData }: StepPreviewProps) {
  const totalTime = formData.prepTime + formData.cookTime;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'text-recipe-easy bg-recipe-easy/10';
      case 'medium':
        return 'text-recipe-medium bg-recipe-medium/10';
      case 'hard':
        return 'text-recipe-hard bg-recipe-hard/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-xl font-semibold text-foreground">
            Preview Your Recipe
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Review everything before publishing
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground">
          <Check className="h-4 w-4" />
          Ready to publish
        </div>
      </div>

      {/* Recipe Card Preview */}
      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        {/* Image */}
        {formData.image ? (
          <div className="relative aspect-video w-full overflow-hidden">
            <img
              src={formData.image}
              alt={formData.name}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <span
                className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold capitalize ${getDifficultyColor(
                  formData.difficulty
                )}`}
              >
                <Flame className="h-3 w-3" />
                {formData.difficulty}
              </span>
            </div>
          </div>
        ) : (
          <div className="flex aspect-video items-center justify-center bg-muted">
            <div className="text-center text-muted-foreground">
              <ChefHat className="mx-auto h-12 w-12 opacity-50" />
              <p className="mt-2 text-sm">No image uploaded</p>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          {/* Category */}
          {formData.category && (
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              {formData.category}
            </span>
          )}

          {/* Title */}
          <h3 className="mt-2 font-serif text-2xl font-bold text-foreground">
            {formData.name || 'Untitled Recipe'}
          </h3>

          {/* Description */}
          <p className="mt-2 text-muted-foreground">
            {formData.description || 'No description provided.'}
          </p>

          {/* Meta */}
          <div className="mt-4 flex flex-wrap gap-4 border-t border-border pt-4">
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Clock className="h-4 w-4 text-primary" />
              <span>Prep: {formData.prepTime}m</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Clock className="h-4 w-4 text-primary" />
              <span>Cook: {formData.cookTime}m</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Clock className="h-4 w-4 text-accent" />
              <span>Total: {totalTime}m</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Users className="h-4 w-4 text-primary" />
              <span>{formData.servings} servings</span>
            </div>
          </div>
        </div>
      </div>

      {/* Ingredients Summary */}
      <div className="rounded-xl border border-border bg-card p-4">
        <h4 className="font-semibold text-foreground">
          Ingredients ({formData.ingredients.filter((i) => i.name).length})
        </h4>
        <div className="mt-3 flex flex-wrap gap-2">
          {formData.ingredients
            .filter((i) => i.name)
            .map((ingredient) => (
              <span
                key={ingredient.id}
                className="rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground"
              >
                {ingredient.amount} {ingredient.unit} {ingredient.name}
              </span>
            ))}
          {formData.ingredients.filter((i) => i.name).length === 0 && (
            <span className="text-sm text-muted-foreground">No ingredients added</span>
          )}
        </div>
      </div>

      {/* Instructions Summary */}
      <div className="rounded-xl border border-border bg-card p-4">
        <h4 className="font-semibold text-foreground">
          Instructions ({formData.instructions.filter((i) => i.text).length} steps)
        </h4>
        <ol className="mt-3 space-y-2">
          {formData.instructions
            .filter((i) => i.text)
            .map((instruction) => (
              <li key={instruction.id} className="flex gap-3 text-sm">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                  {instruction.step}
                </span>
                <span className="text-muted-foreground">{instruction.text}</span>
              </li>
            ))}
          {formData.instructions.filter((i) => i.text).length === 0 && (
            <span className="text-sm text-muted-foreground">No instructions added</span>
          )}
        </ol>
      </div>
    </div>
  );
}
