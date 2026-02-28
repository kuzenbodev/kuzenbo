import { useCallback, useEffect, useRef } from "react";

export interface UseTimeoutOptions {
  autoInvoke: boolean;
}

export interface UseTimeoutReturnValue<TArgs extends readonly unknown[]> {
  start: (...args: TArgs) => void;
  clear: () => void;
}

/**
 * Provides imperative controls for a one-shot timeout.
 * `start` schedules the timeout only when one is not already active, and `clear`
 * cancels the pending timeout.
 *
 * @param {(...args: TArgs) => void} onTimeout Callback executed when the timeout finishes.
 * @param {number} delay Timeout delay in milliseconds.
 * @param {UseTimeoutOptions | undefined} options Optional hook behavior settings (`autoInvoke` starts automatically on mount).
 */
export const useTimeout = <TArgs extends readonly unknown[]>(
  onTimeout: (...args: TArgs) => void,
  delay: number,
  options?: UseTimeoutOptions
): UseTimeoutReturnValue<TArgs> => {
  const timeoutRef = useRef<number | null>(null);
  const autoInvoke = options?.autoInvoke ?? false;

  const start = useCallback(
    (...args: TArgs) => {
      if (!timeoutRef.current) {
        timeoutRef.current = window.setTimeout(() => {
          onTimeout(...args);
          timeoutRef.current = null;
        }, delay);
      }
    },
    [delay, onTimeout]
  );

  const clear = useCallback(() => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (autoInvoke) {
      start(...([] as unknown as TArgs));
    }

    return clear;
  }, [autoInvoke, clear, start]);

  return { start, clear };
};

export type UseTimeoutOptionsType = UseTimeoutOptions;
export type UseTimeoutReturnType<TArgs extends readonly unknown[]> =
  UseTimeoutReturnValue<TArgs>;
