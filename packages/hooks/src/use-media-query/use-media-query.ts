import { useEffect, useState } from "react";

export interface UseMediaQueryOptions {
  getInitialValueInEffect: boolean;
}

const defaultMediaQueryOptions: UseMediaQueryOptions = {
  getInitialValueInEffect: true,
};

const getInitialValue = (query: string, initialValue?: boolean) => {
  if (typeof initialValue === "boolean") {
    return initialValue;
  }

  if (typeof window !== "undefined" && "matchMedia" in window) {
    return window.matchMedia(query).matches;
  }

  return false;
};

/**
 * Subscribes to a CSS media query and reports whether it currently matches.
 * Supports an optional fallback value and deferred initial evaluation for SSR-friendly behavior.
 *
 * @param {string} query Media query string passed to `window.matchMedia`.
 * @param {boolean} [initialValue] Optional fallback value used before the query is evaluated.
 * @param {UseMediaQueryOptions} [options] Controls whether the initial query read happens in an effect.
 */
export const useMediaQuery = (
  query: string,
  initialValue?: boolean,
  { getInitialValueInEffect }: UseMediaQueryOptions = defaultMediaQueryOptions
): boolean => {
  const [matches, setMatches] = useState(
    getInitialValueInEffect ? initialValue : getInitialValue(query)
  );
  useEffect(() => {
    try {
      if ("matchMedia" in window) {
        const mediaQuery = window.matchMedia(query);
        setMatches(mediaQuery.matches);
        const callback = (event: MediaQueryListEvent) =>
          setMatches(event.matches);
        mediaQuery.addEventListener("change", callback);
        return () => {
          mediaQuery.removeEventListener("change", callback);
        };
      }
    } catch {
      // Safari iframe compatibility issue
    }
  }, [query]);

  return matches || false;
};

export type UseMediaQueryOptionsType = UseMediaQueryOptions;
