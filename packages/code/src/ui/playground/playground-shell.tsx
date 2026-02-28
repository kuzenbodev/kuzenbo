"use client";

import { Card } from "@kuzenbo/core/ui/card";
import type { ReactNode } from "react";
import { useMemo } from "react";

import type {
  PlaygroundControl,
  PlaygroundControlValueByProp,
  PlaygroundPropKeyFromControls,
} from "../../playground/playground-control-model";
import type { PlaygroundPresetsFromControls } from "../../playground/playground-preset-model";
import { usePlaygroundState } from "../../playground/use-playground-state";
import { generatePlaygroundCode } from "../../utils/codegen/generate-playground-code";
import type {
  PlaygroundCodeTemplate,
  PlaygroundCodegenMode,
} from "../../utils/codegen/playground-codegen-model";
import { PlaygroundCode } from "./playground-code";
import { PlaygroundControls } from "./playground-controls";
import { PlaygroundPresets } from "./playground-presets";
import { PlaygroundPreview } from "./playground-preview";

export interface PlaygroundShellProps<
  TControls extends readonly PlaygroundControl[],
  TPresetId extends string = string,
> {
  controls: TControls;
  template: PlaygroundCodeTemplate;
  preview: ReactNode;
  presets?: PlaygroundPresetsFromControls<TControls, TPresetId>;
  initialPresetId?: TPresetId | null;
  previewProps?: Record<string, unknown>;
  codeMode?: PlaygroundCodegenMode;
  showCode?: boolean;
}

export const PlaygroundShell = <
  TControls extends readonly PlaygroundControl[],
  TPresetId extends string = string,
>({
  controls,
  template,
  preview,
  presets,
  initialPresetId = null,
  previewProps,
  codeMode = "minimal",
  showCode = true,
}: PlaygroundShellProps<TControls, TPresetId>) => {
  const playground = usePlaygroundState({
    controls,
    presets,
    initialPresetId,
  });

  const generatedCode = useMemo(
    () =>
      generatePlaygroundCode({
        controls,
        state: playground.state,
        template,
        mode: codeMode,
      }),
    [codeMode, controls, playground.state, template]
  );

  return (
    <section className="space-y-4" data-slot="playground-shell">
      {presets && presets.length > 0 ? (
        <PlaygroundPresets
          activePresetId={playground.activePresetId}
          onPresetChange={playground.applyPreset}
          presets={presets}
        />
      ) : null}

      <div className="grid gap-4 lg:grid-cols-[18rem_1fr]">
        <PlaygroundControls
          controls={controls}
          lockedProps={playground.lockedProps}
          onChange={(prop, value) => {
            playground.setValue(
              prop,
              value as PlaygroundControlValueByProp<
                TControls,
                PlaygroundPropKeyFromControls<TControls>
              >
            );
          }}
          state={playground.state}
        />

        <Card className="gap-3 py-3" data-slot="playground-preview">
          <Card.Content className="p-4">
            <PlaygroundPreview
              state={playground.state}
              staticProps={previewProps}
            >
              {preview}
            </PlaygroundPreview>
          </Card.Content>
        </Card>
      </div>

      {showCode ? <PlaygroundCode files={generatedCode} /> : null}
    </section>
  );
};
