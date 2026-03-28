import { useState } from 'react';
import { motion } from 'framer-motion';
import { useWishlist } from '../context/WishlistContext';

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.06 * i,
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export function FeaturedSneakers({ sneakers, onSelectSneaker, onViewAll, onAddToCart }) {
  const [addedId, setAddedId] = useState(null);
  const { toggleWishlist, isInWishlist } = useWishlist();

  const handleAddToCart = (e, sneaker) => {
    e.stopPropagation();
    onAddToCart ? onAddToCart(sneaker) : onSelectSneaker(sneaker);
    setAddedId(sneaker.id);
    setTimeout(() => setAddedId(null), 1600);
  };

  const handleWishlistToggle = (e, sneaker) => {
    e.stopPropagation();
    toggleWishlist(sneaker);
    window.addToast?.(
      isInWishlist(sneaker.id) ? 'Removed from wishlist' : 'Added to wishlist',
      'success'
    );
  };

  return (
    <section
      id="featured"
      className="rounded-3xl bg-white/[0.03] border border-white/[0.07] p-6 sm:p-8 space-y-6 min-h-[440px] flex flex-col"
    >
      {/* Header */}
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-[0.6rem] uppercase tracking-[0.32em] text-zinc-600 mb-1">
            Curated Heat
          </p>
          <h2 className="font-heading text-[2.4rem] leading-none tracking-[0.1em] uppercase bg-gradient-to-br from-white via-white to-zinc-600 bg-clip-text text-transparent">
            Featured Sneakers
          </h2>
        </div>
        <button
          onClick={onViewAll}
          className="hidden sm:inline-flex items-center gap-2 text-[0.6rem] uppercase tracking-[0.26em] text-zinc-600 hover:text-accent transition-colors group"
        >
          View all drops
          <svg
            className="w-3 h-3 group-hover:translate-x-1 transition-transform"
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Cards track */}
      <div className="flex gap-4 overflow-x-auto pb-2 pt-1 px-0.5 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent -mx-1 px-1">
        {sneakers.map((sneaker, index) => (
          <motion.button
            key={sneaker.id}
            type="button"
            onClick={() => onSelectSneaker(sneaker)}
            className="group relative flex-shrink-0 w-[17rem] sm:w-[19rem] rounded-2xl bg-white/[0.04] border border-white/[0.07] overflow-hidden text-left snap-start cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            custom={index + 1}
            whileHover={{ y: -5, transition: { duration: 0.22, ease: 'easeOut' } }}
            style={{ transition: 'border-color 0.25s' }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(var(--accent-rgb, 200,241,53), 0.45)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'}
          >
            {/* Image */}
            <div className="relative overflow-hidden h-52">
              <img
                src={sneaker.image}
                alt={sneaker.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

              {/* Category badge */}
              <span className="absolute top-3 left-3 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 px-3 py-1 text-[0.6rem] uppercase tracking-[0.24em] text-zinc-300">
                {sneaker.category}
              </span>

              {/* New badge */}
              <span className="absolute top-3 right-3 rounded-full bg-accent px-3 py-1 text-[0.6rem] uppercase tracking-[0.2em] text-black font-semibold">
                New
              </span>

              {/* Wishlist — sits bottom-right of image */}
              <button
                onClick={(e) => handleWishlistToggle(e, sneaker)}
                className={`absolute bottom-3 right-3 w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-200
                  ${isInWishlist(sneaker.id)
                    ? 'bg-red-500/20 border-red-400/40 text-red-400'
                    : 'bg-black/60 backdrop-blur-sm border-white/10 text-zinc-500 hover:text-red-400 hover:border-red-400/40 hover:bg-red-400/10'
                  }`}
                title={isInWishlist(sneaker.id) ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <svg className="w-3.5 h-3.5" fill={isInWishlist(sneaker.id) ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="p-4 flex flex-col gap-3">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[0.6rem] text-zinc-600 uppercase tracking-[0.26em] mb-0.5">
                    {sneaker.brand}
                  </p>
                  <p className="font-medium text-sm text-zinc-200 leading-snug line-clamp-2">
                    {sneaker.name}
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-[0.55rem] text-zinc-600 uppercase tracking-[0.2em] mb-0.5">From</p>
                  <p className="text-base font-semibold text-accent leading-none">
                    ₹{sneaker.price.toLocaleString('en-IN')}
                  </p>
                </div>
              </div>

              {/* Rating + CTA */}
              <div className="flex items-center gap-2 pt-0.5">
                <span className="text-[0.65rem] text-zinc-500 flex items-center gap-1">
                  <span className="text-accent">★</span>
                  {sneaker.rating.toFixed(1)}
                </span>
                <button
                  onClick={(e) => handleAddToCart(e, sneaker)}
                  className={`flex-1 rounded-xl py-2.5 text-[0.6rem] uppercase tracking-[0.22em] font-semibold border transition-all duration-200
                    ${addedId === sneaker.id
                      ? 'bg-green-500/20 border-green-500/40 text-green-400'
                      : 'bg-transparent border-white/10 text-zinc-400 group-hover:bg-accent group-hover:border-accent group-hover:text-black'
                    }`}
                >
                  {addedId === sneaker.id ? '✓ Select Size' : 'Add to Cart'}
                </button>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </section>
  );
}

export default FeaturedSneakers;