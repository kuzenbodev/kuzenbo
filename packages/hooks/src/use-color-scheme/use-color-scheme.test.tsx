import { beforeEach, describe, expect, it, vi } from "bun:test";

import { render } from "@testing-library/react";

import { useColorScheme } from "./use-color-scheme";

describe("@kuzenbo/hooks/use-color-scheme", () => {
  let trace: ReturnType<typeof vi.fn<(colorScheme: string) => void>>;
  const mockMatchMedia = vi.fn().mockReturnValue({
    matches: true,
    media: "",
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
  });
  const retainMatchMedia = window.matchMedia;

  beforeEach(() => {
    trace = vi.fn();
    window.matchMedia = retainMatchMedia;
  });

  const expectTraceCall = (index: number, value: "dark" | "light"): void => {
    expect(trace.mock.calls[index]?.[0]).toBe(value);
  };

  const WrapperComponent = ({
    initialValue,
    getInitialValueInEffect = true,
  }: {
    initialValue?: "light" | "dark";
    getInitialValueInEffect?: boolean;
  }) => {
    const colorScheme = useColorScheme(initialValue, {
      getInitialValueInEffect,
    });
    trace(colorScheme);
    return colorScheme;
  };

  it("correctly returns initial dark state state without useEffect", () => {
    window.matchMedia = mockMatchMedia;
    render(
      <WrapperComponent initialValue="dark" getInitialValueInEffect={false} />
    );
    expect(trace).toHaveBeenCalledTimes(1);
    expectTraceCall(0, "dark");
  });

  it("correctly returns initial light state with useEffect", () => {
    render(<WrapperComponent initialValue="dark" getInitialValueInEffect />);
    expect(trace).toHaveBeenCalledTimes(2);
    expectTraceCall(0, "dark");
    expectTraceCall(1, "light");
  });

  it("correctly returns initial dark state with useEffect", () => {
    window.matchMedia = mockMatchMedia;
    render(<WrapperComponent initialValue="dark" getInitialValueInEffect />);
    expect(trace).toHaveBeenCalledTimes(1);
    expectTraceCall(0, "dark");
  });

  it("correctly returns initial light state with default props", () => {
    render(<WrapperComponent />);
    expect(trace).toHaveBeenCalledTimes(1);
    expectTraceCall(0, "light");
  });

  it("correctly returns initial dark state with default props", () => {
    window.matchMedia = mockMatchMedia;
    render(<WrapperComponent />);
    expect(trace).toHaveBeenCalledTimes(2);
    expectTraceCall(0, "light");
    expectTraceCall(1, "dark");
  });
});
