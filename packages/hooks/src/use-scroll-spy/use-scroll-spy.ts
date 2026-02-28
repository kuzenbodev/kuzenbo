import { useCallback, useEffect, useRef, useState } from "react";

import { randomId } from "../utils";

const queryElementById = (id: string) => {
  if (typeof CSS !== "undefined" && typeof CSS.escape === "function") {
    return document.querySelector<HTMLElement>(`#${CSS.escape(id)}`);
  }

  const normalizedId = id.replaceAll(`"`, `\\"`);
  return document.querySelector<HTMLElement>(`[id="${normalizedId}"]`);
};

const getHeadingsData = (
  headings: HTMLElement[],
  getDepth: (element: HTMLElement) => number,
  getValue: (element: HTMLElement) => string
): UseScrollSpyHeadingData[] => {
  const result: UseScrollSpyHeadingData[] = [];

  for (const heading of headings) {
    const id = heading.id || randomId();

    result.push({
      depth: getDepth(heading),
      value: getValue(heading),
      id,
      getNode: () => queryElementById(id) ?? heading,
    });
  }

  return result;
};

const getActiveElement = (rects: DOMRect[], offset = 0) => {
  if (rects.length === 0) {
    return -1;
  }

  let closestIndex = 0;
  let closestDistance = Math.abs((rects[0]?.y ?? 0) - offset);

  for (const [index, rect] of rects.entries()) {
    const distance = Math.abs(rect.y - offset);
    if (distance <= closestDistance) {
      closestDistance = distance;
      closestIndex = index;
    }
  }

  return closestIndex;
};

const getDefaultDepth = (element: HTMLElement) => Number(element.tagName[1]);

const getDefaultValue = (element: HTMLElement) => element.textContent || "";

export interface UseScrollSpyHeadingData {
  /** Heading depth, 1-6 */
  depth: number;

  /** Heading text content value */
  value: string;

  /** Heading id */
  id: string;

  /** Function to get heading node */
  getNode: () => HTMLElement;
}

export interface UseScrollSpyOptions {
  /** Selector to get headings, `'h1, h2, h3, h4, h5, h6'` by default */
  selector?: string;

  /** A function to retrieve depth of heading, by default depth is calculated based on tag name */
  getDepth?: (element: HTMLElement) => number;

  /** A function to retrieve heading value, by default `element.textContent` is used */
  getValue?: (element: HTMLElement) => string;

  /** Host element to attach scroll event listener, if not provided, `window` is used */
  scrollHost?: HTMLElement;

  /** Offset from the top of the viewport to use when determining the active heading, `0` by default */
  offset?: number;
}

export interface UseScrollSpyReturnValue {
  /** Index of the active heading in the `data` array */
  active: number;

  /** Headings data. If not initialize, data is represented by an empty array. */
  data: UseScrollSpyHeadingData[];

  /** True if headings value have been retrieved from the DOM. */
  initialized: boolean;

  /** Function to update headings values after the parent component has mounted. */
  reinitialize: () => void;
}

/**
 * Builds heading metadata from the DOM and tracks which heading is closest to a viewport offset.
 * Useful for table-of-contents UIs that need an active section indicator while scrolling.
 *
 * @param {UseScrollSpyOptions} options - Scroll spy configuration.
 * @param {string | undefined} options.selector - CSS selector used to find heading elements.
 * @param {((element: HTMLElement) => number) | undefined} options.getDepth - Function that maps each heading element to its depth level.
 * @param {((element: HTMLElement) => string) | undefined} options.getValue - Function that maps each heading element to the displayed label.
 * @param {number | undefined} options.offset - Vertical offset used when calculating the active heading.
 * @param {HTMLElement | undefined} options.scrollHost - Scroll container to listen on; defaults to `window`.
 */
export const useScrollSpy = ({
  selector = "h1, h2, h3, h4, h5, h6",
  getDepth = getDefaultDepth,
  getValue = getDefaultValue,
  offset = 0,
  scrollHost,
}: UseScrollSpyOptions = {}): UseScrollSpyReturnValue => {
  const [active, setActive] = useState(-1);
  const [initialized, setInitialized] = useState(false);
  const [data, setData] = useState<UseScrollSpyHeadingData[]>([]);
  const headingsRef = useRef<UseScrollSpyHeadingData[]>([]);

  const handleScroll = useCallback(() => {
    setActive(
      getActiveElement(
        headingsRef.current.map((d) => d.getNode().getBoundingClientRect()),
        offset
      )
    );
  }, [offset]);

  const initialize = useCallback(() => {
    const headings = getHeadingsData(
      [...document.querySelectorAll<HTMLElement>(selector)],
      getDepth,
      getValue
    );
    headingsRef.current = headings;
    setInitialized(true);
    setData(headings);
    setActive(
      getActiveElement(
        headings.map((d) => d.getNode().getBoundingClientRect()),
        offset
      )
    );
  }, [getDepth, getValue, offset, selector]);

  useEffect(() => {
    initialize();
    const currentScrollHost = scrollHost || window;
    currentScrollHost.addEventListener("scroll", handleScroll);
    return () => currentScrollHost.removeEventListener("scroll", handleScroll);
  }, [handleScroll, initialize, scrollHost]);

  return {
    reinitialize: initialize,
    active,
    initialized,
    data,
  };
};

export type UseScrollSpyOptionsType = UseScrollSpyOptions;
export type UseScrollSpyReturnType = UseScrollSpyReturnValue;
