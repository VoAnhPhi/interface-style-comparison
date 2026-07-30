import { describe, expect, it } from "vitest";

import {
  type DesignStyle,
  designStyles,
} from "../../data/designStyles";
import { adaptResearchStyleToDesignStyle } from "./adapter";
import type { CoreEvaluationSet, ProductFit } from "./evaluation";
import type {
  LegacyRendererClassification,
  ResearchStyle,
  VisualDNA,
} from "./style";
import {
  PRODUCT_TYPES,
  VISUAL_DNA_DIMENSIONS,
  type StyleClassification,
} from "./vocabulary";
import { validateResearchStyle } from "./style";

const draftReview = {
  contentStatus: "draft",
  reviewStatus: "not-reviewed",
  version: "0.1.0",
} as const;

function getLegacyStyle(id: string): DesignStyle {
  const style = designStyles.find((candidate) => candidate.id === id);

  if (!style) {
    throw new Error(`Missing legacy fixture: ${id}`);
  }

  return style;
}

function createCoreEvaluations(claimType = "implementation-choice") {
  const detail = {
    reason: "Fixture-only evaluation awaiting normalized research.",
    strengths: [],
    risks: [],
    conditions: [],
    evidence: [],
    claimType: claimType as "implementation-choice",
  };

  return {
    usability: {
      ...detail,
      criterion: "usability",
      level: "not-evaluated",
    },
    accessibility: {
      ...detail,
      criterion: "accessibility",
      level: "not-evaluated",
    },
    "implementation-complexity": {
      ...detail,
      criterion: "implementation-complexity",
      level: "medium",
    },
    scalability: {
      ...detail,
      criterion: "scalability",
      level: "not-evaluated",
    },
    "information-density": {
      ...detail,
      criterion: "information-density",
      level: "not-evaluated",
    },
    "visual-expression": {
      ...detail,
      criterion: "visual-expression",
      level: "not-evaluated",
    },
  } satisfies CoreEvaluationSet;
}

function createProductFit(): ProductFit[] {
  return PRODUCT_TYPES.map((productType) => ({
    productType,
    level: "not-evaluated",
    reason: "Fixture-only product fit awaiting normalized research.",
    strengths: [],
    risks: [],
    conditions: [],
    evidence: [],
    claimType: "implementation-choice",
  }));
}

function createVisualDNA(claimId: string): VisualDNA {
  return Object.fromEntries(
    VISUAL_DNA_DIMENSIONS.map((dimension) => [
      dimension,
      {
        dimension,
        level: "medium",
        reason: "Fixture value used only to prove the normalized contract.",
        claimId,
      },
    ]),
  ) as VisualDNA;
}

function createFixture(
  legacy: DesignStyle,
  classification: StyleClassification,
): ResearchStyle {
  const claimId = `${legacy.id}-fixture-claim`;
  const statement = {
    id: `${legacy.id}-fixture-statement`,
    text: `Minimal normalized contract fixture for ${legacy.name}.`,
    claimId,
  };

  return {
    id: legacy.id,
    slug: legacy.id,
    name: legacy.name,
    aliases: [],
    summary: legacy.summary,
    classifications: [classification],
    maturity: "established",
    productionReadiness: "use-selectively",
    review: draftReview,
    definition: statement,
    principles: [{ ...statement, id: `${legacy.id}-fixture-principle` }],
    distinguishingSignals: [{
      ...statement,
      id: `${legacy.id}-fixture-signal`,
      text: `Normalized distinguishing signal for ${legacy.name}.`,
    }],
    visualDNA: createVisualDNA(claimId),
    evaluations: createCoreEvaluations(),
    productFit: createProductFit(),
    sources: [{
      id: `${legacy.id}-local-spec`,
      title: `${legacy.name} local implementation fixture`,
      type: "official-documentation",
      localReference: "docs/product/spec-3/IMPLEMENTATION_PLAN.md",
      authors: [],
      limitations: ["Fixture proves contract shape, not a research conclusion."],
      review: draftReview,
    }],
    claims: [{
      id: claimId,
      statement: `The ${legacy.name} fixture preserves the accepted renderer contract.`,
      claimType: "implementation-choice",
      sourceIds: [],
      evidenceStrength: "interpretive",
      interpretationNote: "This is local migration metadata, not a historical claim.",
      review: draftReview,
    }],
    relationships: [],
    evolution: [],
    scenarioIds: ["dashboard"],
    version: {
      schemaVersion: "1.0.0",
      contentVersion: "0.1.0",
      updatedAt: "2026-07-30",
    },
    legacyRenderer: {
      rendererId: legacy.id,
      classification:
        legacy.classification as LegacyRendererClassification,
    },
  };
}

