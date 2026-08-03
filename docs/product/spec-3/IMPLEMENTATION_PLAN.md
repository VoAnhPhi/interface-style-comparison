# Spec 3 Detailed Implementation Plan

## Status

Approved for implementation planning on 2026-07-29.

This plan translates the accepted source ownership, routing, vocabulary, and
evaluation contracts into dependency-ordered work. Task ids remain synchronized
with `TASKS.md`.

## Guardrails

- Preserve the accepted landing page and all 13 dossier renderers.
- Migrate data incrementally; never rewrite all records in one pass.
- Normalized data owns every field that has migrated.
- Legacy fallback is read-only and cannot overwrite normalized facts.
- Do not build Compare, Evolution, Methodology, or Finder UI during Sprint 01.
- Do not invent sources or use `moderate` as an unknown-data fallback.
- Every runtime slice must keep `/` and `/styles` working.

## Phase 0 — Accepted Decisions and Contracts

Status: completed.

### WP0.1 Source ownership

- Record normalized-first incremental migration.
- Define the compatibility-adapter boundary.
- Define precedence for migrated and unmigrated records.
- Record retirement conditions for `designStyles.ts`.

Evidence:

- ADR 0008.
- `DOMAIN_VOCABULARY.md`.

### WP0.2 Routing ownership

- Accept React Router.
- Define path and query ownership.
- Define invalid slug and Not Found behavior.
- Define deterministic Compare URL normalization.

Evidence:

- ADR 0009.
- `EVALUATION_AND_TESTING_RULES.md`.

## Phase 1 — Test Foundation

Purpose: create executable proof before normalized production data is added.

### WP1.1 Select the test runner

Status: completed on 2026-07-29.

Implemented:

- Vitest `4.1.10` for pure TypeScript domain and adapter tests;
- add Testing Library only when component/route integration needs DOM proof;
- keep Browser QA as a separate rendered-experience gate.

Required outputs:

- `test` script;
- `test:unit` or equivalent;
- deterministic test environment;
- no fake test commands.

Proof:

- one passing smoke test;
- one intentionally invalid fixture rejected by validation.

### WP1.2 Define validation entry points

Create pure functions that validate:

- vocabulary membership;
- record completeness by `ContentStatus`;
- unique id and slug;
- referenced style/source/context existence;
- relationship direction;
- published evaluation reasoning;
- `not-evaluated` preservation;
- shared-scenario invariants.

Validation must return structured errors suitable for tests and later authoring
tools. It must not silently mutate research records.

## Phase 2 — Controlled Domain Vocabulary

Task: `S3-DOM-001`.

### WP2.1 Module boundaries

Recommended structure:

```text
src/domain/research/
  vocabulary.ts
  style.ts
  evaluation.ts
  evidence.ts
  relationships.ts
  scenarios.ts
  validation.ts
  index.ts
```

Rules:

- domain modules do not import React;
- domain modules do not import dossier components;
- vocabulary values have readonly runtime arrays when validation needs them;
- TypeScript unions and runtime validation derive from one declared list where
  practical.

### WP2.2 Required Sprint 01 types

Status: completed on 2026-07-29, including runtime value guards and structured
validation errors.

Implement:

- `StyleClassification`;
- `StyleMaturity`;
- `ProductionReadiness`;
- `ContentStatus`;
- `EvaluationCriterion`;
- `EvaluationLevel`;
- `ProductFitLevel`;
- `ProductType`;
- `VisualDNADimension`;
- `DimensionLevel`;
- `StyleRelationshipType`;
- `ClaimType`;
- `ResearchSourceType`.

### WP2.3 Deferred-but-reserved vocabulary

Do not require these in the first record, but reserve their accepted names:

- `ProductPlatform`;
- `UsageContext`;
- `EvidenceStrength`;
- `RiskType`;
- `RiskSeverity`;
- `ReviewStatus`;
- `ComparisonContext`;
- `RecommendationLevel`.

Acceptance:

- [x] Unsupported free-form values fail type/runtime validation.
- [x] Maturity and production readiness remain distinct.
- [x] `not-applicable` and `not-evaluated` survive validation.
- [x] Classification includes `interface-pattern`.
- [x] Product type does not contain platform values.
- [x] All runtime vocabulary values are unique and kebab-case.

## Phase 3 — Product Context and Evaluation

