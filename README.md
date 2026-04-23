# Insurance Town

One-shot marketing site for the **Insurance Town Podcast**, hosted by Heath Shearon — the Mayor of Insurance Town. Next.js 15 App Router, Tailwind v4, shadcn-style primitives, Framer Motion, and a React Three Fiber 3D hero featuring a slow-orbiting brass key built entirely from primitive geometries (no external GLTFs).

## Run it

```bash
npm install
npm run dev
# open http://localhost:3000
```

Build:

```bash
npm run build && npm start
```

Type-check:

```bash
npm run typecheck
```

## Where to paste your two assets

Open `lib/content.ts` and replace:

1. **Heath's headshot** — `content.assets.headshot`
   - Currently the string `"TODO_PASTE_HEATH_HEADSHOT_URL"`.
   - When set to an `https://` URL, the **Meet the Mayor** section renders it inside the tilted brass frame. Otherwise it shows a brass "H" placeholder.
   - Tip: upload the grey-jacket portrait to Vercel Blob / Cloudinary and paste the public URL.

2. **Sponsor logos** — `content.assets.sponsor_logos`
   - Currently an empty array `[]`.
   - Add an array of image URLs: `["https://cdn.example.com/sponsor1.png", ...]`.
   - The grid auto-fills and shows the real sponsors instead of the placeholder card.

No other content is hardcoded — all copy lives in `lib/content.ts` and is passed through verbatim.

## What's wired up

| Feature | Location | Notes |
|---|---|---|
| 3D brass key hero | `components/hero-scene.tsx` | R3F + drei + postprocessing. Degrades to cover-art poster if WebGL is missing. |
| RSS → 8 recent episodes | `lib/rss.ts`, `components/recent-episodes.tsx` | `next: { revalidate: 3600 }` (ISR, 1h). Falls back to a friendly "Listen on Apple" card if the fetch fails. |
| JSON-LD | `app/layout.tsx` | `PodcastSeries` + `PodcastEpisode` both emitted in `<head>`. |
| Reduced motion | `components/hero-scene.tsx`, `globals.css` | Rotation freezes, transitions near-instant, Float disables intensity. |
| Mobile perf | `hero-scene.tsx` | DPR=1, postprocessing disabled, rotation halved. |
| Accessibility | all components | aria-labels on nav + icons, h1→h2→h3 hierarchy, honeypot newsletter field, `prefers-reduced-motion` honored. |
| SEO | `app/layout.tsx` | Next `Metadata` export + OpenGraph + Twitter cards. |

## TODOs to finish before sharing

- [ ] Paste Heath's headshot URL into `lib/content.ts`.
- [ ] Paste sponsor logo URLs into `lib/content.ts`.
- [ ] Wire the newsletter submit in `components/newsletter.tsx` to a real provider (ConvertKit / Beehiiv / Substack). Currently mocked client-side.
- [ ] Optional: ask Heath for 3–6 listener/guest quotes and fill in `components/testimonials.tsx` (currently returns `null` by design — no fake praise).

## Architecture notes

- All component files are under 250 lines.
- The 3D `<Canvas>` is only loaded via `next/dynamic({ ssr: false })` from `components/hero.tsx`, so there's no hydration mismatch and no fixed canvas on mobile.
- The 3D key is a composition of `torusGeometry`, `cylinderGeometry`, and `boxGeometry` with a single `MeshStandardMaterial` — zero external assets.
- Content updates: edit `lib/content.ts`. Everything — nav, hero, stats, services, CTAs, socials, SEO — re-renders from that single source.

## Deploy

One-click to Vercel:

```bash
npx vercel
```

That's it. Share the preview URL with Heath.
