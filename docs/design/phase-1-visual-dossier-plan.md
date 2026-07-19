# Phase 1 Visual Dossier Plan

## Status

Active. This is the controlling plan for the next implementation phase.

Phase 1 is not a data-expansion phase. It is a visual implementation phase for
the `ResearchDossier` area. The goal is to make each selected UI style visibly
distinct through layout, typography, color, component states, and imagery or a
code-native scene.

Correction from user feedback: every style requires both a visible font-family
decision and a local image asset. A code-native scene is still required, but it
does not replace the image requirement.

## Source Inputs

- `spec.md`: default product direction, especially Modern SaaS with
  Minimal/Clean foundations and Enterprise/Admin as the dense operational mode.
- `SPEC2.md`: expanded style taxonomy and per-style visual/token notes.
- `docs/product/ui-design-style-explorer.md`: current product contract.
- `docs/design/style-dossier-asset-font-plan.md`: font and asset mapping.
- `docs/stories/US-003-phase-1-visual-dossier-workflow.md`: story packet and
  validation expectations.
- `vendor/fontawesome-pro-7.0.0/`: local FontAwesome Pro icon bundle. Prefer these
  icon assets for coded UI samples before adding or relying on external icon
  libraries.

## Harness Rule

Implementation must proceed one style at a time. A style cannot be marked
complete until:

- Its phase row in this document is updated.
- Its story evidence is updated.
- `npm run build` passes.
- Browser QA checks style selection, `Examples` tab, no horizontal overflow, and
  clean console logs.
- Any downloaded or generated asset is recorded in
  `public/style-assets/manifest.json`.

## Mandatory Font And Image Matrix

Each row is required before that style can be marked complete.

| Style | Font family requirement | Required image asset | Source requirement |
| --- | --- | --- | --- |
| Modern SaaS | Inter Variable for UI/display; IBM Plex Mono for technical labels. | `modern-saas-product-gradient-frame` under `public/style-assets/modern-saas/`. | Generate or download polished SaaS dashboard/product gradient frame. |
| Minimal/Clean | Inter Variable for UI/display; IBM Plex Mono only for code/meta. | `minimal-clean-paper-desk` under `public/style-assets/minimal/`. | Download quiet desk/paper/editor workspace crop or generate minimal paper texture. |
| Enterprise/Admin | IBM Plex Sans Variable for UI/display; IBM Plex Mono for IDs/data. | `enterprise-admin-data-grid` under `public/style-assets/enterprise/`. | Generate abstract enterprise data-grid/control-room backdrop. |
| Editorial/Portfolio | Newsreader Variable for display; Inter Variable for UI copy; IBM Plex Mono for metadata. | `editorial-case-study-photo` under `public/style-assets/editorial/`. | Download editorial architecture/studio/portfolio photo with usable license or generate equivalent. |
| Glassmorphism | DM Sans Variable for UI/display; Roboto Mono for chips. | `glass-gradient-backdrop` under `public/style-assets/glass/`. | Generate premium blue/violet blurred gradient backdrop. |
| Neo-brutalism | Space Grotesk Variable for UI/display; IBM Plex Mono for labels. | `neo-brutal-poster-texture` under `public/style-assets/neo-brutal/`. | Generate bold poster-paper/ink texture or download high-contrast paper texture. |
| Material/Fluent-like | Roboto Variable for UI/display; Roboto Mono for token labels. | `material-fluent-surface-stack` under `public/style-assets/material-fluent/`. | Generate layered surface/state-board backdrop; do not use official product screenshots. |
| Neumorphism | DM Sans Variable for UI/display; IBM Plex Mono for labels. | `neumorphism-soft-surface` under `public/style-assets/neumorphism/`. | Generate soft monochrome raised/inset surface texture. |
| Flat Design | Roboto Variable for UI/display; Roboto Mono for labels. | `flat-design-geometric-panels` under `public/style-assets/flat/`. | Generate or download flat geometric solid-color panels. |
| Skeuomorphism / Realistic UI | Fraunces Variable for display; Inter Variable for UI copy; IBM Plex Mono for metadata. | `skeuomorphic-paper-texture` under `public/style-assets/skeuomorphic/`. | Generate/download subtle paper/material texture. |
| Claymorphism / Soft 3D | Poppins for UI/display; IBM Plex Mono for labels. | `clay-soft-3d-object` under `public/style-assets/clay/`. | Generate soft pastel 3D UI object or background. |
| Dark Futuristic / Neon Tech | Space Grotesk Variable for UI/display; Roboto Mono for console labels. | `dark-tech-grid-backdrop` under `public/style-assets/dark-tech/`. | Generate dark neon grid/interface backdrop. |
| Web 2.0 Gloss / Frutiger Aero | Poppins for UI/display; Roboto Mono for small labels. | `web20-aqua-gloss-texture` under `public/style-assets/web20/`. | Generate/download aqua sky/water/gloss texture. |

