import type { DependencyList, EffectCallback } from "react";
import { useEffect, useRef } from "react";

const didDependenciesChange = (
  current: DependencyList,
  previous: DependencyList
): boolean => {
  if (current.length !== previous.length) {
    return true;
  }

  for (const [index, dependency] of current.entries()) {
    if (!Object.is(dependency, previous[index])) {
      return true;
    }
  }

  return false;
};

/**
 * Runs an effect only after the first render has completed.
 *
 * If `dependencies` is provided, the effect runs only when one of those values
 * changes between updates. If `dependencies` is omitted, the effect runs on
 * every update render.
 *
 * @param {EffectCallback} fn Effect callback to execute after mount.
 * @param {DependencyList | undefined} dependencies Optional dependency list
 * used to detect update changes.
 */
export const useDidUpdate = (
  fn: EffectCallback,
  dependencies?: DependencyList
): void => {
  const mounted = useRef(false);
  const previousDependencies = useRef<DependencyList | null>(null);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      previousDependencies.current = dependencies ?? null;
      return;
    }

    if (dependencies === undefined) {
      return fn();
    }

    const previous = previousDependencies.current;
    previousDependencies.current = dependencies ?? null;

    if (!previous || didDependenciesChange(dependencies, previous)) {
      return fn();
    }
  });
};
