# UI Style Comparison Research

A React Vite research project for comparing UI/UX design styles with interactive previews, design tokens, component examples, and use-case recommendations.

The project is built as a visual reference tool: choose a style, inspect its personality, compare tokens, and see how the same interface patterns shift across different design directions.

## Features

- Style gallery with multiple UI/UX directions.
- Sticky style rail for quick navigation.
- Selected style showcase with visual DNA, positioning, best-fit use cases, and risks.
- Interactive style preview with `Section`, `Components`, and `Tokens` modes.
- Component comparison panel showing the same UI pattern across styles.
- Token comparison table for color, radius, shadow, and density.
- Use-case recommendation panel for choosing a style based on product goals.
- Responsive layout for desktop and mobile exploration.

## Included Styles

- Modern SaaS
- Minimal / Clean
- Enterprise / Admin
- Editorial / Portfolio
- Glassmorphism
- Neo-brutalism
- Material / Fluent-like
- Neumorphism

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
  data/
    designStyles.ts
```

Key files:

- `src/data/designStyles.ts` stores the research data for each design style.
- `src/App.tsx` renders the style gallery, showcase, comparison panels, and interaction state.
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

This is an early research prototype. The current focus is visual exploration, style comparison, and interaction design rather than production data persistence or backend integration.
