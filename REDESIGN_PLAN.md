# Lace Up Labs Redesign Plan

## Information Gathered

### Current Project Structure:
- **Tech Stack**: React + Vite + Tailwind CSS + Framer Motion
- **Color Theme**: Dark theme with #0F0F0F background, #1A1A1A card, #FF3B30 accent
- **Typography**: Bebas Neue (headings), Poppins (body) - already implemented
- **Components**: Header, Hero, FeaturedSneakers, Categories, Reviews, Trending, AIRecommendation, ProductDetail, Newsletter, Footer

### Issues Identified:
1. **Inconsistent Button Styles**: Different buttons have different designs across components
2. **Clickable Cards**: Cards in FeaturedSneakers, Trending, Reviews, Categories lack clear clickable indicators
3. **Navigation**: Need to ensure smooth navigation between sections
4. **AI Button**: Has purple gradient - should match the overall red accent theme

---

## Plan: Unified Design System

### Phase 1: Standardize Button Styles (Primary & Secondary)

**Primary Button Style** (all primary actions):
```css
- Background: #FF3B30 (accent)
- Text: Black
- Font: Poppins, semibold, uppercase, tracking-wide
- Padding: px-5 py-2.5
- Border-radius: full (rounded-full)
- Hover: brightness-110, slight translateY(-2px)
- Shadow: glow effect
```

**Secondary Button Style** (all secondary actions):
```css
- Background: transparent
- Border: 1px solid #3f3f46 (zinc-700)
- Text: white/zinc-300
- Font: Poppins, medium, uppercase, tracking-wide
- Padding: px-5 py-2.5
- Border-radius: full (rounded-full)
- Hover: border-accent, text-accent
```

### Phase 2: Update Components

#### 1. Header.jsx
- Keep "Sign In" as secondary button
- Add clickable indicators to nav links

#### 2. Hero.jsx
- "Shop Now" → Primary button
- "Explore Collection" → Secondary button

#### 3. FeaturedSneakers.jsx
- "Add to Cart" in cards → Secondary button style (smaller)
- "View all drops" → Text link with arrow
- Add cursor-pointer and hover effects to entire card

#### 4. Categories.jsx
- Make entire card clickable with cursor-pointer
- Add hover scale effect

#### 5. Reviews.jsx
- Make review cards clickable with cursor-pointer
- Add hover border effect

#### 6. Trending.jsx
- Make sneaker cards clickable
- Add cursor-pointer and hover effects

#### 7. AIRecommendation.jsx
- Change AI button from purple gradient to match red accent theme
- "Add to Cart" in result → Secondary button

#### 8. ProductDetail.jsx
- "Wishlist" → Secondary button
- "Add to Cart" → Primary button

#### 9. Newsletter.jsx
- Email input → Consistent styling
- "Join Vault" → Primary button

#### 10. Footer.jsx
- Links already have hover:text-accent

### Phase 3: Add Global Clickable Styles
- Add `.clickable-card` utility class for consistent hover effects
- Ensure all interactive elements have visible feedback

---

## Files to Edit:

1. `src/index.css` - Add button styles and clickable card utilities
2. `src/components/Header.jsx` - Update Sign In button
3. `src/components/Hero.jsx` - Standardize buttons
4. `src/components/FeaturedSneakers.jsx` - Update buttons and cards
5. `src/components/Categories.jsx` - Add clickable effects
6. `src/components/Reviews.jsx` - Add clickable effects
7. `src/components/Trending.jsx` - Add clickable effects
8. `src/components/AIRecommendation.jsx` - Change to red accent theme
9. `src/components/ProductDetail.jsx` - Standardize buttons
10. `src/components/Newsletter.jsx` - Standardize input and button

---

## Followup Steps:
1. Run `npm run dev` to test changes
2. Verify all buttons have consistent styling
3. Test all clickable interactions
4. Ensure mobile responsiveness

