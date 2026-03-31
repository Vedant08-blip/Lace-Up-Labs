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
    <section
      id="reviews"
      className="relative rounded-3xl p-5 sm:p-6 space-y-6 overflow-hidden border border-zinc-800/80"
      style={{ background: "linear-gradient(160deg, #111111 0%, #0a0a0a 100%)" }}
    >
      {/* Ambient glow */}
      <div
        className="absolute -top-20 -right-20 w-64 h-64 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(255,59,48,0.08) 0%, transparent 70%)" }}
      />

      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: "#ff3b30" }} />
              <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: "#ff3b30" }} />
            </span>
            <p className="text-[0.58rem] uppercase tracking-[0.36em] text-zinc-600">Community Talk</p>
          </div>

          <h2
            className="text-[1.8rem] sm:text-[2.2rem] font-black uppercase leading-none tracking-tight"
            style={{
              background: "linear-gradient(135deg, #ffffff 0%, #ff3b30 55%, #ff3b30 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Customer
          </h2>
          <h2
            className="text-[1.8rem] sm:text-[2.2rem] font-black uppercase leading-none tracking-tight"
            style={{ color: "transparent", WebkitTextStroke: "1.5px rgba(255,59,48,0.35)" }}
          >
            Reviews
          </h2>

          <p className="text-sm text-zinc-400 mt-2 max-w-xl">
            Hear what sneaker lovers are saying about their LaceUp Labs picks.
          </p>
        </div>
      </div>

      {/* Reviews Carousel */}
      <Carousel>
        {reviews.map((review, i) => (
          <motion.article
            key={review.name}
            className="rounded-2xl bg-[#141414] border border-zinc-800/80 p-3 flex flex-col justify-between cursor-pointer hover:border-accent/80 hover:shadow-[0_0_25px_rgba(255,59,48,0.25)] transition-all duration-300 snap-start flex-shrink-0 min-w-[15rem] sm:min-w-[18rem]"
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

                  <span className="text-[8px] text-accent uppercase tracking-wider">
                    Verified Buyer
                  </span>
                </div>
              </div>

              {/* Star Rating */}
              <div className="text-accent text-[9px]">
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
