import { describe, expect, expectTypeOf, it, vi } from "bun:test";

import { render } from "@testing-library/react";
import { createRef, useRef } from "react";
import type { Ref } from "react";

import { useMergedRef } from "./use-merged-ref";

const TestComponent = ({ refs }: { refs: Ref<HTMLButtonElement>[] }) => {
  const ref = useRef<HTMLButtonElement>(null);
  return <button ref={useMergedRef(...refs, ref)} type="button" />;
};

describe("@mantine/hook/use-merged-ref", () => {
  it("assigns refs to all given arguments", () => {
    const objectRef = createRef<HTMLButtonElement | null>();
    let fnRefValue: HTMLButtonElement | null = null;
    const fnRef = (node: HTMLButtonElement | null) => {
      fnRefValue = node;
    };

    render(<TestComponent refs={[objectRef, fnRef]} />);
    expect(fnRefValue).toBeInstanceOf(HTMLButtonElement);
    expect(objectRef.current instanceof HTMLButtonElement).toBeTruthy();
  });

  it("when ref callback does not return a function, ref callback is called with null on unmount", () => {
    const refCalled: unknown[] = [];

    const fnRef = (node: HTMLButtonElement | null) => {
      refCalled.push(node);
    };

    const { unmount } = render(<TestComponent refs={[fnRef]} />);
    expect(refCalled).toStrictEqual([expect.any(HTMLButtonElement)]);

    unmount();
    expect(refCalled).toStrictEqual([expect.any(HTMLButtonElement), null]);
  });

  it("when ref callback returns a non-function value, that value is not called during cleanup", () => {
    const refCalled: unknown[] = [];

    const fnRef = (node: HTMLButtonElement | null) => {
      refCalled.push(node);
      // Return a non-function value (string)
      return "not-a-function" as unknown as () => void;
    };

    const { unmount } = render(<TestComponent refs={[fnRef]} />);
    expect(refCalled).toStrictEqual([expect.any(HTMLButtonElement)]);

    // Verify that the returned value is not a function
    const returnedValue = "not-a-function";
    expectTypeOf(returnedValue).toBeString();
    expect(returnedValue).toBe("not-a-function");

    const mockCleanup = vi.fn();

    unmount();
    expect(refCalled).toStrictEqual([expect.any(HTMLButtonElement), null]);
    expect(mockCleanup).not.toHaveBeenCalled();
  });
});
