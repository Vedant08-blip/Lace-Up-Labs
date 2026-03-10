import { motion } from 'framer-motion';

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
  return (
    <section id="featured" className="space-y-4">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-[0.65rem] uppercase tracking-[0.32em] text-zinc-500">
            Curated Heat
          </p>
          <h2 className="font-heading text-3xl tracking-[0.16em] uppercase">
            Featured Sneakers
          </h2>
        </div>
        <button className="hidden sm:inline-flex text-xs uppercase tracking-[0.24em] text-zinc-400 hover:text-accent transition-colors">
          View all drops
        </button>
      </div>
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {sneakers.map((sneaker, index) => (
          <motion.button
            key={sneaker.id}
            type="button"
            onClick={() => onSelectSneaker(sneaker)}
            className="group relative rounded-2xl bg-card/60 border border-zinc-800/80 overflow-hidden text-left hover:border-accent/80 transition-colors"
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
                className="w-full h-44 object-cover transition-transform duration-500 group-hover:scale-105"
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
                    ${sneaker.price}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-zinc-400 pt-1">
                <span>★ {sneaker.rating.toFixed(1)} Rating</span>
                <span className="rounded-full bg-zinc-900/80 px-3 py-1 text-[0.7rem] uppercase tracking-[0.2em] group-hover:bg-accent group-hover:text-black transition-colors">
                  Add to Cart
                </span>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </section>
  );
}

export default FeaturedSneakers;

