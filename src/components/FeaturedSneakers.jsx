import { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useWishlist } from '../context/WishlistContext';

/* ─── Tilt card hook ─── */
function useTilt() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-8, 8]);
  const springX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 200, damping: 20 });

  const handleMouse = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleLeave = () => { x.set(0); y.set(0); };

  return { rotateX: springX, rotateY: springY, handleMouse, handleLeave };
}

/* ─── Animated corner brackets ─── */
function CornerBrackets({ active }) {
  return (
    <>
      {[
        'top-0 left-0 border-t-2 border-l-2 rounded-tl-xl',
        'top-0 right-0 border-t-2 border-r-2 rounded-tr-xl',
        'bottom-0 left-0 border-b-2 border-l-2 rounded-bl-xl',
        'bottom-0 right-0 border-b-2 border-r-2 rounded-br-xl',
      ].map((cls, i) => (
        <motion.span
          key={i}
          className={`absolute w-4 h-4 ${cls} border-orange-500 transition-opacity duration-300`}
          style={{ opacity: active ? 1 : 0 }}
        />
      ))}
    </>
  );
}

/* ─── Single sneaker card ─── */
function SneakerCard({ sneaker, index, onSelectSneaker, onAddToCart }) {
  const [added, setAdded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [ripples, setRipples] = useState([]);
  const { toggleWishlist, isInWishlist } = useWishlist();
  const tilt = useTilt();
  const wished = isInWishlist(sneaker.id);

  const handleAdd = (e) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const r = { id: Date.now(), x: e.clientX - rect.left, y: e.clientY - rect.top };
    setRipples((prev) => [...prev, r]);
    setTimeout(() => setRipples((prev) => prev.filter((p) => p.id !== r.id)), 700);
    onAddToCart ? onAddToCart(sneaker) : onSelectSneaker(sneaker);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  const handleWish = (e) => {
    e.stopPropagation();
    toggleWishlist(sneaker);
    window.addToast?.(wished ? 'Removed from wishlist' : 'Added to wishlist', 'success');
  };

  return (
    <motion.div
      className="relative flex-shrink-0 w-[14.5rem] sm:w-[17rem] lg:w-[19rem] snap-start"
      style={{ perspective: 900 }}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); tilt.handleLeave(); }}
      onMouseMove={tilt.handleMouse}
    >
      <motion.button
        type="button"
        onClick={() => onSelectSneaker(sneaker)}
        className="relative w-full rounded-2xl overflow-hidden text-left focus:outline-none cursor-pointer group"
        style={{
          rotateX: tilt.rotateX,
          rotateY: tilt.rotateY,
          transformStyle: 'preserve-3d',
          background: 'linear-gradient(145deg, #1a1a1a 0%, #111111 60%, #0d0d0d 100%)',
          border: hovered ? '1px solid rgba(249,115,22,0.5)' : '1px solid rgba(255,255,255,0.06)',
          boxShadow: hovered
            ? '0 0 0 1px rgba(249,115,22,0.2), 0 20px 60px rgba(249,115,22,0.15), 0 8px 24px rgba(0,0,0,0.8)'
            : '0 4px 24px rgba(0,0,0,0.6)',
          transition: 'border 0.3s, box-shadow 0.3s',
        }}
      >
        {/* Corner brackets */}
        <CornerBrackets active={hovered} />

        {/* ── Image area ── */}
        <div className="relative overflow-hidden h-44 sm:h-52">
          <motion.img
            src={sneaker.image}
            alt={sneaker.name}
            className="w-full h-full object-cover"
            animate={{ scale: hovered ? 1.08 : 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />

          {/* Dark gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

          {/* Scanline overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)',
            }}
          />

          {/* Orange glow on hover */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 50% 120%, rgba(249,115,22,0.18) 0%, transparent 70%)' }}
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Category badge */}
          <span className="absolute top-3 left-3 rounded-full px-3 py-1 text-[0.58rem] uppercase tracking-[0.26em] text-zinc-300 backdrop-blur-md"
            style={{ background: 'rgba(0,0,0,0.65)', border: '1px solid rgba(255,255,255,0.08)' }}>
            {sneaker.category}
          </span>

          {/* DROP badge */}
          <motion.span
            className="absolute top-3 right-3 rounded-full px-3 py-1 text-[0.58rem] uppercase tracking-[0.2em] font-bold text-black"
            style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)' }}
            animate={{ scale: hovered ? [1, 1.08, 1] : 1 }}
            transition={{ duration: 0.4 }}
          >
            New Drop
          </motion.span>

          {/* Wishlist button */}
          <motion.button
            onClick={handleWish}
            whileTap={{ scale: 0.85 }}
            className="absolute bottom-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200"
            style={{
              background: wished ? 'rgba(239,68,68,0.2)' : 'rgba(0,0,0,0.65)',
              border: wished ? '1px solid rgba(239,68,68,0.5)' : '1px solid rgba(255,255,255,0.1)',
              backdropFilter: 'blur(8px)',
              color: wished ? '#f87171' : '#71717a',
            }}
            title={wished ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <svg className="w-3.5 h-3.5" fill={wished ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </motion.button>
        </div>

        {/* ── Body ── */}
        <div className="p-4 flex flex-col gap-3">
          {/* Index number watermark */}
          <span
            className="absolute top-[9.5rem] sm:top-[11.5rem] left-4 text-[4rem] font-black leading-none select-none pointer-events-none"
            style={{
              color: 'transparent',
              WebkitTextStroke: '1px rgba(249,115,22,0.12)',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>

          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[0.58rem] uppercase tracking-[0.3em] mb-0.5" style={{ color: '#f97316' }}>
                {sneaker.brand}
              </p>
              <p className="font-semibold text-sm text-zinc-100 leading-snug line-clamp-2">
                {sneaker.name}
              </p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-[0.52rem] text-zinc-600 uppercase tracking-[0.2em] mb-0.5">From</p>
              <p className="text-base font-bold leading-none" style={{ color: '#f97316' }}>
                ₹{sneaker.price.toLocaleString('en-IN')}
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, rgba(249,115,22,0.4), transparent)' }} />

          {/* Rating + CTA */}
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 text-[0.62rem] text-zinc-500">
              <svg className="w-3 h-3" viewBox="0 0 20 20" fill="#f97316">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {sneaker.rating.toFixed(1)}
            </span>

            {/* Add to cart with ripple */}
            <motion.button
              onClick={handleAdd}
              whileTap={{ scale: 0.96 }}
              className="relative flex-1 rounded-xl py-2.5 text-[0.58rem] uppercase tracking-[0.24em] font-bold overflow-hidden transition-all duration-300"
              style={added ? {
                background: 'rgba(34,197,94,0.15)',
                border: '1px solid rgba(34,197,94,0.4)',
                color: '#86efac',
              } : hovered ? {
                background: 'linear-gradient(135deg, #f97316, #ea580c)',
                border: '1px solid transparent',
                color: '#000',
                boxShadow: '0 0 20px rgba(249,115,22,0.4)',
              } : {
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#71717a',
              }}
            >
              {ripples.map((r) => (
                <motion.span
                  key={r.id}
                  className="absolute rounded-full pointer-events-none"
                  style={{ left: r.x - 40, top: r.y - 40, width: 80, height: 80, background: 'rgba(249,115,22,0.35)' }}
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: 3, opacity: 0 }}
                  transition={{ duration: 0.65, ease: 'easeOut' }}
                />
              ))}
              {added ? '✓ Added' : 'Add to Cart'}
            </motion.button>
          </div>
        </div>
      </motion.button>
    </motion.div>
  );
}

