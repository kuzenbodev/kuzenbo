import { describe, expect, it } from "bun:test";

import { normalizePlaygroundOptions } from "./normalize-playground-options";

describe("normalizePlaygroundOptions", () => {
  it("normalizes string and object options", () => {
    const options = normalizePlaygroundOptions([
      "sm",
      { label: "medium", value: "md" },
    ]);

    expect(options).toEqual([
      { label: "Sm", value: "sm" },
      { label: "Medium", value: "md" },
    ]);
  });

  it("can preserve original labels", () => {
    const options = normalizePlaygroundOptions(
      [{ label: "XL", value: "xl" }],
      false
    );

    expect(options).toEqual([{ label: "XL", value: "xl" }]);
  });
});
