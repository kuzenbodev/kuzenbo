import type {
  PlaygroundControl,
  PlaygroundStateFromControls,
} from "./playground-control-model";

export interface PlaygroundPreset<
  TState extends Record<string, unknown>,
  TId extends string = string,
> {
  id: TId;
  label: string;
  values?: Partial<TState>;
  locks?: readonly (keyof TState)[];
}

export type PlaygroundPresetsFromControls<
  TControls extends readonly PlaygroundControl[],
  TId extends string = string,
> = readonly PlaygroundPreset<PlaygroundStateFromControls<TControls>, TId>[];

export const definePlaygroundPresets = <
  TState extends Record<string, unknown>,
  const TPresets extends readonly PlaygroundPreset<TState, string>[] =
    readonly PlaygroundPreset<TState, string>[],
>(
  presets: TPresets
): TPresets => presets;
