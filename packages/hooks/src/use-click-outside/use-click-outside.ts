import { useEffect, useRef } from "react";

type EventType = MouseEvent | TouchEvent;

const DEFAULT_EVENTS = ["mousedown", "touchstart"];

/**
 * Calls a handler when pointer interactions happen outside the tracked element
 * or outside a provided list of elements.
 *
 * @param {(event: EventType) => void} onOutsideClick Callback invoked for outside `mousedown`/`touchstart` events.
 * @param {string[] | null | undefined} events Document event names to listen to. Defaults to `mousedown` and `touchstart`.
 * @param {(HTMLElement | null)[] | undefined} nodes Optional list of elements to treat as "inside". When provided, these nodes are checked instead of the returned ref.
 */
export const useClickOutside = <T extends HTMLElement = HTMLElement>(
  onOutsideClick: (event: EventType) => void,
  events?: string[] | null,
  nodes?: (HTMLElement | null)[]
) => {
  const ref = useRef<T | null>(null);
  const eventsList = events ?? DEFAULT_EVENTS;

  useEffect(() => {
    const listener = (event: Event) => {
      const { target } = event;

      if (Array.isArray(nodes)) {
        const targetNode = target as Node | null;
        const targetElement = target as Element | null;

        const shouldIgnore =
          !document.body.contains(targetNode) &&
          targetElement?.tagName !== "HTML";

        const shouldTrigger = nodes.every((node) => {
          if (!node) {
            return false;
          }

          return !event.composedPath().includes(node);
        });

        if (shouldTrigger && !shouldIgnore) {
          onOutsideClick(event as EventType);
        }

        return;
      }

      if (ref.current && !ref.current.contains(target as Node)) {
        onOutsideClick(event as EventType);
      }
    };

    for (const eventName of eventsList) {
      document.addEventListener(eventName, listener);
    }

    return () => {
      for (const eventName of eventsList) {
        document.removeEventListener(eventName, listener);
      }
    };
  }, [eventsList, nodes, onOutsideClick]);

  return ref;
};
