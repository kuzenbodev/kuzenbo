import { useEffect, useRef } from "react";

/**
 * Returns the value from the previous render.
 *
 * @param {T} value - Current value to persist for the next render.
 */
export const usePrevious = <T>(value: T): T | null => {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};
