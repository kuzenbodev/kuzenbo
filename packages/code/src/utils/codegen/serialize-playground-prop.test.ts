import { describe, expect, it } from "bun:test";

import { serializePlaygroundProp } from "./serialize-playground-prop";

describe("serializePlaygroundProp", () => {
  it("serializes booleans with jsx shorthand behavior", () => {
    expect(serializePlaygroundProp("disabled", true)).toBe("disabled");
    expect(serializePlaygroundProp("disabled", false)).toBe("disabled={false}");
  });

  it("serializes strings safely", () => {
    expect(serializePlaygroundProp("variant", "outline")).toBe(
      'variant="outline"'
    );
    expect(serializePlaygroundProp("label", 'Say "Hello"')).toBe(
      'label={"Say \\\"Hello\\\""}'
    );
  });

  it("serializes numbers and null values", () => {
    expect(serializePlaygroundProp("radius", 12)).toBe("radius={12}");
    expect(serializePlaygroundProp("value", null)).toBe("value={null}");
  });

  it("returns null for undefined and non-finite numbers", () => {
    expect(serializePlaygroundProp("a")).toBeNull();
    expect(serializePlaygroundProp("b", Number.NaN)).toBeNull();
  });
});
