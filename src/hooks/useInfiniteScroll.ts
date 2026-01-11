import { useState, useEffect, useCallback, useRef } from 'react';
import { Recipe } from '@/types/recipe';
import { recipes as mockRecipes } from '@/data/mockData';

export function useInfiniteScroll(initialPageSize = 6) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);

  // Simulate fetching more recipes
  const fetchRecipes = useCallback(async (pageNum: number) => {
    setLoading(true);
    
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    // Generate more recipes by cycling through mock data
    const startIndex = (pageNum - 1) * initialPageSize;
    const newRecipes = Array.from({ length: initialPageSize }, (_, i) => {
      const originalRecipe = mockRecipes[(startIndex + i) % mockRecipes.length];
      return {
        ...originalRecipe,
        id: `${originalRecipe.id}-page${pageNum}-${i}`,
        likes: originalRecipe.likes + Math.floor(Math.random() * 100),
        rating: Number((4 + Math.random()).toFixed(1)),
      };
    });

    setRecipes((prev) => [...prev, ...newRecipes]);
    setHasMore(pageNum < 5); // Limit to 5 pages for demo
    setLoading(false);
  }, [initialPageSize]);

  // Initial load
  useEffect(() => {
    fetchRecipes(1);
  }, [fetchRecipes]);

  // Intersection observer for infinite scroll
  const lastRecipeRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      
      if (observer.current) observer.current.disconnect();
      
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });
      
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  // Fetch more when page changes
  useEffect(() => {
    if (page > 1) {
      fetchRecipes(page);
    }
  }, [page, fetchRecipes]);

  return { recipes, loading, hasMore, lastRecipeRef };
}
