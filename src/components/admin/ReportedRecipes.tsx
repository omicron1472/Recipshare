import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Check, X, Eye } from "lucide-react";

const reportedRecipes = [
  {
    id: 1,
    title: "Spicy Thai Curry",
    author: "John Doe",
    image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=100&h=100&fit=crop",
    reason: "Inappropriate content",
    reports: 5,
    severity: "high"
  },
  {
    id: 2,
    title: "Classic Burger",
    author: "Jane Smith",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=100&h=100&fit=crop",
    reason: "Copyright violation",
    reports: 3,
    severity: "medium"
  },
  {
    id: 3,
    title: "Vegan Smoothie",
    author: "Alex Brown",
    image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=100&h=100&fit=crop",
    reason: "Misleading information",
    reports: 2,
    severity: "low"
  },
];

export function ReportedRecipes() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-amber-500" />
          Reported Recipes
        </CardTitle>
        <Badge variant="destructive">{reportedRecipes.length} Pending</Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {reportedRecipes.map((recipe) => (
            <div
              key={recipe.id}
              className="flex items-center justify-between p-4 rounded-lg border bg-card"
            >
              <div className="flex items-center gap-4">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div>
                  <h4 className="font-medium">{recipe.title}</h4>
                  <p className="text-sm text-muted-foreground">by {recipe.author}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant={
                      recipe.severity === "high" ? "destructive" :
                      recipe.severity === "medium" ? "secondary" : "outline"
                    }>
                      {recipe.severity}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {recipe.reports} reports • {recipe.reason}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" title="View Details">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-green-600 hover:text-green-700 hover:bg-green-50" title="Approve">
                  <Check className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive hover:bg-destructive/10" title="Remove">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
