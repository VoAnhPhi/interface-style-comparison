import {
  type DimensionLevel,
  type ProductionReadiness,
  type StyleClassification,
  type StyleMaturity,
  type VisualDNADimension,
  PRODUCT_TYPES,
  VISUAL_DNA_DIMENSIONS,
  isVocabularyValue,
} from "./vocabulary";
import {
  type CoreEvaluationSet,
  type ProductFit,
  validateCoreEvaluationSet,
  validateProductFit,
} from "./evaluation";
import {
  type ResearchClaim,
  type ResearchSource,
  type ReviewMetadata,
  validateEvidenceBundle,
  validateReviewMetadata,
} from "./evidence";
import {
  type EvolutionReference,
  type StyleRelationship,
  validateEvolutionReferences,
  validateStyleRelationships,
} from "./relationships";
import {
  CANONICAL_SCENARIOS,
  type ScenarioId,
} from "./scenarios";
import {
  type DomainValidationIssue,
  isIsoDate,
  isNonEmptyString,
  isRecord,
  isStringArray,
} from "./validation";

export type ResearchStatement = {
  id: string;
  text: string;
  claimId: string;
};

export type VisualDNASignal = {
  dimension: VisualDNADimension;
  level: DimensionLevel;
  reason: string;
  claimId: string;
};

export type VisualDNA = {
  [Dimension in VisualDNADimension]: VisualDNASignal & {
    dimension: Dimension;
  };
};

export type LegacyRendererClassification =
  | "production-safe"
  | "expressive"
  | "experimental"
  | "historical-reference"
  | "system-language";

export type LegacyRendererMapping = {
  rendererId: string;
  classification: LegacyRendererClassification;
};

export type ResearchVersion = {
  schemaVersion: string;
  contentVersion: string;
  updatedAt: string;
};

export type ResearchStyle = {
  id: string;
  slug: string;
  name: string;
  aliases: readonly string[];
  summary: string;
  classifications: readonly StyleClassification[];
  maturity: StyleMaturity;
  productionReadiness: ProductionReadiness;
  review: ReviewMetadata;
  definition: ResearchStatement;
  principles: readonly ResearchStatement[];
  distinguishingSignals: readonly ResearchStatement[];
  visualDNA: VisualDNA;
  evaluations: CoreEvaluationSet;
  productFit: readonly ProductFit[];
  sources: readonly ResearchSource[];
  claims: readonly ResearchClaim[];
  relationships: readonly StyleRelationship[];
  evolution: readonly EvolutionReference[];
  scenarioIds: readonly ScenarioId[];
  version: ResearchVersion;
  legacyRenderer: LegacyRendererMapping;
};

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const CANONICAL_SCENARIO_IDS = new Set<string>(
  CANONICAL_SCENARIOS.map(({ id }) => id),
);

function validateStatement(
  value: unknown,
  knownClaimIds: ReadonlySet<string>,
  path: string,
): DomainValidationIssue[] {
  if (!isRecord(value)) {
    return [{
      code: "invalid-value",
      path,
      message: "Research statement must be an object.",
    }];
  }

  const issues: DomainValidationIssue[] = [];

  for (const field of ["id", "text", "claimId"] as const) {
    if (!isNonEmptyString(value[field])) {
      issues.push({
        code: "missing-required-field",
        path: `${path}.${field}`,
        message: `${field} is required.`,
      });
    }
  }

  if (
    isNonEmptyString(value.claimId)
    && !knownClaimIds.has(value.claimId)
  ) {
    issues.push({
      code: "invalid-reference",
      path: `${path}.claimId`,
      message: `Unknown research claim: ${value.claimId}.`,
    });
  }

  return issues;
}

