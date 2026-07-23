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

Core entities:

- DesignStyle.
- StyleClassification.
- ProductContext.
- EvaluationCriterion and Evaluation.
- ProductFit.
- StylePattern.
- UISpecimen and SharedScenario.
- EvolutionEvent.
- StyleRelationship.
- ResearchSource.

RecommendationRule is a later-phase entity.

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

An evaluation includes reasoning, strengths, risks, conditions, and evidence.
It is not just a score.

## Product Fit Contract

Initial contexts:

- SaaS product;
- Dashboard/Admin;
- Marketing/Landing;
- Portfolio;
- E-commerce;
- Documentation;
- Mobile application;
- Experimental experience.

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

## Deferred Contract

Finder, report publication, analytics, persistence, authentication, and
collaborative research editing are not part of the first Spec 3 implementation
sprint.

