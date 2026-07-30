import {
  type ClaimType,
  type EvidenceStrength,
  type StyleRelationshipType,
  isVocabularyValue,
} from "./vocabulary";
import {
  type ResearchSourceId,
  validateResearchAttribution,
} from "./evidence";
import {
  type DomainValidationIssue,
  isNonEmptyString,
  isRecord,
  isStringArray,
} from "./validation";

export type StyleId = string;
export type EvolutionEventId = string;

type RelationshipAttribution = {
  claimType: ClaimType;
  sourceIds: readonly ResearchSourceId[];
  evidenceStrength: EvidenceStrength;
  interpretationNote?: string;
};

export type StyleRelationship = RelationshipAttribution & {
  id: string;
  sourceStyleId: StyleId;
  type: StyleRelationshipType;
  targetStyleId: StyleId;
  explanation: string;
  evolutionEventId?: EvolutionEventId;
};

export type EvolutionReference = RelationshipAttribution & {
  id: EvolutionEventId;
  name: string;
  sourceStyleIds: readonly StyleId[];
  targetStyleIds: readonly StyleId[];
  drivers: readonly string[];
  explanation: string;
};

function validateStyleReference(
  value: unknown,
  knownStyleIds: ReadonlySet<string>,
  path: string,
): DomainValidationIssue[] {
  if (!isNonEmptyString(value) || !knownStyleIds.has(value)) {
    return [{
      code: "unknown-style",
      path,
      message: `Unknown style: ${String(value)}.`,
    }];
  }

  return [];
}

export function validateEvolutionReferences(
  values: readonly unknown[],
  knownStyleIds: ReadonlySet<string>,
  knownSourceIds: ReadonlySet<string>,
  path = "evolutionReferences",
): DomainValidationIssue[] {
  const issues: DomainValidationIssue[] = [];
  const ids = new Set<string>();

  values.forEach((value, index) => {
    const eventPath = `${path}[${index}]`;

    if (!isRecord(value)) {
      issues.push({
        code: "invalid-value",
        path: eventPath,
        message: "Evolution reference must be an object.",
      });
      return;
    }

    if (!isNonEmptyString(value.id)) {
      issues.push({
        code: "missing-required-field",
        path: `${eventPath}.id`,
        message: "Evolution event id is required.",
      });
    } else if (ids.has(value.id)) {
      issues.push({
        code: "duplicate-id",
        path: `${eventPath}.id`,
        message: `Duplicate evolution event id: ${value.id}.`,
      });
    } else {
      ids.add(value.id);
    }

    if (!isNonEmptyString(value.name) || !isNonEmptyString(value.explanation)) {
      issues.push({
        code: "missing-required-field",
        path: eventPath,
        message: "Evolution name and explanation are required.",
      });
    }

    for (const field of ["sourceStyleIds", "targetStyleIds"] as const) {
      if (!isStringArray(value[field]) || value[field].length === 0) {
        issues.push({
          code: "missing-required-field",
          path: `${eventPath}.${field}`,
          message: `${field} requires at least one style id.`,
        });
        continue;
      }

      value[field].forEach((styleId, styleIndex) => {
        issues.push(...validateStyleReference(
          styleId,
          knownStyleIds,
          `${eventPath}.${field}[${styleIndex}]`,
        ));
      });
    }

    if (!isStringArray(value.drivers) || value.drivers.length === 0) {
      issues.push({
        code: "missing-required-field",
        path: `${eventPath}.drivers`,
        message: "Evolution references require at least one stated driver.",
      });
    }

    issues.push(
      ...validateResearchAttribution(value, knownSourceIds, eventPath),
    );
  });

  return issues;
}

export function validateStyleRelationships(
  values: readonly unknown[],
  knownStyleIds: ReadonlySet<string>,
  knownSourceIds: ReadonlySet<string>,
  knownEvolutionEventIds: ReadonlySet<string> = new Set(),
  path = "relationships",
): DomainValidationIssue[] {
  const issues: DomainValidationIssue[] = [];
  const ids = new Set<string>();

  values.forEach((value, index) => {
    const relationshipPath = `${path}[${index}]`;

    if (!isRecord(value)) {
      issues.push({
        code: "invalid-value",
        path: relationshipPath,
        message: "Style relationship must be an object.",
      });
      return;
    }

    if (!isNonEmptyString(value.id)) {
      issues.push({
        code: "missing-required-field",
        path: `${relationshipPath}.id`,
        message: "Style relationship id is required.",
      });
    } else if (ids.has(value.id)) {
      issues.push({
        code: "duplicate-id",
        path: `${relationshipPath}.id`,
        message: `Duplicate style relationship id: ${value.id}.`,
      });
    } else {
      ids.add(value.id);
    }

    issues.push(
      ...validateStyleReference(
        value.sourceStyleId,
        knownStyleIds,
        `${relationshipPath}.sourceStyleId`,
      ),
      ...validateStyleReference(
        value.targetStyleId,
        knownStyleIds,
        `${relationshipPath}.targetStyleId`,
      ),
    );

    if (
      isNonEmptyString(value.sourceStyleId)
      && value.sourceStyleId === value.targetStyleId
    ) {
      issues.push({
        code: "self-reference",
        path: relationshipPath,
        message: "A style relationship cannot target itself.",
      });
    }

    if (!isVocabularyValue("styleRelationshipType", value.type)) {
      issues.push({
        code: "invalid-value",
        path: `${relationshipPath}.type`,
        message: "Unsupported style relationship type.",
      });
    }

    if (!isNonEmptyString(value.explanation)) {
      issues.push({
        code: "missing-required-field",
        path: `${relationshipPath}.explanation`,
        message: "Style relationship explanation is required.",
      });
    }

    if (
      value.evolutionEventId !== undefined
      && !knownEvolutionEventIds.has(String(value.evolutionEventId))
    ) {
      issues.push({
        code: "invalid-reference",
        path: `${relationshipPath}.evolutionEventId`,
        message: `Unknown evolution event: ${String(value.evolutionEventId)}.`,
      });
    }

    if (value.type === "related-to" && value.evolutionEventId !== undefined) {
      issues.push({
        code: "invalid-reference",
        path: `${relationshipPath}.evolutionEventId`,
        message: "related-to cannot imply a causal evolution event.",
      });
    }

    issues.push(
      ...validateResearchAttribution(value, knownSourceIds, relationshipPath),
    );
  });

  return issues;
}
