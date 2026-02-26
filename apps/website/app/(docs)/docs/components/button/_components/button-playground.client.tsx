"use client";

import type { PlaygroundCodegenMode } from "@kuzenbo/code/utils/codegen/playground-codegen-model";

import { PlaygroundShell } from "@kuzenbo/code/ui/playground";
import { Button } from "@kuzenbo/core/ui/button";
import { ButtonGroup } from "@kuzenbo/core/ui/button-group";
import { useCallback, useState } from "react";

import { ButtonPlaygroundPreview } from "./button-playground-preview.client";
import {
  buttonPlaygroundControls,
  buttonPlaygroundInitialPresetId,
  buttonPlaygroundPresets,
  buttonPlaygroundTemplate,
} from "./button-playground.definition";

export const ButtonPlayground = () => {
  const [codeMode, setCodeMode] = useState<PlaygroundCodegenMode>("minimal");
  const handleMinimalModeClick = useCallback(() => {
    setCodeMode("minimal");
  }, []);
  const handleFullModeClick = useCallback(() => {
    setCodeMode("full");
  }, []);

  return (
    <section className="space-y-3" data-slot="button-playground">
      <div className="flex justify-end">
        <ButtonGroup data-slot="button-playground-code-mode">
          <Button
            aria-label="Minimal code"
            aria-pressed={codeMode === "minimal"}
            onClick={handleMinimalModeClick}
            size="xs"
            type="button"
            variant={codeMode === "minimal" ? "default" : "outline"}
          >
            Minimal
          </Button>
          <Button
            aria-label="Full code"
            aria-pressed={codeMode === "full"}
            onClick={handleFullModeClick}
            size="xs"
            type="button"
            variant={codeMode === "full" ? "default" : "outline"}
          >
            Full
          </Button>
        </ButtonGroup>
      </div>

      <PlaygroundShell
        codeMode={codeMode}
        controls={buttonPlaygroundControls}
        initialPresetId={buttonPlaygroundInitialPresetId}
        presets={buttonPlaygroundPresets}
        preview={
          <ButtonPlaygroundPreview
            disabled={false}
            isLoading={false}
            size="md"
            variant="default"
          >
            Button
          </ButtonPlaygroundPreview>
        }
        template={buttonPlaygroundTemplate}
      />
    </section>
  );
};
