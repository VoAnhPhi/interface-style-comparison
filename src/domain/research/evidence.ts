import {
  type ClaimType,
  type ContentStatus,
  type EvidenceStrength,
  type ResearchSourceType,
  type ReviewStatus,
  isVocabularyValue,
} from "./vocabulary";
import {
  type DomainValidationIssue,
  isHttpUrl,
  isIsoDate,
  isNonEmptyString,
  isRecord,
  isStringArray,
} from "./validation";

export type ResearchSourceId = string;
export type ResearchClaimId = string;

export type ReviewMetadata = {
  contentStatus: ContentStatus;
  reviewStatus: ReviewStatus;
  reviewedBy?: string;
  reviewedAt?: string;
  version: string;
};

export type ResearchSource = {
  id: ResearchSourceId;
  title: string;
  type: ResearchSourceType;
  url?: string;
  localReference?: string;
  publisher?: string;
  authors: readonly string[];
  publishedAt?: string;
  retrievedAt?: string;
  notes?: string;
  limitations: readonly string[];
  review: ReviewMetadata;
};

export type ResearchAttribution = {
  claimType: ClaimType;
  sourceIds: readonly ResearchSourceId[];
  evidenceStrength: EvidenceStrength;
  interpretationNote?: string;
};

export type ResearchClaim = ResearchAttribution & {
  id: ResearchClaimId;
  statement: string;
  review: ReviewMetadata;
};

export type EvidenceBundle = {
  sources: readonly ResearchSource[];
  claims: readonly ResearchClaim[];
};

export function validateReviewMetadata(
  value: unknown,
  path = "review",
): DomainValidationIssue[] {
  if (!isRecord(value)) {
    return [{
      code: "missing-required-field",
      path,
      message: "Review metadata is required.",
    }];
  }

  const issues: DomainValidationIssue[] = [];

  if (!isVocabularyValue("contentStatus", value.contentStatus)) {
    issues.push({
      code: "invalid-status",
      path: `${path}.contentStatus`,
      message: "Unsupported content status.",
    });
  }

  if (!isVocabularyValue("reviewStatus", value.reviewStatus)) {
    issues.push({
      code: "invalid-status",
      path: `${path}.reviewStatus`,
      message: "Unsupported review status.",
    });
  }

  if (!isNonEmptyString(value.version)) {
    issues.push({
      code: "missing-required-field",
      path: `${path}.version`,
      message: "Review version is required.",
    });
  }

  if (value.reviewedAt !== undefined && !isIsoDate(value.reviewedAt)) {
    issues.push({
      code: "invalid-date",
      path: `${path}.reviewedAt`,
      message: "reviewedAt must use YYYY-MM-DD.",
    });
  }

  if (
    value.reviewStatus === "approved"
    && (!isNonEmptyString(value.reviewedBy) || !isIsoDate(value.reviewedAt))
  ) {
    issues.push({
      code: "invalid-status",
      path,
      message: "Approved content requires reviewedBy and reviewedAt.",
    });
  }

  if (
    value.contentStatus === "published"
    && value.reviewStatus === "not-reviewed"
  ) {
    issues.push({
      code: "invalid-status",
      path,
      message: "Published content must pass at least one review gate.",
    });
  }

  return issues;
}

export function validateResearchSources(
  values: readonly unknown[],
  path = "sources",
): DomainValidationIssue[] {
  const issues: DomainValidationIssue[] = [];
  const ids = new Set<string>();

  values.forEach((value, index) => {
    const sourcePath = `${path}[${index}]`;

    if (!isRecord(value)) {
      issues.push({
        code: "invalid-value",
        path: sourcePath,
        message: "Research source must be an object.",
      });
      return;
    }

    if (!isNonEmptyString(value.id)) {
      issues.push({
        code: "missing-required-field",
        path: `${sourcePath}.id`,
        message: "Research source id is required.",
      });
    } else if (ids.has(value.id)) {
      issues.push({
        code: "duplicate-id",
        path: `${sourcePath}.id`,
        message: `Duplicate research source id: ${value.id}.`,
      });
    } else {
      ids.add(value.id);
    }

    if (!isNonEmptyString(value.title)) {
      issues.push({
        code: "missing-required-field",
        path: `${sourcePath}.title`,
        message: "Research source title is required.",
      });
    }

    if (!isVocabularyValue("researchSourceType", value.type)) {
      issues.push({
        code: "invalid-value",
        path: `${sourcePath}.type`,
        message: "Unsupported research source type.",
      });
    }

    const hasUrl = value.url !== undefined;
    const hasLocalReference = isNonEmptyString(value.localReference);

    if (!hasUrl && !hasLocalReference) {
      issues.push({
        code: "missing-required-field",
        path: sourcePath,
        message: "Research source requires a URL or local reference.",
      });
    } else if (hasUrl && !isHttpUrl(value.url)) {
      issues.push({
        code: "invalid-reference",
        path: `${sourcePath}.url`,
        message: "Research source URL must use HTTP or HTTPS.",
      });
    }

    if (!isStringArray(value.authors) || !isStringArray(value.limitations)) {
      issues.push({
        code: "invalid-value",
        path: sourcePath,
        message: "authors and limitations must be arrays of non-empty strings.",
      });
    }

    for (const field of ["publishedAt", "retrievedAt"] as const) {
      if (value[field] !== undefined && !isIsoDate(value[field])) {
        issues.push({
          code: "invalid-date",
          path: `${sourcePath}.${field}`,
          message: `${field} must use YYYY-MM-DD.`,
        });
      }
    }

    issues.push(...validateReviewMetadata(value.review, `${sourcePath}.review`));
  });

  return issues;
}

