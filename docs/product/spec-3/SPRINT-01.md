# Sprint 01: Foundation and Domain Contract

## Status

Proposed. Awaiting approval before implementation.

## Sprint Goal

Close the remaining Foundation ambiguity and prove that one normalized Spec 3
research record can coexist with the current visual workspace without a
rewrite.

## Selected Work

| Order | Task | Outcome |
| --- | --- | --- |
| 1 | F0-FLAT-001 | Flat Design asset and manifest state are truthful |
| 2 | F0-SWEEP-001 | Foundation has final build, desktop, and mobile evidence |
| 3 | F0-CLOSE-001 | US-003 status is closed or explicitly carried forward |
| 4 | S3-ADR-001 | Domain/data ownership and adapter boundary are accepted |
| 5 | S3-ADR-002 | Routing direction and URL ownership are accepted |
| 6 | S3-DOM-001 | Controlled vocabularies are implemented |
| 7 | S3-DOM-002 | Product contexts are implemented |
| 8 | S3-DOM-003 | Evaluation and product-fit contracts are implemented |
| 9 | S3-DOM-004 | Evidence and review metadata are implemented |
| 10 | S3-SCN-001 | Canonical scenario contract is implemented |
| 11 | S3-DATA-001 | Compatibility adapter exists |
| 12 | S3-DATA-002 | Modern SaaS is the first normalized vertical slice |
| 13 | S3-DATA-004 | Domain invariants have automated proof |

## Explicit Non-Goals

- No `/compare` UI.
- No `/finder`.
- No all-at-once migration of 13 styles.
- No redesign of accepted dossier renderers.
- No backend or database.
- No scientific-looking global score.
- No secondary filter UI.

## Entry Criteria

- This initiative packet is reviewed.
- No uncommitted user work is overwritten.
- US-003 open items are confirmed.
- Architecture choices are recorded before structural changes.

## Acceptance Criteria

- Foundation completion state is honest and durable.
- Controlled vocabularies cover taxonomy, contexts, evaluation, product fit,
  evidence, content status, and relationship references needed by the first
  slice.
- Modern SaaS has one normalized Spec 3 record.
- Existing landing and `/styles` behavior still build and render.
- Legacy `DesignStyle` remains available through an adapter.
- Invalid slugs, duplicate ids, unsupported levels, broken source references,
  and changed shared scenarios have automated proof.
- No Compare, Evolution, Methodology, or Finder UI is started accidentally.

## Proof Plan

| Layer | Proof |
| --- | --- |
| Unit | Domain vocabulary and invariant tests |
| Integration | Adapter maps normalized Modern SaaS to current UI contract |
| E2E | Existing `/` and `/styles` smoke flows retain parity |
| Platform | Desktop and `390x844` mobile overflow and interaction checks |
| Release | `npm run build`, unit suite, browser smoke, durable story verification |

## Sprint Exit

After Sprint 01, the next sprint should choose between:

1. Routing and `/styles/:slug` using the Modern SaaS vertical slice.
2. Completing the remaining 12 normalized research records.

The recommended order is to prove `/styles/:slug` with Modern SaaS first, then
migrate the remaining dataset in reviewed batches.
