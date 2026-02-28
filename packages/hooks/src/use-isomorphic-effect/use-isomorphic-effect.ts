import { useEffect, useLayoutEffect } from "react";

// UseLayoutEffect will show warning if used during ssr, for example with Next.js
// UseIsomorphicEffect removes it by replacing useLayoutEffect with useEffect during ssr
/**
 * Isomorphic effect helper that uses `useLayoutEffect` in the browser and
 * falls back to `useEffect` during SSR to avoid layout-effect warnings.
 *
 */
export const useIsomorphicEffect =
  typeof document === "undefined" ? useEffect : useLayoutEffect;
