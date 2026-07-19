# Project Report - UI Style Research Workspace

## Current Product

The app is a browser-based research workspace for comparing UI design styles.
It is not a production UI component library. Its job is to make design-style
differences clear enough for fast scanning and deep enough for practical product
direction decisions.

The current interface is organized as:

- `Style catalog`: compact list for scanning and selecting styles.
- `Research dossier`: focused detail panel for the selected style.
- `Decision guide`: quick fit, recommended use cases, risks, and surface match.
- Pointer/touch simulation: desktop cursor behaves like a touch point and can
  drag-scroll scrollable regions such as the style catalog.

The comparison table is currently hidden by request.

## Original Direction From `spec.md`

The first spec defines the strongest default direction as:

> Modern SaaS with a Minimal/Clean foundation.

Operationally, that means:

- Semantic tokens.
- Soft but not fragile surfaces.
- Generous spacing.
- Restrained elevation.
- Strong typography.
- Brand color used intentionally instead of everywhere.

The strongest production-safe style set from the original brief:

| Role | Style | Product meaning |
| --- | --- | --- |
| Default | Modern SaaS | Best balance of polish, reuse, and public demo value. |
| Secondary | Minimal/Clean | Quiet universal mode for docs, productivity, portfolios, and developer surfaces. |
| Secondary | Enterprise/Admin | Dense operational mode for dashboards, settings, tables, and forms. |
| Appearance only | Glassmorphism | Localized hero, overlay, or premium accent treatment. |
| Appearance only | Neo-brutalism | Experimental or campaign-specific treatment. |

The first spec also warns against making Glassmorphism or Neo-brutalism global
themes early because both can reduce usability and reusability when applied
system-wide.

## Expanded Research From `SPEC2.md`

`SPEC2.md` expands the project from 8 styles into a broader taxonomy:

### Core visual styles

- Modern SaaS
- Minimal/Clean
- Flat Design
- Enterprise/Admin
- Editorial/Portfolio
- Glassmorphism
- Neo-brutalism
- Neumorphism
- Skeuomorphism / Realistic UI
- Claymorphism / Soft 3D
- Dark Futuristic / Neon Tech
- Web 2.0 Gloss / Frutiger Aero

### Design-system languages

- Material / Material You
- Fluent
- Apple HIG / Liquid Glass
- IBM Carbon

These should be treated as reference languages for tokens, component behavior,
state modeling, and accessibility, not merely as visual trends.

### Patterns layered on styles

- Bento Grid
- Corporate Memphis
- Aurora / Mesh Gradient
- Monochrome / Swiss

These are not full themes. They are layout, brand, or background treatments
that can sit on top of multiple base styles.

## Research Taxonomy Rule

Do not flatten every item into a single list of equal "styles".

Use three levels:

1. **Base style**: changes the core visual system and token recipe.
2. **Design-system language**: informs tokens, states, accessibility, and
   component anatomy.
3. **Pattern/appearance**: local treatment layered onto a base style.

This is important for future layout and copy because a Bento Grid, an Aurora
gradient, and Material Design do not represent the same kind of decision.

## Research Explanation Contract

The workspace must distinguish a style from the particular dossier used to
demonstrate it. Every deep-read surface should communicate:

1. **Style principle**: the reusable visual logic behind the style.
2. **Demo application**: how the repository applies that logic in one local
   scene, clearly treated as an example rather than a canonical template.
3. **Comparative cue**: the decision-relevant difference from a nearby style.

Token content should explain visual roles, relationships, and observed use in
the demo before giving exact values. Exact font, color, radius, and spacing
choices are evidence or local implementation details, not the sole definition
of a valid style.

## Recommended Product Direction

The app should evolve from a simple style explorer into a research decision
surface:

- Fast scan first: compact catalog, clear labels, low text density.
- Deep read second: one selected style gets rich explanation, tokens, risks,
  use cases, and layout preview.
- Comparison last: compare only when it helps decision-making; avoid rendering
  every style as large cards at the same time.

## Copy Guidelines

Use text from `spec.md` and `SPEC2.md` as preferred source copy for:

- Style summaries.
- "Best for" and "avoid for" notes.
- Accessibility risks.
- Token recipe descriptions.
- Dossier body text.
- Future style cards.

Avoid generic filler such as "beautiful", "modern", or "clean" without a
specific product implication.

## Future Data Model Direction

The current `DesignStyle` model should eventually expand to include:

- `classification`: `base-style | design-system-language | pattern | appearance`.
- `visualWeight`: low, medium, high.
- `contrast`: low, medium, high.
- `density`: low, medium, high.
- `a11yRisk`: low, medium, high.
- `dossierVariant`: balanced, dense, editorial, layered, brutal, quiet.
- `sourceSpec`: `spec.md`, `SPEC2.md`, or future research source.
- `distinguishingSignals`: the style principles that make comparison useful.
- `dossierUsage`: local examples that show how the current dossier applies a
  principle without redefining the style.

This will let the UI explain the difference between a style, a system language,
and a pattern without hard-coding one-off layout logic.
