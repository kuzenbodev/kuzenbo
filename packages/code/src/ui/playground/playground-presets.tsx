import { Button, ButtonGroup } from "@kuzenbo/core";

import type { PlaygroundPreset } from "../../playground/playground-preset-model";

export interface PlaygroundPresetsProps<
  TState extends Record<string, unknown>,
  TPresetId extends string = string,
> {
  presets: readonly PlaygroundPreset<TState, TPresetId>[];
  activePresetId: TPresetId | null;
  onPresetChange: (presetId: TPresetId | null) => void;
}

export const PlaygroundPresets = <
  TState extends Record<string, unknown>,
  TPresetId extends string = string,
>({
  presets,
  activePresetId,
  onPresetChange,
}: PlaygroundPresetsProps<TState, TPresetId>) => (
  <ButtonGroup
    className="flex-wrap"
    data-slot="playground-presets"
    role="group"
  >
    <Button
      aria-pressed={activePresetId === null}
      size="xs"
      onClick={() => {
        onPresetChange(null);
      }}
      type="button"
      variant={activePresetId === null ? "default" : "outline"}
    >
      Custom
    </Button>

    {presets.map((preset) => (
      <Button
        aria-pressed={activePresetId === preset.id}
        key={preset.id}
        onClick={() => {
          onPresetChange(preset.id);
        }}
        size="xs"
        type="button"
        variant={activePresetId === preset.id ? "default" : "outline"}
      >
        {preset.label}
      </Button>
    ))}
  </ButtonGroup>
);
