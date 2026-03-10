import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'

const SNEAKERS = [
  {
    id: 'aj1-retro',
    name: 'Air Jordan 1 Retro High',
    brand: 'Nike',
    price: 220,
    rating: 4.9,
    category: 'Basketball',
    tags: ['high-top', 'retro', 'court'],
    image:
      'https://images.unsplash.com/photo-1645833889386-2782e290ee3b?w=1200&auto=format&fit=crop',
  },
  {
    id: 'ad-originals',
    name: 'Adidas Originals Samba',
    brand: 'Adidas',
    price: 120,
    rating: 4.8,
    category: 'Lifestyle',
    tags: ['classic', 'lifestyle', 'street'],
    image:
      'https://images.unsplash.com/photo-1715773408837-b7074beb12d5?w=1200&auto=format&fit=crop',
  },
  {
    id: 'nb-550',
    name: 'New Balance 550',
    brand: 'New Balance',
    price: 130,
    rating: 4.7,
    category: 'Streetwear',
    tags: ['low-top', 'lifestyle', 'street'],
    image:
      'https://images.unsplash.com/photo-1542272604-78d13c1f741a?w=1200&auto=format&fit=crop',
  },
  {
    id: 'nk-air-max',
    name: 'Nike Air Max 90',
    brand: 'Nike',
    price: 160,
    rating: 4.8,
    category: 'Running',
    tags: ['running', 'comfort', 'everyday'],
    image:
      'https://images.unsplash.com/photo-1641687589434-a86e8de59855?w=1200&auto=format&fit=crop',
  },
  {
    id: 'ad-ultraboost',
    name: 'Adidas Ultraboost 4.0',
    brand: 'Adidas',
    price: 190,
    rating: 4.9,
    category: 'Running',
    tags: ['running', 'foam', 'road'],
    image:
      'https://images.unsplash.com/photo-1651013691313-81b822df0044?w=1200&auto=format&fit=crop',
  },
  {
    id: 'pm-rs',
    name: 'Puma RS-X',
    brand: 'Puma',
    price: 140,
    rating: 4.6,
    category: 'Streetwear',
    tags: ['chunky', 'street', 'lifestyle'],
    image:
      'https://images.unsplash.com/photo-1680204101400-aeac783c9d87?w=1200&auto=format&fit=crop',
  },
  {
    id: 'aj1-chicago',
    name: 'Air Jordan 1 Chicago',
    brand: 'Nike',
    price: 250,
    rating: 4.9,
    category: 'Basketball',
    tags: ['high-top', 'retro', 'court'],
    image:
      'https://images.unsplash.com/photo-1643223669135-c3d63d27ede8?w=1200&auto=format&fit=crop',
  },
  {
    id: 'nb-2002r',
    name: 'New Balance 2002R',
    brand: 'New Balance',
    price: 150,
    rating: 4.5,
    category: 'Lifestyle',
    tags: ['everyday', 'comfort', 'street'],
    image:
      'https://images.unsplash.com/photo-1649418039782-3bcfa851868b?w=1200&auto=format&fit=crop',
  },
  {
    id: 'pm-suede',
    name: 'Puma Suede Classic',
    brand: 'Puma',
    price: 95,
    rating: 4.9,
    category: 'Streetwear',
    tags: ['classic', 'low-top', 'casual'],
    image:
      'https://images.unsplash.com/photo-1767589325064-a20f42c1da11?w=1200&auto=format&fit=crop',
  },
]

