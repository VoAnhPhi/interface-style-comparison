# US-008 Spec 3 Shareable Explorer Filters

## Status

implemented

## Lane

normal

## Product Contract

The `/styles` Explorer exposes secondary research facets for era, visual
density, visual weight, and production maturity. All Explorer filters are
owned by the URL so a refresh or shared link restores the same result set.
Invalid filter values recover to safe defaults, and Clear filters returns the
catalog to its unfiltered state.

## Relevant Product Docs

- `docs/product/spec-3-research-platform.md`
- `docs/product/spec-3/CURRENT_STATE.md`
- `docs/product/spec-3/DOMAIN_VOCABULARY.md`
- `docs/product/spec-3/EVALUATION_AND_TESTING_RULES.md`
- `docs/product/spec-3/TASKS.md`

## Acceptance Criteria

- Era, density, visual weight, and production maturity controls filter the
  normalized catalog in combination with search, classification, and tags.
- Canonical query keys are `q`, `tag`, `classification`, `era`, `density`,
  `weight`, and `maturity`.
- Refreshing or sharing a URL restores the selected filters; invalid values
  normalize to `all` and do not break the Explorer.
- The UI exposes active-filter count, accessible pressed state, and a clear
  recovery action on empty results.
- Desktop and mobile layouts remain usable without horizontal overflow.

## Design Notes

- `ResearchStyle.eras` is an explicit array because a style may span more than
  one research period or have a documented revival.
- The initial era vocabulary is `2000s`, `2010s`, `2020s`, and `revival`.
  These are project research facets derived from the Spec 2 timeline and
  migration notes, not universal historical claims.
- URL parsing and serialization live in `src/domain/research/explorer.ts`.
- The command palette remains the shared Explorer filter surface.

## Validation

| Layer | Expected proof |
| --- | --- |
| Unit | Filter combinations, available values, URL round-trip, and invalid-value recovery pass in `explorer.test.ts`. |
| Integration | Normalized catalog records expose validated era values and the adapter preserves them. |
| E2E | Desktop URL persistence, combined filtering, clear state, and mobile overflow pass in Browser QA. |
| Platform | `npm test` and `npm run build` pass. |
| Release | Story evidence and task ledger are updated. |

## Harness Delta

Recorded as a normal-lane story with unit, integration, E2E, and platform
proof enabled.

## Evidence

- `npm test`: 10 files, 65 tests passed on 2026-08-03.
- `npm run build`: passed on 2026-08-03.
- Browser QA at `1280x800`: combined `2020s + low density + high visual weight
  + emerging maturity` reduced the catalog to Claymorphism; Clear filters
  restored all 13 styles.
- Browser QA at `390x844`: secondary filter groups rendered without horizontal
  overflow; mobile URL state was preserved.
- Browser console warnings/errors: none observed.
