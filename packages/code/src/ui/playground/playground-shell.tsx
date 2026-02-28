"use client";

import { Card } from "@kuzenbo/core/ui/card";
import type { ReactNode } from "react";
import { useMemo } from "react";

import type {
  PlaygroundControl,
  PlaygroundControlValueByProp,
  PlaygroundPropKeyFromControls,
} from "../../playground/playground-control-model";
import { usePlaygroundState } from "../../playground/use-playground-state";
import { generatePlaygroundCode } from "../../utils/codegen/generate-playground-code";
import type {
  PlaygroundCodeTemplate,
  PlaygroundCodegenMode,
} from "../../utils/codegen/playground-codegen-model";
import { PlaygroundCode } from "./playground-code";
import { PlaygroundControls } from "./playground-controls";
import { PlaygroundPreview } from "./playground-preview";

export interface PlaygroundShellProps<
  TControls extends readonly PlaygroundControl[],
> {
  controls: TControls;
  template: PlaygroundCodeTemplate;
  preview: ReactNode;
  previewProps?: Record<string, unknown>;
  codeMode?: PlaygroundCodegenMode;
  showCode?: boolean;
}

export const PlaygroundShell = <
  TControls extends readonly PlaygroundControl[],
>({
  controls,
  template,
  preview,
  previewProps,
  codeMode = "minimal",
  showCode = true,
}: PlaygroundShellProps<TControls>) => {
  const playground = usePlaygroundState({ controls });

  const generatedCode = useMemo(
    () =>
      generatePlaygroundCode({
        controls,
        mode: codeMode,
        state: playground.state,
        template,
      }),
    [codeMode, controls, playground.state, template]
  );

  return (
    <section data-slot="playground-shell">
      <Card className="rounded-b-none">
        <Card.Content className="grid lg:grid-cols-[1fr_18rem]">
          <div className="gap-3 border-b-0 py-3" data-slot="playground-preview">
            <PlaygroundPreview
              state={playground.state}
              staticProps={previewProps}
            >
              {preview}
            </PlaygroundPreview>
          </div>

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
        </Card.Content>
      </Card>

      {showCode ? <PlaygroundCode files={generatedCode} /> : null}
    </section>
  );
};
