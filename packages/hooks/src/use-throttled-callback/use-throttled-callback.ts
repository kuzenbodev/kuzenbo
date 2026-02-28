import { useCallback, useEffect, useRef } from "react";

import { useCallbackRef } from "../utils";

/**
 * Creates a throttled callback and a companion function for cancelling the scheduled timer.
 * The callback runs immediately on the first call, then at most once per wait window with
 * the latest queued arguments.
 *
 * @param {(...args: TArgs) => void} callback Function to invoke in a throttled manner.
 * @param {number} wait Throttle window in milliseconds.
 */
export const useThrottledCallbackWithClearTimeout = <
  TArgs extends readonly unknown[],
>(
  callback: (...args: TArgs) => void,
  wait: number
) => {
  const handleCallback = useCallbackRef(callback);
  const latestInArgsRef = useRef<TArgs | null>(null);
  const latestOutArgsRef = useRef<TArgs | null>(null);
  const active = useRef(true);
  const waitRef = useRef(wait);
  const timeoutRef = useRef<number | null>(null);

  const clearTimeout = () => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
    }
  };

  const callThrottledCallback = useCallback(
    (...args: TArgs) => {
      handleCallback(...args);
      latestInArgsRef.current = args;
      latestOutArgsRef.current = args;
      active.current = false;
    },
    [handleCallback]
  );

  const timerCallback = useCallback(() => {
    if (
      latestInArgsRef.current &&
      latestInArgsRef.current !== latestOutArgsRef.current
    ) {
      callThrottledCallback(...latestInArgsRef.current);

      timeoutRef.current = window.setTimeout(timerCallback, waitRef.current);
    } else {
      active.current = true;
    }
  }, [callThrottledCallback]);

  const throttled = useCallback(
    (...args: TArgs) => {
      if (active.current) {
        callThrottledCallback(...args);
        timeoutRef.current = window.setTimeout(timerCallback, waitRef.current);
      } else {
        latestInArgsRef.current = args;
      }
    },
    [callThrottledCallback, timerCallback]
  );

  useEffect(() => {
    waitRef.current = wait;
  }, [wait]);

  return [throttled, clearTimeout] as const;
};

/**
 * Creates a throttled version of a callback.
 *
 * @param {(...args: TArgs) => void} callback Function to invoke in a throttled manner.
 * @param {number} wait Throttle window in milliseconds.
 */
export const useThrottledCallback = <TArgs extends readonly unknown[]>(
  callback: (...args: TArgs) => void,
  wait: number
): ((...args: TArgs) => void) =>
  useThrottledCallbackWithClearTimeout(callback, wait)[0];
