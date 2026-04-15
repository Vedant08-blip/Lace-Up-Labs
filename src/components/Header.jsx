import { motion } from 'framer-motion';
import { SearchBar } from './SearchBar';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';

export function Header({ onSelectSneaker, onOpenForum, onOpenCheckout, onOpenOrderTracking }) {
  const { cartCount, setIsCartOpen } = useCart();
  const { wishlistCount, setIsWishlistOpen } = useWishlist();
  const { user, openAuthModal, logout } = useAuth();

  return (
    <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 py-4 sm:py-6 sticky top-0 z-20 bg-gradient-to-b from-background/95 via-background/80 to-transparent backdrop-blur-md border-b border-white/5 transition-all duration-300">
      <div className="flex items-center justify-center md:justify-start gap-3 w-full md:w-auto group">
        <motion.div 
          className="h-10 w-10 flex items-center justify-center"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src="/Logo.svg"
            alt="Lace Up Labs Skull Logo"
            className="w-full h-full object-contain"
          />
        </motion.div>
        <motion.div 
          className="text-center md:text-left"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <div className="font-heading text-lg sm:text-2xl tracking-[0.2em] uppercase bg-linear-to-r from-white via-white to-red-400 bg-clip-text text-transparent">
            Lace Up Labs
          </div>
          <p className="text-[0.6rem] sm:text-xs text-zinc-400 group-hover:text-zinc-300 transition-colors">
            Sneaker that fits your soul, not just your feet
          </p>
        </motion.div>
      </div>

      {/* Search Bar - Desktop */}
      <motion.div 
        className="hidden md:block"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <SearchBar onSelectSneaker={onSelectSneaker} />
      </motion.div>

      {/* Search Bar - Mobile */}
      <motion.div 
        className="block md:hidden w-full"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <SearchBar onSelectSneaker={onSelectSneaker} />
      </motion.div>

      <div className="flex items-center justify-center md:justify-end w-full md:w-auto gap-2 sm:gap-3 md:gap-4">
        {/* Community Forum Button */}
        <motion.button
          onClick={onOpenForum}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="relative p-2.5 hover:bg-blue-500/10 rounded-lg transition-all duration-300 group"
          title="Community Forum"
        >
          <svg className="w-6 h-6 group-hover:text-blue-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
          </svg>
        </motion.button>

        {/* Checkout Button */}
        <motion.button
          onClick={onOpenCheckout}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="relative p-2.5 hover:bg-purple-500/10 rounded-lg transition-all duration-300 group"
          title="Checkout"
        >
          <svg className="w-6 h-6 group-hover:text-purple-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </motion.button>

        {/* Order Tracking Button */}
        <motion.button
          onClick={onOpenOrderTracking}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="relative p-2.5 hover:bg-green-500/10 rounded-lg transition-all duration-300 group"
          title="Order Tracking"
        >
          <svg className="w-6 h-6 group-hover:text-green-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
          </svg>
        </motion.button>

        {/* Wishlist Button */}
        <motion.button
          onClick={() => setIsWishlistOpen(true)}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="relative p-2.5 hover:bg-red-500/10 rounded-lg transition-all duration-300 group"
        >
          <svg className="w-6 h-6 group-hover:text-red-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          {wishlistCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg shadow-red-500/50"
            >
              {wishlistCount}
            </motion.span>
          )}
        </motion.button>

        {/* Cart Button */}
        <motion.button
          onClick={() => setIsCartOpen(true)}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="relative p-2.5 hover:bg-accent/10 rounded-lg transition-all duration-300 group"
        >
          <svg className="w-6 h-6 group-hover:text-accent transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          {cartCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-accent to-orange-600 text-black text-xs font-bold rounded-full flex items-center justify-center shadow-lg shadow-accent/50"
            >
              {cartCount}
            </motion.span>
          )}
        </motion.button>

        {/* User Button */}
        {user ? (
          <motion.div 
            className="relative group"
            whileHover={{ scale: 1.05 }}
          >
            <motion.button 
              className="flex items-center gap-2 p-1 hover:bg-white/10 rounded-lg transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-full object-cover border border-zinc-700 group-hover:border-accent transition-colors"
              />
            </motion.button>
            {/* Dropdown */}
            <motion.div 
              initial={{ opacity: 0, y: -5 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="absolute right-0 top-full mt-2 w-48 bg-card border border-zinc-800 rounded-xl overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all"
            >
              <div className="p-3 border-b border-zinc-800 bg-card/80">
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-zinc-500">{user.email}</p>
              </div>
              <motion.button
                onClick={logout}
                whileHover={{ backgroundColor: 'rgba(244, 63, 94, 0.1)' }}
                className="w-full p-3 text-left text-sm text-red-400 hover:bg-white/5 transition-colors"
              >
                Sign Out
              </motion.button>
            </motion.div>
          </motion.div>
        ) : (
          <motion.button 
            onClick={openAuthModal}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary"
          >
            Sign In
          </motion.button>
        )}
      </div>
    </header>
  );
}

export default Header;
