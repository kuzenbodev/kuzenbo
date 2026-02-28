import { PlaygroundCode } from "./playground-code";
import { PlaygroundControls } from "./playground-controls";
import { PlaygroundPreview } from "./playground-preview";
import { PlaygroundShell } from "./playground-shell";

export const Playground = {
  Code: PlaygroundCode,
  Controls: PlaygroundControls,
  Preview: PlaygroundPreview,
  Root: PlaygroundShell,
} as const;
