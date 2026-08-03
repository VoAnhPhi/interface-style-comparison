import { describe, expect, it } from "vitest";

import {
  CORE_EVALUATION_CRITERIA,
  EVALUATION_CRITERIA,
  EVALUATION_LEVELS,
  PRODUCT_TYPES,
  SPEC3_VOCABULARIES,
  VocabularyValidationError,
  assertVocabularyValue,
  isVocabularyValue,
} from "./vocabulary";

describe("Spec 3 controlled vocabulary", () => {
  it("keeps every vocabulary unique and kebab-case", () => {
    for (const [name, values] of Object.entries(SPEC3_VOCABULARIES)) {
      expect(new Set(values).size, `${name} contains duplicate values`).toBe(
        values.length,
      );

      for (const value of values) {
        expect(value, `${name}.${value} is not kebab-case`).toMatch(
          /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        );
      }
    }
  });

  it("keeps the six accepted criteria as the core subset", () => {
    expect(CORE_EVALUATION_CRITERIA).toEqual([
      "usability",
      "accessibility",
      "implementation-complexity",
      "scalability",
      "information-density",
      "visual-expression",
    ]);

    for (const criterion of CORE_EVALUATION_CRITERIA) {
      expect(EVALUATION_CRITERIA).toContain(criterion);
    }
  });

  it("keeps missing research distinct from a moderate evaluation", () => {
    expect(EVALUATION_LEVELS).toContain("not-evaluated");
    expect(EVALUATION_LEVELS).toContain("not-applicable");
    expect(isVocabularyValue("evaluationLevel", "not-evaluated")).toBe(true);
    expect(isVocabularyValue("evaluationLevel", "unknown")).toBe(false);
  });

  it("does not mix platform values into product type", () => {
    expect(PRODUCT_TYPES).not.toContain("mobile-app");
    expect(PRODUCT_TYPES).not.toContain("native-mobile");
    expect(PRODUCT_TYPES).toContain("consumer-product");
  });

  it("accepts valid values and rejects unsupported free-form values", () => {
    expect(isVocabularyValue("styleClassification", "interface-pattern")).toBe(
      true,
    );
    expect(isVocabularyValue("styleClassification", "layout-trend")).toBe(
      false,
    );
    expect(isVocabularyValue("styleMaturity", null)).toBe(false);
  });

  it("throws a structured validation error for invalid values", () => {
    expect(() =>
      assertVocabularyValue("productionReadiness", "safe-enough"),
    ).toThrowError(VocabularyValidationError);

    try {
      assertVocabularyValue("productionReadiness", "safe-enough");
    } catch (error) {
      expect(error).toMatchObject({
        code: "invalid-vocabulary-value",
        vocabulary: "productionReadiness",
        received: "safe-enough",
      });
    }
  });
});