/* ─── Main section ─── */
export function FeaturedSneakers({ sneakers, onSelectSneaker, onViewAll, onAddToCart }) {
  return (
    <section
      id="featured"
      className="relative rounded-3xl p-5 sm:p-8 space-y-6 overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #111111 0%, #0a0a0a 100%)',
        border: '1px solid rgba(249,115,22,0.12)',
        boxShadow: '0 0 60px rgba(249,115,22,0.05), inset 0 1px 0 rgba(255,255,255,0.04)',
      }}
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(249,115,22,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.6) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Top-right corner glow */}
      <div
        className="absolute -top-20 -right-20 w-64 h-64 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 70%)' }}
      />

      {/* ── Header ── */}
      <div className="relative flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            {/* Live pulse dot */}
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: '#f97316' }} />
              <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: '#f97316' }} />
            </span>
            <p className="text-[0.58rem] uppercase tracking-[0.36em] text-zinc-600">Curated Heat</p>
          </div>

          <h2
            className="font-black text-[2rem] sm:text-[2.6rem] leading-none tracking-tight uppercase"
            style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #f97316 50%, #ea580c 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Featured
          </h2>
          <h2
            className="font-black text-[2rem] sm:text-[2.6rem] leading-none tracking-tight uppercase"
            style={{
              color: 'transparent',
              WebkitTextStroke: '1.5px rgba(249,115,22,0.45)',
            }}
          >
            Sneakers
          </h2>
        </div>

        <motion.button
          onClick={onViewAll}
          whileHover={{ x: 4 }}
          className="hidden sm:inline-flex items-center gap-2 text-[0.58rem] uppercase tracking-[0.28em] transition-colors group"
          style={{ color: '#f97316' }}
        >
          View all drops
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </motion.button>
      </div>

      {/* ── Cards track ── */}
      <div className="relative flex gap-5 overflow-x-auto pb-3 pt-1 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-orange-900/60 scrollbar-track-transparent -mx-1 px-1">
        {sneakers.map((sneaker, index) => (
          <SneakerCard
            key={sneaker.id}
            sneaker={sneaker}
            index={index}
            onSelectSneaker={onSelectSneaker}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>

      {/* Bottom orange glow bar */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-2/3 pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(249,115,22,0.5), transparent)' }}
      />
    </section>
  );
}

export default FeaturedSneakers;
