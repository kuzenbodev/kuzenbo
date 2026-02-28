import type { RefObject } from "react";
import { useEffect, useRef, useState } from "react";

import { useIsomorphicEffect } from "../use-isomorphic-effect/use-isomorphic-effect";
import { useWindowScroll } from "../use-window-scroll/use-window-scroll";

export const isFixed = (current: number, fixedAt: number) => current <= fixedAt;
export const isPinned = (current: number, previous: number) =>
  current <= previous;
export const isReleased = (
  current: number,
  previous: number,
  fixedAt: number
) => !isPinned(current, previous) && !isFixed(current, fixedAt);

export const isPinnedOrReleased = (
  current: number,
  fixedAt: number,
  isCurrentlyPinnedRef: RefObject<boolean>,
  isScrollingUp: boolean,
  onPin?: () => void,
  onRelease?: () => void
) => {
  const isInFixedPosition = isFixed(current, fixedAt);
  if (isInFixedPosition && !isCurrentlyPinnedRef.current) {
    isCurrentlyPinnedRef.current = true;
    onPin?.();
  } else if (
    !isInFixedPosition &&
    isScrollingUp &&
    !isCurrentlyPinnedRef.current
  ) {
    isCurrentlyPinnedRef.current = true;
    onPin?.();
  } else if (!isInFixedPosition && isCurrentlyPinnedRef.current) {
    isCurrentlyPinnedRef.current = false;
    onRelease?.();
  }
};

/**
 * Detects whether the user is currently scrolling upward.
 * Scroll direction updates are paused during active resize bursts to reduce noisy state changes.
 *
 */
export const useScrollDirection = () => {
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    let resizeTimer: NodeJS.Timeout | undefined;

    const onResize = () => {
      setIsResizing(true);
      clearTimeout(resizeTimer);
      // Reset the resizing flag after a timeout.
      resizeTimer = setTimeout(() => {
        setIsResizing(false);
      }, 300);
    };

    const onScroll = () => {
      if (isResizing) {
        // Skip scroll events while resizing is in progress.
        return;
      }
      const currentScrollTop =
        window.scrollY || document.documentElement.scrollTop;
      setIsScrollingUp(currentScrollTop < lastScrollTop);
      setLastScrollTop(currentScrollTop);
    };

    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [lastScrollTop, isResizing]);

  return isScrollingUp;
};

export interface UseHeadroomInput {
  /** Number in px at which element should be fixed */
  fixedAt?: number;

  /** Called when element is pinned */
  onPin?: () => void;

  /** Called when element is at fixed position */
  onFix?: () => void;

  /** Called when element is unpinned */
  onRelease?: () => void;
}

/**
 * Computes headroom visibility state for sticky surfaces based on scroll position and direction.
 * Invokes lifecycle callbacks when the surface becomes fixed, pinned, or released.
 *
 * @param {UseHeadroomInput} options Headroom behavior configuration.
 * @param {number | undefined} options.fixedAt Scroll threshold (in px) where the surface is considered fixed.
 * @param {(() => void) | undefined} options.onPin Called when the surface transitions into pinned state.
 * @param {(() => void) | undefined} options.onFix Called while the surface is at or above the fixed threshold.
 * @param {(() => void) | undefined} options.onRelease Called when the surface transitions out of pinned state.
 */
export const useHeadroom = ({
  fixedAt = 0,
  onPin,
  onFix,
  onRelease,
}: UseHeadroomInput = {}) => {
  const isCurrentlyPinnedRef = useRef(false);
  const isScrollingUp = useScrollDirection();
  const [{ y: scrollPosition }] = useWindowScroll();

  useIsomorphicEffect(() => {
    isPinnedOrReleased(
      scrollPosition,
      fixedAt,
      isCurrentlyPinnedRef,
      isScrollingUp,
      onPin,
      onRelease
    );
  }, [scrollPosition]);

  useIsomorphicEffect(() => {
    if (isFixed(scrollPosition, fixedAt)) {
      onFix?.();
    }
  }, [scrollPosition, fixedAt, onFix]);

  if (isFixed(scrollPosition, fixedAt) || isScrollingUp) {
    return true;
  }

  return false;
};

export type UseHeadroomOptions = UseHeadroomInput;
