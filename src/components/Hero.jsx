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

export function Hero({ selectedSneaker, onSelectSneaker }) {
  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      className="rounded-3xl bg-gradient-to-br from-card via-card/80 to-black/80 border border-zinc-800/80 overflow-hidden relative"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,59,48,0.14),_transparent_55%)]" />
      <div className="relative grid md:grid-cols-[1.1fr_minmax(0,1fr)] gap-8 p-8 lg:p-10 items-center">
        <div className="space-y-5">
          <p className="text-xs uppercase tracking-[0.35em] text-zinc-400">
            AI-POWERED DROP VAULT
          </p>
          <h1 className="font-heading text-5xl sm:text-6xl leading-none tracking-[0.18em] uppercase">
            Step Into
            <br />
            The Future
            <br />
            Of Sneakers.
          </h1>
          <p className="text-sm text-zinc-400 max-w-md">
            Curated heat from Nike, Adidas, Puma and more. Let our AI
            stylist lock in the perfect pair for your budget, style and
            grind.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <button className="btn-primary">
              Shop Now
            </button>
            <button className="btn-secondary">
              Explore Collection
            </button>
          </div>
          <div className="flex gap-8 pt-3 text-xs text-zinc-400">
            <div>
              <p className="font-semibold text-white text-base">
                1.2M+
              </p>
              <p>Pairs Secured</p>
            </div>
            <div>
              <p className="font-semibold text-white text-base">
                {'<'} 30s
              </p>
              <p>AI Fit Match</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <motion.div
            initial={{ rotate: -18, y: 40, opacity: 0 }}
            animate={{
              rotate: -12,
              y: 0,
              opacity: 1,
            }}
            transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
            className="relative rounded-[2rem] bg-gradient-to-br from-zinc-900 via-zinc-950 to-black p-4 border border-zinc-800/80 shadow-[0_40px_80px_rgba(0,0,0,0.8)]"
          >
            <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_20%_0,_rgba(255,59,48,0.25),_transparent_55%)]" />
            <div className="relative overflow-hidden rounded-[1.6rem] bg-black/80">
              <img
                src={selectedSneaker.image}
                alt={selectedSneaker.name}
                className="w-full h-64 object-cover object-center"
              />
            </div>
            <div className="relative pt-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-[0.65rem] uppercase tracking-[0.26em] text-zinc-400">
                  Featured Drop
                </p>
                <p className="font-medium text-sm">
                  {selectedSneaker.name}
                </p>
                <p className="text-xs text-zinc-500">
                  {selectedSneaker.brand} · {selectedSneaker.category}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-zinc-400 tracking-[0.18em] uppercase">
                  From
                </p>
                <p className="text-lg font-semibold text-accent">
                  ${selectedSneaker.price}
                </p>
                <p className="text-[0.7rem] text-emerald-400">
                  ★ {selectedSneaker.rating.toFixed(1)} Rated
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

export default Hero;

