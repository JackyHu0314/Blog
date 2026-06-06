# AGENTS.md

## Project Overview

- Personal blog built with Vite, React 19, React Router 7, and Tailwind CSS 4.
- The site supports Chinese/English language switching and light/dark themes.
- Static build output is generated in `dist/` and deployed as a static site.

## Common Commands

- Install dependencies: `npm install`
- Start development server: `npm run dev`
- Build for production: `npm run build`
- Lint: `npm run lint`
- Preview production build: `npm run preview`

## Repository Layout

- `src/main.jsx` bootstraps the React app.
- `src/App.jsx` defines app-level routes and composition.
- `src/pages/` contains top-level pages.
- `src/components/` contains reusable UI components.
- `src/context/` contains theme and language contexts.
- `src/data/` contains content data for journals, projects, and research.
- `src/data/journalMeta.js` contains lightweight journal metadata used by the landing page.
- `src/i18n/dictionary.js` contains translation strings.
- `public/` contains static assets copied by Vite.
- `dist/` is generated output and should not be edited by hand.

## Working Guidelines

- Prefer existing React component and styling patterns before introducing new abstractions.
- Keep bilingual copy in sync when changing user-facing text.
- Preserve the existing theme and language behavior when changing layout or navigation.
- Do not reuse the same image for multiple visible cards or entries unless the user explicitly asks for repeated artwork.
- When adding or editing journal entries, update `src/data/journalMeta.js` so landing page stats stay in sync without importing full article bodies.
- Run `npm run lint` and `npm run build` after meaningful source changes when feasible.
- Do not edit generated `dist/` files unless the user explicitly asks for deployment artifact changes.

## Conditional References

- For journal music, cover art, or article emotion-to-song matching work, read `docs/journal-music-matching.md` first.
