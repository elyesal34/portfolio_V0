# Copilot Instructions for portfolio_V0

## Project Overview
- **Stack:** React (SPA), TypeScript, Vite, Tailwind CSS, Netlify, PWA, custom service worker, and edge functions.
- **Structure:**
  - `src/app/` – App entry, global styles, main.tsx, App.tsx
  - `src/components/` – UI components (layout, sections, cards, notifications)
  - `src/hooks/` – Custom React hooks (async data, cache, image loader)
  - `src/utils/` – Analytics, service worker helpers
  - `public/` – Static assets, critical CSS, manifest, offline, favicons
  - `docs/` – Development, testing, and security documentation

## Key Patterns & Conventions
- **Navigation:**
  - Uses React Router with hash-based navigation for smooth section scrolls.
  - Custom scroll management: disables browser auto-scroll, uses manual scroll restoration, and a `ScrollToTop` component pattern.
  - Special scroll offsets for certain sections (e.g., Contact) – see `docs/development/CORRECTIONS_FINALES.md`.
- **Styling:**
  - Tailwind CSS with custom layers in `globals.css` for LCP, accessibility, and mobile optimizations.
  - Animations are minimized for performance and LCP; see `.animate-fade-in`, `.animate-gradient`.
- **Data Fetching:**
  - Use `useAsyncData`, `useCachedData` hooks for async data and caching.
  - Image loading is handled by `useImageLoader` for lazy/optimized loading.
- **Testing:**
  - Tests in `src/__tests__/` using Vitest. See `docs/testing/` for guides and navigation tests.
- **Performance:**
  - Critical CSS, font preloading, and scroll locking for LCP in `globals.css`.
  - Service worker and PWA config in `sw.js`, `vite.config.pwa.ts`.
- **Netlify:**
  - Edge functions in `netlify/edge-functions/` for image optimization.
  - Custom headers and redirects in `public/_headers` and `netlify.toml`.

## Developer Workflows
- **Install:** `npm install`
- **Dev server:** `npm run dev`
- **Build:** `npm run build`
- **Preview:** `npm run preview`
- **Test:** `npm run test` (see `vitest.config.ts`)
- **Lint:** `npm run lint` (if configured)

## Integration Points
- **PWA:** Manifest in `public/manifest.json`, service worker in `public/sw.js`.
- **Analytics:** See `src/utils/analytics.ts`.
- **Image optimization:** Netlify edge function in `netlify/edge-functions/image-optimization.js`.

## Project-Specific Advice
- Always use the custom hooks for data/image loading.
- For navigation/scroll bugs, check both `globals.css` and scroll logic in `App.tsx`/`main.tsx`.
- When adding new sections, follow the pattern in `src/components/sections/` and update navigation logic if needed.
- For performance, prefer critical CSS and avoid heavy animations by default.

---

For more details, see `README.md`, `docs/PLAN.md`, and `docs/development/CORRECTIONS_FINALES.md`.
