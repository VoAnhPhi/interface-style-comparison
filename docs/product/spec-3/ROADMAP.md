# Spec 3 Roadmap

## Phase Overview

| Phase | Epic | Outcome | Priority | Status | Depends on |
| --- | --- | --- | --- | --- | --- |
| F0 | Foundation closure | Spec 1 and Spec 2 have honest completion evidence | P0 | completed | none |
| S3.0 | Governance and contracts | Spec 3 has a task system, product contract, and architecture questions | P0 | completed | none |
| S3.1 | Research domain foundation | Stable taxonomy, context, evaluation, evidence, relationship, and scenario contracts | P0 | completed | F0 disposition |
| S3.2 | Shared research data | One source of truth with an incremental legacy adapter and validated 13-style migration | P0 | in_progress | S3.1 |
| S3.3 | Routing and information architecture | Shareable routes for Explorer, Dossier, Compare, Evolution, and Methodology | P0 | in_progress | S3.1, routing decision |
| S3.4 | Explorer and dossier | Searchable taxonomy and complete research dossier on stable style URLs | P1 | planned | S3.2, S3.3 |
| S3.5 | Comparison engine | Contextual 2-3 style comparison with same-context specimens and trade-off guidance | P1 | planned | S3.2, S3.3, canonical scenarios |
| S3.6 | Evolution system | Explain movements, causes, reactions, influences, and taxonomy over time | P2 | planned | S3.2, S3.3 |
| S3.7 | Methodology | Public research workflow, source standards, limitations, and interpretation rules | P2 | planned | S3.1, S3.3 |
| S3.8 | Finder | Explainable product-context recommendations | P3 | deferred | S3.4, S3.5, evaluation validation |
| S3.9 | Full report | Deep research publication | P3 | deferred | normalized research pipeline |

## Epic F0: Foundation Closure

### Features

- Document the Flat Design raster waiver.
- Complete the final visual and responsive browser sweep.
- Close US-003 with current durable evidence.

### Exit criteria

- P1.9 has an accurate manifest and renderer disposition.
- P1.14 validates all current style paths.
- Durable US-003 status matches actual evidence.

## Epic S3.1: Research Domain Foundation

### Features

- Taxonomy:
  - interface direction;
  - visual aesthetic;
  - design language;
  - historical movement.
- Product contexts.
- Evaluation criteria and controlled levels.
- Product fit with reasons, conditions, strengths, and risks.
- Research sources and evidence references.
- Style relationships and evolution references.
- Canonical same-context scenarios.
- Research metadata and content status.

### Business rules

- There is no universal best style.
- Evaluation is contextual and explainable.
- A style may belong to more than one classification.
- Numeric scores are not displayed as scientific certainty.
- Missing research is represented honestly.
- Critical claims are evidence-backed or marked as interpretation.

### Exit criteria

- Pure TypeScript domain contracts exist.
- Controlled vocabulary is documented.
- Invalid combinations have unit proof.
- No UI route depends on unfinished domain fields.

## Epic S3.2: Shared Research Data

### Features

- Separate research entities from renderer-specific presentation.
- Introduce normalized data modules.
- Build a compatibility adapter for existing catalog and dossier components.
- Migrate Modern SaaS as the first complete vertical slice.
- Migrate the remaining 12 styles in bounded batches.
- Add dataset validation for unique ids/slugs, required fields, references,
  and content status.

### Exit criteria

- Catalog, dossier, comparison, evolution, and Finder can consume the same
  business fact without duplicating it.
- Existing visual renderers remain functional during migration.

## Epic S3.3: Routing and Information Architecture

### Route targets

```text
/
/styles
/styles/:slug
/compare?styles=...&context=...
/evolution
/methodology
```

`/finder` and `/report` remain registered as future scope until their phase is
approved.

### Exit criteria

- Back and forward navigation work.
- Major selection state is shareable and bookmarkable.
- Unknown slugs and invalid query state have explicit error recovery.
- Existing `/styles` behavior remains available during migration.

## Epic S3.4: Explorer and Dossier

### Explorer features

- Search name, alias, keyword, classification, and characteristic.
- Primary classification filter.
- Secondary era, density, visual weight, and maturity filters.
- URL-backed filter state after routing foundation.
- Honest empty state.

### Dossier features

- Overview.
- Visual DNA.
- Reference implementation.
- Patterns.
- Same-context specimens.
- Evaluation.
- Product fit.
- Related directions.
- Sources.

### Exit criteria

- A reader can answer the six dossier questions in Spec 3.
- Every critical claim exposes evidence or an interpretation label.
- Existing style-specific scenes remain examples, not canonical definitions.

## Epic S3.5: Comparison Engine

### Domain before UI

- Enforce minimum 2 and maximum 3 styles.
- Define comparable dimensions.
- Define selected product context.
- Define missing-data behavior.
- Produce trade-off statements, not a winner.

### UI after domain

- Style selector.
- Context selector.
- At-a-glance positioning.
- Same-context specimen comparison.
- Criteria matrix.
- Context-aware interpretation.
- Decision summary and dossier links.

### Exit criteria

- URL state restores the comparison.
- Shared scenario content is identical across styles.
- The system never presents a universal winner.

## Epic S3.6: Evolution

- Normalize movement and transition events.
- Model cause, reaction, influence, limitation, and revival.
- Build timeline, transition stories, relationship map, and taxonomy guide.
- Link events to dossiers and sources.

## Epic S3.7: Methodology

- Research workflow.
- Three-layer rule: principle, demo implementation, interpretation.
- Evaluation definitions.
- Source quality and citation rules.
- Limitations and versioning.

## Deferred Epics

### Finder

Do not implement until product contexts, evaluation, compare logic, and
explainability are validated. Internal ranking may exist later, but every
recommendation must explain fit, trade-offs, risks, and alternatives.

### Full report

The report is a deep publication and research input. It is not required for the
core Explore, Dossier, Compare, or Evolution flows.
