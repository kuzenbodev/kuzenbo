import { useEffect, useMemo, useRef } from "react";

import { useCallbackRef } from "../utils";

export interface UseDebouncedCallbackOptions {
  delay: number;
  flushOnUnmount?: boolean;
  leading?: boolean;
}

type AnyFunction = (...args: unknown[]) => unknown;

export type UseDebouncedCallbackReturnValue<T extends AnyFunction> = ((
  ...args: Parameters<T>
) => void) & {
  flush: () => void;
  cancel: () => void;
};

/**
 * Creates a debounced version of a callback with optional leading behavior,
 * plus imperative `flush` and `cancel` controls.
 *
 * @param {T} callback Function to debounce.
 * @param {number | UseDebouncedCallbackOptions} options Debounce delay in milliseconds, or an options object with `delay`, `leading`, and `flushOnUnmount`.
 */
export const useDebouncedCallback = <T extends AnyFunction>(
  callback: T,
  options: number | UseDebouncedCallbackOptions
): UseDebouncedCallbackReturnValue<T> => {
  const resolvedOptions =
    typeof options === "number"
      ? { delay: options, flushOnUnmount: false, leading: false }
      : options;

  const { delay, flushOnUnmount, leading } = resolvedOptions;

  const handleCallback = useCallbackRef(callback);
  const debounceTimerRef = useRef(0);

  const debouncedCallback = useMemo(() => {
    const currentCallback = Object.assign(
      (...args: Parameters<T>) => {
        window.clearTimeout(debounceTimerRef.current);

        const isFirstCall = currentCallback._isFirstCall;
        currentCallback._isFirstCall = false;

        const clearTimer = () => {
          window.clearTimeout(debounceTimerRef.current);
          debounceTimerRef.current = 0;
          currentCallback._isFirstCall = true;
        };

        const flush = () => {
          if (debounceTimerRef.current !== 0) {
            clearTimer();
            handleCallback(...args);
          }
        };

        const cancel = () => {
          clearTimer();
        };

        currentCallback.flush = flush;
        currentCallback.cancel = cancel;

        if (leading && isFirstCall) {
          handleCallback(...args);
          debounceTimerRef.current = window.setTimeout(clearTimer, delay);
          return;
        }

        if (leading && !isFirstCall) {
          debounceTimerRef.current = window.setTimeout(clearTimer, delay);
          return;
        }

        debounceTimerRef.current = window.setTimeout(flush, delay);
      },
      {
        flush: (() => 0) as () => void,
        cancel: (() => 0) as () => void,
        _isFirstCall: true,
      }
    );

    return currentCallback;
  }, [handleCallback, delay, leading]);

  useEffect(
    () => () => {
      if (flushOnUnmount) {
        debouncedCallback.flush();
      } else {
        debouncedCallback.cancel();
      }
    },
    [debouncedCallback, flushOnUnmount]
  );

  return debouncedCallback;
};

export type UseDebouncedCallbackOptionsType = UseDebouncedCallbackOptions;
export type UseDebouncedCallbackReturn<T extends AnyFunction> =
  UseDebouncedCallbackReturnValue<T>;
