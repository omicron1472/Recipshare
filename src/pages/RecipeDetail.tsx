import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Clock,
  Users,
  ChefHat,
  Heart,
  Bookmark,
  Share2,
  Star,
  ArrowLeft,
  Check,
  MessageCircle,
  Printer,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { recipes } from '@/data/mockData';

export default function RecipeDetail() {
  const { id } = useParams();
  const recipe = recipes.find((r) => r.id === id) || recipes[0];

  const [isLiked, setIsLiked] = useState(recipe.isLiked);
  const [isSaved, setIsSaved] = useState(recipe.isSaved);
  const [likes, setLikes] = useState(recipe.likes);
  const [checkedSteps, setCheckedSteps] = useState<string[]>([]);
  const [checkedIngredients, setCheckedIngredients] = useState<string[]>([]);

  const toggleStep = (stepId: string) => {
    setCheckedSteps((prev) =>
      prev.includes(stepId) ? prev.filter((id) => id !== stepId) : [...prev, stepId]
    );
  };

  const toggleIngredient = (ingredientId: string) => {
    setCheckedIngredients((prev) =>
      prev.includes(ingredientId)
        ? prev.filter((id) => id !== ingredientId)
        : [...prev, ingredientId]
    );
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'text-recipe-easy';
      case 'medium':
        return 'text-recipe-medium';
      case 'hard':
        return 'text-recipe-hard';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Image */}
      <div className="relative h-[40vh] min-h-[300px] w-full lg:h-[50vh]">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />

        {/* Back Button */}
        <Link
          to="/"
          className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-card/90 px-4 py-2 text-sm font-medium backdrop-blur-sm transition-colors hover:bg-card"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>

        {/* Actions */}
        <div className="absolute right-4 top-4 flex gap-2">
          <Button variant="secondary" size="icon" className="rounded-full">
            <Share2 className="h-4 w-4" />
          </Button>
          <Button variant="secondary" size="icon" className="rounded-full">
            <Printer className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8 lg:py-12">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="relative -mt-20 rounded-2xl bg-card p-6 shadow-card lg:-mt-32 lg:p-8">
            {/* Category & Difficulty */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                {recipe.category}
              </span>
              <span
                className={`rounded-full bg-muted px-3 py-1 text-sm font-medium capitalize ${getDifficultyColor(
                  recipe.difficulty
                )}`}
              >
                {recipe.difficulty}
              </span>
            </div>

            {/* Title */}
            <h1 className="mt-4 font-serif text-3xl font-bold text-foreground lg:text-4xl">
              {recipe.title}
            </h1>

            {/* Description */}
            <p className="mt-4 text-lg text-muted-foreground">{recipe.description}</p>

            {/* Meta Info */}
            <div className="mt-6 flex flex-wrap items-center gap-6 border-b border-border pb-6">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-5 w-5" />
                <div>
                  <span className="block text-xs uppercase">Prep Time</span>
                  <span className="font-medium text-foreground">{recipe.prepTime} min</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <ChefHat className="h-5 w-5" />
                <div>
                  <span className="block text-xs uppercase">Cook Time</span>
                  <span className="font-medium text-foreground">{recipe.cookingTime} min</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="h-5 w-5" />
                <div>
                  <span className="block text-xs uppercase">Servings</span>
                  <span className="font-medium text-foreground">{recipe.servings}</span>
                </div>
              </div>
            </div>

            {/* Author & Actions */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={recipe.author.avatar}
                  alt={recipe.author.name}
                  className="h-12 w-12 rounded-full object-cover ring-2 ring-border"
                />
                <div>
                  <p className="font-medium text-foreground">{recipe.author.name}</p>
                  <p className="text-sm text-muted-foreground">Recipe Author</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {/* Rating */}
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-recipe-medium text-recipe-medium" />
                  <span className="font-semibold">{recipe.rating}</span>
                  <span className="text-sm text-muted-foreground">
                    ({recipe.reviewCount})
                  </span>
                </div>

                {/* Like */}
                <Button
                  variant={isLiked ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => {
                    setIsLiked(!isLiked);
                    setLikes(isLiked ? likes - 1 : likes + 1);
                  }}
                  className="gap-2"
                >
                  <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                  {likes}
                </Button>

                {/* Save */}
                <Button
                  variant={isSaved ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setIsSaved(!isSaved)}
                  className="gap-2"
                >
                  <Bookmark className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
                  Save
                </Button>
              </div>
            </div>
          </div>

          {/* Recipe Content */}
          <div className="mt-8 grid gap-8 lg:grid-cols-3">
            {/* Ingredients */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 rounded-2xl bg-card p-6 shadow-card">
                <h2 className="font-serif text-xl font-semibold text-foreground">
                  Ingredients
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  For {recipe.servings} servings
                </p>

                <ul className="mt-6 space-y-3">
                  {recipe.ingredients.map((ingredient) => (
                    <li key={ingredient.id}>
                      <button
                        onClick={() => toggleIngredient(ingredient.id)}
                        className={`flex w-full items-start gap-3 rounded-lg p-2 text-left transition-colors hover:bg-muted ${
                          checkedIngredients.includes(ingredient.id)
                            ? 'text-muted-foreground line-through'
                            : 'text-foreground'
                        }`}
                      >
                        <div
                          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                            checkedIngredients.includes(ingredient.id)
                              ? 'border-primary bg-primary'
                              : 'border-border'
                          }`}
                        >
                          {checkedIngredients.includes(ingredient.id) && (
                            <Check className="h-3 w-3 text-primary-foreground" />
                          )}
                        </div>
                        <span>
                          <span className="font-medium">
                            {ingredient.amount} {ingredient.unit}
                          </span>{' '}
                          {ingredient.name}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Instructions */}
            <div className="lg:col-span-2">
              <h2 className="font-serif text-xl font-semibold text-foreground">
                Instructions
              </h2>

              <ol className="mt-6 space-y-6">
                {recipe.steps.map((step) => (
                  <li key={step.id}>
                    <button
                      onClick={() => toggleStep(step.id)}
                      className={`flex w-full items-start gap-4 rounded-xl bg-card p-4 text-left shadow-card transition-all hover:shadow-card-hover ${
                        checkedSteps.includes(step.id) ? 'opacity-60' : ''
                      }`}
                    >
                      <div
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-semibold transition-colors ${
                          checkedSteps.includes(step.id)
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {checkedSteps.includes(step.id) ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          step.order
                        )}
                      </div>
                      <p
                        className={`flex-1 leading-relaxed ${
                          checkedSteps.includes(step.id)
                            ? 'text-muted-foreground line-through'
                            : 'text-foreground'
                        }`}
                      >
                        {step.instruction}
                      </p>
                    </button>
                  </li>
                ))}
              </ol>

              {/* Comments Section Preview */}
              <div className="mt-12 rounded-2xl bg-card p-6 shadow-card">
                <div className="flex items-center justify-between">
                  <h2 className="font-serif text-xl font-semibold text-foreground">
                    Comments
                  </h2>
                  <Button variant="outline" size="sm" className="gap-2">
                    <MessageCircle className="h-4 w-4" />
                    {recipe.reviewCount} Comments
                  </Button>
                </div>
                <p className="mt-4 text-muted-foreground">
                  Join the conversation! Share your experience with this recipe.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
