import { useRef } from "react";

import { useForceUpdate } from "../use-force-update/use-force-update";

type SetLike<T> = Iterable<T> | ReadonlySet<T> | Set<T>;

export interface UseSetValue<T> extends Set<T> {
  union<U>(other: SetLike<U>): Set<T | U>;
  intersection<U>(other: SetLike<U>): Set<T & U>;
  difference<U>(other: SetLike<U>): Set<T>;
  symmetricDifference<U>(other: SetLike<U>): Set<T | U>;
}

export const readonlySetLikeToSet = <T>(input: SetLike<T>): Set<T> => {
  if (input instanceof Set) {
    return input;
  }

  const result = new Set<T>();
  for (const item of input) {
    result.add(item);
  }

  return result;
};

/**
 * Stores a Set in a stable ref and re-renders the component when the Set is mutated.
 * Extended helpers (`union`, `intersection`, `difference`, `symmetricDifference`)
 * return new Sets without mutating the current one.
 *
 * @param {T[] | undefined} values Optional initial values for the Set.
 */
export const useSet = <T>(values?: T[]): UseSetValue<T> => {
  const setRef = useRef<UseSetValue<T>>(new Set(values) as UseSetValue<T>);
  const forceUpdate = useForceUpdate();

  setRef.current.add = (...args) => {
    const res = Set.prototype.add.apply(setRef.current, args);
    forceUpdate();
    return res as UseSetValue<T>;
  };

  setRef.current.clear = (...args) => {
    Set.prototype.clear.apply(setRef.current, args);
    forceUpdate();
  };

  setRef.current.delete = (...args) => {
    const res = Set.prototype.delete.apply(setRef.current, args);
    forceUpdate();
    return res;
  };

  setRef.current.union = <U>(other: SetLike<U>): Set<T | U> => {
    const result = new Set<T | U>(setRef.current as Set<T>);
    const otherSet = readonlySetLikeToSet(other);
    for (const item of otherSet) {
      result.add(item);
    }
    return result;
  };

  setRef.current.intersection = <U>(other: SetLike<U>): Set<T & U> => {
    const result = new Set<T & U>();
    const otherSet = readonlySetLikeToSet(other);

    for (const item of setRef.current) {
      if (otherSet.has(item as unknown as U)) {
        result.add(item as T & U);
      }
    }
    return result;
  };

  setRef.current.difference = <U>(other: SetLike<U>): Set<T> => {
    const result = new Set<T>();
    const otherSet = readonlySetLikeToSet(other);

    for (const item of setRef.current) {
      if (!otherSet.has(item as unknown as U)) {
        result.add(item);
      }
    }
    return result;
  };

  setRef.current.symmetricDifference = <U>(other: SetLike<U>): Set<T | U> => {
    const result = new Set<T | U>();
    const otherSet = readonlySetLikeToSet(other);

    for (const item of setRef.current) {
      if (!otherSet.has(item as unknown as U)) {
        result.add(item);
      }
    }

    for (const item of otherSet) {
      if (!setRef.current.has(item as unknown as T)) {
        result.add(item as T | U);
      }
    }

    return result;
  };

  return setRef.current;
};
