import { describe, expect, it } from "vitest";

import { normalizedResearchStyles } from "./catalog";
import {
  filterResearchStyles,
  getAvailableClassifications,
} from "./explorer";

describe("Spec 3 Explorer normalized search", () => {
  it("searches aliases from normalized records", () => {
    expect(filterResearchStyles(normalizedResearchStyles, "frosted-glass").map(({ id }) => id))
      .toEqual(["glassmorphism"]);
  });

  it("searches characteristics from normalized records", () => {
    expect(filterResearchStyles(normalizedResearchStyles, "backdrop blur").map(({ id }) => id))
      .toEqual(["glassmorphism"]);
  });

  it("filters by the normalized primary classification", () => {
    expect(filterResearchStyles(normalizedResearchStyles, "", "historical-movement").map(({ id }) => id))
      .toEqual(["flat-design", "skeuomorphism", "web20-gloss"]);
  });

  it("only exposes classifications represented by the normalized dataset", () => {
    expect(getAvailableClassifications(normalizedResearchStyles)).toEqual([
      "interface-direction",
      "visual-aesthetic",
      "design-language",
      "historical-movement",
    ]);
  });
});
