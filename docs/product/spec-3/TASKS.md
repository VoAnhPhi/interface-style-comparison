# Spec 3 Task Ledger

## Status Vocabulary

| Status | Meaning |
| --- | --- |
| completed | Acceptance criteria and evidence exist |
| in_progress | Work is actively selected |
| ready | Dependencies are complete and the task can be selected |
| planned | Accepted but dependencies remain |
| blocked | A named dependency or decision prevents progress |
| deferred | Explicitly outside the current development horizon |

## Current Position

```text
Current sprint: pre-implementation planning complete
Active phase: F0 Foundation closure
Next sprint: Sprint 01 Foundation and Domain Contract
Next implementation task after approval: S3-DOM-001
```

## Ledger

| ID | Epic | Feature / route | Task | Priority | Dependency | Status | Acceptance criteria |
| --- | --- | --- | --- | --- | --- | --- | --- |
| S3-GOV-001 | Governance | Docs harness | Audit Spec 1, Spec 2, Spec 3, codebase, and durable matrix | P0 | none | completed | Baseline identifies implemented behavior, open Foundation work, and Spec 3 gaps |
| S3-GOV-002 | Governance | Docs harness | Create initiative, roadmap, task ledger, sprint plan, and product contract | P0 | S3-GOV-001 | completed | Project phase, next task, dependencies, priorities, statuses, and future scope are visible |
| F0-FLAT-001 | Foundation | `/styles`, Flat Design dossier | Reconcile Flat Design asset id, manifest record, and renderer use or documented waiver | P0 | none | ready | P1.9 has one accurate asset disposition and no stale planned requirement |
| F0-SWEEP-001 | Foundation | `/styles`, all dossiers | Run P1.14 full desktop/mobile/style sweep | P0 | F0-FLAT-001 | planned | All 13 styles pass selection, tabs, images, overflow, console, and build checks |
| F0-CLOSE-001 | Foundation | Harness | Close US-003 or record an explicit carry-forward | P0 | F0-SWEEP-001 | planned | Story and durable matrix match actual evidence |
| S3-ADR-001 | Architecture | Shared domain and data | Decide incremental domain modules, legacy adapter boundary, and source ownership | P0 | S3-GOV-002 | ready | Accepted ADR names source-of-truth and migration boundary without rewriting renderers |
| S3-ADR-002 | Architecture | Routing | Decide router approach, route parsing, URL ownership, and not-found behavior | P0 | S3-GOV-002 | ready | Accepted ADR supports params and query state and preserves current links |
| S3-DOM-001 | Research | Taxonomy | Define classification, level, maturity, content status, and relationship vocabularies | P0 | S3-ADR-001 | planned | Types express Spec 3 categories and reject unsupported free-form values |
| S3-DOM-002 | Product | Product context | Define context characteristics and canonical context records | P0 | S3-DOM-001 | planned | SaaS, Dashboard, Landing, Portfolio, E-commerce, Documentation, Mobile, and Experimental contexts are represented |
| S3-DOM-003 | Product | Evaluation | Define criteria, controlled levels, reasoning, risks, strengths, conditions, and evidence references | P0 | S3-DOM-001 | planned | Evaluation has no mandatory decimal score and supports missing research |
| S3-DOM-004 | Research | Evidence | Define sources, claim type, source reference, inference label, review metadata, and content status | P0 | S3-DOM-001 | planned | Critical claims can link to a source or be marked interpretation |
| S3-DOM-005 | Research | Evolution | Define style relationships, evolution references, and transition semantics | P0 | S3-DOM-001, S3-DOM-004 | planned | Cause, reaction, influence, relation, combination, and revival are representable |
| S3-SCN-001 | Product | Same-context specimens | Define Dashboard, E-commerce, and Form canonical scenarios | P0 | S3-DOM-002 | planned | Shared content, goal, structure, and functionality are immutable across style implementations |
| S3-DATA-001 | Engineering | Shared data | Create normalized research module and compatibility adapter | P0 | S3-DOM-002, S3-DOM-003, S3-DOM-004, S3-DOM-005 | planned | Existing catalog and dossier can consume adapted legacy data without visual regression |
| S3-DATA-002 | Research | Modern SaaS vertical slice | Normalize one complete style including evidence, evaluation, product fit, relationships, and versioning | P0 | S3-DATA-001, S3-SCN-001 | planned | Modern SaaS passes schema validation and renders through existing UI |
| S3-DATA-003 | Research | 13-style dataset | Migrate remaining styles in reviewed batches | P0 | S3-DATA-002 | planned | All published records satisfy required fields; incomplete sections are marked reviewed/draft honestly |
| S3-DATA-004 | Engineering | Validation | Add unit checks for uniqueness, references, controlled values, compare limits, and scenario invariants | P0 | S3-DATA-001 | planned | Automated proof fails on invalid slug, missing reference, invalid level, or changed shared scenario |
| S3-ROUTE-001 | Engineering | All routes | Introduce typed route map and navigation shell | P0 | S3-ADR-002 | planned | `/` and `/styles` retain parity; not-found behavior exists |
| S3-ROUTE-002 | Engineering | `/styles/:slug` | Add stable style detail URL and selection synchronization | P0 | S3-ROUTE-001, S3-DATA-002 | planned | Direct load, bookmark, back, forward, and unknown slug behavior work |
| S3-EXP-001 | UX | `/styles` | Enhance search and primary classification filter from normalized data | P1 | S3-DATA-003, S3-ROUTE-001 | planned | Search covers aliases and characteristics; empty state is accessible |
| S3-EXP-002 | UX | `/styles` | Add secondary era, density, visual weight, and maturity filters with URL state | P1 | S3-EXP-001 | planned | Refresh and shared URL restore filters |
| S3-DOS-001 | UX | `/styles/:slug` | Render normalized Overview, Visual DNA, implementation, patterns, and same-context sections | P1 | S3-ROUTE-002, S3-DATA-002 | planned | Existing renderer remains the local demo; normalized sections answer dossier questions |
| S3-DOS-002 | UX | `/styles/:slug` | Add evaluation, product fit, related directions, and sources | P1 | S3-DOM-003, S3-DOM-004, S3-DOM-005, S3-DOS-001 | planned | Reasons, conditions, evidence, and related CTAs are visible |
| S3-CMP-001 | Product | Compare domain | Implement pure 2-3 style selection and query parser | P1 | S3-DATA-003, S3-ROUTE-001, S3-DATA-004 | planned | Invalid, duplicate, fewer-than-two, and over-limit selections have defined outcomes |
| S3-CMP-002 | Product | Compare domain | Implement context-aware criteria and trade-off summary | P1 | S3-CMP-001, S3-DOM-002, S3-DOM-003 | planned | Output explains when to choose each direction and never returns a universal winner |
| S3-CMP-003 | UX | `/compare` | Build selector, URL state, at-a-glance, matrix, and decision summary | P1 | S3-CMP-002, S3-ADR-002 | planned | Shared URL restores 2-3 styles and context |
| S3-CMP-004 | UX | `/compare` | Add same-context Dashboard specimen comparison | P1 | S3-CMP-003, S3-SCN-001 | planned | Content, tasks, data, and hierarchy are identical across visual implementations |
| S3-EVO-001 | Research | Evolution data | Normalize initial movements, transitions, drivers, relationships, and sources | P2 | S3-DATA-003, S3-DOM-005 | planned | Initial timeline has evidence-backed cause and influence data |
| S3-EVO-002 | UX | `/evolution` | Build timeline, transition stories, taxonomy, and dossier links | P2 | S3-EVO-001, S3-ROUTE-001 | planned | User can understand what changed, why, and what influenced it |
| S3-MET-001 | Research | Methodology contract | Publish workflow, evaluation definitions, source standards, limitations, and versioning | P2 | S3-DOM-003, S3-DOM-004 | planned | Methodology distinguishes principle, demo, and interpretation |
| S3-MET-002 | UX | `/methodology` | Build accessible methodology page and cross-links | P2 | S3-MET-001, S3-ROUTE-001 | planned | Dossier source/evaluation labels link to their definitions |
| S3-FND-001 | Product | Finder engine | Define matching inputs, weights, penalties, explanation, and alternative rules | P3 | S3-CMP-002, product-context validation | deferred | No implementation before earlier decision-support logic is reviewed |
| S3-FND-002 | UX | `/finder` | Build product-context wizard and compare handoff | P3 | S3-FND-001 | deferred | Recommendations explain fit, risks, trade-offs, and alternatives |
| S3-RPT-001 | Research | `/report` | Transform long-form report into a deep publication | P3 | normalized report pipeline | deferred | Report remains separate from core interactive flows |
| S3-ANL-001 | Product | Analytics | Define product events and privacy constraints | Future | mature core journeys | deferred | No tracking is added during core architecture work |

## Dependency Spine

```text
Foundation closure
  -> domain vocabularies
  -> normalized shared data
  -> routing and slug dossier
  -> comparison domain
  -> comparison UI
  -> evolution and methodology
  -> Finder
```
