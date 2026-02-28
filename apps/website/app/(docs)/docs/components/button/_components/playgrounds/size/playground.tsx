"use client";

import { PlaygroundShell } from "@kuzenbo/code/ui/playground";

import { controls } from "./controls";
import { Preview } from "./preview";
import { template } from "./template";

export const ButtonSizePlayground = () => (
  <PlaygroundShell
    codeMode="minimal"
    controls={controls}
    preview={
      <Preview disabled={false} isLoading={false} size="md" variant="default">
        Button
      </Preview>
    }
    template={template}
  />
);
