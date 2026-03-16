import { motion, AnimatePresence } from 'framer-motion';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

export function WishlistSidebar() {
  const { wishlist, removeFromWishlist, clearWishlist, isWishlistOpen, setIsWishlistOpen } = useWishlist();
  const { addToCart } = useCart();

  const moveToCart = (sneaker) => {
    // Trigger size selection flow like other components
    window.selectedSneaker = sneaker; // Temp global for ProductDetail
    window.requireSizeSelection = true;
    document.getElementById('product-detail')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.addToast('Select size to add to cart', 'info');
    setIsWishlistOpen(false);
    // Note: Actual addToCart called after size select in ProductDetail
  };

  return (
    <AnimatePresence>
      {isWishlistOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsWishlistOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />

          {/* Wishlist Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-card border-l border-zinc-800 z-[60] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-zinc-800">
              <h2 className="font-heading text-xl tracking-[0.16em] uppercase">
                Your Wishlist
              </h2>
              <button
                onClick={() => setIsWishlistOpen(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Wishlist Items */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {wishlist.length === 0 ? (
                <div className="text-center py-10">
                  <svg className="w-16 h-16 mx-auto text-zinc-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                  <p className="text-zinc-500">Your wishlist is empty</p>
                  <button
                    onClick={() => setIsWishlistOpen(false)}
                    className="mt-4 text-accent text-sm hover:underline"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                wishlist.map((sneaker) => (
                  <motion.div
                    key={sneaker.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex gap-4 p-3 bg-black/40 rounded-xl border border-zinc-800 group"
                  >
                    <img
                      src={sneaker.image}
                      alt={sneaker.name}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{sneaker.name}</p>
                      <p className="text-xs text-zinc-500">{sneaker.brand}</p>
                      <div className="flex items-center justify-between mt-2 gap-2">
                        <p className="text-accent font-semibold">₹{sneaker.price.toLocaleString()}</p>
                        <div className="flex gap-1">
                          <button
                            onClick={() => moveToCart(sneaker)}
                            className="px-3 py-1 text-xs bg-accent/90 hover:bg-accent text-black rounded-lg font-medium transition-colors"
                          >
                            → Cart
                          </button>
                          <button
                            onClick={() => removeFromWishlist(sneaker.id)}
                            className="p-1 text-zinc-500 hover:text-red-500 transition-colors -m-1"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {wishlist.length > 0 && (
              <div className="p-5 border-t border-zinc-800">
                <button
                  onClick={clearWishlist}
                  className="w-full text-sm text-zinc-500 hover:text-red-500 transition-colors"
                >
                  Clear Wishlist
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

