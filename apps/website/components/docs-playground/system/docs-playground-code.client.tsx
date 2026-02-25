"use client";

import { CodeBlock } from "@kuzenbo/code";
import { Button, ButtonGroup, CopyButton, Typography } from "@kuzenbo/core";
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

export const DocsPlaygroundCode = ({
  code,
  filename,
  language,
  mode,
  onModeChange,
}: DocsPlaygroundCodeProps) => {
  const handleMinimalModeClick = useCallback(() => {
    onModeChange("minimal");
  }, [onModeChange]);

  const handleFullModeClick = useCallback(() => {
    onModeChange("full");
  }, [onModeChange]);

  return (
    <div
      className={docsPlaygroundCodeVariants()}
      data-slot="docs-playground-code"
    >
      <div className={docsPlaygroundCodeHeaderVariants()}>
        <Typography.Small>{filename}</Typography.Small>

        <ButtonGroup
          className={docsPlaygroundCodeModeVariants()}
          data-slot="docs-playground-code-mode"
        >
          <Button
            aria-label="Minimal code"
            aria-pressed={mode === "minimal"}
            onClick={handleMinimalModeClick}
            size="sm"
            type="button"
            variant={mode === "minimal" ? "default" : "outline"}
          >
            Minimal
          </Button>
          <Button
            aria-label="Full code"
            aria-pressed={mode === "full"}
            onClick={handleFullModeClick}
            size="sm"
            type="button"
            variant={mode === "full" ? "default" : "outline"}
          >
            Full
          </Button>
        </ButtonGroup>

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
