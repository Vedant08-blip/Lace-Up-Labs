import { useState } from 'react';
import { motion } from 'framer-motion';
import { useWishlist } from '../context/WishlistContext';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.06 * i,
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export function Trending({ sneakers, onSelectSneaker, onAddToCart }) {
  const [addedId, setAddedId] = useState(null);
  const { toggleWishlist, isInWishlist } = useWishlist();

  const handleWishlistToggle = (e, sneaker) => {
    e.stopPropagation();
    toggleWishlist(sneaker);
    window.addToast?.(
      isInWishlist(sneaker.id) ? 'Removed from wishlist' : 'Added to wishlist',
      'success'
    );
  };

  const handleAddToCart = (e, sneaker) => {
    e.stopPropagation();
    onAddToCart ? onAddToCart(sneaker) : onSelectSneaker(sneaker);
    setAddedId(sneaker.id);
    setTimeout(() => setAddedId(null), 1600);
  };

  return (
    <section
      id="trending"
      className="rounded-3xl bg-white/[0.02] border border-white/[0.07] p-6 space-y-5"
    >
      {/* Header */}
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-[0.6rem] uppercase tracking-[0.3em] text-zinc-600 mb-1">
            Live Heat Check
          </p>
          <h2 className="font-heading text-[2rem] leading-none tracking-[0.1em] uppercase text-[#f5f5f5] relative inline-block
            after:content-[''] after:absolute after:bottom-[-3px] after:left-0 after:h-[2px] after:w-[35%] after:bg-[#FF3B30]
            hover:after:w-full after:transition-all after:duration-500">
            Trending Now
          </h2>
        </div>

        {/* Live pill */}
        <div className="flex items-center gap-2 bg-[#FF3B30]/10 border border-[#FF3B30]/35 rounded-full px-3 py-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF3B30] animate-pulse" />
          <span className="text-[0.6rem] uppercase tracking-[0.22em] text-[#FF3B30] font-medium">
            Live
          </span>
        </div>
      </div>

      {/* Scrollable track */}
      <div className="flex gap-3.5 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent -mx-1 px-1">
        {sneakers.map((sneaker, index) => (
          <motion.button
            key={sneaker.id}
            type="button"
            onClick={() => onSelectSneaker(sneaker)}
            className="group flex-shrink-0 w-[11.5rem] rounded-[18px] bg-[#1A1A1A] border border-white/[0.07] overflow-hidden text-left cursor-pointer snap-start focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3B30]/60"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            custom={index + 1}
            whileHover={{ y: -4, transition: { duration: 0.2, ease: 'easeOut' } }}
            style={{ transition: 'border-color 0.25s' }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,59,48,0.4)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'}
          >
            {/* Image zone */}
            <div className="relative overflow-hidden h-[170px]">
              <img
                src={sneaker.image}
                alt={sneaker.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.07]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />

             

              {/* Wishlist */}
              <button
                onClick={(e) => handleWishlistToggle(e, sneaker)}
                className={`absolute top-2.5 right-2.5 w-[30px] h-[30px] rounded-full flex items-center justify-center border transition-all duration-200
                  ${isInWishlist(sneaker.id)
                    ? 'bg-[#FF3B30]/15 border-[#FF3B30]/4 text-[#FF3B30]'
                    : 'bg-black/65 border-white/10 text-zinc-600 hover:text-[#FF3B30] hover:border-[#FF3B30]/40 hover:bg-[#FF3B30]/10'
                  }`}
              >
                <svg className="w-3 h-3" fill={isInWishlist(sneaker.id) ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>

              {/* Trending bar */}
              {sneaker.trendScore != null && (
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/5">
                  <motion.div
                    className="h-full bg-[#FF3B30] rounded-r-sm"
                    initial={{ width: 0 }}
                    animate={{ width: `${sneaker.trendScore}%` }}
                    transition={{ delay: 0.1 * index + 0.4, duration: 0.7, ease: 'easeOut' }}
                  />
                </div>
              )}
            </div>

            {/* Body */}
            <div className="p-3">
              <p className="text-[0.58rem] uppercase tracking-[0.26em] text-zinc-600 mb-0.5">
                {sneaker.brand}
              </p>
              <p className="text-[0.72rem] font-medium text-[#e0e0e0] leading-snug line-clamp-2 mb-2.5">
                {sneaker.name}
              </p>
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-semibold text-[#FF3B30] leading-none">
                  ₹{sneaker.price.toLocaleString('en-IN')}
                </p>
                {sneaker.rating && (
                  <span className="text-[0.6rem] text-zinc-600 flex items-center gap-1">
                    <span className="text-[#FF3B30]">★</span>
                    {sneaker.rating.toFixed(1)}
                  </span>
                )}
              </div>
              <button
                onClick={(e) => handleAddToCart(e, sneaker)}
                className={`w-full mt-2.5 rounded-[10px] py-2 text-[0.58rem] uppercase tracking-[0.2em] font-semibold border transition-all duration-200
                  ${addedId === sneaker.id
                    ? 'bg-green-500/15 border-green-500/35 text-green-400'
                    : 'bg-transparent border-[#FF3B30]/25 text-zinc-500 hover:bg-[#FF3B30] hover:border-[#FF3B30] hover:text-white hover:shadow-[0_0_18px_rgba(255,59,48,0.45)]'
                  }`}
              >
                {addedId === sneaker.id ? '✓ Select Size' : 'Add to Cart'}
              </button>
            </div>
          </motion.button>
        ))}
      </div>
    </section>
  );
}

export default Trending;