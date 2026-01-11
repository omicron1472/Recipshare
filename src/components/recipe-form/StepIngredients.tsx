import { Plus, Trash2, GripVertical } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RecipeFormData } from '@/pages/NewRecipe';

interface StepIngredientsProps {
  formData: RecipeFormData;
  updateFormData: (updates: Partial<RecipeFormData>) => void;
}

const units = [
  'cups',
  'tbsp',
  'tsp',
  'oz',
  'lbs',
  'g',
  'kg',
  'ml',
  'L',
  'pieces',
  'cloves',
  'slices',
  'pinch',
  'to taste',
];

export function StepIngredients({ formData, updateFormData }: StepIngredientsProps) {
  const addIngredient = () => {
    const newIngredient = {
      id: Date.now().toString(),
      name: '',
      amount: '',
      unit: 'cups',
    };
    updateFormData({ ingredients: [...formData.ingredients, newIngredient] });
  };

  const removeIngredient = (id: string) => {
    if (formData.ingredients.length > 1) {
      updateFormData({
        ingredients: formData.ingredients.filter((ing) => ing.id !== id),
      });
    }
  };

  const updateIngredient = (
    id: string,
    field: 'name' | 'amount' | 'unit',
    value: string
  ) => {
    updateFormData({
      ingredients: formData.ingredients.map((ing) =>
        ing.id === id ? { ...ing, [field]: value } : ing
      ),
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-xl font-semibold text-foreground">
          Ingredients
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          List all the ingredients needed for this recipe
        </p>
      </div>

      {/* Ingredients List */}
      <div className="space-y-3">
        {formData.ingredients.map((ingredient, index) => (
          <div
            key={ingredient.id}
            className="group flex items-center gap-2 rounded-xl bg-muted/50 p-3 transition-colors hover:bg-muted"
          >
            {/* Drag Handle */}
            <div className="cursor-grab text-muted-foreground/50 hover:text-muted-foreground">
              <GripVertical className="h-5 w-5" />
            </div>

            {/* Number */}
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
              {index + 1}
            </span>

            {/* Amount */}
            <Input
              type="text"
              value={ingredient.amount}
              onChange={(e) => updateIngredient(ingredient.id, 'amount', e.target.value)}
              placeholder="2"
              className="w-20 shrink-0 bg-card text-center"
            />

            {/* Unit */}
            <Select
              value={ingredient.unit}
              onValueChange={(value) => updateIngredient(ingredient.id, 'unit', value)}
            >
              <SelectTrigger className="w-24 shrink-0 bg-card">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {units.map((unit) => (
                  <SelectItem key={unit} value={unit}>
                    {unit}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Ingredient Name */}
            <Input
              type="text"
              value={ingredient.name}
              onChange={(e) => updateIngredient(ingredient.id, 'name', e.target.value)}
              placeholder="e.g., all-purpose flour"
              className="flex-1 bg-card"
            />

            {/* Delete Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeIngredient(ingredient.id)}
              disabled={formData.ingredients.length === 1}
              className="shrink-0 text-muted-foreground opacity-0 transition-opacity hover:text-destructive group-hover:opacity-100"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      {/* Add Button */}
      <Button
        variant="outline"
        onClick={addIngredient}
        className="w-full gap-2 border-dashed"
      >
        <Plus className="h-4 w-4" />
        Add Ingredient
      </Button>

      {/* Tips */}
      <div className="rounded-xl bg-secondary/50 p-4">
        <h3 className="font-medium text-secondary-foreground">💡 Tips</h3>
        <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
          <li>• Be specific with measurements for best results</li>
          <li>• List ingredients in the order they'll be used</li>
          <li>• Include preparation notes (e.g., "diced", "minced")</li>
        </ul>
      </div>
    </div>
  );
}
