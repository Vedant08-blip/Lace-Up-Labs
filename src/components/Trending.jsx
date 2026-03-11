import { motion } from 'framer-motion';
import { Carousel } from './Carousel';

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

export function Trending({ sneakers, onSelectSneaker }) {
  return (
    <section
      id="trending"
      className="rounded-3xl bg-card/80 border border-zinc-800/80 p-5 space-y-3"
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-[0.65rem] uppercase tracking-[0.32em] text-zinc-500">
            Live Heat Check
          </p>
          <h2 className="font-heading text-2xl tracking-[0.16em] uppercase">
            Trending Now
          </h2>
        </div>
      </div>
      <Carousel>
          {sneakers.map((sneaker, index) => (
            <motion.button
              key={sneaker.id}
              type="button"
              onClick={() => onSelectSneaker(sneaker)}
              className="min-w-[12rem] rounded-2xl bg-card/70 border border-zinc-800/80 p-3 flex-shrink-0 text-left hover:border-accent/80 transition-all duration-200 cursor-pointer snap-start"
              whileHover={{ y: -3 }}
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={index + 1}
            >
              <img
                src={sneaker.image}
                alt={sneaker.name}
                className="w-full h-40 object-cover rounded-xl mb-3"
              />
              <p className="text-[0.65rem] uppercase tracking-[0.22em] text-zinc-400">
                {sneaker.brand}
              </p>
              <p className="text-sm font-medium line-clamp-2 mt-1">
                {sneaker.name}
              </p>
              <p className="text-sm font-semibold text-accent pt-2">
                ${sneaker.price}
              </p>
            </motion.button>
          ))}
      </Carousel>
    </section>
  );
}

export default Trending;

