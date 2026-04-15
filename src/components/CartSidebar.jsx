import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';

export function CartSidebar() {
  const { cart, removeFromCart, clearCart, cartTotal, isCartOpen, setIsCartOpen } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Cart Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-card border-l border-zinc-800 z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <motion.div 
              className="flex items-center justify-between p-5 border-b border-zinc-800 bg-linear-to-r from-card to-card/50"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="font-heading text-xl tracking-[0.16em] uppercase bg-linear-to-r from-white to-accent bg-clip-text text-transparent">
                Your Cart
              </h2>
              <motion.button
                onClick={() => setIsCartOpen(false)}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </motion.div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-thin">
              {cart.length === 0 ? (
                <motion.div 
                  className="text-center py-10"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <motion.svg 
                    className="w-16 h-16 mx-auto text-zinc-600 mb-4"
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </motion.svg>
                  <p className="text-zinc-500 font-medium mb-1">Your cart is empty</p>
                  <p className="text-xs text-zinc-600 mb-4">Add your favorite sneakers to get started</p>
                  <motion.button
                    onClick={() => setIsCartOpen(false)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-4 text-accent text-sm hover:text-orange-400 font-semibold transition-colors"
                  >
                    Continue Shopping →
                  </motion.button>
                </motion.div>
              ) : (
                cart.map((item, idx) => (
                  <motion.div
                    key={`${item.id}-${item.size}`}
                    layout
                    initial={{ opacity: 0, y: 20, x: 20 }}
                    animate={{ opacity: 1, y: 0, x: 0 }}
                    exit={{ opacity: 0, x: 100 }}
                    transition={{ delay: idx * 0.05 }}
                    whileHover={{ y: -2 }}
                    className="flex gap-4 p-3 bg-black/40 rounded-xl border border-zinc-800 hover:border-accent/40 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10"
                  >
                    <motion.img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 rounded-lg object-cover border border-zinc-700"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white truncate">{item.name}</p>
                      <p className="text-xs text-zinc-500 uppercase tracking-wide">{item.brand}</p>
                      {item.size && (
                        <p className="text-xs text-zinc-400 mt-1">Size: US {item.size}</p>
                      )}
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-accent font-bold">₹{item.price.toLocaleString()}</p>
                        <motion.p 
                          className="text-xs text-zinc-400 bg-white/5 px-2 py-1 rounded-md"
                          whileHover={{ scale: 1.1 }}
                        >
                          x{item.quantity}
                        </motion.p>
                      </div>
                    </div>
                    <motion.button
                      onClick={() => removeFromCart(item.id, item.size)}
                      whileHover={{ scale: 1.15, rotate: 10 }}
                      whileTap={{ scale: 0.85 }}
                      className="self-start p-1 text-zinc-500 hover:text-red-500 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </motion.button>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <motion.div 
                className="p-5 border-t border-zinc-800 space-y-4 bg-black/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400 font-medium">Subtotal</span>
                  <motion.span 
                    className="text-xl font-bold text-accent"
                    key={cartTotal}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                  >
                    ₹{cartTotal.toLocaleString()}
                  </motion.span>
                </div>
                <motion.button 
                  className="w-full btn-primary py-3 font-semibold shadow-lg shadow-accent/30"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Proceed to Checkout
                </motion.button>
                <motion.button
                  onClick={clearCart}
                  whileHover={{ backgroundColor: 'rgba(239,68,68,0.1)' }}
                  className="w-full text-sm text-zinc-500 hover:text-red-500 transition-colors py-2 rounded-lg font-medium"
                >
                  Clear Cart
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default CartSidebar;

