import type { UseMediaQueryOptions } from "../use-media-query/use-media-query";
import { useMediaQuery } from "../use-media-query/use-media-query";

/**
 * Subscribes to the `prefers-reduced-motion` media query.
 *
 * @param {boolean | undefined} initialValue - Fallback value used before the query can be evaluated.
 * @param {UseMediaQueryOptions | undefined} options - Additional options passed through to `useMediaQuery`.
 */
export const useReducedMotion = (
  initialValue?: boolean,
  options?: UseMediaQueryOptions
) => useMediaQuery("(prefers-reduced-motion: reduce)", initialValue, options);
