import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { RecentRecipes } from "@/components/dashboard/RecentRecipes";
import { PopularRecipesChart } from "@/components/dashboard/PopularRecipesChart";
import { EngagementChart } from "@/components/dashboard/EngagementChart";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ChefHat, 
  Heart, 
  Bookmark, 
  MessageCircle, 
  Plus,
  TrendingUp,
  Calendar
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-background">
      <Navbar showSearch={false} />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold font-display">Dashboard</h1>
            <p className="text-muted-foreground mt-1">Welcome back! Here's your recipe performance.</p>
          </div>
          <Button asChild>
            <Link to="/new-recipe">
              <Plus className="mr-2 h-4 w-4" />
              New Recipe
            </Link>
          </Button>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatsCard
                title="Total Recipes"
                value={24}
                icon={ChefHat}
                trend={{ value: 12, isPositive: true }}
              />
              <StatsCard
                title="Total Likes"
                value="1.2k"
                icon={Heart}
                trend={{ value: 8, isPositive: true }}
              />
              <StatsCard
                title="Saves"
                value={456}
                icon={Bookmark}
                trend={{ value: 15, isPositive: true }}
              />
              <StatsCard
                title="Comments"
                value={89}
                icon={MessageCircle}
                trend={{ value: 3, isPositive: false }}
              />
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PopularRecipesChart />
              <RecentRecipes />
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            {/* Period Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <StatsCard
                title="This Week's Views"
                value="3.4k"
                icon={TrendingUp}
                trend={{ value: 22, isPositive: true }}
              />
              <StatsCard
                title="This Month's Recipes"
                value={8}
                icon={Calendar}
                trend={{ value: 33, isPositive: true }}
              />
              <StatsCard
                title="Engagement Rate"
                value="4.2%"
                icon={Heart}
                trend={{ value: 5, isPositive: true }}
              />
            </div>

            {/* Engagement Chart */}
            <EngagementChart />
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
}
