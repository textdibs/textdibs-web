# Landing page plan (v1, bare-bones)

> Scope: the landing page only. The static listings browser is a separate, later effort — see "Deferred" below. Building incrementally, not all at once.

## Context

`textdibs-web` currently has no application code — just `CLAUDE.md` and `docs/tech_stack.md`. This doc plans the first, intentionally minimal version of the public site: a landing page that explains Dibs and gets people texting the number.

The static listings browser is explicitly deferred: `../textdibs-backend/docs/api_contract.md` states the listings endpoints/data shapes are "not yet defined," and building the browser now would mean designing against a guessed shape and reworking it once the backend contract lands. Per the MVP scope (`../textdibs-backend/docs/scope.md`, Sept 14 target), the landing page is the piece we can build correctly today with zero backend dependency — so it goes first.

**Inspiration note:** we looked at rid.me for competitive/design reference. It leads with a narrative iMessage-conversation hero as its main content. Dibs will *not* copy that pattern — we're doing a traditional marketing hero (headline/subhead/CTA) with a small supporting chat-mockup lower on the page, not as the centerpiece. This keeps v1 scope small (no interactive chat-mockup component to get right) and avoids reading as a copy.

**Branding:** no existing assets, so this plan proposes a minimal placeholder palette/typography (below) that's trivial to swap once real brand assets exist — nothing hardcoded in a way that resists a later re-skin.

## Scaffold

Initialize with `create-next-app` using the stack already decided in `docs/tech_stack.md` (Next.js App Router, TypeScript, Tailwind), targeting Vercel. Standard `src/` layout:

```
textdibs-web/
├── src/
│   ├── app/
│   │   ├── layout.tsx        # root layout, metadata, font
│   │   ├── page.tsx          # landing page composition
│   │   └── globals.css       # tailwind directives
│   ├── components/
│   │   └── landing/
│   │       ├── Header.tsx
│   │       ├── Hero.tsx
│   │       ├── ChatSnippet.tsx
│   │       ├── HowItWorks.tsx
│   │       └── Footer.tsx
│   └── lib/
│       └── config.ts         # NEXT_PUBLIC_DIBS_PHONE_NUMBER export
├── public/
│   └── (favicon, og-image placeholder)
├── .env.example
├── tailwind.config.ts
├── next.config.ts
├── tsconfig.json
└── package.json
```

## Page composition (`src/app/page.tsx`)

Single page, five sections, in order:

1. **Header** — wordmark "Dibs" (text, no logo asset yet), one CTA button ("Text Dibs") right-aligned. No nav links for v1 — there's nothing else to link to yet (no listings browser).
2. **Hero** — headline ("The marketplace in your texts"), one-line subhead pulled from `product.md`'s description, primary CTA button linking to an `sms:`/`imessage:` URI (see Phone number handling below). No secondary CTA.
3. **ChatSnippet** — a small, static, non-interactive styled mockup of one short exchange (photo in → "Posted for $25" out), positioned as supporting visual under/beside the hero, sized modestly so it reads as *supporting proof*, not the main content. Plain styled `div`s with Tailwind (chat-bubble shapes, no real iMessage UI chrome/branding to avoid implying an Apple product).
4. **HowItWorks** — two columns, Sell and Buy, each 3 short numbered steps pulled directly from `product.md`'s "Simple explanation" (sell: photo → agent prices/posts → connects you when a real buyer shows; buy: text what you want → agent finds/keeps looking, or browse — mention browsing as coming soon since there's nothing to click into yet).
5. **Footer** — minimal: © Dibs, contact email/mailto if we have one, nothing else. No social links (none exist yet).

No FAQ section for v1 — keeping this bare-bones; easy to add later once there are real user questions to answer.

## Phone number handling

The `sms:`/`imessage:` CTA needs a real number, which likely isn't finalized yet. Put it behind `NEXT_PUBLIC_DIBS_PHONE_NUMBER` in `.env.example` (empty/placeholder value) and read it via `src/lib/config.ts`. If unset, the Hero/Header CTA buttons render disabled with a "coming soon" tooltip instead of a dead `sms:` link — so the site is deployable before the number exists, and flipping it on later is a one-line env var change, no code change.

## Visual design (placeholder, swappable)

- **Typography:** `next/font` with Inter (system-sans fallback) — standard, free, no licensing to think about.
- **Palette:** neutral base (near-white background, near-black text) + a single accent color for CTAs/links. Recommend a warm accent (e.g. coral/orange) rather than iMessage's blue/green, so the site doesn't read as an Apple skin.
- All colors defined as Tailwind theme tokens in `tailwind.config.ts` (not hardcoded hex in components), so swapping to real brand colors later is a config-only change.

## Metadata / SEO

Basic Open Graph tags in `app/layout.tsx`'s `metadata` export: title ("Dibs — the marketplace in your texts"), description (from `product.md`), a placeholder `og:image`. Full OG-driven previews matter most for listing pages later (`api_contract.md`), but the landing page should still look right when shared.

## Deferred (not this doc)

- Listings browser, item detail pages, any backend fetch — blocked on `api_contract.md`'s endpoints/data shapes being defined.
- `openapi-typescript` type generation, `NEXT_PUBLIC_API_URL` usage — not needed until the browser exists.
- Vercel project setup / textdibs.com DNS — infra step in the Vercel dashboard, not a code change.
- FAQ section, testimonials, waitlist form — none of these are needed for a bare-bones v1.

## Verification (once built)

- `npm run dev` — check the page locally, confirm responsive layout at mobile and desktop widths (this is a public marketing page, mobile matters most).
- `npm run build` — confirm the production build succeeds (Vercel runs this on deploy).
- `npm run lint` and `npx tsc --noEmit` — confirm no type/lint errors.
- Manually click the "Text Dibs" CTA with a real phone number set in `.env.local` to confirm the `sms:`/`imessage:` link opens Messages correctly on a phone/simulator.
