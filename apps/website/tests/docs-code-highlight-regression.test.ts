import { expect, test } from "bun:test";

import {
  applyHighlightedLineMarkup,
  extractHighlightNotation,
  normalizeCodeFenceLanguage,
  resolveCodeFenceLanguage,
} from "../lib/docs/mdx-pre-adapter";

test("extractHighlightNotation keeps line order and strips [!code highlight] markers", () => {
  const sourceCode = [
    "<Button>Save</Button>",
    '<Button variant="danger">Delete</Button> // [!code highlight]',
    '<Button variant="outline">Cancel</Button>',
  ].join("\n");

  const highlightedNotation = extractHighlightNotation(sourceCode);

  expect(highlightedNotation.code).toContain(
    '<Button variant="danger">Delete</Button>'
  );
  expect(highlightedNotation.code).not.toContain("[!code highlight]");
  expect(highlightedNotation.highlightedLines).toEqual([2]);
});

test("applyHighlightedLineMarkup marks only requested shiki lines", () => {
  const highlightedHtml = applyHighlightedLineMarkup(
    '<pre class="shiki"><code><span class="line">a</span><span class="line">b</span><span class="line">c</span></code></pre>',
    [2]
  );

  expect(highlightedHtml).toContain(
    '<span class="line" data-highlighted-line="true">b</span>'
  );
  expect(highlightedHtml).toContain('<span class="line">a</span>');
  expect(highlightedHtml).toContain('<span class="line">c</span>');

  const highlightedCount =
    highlightedHtml.split('data-highlighted-line="true"').length - 1;
  expect(highlightedCount).toBe(1);
});

test("normalizeCodeFenceLanguage resolves fences with canonical shiki mapping", () => {
  expect(normalizeCodeFenceLanguage("npm")).toBe("bash");
  expect(normalizeCodeFenceLanguage("typescript")).toBe("typescript");
  expect(normalizeCodeFenceLanguage("tsx meta=example")).toBe("tsx");
  expect(normalizeCodeFenceLanguage("unsupported")).toBe("plaintext");
  expect(resolveCodeFenceLanguage("unsupported")).toBeNull();
});
