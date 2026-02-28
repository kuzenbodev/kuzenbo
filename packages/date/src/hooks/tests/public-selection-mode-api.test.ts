import { describe, expect, it } from "bun:test";

import {
  normalizeDateSelectionMode,
  resolveDateSelectionMode,
  type DatePickerValue,
  type UseDatesInputOptions,
  type UseDatesStateOptions,
  type UseUncontrolledDatesOptions,
} from "../../index";

type ResolveInput = Parameters<typeof resolveDateSelectionMode>[0];

const useDatesInputHasTypeAlias: "type" extends keyof UseDatesInputOptions
  ? true
  : false = false;
const useDatesStateHasTypeAlias: "type" extends keyof UseDatesStateOptions
  ? true
  : false = false;
const useUncontrolledDatesHasTypeAlias: "type" extends keyof UseUncontrolledDatesOptions
  ? true
  : false = false;
const resolveInputHasTypeAlias: ResolveInput extends { type?: unknown }
  ? true
  : false = false;

// @ts-expect-error Public DatePickerValue accepts canonical selection modes only.
const nonCanonicalDatePickerValue: DatePickerValue<"default"> | null = null;

describe("public selection mode API", () => {
  it("keeps hook options canonical", () => {
    expect(nonCanonicalDatePickerValue).toBeNull();
    expect(useDatesInputHasTypeAlias).toBe(false);
    expect(useDatesStateHasTypeAlias).toBe(false);
    expect(useUncontrolledDatesHasTypeAlias).toBe(false);
    expect(resolveInputHasTypeAlias).toBe(false);
  });

  it("normalizes and resolves canonical selection modes", () => {
    const multipleValue: DatePickerValue<"multiple", string> = [
      "2024-06-01",
      "2024-06-02",
    ];

    expect(multipleValue).toEqual(["2024-06-01", "2024-06-02"]);
    expect(normalizeDateSelectionMode()).toBe("single");
    expect(resolveDateSelectionMode("range")).toBe("range");
  });
});
