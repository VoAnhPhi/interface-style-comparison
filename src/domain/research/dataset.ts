import type { DesignStyle } from "../../data/designStyles";
import { adaptResearchStyleToDesignStyle } from "./adapter";
import {
  type ResearchStyle,
  validateResearchStyle,
} from "./style";
import type { DomainValidationIssue } from "./validation";

export type ResearchDatasetValidation = {
  issues: DomainValidationIssue[];
  styleIds: ReadonlySet<string>;
  slugs: ReadonlySet<string>;
};

export function validateResearchDataset(
  styles: readonly ResearchStyle[],
  path = "styles",
  additionalKnownStyleIds: ReadonlySet<string> = new Set(),
): ResearchDatasetValidation {
  const issues: DomainValidationIssue[] = [];
  const normalizedStyleIds = new Set<string>();
  const slugs = new Set<string>();

  styles.forEach((style, index) => {
    if (normalizedStyleIds.has(style.id)) {
      issues.push({
        code: "duplicate-id",
        path: `${path}[${index}].id`,
        message: `Duplicate normalized style id: ${style.id}.`,
      });
    }
    normalizedStyleIds.add(style.id);

    if (slugs.has(style.slug)) {
      issues.push({
        code: "duplicate-id",
        path: `${path}[${index}].slug`,
        message: `Duplicate normalized style slug: ${style.slug}.`,
      });
    }
    slugs.add(style.slug);
  });

  const styleIds = new Set([
    ...additionalKnownStyleIds,
    ...normalizedStyleIds,
  ]);

  styles.forEach((style, index) => {
    issues.push(...validateResearchStyle(
      style,
      styleIds,
      `${path}[${index}]`,
    ));
  });

  return { issues, styleIds, slugs };
}

export type CatalogAdapterResult =
  | {
      ok: true;
      value: DesignStyle[];
    }
  | {
      ok: false;
      issues: DomainValidationIssue[];
    };

export function buildDesignStyleCatalog(
  legacyStyles: readonly DesignStyle[],
  normalizedStyles: readonly ResearchStyle[],
): CatalogAdapterResult {
  const legacyIds = new Set(legacyStyles.map(({ id }) => id));
  const { issues, styleIds } = validateResearchDataset(
    normalizedStyles,
    "styles",
    legacyIds,
  );

  normalizedStyles.forEach((style, index) => {
    if (!legacyIds.has(style.legacyRenderer.rendererId)) {
      issues.push({
        code: "adapter-mismatch",
        path: `styles[${index}].legacyRenderer.rendererId`,
        message:
          `No legacy fallback exists for ${style.legacyRenderer.rendererId}.`,
      });
    }
  });

  if (issues.length > 0) {
    return { ok: false, issues };
  }

  const normalizedByRendererId = new Map(
    normalizedStyles.map((style) => [
      style.legacyRenderer.rendererId,
      style,
    ]),
  );
  const adapted: DesignStyle[] = [];

  for (const legacyStyle of legacyStyles) {
    const normalized = normalizedByRendererId.get(legacyStyle.id);

    if (!normalized) {
      adapted.push(legacyStyle);
      continue;
    }

    const result = adaptResearchStyleToDesignStyle(
      normalized,
      legacyStyle,
      styleIds,
    );

    if (!result.ok) {
      return { ok: false, issues: result.issues };
    }

    adapted.push(result.value);
  }

  return { ok: true, value: adapted };
}
