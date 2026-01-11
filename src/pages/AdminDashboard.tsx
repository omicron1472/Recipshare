import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { UserManagement } from "@/components/admin/UserManagement";
import { ReportedRecipes } from "@/components/admin/ReportedRecipes";
import { AdminAnalytics } from "@/components/admin/AdminAnalytics";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  ChefHat, 
  AlertTriangle, 
  TrendingUp,
  Activity,
  ShieldCheck
} from "lucide-react";
import { useState } from "react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-background">
      <Navbar showSearch={false} />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <ShieldCheck className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold font-display">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage users, content, and platform analytics.</p>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatsCard
                title="Total Users"
                value="12.4k"
                icon={Users}
                trend={{ value: 18, isPositive: true }}
              />
              <StatsCard
                title="Total Recipes"
                value="45.2k"
                icon={ChefHat}
                trend={{ value: 12, isPositive: true }}
              />
              <StatsCard
                title="Pending Reports"
                value={23}
                icon={AlertTriangle}
                trend={{ value: 5, isPositive: false }}
              />
              <StatsCard
                title="Active Today"
                value="2.1k"
                icon={Activity}
                trend={{ value: 8, isPositive: true }}
              />
            </div>

            {/* Quick Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ReportedRecipes />
              <UserManagement />
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <StatsCard
                title="Total Users"
                value="12.4k"
                icon={Users}
                trend={{ value: 18, isPositive: true }}
              />
              <StatsCard
                title="New This Month"
                value="1.2k"
                icon={TrendingUp}
                trend={{ value: 24, isPositive: true }}
              />
              <StatsCard
                title="Active Today"
                value="2.1k"
                icon={Activity}
                trend={{ value: 8, isPositive: true }}
              />
            </div>
            <UserManagement />
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <StatsCard
                title="Pending Reports"
                value={23}
                icon={AlertTriangle}
                trend={{ value: 5, isPositive: false }}
              />
              <StatsCard
                title="Resolved Today"
                value={8}
                icon={ShieldCheck}
              />
              <StatsCard
                title="Avg. Resolution Time"
                value="2.4h"
                icon={Activity}
                trend={{ value: 12, isPositive: true }}
              />
            </div>
            <ReportedRecipes />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatsCard
                title="Daily Uploads"
                value={156}
                icon={ChefHat}
                trend={{ value: 22, isPositive: true }}
              />
              <StatsCard
                title="Daily Active Users"
                value="2.1k"
                icon={Users}
                trend={{ value: 15, isPositive: true }}
              />
              <StatsCard
                title="Engagement Rate"
                value="4.8%"
                icon={TrendingUp}
                trend={{ value: 8, isPositive: true }}
              />
              <StatsCard
                title="Growth Rate"
                value="12%"
                icon={Activity}
                trend={{ value: 3, isPositive: true }}
              />
            </div>
            <AdminAnalytics />
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
}
