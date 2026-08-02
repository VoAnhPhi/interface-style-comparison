# US-006 Spec 3 Reviewed Style Migration

## Status

implemented

## Lane

normal

## Product Contract

Move the remaining twelve catalog styles into explicit normalized Spec 3
records without replacing the existing style-specific renderers or presenting
unreviewed research as published fact.

## Relevant Product Docs

- `docs/product/spec-3/TASKS.md`
- `docs/product/spec-3/CURRENT_STATE.md`
- `docs/product/spec-3/DOMAIN_VOCABULARY.md`
- `docs/product/spec-3/EVALUATION_AND_TESTING_RULES.md`
- `docs/product/spec-3/IMPLEMENTATION_PLAN.md`

## Acceptance Criteria

- The remaining twelve styles have unique normalized ids and stable slugs.
- Every normalized record validates against the accepted Spec 3 contract.
- Every record keeps a valid legacy renderer mapping.
- Normalized fields take precedence while legacy tokens, examples, and visual
  renderer content remain available through the adapter.
- Missing research is represented with `incomplete` and `not-reviewed` status.
- Missing qualitative evaluation and product fit remain `not-evaluated`.
- Compare cardinality and existing domain invariants remain valid.
- Existing landing and Explorer behavior retain desktop/mobile parity.

## Validation

| Layer | Expected proof |
| --- | --- |
| Unit | Normalized dataset, status honesty, uniqueness, references, and adapter precedence |
| Integration | All 13 records map through the normalized-first catalog adapter |
| E2E | Landing and `/styles/minimal-clean` selection smoke flows |
| Platform | Browser checks at `1280x800` and `390x844` |
| Release | `npm test`, `npm run build`, and durable Harness evidence |

## Evidence

- Added `src/domain/research/data/migratedStyles.ts` with explicit normalized
  records for the twelve remaining styles.
- Connected all 13 normalized records to `buildDesignStyleCatalog`.
- Extended dataset tests to cover 13-record validation, honest incomplete
  status, not-evaluated fields, renderer preservation, and adapter output.
- `npm test` passed: 9 files, 57 tests.
- `npm run build` passed.
- Browser smoke passed at `1280x800` and `390x844` with no broken images,
  horizontal overflow, or warning/error console logs.
