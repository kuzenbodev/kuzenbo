import { PlaygroundCode } from "./playground-code";
import { PlaygroundControls } from "./playground-controls";
import { PlaygroundPresets } from "./playground-presets";
import { PlaygroundPreview } from "./playground-preview";
import { PlaygroundShell } from "./playground-shell";

export const Playground = {
  Root: PlaygroundShell,
  Controls: PlaygroundControls,
  PresetBar: PlaygroundPresets,
  Preview: PlaygroundPreview,
  Code: PlaygroundCode,
} as const;
