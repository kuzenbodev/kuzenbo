import { describe, expect, it } from "bun:test";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const CLIENT_DIRECTIVE_PATTERN = /^["']use client["'];/;

const CORE_CLIENT_BOUNDARY_ENTRYPOINTS: string[] = [
  "../ui/slider/slider.tsx",
  "../ui/field/field.tsx",
  "../ui/announcement/announcement.tsx",
  "../ui/pill/pill.tsx",
];

const readSource = (relativeFilePath: string): string =>
  readFileSync(
    fileURLToPath(new URL(relativeFilePath, import.meta.url)),
    "utf8"
  );

describe("core client boundary entrypoints", () => {
  it.each(CORE_CLIENT_BOUNDARY_ENTRYPOINTS)(
    "%s keeps a client directive prologue",
    (relativeFilePath: string) => {
      const source = readSource(relativeFilePath).trimStart();

      expect(CLIENT_DIRECTIVE_PATTERN.test(source)).toBe(true);
    }
  );
});