Tasks: `S3-DOM-002` and `S3-DOM-003`.

### WP3.1 Product context records

Status: completed on 2026-07-30.

Create canonical records for the ten `ProductType` values. Each record should
contain:

- id and display name;
- purpose;
- typical user goals;
- density/task characteristics;
- default usage-context hints;
- accessibility sensitivity;
- no style recommendation.

Product platform and usage context remain separate fields.

### WP3.2 Evaluation structure

Status: completed on 2026-07-30.

Define:

```ts
interface Evaluation {
  criterion: EvaluationCriterion;
  level: EvaluationLevel;
  reason: string;
  strengths: string[];
  risks: string[];
  conditions: string[];
  evidence: ResearchSourceId[];
  claimType: ClaimType;
}
```

Implementation complexity uses `ComplexityLevel` rather than strong/weak
quality wording.

### WP3.3 Product fit structure

Status: completed on 2026-07-30.

Each fit record contains:

- product type;
- fit level;
- reason;
- strengths;
- risks;
- conditions;
- evidence references;
- claim type.

Acceptance:

- [x] No universal overall score exists; score-like fields fail validation.
- [x] Published evaluation has a reason.
- [x] Missing research remains `not-evaluated`.
- [x] Product fit uses fit levels rather than evaluation levels.
- [x] A core evaluation set contains exactly the six accepted criteria.
- [x] Product type, platform, and usage context validate independently.

Proof:

- `src/domain/research/context.test.ts`;
- `src/domain/research/evaluation.test.ts`;
- `npm test`: 3 files, 21 tests passed on 2026-07-30;
- `npm run build` passed on 2026-07-30.

## Phase 4 — Evidence, Relationships, and Review Metadata

Tasks: `S3-DOM-004` and `S3-DOM-005`.

### WP4.1 Research sources

Status: completed on 2026-07-30.

Define stable source ids and:

- title;
- source type;
- URL or local reference;
- publisher/author when known;
- publication/retrieval date when known;
- notes and limitations;
- review metadata.

### WP4.2 Claims

Status: completed on 2026-07-30.

Every important claim records:

- claim type;
- source references when applicable;
- evidence strength when available;
- interpretation note when not a documented fact.

### WP4.3 Relationships

Status: completed on 2026-07-30.

Define:

- source style;
- relationship type;
- target style;
- explanation;
- evidence or interpretation label;
- optional evolution-event reference.

Acceptance:

- [x] Unknown targets fail.
- [x] Directional relationships retain direction.
- [x] `related-to` does not imply historical causation.
- [x] Implementation choices cannot masquerade as documented facts.
- [x] Documented facts require a known source.
- [x] Non-documented claims carry an explicit interpretation note.
- [x] Published and approved states enforce their review metadata.

Proof:

- `src/domain/research/evidence.test.ts`;
- `src/domain/research/relationships.test.ts`;
- full suite: 6 files, 37 tests passed on 2026-07-30;
- `npm run build` passed on 2026-07-30.

## Phase 5 — Canonical Same-Context Scenarios

Task: `S3-SCN-001`.

### WP5.1 Initial scenario records

Status: completed on 2026-07-30.

Sprint 01 implements at least:

- dashboard;
- form;
- ecommerce product.

The full accepted catalog also reserves landing, navigation, pricing, and
content card.

### WP5.2 Immutability rules

Status: completed on 2026-07-30.

For each scenario, lock:

- user goal;
- business content and data;
- required actions;
- information hierarchy;
- semantic structure;
- task flow.

Style renderers may change visual treatment and secondary grouping only.

Acceptance:

- [x] A test fails when canonical business content changes unexpectedly.
- [x] Canonical records are deeply frozen for shared renderer consumption.
- [x] Scenarios contain no style-specific recommendation.

Proof:

- `src/domain/research/scenarios.test.ts`;
- Dashboard, Form, and E-commerce Product records pass structural validation;
- canonical mismatch, missing-scenario, and forbidden-style-field tests pass.

## Phase 6 — Normalized Research Model and Adapter

Task: `S3-DATA-001`.

### WP6.1 Define `ResearchStyle`

Status: completed on 2026-07-30.

The first complete model includes:

- identity, aliases, slug, and summary;
- classifications, maturity, and production readiness;
- content/review metadata;
- principles and distinguishing signals;
- Visual DNA;
- six core evaluations;
- product fit;
- sources and claims;
- style relationships;
- scenario/specimen references;
- version metadata;
- legacy-renderer mapping metadata.

