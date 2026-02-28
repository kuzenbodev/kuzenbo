import { useEffect, useState } from "react";

import { useWindowEvent } from "../use-window-event/use-window-event";

export interface UseWindowScrollPosition {
  x: number;
  y: number;
}

export type UseWindowScrollTo = (
  position: Partial<UseWindowScrollPosition>
) => void;
export type UseWindowScrollReturnValue = [
  UseWindowScrollPosition,
  UseWindowScrollTo,
];

const getScrollPosition = (): UseWindowScrollPosition => {
  if (typeof window === "undefined") {
    return { x: 0, y: 0 };
  }

  return { x: window.scrollX, y: window.scrollY };
};

const scrollTo = ({ x, y }: Partial<UseWindowScrollPosition>) => {
  if (typeof window !== "undefined") {
    const scrollOptions: ScrollToOptions = { behavior: "smooth" };

    if (typeof x === "number") {
      scrollOptions.left = x;
    }

    if (typeof y === "number") {
      scrollOptions.top = y;
    }

    window.scrollTo(scrollOptions);
  }
};

/**
 * Tracks the current window scroll position and provides a helper to scroll the
 * window with smooth behavior.
 *
 * Position is refreshed on scroll and resize, then initialized after mount.
 *
 */
export const useWindowScroll = (): UseWindowScrollReturnValue => {
  const [position, setPosition] = useState<UseWindowScrollPosition>({
    x: 0,
    y: 0,
  });

  useWindowEvent("scroll", () => setPosition(getScrollPosition()));
  useWindowEvent("resize", () => setPosition(getScrollPosition()));

  useEffect(() => {
    setPosition(getScrollPosition());
  }, []);

  return [position, scrollTo] as const;
};

export type UseWindowScrollPositionType = UseWindowScrollPosition;
export type UseWindowScrollToType = UseWindowScrollTo;
export type UseWindowScrollReturnType = UseWindowScrollReturnValue;
