import { describe, expect, it } from "vitest";
import { APP_ROUTES, getStyleRoute, getStyleSlug, isAppRoutePath } from "./routes";

describe("typed application routes", () => {
  it("keeps the accepted landing and Explorer paths stable", () => {
    expect(APP_ROUTES).toEqual({
      landing: "/",
      explorer: "/styles",
      styleDetail: "/styles/:slug",
    });
  });

  it("recognizes static routes and style detail paths", () => {
    expect(isAppRoutePath("/")).toBe(true);
    expect(isAppRoutePath("/styles")).toBe(true);
    expect(isAppRoutePath("/styles/modern-saas")).toBe(true);
    expect(isAppRoutePath("/styles/modern-saas/")).toBe(true);
    expect(isAppRoutePath("/unknown")).toBe(false);
  });

  it("builds bookmarkable style URLs and resolves their slugs", () => {
    expect(getStyleRoute("modern-saas")).toBe("/styles/modern-saas");
    expect(getStyleRoute("style with space")).toBe("/styles/style%20with%20space");
    expect(getStyleSlug("/styles/modern-saas")).toBe("modern-saas");
    expect(getStyleSlug("/styles/style%20with%20space/")).toBe("style with space");
    expect(getStyleSlug("/styles/modern-saas/extra")).toBeNull();
  });
});
