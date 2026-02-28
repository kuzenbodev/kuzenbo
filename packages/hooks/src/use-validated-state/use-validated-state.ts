import { useState } from "react";

export interface UseValidatedStateValue<T> {
  /** Current value */
  value: T;

  /** Last valid value */
  lastValidValue: T | undefined;

  /** True if the current value is valid, false otherwise */
  valid: boolean;
}

export type UseValidatedStateReturnValue<T> = [
  /** Current value */
  UseValidatedStateValue<T>,
  /** Handler to update the state, passes `value` and `payload` to `onChange` */
  (value: T) => void,
];

/**
 * Stores a value together with validation metadata.
 *
 * The hook keeps the current value, tracks whether it is valid, and preserves
 * the last value that passed validation.
 *
 * @param {T} initialValue Initial value used to seed state.
 * @param {(value: T) => boolean} validate Validation function used for every
 * update.
 * @param {boolean | undefined} initialValidationState Optional initial validity
 * override.
 */
export const useValidatedState = <T>(
  initialValue: T,
  validate: (value: T) => boolean,
  initialValidationState?: boolean
): UseValidatedStateReturnValue<T> => {
  const [value, setValue] = useState<T>(initialValue);
  const [lastValidValue, setLastValidValue] = useState<T | undefined>(
    validate(initialValue) ? initialValue : undefined
  );
  const [valid, setValid] = useState<boolean>(
    typeof initialValidationState === "boolean"
      ? initialValidationState
      : validate(initialValue)
  );

  const onChange = (val: T) => {
    if (validate(val)) {
      setLastValidValue(val);
      setValid(true);
    } else {
      setValid(false);
    }

    setValue(val);
  };

  return [{ value, lastValidValue, valid }, onChange] as const;
};

export type UseValidatedStateReturn<T> = UseValidatedStateReturnValue<T>;
