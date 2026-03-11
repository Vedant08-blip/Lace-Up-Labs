import { motion } from 'framer-motion';

const brands = [
  { name: 'Nike', logo: 'https://www.google.com/imgres?q=nike%20logo%20hd%20image&imgurl=https%3A%2F%2Fw0.peakpx.com%2Fwallpaper%2F343%2F718%2FHD-wallpaper-nike-logo-logo-logos.jpg&imgrefurl=https%3A%2F%2Fwww.peakpx.com%2Fen%2Fhd-wallpaper-desktop-abjeg&docid=uq0r2cbhbt04SM&tbnid=f_L_jCqJUBf74M&vet=12ahUKEwjTkciruJiTAxVe8jgGHUsFJQUQnPAOegQIJBAB..i&w=800&h=1422&hcb=2&ved=2ahUKEwjTkciruJiTAxVe8jgGHUsFJQUQnPAOegQIJBAB' },
  { name: 'Adidas', logo: 'https://logo.clearbit.com/adidas.com' },
  { name: 'Puma', logo: 'https://logo.clearbit.com/puma.com' },
  { name: 'New Balance', logo: 'https://logo.clearbit.com/newbalance.com' },
  { name: 'Jordan', logo: 'https://logo.clearbit.com/jordan.com' },
  { name: 'Reebok', logo: 'https://logo.clearbit.com/reebok.com' },
  { name: 'Converse', logo: 'https://logo.clearbit.com/converse.com' },
  { name: 'Vans', logo: 'https://logo.clearbit.com/vans.com' },
];

export function BrandCarousel() {
  return (
    <section className="py-6">
      <div className="text-center mb-6">
        <p className="text-[0.65rem] uppercase tracking-[0.32em] text-zinc-500">
          Top Brands
        </p>
        <h2 className="font-heading text-2xl tracking-[0.16em] uppercase">
          Featured Brands
        </h2>
      </div>
      
      {/* Infinite scrolling brand logos */}
      <div className="relative overflow-hidden">
        <div className="flex animate-scroll gap-12 items-center">
          {/* Triple the brands for seamless loop */}
          {[...brands, ...brands, ...brands].map((brand, index) => (
            <motion.div
              key={`${brand.name}-${index}`}
              className="flex-shrink-0 flex flex-col items-center gap-2"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-24 h-16 rounded-lg bg-white/5 border border-zinc-800 flex items-center justify-center px-4 hover:bg-white/10 transition-colors">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <span className="text-zinc-400 text-xs font-medium hidden">{brand.name}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-scroll {
          animation: scroll 25s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}

export default BrandCarousel;

