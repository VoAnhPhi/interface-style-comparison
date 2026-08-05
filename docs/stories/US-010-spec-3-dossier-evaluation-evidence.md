# US-010 Spec 3 Dossier Evaluation And Evidence

## Status

implemented

## Lane

normal

## Product Contract

Each `/styles/:slug` dossier exposes contextual evaluation, product fit,
related directions, and source provenance from the normalized `ResearchStyle`
record. The UI explains reasons, conditions, evidence, and limitations without
collapsing the data into a universal score or winner.

## Relevant Product Docs

- `docs/product/spec-3-research-platform.md`
- `docs/product/spec-3/CURRENT_STATE.md`
- `docs/product/spec-3/DOMAIN_VOCABULARY.md`
- `docs/product/spec-3/EVALUATION_AND_TESTING_RULES.md`
- `docs/product/spec-3/TASKS.md`
- `docs/design/research-workspace-next-effects.md`

## Acceptance Criteria

- Evaluation renders all six core criteria with qualitative level, reason,
  strengths, risks, conditions, claim type, and evidence references.
- Product fit renders all canonical product types with contextual reason,
  conditions, and evidence; not-evaluated records remain visibly honest.
- Related directions render evidence-backed relationships and stable dossier
  CTAs; styles without reviewed relationships show an explicit empty state.
- Sources render title, type, review status, publisher/reference, notes,
  limitations, and claims using each source.
- No universal score, percentage, ranking, or winner is introduced.
- Existing renderer tabs remain available and desktop/mobile layouts remain
  free of horizontal overflow.

## Design Notes

- Evaluation and fit use normalized domain contracts directly; no view-only
  scoring or fallback inference is introduced.
- Relationship CTAs use the existing typed style route helper and React Router
  link semantics.
- Incomplete migration records show `not-evaluated` and missing relationship
  coverage rather than presenting legacy suitability as researched evidence.

## Validation

| Layer | Expected proof |
| --- | --- |
| Unit | Existing normalized evaluation, evidence, relationship, dataset, and adapter suite remains green. |
| Integration | Dossier resolves normalized evaluation, fit, relationship, claim, and source collections for the selected slug. |
| E2E | Modern SaaS renders reviewed content and navigates its related CTA; Minimal / Clean preserves not-evaluated state; legacy `Examples` remains available. |
| Platform | `npm test`, `npm run build`, and `git diff --check` pass. |
| Release | Story evidence, task ledger, implementation plan, current-state docs, and Harness are synchronized. |

## Harness Delta

Recorded as a normal-lane story with unit, integration, E2E, and platform
proof enabled.

## Evidence

- `npm test`: 10 files, 65 tests passed on 2026-08-05.
- `npm run build`: passed on 2026-08-05; existing Vite `use client` and
  bundle-size warnings remain non-blocking.
- `git diff --check`: passed.
- Browser QA at `1280x800`: 9 normalized sections, 6 evaluation cards, 10
  product-fit cards, 1 reviewed related CTA, 2 source cards, no horizontal
  overflow, and no console warnings/errors.
- Browser QA at `390x844`: all normalized grids collapse to one column with no
  horizontal overflow or console warnings/errors.
- Browser QA: Modern SaaS related CTA navigated to `/styles/minimal-clean`.
- Browser QA: Minimal / Clean showed 5 not-evaluated criteria, 10
  not-evaluated product-fit records, and an explicit empty relationship state.
