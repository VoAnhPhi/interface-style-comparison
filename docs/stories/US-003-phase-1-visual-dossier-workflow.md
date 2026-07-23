# US-003 Phase 1 Visual Dossier Workflow

## Status

in_progress

## Lane

normal

## Product Contract

Phase 1 must turn the current style-specific `ResearchDossier` scaffolds into
visually complete dossier layouts, one style at a time. Each style must show its
own typography, palette, component anatomy, layout composition, and appropriate
imagery or code-native scene before it can be marked complete.

This story also corrects the harness workflow so future work does not treat
component separation as visual completion.

## Relevant Product Docs

- `docs/product/ui-design-style-explorer.md`
- `docs/product/project-report.md`
- `docs/design/style-dossier-asset-font-plan.md`
- `docs/design/phase-1-visual-dossier-plan.md`
- `docs/stories/US-002-style-examples-expansion.md`

## Acceptance Criteria

- A Phase 1 plan exists and lists every current UI style.
- Each style has a planned font, a required local image asset id/path, layout
  scene, required UI anatomy, examples treatment, guardrails, and validation
  focus.
- Harness records this work as a normal-lane story instead of an informal log.
- The matrix has a durable `US-003` row.
- Future implementation proceeds style by style and updates evidence after each
  style.
- A style cannot be marked completed unless it passes the visual dossier
  checklist, has its required image asset downloaded/generated locally, and has
  validation proof.

## Design Notes

- Commands: no new app command is added for this story.
- Queries: use `scripts/bin/harness-cli.exe query matrix` before and after each
  phase pass.
- API: not applicable.
- Tables: no schema changes.
- Domain rules: current style taxonomy remains driven by `DesignStyle`.
- UI surfaces: `ResearchDossier`, style-specific dossier renderers, and
  `Examples` tab visual modules.

## Visual Dossier Checklist

Every style pass must include:

- Visible mapped font family.
- Required local image asset from `public/style-assets/manifest.json`.
- Style-specific hero or preview scene that uses or intentionally frames that
  asset.
- Primary button.
- Secondary or quiet button.
- Input or control.
- Card or panel.
- Badge or status treatment.
- Visual examples module, especially on or near the `Examples` tab.
- Local/generated asset is mandatory for every style.
- Desktop and mobile readability check.
- No horizontal overflow.
- Clean console logs.

## Phase Progress

