import { useEffect, useRef, useState } from "react";

import { useThrottledCallbackWithClearTimeout } from "../use-throttled-callback/use-throttled-callback";

/**
 * Returns a throttled mirror of an input value.
 * When the source value changes quickly, updates to the returned value are rate-limited.
 *
 * @param {T} value Source value to mirror.
 * @param {number} wait Throttle window in milliseconds.
 */
export const useThrottledValue = <T>(value: T, wait: number) => {
  const [throttledValue, setThrottledValue] = useState(value);
  const valueRef = useRef(value);

  const [throttledSetValue, clearTimeout] =
    useThrottledCallbackWithClearTimeout(setThrottledValue, wait);
  const clearTimeoutRef = useRef(clearTimeout);

  useEffect(() => {
    if (value !== valueRef.current) {
      valueRef.current = value;
      throttledSetValue(value);
    }
  }, [throttledSetValue, value]);

  useEffect(() => {
    clearTimeoutRef.current = clearTimeout;
  }, [clearTimeout]);

  useEffect(
    () => () => {
      clearTimeoutRef.current();
    },
    []
  );

  return throttledValue;
};
