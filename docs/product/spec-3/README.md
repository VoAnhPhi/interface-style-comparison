# Spec 3 Research Platform Initiative

## Status

Planning complete. Sprint 01 and the reviewed 13-style data migration are
implemented; normalized dossier and decision-support UI remain future work.

## Source

- `SPEC.md` and `SPEC2.md`: Foundation research and visual implementation.
- `SPEC3.md`: next product chapter and primary source for this initiative.
- Intake: `#14`, type `new_initiative`, lane `normal`.
- Foundation story: `US-003`.
- Spec 3 foundation story: `US-004`.

## Product Outcome

Evolve Interface Style Research from a visual research workspace into a
structured research, contextual comparison, evolution, and decision-support
system.

The product should answer:

1. What interface directions exist?
2. What defines each direction?
3. How do directions differ under the same product context?
4. Why did they evolve?
5. Which direction is a better fit for a specific product and constraint set?

## Incremental Development Rule

Spec 1 and Spec 2 are the current Foundation. Spec 3 extends that Foundation.

- Preserve the existing landing, catalog, dossier renderers, local assets, and
  accepted responsive behavior.
- Introduce normalized research and business models beside the legacy
  `DesignStyle` model.
- Migrate one style at a time through an adapter.
- Move routes to shared domain data only after the relevant data slice is
  validated.
- Do not rewrite all dossier renderers or all style data in one pass.

## Current Phase

```text
Spec 1 + Spec 2 Foundation
  US-003 complete
  P1.9 closed with a documented raster waiver
  P1.14 final browser sweep complete

Spec 3
  planning harness complete
  Sprint 01 foundation complete
  S3-DATA-003 reviewed migration complete
  S3-EXP-002 complete
  next task: normalized dossier rendering (`S3-DOS-001`)
```

## Documents

- [Current state](./CURRENT_STATE.md)
- [Roadmap](./ROADMAP.md)
- [Task ledger](./TASKS.md)
- [Sprint 01](./SPRINT-01.md)
- [Domain vocabulary](./DOMAIN_VOCABULARY.md)
- [Evaluation and testing rules](./EVALUATION_AND_TESTING_RULES.md)
- [Detailed implementation plan](./IMPLEMENTATION_PLAN.md)
- [Product contract](../spec-3-research-platform.md)
- [Active story](../../stories/US-004-spec-3-research-platform-foundation.md)

## Accepted Architecture

- Normalized Spec 3 records become the source of truth incrementally.
- A compatibility adapter keeps existing `DesignStyle` consumers and dossier
  renderers working during migration.
- Modern SaaS is the first complete normalized record; the other twelve styles
  now have explicit incomplete normalized migration records.
- React Router owns paths and shareable query state.
- See ADR 0008 and ADR 0009 under `docs/decisions/`.

## Definition of Ready for Feature Implementation

Feature code may begin only when:

- US-003 closure tasks have an explicit disposition;
- taxonomy, product context, evaluation, source, and relationship vocabularies
  are accepted;
- the incremental adapter strategy is accepted;
- URL ownership and routing direction are recorded;
- Sprint 01 acceptance criteria and proof commands are agreed.

## Scope Boundary

### Spec 3 core

- Structured research domain.
- Taxonomy and evidence.
- Product contexts and evaluation logic.
- Shareable routing.
- Explorer, slug dossier, Compare, Evolution, and Methodology.
- Canonical same-context specimens.

### Spec 3 later phase

- Finder recommendation engine and UI.
- Full report route.

### Future

- Analytics.
- Backend persistence.
- Authentication and collaborative research editing.
- User-generated research.
- Quantitative claims presented as scientific scoring.