| Phase | Style | Status | Evidence |
| --- | --- | --- | --- |
| P1.0 | Harness alignment | completed | Created this story and `docs/design/phase-1-visual-dossier-plan.md`. |
| P1.1 | Modern SaaS | completed | Replaced the raster runtime hero with a code-native dashboard matched to the approved reference: vertical navigation, Overview header controls, four KPI cards, Usage and Top Features analytics, five integrations, a four-step workflow, and the Why it works, Risks, and Implementation notes insight stack. It uses local Font Awesome icons throughout. `npm run build` and Browser QA at desktop `1280x720` plus mobile `390x844` passed with no document/body horizontal overflow or console warnings/errors. |
| P1.2 | Minimal/Clean | completed | The document/editor workspace and local FontAwesome icons remain intact. The 2026-07-11 correction adds six contextual color roles, seven visual rules with exact runtime values, four dossier usage examples, and distinguishing signals. Build and desktop Browser QA passed with a horizontal color row and no page overflow. |
| P1.3 | Enterprise/Admin | completed | The operational hero, data-grid asset, and example board remain intact. The 2026-07-11 correction adds six contextual color roles, seven visual rules with exact runtime values, four dossier usage examples, and distinguishing signals. Build and desktop Browser QA passed with a horizontal color row and no page overflow. |
| P1.4 | Editorial/Portfolio | completed | Implemented the image-led case-study dossier plus horizontal color roles, visual rules, and local usage notes. All six user-downloaded photos are preserved and cataloged with measured dimensions and honest provenance limitations. Build passed; desktop QA and explicit `390x844` mobile Browser QA confirmed style selection, `Examples` interaction, loaded local images, no horizontal overflow, and clean console logs. |
| P1.5 | Glassmorphism | completed | Implemented the approved forest-glass inner-dossier layout with generated local `1672x941` backdrop, `#192F28` gradient system, safe form opacity, solid fallback, contextual token roles, and three responsive example modules. Build plus desktop `1280x720` and mobile `390x844` Browser QA passed with loaded imagery, no horizontal overflow, and clean console logs. |
| P1.6 | Neo-brutalism | completed | Implemented two switchable layouts: current warm paper/yellow-red-blue palette and new Signal Pop violet/cyan/orange palette. Added local generated poster texture, thick-border controls, hard-shadow cards, sticker badge, pressed states, creator/launch/price example modules, and responsive mobile stacking. Build passed; desktop and `390x844` mobile Browser QA confirmed palette switching, loaded local asset, no horizontal overflow, and clean console logs. |
| P1.7 | Material/Fluent-like | completed | Refined the reference-matched board into three explicit columns: new layered surface/field column, central toolbar/state/card column, and right token column for color/elevation/shape/spacing/motion. Added descriptions for each item and a new local generated surface visual. Build passed; desktop `1280x720` and mobile `390x844` Browser QA confirmed asset loading, no horizontal overflow, and clean console logs. |
| P1.8 | Neumorphism | completed | Implemented the approved Calm Control Room layout without attaching a raster backdrop, per user direction: accessible labeled input, raised and inset control states, explicit focus-safe state, media-control board, and three visual examples. Updated the data-driven Overview, Tokens, Patterns, and Examples content with distinguishing signals, six contextual color roles, exact applied visual rules, four dossier-usage notes, and aligned guidance. `npm run build` plus the earlier desktop and `390x844` Browser QA passed with no horizontal overflow or console warnings/errors. |
| P1.9 | Flat Design | in_progress | Implemented the selected B2 ink/teal layout: flat mobile messages preview, five-column state system, component settings form, and Color blocks/Typography hierarchy/No fake depth principle strips. The data-driven dossier content now matches the runtime palette, state rules, examples, and accessibility guidance. Codex Browser QA at `390x844` confirmed style selection, `Examples` navigation, no document/body horizontal overflow, and no console warnings or errors. Completion remains blocked only by the planned `flat-design-geometric-panels` manifest entry not yet being reconciled with the existing local Flat Design image assets. |
| P1.10 | Skeuomorphism / Realistic UI | completed | Selected Signal Desk audio-control layout implemented with generated local paper texture, real input/buttons, meter/waveform/task anatomy, contextual tokens and usage notes. Build plus desktop `1270px` and mobile `390x844` Browser QA passed with no page/console overflow or console warnings/errors. |
| P1.11 | Claymorphism / Soft 3D | completed | Implemented user-selected Bloom Studio with interactive Explore/Progress inner tabs, a generated local `1536x1024` learning-orbit hero background, code-native topic/progress/focus anatomy, contextual tokens and usage notes, plus onboarding/education/wellness examples. Refinements make constrained dossier-width topics `2x2`, give course actions their own row, restore readable full-width example cards, deepen the code-native 3D objects, and expose the complete Progress route with explicit desktop/mobile connectors. Build plus desktop `1280x720` and mobile `390x844` Browser QA passed with loaded imagery, no horizontal overflow, and clean console logs. |
| P1.12 | Dark Futuristic / Neon Tech | completed | Implemented the user-selected Signal Grid operational workspace: incident and system rails, real command input, selectable deploy pipeline, workflow graph, deploy/rollback controls, alert queue, service cards, local FontAwesome icons, and high-contrast Overview/Examples surfaces. The local generated Signal Grid image is cataloged as a user-approved composition reference, not a runtime backdrop. Added complete contextual research data. Build passed; Codex Browser QA at desktop `1280x720` and mobile `390x844` confirmed style selection, Examples navigation, environment and deployment-pipeline interactions, visible command input, no document/body horizontal overflow, and zero console warnings or errors. |
| P1.13 | Web 2.0 Gloss / Frutiger Aero | completed | Implemented the Aqua Bloom eco-tech promo dossier with aqua/sky raster imagery, glossy navigation, gel primary and secondary controls, selectable Water/Green/Energy tiles, and an inset search input. The generated local `1672x941` image is recorded as available in the asset manifest. `npm run build` passed; Codex Browser QA at desktop `1280x720` and mobile `390x844` confirmed style selection, `Examples` navigation, loaded local imagery, no document/body horizontal overflow, and no console warnings or errors. |
| P1.14 | Final sweep | planned | |

## Validation

When updating durable proof status, use numeric booleans:
`scripts/bin/harness-cli story update --id US-003 --unit 1 --integration 0 --e2e 1 --platform 0`.

| Layer | Expected proof |
| --- | --- |
| Unit | `npm run build` covers TypeScript/build proof for touched React/CSS. |
| Integration | Not required; there is no backend or service integration. |
| E2E | Browser QA for style selection, `Examples` tab, renderer presence, overflow, and console logs. |
| Platform | Mobile viewport check during the final sweep or per risky style. |
| Release | Full Phase 1 sweep after all style passes are done. |

## Harness Delta

- Added a dedicated Phase 1 plan instead of relying on informal progress notes.
- Clarified that renderer separation is structural progress, not final visual
  completion.
