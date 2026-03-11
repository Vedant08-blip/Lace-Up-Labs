import { motion } from "framer-motion";

export default function FloatingSneakerCard({ sneaker, onSelect }) {
  if (!sneaker) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: [0, -6, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      whileHover={{ scale: 1.03 }}
      className="group relative rounded-2xl bg-black/70 border border-zinc-800 p-4 flex gap-4 items-center backdrop-blur-md shadow-[0_20px_60px_rgba(0,0,0,0.6)] transition-all"
    >
      {/* Glow background */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-400/10 via-purple-500/10 to-pink-500/10 blur-xl opacity-50 group-hover:opacity-80 transition duration-300" />

      {/* Sneaker Image */}
      <motion.img
        src={sneaker.image}
        alt={sneaker.name}
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="relative w-20 h-20 object-cover rounded-xl shadow-lg group-hover:shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
      />

      {/* Sneaker Info */}
      <div className="relative flex-1">
        <p className="text-[0.6rem] uppercase tracking-[0.25em] text-zinc-400">
          AI Best Match
        </p>

        <p className="text-sm font-semibold">
          {sneaker.name}
        </p>

        <p className="text-xs text-zinc-500">
          {sneaker.brand} · {sneaker.category}
        </p>

        <div className="flex items-center justify-between mt-2">
          <p className="text-accent font-bold">
            ${sneaker.price}
          </p>

          <button
            onClick={() => onSelect(sneaker)}
            className="px-3 py-1 text-xs rounded-md border border-zinc-700 hover:bg-zinc-800 hover:border-accent transition"
          >
            Add
          </button>
        </div>
      </div>

      {/* AI Indicator (Spark + Pulse) */}
      <div className="absolute top-2 right-2 flex items-center gap-1 text-emerald-400">
        {/* Pulse dot */}
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
        </span>

       
      </div>
    </motion.div>
  );
}