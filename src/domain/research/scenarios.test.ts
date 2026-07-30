import { describe, expect, it } from "vitest";

import {
  CANONICAL_SCENARIOS,
  INITIAL_SCENARIO_IDS,
  type SharedScenario,
  validateScenarioAgainstCanonical,
  validateSharedScenarios,
} from "./scenarios";

describe("Spec 3 canonical same-context scenarios", () => {
  it("defines valid Dashboard, Form, and E-commerce Product scenarios", () => {
    expect(CANONICAL_SCENARIOS.map(({ id }) => id)).toEqual(INITIAL_SCENARIO_IDS);
    expect(validateSharedScenarios(CANONICAL_SCENARIOS)).toEqual([]);
  });

  it("deep-freezes shared business content", () => {
    expect(Object.isFrozen(CANONICAL_SCENARIOS)).toBe(true);

    for (const scenario of CANONICAL_SCENARIOS) {
      expect(Object.isFrozen(scenario)).toBe(true);
      expect(Object.isFrozen(scenario.content)).toBe(true);
      expect(Object.isFrozen(scenario.content[0])).toBe(true);
    }
  });

  it("detects a changed canonical business value", () => {
    const dashboard = CANONICAL_SCENARIOS[0];
    const changed = {
      ...dashboard,
      content: dashboard.content.map((item) =>
        item.id === "revenue" ? { ...item, value: "$999,999" } : item
      ),
    } satisfies SharedScenario;

    expect(validateScenarioAgainstCanonical(changed)).toEqual([
      expect.objectContaining({ code: "scenario-mismatch" }),
    ]);
  });

  it("rejects style-specific recommendations in shared scenarios", () => {
    const invalid = [{
      ...CANONICAL_SCENARIOS[0],
      recommendedStyle: "modern-saas",
    }, ...CANONICAL_SCENARIOS.slice(1)];

    expect(validateSharedScenarios(invalid)).toEqual(expect.arrayContaining([
      expect.objectContaining({
        code: "forbidden-field",
        path: "scenarios[0].recommendedStyle",
      }),
    ]));
  });

  it("reports missing initial scenarios", () => {
    expect(validateSharedScenarios(CANONICAL_SCENARIOS.slice(0, 2))).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          code: "missing-required-field",
          message: expect.stringContaining("ecommerce-product"),
        }),
      ]),
    );
  });
});
