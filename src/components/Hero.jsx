import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function Hero({ selectedSneaker, onShopNow, onExplore }) {
  const rootRef = useRef(null);
  const eyebrowRef = useRef(null);
  const titleRef = useRef(null);
  const bodyRef = useRef(null);
  const actionsRef = useRef(null);
  const statsRef = useRef(null);
  const cardRef = useRef(null);
  const glowRef = useRef(null);
  const bgParticlesRef = useRef(null);
  const scanlineRef = useRef(null);
  const priceTagRef = useRef(null);
  const badgeRef = useRef(null);
  const [isHoveringCard, setIsHoveringCard] = useState(false);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {

      // Main entrance timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top 80%',
          once: true,
        },
        defaults: { ease: 'power4.out' },
      });

      // Scanline sweep
      tl.from(scanlineRef.current, {
        scaleY: 0,
        opacity: 0,
        duration: 0.4,
        transformOrigin: 'top',
      })
        .to(scanlineRef.current, {
          scaleY: 0,
          opacity: 0,
          duration: 0.3,
          transformOrigin: 'bottom',
          delay: 0.1,
        })
        .from(eyebrowRef.current, { y: 24, opacity: 0, duration: 0.5, skewX: 4 }, '-=0.2')
        .from(
          titleRef.current.querySelectorAll('.word'),
          { y: 80, opacity: 0, duration: 0.7, stagger: 0.12, skewX: -3 },
          '-=0.2'
        )
        .from(bodyRef.current, { y: 20, opacity: 0, duration: 0.5 }, '-=0.3')
        .from(actionsRef.current.children, { y: 20, opacity: 0, duration: 0.45, stagger: 0.1 }, '-=0.3')
        .from(statsRef.current.children, { y: 20, opacity: 0, duration: 0.4, stagger: 0.1 }, '-=0.4')
        .from(
          cardRef.current,
          { y: 80, rotation: -22, opacity: 0, duration: 1, ease: 'back.out(1.4)' },
          '-=0.7'
        )
        .from(badgeRef.current, { scale: 0, opacity: 0, duration: 0.5, ease: 'back.out(2)' }, '-=0.3')
        .from(priceTagRef.current, { x: 30, opacity: 0, duration: 0.4 }, '-=0.3');

      // Floating card
      gsap.to(cardRef.current, {
        y: -14,
        duration: 3.5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });

      // Glow pulse
      gsap.to(glowRef.current, {
        opacity: 0.85,
        scale: 1.05,
        duration: 2.6,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });

      // Particle float
      if (bgParticlesRef.current) {
        const particles = bgParticlesRef.current.querySelectorAll('.particle');
        particles.forEach((p, i) => {
          gsap.to(p, {
            y: -30 - i * 8,
            x: (i % 2 === 0 ? 1 : -1) * (10 + i * 5),
            opacity: 0,
            duration: 2 + i * 0.4,
            ease: 'power1.out',
            repeat: -1,
            delay: i * 0.3,
          });
        });
      }

    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="rounded-3xl border border-zinc-800/80 overflow-hidden relative"
      style={{
        background: 'linear-gradient(135deg, #0a0a0a 0%, #111111 40%, #0d0d0d 100%)',
      }}
    >
      {/* ── Scanline sweep (entrance effect) ── */}
      <div
        ref={scanlineRef}
        className="absolute inset-0 z-50 pointer-events-none"
        style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(255,59,48,0.06) 50%, transparent 100%)' }}
      />

      {/* ── Grid background ── */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,59,48,0.8) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,59,48,0.8) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* ── Red radial glow top-left ── */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(255,59,48,0.18),_transparent_60%)]" />

      {/* ── Noise texture overlay ── */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ── Floating particles ── */}
      <div ref={bgParticlesRef} className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="particle absolute rounded-full"
            style={{
              width: `${3 + (i % 3) * 2}px`,
              height: `${3 + (i % 3) * 2}px`,
              background: i % 3 === 0 ? 'rgba(255,59,48,0.6)' : i % 3 === 1 ? 'rgba(255,255,255,0.2)' : 'rgba(255,165,0,0.4)',
              left: `${10 + i * 11}%`,
              top: `${60 + (i % 4) * 8}%`,
              opacity: 0.6,
            }}
          />
        ))}
      </div>

      {/* ── Corner accent lines ── */}
      <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none">
        <div className="absolute top-4 left-4 w-8 h-[1px] bg-red-500/60" />
        <div className="absolute top-4 left-4 w-[1px] h-8 bg-red-500/60" />
      </div>
      <div className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none">
        <div className="absolute bottom-4 right-4 w-8 h-[1px] bg-red-500/60" />
        <div className="absolute bottom-4 right-4 w-[1px] h-8 bg-red-500/60" />
      </div>

      {/* ── Main content grid ── */}
      <div className="relative grid grid-cols-1 lg:grid-cols-[1.15fr_minmax(0,1fr)] gap-8 lg:gap-10 p-5 sm:p-8 lg:p-12 items-center">

        {/* ── LEFT — Text content ── */}
        <div className="space-y-6">

          {/* Eyebrow */}
          <div ref={eyebrowRef} className="flex items-center gap-3">
            <div className="w-6 h-[1px] bg-red-500" />
            <p className="text-[0.65rem] uppercase tracking-[0.4em] text-red-400 font-medium">
              Gear Up Your Sneaker Game
            </p>
            <div className="w-6 h-[1px] bg-red-500" />
          </div>

          {/* Title — each word animates individually */}
          <h1
            ref={titleRef}
            className="font-heading text-3xl sm:text-5xl lg:text-7xl leading-[0.92] tracking-[0.1em] uppercase overflow-hidden"
          >
            <span className="word block">Step</span>
            <span className="word block relative">
              Into
              <span
                className="absolute -right-2 top-1 text-[0.18em] tracking-[0.5em] text-red-500 font-mono"
                style={{ writingMode: 'initial' }}
              >
                ™
              </span>
            </span>
            <span className="word block bg-gradient-to-r from-red-500 via-orange-400 to-red-600 bg-clip-text text-transparent">
              The Future
            </span>
            <span className="word block text-zinc-300">Of Sneakers.</span>
          </h1>

          {/* Body */}
          <p ref={bodyRef} className="text-sm sm:text-base text-zinc-400 max-w-sm leading-relaxed">
            Curated heat from Nike, Adidas, Puma and more.{' '}
            <span className="text-white font-medium">Let our AI stylist</span> lock in
            the perfect pair for your budget, style and grind.
          </p>

          {/* CTA Buttons */}
          <div ref={actionsRef} className="flex flex-wrap gap-3 pt-1">
            <button
              onClick={onShopNow}
              className="group relative px-5 sm:px-7 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] rounded-full overflow-hidden transition-all duration-300"
              style={{ background: 'linear-gradient(135deg, #ff3b30, #ff6b35)' }}
            >
              <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300" />
              <span className="relative flex items-center gap-2">
                Shop Now
                <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </span>
            </button>

            <button
              onClick={onExplore}
              className="group px-5 sm:px-7 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] rounded-full border border-zinc-700 hover:border-red-500/60 text-zinc-300 hover:text-white transition-all duration-300 relative overflow-hidden"
            >
              <span className="absolute inset-0 bg-red-500/0 group-hover:bg-red-500/5 transition-all duration-300" />
              <span className="relative">Explore Collection</span>
            </button>
          </div>

          {/* Stats */}
          <div ref={statsRef} className="flex flex-wrap gap-6 sm:gap-8 pt-2">
            {[
              { value: '1.2M+', label: 'Pairs Secured' },
              { value: '< 30s', label: 'AI Fit Match' },
              { value: '4.9★', label: 'Avg Rating' },
            ].map((stat) => (
              <div key={stat.label} className="relative">
                <div className="absolute -top-1 -left-2 w-[1px] h-full bg-red-500/30" />
                <p className="font-bold text-white text-base sm:text-lg leading-none">{stat.value}</p>
                <p className="text-[0.68rem] text-zinc-500 mt-1 uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT — Product card ── */}
        <div className="relative flex justify-center">

          {/* Outer glow ring */}
          <div
            ref={glowRef}
            className="absolute inset-[-10%] rounded-[3rem] opacity-30 blur-2xl pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(255,59,48,0.5) 0%, transparent 70%)' }}
          />

          {/* Card */}
          <div
            ref={cardRef}
            onMouseEnter={() => setIsHoveringCard(true)}
            onMouseLeave={() => setIsHoveringCard(false)}
            className="relative w-full max-w-sm rounded-[2.2rem] border border-zinc-800/80 overflow-hidden cursor-pointer"
            style={{
              background: 'linear-gradient(145deg, #1a1a1a 0%, #0f0f0f 60%, #141414 100%)',
              boxShadow: '0 50px 100px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,59,48,0.08)',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Inner glow */}
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-500"
              style={{
                background: 'radial-gradient(circle at 20% 0%, rgba(255,59,48,0.2) 0%, transparent 55%)',
                opacity: isHoveringCard ? 1 : 0.5,
              }}
            />

            {/* LIVE badge */}
            <div
              ref={badgeRef}
              className="absolute top-4 left-4 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full text-[0.6rem] font-bold uppercase tracking-[0.25em]"
              style={{ background: 'rgba(255,59,48,0.15)', border: '1px solid rgba(255,59,48,0.4)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-red-400">Live Drop</span>
            </div>

            {/* Brand watermark */}
            <div className="absolute top-4 right-4 z-20 text-[0.55rem] uppercase tracking-[0.4em] text-zinc-600 font-medium">
              {selectedSneaker?.brand}
            </div>

            {/* Shoe image */}
            <div className="relative overflow-hidden bg-gradient-to-b from-zinc-900 to-black h-48 sm:h-56 lg:h-60">
              <div
                className="absolute inset-0 transition-transform duration-700"
                style={{ transform: isHoveringCard ? 'scale(1.06)' : 'scale(1)' }}
              >
                <img
                  src={selectedSneaker?.image}
                  alt={selectedSneaker?.name}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              {/* Shine sweep on hover */}
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-500"
                style={{
                  background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.06) 50%, transparent 60%)',
                  opacity: isHoveringCard ? 1 : 0,
                }}
              />
              {/* Bottom fade */}
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-zinc-950 to-transparent" />
            </div>

            {/* Card info */}
            <div className="relative p-5">
              {/* Divider line */}
              <div className="absolute top-0 left-5 right-5 h-[1px] bg-gradient-to-r from-transparent via-zinc-700/60 to-transparent" />

              <div className="flex items-end justify-between gap-3">
                <div className="space-y-1">
                  <p className="text-[0.58rem] uppercase tracking-[0.3em] text-red-400/80">Featured Drop</p>
                  <p className="font-semibold text-sm text-white leading-tight">{selectedSneaker?.name}</p>
                  <p className="text-[0.7rem] text-zinc-500">
                    {selectedSneaker?.brand} · {selectedSneaker?.category}
                  </p>
                </div>

                {/* Price tag */}
                <div
                  ref={priceTagRef}
                  className="text-right shrink-0 px-3 py-2 rounded-xl"
                  style={{ background: 'rgba(255,59,48,0.08)', border: '1px solid rgba(255,59,48,0.2)' }}
                >
                  <p className="text-[0.58rem] text-zinc-400 tracking-[0.2em] uppercase">From</p>
                  <p className="text-lg sm:text-xl font-bold text-red-400 leading-tight">
                    ₹{selectedSneaker?.price.toLocaleString()}
                  </p>
                  <p className="text-[0.65rem] text-emerald-400 mt-0.5">
                    ★ {selectedSneaker?.rating.toFixed(1)} Rated
                  </p>
                </div>
              </div>

              {/* Quick add bar */}
              <button
                onClick={onShopNow}
                className="mt-4 w-full py-2.5 rounded-xl text-xs font-semibold uppercase tracking-[0.25em] transition-all duration-300 relative overflow-hidden group"
                style={{ background: 'linear-gradient(135deg, rgba(255,59,48,0.15), rgba(255,107,53,0.1))', border: '1px solid rgba(255,59,48,0.25)' }}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500/10 to-red-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <span className="relative text-red-400 group-hover:text-red-300 transition-colors flex items-center justify-center gap-2">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.886-7.158a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                  </svg>
                  Quick Add to Cart
                </span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* ── Bottom ticker strip ── */}
      <div
        className="relative border-t border-zinc-800/60 overflow-hidden"
        style={{ background: 'rgba(255,59,48,0.04)' }}
      >
        <div className="flex animate-[marquee_18s_linear_infinite] whitespace-nowrap py-2.5">
          {[...Array(3)].map((_, i) => (
            <span key={i} className="flex items-center gap-6 px-6 text-[0.6rem] uppercase tracking-[0.35em] text-zinc-500">
              <span className="text-red-500">✦</span> New Drops Every Friday
              <span className="text-red-500">✦</span> Free Shipping Over ₹4999
              <span className="text-red-500">✦</span> AI Stylist Available 24/7
              <span className="text-red-500">✦</span> 30-Day Easy Returns
              <span className="text-red-500">✦</span> Exclusive Members-Only Access
            </span>
          ))}
        </div>
      </div>

      {/* Marquee keyframe — add to your global CSS or tailwind config */}
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-33.333%); }
        }
      `}</style>
    </section>
  );
}

export default Hero;
