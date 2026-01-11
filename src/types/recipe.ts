export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  cookingTime: number; // in minutes
  prepTime: number;
  servings: number;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  ingredients: Ingredient[];
  steps: Step[];
  likes: number;
  rating: number;
  reviewCount: number;
  createdAt: string;
  isSaved?: boolean;
  isLiked?: boolean;
}

export interface Ingredient {
  id: string;
  name: string;
  amount: string;
  unit: string;
}

export interface Step {
  id: string;
  order: number;
  instruction: string;
  image?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  recipesCount: number;
  followersCount: number;
  followingCount: number;
}
