import { useCallback, useEffect, useRef, useState } from "react";

export interface UseIntervalOptions {
  /** If set, the interval will start automatically when the component is mounted, `false` by default */
  autoInvoke?: boolean;
}

export interface UseIntervalReturnValue {
  /** Starts the interval */
  start: () => void;

  /** Stops the interval */
  stop: () => void;

  /** Toggles the interval */
  toggle: () => void;

  /** Indicates if the interval is active */
  active: boolean;
}

/**
 * Runs a callback on a managed interval and exposes imperative controls.
 * The callback reference stays fresh across renders without restarting the interval.
 *
 * @param {() => void} fn Callback to execute on each tick.
 * @param {number} interval Tick interval in milliseconds.
 * @param {UseIntervalOptions} [options] Optional behavior flags, including `autoInvoke`.
 */
export const useInterval = (
  fn: () => void,
  interval: number,
  { autoInvoke = false }: UseIntervalOptions = {}
): UseIntervalReturnValue => {
  const [active, setActive] = useState(false);
  const intervalRef = useRef<ReturnType<typeof globalThis.setInterval> | null>(
    null
  );
  const fnRef = useRef(fn);

  const start = useCallback(() => {
    if (intervalRef.current === null) {
      intervalRef.current = globalThis.setInterval(() => {
        fnRef.current();
      }, interval);
    }
    setActive(true);
  }, [interval]);

  const stop = useCallback(() => {
    if (intervalRef.current !== null) {
      globalThis.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setActive(false);
  }, []);

  const toggle = useCallback(() => {
    if (active) {
      stop();
    } else {
      start();
    }
  }, [active, start, stop]);

  useEffect(() => {
    fnRef.current = fn;
  }, [fn]);

  useEffect(() => stop, [stop]);

  useEffect(() => {
    if (autoInvoke) {
      start();
    }
  }, [autoInvoke, start]);

  return { start, stop, toggle, active };
};

export type UseIntervalOptionsType = UseIntervalOptions;
export type UseIntervalReturn = UseIntervalReturnValue;
