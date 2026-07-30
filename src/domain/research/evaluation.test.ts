import { describe, expect, it } from "vitest";

import {
  type ImplementationComplexityEvaluation,
  type ProductFit,
  type QualitativeEvaluation,
  validateCoreEvaluationSet,
  validateEvaluation,
  validateProductFit,
} from "./evaluation";

const accessibilityEvaluation = {
  criterion: "accessibility",
  level: "requires-care",
  reason: "Transparent surfaces can make contrast dependent on background content.",
  strengths: ["Readable when the surface and background are controlled."],
  risks: ["Reduced text contrast."],
  conditions: ["Validate effective contrast against the final background."],
  evidence: ["wcag-contrast-guidance"],
  claimType: "project-inference",
} satisfies QualitativeEvaluation;

const complexityEvaluation = {
  criterion: "implementation-complexity",
  level: "high",
  reason: "Blur, fallbacks, and responsive compositing require extra implementation work.",
  strengths: [],
  risks: ["More CSS and rendering paths."],
  conditions: ["Provide a solid-surface fallback."],
  evidence: [],
  claimType: "implementation-choice",
} satisfies ImplementationComplexityEvaluation;

const dashboardFit = {
  productType: "dashboard-admin",
  level: "use-selectively",
  reason: "The aesthetic can support overlays but should not control dense reading surfaces.",
  strengths: ["Useful for localized navigation or modal emphasis."],
  risks: ["Background-dependent contrast."],
  conditions: ["Keep primary data surfaces opaque."],
  evidence: [],
  claimType: "project-inference",
} satisfies ProductFit;

describe("Spec 3 evaluation contract", () => {
  it("accepts reasoned qualitative evaluations", () => {
    expect(validateEvaluation(accessibilityEvaluation)).toEqual([]);
  });

  it("uses the dedicated complexity scale", () => {
    expect(validateEvaluation(complexityEvaluation)).toEqual([]);

    expect(
      validateEvaluation({
        ...complexityEvaluation,
        level: "strong",
      }),
    ).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ code: "invalid-level" }),
      ]),
    );
  });

  it("preserves not-evaluated instead of defaulting to moderate", () => {
    expect(
      validateEvaluation({
        ...accessibilityEvaluation,
        level: "not-evaluated",
        reason: "Current research is insufficient for a conclusion.",
        strengths: [],
        risks: [],
        conditions: [],
        evidence: [],
      }),
    ).toEqual([]);
  });

  it("requires reasoning and rejects scientific-looking score fields", () => {
    const issues = validateEvaluation({
      ...accessibilityEvaluation,
      reason: " ",
      overallScore: 87.6,
    });

    expect(issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ code: "empty-value" }),
        expect.objectContaining({ code: "forbidden-field" }),
      ]),
    );
  });

  it("accepts contextual product fit with its own level vocabulary", () => {
    expect(validateProductFit(dashboardFit)).toEqual([]);

    expect(
      validateProductFit({
        ...dashboardFit,
        level: "very-strong",
      }),
    ).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ code: "invalid-level" }),
      ]),
    );
  });

  it("rejects unsupported product types and missing claim labels", () => {
    const issues = validateProductFit({
      ...dashboardFit,
      productType: "mobile-app",
      claimType: undefined,
    });

    expect(issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          code: "invalid-value",
          path: "productFit.productType",
        }),
        expect.objectContaining({
          code: "invalid-value",
          path: "productFit.claimType",
        }),
      ]),
    );
  });

  it("requires all six core evaluations and matching criterion keys", () => {
    const evaluations = {
      usability: {
        ...accessibilityEvaluation,
        criterion: "accessibility",
      },
    };

    const issues = validateCoreEvaluationSet(evaluations);

    expect(issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          code: "invalid-criterion",
          path: "evaluations.usability.criterion",
        }),
        expect.objectContaining({
          code: "missing-criterion",
          path: "evaluations.implementation-complexity",
        }),
      ]),
    );
  });

  it("rejects evaluations outside the six-criterion core set", () => {
    expect(
      validateCoreEvaluationSet({
        maintainability: {
          ...accessibilityEvaluation,
          criterion: "maintainability",
        },
      }),
    ).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          code: "invalid-criterion",
          path: "evaluations.maintainability",
        }),
      ]),
    );
  });
});
