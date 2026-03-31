import { useMemo, useState, useRef, useCallback, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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
  AuthModal,
  WishlistSidebar,
  ToastContainer
} from './components';
import { useAIRecommendation } from './hooks/useAIRecommendation';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { WishlistProvider } from './context/WishlistContext';
import { SNEAKERS, REVIEWS } from './data/sneakers';

function AppContent() {
  const [selectedSneaker, setSelectedSneaker] = useState(SNEAKERS[0]);
  const [requireSizeSelection, setRequireSizeSelection] = useState(false);
  const appRef = useRef(null);
  const sectionPerfStyle = { contentVisibility: 'auto', containIntrinsicSize: '800px' };
  
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

  const featured = useMemo(() => SNEAKERS.slice(0, 10), []);
  const trending = useMemo(() => SNEAKERS.slice(6, 16), []);

  const handleSelectSneaker = (sneaker) => {
    setSelectedSneaker(sneaker);
    setRequireSizeSelection(false);
  };

  const handleAIRecommend = () => {
    const result = handleRecommend();
    if (result && result.length > 0) {
      setSelectedSneaker(result[0]);
    }
  };

  const heroRef = useRef(null);
  const featuredRef = useRef(null);
  const trendingRef = useRef(null);

  const scrollToFeatured = useCallback(() => {
    featuredRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const scrollToTrending = useCallback(() => {
    trendingRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const scrollToProductDetail = useCallback(() => {
    setTimeout(() => {
      document
        .getElementById('product-detail')
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 0);
  }, []);

  const handleAddToCartFlow = useCallback(
    (sneaker) => {
      setSelectedSneaker(sneaker);
      setRequireSizeSelection(true);
      scrollToProductDetail();
    },
    [scrollToProductDetail]
  );

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray('[data-gsap="reveal"]');
      sections.forEach((section) => {
        gsap.fromTo(
          section,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              once: true,
            },
          }
        );
      });
    }, appRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={appRef} className="bg-background text-white min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24 lg:pb-32">
        {/* Header / Navbar */}
        <Header onSelectSneaker={handleSelectSneaker} />

        {/* Vertical Section-Based Layout */}
        <main className="flex flex-col gap-6 sm:gap-8 pt-4">
          {/* Hero Section */}
          <section ref={heroRef}>
            <Hero 
              selectedSneaker={selectedSneaker} 
              onShopNow={scrollToFeatured}
              onExplore={scrollToTrending}
            />
          </section>

          {/* AI Recommendation Section */}
          <div data-gsap="reveal" style={sectionPerfStyle}>
            <AIRecommendation 
              budget={budget}
              setBudget={setBudget}
              style={style}
              setStyle={setStyle}
              activity={activity}
              setActivity={setActivity}
              recommended={recommended}
              onRecommend={handleAIRecommend}
              onAddToCart={handleAddToCartFlow}
            />
          </div>

          {/* Product Detail Section */}
          <div data-gsap="reveal" style={sectionPerfStyle}>
            <ProductDetail
              key={selectedSneaker.id}
              sneaker={selectedSneaker}
              requireSizeSelection={requireSizeSelection}
              onRequireSizeSelectionChange={setRequireSizeSelection}
            />
          </div>

          {/* Featured Sneakers Section */}
          <section ref={featuredRef}>
            <div data-gsap="reveal" style={sectionPerfStyle}>
              <FeaturedSneakers 
                sneakers={featured} 
                onSelectSneaker={handleSelectSneaker}
                onViewAll={scrollToTrending}
                onAddToCart={handleAddToCartFlow}
              />
            </div>
          </section>

          {/* Brand Carousel Section */}
          <div data-gsap="reveal" style={sectionPerfStyle}>
            <BrandCarousel />
          </div>

          {/* Trending Section */}
          <section ref={trendingRef}>
            <div data-gsap="reveal" style={sectionPerfStyle}>
              <Trending 
                sneakers={trending} 
                onSelectSneaker={handleSelectSneaker} 
                onAddToCart={handleAddToCartFlow}
              />
            </div>
          </section>

          {/* Customer Reviews Section */}
          <div data-gsap="reveal" style={sectionPerfStyle}>
            <Reviews reviews={REVIEWS} />
          </div>

          {/* Footer */}
          <div>
            <Footer />
          </div>
        </main>
      </div>

      {/* Global Modals & Sidebars */}
      <CartSidebar />
      <WishlistSidebar />
      <AuthModal />
      <ToastContainer />
    </div>
  );
}

function App() {
  return (
    <WishlistProvider>
      <AuthProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </AuthProvider>
    </WishlistProvider>
  );
}

export default App;

 {/* App.jsx Alingment  */}
