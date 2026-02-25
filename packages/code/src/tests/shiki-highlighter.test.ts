import { afterEach, describe, expect, it } from "bun:test";

import {
  DEFAULT_SHIKI_THEME,
  getShikiHighlighter,
  resetShikiHighlighter,
} from "../shiki/shiki-highlighter";

afterEach(async () => {
  await resetShikiHighlighter();
});

describe("shiki highlighter lifecycle", () => {
  it("returns a singleton instance while active", async () => {
    const first = await getShikiHighlighter();
    const second = await getShikiHighlighter();

    expect(first).toBe(second);
  });

  it("creates a fresh instance after reset", async () => {
    const first = await getShikiHighlighter();

    await resetShikiHighlighter();

    const second = await getShikiHighlighter();

    expect(first).not.toBe(second);
  });

  it("returns a usable instance when reset races initialization", async () => {
    const pendingHighlighter = getShikiHighlighter();
    const pendingReset = resetShikiHighlighter();

    const highlighter = await pendingHighlighter;

    await pendingReset;

    const html = highlighter.codeToHtml("const value = 1;", {
      lang: "ts",
      theme: DEFAULT_SHIKI_THEME,
    });

    expect(html).toContain("const");
  });
});
