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

export interface PlaygroundStateOptions<
  TControls extends readonly PlaygroundControl[],
  TPresetId extends string = string,
> {
  controls: TControls;
  presets?: PlaygroundPresetsFromControls<TControls, TPresetId>;
  initialPresetId?: TPresetId | null;
}

export interface PlaygroundStateSnapshot<
  TControls extends readonly PlaygroundControl[],
  TPresetId extends string = string,
> {
  readonly values: PlaygroundStateFromControls<TControls>;
  readonly activePresetId: TPresetId | null;
  readonly lockedProps: ReadonlySet<PlaygroundPropKeyFromControls<TControls>>;
}

const findPresetById = <
  TControls extends readonly PlaygroundControl[],
  TPresetId extends string,
>(
  presets: PlaygroundPresetsFromControls<TControls, TPresetId> | undefined,
  presetId: TPresetId | null | undefined
): PlaygroundPreset<
  PlaygroundStateFromControls<TControls>,
  TPresetId
> | null => {
  if (!presetId || !presets) {
    return null;
  }

  return presets.find((preset) => preset.id === presetId) ?? null;
};

const resolveAlwaysLockedProps = <
  TControls extends readonly PlaygroundControl[],
>(
  controls: TControls
): Set<PlaygroundPropKeyFromControls<TControls>> => {
  const lockedProps = new Set<PlaygroundPropKeyFromControls<TControls>>();

  for (const control of controls) {
    if (control.locked) {
      lockedProps.add(control.prop as PlaygroundPropKeyFromControls<TControls>);
    }
  }

  return lockedProps;
};

const resolveLockedProps = <
  TControls extends readonly PlaygroundControl[],
  TPresetId extends string,
>(
  controls: TControls,
  preset: PlaygroundPreset<
    PlaygroundStateFromControls<TControls>,
    TPresetId
  > | null
): ReadonlySet<PlaygroundPropKeyFromControls<TControls>> => {
  const lockedProps = resolveAlwaysLockedProps(controls);

  if (!preset?.locks) {
    return lockedProps;
  }

  for (const lockedProp of preset.locks) {
    lockedProps.add(lockedProp as PlaygroundPropKeyFromControls<TControls>);
  }

  return lockedProps;
};

const mergePresetValues = <
  TControls extends readonly PlaygroundControl[],
  TPresetId extends string,
>(
  values: PlaygroundStateFromControls<TControls>,
  preset: PlaygroundPreset<
    PlaygroundStateFromControls<TControls>,
    TPresetId
  > | null
): PlaygroundStateFromControls<TControls> => {
  if (!preset?.values) {
    return values;
  }

  return {
    ...values,
    ...preset.values,
  };
};

export const createPlaygroundInitialState = <
  TControls extends readonly PlaygroundControl[],
>(
  controls: TControls
): PlaygroundStateFromControls<TControls> => {
  const values: Record<string, unknown> = {};

  for (const control of controls) {
    values[control.prop] = control.initialValue;
  }

  return values as PlaygroundStateFromControls<TControls>;
};

export const createPlaygroundDefaultState = <
  TControls extends readonly PlaygroundControl[],
>(
  controls: TControls
): PlaygroundStateFromControls<TControls> => {
  const values: Record<string, unknown> = {};

  for (const control of controls) {
    values[control.prop] = control.defaultValue;
  }

  return values as PlaygroundStateFromControls<TControls>;
};

export const createPlaygroundStateSnapshot = <
  TControls extends readonly PlaygroundControl[],
  TPresetId extends string = string,
>(
  options: PlaygroundStateOptions<TControls, TPresetId>
): PlaygroundStateSnapshot<TControls, TPresetId> => {
  const initialValues = createPlaygroundInitialState(options.controls);
  const initialPreset = findPresetById(
    options.presets,
    options.initialPresetId ?? null
  );
  const values = mergePresetValues(initialValues, initialPreset);

  return {
    activePresetId: initialPreset?.id ?? null,
    lockedProps: resolveLockedProps(options.controls, initialPreset),
    values,
  };
};

export const isPlaygroundControlLocked = <
  TControls extends readonly PlaygroundControl[],
  TPresetId extends string = string,
>(
  snapshot: PlaygroundStateSnapshot<TControls, TPresetId>,
  prop: PlaygroundPropKeyFromControls<TControls>
): boolean => snapshot.lockedProps.has(prop);

export const setPlaygroundControlValue = <
  TControls extends readonly PlaygroundControl[],
  TPresetId extends string,
  TProp extends PlaygroundPropKeyFromControls<TControls>,
>(
  snapshot: PlaygroundStateSnapshot<TControls, TPresetId>,
  prop: TProp,
  value: PlaygroundControlValueByProp<TControls, TProp>
): PlaygroundStateSnapshot<TControls, TPresetId> => {
  if (isPlaygroundControlLocked(snapshot, prop)) {
    return snapshot;
  }

  return {
    ...snapshot,
    values: {
      ...snapshot.values,
      [prop]: value,
    },
  };
};

export const applyPlaygroundPreset = <
  TControls extends readonly PlaygroundControl[],
  TPresetId extends string = string,
>(
  snapshot: PlaygroundStateSnapshot<TControls, TPresetId>,
  options: Pick<
    PlaygroundStateOptions<TControls, TPresetId>,
    "controls" | "presets"
  >,
  presetId: TPresetId | null
): PlaygroundStateSnapshot<TControls, TPresetId> => {
  const preset = findPresetById(options.presets, presetId);

  return {
    activePresetId: preset?.id ?? null,
    lockedProps: resolveLockedProps(options.controls, preset),
    values: mergePresetValues(snapshot.values, preset),
  };
};

export const resetPlaygroundState = <
  TControls extends readonly PlaygroundControl[],
  TPresetId extends string = string,
>(
  options: PlaygroundStateOptions<TControls, TPresetId>,
  presetId?: TPresetId | null
): PlaygroundStateSnapshot<TControls, TPresetId> =>
  createPlaygroundStateSnapshot({
    ...options,
    initialPresetId: presetId ?? options.initialPresetId ?? null,
  });
