import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

interface SuggestionChipsProps {
  onSelect: (suggestion: string) => void;
}

const suggestions = [
  "Suggest recipes with potatoes",
  "Healthy breakfast ideas",
  "Quick 15-minute dinners",
  "Vegan dessert options",
  "Substitute for eggs",
  "Meal prep for the week",
];

export function SuggestionChips({ onSelect }: SuggestionChipsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {suggestions.map((suggestion) => (
        <Button
          key={suggestion}
          variant="outline"
          size="sm"
          className="h-auto py-1.5 px-3 text-xs rounded-full hover:bg-primary/10 hover:text-primary hover:border-primary/30"
          onClick={() => onSelect(suggestion)}
        >
          <Sparkles className="h-3 w-3 mr-1.5" />
          {suggestion}
        </Button>
      ))}
    </div>
  );
}
