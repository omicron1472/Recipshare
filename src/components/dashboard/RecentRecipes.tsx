import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Eye, Heart } from "lucide-react";

const recentRecipes = [
  {
    id: 1,
    title: "Creamy Tuscan Pasta",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=100&h=100&fit=crop",
    views: 234,
    likes: 45,
    timeAgo: "2 hours ago",
    status: "published"
  },
  {
    id: 2,
    title: "Lemon Herb Chicken",
    image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=100&h=100&fit=crop",
    views: 189,
    likes: 32,
    timeAgo: "5 hours ago",
    status: "published"
  },
  {
    id: 3,
    title: "Chocolate Lava Cake",
    image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=100&h=100&fit=crop",
    views: 156,
    likes: 28,
    timeAgo: "1 day ago",
    status: "draft"
  },
  {
    id: 4,
    title: "Mediterranean Salad",
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=100&h=100&fit=crop",
    views: 98,
    likes: 15,
    timeAgo: "2 days ago",
    status: "published"
  },
];

export function RecentRecipes() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Recently Uploaded</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentRecipes.map((recipe) => (
          <div
            key={recipe.id}
            className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
          >
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-14 h-14 rounded-lg object-cover"
            />
            <div className="flex-1 min-w-0">
              <h4 className="font-medium truncate">{recipe.title}</h4>
              <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                <span className="flex items-center gap-1">
                  <Eye className="h-3.5 w-3.5" />
                  {recipe.views}
                </span>
                <span className="flex items-center gap-1">
                  <Heart className="h-3.5 w-3.5" />
                  {recipe.likes}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {recipe.timeAgo}
                </span>
              </div>
            </div>
            <Badge variant={recipe.status === "published" ? "default" : "secondary"}>
              {recipe.status}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
