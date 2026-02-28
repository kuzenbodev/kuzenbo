import type { RefCallback } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

import { clamp } from "../utils";

const radiansToDegrees = (radians: number) => radians * (180 / Math.PI);

const getElementCenter = (element: HTMLElement): [number, number] => {
  const rect = element.getBoundingClientRect();
  return [rect.left + rect.width / 2, rect.top + rect.height / 2];
};

const getAngle = (coordinates: [number, number], element: HTMLElement) => {
  const [centerX, centerY] = getElementCenter(element);
  const [coordinateX, coordinateY] = coordinates;
  const x = coordinateX - centerX;
  const y = coordinateY - centerY;
  const deg = radiansToDegrees(Math.atan2(x, y)) + 180;
  return 360 - deg;
};

const toFixed = (value: number, digits: number) =>
  Number.parseFloat(value.toFixed(digits));

const getDigitsAfterDot = (value: number) =>
  value.toString().split(".")[1]?.length || 0;

export const normalizeRadialValue = (degree: number, step: number) => {
  const clamped = clamp(degree, 0, 360);
  const high = Math.ceil(clamped / step);
  const low = Math.round(clamped / step);
  const rounded = high >= clamped / step ? high * step : low * step;
  const nextValue = rounded === 360 ? 0 : rounded;

  return toFixed(nextValue, getDigitsAfterDot(step));
};

export interface UseRadialMoveOptions {
  /** Number by which value is incremented/decremented with mouse and touch events, `0.01` by default */
  step?: number;

  /** Called in `onMouseUp` and `onTouchEnd` events with the current value */
  onChangeEnd?: (value: number) => void;

  /** Called in `onMouseDown` and `onTouchStart` events */
  onScrubStart?: () => void;

  /** Called in `onMouseUp` and `onTouchEnd` events */
  onScrubEnd?: () => void;
}

export interface UseRadialMoveReturnValue<T extends HTMLElement = HTMLElement> {
  /** Ref to be passed to the element that should be used for radial move */
  ref: RefCallback<T | null>;

  /** Indicates whether the radial move is active */
  active: boolean;
}

/**
 * Tracks mouse/touch dragging around an element and reports the current angle as a snapped value.
 * The computed angle is normalized to the `0..360` range, with `360` wrapped to `0`.
 *
 * @param {(value: number) => void} onChange - Called on every pointer move with the normalized radial value.
 * @param {UseRadialMoveOptions} options - Hook configuration.
 * @param {number | undefined} options.step - Snap increment used to round the computed angle.
 * @param {((value: number) => void) | undefined} options.onChangeEnd - Called once when scrubbing ends with the final value.
 * @param {(() => void) | undefined} options.onScrubStart - Called when scrubbing starts.
 * @param {(() => void) | undefined} options.onScrubEnd - Called when scrubbing stops.
 */
export const useRadialMove = <T extends HTMLElement = HTMLElement>(
  onChange: (value: number) => void,
  {
    step = 0.01,
    onChangeEnd,
    onScrubStart,
    onScrubEnd,
  }: UseRadialMoveOptions = {}
): UseRadialMoveReturnValue<T> => {
  const mounted = useRef<boolean>(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    mounted.current = true;
  }, []);

  const refCallback: RefCallback<T | null> = useCallback(
    (node) => {
      const mouseMoveHandlerRef = {
        current: null as ((event: MouseEvent) => void) | null,
      };
      const mouseUpHandlerRef = {
        current: null as ((event: MouseEvent) => void) | null,
      };
      const touchMoveHandlerRef = {
        current: null as ((event: TouchEvent) => void) | null,
      };
      const touchEndHandlerRef = {
        current: null as ((event: TouchEvent) => void) | null,
      };

      const update = (event: MouseEvent, done = false) => {
        if (node) {
          node.style.userSelect = "none";
          const deg = getAngle([event.clientX, event.clientY], node);
          const newValue = normalizeRadialValue(deg, step || 1);

          onChange(newValue);
          if (done) {
            onChangeEnd?.(newValue);
          }
        }
      };

      const endTracking = () => {
        onScrubEnd?.();
        setActive(false);
        if (mouseMoveHandlerRef.current) {
          document.removeEventListener(
            "mousemove",
            mouseMoveHandlerRef.current,
            false
          );
        }
        if (mouseUpHandlerRef.current) {
          document.removeEventListener(
            "mouseup",
            mouseUpHandlerRef.current,
            false
          );
        }
        if (touchMoveHandlerRef.current) {
          document.removeEventListener(
            "touchmove",
            touchMoveHandlerRef.current,
            false
          );
        }
        if (touchEndHandlerRef.current) {
          document.removeEventListener(
            "touchend",
            touchEndHandlerRef.current,
            false
          );
        }
      };

      const handleMouseMove = (event: MouseEvent) => {
        update(event);
      };

      const handleTouchMove = (event: TouchEvent) => {
        event.preventDefault();
        const [touch] = event.touches;
        if (!touch) {
          return;
        }

        update(touch as unknown as MouseEvent);
      };

      const handleMouseUp = (event: MouseEvent) => {
        update(event, true);
        endTracking();
      };

      const handleTouchEnd = (event: TouchEvent) => {
        const [touch] = event.changedTouches;
        if (touch) {
          update(touch as unknown as MouseEvent, true);
        }
        endTracking();
      };

      mouseMoveHandlerRef.current = handleMouseMove;
      mouseUpHandlerRef.current = handleMouseUp;
      touchMoveHandlerRef.current = handleTouchMove;
      touchEndHandlerRef.current = handleTouchEnd;

      const beginTracking = () => {
        onScrubStart?.();
        setActive(true);
        document.addEventListener("mousemove", handleMouseMove, false);
        document.addEventListener("mouseup", handleMouseUp, false);
        document.addEventListener("touchmove", handleTouchMove, {
          passive: false,
        });
        document.addEventListener("touchend", handleTouchEnd, false);
      };

      const onMouseDown = (event: MouseEvent) => {
        beginTracking();
        update(event);
      };

      const handleTouchStart = (event: TouchEvent) => {
        event.preventDefault();
        beginTracking();
        const [touch] = event.touches;
        if (touch) {
          update(touch as unknown as MouseEvent);
        }
      };

      node?.addEventListener("mousedown", onMouseDown);
      node?.addEventListener("touchstart", handleTouchStart, {
        passive: false,
      });

      return () => {
        if (node) {
          node.removeEventListener("mousedown", onMouseDown);
          node.removeEventListener("touchstart", handleTouchStart);
        }

        endTracking();
      };
    },
    [onChange, onChangeEnd, onScrubEnd, onScrubStart, step]
  );

  return { ref: refCallback, active };
};

export type UseRadialMoveOptionsType = UseRadialMoveOptions;
export type UseRadialMoveReturn<T extends HTMLElement = HTMLElement> =
  UseRadialMoveReturnValue<T>;
