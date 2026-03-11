import { useRef, useEffect, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

export function Carousel({ children, className = '' }) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });
  const controls = useAnimation();
  const [showControls, setShowControls] = useState(false);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const scroll = (direction) => {
    if (containerRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      containerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const checkScroll = () => {
    if (containerRef.current) {
      const { scrollWidth, clientWidth } = containerRef.current;
      setShowControls(scrollWidth > clientWidth);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [children]);

  return (
    <div className="relative group">
      {/* Scroll area */}
      <motion.div
        ref={containerRef}
        className={`flex gap-4 overflow-x-auto pb-4 pt-2 px-1 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-zinc-700/70 scrollbar-track-transparent ${className}`}
        initial="hidden"
        animate={controls}
        onScroll={checkScroll}
      >
        {children}
      </motion.div>

      {/* Optional scroll controls (appear on hover/desktop) */}
      {showControls && (
        <>
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 h-8 w-8 rounded-full bg-black/80 border border-zinc-700 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0 hidden md:flex hover:border-accent"
            aria-label="Scroll left"
          >
            ←
          </button>
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 h-8 w-8 rounded-full bg-black/80 border border-zinc-700 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0 hidden md:flex hover:border-accent"
            aria-label="Scroll right"
          >
            →
          </button>
        </>
      )}
    </div>
  );
}

export default Carousel;
