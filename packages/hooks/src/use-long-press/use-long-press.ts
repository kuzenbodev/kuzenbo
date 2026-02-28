import type {
  MouseEvent as ReactMouseEvent,
  TouchEvent as ReactTouchEvent,
} from "react";
import { useEffect, useMemo, useRef } from "react";

export interface UseLongPressOptions {
  /** Time in milliseconds to trigger the long press, default is 400ms */
  threshold?: number;

  /** Callback triggered when the long press starts */
  onStart?: (event: ReactMouseEvent | ReactTouchEvent) => void;

  /** Callback triggered when the long press finishes */
  onFinish?: (event: ReactMouseEvent | ReactTouchEvent) => void;

  /** Callback triggered when the long press is canceled */
  onCancel?: (event: ReactMouseEvent | ReactTouchEvent) => void;
}

export interface UseLongPressReturnValue {
  onMouseDown: (event: ReactMouseEvent) => void;
  onMouseUp: (event: ReactMouseEvent) => void;
  onMouseLeave: (event: ReactMouseEvent) => void;
  onTouchStart: (event: ReactTouchEvent) => void;
  onTouchEnd: (event: ReactTouchEvent) => void;
}

const isTouchEvent = (
  event: ReactMouseEvent | ReactTouchEvent
): event is ReactTouchEvent =>
  window.TouchEvent
    ? event.nativeEvent instanceof TouchEvent
    : "touches" in event.nativeEvent;

const isMouseEvent = (
  event: ReactMouseEvent | ReactTouchEvent
): event is ReactMouseEvent => event.nativeEvent instanceof MouseEvent;

/**
 * Creates mouse and touch handlers that trigger a callback when a press lasts
 * longer than the configured threshold.
 *
 * @param {(event: ReactMouseEvent | ReactTouchEvent) => void} onLongPress Callback fired after the press is held past the threshold.
 * @param {UseLongPressOptions} [options] Optional long-press settings for threshold and start/finish/cancel callbacks.
 */
export const useLongPress = (
  onLongPress: (event: ReactMouseEvent | ReactTouchEvent) => void,
  options: UseLongPressOptions = {}
): UseLongPressReturnValue => {
  const { threshold = 400, onStart, onFinish, onCancel } = options;
  const isLongPressActive = useRef(false);
  const isPressed = useRef(false);
  const timeout = useRef<number>(-1);

  useEffect(() => () => window.clearTimeout(timeout.current), []);

  return useMemo(() => {
    if (typeof onLongPress !== "function") {
      return {} as UseLongPressReturnValue;
    }

    const start = (event: ReactMouseEvent | ReactTouchEvent) => {
      if (!isMouseEvent(event) && !isTouchEvent(event)) {
        return;
      }

      if (onStart) {
        onStart(event);
      }

      isPressed.current = true;
      timeout.current = window.setTimeout(() => {
        onLongPress(event);
        isLongPressActive.current = true;
      }, threshold);
    };

    const cancel = (event: ReactMouseEvent | ReactTouchEvent) => {
      if (!isMouseEvent(event) && !isTouchEvent(event)) {
        return;
      }

      if (isLongPressActive.current) {
        if (onFinish) {
          onFinish(event);
        }
      } else if (isPressed.current && onCancel) {
        onCancel(event);
      }

      isLongPressActive.current = false;
      isPressed.current = false;

      if (timeout.current) {
        window.clearTimeout(timeout.current);
      }
    };

    return {
      onMouseDown: start,
      onMouseUp: cancel,
      onMouseLeave: cancel,
      onTouchStart: start,
      onTouchEnd: cancel,
    };
  }, [onLongPress, threshold, onCancel, onFinish, onStart]);
};

export type UseLongPressOptionsType = UseLongPressOptions;
export type UseLongPressReturn = UseLongPressReturnValue;