### WP6.2 Implement normalized-first adapter

Status: completed on 2026-07-30.

Adapter behavior:

1. accept a normalized record;
2. map owned fields to `DesignStyle`;
3. use explicit legacy fallback only for unmigrated fields;
4. preserve existing renderer id and tokens;
5. never infer a research conclusion;
6. expose validation errors rather than hiding invalid published data.

### WP6.3 Adapter fixtures

Status: completed on 2026-07-30.

Required fixtures:

- Modern SaaS: interface direction and production-ready case;
- Glassmorphism: visual aesthetic and selective-use case;
- Flat Design: historical movement with code-native implementation choice.

Only Modern SaaS must be fully normalized in Sprint 01. The other two fixtures
may be minimal contract fixtures used to prove adapter edge cases.

Proof:

- `src/domain/research/style.ts`;
- `src/domain/research/adapter.ts`;
- `src/domain/research/adapter.test.ts`;
- Modern SaaS, Glassmorphism, and Flat Design minimal fixtures validate;
- normalized fields defeat conflicting legacy fallback values;
- renderer-id drift and invalid normalized references return structured errors;
- 7 test files and 46 tests passed on 2026-07-30;
- `npm run build` passed on 2026-07-30.

## Phase 7 — Modern SaaS Vertical Slice

Task: `S3-DATA-002`.

### WP7.1 Normalize research

Status: completed on 2026-07-30.

Create one complete Modern SaaS record using accepted local specs and current
product copy. Label each claim correctly and avoid inventing external sources.

### WP7.2 Connect current UI

Status: completed on 2026-07-30.

- include the adapted Modern SaaS record in the current catalog dataset;
- leave the remaining 12 records on the legacy path;
- ensure `style.id` still resolves `ModernSaaSDossier`;
- preserve visual output and existing interactions.

### WP7.3 Prove the boundary

Status: completed on 2026-07-30.

Tests:

- normalized record validation;
- adapter mapping;
- id/slug stability;
- token and renderer preservation;
- legacy fallback precedence;
- landing and `/styles` build parity;
- Browser QA desktop/mobile for Modern SaaS plus one unmigrated style.

Proof:

- `src/domain/research/data/modernSaas.ts` is the first complete normalized
  record and labels local project evidence honestly.
- `src/data/designStyles.ts` builds the runtime catalog through the
  normalized-first adapter.
- Modern SaaS is adapted; the other twelve entries retain exact legacy object
  identity.
- Browser QA passed at `1280x800` and `390x844` for landing, Modern SaaS, and
  Glassmorphism with no broken images, overflow, or console warnings/errors.

## Phase 8 — Domain Invariant Suite

Task: `S3-DATA-004`.

Status: completed on 2026-07-30.

Add negative tests for:

- duplicate ids and slugs;
- unsupported values;
- missing published fields;
- empty evaluation reason;
- unknown source and relationship references;
- missing product context;
- invalid Compare cardinality;
- modified canonical scenario;
- legacy data overwriting a normalized value;
- unknown values becoming `moderate`.

Sprint 01 exited after 8 test files, 53 tests, the production build, and
desktop/mobile Browser QA passed on 2026-07-30.

## Phase 9 — Typed Routing Shell

Task: `S3-ROUTE-001`.

Status: completed on 2026-07-30.

This started after the Modern SaaS normalized slice and adapter passed Sprint
01 proof.

### WP9.1 Introduce React Router

- [x] Wrap the app in `BrowserRouter`.
- [x] Create typed route helpers/constants.
- [x] Preserve `/` and `/styles`.
- [x] Add Not Found with recovery links.
- [x] Remove manual pathname, `pushState`, and `popstate` ownership.

### WP9.2 Route proof

- [x] Direct access.
- [x] Reload.
- [x] Back/forward.
- [x] Landing-to-Explorer navigation.
- [x] Unknown route and recovery.
- [x] Desktop `1280x720` and mobile `390x844` regression.

Proof:

- `src/routing/routes.test.ts`: 2 route-contract tests.
- `npm test`: 9 files, 55 tests passed.
- `npm run build`: passed.
- Browser QA found and corrected a Not Found token-scope defect, then passed
  with no broken images, horizontal overflow, console warnings, or errors.
