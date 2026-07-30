import type { DesignStyle } from "../../data/designStyles";
import type { DomainValidationIssue } from "./validation";
import {
  type ResearchStyle,
  validateResearchStyle,
} from "./style";

export type CompatibilityAdapterResult =
  | {
      ok: true;
      value: DesignStyle;
    }
  | {
      ok: false;
      issues: DomainValidationIssue[];
    };

export function adaptResearchStyleToDesignStyle(
  researchStyle: ResearchStyle,
  legacyFallback: DesignStyle,
  knownStyleIds: ReadonlySet<string> = new Set([researchStyle.id]),
): CompatibilityAdapterResult {
  const issues = validateResearchStyle(researchStyle, knownStyleIds);

  if (legacyFallback.id !== researchStyle.legacyRenderer.rendererId) {
    issues.push({
      code: "adapter-mismatch",
      path: "style.legacyRenderer.rendererId",
      message:
        `Legacy fallback ${legacyFallback.id} does not match renderer `
        + `${researchStyle.legacyRenderer.rendererId}.`,
    });
  }

  if (researchStyle.id !== researchStyle.legacyRenderer.rendererId) {
    issues.push({
      code: "adapter-mismatch",
      path: "style.id",
      message: "Normalized style id must preserve the legacy renderer id.",
    });
  }

  if (issues.length > 0) {
    return { ok: false, issues };
  }

  return {
    ok: true,
    value: {
      ...legacyFallback,
      id: researchStyle.legacyRenderer.rendererId,
      name: researchStyle.name,
      summary: researchStyle.summary,
      distinguishingSignals: researchStyle.distinguishingSignals.map(
        ({ text }) => text,
      ),
      classification: researchStyle.legacyRenderer.classification,
    },
  };
}
