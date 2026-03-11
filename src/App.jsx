import { useMemo, useState } from 'react';
import { 
  Header, 
  Hero, 
  FeaturedSneakers, 
  BrandCarousel,
  Reviews, 
  Trending,
  AIRecommendation, 
  ProductDetail, 
  Footer,
  SearchBar,
  CartSidebar,
  AuthModal
} from './components';
import { useAIRecommendation } from './hooks/useAIRecommendation';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { SNEAKERS, REVIEWS } from './data/sneakers';

function AppContent() {
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
  const trending = useMemo(() => SNEAKERS.slice(4, 10), []);

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
        <Header onSelectSneaker={handleSelectSneaker} />

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

          {/* Brand Carousel Section */}
          <BrandCarousel />

          {/* Trending Section */}
          <Trending 
            sneakers={trending} 
            onSelectSneaker={handleSelectSneaker} 
          />

          {/* Customer Reviews Section */}
          <Reviews reviews={REVIEWS} />

          {/* Footer */}
          <Footer />
        </main>
      </div>

      {/* Global Modals & Sidebars */}
      <CartSidebar />
      <AuthModal />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;

