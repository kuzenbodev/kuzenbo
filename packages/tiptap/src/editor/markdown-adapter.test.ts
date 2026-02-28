import { describe, expect, it } from "bun:test";

import type { Editor, JSONContent } from "@tiptap/core";

import { createMarkdownAdapter } from "./markdown-adapter";

describe("createMarkdownAdapter", () => {
  it("throws when markdown extension is not available", () => {
    const editorWithoutMarkdown = {
      getJSON: () => ({ content: [], type: "doc" }) as JSONContent,
    } as unknown as Editor;

    const adapter = createMarkdownAdapter(editorWithoutMarkdown);

    expect(() => adapter.parse("# Title")).toThrow(
      "Markdown extension is not enabled"
    );
  });

  it("delegates parse and serialize calls to markdown manager", () => {
    const parse = (markdown: string) =>
      ({
        content: [
          { content: [{ text: markdown, type: "text" }], type: "paragraph" },
        ],
        type: "doc",
      }) as JSONContent;

    const editor = {
      getJSON: () =>
        ({
          content: [
            {
              content: [{ text: "existing", type: "text" }],
              type: "paragraph",
            },
          ],
          type: "doc",
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