const fixtureCases = [
  {
    id: "modern-saas",
    classification: "interface-direction",
  },
  {
    id: "glassmorphism",
    classification: "visual-aesthetic",
  },
  {
    id: "flat-design",
    classification: "historical-movement",
  },
] as const;

describe("Spec 3 ResearchStyle compatibility adapter", () => {
  it.each(fixtureCases)(
    "validates the $id normalized edge-case fixture",
    ({ id, classification }) => {
      const legacy = getLegacyStyle(id);
      const fixture = createFixture(legacy, classification);

      expect(validateResearchStyle(fixture)).toEqual([]);
    },
  );

  it.each(fixtureCases)(
    "preserves the $id renderer contract and unmigrated legacy fields",
    ({ id, classification }) => {
      const legacy = getLegacyStyle(id);
      const fixture = createFixture(legacy, classification);
      const result = adaptResearchStyleToDesignStyle(fixture, legacy);

      expect(result.ok).toBe(true);

      if (!result.ok) {
        return;
      }

      expect(result.value.id).toBe(legacy.id);
      expect(result.value.tokenRecipe).toBe(legacy.tokenRecipe);
      expect(result.value.componentExamples).toBe(legacy.componentExamples);
      expect(result.value.suitability).toBe(legacy.suitability);
    },
  );

  it("gives normalized fields precedence over conflicting legacy values", () => {
    const legacy = getLegacyStyle("modern-saas");
    const fixture = {
      ...createFixture(legacy, "interface-direction"),
      name: "Normalized Modern SaaS",
      summary: "Normalized summary owns this migrated field.",
    };
    const conflictingFallback = {
      ...legacy,
      name: "Legacy overwrite attempt",
      summary: "Legacy overwrite attempt",
      distinguishingSignals: ["Legacy overwrite attempt"],
    };

    const result = adaptResearchStyleToDesignStyle(
      fixture,
      conflictingFallback,
    );

    expect(result.ok).toBe(true);

    if (!result.ok) {
      return;
    }

    expect(result.value.name).toBe("Normalized Modern SaaS");
    expect(result.value.summary).toBe(
      "Normalized summary owns this migrated field.",
    );
    expect(result.value.distinguishingSignals).toEqual([
      "Normalized distinguishing signal for Modern SaaS.",
    ]);
  });

  it("returns structured errors instead of hiding an invalid record", () => {
    const legacy = getLegacyStyle("modern-saas");
    const fixture = createFixture(legacy, "interface-direction");
    const invalid = {
      ...fixture,
      definition: {
        ...fixture.definition,
        claimId: "unknown-claim",
      },
    };

    const result = adaptResearchStyleToDesignStyle(invalid, legacy);

    expect(result).toEqual({
      ok: false,
      issues: expect.arrayContaining([
        expect.objectContaining({
          code: "invalid-reference",
          path: "style.definition.claimId",
        }),
      ]),
    });
  });

  it("rejects renderer id drift", () => {
    const legacy = getLegacyStyle("modern-saas");
    const fixture = {
      ...createFixture(legacy, "interface-direction"),
      legacyRenderer: {
        ...createFixture(legacy, "interface-direction").legacyRenderer,
        rendererId: "renamed-renderer",
      },
    };

    const result = adaptResearchStyleToDesignStyle(fixture, legacy);

    expect(result).toEqual({
      ok: false,
      issues: expect.arrayContaining([
        expect.objectContaining({ code: "adapter-mismatch" }),
      ]),
    });
  });
});
