import { describe, expect, it } from "bun:test";

import { normalizePlaygroundOptions } from "./normalize-playground-options";

describe("normalizePlaygroundOptions", () => {
  it("normalizes string and object options", () => {
    const options = normalizePlaygroundOptions([
      "sm",
      { value: "md", label: "medium" },
    ]);

    expect(options).toEqual([
      { value: "sm", label: "Sm" },
      { value: "md", label: "Medium" },
    ]);
  });

  it("can preserve original labels", () => {
    const options = normalizePlaygroundOptions(
      [{ value: "xl", label: "XL" }],
      false
    );

    expect(options).toEqual([{ value: "xl", label: "XL" }]);
  });
});
