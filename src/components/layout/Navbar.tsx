import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Menu, X, ChefHat, Heart, SlidersHorizontal, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AuthModal } from '@/components/auth/AuthModal';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface NavbarProps {
  showSearch?: boolean;
}

export function Navbar({ showSearch = false }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [authModal, setAuthModal] = useState<'login' | 'signup' | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn] = useState(false); // Mock auth state

  const mockUser = {
    name: 'Alex Johnson',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    email: 'alex@example.com',
  };

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-border/50 bg-background/95 backdrop-blur-md">
        <div className="container mx-auto">
          <div className="flex h-16 items-center gap-4 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex shrink-0 items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                <ChefHat className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="hidden font-serif text-xl font-semibold text-foreground sm:block">
                Tastify
              </span>
            </Link>

            {/* Search Bar - Desktop */}
            {showSearch && (
              <div className="hidden flex-1 items-center gap-2 lg:flex lg:max-w-xl">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search recipes, ingredients..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-11 rounded-xl border-border bg-muted/50 pl-10 pr-4 transition-all focus:bg-card focus:shadow-card"
                  />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" className="h-11 w-11 shrink-0 rounded-xl">
                      <SlidersHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem>All Categories</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>🥞 Breakfast</DropdownMenuItem>
                    <DropdownMenuItem>🥗 Lunch</DropdownMenuItem>
                    <DropdownMenuItem>🍝 Dinner</DropdownMenuItem>
                    <DropdownMenuItem>🍰 Desserts</DropdownMenuItem>
                    <DropdownMenuItem>🥬 Vegetarian</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>⚡ Quick & Easy</DropdownMenuItem>
                    <DropdownMenuItem>🔥 Trending</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}

            {/* Desktop Navigation */}
            <div className="hidden items-center gap-6 lg:flex lg:ml-auto">
              <Link to="/" className="nav-link font-medium">
                Home
              </Link>
              <Link to="/recipes" className="nav-link font-medium">
                Recipes
              </Link>
              <Link to="/categories" className="nav-link font-medium">
                Categories
              </Link>
            </div>

            {/* Actions */}
            <div className="ml-auto flex items-center gap-2 lg:ml-4">
              {/* Mobile Search */}
              {showSearch && (
                <Button variant="ghost" size="icon" className="text-muted-foreground lg:hidden">
                  <Search className="h-5 w-5" />
                </Button>
              )}

              {isLoggedIn ? (
                <>
                  <Button variant="ghost" size="icon" className="relative text-muted-foreground">
                    <Bell className="h-5 w-5" />
                    <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-accent" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-muted-foreground">
                    <Heart className="h-5 w-5" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="ml-2 flex items-center gap-2 rounded-full p-0.5 transition-colors hover:bg-muted">
                        <img
                          src={mockUser.avatar}
                          alt={mockUser.name}
                          className="h-9 w-9 rounded-full object-cover ring-2 ring-border"
                        />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <div className="px-3 py-2">
                        <p className="font-medium text-foreground">{mockUser.name}</p>
                        <p className="text-sm text-muted-foreground">{mockUser.email}</p>
                      </div>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>My Profile</DropdownMenuItem>
                      <DropdownMenuItem>My Recipes</DropdownMenuItem>
                      <DropdownMenuItem>Saved Recipes</DropdownMenuItem>
                      <DropdownMenuItem>Settings</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">Log out</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    onClick={() => setAuthModal('login')}
                    className="hidden font-medium sm:flex"
                  >
                    Log in
                  </Button>
                  <Button onClick={() => setAuthModal('signup')} className="font-medium">
                    Get Started
                  </Button>
                </>
              )}

              {/* Mobile Menu Button */}
              <button
                className="rounded-lg p-2 hover:bg-muted lg:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="animate-fade-up border-t border-border py-4 lg:hidden">
              {/* Mobile Search */}
              {showSearch && (
                <div className="mb-4 px-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Search recipes..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="h-11 rounded-xl bg-muted/50 pl-10"
                    />
                  </div>
                </div>
              )}
              <div className="flex flex-col gap-2">
                <Link
                  to="/"
                  className="px-4 py-2 font-medium text-foreground hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/recipes"
                  className="px-4 py-2 font-medium text-foreground hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Recipes
                </Link>
                <Link
                  to="/categories"
                  className="px-4 py-2 font-medium text-foreground hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Categories
                </Link>
                {!isLoggedIn && (
                  <div className="mt-4 flex flex-col gap-2 px-4">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setAuthModal('login');
                        setIsMenuOpen(false);
                      }}
                      className="w-full"
                    >
                      Log in
                    </Button>
                    <Button
                      onClick={() => {
                        setAuthModal('signup');
                        setIsMenuOpen(false);
                      }}
                      className="w-full"
                    >
                      Get Started
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      <AuthModal
        isOpen={authModal !== null}
        onClose={() => setAuthModal(null)}
        mode={authModal || 'login'}
        onModeChange={setAuthModal}
      />
    </>
  );
}
