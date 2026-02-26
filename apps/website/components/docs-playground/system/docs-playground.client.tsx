"use client";

import { Button } from "@kuzenbo/core/ui/button";
import { ButtonGroup } from "@kuzenbo/core/ui/button-group";
import { Typography } from "@kuzenbo/core/ui/typography";
import { type MouseEvent, useCallback, useMemo, useState } from "react";
import { tv } from "tailwind-variants";

import type {
  DocsPlaygroundProps,
  PlaygroundCodeMode,
  PlaygroundState,
} from "./types";

import { DocsPlaygroundCode } from "./docs-playground-code.client";
import { DocsPlaygroundControls } from "./docs-playground-controls.client";
import {
  buildStateFromPreset,
  getFixedKeys,
  getFixedState,
  getInitialPresetId,
  getPresetById,
  updateControlState,
} from "./state";

const docsPlaygroundVariants = tv({
  base: "not-prose overflow-hidden rounded-xl border border-border bg-card text-card-foreground",
});

const docsPlaygroundContentGridVariants = tv({
  base: "grid border-b border-border lg:grid-cols-[minmax(0,1fr)_340px]",
});

const docsPlaygroundPreviewVariants = tv({
  base: "flex min-h-[320px] items-center justify-center p-6 md:p-8",
});

const docsPlaygroundSidebarVariants = tv({
  base: "space-y-5 border-t border-border p-5 lg:border-t-0 lg:border-l",
});

const docsPlaygroundHeadingVariants = tv({
  base: "space-y-1",
});

const docsPlaygroundPresetsVariants = tv({
  base: "space-y-2",
});

export const DocsPlayground = <TState extends PlaygroundState>({
  definition,
  Preview,
}: DocsPlaygroundProps<TState>) => {
  const initialPresetId = getInitialPresetId(definition.presets);
  const [activePresetId, setActivePresetId] = useState(initialPresetId);
  const [mode, setMode] = useState<PlaygroundCodeMode>("minimal");

  const activePreset = useMemo(
    () => getPresetById(definition.presets, activePresetId),
    [activePresetId, definition.presets]
  );

  const [state, setState] = useState<TState>(() =>
    buildStateFromPreset(definition.initialState, activePreset)
  );

  const fixedKeys = useMemo(() => getFixedKeys(activePreset), [activePreset]);
  const fixedState = useMemo(() => getFixedState(activePreset), [activePreset]);

  const generatedCode = useMemo(
    () =>
      definition.code.serialize({
        fixedState,
        initialState: definition.initialState,
        mode,
        state,
      }),
    [definition.code, definition.initialState, fixedState, mode, state]
  );

  const handlePresetChange = useCallback(
    (presetId: string) => {
      const nextPreset = getPresetById(definition.presets, presetId);
      setActivePresetId(presetId);
      setState(buildStateFromPreset(definition.initialState, nextPreset));
    },
    [definition.initialState, definition.presets]
  );

  const handlePresetButtonClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      const { presetId } = event.currentTarget.dataset;
      if (!presetId) {
        return;
      }

      handlePresetChange(presetId);
    },
    [handlePresetChange]
  );

  const handleControlChange = useCallback(
    (key: keyof TState & string, value: TState[keyof TState & string]) => {
      setState((currentState) =>
        updateControlState(currentState, key, value, fixedKeys)
      );
    },
    [fixedKeys]
  );

  return (
    <section
      aria-label={definition.title}
      className={docsPlaygroundVariants()}
      data-slot="docs-playground"
    >
      <div className={docsPlaygroundContentGridVariants()}>
        <div className={docsPlaygroundPreviewVariants()}>
          <Preview {...state} />
        </div>

        <div className={docsPlaygroundSidebarVariants()}>
          <div className={docsPlaygroundHeadingVariants()}>
            <Typography.Small className="font-medium ">
              {definition.title}
            </Typography.Small>
            {definition.description ? (
              <Typography.Muted className="text-xs">
                {definition.description}
              </Typography.Muted>
            ) : null}
          </div>

          {definition.presets.length > 0 ? (
            <div className={docsPlaygroundPresetsVariants()}>
              <Typography.Small className="">Presets</Typography.Small>
              <ButtonGroup data-slot="docs-playground-presets">
                {definition.presets.map((preset) => {
                  const isActive = preset.id === activePresetId;

                  return (
                    <Button
                      aria-label={`Preset ${preset.label}`}
                      aria-pressed={isActive}
                      data-preset-id={preset.id}
                      key={preset.id}
                      onClick={handlePresetButtonClick}
                      size="sm"
                      type="button"
                    >
                      {preset.label}
                    </Button>
                  );
                })}
              </ButtonGroup>
            </div>
          ) : null}

          <DocsPlaygroundControls
            controls={definition.controls}
            fixedKeys={fixedKeys}
            onControlChange={handleControlChange}
            playgroundId={definition.id}
            state={state}
          />
        </div>
      </div>

      <DocsPlaygroundCode
        code={generatedCode}
        filename={definition.code.filename}
        language={definition.code.language}
        mode={mode}
        onModeChange={setMode}
      />
    </section>
  );
};
