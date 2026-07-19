# Research Workspace - Next Effects Notes

## Scope

This note records future directions for the UI style research page:

1. Smooth full-page scroll behavior.
2. Style-aware `ResearchDossier` layouts.
3. Expanded style taxonomy and copy extraction from `spec.md` and `SPEC2.md`.

These are research and design notes only. They are not implemented yet.

## Smooth Scroll Direction

Use [GSAP ScrollSmoother](https://gsap.com/docs/v3/Plugins/ScrollSmoother/) if the page needs a smoother full-page scrolling feel.

Why it fits:

- It is designed for vertical smooth-scrolling effects on ScrollTrigger-based pages.
- It keeps native scrolling behavior instead of replacing the page with fake scrollbars.
- It can pair with `ScrollTrigger` later if the research workspace needs pinned sections, scrubbed transitions, or scroll-linked reveals.

Recommended usage for this project:

- Treat ScrollSmoother as a later enhancement, not a default dependency yet.
- Use it only if the page becomes more story-driven or visually immersive.
- Keep research-tool usability first: native scroll, accessible focus behavior, and readable content should remain more important than cinematic motion.
- Avoid heavy smooth-scroll treatment inside dense catalog or dossier areas where users need precise scanning.

Initial implementation idea:

```tsx
// Future-only sketch, not current implementation.
ScrollSmoother.create({
  smooth: 0.8,
  effects: true,
});
```

Risk notes:

- Smooth scrolling can feel expensive or distracting in a research workspace.
- Test with keyboard navigation and reduced-motion preferences before shipping.
- Keep mobile behavior conservative; avoid forcing smooth effects on touch devices unless it feels natural.

## Style-aware ResearchDossier Direction

The idea of changing the `ResearchDossier` layout based on the selected UI style is strong, but the implementation should not create one completely separate layout per style.

Preferred model:

```ts
style.id -> dossierVariant
```

This keeps the system scalable when more design styles are added.

Recommended variants:

- `modern-saas`: balanced preview plus insight panels. This is the default
  production-friendly direction from `spec.md`.
- `minimal-clean`: text-first, quiet, low-decoration dossier. This should feel
  highly readable and durable.
- `enterprise-admin`: dense, table-like, operational layout. Use tighter
  spacing, explicit dividers, and clear status treatment.
- `editorial-portfolio`: typography-led layout with more whitespace and stronger
  text rhythm.
- `glassmorphism`: layered translucent treatment, but keep body text readable
  and contrast-safe.
- `neo-brutalism`: high-contrast blocks, stronger borders, direct hierarchy.
- `neumorphism`: soft/tactile preview only, with extra contrast safeguards.
- `flat-design`: flat solids, strong affordance states, minimal depth.
- `skeuomorphism`: realistic/object-inspired preview treatment for metaphorical
  tools, not dense dashboards.
- `claymorphism`: soft 3D, playful, low-density modules.
- `dark-futuristic`: dark canvas, neon accents, careful form/table moderation.
- `web20-gloss`: glossy aqua/eco-tech nostalgia for concept or promo surfaces.

Implementation direction:

- Keep one `ResearchDossier` component as the owner of content and state.
- Add a small variant map that controls layout class, token emphasis, preview anatomy, and content density.
- Reuse the same data model: `summary`, `strengths`, `weaknesses`, `accessibilityRisks`, `tokenRecipe`, `suitability`, and `commonPatterns`.
- Avoid copying the full component per style.
- Let the variant change presentation, not the research meaning.

Potential data shape:

```ts
type DossierVariant =
  | "balanced"
  | "dense"
  | "editorial"
  | "layered"
  | "brutal"
  | "quiet";

const dossierVariants: Record<string, DossierVariant> = {
  "modern-saas": "balanced",
  "enterprise-admin": "dense",
  "editorial-portfolio": "editorial",
  glassmorphism: "layered",
  "neo-brutalism": "brutal",
  "minimal-clean": "quiet",
};
```

Design guardrails:

- Do not let style-specific presentation make the research harder to scan.
- Keep headings, tabs, and major content groups stable across variants.
- Only change density, framing, typography emphasis, preview composition, and surface treatment.
- Accessibility risks must stay visible regardless of visual style.
- Every new style should map to an existing variant first; create a new variant only when the content genuinely needs it.

Recommended first pass:

1. Add `dossierVariant` mapping.
2. Add CSS classes like `.dossier-variant-dense`, `.dossier-variant-editorial`, and `.dossier-variant-layered`.
3. Start with 3 variants only:
   - `balanced`
   - `dense`
   - `editorial`
4. Expand to `layered`, `brutal`, and `quiet` after the first interaction pass feels stable.

## Expanded Taxonomy From SPEC2

`SPEC2.md` should guide the next content expansion. It separates the research
universe into three groups:

### Base visual styles

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

These should inform tokens, state modeling, component anatomy, accessibility,
and behavior. Do not present them as simple visual trends.

### Patterns and overlays

- Bento Grid
- Corporate Memphis
- Aurora / Mesh Gradient
- Monochrome / Swiss

These should become optional layout, brand, or background treatments layered on
top of base styles.

## Copy Extraction Guidance

The text in `spec.md` and `SPEC2.md` is useful UI copy. Future data updates
should extract:

- Executive summaries into project overview copy.
- Style profile paragraphs into dossier summaries.
- Token tables into `tokenRecipe` data.
- Risk sections into accessibility and caution notes.
- Fit matrix language into decision rail copy.
- Taxonomy language into category labels and filters.

Avoid compressing all research into one-word labels. The app should remain fast
to scan, but the dossier should preserve the nuance from the specs.
