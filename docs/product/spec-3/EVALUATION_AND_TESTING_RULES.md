# Spec 3 Product Evaluation and Testing Rules

## Status

Accepted on 2026-07-29.

This file is the canonical evaluation, comparison, validation, and Definition
of Done contract for Spec 3.

## 1. Core Evaluation Rules

### Context, not a global winner

The product must never rank styles as universally best. Conclusions depend on:

- product type and usage context;
- user needs;
- implementation constraints;
- accessibility requirements;
- business goals.

Valid output says “better fit for this context.” Invalid output says “best
style overall.”

### No false numerical precision

Do not display decimal ratings or percentages as scientific conclusions unless
a documented quantitative method exists. Public evaluation uses controlled
levels from the domain vocabulary. Internal Finder weights may exist later,
but must not be presented as scientific certainty.

### Evaluation requires reasoning

```ts
interface Evaluation {
  criterion: EvaluationCriterion;
  level: EvaluationLevel;
  reason: string;
  strengths: string[];
  risks: string[];
  conditions: string[];
  evidence: string[];
  claimType: ClaimType;
}
```

Published evaluations require a non-empty reason. Evidence may be absent for a
clearly labeled interpretation, but `claimType` may not be omitted.

### Missing research remains missing

- Use `not-evaluated` when evidence is insufficient.
- Use `not-applicable` when the criterion does not apply.
- Use `incomplete` when required dossier sections are missing.
- Use `under-review` when content exists but has not passed source or
  consistency review.
- Never use `moderate` as an unknown-data fallback.

## 2. Comparison Rules

- Minimum: two styles.
- Maximum: three styles.
- Remove duplicate and invalid slugs.
- Keep at most the first three valid styles.
- Normalize the URL after invalid or duplicate input is removed.
- Fewer than two styles shows an explicit selection state.
- Never display “Winner,” “Best Style,” or “Overall Score.”
- Output must use conditional language such as “Choose A when…” and “Use B
  selectively when…”.
- `general` context may describe differences but must not produce strong
  product-fit recommendations.

## 3. Same-Context Specimens

Every style in one comparison receives the same:

- business scenario;
- user goal;
- content and data;
- functionality;
- information hierarchy;
- task flow;
- semantic structure.

Styles may change:

- typography and color;
- surfaces, borders, radius, and shadow;
- spacing and visual density;
- motion;
- visual grouping and decoration;
- secondary alignment and navigation treatment.

They may not change the underlying business task to make one direction look
better. A dashboard comparison, for example, must retain the same revenue,
orders, conversion, transactions, and required actions in every specimen.

Initial canonical scenario ids:

```text
dashboard
landing
form
navigation
pricing
ecommerce-product
content-card
```

```ts
interface SharedScenario {
  id: string;
  name: string;
  userGoal: string;
  content: ScenarioContent;
  informationStructure: string[];
  requiredActions: string[];
}
```

## 4. Initial Evaluation Criteria

### Usability

Evaluate interaction clarity, hierarchy, learnability, scanning, task
completion, and long-session comfort.

### Accessibility

Evaluate contrast, readability, affordance, state distinction, motion
dependency, keyboard interaction, and background interference.

### Implementation complexity

Evaluate CSS, component, rendering, responsive, motion, and fallback
complexity. Use `ComplexityLevel`, not strong/weak quality language.

### Scalability

Evaluate the ability to support more components, workflows, screens,
breakpoints, a larger design system, and long-term maintenance.

### Information density

Evaluate support for dense data, many actions, tables, long forms, dashboards,
and scan-heavy content. High or low is descriptive, not inherently positive or
negative.

### Visual expression

Evaluate identity, atmosphere, memorability, brand distinction, and expressive
composition. Do not rename this criterion to “beauty.”

Deferred expansion criteria are maintainability, performance risk, responsive
adaptability, and brand distinctiveness.

## 5. Domain Validation Tests

Automated tests must reject:

- unsupported enum values;
- missing required fields;
- invalid content-state combinations;
- malformed evaluation and product-fit records;
- malformed relationship records;
- broken claim/source references;
- duplicate ids or slugs;
- unknown relationship targets;
- missing required contexts;
- invalid evaluation levels.

Required invariants include:

- a published style cannot omit its required overview;
- a published evaluation cannot have an empty reason;
- a relationship cannot reference an unknown style;
- an incomplete evaluation cannot silently become `moderate`;
- published research must include definition, classification, principles,
  Visual DNA, six core evaluations, product fit, and either sources or an
  explicit interpretation declaration.

