import { describe, expect, it } from "vitest";

import {
  designStyles,
  legacyDesignStyles,
} from "../../data/designStyles";
import { normalizeCompareSelection } from "./comparison";
import {
  buildDesignStyleCatalog,
  validateResearchDataset,
} from "./dataset";
import { migratedResearchStyles } from "./data/migratedStyles";
import { modernSaasResearchStyle } from "./data/modernSaas";
import type { ResearchStyle } from "./style";

describe("Spec 3 normalized dataset and runtime migration", () => {
  it("validates the complete Modern SaaS normalized record", () => {
    expect(
      validateResearchDataset(
        [modernSaasResearchStyle],
        "styles",
        new Set(legacyDesignStyles.map(({ id }) => id)),
      ).issues,
    ).toEqual([]);
  });

  it("validates all 13 normalized records and keeps incomplete migration honest", () => {
    const normalizedStyles = [modernSaasResearchStyle, ...migratedResearchStyles];

    expect(migratedResearchStyles).toHaveLength(12);
    expect(new Set(normalizedStyles.map(({ id }) => id)).size).toBe(13);
    expect(
      validateResearchDataset(
        normalizedStyles,
        "styles",
        new Set(legacyDesignStyles.map(({ id }) => id)),
      ).issues,
    ).toEqual([]);

    for (const style of migratedResearchStyles) {
      expect(style.review).toEqual({
        contentStatus: "incomplete",
        reviewStatus: "not-reviewed",
        version: "0.2.0-migration",
      });
      expect(style.evaluations.usability.level).toBe("not-evaluated");
      expect(style.evaluations.accessibility.level).toBe("not-evaluated");
      expect(style.evaluations.scalability.level).toBe("not-evaluated");
      expect(style.evaluations["information-density"].level).toBe("not-evaluated");
      expect(style.evaluations["visual-expression"].level).toBe("not-evaluated");
      expect(style.productFit.every(({ level }) => level === "not-evaluated")).toBe(true);
    }
  });

  it("migrates all normalized records while preserving legacy renderer fields", () => {
    expect(designStyles).toHaveLength(legacyDesignStyles.length);

    for (const legacyStyle of legacyDesignStyles) {
      const runtimeStyle = designStyles.find(({ id }) => id === legacyStyle.id);
      const normalizedStyle = [modernSaasResearchStyle, ...migratedResearchStyles]
        .find(({ id }) => id === legacyStyle.id);

      expect(runtimeStyle).toBeDefined();
      expect(normalizedStyle).toBeDefined();
      expect(runtimeStyle).not.toBe(legacyStyle);
      expect(runtimeStyle?.tokenRecipe).toBe(legacyStyle.tokenRecipe);

      expect(runtimeStyle?.summary).toBe(normalizedStyle?.summary);
      expect(runtimeStyle?.distinguishingSignals).toEqual(
        normalizedStyle?.distinguishingSignals.map(({ text }) => text),
      );
      expect(runtimeStyle?.classification).toBe(
        normalizedStyle?.legacyRenderer.classification,
      );
    }
  });

  it("rejects duplicate normalized ids and slugs", () => {
    const duplicate = {
      ...modernSaasResearchStyle,
      name: "Duplicate Modern SaaS",
    } satisfies ResearchStyle;
    const result = validateResearchDataset([
      modernSaasResearchStyle,
      duplicate,
    ]);

    expect(result.issues).toEqual(expect.arrayContaining([
      expect.objectContaining({
        code: "duplicate-id",
        path: "styles[1].id",
      }),
      expect.objectContaining({
        code: "duplicate-id",
        path: "styles[1].slug",
      }),
    ]));
  });

  it("rejects an unknown relationship target", () => {
    const invalid = {
      ...modernSaasResearchStyle,
      relationships: [{
        ...modernSaasResearchStyle.relationships[0],
        targetStyleId: "unknown-style",
      }],
    } as ResearchStyle;

    const result = validateResearchDataset(
      [invalid],
      "styles",
      new Set(legacyDesignStyles.map(({ id }) => id)),
    );

    expect(result.issues).toEqual(expect.arrayContaining([
      expect.objectContaining({
        code: "unknown-style",
        path: "styles[0].relationships[0].targetStyleId",
      }),
    ]));
  });

  it("rejects a normalized record without a legacy renderer fallback", () => {
    const missingRenderer = {
      ...modernSaasResearchStyle,
      id: "missing-renderer",
      slug: "missing-renderer",
      legacyRenderer: {
        ...modernSaasResearchStyle.legacyRenderer,
        rendererId: "missing-renderer",
      },
      relationships: [],
    } as ResearchStyle;

    const result = buildDesignStyleCatalog(
      legacyDesignStyles,
      [missingRenderer],
    );

    expect(result).toEqual({
      ok: false,
      issues: expect.arrayContaining([
        expect.objectContaining({ code: "adapter-mismatch" }),
      ]),
    });
  });

  it("normalizes Compare cardinality, duplicates, and invalid slugs", () => {
    const result = normalizeCompareSelection(
      [
        "modern-saas",
        "minimal-clean",
        "modern-saas",
        "unknown-style",
        "flat-design",
        "glassmorphism",
      ],
      new Set(legacyDesignStyles.map(({ id }) => id)),
    );

    expect(result.styles).toEqual([
      "modern-saas",
      "minimal-clean",
      "flat-design",
    ]);
    expect(result.ready).toBe(true);
    expect(result.rejections).toEqual([
      { slug: "modern-saas", reason: "duplicate" },
      { slug: "unknown-style", reason: "invalid" },
      { slug: "glassmorphism", reason: "over-limit" },
    ]);
  });

  it("keeps Compare below-two selection explicit", () => {
    expect(
      normalizeCompareSelection(
        ["modern-saas", "unknown-style"],
        new Set(legacyDesignStyles.map(({ id }) => id)),
      ),
    ).toEqual({
      styles: ["modern-saas"],
      rejections: [{ slug: "unknown-style", reason: "invalid" }],
      ready: false,
    });
  });
});
