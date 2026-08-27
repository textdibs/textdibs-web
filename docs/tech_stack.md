# Tech Stack (web)

> Landing page + public listings browser. See `../textdibs-backend/docs/product.md` for the full product context, and `../textdibs-backend/docs/tech_stack.md` for the backend this talks to.

## Framework: Next.js (App Router, TypeScript)

Standard default for "small team, ship a marketing site + some dynamic pages fast." The one real alternative considered was Astro (arguably more "correct" for a mostly-static content site, ships less JS) — Next.js wins here on ecosystem familiarity and how well AI-assisted coding handles it, not a strong technical necessity either way.

## Styling: Tailwind CSS

## Hosting: Vercel

Built by the Next.js team specifically to deploy it with zero config. Trivial custom domain setup for textdibs.com.

## How this talks to backend

See `../textdibs-backend/docs/api_contract.md` — the canonical description of fetching pattern, images, types, and the iMessage handoff. Not restated here.

## Local dev

`NEXT_PUBLIC_API_URL` env var points at the backend — local FastAPI dev server address locally, the deployed Railway URL in production.
