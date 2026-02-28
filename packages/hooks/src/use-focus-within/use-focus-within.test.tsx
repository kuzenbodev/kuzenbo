import { describe, expect, it } from "bun:test";

import { fireEvent, render } from "@testing-library/react";
import type { FunctionComponent } from "react";
import { useState } from "react";

import { useFocusWithin } from "./use-focus-within";

const Target: FunctionComponent = () => {
  const { ref, focused } = useFocusWithin();

  return (
    <div data-testid="container" ref={ref}>
      <span data-testid="focused">{focused ? "true" : "false"}</span>
      <input data-testid="input" />
    </div>
  );
};

// Test component for stale closure fix (issue #8507)
const StaleClosureTarget: FunctionComponent = () => {
  const [focusCount, setFocusCount] = useState(0);
  const [blurCount, setBlurCount] = useState(0);

  const { ref } = useFocusWithin({
    onFocus: () => {
      setFocusCount(focusCount + 1);
    },
    onBlur: () => {
      setBlurCount(blurCount + 1);
    },
  });

  return (
    <div data-testid="container" ref={ref}>
      <span data-testid="focus-count">{focusCount}</span>
      <span data-testid="blur-count">{blurCount}</span>
      <input data-testid="input" />
    </div>
  );
};

describe("@kuzenbo/hooks/use-focus-within", () => {
  it("changes `focused` on focusin/focusout correctly", () => {
    const { getByTestId } = render(<Target />);
    const input = getByTestId("input");
    const focused = getByTestId("focused");

    expect(focused.textContent).toBe("false");

    fireEvent.focusIn(input);
    expect(focused.textContent).toBe("true");

    fireEvent.focusOut(input);
    expect(focused.textContent).toBe("false");
  });

  it("calls onFocus and onBlur callbacks with latest state (issue #8507)", () => {
    const { getByTestId } = render(<StaleClosureTarget />);
    const input = getByTestId("input");
    const focusCount = getByTestId("focus-count");
    const blurCount = getByTestId("blur-count");

    expect(focusCount.textContent).toBe("0");
    expect(blurCount.textContent).toBe("0");

    // First focus/blur cycle
    fireEvent.focusIn(input);
    expect(focusCount.textContent).toBe("1");

    fireEvent.focusOut(input);
    expect(blurCount.textContent).toBe("1");

    // Second focus/blur cycle - should increment to 2, not stay at 1
    fireEvent.focusIn(input);
    expect(focusCount.textContent).toBe("2");

    fireEvent.focusOut(input);
    expect(blurCount.textContent).toBe("2");

    // Third focus/blur cycle
    fireEvent.focusIn(input);
    expect(focusCount.textContent).toBe("3");

    fireEvent.focusOut(input);
    expect(blurCount.textContent).toBe("3");
  });
});