## Phase 1 Gates

| Gate | Purpose | Required output |
| --- | --- | --- |
| P1.0 Harness alignment | Prevent more ad hoc implementation drift. | Story, matrix row, trace, this plan. |
| P1.1 Modern SaaS | Establish the quality bar for a full visual dossier. | Completed code-native product dashboard dossier. |
| P1.2 Minimal/Clean | Prove the quiet text-first baseline. | Document/editor scene with minimal controls. |
| P1.3 Enterprise/Admin | Prove dense operational UI. | Filter/table/KPI/settings scene. |
| P1.4 Editorial/Portfolio | Prove image-led storytelling. | Local/generated editorial image plus typographic layout. |
| P1.5 Glassmorphism | Prove layered translucent UI without losing readability. | Local/generated backdrop plus safe glass panels. |
| P1.6 Neo-brutalism | Prove high-contrast poster UI. | Local/generated poster texture plus blocks, thick borders, hard states. |
| P1.7 Material/Fluent-like | Prove system-language anatomy. | Local/generated surface-stack image plus state-layer component board and dialog/form anatomy. |
| P1.8 Neumorphism | Prove tactile UI with accessibility safeguards. | Local/generated soft-surface texture plus raised/inset widgets and explicit focus/contrast cues. |
| P1.9 Flat Design | Prove flat UI without weak affordance. | Local/generated flat geometric image plus solid panes, simple icons, strong active/focus states. |
| P1.10 Skeuomorphism | Prove realistic/object-inspired UI. | Local/generated texture/material scene and beveled controls. |
| P1.11 Claymorphism | Prove soft 3D playful UI. | Local/generated pastel 3D image plus inflated scene and chunky controls. |
| P1.12 Dark Futuristic | Prove dark technical UI. | Local/generated dark tech backdrop plus console/grid workflow scene with moderated glow. |
| P1.13 Web 2.0 Gloss | Prove glossy nostalgia UI. | Local/generated aqua/gloss image plus gel controls and texture. |
| P1.14 Final sweep | Confirm all styles meet the same bar. | Browser QA summary and matrix evidence update. |

## Per-Style Plans

### P1.1 Modern SaaS

Status: completed. The required local image asset remains wired into the
dossier, and the open anatomy decision has been resolved by keeping the raster
hero while restoring a separate code-native anatomy module below it.

- Font: Inter Variable; IBM Plex Mono for technical labels.
- Image asset: `modern-saas-product-gradient-frame` is stored at
  `public/style-assets/modern-saas/modern-saas-product-gradient-frame.png` and
  recorded as `available` in `public/style-assets/manifest.json`.
- Layout: the hero uses the user-provided generated Modern SaaS UI reference as
  a single image frame. The previous extra product mockup box below the image
  was removed, and `.modern-saas-hero-panel` no longer has its own visual
  border/background/shadow/padding.
- Dossier navigation: `Overview`, `Tokens`, `Patterns`, and `Examples` render
  as stacked sections. The tab bar is full-width, sticky, and scrolls to the
  selected section instead of swapping hidden tab panels.
