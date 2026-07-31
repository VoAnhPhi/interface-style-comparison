import { describe, expect, it } from "vitest";
import { APP_ROUTES, isAppRoutePath } from "./routes";

describe("typed application routes", () => {
  it("keeps the accepted landing and Explorer paths stable", () => {
    expect(APP_ROUTES).toEqual({
      landing: "/",
      explorer: "/styles",
    });
  });

  it("recognizes only routes implemented by the current shell", () => {
    expect(isAppRoutePath("/")).toBe(true);
    expect(isAppRoutePath("/styles")).toBe(true);
    expect(isAppRoutePath("/styles/modern-saas")).toBe(false);
    expect(isAppRoutePath("/unknown")).toBe(false);
  });
});
