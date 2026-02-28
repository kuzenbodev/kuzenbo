import { useIsomorphicEffect } from "../use-isomorphic-effect/use-isomorphic-effect";

/**
 * Updates `document.title` when a non-empty title value is provided.
 *
 * The incoming value is trimmed before assignment and ignored when it resolves
 * to an empty string.
 *
 * @param {string} title Next document title.
 */
export const useDocumentTitle = (title: string) => {
  useIsomorphicEffect(() => {
    if (typeof title === "string" && title.trim().length > 0) {
      document.title = title.trim();
    }
  }, [title]);
};
