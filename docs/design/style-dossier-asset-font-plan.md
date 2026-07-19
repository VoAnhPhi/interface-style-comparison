# Style Dossier Asset And Font Plan

## Status

Prepared for the next implementation phase. Fonts are installed through
Fontsource and CSS token files are present. The Modern SaaS and Minimal/Clean
required image assets are now available locally, and Enterprise/Admin has now
been completed as well; the remaining style image assets are still planned in
the manifest and should be sourced or generated once each style-specific
dossier layout is implemented.

Correction: separate dossier components now exist for all current styles, but
they are not visually complete. Treat them as layout scaffolds until each style
passes the visual dossier definition of done below.

## Decisions

- Use Fontsource packages for self-hosted fonts. Do not use Google Fonts CDN.
- Use the bundled FontAwesome Pro package for coded UI sample iconography before
  adding or relying on another icon library. Local source:
  `vendor/fontawesome-pro-7.0.0/`.
- Store imagery locally under `public/style-assets`. Do not hotlink final dossier
  imagery.
- Use code-native HTML/CSS mockups for product UI anatomy, but every style must
  still have at least one local image/texture/reference asset attached to the
  dossier. Code-native mockups do not replace the image requirement.
- Use downloaded or generated raster assets for every style. The asset may be a
  subtle background, product-frame reference, texture, editorial image,
  abstract object, or style-specific backdrop.
- Do not use screenshots from referenced products such as Stripe, Linear, Apple,
  GitHub, Atlassian, Carbon, or Material as primary visuals.

## Prepared Files

- `src/styles/fonts.css`
- `src/styles/styleDossierTokens.css`
- `public/style-assets/manifest.json`
- `vendor/fontawesome-pro-7.0.0/`
- `src/assets/icons/fontawesome/`

## Icon Source

Preferred icon source is the local FontAwesome Pro bundle:

- CSS entrypoints: `vendor/fontawesome-pro-7.0.0/css/`
- JS entrypoints: `vendor/fontawesome-pro-7.0.0/js/`
- Raw SVGs: `vendor/fontawesome-pro-7.0.0/FontAwesome.Pro.7.0.0/svgs/`
- Webfonts: `vendor/fontawesome-pro-7.0.0/FontAwesome.Pro.7.0.0/webfonts/`
- App runtime subset: `src/assets/icons/fontawesome/`

Do not install additional icon libraries for future dossier work unless the
local FontAwesome bundle cannot satisfy the need and the decision is recorded.
Copy only the icons actually used by the app into `src/assets/icons/fontawesome`
instead of importing directly from the full vendor bundle at runtime.

## Font Mapping

| Style | Primary font | Display font | Mono font | Package |
| --- | --- | --- | --- | --- |
| Modern SaaS | Inter Variable | Inter Variable | IBM Plex Mono | `@fontsource-variable/inter` |
| Minimal / Clean | Inter Variable | Inter Variable | IBM Plex Mono | `@fontsource-variable/inter` |
| Enterprise / Admin | IBM Plex Sans Variable | IBM Plex Sans Variable | IBM Plex Mono | `@fontsource-variable/ibm-plex-sans` |
| Editorial / Portfolio | Inter Variable | Newsreader Variable | IBM Plex Mono | `@fontsource-variable/newsreader` |
| Glassmorphism | DM Sans Variable | DM Sans Variable | Roboto Mono | `@fontsource-variable/dm-sans` |
| Neo-brutalism | Space Grotesk Variable | Space Grotesk Variable | IBM Plex Mono | `@fontsource-variable/space-grotesk` |
| Material / Fluent-like | Roboto Variable | Roboto Variable | Roboto Mono | `@fontsource-variable/roboto` |
| Neumorphism | DM Sans Variable | DM Sans Variable | IBM Plex Mono | `@fontsource-variable/dm-sans` |
| Flat Design | Roboto Variable | Roboto Variable | Roboto Mono | `@fontsource-variable/roboto` |
| Skeuomorphism | Inter Variable | Fraunces Variable | IBM Plex Mono | `@fontsource-variable/fraunces` |
| Claymorphism | Poppins | Poppins | IBM Plex Mono | `@fontsource/poppins` |
| Dark Futuristic | Space Grotesk Variable | Space Grotesk Variable | Roboto Mono | `@fontsource/roboto-mono` |
| Web 2.0 Gloss | Poppins | Poppins | Roboto Mono | `@fontsource/poppins` |

## Asset Mapping

| Style | Required image asset | Implementation note |
| --- | --- | --- |
| Modern SaaS | `modern-saas-product-gradient-frame` | Available at `public/style-assets/modern-saas/modern-saas-product-gradient-frame.png`; currently used as the single hero reference frame. |
| Minimal / Clean | `minimal-clean-paper-desk` | Available at `public/style-assets/minimal/minimal-clean-paper-desk.png`; used inside a code-native document/editor workspace. |
| Enterprise / Admin | `enterprise-admin-data-grid` | Available at `public/style-assets/enterprise/enterprise-admin-data-grid.png`; used as a control-room backdrop behind filter bars, table rows, KPI cells, and status chips. |
| Editorial / Portfolio | `editorial-case-study-photo` | Use one large editorial/photo crop plus typographic case-study modules. |
| Glassmorphism | `glass-gradient-backdrop` | Use generated/local gradient/blur backdrop plus translucent panels; keep text on safe surfaces. |
| Neo-brutalism | `neo-brutal-poster-texture` | Use a bold poster-paper/ink texture behind poster blocks, hard shadows, thick borders, stickers. |
| Material / Fluent-like | `material-fluent-surface-stack` | Use a generated surface-layer backdrop behind component anatomy diagrams, state-layer examples, form/dialog recipes. |
| Neumorphism | `neumorphism-soft-surface` | Use a soft monochrome surface texture behind raised/inset CSS widgets; add explicit focus outlines. |
| Flat Design | `flat-design-geometric-panels` | Use a flat geometric panels image behind flat panes, icons, simple solid buttons, no depth. |
| Skeuomorphism | `skeuomorphic-paper-texture` | Use subtle paper/material texture; keep body copy on quiet solid surfaces. |
| Claymorphism | `clay-soft-3d-object` | Use soft 3D generated object/background that supports chunky controls without competing with content. |
| Dark Futuristic | `dark-tech-grid-backdrop` | Use dark grid/generated tech backdrop behind console panels, glow edges, mono labels. |
| Web 2.0 Gloss | `web20-aqua-gloss-texture` | Use aqua sky/water/gloss texture plus gel buttons and highlight lines. |

