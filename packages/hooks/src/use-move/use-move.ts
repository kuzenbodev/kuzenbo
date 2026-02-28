import type { RefCallback } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

import { clamp } from "../utils";

export interface UseMovePosition {
  x: number;
  y: number;
}

export const clampUseMovePosition = (position: UseMovePosition) => ({
  x: clamp(position.x, 0, 1),
  y: clamp(position.y, 0, 1),
});

export interface UseMoveHandlers {
  onScrubStart?: () => void;
  onScrubEnd?: () => void;
}

export interface UseMoveReturnValue<T extends HTMLElement = HTMLElement> {
  ref: RefCallback<T | null>;
  active: boolean;
}

/**
 * Enables pointer/touch scrubbing on an element and reports normalized
 * coordinates.
 *
 * Values passed to `onChange` are clamped to `0..1`; horizontal values are
 * mirrored in `rtl` mode.
 *
 * @param {(value: UseMovePosition) => void} onChange - Called on pointer
 * movement with normalized `{ x, y }` values.
 * @param {UseMoveHandlers} [handlers] - Optional callbacks fired when
 * scrubbing starts or ends.
 * @param {"ltr" | "rtl"} [dir] - Horizontal direction used to interpret
 * `x` values (`ltr` or `rtl`).
 */
export const useMove = <T extends HTMLElement = HTMLElement>(
  onChange: (value: UseMovePosition) => void,
  handlers?: UseMoveHandlers,
  dir: "ltr" | "rtl" = "ltr"
): UseMoveReturnValue<T> => {
  const mounted = useRef<boolean>(false);
  const isSliding = useRef(false);
  const frame = useRef(0);
  const [active, setActive] = useState(false);

  useEffect(() => {
    mounted.current = true;

    return () => {
      mounted.current = false;
    };
  }, []);

  const refCallback: RefCallback<T | null> = useCallback(
    (node) => {
      const onScrub = ({ x, y }: UseMovePosition) => {
        cancelAnimationFrame(frame.current);

        frame.current = requestAnimationFrame(() => {
          if (mounted.current && node) {
            node.style.userSelect = "none";
            const rect = node.getBoundingClientRect();

            if (rect.width && rect.height) {
              const normalizedX = clamp((x - rect.left) / rect.width, 0, 1);
              onChange({
                x: dir === "ltr" ? normalizedX : 1 - normalizedX,
                y: clamp((y - rect.top) / rect.height, 0, 1),
              });
            }
          }
        });
      };

      const onMouseMove = (event: MouseEvent) => {
        onScrub({ x: event.clientX, y: event.clientY });
      };

      const onTouchMove = (event: TouchEvent) => {
        if (event.cancelable) {
          event.preventDefault();
        }

        const [touch] = event.changedTouches;
        if (!touch) {
          return;
        }

        onScrub({
          x: touch.clientX,
          y: touch.clientY,
        });
      };

      const stopScrubbing = () => {
        if (isSliding.current && mounted.current) {
          isSliding.current = false;
          setActive(false);

          document.removeEventListener("mousemove", onMouseMove);
          document.removeEventListener("mouseup", stopScrubbing);
          document.removeEventListener("touchmove", onTouchMove);
          document.removeEventListener("touchend", stopScrubbing);

          setTimeout(() => {
            if (handlers?.onScrubEnd) {
              handlers.onScrubEnd();
            }
          }, 0);
        }
      };

      const startScrubbing = () => {
        if (!isSliding.current && mounted.current) {
          isSliding.current = true;

          if (handlers?.onScrubStart) {
            handlers.onScrubStart();
          }

          setActive(true);
          document.addEventListener("mousemove", onMouseMove);
          document.addEventListener("mouseup", stopScrubbing);
          document.addEventListener("touchmove", onTouchMove, {
            passive: false,
          });
          document.addEventListener("touchend", stopScrubbing);
        }
      };

      const onMouseDown = (event: MouseEvent) => {
        startScrubbing();
        event.preventDefault();
        onMouseMove(event);
      };

      const onTouchStart = (event: TouchEvent) => {
        if (event.cancelable) {
          event.preventDefault();
        }

        startScrubbing();
        onTouchMove(event);
      };

      node?.addEventListener("mousedown", onMouseDown);
      node?.addEventListener("touchstart", onTouchStart, { passive: false });

      return () => {
        if (node) {
          node.removeEventListener("mousedown", onMouseDown);
          node.removeEventListener("touchstart", onTouchStart);
        }

        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", stopScrubbing);
        document.removeEventListener("touchmove", onTouchMove);
        document.removeEventListener("touchend", stopScrubbing);
      };
    },
    [dir, handlers, onChange]
  );

  return { ref: refCallback, active };
};

export type UseMoveOptions = UseMoveHandlers;
export type UseMoveReturn<T extends HTMLElement> = UseMoveReturnValue<T>;
