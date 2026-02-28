import { useState } from "react";

export interface UseUncontrolledOptions<T> {
  /** Value for controlled state */
  value?: T;

  /** Initial value for uncontrolled state */
  defaultValue?: T;

  /** Final value for uncontrolled state when value and defaultValue are not provided */
  finalValue?: T;

  /** Controlled state onChange handler */
  onChange?: (value: T, ...payload: unknown[]) => void;
}

export type UseUncontrolledReturnValue<T> = [
  /** Current value */
  T,

  /** Handler to update the state, passes `value` and `payload` to `onChange` */
  (value: T, ...payload: unknown[]) => void,

  /** True if the state is controlled, false if uncontrolled */
  boolean,
];

/**
 * Unifies controlled and uncontrolled state handling behind a single API.
 *
 * If `value` is provided, the hook works in controlled mode and delegates
 * updates to `onChange`. Otherwise, it stores state internally using
 * `defaultValue` (or `finalValue` as fallback).
 *
 * @param {UseUncontrolledOptions<T>} options State control options.
 * @param {T | undefined} options.value Controlled value. When defined, internal
 * state is ignored.
 * @param {T | undefined} options.defaultValue Initial value used for
 * uncontrolled mode.
 * @param {T | undefined} options.finalValue Fallback value when `defaultValue`
 * is not provided.
 * @param {((value: T, ...payload: unknown[]) => void) | undefined} options.onChange
 * Callback fired whenever the setter is called.
 */
export const useUncontrolled = <T>({
  value,
  defaultValue,
  finalValue,
  onChange,
}: UseUncontrolledOptions<T>): UseUncontrolledReturnValue<T> => {
  const [uncontrolledValue, setUncontrolledValue] = useState(
    defaultValue === undefined ? finalValue : defaultValue
  );
  const controlledOnChange = onChange ?? (() => 0);

  const handleUncontrolledChange = (val: T, ...payload: unknown[]) => {
    setUncontrolledValue(val);
    onChange?.(val, ...payload);
  };

  if (value !== undefined) {
    return [value as T, controlledOnChange, true];
  }

  return [uncontrolledValue as T, handleUncontrolledChange, false];
};

export type UseUncontrolledOptionsType<T> = UseUncontrolledOptions<T>;
export type UseUncontrolledReturnType<T> = UseUncontrolledReturnValue<T>;
