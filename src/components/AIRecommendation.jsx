import { useMemo, useState, useRef, useEffect } from "react";
import { useWishlist } from "../context/WishlistContext";

const STYLE_TAGS = [
  { id: "street", label: "Streetwear", icon: "◈" },
  { id: "high", label: "High Tops", icon: "◆" },
  { id: "limited", label: "Limited", icon: "◉" },
  { id: "sport", label: "Sport", icon: "◇" },
  { id: "retro", label: "Retro", icon: "◎" },
  { id: "collab", label: "Collab", icon: "◈" },
];

function GlitchText({ text }) {
  const [glitch, setGlitch] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 150);
    }, 3500);
    return () => clearInterval(interval);
  }, []);
  return (
    <span className="relative inline-block">
      <span
        className={`transition-all duration-75 ${
          glitch ? "opacity-0" : "opacity-100"
        }`}
      >
        {text}
      </span>
      {glitch && (
        <>
          <span
            className="absolute inset-0 text-cyan-400"
            style={{ clipPath: "inset(20% 0 60% 0)", transform: "translateX(-2px)" }}
          >
            {text}
          </span>
          <span
            className="absolute inset-0 text-red-400"
            style={{ clipPath: "inset(60% 0 10% 0)", transform: "translateX(2px)" }}
          >
            {text}
          </span>
        </>
      )}
    </span>
  );
}

