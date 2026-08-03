# Spec 3 Domain Vocabulary

## Status

Accepted on 2026-07-29.

This file is the canonical vocabulary contract for Spec 3. TypeScript code,
normalized research records, adapters, validation, routes, Compare, Evolution,
Methodology, and the later Finder must use these terms without silently
collapsing distinct domains.

## Core Modeling Rules

1. Do not mix product type, platform, and usage context.
2. Do not use maturity as a substitute for production readiness.
3. Do not present implementation choices as universal style definitions.
4. Do not replace missing research with a neutral-looking default.
5. Descriptive dimensions such as density or visual weight are not quality
   scores.
6. Controlled values are serialized in kebab-case.

## 1. Style Classification

```ts
type StyleClassification =
  | "interface-direction"
  | "visual-aesthetic"
  | "design-language"
  | "historical-movement"
  | "interface-pattern";
```

| Value | Meaning | Examples |
| --- | --- | --- |
| `interface-direction` | A relatively complete direction for organizing an interface | Modern SaaS, Enterprise/Admin, Minimal, Editorial/Portfolio |
| `visual-aesthetic` | A visual treatment that can be layered onto more than one interface type | Glassmorphism, Neumorphism, Claymorphism, Neo-brutalism, Dark Futuristic |
| `design-language` | A structured system of principles, components, and interaction behavior | Material, Fluent |
| `historical-movement` | A historically meaningful movement or period in interface design | Skeuomorphism, Flat Design, Web 2.0, Frutiger Aero |
| `interface-pattern` | A reusable layout or composition pattern that is not a complete style | Bento Grid, Split Hero, Dashboard Card Grid, Aurora Gradient, Sidebar Workspace |

A style may have more than one classification when supported by research.

## 2. Style Maturity

```ts
type StyleMaturity =
  | "emerging"
  | "established"
  | "legacy"
  | "revived"
  | "experimental";
```

Maturity answers: “At what stage of adoption or historical development is this
style?”

- `emerging`: still forming or lacking stable conventions.
- `established`: broadly used with mature patterns.
- `legacy`: mainly historical or rarely used as a contemporary primary
  direction.
- `revived`: an older idea returning in a new context.
- `experimental`: mainly used for exploration, expression, or impact.

## 3. Production Readiness

```ts
type ProductionReadiness =
  | "production-ready"
  | "production-with-constraints"
  | "use-selectively"
  | "prototype-only"
  | "historical-reference";
```

Production readiness answers: “To what extent can this direction be used in a
real product?”

- `production-ready`: can serve as the primary product direction.
- `production-with-constraints`: viable with explicit accessibility,
  performance, or scalability controls.
- `use-selectively`: appropriate for selected components or surfaces rather
  than the full system.
- `prototype-only`: better suited to demos, concepts, or experiments.
- `historical-reference`: retained mainly for research or historical
  inspiration.

Maturity and production readiness are independent. For example, a style may be
`established` and still be `use-selectively`.

## 4. Content and Review Status

```ts
type ContentStatus =
  | "draft"
  | "under-review"
  | "published"
  | "incomplete"
  | "needs-update"
  | "archived";

type ReviewStatus =
  | "not-reviewed"
  | "research-reviewed"
  | "content-reviewed"
  | "implementation-reviewed"
  | "approved";
```

`ContentStatus` tracks editorial completeness:

- `draft`: being authored.
- `under-review`: content exists but research, sources, or consistency are
  still being checked.
- `published`: eligible for official product display.
- `incomplete`: missing one or more required sections.
- `needs-update`: previously complete but now needs re-validation.
- `archived`: retained for reference but not maintained as active content.

`ReviewStatus` tracks the strongest completed review gate. It may remain
metadata-only in the first UI release.

## 5. Evaluation Levels

```ts
type EvaluationLevel =
  | "very-strong"
  | "strong"
  | "moderate"
  | "requires-care"
  | "weak"
  | "not-applicable"
  | "not-evaluated";
```

- `not-applicable`: the criterion does not apply.
- `not-evaluated`: research or evidence is insufficient.

`moderate` must never be used as a fallback for unknown data.

## 6. Product Fit Levels

```ts
type ProductFitLevel =
  | "excellent"
  | "high"
  | "medium"
  | "low"
  | "use-selectively"
  | "not-recommended"
  | "not-evaluated";
```

Evaluation quality and product fit are separate. For example, Glassmorphism
may be `use-selectively` for a dashboard because it can work for overlays or
navigation without being suitable as the complete interface system.

## 7. Product Context

Product context is split into three domains.

### 7.1 Product Type

```ts
type ProductType =
  | "saas-product"
  | "dashboard-admin"
  | "marketing-landing"
  | "portfolio"
  | "ecommerce"
  | "documentation"
  | "content-platform"
  | "consumer-product"
  | "enterprise-system"
  | "experimental-experience";
```

`content-platform` includes publishing, news, blogs, and knowledge bases.
`consumer-product` covers consumer-facing products outside e-commerce.
`enterprise-system` covers ERP, CRM, internal tools, and large operational
systems.

### 7.2 Product Platform

```ts
type ProductPlatform =
  | "responsive-web"
  | "desktop-web"
  | "mobile-web"
  | "native-mobile"
  | "desktop-application"
  | "cross-platform";
```

“Mobile app” is a platform description, not a product type.

### 7.3 Usage Context

