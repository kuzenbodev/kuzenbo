import type { ChangeEvent } from "react";
import { useState } from "react";

type InputValue<T> = T;
type InputChangeEvent = ChangeEvent<
  HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
>;
type InputOnChange<T> = InputValue<T> | InputChangeEvent | ((current: T) => T);

export const getInputOnChange =
  <T>(
    setValue: (value: T | ((current: T) => T)) => void
  ): ((value: InputOnChange<T>) => void) =>
  (val: InputOnChange<T>) => {
    if (typeof val === "function") {
      setValue(val);
    } else if (
      val !== null &&
      typeof val === "object" &&
      "nativeEvent" in val
    ) {
      const { currentTarget } = val;

      if (
        "type" in currentTarget &&
        currentTarget.type === "checkbox" &&
        "checked" in currentTarget
      ) {
        setValue(currentTarget.checked as T);
      } else {
        setValue(currentTarget.value as T);
      }
    } else {
      setValue(val);
    }
  };

export type UseInputStateReturnValue<T> = [
  T,
  (value: InputOnChange<T>) => void,
];

/**
 * Manages input-like state with a setter that accepts raw values, updater
 * functions, or input change events from text/select/textarea/checkbox fields.
 *
 * @param {T} initialState Initial value for the controlled state.
 */
export const useInputState = <T>(
  initialState: T
): UseInputStateReturnValue<T> => {
  const [value, setValue] = useState<T>(initialState);
  return [value, getInputOnChange<T>(setValue)];
};

export type UseInputStateReturn<T> = UseInputStateReturnValue<T>;