- Required UI anatomy included: a separate `modern-saas-product` module now
  provides a code-native primary workflow input, action button, metric cards,
  chart/state card, and workflow card so the style no longer relies on the
  raster hero alone for the anatomy checklist.
- Examples treatment: the Modern SaaS visual example board remains below the
  stacked content.
- Validation: `npm run build` passed on 2026-07-09 after adding the anatomy
  board. Browser QA confirmed the hero asset still loads at natural size
  `1586x992`, the anatomy module is present, includes an input, action button,
  and four code-native anatomy cards, the `Examples` section remains present,
  no horizontal overflow occurs, and console warnings/errors are clean.
- Token audit (2026-07-11): migrated the dossier to the research explanation
  contract with six contextual color roles, seven visual rules showing exact
  runtime values, four local usage examples, and explicit distinguishing
  signals. Browser QA confirmed the horizontal color row and no page overflow.

### P1.2 Minimal/Clean

Status: completed. The FontAwesome-backed pass has been rerun in browser QA and
the current code-native workspace now meets the Phase 1 checklist for this
style.

- Font: Inter Variable for the visible UI; IBM Plex Mono remains reserved for
  compact metadata only if needed later.
- Icon source: the temporary `lucide-react` first pass has been replaced with a
  local FontAwesome Pro subset sourced from
  `vendor/fontawesome-pro-7.0.0/FontAwesome.Pro.7.0.0/svgs/` and copied into
  `src/assets/icons/fontawesome/` for runtime use.
- Image asset: `minimal-clean-paper-desk` is stored at
  `public/style-assets/minimal/minimal-clean-paper-desk.png` and recorded as
  `available` in `public/style-assets/manifest.json`.
- Layout: quiet document/editor workspace with top toolbar, search input, left
  outline navigation, readable editor canvas, local image-supported paper
  module, restrained note card, and checklist cards.
- Required UI anatomy included: monochrome primary button, outline secondary
  button, search input, border-first card, muted ready badge, clear icon
  controls, and checklist/status treatments.
- Examples treatment: current global stacked `Examples` section remains
  data-driven; a Minimal/Clean-specific visual mini-module can be added after
  approving the main workspace sample.
- Visual guardrails: white/near-white surfaces, very low shadow, clear
  whitespace, no decorative gradients.
- Validation: `npm run build` passed on 2026-07-09 after the DecisionRail key
  fix and Modern SaaS anatomy follow-up. Focused browser QA reconfirmed the
  Minimal/Clean renderer still uses the local `1400x900` asset, exposes
  `12` SVG icons, keeps the `Examples` section present, has no horizontal
  overflow on desktop or at `390x844` mobile viewport, and keeps console
  warnings/errors clean.
- Token audit (2026-07-11): added six contextual color roles, seven visual
  rules with exact values used by the document workspace, four local usage
  examples, and explicit distinguishing signals. Browser QA confirmed the
  horizontal color row and no page overflow.

### P1.3 Enterprise/Admin

Status: completed.

- Token audit (2026-07-11): added six contextual color roles, seven visual
  rules with exact values used by the operational UI, four local usage
  examples, and explicit distinguishing signals. Browser QA confirmed the
  horizontal color row and no page overflow.

- Font: IBM Plex Sans Variable; IBM Plex Mono for operational IDs.
- Image asset: `enterprise-admin-data-grid` is stored at
  `public/style-assets/enterprise/enterprise-admin-data-grid.png` and recorded
  as `available` in `public/style-assets/manifest.json`.
- Layout: admin dashboard with filter bar, KPI row, table, status chips,
  settings/action rail, and a local generated control-room backdrop.
- Required UI anatomy: compact primary button, secondary button, select/filter
  control, table row card/panel, status badge, error/help state.
- Examples treatment: mini modules for settings workflow, data table, and audit
  status, plus a dedicated visual example board.
- Visual guardrails: explicit dividers, compact density, conservative motion,
  no marketing-style hero composition.
- Validation focus: scan speed, table alignment, mobile stacking, clear action
  hierarchy.
