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
      <div className="grid md:grid-cols-3 gap-4">
        {reviews.map((review, i) => (
          <motion.article
            key={review.name}
            className="rounded-2xl bg-card/70 border border-zinc-800/80 p-4 flex flex-col justify-between"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            custom={i + 1}
          >
            <div className="flex items-center justify-between gap-2 mb-3">
              <div>
                <p className="text-sm font-medium">{review.name}</p>
                <p className="text-xs text-zinc-500">{review.role}</p>
              </div>
              <p className="text-xs text-emerald-400">
                ★ {review.rating}
              </p>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              "{review.text}"
            </p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

export default Reviews;

