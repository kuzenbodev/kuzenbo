import { useCallback, useEffect, useRef } from "react";
import type { RefObject } from "react";

import { useReducedMotion } from "../use-reduced-motion/use-reduced-motion";
import { useWindowEvent } from "../use-window-event/use-window-event";

type ScrollAlignment = "start" | "end" | "center";
type ScrollAxis = "x" | "y";

interface UseScrollIntoViewAnimation {
  /** Target element alignment relatively to parent based on current axis */
  alignment?: ScrollAlignment;
}

interface RelativePositionOptions<
  Target extends HTMLElement,
  Parent extends HTMLElement | null,
> {
  axis: ScrollAxis;
  target: Target | null;
  parent: Parent | null;
  alignment: ScrollAlignment;
  offset: number;
  isList: boolean;
}

interface ScrollStartOptions<Parent extends HTMLElement | null> {
  axis: ScrollAxis;
  parent: Parent | null;
}

interface ScrollParamOptions<Parent extends HTMLElement | null> {
  axis: ScrollAxis;
  parent: Parent | null;
  distance: number;
}

const easeInOutQuad = (t: number) =>
  t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

const getRelativePosition = <
  Target extends HTMLElement,
  Parent extends HTMLElement | null,
>({
  axis,
  target,
  parent,
  alignment,
  offset,
  isList,
}: RelativePositionOptions<Target, Parent>): number => {
  if (!target || (!parent && typeof document === "undefined")) {
    return 0;
  }

  const isCustomParent = Boolean(parent);
  const parentElement = parent || document.body;
  const parentPosition = parentElement.getBoundingClientRect();
  const targetPosition = target.getBoundingClientRect();

  const getDiff = (property: "top" | "left"): number =>
    targetPosition[property] - parentPosition[property];

  if (axis === "y") {
    const diff = getDiff("top");
    if (diff === 0) {
      return 0;
    }

    if (alignment === "start") {
      const distance = diff - offset;
      const shouldScroll =
        distance <= targetPosition.height * (isList ? 0 : 1) || !isList;
      return shouldScroll ? distance : 0;
    }

    const parentHeight = isCustomParent
      ? parentPosition.height
      : window.innerHeight;

    if (alignment === "end") {
      const distance = diff + offset - parentHeight + targetPosition.height;
      const shouldScroll =
        distance >= -targetPosition.height * (isList ? 0 : 1) || !isList;
      return shouldScroll ? distance : 0;
    }

    if (alignment === "center") {
      return diff - parentHeight / 2 + targetPosition.height / 2;
    }

    return 0;
  }

  const diff = getDiff("left");
  if (diff === 0) {
    return 0;
  }

  if (alignment === "start") {
    const distance = diff - offset;
    const shouldScroll = distance <= targetPosition.width || !isList;
    return shouldScroll ? distance : 0;
  }

  const parentWidth = isCustomParent ? parentPosition.width : window.innerWidth;
  if (alignment === "end") {
    const distance = diff + offset - parentWidth + targetPosition.width;
    const shouldScroll = distance >= -targetPosition.width || !isList;
    return shouldScroll ? distance : 0;
  }

  if (alignment === "center") {
    return diff - parentWidth / 2 + targetPosition.width / 2;
  }

  return 0;
};

const getScrollStart = <Parent extends HTMLElement | null>({
  axis,
  parent,
}: ScrollStartOptions<Parent>) => {
  if (!parent && typeof document === "undefined") {
    return 0;
  }

  if (axis === "y") {
    if (parent) {
      return parent.scrollTop;
    }
    return document.body.scrollTop + document.documentElement.scrollTop;
  }

  if (parent) {
    return parent.scrollLeft;
  }
  return document.body.scrollLeft + document.documentElement.scrollLeft;
};

const setScrollParam = <Parent extends HTMLElement | null>({
  axis,
  parent,
  distance,
}: ScrollParamOptions<Parent>) => {
  if (!parent && typeof document === "undefined") {
    return;
  }

  if (axis === "y") {
    if (parent) {
      parent.scrollTop = distance;
      return;
    }
    document.body.scrollTop = distance;
    document.documentElement.scrollTop = distance;
    return;
  }

  if (parent) {
    parent.scrollLeft = distance;
    return;
  }
  document.body.scrollLeft = distance;
  document.documentElement.scrollLeft = distance;
};

export interface UseScrollIntoViewOptions {
  /** Callback fired after scroll */
  onScrollFinish?: () => void;

  /** Duration of scroll in milliseconds */
  duration?: number;

