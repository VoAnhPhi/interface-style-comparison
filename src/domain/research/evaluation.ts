import {
  type ClaimType,
  type ComplexityLevel,
  type CoreEvaluationCriterion,
  type EvaluationCriterion,
  type EvaluationLevel,
  type ProductFitLevel,
  type ProductType,
  CORE_EVALUATION_CRITERIA,
  isVocabularyValue,
} from "./vocabulary";
import {
  type DomainValidationIssue,
  findForbiddenFields,
  isNonEmptyString,
  isRecord,
  isStringArray,
} from "./validation";

export type EvaluationDetail = {
  reason: string;
  strengths: readonly string[];
  risks: readonly string[];
  conditions: readonly string[];
  evidence: readonly string[];
  claimType: ClaimType;
};

export type QualitativeEvaluation = EvaluationDetail & {
  criterion: Exclude<EvaluationCriterion, "implementation-complexity">;
  level: EvaluationLevel;
};

export type ImplementationComplexityEvaluation = EvaluationDetail & {
  criterion: "implementation-complexity";
  level: ComplexityLevel;
};

export type Evaluation =
  | QualitativeEvaluation
  | ImplementationComplexityEvaluation;

export type EvaluationFor<Criterion extends EvaluationCriterion> =
  Criterion extends "implementation-complexity"
    ? ImplementationComplexityEvaluation
    : QualitativeEvaluation & { criterion: Criterion };

export type CoreEvaluationSet = {
  [Criterion in CoreEvaluationCriterion]: EvaluationFor<Criterion>;
};

export type ProductFit = {
  productType: ProductType;
  level: ProductFitLevel;
  reason: string;
  strengths: readonly string[];
  risks: readonly string[];
  conditions: readonly string[];
  evidence: readonly string[];
  claimType: ClaimType;
};

const FORBIDDEN_SCORE_FIELDS = [
  "score",
  "overallScore",
  "percentage",
  "winner",
] as const;

function validateEvaluationDetail(
  record: Record<string, unknown>,
  path: string,
): DomainValidationIssue[] {
  const issues = findForbiddenFields(record, path, FORBIDDEN_SCORE_FIELDS);

  if (!isNonEmptyString(record.reason)) {
    issues.push({
      code: "empty-value",
      path: `${path}.reason`,
      message: "Every evaluation requires a non-empty reason.",
    });
  }

  for (const field of ["strengths", "risks", "conditions", "evidence"] as const) {
    if (!isStringArray(record[field])) {
      issues.push({
        code: "invalid-value",
        path: `${path}.${field}`,
        message: `${field} must be an array of non-empty strings.`,
      });
    }
  }

  if (!isVocabularyValue("claimType", record.claimType)) {
    issues.push({
      code: "invalid-value",
      path: `${path}.claimType`,
      message: "Every evaluation requires a supported claim type.",
    });
  }

  return issues;
}

export function validateEvaluation(
  value: unknown,
  path = "evaluation",
): DomainValidationIssue[] {
  if (!isRecord(value)) {
    return [{
      code: "invalid-value",
      path,
      message: "Evaluation must be an object.",
    }];
  }

  const issues = validateEvaluationDetail(value, path);

  if (!isVocabularyValue("evaluationCriterion", value.criterion)) {
    issues.push({
      code: "invalid-criterion",
      path: `${path}.criterion`,
      message: `${String(value.criterion)} is not a supported criterion.`,
    });
    return issues;
  }

  const expectedVocabulary =
    value.criterion === "implementation-complexity"
      ? "complexityLevel"
      : "evaluationLevel";

  if (!isVocabularyValue(expectedVocabulary, value.level)) {
    issues.push({
      code: "invalid-level",
      path: `${path}.level`,
      message:
        value.criterion === "implementation-complexity"
          ? "Implementation complexity must use low through very-high."
          : "Qualitative evaluation must use an EvaluationLevel.",
    });
  }

  return issues;
}

export function validateCoreEvaluationSet(
  value: unknown,
  path = "evaluations",
): DomainValidationIssue[] {
  if (!isRecord(value)) {
    return [{
      code: "invalid-value",
      path,
      message: "Core evaluations must be an object keyed by criterion.",
    }];
  }

  const issues: DomainValidationIssue[] = [];
  const acceptedCriteria = new Set<string>(CORE_EVALUATION_CRITERIA);

  Object.keys(value).forEach((criterion) => {
    if (!acceptedCriteria.has(criterion)) {
      issues.push({
        code: "invalid-criterion",
        path: `${path}.${criterion}`,
        message: `${criterion} is not one of the six core evaluation criteria.`,
      });
    }
  });

  CORE_EVALUATION_CRITERIA.forEach((criterion) => {
    const evaluation = value[criterion];
    const evaluationPath = `${path}.${criterion}`;

    if (evaluation === undefined) {
      issues.push({
        code: "missing-criterion",
        path: evaluationPath,
        message: `Missing core evaluation: ${criterion}.`,
      });
      return;
    }

    issues.push(...validateEvaluation(evaluation, evaluationPath));

    if (isRecord(evaluation) && evaluation.criterion !== criterion) {
      issues.push({
        code: "invalid-criterion",
        path: `${evaluationPath}.criterion`,
        message: `Expected criterion ${criterion}, received ${String(evaluation.criterion)}.`,
      });
    }
  });

  return issues;
}

export function validateProductFit(
  value: unknown,
  path = "productFit",
): DomainValidationIssue[] {
  if (!isRecord(value)) {
    return [{
      code: "invalid-value",
      path,
      message: "Product fit must be an object.",
    }];
  }

  const issues = validateEvaluationDetail(value, path);

  if (!isVocabularyValue("productType", value.productType)) {
    issues.push({
      code: "invalid-value",
      path: `${path}.productType`,
      message: `${String(value.productType)} is not a supported product type.`,
    });
  }

  if (!isVocabularyValue("productFitLevel", value.level)) {
    issues.push({
      code: "invalid-level",
      path: `${path}.level`,
      message: "Product fit must use a ProductFitLevel.",
    });
  }

  return issues;
}
