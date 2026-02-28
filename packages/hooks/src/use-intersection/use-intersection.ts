import type { RefCallback } from "react";
import { useCallback, useRef, useState } from "react";

export interface UseIntersectionReturnValue<T> {
  ref: RefCallback<T | null>;
  entry: IntersectionObserverEntry | null;
}

/**
 * Observes intersection changes for the attached element and stores the latest entry.
 * Recreates the observer when options change and clears the entry when no element is attached.
 *
 * @param {IntersectionObserverInit} [options] Optional `IntersectionObserver` configuration.
 */
export const useIntersection = <T extends HTMLElement = HTMLElement>(
  options?: IntersectionObserverInit
): UseIntersectionReturnValue<T> => {
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);

  const observer = useRef<IntersectionObserver | null>(null);

  const ref: RefCallback<T | null> = useCallback(
    (element) => {
      if (observer.current) {
        observer.current.disconnect();
        observer.current = null;
      }

      if (element === null) {
        setEntry(null);
        return;
      }

      observer.current = new IntersectionObserver((entries) => {
        setEntry(entries[0] ?? null);
      }, options);

      observer.current.observe(element);
    },
    [options]
  );

  return { ref, entry };
};

export type UseIntersectionReturn<T extends HTMLElement = HTMLElement> =
  UseIntersectionReturnValue<T>;
