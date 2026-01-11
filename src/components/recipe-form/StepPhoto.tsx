import { useState, useCallback } from 'react';
import { Upload, X, Image as ImageIcon, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RecipeFormData } from '@/pages/NewRecipe';

interface StepPhotoProps {
  formData: RecipeFormData;
  updateFormData: (updates: Partial<RecipeFormData>) => void;
}

export function StepPhoto({ formData, updateFormData }: StepPhotoProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          updateFormData({ image: event.target?.result as string });
        };
        reader.readAsDataURL(file);
      }
    },
    [updateFormData]
  );

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        updateFormData({ image: event.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    updateFormData({ image: null });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-xl font-semibold text-foreground">
          Recipe Photo
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          A beautiful photo makes your recipe stand out
        </p>
      </div>

      {formData.image ? (
        /* Image Preview */
        <div className="relative overflow-hidden rounded-2xl">
          <img
            src={formData.image}
            alt="Recipe preview"
            className="aspect-video w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
          
          {/* Remove Button */}
          <button
            onClick={removeImage}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-card/90 text-foreground shadow-lg backdrop-blur-sm transition-transform hover:scale-105"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Replace Button */}
          <div className="absolute bottom-4 left-4 right-4 flex gap-2">
            <label className="flex-1">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              <Button variant="secondary" className="w-full gap-2" asChild>
                <span>
                  <Camera className="h-4 w-4" />
                  Replace Photo
                </span>
              </Button>
            </label>
          </div>
        </div>
      ) : (
        /* Upload Zone */
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative flex min-h-[300px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed transition-all ${
            isDragging
              ? 'border-primary bg-primary/5'
              : 'border-border bg-muted/30 hover:border-primary/50 hover:bg-muted/50'
          }`}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="absolute inset-0 cursor-pointer opacity-0"
          />

          <div
            className={`mb-4 flex h-16 w-16 items-center justify-center rounded-2xl transition-colors ${
              isDragging ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
            }`}
          >
            {isDragging ? (
              <Upload className="h-8 w-8" />
            ) : (
              <ImageIcon className="h-8 w-8" />
            )}
          </div>

          <p className="text-lg font-medium text-foreground">
            {isDragging ? 'Drop your image here' : 'Drag & drop your photo'}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            or click to browse from your device
          </p>

          <div className="mt-6 flex items-center gap-4 text-xs text-muted-foreground">
            <span className="rounded-full bg-muted px-3 py-1">JPG, PNG, WebP</span>
            <span className="rounded-full bg-muted px-3 py-1">Max 10MB</span>
            <span className="rounded-full bg-muted px-3 py-1">16:9 recommended</span>
          </div>
        </div>
      )}

      {/* Photo Tips */}
      <div className="rounded-xl bg-secondary/50 p-4">
        <h3 className="font-medium text-secondary-foreground">📸 Photo Tips</h3>
        <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
          <li>• Use natural lighting for the best results</li>
          <li>• Show the finished dish from an appetizing angle</li>
          <li>• Include props or garnishes to add visual interest</li>
          <li>• Make sure the image is sharp and well-focused</li>
        </ul>
      </div>
    </div>
  );
}
