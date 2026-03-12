import { useState } from "react";
import { SIZES } from "../data/sneakers";
import { useCart } from "../context/CartContext";

export function ProductDetail({ sneaker }) {
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { addToCart } = useCart();
  const sectionRef = useRef(null);

  const increaseQty = () => setQuantity((q) => q + 1);
  const decreaseQty = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const handleAddToCart = async () => {
    if (!selectedSize) {
      // Better UX: visual feedback or toast, but for now early return
      return;
    }
    setIsLoading(true);
    setIsSuccess(false);
    // Simulate async add
    setTimeout(() => {
      addToCart(sneaker, selectedSize, quantity);
      setIsSuccess(true);
      setIsLoading(false);
      // Smooth redirect/scroll to this section
      sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Reset success after 2s
      setTimeout(() => setIsSuccess(false), 2000);
    }, 800);
  };

  return (
    <section
      id="product-detail"
      ref={sectionRef}
      className="rounded-3xl bg-card/80 border border-zinc-800/80 p-5 space-y-4 min-h-[420px] flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[0.65rem] uppercase tracking-[0.32em] text-zinc-500">
            Product Detail
          </p>

          <h2 className="font-heading text-2xl tracking-[0.16em] uppercase">
            {sneaker.name}
          </h2>

          <span className="text-[10px] text-zinc-400">
            ✔ Authentic Verified
          </span>
        </div>

        <span className="text-xs text-zinc-400">
          ★ {sneaker.rating.toFixed(1)} · Premium
        </span>
      </div>

      {/* Product Image */}
      <div className="rounded-2xl overflow-hidden bg-black/70 border border-zinc-800">
        <img
          src={sneaker.image}
          alt={sneaker.name}
          className="w-full h-125 object-cover"
        />
      </div>

      {/* Description */}
      <p className="text-xs text-zinc-300 leading-relaxed">
        Engineered for modern streets and high-intensity sessions. Built with
        responsive cushioning, breathable mesh and a sculpted midsole that
        keeps you locked whether you're running full court, clocking miles,
        or posting up fit pics.
      </p>

      {/* Brand & Category */}
      <div className="flex flex-wrap items-center gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-zinc-400 uppercase tracking-[0.22em] text-[0.65rem]">
            Brand
          </span>
          <span className="rounded-full bg-black/70 border border-zinc-700 px-3 py-1">
            {sneaker.brand}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-zinc-400 uppercase tracking-[0.22em] text-[0.65rem]">
            Category
          </span>
          <span className="rounded-full bg-black/70 border border-zinc-700 px-3 py-1">
            {sneaker.category}
          </span>
        </div>
      </div>

      {/* Size Selection */}
      <div className="space-y-1">
        <label className="block text-[0.65rem] uppercase tracking-[0.24em] text-zinc-400">
          Select Size (US) <span className="text-red-400">*</span>
        </label>

        <div className="grid grid-cols-5 gap-1.5">
          {SIZES.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => setSelectedSize(size)}
              className={`rounded-lg py-2 text-[0.7rem] border transition-all ${
                selectedSize === size
                  ? "border-accent text-accent bg-accent/10"
                  : "border-zinc-800 bg-black/60 hover:border-accent hover:text-accent"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Sneaker Features */}
      <div className="flex flex-wrap gap-2 text-[10px]">
        <span className="px-2 py-1 border border-zinc-700 rounded-full">
          Lightweight
        </span>
        <span className="px-2 py-1 border border-zinc-700 rounded-full">
          Breathable
        </span>
        <span className="px-2 py-1 border border-zinc-700 rounded-full">
          Cushioned
        </span>
      </div>

      {/* Price + Actions */}
      <div className="flex items-center justify-between gap-3 pt-1 mt-auto">
        <div>
          <p className="text-[0.7rem] text-zinc-400 uppercase tracking-[0.22em]">
            Price
          </p>

          <p className="text-2xl font-semibold text-accent">
            ₹{sneaker.price.toLocaleString()}
          </p>

          <p className="text-[0.65rem] text-zinc-400 uppercase tracking-wider">
            In Stock
          </p>
        </div>

        {/* Quantity Selector */}
        <div className="flex items-center border border-zinc-700 rounded-lg overflow-hidden text-xs">
          <button
            onClick={decreaseQty}
            className="px-3 py-1 hover:bg-zinc-800"
          >
            -
          </button>

          <span className="px-3">{quantity}</span>

          <button
            onClick={increaseQty}
            className="px-3 py-1 hover:bg-zinc-800"
          >
            +
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button className="btn-secondary" onClick={() => { alert('Added to wishlist!') }}>
            Wishlist
          </button>

          <button 
            onClick={handleAddToCart}
            disabled={isLoading || !selectedSize}
            className={`flex-1 btn-primary transition-all ${
              isSuccess ? 'bg-green-600 border-green-500 text-white hover:bg-green-700' : ''
            } ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Adding...
              </span>
            ) : isSuccess ? (
              'Added! ✓'
            ) : (
              'Add to Cart'
            )}
          </button>
        </div>
      </div>
    </section>
  );
}

export default ProductDetail;