- Validation:
  - `npm run build` passed on 2026-07-09 after wiring the enterprise asset and
    hero/example board.
  - Local asset check confirmed
    `/style-assets/enterprise/enterprise-admin-data-grid.png` returns `200`.
  - The dossier now renders the generated backdrop in both the catalog preview
    and the Enterprise/Admin hero scene.

### P1.4 Editorial/Portfolio

Status: completed.

- Font: Newsreader Variable for display; Inter Variable for UI copy.
- Image asset: `editorial-case-study-photo`; must be downloaded or generated
  and stored locally before completion.
- Layout: image-led case-study page with asymmetrical typography and restrained
  navigation.
- Required UI anatomy: understated CTA, quiet secondary link/button, newsletter
  input, image/story module, category badge, caption treatment.
- Examples treatment: mini modules for campaign landing, case study, and
  portfolio index.
- Visual guardrails: imagery and typography carry the style; do not turn it into
  a dashboard.
- Validation focus: image crop, readable overlay/caption text, mobile rhythm.
- Current evidence:
  - Implemented an image-led case-study layout with project metadata, restrained
    CTAs, gallery captions, journal content, and newsletter treatment.
  - Added the research explanation layers for style principles, local dossier
    usage, horizontal color roles, and visual rules with the exact values used
    by the current Editorial implementation.
  - `npm run build` passed on 2026-07-11.
  - Desktop Browser QA at `1280x720` confirmed the dossier content,
    no page-level horizontal overflow, and clean console logs.
  - Recorded all six user-downloaded Editorial photos in
    `public/style-assets/manifest.json` with local paths, measured dimensions,
    retrieval date, and an explicit note that original URLs, authors, and
    license details were not retained. The files were preserved unchanged.
  - Mobile Browser QA at an explicit `390x844` viewport confirmed the selected
    Editorial dossier, the `Examples` tab interaction, loaded local images,
    no document/body horizontal overflow, and clean console warnings/errors.
  - The five photos currently referenced by the renderer loaded successfully at
    their recorded natural dimensions. The sixth downloaded photo remains
    preserved and cataloged for future Editorial use.

### P1.5 Glassmorphism

Status: completed.

- Font: DM Sans Variable for UI, Newsreader Variable for display emphasis, and
  Roboto Mono for technical labels.
- Image asset: generated `glass-forest-backdrop.png` at `1672x941`, stored under
  `public/style-assets/glass/` and recorded as available in the asset manifest.
- Layout: a compact inner-dossier canvas with no duplicate sidebars. It includes
  a Forest Glass hero, contextual token strip, Navigation/Data/Modal examples,
  and a visual-rules summary.
- Required UI anatomy: solid amber primary button, glass secondary button,
  translucent input with visible focus state, frosted cards, natural status
  badge, contrast-safe modal panel, and solid `#192F28` fallback.
- Image strategy: the hero uses the full local asset; Navigation and Data cards
  reuse different crops with independent tint/opacity so the page loads only
  one production raster.
- Background: combines the selected `#192F28` base with deep teal, muted jade,
  moss, and restrained amber radial/linear gradients.
- Validation:
  - `npm run build` passed on 2026-07-11.
  - Browser QA at `1280x720` confirmed the selected Glassmorphism renderer,
    loaded `1672x941` asset, active backdrop blur, three example modules, no
    horizontal overflow, and clean console logs.
  - Browser QA at `390x844` confirmed the responsive header/action grid,
    readable Forest Glass hero, single-column examples/tokens, loaded local
    asset, no horizontal overflow, and clean console logs.
  - A first mobile pass exposed clipped CTA/copy behavior; the final breakpoint
    uses a full-row status, two-column CTA grid, and constrained hero copy.

### P1.6 Neo-brutalism

Status: completed.

- Font: Space Grotesk Variable; IBM Plex Mono for labels if needed.
- Image asset: `neo-brutal-poster-texture`; must be downloaded or generated and
  stored locally before completion.
