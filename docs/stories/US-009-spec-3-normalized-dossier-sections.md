# US-009 Spec 3 Normalized Dossier Sections

## Status

implemented

## Lane

normal

## Product Contract

Each `/styles/:slug` dossier exposes the normalized Spec 3 research contract
through Overview, Visual DNA, Reference implementation, Patterns, and
Same-context specimens. The existing style-specific renderer remains the
local visual implementation and is preserved below the normalized layer.

## Relevant Product Docs

- `docs/product/spec-3-research-platform.md`
- `docs/product/spec-3/CURRENT_STATE.md`
- `docs/product/spec-3/DOMAIN_VOCABULARY.md`
- `docs/product/spec-3/EVALUATION_AND_TESTING_RULES.md`
- `docs/product/spec-3/TASKS.md`
- `docs/design/research-workspace-next-effects.md`

## Acceptance Criteria

- Overview exposes definition, principles, distinguishing signals, and
  research status from `ResearchStyle`.
- Visual DNA exposes all normalized qualitative dimensions with level,
  reasoning, and claim references.
- Reference implementation identifies the local renderer and token recipe as
  an implementation translation rather than a universal definition.
- Patterns expose normalized principles alongside legacy implementation
  observations during migration.
- Same-context specimens reuse the canonical Dashboard, Form, and E-commerce
  scenarios so content, actions, hierarchy, semantics, and task flow remain
  invariant across styles.
- Existing renderer sections and dossier tabs remain available, with no
  desktop or mobile horizontal overflow.

## Design Notes

- `ResearchStyle` remains the source of truth; the view layer joins it to the
  legacy `DesignStyle` only for renderer and token implementation details.
- The normalized sections are intentionally shared and data-driven. They do
  not clone a full dossier layout for each style.
- Claim references remain visible to preserve research traceability. Evaluation,
  product fit, relationships, and source details are the next dossier slice.

## Validation

| Layer | Expected proof |
| --- | --- |
| Unit | Existing normalized domain and adapter suite remains green. |
| Integration | Normalized catalog lookup resolves the selected style before the legacy renderer map. |
| E2E | Desktop and mobile dossier sections, style selection, and legacy `Examples` tab pass Browser QA. |
| Platform | `npm test` and `npm run build` pass. |
| Release | Story evidence, task ledger, implementation plan, and current-state docs are synchronized. |

## Harness Delta

Recorded as a normal-lane story with unit, integration, E2E, and platform
proof enabled.

## Evidence

- `npm test`: 10 files, 65 tests passed on 2026-08-05.
- `npm run build`: passed on 2026-08-05; only existing Vite `use client` and
  bundle-size warnings remain.
- Browser QA at `1280x800`: five normalized sections, eight Visual DNA cards,
  three canonical scenario cards, no horizontal overflow, and no console
  warnings/errors.
- Browser QA at `390x844`: responsive single-column grids, no horizontal
  overflow, and no console warnings/errors.
- Browser QA: selecting Minimal / Clean updated the URL to
  `/styles/minimal-clean`; the normalized dossier remained present.
- Browser QA: legacy dossier tab interaction remained available after the
  normalized layer was added.
