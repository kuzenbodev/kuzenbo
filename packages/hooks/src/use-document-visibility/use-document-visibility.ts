import { useEffect, useState } from "react";

/**
 * Tracks the current browser tab visibility state.
 *
 * Subscribes to the `visibilitychange` event and keeps the returned value in
 * sync with `document.visibilityState`.
 *
 */
export const useDocumentVisibility = (): DocumentVisibilityState => {
  const [documentVisibility, setDocumentVisibility] =
    useState<DocumentVisibilityState>("visible");

  useEffect(() => {
    setDocumentVisibility(document.visibilityState);
    const listener = () => setDocumentVisibility(document.visibilityState);
    document.addEventListener("visibilitychange", listener);
    return () => document.removeEventListener("visibilitychange", listener);
  }, []);

  return documentVisibility;
};
