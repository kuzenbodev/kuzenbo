"use client";

import { Tabs } from "@kuzenbo/core/ui/tabs";
import { ToggleGroup } from "@kuzenbo/core/ui/toggle-group";
import type { ReactNode } from "react";
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
  code: "Code",
  preview: "Preview",
  split: "Split",
};

const toSingleGroupValue = (value: string): string[] => [value];

const fromSingleGroupValue = (
  values: readonly unknown[]
): string | undefined => {
  const [firstValue] = values;
  return typeof firstValue === "string" && firstValue.length > 0
    ? firstValue
    : undefined;
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
    <Tabs
      onValueChange={(nextMode) => {
        if (!isPreviewMode(nextMode)) {
          return;
        }

        handleModeChange(nextMode);
      }}
      value={activeMode}
    >
      <CodeWindow
        actions={
          <div className={cn("flex items-center gap-2", controlsClassName)}>
            {hideModeControls ? null : (
              <Tabs.List aria-label="Preview mode" size="xs" variant="pill">
                {(["preview", "code", "split"] as const).map((nextMode) => (
                  <Tabs.Trigger
                    className="cursor-clickable"
                    key={nextMode}
                    value={nextMode}
                  >
                    {previewModeLabelByValue[nextMode]}
                  </Tabs.Trigger>
                ))}
                <Tabs.Indicator />
              </Tabs.List>
            )}
            {shouldShowCodeModeControls ? (
              <ToggleGroup
                aria-label="Code detail level"
                multiple={false}
                onValueChange={(nextValues) => {
                  const nextCodeMode = fromSingleGroupValue(nextValues);
                  if (!isCodeMode(nextCodeMode)) {
                    return;
                  }

                  handleCodeModeChange(nextCodeMode);
                }}
                size="xs"
                value={toSingleGroupValue(activeCodeMode)}
                variant="outline"
              >
                <ToggleGroup.Item className="cursor-clickable" value="minimal">
                  Minimal
                </ToggleGroup.Item>
                <ToggleGroup.Item className="cursor-clickable" value="full">
                  Full
                </ToggleGroup.Item>
              </ToggleGroup>
            ) : null}
          </div>
        }
        className={className}
        title={title}
      >
        <Tabs.Content value="preview">
          <div
            className={cn(
              "border-border rounded-md border p-3",
              previewClassName
            )}
            data-slot="code-preview-preview"
          >
            {preview}
          </div>
        </Tabs.Content>
        <Tabs.Content value="code">
          <div
            className={cn("border-border rounded-md border p-3", codeClassName)}
            data-slot="code-preview-code"
          >
            {resolvedCode}
          </div>
        </Tabs.Content>
        <Tabs.Content value="split">
          <div
            className="grid gap-3 md:grid-cols-2"
            data-slot="code-preview-split"
          >
            <div
              className={cn(
                "border-border rounded-md border p-3",
                previewClassName
              )}
              data-slot="code-preview-split-preview"
            >
              {preview}
            </div>
            <div
              className={cn(
                "border-border rounded-md border p-3",
                codeClassName
              )}
              data-slot="code-preview-split-code"
            >
              {resolvedCode}
            </div>
          </div>
        </Tabs.Content>
      </CodeWindow>
    </Tabs>
  );
};
