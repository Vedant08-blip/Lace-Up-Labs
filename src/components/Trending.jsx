import { useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { useWishlist } from '../context/WishlistContext';

/* ─── Tilt hook ─── */
function useTilt() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [7, -7]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-7, 7]);
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

/* ─── Rank badge ─── */
function RankBadge({ rank }) {
  const isTop = rank <= 3;
  return (
    <motion.div
      initial={{ scale: 0, rotate: -15 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ delay: rank * 0.06 + 0.2, duration: 0.4, ease: 'backOut' }}
      className="absolute top-2.5 left-2.5 w-7 h-7 rounded-full flex items-center justify-center z-10"
      style={{
        background: isTop
          ? 'linear-gradient(135deg, #ff3b30, #ff3b30)'
          : 'rgba(0,0,0,0.7)',
        border: isTop ? 'none' : '1px solid rgba(255,255,255,0.1)',
        backdropFilter: 'blur(8px)',
        boxShadow: isTop ? '0 0 14px rgba(249,115,22,0.5)' : 'none',
      }}
    >
      <span
        className="text-[0.55rem] font-black leading-none"
        style={{ color: isTop ? '#000' : '#71717a' }}
      >
        #{rank}
      </span>
    </motion.div>
  );
}

/* ─── Trend score bar ─── */
function TrendBar({ score, index }) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <span className="text-[0.48rem] uppercase tracking-[0.28em] text-zinc-600">Trend Score</span>
        <span className="text-[0.52rem] font-bold" style={{ color: '#ff3b30' }}>{score}%</span>
      </div>
      <div className="relative h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ background: 'linear-gradient(90deg, #ff3b30, #ff3b30)' }}
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ delay: index * 0.08 + 0.5, duration: 0.9, ease: 'easeOut' }}
        />
        {/* Shimmer */}
        <motion.div
          className="absolute inset-y-0 w-6 rounded-full"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)' }}
          animate={{ left: ['-20%', '120%'] }}
          transition={{ delay: index * 0.08 + 1.4, duration: 1.2, ease: 'easeInOut', repeat: Infinity, repeatDelay: 3 }}
        />
      </div>
    </div>
  );
}

