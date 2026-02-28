import type { UseMediaQueryOptions } from "../use-media-query/use-media-query";
import { useMediaQuery } from "../use-media-query/use-media-query";

export type UseColorSchemeValue = "dark" | "light";

/**
 * Reads the user's `prefers-color-scheme` media query and returns a normalized
 * scheme value for application theming.
 *
 * @param {UseColorSchemeValue | undefined} initialValue Optional fallback scheme used before the media query resolves.
 * @param {UseMediaQueryOptions | undefined} options Optional media-query behavior options forwarded to `useMediaQuery`.
 */
export const useColorScheme = (
  initialValue?: UseColorSchemeValue,
  options?: UseMediaQueryOptions
): UseColorSchemeValue =>
  useMediaQuery(
    "(prefers-color-scheme: dark)",
    initialValue === "dark",
    options
  )
    ? "dark"
    : "light";