- Layout: poster-like UI with hard blocks, thick borders, and direct hierarchy.
- Required UI anatomy: loud primary button, outlined secondary button, heavy
  input, hard-shadow card, sticker badge, pressed state sample.
- Examples treatment: mini modules for creator tool, campaign CTA, and pricing
  card.
- Visual guardrails: high contrast without burying content; use loud color
  intentionally.
- Validation focus: no text clipping inside thick framed controls; accessible
  contrast.
- Current evidence (2026-07-13): implemented the code-native poster layout with
  the required controls, card, sticker, progress/status, and pressed-state
  anatomy. Added a second switchable Signal Pop palette using electric violet,
  cyan, orange, and lavender. The generated local poster texture is wired from
  `public/style-assets/neo-brutal/neo-brutal-poster-texture.png`. Build passed;
  desktop and `390x844` mobile Browser QA confirmed both variants, no horizontal
  overflow, and clean console logs.

### P1.7 Material/Fluent-like

Status: completed.

- Font: Roboto Variable; Roboto Mono for token/state labels.
- Image asset: `material-fluent-surface-stack`; must be generated and stored
  locally before completion.
- Layout: reference-matched three-column visual system board with a dedicated
  left surface/field column, central toolbar/state/card column, and right token
  column for color, elevation, shape, spacing, and motion.
- Required UI anatomy: filled button, tonal/outlined button, text field, card,
  chip/badge, dialog footer.
- Examples treatment: mini modules for component states, form anatomy, and app
  scaffold.
- Visual guardrails: communicate design-system language, not a single trend.
- Validation focus: state consistency, semantic labels, focus/disabled states.
- Current evidence (2026-07-13): refined the approved reference-matched board
  into an explicit three-column dossier. The left column now uses a new local
  layered surface visual plus field states; the center column holds the
  toolbar, six-cell state matrix, and card/action specimens; the right column
  holds five token specimen sections. Added descriptions beside each item and
  wired the generated local assets from `public/style-assets/material-fluent/`.
  Material semantic roles and seven visual rules are recorded in the data
  contract. Build passed; desktop `1280x720` and mobile `390x844` Browser QA
  confirmed asset loading, no horizontal overflow, and clean console logs.

### P1.8 Neumorphism

Status: completed (asset attachment intentionally waived by user).

- Font: DM Sans Variable; IBM Plex Mono for labels.
- Image asset: `neumorphism-soft-surface`; must be generated and stored locally
  before completion.
- Layout: soft control panel with raised cards, inset controls, and explicit
  accessible signifiers.
- Required UI anatomy: raised button, inset secondary/control, inset input,
  embossed card, status badge, focus ring that breaks the low-contrast trap.
- Examples treatment: mini modules for media control, wellness widget, and
  settings toggle.
- Visual guardrails: never rely on shadow-only affordance; increase contrast for
  text and focus.
- Validation focus: clickable affordance, text contrast, mobile spacing.

Completion evidence: implemented the Calm Control Room code-native dossier with
an accessible labeled input, raised and inset controls, explicit focus-safe
state, media board, and three example modules. `npm run build` and Browser QA
at desktop plus `390x844` mobile passed with no horizontal overflow or console
warnings/errors. The data-driven Overview, Tokens, Patterns, and Examples were
also updated with contextual color roles, applied runtime rules, usage notes,
and accessibility-aware guidance. The required raster was generated for possible later use but
was intentionally not attached to this layout by user direction.

### P1.9 Flat Design

Status: in_progress.

Current implementation: the selected B2 direction uses a cool canvas, ink
text, teal/aqua interactive states, coral status, and yellow information
blocks. The code-native dossier now includes a mobile list, an explicit
default/hover/selected/focus/disabled state matrix, a settings form, and three
principle strips. It intentionally uses no decorative shadows or gradients.

- Font: Roboto Variable; Roboto Mono for labels.
- Image asset: `flat-design-geometric-panels`; must be downloaded or generated
  and stored locally before completion.
