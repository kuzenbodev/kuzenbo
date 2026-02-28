import { useRef } from "react";

import { useIsomorphicEffect } from "../use-isomorphic-effect/use-isomorphic-effect";

const MIME_TYPES: Record<string, string> = {
  ico: "image/x-icon",
  png: "image/png",
  svg: "image/svg+xml",
  gif: "image/gif",
};

/**
 * Replaces the document favicon with the provided URL.
 *
 * On first run, existing icon links are removed and a dedicated favicon link is
 * inserted into `<head>`. The link type is inferred from the file extension.
 *
 * @param {string} url Favicon URL to apply.
 */
export const useFavicon = (url: string): void => {
  const link = useRef<HTMLLinkElement>(null);

  useIsomorphicEffect(() => {
    if (!url) {
      return;
    }

    if (!link.current) {
      const existingElements =
        document.querySelectorAll<HTMLLinkElement>('link[rel*="icon"]');
      for (const element of existingElements) {
        element.remove();
      }

      const element = document.createElement("link");
      element.rel = "shortcut icon";
      link.current = element;
      const headElement = document.head ?? document.querySelector("head");
      if (!headElement) {
        return;
      }

      headElement.append(element);
    }

    const extension = url.split(".").at(-1)?.toLowerCase();
    const mimeType = extension ? MIME_TYPES[extension] : undefined;
    const currentLink = link.current;

    if (!currentLink) {
      return;
    }

    currentLink.setAttribute("type", mimeType ?? "image/x-icon");
    currentLink.setAttribute("href", url);
  }, [url]);
};
