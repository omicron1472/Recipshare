import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Camera,
  Edit3,
  Plus,
  MapPin,
  Calendar,
  Link as LinkIcon,
  Users,
  BookOpen,
  Heart,
  Settings,
  Share2,
  Grid3X3,
  Bookmark,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { RecipeCardCompact } from '@/components/recipe/RecipeCardCompact';
import { recipes } from '@/data/mockData';
import { EditProfileModal } from '@/components/profile/EditProfileModal';

export default function Profile() {
  const [activeTab, setActiveTab] = useState<'recipes' | 'saved'>('recipes');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const user = {
    id: '1',
    name: 'Sarah Chen',
    username: '@sarahcooks',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&auto=format&fit=crop&q=80',
    bio: 'Home cook & food photographer 📸 Sharing my culinary adventures from my tiny NYC kitchen. Specializing in Asian fusion & comfort food.',
    location: 'New York, NY',
    website: 'sarahcooks.com',
    joinedDate: 'January 2023',
    recipesCount: 45,
    followersCount: 12400,
    followingCount: 892,
    savedCount: 156,
  };

  const userRecipes = recipes.filter((r) => r.author.id === '1' || r.author.name === 'Sarah Chen');
  const allRecipes = [...userRecipes, ...recipes.slice(0, 4)];

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar showSearch />

      {/* Cover Image */}
      <div className="relative h-48 w-full bg-gradient-to-br from-primary/20 to-secondary/40 sm:h-64 lg:h-80">
        <img
          src={user.coverImage}
          alt="Cover"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      <main className="container mx-auto px-4">
        {/* Profile Header */}
        <div className="relative -mt-16 pb-6 sm:-mt-20 lg:-mt-24">
          <div className="flex flex-col items-center sm:flex-row sm:items-end sm:gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="h-32 w-32 overflow-hidden rounded-full border-4 border-background bg-background shadow-card sm:h-36 sm:w-36 lg:h-44 lg:w-44">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <button className="absolute bottom-2 right-2 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-button transition-transform hover:scale-105">
                <Camera className="h-4 w-4" />
              </button>
            </div>

            {/* Name & Actions */}
            <div className="mt-4 flex flex-1 flex-col items-center gap-4 sm:mt-0 sm:flex-row sm:items-start sm:justify-between">
              <div className="text-center sm:text-left">
                <h1 className="font-serif text-2xl font-bold text-foreground lg:text-3xl">
                  {user.name}
                </h1>
                <p className="text-muted-foreground">{user.username}</p>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditModalOpen(true)}
                  className="gap-2"
                >
                  <Edit3 className="h-4 w-4" />
                  Edit Profile
                </Button>
                <Link to="/new-recipe">
                  <Button size="sm" className="gap-2">
                    <Plus className="h-4 w-4" />
                    New Recipe
                  </Button>
                </Link>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Bio & Info */}
          <div className="mt-6 max-w-2xl">
            <p className="text-foreground">{user.bio}</p>

            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
              {user.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{user.location}</span>
                </div>
              )}
              {user.website && (
                <a
                  href={`https://${user.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-primary hover:underline"
                >
                  <LinkIcon className="h-4 w-4" />
                  <span>{user.website}</span>
                </a>
              )}
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>Joined {user.joinedDate}</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-6 flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <span className="font-semibold text-foreground">{user.recipesCount}</span>
              <span className="text-muted-foreground">Recipes</span>
            </div>
            <button className="flex items-center gap-2 transition-colors hover:text-primary">
              <Users className="h-5 w-5 text-primary" />
              <span className="font-semibold text-foreground">{formatNumber(user.followersCount)}</span>
              <span className="text-muted-foreground">Followers</span>
            </button>
            <button className="flex items-center gap-2 transition-colors hover:text-primary">
              <span className="font-semibold text-foreground">{formatNumber(user.followingCount)}</span>
              <span className="text-muted-foreground">Following</span>
            </button>
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-accent" />
              <span className="font-semibold text-foreground">{user.savedCount}</span>
              <span className="text-muted-foreground">Saved</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-border">
          <div className="flex gap-1">
            <button
              onClick={() => setActiveTab('recipes')}
              className={`flex items-center gap-2 border-b-2 px-4 py-3 font-medium transition-colors ${
                activeTab === 'recipes'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <Grid3X3 className="h-4 w-4" />
              My Recipes
            </button>
            <button
              onClick={() => setActiveTab('saved')}
              className={`flex items-center gap-2 border-b-2 px-4 py-3 font-medium transition-colors ${
                activeTab === 'saved'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <Bookmark className="h-4 w-4" />
              Saved
            </button>
          </div>
        </div>

        {/* Recipe Grid */}
        <div className="py-8">
          {activeTab === 'recipes' ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {allRecipes.map((recipe, index) => (
                <div
                  key={`${recipe.id}-${index}`}
                  className="animate-fade-up opacity-0"
                  style={{
                    animationDelay: `${index * 0.05}s`,
                    animationFillMode: 'forwards',
                  }}
                >
                  <RecipeCardCompact recipe={recipe} />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {recipes
                .filter((r) => r.isSaved)
                .concat(recipes.slice(0, 3))
                .map((recipe, index) => (
                  <div
                    key={`saved-${recipe.id}-${index}`}
                    className="animate-fade-up opacity-0"
                    style={{
                      animationDelay: `${index * 0.05}s`,
                      animationFillMode: 'forwards',
                    }}
                  >
                    <RecipeCardCompact recipe={recipe} />
                  </div>
                ))}
            </div>
          )}
        </div>
      </main>

      <Footer />

      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        user={user}
      />
    </div>
  );
}
