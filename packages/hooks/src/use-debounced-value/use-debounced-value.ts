import { useCallback, useEffect, useRef, useState } from "react";

export interface UseDebouncedValueOptions {
  leading?: boolean;
}

export type UseDebouncedValueReturnValue<T> = [T, () => void];

/**
 * Returns a debounced mirror of an input value and a function to cancel
 * pending updates.
 *
 * @param {T} value Source value to debounce.
 * @param {number} wait Debounce delay in milliseconds.
 * @param {UseDebouncedValueOptions | undefined} options Optional debounce behavior configuration.
 * @param {boolean | undefined} options.leading When `true`, applies the first change immediately before entering the debounce cooldown.
 */
export const useDebouncedValue = <T>(
  value: T,
  wait: number,
  options?: UseDebouncedValueOptions
): UseDebouncedValueReturnValue<T> => {
  const { leading = false } = options ?? {};

  const [debouncedValue, setDebouncedValue] = useState(value);
  const mountedRef = useRef(false);
  const timeoutRef = useRef<number | null>(null);
  const cooldownRef = useRef(false);

  const cancel = useCallback(() => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!mountedRef.current) {
      return;
    }

    if (!cooldownRef.current && leading) {
      cooldownRef.current = true;
      setDebouncedValue(value);
      return;
    }

    cancel();
    timeoutRef.current = window.setTimeout(() => {
      cooldownRef.current = false;
      setDebouncedValue(value);
    }, wait);
  }, [cancel, leading, value, wait]);

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      cancel();
    };
  }, [cancel]);

  return [debouncedValue, cancel];
};

export type UseDebouncedValueOptionsType = UseDebouncedValueOptions;
export type UseDebouncedValueReturn<T> = UseDebouncedValueReturnValue<T>;
