import { useRef } from "react";

import { useDidUpdate } from "../use-did-update/use-did-update";

export interface UseFocusReturnInput {
  opened: boolean;
  shouldReturnFocus?: boolean;
}

export type UseFocusReturnReturnValue = () => void;

/**
 * Stores the currently focused element when a surface opens and restores focus when it closes.
 * The returned callback can also be called manually to restore focus on demand.
 *
 * @param {UseFocusReturnInput} input Focus return configuration.
 * @param {boolean} input.opened Whether the controlled surface is currently open.
 * @param {boolean | undefined} input.shouldReturnFocus Whether focus should automatically return when `opened` becomes `false`.
 */
export const useFocusReturn = ({
  opened,
  shouldReturnFocus = true,
}: UseFocusReturnInput): UseFocusReturnReturnValue => {
  const lastActiveElement = useRef<HTMLElement>(null);
  const returnFocus = () => {
    if (
      lastActiveElement.current &&
      "focus" in lastActiveElement.current &&
      typeof lastActiveElement.current.focus === "function"
    ) {
      lastActiveElement.current?.focus({ preventScroll: true });
    }
  };

  useDidUpdate(() => {
    let timeout = -1;

    const clearFocusTimeout = (event: KeyboardEvent) => {
      if (event.key === "Tab") {
        window.clearTimeout(timeout);
      }
    };

    document.addEventListener("keydown", clearFocusTimeout);

    if (opened) {
      lastActiveElement.current = document.activeElement as HTMLElement;
    } else if (shouldReturnFocus) {
      timeout = window.setTimeout(returnFocus, 10);
    }

    return () => {
      window.clearTimeout(timeout);
      document.removeEventListener("keydown", clearFocusTimeout);
    };
  }, [opened, shouldReturnFocus]);

  return returnFocus;
};
