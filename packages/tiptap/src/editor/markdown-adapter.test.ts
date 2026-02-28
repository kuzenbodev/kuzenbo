import { describe, expect, it } from "bun:test";

import type { Editor, JSONContent } from "@tiptap/core";

import { createMarkdownAdapter } from "./markdown-adapter";

describe("createMarkdownAdapter", () => {
  it("throws when markdown extension is not available", () => {
    const editorWithoutMarkdown = {
      getJSON: () => ({ type: "doc", content: [] }) as JSONContent,
    } as unknown as Editor;

    const adapter = createMarkdownAdapter(editorWithoutMarkdown);

    expect(() => adapter.parse("# Title")).toThrow(
      "Markdown extension is not enabled"
    );
  });

  it("delegates parse and serialize calls to markdown manager", () => {
    const parse = (markdown: string) =>
      ({
        type: "doc",
        content: [
          { type: "paragraph", content: [{ type: "text", text: markdown }] },
        ],
      }) as JSONContent;

    const editor = {
      getJSON: () =>
        ({
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [{ type: "text", text: "existing" }],
            },
          ],
        }) as JSONContent,
      markdown: {
        parse,
        serialize: () => "serialized-markdown",
      },
    } as unknown as Editor;

    const adapter = createMarkdownAdapter(editor);
    const parsed = adapter.parse("hello");
    const serialized = adapter.serialize(parsed);
    const serializedCurrent = adapter.serializeCurrent();

    expect(parsed.content?.[0]?.content?.[0]?.text).toBe("hello");
    expect(serialized).toBe("serialized-markdown");
    expect(serializedCurrent).toBe("serialized-markdown");
  });
});
