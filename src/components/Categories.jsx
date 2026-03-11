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

export function Categories({ categories }) {
  return (
    <section id="categories" className="space-y-4">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-[0.65rem] uppercase tracking-[0.32em] text-zinc-500">
            Find Your Lane
          </p>
          <h2 className="font-heading text-3xl tracking-[0.16em] uppercase">
            Sneaker Categories
          </h2>
        </div>
      </div>
      <Carousel>
        {categories.map((cat, index) => (
          <motion.div
            key={cat.id}
            className="group relative overflow-hidden rounded-2xl bg-card/60 border border-zinc-800/80 cursor-pointer hover:border-accent/80 transition-all duration-200 snap-start flex-shrink-0 min-w-[20rem] sm:min-w-[23rem]"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            custom={index + 1}
            whileHover={{ y: -3 }}
          >
            <div className="relative h-48">
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            </div>
            <div className="absolute inset-0 flex flex-col justify-between p-5">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-black/60 px-3 py-1 text-[0.65rem] uppercase tracking-[0.24em] text-zinc-200">
                  {cat.id}
                </span>
                <span className="text-[0.65rem] text-zinc-400 uppercase tracking-[0.24em]">
                  Tap to explore
                </span>
              </div>
              <div>
                <h3 className="font-heading text-2xl tracking-[0.18em] uppercase">
                  {cat.title}
                </h3>
                <p className="text-xs text-zinc-300 max-w-xs">
                  {cat.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </Carousel>
    </section>
  );
}

export default Categories;

