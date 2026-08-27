# textdibs-web

This repo is the landing page and public listings browser for Dibs — Next.js (App Router, TypeScript), Tailwind, deployed on Vercel. See `docs/tech_stack.md` for the full stack and reasoning.

No engineering conventions are locked in yet beyond what's in `tech_stack.md` — this is early enough that patterns haven't been established. Keep additions consistent with whatever's already there as the codebase grows, rather than assuming rules that haven't actually been decided.

## Product summary

Dibs is a marketplace that lives in iMessage: sellers text a photo and an agent handles pricing, posting, and buyer interest; buyers text what they want and an agent finds or keeps looking for a match. This repo (`textdibs-web`) is the public-facing piece — a landing page and static listings browser, with iMessage built into the flow so browsing can move into a conversation.

## Sibling repo

`textdibs-backend` is where the actual product lives: the iMessage agent, pricing/matching logic, and the API this repo consumes. For the full product doc (positioning, competitors, why now), read `../textdibs-backend/docs/product.md` — that's the canonical source, not duplicated here. That link only resolves if both repos are cloned side by side, which is the assumed local dev setup.

## Docs

- [Tech Stack](docs/tech_stack.md)
- Scope: no separate copy here — see `../textdibs-backend/docs/scope.md` (canonical, includes the web-relevant in/out items).
