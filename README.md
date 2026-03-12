# Lace Up Labs - AI-Powered Sneaker Store

A modern e-commerce experience for premium sneakers with AI-powered recommendations, built with React, Vite, Tailwind CSS, and GSAP.

## Features

- **Curated Sneaker Collection** - Premium sneakers from top brands
- **AI Recommendations** - Smart sneaker suggestions based on budget and activity
- **Product Detail + Size Selection** - Mandatory size selection before adding to cart
- **Cart Sidebar** - Slide-in cart with totals and item management
- **Modern Dark Theme** - Sleek design with bold accents
- **Responsive Design** - Works seamlessly on all devices
- **Smooth Animations** - Section reveals and hero sequences powered by GSAP + ScrollTrigger

## Tech Stack

- **React** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **GSAP + ScrollTrigger** - UI motion and scroll reveals
- **Framer Motion** - Micro-interactions on cards

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

### Build

```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── AIRecommendation.jsx  # AI sneaker recommendation section
│   ├── AuthModal.jsx         # Auth modal UI
│   ├── BrandCarousel.jsx     # Brand logo carousel
│   ├── CartSidebar.jsx       # Slide-in cart
│   ├── FeaturedSneakers.jsx  # Featured products carousel
│   ├── FloatingSneakerCard.jsx # Animated AI result card
│   ├── Footer.jsx            # Site footer
│   ├── Header.jsx            # Navigation header
│   ├── Hero.jsx              # Hero section with featured sneaker
│   ├── ProductDetail.jsx     # Product detail view with size selection
│   ├── Reviews.jsx           # Customer reviews carousel
│   ├── SearchBar.jsx         # Search UI
│   └── Trending.jsx          # Trending products
├── context/
│   ├── AuthContext.jsx       # Auth state
│   └── CartContext.jsx       # Cart state
├── data/
│   └── sneakers.js           # Sneaker data & categories
├── hooks/
│   └── useAIRecommendation.js # AI recommendation logic
├── App.jsx                   # Main application component
├── index.css                 # Global styles
└── main.jsx                  # Entry point
```

## Design System

### Colors

- **Background**: `#0F0F0F` (dark black)
- **Card**: `#1A1A1A` (dark gray)
- **Accent**: `#FF3B30` (vibrant red)

## Layout

The site uses a clean vertical section-based structure:

1. Header
2. Hero Section (featured sneaker)
3. AI Recommendation Section
4. Product Detail Section
5. Featured Sneakers Section
6. Brand Carousel Section
7. Trending Section
8. Customer Reviews Section
9. Footer

## License

MIT
