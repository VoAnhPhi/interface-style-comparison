# Dark Futuristic — Signal Grid Implementation Reference

## Decision

Use the user-selected **Signal Grid** direction as the visual contract for the
Dark Futuristic dossier. The reference image is local at:

`public/style-assets/dark-tech/dark-tech-signal-grid-layout-reference.png`

The dossier should reproduce its hierarchy with semantic, code-native React
components. Treat the raster as a composition reference and optional hero
backdrop; do not recreate its tiny copy verbatim.

## Layout Contract

```text
Top bar: product name | environment selector
Main grid (desktop): 25% incident rail | flexible command workspace | 21% deploy rail
Bottom strip: three service-health cards
```

1. **Top bar** — `Signal Grid` identity, a thin telemetry/ruler detail, and a
   compact environment selector set to Production.
2. **Left rail** — Live incident timeline first; then a system list with clear
   health states. This rail explains the operational context.
3. **Center workspace** — Command terminal and actions at top; five-step
   pipeline beneath; a large dependency/workflow graph as the primary visual
   field.
4. **Right rail** — Deploy controls first, then alert queue. The lime primary
   deploy action is the only dominant green surface.
5. **Bottom strip** — Three compact service cards with name, health badge, two
   metrics and a sparkline. Do not add a fourth card at standard desktop widths.

At constrained dossier widths, switch from the three-column grid to:

```text
top bar
command workspace
deploy controls
live incident + system list
alert queue
service cards (one column, then two only when room permits)
```

## Token Contract

| Role | Value | Intended use |
| --- | --- | --- |
| Canvas | `#0B0F16` | page and dossier ground |
| Surface | `#101722` | panels and cards |
| Raised surface | `#151E2C` | terminal field and active controls |
| Border | `rgba(162, 188, 222, .18)` | all panel separation |
| Primary signal | `#B7F34A` | deploy action, healthy state, selected pipeline stage |
| Cyan signal | `#39D8FF` | informational state, metrics, command focus |
| Violet signal | `#8F7CFF` | workflow branch and secondary metric only |
| Primary text | `#F3F7FC` | headings and control labels |
| Muted text | `#9AA9BC` | support labels and metadata |

Use a 1px border and low-opacity shadow for depth. Glow belongs only on the
selected pipeline stage, focused command input, or the primary action. It must
not be a universal card decoration.

## Typography

- Use Space Grotesk for UI hierarchy and headings.
- Use Roboto Mono for timestamps, terminal prompt, IDs, metric values and
  state metadata.
- Keep operational labels at 12–14px minimum; use 15–16px for controls and
  body content. Do not imitate the image's tiny auxiliary type.

## FontAwesome Mapping

The existing local FontAwesome subset is sufficient for the first build.
Use the current `FontAwesomeIcon` component and map its icons as follows:

| Area | Icon name |
| --- | --- |
| Live incident | `circle-exclamation` |
| Healthy status | `circle-check` |
| Alert queue | `bell` |
| Environment/settings | `gear` |
| Search/verify action | `magnifying-glass` |
| Deploy/add action | `plus` |
| Detail/report row | `file-lines` |
| Dropdown selector | `chevron-down` |

If an icon is not available in the current typed subset, add its local SVG
from `vendor/fontawesome-pro-7.0.0` to the established icon module; do not add
another icon package.

## Interaction And Accessibility Contract

- Pipeline stages and service rows are actual buttons when they change the
  visible selection; announce the current selection with `aria-pressed`.
- The command surface is a labeled input, not a decorative div.
- Healthy, warning, and blocked states must pair color with text and/or icon.
- Focus ring: 3px `#39D8FF`, with 2px offset; retain it on dark surfaces.
- Respect `prefers-reduced-motion`; limit normal state transitions to
  160–220ms and do not loop graph animation.
- At 390px, controls must remain at least 44px tall and the command actions
  should become a two-column grid, with the primary action full width if needed.

## Implementation Sequence

1. Reshape `DarkFuturisticDossier.tsx` into the Signal Grid hierarchy using
   static typed data arrays for incidents, services, pipeline stages and alerts.
2. Add semantic local classes in `App.css`, scoped under `.dark-tech-dossier-layout`.
3. Build the dependency graph from CSS/SVG-free HTML elements; render the
   source image only as a subtle, optional reference/hero layer if it improves
   the dossier without compromising text legibility.
4. Add responsive grid breakpoints before visual polish.
5. Validate selection state, focus visibility, desktop layout and `390x844`
   mobile layout, then run `npm run build`.
