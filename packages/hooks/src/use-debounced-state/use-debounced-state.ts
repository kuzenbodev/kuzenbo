import type { SetStateAction } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

export interface UseDebouncedStateOptions {
  leading?: boolean;
}

export type UseDebouncedStateReturnValue<T> = [
  T,
  (newValue: SetStateAction<T>) => void,
];

/**
 * Manages local state updates with debounce timing to reduce rapid re-renders.
 * Optionally applies the first update immediately with `leading`.
 *
 * @param {T} defaultValue Initial state value.
 * @param {number} wait Debounce delay in milliseconds.
 * @param {UseDebouncedStateOptions | undefined} options Optional debounce behavior configuration.
 * @param {boolean | undefined} options.leading When `true`, applies the first update immediately before debouncing subsequent updates.
 */
export const useDebouncedState = <T>(
  defaultValue: T,
  wait: number,
  options?: UseDebouncedStateOptions
): UseDebouncedStateReturnValue<T> => {
  const { leading = false } = options ?? {};

  const [value, setValue] = useState(defaultValue);
  const timeoutRef = useRef<number | null>(null);
  const leadingRef = useRef(true);

  const clearDebounce = useCallback(() => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  useEffect(() => clearDebounce, [clearDebounce]);

  const debouncedSetValue = useCallback(
    (newValue: SetStateAction<T>) => {
      clearDebounce();

      if (leadingRef.current && leading) {
        setValue(newValue);
      } else {
        timeoutRef.current = window.setTimeout(() => {
          leadingRef.current = true;
          setValue(newValue);
        }, wait);
      }

      leadingRef.current = false;
    },
    [clearDebounce, leading, wait]
  );

  return [value, debouncedSetValue] as const;
};

export type UseDebouncedStateOptionsType = UseDebouncedStateOptions;
export type UseDebouncedStateReturn<T> = UseDebouncedStateReturnValue<T>;
