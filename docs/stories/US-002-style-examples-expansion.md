# US-002 - Style Examples Expansion

## Status

Partially implemented. The research data and component architecture are in
place, but the original visual goal is not complete yet.

## Goal

Expand the UI style research workspace so each style includes concrete examples,
implementation guidance, and a clearer taxonomy for follow-up research work.

## Implemented Scope

- Expanded `DesignStyle` with:
  - `classification`
  - `realWorldExamples`
  - `componentExamples`
  - `layoutExamples`
  - `implementationNotes`
  - `doDont`
- Added the five missing core styles from `SPEC2.md`:
  - Flat Design
  - Skeuomorphism / Realistic UI
  - Claymorphism / Soft 3D
  - Dark Futuristic / Neon Tech
  - Web 2.0 Gloss / Frutiger Aero
- Added an `Examples` dossier tab that shows:
  - Real-world references
  - Component examples
  - Layout examples
  - Do/don't guidance
  - Implementation notes
- Updated style preview treatments for the new styles.
- Updated product docs and README to reflect the expanded style set.

## Workflow Notes For Next Task

Next task should focus on making examples more visual, not broader. The data
model now has enough text structure; the highest-value next iteration is one of:

1. Add style-aware preview anatomy so Enterprise shows table/filter UI,
   Editorial shows typography/image composition, Glass shows a layered overlay,
   and Dark Futuristic shows a console-like surface.
2. Add taxonomy filters for `classification` so users can separate
   production-safe, expressive, experimental, historical-reference, and
   system-language styles.
3. Add source/reference fields if the research needs citations inside the app.
4. Add a compact comparison row for classification and primary example.

Font and asset preparation has been recorded in:

- `docs/design/style-dossier-asset-font-plan.md`
- `src/styles/fonts.css`
- `src/styles/styleDossierTokens.css`
- `public/style-assets/manifest.json`

Use Fontsource packages already installed in `package.json`; do not add Google
Fonts CDN links. Use local assets under `public/style-assets` for final imagery.

## Follow-up Implementation Completed

- Created shared `StylePreview` component at `src/components/StylePreview.tsx`.
- Created `ResearchDossier` shell and renderer map at
  `src/components/dossiers/ResearchDossier.tsx`.
- Moved each dedicated renderer into its own component file under
  `src/components/dossiers/styles/`.
- Added separate renderer files for:
  - `ModernSaaSDossier`
  - `MinimalCleanDossier`
  - `EnterpriseAdminDossier`
  - `EditorialPortfolioDossier`
  - `GlassmorphismDossier`
  - `NeoBrutalismDossier`
  - `MaterialFluentDossier`
  - `DarkFuturisticDossier`
  - `Web20GlossDossier`
  - `NeumorphismDossier`
  - `FlatDesignDossier`
  - `SkeuomorphismDossier`
  - `ClaymorphismDossier`
- Kept all tab content data-driven from `DesignStyle`.
- All 13 current styles now have dedicated dossier presentation components,
  but most are still first-pass structural mockups.
- Default renderer remains available as a fallback for future styles.

## Gap Against Original Plan

The original plan was to make each dossier visibly demonstrate the selected UI
style with:

- A distinct layout composition for that style.
- The chosen font family applied in the rendered dossier, not only recorded in
  docs.
- Style-specific button, input, card, badge, and surface states.
- Concrete illustrative imagery or a code-native visual scene where appropriate.
- Color, radius, shadow, texture, and motion choices that are obvious at first
  glance.
- Examples that feel like rendered UI, not only text lists.

Current implementation only partially satisfies this. It has style tokens and
separate components, but it does not yet provide a fully polished visual dossier
for every style. Asset folders are empty except `.gitkeep`, and
`public/style-assets/manifest.json` still marks all assets as `planned`.

## Final Renderer Pass Validation