export function validateResearchAttribution(
  value: Record<string, unknown>,
  knownSourceIds: ReadonlySet<string>,
  path: string,
): DomainValidationIssue[] {
  const issues: DomainValidationIssue[] = [];

  if (!isVocabularyValue("claimType", value.claimType)) {
    issues.push({
      code: "invalid-value",
      path: `${path}.claimType`,
      message: "A supported claim type is required.",
    });
  }

  if (!isVocabularyValue("evidenceStrength", value.evidenceStrength)) {
    issues.push({
      code: "invalid-value",
      path: `${path}.evidenceStrength`,
      message: "A supported evidence strength is required.",
    });
  }

  if (!isStringArray(value.sourceIds)) {
    issues.push({
      code: "invalid-value",
      path: `${path}.sourceIds`,
      message: "sourceIds must be an array of source ids.",
    });
  } else {
    value.sourceIds.forEach((sourceId, index) => {
      if (!knownSourceIds.has(sourceId)) {
        issues.push({
          code: "invalid-reference",
          path: `${path}.sourceIds[${index}]`,
          message: `Unknown research source: ${sourceId}.`,
        });
      }
    });

    if (value.claimType === "documented-fact" && value.sourceIds.length === 0) {
      issues.push({
        code: "missing-required-field",
        path: `${path}.sourceIds`,
        message: "A documented fact requires at least one source.",
      });
    }
  }

  if (
    value.claimType !== "documented-fact"
    && !isNonEmptyString(value.interpretationNote)
  ) {
    issues.push({
      code: "missing-required-field",
      path: `${path}.interpretationNote`,
      message: "Non-documented claims require an interpretation note.",
    });
  }

  return issues;
}

export function validateResearchClaims(
  values: readonly unknown[],
  knownSourceIds: ReadonlySet<string>,
  path = "claims",
): DomainValidationIssue[] {
  const issues: DomainValidationIssue[] = [];
  const ids = new Set<string>();

  values.forEach((value, index) => {
    const claimPath = `${path}[${index}]`;

    if (!isRecord(value)) {
      issues.push({
        code: "invalid-value",
        path: claimPath,
        message: "Research claim must be an object.",
      });
      return;
    }

    if (!isNonEmptyString(value.id)) {
      issues.push({
        code: "missing-required-field",
        path: `${claimPath}.id`,
        message: "Research claim id is required.",
      });
    } else if (ids.has(value.id)) {
      issues.push({
        code: "duplicate-id",
        path: `${claimPath}.id`,
        message: `Duplicate research claim id: ${value.id}.`,
      });
    } else {
      ids.add(value.id);
    }

    if (!isNonEmptyString(value.statement)) {
      issues.push({
        code: "missing-required-field",
        path: `${claimPath}.statement`,
        message: "Research claim statement is required.",
      });
    }

    issues.push(
      ...validateResearchAttribution(value, knownSourceIds, claimPath),
      ...validateReviewMetadata(value.review, `${claimPath}.review`),
    );
  });

  return issues;
}

export function validateEvidenceBundle(
  value: EvidenceBundle,
  path = "evidence",
): DomainValidationIssue[] {
  const sourceIds = new Set(value.sources.map((source) => source.id));

  return [
    ...validateResearchSources(value.sources, `${path}.sources`),
    ...validateResearchClaims(value.claims, sourceIds, `${path}.claims`),
  ];
}
