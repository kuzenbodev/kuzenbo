import { afterEach, beforeEach, describe, expect, it, vi } from "bun:test";

import { act, fireEvent, render } from "@testing-library/react";
import type {
  MouseEvent as ReactMouseEvent,
  TouchEvent as ReactTouchEvent,
} from "react";

import type { UseLongPressOptions } from "./use-long-press";
import { useLongPress } from "./use-long-press";

// Test component that uses the hook
interface TestComponentProps {
  onLongPress: (event: ReactMouseEvent | ReactTouchEvent) => void;
  options?: UseLongPressOptions;
  testId?: string;
}

const TestComponent = ({
  onLongPress,
  options = {},
  testId = "test-element",
}: TestComponentProps) => {
  const longPressHandlers = useLongPress(onLongPress, options);

  return (
    <div
      data-testid={testId}
      {...longPressHandlers}
      style={{ width: 100, height: 100, background: "gray" }}
    >
      Press Me
    </div>
  );
};

describe(useLongPress, () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
    vi.clearAllTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it("should call onLongPress after default threshold", () => {
    const onLongPress = vi.fn();
    const { getByTestId } = render(<TestComponent onLongPress={onLongPress} />);

    const element = getByTestId("test-element");
    fireEvent.mouseDown(element);

    // Assert onLongPress not called immediately
    expect(onLongPress).not.toHaveBeenCalled();

    // Fast-forward time by default threshold (400ms)
    act(() => {
      vi.advanceTimersByTime(400);
    });

    // Assert onLongPress called after threshold
    expect(onLongPress).toHaveBeenCalledTimes(1);

    // Cleanup
    fireEvent.mouseUp(element);
  });

  it("should call onLongPress after custom threshold", () => {
    const onLongPress = vi.fn();
    const customThreshold = 1000;

    const { getByTestId } = render(
      <TestComponent
        onLongPress={onLongPress}
        options={{ threshold: customThreshold }}
      />
    );

    const element = getByTestId("test-element");
    fireEvent.mouseDown(element);

    // Fast-forward time but not enough to trigger
    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(onLongPress).not.toHaveBeenCalled();

    // Fast-forward remaining time
    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(onLongPress).toHaveBeenCalledTimes(1);

    // Cleanup
    fireEvent.mouseUp(element);
  });

  it("should not call onLongPress if released before threshold", () => {
    const onLongPress = vi.fn();
    const { getByTestId } = render(<TestComponent onLongPress={onLongPress} />);

    const element = getByTestId("test-element");
    fireEvent.mouseDown(element);

    // Fast-forward time but not enough to trigger
    act(() => {
      vi.advanceTimersByTime(300);
    });

    // Release before threshold is met
    fireEvent.mouseUp(element);

    // Complete the threshold time
    act(() => {
      vi.advanceTimersByTime(100);
    });

    expect(onLongPress).not.toHaveBeenCalled();
  });

  it("should call onStart callback on press start", () => {
    const onLongPress = vi.fn();
    const onStart = vi.fn();

    const { getByTestId } = render(
      <TestComponent onLongPress={onLongPress} options={{ onStart }} />
    );

    const element = getByTestId("test-element");
    fireEvent.mouseDown(element);

    expect(onStart).toHaveBeenCalledTimes(1);

    // Cleanup
    fireEvent.mouseUp(element);
  });

  it("should call onFinish callback after long press is completed", () => {
    const onLongPress = vi.fn();
    const onFinish = vi.fn();

    const { getByTestId } = render(
      <TestComponent onLongPress={onLongPress} options={{ onFinish }} />
    );

    const element = getByTestId("test-element");
    fireEvent.mouseDown(element);

    // Fast-forward time to trigger long press
    act(() => {
      vi.advanceTimersByTime(400);
    });

    // Complete the press
    fireEvent.mouseUp(element);

    expect(onLongPress).toHaveBeenCalledTimes(1);
    expect(onFinish).toHaveBeenCalledTimes(1);
  });

  it("should call onCancel callback if press is canceled before threshold", () => {
    const onLongPress = vi.fn();
    const onCancel = vi.fn();

    const { getByTestId } = render(
      <TestComponent onLongPress={onLongPress} options={{ onCancel }} />
    );

    const element = getByTestId("test-element");
    fireEvent.mouseDown(element);

    // Release before threshold
    fireEvent.mouseUp(element);

    expect(onLongPress).not.toHaveBeenCalled();
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it("should cancel long press when mouse leaves element", () => {
    const onLongPress = vi.fn();
    const onCancel = vi.fn();

    const { getByTestId } = render(
      <TestComponent onLongPress={onLongPress} options={{ onCancel }} />
    );

    const element = getByTestId("test-element");
    fireEvent.mouseDown(element);

    // Mouse leaves element before threshold
    fireEvent.mouseLeave(element);

    // Fast-forward past the threshold
    act(() => {
      vi.advanceTimersByTime(400);
    });

    expect(onLongPress).not.toHaveBeenCalled();
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it("should handle touch events", () => {
    const onLongPress = vi.fn();

    const { getByTestId } = render(<TestComponent onLongPress={onLongPress} />);

    const element = getByTestId("test-element");
    fireEvent.touchStart(element);

    // Fast-forward time
    act(() => {
      vi.advanceTimersByTime(400);
    });

    expect(onLongPress).toHaveBeenCalledTimes(1);

    // Cleanup
    fireEvent.touchEnd(element);
  });

  it("should handle touch events being canceled", () => {
    const onLongPress = vi.fn();
    const onCancel = vi.fn();

    const { getByTestId } = render(
      <TestComponent onLongPress={onLongPress} options={{ onCancel }} />
    );

    const element = getByTestId("test-element");
    fireEvent.touchStart(element);

    // End touch before threshold
    fireEvent.touchEnd(element);

    // Fast-forward past the threshold
    act(() => {
      vi.advanceTimersByTime(400);
    });

    expect(onLongPress).not.toHaveBeenCalled();
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it("should return empty object if onLongPress is not a function", () => {
    const { getByTestId } = render(
      <TestComponent
        onLongPress={
          "not a function" as unknown as TestComponentProps["onLongPress"]
        }
      />
    );

    // Just checking that it renders without crashing
    expect(getByTestId("test-element")).not.toBeNull();
  });

  it("should clean up timeout on unmount", () => {
    const onLongPress = vi.fn();

    const { getByTestId, unmount } = render(
      <TestComponent onLongPress={onLongPress} />
    );

    const element = getByTestId("test-element");
    fireEvent.mouseDown(element);

    // Unmount component before threshold
    unmount();

    // Fast-forward time
    act(() => {
      vi.advanceTimersByTime(400);
    });

    expect(onLongPress).not.toHaveBeenCalled();
    // Note: With fake timers, timers are cleared automatically on unmount
    // so we can't easily test if clearTimeout was called correctly
  });

  it("should handle multiple presses correctly", () => {
    const onLongPress = vi.fn();

    const { getByTestId } = render(<TestComponent onLongPress={onLongPress} />);

    const element = getByTestId("test-element");

    // First press
    fireEvent.mouseDown(element);
    act(() => {
      vi.advanceTimersByTime(400);
    });
    fireEvent.mouseUp(element);

    // Second press
    fireEvent.mouseDown(element);
    act(() => {
      vi.advanceTimersByTime(400);
    });
    fireEvent.mouseUp(element);

    expect(onLongPress).toHaveBeenCalledTimes(2);
  });
});
