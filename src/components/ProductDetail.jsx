import { useState, useRef, useEffect } from "react";
import { SIZES } from "../data/sneakers";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

const FEATURES = [
  { icon: "◈", label: "Lightweight", desc: "Ultra-light build" },
  { icon: "◆", label: "Breathable", desc: "Mesh airflow" },
  { icon: "◉", label: "Cushioned", desc: "Responsive foam" },
  { icon: "◇", label: "Grippy", desc: "Rubber outsole" },
];

function VerifiedBadge() {
  return (
    <div
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[0.58rem] uppercase tracking-[0.25em] font-medium"
      style={{
        background: "rgba(34,197,94,0.08)",
        border: "1px solid rgba(34,197,94,0.25)",
        color: "#86efac",
      }}
    >
      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
      Authentic Verified
    </div>
  );
}

function StockPulse() {
  return (
    <div className="flex items-center gap-2">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
      </span>
      <span className="text-[0.6rem] uppercase tracking-[0.3em] text-emerald-400 font-medium">
        In Stock · Ships in 24h
      </span>
    </div>
  );
}

function RatingStars({ rating }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex gap-0.5">
        {[1,2,3,4,5].map((s) => (
          <svg
            key={s}
            className="w-3 h-3"
            fill={s <= Math.round(rating) ? "#fbbf24" : "none"}
            viewBox="0 0 24 24"
            stroke="#fbbf24"
            strokeWidth={1.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
            />
          </svg>
        ))}
      </div>
      <span className="text-[0.65rem] text-amber-400 font-semibold">{rating.toFixed(1)}</span>
      <span className="text-[0.6rem] text-zinc-600">/ 5.0</span>
    </div>
  );
}

function ImageViewer({ sneaker }) {
  const [zoom, setZoom] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const imgRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = imgRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <div
      ref={imgRef}
      className="relative rounded-2xl overflow-hidden border cursor-zoom-in select-none"
      style={{
        background: "linear-gradient(145deg, #0a0a0a, #111111)",
        borderColor: zoom ? "rgba(34,211,238,0.35)" : "rgba(63,63,70,0.5)",
        boxShadow: zoom
          ? "0 0 40px rgba(34,211,238,0.08), inset 0 1px 0 rgba(34,211,238,0.1)"
          : "inset 0 1px 0 rgba(255,255,255,0.03)",
        transition: "border-color 0.3s, box-shadow 0.3s",
      }}
      onMouseEnter={() => setZoom(true)}
      onMouseLeave={() => setZoom(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Corner brackets */}
      {["top-3 left-3 border-t border-l","top-3 right-3 border-t border-r",
        "bottom-3 left-3 border-b border-l","bottom-3 right-3 border-b border-r"].map((cls, i) => (
        <div
          key={i}
          className={`absolute w-5 h-5 z-10 pointer-events-none ${cls} rounded-sm transition-colors duration-300`}
          style={{ borderColor: zoom ? "rgba(34,211,238,0.5)" : "rgba(34,211,238,0.2)" }}
        />
      ))}

      {/* Scan line on hover */}
      {zoom && (
        <div
          className="absolute inset-x-0 h-[1px] z-20 pointer-events-none"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(34,211,238,0.5), transparent)",
            animation: "scanDown 2s linear infinite",
          }}
        />
      )}

      {/* Badge top-left */}
      <div className="absolute top-3.5 left-3.5 z-10">
        <div
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[0.55rem] uppercase tracking-[0.25em] font-bold"
          style={{
            background: "rgba(255,59,48,0.12)",
            border: "1px solid rgba(255,59,48,0.35)",
            color: "#fca5a5",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          Featured Drop
        </div>
      </div>

      {/* Zoom hint */}
      <div
        className="absolute top-3.5 right-3.5 z-10 px-2 py-1 rounded-lg text-[0.55rem] uppercase tracking-[0.2em] transition-opacity duration-300"
        style={{
          background: "rgba(0,0,0,0.7)",
          border: "1px solid rgba(255,255,255,0.08)",
          color: "#71717a",
          opacity: zoom ? 0 : 1,
        }}
      >
        ⊕ Hover to zoom
      </div>

      {/* Image */}
      <div className="overflow-hidden h-56 sm:h-80">
        <img
          src={sneaker.image}
          alt={sneaker.name}
          className="w-full h-full object-cover transition-transform duration-500"
          style={{
            transform: zoom ? "scale(1.12)" : "scale(1)",
            transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
          }}
        />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
      </div>

      <style>{`
        @keyframes scanDown {
          0% { top: 0%; }
          100% { top: 100%; }
        }
      `}</style>
    </div>
  );
}

