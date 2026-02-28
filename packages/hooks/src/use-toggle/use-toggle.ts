import { useReducer } from "react";
import type { SetStateAction } from "react";

type ToggleState<T> = [T, ...T[]];
type UseToggleAction<T> = (value?: SetStateAction<T>) => void;
export type UseToggleReturnValue<T> = [T, UseToggleAction<T>];

const getInitialState = <T>(
  options: readonly T[] | undefined
): ToggleState<T> => {
  if (options && options.length > 0) {
    return [...options] as ToggleState<T>;
  }

  return [false, true] as unknown as ToggleState<T>;
};

/**
 * Cycles through an ordered list of values and exposes the current value with a
 * function to move to the next value or to a specific target value.
 *
 * When `options` is not provided, it behaves like a boolean toggle between
 * `false` and `true`.
 *
 * @param {readonly T[] | undefined} options Ordered values to cycle through.
 */
export const useToggle = <T = boolean>(
  options?: readonly T[]
): UseToggleReturnValue<T> => {
  const initialState = getInitialState(options);
  const [[option], toggle] = useReducer(
    (state: ToggleState<T>, action: SetStateAction<T>) => {
      const value =
        typeof action === "function"
          ? (action as (previousState: T) => T)(state[0])
          : action;
      const index = Math.abs(state.indexOf(value));

      return [
        ...state.slice(index),
        ...state.slice(0, index),
      ] as ToggleState<T>;
    },
    initialState
  );

  return [option, toggle as UseToggleAction<T>];
};

export type UseToggleReturn<T> = UseToggleReturnValue<T>;
