# Spec 3 Research Platform Contract

## Product Position

Interface Style Research is an interactive research and decision-support
platform. It turns visual inspiration into structured knowledge, contextual
comparison, and explainable design-direction guidance.

## Core Principle

There is no universally best interface style. There is only a better fit for a
product, user, context, and constraint set.

The product must not publish a universal ranking or winner.

## Product Flows

### Core

```text
Landing -> Explore -> Dossier -> Compare -> Decision
Landing -> Evolution -> Dossier
```

### Later

```text
Landing -> Finder -> Recommendation -> Compare -> Dossier
```

## Research Contract

Every published style record must distinguish:

1. Style principle: what defines the direction.
2. Demo implementation: how this repository illustrates it.
3. Research interpretation: what the project concludes from evidence and
   comparison.

Critical claims must link to evidence or be labeled as interpretation.

## Domain Contract

The canonical controlled values and their meanings live in
`docs/product/spec-3/DOMAIN_VOCABULARY.md`.

Core entities:

- ResearchStyle.
- StyleClassification.
- StyleMaturity and ProductionReadiness.
- ProductType, ProductPlatform, and UsageContext.
- EvaluationCriterion and Evaluation.
- ProductFit.
- StylePattern.
- UISpecimen and SharedScenario.
- EvolutionEvent.
- StyleRelationship.
- ResearchSource.

RecommendationRule is a later-phase entity. Normalized `ResearchStyle` records
become the source of truth one style at a time; the legacy `DesignStyle` shape
remains an adapter output during migration.

## Evaluation Contract

Core criteria:

- Usability.
- Accessibility.
- Implementation complexity.
- Scalability.
- Information density.
- Visual expression.

Initial controlled levels:

- very strong;
- strong;
- moderate;
- requires care;
- weak.
- not applicable;
- not evaluated.

An evaluation includes reasoning, strengths, risks, conditions, and evidence.
It is not just a score.

## Product Fit Contract

Product type is separate from platform and usage context. Initial product
types:

- SaaS product;
- Dashboard/Admin;
- Marketing/Landing;
- Portfolio;
- E-commerce;
- Documentation;
- Experimental experience.

Mobile web, native mobile, and desktop application are platforms rather than
product types.

Each fit includes a level, reason, strengths, risks, and optional conditions.

## Comparison Contract

- Minimum 2 styles.
- Recommended maximum 3 styles.
- URL encodes styles and selected context.
- Same-context specimens preserve content, structure, functionality, and user
  goal.
- The output explains trade-offs and conditions.
- The output never declares a universal winner.

## Evolution Contract

Evolution explains what changed, why it changed, and what influenced the
change. It models cause, reaction, influence, relation, combination, and
revival rather than a simple parent-child timeline.

## Methodology Contract

The public methodology explains:

- research workflow;
- source standards;
- evaluation definitions;
- interpretation rules;
- limitations;
- review versioning.

## Non-Functional Contract

- Major state is shareable by URL.
- Keyboard navigation and semantic structure are required.
- Reduced motion and sufficient contrast are required.
- Charts and comparison signals need accessible labels.
- Missing research is shown as missing or under review, never invented.
- One business fact has one source of truth.

The canonical evaluation and Definition of Done rules live in
`docs/product/spec-3/EVALUATION_AND_TESTING_RULES.md`.

## Accepted Technical Direction

- Normalized research data becomes source of truth through incremental
  migration.
- Migrated records use normalized-first precedence.
- A compatibility adapter preserves current `DesignStyle` consumers.
- React Router owns paths and shareable query state.
- Accepted routes are `/`, `/styles`, `/styles/:slug`, `/compare`,
  `/evolution`, `/methodology`, and Not Found.

## Deferred Contract

Finder, report publication, analytics, persistence, authentication, and
collaborative research editing are not part of the first Spec 3 implementation
sprint.
