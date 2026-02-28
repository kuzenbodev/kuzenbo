"use client";

import { useCallback, useEffect, useState } from "react";

import { injectPlaygroundPreviewProps } from "./inject-playground-preview-props";
import type {
  PlaygroundControl,
  PlaygroundControlValueByProp,
  PlaygroundPropKeyFromControls,
  PlaygroundStateFromControls,
} from "./playground-control-model";
import {
  createPlaygroundStateSnapshot,
  resetPlaygroundState,
  setPlaygroundControlValue,
} from "./playground-state-model";
import type {
  PlaygroundStateOptions,
  PlaygroundStateSnapshot,
} from "./playground-state-model";

export interface UsePlaygroundStateOptions<
  TControls extends readonly PlaygroundControl[],
> extends PlaygroundStateOptions<TControls> {}

export interface UsePlaygroundStateResult<
  TControls extends readonly PlaygroundControl[],
> {
  state: PlaygroundStateFromControls<TControls>;
  lockedProps: ReadonlySet<PlaygroundPropKeyFromControls<TControls>>;
  setValue: <TProp extends PlaygroundPropKeyFromControls<TControls>>(
    prop: TProp,
    value: PlaygroundControlValueByProp<TControls, TProp>
  ) => void;
  reset: () => void;
  isLocked: (prop: PlaygroundPropKeyFromControls<TControls>) => boolean;
  getPreviewProps: <TBaseProps extends Record<string, unknown>>(
    baseProps?: TBaseProps
  ) => TBaseProps & PlaygroundStateFromControls<TControls>;
}

const createSnapshot = <TControls extends readonly PlaygroundControl[]>(
  options: UsePlaygroundStateOptions<TControls>
): PlaygroundStateSnapshot<TControls> =>
  createPlaygroundStateSnapshot({
    controls: options.controls,
  });

const resetSnapshot = <TControls extends readonly PlaygroundControl[]>(
  options: UsePlaygroundStateOptions<TControls>
): PlaygroundStateSnapshot<TControls> =>
  resetPlaygroundState({
    controls: options.controls,
  });

const setValueSnapshot = <
  TControls extends readonly PlaygroundControl[],
  TProp extends PlaygroundPropKeyFromControls<TControls>,
>(
  snapshot: PlaygroundStateSnapshot<TControls>,
  prop: TProp,
  value: PlaygroundControlValueByProp<TControls, TProp>
): PlaygroundStateSnapshot<TControls> =>
  setPlaygroundControlValue(snapshot, prop, value);

export const usePlaygroundState = <
  TControls extends readonly PlaygroundControl[],
>(
  options: UsePlaygroundStateOptions<TControls>
): UsePlaygroundStateResult<TControls> => {
  const [snapshot, setSnapshot] = useState<PlaygroundStateSnapshot<TControls>>(
    () => createSnapshot(options)
  );

  useEffect(() => {
    setSnapshot(createSnapshot(options));
  }, [options.controls]);

  const setValue = useCallback<UsePlaygroundStateResult<TControls>["setValue"]>(
    (prop, value) => {
      setSnapshot((current) => setValueSnapshot(current, prop, value));
    },
    []
  );

  const reset = useCallback<
    UsePlaygroundStateResult<TControls>["reset"]
  >(() => {
    setSnapshot(resetSnapshot(options));
  }, [options]);

  const isLocked = useCallback<UsePlaygroundStateResult<TControls>["isLocked"]>(
    (prop) => snapshot.lockedProps.has(prop),
    [snapshot.lockedProps]
  );

  const getPreviewProps = useCallback<
    UsePlaygroundStateResult<TControls>["getPreviewProps"]
  >(
    (baseProps) => injectPlaygroundPreviewProps(baseProps, snapshot.values),
    [snapshot.values]
  );

  return {
    getPreviewProps,
    isLocked,
    lockedProps: snapshot.lockedProps,
    reset,
    setValue,
    state: snapshot.values,
  };
};
