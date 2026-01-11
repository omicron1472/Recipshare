import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Clock, Users, Flame } from 'lucide-react';
import { RecipeFormData } from '@/pages/NewRecipe';

interface StepBasicInfoProps {
  formData: RecipeFormData;
  updateFormData: (updates: Partial<RecipeFormData>) => void;
}

const categories = [
  'Breakfast',
  'Lunch',
  'Dinner',
  'Appetizers',
  'Desserts',
  'Snacks',
  'Beverages',
  'Vegetarian',
  'Vegan',
  'Seafood',
];

export function StepBasicInfo({ formData, updateFormData }: StepBasicInfoProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-xl font-semibold text-foreground">
          Basic Information
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Tell us about your recipe
        </p>
      </div>

      {/* Recipe Name */}
      <div className="space-y-2">
        <Label htmlFor="name">Recipe Name *</Label>
        <Input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => updateFormData({ name: e.target.value })}
          placeholder="e.g., Grandma's Famous Apple Pie"
          className="text-lg"
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => updateFormData({ description: e.target.value })}
          placeholder="Share the story behind this dish or what makes it special..."
          className="min-h-[100px] resize-none"
        />
        <p className="text-right text-xs text-muted-foreground">
          {formData.description.length}/300
        </p>
      </div>

      {/* Category & Difficulty Row */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Category *</Label>
          <Select
            value={formData.category}
            onValueChange={(value) => updateFormData({ category: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category.toLowerCase()}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Difficulty Level</Label>
          <div className="flex gap-2">
            {(['easy', 'medium', 'hard'] as const).map((level) => (
              <button
                key={level}
                onClick={() => updateFormData({ difficulty: level })}
                className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg border-2 px-3 py-2.5 text-sm font-medium capitalize transition-all ${
                  formData.difficulty === level
                    ? level === 'easy'
                      ? 'border-recipe-easy bg-recipe-easy/10 text-recipe-easy'
                      : level === 'medium'
                      ? 'border-recipe-medium bg-recipe-medium/10 text-recipe-medium'
                      : 'border-recipe-hard bg-recipe-hard/10 text-recipe-hard'
                    : 'border-border text-muted-foreground hover:border-primary/50'
                }`}
              >
                <Flame className="h-4 w-4" />
                {level}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Time & Servings */}
      <div className="grid gap-6 sm:grid-cols-3">
        <div className="space-y-3">
          <Label className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            Prep Time
          </Label>
          <div className="space-y-2">
            <Slider
              value={[formData.prepTime]}
              onValueChange={([value]) => updateFormData({ prepTime: value })}
              min={5}
              max={120}
              step={5}
            />
            <p className="text-center text-sm font-medium text-foreground">
              {formData.prepTime} minutes
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <Label className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            Cook Time
          </Label>
          <div className="space-y-2">
            <Slider
              value={[formData.cookTime]}
              onValueChange={([value]) => updateFormData({ cookTime: value })}
              min={5}
              max={180}
              step={5}
            />
            <p className="text-center text-sm font-medium text-foreground">
              {formData.cookTime} minutes
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <Label className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            Servings
          </Label>
          <div className="space-y-2">
            <Slider
              value={[formData.servings]}
              onValueChange={([value]) => updateFormData({ servings: value })}
              min={1}
              max={12}
              step={1}
            />
            <p className="text-center text-sm font-medium text-foreground">
              {formData.servings} {formData.servings === 1 ? 'serving' : 'servings'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
