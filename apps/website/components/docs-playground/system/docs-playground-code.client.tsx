"use client";

import { CodeBlock } from "@kuzenbo/code/ui/code-block";
import { CopyButton } from "@kuzenbo/core/ui/copy-button";
import { ToggleGroup } from "@kuzenbo/core/ui/toggle-group";
import { Typography } from "@kuzenbo/core/ui/typography";
import { useCallback } from "react";
import { tv } from "tailwind-variants";

import type { PlaygroundCodeMode } from "./types";

interface DocsPlaygroundCodeProps {
  code: string;
  filename: string;
  language: string;
  mode: PlaygroundCodeMode;
  onModeChange: (mode: PlaygroundCodeMode) => void;
}

const docsPlaygroundCodeVariants = tv({
  base: "border-border",
});

const docsPlaygroundCodeHeaderVariants = tv({
  base: "flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3",
});

const docsPlaygroundCodeModeVariants = tv({
  base: "gap-2",
});

const docsPlaygroundCodeContentVariants = tv({
  base: "max-h-[420px] overflow-auto p-4",
});

const toSingleGroupValue = (value: PlaygroundCodeMode): string[] => [value];

const fromSingleGroupValue = (
  values: readonly unknown[]
): PlaygroundCodeMode | null => {
  const [firstValue] = values;

  if (firstValue === "minimal" || firstValue === "full") {
    return firstValue;
  }

  return null;
};

export const DocsPlaygroundCode = ({
  code,
  filename,
  language,
  mode,
  onModeChange,
}: DocsPlaygroundCodeProps) => {
  const handleModeGroupChange = useCallback(
    (nextValues: unknown[]) => {
      const nextMode = fromSingleGroupValue(nextValues);
      if (!nextMode || nextMode === mode) {
        return;
      }

      onModeChange(nextMode);
    },
    [mode, onModeChange]
  );

  return (
    <div
      className={docsPlaygroundCodeVariants()}
      data-slot="docs-playground-code"
    >
      <div className={docsPlaygroundCodeHeaderVariants()}>
        <Typography.Small>{filename}</Typography.Small>

        <ToggleGroup
          className={docsPlaygroundCodeModeVariants()}
          data-slot="docs-playground-code-mode"
          multiple={false}
          onValueChange={handleModeGroupChange}
          size="sm"
          value={toSingleGroupValue(mode)}
          variant="outline"
        >
          <ToggleGroup.Item aria-label="Minimal code" value="minimal">
            Minimal
          </ToggleGroup.Item>
          <ToggleGroup.Item aria-label="Full code" value="full">
            Full
          </ToggleGroup.Item>
        </ToggleGroup>

        <CopyButton
          size="sm"
          statusLabels={{
            copied: "Copied",
            failed: "Copy failed",
            idle: "Copy",
          }}
          value={code}
          variant="outline"
        />
      </div>

      <div className={docsPlaygroundCodeContentVariants()}>
        <CodeBlock code={code} language={language} />
        <pre className="sr-only" data-slot="docs-playground-code-raw">
          {code}
        </pre>
      </div>
    </div>
  );
};
