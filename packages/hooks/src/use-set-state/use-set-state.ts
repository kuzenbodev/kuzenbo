import { useCallback, useState } from "react";

export type UseSetStateCallback<T> = (
  state: Partial<T> | ((currentState: T) => Partial<T>)
) => void;

export type UseSetStateReturnValue<T> = [T, UseSetStateCallback<T>];

/**
 * Manages object state with partial updates that are shallow-merged into the current state.
 *
 * @param {T} initialState Initial object used to seed the hook state.
 */
export const useSetState = <T extends Record<string, unknown>>(
  initialState: T
): UseSetStateReturnValue<T> => {
  const [state, setState] = useState(initialState);

  const _setState: UseSetStateCallback<T> = useCallback(
    (statePartial) =>
      setState((current) => ({
        ...current,
        ...(typeof statePartial === "function"
          ? statePartial(current)
          : statePartial),
      })),
    []
  );

  return [state, _setState];
};

export type UseSetStateCallbackType<T> = UseSetStateCallback<T>;
export type UseSetStateReturnType<T> = UseSetStateReturnValue<T>;
