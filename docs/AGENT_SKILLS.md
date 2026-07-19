# Agent Skills And Project Capabilities

This project benefits from a small, explicit skill stack. Use these capabilities
before inventing new workflows.

## Required Discovery Skill

### codebase-memory-mcp

Use codebase-memory MCP for code discovery and relationship tracing.

Preferred order:

1. `index_repository` when the current project snapshot is stale.
2. `search_graph` to find components, functions, types, routes, and variables.
3. `get_code_snippet` to read exact function/class source after search.
4. `trace_path` or `query_graph` for call relationships and complex patterns.

Fallback to shell only for markdown/spec/config files, string literals, and
cases where the graph cannot answer the question.

## Frontend Skills

### build-web-apps:frontend-app-builder

Use for large UI redesigns, layout system changes, research-workspace
composition, visual direction, and new interaction models.

Expected output:

- A concrete design direction before coding.
- A reusable component/layout model, not one-off markup.
- Visual QA after implementation.

### build-web-apps:frontend-testing-debugging

Use when verifying rendered UI, responsive behavior, console errors, pointer
interaction, scrolling, and layout overflow.

Preferred checks:

- Desktop viewport.
- Mobile viewport.
- Core interaction path: search/filter, select style, dossier tabs, drag-scroll.
- `npm run build`.

### imagegen

Use for design concepts, visual references, or asset exploration when a UI
direction is too ambiguous to implement directly. Do not ship generated
screenshots as UI.

### Local FontAwesome Pro Icons

Use the bundled FontAwesome Pro package before adding or using a new icon
library. The local package is stored at:

`vendor/fontawesome-pro-7.0.0/`

Relevant folders:

- `vendor/fontawesome-pro-7.0.0/css/`
- `vendor/fontawesome-pro-7.0.0/js/`
- `vendor/fontawesome-pro-7.0.0/FontAwesome.Pro.7.0.0/svgs/`
- `vendor/fontawesome-pro-7.0.0/FontAwesome.Pro.7.0.0/webfonts/`
- `src/assets/icons/fontawesome/`

Prefer these existing assets for coded UI samples and dossier iconography. If a
temporary external icon package is already present, migrate it to the local
FontAwesome assets before marking a visual dossier phase complete.

## Research And Documentation Skills

### Harness documentation

Use Harness docs to keep product truth current:

- `docs/product/*` records current product contract.
- `docs/design/*` records visual and interaction direction.
- `docs/stories/*` records selected work packets and candidate epics.
- `docs/decisions/*` records durable decisions.

### Local specs as source material

Use `spec.md` and `SPEC2.md` as the strongest local research sources. Their
style descriptions, risk notes, token tables, taxonomy, and recommendation text
should feed the UI copy and dossier content.

## Project-Specific Capability Map

| Capability | Primary tool/skill | Notes |
| --- | --- | --- |
| Code discovery | codebase-memory MCP | Re-index before large code edits if stale. |
| UI redesign | frontend-app-builder | Required for major layout/direction changes. |
| Render QA | frontend-testing-debugging / Playwright fallback | Verify desktop and mobile, not just build. |
| Research copy extraction | local specs + docs | Prefer spec language over generic placeholder text. |
| Visual concepts | imagegen | Concepts only; implementation stays HTML/CSS/React. |
| Iconography | local FontAwesome Pro | Use `vendor/fontawesome-pro-7.0.0` as the source bundle and `src/assets/icons/fontawesome` for app-level runtime icons before adding icon dependencies. |
| Harness state | `scripts/bin/harness-cli` | Use when recording intakes, stories, traces, decisions. |

## Current Validation Ladder

The active project validation command is:

```bash
npm run build
```

For visual or interaction work, also verify in browser automation or the app
browser when available.

## Local Skill Inventory And Near-Term Routing

Inventory reviewed on 2026-07-11. The repository contains seven local skills
under `.agents/skills/`.

| Local skill | Near-term need | Use in the current roadmap |
| --- | --- | --- |
| `agency-frontend-developer` | required | Implement and refine the React/CSS dossier for P1.4 Editorial and P1.5 Glassmorphism. |
| `agency-ui-designer` | required | Check typography, hierarchy, image crop, component anatomy, and style fidelity before a dossier is marked complete. |
| `agency-code-reviewer` | required at gate | Review each completed style pass for regressions, accessibility, maintainability, and performance before status changes to `completed`. |
| `agency-technical-writer` | required at gate | Keep the phase plan, story evidence, asset manifest notes, and project status synchronized with verified implementation. |
| `design-taste-frontend` | selective | Use for the Editorial/Portfolio composition and future expressive marketing-like scenes. Do not apply its landing-page rules wholesale to Enterprise/Admin or other dense product UI. |
| `agency-ux-architect` | useful for cross-style work | Use when changing navigation, dossier information architecture, responsive behavior, or the final P1.14 consistency sweep. |
| `agency-software-architect` | not currently required | Reserve for data-model, renderer architecture, persistence, or broader system-boundary changes; current per-style visual passes do not need it. |

### Active Skill Set: P1.4 Editorial/Portfolio

Use this sequence for the currently active task:

1. `agency-ui-designer` and selective `design-taste-frontend` for the image-led
   editorial composition and typography audit.
2. `agency-frontend-developer` for React/CSS corrections.
3. `build-web-apps:frontend-testing-debugging` for the required `390x844`
   browser proof, overflow check, and console check.
4. `agency-code-reviewer` before changing P1.4 to `completed`.
5. `agency-technical-writer` to record image provenance, dimensions, QA
   evidence, and phase status.

### Next Skill Set: P1.5 Glassmorphism

After P1.4 closes, use:

1. `imagegen` to create the required local `glass-gradient-backdrop` raster.
2. `agency-ui-designer` to define safe opacity, contrast, layering, and visual
   hierarchy.
3. `agency-frontend-developer` to implement the backdrop, glass panels, opaque
   reading surface, controls, and responsive layout.
4. `build-web-apps:frontend-testing-debugging` to validate contrast behavior,
   desktop/mobile layout, overflow, console output, and browser performance.
5. `agency-code-reviewer` and `agency-technical-writer` to close the gate and
   update durable evidence.

Do not start P1.5 while P1.4 still lacks asset provenance/dimensions or valid
mobile QA evidence. This routing is the stored default for the next work
sessions; a task-specific instruction can override it.
