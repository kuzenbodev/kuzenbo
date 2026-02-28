import { describe, expect, it } from "bun:test";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const CLIENT_DIRECTIVE_PATTERN = /^["']use client["'];/;

const PLAYGROUND_CLIENT_BOUNDARY_ENTRYPOINTS: string[] = [
  "../ui/playground/playground-control-field.tsx",
  "../ui/playground/playground-controls.tsx",
  "../ui/playground/index.ts",
];

const readSource = (relativeFilePath: string): string =>
  readFileSync(
    fileURLToPath(new URL(relativeFilePath, import.meta.url)),
    "utf8"
  );

describe("playground client boundary entrypoints", () => {
  it.each(PLAYGROUND_CLIENT_BOUNDARY_ENTRYPOINTS)(
    "%s keeps a client directive prologue",
    (relativeFilePath: string) => {
      const source = readSource(relativeFilePath).trimStart();

      expect(CLIENT_DIRECTIVE_PATTERN.test(source)).toBe(true);
    }
  );
});
