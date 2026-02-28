import { useCallback, useRef } from "react";
import type { Ref } from "react";

type PossibleRef<T> = Ref<T> | undefined;
type RefCleanup = (() => void) | undefined;
type MergedRefCallback<T> = (node: T | null) => RefCleanup;

export const assignRef = <T>(
  ref: PossibleRef<T>,
  value: T | null
): RefCleanup => {
  if (typeof ref === "function") {
    const cleanup = ref(value);
    return typeof cleanup === "function" ? cleanup : undefined;
  }

  if (typeof ref === "object" && ref !== null && "current" in ref) {
    ref.current = value;
  }
};

export const mergeRefs = <T>(
  ...refs: PossibleRef<T>[]
): MergedRefCallback<T> => {
  const cleanupMap = new Map<PossibleRef<T>, Exclude<RefCleanup, void>>();

  return (node: T | null) => {
    for (const ref of refs) {
      const cleanup = assignRef(ref, node);
      if (cleanup) {
        cleanupMap.set(ref, cleanup);
      }
    }

    if (cleanupMap.size === 0) {
      return;
    }

    return () => {
      for (const ref of refs) {
        const cleanup = cleanupMap.get(ref);
        if (cleanup && typeof cleanup === "function") {
          cleanup();
        } else {
          assignRef(ref, null);
        }
      }
      cleanupMap.clear();
    };
  };
};

/**
 * Merges multiple refs into one callback ref so every provided ref receives
 * the same node assignment and cleanup.
 *
 * @param {...PossibleRef<T>} refs Callback refs and/or object refs to keep synchronized.
 */
export const useMergedRef = <T>(
  ...refs: PossibleRef<T>[]
): MergedRefCallback<T> => {
  const mergedRefs = useRef<MergedRefCallback<T>>(mergeRefs(...refs));
  mergedRefs.current = mergeRefs(...refs);

  return useCallback((node: T | null) => mergedRefs.current(node), []);
};
