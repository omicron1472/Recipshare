import { Navbar } from '@/components/layout/Navbar';
import { QuickFilters } from '@/components/home/QuickFilters';
import { PersonalizedRecommendations } from '@/components/home/PersonalizedRecommendations';
import { RecipeFeed } from '@/components/home/RecipeFeed';
import { Footer } from '@/components/layout/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar showSearch />
      <QuickFilters />
      <PersonalizedRecommendations />
      <RecipeFeed />
      <Footer />
    </div>
  );
};

export default Index;
