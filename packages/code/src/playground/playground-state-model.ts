import type {
  PlaygroundControl,
  PlaygroundControlValueByProp,
  PlaygroundPropKeyFromControls,
  PlaygroundStateFromControls,
} from "./playground-control-model";

export interface PlaygroundStateOptions<
  TControls extends readonly PlaygroundControl[],
> {
  controls: TControls;
}

export interface PlaygroundStateSnapshot<
  TControls extends readonly PlaygroundControl[],
> {
  readonly values: PlaygroundStateFromControls<TControls>;
  readonly lockedProps: ReadonlySet<PlaygroundPropKeyFromControls<TControls>>;
}

const resolveLockedProps = <TControls extends readonly PlaygroundControl[]>(
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
>(
  options: PlaygroundStateOptions<TControls>
): PlaygroundStateSnapshot<TControls> => {
  const values = createPlaygroundInitialState(options.controls);

  return {
    lockedProps: resolveLockedProps(options.controls),
    values,
  };
};

export const isPlaygroundControlLocked = <
  TControls extends readonly PlaygroundControl[],
>(
  snapshot: PlaygroundStateSnapshot<TControls>,
  prop: PlaygroundPropKeyFromControls<TControls>
): boolean => snapshot.lockedProps.has(prop);

export const setPlaygroundControlValue = <
  TControls extends readonly PlaygroundControl[],
  TProp extends PlaygroundPropKeyFromControls<TControls>,
>(
  snapshot: PlaygroundStateSnapshot<TControls>,
  prop: TProp,
  value: PlaygroundControlValueByProp<TControls, TProp>
): PlaygroundStateSnapshot<TControls> => {
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

export const resetPlaygroundState = <
  TControls extends readonly PlaygroundControl[],
>(
  options: PlaygroundStateOptions<TControls>
): PlaygroundStateSnapshot<TControls> =>
  createPlaygroundStateSnapshot(options);
