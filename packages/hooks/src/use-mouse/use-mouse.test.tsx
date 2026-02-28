import { describe, expect, it } from "bun:test";

import { fireEvent, render, renderHook } from "@testing-library/react";

import { useMouse, useMousePosition } from "./use-mouse";

const Target = () => {
  const { ref, x, y } = useMouse();

  return (
    <div data-testid="target" ref={ref}>
      {`{ x: ${x}, y: ${y} }`}
    </div>
  );
};

describe("@mantine/hook/use-mouse", () => {
  it("returns correct initial position (0, 0)", () => {
    const { result } = renderHook(() => useMouse());

    expect(result.current).toStrictEqual({
      ref: expect.any(Function),
      x: 0,
      y: 0,
    });
  });

  it("updates the position without a ref", () => {
    const { result } = renderHook(() => useMousePosition());
    fireEvent.mouseMove(document, { clientX: 123, clientY: 456 });
    expect(result.current).toStrictEqual({ x: 123, y: 456 });
  });

  it("updates the position", () => {
    const { getByTestId } = render(<Target />);
    const target = getByTestId("target");

    // Work around to pass pageX and pageY to the event
    const customEvent = new MouseEvent("mousemove", {
      clientX: 123,
      clientY: 456,
      bubbles: true,
    }) as MouseEvent & { pageX: number; pageY: number };

    customEvent.pageX = 123;
    customEvent.pageY = 456;

    fireEvent(target, customEvent);

    expect(target.textContent).toBe("{ x: 123, y: 456 }");
  });
});
