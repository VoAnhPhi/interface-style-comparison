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
