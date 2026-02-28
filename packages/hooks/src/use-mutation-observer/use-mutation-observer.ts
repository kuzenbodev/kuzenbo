import type { RefCallback } from "react";
import { useCallback, useEffect, useRef } from "react";

/**
 * Observes DOM mutations on the element attached through the returned ref.
 *
 * The observer is recreated when dependencies change and is disconnected during
 * cleanup.
 *
 * @param {MutationCallback} callback - Mutation observer callback invoked with
 * mutation records.
 * @param {MutationObserverInit} options - Native `MutationObserver` options
 * for what to observe.
 */
export const useMutationObserver = <T extends HTMLElement = HTMLElement>(
  callback: MutationCallback,
  options: MutationObserverInit
): RefCallback<T | null> => {
  const observer = useRef<MutationObserver | null>(null);

  const refCallback: RefCallback<T | null> = useCallback(
    (node) => {
      if (observer.current) {
        observer.current.disconnect();
        observer.current = null;
      }

      if (node) {
        observer.current = new MutationObserver(callback);
        observer.current.observe(node, options);
      }

      return () => {
        if (observer.current) {
          observer.current.disconnect();
          observer.current = null;
        }
      };
    },
    [callback, options]
  );

  return refCallback;
};

/**
 * Observes DOM mutations for a specific target element without using a ref.
 *
 * @param {MutationCallback} callback - Mutation observer callback invoked with
 * mutation records.
 * @param {MutationObserverInit} options - Native `MutationObserver` options
 * for what to observe.
 * @param {HTMLElement | (() => HTMLElement) | null} [target] - Target element
 * (or target resolver) to observe.
 */
export const useMutationObserverTarget = (
  callback: MutationCallback,
  options: MutationObserverInit,
  target?: HTMLElement | (() => HTMLElement) | null
): void => {
  const observer = useRef<MutationObserver | null>(null);

  useEffect(() => {
    if (observer.current) {
      observer.current.disconnect();
      observer.current = null;
    }

    const targetElement = typeof target === "function" ? target() : target;

    if (targetElement) {
      observer.current = new MutationObserver(callback);
      observer.current.observe(targetElement, options);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
        observer.current = null;
      }
    };
  }, [callback, options, target]);
};
