"use client";

import { useCallback, useEffect, useState } from "react";

import { injectPlaygroundPreviewProps } from "./inject-playground-preview-props";
import type {
  PlaygroundControl,
  PlaygroundControlValueByProp,
  PlaygroundPropKeyFromControls,
  PlaygroundStateFromControls,
} from "./playground-control-model";
import type {
  PlaygroundPreset,
  PlaygroundPresetsFromControls,
} from "./playground-preset-model";
import {
  applyPlaygroundPreset,
  createPlaygroundStateSnapshot,
  resetPlaygroundState,
  setPlaygroundControlValue,
  type PlaygroundStateOptions,
  type PlaygroundStateSnapshot,
} from "./playground-state-model";

export interface UsePlaygroundStateOptions<
  TControls extends readonly PlaygroundControl[],
  TPresetId extends string = string,
> extends PlaygroundStateOptions<TControls, TPresetId> {
  presets?: PlaygroundPresetsFromControls<TControls, TPresetId>;
}

export interface UsePlaygroundStateResult<
  TControls extends readonly PlaygroundControl[],
  TPresetId extends string = string,
> {
  state: PlaygroundStateFromControls<TControls>;
  activePresetId: TPresetId | null;
  lockedProps: ReadonlySet<PlaygroundPropKeyFromControls<TControls>>;
  setValue: <TProp extends PlaygroundPropKeyFromControls<TControls>>(
    prop: TProp,
    value: PlaygroundControlValueByProp<TControls, TProp>
  ) => void;
  applyPreset: (presetId: TPresetId | null) => void;
  reset: (presetId?: TPresetId | null) => void;
  isLocked: (prop: PlaygroundPropKeyFromControls<TControls>) => boolean;
  getPreviewProps: <TBaseProps extends Record<string, unknown>>(
    baseProps?: TBaseProps
  ) => TBaseProps & PlaygroundStateFromControls<TControls>;
}

const createSnapshot = <
  TControls extends readonly PlaygroundControl[],
  TPresetId extends string,
>(
  options: UsePlaygroundStateOptions<TControls, TPresetId>
): PlaygroundStateSnapshot<TControls, TPresetId> =>
  createPlaygroundStateSnapshot({
    controls: options.controls,
    presets: options.presets,
    initialPresetId: options.initialPresetId ?? null,
  });

const resetSnapshot = <
  TControls extends readonly PlaygroundControl[],
  TPresetId extends string,
>(
  options: UsePlaygroundStateOptions<TControls, TPresetId>,
  presetId?: TPresetId | null
): PlaygroundStateSnapshot<TControls, TPresetId> =>
  resetPlaygroundState(
    {
      controls: options.controls,
      presets: options.presets,
      initialPresetId: options.initialPresetId ?? null,
    },
    presetId
  );

const applyPresetSnapshot = <
  TControls extends readonly PlaygroundControl[],
  TPresetId extends string,
>(
  snapshot: PlaygroundStateSnapshot<TControls, TPresetId>,
  options: UsePlaygroundStateOptions<TControls, TPresetId>,
  presetId: TPresetId | null
): PlaygroundStateSnapshot<TControls, TPresetId> =>
  applyPlaygroundPreset(
    snapshot,
    {
      controls: options.controls,
      presets: options.presets,
    },
    presetId
  );

const setValueSnapshot = <
  TControls extends readonly PlaygroundControl[],
  TPresetId extends string,
  TProp extends PlaygroundPropKeyFromControls<TControls>,
>(
  snapshot: PlaygroundStateSnapshot<TControls, TPresetId>,
  prop: TProp,
  value: PlaygroundControlValueByProp<TControls, TProp>
): PlaygroundStateSnapshot<TControls, TPresetId> =>
  setPlaygroundControlValue(snapshot, prop, value);

export const usePlaygroundState = <
  TControls extends readonly PlaygroundControl[],
  TPresetId extends string = string,
>(
  options: UsePlaygroundStateOptions<TControls, TPresetId>
): UsePlaygroundStateResult<TControls, TPresetId> => {
  const [snapshot, setSnapshot] = useState<
    PlaygroundStateSnapshot<TControls, TPresetId>
  >(() => createSnapshot(options));

  useEffect(() => {
    setSnapshot(createSnapshot(options));
  }, [options.controls, options.presets, options.initialPresetId]);

  const setValue = useCallback<
    UsePlaygroundStateResult<TControls, TPresetId>["setValue"]
  >((prop, value) => {
    setSnapshot((current) => setValueSnapshot(current, prop, value));
  }, []);

  const applyPreset = useCallback<
    UsePlaygroundStateResult<TControls, TPresetId>["applyPreset"]
  >(
    (presetId) => {
      setSnapshot((current) => applyPresetSnapshot(current, options, presetId));
    },
    [options]
  );

  const reset = useCallback<
    UsePlaygroundStateResult<TControls, TPresetId>["reset"]
  >(
    (presetId) => {
      setSnapshot(resetSnapshot(options, presetId));
    },
    [options]
  );

  const isLocked = useCallback<
    UsePlaygroundStateResult<TControls, TPresetId>["isLocked"]
  >((prop) => snapshot.lockedProps.has(prop), [snapshot.lockedProps]);

  const getPreviewProps = useCallback<
    UsePlaygroundStateResult<TControls, TPresetId>["getPreviewProps"]
  >(
    (baseProps) => injectPlaygroundPreviewProps(baseProps, snapshot.values),
    [snapshot.values]
  );

  return {
    state: snapshot.values,
    activePresetId: snapshot.activePresetId,
    lockedProps: snapshot.lockedProps,
    setValue,
    applyPreset,
    reset,
    isLocked,
    getPreviewProps,
  };
};

export type PlaygroundPresetForControls<
  TControls extends readonly PlaygroundControl[],
  TPresetId extends string = string,
> = PlaygroundPreset<PlaygroundStateFromControls<TControls>, TPresetId>;
