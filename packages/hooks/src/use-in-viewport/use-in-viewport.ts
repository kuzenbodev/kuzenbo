import type { RefCallback } from "react";
import { useCallback, useRef, useState } from "react";

export interface UseInViewportReturnValue<T extends HTMLElement = HTMLElement> {
  inViewport: boolean;
  ref: RefCallback<T | null>;
}

/**
 * Reports whether the attached element is currently inside the viewport.
 * Uses `IntersectionObserver` when available and resets state when the ref is cleared.
 *
 */
export const useInViewport = <
  T extends HTMLElement = HTMLElement,
>(): UseInViewportReturnValue<T> => {
  const observer = useRef<IntersectionObserver | null>(null);
  const [inViewport, setInViewport] = useState(false);

  const ref: RefCallback<T | null> = useCallback((node) => {
    if (typeof IntersectionObserver !== "undefined") {
      if (node && !observer.current) {
        observer.current = new IntersectionObserver((entries) => {
          // Entries might be batched (e.g. when scrolling very fast), so we need to use the last entry to get the most recent state
          const lastEntry = entries.at(-1);
          if (lastEntry) {
            setInViewport(lastEntry.isIntersecting);
          }
        });
      } else {
        observer.current?.disconnect();
      }

      if (node) {
        observer.current?.observe(node);
      } else {
        setInViewport(false);
      }
    }
  }, []);

  return { ref, inViewport };
};

export type UseInViewportReturn<T extends HTMLElement = HTMLElement> =
  UseInViewportReturnValue<T>;
