import { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, ChefHat } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/layout/Navbar';
import { StepBasicInfo } from '@/components/recipe-form/StepBasicInfo';
import { StepIngredients } from '@/components/recipe-form/StepIngredients';
import { StepInstructions } from '@/components/recipe-form/StepInstructions';
import { StepPhoto } from '@/components/recipe-form/StepPhoto';
import { StepPreview } from '@/components/recipe-form/StepPreview';

export interface RecipeFormData {
  name: string;
  description: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  prepTime: number;
  cookTime: number;
  servings: number;
  ingredients: { id: string; name: string; amount: string; unit: string }[];
  instructions: { id: string; step: number; text: string }[];
  image: string | null;
}

const steps = [
  { id: 1, name: 'Basics', description: 'Recipe info' },
  { id: 2, name: 'Ingredients', description: 'What you need' },
  { id: 3, name: 'Instructions', description: 'How to make it' },
  { id: 4, name: 'Photo', description: 'Add an image' },
  { id: 5, name: 'Preview', description: 'Review & submit' },
];

export default function NewRecipe() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<RecipeFormData>({
    name: '',
    description: '',
    category: '',
    difficulty: 'medium',
    prepTime: 15,
    cookTime: 30,
    servings: 4,
    ingredients: [{ id: '1', name: '', amount: '', unit: 'cups' }],
    instructions: [{ id: '1', step: 1, text: '' }],
    image: null,
  });

  const updateFormData = (updates: Partial<RecipeFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Submitting recipe:', formData);
    // TODO: Submit to backend
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <StepBasicInfo formData={formData} updateFormData={updateFormData} />;
      case 2:
        return <StepIngredients formData={formData} updateFormData={updateFormData} />;
      case 3:
        return <StepInstructions formData={formData} updateFormData={updateFormData} />;
      case 4:
        return <StepPhoto formData={formData} updateFormData={updateFormData} />;
      case 5:
        return <StepPreview formData={formData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-3xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
              <ChefHat className="h-8 w-8 text-primary" />
            </div>
            <h1 className="font-serif text-3xl font-bold text-foreground">
              Share Your Recipe
            </h1>
            <p className="mt-2 text-muted-foreground">
              Let the world taste your culinary creation
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex flex-1 items-center">
                  {/* Step Circle */}
                  <div className="flex flex-col items-center">
                    <button
                      onClick={() => step.id < currentStep && setCurrentStep(step.id)}
                      disabled={step.id > currentStep}
                      className={`flex h-10 w-10 items-center justify-center rounded-full border-2 font-semibold transition-all ${
                        step.id < currentStep
                          ? 'border-primary bg-primary text-primary-foreground'
                          : step.id === currentStep
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border bg-muted text-muted-foreground'
                      }`}
                    >
                      {step.id < currentStep ? (
                        <Check className="h-5 w-5" />
                      ) : (
                        step.id
                      )}
                    </button>
                    <div className="mt-2 hidden text-center sm:block">
                      <p
                        className={`text-sm font-medium ${
                          step.id <= currentStep ? 'text-foreground' : 'text-muted-foreground'
                        }`}
                      >
                        {step.name}
                      </p>
                      <p className="text-xs text-muted-foreground">{step.description}</p>
                    </div>
                  </div>

                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <div
                      className={`mx-2 h-0.5 flex-1 transition-colors ${
                        step.id < currentStep ? 'bg-primary' : 'bg-border'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Mobile Step Name */}
            <div className="mt-4 text-center sm:hidden">
              <p className="font-medium text-foreground">
                Step {currentStep}: {steps[currentStep - 1].name}
              </p>
              <p className="text-sm text-muted-foreground">
                {steps[currentStep - 1].description}
              </p>
            </div>
          </div>

          {/* Form Content */}
          <div className="rounded-2xl bg-card p-6 shadow-card lg:p-8">
            {renderStep()}
          </div>

          {/* Navigation Buttons */}
          <div className="mt-6 flex items-center justify-between">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Previous
            </Button>

            <span className="text-sm text-muted-foreground">
              Step {currentStep} of {steps.length}
            </span>

            {currentStep < steps.length ? (
              <Button onClick={nextStep} className="gap-2">
                Next
                <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} className="gap-2">
                <Check className="h-4 w-4" />
                Publish Recipe
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
