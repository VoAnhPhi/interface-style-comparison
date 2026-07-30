export type DomainValidationIssueCode =
  | "duplicate-id"
  | "empty-value"
  | "forbidden-field"
  | "invalid-criterion"
  | "invalid-date"
  | "invalid-level"
  | "invalid-reference"
  | "invalid-status"
  | "invalid-value"
  | "missing-criterion"
  | "missing-product-type"
  | "missing-required-field"
  | "scenario-mismatch"
  | "self-reference"
  | "unknown-style";

export type DomainValidationIssue = {
  code: DomainValidationIssueCode;
  path: string;
  message: string;
};

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every(isNonEmptyString);
}

export function isIsoDate(value: unknown): value is string {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const parsed = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(parsed.valueOf())
    && parsed.toISOString().slice(0, 10) === value;
}

export function isHttpUrl(value: unknown): value is string {
  if (typeof value !== "string") {
    return false;
  }

  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export function findForbiddenFields(
  record: Record<string, unknown>,
  path: string,
  fields: readonly string[],
): DomainValidationIssue[] {
  return fields
    .filter((field) => field in record)
    .map((field) => ({
      code: "forbidden-field",
      path: `${path}.${field}`,
      message: `${field} is not part of the qualitative research contract.`,
    }));
}
