import { describe, expect, it } from "vitest";

import {
  PRODUCT_CONTEXTS,
  type ProductContext,
  validateProductContextSelection,
  validateProductContexts,
} from "./context";
import {
  PRODUCT_PLATFORMS,
  PRODUCT_TYPES,
  USAGE_CONTEXTS,
} from "./vocabulary";

describe("Spec 3 product contexts", () => {
  it("defines one valid canonical record for every product type", () => {
    expect(PRODUCT_CONTEXTS).toHaveLength(PRODUCT_TYPES.length);
    expect(validateProductContexts(PRODUCT_CONTEXTS)).toEqual([]);
    expect(PRODUCT_CONTEXTS.map((context) => context.id)).toEqual(PRODUCT_TYPES);
  });

  it("keeps product type, platform, and usage context separate", () => {
    expect(PRODUCT_TYPES).not.toContain("native-mobile");
    expect(PRODUCT_PLATFORMS).toContain("native-mobile");
    expect(USAGE_CONTEXTS).toContain("accessibility-critical");
    expect(PRODUCT_PLATFORMS).not.toContain("saas-product");
  });

  it("does not embed a style recommendation in canonical contexts", () => {
    for (const context of PRODUCT_CONTEXTS) {
      expect(context).not.toHaveProperty("recommendedStyle");
      expect(context).not.toHaveProperty("score");
    }
  });

  it("reports duplicate and missing product contexts", () => {
    const duplicate = [
      ...PRODUCT_CONTEXTS.slice(0, -1),
      PRODUCT_CONTEXTS[0],
    ] as readonly ProductContext[];

    const issues = validateProductContexts(duplicate);

    expect(issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ code: "duplicate-id" }),
        expect.objectContaining({ code: "missing-product-type" }),
      ]),
    );
  });

  it("reports invalid usage-context hints", () => {
    const invalid = [
      {
        ...PRODUCT_CONTEXTS[0],
        usageContextHints: ["sometimes-busy"],
      },
      ...PRODUCT_CONTEXTS.slice(1),
    ] as unknown as readonly ProductContext[];

    expect(validateProductContexts(invalid)).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          code: "invalid-value",
          path: "contexts[0].usageContextHints[0]",
        }),
      ]),
    );
  });

  it("validates the five canonical product characteristics", () => {
    const invalid = [
      {
        ...PRODUCT_CONTEXTS[0],
        characteristics: {
          ...PRODUCT_CONTEXTS[0].characteristics,
          informationDensity: "sometimes-dense",
        },
      },
      ...PRODUCT_CONTEXTS.slice(1),
    ] as unknown as readonly ProductContext[];

    expect(validateProductContexts(invalid)).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          code: "invalid-level",
          path: "contexts[0].characteristics.informationDensity",
        }),
      ]),
    );
  });

  it("validates product type, platform, and usage context independently", () => {
    expect(
      validateProductContextSelection({
        productType: "saas-product",
        platforms: ["responsive-web"],
        usageContexts: ["frequent-daily-use", "task-heavy"],
      }),
    ).toEqual([]);

    expect(
      validateProductContextSelection({
        productType: "saas-product",
        platforms: ["saas-product"],
        usageContexts: ["responsive-web"],
      } as never),
    ).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: "productContext.platforms[0]",
        }),
        expect.objectContaining({
          path: "productContext.usageContexts[0]",
        }),
      ]),
    );
  });
});
