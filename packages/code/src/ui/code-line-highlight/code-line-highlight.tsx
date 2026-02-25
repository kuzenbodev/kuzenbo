"use client";

import type { ReactNode } from "react";

import { useMemo } from "react";
import { cn, tv } from "tailwind-variants";

export interface CodeLineAnnotation {
  content: ReactNode;
  line: number;
}

export interface CodeLineHighlightAnnotationSlotProps {
  annotation: CodeLineAnnotation;
  line: string;
  lineNumber: number;
}

export interface CodeLineHighlightProps {
  annotationSlot?: (props: CodeLineHighlightAnnotationSlotProps) => ReactNode;
  annotations?: CodeLineAnnotation[];
  className?: string;
  code: string;
  highlightedLines?: number[];
  language?: string;
  startLineNumber?: number;
}

const codeLineHighlightVariants = tv({
  base: "overflow-hidden rounded-lg border border-border bg-muted/40",
});

const normalizeCodeLines = (code: string): string[] => {
  const normalizedCode = code.replaceAll("\r\n", "\n");
  const lines = normalizedCode.split("\n");

  if (lines.at(-1) === "") {
    lines.pop();
  }

  return lines;
};

export const CodeLineHighlight = ({
  annotationSlot,
  annotations = [],
  className,
  code,
  highlightedLines = [],
  language = "text",
  startLineNumber = 1,
}: CodeLineHighlightProps) => {
  const lines = useMemo(() => normalizeCodeLines(code), [code]);

  const highlightedLineNumbers = useMemo(
    () => new Set(highlightedLines),
    [highlightedLines]
  );

  const annotationsByLine = useMemo(() => {
    const annotationMap = new Map<number, CodeLineAnnotation>();

    for (const annotation of annotations) {
      annotationMap.set(annotation.line, annotation);
    }

    return annotationMap;
  }, [annotations]);

  return (
    <pre
      className={cn(codeLineHighlightVariants(), className)}
      data-slot="code-line-highlight"
    >
      <code data-language={language}>
        {lines.map((line, index) => {
          const lineNumber = startLineNumber + index;
          const isHighlighted = highlightedLineNumbers.has(lineNumber);
          const annotation = annotationsByLine.get(lineNumber);

          return (
            <span
              className={cn(
                "grid grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-3 px-3 py-1",
                isHighlighted && "bg-primary/10"
              )}
              data-highlighted={isHighlighted ? "true" : "false"}
              data-line-number={lineNumber}
              data-slot="code-line-highlight-row"
              key={`line-${lineNumber}`}
            >
              <span
                className="w-8 select-none text-right text-xs tabular-nums text-muted-foreground"
                data-line-number={lineNumber}
                data-slot="code-line-number"
              >
                {lineNumber}
              </span>

              <span
                className="min-w-0 whitespace-pre-wrap break-words font-mono text-sm leading-6 text-foreground"
                data-line-number={lineNumber}
                data-slot="code-line-content"
              >
                {line.length > 0 ? line : " "}
              </span>

              {annotation ? (
                <span
                  className="rounded border border-border bg-background px-2 py-1 text-xs text-muted-foreground"
                  data-line-number={lineNumber}
                  data-slot="code-line-highlight-annotation"
                >
                  {annotationSlot
                    ? annotationSlot({
                        annotation,
                        line,
                        lineNumber,
                      })
                    : annotation.content}
                </span>
              ) : null}
            </span>
          );
        })}
      </code>
    </pre>
  );
};
