import { useEffect } from "react";

type WindowEventListener<K extends string> = K extends keyof WindowEventMap
  ? (this: Window, ev: WindowEventMap[K]) => void
  : (this: Window, ev: CustomEvent) => void;

/**
 * Registers a window event listener and automatically removes it when
 * dependencies change or the component unmounts.
 *
 * @param {K} type Window event name to subscribe to.
 * @param {WindowEventListener<K>} listener Listener function called when the
 * event fires.
 * @param {boolean | AddEventListenerOptions | undefined} options Optional
 * listener options passed to `addEventListener`.
 */
export const useWindowEvent = <K extends string>(
  type: K,
  listener: WindowEventListener<K>,
  options?: boolean | AddEventListenerOptions
): void => {
  useEffect(() => {
    window.addEventListener(type, listener as EventListener, options);

    return () => {
      window.removeEventListener(type, listener as EventListener, options);
    };
  }, [type, listener, options]);
};