function ScanningBar({ active }) {
  return (
    <div className="relative h-[2px] w-full overflow-hidden rounded-full bg-zinc-800/60">
      <div
        className={`absolute top-0 left-0 h-full rounded-full transition-all duration-300 ${
          active
            ? "w-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-[scan_1.8s_ease-in-out_infinite]"
            : "w-0"
        }`}
      />
      <style>{`
        @keyframes scan {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  );
}

function NeuralNode({ x, y, pulse }) {
  return (
    <circle
      cx={x}
      cy={y}
      r={pulse ? 3 : 2}
      fill={pulse ? "#22d3ee" : "#3f3f46"}
      className="transition-all duration-500"
    >
      {pulse && (
        <animate
          attributeName="r"
          values="2;5;2"
          dur="2s"
          repeatCount="indefinite"
        />
      )}
    </circle>
  );
}

function NeuralBackground({ thinking }) {
  const nodes = [
    { x: 20, y: 30 }, { x: 80, y: 20 }, { x: 150, y: 50 },
    { x: 220, y: 25 }, { x: 290, y: 45 }, { x: 360, y: 20 },
    { x: 50, y: 80 }, { x: 120, y: 70 }, { x: 190, y: 85 },
    { x: 260, y: 65 }, { x: 330, y: 80 }, { x: 400, y: 55 },
  ];
  const edges = [
    [0,1],[1,2],[2,3],[3,4],[4,5],[6,7],[7,8],[8,9],[9,10],[10,11],
    [0,6],[1,7],[2,8],[3,9],[4,10],[5,11],[1,6],[2,7],[3,8],[4,9],
  ];
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
      viewBox="0 0 420 110"
      preserveAspectRatio="xMidYMid slice"
    >
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].x} y1={nodes[a].y}
          x2={nodes[b].x} y2={nodes[b].y}
          stroke={thinking ? "#22d3ee" : "#3f3f46"}
          strokeWidth="0.5"
          opacity={thinking ? 0.6 : 0.3}
          className="transition-all duration-700"
        >
          {thinking && (
            <animate
              attributeName="stroke-dashoffset"
              values="100;0"
              dur={`${1 + (i % 5) * 0.3}s`}
              repeatCount="indefinite"
            />
          )}
        </line>
      ))}
      {nodes.map((n, i) => (
        <NeuralNode
          key={i}
          x={n.x} y={n.y}
          pulse={thinking && i % 3 === 0}
        />
      ))}
    </svg>
  );
}

function TypewriterText({ text, active }) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    if (!active) { setDisplayed(""); return; }
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 28);
    return () => clearInterval(interval);
  }, [text, active]);
  return (
    <span className="font-mono text-cyan-300 text-xs">
      {displayed}
      {active && displayed.length < text.length && (
        <span className="animate-pulse text-cyan-400">█</span>
      )}
    </span>
  );
}

function HologramCard({ sneaker, onAddToCart }) {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * -20,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setMousePos({ x: 0, y: 0 }); }}
      onMouseMove={handleMouseMove}
      className="relative group cursor-pointer"
      style={{
        perspective: "800px",
        transformStyle: "preserve-3d",
      }}
    >
      <div
        className="relative rounded-2xl overflow-hidden border transition-all duration-300"
        style={{
          transform: hovered
            ? `rotateX(${mousePos.y}deg) rotateY(${mousePos.x}deg) scale(1.03)`
            : "rotateX(0deg) rotateY(0deg) scale(1)",
          transformStyle: "preserve-3d",
          transition: "transform 0.3s ease",
          background: "linear-gradient(145deg, #0f0f0f, #141414)",
          borderColor: hovered ? "rgba(34,211,238,0.4)" : "rgba(63,63,70,0.5)",
          boxShadow: hovered
            ? "0 20px 60px rgba(0,0,0,0.8), 0 0 30px rgba(34,211,238,0.1), inset 0 1px 0 rgba(34,211,238,0.15)"
            : "0 10px 30px rgba(0,0,0,0.5)",
        }}
      >
        {/* Hologram scan line */}
        {hovered && (
          <div
            className="absolute inset-x-0 h-[1px] z-20 pointer-events-none"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(34,211,238,0.6), transparent)",
              animation: "holScan 1.5s linear infinite",
            }}
          />
        )}

        {/* Corner brackets */}
        <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-cyan-500/60 z-10 rounded-tl" />
        <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-cyan-500/60 z-10 rounded-tr" />
        <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-cyan-500/60 z-10 rounded-bl" />
        <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-cyan-500/60 z-10 rounded-br" />

        {/* Image */}
        <div className="relative overflow-hidden h-36 sm:h-40">
          <img
            src={sneaker.image}
            alt={sneaker.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

          {/* AI match badge */}
          <div
            className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full text-[0.55rem] uppercase tracking-[0.25em] font-bold"
            style={{
              background: "rgba(34,211,238,0.15)",
              border: "1px solid rgba(34,211,238,0.4)",
              color: "#67e8f9",
            }}
          >
            ◉ AI Pick
          </div>

          {/* Wishlist */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(sneaker);
              window.addToast?.(
                isInWishlist(sneaker.id) ? "Removed from wishlist!" : "Added to wishlist!",
                "success"
              );
            }}
            className="absolute top-2.5 right-2.5 p-1.5 rounded-full transition-all hover:scale-110"
            style={{
              background: "rgba(0,0,0,0.6)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <svg
              className="w-3.5 h-3.5"
              fill={isInWishlist(sneaker.id) ? "#fb7185" : "none"}
              viewBox="0 0 24 24"
              stroke={isInWishlist(sneaker.id) ? "#fb7185" : "#71717a"}
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.545l-1.318-1.227a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>

        {/* Info */}
        <div className="p-3 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-[0.55rem] uppercase tracking-[0.3em] text-cyan-600 font-medium">
                {sneaker.brand}
              </p>
              <p className="text-sm font-semibold text-white leading-tight mt-0.5">
                {sneaker.name}
              </p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-base font-bold text-cyan-400">
                ₹{sneaker.price.toLocaleString()}
              </p>
              <p className="text-[0.6rem] text-emerald-400">
                ★ {sneaker.rating.toFixed(1)}
              </p>
            </div>
          </div>

          {/* Category pill */}
          <div className="flex items-center gap-1.5">
            <span
              className="px-2 py-0.5 rounded-full text-[0.55rem] uppercase tracking-[0.2em]"
              style={{
                background: "rgba(34,211,238,0.06)",
                border: "1px solid rgba(34,211,238,0.2)",
                color: "#a5f3fc",
              }}
            >
              {sneaker.category}
            </span>
          </div>

          {/* Buttons */}
          <div className="pt-1">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart?.(sneaker);
              }}
              className="w-full py-2 rounded-xl text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-black transition-all duration-200"
              style={{
                background: "linear-gradient(135deg, #22d3ee, #06b6d4)",
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes holScan {
          0% { top: 0%; }
          100% { top: 100%; }
        }
      `}</style>
    </div>
  );
}

