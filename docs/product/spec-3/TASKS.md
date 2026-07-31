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
Current sprint: Sprint 01 completed
Active phase: Post-Sprint routing and incremental data migration
Foundation closure: completed
Architecture decisions: completed
Controlled vocabulary: completed
Product context and evaluation contracts: completed
Evidence, relationships, and canonical scenarios: completed
Normalized research model and compatibility adapter: completed
Modern SaaS vertical slice and invariant suite: completed
Typed routing shell: completed
Next implementation task: S3-DATA-003
```

## Ledger

| ID | Epic | Feature / route | Task | Priority | Dependency | Status | Acceptance criteria |
| --- | --- | --- | --- | --- | --- | --- | --- |
| S3-GOV-001 | Governance | Docs harness | Audit Spec 1, Spec 2, Spec 3, codebase, and durable matrix | P0 | none | completed | Baseline identifies implemented behavior, open Foundation work, and Spec 3 gaps |
| S3-GOV-002 | Governance | Docs harness | Create initiative, roadmap, task ledger, sprint plan, and product contract | P0 | S3-GOV-001 | completed | Project phase, next task, dependencies, priorities, statuses, and future scope are visible |
| F0-FLAT-001 | Foundation | `/styles`, Flat Design dossier | Reconcile Flat Design asset id, manifest record, and renderer use or documented waiver | P0 | none | completed | User-accepted code-native B2 scene is documented as a waiver for the historical planned raster asset |
| F0-SWEEP-001 | Foundation | `/styles`, all dossiers | Run P1.14 full desktop/mobile/style sweep | P0 | F0-FLAT-001 | completed | 2026-07-29 build plus Browser QA at `1280x720` and `390x844` passed for all 13 styles: selection, `Examples`, image integrity, overflow, and console checks |
| F0-CLOSE-001 | Foundation | Harness | Close US-003 or record an explicit carry-forward | P0 | F0-SWEEP-001 | completed | US-003 is complete; the durable matrix and story evidence record the final sweep |
| S3-ADR-001 | Architecture | Shared domain and data | Decide incremental domain modules, legacy adapter boundary, and source ownership | P0 | S3-GOV-002 | completed | ADR 0008 makes normalized records source of truth incrementally and preserves renderers through a normalized-first adapter |
| S3-ADR-002 | Architecture | Routing | Decide router approach, route parsing, URL ownership, and not-found behavior | P0 | S3-GOV-002 | completed | ADR 0009 accepts React Router, path/query ownership, stable slug routes, Compare URL normalization, and Not Found |
| S3-DOM-001 | Research | Taxonomy | Implement the accepted Sprint 01 controlled vocabulary | P0 | S3-ADR-001 | completed | `src/domain/research/vocabulary.ts` defines TypeScript/runtime vocabularies and structured validation; 6 Vitest tests and production build passed on 2026-07-29 |
| S3-DOM-002 | Product | Product context | Define product type separately from platform and usage context, plus canonical product records | P0 | S3-DOM-001 | completed | Ten canonical product contexts include five descriptive characteristics, separate platform/usage vocabularies, structured validation, and negative tests passed on 2026-07-30 |
| S3-DOM-003 | Product | Evaluation | Define the six core criteria, controlled levels, product fit, reasoning, risks, conditions, and evidence references | P0 | S3-DOM-001 | completed | Six-criterion completeness, criterion-specific complexity levels, product-fit levels, `not-evaluated`, required reasoning, and forbidden score fields are covered by tests passed on 2026-07-30 |
| S3-DOM-004 | Research | Evidence | Define sources, claim type, source reference, inference label, review metadata, and content status | P0 | S3-DOM-001 | completed | Sources, claims, evidence strength, review gates, dates, documented-fact requirements, interpretation labels, and broken-reference checks passed on 2026-07-30 |
| S3-DOM-005 | Research | Evolution | Define style relationships, evolution references, and transition semantics | P0 | S3-DOM-001, S3-DOM-004 | completed | Directional edges, all nine accepted relationship semantics, evidence attribution, non-causal `related-to`, evolution drivers, and unknown-target checks passed on 2026-07-30 |
| S3-SCN-001 | Product | Same-context specimens | Define Dashboard, E-commerce, and Form canonical scenarios | P0 | S3-DOM-002 | completed | Dashboard, Form, and E-commerce Product lock shared content, goals, actions, hierarchy, semantics, and task flow with deep-freeze and canonical mismatch tests |
| S3-DATA-001 | Engineering | Shared data | Create normalized research module and compatibility adapter | P0 | S3-DOM-002, S3-DOM-003, S3-DOM-004, S3-DOM-005 | completed | `ResearchStyle`, aggregate validation, normalized-first adapter, renderer-id protection, and Modern SaaS/Glassmorphism/Flat Design fixtures passed 46 tests and production build on 2026-07-30 |
| S3-DATA-002 | Research | Modern SaaS vertical slice | Normalize one complete style including evidence, evaluation, product fit, relationships, and versioning | P0 | S3-DATA-001, S3-SCN-001 | completed | Modern SaaS is the normalized source for migrated catalog fields; 12 styles retain exact legacy fallbacks; build and desktop/mobile Browser QA passed on 2026-07-30 |
| S3-DATA-003 | Research | 13-style dataset | Migrate remaining styles in reviewed batches | P0 | S3-DATA-002 | ready | All published records satisfy required fields; incomplete sections are marked reviewed/draft honestly |
| S3-DATA-004 | Engineering | Validation | Add unit checks for uniqueness, references, controlled values, completeness, compare limits, adapter precedence, and scenario invariants | P0 | S3-DATA-001 | completed | 53 tests cover aggregate completeness, references, duplicate ids/slugs, Compare normalization, scenario invariants, and adapter precedence; production build passed on 2026-07-30 |
| S3-ROUTE-001 | Engineering | All routes | Introduce typed route map and navigation shell | P0 | S3-ADR-002 | completed | React Router `7.18.2` owns `/` and `/styles`; typed helpers and Not Found exist; 56 tests, build, direct load, reload, back/forward, CTA navigation, and `1280x720`/`390x844` Browser QA passed on 2026-07-30 |
| S3-ROUTE-002 | Engineering | `/styles/:slug` | Add stable style detail URL and selection synchronization | P0 | S3-ROUTE-001, S3-DATA-002 | completed | `/styles/:slug` resolves catalog styles; selection pushes bookmarkable URLs; direct load, back, forward, mobile overflow, console logs, and unknown slug Not Found behavior passed Browser QA |
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
