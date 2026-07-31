# Spec 3 Baseline Audit

Audit date: 2026-07-23
Implementation update: 2026-07-30

## Executive Status

The visual Foundation and Sprint 01 domain/migration foundation are complete.
Modern SaaS is the first normalized runtime record; the remaining twelve
styles continue through explicit legacy fallback.

| Area | Current state | Spec 3 gap |
| --- | --- | --- |
| Landing | Implemented at `/` with research framing, featured directions, lenses, comparison teaser, and timeline | CTAs and teasers are not connected to dedicated Compare or Evolution routes |
| Explorer | Implemented at `/styles` with search, tag filtering, URL-backed selection, and a three-column workspace | Classification, era, density, and maturity filters are still missing |
| Dossier | 13 style-specific renderers and shared Overview, Tokens, Patterns, Examples sections; Modern SaaS now has a normalized research source; `/styles/:slug` resolves known catalog styles | Normalized Spec 3 sections are not rendered publicly yet |
| Decision guide | Surface fit and recommendation summaries exist | Uses legacy fit values without conditions, evidence, or context-aware reasoning |
| Comparison | Legacy comparison surface exists but is hidden; landing contains a static teaser | No compare domain, 2-3 selection rule, URL state, shared scenario, context interpretation, or decision summary |
| Evolution | Landing teaser uses a visual timeline | No evolution entities, transition causes, relationship graph, sources, or route |
| Methodology | Research ideas appear in dossier copy and docs | No methodology route or public explanation of evidence and interpretation rules |
| Finder | Not implemented | Correctly deferred until the domain and evaluation foundation exist |
| Report | `SPEC3.md` describes a future research backend/report flow | No normalized report pipeline or `/report`; not core interaction |

## Foundation Completion

The active Foundation story is `US-003`.

- P1.1-P1.8: completed.
- P1.9 Flat Design: completed with a user-accepted documented waiver for its
  historical planned raster asset; the code-native B2 scene is the final
  dossier evidence.
- P1.10-P1.13: completed.
- P1.14 final sweep: completed on 2026-07-29. Build plus desktop `1280x720`
  and mobile `390x844` Browser QA passed for all 13 style selection and
  `Examples` flows, with no broken images, overflow, or console warnings/errors.

US-003 has current Foundation evidence and is complete.

## Current Engineering Shape

### Routing

- React Router owns the client-side route shell.
- `src/routing/routes.ts` provides typed constants for `/` and `/styles`.
- `/` and `/styles` preserve their accepted behavior and unknown paths render
  an explicit Not Found recovery page.
- Direct access, reload, landing-to-Explorer navigation, back/forward, and
  desktop/mobile behavior passed Browser QA on 2026-07-30.
- Dynamic style params and Compare query-state parsing remain for later tasks.

### State

Current local application state includes:

- selected style;
- search query;
- active tag;
- display mode.

The selected style, filter state, dossier tab, and comparison intent are not
shareable through the URL.

### Data

`src/data/designStyles.ts` retains 13 legacy `DesignStyle` records as
compatibility fallbacks. The runtime catalog adapts the normalized Modern SaaS
record first and leaves the other twelve exact legacy objects unchanged.

It already provides valuable Foundation content:

- identity and summary;
- feelings and characteristics;
- token recipes and visual rules;
- patterns and examples;
- strengths, weaknesses, and accessibility risks;
- basic suitability values.

The new `src/domain/research/` layer now models:

- aliases and stable slug contract;
- taxonomy as interface direction, aesthetic, design language, or historical
  movement;
- controlled Visual DNA dimensions;
- controlled evaluation levels with reasoning, conditions, and evidence;
- product-fit reasoning and conditions;
- sources and claim traceability;
- style relationships;
- evolution references;
- research version and content status;
- canonical same-context specimens;
- aggregate dataset and compatibility-adapter validation.

The remaining data gap is migrating the other twelve style records and moving
normalized research sections into public dossier UI.

### UI architecture

- Shared catalog and dossier shells are data-driven.
- Style-specific renderers preserve approved visual scenes.
- Some research facts live in data while other facts live inside renderer
  markup.
- The current `activeMode="compare"` is a display mode, not a comparison
  engine.

## What Must Be Preserved

- Accepted landing composition and responsive behavior.
- Existing `/styles` workspace until replacement routes reach parity.
- All 13 local image assets and manifest provenance.
- Font Awesome icon usage.
- Style-specific dossier renderers.
- Search behavior during the transition.
- Keyboard and mobile behavior already validated by US-003.

## Refactor Targets

Refactor incrementally:

1. Extract controlled vocabularies and pure domain types.
2. Add normalized records beside `DesignStyle`.
3. Create a compatibility adapter for existing components.
4. Migrate one representative style.
5. Validate domain rules.
6. Migrate remaining styles.
7. Connect routes to the normalized source.

Do not begin by splitting every file or rewriting every renderer.

## Implementation Readiness

Approved on 2026-07-29:

- normalized data becomes source of truth incrementally;
- Modern SaaS is the first normalized vertical slice;
- a normalized-first compatibility adapter preserves legacy
  `DesignStyle` consumers;
- React Router owns routes and shareable URL state;
- the canonical vocabulary is
  `docs/product/spec-3/DOMAIN_VOCABULARY.md`;
- the canonical proof contract is
  `docs/product/spec-3/EVALUATION_AND_TESTING_RULES.md`;
- the dependency-ordered work plan is
  `docs/product/spec-3/IMPLEMENTATION_PLAN.md`.

ADR 0008 and ADR 0009 are accepted. Sprint 01 and US-004 are complete.
`S3-ROUTE-001` and `S3-ROUTE-002` are complete through US-005. The recommended
next task is `S3-DATA-003`; remaining style records can then migrate in reviewed
batches before the full dossier and Compare work.
