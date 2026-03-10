import { useState } from 'react';
import { SIZES } from '../data/sneakers';

export function ProductDetail({ sneaker }) {
  const [selectedSize, setSelectedSize] = useState(null);

  return (
    <section
      id="product-detail"
      className="rounded-3xl bg-card/80 border border-zinc-800/80 p-5 space-y-4"
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[0.65rem] uppercase tracking-[0.32em] text-zinc-500">
            Product Detail
          </p>
          <h2 className="font-heading text-2xl tracking-[0.16em] uppercase">
            {sneaker.name}
          </h2>
        </div>
        <span className="text-xs text-zinc-400">
          ★ {sneaker.rating.toFixed(1)} · Premium
        </span>
      </div>
      <p className="text-xs text-zinc-300 leading-relaxed">
        Engineered for modern streets and high-intensity sessions. Built
        with responsive cushioning, breathable mesh and a sculpted
        midsole that keeps you locked whether you&apos;re running full
        court, clocking miles, or posting up fit pics.
      </p>
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
      <div className="flex flex-wrap gap-3 text-xs">
        <div className="flex-1 min-w-[9rem] space-y-1">
          <label className="block text-[0.65rem] uppercase tracking-[0.24em] text-zinc-400">
            Select Size (US)
          </label>
          <div className="grid grid-cols-5 gap-1.5">
            {SIZES.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setSelectedSize(size)}
                className={`rounded-xl bg-black/70 border py-2 text-[0.7rem] transition-colors ${
                  selectedSize === size 
                    ? 'border-accent text-accent' 
                    : 'border-zinc-800 hover:border-accent hover:text-accent'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between gap-3 pt-1">
        <div>
          <p className="text-[0.7rem] text-zinc-400 uppercase tracking-[0.22em]">
            Price
          </p>
          <p className="text-2xl font-semibold text-accent">
            ${sneaker.price}
          </p>
        </div>
        <div className="flex gap-2">
          <button className="rounded-full border border-zinc-700 bg-black/70 px-4 py-2 text-[0.65rem] uppercase tracking-[0.24em] hover:border-accent hover:text-accent transition-colors">
            Wishlist
          </button>
          <button className="rounded-full bg-accent px-4 py-2 text-[0.65rem] uppercase tracking-[0.24em] text-black font-semibold shadow-glow hover:brightness-110 transition-transform hover:-translate-y-0.5">
            Add to Cart
          </button>
        </div>
      </div>
    </section>
  );
}

export default ProductDetail;