```ts
type UsageContext =
  | "frequent-daily-use"
  | "long-session"
  | "short-session"
  | "data-heavy"
  | "task-heavy"
  | "transactional"
  | "content-reading"
  | "brand-discovery"
  | "accessibility-critical";
```

Usage context is essential to future recommendations. A financial dashboard,
for example, may be `frequent-daily-use`, `long-session`, `data-heavy`, and
`accessibility-critical`.

## 8. Evaluation Criteria

```ts
type EvaluationCriterion =
  | "usability"
  | "accessibility"
  | "implementation-complexity"
  | "scalability"
  | "information-density"
  | "visual-expression"
  | "maintainability"
  | "performance-risk"
  | "responsive-adaptability"
  | "brand-distinctiveness";
```

The six required initial criteria are:

1. `usability`;
2. `accessibility`;
3. `implementation-complexity`;
4. `scalability`;
5. `information-density`;
6. `visual-expression`.

The remaining four criteria are deferred until the core model is applied
consistently.

## 9. Visual DNA

```ts
type VisualDNADimension =
  | "depth"
  | "decoration"
  | "density"
  | "visual-weight"
  | "motion"
  | "contrast-dependency"
  | "brand-expression"
  | "surface-complexity";

type DimensionLevel =
  | "very-low"
  | "low"
  | "medium"
  | "high"
  | "very-high";
```

Visual DNA describes a direction; it does not rank it. `very-high` is not
better than `medium`.

## 10. Style Relationships

```ts
type StyleRelationshipType =
  | "influenced-by"
  | "influenced"
  | "reacted-against"
  | "related-to"
  | "shares-principles-with"
  | "often-combined-with"
  | "revives"
  | "revived-by"
  | "evolved-alongside";
```

Directional relationships must preserve their direction. Symmetric or inverse
relationships may be derived only by explicit adapter/domain logic. A stored
edge must not imply historical causation without evidence.

## 11. Claim Types

```ts
type ClaimType =
  | "documented-fact"
  | "production-observation"
  | "historical-interpretation"
  | "project-inference"
  | "implementation-choice";
```

- `documented-fact`: directly supported by an authoritative or reliable
  historical source.
- `production-observation`: based on observing an active production
  interface.
- `historical-interpretation`: the project’s synthesis of historical change.
- `project-inference`: a conclusion inferred from multiple observations or
  sources.
- `implementation-choice`: a local demo decision such as blur, radius, or
  layout treatment.

## 12. Research Source Types

```ts
type ResearchSourceType =
  | "official-documentation"
  | "design-system-documentation"
  | "production-reference"
  | "historical-source"
  | "academic-source"
  | "industry-analysis"
  | "community-source";
```

Source priority:

1. official documentation;
2. design-system documentation;
3. production reference;
4. historical or academic source;
5. industry analysis;
6. community source.

## 13. Evidence Strength

```ts
type EvidenceStrength =
  | "primary"
  | "corroborated"
  | "observational"
  | "interpretive"
  | "insufficient";
```

Evidence strength records confidence without converting qualitative research
into a scientific-looking score.

## 14. Risk Vocabulary

```ts
type RiskType =
  | "accessibility"
  | "usability"
  | "performance"
  | "maintainability"
  | "scalability"
  | "responsive"
  | "visual-noise"
  | "brand-genericity";

type RiskSeverity =
  | "low"
  | "medium"
  | "high"
  | "critical";
```

Every risk should state the condition under which it applies.

## Explorer Era Facet

Explorer era is a research-period facet, separate from production maturity.
Because a style can span more than one period or return as a documented
revival, normalized records store an array rather than a single era value.

```ts
type StyleEra = "2000s" | "2010s" | "2020s" | "revival";
```

The initial values are project research metadata based on the Spec 2 timeline
and the migration notes. They support filtering and comparison within this
research workspace; they are not universal historical claims. A record may
contain multiple values, and `revival` is used only where the project marks a
direction as a contemporary return or reinterpretation.

## 15. Implementation Complexity

```ts
type ComplexityLevel =
  | "low"
  | "medium"
  | "high"
  | "very-high";
```

Complexity may be applied to CSS, components, rendering, responsive behavior,
motion, and maintenance. It describes cost, not quality.

## 16. Comparison Context

```ts
type ComparisonContext = ProductType | "general";
```

`general` supports characteristic comparison without a selected product.
Strong product-fit recommendations require a concrete `ProductType`.

## 17. Recommendation Results

```ts
type RecommendationLevel =
  | "very-strong-fit"
  | "strong-fit"
  | "conditional-fit"
  | "use-selectively"
  | "low-fit";
```

Every later Finder result must include reasons, trade-offs, risks, conditions,
and alternatives. A percentage alone is invalid.

## 18. Sprint 01 Vocabulary

Required now:

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

Defined in the contract but allowed to land after the first vertical slice:

- `ProductPlatform`;
- `UsageContext`;
- `EvidenceStrength`;
- `RiskType`;
- `RiskSeverity`;
- `ReviewStatus`;
- `ComparisonContext`;
- `RecommendationLevel`.

Implementation note, 2026-07-30:

- `ProductPlatform` and `UsageContext` landed with `S3-DOM-002`.
- `EvidenceStrength` and `ReviewStatus` landed with `S3-DOM-004`.
- Risk and Finder-specific vocabularies remain reserved.

`UsageContext`, `RiskType`, and `RecommendationLevel` must exist before Finder
implementation.
