import { describe, expect, it } from "vitest";

import { STYLE_RELATIONSHIP_TYPES } from "./vocabulary";
import {
  type StyleRelationship,
  validateEvolutionReferences,
  validateStyleRelationships,
} from "./relationships";

const knownStyles = new Set(["flat-design", "material-design", "modern-saas"]);
const knownSources = new Set(["design-history-source"]);

const baseRelationship = {
  id: "flat-influenced-material",
  sourceStyleId: "flat-design",
  type: "influenced",
  targetStyleId: "material-design",
  explanation: "Flat interfaces contributed to a broader move away from skeuomorphic detail.",
  claimType: "historical-interpretation",
  sourceIds: ["design-history-source"],
  evidenceStrength: "interpretive",
  interpretationNote: "This project interprets the relationship from the cited history.",
} as const satisfies StyleRelationship;

describe("Spec 3 relationship and evolution contracts", () => {
  it("represents every accepted relationship semantic", () => {
    const relationships = STYLE_RELATIONSHIP_TYPES.map((type, index) => ({
      ...baseRelationship,
      id: `relationship-${index}`,
      type,
    }));

    expect(
      validateStyleRelationships(relationships, knownStyles, knownSources),
    ).toEqual([]);
  });

  it("preserves source and target direction while rejecting unknown styles", () => {
    const issues = validateStyleRelationships([{
      ...baseRelationship,
      targetStyleId: "unknown-style",
    }], knownStyles, knownSources);

    expect(issues).toEqual(expect.arrayContaining([
      expect.objectContaining({
        code: "unknown-style",
        path: "relationships[0].targetStyleId",
      }),
    ]));
  });

  it("rejects self relationships and broken evidence references", () => {
    const issues = validateStyleRelationships([{
      ...baseRelationship,
      targetStyleId: "flat-design",
      sourceIds: ["missing-source"],
    }], knownStyles, knownSources);

    expect(issues).toEqual(expect.arrayContaining([
      expect.objectContaining({ code: "self-reference" }),
      expect.objectContaining({ code: "invalid-reference" }),
    ]));
  });

  it("keeps related-to non-causal", () => {
    const issues = validateStyleRelationships([{
      ...baseRelationship,
      type: "related-to",
      evolutionEventId: "flat-transition",
    }], knownStyles, knownSources, new Set(["flat-transition"]));

    expect(issues).toEqual(expect.arrayContaining([
      expect.objectContaining({
        path: "relationships[0].evolutionEventId",
      }),
    ]));
  });

  it("validates directional evolution references and their drivers", () => {
    expect(validateEvolutionReferences([{
      id: "flat-transition",
      name: "Reduction of skeuomorphic detail",
      sourceStyleIds: ["flat-design"],
      targetStyleIds: ["material-design"],
      drivers: ["Need for scalable cross-device interface systems"],
      explanation: "The transition retained flat foundations while restoring hierarchy cues.",
      claimType: "historical-interpretation",
      sourceIds: ["design-history-source"],
      evidenceStrength: "interpretive",
      interpretationNote: "This is a project synthesis of the cited source.",
    }], knownStyles, knownSources)).toEqual([]);
  });
});
