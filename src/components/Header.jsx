import { motion } from 'framer-motion';
import { SearchBar } from './SearchBar';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';

export function Header({ onSelectSneaker }) {
  const { cartCount, setIsCartOpen } = useCart();
  const { wishlistCount, setIsWishlistOpen } = useWishlist();
  const { user, openAuthModal, logout } = useAuth();

  return (
    <header className="flex items-center justify-between py-6 sticky top-0 z-20 bg-gradient-to-b from-background/95 via-background/80 to-transparent backdrop-blur">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 flex items-center justify-center">
          <img
            src="/Logo.svg"
            alt="Lace Up Labs Skull Logo"
            className="w-full h-full object-contain"
          />
        </div>
        <div>
          <div className="font-heading text-2xl tracking-[0.2em] uppercase">
            Lace Up Labs
          </div>
          <p className="text-xs text-zinc-400">
            Sneaker that fits your soul, not just your feet
          </p>
        </div>
      </div>

      {/* Search Bar - Desktop */}
      <div className="hidden md:block">
        <SearchBar onSelectSneaker={onSelectSneaker} />
      </div>

      <div className="flex items-center gap-15">
        {/* Wishlist Button */}
        <button
          onClick={() => setIsWishlistOpen(true)}
          className="relative p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          {wishlistCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center"
            >
              {wishlistCount}
            </motion.span>
          )}
        </button>

        {/* Cart Button */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          {cartCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-black text-xs font-bold rounded-full flex items-center justify-center"
            >
              {cartCount}
            </motion.span>
          )}
        </button>

        {/* User Button */}
        {user ? (
          <div className="relative group">
            <button className="flex items-center gap-2 p-1 hover:bg-white/10 rounded-lg transition-colors">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-full object-cover border border-zinc-700"
              />
            </button>
            {/* Dropdown */}
            <div className="absolute right-0 top-full mt-2 w-48 bg-card border border-zinc-800 rounded-xl overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              <div className="p-3 border-b border-zinc-800">
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-zinc-500">{user.email}</p>
              </div>
              <button
                onClick={logout}
                className="w-full p-3 text-left text-sm text-red-400 hover:bg-white/5 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <button onClick={openAuthModal} className="btn-secondary">
            Sign In
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;