- Layout: flat app screen with solid panes, icon-like blocks, simple nav, and
  active-state panels.
- Required UI anatomy: solid primary button, flat secondary button, bordered
  input, divider-based card, rectangular badge, active selection state.
- Examples treatment: mini modules for mobile app, tile dashboard, and settings
  form.
- Visual guardrails: add clear state cues so flat does not become ambiguous.
- Validation focus: affordance, active/focus state visibility, no accidental
  depth.

### P1.10 Skeuomorphism / Realistic UI

Status: completed.

- Font: Fraunces Variable for display; Inter Variable for UI copy; IBM Plex Mono
  only for small metadata.
- Image asset: `skeuomorphic-paper-texture`; must be downloaded or generated
  and stored locally before completion.
- Layout: object-inspired workspace such as notebook, audio panel, or realistic
  control surface.
- Required UI anatomy: beveled button, secondary inset button, framed input,
  textured panel/card, stamped badge, tactile pressed state.
- Examples treatment: mini modules for notebook metaphor, instrument controls,
  and onboarding card.
- Visual guardrails: keep body copy on solid quiet surfaces; avoid novelty over
  usability.
- Validation focus: texture does not reduce legibility; controls still look
  modern enough for the explorer.
- Completion evidence (2026-07-19): implemented the selected **Signal Desk**
  audio-control layout as a code-native research console. It includes source
  selection, stereo meters, a framed command input, primary/secondary/pressed
  controls, activity waveform, task queue, tactile control strip, material
  anatomy rail, and three contextual examples.
- Asset: generated the local `1536x1024` paper texture at
  `public/style-assets/skeuomorphic/skeuomorphic-paper-texture.png`; the asset
  is recorded as available in `public/style-assets/manifest.json` with source,
  dimensions, and retrieval date. Texture is limited to framing and swatches;
  command and research copy remain on quiet opaque reading surfaces.
- Validation: `npm run build` passed. Browser QA at desktop `1270px` and mobile
  `390x844` confirmed Skeuomorphism selection, `Examples` tab interaction,
  loaded local texture, no page or console horizontal overflow, and no console
  warnings/errors. A desktop clipping issue in the three-column workspace was
  corrected with dossier-width-aware breakpoints before final verification.

### P1.11 Claymorphism / Soft 3D

Status: completed (2026-07-19).

- Font: Poppins for the Bloom Studio interface; IBM Plex Mono only for compact
  labels such as `Learning library` and `Weekly rhythm`.
- Asset: generated and stored local `1536x1024` Bloom Studio learning-orbit
  background at `public/style-assets/clay/clay-soft-3d-object-bloom.png`.
  The asset intentionally has an opaque lavender copy zone rather than an
  imperfect chroma-key cutout, so thin orbit loops retain clean edges. Its
  provenance, dimensions, status, and final path are recorded in the manifest.
- Layout: implemented the user-approved Bloom Studio direction with one shared
  workspace shell and two real inner tabs. `Explore` presents the protected
  hero, search control, selected topic cards, pulse, and schedule. `Progress`
  presents milestones, an explicit 60% current-course meter, achievements, and
  focus-time companion.
- Required UI anatomy: chunky primary actions, secondary action, real rounded
  search input, inflated cards, explicit status pill, selected topic state,
  readable milestone state, and focus dial are all code-native and responsive.
- Examples treatment: onboarding, education, and wellness modules explain
  where playful soft depth helps without treating it as a generic admin style.
- Visual guardrails: one upper-left light direction, dark plum content text,
  visible indigo focus rings, text-based state/progress, low density, and no
  decorative loop animation on the generated object.
- Refinement: at constrained dossier widths, topic cards intentionally become a
  readable `2x2` grid, course actions form their own two-button row, and the
  example heading returns to a full-width row above three legible cards. Each
  soft surface now shares a subtle warm edge, upper-left highlight, and
  directional elevation; the selected topic uses a clay-lavender state instead
  of a visually foreign blue outline.