export function validateResearchStyle(
  value: ResearchStyle,
  knownStyleIds: ReadonlySet<string> = new Set([value.id]),
  path = "style",
): DomainValidationIssue[] {
  const issues: DomainValidationIssue[] = [];

  for (const field of ["id", "slug", "name", "summary"] as const) {
    if (!isNonEmptyString(value[field])) {
      issues.push({
        code: "missing-required-field",
        path: `${path}.${field}`,
        message: `${field} is required.`,
      });
    }
  }

  if (!SLUG_PATTERN.test(value.slug)) {
    issues.push({
      code: "invalid-value",
      path: `${path}.slug`,
      message: "Style slug must be lowercase kebab-case.",
    });
  }

  if (!isStringArray(value.aliases)) {
    issues.push({
      code: "invalid-value",
      path: `${path}.aliases`,
      message: "aliases must be an array of non-empty strings.",
    });
  }

  if (value.classifications.length === 0) {
    issues.push({
      code: "missing-required-field",
      path: `${path}.classifications`,
      message: "At least one style classification is required.",
    });
  } else {
    value.classifications.forEach((classification, index) => {
      if (!isVocabularyValue("styleClassification", classification)) {
        issues.push({
          code: "invalid-value",
          path: `${path}.classifications[${index}]`,
          message: "Unsupported style classification.",
        });
      }
    });
  }

  for (const [field, vocabulary] of [
    ["maturity", "styleMaturity"],
    ["productionReadiness", "productionReadiness"],
  ] as const) {
    if (!isVocabularyValue(vocabulary, value[field])) {
      issues.push({
        code: "invalid-value",
        path: `${path}.${field}`,
        message: `Unsupported ${field}.`,
      });
    }
  }

  issues.push(
    ...validateReviewMetadata(value.review, `${path}.review`),
    ...validateEvidenceBundle(
      { sources: value.sources, claims: value.claims },
      `${path}.evidence`,
    ),
    ...validateCoreEvaluationSet(value.evaluations, `${path}.evaluations`),
  );

  const claimIds = new Set(value.claims.map(({ id }) => id));

  issues.push(...validateStatement(
    value.definition,
    claimIds,
    `${path}.definition`,
  ));

  for (
    const [field, statements] of [
      ["principles", value.principles],
      ["distinguishingSignals", value.distinguishingSignals],
    ] as const
  ) {
    if (statements.length === 0) {
      issues.push({
        code: "missing-required-field",
        path: `${path}.${field}`,
        message: `${field} requires at least one statement.`,
      });
    }

    statements.forEach((statement, index) => {
      issues.push(...validateStatement(
        statement,
        claimIds,
        `${path}.${field}[${index}]`,
      ));
    });
  }

  VISUAL_DNA_DIMENSIONS.forEach((dimension) => {
    const signal = value.visualDNA[dimension];
    const signalPath = `${path}.visualDNA.${dimension}`;

    if (!isRecord(signal)) {
      issues.push({
        code: "missing-visual-dimension",
        path: signalPath,
        message: `Missing Visual DNA dimension: ${dimension}.`,
      });
      return;
    }

    if (signal.dimension !== dimension) {
      issues.push({
        code: "invalid-value",
        path: `${signalPath}.dimension`,
        message: `Expected Visual DNA dimension ${dimension}.`,
      });
    }

    if (!isVocabularyValue("dimensionLevel", signal.level)) {
      issues.push({
        code: "invalid-level",
        path: `${signalPath}.level`,
        message: "Unsupported Visual DNA level.",
      });
    }

    if (!isNonEmptyString(signal.reason)) {
      issues.push({
        code: "missing-required-field",
        path: `${signalPath}.reason`,
        message: "Visual DNA reason is required.",
      });
    }

    if (!isNonEmptyString(signal.claimId) || !claimIds.has(signal.claimId)) {
      issues.push({
        code: "invalid-reference",
        path: `${signalPath}.claimId`,
        message: `Unknown research claim: ${String(signal.claimId)}.`,
      });
    }
  });

  const productTypes = new Set<string>();
  value.productFit.forEach((fit, index) => {
    issues.push(...validateProductFit(fit, `${path}.productFit[${index}]`));

    if (productTypes.has(fit.productType)) {
      issues.push({
        code: "duplicate-id",
        path: `${path}.productFit[${index}].productType`,
        message: `Duplicate product fit: ${fit.productType}.`,
      });
    }
    productTypes.add(fit.productType);
  });

  PRODUCT_TYPES.forEach((productType) => {
    if (!productTypes.has(productType)) {
      issues.push({
        code: "missing-product-type",
        path: `${path}.productFit`,
        message: `Missing product fit: ${productType}.`,
      });
    }
  });

  const sourceIds = new Set(value.sources.map(({ id }) => id));
  const evolutionIds = new Set(value.evolution.map(({ id }) => id));
  issues.push(
    ...validateEvolutionReferences(
      value.evolution,
      knownStyleIds,
      sourceIds,
      `${path}.evolution`,
    ),
    ...validateStyleRelationships(
      value.relationships,
      knownStyleIds,
      sourceIds,
      evolutionIds,
      `${path}.relationships`,
    ),
  );

  if (value.scenarioIds.length === 0) {
    issues.push({
      code: "missing-required-field",
      path: `${path}.scenarioIds`,
      message: "At least one canonical scenario reference is required.",
    });
  }

  value.scenarioIds.forEach((scenarioId, index) => {
    if (!CANONICAL_SCENARIO_IDS.has(scenarioId)) {
      issues.push({
        code: "invalid-reference",
        path: `${path}.scenarioIds[${index}]`,
        message: `Unknown canonical scenario: ${scenarioId}.`,
      });
    }
  });

  for (const field of ["schemaVersion", "contentVersion"] as const) {
    if (!isNonEmptyString(value.version[field])) {
      issues.push({
        code: "missing-required-field",
        path: `${path}.version.${field}`,
        message: `${field} is required.`,
      });
    }
  }

  if (!isIsoDate(value.version.updatedAt)) {
    issues.push({
      code: "invalid-date",
      path: `${path}.version.updatedAt`,
      message: "updatedAt must use YYYY-MM-DD.",
    });
  }

  if (!isNonEmptyString(value.legacyRenderer.rendererId)) {
    issues.push({
      code: "missing-required-field",
      path: `${path}.legacyRenderer.rendererId`,
      message: "Legacy renderer id is required during migration.",
    });
  }

  return issues;
}
