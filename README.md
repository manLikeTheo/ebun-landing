# Ebun Landing Page

**Stack:** Next.js 15 (App Router) + Tailwind CSS + Framer Motion + Lucide React

---

## Quick Start

```bash
# 1. Create a new Next.js project (or use this folder directly)
npx create-next-app@latest ebun-landing --typescript --tailwind --eslint --app --no-src-dir

# 2. Copy all files from this folder into your project
#    (Replace the generated app/ folder with the one provided)

# 3. Install dependencies
cd ebun-landing
npm install framer-motion lucide-react clsx tailwind-merge

# 4. Make sure tailwind.config.ts, postcss.config.js, and tsconfig.json
#    match the ones provided (they contain Ebun-specific tokens)

# 5. Run the dev server
npm run dev

# 6. Open http://localhost:3000
```

---

## What's Included (Phase 2A)

| File | Purpose |
|------|---------|
| `app/layout.tsx` | Root layout with Cormorant Garamond + DM Sans fonts |
| `app/globals.css` | CSS variables, base styles, noise overlay |
| `app/page.tsx` | Single-page composer — all sections in order |
| `app/components/Navbar.tsx` | Fixed nav with scroll-aware styling |
| `app/components/CustomCursor.tsx` | Gold dot + ring cursor (desktop only) |
| `app/components/NoiseOverlay.tsx` | Subtle grain texture |
| `app/components/RevealOnScroll.tsx` | Framer Motion scroll-triggered fade-up |
| `app/components/SectionEyebrow.tsx` | Gold line + label pattern |
| `app/components/Divider.tsx` | Decorative horizontal divider |
| `app/components/GoldButton.tsx` | Primary CTA button |
| `app/components/GhostButton.tsx` | Secondary/outline button |
| `app/sections/Hero.tsx` | Full-screen hero with staggered animations |
| `app/sections/MarqueeStrip.tsx` | Infinite scrolling city strip |
| `app/sections/Problem.tsx` | "Money gets there. The feeling doesn't." |
| `app/sections/HowItWorks.tsx` | 3-step process cards |
| `app/sections/Categories.tsx` | Gift category grid |
| `app/sections/Diaspora.tsx` | Diaspora route cards + manifesto |
| `app/sections/Scenarios.tsx` | 3 product narratives |
| `app/sections/Corporate.tsx` | B2B value prop + stats |
| `app/sections/Trust.tsx` | Security pillars |
| `app/sections/EarlyAccess.tsx` | Final CTA |
| `app/sections/Footer.tsx` | Links + tagline |
| `app/hooks/useMousePosition.ts` | Mouse tracking for cursor |
| `app/hooks/useMediaQuery.ts` | Responsive breakpoint detection |
| `lib/utils.ts` | `cn()` helper for Tailwind class merging |

---

## Customization Checklist

- [ ] Replace placeholder `href="#"` links with real routes
- [ ] Add actual OG image at `/public/og-image.jpg` (1200×630)
- [ ] Add favicon at `/public/favicon.ico`
- [ ] Configure early access form (Supabase, Airtable, or Formspree)
- [ ] Add Google Analytics or Plausible
- [ ] Update footer links to real pages
- [ ] Add real vendor partner logos (when available)

---

## Next Steps (Phase 2B / 3)

1. **Product Demo Section** — Interactive scratch-reveal animation (Canvas 2D)
2. **Parallax Effects** — GSAP ScrollTrigger for Diaspora images
3. **Page Transitions** — Smooth route transitions (if multi-page)
4. **Performance Audit** — Lighthouse 95+ across all metrics
5. **Accessibility Pass** — Keyboard nav, focus states, screen reader labels

---

## Deployment

```bash
npm run build
```

Deploy the `out/` folder to Vercel, Netlify, or any static host.

```bash
# Vercel (recommended)
npx vercel --prod
```

---

Built for Ebun — The gift of giving, reimagined.