- Object and route refinement: each topic object, the current-course stack, and
  the encouragement plant now use code-native layered solids, upper-left
  highlights, material shading, and contact shadows. The Progress route is a
  visible underlying track with explicit milestone connectors: horizontal on
  desktop and vertical on mobile, so no stage is visually hidden.
- Validation: `npm run build` passed. Browser QA at desktop `1280x720` and
  mobile `390x844` confirmed Claymorphism selection, Explore/Progress tab
  switching, `Examples` navigation, loaded local image dimensions, no page or
  body horizontal overflow, and no browser warnings or errors.

### P1.12 Dark Futuristic / Neon Tech

Status: completed (2026-07-20).

- Font: Space Grotesk Variable; Roboto Mono for console/code labels.
- Image asset: `dark-tech-grid-backdrop` is stored locally as the user-selected
  `dark-tech-signal-grid-layout-reference.png` and recorded as available in the
  manifest. Per user direction, it is a composition reference and is not
  rendered in the dossier; the runtime scene remains code-native.
- Layout: the selected Signal Grid direction uses an incident rail, command
  terminal, deploy pipeline, dependency field, deploy controls, alert queue,
  and three service-health cards with restrained glow.
- Required UI anatomy: neon primary button, dark secondary button, command
  input, dark panel/card, luminous badge, terminal/status module.
- Examples treatment: mini modules for AI hero, devtool console, and system
  workflow.
- Visual guardrails: dark style must still support forms/tables; glow stays
  secondary to content.
- Validation focus: contrast, glare control, mobile legibility, no excessive
  decorative background.
- Main-layout evidence: implemented the user-selected **Signal Grid** as a
  code-native operational workspace. It includes live incidents, a system list,
  real command input, selectable deployment stages, workflow graph, deploy and
  rollback controls, alert queue, status badges, and service-health cards.
- Research-data evidence: added distinguishing signals, six contextual color
  roles, four dossier-usage notes, exact visual-rule usage, updated examples,
  revised do/don't guidance, and token recipes matching the runtime palette.
- Visual-content evidence: Overview and Examples now use opaque high-contrast
  dark surfaces that match the Signal Grid hierarchy instead of shared white
  cards.
- Build evidence: `npm run build` and `git diff --check` passed on 2026-07-20.
- Browser QA: completed on 2026-07-20 in the Codex in-app browser at desktop
  `1280x720` and mobile `390x844`. Both viewports selected Dark Futuristic,
  reached the `Examples` tab, kept the Signal Grid command input visible, and
  had no document or body horizontal overflow. The Environment selector and
  deployment-pipeline state were exercised; console warnings and errors were
  empty. Visual review confirmed readable opaque dark surfaces, restrained
  glow, and legible controls at the mobile breakpoint.

### P1.13 Web 2.0 Gloss / Frutiger Aero

Status: planned.

- Font: Poppins; Roboto Mono for small technical labels.
- Image asset: `web20-aqua-gloss-texture`; must be downloaded or generated and
  stored locally before completion.
- Layout: glossy eco-tech promo surface with sky/water/aqua cues and gel
  controls.
- Required UI anatomy: glossy gel primary button, glassy secondary button,
  inset glossy input, rounded tile/card, shiny pill badge, highlight line
  treatment.
- Examples treatment: mini modules for nostalgia promo, media tile, and themed
  CTA.
- Visual guardrails: use nostalgia intentionally; do not make it the default
  production style.
- Validation focus: avoid visual overload, maintain text contrast over glossy
  backgrounds.

## Phase 1 Exit Criteria

Phase 1 exits only when:

- All 13 style rows above are completed.
- `docs/stories/US-003-phase-1-visual-dossier-workflow.md` contains validation
  evidence for each style.
- Durable matrix marks US-003 implemented with current evidence.
- `public/style-assets/manifest.json` has accurate status for every used asset.
- Every style has a local image asset file referenced by its dossier or marked
  as deliberately deferred with a blocking note; no style may be called visually
  complete without the asset.
- The final browser QA covers desktop and mobile for the complete style set.
