import { motion } from 'framer-motion';

export function Header() {
  return (
    <header className="flex items-center justify-between py-6 sticky top-0 z-20 bg-gradient-to-b from-background/95 via-background/80 to-transparent backdrop-blur">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 flex items-center justify-center">
          <img
            src="/favicon.svg"
            alt="Lace Up Labs Skull Logo"
            className="w-full h-full object-contain"
          />
        </div>
        <div>
          <div className="font-heading text-2xl tracking-[0.2em] uppercase">
            Lace Up Labs
          </div>
          <p className="text-xs text-zinc-400">
            Premium AI-powered sneaker vault
          </p>
        </div>
      </div>
      <nav className="hidden md:flex items-center gap-8 text-sm text-zinc-400">
        <a href="#featured" className="hover:text-white transition-colors">
          Featured
        </a>
        <a href="#categories" className="hover:text-white transition-colors">
          Categories
        </a>
        <a href="#trending" className="hover:text-white transition-colors">
          Trending
        </a>
        <a href="#ai" className="hover:text-white transition-colors">
          AI Studio
        </a>
      </nav>
      <button className="btn-secondary">
        Sign In
      </button>
    </header>
  );
}

export default Header;

