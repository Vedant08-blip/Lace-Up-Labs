import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";

export default function FloatingSneakerCard({ sneaker, onSelect }) {
  const { addToCart } = useCart();
  if (!sneaker) return null;

  const handleAdd = (e) => {
    e.stopPropagation();
    addToCart(sneaker, null, 1);
  };

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
      className="relative rounded-2xl bg-black/70 border border-zinc-800 p-4 flex gap-4 items-center backdrop-blur-md shadow-[0_20px_60px_rgba(0,0,0,0.6)] cursor-pointer"
      onClick={() => onSelect(sneaker)}
    >
      {/* Glow background */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-cyan-500/10 blur-xl opacity-50" />

      {/* Sneaker Image */}
      <motion.img
        src={sneaker.image}
        alt={sneaker.name}
        transition={{ type: "spring", stiffness: 200 }}
        className="relative w-20 h-20 object-cover rounded-xl shadow-lg"
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
            onClick={handleAdd}
            className="px-3 py-1 text-xs rounded-md border border-zinc-700 hover:bg-accent hover:text-black hover:border-accent transition"
          >
            Add
          </button>
        </div>
      </div>
    </motion.div>
  );
}

