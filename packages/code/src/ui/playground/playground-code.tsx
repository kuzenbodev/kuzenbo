"use client";

import { CopyButton } from "@kuzenbo/core/ui/copy-button";
import { cn } from "tailwind-variants";

import type { PlaygroundGeneratedCodeFile } from "../../utils/codegen/playground-codegen-model";
import { CodeBlockToolbar } from "../code-block-toolbar/code-block-toolbar";
import { CodeBlock } from "../code-block/code-block";
import { CodeTabs } from "../code-tabs/code-tabs";

export interface PlaygroundCodeProps {
  className?: string;
  codeClassName?: string;
  panelClassName?: string;
  tabsClassName?: string;
  files: readonly PlaygroundGeneratedCodeFile[];
  showCopyButton?: boolean;
  copyLabel?: string;
  copiedLabel?: string;
}

const renderCodeFile = (
  file: PlaygroundGeneratedCodeFile,
  options: Pick<
    PlaygroundCodeProps,
    "codeClassName" | "showCopyButton" | "copyLabel" | "copiedLabel"
  >
) => (
  <CodeBlock
    code={file.code}
    codeClassName={options.codeClassName}
    language={file.language}
    toolbar={
      <CodeBlockToolbar
        language={file.language}
        title={file.fileName}
        end={
          options.showCopyButton ? (
            <CopyButton
              size="xs"
              statusLabels={{
                copied: options.copiedLabel ?? "Copied",
                idle: options.copyLabel ?? "Copy",
              }}
              value={file.code}
              variant="ghost"
            />
          ) : null
        }
      />
    }
  />
);

export const PlaygroundCode = ({
  className,
  codeClassName,
  panelClassName,
  tabsClassName,
  files,
  showCopyButton = true,
  copyLabel = "Copy",
  copiedLabel = "Copied",
}: PlaygroundCodeProps) => {
  if (files.length === 0) {
    return null;
  }

  if (files.length === 1) {
    const [firstFile] = files;

    if (!firstFile) {
      return null;
    }

    return (
      <div className={cn("space-y-3", className)} data-slot="playground-code">
        {renderCodeFile(firstFile, {
          codeClassName,
          showCopyButton,
          copyLabel,
          copiedLabel,
        })}
      </div>
    );
  }

  return (
    <div className={cn("space-y-3", className)} data-slot="playground-code">
      <CodeTabs
        panelClassName={panelClassName}
        tabs={files.map((file) => ({
          value: `${file.fileName}:${file.language}`,
          label: file.fileName,
          content: renderCodeFile(file, {
            codeClassName,
            showCopyButton,
            copyLabel,
            copiedLabel,
          }),
        }))}
        tabsClassName={tabsClassName}
      />
    </div>
  );
};
