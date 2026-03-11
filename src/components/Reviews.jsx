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

export function Reviews({ reviews }) {
  return (
    <section id="reviews" className="space-y-4">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-[0.65rem] uppercase tracking-[0.32em] text-zinc-500">
            Community Talk
          </p>
          <h2 className="font-heading text-3xl tracking-[0.16em] uppercase">
            Customer Reviews
          </h2>
        </div>
      </div>
      <Carousel>
        {reviews.map((review, i) => (
          <motion.article
            key={review.name}
            className="rounded-2xl bg-card/70 border border-zinc-800/80 p-5 flex flex-col justify-between cursor-pointer hover:border-accent/80 transition-all duration-200 snap-start flex-shrink-0 min-w-[20rem] sm:min-w-[24rem]"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            custom={i + 1}
          >
            <div className="flex items-center justify-between gap-2 mb-4">
              <div>
                <p className="text-sm font-medium">{review.name}</p>
                <p className="text-[0.65rem] text-zinc-500 uppercase tracking-widest mt-0.5">{review.role}</p>
              </div>
              <p className="text-xs text-emerald-400">
                ★ {review.rating}
              </p>
            </div>
            <p className="text-sm text-zinc-300 leading-relaxed italic">
              "{review.text}"
            </p>
          </motion.article>
        ))}
      </Carousel>
    </section>
  );
}

export default Reviews;