const CATEGORIES = [
  {
    id: 'Running',
    title: 'Running',
    description: 'High energy return for long miles.',
    image:
      'https://images.unsplash.com/photo-1711491559395-c82f70a68bfb?w=1200&auto=format&fit=crop',
  },
  {
    id: 'Basketball',
    title: 'Basketball',
    description: 'Explosive grip and lockdown support.',
    image:
      'https://images.unsplash.com/photo-1684918652908-8c5b4a154781?w=1200&auto=format&fit=crop',
  },
  {
    id: 'Lifestyle',
    title: 'Lifestyle',
    description: 'All-day comfort, everyday flex.',
    image:
      'https://images.unsplash.com/photo-1715773408837-b7074beb12d5?w=1200&auto=format&fit=crop',
  },
  {
    id: 'Streetwear',
    title: 'Streetwear',
    description: 'Bold silhouettes for the city.',
    image:
      'https://images.unsplash.com/photo-1645833889386-2782e290ee3b?w=1200&auto=format&fit=crop',
  },
]

const fadeInUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.05 * i,
      duration: 0.6,
      ease: [0.19, 1, 0.22, 1],
    },
  }),
}

function App() {
  const [selectedSneaker, setSelectedSneaker] = useState(SNEAKERS[0])
  const [budget, setBudget] = useState('')
  const [style, setStyle] = useState('')
  const [activity, setActivity] = useState('')
  const [recommended, setRecommended] = useState(null)

  const featured = useMemo(() => SNEAKERS.slice(0, 4), [])
  const trending = useMemo(() => SNEAKERS, [])

  const handleRecommend = () => {
    const maxBudget = budget ? Number(budget) : Infinity
    let pool = SNEAKERS.filter((s) => s.price <= maxBudget)

    if (activity) {
      pool = pool.filter(
        (s) => s.category.toLowerCase() === activity.toLowerCase(),
      )
    }

    if (style) {
      pool = pool.filter((s) =>
        s.tags.some((t) => t.toLowerCase().includes(style.toLowerCase())),
      )
    }

    if (pool.length === 0) pool = SNEAKERS
    const pick = pool.sort((a, b) => b.rating - a.rating)[0]
    setRecommended(pick)
    setSelectedSneaker(pick)
  }

  return (
    <div className="bg-background text-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4 pb-16">
        {/* Top nav */}
        <header className="flex items-center justify-between py-6 sticky top-0 z-20 bg-gradient-to-b from-background/95 via-background/80 to-transparent backdrop-blur">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-accent flex items-center justify-center shadow-glow">
              <span className="text-xs font-semibold tracking-[0.2em]">
                KV
              </span>
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
          <button className="rounded-full border border-zinc-700/80 bg-card/70 px-4 py-2 text-xs font-medium uppercase tracking-[0.25em] hover:border-accent hover:text-accent transition-colors">
            Sign In
          </button>
        </header>

        {/* Layout */}
        <main className="grid lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] gap-10 lg:gap-14 pt-4">
          {/* Left column */}
          <section className="space-y-10">
            {/* Hero */}
            <motion.section
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="rounded-3xl bg-gradient-to-br from-card via-card/80 to-black/80 border border-zinc-800/80 overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,59,48,0.14),_transparent_55%)]" />
              <div className="relative grid md:grid-cols-[1.1fr_minmax(0,1fr)] gap-8 p-8 lg:p-10 items-center">
                <div className="space-y-5">
                  <p className="text-xs uppercase tracking-[0.35em] text-zinc-400">
                    AI-POWERED DROP VAULT
                  </p>
                  <h1 className="font-heading text-5xl sm:text-6xl leading-none tracking-[0.18em] uppercase">
                    Step Into
                    <br />
                    The Future
                    <br />
                    Of Sneakers.
                  </h1>
                  <p className="text-sm text-zinc-400 max-w-md">
                    Curated heat from Nike, Adidas, Puma and more. Let our AI
                    stylist lock in the perfect pair for your budget, style and
                    grind.
                  </p>
                  <div className="flex flex-wrap gap-3 pt-2">
                    <button className="rounded-full bg-accent px-6 py-3 text-xs font-semibold uppercase tracking-[0.24em] shadow-glow hover:brightness-110 transition-transform hover:-translate-y-0.5">
                      Shop Now
                    </button>
                    <button className="rounded-full border border-zinc-700 bg-card/40 px-6 py-3 text-xs font-semibold uppercase tracking-[0.24em] hover:border-accent hover:text-accent transition-colors">
                      Explore Collection
                    </button>
                  </div>
                  <div className="flex gap-8 pt-3 text-xs text-zinc-400">
                    <div>
                      <p className="font-semibold text-white text-base">
                        1.2M+
                      </p>
                      <p>Pairs Secured</p>
                    </div>
                    <div>
                      <p className="font-semibold text-white text-base">
                        &lt; 30s
                      </p>
                      <p>AI Fit Match</p>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <motion.div
                    initial={{ rotate: -18, y: 40, opacity: 0 }}
                    animate={{
                      rotate: -12,
                      y: 0,
                      opacity: 1,
                    }}
                    transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
                    className="relative rounded-[2rem] bg-gradient-to-br from-zinc-900 via-zinc-950 to-black p-4 border border-zinc-800/80 shadow-[0_40px_80px_rgba(0,0,0,0.8)]"
                  >
                    <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_20%_0,_rgba(255,59,48,0.25),_transparent_55%)]" />
                    <div className="relative overflow-hidden rounded-[1.6rem] bg-black/80">
                      <img
                        src={selectedSneaker.image}
                        alt={selectedSneaker.name}
                        className="w-full h-64 object-cover object-center"
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
                          ${selectedSneaker.price}
                        </p>
                        <p className="text-[0.7rem] text-emerald-400">
                          ★ {selectedSneaker.rating.toFixed(1)} Rated
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.section>

            {/* Featured sneakers */}
            <section id="featured" className="space-y-4">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-[0.65rem] uppercase tracking-[0.32em] text-zinc-500">
                    Curated Heat
                  </p>
                  <h2 className="font-heading text-3xl tracking-[0.16em] uppercase">
                    Featured Sneakers
                  </h2>
                </div>
                <button className="hidden sm:inline-flex text-xs uppercase tracking-[0.24em] text-zinc-400 hover:text-accent transition-colors">
                  View all drops
                </button>
              </div>
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {featured.map((sneaker, index) => (
                  <motion.button
                    key={sneaker.id}
                    type="button"
                    onClick={() => setSelectedSneaker(sneaker)}
                    className="group relative rounded-2xl bg-card/60 border border-zinc-800/80 overflow-hidden text-left hover:border-accent/80 transition-colors"
                    variants={fadeInUp}
                    initial="hidden"
                    animate="visible"
                    custom={index + 1}
                    whileHover={{ y: -4 }}
                  >
                    <div className="relative">
                      <img
                        src={sneaker.image}
                        alt={sneaker.name}
                        className="w-full h-44 object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />
                      <span className="absolute top-3 left-3 rounded-full bg-black/70 px-3 py-1 text-[0.65rem] uppercase tracking-[0.22em] text-zinc-200">
                        {sneaker.category}
                      </span>
                      <span className="absolute top-3 right-3 rounded-full bg-accent/90 px-3 py-1 text-[0.65rem] uppercase tracking-[0.2em] text-black">
                        New
                      </span>
                    </div>
                    <div className="p-4 flex flex-col gap-2">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-xs text-zinc-400 uppercase tracking-[0.22em]">
                            {sneaker.brand}
                          </p>
                          <p className="font-medium text-sm">
                            {sneaker.name}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-[0.7rem] text-zinc-500 uppercase tracking-[0.2em]">
                            From
                          </p>
                          <p className="text-base font-semibold text-accent">
                            ${sneaker.price}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-zinc-400 pt-1">
                        <span>★ {sneaker.rating.toFixed(1)} Rating</span>
                        <span className="rounded-full bg-zinc-900/80 px-3 py-1 text-[0.7rem] uppercase tracking-[0.2em] group-hover:bg-accent group-hover:text-black transition-colors">
                          Add to Cart
                        </span>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </section>

            {/* Categories */}
            <section id="categories" className="space-y-4">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-[0.65rem] uppercase tracking-[0.32em] text-zinc-500">
                    Find Your Lane
                  </p>
                  <h2 className="font-heading text-3xl tracking-[0.16em] uppercase">
                    Sneaker Categories
                  </h2>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                {CATEGORIES.map((cat, index) => (
                  <motion.div
                    key={cat.id}
                    className="group relative overflow-hidden rounded-2xl bg-card/60 border border-zinc-800/80 cursor-pointer"
                    variants={fadeInUp}
                    initial="hidden"
                    animate="visible"
                    custom={index + 1}
                    whileHover={{ y: -3 }}
                  >
                    <div className="relative h-40">
                      <img
                        src={cat.image}
                        alt={cat.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                    </div>
                    <div className="absolute inset-0 flex flex-col justify-between p-5">
                      <div className="flex items-center justify-between">
                        <span className="rounded-full bg-black/60 px-3 py-1 text-[0.65rem] uppercase tracking-[0.24em] text-zinc-200">
                          {cat.id}
                        </span>
                        <span className="text-[0.65rem] text-zinc-400 uppercase tracking-[0.24em]">
                          Tap to explore
                        </span>
                      </div>
                      <div>
                        <h3 className="font-heading text-2xl tracking-[0.18em] uppercase">
                          {cat.title}
                        </h3>
                        <p className="text-xs text-zinc-300 max-w-xs">
                          {cat.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Reviews */}
            <section id="reviews" className="space-y-4">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-[0.65rem] uppercase tracking-[0.32em] text-zinc-500">
                    Community Talk
                  </p>
                  <h2 className="font-heading text-3xl tracking-[0.16em] uppercase">
                    Customer Reviews
                  </h2>
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  {
                    name: 'Jordan K.',
                    role: 'Collector · NYC',
                    text: 'The AI fit check actually got my hoop shoes right on the first try. Cushion and lockdown are crazy.',
                    rating: 5,
                  },
                  {
                    name: 'Aaliyah M.',
                    role: 'Designer · LA',
                    text: 'Love how curated everything feels. The dark layout, the heat pairs – it feels like scrolling a private vault.',
                    rating: 5,
                  },
                  {
                    name: 'Tariq H.',
                    role: 'Runner · London',
                    text: 'Typed my weekly mileage and budget and got three perfect options. No more scrolling 200 products.',
                    rating: 4.8,
                  },
                ].map((review, i) => (
                  <motion.article
                    key={review.name}
                    className="rounded-2xl bg-card/70 border border-zinc-800/80 p-4 flex flex-col justify-between"
                    variants={fadeInUp}
                    initial="hidden"
                    animate="visible"
                    custom={i + 1}
                  >
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div>
                        <p className="text-sm font-medium">{review.name}</p>
                        <p className="text-xs text-zinc-500">{review.role}</p>
                      </div>
                      <p className="text-xs text-emerald-400">
                        ★ {review.rating}
                      </p>
                    </div>
                    <p className="text-xs text-zinc-300 leading-relaxed">
                      “{review.text}”
                    </p>
                  </motion.article>
                ))}
              </div>
            </section>
          </section>

          {/* Right column */}
          <section className="space-y-8">
            {/* Trending carousel */}
            <section id="trending" className="space-y-3">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[0.65rem] uppercase tracking-[0.32em] text-zinc-500">
                    Live Heat Check
                  </p>
                  <h2 className="font-heading text-2xl tracking-[0.16em] uppercase">
                    Trending Now
                  </h2>
                </div>
              </div>
              <div className="relative">
                <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-zinc-700/70 scrollbar-track-transparent">
                  {trending.map((sneaker, index) => (
                    <motion.button
                      key={sneaker.id}
                      type="button"
                      onClick={() => setSelectedSneaker(sneaker)}
                      className="min-w-[9rem] rounded-2xl bg-card/70 border border-zinc-800/80 p-2 flex-shrink-0 text-left hover:border-accent/80 transition-colors"
                      whileHover={{ y: -3 }}
                      variants={fadeInUp}
                      initial="hidden"
                      animate="visible"
                      custom={index + 1}
                    >
                      <img
                        src={sneaker.image}
                        alt={sneaker.name}
                        className="w-full h-24 object-cover rounded-xl mb-2"
                      />
                      <p className="text-[0.6rem] uppercase tracking-[0.22em] text-zinc-400">
                        {sneaker.brand}
                      </p>
                      <p className="text-xs font-medium line-clamp-2">
                        {sneaker.name}
                      </p>
                      <p className="text-[0.7rem] text-accent pt-1">
                        ${sneaker.price}
                      </p>
                    </motion.button>
                  ))}
                </div>
              </div>
            </section>

            {/* AI Recommendation */}
            <section
              id="ai"
              className="rounded-3xl bg-gradient-to-b from-card via-card/90 to-black border border-zinc-800/80 p-5 space-y-4"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[0.65rem] uppercase tracking-[0.32em] text-emerald-400">
                    AI Sneaker Lab
                  </p>
                  <h2 className="font-heading text-2xl tracking-[0.16em] uppercase">
                    Smart Recommendations
                  </h2>
                </div>
                <span className="rounded-full bg-emerald-500/10 border border-emerald-500/40 px-3 py-1 text-[0.65rem] uppercase tracking-[0.24em] text-emerald-300">
                  Live · Beta
                </span>
              </div>
              <p className="text-xs text-zinc-300">
                Tell Lace Up Labs AI how you move. We&apos;ll scan the vault and
                surface pairs tuned to your budget, style and activity.
              </p>
              <div className="grid gap-3 text-xs">
                <div className="space-y-1">
                  <label className="block text-[0.65rem] uppercase tracking-[0.24em] text-zinc-400">
                    Budget (USD)
                  </label>
                  <input
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder="e.g. 180"
                    className="w-full rounded-full bg-black/60 border border-zinc-800 px-4 py-2 text-xs outline-none focus:border-accent focus:ring-1 focus:ring-accent/60"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[0.65rem] uppercase tracking-[0.24em] text-zinc-400">
                    Style keywords
                  </label>
                  <input
                    type="text"
                    value={style}
                    onChange={(e) => setStyle(e.target.value)}
                    placeholder="street, running, high-top..."
                    className="w-full rounded-full bg-black/60 border border-zinc-800 px-4 py-2 text-xs outline-none focus:border-accent focus:ring-1 focus:ring-accent/60"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[0.65rem] uppercase tracking-[0.24em] text-zinc-400">
                    Activity
                  </label>
                  <select
                    value={activity}
                    onChange={(e) => setActivity(e.target.value)}
                    className="w-full rounded-full bg-black/60 border border-zinc-800 px-4 py-2 text-xs outline-none focus:border-accent focus:ring-1 focus:ring-accent/60"
                  >
                    <option value="">Any</option>
                    <option value="Running">Running</option>
                    <option value="Basketball">Basketball</option>
                    <option value="Lifestyle">Lifestyle</option>
                    <option value="Streetwear">Streetwear</option>
                  </select>
                </div>
              </div>
              <button
                type="button"
                onClick={handleRecommend}
                className="w-full rounded-full bg-accent px-4 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.26em] shadow-glow hover:brightness-110 transition-transform hover:-translate-y-0.5"
              >
                Generate AI Recommendation
              </button>

              {recommended && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 rounded-2xl bg-black/70 border border-zinc-800/80 p-3 flex gap-3 items-center"
                >
                  <img
                    src={recommended.image}
                    alt={recommended.name}
                    className="w-20 h-20 rounded-xl object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-[0.65rem] uppercase tracking-[0.22em] text-zinc-400">
                      Best Match
                    </p>
                    <p className="text-sm font-medium">{recommended.name}</p>
                    <p className="text-xs text-zinc-500">
                      {recommended.brand} · {recommended.category}
                    </p>
                    <div className="flex items-center justify-between pt-1">
                      <p className="text-sm text-accent font-semibold">
                        ${recommended.price}
                      </p>
                      <button className="rounded-full bg-zinc-900/90 px-3 py-1 text-[0.65rem] uppercase tracking-[0.22em] hover:bg-accent hover:text-black transition-colors">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </section>

            {/* Product detail preview */}
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
                    {selectedSneaker.name}
                  </h2>
                </div>
                <span className="text-xs text-zinc-400">
                  ★ {selectedSneaker.rating.toFixed(1)} · Premium
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
                    {selectedSneaker.brand}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-zinc-400 uppercase tracking-[0.22em] text-[0.65rem]">
                    Category
                  </span>
                  <span className="rounded-full bg-black/70 border border-zinc-700 px-3 py-1">
                    {selectedSneaker.category}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-3 text-xs">
                <div className="flex-1 min-w-[9rem] space-y-1">
                  <label className="block text-[0.65rem] uppercase tracking-[0.24em] text-zinc-400">
                    Select Size (US)
                  </label>
                  <div className="grid grid-cols-5 gap-1.5">
                    {['7', '8', '9', '10', '11', '12', '13', '14', '15', '16'].map(
                      (size) => (
                        <button
                          key={size}
                          type="button"
                          className="rounded-xl bg-black/70 border border-zinc-800 py-2 text-[0.7rem] hover:border-accent hover:text-accent transition-colors"
                        >
                          {size}
                        </button>
                      ),
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between gap-3 pt-1">
                <div>
                  <p className="text-[0.7rem] text-zinc-400 uppercase tracking-[0.22em]">
                    Price
                  </p>
                  <p className="text-2xl font-semibold text-accent">
                    ${selectedSneaker.price}
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

            {/* Newsletter */}
            <section
              id="newsletter"
              className="rounded-3xl bg-gradient-to-r from-black via-card to-black border border-zinc-800/80 p-5 space-y-3"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[0.65rem] uppercase tracking-[0.32em] text-zinc-500">
                    Drop Alerts
                  </p>
                  <h2 className="font-heading text-2xl tracking-[0.16em] uppercase">
                    Vault Newsletter
                  </h2>
                </div>
              </div>
              <p className="text-xs text-zinc-300">
                Stay ahead of the line. Get early access to heat, exclusive
                AI-styled fits, and members-only pricing.
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Enter your email for early drops"
                  className="flex-1 rounded-full bg-black/70 border border-zinc-800 px-4 py-2 text-xs outline-none focus:border-accent focus:ring-1 focus:ring-accent/60"
                />
                <button className="rounded-full bg-accent px-5 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.26em] text-black shadow-glow hover:brightness-110 transition-transform hover:-translate-y-0.5">
                  Join Vault
                </button>
              </div>
            </section>

            {/* Footer */}
            <footer className="pt-2 text-[0.7rem] text-zinc-500 space-y-2 border-t border-zinc-900 mt-4">
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3">
                <div className="flex gap-4">
                  <button className="hover:text-accent transition-colors">
                    About
                  </button>
                  <button className="hover:text-accent transition-colors">
                    Contact
                  </button>
                  <button className="hover:text-accent transition-colors">
                    Policies
                  </button>
                </div>
                <div className="flex gap-4">
                  <button className="hover:text-accent transition-colors">
                    Instagram
                  </button>
                  <button className="hover:text-accent transition-colors">
                    X
                  </button>
                  <button className="hover:text-accent transition-colors">
                    TikTok
                  </button>
                </div>
              </div>
              <p className="text-xs text-zinc-600">
                © {new Date().getFullYear()} Lace Up Labs. All rights reserved.
              </p>
            </footer>
          </section>
        </main>
      </div>
    </div>
  )
}

export default App
