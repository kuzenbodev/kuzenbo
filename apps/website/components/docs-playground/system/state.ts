import type { DocsPlaygroundPreset, PlaygroundState } from "./types";

const toTypedKeys = <TState extends PlaygroundState>(
  value: Partial<TState> | undefined
): (keyof TState & string)[] =>
  Object.keys(value ?? {}) as (keyof TState & string)[];

export const getPresetById = <TState extends PlaygroundState>(
  presets: readonly DocsPlaygroundPreset<TState>[],
  presetId: string
): DocsPlaygroundPreset<TState> | undefined =>
  presets.find((preset) => preset.id === presetId);

export const getInitialPresetId = <TState extends PlaygroundState>(
  presets: readonly DocsPlaygroundPreset<TState>[]
): string => presets[0]?.id ?? "default";

export const buildStateFromPreset = <TState extends PlaygroundState>(
  initialState: TState,
  preset: DocsPlaygroundPreset<TState> | undefined
): TState => ({
  ...initialState,
  ...preset?.initial,
  ...preset?.fixed,
});

export const getFixedKeys = <TState extends PlaygroundState>(
  preset: DocsPlaygroundPreset<TState> | undefined
): ReadonlySet<keyof TState & string> => new Set(toTypedKeys(preset?.fixed));

export const getFixedState = <TState extends PlaygroundState>(
  preset: DocsPlaygroundPreset<TState> | undefined
): Partial<TState> => ({ ...preset?.fixed });

export const updateControlState = <
  TState extends PlaygroundState,
  TKey extends keyof TState & string,
>(
  state: TState,
  key: TKey,
  value: TState[TKey],
  fixedKeys: ReadonlySet<keyof TState & string>
): TState => {
  if (fixedKeys.has(key)) {
    return state;
  }

  return {
    ...state,
    [key]: value,
  };
};
