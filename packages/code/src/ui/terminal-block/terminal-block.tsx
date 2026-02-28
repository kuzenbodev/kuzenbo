"use client";

import Anser from "anser";
import type { CSSProperties } from "react";
import { useMemo } from "react";
import { cn, tv } from "tailwind-variants";

interface TerminalAnsiChunk {
  bg?: string | null;
  bg_truecolor?: string | null;
  content: string;
  decoration?: string | null;
  fg?: string | null;
  fg_truecolor?: string | null;
}

export interface TerminalBlockProps {
  className?: string;
  command?: string;
  output: string;
  prompt?: string;
  title?: string;
}

const terminalBlockVariants = tv({
  base: "border-border bg-background overflow-hidden rounded-lg border",
});

const parseAnsiColor = (value?: string | null): string | undefined => {
  if (!value) {
    return undefined;
  }

  if (value.startsWith("#") || value.startsWith("rgb(")) {
    return value;
  }

  if (value.includes(",")) {
    return `rgb(${value})`;
  }

  return undefined;
};

const parseAnsiDecoration = (
  decoration?: string | null
): Pick<CSSProperties, "fontStyle" | "fontWeight" | "textDecoration"> => {
  if (!decoration) {
    return {};
  }

  const normalizedDecoration = decoration.toLowerCase();

  return {
    fontStyle: normalizedDecoration.includes("italic") ? "italic" : undefined,
    fontWeight: normalizedDecoration.includes("bold") ? "700" : undefined,
    textDecoration: normalizedDecoration.includes("underline")
      ? "underline"
      : undefined,
  };
};

const normalizeTerminalLines = (output: string): string[] => {
  const normalizedOutput = output.replaceAll("\r\n", "\n");
  const lines = normalizedOutput.split("\n");

  if (lines.at(-1) === "") {
    lines.pop();
  }

  return lines.length > 0 ? lines : [""];
};

const parseAnsiLine = (line: string): TerminalAnsiChunk[] =>
  Anser.ansiToJson(line, {
    json: true,
    remove_empty: false,
    use_classes: false,
  }) as TerminalAnsiChunk[];

export const TerminalBlock = ({
  className,
  command,
  output,
  prompt = "$",
  title = "terminal",
}: TerminalBlockProps) => {
  const lines = useMemo(() => normalizeTerminalLines(output), [output]);

  const parsedOutput = useMemo(() => lines.map(parseAnsiLine), [lines]);

  return (
    <section
      className={cn(terminalBlockVariants(), className)}
      data-slot="terminal-block"
    >
      <header className="border-border bg-muted/40 flex items-center justify-between border-b px-4 py-2">
        <span
          className="text-muted-foreground font-mono text-xs tracking-wide uppercase"
          data-slot="terminal-title"
        >
          {title}
        </span>
      </header>

      <pre
        className="text-foreground overflow-x-auto p-3 font-mono text-sm leading-6"
        data-slot="terminal-content"
      >
        {command ? (
          <div
            className="text-muted-foreground pb-2"
            data-slot="terminal-command-line"
          >
            <span className="text-foreground select-none">{prompt}</span>{" "}
            <span data-slot="terminal-command">{command}</span>
          </div>
        ) : null}

        {parsedOutput.map((chunks, lineIndex) => (
          <div
            data-line-number={lineIndex + 1}
            data-slot="terminal-line"
            key={`line-${lineIndex}`}
          >
            {chunks.length > 0
              ? chunks.map((chunk, chunkIndex) => {
                  const style: CSSProperties = {
                    ...parseAnsiDecoration(chunk.decoration),
                  };

                  const foreground = parseAnsiColor(
                    chunk.fg_truecolor ?? chunk.fg
                  );
                  const background = parseAnsiColor(
                    chunk.bg_truecolor ?? chunk.bg
                  );

                  if (foreground) {
                    style.color = foreground;
                  }

                  if (background) {
                    style.backgroundColor = background;
                  }

                  return (
                    <span
                      data-slot="terminal-chunk"
                      key={`chunk-${lineIndex}-${chunkIndex}`}
                      style={style}
                    >
                      {chunk.content.length > 0 ? chunk.content : " "}
                    </span>
                  );
                })
              : " "}
          </div>
        ))}
      </pre>
    </section>
  );
};
