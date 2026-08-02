# US-007 Spec 3 Normalized Explorer Search

## Status

implemented

## Lane

normal

## Product Contract

Help users find a relevant UI direction from the normalized Spec 3 dataset,
then narrow the catalog by its primary classification without losing the
existing renderer-backed dossier experience.

## Relevant Product Docs

- `SPEC3.md`
- `docs/product/ui-design-style-explorer.md`
- `docs/product/spec-3/TASKS.md`
- `docs/product/spec-3/IMPLEMENTATION_PLAN.md`

## Acceptance Criteria

- Search matches normalized name, aliases, characteristics, definitions,
  distinguishing signals, and classifications.
- Primary classification filters are generated from classifications represented
  by normalized records.
- The existing tag filter remains available as a secondary catalog filter.
- No-match feedback uses an accessible live status and explains how to recover.
- Clear filters restores the full normalized catalog.

## Validation

| Layer | Expected proof |
| --- | --- |
| Unit | Alias, characteristic, classification, and available-filter tests |
| Integration | Explorer maps normalized result ids back to legacy renderer records |
| E2E | Classification filter, alias search, characteristic search, and empty-state recovery |
| Platform | Browser check at `1280x800`; responsive filter strips retain horizontal scroll behavior |
| Release | `npm test`, `npm run build`, and durable Harness evidence |

## Evidence

- Added `src/domain/research/explorer.ts` and `src/domain/research/catalog.ts`.
- Added normalized `ResearchStyle.characteristics` and migrated all 13 records.
- Added primary classification controls and accessible empty-state recovery in
  `src/App.tsx`.
- `npm test` passed: 10 files, 61 tests.
- `npm run build` passed.
- Browser QA passed for classification filtering, `frosted-glass` alias search,
  `Backdrop blur` characteristic search, empty-state recovery, no horizontal
  overflow, and no console logs at `1280x800`.
