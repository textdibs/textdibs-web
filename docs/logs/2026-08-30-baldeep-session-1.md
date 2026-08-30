# Baldeep Session 1

> Covers the first working session on `textdibs-web`: landing page plan → scaffold → bare-bones landing page → first Vercel deploy → listings browser wired to the real backend. Branches `scaffold` (PR #1) and `marketplace` (PR #2, in progress). Subsequent work continues in Session 2.

## Product context

Confirmed `../textdibs-backend/docs/product.md` already held the canonical product write-up (positioning, core loop, competitors) — nothing needed adding on the `textdibs-web` side; this repo just links to it from `CLAUDE.md`.

## Landing page plan

Wrote `docs/landing_page_plan.md` as a real, committed doc (not an ephemeral plan-mode file, per explicit instruction to build incrementally). Key decisions:

- Landing page only for v1 — listings browser deferred until `../textdibs-backend/docs/api_contract.md`'s endpoints/data shapes were defined.
- Traditional marketing hero (headline/subhead/CTA) with a small supporting iMessage-style chat snippet lower on the page — light inspiration from rid.me, explicitly not copying its narrative-conversation-as-hero pattern.
- Five sections: Header, Hero, ChatSnippet, HowItWorks, Footer. No nav, no FAQ, no testimonials for v1.
- `sms:`/`imessage:` CTA gated behind `NEXT_PUBLIC_DIBS_PHONE_NUMBER` so the site is deployable before a real number exists (disabled/"coming soon" state otherwise).

## Scaffold (branch `scaffold`, PR #1)

- `create-next-app` (App Router, TypeScript, Tailwind) scaffolded into a temp dir and merged into the existing repo (it refuses non-empty directories) — `CLAUDE.md`/`docs/` preserved, `package.json` name fixed to `textdibs-web`.
- Built all five landing sections plus `src/lib/config.ts` (`dibsPhoneNumber`, `smsHref`) and the shared `TextDibsButton` component (renders disabled with a tooltip when no phone number is configured).
- Fixed `.gitignore` swallowing `.env.example` via the `.env*` glob (added `!.env.example` negation).
- Resolved a branch-divergence scare where `docs/landing_page_plan.md` appeared to have been deleted — `scaffold` had branched before the doc landed on `main`; restored and then fast-forward merged `main` into `scaffold` to reconcile.

## Visual design

Iterated to the final look: white background / black text (no dark-mode variant), iMessage-accurate bubble colors (`#03A2E9` sent, `#E9E9EB` received), a single accent color matching the sent-bubble blue instead of an orange/warm accent, and Apple's system font stack (`-apple-system, BlinkMacSystemFont, ...`) instead of `next/font`'s Geist — SF Pro can't legally be embedded as a webfont for non-Apple visitors, so the system stack is the standard way to get real San Francisco on Apple devices while falling back gracefully elsewhere. All defined as Tailwind v4 `@theme inline` tokens in `globals.css`, not hardcoded per-component.

Diagnosed the "Text Dibs buttons aren't the right blue" report as the disabled-state `opacity-50` (no phone number set locally), not a color-token bug — fixed for local testing via a placeholder number in `.env.local`.

## First Vercel deploy

The Vercel dashboard's "New Project" import flow had a permanently disabled Deploy button with no visible error, traced to the team having been renamed from an old "Nelo" account. Worked around entirely via the Vercel CLI instead of the dashboard: `vercel link` (created project `textdibs-web` under team `dibs0`), `vercel env add` for `NEXT_PUBLIC_DIBS_PHONE_NUMBER` (production + preview), `vercel --prod` → live at `textdibs-web.vercel.app`.

Separately investigated why the PR #1 merge commit showed no GitHub deployment checkmark despite the site being live: the Vercel GitHub App had only been installed on the `textdibs` org (as a side effect of the CLI linking) about 45 minutes *after* that commit was pushed, so no webhook fired for it retroactively. Not a bug — later pushes trigger it correctly now that the App is installed.

## Listings browser (branch `marketplace`, PR #2 in progress)

Built the static listings page ahead of schedule once `api_contract.md` had enough shape to act on:

- `src/app/listings/page.tsx`, `src/components/listings/ListingCard.tsx` — grid of listing cards.
- Added a "Browse listings" link in `Header.tsx` next to the "Text Dibs" CTA.
- Started with local mock data (`src/lib/listings.ts`) shaped with a separate `condition` field per an early request — then corrected once the real backend schema was checked: `textdibs-backend`'s `Listing` model has no `condition` column, it's folded into the free-text `description` the seller agent writes. Dropped `condition` from the frontend to match reality rather than add a speculative column.

### Wiring to the real backend

- **Backend (`textdibs-backend`):** added `GET /listings` (active listings, newest first, filtered to non-null title/description/price) and `GET /listings/{id}` to `app/main.py`, returning a `ListingPublic` Pydantic shape (`id`, `title`, `description`, `price`, `photo_urls`, `created_at`). Verified by running the FastAPI app locally against the real Supabase Postgres DB — returned two real seeded listings.
- **Frontend (`textdibs-web`):** `getListings()` in `src/lib/listings.ts` now does a real server-side `fetch` against the backend instead of returning mock data; `Listing` type matches the API's actual response. Added `apiUrl`/`DIBS_API_URL` to `src/lib/config.ts` (server-only — listings are fetched in Server Components per `api_contract.md`, never client-side, so no `NEXT_PUBLIC_` prefix needed). Allowlisted `*.supabase.co` in `next.config.ts` for `next/image`. Marked `/listings` `force-dynamic` after discovering `next build` tried to statically prerender it and failed when the backend wasn't reachable at build time — listings change live and shouldn't gate the frontend build on backend uptime.
- Verified the full loop end-to-end locally: real listings ("inc forma 1.0 pen", "lenovo water bottle") rendered with real Supabase Storage photo URLs through Next's image optimizer.
- Got the backend's real Railway URL (`textdibs-backend-production.up.railway.app`, confirmed healthy) and added `DIBS_API_URL` to Vercel's Production and Preview environments via `vercel env add`.

## Status at end of session

Landing page live in production. Listings page built and functionally wired to the real backend/DB, verified locally; `DIBS_API_URL` now configured on Vercel but **not yet deployed** — the live site is still on the pre-listings build. Nothing on the `marketplace` branch has been committed or pushed yet. Next up: commit the listings work (both repos), push, and deploy so `/listings` goes live against the real Railway backend.
