import {
  type DependencyList,
  type EffectCallback,
  useEffect,
  useLayoutEffect,
} from "react";

// UseLayoutEffect will show warning if used during ssr, for example with Next.js
// UseIsomorphicEffect removes it by replacing useLayoutEffect with useEffect during ssr
export const useIsomorphicEffect =
  typeof document === "undefined" ? useEffect : useLayoutEffect;

export type UseIsomorphicEffect = (
  effect: EffectCallback,
  deps?: DependencyList
) => void;
