export const STYLE_CLASSIFICATIONS = [
  "interface-direction",
  "visual-aesthetic",
  "design-language",
  "historical-movement",
  "interface-pattern",
] as const;

export type StyleClassification = (typeof STYLE_CLASSIFICATIONS)[number];

export const STYLE_MATURITIES = [
  "emerging",
  "established",
  "legacy",
  "revived",
  "experimental",
] as const;

export type StyleMaturity = (typeof STYLE_MATURITIES)[number];

export const PRODUCTION_READINESS_LEVELS = [
  "production-ready",
  "production-with-constraints",
  "use-selectively",
  "prototype-only",
  "historical-reference",
] as const;

export type ProductionReadiness =
  (typeof PRODUCTION_READINESS_LEVELS)[number];

export const CONTENT_STATUSES = [
  "draft",
  "under-review",
  "published",
  "incomplete",
  "needs-update",
  "archived",
] as const;

export type ContentStatus = (typeof CONTENT_STATUSES)[number];

export const EVALUATION_CRITERIA = [
  "usability",
  "accessibility",
  "implementation-complexity",
  "scalability",
  "information-density",
  "visual-expression",
  "maintainability",
  "performance-risk",
  "responsive-adaptability",
  "brand-distinctiveness",
] as const;

export type EvaluationCriterion = (typeof EVALUATION_CRITERIA)[number];

export const CORE_EVALUATION_CRITERIA = [
  "usability",
  "accessibility",
  "implementation-complexity",
  "scalability",
  "information-density",
  "visual-expression",
] as const satisfies readonly EvaluationCriterion[];

export type CoreEvaluationCriterion =
  (typeof CORE_EVALUATION_CRITERIA)[number];

export const EVALUATION_LEVELS = [
  "very-strong",
  "strong",
  "moderate",
  "requires-care",
  "weak",
  "not-applicable",
  "not-evaluated",
] as const;

export type EvaluationLevel = (typeof EVALUATION_LEVELS)[number];

export const PRODUCT_FIT_LEVELS = [
  "excellent",
  "high",
  "medium",
  "low",
  "use-selectively",
  "not-recommended",
  "not-evaluated",
] as const;

export type ProductFitLevel = (typeof PRODUCT_FIT_LEVELS)[number];

export const PRODUCT_TYPES = [
  "saas-product",
  "dashboard-admin",
  "marketing-landing",
  "portfolio",
  "ecommerce",
  "documentation",
  "content-platform",
  "consumer-product",
  "enterprise-system",
  "experimental-experience",
] as const;

export type ProductType = (typeof PRODUCT_TYPES)[number];

export const VISUAL_DNA_DIMENSIONS = [
  "depth",
  "decoration",
  "density",
  "visual-weight",
  "motion",
  "contrast-dependency",
  "brand-expression",
  "surface-complexity",
] as const;

export type VisualDNADimension = (typeof VISUAL_DNA_DIMENSIONS)[number];

export const DIMENSION_LEVELS = [
  "very-low",
  "low",
  "medium",
  "high",
  "very-high",
] as const;

export type DimensionLevel = (typeof DIMENSION_LEVELS)[number];

export const STYLE_RELATIONSHIP_TYPES = [
  "influenced-by",
  "influenced",
  "reacted-against",
  "related-to",
  "shares-principles-with",
  "often-combined-with",
  "revives",
  "revived-by",
  "evolved-alongside",
] as const;

export type StyleRelationshipType =
  (typeof STYLE_RELATIONSHIP_TYPES)[number];

export const CLAIM_TYPES = [
  "documented-fact",
  "production-observation",
  "historical-interpretation",
  "project-inference",
  "implementation-choice",
] as const;

export type ClaimType = (typeof CLAIM_TYPES)[number];

export const RESEARCH_SOURCE_TYPES = [
  "official-documentation",
  "design-system-documentation",
  "production-reference",
  "historical-source",
  "academic-source",
  "industry-analysis",
  "community-source",
] as const;

export type ResearchSourceType = (typeof RESEARCH_SOURCE_TYPES)[number];

export const COMPLEXITY_LEVELS = [
  "low",
  "medium",
  "high",
  "very-high",
] as const;

export type ComplexityLevel = (typeof COMPLEXITY_LEVELS)[number];

export const SPEC3_VOCABULARIES = {
  styleClassification: STYLE_CLASSIFICATIONS,
  styleMaturity: STYLE_MATURITIES,
  productionReadiness: PRODUCTION_READINESS_LEVELS,
  contentStatus: CONTENT_STATUSES,
  evaluationCriterion: EVALUATION_CRITERIA,
  evaluationLevel: EVALUATION_LEVELS,
  productFitLevel: PRODUCT_FIT_LEVELS,
  productType: PRODUCT_TYPES,
  visualDnaDimension: VISUAL_DNA_DIMENSIONS,
  dimensionLevel: DIMENSION_LEVELS,
  styleRelationshipType: STYLE_RELATIONSHIP_TYPES,
  claimType: CLAIM_TYPES,
  researchSourceType: RESEARCH_SOURCE_TYPES,
  complexityLevel: COMPLEXITY_LEVELS,
} as const;

export type VocabularyName = keyof typeof SPEC3_VOCABULARIES;

export type VocabularyValue<Name extends VocabularyName> =
  (typeof SPEC3_VOCABULARIES)[Name][number];

export function isVocabularyValue<Name extends VocabularyName>(
  vocabulary: Name,
  value: unknown,
): value is VocabularyValue<Name> {
  if (typeof value !== "string") {
    return false;
  }

  return (SPEC3_VOCABULARIES[vocabulary] as readonly string[]).includes(value);
}

export class VocabularyValidationError extends Error {
  readonly code = "invalid-vocabulary-value";

  constructor(
    readonly vocabulary: VocabularyName,
    readonly received: unknown,
  ) {
    super(
      `Invalid ${vocabulary} value: ${String(received)}. Expected one of: ` +
        SPEC3_VOCABULARIES[vocabulary].join(", "),
    );
    this.name = "VocabularyValidationError";
  }
}

export function assertVocabularyValue<Name extends VocabularyName>(
  vocabulary: Name,
  value: unknown,
): asserts value is VocabularyValue<Name> {
  if (!isVocabularyValue(vocabulary, value)) {
    throw new VocabularyValidationError(vocabulary, value);
  }
}
