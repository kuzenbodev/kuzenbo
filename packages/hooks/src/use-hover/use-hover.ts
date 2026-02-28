import type { RefCallback } from "react";
import { useCallback, useRef, useState } from "react";

export interface UseHoverReturnValue<T extends HTMLElement = HTMLElement> {
  hovered: boolean;
  ref: RefCallback<T | null>;
}

/**
 * Tracks whether a referenced element is currently hovered by the pointer.
 *
 */
export const useHover = <
  T extends HTMLElement = HTMLElement,
>(): UseHoverReturnValue<T> => {
  const [hovered, setHovered] = useState(false);
  const previousNode = useRef<HTMLElement | null>(null);

  const handleMouseEnter = useCallback(() => {
    setHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHovered(false);
  }, []);

  const ref: RefCallback<T | null> = useCallback(
    (node) => {
      if (previousNode.current) {
        previousNode.current.removeEventListener(
          "mouseenter",
          handleMouseEnter
        );
        previousNode.current.removeEventListener(
          "mouseleave",
          handleMouseLeave
        );
      }

      if (node) {
        node.addEventListener("mouseenter", handleMouseEnter);
        node.addEventListener("mouseleave", handleMouseLeave);
      }

      previousNode.current = node;

      return () => {
        previousNode.current = null;
      };
    },
    [handleMouseEnter, handleMouseLeave]
  );

  return { ref, hovered };
};

export type UseHoverReturn<T extends HTMLElement = HTMLElement> =
  UseHoverReturnValue<T>;
