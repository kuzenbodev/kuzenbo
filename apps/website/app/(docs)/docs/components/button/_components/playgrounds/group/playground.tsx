"use client";

import { PlaygroundShell } from "@kuzenbo/code/ui/playground";

import { controls } from "./controls";
import { Preview } from "./preview";
import { template } from "./template";

export const ButtonGroupPlayground = () => (
  <PlaygroundShell
    codeMode="minimal"
    controls={controls}
    preview={
      <Preview
        orientation="horizontal"
        showSeparator
        showStatus
        size="md"
        variant="outline"
      />
    }
    template={template}
  />
);
