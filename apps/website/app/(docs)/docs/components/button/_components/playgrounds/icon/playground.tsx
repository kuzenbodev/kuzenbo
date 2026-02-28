"use client";

import { PlaygroundShell } from "@kuzenbo/code/ui/playground";

import { controls } from "./controls";
import { initialPresetId, presets } from "./presets";
import { Preview } from "./preview";
import { template } from "./template";

export const IconButtonPlayground = () => (
  <PlaygroundShell
    codeMode="minimal"
    controls={controls}
    initialPresetId={initialPresetId}
    presets={presets}
    preview={
      <Preview
        disabled={false}
        isLoading={false}
        size="icon"
        variant="outline"
      />
    }
    template={template}
  />
);
