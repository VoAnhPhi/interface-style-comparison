# Sprint 01: Foundation and Domain Contract

## Status

Completed on 2026-07-30.

## Sprint Goal

Prove that one normalized Spec 3 research record can become source of truth
while coexisting with the current visual workspace through a compatibility
adapter and without rewriting accepted dossier renderers.

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
| 10 | S3-DOM-005 | Relationships and evolution references are implemented |
| 11 | S3-SCN-001 | Canonical scenario contract is implemented |
| 12 | S3-DATA-001 | Compatibility adapter exists |
| 13 | S3-DATA-002 | Modern SaaS is the first normalized vertical slice |
| 14 | S3-DATA-004 | Domain invariants have automated proof |

Orders 1-14 are complete. Sprint 01 exit proof passed.

## Accepted Inputs

- Normalized data becomes source of truth incrementally.
- Legacy `DesignStyle` remains an adapter output during migration.
- Modern SaaS is the first normalized vertical slice.
- React Router owns routes and shareable URL state.
- `DOMAIN_VOCABULARY.md` is the canonical vocabulary.
- `EVALUATION_AND_TESTING_RULES.md` is the canonical proof contract.
- `IMPLEMENTATION_PLAN.md` is the detailed dependency-ordered work plan.

## Explicit Non-Goals

- No `/compare` UI.
- No `/finder`.
- No all-at-once migration of 13 styles.
- No redesign of accepted dossier renderers.
- No backend or database.
- No scientific-looking global score.
- No secondary filter UI.

## Entry Criteria

- [x] Initiative packet reviewed.
- [x] Foundation/US-003 completed with durable evidence.
- [x] Source ownership and adapter boundary recorded in ADR 0008.
- [x] Routing and URL ownership recorded in ADR 0009.
- [x] Domain vocabulary accepted.
- [x] Evaluation and testing rules accepted.
- [ ] Before code changes, re-check the working tree and preserve unrelated
  user work.

## Implementation Batches

### Batch 1 — Test and vocabulary foundation

- [x] Select and configure Vitest `4.1.10`.
- [x] Add `npm test` and watch-mode scripts.
- [x] Implement controlled vocabulary and runtime membership validation.
- [x] Add negative tests for unsupported values and unknown-data fallbacks.
- [x] Run 6 domain tests and `npm run build`.

### Batch 2 — Context, evaluation, and evidence

- [x] Implement product types separately from platform and usage context.
- [x] Add one canonical context record for each of the ten product types.
- [x] Add density, session, task, accessibility, and brand-expression characteristics.
- [x] Implement the six core evaluation criteria and criterion completeness.
- [x] Implement product fit with its own fit-level vocabulary.
- [x] Preserve `not-evaluated`, require reasoning, and reject score fields.
- [x] Implement claims, sources, review metadata, and relationship contracts.
- [x] Add source and relationship reference-integrity tests.

Evidence for the completed context/evaluation slice on 2026-07-30:

- `npm test` passed: 3 files, 21 tests.
- `npm run build` passed.
- No React, route, adapter, or renderer code changed, so this slice does not
  require Browser QA.

Evidence for the completed evidence/relationship slice on 2026-07-30:

- Source, claim, review, relationship, and evolution validation exists.
- Broken source/style/evolution references and invalid review-state
  combinations are rejected.
- The full suite passed: 6 files, 37 tests, followed by `npm run build`.

### Batch 3 — Scenarios, shared model, and adapter

- [x] Implement canonical Dashboard, Form, and E-commerce Product scenarios.
- [x] Deep-freeze shared scenario content and detect canonical changes.
- [x] Define `ResearchStyle`.
- [x] Implement normalized-first compatibility adapter.
- [x] Add Modern SaaS, Glassmorphism, and Flat Design adapter fixtures.

Evidence for the completed shared-model/adapter slice on 2026-07-30:

- Aggregate validation covers identity, taxonomy, review, evidence, Visual DNA,
  six evaluations, ten product fits, relationships, scenarios, and versioning.
- The adapter preserves legacy renderer ids and all unmigrated nested fields.
- Normalized name, summary, distinguishing signals, and explicit legacy
  classification mapping take precedence over fallback data.
- `npm test` passed: 7 files, 46 tests.
- `npm run build` passed.

### Batch 4 — Modern SaaS vertical slice

- [x] Normalize Modern SaaS with honest claim/source labels.
- [x] Connect its adapter output to the current UI.
- [x] Keep the other 12 styles on the legacy path.
- [x] Run domain, adapter, build, and browser regression proof.

Evidence:

- Runtime catalog contains one adapted Modern SaaS record and twelve exact
  legacy object references.
- Browser QA passed at `1280x800` and `390x844` for landing, Modern SaaS, and
  Glassmorphism, including selection, `Examples`, images, overflow, and console.

### Batch 5 — Sprint close

- [x] Run all configured validation.
- [x] Update US-004 and durable proof.
- [x] Record contract changes and migration friction.

Final proof:

- `npm test`: 8 files, 53 tests passed.
- `npm run build` passed.
- Browser QA produced no broken images, document overflow, or warning/error
  console output.

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
| Unit | `npm test`; vocabulary proof exists, with completeness, references, and scenario invariants added in later batches |
| Adapter | Normalized-first precedence and legacy contract preservation |
| Integration | Modern SaaS maps through the adapter into the current UI |
| E2E | Existing `/` and `/styles` smoke flows retain parity |
| Platform | Desktop and `390x844` mobile overflow and interaction checks |
| Release | `npm run build`, unit suite, browser smoke, durable story verification |

## Sprint Exit

After Sprint 01, the next sprint should choose between:

1. Routing and `/styles/:slug` using the Modern SaaS vertical slice.
2. Completing the remaining 12 normalized research records.

The recommended order is to prove `/styles/:slug` with Modern SaaS first, then
migrate the remaining dataset in reviewed batches.
