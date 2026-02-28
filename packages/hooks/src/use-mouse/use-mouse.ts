import type { RefCallback } from "react";
import { useCallback, useEffect, useState } from "react";

export interface UseMouseReturnValue<T extends HTMLElement = HTMLElement> {
  ref: RefCallback<T | null>;
  x: number;
  y: number;
}

const defaultUseMouseOptions = { resetOnExit: false };

/**
 * Tracks pointer coordinates for a target element and returns a ref to bind
 * that element.
 *
 * Coordinates are reported relative to the element when it is mounted.
 *
 * @param {object} [options] - Hook options.
 * @param {boolean} [options.resetOnExit] - Resets coordinates to
 * `{ x: 0, y: 0 }` when the pointer leaves the element.
 */
export const useMouse = <T extends HTMLElement = HTMLElement>(
  options: { resetOnExit?: boolean } = defaultUseMouseOptions
): UseMouseReturnValue<T> => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const refCallback: RefCallback<T | null> = useCallback(
    (node) => {
      const setMousePosition = (event: Event) => {
        const mouseEvent = event as globalThis.MouseEvent;
        if (node) {
          const rect = node.getBoundingClientRect();

          const x = Math.max(
            0,
            Math.round(mouseEvent.pageX - rect.left - window.scrollX)
          );

          const y = Math.max(
            0,
            Math.round(mouseEvent.pageY - rect.top - window.scrollY)
          );

          setPosition({ x, y });
        } else {
          setPosition({ x: mouseEvent.clientX, y: mouseEvent.clientY });
        }
      };

      const resetMousePosition = () => setPosition({ x: 0, y: 0 });

      node?.addEventListener("mousemove", setMousePosition);
      if (options.resetOnExit) {
        node?.addEventListener("mouseleave", resetMousePosition);
      }

      return () => {
        node?.removeEventListener("mousemove", setMousePosition);
        if (options.resetOnExit) {
          node?.removeEventListener("mouseleave", resetMousePosition);
        }
      };
    },
    [options.resetOnExit]
  );

  return { ref: refCallback, ...position };
};

export interface UseMousePositionReturnValue {
  x: number;
  y: number;
}

/**
 * Tracks global mouse coordinates on the document.
 *
 */
export const useMousePosition = (): UseMousePositionReturnValue => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const setMousePosition = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    document.addEventListener("mousemove", setMousePosition);

    return () => {
      document.removeEventListener("mousemove", setMousePosition);
    };
  }, []);

  return position;
};

export type UseMouseReturn<T extends HTMLElement = HTMLElement> =
  UseMouseReturnValue<T>;
export type UseMousePositionReturn = UseMousePositionReturnValue;
