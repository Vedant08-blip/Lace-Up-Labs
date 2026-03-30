import { motion } from 'framer-motion';

const brands = [
  { name: 'Nike', logo: 'https://logo.clearbit.com/nike.com' },
  { name: 'Adidas', logo: 'https://logo.clearbit.com/adidas.com' },
  { name: 'Puma', logo: 'https://logo.clearbit.com/puma.com' },
  { name: 'New Balance', logo: 'https://logo.clearbit.com/newbalance.com' },
  { name: 'Jordan', logo: 'https://logo.clearbit.com/jordan.com' },
  { name: 'Reebok', logo: 'https://logo.clearbit.com/reebok.com' },
  { name: 'Converse', logo: 'https://logo.clearbit.com/converse.com' },
  { name: 'Vans', logo: 'https://logo.clearbit.com/vans.com' },
];

function BrandCard({ brand }) {
  return (
    <motion.div
      className="flex-shrink-0 group relative"
      whileHover={{ scale: 1.06, y: -4 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      {/* Glow behind card on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none blur-xl"
        style={{ background: 'radial-gradient(ellipse, rgba(249,115,22,0.3) 0%, transparent 70%)' }}
      />

      <div
        className="relative w-24 h-16 sm:w-28 sm:h-20 rounded-2xl flex flex-col items-center justify-center px-4 gap-2 overflow-hidden cursor-pointer transition-all duration-300"
        style={{
          background: 'linear-gradient(145deg, #1c1c1c 0%, #111111 100%)',
          border: '1px solid rgba(255,255,255,0.06)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.border = '1px solid rgba(249,115,22,0.45)';
          e.currentTarget.style.boxShadow = '0 8px 32px rgba(249,115,22,0.18), 0 2px 8px rgba(0,0,0,0.8)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.border = '1px solid rgba(255,255,255,0.06)';
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.5)';
        }}
      >
        {/* Inner top sheen */}
        <div
          className="absolute top-0 left-0 right-0 h-px pointer-events-none"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)' }}
        />

        {/* Orange bottom border on hover */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-0 group-hover:w-3/4 transition-all duration-300 pointer-events-none rounded-full"
          style={{ background: 'linear-gradient(90deg, transparent, #ff3b30, transparent)' }}
        />

        <img
          src={brand.logo}
          alt={brand.name}
          className="w-full h-8 sm:h-10 object-contain transition-all duration-300 group-hover:brightness-125"
          style={{ filter: 'brightness(0.85) grayscale(0.2)' }}
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
        <span
          className="hidden text-[0.6rem] uppercase tracking-[0.28em] font-bold text-zinc-400 group-hover:text-accent transition-colors"
          style={{ display: 'none' }}
        >
          {brand.name}
        </span>

        <p className="text-[0.52rem] uppercase tracking-[0.3em] text-zinc-700 group-hover:text-accent/70 transition-colors duration-300 leading-none">
          {brand.name}
        </p>
      </div>
    </motion.div>
  );
}

export function BrandCarousel() {
  const looped = [...brands, ...brands, ...brands];

  return (
    <section
      className="relative py-8 sm:py-10 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, transparent 0%, rgba(249,115,22,0.03) 50%, transparent 100%)',
      }}
    >
      {/* Top divider line */}
      <div className="relative flex items-center gap-4 px-6 sm:px-10 mb-6 sm:mb-8">
        <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(249,115,22,0.3))' }} />
        <div className="flex flex-col items-center gap-1">
          <p className="text-[0.55rem] uppercase tracking-[0.42em] text-zinc-600">Est. 2024</p>
          <h2
            className="text-[1.3rem] sm:text-[1.6rem] font-black uppercase tracking-[0.22em] leading-none"
            style={{
              background: 'linear-gradient(135deg, #fff 0%, #ff3b30 60%, #ff3b30 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Top Brands
          </h2>
          {/* Underline accent */}
          <div className="h-px w-12 rounded-full mt-0.5" style={{ background: 'linear-gradient(90deg, #ff3b30, #ff3b30)' }} />
        </div>
        <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(249,115,22,0.3), transparent)' }} />
      </div>

      {/* Left + Right edge fade masks */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(90deg, #0a0a0a, transparent)' }} />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(270deg, #0a0a0a, transparent)' }} />

      {/* Scrolling track */}
      <div className="relative overflow-hidden">
        <div className="flex gap-5 items-center animate-brand-scroll">
          {looped.map((brand, i) => (
            <BrandCard key={`${brand.name}-${i}`} brand={brand} />
          ))}
        </div>
      </div>

      {/* Bottom counter row */}
      <div className="flex flex-wrap items-center justify-center gap-6 mt-6 sm:mt-8">
        {[
          { value: '8+', label: 'Brands' },
          { value: '500+', label: 'Styles' },
          { value: '10K+', label: 'Drops' },
        ].map((stat) => (
          <div key={stat.label} className="flex flex-col items-center gap-0.5">
            <span
              className="text-lg sm:text-xl font-black leading-none"
              style={{ color: '#ff3b30' }}
            >
              {stat.value}
            </span>
            <span className="text-[0.52rem] uppercase tracking-[0.3em] text-zinc-600">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Bottom divider */}
      <div className="mt-8 mx-6 sm:mx-10 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(249,115,22,0.2), transparent)' }} />

      <style>{`
        @keyframes brand-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-brand-scroll {
          animation: brand-scroll 22s linear infinite;
          width: max-content;
        }
        .animate-brand-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}

export default BrandCarousel;
