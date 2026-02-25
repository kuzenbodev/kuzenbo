import { describe, expect, it } from "bun:test";

import { resolvePieRadii } from "./resolve-pie-radii";

describe("resolvePieRadii", () => {
  it("returns defaults for pie radii", () => {
    expect(resolvePieRadii()).toEqual({
      innerRadius: 0,
      outerRadius: "80%",
    });
  });

  it("resolves numeric size values", () => {
    expect(resolvePieRadii({ size: 72 })).toEqual({
      innerRadius: 0,
      outerRadius: 72,
    });
  });

  it("resolves percentage size values", () => {
    expect(resolvePieRadii({ size: "74%" })).toEqual({
      innerRadius: 0,
      outerRadius: "74%",
    });
  });

  it("keeps explicit string sizes when they are not numeric percentages", () => {
    expect(resolvePieRadii({ size: "calc(100% - 16px)" })).toEqual({
      innerRadius: 0,
      outerRadius: "calc(100% - 16px)",
    });
  });
});
