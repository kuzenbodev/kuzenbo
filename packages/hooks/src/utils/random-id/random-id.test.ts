import { describe, expect, it } from "bun:test";

import { randomId } from "./random-id";

describe("@kuzenbo/hooks/random-id", () => {
  it("returns random id with mantine- prefix", () => {
    expect(randomId()).toContain("mantine-");
    expect(randomId()).toHaveLength(17);
  });

  it("supports custom prefix", () => {
    expect(randomId("my-prefix-")).toContain("my-prefix-");
  });
});
