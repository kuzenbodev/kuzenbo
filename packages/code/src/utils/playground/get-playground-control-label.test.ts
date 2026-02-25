import { describe, expect, it } from "bun:test";

import { getPlaygroundControlLabel } from "./get-playground-control-label";

describe("getPlaygroundControlLabel", () => {
  it("transforms camelCase prop names to title-like labels", () => {
    expect(getPlaygroundControlLabel("withBorder")).toBe("With border");
    expect(getPlaygroundControlLabel("size")).toBe("Size");
  });
});
