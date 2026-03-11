import { useState } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

const fadeInUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.05 * i,
      duration: 0.6,
      ease: [0.19, 1, 0.22, 1],
    },
  }),
};

export function FeaturedSneakers({ sneakers, onSelectSneaker }) {
  const { addToCart } = useCart();
  const [addedId, setAddedId] = useState(null);

  const handleAddToCart = (e, sneaker) => {
    e.stopPropagation();
    addToCart(sneaker, null, 1);
    setAddedId(sneaker.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <section
      id="featured"
      className="rounded-3xl bg-card/80 border border-zinc-800/80 p-5 space-y-4 min-h-[420px] flex flex-col"
    >
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-[0.65rem] uppercase tracking-[0.32em] text-zinc-500">
            Curated Heat
          </p>
          <h2 className="font-heading text-3xl tracking-[0.16em] uppercase">
            Featured Sneakers
          </h2>
        </div>
        <button className="hidden sm:inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-zinc-400 hover:text-accent transition-colors group">
          View all drops
          <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-4 pt-2 px-1 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-zinc-700/70 scrollbar-track-transparent">
        {sneakers.map((sneaker, index) => (
          <motion.button
            key={sneaker.id}
            type="button"
            onClick={() => onSelectSneaker(sneaker)}
            className="group relative min-w-[20rem] sm:min-w-[24rem] rounded-2xl bg-card/60 border border-zinc-800/80 overflow-hidden text-left hover:border-accent/80 transition-all duration-200 cursor-pointer snap-start flex-shrink-0"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            custom={index + 1}
            whileHover={{ y: -4 }}
          >
            <div className="relative">
              <img
                src={sneaker.image}
                alt={sneaker.name}
                className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />
              <span className="absolute top-3 left-3 rounded-full bg-black/70 px-3 py-1 text-[0.65rem] uppercase tracking-[0.22em] text-zinc-200">
                {sneaker.category}
              </span>
              <span className="absolute top-3 right-3 rounded-full bg-accent/90 px-3 py-1 text-[0.65rem] uppercase tracking-[0.2em] text-black">
                New
              </span>
            </div>
            <div className="p-4 flex flex-col gap-2">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs text-zinc-400 uppercase tracking-[0.22em]">
                    {sneaker.brand}
                  </p>
                  <p className="font-medium text-sm">
                    {sneaker.name}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[0.7rem] text-zinc-500 uppercase tracking-[0.2em]">
                    From
                  </p>
                  <p className="text-base font-semibold text-accent">
                    ₹{sneaker.price.toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-zinc-400 pt-1">
                <span>★ {sneaker.rating.toFixed(1)} Rating</span>
                <button 
                  onClick={(e) => handleAddToCart(e, sneaker)}
                  className={`btn-secondary-sm transition-all ${
                    addedId === sneaker.id 
                      ? 'bg-green-500 text-white border-green-500' 
                      : 'group-hover:bg-accent group-hover:text-black group-hover:border-accent'
                  }`}
                >
                  {addedId === sneaker.id ? 'Added!' : 'Add to Cart'}
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

