import { useMemo, useState } from 'react';
import { 
  Header, 
  Hero, 
  FeaturedSneakers, 
  Categories, 
  Reviews, 
  Trending, 
  AIRecommendation, 
  ProductDetail, 
  Newsletter, 
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
  const trending = useMemo(() => SNEAKERS, []);

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
        {/* Top nav */}
        <Header />

        {/* Layout */}
        <main className="grid lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] gap-10 lg:gap-14 pt-4">
          {/* Left column */}
          <section className="space-y-10">
            {/* Hero */}
            <Hero 
              selectedSneaker={selectedSneaker} 
              onSelectSneaker={handleSelectSneaker} 
            />

            {/* Featured sneakers */}
            <FeaturedSneakers 
              sneakers={featured} 
              onSelectSneaker={handleSelectSneaker} 
            />

            {/* Categories */}
            <Categories categories={CATEGORIES} />

            {/* Reviews */}
            <Reviews reviews={REVIEWS} />
          </section>

          {/* Right column */}
          <section className="space-y-8">
            {/* Trending carousel */}
            <Trending 
              sneakers={trending} 
              onSelectSneaker={handleSelectSneaker} 
            />

            {/* AI Recommendation */}
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

            {/* Product detail preview */}
            <ProductDetail sneaker={selectedSneaker} />

            {/* Newsletter */}
            <Newsletter />

            {/* Footer */}
            <Footer />
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;


