import { useEffect, useRef, useState } from "react";

export interface UseIdleOptions {
  events?: (keyof DocumentEventMap)[];
  initialState?: boolean;
}

const DEFAULT_OPTIONS: Required<UseIdleOptions> = {
  events: ["keydown", "mousemove", "touchmove", "click", "scroll", "wheel"],
  initialState: true,
};

/**
 * Tracks user inactivity and marks the state as idle after a timeout.
 * Any configured DOM event resets the timer and marks the state as active.
 *
 * @param {number} timeout Inactivity duration in milliseconds before `idle` becomes `true`.
 * @param {UseIdleOptions} [options] Optional event list and initial idle state.
 */
export const useIdle = (timeout: number, options?: UseIdleOptions) => {
  const { events, initialState } = { ...DEFAULT_OPTIONS, ...options };
  const [idle, setIdle] = useState(initialState);
  const timer = useRef(-1);

  useEffect(() => {
    const handleEvents = () => {
      setIdle(false);

      if (timer.current) {
        window.clearTimeout(timer.current);
      }

      timer.current = window.setTimeout(() => {
        setIdle(true);
      }, timeout);
    };

    for (const event of events) {
      document.addEventListener(event, handleEvents);
    }

    // Start the timer immediately instead of waiting for the first event to happen
    timer.current = window.setTimeout(() => {
      setIdle(true);
    }, timeout);

    return () => {
      for (const event of events) {
        document.removeEventListener(event, handleEvents);
      }
      window.clearTimeout(timer.current);
      timer.current = -1;
    };
  }, [events, timeout]);

  return idle;
};

export type UseIdleOptionsType = UseIdleOptions;
