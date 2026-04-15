import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SNEAKERS } from '../data/sneakers';

export function SearchBar({ onSelectSneaker }) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const filteredSneakers = query.trim()
    ? SNEAKERS.filter(
        (sneaker) =>
          sneaker.name.toLowerCase().includes(query.toLowerCase()) ||
          sneaker.brand.toLowerCase().includes(query.toLowerCase()) ||
          sneaker.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 6)
    : [];

  const handleSelect = (sneaker) => {
    onSelectSneaker(sneaker);
    setQuery('');
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      <motion.div 
        className="flex items-center gap-2 bg-black/40 border border-zinc-800 rounded-full px-4 py-2.5 focus-within:border-accent focus-within:ring-1 focus-within:ring-accent/60 w-full transition-all duration-300 hover:border-accent/40 hover:bg-black/50"
        whileFocus={{ scale: 1.02 }}
      >
        <motion.svg
          className="w-4 h-4 text-zinc-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          whileHover={{ scale: 1.1 }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </motion.svg>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search sneakers, brands, styles..."
          className="bg-transparent text-sm text-white placeholder-zinc-500 outline-none flex-1 min-w-0 transition-colors"
        />
        {query && (
          <motion.button
            onClick={() => {
              setQuery('');
              setIsOpen(false);
            }}
            whileHover={{ scale: 1.2, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            className="text-zinc-500 hover:text-accent transition-colors"
          >
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </motion.button>
        )}
      </motion.div>

      <AnimatePresence>
        {isOpen && filteredSneakers.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 bg-card border border-zinc-800 rounded-xl overflow-hidden shadow-2xl z-50 backdrop-blur-sm"
          >
            <div className="p-2">
              <p className="text-xs text-zinc-600 uppercase tracking-widest px-3 py-1 font-semibold">Results</p>
              {filteredSneakers.map((sneaker, idx) => (
                <motion.button
                  key={sneaker.id}
                  onClick={() => handleSelect(sneaker)}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ backgroundColor: 'rgba(255, 59, 48, 0.1)', x: 4 }}
                  className="w-full flex items-center gap-3 p-3 hover:bg-accent/10 transition-all text-left rounded-lg group"
                >
                  <motion.img
                    src={sneaker.image}
                    alt={sneaker.name}
                    className="w-12 h-12 rounded-lg object-cover border border-zinc-700 group-hover:border-accent/50"
                    whileHover={{ scale: 1.05 }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white truncate font-medium group-hover:text-accent transition-colors">{sneaker.name}</p>
                    <p className="text-xs text-zinc-500 group-hover:text-zinc-400 transition-colors">
                      {sneaker.brand} · {sneaker.category}
                    </p>
                  </div>
                  <motion.p 
                    className="text-accent font-bold whitespace-nowrap text-sm"
                    whileHover={{ scale: 1.1 }}
                  >
                    ₹{sneaker.price.toLocaleString()}
                  </motion.p>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isOpen && query && filteredSneakers.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full left-0 right-0 mt-2 bg-card border border-zinc-800 rounded-xl p-4 shadow-xl z-50"
        >
          <p className="text-sm text-zinc-500 text-center">
            No sneakers found for "{query}"
          </p>
        </motion.div>
      )}
    </div>
  );
}

export default SearchBar;
