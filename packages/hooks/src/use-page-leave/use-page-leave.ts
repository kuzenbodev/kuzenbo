import { useEffect } from "react";

/**
 * Runs a callback when the pointer leaves the page viewport.
 *
 * @param {() => void} onPageLeave - Callback invoked when `mouseleave` fires
 * on the document element.
 */
export const usePageLeave = (onPageLeave: () => void) => {
  useEffect(() => {
    document.documentElement.addEventListener("mouseleave", onPageLeave);
    return () =>
      document.documentElement.removeEventListener("mouseleave", onPageLeave);
  }, [onPageLeave]);
};
