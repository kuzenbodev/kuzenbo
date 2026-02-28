"use client";

import { PlaygroundCode } from "@kuzenbo/code/ui/playground";
import type { ReactNode } from "react";
import { cn } from "tailwind-variants";

export interface ComponentPreviewProps {
  className?: string;
  preview: ReactNode;
  previewClassName?: string;
  code: string;
  fileName?: string;
  language?: string;
}

export const ComponentPreview = ({
  className,
  preview,
  previewClassName,
  code,
  fileName = "Demo.tsx",
  language = "tsx",
}: ComponentPreviewProps) => (
  <section
    className={cn("border-border overflow-hidden rounded-lg border", className)}
    data-slot="component-preview"
  >
    <div className="bg-card px-4 py-6 sm:px-6">
      <div
        className={cn(
          "bg-background border-border flex min-h-40 items-center justify-center rounded-md border px-4 py-6",
          previewClassName
        )}
        data-slot="component-preview-render"
      >
        {preview}
      </div>
    </div>

    <div className="border-border border-t px-4 py-4 sm:px-6">
      <PlaygroundCode files={[{ code, fileName, language }]} />
    </div>
  </section>
);
