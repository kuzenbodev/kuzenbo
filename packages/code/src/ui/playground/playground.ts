import { PlaygroundCode } from "./playground-code";
import { PlaygroundControls } from "./playground-controls";
import { PlaygroundPresets } from "./playground-presets";
import { PlaygroundPreview } from "./playground-preview";
import { PlaygroundShell } from "./playground-shell";

export const Playground = {
  Code: PlaygroundCode,
  Controls: PlaygroundControls,
  PresetBar: PlaygroundPresets,
  Preview: PlaygroundPreview,
  Root: PlaygroundShell,
} as const;
