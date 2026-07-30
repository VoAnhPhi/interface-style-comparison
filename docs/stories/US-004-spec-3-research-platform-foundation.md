# US-004 Spec 3 Research Platform Foundation

## Status

in_progress

## Lane

normal

## Product Contract

Establish the Spec 3 domain and migration foundation before implementing new
routes or decision-support UI. The first implementation slice must normalize
one style while preserving the current landing, explorer, and visual dossier
renderers.

## Relevant Product Docs

- `SPEC3.md`
- `docs/product/spec-3-research-platform.md`
- `docs/product/spec-3/README.md`
- `docs/product/spec-3/CURRENT_STATE.md`
- `docs/product/spec-3/ROADMAP.md`
- `docs/product/spec-3/TASKS.md`
- `docs/product/spec-3/SPRINT-01.md`
- `docs/product/spec-3/DOMAIN_VOCABULARY.md`
- `docs/product/spec-3/EVALUATION_AND_TESTING_RULES.md`
- `docs/product/spec-3/IMPLEMENTATION_PLAN.md`
- `docs/decisions/0008-normalized-research-source-ownership.md`
- `docs/decisions/0009-routing-and-url-ownership.md`

## Acceptance Criteria

- Foundation closure has an explicit task and dependency chain.
- Domain and routing decisions are recorded before structural implementation.
- Controlled vocabularies cover taxonomy, context, evaluation, evidence,
  content status, and relationships needed by the first vertical slice.
- A compatibility adapter prevents an all-at-once `DesignStyle` rewrite.
- Modern SaaS is normalized as the first Spec 3 style record.
- Domain invariants have automated proof.
- Existing `/` and `/styles` behavior retains build and browser parity.
- No Compare, Evolution, Methodology, Finder, or Report UI is implemented by
  this story.
- Normalized data owns migrated fields; legacy fallback cannot overwrite or
  invent normalized research.
- Product type, platform, and usage context remain separate domains.
- Missing evaluation remains `not-evaluated`, never an implicit `moderate`.

## Design Notes

- Commands: no product command in the planning pass.
- Queries: domain validation and adapter queries arrive during implementation.
- API: none; local TypeScript dataset remains valid for the initial phase.
- Tables: no product database.
- Domain rules: contextual fit, no universal winner, evidence or inference,
  controlled evaluation levels, immutable shared scenario content.
- UI surfaces: existing landing and `/styles` are regression surfaces only.
- Routing decision: React Router owns paths and shareable query state; route UI
  implementation is not part of the first domain batch.

## Validation

When updating durable proof status, use numeric booleans:
`scripts/bin/harness-cli story update --id US-004 --unit 1 --integration 1 --e2e 1 --platform 1`.

| Layer | Expected proof |
| --- | --- |
| Unit | Vocabulary, uniqueness, source reference, compare limit, and shared-scenario invariants |
| Integration | Modern SaaS normalized record maps through the legacy adapter |
| E2E | Existing landing and `/styles` smoke flows |
| Platform | Desktop and `390x844` mobile checks |
| Release | Build, unit suite, browser smoke, and durable story verification |

## Harness Delta

- Added an initiative template and initiative index.
- Added a Spec 3 initiative packet with baseline, roadmap, task ledger, and
  Sprint 01.
- Added a smaller living product contract derived from `SPEC3.md`.
- Registered durable intake `#14` and story `US-004`.

## Evidence

- Planning audit used the codebase graph, `SPEC.md`, `SPEC2.md`, all sections
  of `SPEC3.md`, current product docs, US-003, architecture rules, quality
  gates, and durable matrix.
- The original planning pass intentionally did not start feature code; Batch 1
  below is the first implementation slice.
- Batch 1 implementation on 2026-07-29:
  - Added Vitest `4.1.10` with `npm test` and `test:watch`.
  - Added pure domain vocabulary under `src/domain/research/`.
  - Added runtime membership guards and `VocabularyValidationError`.
  - Added six tests covering uniqueness, kebab-case, core criteria,
    `not-evaluated`, product-type separation, and invalid values.
  - `npm test` passed: 1 file, 6 tests.
  - `npm run build` passed.
  - Patched transitive PostCSS/Nanoid dependencies; `npm audit --omit=dev`
    reports zero vulnerabilities.
- Batch 2 product-context and evaluation slice on 2026-07-30:
  - Added canonical context records for all ten accepted product types.
  - Added the five product-context characteristics from the Spec 3 model:
    information density, session length, task complexity, accessibility
    criticality, and brand-expression need.
  - Added separate runtime vocabularies and validation for product platform
    and usage context; mobile remains a platform, not a product type.
  - Added discriminated evaluation contracts so implementation complexity
    uses its own scale while the other five criteria use evaluation levels.
  - Added six-criterion completeness checks, product-fit validation, required
    reasoning, `not-evaluated` preservation, and rejection of score fields.
  - `npm test` passed: 3 files, 21 tests.
  - `npm run build` passed.
  - No UI, routing, adapter, or renderer behavior changed; Browser QA remains
    reserved for the first rendered normalized slice.
- Batch 3 evidence, relationships, and canonical scenarios on 2026-07-30:
  - Added source, claim, evidence-strength, content/review-state, review-date,
    version, limitations, and source-reference contracts.
  - Enforced source-backed documented facts, explicit interpretation notes,
    review gates, stable ids, and broken-reference validation.
  - Added directional style relationships and evolution references with all
    nine accepted relationship semantics and non-causal `related-to`.
  - Added deeply frozen Dashboard, Form, and E-commerce Product scenarios with
    invariant checks for shared data, goals, hierarchy, semantics, and flow.
  - `npm test` passed: 6 files, 37 tests.
  - `npm run build` passed.
  - No UI, routing, adapter, or renderer changed; Browser QA is still deferred
    to the first normalized record rendered through the compatibility adapter.
- Batch 4 normalized model and compatibility adapter on 2026-07-30:
  - Added the aggregate `ResearchStyle` contract covering identity, taxonomy,
    review state, claims/sources, Visual DNA, evaluations, product fit,
    relationships, scenarios, versioning, and legacy renderer metadata.
  - Added aggregate validation with structured errors for missing dimensions,
    product contexts, claim/source references, scenario references, dates, and
    renderer-id mismatch.
  - Added a normalized-first adapter that overwrites only explicitly migrated
    legacy fields and preserves all unmigrated renderer data.
  - Added Modern SaaS, Glassmorphism, and Flat Design fixtures to prove
    production-ready, selective visual-aesthetic, and historical/implementation
    edge cases without claiming those fixtures are complete research records.
  - `npm test` passed: 7 files, 46 tests.
  - `npm run build` passed.
  - Runtime catalog data is not switched yet; Browser QA remains part of the
    complete Modern SaaS vertical slice in `S3-DATA-002`.
