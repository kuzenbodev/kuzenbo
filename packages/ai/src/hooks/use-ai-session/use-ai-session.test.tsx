import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "bun:test";

import { useAiSession } from "./use-ai-session";

describe("useAiSession", () => {
  it("tracks active state and messages", () => {
    const { result } = renderHook(() => useAiSession());

    expect(result.current.active).toBe(false);
    expect(result.current.messages).toBe(0);

    act(() => {
      result.current.start();
    });

    expect(result.current.active).toBe(true);
    expect(result.current.messages).toBe(1);
  });
});
