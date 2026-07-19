# Surface Decision Guide - Option B Spec

## Goal

Replace the current `surface-fit-panel` card grid with a decision-support section.
The section should help the user choose a UI style by selecting a target surface first.

Reference image:

- `public/surface-decision-guide/option-b-reference.png`

Prepared icon sprite:

- `public/surface-decision-guide/icons.svg`

## Why This Direction

The current surface fit UI shows every style as a separate card, which makes comparison indirect.
Option B changes the mental model:

1. Choose a concrete product surface.
2. See the best style candidates ranked for that surface.
3. Read trade-offs and caution notes before choosing.

This is better for decision-making than another matrix because the previous sections already compare style details.

## Typography

Use the existing project typography tokens.

- Display heading: `var(--font-display)` = `Georgia, "Times New Roman", ui-serif, serif`
- UI/body text: `var(--font-sans)` = `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`
- Rank numbers: `var(--font-display)` to match the editorial number treatment in the reference
- Labels, chips, and priority labels: `var(--font-sans)`, uppercase, 0.72rem-0.8rem, 800-900 weight

Recommended scale:

- Section label: 0.82rem, 900, uppercase, 0.08em letter spacing
- Section title: clamp(3rem, 6vw, 5.25rem), display font, 0.95 line-height
- Section copy: 1.05rem-1.18rem, 1.6 line-height
- Selector title: 1rem, 850-900
- Selector description: 0.86rem
- Recommendation title: clamp(1.35rem, 2vw, 1.9rem)
- Caution text: 0.86rem, 1.45 line-height

## Layout And Spacing

Desktop target: section works inside the existing page shell width.

- Section outer margin-top: 72px from previous section
- Section panel padding: clamp(28px, 4vw, 48px)
- Section radius: 26px-32px
- Header row: 2 columns
  - left: title/copy, max 780px
  - right: help card, 340px-390px
- Main frame: 2 columns
  - left selector rail: 350px-390px
  - right recommendations: minmax(0, 1fr)
- Main frame gap: 28px
- Selector rail row height: 84px-96px
- Recommendation row min-height: 138px-158px
- Internal row padding: 18px-24px
- Repeated row gap: 14px
- Legend height: 64px-76px

Responsive:

- At <= 1120px: header and main frame collapse to 1 column.
- At <= 760px: selector rail becomes a horizontal scroll row or single-column stack.
- At <= 480px: rank, icon, copy, and priority bars stack vertically.

## Component Anatomy

### Section Header

- Label: `SURFACE DECISION GUIDE`
- Heading: `Choose the surface first.`
- Copy: concise explanation that each surface has different priorities.
- Help card:
  - icon: `bulb`
  - title: `How to use`
  - copy: `Pick a surface on the left. We'll rank styles based on what matters most.`

### Surface Selector

Rows:

- Landing - Marketing & conversion pages - icon `landing`
- Dashboard - Admin & analytics dashboards - icon `dashboard` - selected by default
- Portfolio - Personal & creative portfolios - icon `portfolio`
- Product App - Core product experiences - icon `product-app`
- Docs - Documentation & knowledge - icon `docs`
- Experimental - New ideas & prototypes - icon `experimental`

Selected state:

- Purple left accent bar, 6px wide
- Light purple background
- Purple icon and title
- Keep chevron as CSS or inline SVG, not text glyph

### Recommendation Board

Default selected surface: `Dashboard`.

Ranked rows:

1. Enterprise / Admin
   - traits: `Structured · Professional · Reliable`
   - note: `Optimized for clarity and data-heavy tasks`
   - icon: `enterprise`
   - caution: `Can feel rigid for highly creative or playful brands.`
2. Material / Fluent-like
   - traits: `Clean · Systemic · Familiar`
   - note: `Balanced and widely adaptable`
   - icon: `material`
   - caution: `Can feel generic without careful branding and detail.`
3. Modern SaaS
   - traits: `Friendly · Efficient · Contemporary`
   - note: `Fast to ship, approachable experience`
   - icon: `modern`
   - caution: `May struggle with very complex data hierarchy.`

Priority bars:

- Labels: Clarity, Density, Trust, Speed
- Use 4 short segments per priority.
- Green = strong, amber = trade-off, gray = weak/missing.
- Keep bars CSS-native for accessibility and exact control.

### Use Carefully Strip

Two compact rows:

- Glassmorphism - `Premium · Immersive` - icon `glass`
- Neo-brutalism - `Bold · Edgy · Experimental` - icon `brutal`

Purpose: show accent-only candidates without ranking them as primary choices.

### Legend

Three statuses:

- High fit - green dot - `Strong alignment with priorities`
- Trade-off - amber dot - `Works with compromises`
- Avoid as primary - red dot - `Low alignment with priorities`

## Color Tokens

Use existing project colors first.

- Text: `var(--text)` `#0f172a`
- Muted text: `var(--text-muted)` `#667085`
- Border: `var(--border)` and `var(--border-strong)`
- Accent purple: `var(--accent)` `#7c3aed`
- Purple deep: `#4c1d95`
- Purple soft: `rgba(124, 58, 237, 0.08)`
- High fit: `#16a34a`
- Trade-off: `#f59e0b`
- Avoid: `#dc2626`
- Weak segment: `#d1d5db`
- Panel background: `#ffffff`
- Page wash: existing light background, no new decorative orbs

## Icon Direction

Use the prepared SVG sprite at `public/surface-decision-guide/icons.svg`.

Implementation option:

```tsx
<svg aria-hidden="true" className="surface-icon">
  <use href="/surface-decision-guide/icons.svg#dashboard" />
</svg>
```

Icon styling:

- 22px-26px glyph size
- 46px-52px soft square icon container
- CurrentColor strokes
- Stroke width visually matches 1.8px
- Purple for selected/primary icons
- Slate for inactive icons
- Amber for caution icon

## Implementation Notes

Do not implement by placing the reference PNG into the app UI.
Use the PNG only as visual direction.
The final section should be HTML/CSS/React-native and data-driven.

Suggested data shape:

- `surfaceOptions`
- `surfaceRecommendations`
- `priorityLabels`
- `fitLegend`

Keep local state:

- `selectedSurface`, default `dashboard`

Do not remove the underlying `style.suitability` data. It can still feed secondary labels or future matrix views.
