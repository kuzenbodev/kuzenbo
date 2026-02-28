import { useEffect, useRef } from "react";
import type { DependencyList } from "react";

import { shallowEqual } from "../utils/shallow-equal/shallow-equal";

const shallowCompare = (
  prevValue?: DependencyList | null,
  currValue?: DependencyList
) => {
  if (!prevValue || !currValue) {
    return false;
  }

  if (prevValue === currValue) {
    return true;
  }

  if (prevValue.length !== currValue.length) {
    return false;
  }

  for (let i = 0; i < prevValue.length; i += 1) {
    if (!shallowEqual(prevValue[i], currValue[i])) {
      return false;
    }
  }

  return true;
};

const useShallowCompare = (dependencies?: DependencyList) => {
  const ref = useRef<DependencyList | null | undefined>([]);
  const updateRef = useRef<number>(0);

  if (!shallowCompare(ref.current, dependencies)) {
    ref.current = dependencies;
    updateRef.current += 1;
  }

  return updateRef.current;
};

/**
 * Runs an effect callback only when dependencies change by shallow comparison.
 * Each dependency entry is compared with the previous one via `shallowEqual`.
 *
 * @param {() => void} cb Effect callback to run after a shallow dependency change.
 * @param {DependencyList | undefined} dependencies Dependency list to compare shallowly.
 */
export const useShallowEffect = (
  cb: () => void,
  dependencies?: DependencyList
): void => {
  const callbackRef = useRef(cb);
  const shallowCompareHash = useShallowCompare(dependencies);

  useEffect(() => {
    callbackRef.current = cb;
  }, [cb]);

  useEffect(() => {
    callbackRef.current();
  }, [shallowCompareHash]);
};
