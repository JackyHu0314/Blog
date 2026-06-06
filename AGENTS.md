# Project Notes

## Overview

- Personal blog built with Vite, React 19, Tailwind CSS v4, and React Router.
- Main content is stored in `src/data/` and rendered by pages in `src/pages/`.

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

## Conventions

- Keep content bilingual where existing data objects use `{ zh, en }`.
- Keep changes small and consistent with the existing component-level CSS style.
- Do not commit generated `dist/` files to the source branch unless the deployment flow explicitly requires it.
- Never commit `.env`, `.dev.vars`, Turnstile secrets, D1 IDs from private accounts, or admin tokens.
