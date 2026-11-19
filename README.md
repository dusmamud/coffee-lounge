# The Coffee Lounge — Premium Coffee Shop Website (frontend only)

Premium coffee shop website built to the reference design (The Coffee Lounge, Maple City, CA).
**Frontend only, mock data** — real data replaces `src/lib/data/site.ts` after the client approves the design.
Prices in USD ($).

## Stack

- Svelte 5.58 + SvelteKit 3.3.1 + Vite 8.3.8 + TypeScript (strict)
- Tailwind CSS 4.3.5 (`@tailwindcss/vite`, `@theme` tokens in `src/app.css`)
- `@sveltejs/adapter-static` + `prerender = true` (SSR on, never `ssr: false`)
- Fonts self-hosted via `@fontsource`: Playfair Display (headings) + Inter (body)
- Icons: `@lucide/svelte` + custom SVG (24×24, 2px stroke)
- Images: generated PNG masters → AVIF → WebP → JPG → PNG fallback via
  native `<picture>` (`src/lib/components/Picture.svelte`)
- Animation: GSAP + Lenis (light, transform + opacity only, reduced-motion gated)

## Pages (all prerendered)

Home (`/`) — hero, signature drinks, about strip, bestsellers, testimonials, newsletter.
`/menu` (search + Hot/Cold/category filters, veg-only, price sort) · `/menu/[slug]` (10 drink & food detail pages) ·
`/order` (3-step mock checkout: cart → pickup/delivery + payment → confirmation with order ref + ETA) ·
`/locations` (3 cafés with hours + map embeds) · `/about` · `/events` · `/blog` + 3 posts ·
`/gift-cards` · `/loyalty` (Coffee Loop rewards) · `/contact` · `/faq` · `/privacy` · `/terms` · 404.
`sitemap.xml` and `robots.txt` as `+server.ts` endpoints, SEO meta + CafeOrCoffeeShop JSON-LD.

Cart: slide-in drawer with free-delivery progress ($25+), 8.5% tax line, persisted in localStorage.

## Scripts

```bash
npm install
npm run images   # convert static/images/original/*.png → avif/webp/jpg @ 480/800/1200/1600
npm run dev      # vite dev
npm run check    # svelte-check (0 errors)
npm run build    # vite build → build/
```

## Deploy

- GitHub: `dusmamud/coffee-lounge` (public). Push to `main` triggers
  `.github/workflows/deploy.yml` → Cloudflare Pages project `coffee-lounge`.
- Live: https://coffee-lounge.pages.dev
- Repo secrets required for auto-deploy: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`.
