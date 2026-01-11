import { Plus, Trash2, GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { RecipeFormData } from '@/pages/NewRecipe';

interface StepInstructionsProps {
  formData: RecipeFormData;
  updateFormData: (updates: Partial<RecipeFormData>) => void;
}

export function StepInstructions({ formData, updateFormData }: StepInstructionsProps) {
  const addInstruction = () => {
    const newInstruction = {
      id: Date.now().toString(),
      step: formData.instructions.length + 1,
      text: '',
    };
    updateFormData({ instructions: [...formData.instructions, newInstruction] });
  };

  const removeInstruction = (id: string) => {
    if (formData.instructions.length > 1) {
      const filtered = formData.instructions.filter((inst) => inst.id !== id);
      // Renumber steps
      const renumbered = filtered.map((inst, index) => ({
        ...inst,
        step: index + 1,
      }));
      updateFormData({ instructions: renumbered });
    }
  };

  const updateInstruction = (id: string, text: string) => {
    updateFormData({
      instructions: formData.instructions.map((inst) =>
        inst.id === id ? { ...inst, text } : inst
      ),
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-xl font-semibold text-foreground">
          Instructions
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Walk us through how to make this recipe step by step
        </p>
      </div>

      {/* Instructions List */}
      <div className="space-y-4">
        {formData.instructions.map((instruction) => (
          <div
            key={instruction.id}
            className="group relative rounded-xl bg-muted/50 p-4 transition-colors hover:bg-muted"
          >
            <div className="flex items-start gap-3">
              {/* Drag Handle */}
              <div className="mt-3 cursor-grab text-muted-foreground/50 hover:text-muted-foreground">
                <GripVertical className="h-5 w-5" />
              </div>

              {/* Step Number */}
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground">
                {instruction.step}
              </div>

              {/* Instruction Text */}
              <div className="flex-1">
                <Textarea
                  value={instruction.text}
                  onChange={(e) => updateInstruction(instruction.id, e.target.value)}
                  placeholder={`Describe step ${instruction.step}... (e.g., "Preheat the oven to 350°F (175°C)")`}
                  className="min-h-[80px] resize-none border-0 bg-card p-3 shadow-sm"
                />
              </div>

              {/* Delete Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeInstruction(instruction.id)}
                disabled={formData.instructions.length === 1}
                className="shrink-0 text-muted-foreground opacity-0 transition-opacity hover:text-destructive group-hover:opacity-100"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Button */}
      <Button
        variant="outline"
        onClick={addInstruction}
        className="w-full gap-2 border-dashed"
      >
        <Plus className="h-4 w-4" />
        Add Step
      </Button>

      {/* Tips */}
      <div className="rounded-xl bg-secondary/50 p-4">
        <h3 className="font-medium text-secondary-foreground">💡 Tips</h3>
        <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
          <li>• Start each step with an action verb (e.g., "Mix", "Chop", "Bake")</li>
          <li>• Include timing and temperatures when relevant</li>
          <li>• Break complex steps into smaller, manageable parts</li>
          <li>• Add visual cues (e.g., "until golden brown")</li>
        </ul>
      </div>
    </div>
  );
}
