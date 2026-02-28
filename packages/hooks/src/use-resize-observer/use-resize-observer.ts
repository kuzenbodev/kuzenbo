import type { RefCallback } from "react";
import { useCallback, useRef, useState } from "react";

export type ObserverRect = Omit<DOMRectReadOnly, "toJSON">;

const defaultState: ObserverRect = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
};

export type UseResizeObserverReturnValue<T extends HTMLElement = HTMLElement> =
  [RefCallback<T | null>, ObserverRect];

/**
 * Observes size changes of a target element and returns its latest layout rectangle.
 * Observation updates are scheduled in `requestAnimationFrame` to avoid excessive React updates.
 *
 * @param {ResizeObserverOptions | undefined} options - Options forwarded to `ResizeObserver.observe`.
 */
export const useResizeObserver = <T extends HTMLElement = HTMLElement>(
  options?: ResizeObserverOptions
): UseResizeObserverReturnValue<T> => {
  const frameID = useRef(0);
  const [rect, setRect] = useState<ObserverRect>(defaultState);
  const observerRef = useRef<ResizeObserver | null>(null);

  const refCallback: RefCallback<T | null> = useCallback(
    (node) => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }

      if (frameID.current) {
        cancelAnimationFrame(frameID.current);
      }

      if (!node) {
        return;
      }

      observerRef.current = new ResizeObserver((entries) => {
        const [entry] = entries;
        if (!entry) {
          return;
        }

        cancelAnimationFrame(frameID.current);
        frameID.current = requestAnimationFrame(() => {
          const boxSize = entry.borderBoxSize?.[0] || entry.contentBoxSize?.[0];
          if (boxSize) {
            const width = boxSize.inlineSize;
            const height = boxSize.blockSize;
            setRect({
              width,
              height,
              x: entry.contentRect.x,
              y: entry.contentRect.y,
              top: entry.contentRect.top,
              left: entry.contentRect.left,
              bottom: entry.contentRect.bottom,
              right: entry.contentRect.right,
            });
            return;
          }

          setRect(entry.contentRect);
        });
      });
      observerRef.current.observe(node, options);
    },
    [options]
  );

  return [refCallback, rect] as const;
};

export interface UseElementSizeReturnValue<
  T extends HTMLElement = HTMLElement,
> {
  ref: RefCallback<T | null>;
  width: number;
  height: number;
}

/**
 * Convenience wrapper around `useResizeObserver` that exposes only `width` and `height`.
 *
 * @param {ResizeObserverOptions | undefined} options - Options forwarded to `ResizeObserver.observe`.
 */
export const useElementSize = <T extends HTMLElement = HTMLElement>(
  options?: ResizeObserverOptions
): UseElementSizeReturnValue<T> => {
  const [ref, { width, height }] = useResizeObserver<T>(options);
  return { ref, width, height };
};

export type UseResizeObserverReturn<T extends HTMLElement = HTMLElement> =
  UseResizeObserverReturnValue<T>;
export type UseElementSizeReturn<T extends HTMLElement = HTMLElement> =
  UseElementSizeReturnValue<T>;
