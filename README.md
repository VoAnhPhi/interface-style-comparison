# UI Style Comparison Research

A React Vite research project for comparing UI/UX design styles with fast scanning, focused research dossiers, design tokens, and use-case recommendations.

The project is built as a visual reference workspace: search or filter styles, inspect one style deeply, compare token and fit signals, and keep the page scalable as more styles are added.

## Features

- App-shell research layout with a compact style catalog, dossier, decision rail, and comparison table.
- Search and tag filtering so the catalog can scale to many more styles.
- Bookmarkable `/styles/:slug` research dossiers with normalized `Overview`,
  `Visual DNA`, `Reference implementation`, `Patterns`, and `Same-context`
  sections, plus preserved `Tokens`, `Patterns`, and `Examples` tabs.
- Examples tab with real-world references, component anatomy, layout examples,
  implementation notes, and do/don't guidance.
- Compact style preview that keeps visual examples scannable without crowding the page.
- Surface fit matrix for landing pages, dashboards, portfolios, apps, docs, and experimental visuals.
- Comparison table for density, visual tone, best-fit use cases, and primary risks.
- Responsive layout for desktop and mobile research flows.

## Included Styles

- Modern SaaS
- Minimal / Clean
- Flat Design
- Enterprise / Admin
- Editorial / Portfolio
- Glassmorphism
- Neo-brutalism
- Material / Fluent-like
- Neumorphism
- Skeuomorphism / Realistic UI
- Claymorphism / Soft 3D
- Dark Futuristic / Neon Tech
- Web 2.0 Gloss / Frutiger Aero

## Tech Stack

- React 19
- Vite 6
- TypeScript
- CSS modules through plain `App.css`

## Getting Started

Install dependencies:

```bash
npm install
```

Run the local dev server:

```bash
npm run dev
```

By default, Vite serves the app at:

```text
http://127.0.0.1:5173
```

Build for production:

```bash
npm run build
```

Run the domain and application test suite:

```bash
npm test
```

Preview the production build:

```bash
npm run preview
```

## Project Structure

```text
src/
  App.tsx
  App.css
  main.tsx
  domain/research/
    normalized style records, validation, scenarios, and Explorer selectors
  data/
    designStyles.ts
      legacy compatibility records and renderer/token fallbacks
```

Key files:

- `src/data/designStyles.ts` stores the research data for each design style.
- `src/App.tsx` renders the research shell, style catalog, dossier tabs, decision rail, comparison table, and interaction state.
- `src/App.css` contains the visual system and style-specific preview treatments.

## Research Data Model

Each design style includes:

- Summary and emotional tone
- Visual characteristics
- Common patterns
- Recommended and avoided use cases
- Strengths, weaknesses, and accessibility risks
- Suitability matrix by surface type
- Token recipe for color, typography, radius, shadow, border, spacing, density, and motion

This makes the project useful both as a visual playground and as a lightweight decision aid for product design direction.

## Local Artifacts

This repository may contain local harness, agent, build, or indexing artifacts during development. They are intentionally ignored by Git:

- `node_modules/`
- `dist/`
- `.agents/`
- `.codebase-memory/`
- `harness.db*`
- `docs/`
- `scripts/`

Only the React app source and project configuration are intended to be pushed.

## Status

This remains a client-side research prototype. The current focus is normalized
research exploration and comparison foundations rather than production data
persistence or backend integration. The next Spec 3 dossier slice is
evaluation, product fit, related directions, and sources (`S3-DOS-002`).
