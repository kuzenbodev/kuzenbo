import { useEffect, useRef, useState } from "react";

import { useThrottledCallbackWithClearTimeout } from "../use-throttled-callback/use-throttled-callback";

/**
 * Keeps local state but throttles state updates triggered through the returned setter.
 * Pending throttled updates are cleared on unmount.
 *
 * @param {T} defaultValue Initial state value.
 * @param {number} wait Throttle window in milliseconds for setter calls.
 */
export const useThrottledState = <T>(defaultValue: T, wait: number) => {
  const [value, setValue] = useState(defaultValue);

  const [setThrottledValue, clearTimeout] =
    useThrottledCallbackWithClearTimeout(setValue, wait);

  const clearTimeoutRef = useRef(clearTimeout);

  useEffect(() => {
    clearTimeoutRef.current = clearTimeout;
  }, [clearTimeout]);

  useEffect(
    () => () => {
      clearTimeoutRef.current();
    },
    []
  );

  return [value, setThrottledValue] as const;
};
