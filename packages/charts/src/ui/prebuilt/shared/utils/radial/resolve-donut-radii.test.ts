import { describe, expect, it } from "bun:test";

import { resolveDonutRadii } from "./resolve-donut-radii";

describe("resolveDonutRadii", () => {
  it("returns percentage defaults that match donut fallback behavior", () => {
    expect(resolveDonutRadii()).toEqual({
      innerRadius: "60%",
      outerRadius: "85%",
    });
  });

  it("resolves numeric size and thickness to numeric radii", () => {
    expect(resolveDonutRadii({ size: 90, thickness: 20 })).toEqual({
      innerRadius: 70,
      outerRadius: 90,
    });
  });

  it("resolves percentage size and thickness to percentage radii", () => {
    expect(resolveDonutRadii({ size: "92%", thickness: 17 })).toEqual({
      innerRadius: "75%",
      outerRadius: "92%",
    });
  });

  it("uses safe fallback inner radius for unsupported size formats", () => {
    expect(resolveDonutRadii({ size: "calc(100% - 20px)" })).toEqual({
      innerRadius: "60%",
      outerRadius: "calc(100% - 20px)",
    });
  });
});
