"use client";

import { PlaygroundShell } from "@kuzenbo/code/ui/playground";

import { controls } from "./controls";
import { initialPresetId, presets } from "./presets";
import { Preview } from "./preview";
import { template } from "./template";

export const GeneralButtonPlayground = () => (
  <PlaygroundShell
    codeMode="minimal"
    controls={controls}
    initialPresetId={initialPresetId}
    presets={presets}
    preview={
      <Preview disabled={false} isLoading={false} size="md" variant="default">
        Button
      </Preview>
    }
    template={template}
  />
);