- `npm run build` passes after the dedicated renderer pass.
- Browser QA passed for Neumorphism, Flat Design, Skeuomorphism / Realistic UI,
  and Claymorphism / Soft 3D on the `Examples` tab:
  - Correct style row selected via search.
  - Correct style-specific renderer class present.
  - Examples content present.
  - No horizontal overflow at the default browser viewport.
  - No browser console warnings or errors captured.
- Final cleanup renamed Web 2.0 and Claymorphism utility classes away from
  `orb`/`blob` wording and kept the build passing.

This validation only confirms that the structural renderer pass does not break
the app. It must not be treated as final visual completion.

## Corrected Workflow For Next Task

Implement one style at a time, starting with Modern SaaS, and do not mark a
style complete until all checks below pass.

This workflow has been promoted into the active Phase 1 plan:

- `docs/design/phase-1-visual-dossier-plan.md`
- `docs/stories/US-003-phase-1-visual-dossier-workflow.md`

Per-style completion checklist:

- Apply the mapped font family in the visible dossier layout.
- Build a style-specific hero/preview scene with full UI anatomy.
- Include at least one primary button, one secondary/quiet button, one input or
  control, one card/panel, and one badge/status treatment.
- Use local/generated imagery only when it materially helps the style; otherwise
  use code-native HTML/CSS UI mockups.
- Make the `Examples` tab feel visual by pairing examples with rendered mini
  modules, not plain text only.
- Verify desktop and mobile readability, no horizontal overflow, and no console
  errors.
- Record assets, font family, and validation notes in this workflow log.

Current visual implementation order:

1. Modern SaaS full visual dossier pass. Completed in correction pass.
2. Minimal/Clean full visual dossier pass.
3. Enterprise/Admin full visual dossier pass.
4. Editorial/Portfolio with local/generative imagery.
5. Glassmorphism with generated/local backdrop.
6. Neo-brutalism code-native poster UI.
7. Material/Fluent component-state anatomy.
8. Neumorphism with explicit affordance/focus safeguards.
9. Flat Design with strong state cues.
10. Skeuomorphism with generated/local texture.
11. Claymorphism with generated/local object only if useful.
12. Dark Futuristic console/grid UI.
13. Web 2.0 Gloss with generated/local aqua/gloss texture.

## Modern SaaS Visual Dossier Pass

Status: completed.

- Font: uses `Inter Variable` for the visible dossier and `IBM Plex Mono` for
  the workspace URL control.
- Imagery mode: code-native HTML/CSS product dashboard mockup. No raster image
  needed for this style.
- Visual anatomy added:
  - Product dashboard hero scene.
  - Primary gradient CTA and quiet secondary CTA.
  - Workspace URL input/control.
  - Production status badge.
  - Metric cards, chart card, workflow card, integration chips.
  - Modern SaaS example board on the `Examples` tab.
- Validation:
  - `npm run build` passes.
  - Browser QA for `Modern SaaS` on `Examples` tab passes.
  - `.modern-saas-dossier-layout`, `.modern-saas-product`, and
    `.modern-saas-example-board` are present.
  - Five Modern SaaS buttons and the workspace input are rendered.
  - No horizontal overflow at the default browser viewport.
  - No console warnings or errors captured.
- Cleanup:
  - Removed negative `letter-spacing` values from app CSS to keep visual
    rendering stable.

Next implementation choices after Modern SaaS:

1. Add local/generative assets for Editorial, Glass, Skeuomorphic, Clay, Dark
   Futuristic, and Web 2.0 Gloss only after the renderer layout needs them.
2. Add classification filter controls once the visual differentiation pass is
   stable.
3. Add mobile viewport QA with a stable browser runner if the in-app viewport
   override remains slow or unreliable.

## Validation Target

Run `npm run build` after any follow-up edit. For visual edits, also check:

- Catalog still scrolls with 13 styles.
- Selecting a new style updates all four tabs.
- `Examples` tab is readable on desktop and mobile.
- Search finds style names, tags, classification labels, use cases, and example
  labels.
