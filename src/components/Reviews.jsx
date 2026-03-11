import { motion } from "framer-motion";
import { Carousel } from "./Carousel";

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
    <section id="reviews" className="space-y-6">
      {/* Section Header */}
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-[0.65rem] uppercase tracking-[0.32em] text-zinc-500">
            Community Talk
          </p>

          <h2 className="font-heading text-3xl tracking-[0.16em] uppercase">
            Customer Reviews
          </h2>

          <p className="text-sm text-zinc-400 mt-1 max-w-xl">
            Hear what sneaker lovers are saying about their LaceUp Labs picks.
          </p>
        </div>
      </div>

      {/* Reviews Carousel */}
      <Carousel>
        {reviews.map((review, i) => (
          <motion.article
            key={review.name}
            className="rounded-2xl bg-card/70 border border-zinc-800/80 p-3 flex flex-col justify-between cursor-pointer hover:border-accent/80 hover:shadow-[0_0_25px_rgba(16,185,129,0.25)] transition-all duration-300 snap-start flex-shrink-0 min-w-[18rem] sm:min-w-[15rem]"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            custom={i + 1}
          >
            {/* Top Section */}
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-8 h-8 rounded-full object-cover border border-zinc-700"
                />

                <div>
                  <p className="text-xs font-medium">{review.name}</p>

                  <p className="text-[0.5rem] text-zinc-500 uppercase tracking-widest">
                    {review.role}
                  </p>

                  <span className="text-[8px] text-emerald-400 uppercase tracking-wider">
                    Verified Buyer
                  </span>
                </div>
              </div>

              {/* Star Rating */}
              <div className="text-emerald-400 text-[9px]">
                {"★★★★★".slice(0, Math.round(review.rating))}
              </div>
            </div>

            {/* Review Text */}
            <div className="space-y-1">
              <span className="text-accent text-lg opacity-40">"</span>

              <p className="text-xs text-zinc-300 leading-relaxed italic line-clamp-2">
                {review.text}
              </p>
            </div>

            {/* Purchased Sneaker */}
            {review.product && (
              <p className="text-[10px] text-zinc-400 mt-4">
                Purchased: {review.product}
              </p>
            )}
          </motion.article>
        ))}
      </Carousel>
    </section>
  );
}

export default Reviews;

