"use client";

import { ToggleGroup } from "@kuzenbo/core/ui/toggle-group";

import type { PlaygroundPreset } from "../../playground/playground-preset-model";

export interface PlaygroundPresetsProps<
  TState extends Record<string, unknown>,
  TPresetId extends string = string,
> {
  presets: readonly PlaygroundPreset<TState, TPresetId>[];
  activePresetId: TPresetId | null;
  onPresetChange: (presetId: TPresetId | null) => void;
}

const CUSTOM_PRESET_VALUE = "__custom__";

const toPresetGroupValue = (presetId: string | null): string[] => [
  presetId ?? CUSTOM_PRESET_VALUE,
];

const fromPresetGroupValue = (values: readonly unknown[]): string | null => {
  const [firstValue] = values;

  if (typeof firstValue !== "string" || firstValue.length === 0) {
    return null;
  }

  return firstValue === CUSTOM_PRESET_VALUE ? null : firstValue;
};

export const PlaygroundPresets = <
  TState extends Record<string, unknown>,
  TPresetId extends string = string,
>({
  presets,
  activePresetId,
  onPresetChange,
}: PlaygroundPresetsProps<TState, TPresetId>) => (
  <ToggleGroup
    className="flex-wrap"
    data-slot="playground-presets"
    multiple={false}
    onValueChange={(nextValues) => {
      const nextPresetId = fromPresetGroupValue(nextValues) as TPresetId | null;
      if (nextPresetId === activePresetId) {
        return;
      }

      onPresetChange(nextPresetId);
    }}
    size="xs"
    value={toPresetGroupValue(activePresetId)}
    variant="outline"
  >
    <ToggleGroup.Item value={CUSTOM_PRESET_VALUE}>Custom</ToggleGroup.Item>

    {presets.map((preset) => (
      <ToggleGroup.Item key={preset.id} value={preset.id}>
        {preset.label}
      </ToggleGroup.Item>
    ))}
  </ToggleGroup>
);
