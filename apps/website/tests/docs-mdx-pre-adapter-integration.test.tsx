import { expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";

import { MdxPreAdapter } from "../lib/docs/mdx-pre-adapter";

const renderAdapterMarkup = async (className: string): Promise<string> => {
  const rendered = await MdxPreAdapter({
    children: <code className={className}>bun add @kuzenbo/code</code>,
  });

  return renderToStaticMarkup(rendered);
};

test("MdxPreAdapter resolves npm fences via @kuzenbo/code language mapping", async () => {
  const markup = await renderAdapterMarkup("language-npm");

  expect(markup).toContain('data-language="bash"');
  expect(markup).toContain('data-slot="docs-mdx-code-block"');
});

test("MdxPreAdapter falls back to plaintext when fence language is unsupported", async () => {
  const markup = await renderAdapterMarkup("language-unsupported-language");

  expect(markup).toContain('data-language="plaintext"');
});