Draft, incomplete, and under-review records may omit fields only when the
missing state is represented honestly.

## 6. Adapter Tests

The transition boundary is:

```text
Normalized ResearchStyle
        ↓
compatibility adapter
        ↓
Legacy DesignStyle
```

Tests must verify:

- id and slug stability;
- correct name and summary mapping;
- token preservation;
- correct preview/renderer association;
- correct classification mapping;
- safe optional-value fallbacks;
- no invented research conclusions;
- legacy data cannot overwrite normalized facts;
- every legacy renderer receives a valid legacy contract.

Fixtures must include at least Modern SaaS, Glassmorphism, and Flat Design
because they represent different classification and implementation shapes.

## 7. URL and Routing Tests

### `/styles/:slug`

Verify valid slugs, Not Found for invalid slugs, reload, back/forward, direct
deep links, and catalog navigation updating the URL.

### `/compare`

Canonical shape:

```text
/compare?styles=modern-saas,minimal-clean&context=dashboard-admin
```

Verify parsing, deduplication, invalid-slug removal, the three-style limit,
invalid-context fallback, selector-to-URL synchronization, reload,
back/forward restoration, and shareability.

### Static routes

`/evolution` and `/methodology` must support direct access and reload.

## 8. Compare Integration Tests

Verify:

- explicit empty state below two styles;
- comparison at two styles;
- adding a third style;
- defined behavior for a fourth style;
- context changes update the output;
- every renderer receives the same shared scenario;
- no global winner appears;
- missing evaluation displays `not-evaluated`;
- decision summaries change with context;
- invalid input does not crash the page.

## 9. Build Verification

The intended verification ladder is:

```text
typecheck
lint
domain unit tests
adapter tests
routing/integration tests
production build
```

Until individual scripts exist, no document or agent may claim they pass.
Production verification must catch TypeScript errors, broken imports, duplicate
slugs, invalid normalized records, missing routes, and severe circular
dependencies. Deployment proof may be added when a Vercel pipeline exists.

## 10. Browser QA

### Desktop viewports

```text
1440 × 900
1280 × 800
1024 × 768
```

### Mobile viewports

```text
390 × 844
375 × 812
360 × 800
```

Relevant flows include landing navigation, Explorer, dossier navigation, add
to Compare, Compare selection, context changes, same-context previews,
Evolution, Methodology, invalid routes, back/forward, and direct reload.

Desktop checks include sticky behavior, focus, long content, overflow,
horizontal scrolling, and three-style comparison.

Mobile checks include usable navigation and filters, one-column dossier
reading, non-table Compare layouts, context switching, deliberate preview
overflow only, adequate targets, heading hierarchy, and layout stability.

## 11. Accessibility QA

Check:

- keyboard navigation and sensible tab order;
- visible focus;
- semantic heading order;
- text contrast;
- control labels;
- screen-reader-friendly statuses;
- reduced motion;
- levels represented by more than color;
- interactive specimens do not trap focus.

## 12. Performance QA

Check that:

- routes do not render every unused specimen;
- offscreen previews can lazy-load;
- hidden animation stops or reduces;
- blur/compositing does not create obvious mobile lag;
- style switching avoids unnecessary full-page work;
- image assets are optimized.

Sprint 01 does not require a complex benchmark, but obvious regressions are not
acceptable.

## 13. Validation Layers

1. Domain unit tests.
2. Adapter tests.
3. Routing and integration tests.
4. Build verification.
5. Browser QA.

## 14. Definition of Done

A Spec 3 task is done only when:

- acceptance criteria are met;
- domain rules remain valid;
- typecheck and relevant tests pass;
- production build passes for runtime changes;
- desktop QA is complete;
- mobile QA is complete for UI changes;
- URL behavior is verified for routing changes;
- durable task state is updated;
- missing content is labeled rather than invented.

## 15. Confirmed Product Rules

1. There is no globally best style.
2. No false scientific-looking decimal score is published.
3. Every evaluation includes reasoning and trade-offs.
4. Missing research is represented explicitly.
5. Compare supports two or three styles.
6. Same-context specimens use the same business problem.
7. Content or goals cannot change to flatter one visual direction.
8. The first model uses the six accepted core criteria.
9. Normalized data becomes the source of truth through incremental migration.
10. Tests cover domain, adapter, URL, integration, build, and browser behavior.
11. `moderate` is not a fallback for unknown data.
12. A demo implementation choice is not an official style definition.

