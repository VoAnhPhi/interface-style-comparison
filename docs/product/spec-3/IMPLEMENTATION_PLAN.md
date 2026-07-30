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

- no universal overall score exists;
- published evaluation has a reason;
- missing research remains `not-evaluated`;
- product fit uses fit levels rather than evaluation levels.

## Phase 4 — Evidence, Relationships, and Review Metadata

Tasks: `S3-DOM-004` and `S3-DOM-005`.

### WP4.1 Research sources

Define stable source ids and:

- title;
- source type;
- URL or local reference;
- publisher/author when known;
- publication/retrieval date when known;
- notes and limitations;
- review metadata.

### WP4.2 Claims

Every important claim records:

- claim type;
- source references when applicable;
- evidence strength when available;
- interpretation note when not a documented fact.

### WP4.3 Relationships

Define:

- source style;
- relationship type;
- target style;
- explanation;
- evidence or interpretation label;
- optional evolution-event reference.

Acceptance:

- unknown targets fail;
- directional relationships retain direction;
- `related-to` does not imply historical causation;
- implementation choices cannot masquerade as documented facts.

## Phase 5 — Canonical Same-Context Scenarios

Task: `S3-SCN-001`.

### WP5.1 Initial scenario records

Sprint 01 implements at least:

- dashboard;
- form;
- ecommerce product.

The full accepted catalog also reserves landing, navigation, pricing, and
content card.

### WP5.2 Immutability rules

For each scenario, lock:

- user goal;
- business content and data;
- required actions;
- information hierarchy;
- semantic structure;
- task flow.

Style renderers may change visual treatment and secondary grouping only.

Acceptance:

- a test fails when canonical business content changes unexpectedly;
- every renderer receives the same scenario object;
- scenarios contain no style-specific recommendation.

## Phase 6 — Normalized Research Model and Adapter

Task: `S3-DATA-001`.

### WP6.1 Define `ResearchStyle`

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

Adapter behavior:

1. accept a normalized record;
2. map owned fields to `DesignStyle`;
3. use explicit legacy fallback only for unmigrated fields;
4. preserve existing renderer id and tokens;
5. never infer a research conclusion;
6. expose validation errors rather than hiding invalid published data.

### WP6.3 Adapter fixtures

Required fixtures:

- Modern SaaS: interface direction and production-ready case;
- Glassmorphism: visual aesthetic and selective-use case;
- Flat Design: historical movement with code-native implementation choice.

Only Modern SaaS must be fully normalized in Sprint 01. The other two fixtures
may be minimal contract fixtures used to prove adapter edge cases.

## Phase 7 — Modern SaaS Vertical Slice

Task: `S3-DATA-002`.

### WP7.1 Normalize research

Create one complete Modern SaaS record using accepted local specs and current
product copy. Label each claim correctly and avoid inventing external sources.

### WP7.2 Connect current UI

- include the adapted Modern SaaS record in the current catalog dataset;
- leave the remaining 12 records on the legacy path;
- ensure `style.id` still resolves `ModernSaaSDossier`;
- preserve visual output and existing interactions.

### WP7.3 Prove the boundary

Tests:

- normalized record validation;
- adapter mapping;
- id/slug stability;
- token and renderer preservation;
- legacy fallback precedence;
- landing and `/styles` build parity;
- Browser QA desktop/mobile for Modern SaaS plus one unmigrated style.

## Phase 8 — Domain Invariant Suite

Task: `S3-DATA-004`.

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

Sprint 01 exits only when these tests and the production build pass.

## Phase 9 — Typed Routing Shell

Task: `S3-ROUTE-001`.

This starts after Sprint 01. The routing direction is accepted now, but route
implementation waits until the Modern SaaS normalized slice and adapter have
passed Sprint 01 proof.

### WP9.1 Introduce React Router

- wrap the app in the router;
- create typed route helpers/constants;
- preserve `/` and `/styles`;
- add Not Found;
- remove manual route ownership only after parity proof.

### WP9.2 Route proof

- direct access;
- reload;
- back/forward;
- landing-to-Explorer navigation;
- unknown route;
- desktop/mobile regression.

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

## Post-Sprint Sequence

1. Migrate remaining styles in small reviewed batches.
2. Move Explorer search and classification filters to normalized data.
3. Add shareable secondary filters.
4. Complete normalized slug dossier sections.
5. Implement pure Compare selection/query/context logic.
6. Build `/compare` and same-context dashboard specimens.
7. Normalize Evolution data and build `/evolution`.
8. Publish research contract and build `/methodology`.
9. Define Finder rules only after Compare reasoning is reviewed.
10. Defer report, analytics, persistence, authentication, and collaboration.

## Sprint 01 Exit Checklist

- ADR 0008 and ADR 0009 are accepted.
- Canonical vocabulary and evaluation docs are current.
- Test runner and real validation commands exist.
- Required Sprint 01 vocabulary is implemented.
- Product contexts, evaluation, evidence, and relationship contracts exist.
- Canonical scenarios have invariants.
- Adapter uses normalized-first precedence.
- Modern SaaS is normalized and rendered through the existing UI.
- Domain and adapter tests pass.
- `npm run build` passes.
- Existing landing and Explorer pass browser regression checks.
- Durable story, task ledger, and trace evidence are updated.
