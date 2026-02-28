import type { RefCallback } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

import { useCallbackRef } from "../utils";

const containsRelatedTarget = (event: FocusEvent): boolean => {
  if (
    event.currentTarget instanceof HTMLElement &&
    event.relatedTarget instanceof HTMLElement
  ) {
    return event.currentTarget.contains(event.relatedTarget);
  }

  return false;
};

export interface UseFocusWithinOptions {
  onFocus?: (event: FocusEvent) => void;
  onBlur?: (event: FocusEvent) => void;
}

export interface UseFocusWithinReturnValue<
  T extends HTMLElement = HTMLElement,
> {
  ref: RefCallback<T | null>;
  focused: boolean;
}

/**
 * Tracks whether focus is currently inside an element and exposes enter/leave callbacks for that focus region.
 * Focus is considered left only when blur moves to a target outside the tracked container.
 *
 * @param {UseFocusWithinOptions} options Optional callbacks fired when focus enters or leaves the container subtree.
 */
export const useFocusWithin = <T extends HTMLElement = HTMLElement>({
  onBlur,
  onFocus,
}: UseFocusWithinOptions = {}): UseFocusWithinReturnValue<T> => {
  const [focused, setFocused] = useState(false);
  const focusedRef = useRef(false);
  const previousNode = useRef<T | null>(null);

  const onFocusRef = useCallbackRef(onFocus);
  const onBlurRef = useCallbackRef(onBlur);

  const _setFocused = useCallback((value: boolean) => {
    setFocused(value);
    focusedRef.current = value;
  }, []);

  const handleFocusIn = useCallback(
    (event: FocusEvent) => {
      if (!focusedRef.current) {
        _setFocused(true);
        onFocusRef(event);
      }
    },
    [_setFocused, onFocusRef]
  );

  const handleFocusOut = useCallback(
    (event: FocusEvent) => {
      if (focusedRef.current && !containsRelatedTarget(event)) {
        _setFocused(false);
        onBlurRef(event);
      }
    },
    [_setFocused, onBlurRef]
  );

  const callbackRef: RefCallback<T | null> = useCallback(
    (node) => {
      if (!node) {
        return;
      }

      if (previousNode.current) {
        previousNode.current.removeEventListener("focusin", handleFocusIn);
        previousNode.current.removeEventListener("focusout", handleFocusOut);
      }

      node.addEventListener("focusin", handleFocusIn);
      node.addEventListener("focusout", handleFocusOut);
      previousNode.current = node;
    },
    [handleFocusIn, handleFocusOut]
  );

  useEffect(
    () => () => {
      if (previousNode.current) {
        previousNode.current.removeEventListener("focusin", handleFocusIn);
        previousNode.current.removeEventListener("focusout", handleFocusOut);
      }
    },
    [handleFocusIn, handleFocusOut]
  );

  return { ref: callbackRef, focused };
};