/* ─── Single card ─── */
function TrendingCard({ sneaker, index, onSelectSneaker, onAddToCart }) {
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
    setRipples(p => [...p, r]);
    setTimeout(() => setRipples(p => p.filter(x => x.id !== r.id)), 700);
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
      className="relative flex-shrink-0 snap-start w-[10.5rem] sm:w-[12.5rem]"
      style={{ perspective: 900 }}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); tilt.handleLeave(); }}
      onMouseMove={tilt.handleMouse}
    >
      {/* Glow bloom */}
      <motion.div
        className="absolute -inset-3 rounded-3xl pointer-events-none blur-2xl"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ background: 'radial-gradient(ellipse, rgba(249,115,22,0.22) 0%, transparent 70%)' }}
      />

      <motion.button
        type="button"
        onClick={() => onSelectSneaker(sneaker)}
        className="relative w-full rounded-[18px] overflow-hidden text-left focus:outline-none cursor-pointer"
        style={{
          rotateX: tilt.rotateX,
          rotateY: tilt.rotateY,
          transformStyle: 'preserve-3d',
          background: 'linear-gradient(160deg, #1c1c1c 0%, #111 60%, #0d0d0d 100%)',
          border: hovered ? '1px solid rgba(249,115,22,0.45)' : '1px solid rgba(255,255,255,0.06)',
          boxShadow: hovered
            ? '0 20px 50px rgba(249,115,22,0.18), 0 6px 20px rgba(0,0,0,0.9)'
            : '0 4px 20px rgba(0,0,0,0.7)',
          transition: 'border 0.3s, box-shadow 0.3s',
        }}
      >
        {/* Top sheen */}
        <div
          className="absolute top-0 left-0 right-0 h-px pointer-events-none z-10"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.09), transparent)' }}
        />

        {/* Corner brackets */}
        {['top-0 left-0 border-t border-l rounded-tl-[18px]',
          'top-0 right-0 border-t border-r rounded-tr-[18px]',
          'bottom-0 left-0 border-b border-l rounded-bl-[18px]',
          'bottom-0 right-0 border-b border-r rounded-br-[18px]',
        ].map((cls, i) => (
          <motion.span
            key={i}
            className={`absolute w-4 h-4 ${cls} border-accent pointer-events-none z-10`}
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          />
        ))}

        {/* Scanlines */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.022] z-10"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,1) 2px, rgba(0,0,0,1) 4px)',
          }}
        />

        {/* ── Image ── */}
        <div className="relative overflow-hidden h-36 sm:h-[175px]">
          <motion.img
            src={sneaker.image}
            alt={sneaker.name}
            className="w-full h-full object-cover"
            animate={{ scale: hovered ? 1.09 : 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />

          {/* Orange bottom glow on hover */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            style={{ background: 'radial-gradient(ellipse at 50% 110%, rgba(249,115,22,0.2) 0%, transparent 65%)' }}
          />

          {/* Rank badge */}
          <RankBadge rank={index + 1} />

          {/* Wishlist */}
          <motion.button
            onClick={handleWish}
            whileTap={{ scale: 0.8 }}
            className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full flex items-center justify-center z-10 transition-all duration-200"
            style={{
              background: wished ? 'rgba(239,68,68,0.2)' : 'rgba(0,0,0,0.65)',
              border: wished ? '1px solid rgba(239,68,68,0.5)' : '1px solid rgba(255,255,255,0.1)',
              backdropFilter: 'blur(8px)',
              color: wished ? '#f87171' : '#52525b',
            }}
          >
            <svg className="w-3 h-3" fill={wished ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </motion.button>

          {/* FIRE badge for top 3 */}
          {index < 3 && (
            <motion.div
              className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full px-2 py-0.5"
              style={{
                background: 'rgba(0,0,0,0.7)',
                border: '1px solid rgba(249,115,22,0.35)',
                backdropFilter: 'blur(8px)',
              }}
              animate={{ scale: hovered ? [1, 1.06, 1] : 1 }}
              transition={{ duration: 0.4 }}
            >
              <span className="text-[0.9rem] leading-none">🔥</span>
              <span className="text-[0.5rem] uppercase tracking-[0.24em] font-bold" style={{ color: '#ff3b30' }}>
                Hot
              </span>
            </motion.div>
          )}
        </div>

        {/* ── Body ── */}
        <div className="p-3 flex flex-col gap-2.5">
          {/* Ghost index number */}
          <span
            className="absolute right-3 top-[10.5rem] text-[3.5rem] font-black leading-none select-none pointer-events-none"
            style={{ color: 'transparent', WebkitTextStroke: '1px rgba(249,115,22,0.1)' }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>

          <div>
            <p className="text-[0.52rem] uppercase tracking-[0.28em] mb-0.5" style={{ color: '#ff3b30' }}>
              {sneaker.brand}
            </p>
            <p className="text-[0.72rem] font-semibold text-zinc-100 leading-snug line-clamp-2">
              {sneaker.name}
            </p>
          </div>

          {/* Price + Rating row */}
          <div className="flex items-center justify-between">
            <p className="text-sm font-black leading-none" style={{ color: '#ff3b30' }}>
              ₹{sneaker.price.toLocaleString('en-IN')}
            </p>
            {sneaker.rating && (
              <div
                className="flex items-center gap-1 rounded-lg px-1.5 py-0.5"
                style={{ background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.2)' }}
              >
                <svg className="w-2.5 h-2.5" viewBox="0 0 20 20" fill="#ff3b30">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-[0.52rem] font-bold" style={{ color: '#ff3b30' }}>
                  {sneaker.rating.toFixed(1)}
                </span>
              </div>
            )}
          </div>

          {/* Trend bar */}
          {sneaker.trendScore != null && (
            <TrendBar score={sneaker.trendScore} index={index} />
          )}

          {/* Divider */}
          <div className="h-px" style={{ background: 'linear-gradient(90deg, rgba(249,115,22,0.3), transparent)' }} />

          {/* CTA */}
          <motion.button
            onClick={handleAdd}
            whileTap={{ scale: 0.96 }}
            className="relative w-full rounded-xl py-2.5 text-[0.55rem] uppercase tracking-[0.22em] font-bold overflow-hidden transition-all duration-300"
            style={added ? {
              background: 'rgba(34,197,94,0.15)',
              border: '1px solid rgba(34,197,94,0.4)',
              color: '#86efac',
            } : hovered ? {
              background: 'linear-gradient(135deg, #ff3b30, #ff3b30)',
              border: '1px solid transparent',
              color: '#000',
              boxShadow: '0 0 20px rgba(249,115,22,0.4)',
            } : {
              background: 'transparent',
              border: '1px solid rgba(249,115,22,0.2)',
              color: '#52525b',
            }}
          >
            {ripples.map(r => (
              <motion.span
                key={r.id}
                className="absolute rounded-full pointer-events-none"
                style={{ left: r.x - 40, top: r.y - 40, width: 80, height: 80, background: 'rgba(249,115,22,0.3)' }}
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 3, opacity: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              />
            ))}
            {added ? '✓ Added' : 'Add to Cart'}
          </motion.button>
        </div>
      </motion.button>
    </motion.div>
  );
}

/* ─── Main section ─── */
export function Trending({ sneakers, onSelectSneaker, onAddToCart }) {
  return (
    <section
      id="trending"
      className="relative rounded-3xl p-5 sm:p-6 space-y-6 overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #111111 0%, #0a0a0a 100%)',
        border: '1px solid rgba(249,115,22,0.1)',
        boxShadow: '0 0 60px rgba(249,115,22,0.04), inset 0 1px 0 rgba(255,255,255,0.04)',
      }}
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: 'linear-gradient(rgba(249,115,22,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.6) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Top-right corner glow */}
      <div
        className="absolute -top-16 -right-16 w-56 h-56 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.07) 0%, transparent 70%)' }}
      />

      {/* ── Header ── */}
      <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: '#ff3b30' }} />
              <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: '#ff3b30' }} />
            </span>
            <p className="text-[0.55rem] uppercase tracking-[0.38em] text-zinc-600">Live Heat Check</p>
          </div>
          <h2
            className="text-[1.8rem] sm:text-[2.2rem] font-black uppercase leading-none tracking-tight"
            style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #ff3b30 55%, #ff3b30 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Trending
          </h2>
          <h2
            className="text-[1.8rem] sm:text-[2.2rem] font-black uppercase leading-none tracking-tight"
            style={{
              color: 'transparent',
              WebkitTextStroke: '1.5px rgba(249,115,22,0.38)',
            }}
          >
            Now
          </h2>
        </div>

        {/* Live pill */}
        <div
          className="flex items-center gap-2 rounded-full px-4 py-2 self-start mt-1"
          style={{
            background: 'rgba(249,115,22,0.08)',
            border: '1px solid rgba(249,115,22,0.3)',
            boxShadow: '0 0 20px rgba(249,115,22,0.1)',
          }}
        >
          <motion.span
            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{ background: '#ff3b30' }}
            animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <span className="text-[0.55rem] uppercase tracking-[0.28em] font-bold" style={{ color: '#ff3b30' }}>
            Live
          </span>
        </div>
      </div>

      {/* ── Cards track ── */}
      <div className="flex gap-4 overflow-x-auto pb-3 pt-1 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-orange-900/50 scrollbar-track-transparent -mx-1 px-1">
        {sneakers.map((sneaker, index) => (
          <TrendingCard
            key={sneaker.id}
            sneaker={sneaker}
            index={index}
            onSelectSneaker={onSelectSneaker}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>

      {/* Bottom glow bar */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-2/3 pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(249,115,22,0.4), transparent)' }}
      />
    </section>
  );
}

export default Trending;
