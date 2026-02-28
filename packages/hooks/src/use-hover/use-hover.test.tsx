import { describe, expect, it } from "bun:test";

import { fireEvent, render } from "@testing-library/react";
import type { FunctionComponent } from "react";

import { useHover } from "./use-hover";

const Target: FunctionComponent = () => {
  const { ref, hovered } = useHover();

  return (
    <div data-testid="target" ref={ref}>
      {hovered ? "true" : "false"}
    </div>
  );
};

describe("@kuzenbo/hooks/use-hover", () => {
  it("changes `hovered` on mouseenter/mouseleave correctly", () => {
    const { getByTestId } = render(<Target />);
    const target = getByTestId("target");

    expect(target.textContent).toBe("false");

    fireEvent.mouseEnter(target);
    expect(target.textContent).toBe("true");

    fireEvent.mouseLeave(target);
    expect(target.textContent).toBe("false");
  });
});
