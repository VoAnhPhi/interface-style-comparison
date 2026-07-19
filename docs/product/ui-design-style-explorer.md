# UI Design Style Research Workspace

## Product Contract

The project provides a browser-based research surface for comparing UI design
styles. It is not a production UI library and does not define reusable component
APIs. Its job is to make style differences visible through compact scanning,
focused dossiers, token recipes, use-case fit, and accessibility notes.

The explorer explains a style through three separate layers:

1. **Style principle**: the visual logic that makes the style recognizable.
2. **Demo application**: how the local dossier makes that logic visible in one
   example layout.
3. **Comparative cue**: the clearest difference from a nearby style.

The local layout is evidence, not a canonical template. Token values are
descriptive visual roles and observed usage, not mandatory implementation rules.

The current product direction is "research nhanh nhưng sâu đủ ý": users should
quickly scan many styles, then deep-read one selected style without the page
becoming a wall of cards.

## Included Styles

Current implemented styles:

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

Reference languages and patterns from `SPEC2.md` should be modeled separately:

- Design-system languages: Material, Fluent, Apple HIG / Liquid Glass, IBM Carbon.
- Patterns/overlays: Bento Grid, Corporate Memphis, Aurora / Mesh Gradient,
  Monochrome / Swiss.

## Required Experience

- Users can scan all styles in a compact style catalog.
- Users can search and filter styles by name, tag, feeling, and use case.
- Users can select a style with keyboard-accessible buttons.
- The selected style shows characteristics, patterns, use cases, strengths,
  weaknesses, accessibility concerns, preview treatment, and token recipe.
- The dossier distinguishes style principle from the local demo and explains
  at least one comparative cue for the selected style.
- The selected style uses a focused research dossier with `Overview`, `Tokens`,
  `Patterns`, and `Examples` tabs.
- The `Examples` tab shows real-world references, component examples, layout
  examples, implementation notes, and do/don't guidance.
- The decision rail shows recommended use cases, surface fit, and notes.
- Desktop pointer interaction can simulate a touch point and drag-scroll
  scrollable regions such as the catalog.
- The app can hide comparison surfaces when they add too much density.

## Research Copy Rules

- Prefer source language from `spec.md` and `SPEC2.md` for user-facing
  descriptions.
- Keep catalog rows short: style name and feeling are enough for scan mode.
- Put deeper explanation in the dossier, not in the sidebar.
- Describe visual roles and relationships before exact values. Do not imply a
  style requires one font family, palette, or spacing scale to be valid.
- Label local layout references as demo application or observed usage, not as
  universal definitions of the style.
- Mark risky styles as appearances or experiments when appropriate; do not
  present Glassmorphism, Neo-brutalism, Neumorphism, Claymorphism, Dark
  Futuristic, or Web 2.0 Gloss as equally safe production defaults.

## Layout Direction

The app should use a stable shell:

```text
header
  brand + search

workspace
  style catalog
  research dossier
  decision guide
```

Future style-specific layout work should happen inside `ResearchDossier` through
`style.id -> dossierVariant`, not through eight unrelated page layouts.

## Out Of Scope

- Production design-system architecture.
- Reusable component library APIs.
- External image references.
- Authentication, persistence, backend APIs, or user-generated research data.