## Next Implementation Proposal

Completed:

- Added `src/components/dossiers/ResearchDossier.tsx` with a shared shell and
  renderer map.
- Moved tab content components out of `App.tsx`.
- Applied `.dossier-style-${style.id}` token classes.
- Added first-pass renderer scaffolds for:
  - `EnterpriseAdminDossier`
  - `EditorialPortfolioDossier`
  - `GlassmorphismDossier`
  - `NeoBrutalismDossier`
  - `ModernSaaSDossier`
  - `MinimalCleanDossier`
  - `MaterialFluentDossier`
  - `DarkFuturisticDossier`
  - `Web20GlossDossier`
  - `NeumorphismDossier`
  - `FlatDesignDossier`
  - `SkeuomorphismDossier`
  - `ClaymorphismDossier`
- Verified build, tab switching, search, and style selection for the structural
  pass only.

## Visual Dossier Definition Of Done

Each style-specific dossier must visibly demonstrate the style, not only list
research text. A style is complete only when its component includes:

- Font: visible use of the mapped primary/display/mono family.
- Image and scene: a local/generated raster asset is required for every style,
  and the dossier must also include a detailed code-native UI scene.
- Palette: obvious style-specific background, text, accent, border, shadow, and
  state colors.
- Components: primary button, secondary button, input/control, card/panel,
  badge/status, and one style-specific content module.
- Layout: a composition that differs meaningfully from the default dossier and
  matches the style's expected use case.
- Examples: the `Examples` tab or adjacent preview area must pair research
  examples with rendered visual mini modules.
- QA: build passes, browser console is clean, desktop has no horizontal
  overflow, and mobile readability is checked.

Next:

1. Continue with Minimal/Clean using the definition of done above.
2. Download or generate the required local image for the active style before
   marking that style complete, then update `public/style-assets/manifest.json`.

## Partial Visual Dossier Passes

### Modern SaaS

- Font: Inter Variable for the visible dossier; the prior IBM Plex Mono
  technical labels were removed with the extra code-native product mockup.
- Required image asset: `modern-saas-product-gradient-frame` is available at
  `public/style-assets/modern-saas/modern-saas-product-gradient-frame.png` and
  recorded in `public/style-assets/manifest.json`.
- Current implementation: the generated raster UI reference is the sole hero
  frame. The extra `.modern-saas-product` mockup box was removed, and the hero
  panel wrapper no longer draws a second visible box around/under the image.
- Dossier navigation: tab content now renders as stacked sections, and the
  sticky full-width tab bar scrolls to each section.
- Validation: `npm run build` passes; browser QA confirms the Modern SaaS image
  loads, all four stacked sections are present, tab-to-section scrolling works,
  no horizontal overflow occurs, and console logs are clean.
- Completion blocker: product decision needed on whether the raster hero
  satisfies the component-anatomy requirement or whether a separate code-native
  anatomy module should be added outside the image frame.

### Minimal/Clean

- Font: Inter Variable for the visible UI; IBM Plex Mono remains reserved for
  compact metadata if needed later.
- Icon source: the current prototype now uses a local FontAwesome subset copied
  from `vendor/fontawesome-pro-7.0.0/FontAwesome.Pro.7.0.0/svgs/` into
  `src/assets/icons/fontawesome/`.
- Required image asset: `minimal-clean-paper-desk` is available at
  `public/style-assets/minimal/minimal-clean-paper-desk.png` and recorded in
  `public/style-assets/manifest.json`.
- Current implementation: the main sample is code-native, with the local image
  used as a supporting paper/editor visual inside the layout rather than as the
  entire UI.
- Included components: toolbar icon buttons, search input, outline navigation,
  editor canvas, local image module, note card, ready badge, primary button,
  secondary button, and checklist cards.
- Validation: `npm run build` passes; browser QA confirms desktop and mobile
  render, image loading at `1400x900`, 12 SVG icons, `Inter Variable`, no
  horizontal overflow, and clean browser console logs.
- Completion blocker: visual approval, focused browser QA after the FontAwesome
  migration, and optional Minimal/Clean-specific Examples mini-module polish
  before marking P1.2 complete.

## Phase 1 Workflow Link

The active implementation plan is now
`docs/design/phase-1-visual-dossier-plan.md`.

Do not use this asset/font plan as the phase tracker. Use it only for font and
asset mapping, then update the Phase 1 plan and `US-003` story evidence when a
style pass is completed.

## Asset Download Gate

Before downloading any real image:

- Pick the exact dossier component that will use it.
- Confirm whether CSS/generated visual can do the job first.
- If an image is needed, download it locally and update
  `public/style-assets/manifest.json` with source, license, author, retrieval
  date, and local path.
