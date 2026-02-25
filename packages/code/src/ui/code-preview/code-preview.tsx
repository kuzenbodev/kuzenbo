"use client";

import type { ReactNode } from "react";

import { Button, ButtonGroup } from "@kuzenbo/core";
import { useCallback, useEffect, useState } from "react";
import { cn } from "tailwind-variants";

import { CodeWindow } from "../code-window/code-window";

export type CodePreviewMode = "preview" | "code" | "split";
export type CodePreviewCodeMode = "minimal" | "full";

export interface CodePreviewProps {
  className?: string;
  controlsClassName?: string;
  previewClassName?: string;
  codeClassName?: string;
  title?: ReactNode;
  preview: ReactNode;
  code: ReactNode;
  minimalCode?: ReactNode;
  mode?: CodePreviewMode;
  defaultMode?: CodePreviewMode;
  onModeChange?: (mode: CodePreviewMode) => void;
  codeMode?: CodePreviewCodeMode;
  defaultCodeMode?: CodePreviewCodeMode;
  onCodeModeChange?: (mode: CodePreviewCodeMode) => void;
  hideModeControls?: boolean;
  hideCodeModeControls?: boolean;
}

const isPreviewMode = (value: string | undefined): value is CodePreviewMode =>
  value === "preview" || value === "code" || value === "split";

const isCodeMode = (value: string | undefined): value is CodePreviewCodeMode =>
  value === "minimal" || value === "full";

const previewModeLabelByValue: Record<CodePreviewMode, string> = {
  preview: "Preview",
  code: "Code",
  split: "Split",
};

export const CodePreview = ({
  className,
  controlsClassName,
  previewClassName,
  codeClassName,
  title,
  preview,
  code,
  minimalCode,
  mode,
  defaultMode = "preview",
  onModeChange,
  codeMode,
  defaultCodeMode = "minimal",
  onCodeModeChange,
  hideModeControls = false,
  hideCodeModeControls = false,
}: CodePreviewProps) => {
  const [uncontrolledMode, setUncontrolledMode] = useState<CodePreviewMode>(
    () => (isPreviewMode(defaultMode) ? defaultMode : "preview")
  );
  const [uncontrolledCodeMode, setUncontrolledCodeMode] =
    useState<CodePreviewCodeMode>(() =>
      isCodeMode(defaultCodeMode) ? defaultCodeMode : "minimal"
    );

  const activeMode = isPreviewMode(mode) ? mode : uncontrolledMode;
  const activeCodeMode = isCodeMode(codeMode) ? codeMode : uncontrolledCodeMode;

  useEffect(() => {
    if (mode !== undefined || isPreviewMode(uncontrolledMode)) {
      return;
    }

    setUncontrolledMode("preview");
  }, [mode, uncontrolledMode]);

  useEffect(() => {
    if (codeMode !== undefined || isCodeMode(uncontrolledCodeMode)) {
      return;
    }

    setUncontrolledCodeMode("minimal");
  }, [codeMode, uncontrolledCodeMode]);

  const handleModeChange = useCallback(
    (nextMode: CodePreviewMode) => {
      if (nextMode === activeMode) {
        return;
      }

      if (mode === undefined) {
        setUncontrolledMode(nextMode);
      }

      onModeChange?.(nextMode);
    },
    [activeMode, mode, onModeChange]
  );

  const handleCodeModeChange = useCallback(
    (nextCodeMode: CodePreviewCodeMode) => {
      if (nextCodeMode === activeCodeMode) {
        return;
      }

      if (codeMode === undefined) {
        setUncontrolledCodeMode(nextCodeMode);
      }

      onCodeModeChange?.(nextCodeMode);
    },
    [activeCodeMode, codeMode, onCodeModeChange]
  );

  const resolvedCode =
    activeCodeMode === "minimal" ? (minimalCode ?? code) : code;

  const shouldShowCodeModeControls =
    !hideCodeModeControls && (activeMode === "code" || activeMode === "split");

  return (
    <CodeWindow
      actions={
        <div className={cn("flex items-center gap-2", controlsClassName)}>
          {hideModeControls ? null : (
            <ButtonGroup aria-label="Preview mode" role="group">
              {(["preview", "code", "split"] as const).map((nextMode) => (
                <Button
                  aria-pressed={activeMode === nextMode}
                  key={nextMode}
                  onClick={() => {
                    handleModeChange(nextMode);
                  }}
                  size="xs"
                  type="button"
                  variant={activeMode === nextMode ? "default" : "outline"}
                >
                  {previewModeLabelByValue[nextMode]}
                </Button>
              ))}
            </ButtonGroup>
          )}
          {shouldShowCodeModeControls ? (
            <ButtonGroup aria-label="Code detail level" role="group">
              {(["minimal", "full"] as const).map((nextCodeMode) => (
                <Button
                  aria-pressed={activeCodeMode === nextCodeMode}
                  key={nextCodeMode}
                  onClick={() => {
                    handleCodeModeChange(nextCodeMode);
                  }}
                  size="xs"
                  type="button"
                  variant={
                    activeCodeMode === nextCodeMode ? "default" : "outline"
                  }
                >
                  {nextCodeMode === "minimal" ? "Minimal" : "Full"}
                </Button>
              ))}
            </ButtonGroup>
          ) : null}
        </div>
      }
      className={className}
      title={title}
    >
      {activeMode === "preview" ? (
        <div
          className={cn(
            "rounded-md border border-border p-3",
            previewClassName
          )}
          data-slot="code-preview-preview"
        >
          {preview}
        </div>
      ) : null}
      {activeMode === "code" ? (
        <div
          className={cn("rounded-md border border-border p-3", codeClassName)}
          data-slot="code-preview-code"
        >
          {resolvedCode}
        </div>
      ) : null}
      {activeMode === "split" ? (
        <div
          className="grid gap-3 md:grid-cols-2"
          data-slot="code-preview-split"
        >
          <div
            className={cn(
              "rounded-md border border-border p-3",
              previewClassName
            )}
            data-slot="code-preview-split-preview"
          >
            {preview}
          </div>
          <div
            className={cn("rounded-md border border-border p-3", codeClassName)}
            data-slot="code-preview-split-code"
          >
            {resolvedCode}
          </div>
        </div>
      ) : null}
    </CodeWindow>
  );
};