- Clarified that code-native scenes do not replace the required image asset for
  each style.
- Created durable story `US-003` so future style passes update matrix evidence.

## Evidence

- Intake: `#4`, `harness_improvement`, lane `normal`.
- Correction intake: `#5`, `harness_improvement`, lane `normal`.
- Durable story: `US-003`.
- Current validation for the correction pass: `npm run build` passed after the
  Modern SaaS correction and harness plan edits.
- Harness verification: `scripts/bin/harness-cli.exe story verify US-003`
  passed.
- Asset correction: `public/style-assets/manifest.json` contains one required
  image asset entry per current UI style. Four style-level entries are now
  available, including the six individually cataloged Editorial photos; nine
  later-style entries remain planned.
- Claymorphism / Soft 3D completion on 2026-07-19:
  - The user selected the Bloom Studio learning direction with paired
    `Explore` and `Progress` states. Both are semantic inner tabs in the
    Claymorphism renderer, not separate raster mockups.
  - Generated and stored
    `public/style-assets/clay/clay-soft-3d-object-bloom.png` at `1536x1024`.
    The manifest records its opaque lavender hero-background treatment and
    avoids retaining an unused chroma-key trial asset.
  - Added contextual color roles, visual-rule usage, dossier usage, and
    distinguishing signals matching the final code-native shell.
  - `npm run build` passed. Browser QA at desktop `1280x720` and mobile
    `390x844` confirmed selection, inner-tab switching, `Examples` navigation,
    image loading, no body/page horizontal overflow, and no console warnings
    or errors.
  - The follow-up polish pass verified the constrained dossier at `1280x720`:
    topic columns measured about `184px` each and the three example cards about
    `145px` each; mobile `390x844` retained its two course actions, one-column
    milestone path, and no horizontal overflow.
  - The 3D and route follow-up verified upper-left highlights, material
    gradients, inset/elevation shadows, and contact shadows on the topic,
    course, and plant objects. At desktop `1280x720`, the visible route uses a
    `28px` card gap with two `20x5px` milestone connectors; at mobile
    `390x844`, it uses `5x10px` vertical connectors. Both views had no
    horizontal overflow and zero browser warnings/errors.
- Editorial/Portfolio completion on 2026-07-11:
  - Preserved all six user-downloaded files under
    `public/style-assets/editorial/`; no image was deleted or renamed.
  - Recorded measured dimensions, local paths, retrieval date, and the known
    provenance limitation for each photo in the asset manifest.
  - Browser QA at an explicit `390x844` viewport selected
    `Editorial / Portfolio`, activated the `Examples` tab, and confirmed the
    expected content state.
  - The five images referenced by the current renderer loaded with non-zero
    natural dimensions; the sixth remains cataloged for future use.
  - Document and body scroll widths matched their client widths, and no console
    warnings or errors were captured.
- Glassmorphism completion on 2026-07-11:
  - Generated and stored
    `public/style-assets/glass/glass-forest-backdrop.png` at `1672x941` and
    updated the asset manifest from planned to available.
  - Replaced the first-pass two-card renderer with a compact dossier canvas
    based on the approved `#192F28` forest-glass concept, without adding nested
    sidebars to the existing app shell.
  - Reused the same raster as the hero and as distinct Navigation/Data crops;
    the Modal remains a more opaque code-native form surface.
  - Added DM Sans/Newsreader/Roboto Mono roles, contextual color tokens, exact
    runtime visual rules, accessible focus treatment, and a solid fallback when
    backdrop blur is unsupported.
  - `npm run build` passed. Browser QA at `1280x720` and `390x844` confirmed
    selection, asset loading, blur application, responsive collapse, no page
    overflow, and clean console warnings/errors.
- Enterprise/Admin completion on 2026-07-09:
  - Generated `public/style-assets/enterprise/enterprise-admin-data-grid.png`
    as a local control-room backdrop.
  - Updated `public/style-assets/manifest.json` so
    `enterprise-admin-data-grid` is `available` with dimensions `1600x1000`.
  - Wired the asset into `EnterpriseAdminDossier` as a hero backdrop and into
    the preview card background.
  - Added a dedicated Enterprise/Admin visual example board with queue,
    settings, and audit mini modules.
  - `npm run build` passed after the Enterprise/Admin pass, and local HTTP
    checks confirmed the root app and the generated asset return `200`.
