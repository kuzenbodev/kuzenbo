import { describe, expect, it } from "bun:test";

import { createCliPlaceholderMessage } from "./index";

describe("@kuzenbo/cli placeholder", () => {
  it("returns the placeholder message", () => {
    expect(createCliPlaceholderMessage()).toBe(
      "CLI implementation is intentionally not added yet."
    );
  });
});
