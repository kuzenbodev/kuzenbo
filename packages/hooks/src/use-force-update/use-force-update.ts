import { useReducer } from "react";

const reducer = (value: number) => (value + 1) % 1_000_000;

/**
 * Forces a component re-render by incrementing an internal reducer value.
 *
 */
export const useForceUpdate = (): (() => void) => {
  const [, update] = useReducer(reducer, 0);
  return update;
};
