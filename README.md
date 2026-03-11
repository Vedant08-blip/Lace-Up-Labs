# Lace Up Labs - AI-Powered Sneaker Store

A modern e-commerce website for premium sneakers with AI-powered recommendations, built with React, Vite, and Tailwind CSS.

## Features

- 🛍️ **Curated Sneaker Collection** - Premium sneakers from top brands
- 🤖 **AI Recommendations** - Smart sneaker suggestions based on budget, style, and activity
- 🎨 **Modern Dark Theme** - Sleek design with dark UI and vibrant accents
- 📱 **Responsive Design** - Works seamlessly on all devices
- ✨ **Smooth Animations** - Fluid transitions powered by Framer Motion

## Tech Stack

- **React** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Google Fonts** - Bebas Neue & Poppins

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── AIRecommendation.jsx  # AI sneaker recommendation section
│   ├── Categories.jsx        # Sneaker category showcase
│   ├── FeaturedSneakers.jsx  # Featured products carousel
│   ├── FloatingSneakerCard.jsx # Animated AI result card
│   ├── Footer.jsx            # Site footer
│   ├── Header.jsx            # Navigation header
│   ├── Hero.jsx              # Hero section with featured sneaker
│   ├── ProductDetail.jsx     # Product detail view
│   ├── Reviews.jsx           # Customer reviews carousel
│   └── Trending.jsx          # Trending products
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

### Typography

- **Headings**: Bebas Neue (bold, uppercase)
- **Body**: Poppins (clean, modern)

## Layout

The site uses a clean vertical section-based structure:

1. Header (sticky navigation)
2. Hero Section (featured sneaker)
3. AI Recommendation Section
4. Product Detail Section
5. Featured Sneakers Section
6. Categories/Streetwear Section
7. Customer Reviews Section
8. Footer

## License

MIT

