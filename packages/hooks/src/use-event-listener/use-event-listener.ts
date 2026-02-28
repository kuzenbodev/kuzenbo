import type { RefCallback } from "react";
import { useCallback, useEffect, useRef } from "react";

/**
 * Creates a ref callback that attaches a DOM event listener to the current
 * element node and cleans it up automatically.
 *
 * When the ref target changes, the previous listener is removed from the old
 * node before attaching to the new node.
 *
 * @param {K} type Name of the DOM event to listen for.
 * @param {(this: HTMLDivElement, event: HTMLElementEventMap[K]) => void} listener
 * Event handler invoked when the event fires.
 * @param {boolean | AddEventListenerOptions | undefined} options Optional
 * native `addEventListener` options.
 */
export const useEventListener = <
  K extends keyof HTMLElementEventMap,
  T extends HTMLElement = HTMLElement,
>(
  type: K,
  listener: (this: HTMLDivElement, event: HTMLElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions
): RefCallback<T | null> => {
  const previousListener = useRef<EventListener | null>(null);
  const previousNode = useRef<T | null>(null);

  const callbackRef: RefCallback<T | null> = useCallback(
    (node) => {
      if (!node) {
        return;
      }

      if (previousNode.current && previousListener.current) {
        previousNode.current.removeEventListener(
          type,
          previousListener.current,
          options
        );
      }

      const eventListener = listener as unknown as EventListener;
      node.addEventListener(type, eventListener, options);
      previousNode.current = node;
      previousListener.current = eventListener;
    },
    [listener, options, type]
  );

  useEffect(
    () => () => {
      if (previousNode.current && previousListener.current) {
        previousNode.current.removeEventListener(
          type,
          previousListener.current,
          options
        );
      }
    },
    [options, type]
  );

  return callbackRef;
};
