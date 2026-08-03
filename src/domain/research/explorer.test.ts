import { describe, expect, it } from "vitest";

import { normalizedResearchStyles } from "./catalog";
import {
  DEFAULT_EXPLORER_FILTERS,
  filterResearchStyles,
  getAvailableClassifications,
  getAvailableExplorerFilters,
  parseExplorerFilters,
  serializeExplorerFilters,
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

  it("filters normalized Visual DNA, era, and maturity fields", () => {
    const filters = {
      ...DEFAULT_EXPLORER_FILTERS,
      era: "2020s" as const,
      density: "low" as const,
      visualWeight: "high" as const,
      maturity: "emerging" as const,
    };
    const result = filterResearchStyles(normalizedResearchStyles, filters);

    expect(result.length).toBeGreaterThan(0);
    expect(result.every((style) =>
      style.eras.includes("2020s")
      && style.visualDNA.density.level === "low"
      && style.visualDNA["visual-weight"].level === "high"
      && style.maturity === "emerging",
    )).toBe(true);
  });

  it("round-trips secondary filters through shareable URL state", () => {
    const filters = parseExplorerFilters(
      "?q=glass%20blur&tag=Landing&classification=visual-aesthetic&era=2020s&density=low&weight=high&maturity=emerging",
      ["All", "Landing", "Product"],
    );

    expect(filters).toEqual({
      query: "glass blur",
      tag: "Landing",
      classification: "visual-aesthetic",
      era: "2020s",
      density: "low",
      visualWeight: "high",
      maturity: "emerging",
    });
    expect(serializeExplorerFilters(filters)).toBe(
      "?q=glass+blur&tag=Landing&classification=visual-aesthetic&era=2020s&density=low&weight=high&maturity=emerging",
    );
  });

  it("normalizes unsupported URL filter values to safe defaults", () => {
    expect(parseExplorerFilters(
      "?classification=unknown&era=1990s&density=unknown&weight=unknown&maturity=unknown&tag=Unknown",
      ["All", "Landing"],
    )).toEqual(DEFAULT_EXPLORER_FILTERS);
  });

  it("only exposes secondary values represented by the normalized dataset", () => {
    const options = getAvailableExplorerFilters(normalizedResearchStyles);

    expect(options.eras).toEqual(["2000s", "2010s", "2020s", "revival"]);
    expect(options.densities.length).toBeGreaterThan(0);
    expect(options.visualWeights.length).toBeGreaterThan(0);
    expect(options.maturities).toEqual(["emerging", "established", "legacy", "revived"]);
  });
});
