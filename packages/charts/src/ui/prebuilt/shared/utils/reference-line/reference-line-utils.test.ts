import { describe, expect, it } from "bun:test";

import { getReferenceLineKey } from "./get-reference-line-key";
import { resolveReferenceLineLabel } from "./resolve-reference-line-label";

describe("reference-line utils", () => {
  it("builds deterministic reference line keys", () => {
    expect(getReferenceLineKey("month", 42, "Goal")).toBe(
      "reference-line-month-42-Goal"
    );
    expect(getReferenceLineKey(undefined, undefined, { custom: true })).toBe(
      "reference-line-x-y-custom-label"
    );
  });

  it("filters unsupported label values", () => {
    expect(resolveReferenceLineLabel(null)).toBeUndefined();
    expect(resolveReferenceLineLabel(false)).toBeUndefined();

    expect(resolveReferenceLineLabel("Target")).toBe("Target");
    expect(resolveReferenceLineLabel(120)).toBe(120);
  });
});
