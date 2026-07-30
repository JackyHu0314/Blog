# Project Notes

## Overview

- Personal blog built with Vite, React 19, Tailwind CSS v4, and React Router.
- Main content is stored in `src/data/` and rendered by pages in `src/pages/`.
- Music notes and playlists live in `src/data/music.js`; the listening-room page is `src/pages/Music.jsx`.
- Friend links live in `src/data/friends.js`; the public links and application page is `src/pages/Links.jsx`.

## Commands

- Install dependencies: `npm install`
- Start local dev server: `npm run dev`
- Build static output: `npm run build`
- Lint source: `npm run lint`
- Run comments Worker locally: `npm run comments:dev`
- Deploy comments Worker: `npm run comments:deploy`

## Deployment

- Static build output is generated in `dist/`.
- GitHub Pages deployment uses the generated static files plus `CNAME` for `www.jackyhu.top`.
- Comments are served by the Cloudflare Worker in `workers/comments/` with a D1 database binding.
- Copy `workers/comments/wrangler.jsonc` to the ignored `wrangler.local.jsonc` for account-bound D1 configuration; keep the tracked file as a credential-free template.

## Conventions

- Keep content bilingual where existing data objects use `{ zh, en }`.
- Keep global tokens, shell, navigation, and shared editorial primitives in `src/index.css`; keep one-off component styles scoped beside their component.
- Keep every artwork unique within the same visible card/list surface; do not reuse one image across multiple visible entries.
- Comment widgets must use the Turnstile action `comment`; keep the Worker hostname allowlist aligned with deployed domains.
- Keep the friend-link application comment ID `links:applications` stable so existing applications remain attached to the page.
- Do not commit generated `dist/` files to the source branch unless the deployment flow explicitly requires it.
- Never commit `.env`, `.dev.vars`, Turnstile secrets, D1 IDs from private accounts, or admin tokens.