  /** Axis of scroll */
  axis?: ScrollAxis;

  /** Custom mathematical easing function */
  easing?: (t: number) => number;

  /** Additional distance between nearest edge and element */
  offset?: number;

  /** Indicator if animation may be interrupted by user scrolling */
  cancelable?: boolean;

  /** Prevents content jumping in scrolling lists with multiple targets */
  isList?: boolean;
}

export interface UseScrollIntoViewReturnValue<
  Target extends HTMLElement = HTMLElement,
  Parent extends HTMLElement | null = null,
> {
  scrollableRef: RefObject<Parent | null>;
  targetRef: RefObject<Target | null>;
  scrollIntoView: (params?: UseScrollIntoViewAnimation) => void;
  cancel: () => void;
}

/**
 * Animates scrolling so a target element becomes visible inside a scroll container or the page.
 * Supports axis selection, custom easing, offsets, and canceling on user interaction.
 *
 * @param {UseScrollIntoViewOptions} options - Scrolling behavior configuration.
 * @param {number | undefined} options.duration - Animation duration in milliseconds.
 * @param {ScrollAxis | undefined} options.axis - Axis to scroll on (`"x"` or `"y"`).
 * @param {(() => void) | undefined} options.onScrollFinish - Called after scrolling finishes.
 * @param {((t: number) => number) | undefined} options.easing - Easing function that maps progress from `0` to `1`.
 * @param {number | undefined} options.offset - Additional offset from the chosen alignment edge.
 * @param {boolean | undefined} options.cancelable - Whether user wheel/touch movement can stop the animation.
 * @param {boolean | undefined} options.isList - Enables list-specific alignment guards to reduce jumpy behavior.
 */
export const useScrollIntoView = <
  Target extends HTMLElement = HTMLElement,
  Parent extends HTMLElement | null = null,
>({
  duration = 1250,
  axis = "y",
  onScrollFinish,
  easing = easeInOutQuad,
  offset = 0,
  cancelable = true,
  isList = false,
}: UseScrollIntoViewOptions = {}): UseScrollIntoViewReturnValue<
  Target,
  Parent
> => {
  const frameID = useRef(0);
  const startTime = useRef(0);
  const shouldStop = useRef(false);

  const scrollableRef = useRef<Parent | null>(null);
  const targetRef = useRef<Target | null>(null);

  const reducedMotion = useReducedMotion();

  const cancel = useCallback((): void => {
    if (frameID.current) {
      cancelAnimationFrame(frameID.current);
    }
  }, []);

  const scrollIntoView = useCallback(
    ({ alignment = "start" }: UseScrollIntoViewAnimation = {}) => {
      shouldStop.current = false;

      if (frameID.current) {
        cancel();
      }

      const start =
        getScrollStart({ parent: scrollableRef.current, axis }) ?? 0;

      const change =
        getRelativePosition({
          parent: scrollableRef.current,
          target: targetRef.current,
          axis,
          alignment,
          offset,
          isList,
        }) - (scrollableRef.current ? 0 : start);

      const animateScroll = () => {
        if (startTime.current === 0) {
          startTime.current = performance.now();
        }

        const now = performance.now();
        const elapsed = now - startTime.current;
        const t = reducedMotion || duration === 0 ? 1 : elapsed / duration;

        setScrollParam({
          parent: scrollableRef.current,
          axis,
          distance: start + change * easing(t),
        });

        if (!shouldStop.current && t < 1) {
          frameID.current = requestAnimationFrame(animateScroll);
          return;
        }

        if (onScrollFinish) {
          onScrollFinish();
        }
        startTime.current = 0;
        frameID.current = 0;
        cancel();
      };

      animateScroll();
    },
    [
      axis,
      cancel,
      duration,
      easing,
      isList,
      offset,
      onScrollFinish,
      reducedMotion,
    ]
  );

  const handleStop = useCallback(() => {
    if (cancelable) {
      shouldStop.current = true;
    }
  }, [cancelable]);

  useWindowEvent("wheel", handleStop, {
    passive: true,
  });

  useWindowEvent("touchmove", handleStop, {
    passive: true,
  });

  useEffect(() => cancel, [cancel]);

  return {
    scrollableRef,
    targetRef,
    scrollIntoView,
    cancel,
  };
};

export type UseScrollIntoViewOptionsType = UseScrollIntoViewOptions;
export type UseScrollIntoViewReturn<
  Target extends HTMLElement = HTMLElement,
  Parent extends HTMLElement | null = null,
> = UseScrollIntoViewReturnValue<Target, Parent>;