- React Router `7.18.2` is used in client-only Declarative mode. The current
  npm audit advisory concerns RSC Action handling, which this application does
  not enable; the advisory remains recorded rather than hidden.

## Phase 10 — Slug Dossier

Task: `S3-ROUTE-002`.

- implement `/styles/:slug`;
- resolve normalized Modern SaaS by slug;
- synchronize catalog selection with the route;
- preserve direct links and browser history;
- show Not Found for unknown slugs;
- retain `/styles` as Explorer.

After this proof, migrate the remaining 12 records in reviewed batches before
building full Compare.

## Phase 11 — Reviewed 13-Style Dataset Migration

Task: `S3-DATA-003`.

Status: completed on 2026-08-02.

- Added explicit normalized migration records for the remaining 12 styles.
- Kept incomplete research honest with `contentStatus: "incomplete"` and
  `reviewStatus: "not-reviewed"`.
- Preserved legacy tokens, examples, and renderer-specific presentation through
  the normalized-first compatibility adapter.
- Kept missing qualitative research as `not-evaluated`; implementation
  complexity remains a migration estimate and is not a universal score.

Proof:

- `npm test`: 9 files, 57 tests passed.
- `npm run build`: passed.
- Browser smoke at `1280x800` and `390x844` passed for landing and
  `/styles/minimal-clean` with no broken images, overflow, or warning/error
  console logs.

## Post-Sprint Sequence

1. Migrate remaining styles in small reviewed batches. **Completed by
   `S3-DATA-003`.**
2. Move Explorer search and classification filters to normalized data. **Completed
   by `S3-EXP-001`.**
3. Add shareable secondary filters.
4. Complete normalized slug dossier sections.
5. Implement pure Compare selection/query/context logic.
6. Build `/compare` and same-context dashboard specimens.
7. Normalize Evolution data and build `/evolution`.
8. Publish research contract and build `/methodology`.
9. Define Finder rules only after Compare reasoning is reviewed.
10. Defer report, analytics, persistence, authentication, and collaboration.

## Phase 12 — Normalized Explorer Search

Task: `S3-EXP-001`.

Status: completed on 2026-08-02.

- Added `characteristics` to the normalized `ResearchStyle` contract so Explorer
  does not need legacy-only searchable fields.
- Added pure normalized search and primary classification filtering for name,
  aliases, keywords, characteristics, definitions, signals, and classifications.
- Added an accessible empty state with a clear recovery action while preserving
  the existing tag filter and legacy renderer adapter.

Proof:

- `src/domain/research/explorer.test.ts`: alias, characteristic,
  classification, and available-filter coverage.
- `npm test`: 10 files, 61 tests passed.
- `npm run build`: passed.
- Browser QA at `1280x800`: classification filtering, alias search,
  characteristic search, empty-state recovery, no horizontal overflow, and no
  console logs.

## Phase 13 — Shareable Explorer Facets

Task: `S3-EXP-002`.

Status: completed on 2026-08-03.

- Added normalized era metadata with explicit multi-era support.
- Added secondary era, density, visual weight, and production maturity
  filters to the Explorer command palette.
- Made all Explorer filters shareable through canonical URL query state with
  safe recovery for invalid values.

Proof:

- `src/domain/research/explorer.test.ts`: combined filters, available values,
  URL round-trip, and invalid-value recovery.
- `npm test`: 10 files, 65 tests passed.
- `npm run build`: passed.
- Browser QA at `1280x800` and `390x844`: combined filtering, clear state,
  URL persistence, responsive layout, no horizontal overflow, and no console
  warnings/errors.

## Sprint 01 Exit Checklist

- [x] ADR 0008 and ADR 0009 are accepted.
- [x] Canonical vocabulary and evaluation docs are current.
- [x] Test runner and real validation commands exist.
- [x] Required Sprint 01 vocabulary is implemented.
- [x] Product contexts, evaluation, evidence, and relationship contracts exist.
- [x] Canonical scenarios have invariants.
- [x] Adapter uses normalized-first precedence.
- [x] Modern SaaS is normalized and rendered through the existing UI.
- [x] Domain and adapter tests pass.
- [x] `npm run build` passes.
- [x] Existing landing and Explorer pass browser regression checks.
- [x] Durable story, task ledger, and trace evidence are updated.
