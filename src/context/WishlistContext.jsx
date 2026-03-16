/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // Load from localStorage on init
  useEffect(() => {
    const saved = localStorage.getItem('wishlist');
    if (saved) {
      setWishlist(JSON.parse(saved));
    }
  }, []);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (sneaker) => {
    setWishlist((prev) => {
      const exists = prev.find((item) => item.id === sneaker.id);
      if (exists) return prev;
      setIsWishlistOpen(true);
      return [...prev, sneaker];
    });
  };

  const removeFromWishlist = (sneakerId) => {
    setWishlist((prev) => prev.filter((item) => item.id !== sneakerId));
  };

  const toggleWishlist = (sneaker) => {
    setWishlist((prev) => {
      const exists = prev.find((item) => item.id === sneaker.id);
      if (exists) {
        removeFromWishlist(sneaker.id);
        return prev.filter((item) => item.id !== sneaker.id);
      } else {
        setIsWishlistOpen(true);
        return [...prev, sneaker];
      }
    });
  };

  const clearWishlist = () => {
    setWishlist([]);
    localStorage.removeItem('wishlist');
  };

  const wishlistCount = wishlist.length;

  const isInWishlist = (sneakerId) => wishlist.some((item) => item.id === sneakerId);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        clearWishlist,
        wishlistCount,
        isWishlistOpen,
        setIsWishlistOpen,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}

