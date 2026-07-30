# Sprint 01: Foundation and Domain Contract

## Status

Approved for implementation on 2026-07-29.

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
| 10 | S3-SCN-001 | Canonical scenario contract is implemented |
| 11 | S3-DATA-001 | Compatibility adapter exists |
| 12 | S3-DATA-002 | Modern SaaS is the first normalized vertical slice |
| 13 | S3-DATA-004 | Domain invariants have automated proof |

Orders 1-5 are complete. Implementation begins at `S3-DOM-001`.

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

- Implement product types separately from platform and usage context.
- Implement the six core evaluation criteria.
- Implement product fit, claims, sources, and relationship contracts.
- Add completeness and reference-integrity tests.

### Batch 3 — Scenarios, shared model, and adapter

- Implement canonical Dashboard, Form, and E-commerce Product scenarios.
- Define `ResearchStyle`.
- Implement normalized-first compatibility adapter.
- Add Modern SaaS, Glassmorphism, and Flat Design adapter fixtures.

### Batch 4 — Modern SaaS vertical slice

- Normalize Modern SaaS with honest claim/source labels.
- Connect its adapter output to the current UI.
- Keep the other 12 styles on the legacy path.
- Run domain, adapter, build, and browser regression proof.

### Batch 5 — Sprint close

- Run all configured validation.
- Update US-004 and durable proof.
- Record any contract changes or migration friction.

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