export function ProductDetail({ sneaker, requireSizeSelection, onRequireSizeSelectionChange }) {
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const sectionRef = useRef(null);
  const wishlisted = isInWishlist(sneaker.id);

  useEffect(() => {
    if (window.requireSizeSelection && window.selectedSneaker) {
      window.dispatchEvent(new CustomEvent("wishlistToCart", { detail: window.selectedSneaker }));
      window.requireSizeSelection = false;
      window.selectedSneaker = null;
    }
  }, []);

  // Reset size when sneaker changes
  useEffect(() => {
    setSelectedSize(null);
    setQuantity(1);
    setIsSuccess(false);
  }, [sneaker.id]);

  // When the flow requires a size pick, clear previous size and bring detail into view
  useEffect(() => {
    if (requireSizeSelection) {
      setSelectedSize(null);
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [requireSizeSelection]);

  const handleAddToCart = async () => {
    if (!selectedSize) {
      onRequireSizeSelectionChange?.(true);
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    setIsLoading(true);
    setIsSuccess(false);
    setTimeout(() => {
      addToCart(sneaker, selectedSize, quantity);
      window.addToast("Added to cart!", "success");
      setIsSuccess(true);
      setIsLoading(false);
      onRequireSizeSelectionChange?.(false);
      setTimeout(() => setIsSuccess(false), 2500);
    }, 900);
  };

  return (
    <section
      id="product-detail"
      ref={sectionRef}
      className="relative rounded-3xl overflow-hidden border flex flex-col min-h-[360px] sm:min-h-[420px]"
      style={{
        background: "linear-gradient(160deg, #050505 0%, #0a0a0a 60%, #060606 100%)",
        borderColor: "rgba(63,63,70,0.5)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03)",
      }}
    >
      {/* Grid bg */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)
          `,
          backgroundSize: "28px 28px",
        }}
      />

      {/* Top glow */}
      <div
        className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 30% 0%, rgba(255,59,48,0.07) 0%, transparent 65%)",
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
          className={`absolute w-8 h-8 pointer-events-none ${cls}`}
          style={{ borderColor: "rgba(255,59,48,0.2)" }}
        />
      ))}

      <div className="relative p-4 sm:p-6 space-y-5 flex flex-col flex-1">

        {/* ── Header ── */}
        <div className="space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
            <div className="space-y-1.5">
              <p className="text-[0.58rem] uppercase tracking-[0.45em] text-zinc-600 font-medium">
                Product Detail
              </p>
              <h2 className="font-heading text-2xl sm:text-3xl tracking-[0.12em] uppercase text-white leading-tight">
                {sneaker.name}
              </h2>
              <VerifiedBadge />
            </div>

            {/* Rating */}
            <div
              className="shrink-0 flex flex-col items-start sm:items-end gap-1.5 px-3 py-2 rounded-xl"
              style={{
                background: "rgba(251,191,36,0.05)",
                border: "1px solid rgba(251,191,36,0.15)",
              }}
            >
              <RatingStars rating={sneaker.rating} />
              <p className="text-[0.55rem] text-zinc-600 uppercase tracking-[0.2em]">
                Premium Quality
              </p>
            </div>
          </div>

          <StockPulse />
        </div>

        {/* ── Image ── */}
        <ImageViewer sneaker={sneaker} />

        {/* ── Description ── */}
        <p className="text-xs text-zinc-400 leading-relaxed">
          Engineered for modern streets and high-intensity sessions. Built with
          responsive cushioning, breathable mesh, and a sculpted midsole that keeps
          you locked whether you're{" "}
          <span className="text-zinc-200 font-medium">running full court</span>,
          clocking miles, or{" "}
          <span className="text-zinc-200 font-medium">posting up fit pics</span>.
        </p>

        {/* ── Brand & Category pills ── */}
        <div className="flex flex-wrap items-center gap-2">
          {[
            { label: "Brand", value: sneaker.brand },
            { label: "Category", value: sneaker.category },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center gap-2">
              <span className="text-[0.58rem] uppercase tracking-[0.3em] text-zinc-600">
                {label}
              </span>
              <span
                className="px-3 py-1 rounded-lg text-[0.65rem] font-medium text-zinc-300"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(63,63,70,0.6)",
                }}
              >
                {value}
              </span>
            </div>
          ))}
        </div>

        {/* ── Feature chips ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {FEATURES.map((f) => (
            <div
              key={f.label}
              className="flex flex-col gap-1 px-3 py-2.5 rounded-xl"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(63,63,70,0.4)",
              }}
            >
              <span className="text-red-400 text-xs">{f.icon}</span>
              <span className="text-[0.65rem] font-semibold text-white">{f.label}</span>
              <span className="text-[0.58rem] text-zinc-600">{f.desc}</span>
            </div>
          ))}
        </div>

        {/* ── Size Selection ── */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <label className="text-[0.6rem] uppercase tracking-[0.35em] text-zinc-500 font-medium">
              Select Size{" "}
              <span className="text-red-400 ml-0.5">*</span>
            </label>
            {selectedSize && (
              <span
                className="text-[0.58rem] uppercase tracking-[0.25em] px-2 py-0.5 rounded-md font-medium"
                style={{
                  background: "rgba(255,59,48,0.1)",
                  border: "1px solid rgba(255,59,48,0.3)",
                  color: "#fca5a5",
                }}
              >
                US {selectedSize} Selected
              </span>
            )}
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-5 gap-1.5">
            {SIZES.map((size) => {
              const isSelected = selectedSize === size;
              return (
                <button
                  key={size}
                  type="button"
                  onClick={() => {
                    setSelectedSize(size);
                    onRequireSizeSelectionChange?.(false);
                  }}
                  className="relative py-2.5 rounded-xl text-[0.65rem] font-medium transition-all duration-200 overflow-hidden"
                  style={{
                    background: isSelected
                      ? "rgba(255,59,48,0.12)"
                      : "rgba(255,255,255,0.02)",
                    border: isSelected
                      ? "1px solid rgba(255,59,48,0.5)"
                      : "1px solid rgba(63,63,70,0.5)",
                    color: isSelected ? "#fca5a5" : "#71717a",
                    boxShadow: isSelected
                      ? "0 0 16px rgba(255,59,48,0.1)"
                      : "none",
                  }}
                  onMouseEnter={e => {
                    if (!isSelected) {
                      e.currentTarget.style.borderColor = "rgba(255,59,48,0.3)";
                      e.currentTarget.style.color = "#e4e4e7";
                      e.currentTarget.style.background = "rgba(255,59,48,0.05)";
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isSelected) {
                      e.currentTarget.style.borderColor = "rgba(63,63,70,0.5)";
                      e.currentTarget.style.color = "#71717a";
                      e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                    }
                  }}
                >
                  {isSelected && (
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: "radial-gradient(circle at center, rgba(255,59,48,0.15), transparent 70%)",
                      }}
                    />
                  )}
                  <span className="relative">{size}</span>
                </button>
              );
            })}
          </div>

          {requireSizeSelection && !selectedSize && (
            <div
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-[0.65rem]"
              style={{
                background: "rgba(239,68,68,0.08)",
                border: "1px solid rgba(239,68,68,0.25)",
                color: "#fca5a5",
              }}
            >
              <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
              </svg>
              Please select a size to continue.
            </div>
          )}
        </div>

        {/* ── Price + Actions ── */}
        <div className="mt-auto space-y-4 pt-2">
          {/* Divider */}
          <div
            className="h-[1px] w-full"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(255,59,48,0.3), transparent)",
            }}
          />

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

            {/* Price block */}
            <div className="space-y-1">
              <p className="text-[0.58rem] uppercase tracking-[0.35em] text-zinc-600 font-medium">
                Price
              </p>
              <p
                className="text-3xl font-bold leading-none"
                style={{
                  background: "linear-gradient(135deg, #ff3b30, #ff6b35)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                ₹{sneaker.price.toLocaleString()}
              </p>
              <StockPulse />
            </div>

            {/* Quantity */}
            <div className="flex flex-col gap-1">
              <p className="text-[0.55rem] uppercase tracking-[0.3em] text-zinc-600">
                Qty
              </p>
              <div
                className="flex items-center rounded-xl overflow-hidden"
                style={{ border: "1px solid rgba(63,63,70,0.5)" }}
              >
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-9 h-9 flex items-center justify-center text-zinc-400 transition-all duration-150 text-sm font-medium"
                  style={{ background: "rgba(255,255,255,0.02)" }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(255,59,48,0.08)"}
                  onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.02)"}
                >
                  −
                </button>
                <span
                  className="w-10 text-center text-sm font-semibold text-white"
                  style={{ borderLeft: "1px solid rgba(63,63,70,0.4)", borderRight: "1px solid rgba(63,63,70,0.4)" }}
                >
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-9 h-9 flex items-center justify-center text-zinc-400 transition-all duration-150 text-sm font-medium"
                  style={{ background: "rgba(255,255,255,0.02)" }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(255,59,48,0.08)"}
                  onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.02)"}
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-2.5">

            {/* Wishlist */}
            <button
              onClick={() => {
                toggleWishlist(sneaker);
                window.addToast(
                  wishlisted ? "Removed from wishlist!" : "Added to wishlist!",
                  "success"
                );
              }}
              className="group flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-300"
              style={{
                background: wishlisted ? "rgba(251,113,133,0.1)" : "rgba(255,255,255,0.03)",
                border: wishlisted
                  ? "1px solid rgba(251,113,133,0.35)"
                  : "1px solid rgba(63,63,70,0.5)",
                color: wishlisted ? "#fda4af" : "#71717a",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = "rgba(251,113,133,0.4)";
                e.currentTarget.style.color = "#fda4af";
                e.currentTarget.style.background = "rgba(251,113,133,0.08)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = wishlisted ? "rgba(251,113,133,0.35)" : "rgba(63,63,70,0.5)";
                e.currentTarget.style.color = wishlisted ? "#fda4af" : "#71717a";
                e.currentTarget.style.background = wishlisted ? "rgba(251,113,133,0.1)" : "rgba(255,255,255,0.03)";
              }}
            >
              <svg
                className="w-4 h-4 transition-transform duration-200 group-hover:scale-110"
                fill={wishlisted ? "currentColor" : "none"}
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.545l-1.318-1.227a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              {wishlisted ? "Wishlisted" : "Wishlist"}
            </button>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              disabled={isLoading}
              className="group relative flex-[2] flex items-center justify-center gap-2.5 py-3 rounded-xl text-xs font-bold uppercase tracking-[0.22em] overflow-hidden transition-all duration-300 disabled:cursor-not-allowed"
              style={{
                background: isSuccess
                  ? "linear-gradient(135deg, rgba(34,197,94,0.15), rgba(16,185,129,0.1))"
                  : "linear-gradient(135deg, rgba(255,59,48,0.15), rgba(255,107,53,0.1))",
                border: isSuccess
                  ? "1px solid rgba(34,197,94,0.4)"
                  : "1px solid rgba(255,59,48,0.35)",
                color: isSuccess ? "#86efac" : "#fca5a5",
                boxShadow: isSuccess
                  ? "0 0 30px rgba(34,197,94,0.1)"
                  : "0 0 30px rgba(255,59,48,0.08)",
              }}
              onMouseEnter={e => {
                if (!isLoading && !isSuccess) {
                  e.currentTarget.style.background = "linear-gradient(135deg, rgba(255,59,48,0.22), rgba(255,107,53,0.15))";
                  e.currentTarget.style.borderColor = "rgba(255,59,48,0.6)";
                  e.currentTarget.style.boxShadow = "0 0 40px rgba(255,59,48,0.15)";
                }
              }}
              onMouseLeave={e => {
                if (!isLoading && !isSuccess) {
                  e.currentTarget.style.background = "linear-gradient(135deg, rgba(255,59,48,0.15), rgba(255,107,53,0.1))";
                  e.currentTarget.style.borderColor = "rgba(255,59,48,0.35)";
                  e.currentTarget.style.boxShadow = "0 0 30px rgba(255,59,48,0.08)";
                }
              }}
            >
              {/* Shimmer */}
              {!isLoading && !isSuccess && (
                <div
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(255,59,48,0.1), transparent)",
                  }}
                />
              )}

              <span className="relative flex items-center gap-2.5">
                {isLoading ? (
                  <>
                    <div
                      className="w-4 h-4 rounded-full border-2 animate-spin"
                      style={{ borderColor: "rgba(252,165,165,0.3)", borderTopColor: "#fca5a5" }}
                    />
                    <span>Processing...</span>
                  </>
                ) : isSuccess ? (
                  <>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                    Added to Cart!
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round"
                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.886-7.158a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                      />
                    </svg>
                    Add to Cart
                    <svg
                      className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform"
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </>
                )}
              </span>
            </button>
          </div>

          {/* Trust row */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-1">
            {[
              { icon: "🔒", text: "Secure Checkout" },
              { icon: "↩", text: "30-Day Returns" },
              { icon: "🚚", text: "Free Shipping" },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-1.5">
                <span className="text-xs">{icon}</span>
                <span className="text-[0.58rem] uppercase tracking-[0.2em] text-zinc-600">
                  {text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetail;
