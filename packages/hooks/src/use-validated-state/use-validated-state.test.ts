import { describe, expect, expectTypeOf, it } from "bun:test";

import { act, renderHook } from "@testing-library/react";

import { useValidatedState } from "./use-validated-state";

describe("@kuzenbo/hooks/use-validated-state", () => {
  it("returns initial value", () => {
    const hookValid = renderHook(() =>
      useValidatedState("test", (val) => val === "test")
    );
    expect(hookValid.result.current[0].lastValidValue).toBe("test");
    expect(hookValid.result.current[0].valid).toBeTruthy();
    expect(hookValid.result.current[0].value).toBe("test");
    expectTypeOf(hookValid.result.current[1]).toBeFunction();

    const hookInvalid = renderHook(() =>
      useValidatedState("test", (val) => val === "tests")
    );
    expect(hookInvalid.result.current[0].lastValidValue).toBeUndefined();
    expect(hookInvalid.result.current[0].valid).toBeFalsy();
    expect(hookInvalid.result.current[0].value).toBe("test");
    expectTypeOf(hookInvalid.result.current[1]).toBeFunction();
  });

  it("returns correct value based on the rule", () => {
    const hook = renderHook(() =>
      useValidatedState("test", (val) => val === "test")
    );
    expect(hook.result.current[0].lastValidValue).toBe("test");
    expect(hook.result.current[0].valid).toBeTruthy();
    expect(hook.result.current[0].value).toBe("test");
    act(() => {
      hook.result.current[1]("tests");
    });
    expect(hook.result.current[0].lastValidValue).toBe("test");
    expect(hook.result.current[0].valid).toBeFalsy();
    expect(hook.result.current[0].value).toBe("tests");
  });
});
