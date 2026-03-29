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
      <div className="flex items-center gap-2 bg-black/60 border border-zinc-800 rounded-full px-4 py-2 focus-within:border-accent focus-within:ring-1 focus-within:ring-accent/60 w-full">
        <svg
          className="w-4 h-4 text-zinc-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search sneakers..."
          className="bg-transparent text-sm text-white placeholder-zinc-500 outline-none flex-1 min-w-0"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setIsOpen(false);
            }}
            className="text-zinc-500 hover:text-white"
          >
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && filteredSneakers.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-card border border-zinc-800 rounded-xl overflow-hidden shadow-xl z-50"
          >
            {filteredSneakers.map((sneaker) => (
              <button
                key={sneaker.id}
                onClick={() => handleSelect(sneaker)}
                className="w-full flex items-center gap-3 p-3 hover:bg-white/5 transition-colors text-left"
              >
                <img
                  src={sneaker.image}
                  alt={sneaker.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white truncate">{sneaker.name}</p>
                  <p className="text-xs text-zinc-500">
                    {sneaker.brand} · {sneaker.category}
                  </p>
                </div>
                <p className="text-accent font-semibold">₹{sneaker.price.toLocaleString()}</p>
              </button>
            ))}
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
