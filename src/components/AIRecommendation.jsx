import { motion } from 'framer-motion';

export function AIRecommendation({ 
  budget, 
  setBudget, 
  style, 
  setStyle, 
  activity, 
  setActivity, 
  recommended, 
  onRecommend, 
  onSelectSneaker 
}) {
  return (
    <section
      id="ai"
      className="rounded-3xl bg-gradient-to-b from-card via-card/90 to-black border border-zinc-800/80 p-5 space-y-4"
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[0.65rem] uppercase tracking-[0.32em] text-emerald-400">
            AI Sneaker Lab
          </p>
          <h2 className="font-heading text-2xl tracking-[0.16em] uppercase">
            Smart Recommendations
          </h2>
        </div>
        <span className="rounded-full bg-emerald-500/10 border border-emerald-500/40 px-3 py-1 text-[0.65rem] uppercase tracking-[0.24em] text-emerald-300">
          Live · Beta
        </span>
      </div>
      <p className="text-xs text-zinc-300">
        Tell Lace Up Labs AI how you move. We&apos;ll scan the vault and
        surface pairs tuned to your budget, style and activity.
      </p>
      <div className="grid gap-3 text-xs">
        <div className="space-y-1">
          <label className="block text-[0.65rem] uppercase tracking-[0.24em] text-zinc-400">
            Budget (USD)
          </label>
          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            placeholder="e.g. 180"
            className="w-full rounded-full bg-black/60 border border-zinc-800 px-4 py-2 text-xs outline-none focus:border-accent focus:ring-1 focus:ring-accent/60"
          />
        </div>
        <div className="space-y-1">
          <label className="block text-[0.65rem] uppercase tracking-[0.24em] text-zinc-400">
            Style keywords
          </label>
          <input
            type="text"
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            placeholder="street, running, high-top..."
            className="w-full rounded-full bg-black/60 border border-zinc-800 px-4 py-2 text-xs outline-none focus:border-accent focus:ring-1 focus:ring-accent/60"
          />
        </div>
        <div className="space-y-1">
          <label className="block text-[0.65rem] uppercase tracking-[0.24em] text-zinc-400">
            Activity
          </label>
          <select
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            className="w-full rounded-full bg-black/60 border border-zinc-800 px-4 py-2 text-xs outline-none focus:border-accent focus:ring-1 focus:ring-accent/60"
          >
            <option value="">Any</option>
            <option value="Running">Running</option>
            <option value="Basketball">Basketball</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Streetwear">Streetwear</option>
          </select>
        </div>
      </div>
      <button
        type="button"
        onClick={onRecommend}
        className="w-full rounded-full px-4 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.26em] text-white transition-all duration-300 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #7F00FF, #E100FF)',
          boxShadow: '0 4px 15px rgba(127, 0, 255, 0.4)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'linear-gradient(135deg, #9D00FF, #FF00E6)';
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 8px 20px rgba(127, 0, 255, 0.5)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'linear-gradient(135deg, #7F00FF, #E100FF)';
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 15px rgba(127, 0, 255, 0.4)';
        }}
      >
        {/* Shimmer overlay */}
        <span className="absolute inset-0 overflow-hidden rounded-full">
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-shimmer" />
        </span>
        {/* Sparkles icon */}
        <span className="inline-flex items-center gap-2 relative z-10">
          <svg 
            className="w-4 h-4" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" fill="currentColor" />
            <path d="M5 19l1 3 1-3 3-1-3-1-1-3-1 3-3 1 3 1z" fill="currentColor" opacity="0.6" />
            <path d="M19 5l1 3 1-3 3-1-3-1-1-3-1 3-3 1 3 1z" fill="currentColor" opacity="0.6" />
          </svg>
          Generate AI Recommendation
        </span>
      </button>

      {recommended && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 rounded-2xl bg-black/70 border border-zinc-800/80 p-3 flex gap-3 items-center"
        >
          <img
            src={recommended.image}
            alt={recommended.name}
            className="w-20 h-20 rounded-xl object-cover"
          />
          <div className="flex-1">
            <p className="text-[0.65rem] uppercase tracking-[0.22em] text-zinc-400">
              Best Match
            </p>
            <p className="text-sm font-medium">{recommended.name}</p>
            <p className="text-xs text-zinc-500">
              {recommended.brand} · {recommended.category}
            </p>
            <div className="flex items-center justify-between pt-1">
              <p className="text-sm text-accent font-semibold">
                ${recommended.price}
              </p>
              <button 
                className="rounded-full bg-zinc-900/90 px-3 py-1 text-[0.65rem] uppercase tracking-[0.22em] hover:bg-accent hover:text-black transition-colors"
                onClick={() => onSelectSneaker(recommended)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
}

export default AIRecommendation;

