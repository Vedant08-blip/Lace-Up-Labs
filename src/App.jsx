import { useMemo, useState } from 'react';
import { 
  Header, 
  Hero, 
  FeaturedSneakers, 
  Categories, 
  Reviews, 
  AIRecommendation, 
  ProductDetail, 
  Footer 
} from './components';
import { useAIRecommendation } from './hooks/useAIRecommendation';
import { SNEAKERS, CATEGORIES, REVIEWS } from './data/sneakers';

function App() {
  const [selectedSneaker, setSelectedSneaker] = useState(SNEAKERS[0]);
  
  const {
    budget,
    setBudget,
    style,
    setStyle,
    activity,
    setActivity,
    recommended,
    handleRecommend,
  } = useAIRecommendation();

  const featured = useMemo(() => SNEAKERS.slice(0, 6), []);

  const handleSelectSneaker = (sneaker) => {
    setSelectedSneaker(sneaker);
  };

  const handleAIRecommend = () => {
    const result = handleRecommend();
    if (result) {
      setSelectedSneaker(result);
    }
  };

  return (
    <div className="bg-background text-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4 pb-16">
        {/* Header / Navbar */}
        <Header />

        {/* Vertical Section-Based Layout */}
        <main className="flex flex-col gap-8 pt-4">
          {/* Hero Section */}
          <Hero 
            selectedSneaker={selectedSneaker} 
            onSelectSneaker={handleSelectSneaker} 
          />

          {/* AI Recommendation Section */}
          <AIRecommendation 
            budget={budget}
            setBudget={setBudget}
            style={style}
            setStyle={setStyle}
            activity={activity}
            setActivity={setActivity}
            recommended={recommended}
            onRecommend={handleAIRecommend}
            onSelectSneaker={handleSelectSneaker}
          />

          {/* Product Detail Section */}
          <ProductDetail sneaker={selectedSneaker} />

          {/* Featured Sneakers Section */}
          <FeaturedSneakers 
            sneakers={featured} 
            onSelectSneaker={handleSelectSneaker} 
          />

          {/* Categories / Streetwear Section */}
          <Categories categories={CATEGORIES} />

          {/* Customer Reviews Section */}
          <Reviews reviews={REVIEWS} />

          {/* Footer */}
          <Footer />
        </main>
      </div>
    </div>
  );
}

export default App;


