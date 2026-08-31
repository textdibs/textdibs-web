# Baldeep Session 2 — Backend connection

> Continues from [Session 1](2026-08-30-baldeep-session-1.md). Covers wiring the listings browser to the real backend end-to-end: a detail page, resilience when the backend is unreachable, and a direct-to-Supabase fallback. Backend work lives on `textdibs-backend`'s `listings-api` branch (pushed, not merged to `main`); frontend work continues on `marketplace` (still uncommitted).

## Why the frontend calls the backend at all

Talked through why `textdibs-web` doesn't just read Postgres/Supabase directly as the primary path, since the two repos share one DB:

- **Credentials** — direct DB access means a second production secret (DB connection string or service-role key) living in Vercel with a bigger blast radius if it leaks from the public-facing repo.
- **Duplicated logic** — "what counts as a public listing" (status active, title/description/price set, don't leak `seller_id`) lives in Python today; querying tables directly means re-implementing and maintaining the same rules in TypeScript, which drift apart over time.
- **Schema coupling** — the frontend would be coupled to exact column names; a backend migration could silently break it instead of being caught at a contract boundary.

This is the reasoning already captured in `../textdibs-backend/docs/api_contract.md`, not a new decision — restated here because it directly informed the fallback design below (API stays primary, direct-DB is a fallback only).

## Backend branch hygiene

The `/listings` + `/listings/{id}` endpoints from Session 1 had been sitting as an uncommitted change directly on `textdibs-backend`'s `main`. Moved to its own branch instead:

- `git checkout -b listings-api` (carries the uncommitted change), committed (`8871651 Add GET /listings and GET /listings/{id} endpoints`), pushed to `origin/listings-api`.
- `main` confirmed clean and untouched — nothing merged.
- **Known gap:** if Railway deploys from `main` (unconfirmed), the production backend does not yet have these endpoints — the live site's listings pages would 404/fail against it until this branch is deployed or merged.

## Listing detail page

Built `src/app/listings/[id]/page.tsx`:

- Full photo, title, price, and the complete `description` text (the grid card only shows a truncated view).
- `generateMetadata` pulls real per-listing Open Graph/Twitter tags (title, description, photo) so a shared listing link shows real content — the exact concern `api_contract.md` calls out for link-preview bots.
- 404s via `notFound()` when a listing doesn't exist or isn't publicly viewable.
- `getListing(id)` added to `src/lib/listings.ts` (mirrors `getListings()`).
- `ListingCard` now links each grid item to `/listings/{id}`.
- `TextDibsButton`/`smsHref` extended to accept an optional `body` param, so the detail page's CTA prefills `Is the "{title}" still available?` in the sms body.
- Confirmed locally: backend running on `listings-api` returns real rows (ids 34, 45); grid links, detail rendering, OG tags, and 404 handling all verified via curl.

## Local dev gotcha

Running the frontend locally against real data requires the backend on the `listings-api` branch specifically — `main` doesn't have the listings endpoints. Documented as a one-time local setup step (`git checkout listings-api` in `textdibs-backend` before `uvicorn app.main:app --reload --port 8000`).

## Error boundary for backend outages

Added `src/app/listings/error.tsx` — a friendly "Couldn't load listings" screen with a Try again button, scoped to the `/listings` segment (covers both the grid and `/listings/[id]`), instead of the page hard-crashing when the backend is down.

**Debugging note (cost real time, worth remembering):** verifying this with `curl` looked broken — kept returning Next's raw `__next_error__` shell with a 500, in both dev and `next start` production mode. Root cause: `error.tsx` boundaries are Client Components by design, so the friendly fallback only renders **after the JS bundle hydrates in an actual browser** — curl never executes JS, so it can never show it. The initial server response for an error state is intentionally a minimal shell; this is normal App Router behavior, not a bug. Confirmed the RSC payload does carry the error correctly (`5:E{"digest":...}` wired to the route's error slot). Lesson: don't use curl to verify client-rendered error boundaries.

Also killed a couple of leftover local `next dev`/`next start` processes (including, briefly, the user's own dev server on port 3000) while chasing this — background dev-server processes don't reliably get cleaned up between separate tool calls, worth remembering for next time.

## Direct-to-Supabase fallback

Prompted by the backend actually being unreachable locally: added a fallback so listings pages degrade gracefully instead of erroring when `textdibs-backend` is down, without abandoning the API as the primary path.

- `src/lib/listings.ts` — `getListings()`/`getListing(id)` try the backend API first; on a fetch failure (not a real 404 — that still returns `null`/not-found immediately) they fall back to querying Supabase's `listing` table directly via its PostgREST API, applying the identical filter the backend uses (`status=eq.active`, non-null `title`/`description`/`price`) so results match what the API would have returned.
- Reuses the same Supabase project URL + service-role key `textdibs-backend` already holds for Storage (`app/storage.py`) — new `supabaseUrl`/`supabaseServiceRoleKey` in `src/lib/config.ts`, server-only, never exposed to the client.
- `.env.example` documents `SUPABASE_URL`/`SUPABASE_SERVICE_ROLE_KEY`; real values copied from `textdibs-backend/.env` into `textdibs-web/.env.local` via shell redirection (values never printed to the conversation).
- Added both to Vercel Production + Preview via `vercel env add`, piped from `.env.local` — never echoed. Vercel now holds `DIBS_API_URL`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `NEXT_PUBLIC_DIBS_PHONE_NUMBER` across both environments.
- Verified end-to-end with the backend fully down (`ECONNREFUSED`): both `/listings` and `/listings/45` still rendered real Supabase data at 200, no error page shown.

## Open / deferred

- Explained a Next.js dev warning (`<Image>` flagged as LCP, suggesting `priority`) on `ListingCard`'s grid images — not yet applied, next small fix if wanted.
- Production Railway backend likely still lacks the listings endpoints (only on unmerged `listings-api`) — real production `/listings` behavior against Railway hasn't been verified, only local.
- Nothing from this session is committed on the `textdibs-web` side yet (`marketplace` branch); `textdibs-backend`'s `listings-api` branch is committed and pushed but not merged, per explicit instruction.

## Status at end of session

Listings browser now has a working detail page and degrades gracefully (via direct Supabase reads) when the backend API is unreachable, verified locally in both failure and success modes. Vercel is fully provisioned for both paths. Still open: decide how/when `listings-api` reaches Railway's production backend, add `priority` to grid LCP images, and commit/push the accumulated frontend work.
