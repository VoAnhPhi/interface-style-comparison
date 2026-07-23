# Spec 3 Baseline Audit

Audit date: 2026-07-23

## Executive Status

The current product is a strong visual Foundation, not yet the normalized
research platform described by Spec 3.

| Area | Current state | Spec 3 gap |
| --- | --- | --- |
| Landing | Implemented at `/` with research framing, featured directions, lenses, comparison teaser, and timeline | CTAs and teasers are not connected to dedicated Compare or Evolution routes |
| Explorer | Implemented at `/styles` with search, tag filtering, selection, and a three-column workspace | Selection is local state; classification, era, density, maturity, and slug routing are missing |
| Dossier | 13 style-specific renderers and shared Overview, Tokens, Patterns, Examples sections | No stable `/styles/:slug`; no normalized Visual DNA, evaluation, product-fit reasoning, relationships, or sources |
| Decision guide | Surface fit and recommendation summaries exist | Uses legacy fit values without conditions, evidence, or context-aware reasoning |
| Comparison | Legacy comparison surface exists but is hidden; landing contains a static teaser | No compare domain, 2-3 selection rule, URL state, shared scenario, context interpretation, or decision summary |
| Evolution | Landing teaser uses a visual timeline | No evolution entities, transition causes, relationship graph, sources, or route |
| Methodology | Research ideas appear in dossier copy and docs | No methodology route or public explanation of evidence and interpretation rules |
| Finder | Not implemented | Correctly deferred until the domain and evaluation foundation exist |
| Report | `SPEC3.md` describes a future research backend/report flow | No normalized report pipeline or `/report`; not core interaction |

## Foundation Completion

The active Foundation story is `US-003`.

- P1.1-P1.8: completed.
- P1.9 Flat Design: implementation and mobile QA exist; asset manifest
  reconciliation remains open.
- P1.10-P1.13: completed.
- P1.14 final sweep: planned.

Spec 3 should not silently mark US-003 complete. It depends on explicit closure
of P1.9 and P1.14.

## Current Engineering Shape

### Routing

- `App.tsx` maps only `/` and `/styles`.
- Routing uses `window.location.pathname`, `pushState`, and `popstate`.
- No dynamic route params or query-state parser exists.

### State

Current local application state includes:

- selected style;
- search query;
- active tag;
- display mode.

The selected style, filter state, dossier tab, and comparison intent are not
shareable through the URL.

### Data

`src/data/designStyles.ts` contains 13 large `DesignStyle` records.

It already provides valuable Foundation content:

- identity and summary;
- feelings and characteristics;
- token recipes and visual rules;
- patterns and examples;
- strengths, weaknesses, and accessibility risks;
- basic suitability values.

It does not yet model Spec 3 concepts:

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
- canonical same-context specimens.

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