export function AIRecommendation({
  budget, setBudget,
  style, setStyle,
  activity, setActivity,
  recommended, onRecommend,
  onAddToCart,
}) {
  const [showValidation, setShowValidation] = useState(false);
  const [thinking, setThinking] = useState(false);
  const [thinkingStep, setThinkingStep] = useState(0);
  const containerRef = useRef(null);

  const hasBudget = useMemo(() => Number(budget) > 0, [budget]);
  const hasActivity = useMemo(() => Boolean(activity), [activity]);
  const canRecommend = hasBudget && hasActivity;

  const thinkingSteps = [
    "Scanning 1,247,832 sneaker data points...",
    "Analyzing style preferences and activity patterns...",
    "Cross-referencing budget matrix with inventory...",
    "Neural match engine activated · computing...",
    "Generating personalized recommendations...",
  ];

  const handleRecommend = async () => {
    if (!canRecommend) { setShowValidation(true); return; }
    setShowValidation(false);
    setThinking(true);
    setThinkingStep(0);

    for (let i = 0; i < thinkingSteps.length; i++) {
      await new Promise((r) => setTimeout(r, 900));
      setThinkingStep(i);
    }
    await new Promise((r) => setTimeout(r, 500));
    setThinking(false);
    onRecommend();
  };

  return (
    <section
      id="ai"
      ref={containerRef}
      className="relative rounded-3xl overflow-hidden border"
      style={{
        background: "linear-gradient(160deg, #050505 0%, #0a0a0a 50%, #060606 100%)",
        borderColor: "rgba(34,211,238,0.15)",
        boxShadow: "0 0 60px rgba(34,211,238,0.04), inset 0 1px 0 rgba(34,211,238,0.08)",
      }}
    >
      {/* Neural network background */}
      <div className="absolute top-0 left-0 right-0 h-28 overflow-hidden opacity-30">
        <NeuralBackground thinking={thinking} />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34,211,238,0.8) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34,211,238,0.8) 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
        }}
      />

      {/* Top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at top, rgba(34,211,238,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Corner accents */}
      {[
        "top-0 left-0 border-t border-l rounded-tl-3xl",
        "top-0 right-0 border-t border-r rounded-tr-3xl",
        "bottom-0 left-0 border-b border-l rounded-bl-3xl",
        "bottom-0 right-0 border-b border-r rounded-br-3xl",
      ].map((cls, i) => (
        <div
          key={i}
          className={`absolute w-10 h-10 ${cls} pointer-events-none`}
          style={{ borderColor: "rgba(34,211,238,0.3)" }}
        />
      ))}

      <div className="relative p-5 sm:p-6 space-y-6">

        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5 mb-1">
              {/* Pulsing AI indicator */}
              <div className="relative flex items-center justify-center w-7 h-7 rounded-full"
                style={{ background: "rgba(34,211,238,0.1)", border: "1px solid rgba(34,211,238,0.3)" }}
              >
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <div
                  className="absolute inset-0 rounded-full animate-ping"
                  style={{ background: "rgba(34,211,238,0.15)" }}
                />
              </div>
              <p className="text-[0.6rem] uppercase tracking-[0.45em] text-cyan-400 font-medium">
                AI Sneaker Lab · Neural Engine v2.4
              </p>
            </div>

            <h2 className="font-heading text-2xl sm:text-3xl tracking-[0.14em] uppercase text-white">
              <GlitchText text="Smart" />{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Recommendations
              </span>
            </h2>
          </div>

          {/* Beta badge */}
          <div
            className="shrink-0 relative px-3 py-1.5 rounded-lg text-[0.58rem] uppercase tracking-[0.3em] font-bold overflow-hidden"
            style={{
              background: "rgba(34,211,238,0.06)",
              border: "1px solid rgba(34,211,238,0.3)",
              color: "#67e8f9",
            }}
          >
            <span className="relative z-10">◈ Beta</span>
            <div
              className="absolute inset-0 animate-[shimmer_3s_ease-in-out_infinite]"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(34,211,238,0.1), transparent)",
              }}
            />
          </div>
        </div>

        {/* Scanning bar */}
        <ScanningBar active={thinking} />

        {/* Description */}
        <p className="text-sm text-zinc-400 leading-relaxed max-w-lg">
          Tell{" "}
          <span
            className="font-semibold"
            style={{
              background: "linear-gradient(90deg, #22d3ee, #818cf8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            LaceUp Labs AI
          </span>{" "}
          how you move. Our neural engine scans{" "}
          <span className="text-white font-medium">1.2M+ sneaker data points</span>{" "}
          to find kicks that match your drip, activity, and budget in under 30 seconds.
        </p>

        {/* ── Inputs ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Budget input */}
          <div className="relative group">
            <div
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[0.6rem] text-cyan-500 font-mono pointer-events-none"
            >
              ₹
            </div>
            <input
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder="Enter budget"
              min="1"
              aria-invalid={showValidation && !hasBudget}
              className="w-full pl-7 pr-4 py-3 rounded-xl text-xs font-mono outline-none transition-all duration-300 placeholder:text-zinc-600"
              style={{
                background: "rgba(34,211,238,0.03)",
                border: showValidation && !hasBudget
                  ? "1px solid rgba(239,68,68,0.6)"
                  : "1px solid rgba(34,211,238,0.15)",
                color: "#e4e4e7",
                boxShadow: "inset 0 1px 0 rgba(34,211,238,0.05)",
              }}
              onFocus={e => {
                e.target.style.borderColor = "rgba(34,211,238,0.5)";
                e.target.style.boxShadow = "0 0 20px rgba(34,211,238,0.08), inset 0 1px 0 rgba(34,211,238,0.05)";
              }}
              onBlur={e => {
                e.target.style.borderColor = showValidation && !hasBudget ? "rgba(239,68,68,0.6)" : "rgba(34,211,238,0.15)";
                e.target.style.boxShadow = "inset 0 1px 0 rgba(34,211,238,0.05)";
              }}
            />
          </div>

          {/* Activity select */}
          <div className="relative">
            <select
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              aria-invalid={showValidation && !hasActivity}
              className="w-full px-4 py-3 rounded-xl text-xs font-mono outline-none appearance-none transition-all duration-300 cursor-pointer"
              style={{
                background: "rgba(34,211,238,0.03)",
                border: showValidation && !hasActivity
                  ? "1px solid rgba(239,68,68,0.6)"
                  : "1px solid rgba(34,211,238,0.15)",
                color: activity ? "#e4e4e7" : "#52525b",
                boxShadow: "inset 0 1px 0 rgba(34,211,238,0.05)",
              }}
              onFocus={e => {
                e.target.style.borderColor = "rgba(34,211,238,0.5)";
                e.target.style.boxShadow = "0 0 20px rgba(34,211,238,0.08)";
              }}
              onBlur={e => {
                e.target.style.borderColor = showValidation && !hasActivity ? "rgba(239,68,68,0.6)" : "rgba(34,211,238,0.15)";
                e.target.style.boxShadow = "";
              }}
            >
              <option value="" style={{ background: "#0a0a0a" }}>Select Activity</option>
              {["Running","Basketball","Lifestyle","Streetwear","Training","Hiking"].map(a => (
                <option key={a} value={a} style={{ background: "#0a0a0a" }}>{a}</option>
              ))}
            </select>
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-cyan-600 text-[0.6rem]">
              ▾
            </div>
          </div>
        </div>

        {/* Validation */}
        {showValidation && !canRecommend && (
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-[0.7rem]"
            style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.25)", color: "#fca5a5" }}
          >
            <span>⚠</span>
            Please enter a budget and select an activity to initialize the AI engine.
          </div>
        )}

        {/* ── Style tags ── */}
        <div>
          <p className="text-[0.58rem] uppercase tracking-[0.35em] text-zinc-600 mb-2.5 font-medium">
            Style Parameters
          </p>
          <div className="flex flex-wrap gap-2">
            {STYLE_TAGS.map((tag) => (
              <button
                key={tag.id}
                onClick={() => setStyle(style === tag.id ? "" : tag.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[0.65rem] font-medium uppercase tracking-[0.2em] transition-all duration-200"
                style={{
                  background: style === tag.id ? "rgba(34,211,238,0.12)" : "rgba(255,255,255,0.02)",
                  border: style === tag.id ? "1px solid rgba(34,211,238,0.5)" : "1px solid rgba(63,63,70,0.6)",
                  color: style === tag.id ? "#67e8f9" : "#71717a",
                  boxShadow: style === tag.id ? "0 0 12px rgba(34,211,238,0.1)" : "none",
                }}
              >
                <span className="text-[0.7rem]">{tag.icon}</span>
                {tag.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── AI Generate Button ── */}
        <button
          onClick={handleRecommend}
          disabled={thinking}
          className="group relative w-full py-4 rounded-2xl overflow-hidden transition-all duration-300 disabled:cursor-not-allowed"
          style={{
            background: thinking
              ? "rgba(34,211,238,0.05)"
              : "linear-gradient(135deg, rgba(34,211,238,0.1) 0%, rgba(129,140,248,0.1) 50%, rgba(168,85,247,0.1) 100%)",
            border: thinking
              ? "1px solid rgba(34,211,238,0.3)"
              : "1px solid rgba(34,211,238,0.25)",
          }}
          onMouseEnter={e => {
            if (!thinking) {
              e.currentTarget.style.borderColor = "rgba(34,211,238,0.6)";
              e.currentTarget.style.boxShadow = "0 0 40px rgba(34,211,238,0.1), 0 0 80px rgba(129,140,248,0.05)";
            }
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = "rgba(34,211,238,0.25)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          {/* Button shimmer */}
          {!thinking && (
            <div
              className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(34,211,238,0.08), transparent)",
              }}
            />
          )}

          {/* Button content */}
          <div className="relative flex items-center justify-center gap-3">
            {thinking ? (
              <>
                {/* Spinning loader */}
                <div
                  className="w-5 h-5 rounded-full border-2 animate-spin"
                  style={{ borderColor: "rgba(34,211,238,0.2)", borderTopColor: "#22d3ee" }}
                />
                <div className="text-left">
                  <p className="text-[0.6rem] uppercase tracking-[0.35em] text-cyan-600 mb-0.5">
                    Processing
                  </p>
                  <TypewriterText
                    text={thinkingSteps[thinkingStep]}
                    active={thinking}
                  />
                </div>
              </>
            ) : (
              <>
                {/* AI star icon */}
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(34,211,238,0.15)", border: "1px solid rgba(34,211,238,0.3)" }}
                >
                  <svg className="w-4 h-4 text-cyan-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z"/>
                    <path opacity="0.5" d="M19 14l.75 2.25L22 17l-2.25.75L19 20l-.75-2.25L16 17l2.25-.75L19 14z"/>
                    <path opacity="0.3" d="M5 6l.5 1.5L7 8l-1.5.5L5 10l-.5-1.5L3 8l1.5-.5L5 6z"/>
                  </svg>
                </div>
                <div className="text-left">
                  <p className="text-[0.58rem] uppercase tracking-[0.35em] text-cyan-600 mb-0.5">
                    Neural Engine Ready
                  </p>
                  <p className="text-sm font-semibold text-white tracking-wide">
                    Generate AI Recommendation
                  </p>
                </div>
                {/* Arrow */}
                <svg
                  className="w-4 h-4 text-cyan-500 ml-2 group-hover:translate-x-1 transition-transform"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </>
            )}
          </div>
        </button>

        {/* ── Results ── */}
        {Array.isArray(recommended) && recommended.length > 0 && (
          <div className="space-y-4">
            {/* Results header */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-[1px]" style={{ background: "linear-gradient(90deg, rgba(34,211,238,0.4), transparent)" }} />
              <div
                className="flex items-center gap-2 px-3 py-1 rounded-full text-[0.58rem] uppercase tracking-[0.3em]"
                style={{
                  background: "rgba(34,211,238,0.06)",
                  border: "1px solid rgba(34,211,238,0.2)",
                  color: "#67e8f9",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                {recommended.length} matches found
              </div>
              <div className="flex-1 h-[1px]" style={{ background: "linear-gradient(90deg, transparent, rgba(34,211,238,0.4))" }} />
            </div>

            {/* Cards grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {recommended.map((sneaker) => (
                <HologramCard
                  key={sneaker.id}
                  sneaker={sneaker}
                  onAddToCart={onAddToCart}
                />
              ))}
            </div>

            {/* Bottom note */}
            <p className="text-center text-[0.6rem] text-zinc-600 tracking-[0.2em] uppercase">
              ◈ Results powered by LaceUp Neural Match Engine · Personalized for you
            </p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </section>
  );
}

export default AIRecommendation;
