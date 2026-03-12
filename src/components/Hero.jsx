import { useLayoutEffect, useRef } from 'react';
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

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top 80%',
          once: true,
        },
        defaults: { ease: 'power3.out' },
      });

      tl.from(eyebrowRef.current, { y: 18, opacity: 0, duration: 0.5 })
        .from(titleRef.current, { y: 36, opacity: 0, duration: 0.7 }, '-=0.2')
        .from(bodyRef.current, { y: 20, opacity: 0, duration: 0.5 }, '-=0.3')
        .from(actionsRef.current, { y: 16, opacity: 0, duration: 0.5 }, '-=0.3')
        .from(statsRef.current, { y: 16, opacity: 0, duration: 0.5 }, '-=0.4')
        .from(cardRef.current, { y: 50, rotation: -18, opacity: 0, duration: 0.8 }, '-=0.6');

      gsap.to(cardRef.current, {
        y: -10,
        duration: 3.2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });

      gsap.to(glowRef.current, {
        opacity: 0.7,
        duration: 2.4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="rounded-3xl bg-gradient-to-br from-card via-card/80 to-black/80 border border-zinc-800/80 overflow-hidden relative"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,59,48,0.14),_transparent_55%)]" />
      <div className="relative grid md:grid-cols-[1.1fr_minmax(0,1fr)] gap-8 p-8 lg:p-10 items-center">
        <div className="space-y-5">
          <p ref={eyebrowRef} className="text-xs uppercase tracking-[0.35em] text-zinc-400">
            Gear Up Your Sneaker Game
          </p>
          <h1 ref={titleRef} className="font-heading text-4xl sm:text-6xl leading-none tracking-[0.18em] uppercase">
            Step Into
            <br />
            The Future
            <br />
            Of Sneakers.
          </h1>
          <p ref={bodyRef} className="text-sm text-zinc-400 max-w-md">
            Curated heat from Nike, Adidas, Puma and more. Let our AI
            stylist lock in the perfect pair for your budget, style and
            grind.
          </p>
          <div ref={actionsRef} className="flex flex-wrap gap-3 pt-2">
            <button onClick={onShopNow} className="btn-primary">
              Shop Now
            </button>
            <button onClick={onExplore} className="btn-secondary">
              Explore Collection
            </button>
          </div>
          <div ref={statsRef} className="flex gap-8 pt-3 text-xs text-zinc-400">
            <div>
              <p className="font-semibold text-white text-base">
                1.2M+
              </p>
              <p>Pairs Secured</p>
            </div>
            <div>
              <p className="font-semibold text-white text-base">
                {'<'} 30s
              </p>
              <p>AI Fit Match</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div
            ref={cardRef}
            className="relative rounded-[2rem] bg-gradient-to-br from-zinc-900 via-zinc-950 to-black p-4 border border-zinc-800/80 shadow-[0_40px_80px_rgba(0,0,0,0.8)]"
          >
            <div
              ref={glowRef}
              className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_20%_0,_rgba(255,59,48,0.25),_transparent_55%)] opacity-40"
            />
            <div className="relative overflow-hidden rounded-[1.6rem] bg-black/80">
              <img
                src={selectedSneaker.image}
                alt={selectedSneaker.name}
                className="w-full h-52 sm:h-64 object-cover object-center"
              />
            </div>
            <div className="relative pt-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-[0.65rem] uppercase tracking-[0.26em] text-zinc-400">
                  Featured Drop
                </p>
                <p className="font-medium text-sm">
                  {selectedSneaker.name}
                </p>
                <p className="text-xs text-zinc-500">
                  {selectedSneaker.brand} · {selectedSneaker.category}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-zinc-400 tracking-[0.18em] uppercase">
                  From
                </p>
                <p className="text-lg font-semibold text-accent">
                  ₹{selectedSneaker.price.toLocaleString()}
                </p>
                <p className="text-[0.7rem] text-emerald-400">
                  ★ {selectedSneaker.rating.toFixed(1)} Rated
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
