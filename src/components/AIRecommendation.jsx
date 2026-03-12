import { useMemo, useState } from "react";

export function AIRecommendation({
  budget,
  setBudget,
  style,
  setStyle,
  activity,
  setActivity,
  recommended,
  onRecommend,
  onSelectSneaker,
  onAddToCart,
}) {
  const [showValidation, setShowValidation] = useState(false);

  const hasBudget = useMemo(() => Number(budget) > 0, [budget]);
  const hasActivity = useMemo(() => Boolean(activity), [activity]);
  const canRecommend = hasBudget && hasActivity;

  const handleRecommend = () => {
    if (!canRecommend) {
      setShowValidation(true);
      return;
    }
    setShowValidation(false);
    onRecommend();
  };

  return (
    <section
      id="ai"
      className="rounded-3xl bg-gradient-to-b from-card via-card/90 to-black border border-zinc-800/80 p-5 space-y-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[0.65rem] uppercase tracking-[0.32em] text-emerald-400">
            AI Sneaker Lab
          </p>
          <h2 className="font-heading text-xl tracking-[0.16em] uppercase">
            Smart Recommendations
          </h2>
        </div>

        <span className="rounded-full bg-emerald-500/10 border border-emerald-500/40 px-3 py-1 text-[0.6rem] uppercase tracking-[0.24em] text-emerald-300">
          Beta
        </span>
      </div>

      {/* Description */}
      <p className="text-xs text-zinc-400" style={{ fontSize: '25px' }}>
        Tell LaceUp Labs how you move.
        Our AI hunts the sneaker verse for the perfect match,
        and finds kicks that match your drip and budget.
      </p>

      {/* Inputs */}
      <div className="grid grid-cols-2 gap-3 text-xs">
        <input
          type="number"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          placeholder="Budget "
          required
          min="1"
          aria-invalid={showValidation && !hasBudget}
          className={`rounded-full bg-black/60 border px-3 py-2 outline-none focus:ring-1 ${
            showValidation && !hasBudget
              ? "border-red-500 focus:border-red-500 focus:ring-red-500/40"
              : "border-zinc-800 focus:border-accent focus:ring-accent/60"
          }`}
        />

        <select
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
          required
          aria-invalid={showValidation && !hasActivity}
          className={`rounded-full bg-black/60 border px-3 py-2 outline-none focus:ring-1 ${
            showValidation && !hasActivity
              ? "border-red-500 focus:border-red-500 focus:ring-red-500/40"
              : "border-zinc-800 focus:border-accent focus:ring-accent/60"
          }`}
        >
          <option value="">Activity</option>
          <option value="Running">Running</option>
          <option value="Basketball">Basketball</option>
          <option value="Lifestyle">Lifestyle</option>
          <option value="Streetwear">Streetwear</option>
        </select>
      </div>
      {showValidation && !canRecommend && (
        <p className="text-[0.7rem] text-red-400">
          Please enter a budget and select an activity.
        </p>
      )}

      {/* Quick AI Tags */}
      <div className="flex flex-wrap gap-2 text-[10px]">
        <button onClick={() => setStyle('street')} className="px-3 py-1 rounded-full border border-zinc-700 hover:bg-zinc-800 transition">
          Streetwear
        </button>
        <button onClick={() => setStyle('high')} className="px-3 py-1 rounded-full border border-zinc-700 hover:bg-zinc-800 transition">
          High Tops
        </button>
        <button onClick={() => setStyle('limited')} className="px-3 py-1 rounded-full border border-zinc-700 hover:bg-zinc-800 transition">
          Limited
        </button>
        <button onClick={() => setStyle('sport')} className="px-3 py-1 rounded-full border border-zinc-700 hover:bg-zinc-800 transition">
          Sport
        </button>
      </div>

      {/* Button - Gradient AI Style with Shimmer */}
      <button
        onClick={handleRecommend}
        className="group relative rounded-full p-[1.5px] bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400 hover:scale-105 transition-all duration-300 overflow-hidden"
      >
        <span className="relative flex items-center gap-2 rounded-full bg-black px-5 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white group-hover:bg-black/90 transition">

          {/* Icon */}
          <svg
            className="w-4 h-4 text-purple-400 group-hover:text-cyan-400 transition"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z"/>
          </svg>

          Generate AI Recommendation
        </span>

        {/* Shimmer Effect */}
        <span className="absolute inset-0 rounded-full overflow-hidden">
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></span>
        </span>

        {/* Glow */}
        <span className="absolute inset-0 rounded-full blur-md opacity-0 group-hover:opacity-70 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400 transition"></span>
      </button>

      {/* Results */}
      {Array.isArray(recommended) && recommended.length > 0 && (
        <div className="grid gap-3 sm:grid-cols-3">
          {recommended.map((sneaker) => (
            <div
              key={sneaker.id}
              className="rounded-2xl border border-zinc-800/80 bg-black/60 overflow-hidden"
            >
              <div className="relative">
                <img
                  src={sneaker.image}
                  alt={sneaker.name}
                  className="w-full h-36 object-cover"
                />
                <span className="absolute top-2 left-2 rounded-full bg-black/70 px-2 py-1 text-[0.6rem] uppercase tracking-[0.2em] text-zinc-200">
                  {sneaker.category}
                </span>
              </div>
              <div className="p-3 space-y-1">
                <p className="text-[0.6rem] uppercase tracking-[0.24em] text-zinc-500">
                  {sneaker.brand}
                </p>
                <p className="text-sm font-medium">{sneaker.name}</p>
                <p className="text-xs text-zinc-500">
                  ★ {sneaker.rating.toFixed(1)} · Premium
                </p>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-sm font-semibold text-accent">
                    ₹{sneaker.price.toLocaleString()}
                  </span>
                  <button
                    onClick={() => onAddToCart?.(sneaker)}
                    className="btn-secondary-sm"
                  >
                    Add to Cart
                  </button>
                </div>
                <button
                  onClick={() => onSelectSneaker(sneaker)}
                  className="w-full mt-2 btn-primary"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default AIRecommendation;