- Modern SaaS raster asset update on 2026-07-08:
  - Copied the user-provided generated image to
    `public/style-assets/modern-saas/modern-saas-product-gradient-frame.png`.
  - Updated `public/style-assets/manifest.json` so
    `modern-saas-product-gradient-frame` is `available` with dimensions
    `1586x992`.
  - Wired the image into `ModernSaaSDossier` as the sole hero frame.
  - Removed the extra `.modern-saas-product` mockup box below the image and
    stripped `.modern-saas-hero-panel` visual chrome so it no longer creates a
    second box under/around the image.
- Research workspace UX update on 2026-07-08:
  - Compact native scrollbar styling added across the app.
  - Dossier tabs are full-width and sticky within the dossier column.
  - `Overview`, `Tokens`, `Patterns`, and `Examples` now render as stacked
    sections; clicking a tab scrolls to the matching section instead of hiding
    the other sections.
- Validation on 2026-07-08:
  - `npm run build` passed after the Modern SaaS hero, scrollbar, stacked
    section, and panel cleanup changes.
  - Browser QA confirmed the Modern SaaS image loads from
    `/style-assets/modern-saas/modern-saas-product-gradient-frame.png`, uses
    `Inter Variable`, has no horizontal overflow, keeps console warnings/errors
    clean, exposes all four dossier sections at once, and scrolls to
    `Examples` from the sticky tab bar.
- Modern SaaS anatomy completion on 2026-07-09:
  - Added a separate code-native anatomy board back into
    `ModernSaaSDossier` instead of relying on the raster hero alone.
  - The anatomy board now includes a workflow input, a share/action button,
    metric cards, a chart card, and a workflow state card.
  - Browser QA confirmed the hero asset still loads from
    `/style-assets/modern-saas/modern-saas-product-gradient-frame.png` at
    natural size `1586x992`, the anatomy board is present, includes an input,
    one action button, four anatomy cards, the `Examples` section remains
    present, no horizontal overflow occurs, and console warnings/errors are
    clean.
- Minimal/Clean implementation start on 2026-07-08:
  - Installed `lucide-react` for consistent outline iconography.
  - Generated `public/style-assets/minimal/minimal-clean-paper-desk.png` as a
    local `1400x900` paper/editor raster asset.
  - Updated `public/style-assets/manifest.json` so
    `minimal-clean-paper-desk` is `available`.
  - Reworked `MinimalCleanDossier` into a code-native document/editor
    workspace rather than an image-only treatment.
  - Included clear icons, search input, outline navigation, local image module,
    note card, primary and secondary buttons, a status badge, and checklist
    cards.
  - Font decision: visible UI uses `Inter Variable`; IBM Plex Mono remains only
    available for compact metadata if needed later.
- Local icon source correction on 2026-07-08:
  - Project now stores the local FontAwesome Pro bundle at
    `vendor/fontawesome-pro-7.0.0/` with CSS, JS, raw SVG, and webfont assets.
  - Future coded UI samples should prefer this local FontAwesome bundle before
    adding or relying on external icon libraries.
  - App runtime icons should be copied into `src/assets/icons/fontawesome/`
    instead of importing directly from the full vendor bundle.
- Minimal/Clean validation on 2026-07-08:
  - `npm run build` passed after wiring the Minimal/Clean renderer.
  - Browser QA confirmed the Minimal/Clean workspace renders on desktop and
    mobile, loads `/style-assets/minimal/minimal-clean-paper-desk.png`, exposes
    12 SVG icons, uses `Inter Variable`, and has no horizontal overflow.
- Minimal/Clean QA rerun on 2026-07-09:
  - Fixed a duplicate-key warning path in `DecisionRail` by deduplicating the
    rendered use-case list before slicing it.
  - `npm run build` passed after the follow-up fixes.
  - Desktop browser QA confirmed the Minimal/Clean workspace still renders with
    `12` SVG icons, the `Examples` section remains present, the local asset
    loads from `/style-assets/minimal/minimal-clean-paper-desk.png` at natural
    size `1400x900`, and console warnings/errors are clean.
  - Mobile browser QA at `390x844` confirmed the Minimal/Clean title and
    workspace remain visible, the `Examples` section remains present, the local
    asset still loads, no horizontal overflow occurs, and console warnings/errors
    are clean.
- FontAwesome migration on 2026-07-08:
  - Moved the upstream FontAwesome bundle from the repo root to
    `vendor/fontawesome-pro-7.0.0/`.
  - Removed extracted macOS noise from the vendor bundle.
  - Copied the 8 currently used Minimal/Clean icons into
    `src/assets/icons/fontawesome/light/`.
  - Replaced `lucide-react` usage in `MinimalCleanDossier` with the local
    `FontAwesomeIcon` wrapper.
  - Removed `lucide-react` from `package.json` and `package-lock.json`.
  - `npm run build` passed after the migration with no `lucide-react` bundling
    warnings.
