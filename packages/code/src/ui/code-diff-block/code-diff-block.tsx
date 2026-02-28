"use client";

import { diffLines } from "diff";
import type { ReactNode } from "react";
import { useMemo } from "react";
import ReactDiffViewer from "react-diff-viewer-continued";
import { cn, tv } from "tailwind-variants";

export type CodeDiffBlockViewMode = "split" | "unified";

export interface CodeDiffBlockProps {
  className?: string;
  newCode: string;
  newTitle?: ReactNode;
  oldCode: string;
  oldTitle?: ReactNode;
  showLineNumbers?: boolean;
  useDarkTheme?: boolean;
  viewMode?: CodeDiffBlockViewMode;
}

const codeDiffBlockVariants = tv({
  base: "border-border bg-muted/40 overflow-hidden rounded-lg border",
});

const countChangedLines = (value: string): number => {
  if (value.length === 0) {
    return 0;
  }

  const normalizedValue = value.endsWith("\n") ? value.slice(0, -1) : value;
  if (normalizedValue.length === 0) {
    return 0;
  }

  return normalizedValue.split("\n").length;
};

export const CodeDiffBlock = ({
  className,
  newCode,
  newTitle = "Incoming",
  oldCode,
  oldTitle = "Current",
  showLineNumbers = true,
  useDarkTheme = false,
  viewMode = "split",
}: CodeDiffBlockProps) => {
  const { addedLines, removedLines } = useMemo(() => {
    let addedCount = 0;
    let removedCount = 0;

    for (const segment of diffLines(oldCode, newCode)) {
      const changedLines = countChangedLines(segment.value);

      if (segment.added) {
        addedCount += changedLines;
      }

      if (segment.removed) {
        removedCount += changedLines;
      }
    }

    return {
      addedLines: addedCount,
      removedLines: removedCount,
    };
  }, [newCode, oldCode]);

  return (
    <section
      className={cn(codeDiffBlockVariants(), className)}
      data-slot="code-diff-block"
      data-view-mode={viewMode}
    >
      <header className="border-border bg-background/60 flex flex-wrap items-center justify-between gap-3 border-b px-4 py-2">
        <div className="text-muted-foreground flex items-center gap-2 text-xs">
          <span
            className="border-border bg-background text-foreground rounded border px-2 py-1"
            data-slot="code-diff-old-title"
          >
            {oldTitle}
          </span>
          <span aria-hidden className="text-muted-foreground">
            to
          </span>
          <span
            className="border-border bg-background text-foreground rounded border px-2 py-1"
            data-slot="code-diff-new-title"
          >
            {newTitle}
          </span>
        </div>

        <div
          className="flex items-center gap-2 text-xs"
          data-slot="code-diff-summary"
        >
          <span
            className="border-success/30 bg-success/10 text-success rounded border px-2 py-1 font-medium"
            data-slot="code-diff-added-count"
          >
            +{addedLines}
          </span>
          <span
            className="border-danger/30 bg-danger/10 text-danger rounded border px-2 py-1 font-medium"
            data-slot="code-diff-removed-count"
          >
            -{removedLines}
          </span>
        </div>
      </header>

      <div className="overflow-x-auto p-2" data-slot="code-diff-viewer">
        <ReactDiffViewer
          hideLineNumbers={!showLineNumbers}
          newValue={newCode}
          oldValue={oldCode}
          renderContent={(content) => (
            <pre className="text-foreground m-0 font-mono text-sm leading-6 whitespace-pre-wrap">
              {content}
            </pre>
          )}
          showDiffOnly={false}
          splitView={viewMode === "split"}
          useDarkTheme={useDarkTheme}
        />
      </div>
    </section>
  );
};
