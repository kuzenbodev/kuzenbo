import { afterEach, describe, expect, it } from "bun:test";

import {
  highlightCode,
  highlightCodeToHtml,
  highlightInlineCode,
} from "../shiki/highlight-code";
import { resetShikiHighlighter } from "../shiki/shiki-highlighter";

afterEach(async () => {
  await resetShikiHighlighter();
});

describe("highlightCode", () => {
  it("returns highlighted html using language aliases", async () => {
    const result = await highlightCode({
      code: "echo 'hello world'",
      language: "npm",
    });

    expect(result.language).toBe("bash");
    expect(result.html).toContain("<pre");
    expect(result.html).toContain("echo");
  });

  it("falls back to plaintext when language is unknown", async () => {
    const result = await highlightCode({
      code: "plain text sample",
      language: "no-such-language",
    });

    expect(result.language).toBe("plaintext");
    expect(result.html).toContain("plain text sample");
  });

  it("preserves ansi as a resolvable language", async () => {
    const result = await highlightCode({
      code: `${"\u001B[31m"}Error:${"\u001B[0m"} build failed`,
      language: "ansi",
    });

    expect(result.language).toBe("ansi");
    expect(result.html).toContain("Error:");
  });

  it("supports [!code highlight] notation transformer by default", async () => {
    const result = await highlightCode({
      code: [
        "const before = 1;",
        "// [!code highlight]",
        "const after = 2;",
      ].join("\n"),
      language: "ts",
    });

    expect(result.html).not.toContain("[!code highlight]");
    expect(result.html).toContain("highlighted");
  });

  it("exposes html helpers for block and inline rendering", async () => {
    const blockHtml = await highlightCodeToHtml({
      code: "const block = true;",
      language: "ts",
    });
    const inline = await highlightInlineCode({
      code: "const inline = true;",
      language: "ts",
    });

    expect(blockHtml).toContain("<pre");
    expect(inline.html).not.toContain("<pre");
    expect(inline.html).toContain("<span");
  });
});
