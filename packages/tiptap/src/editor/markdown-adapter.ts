import type { Editor, JSONContent } from "@tiptap/core";
import type { MarkdownManager } from "@tiptap/markdown";

type EditorWithMarkdown = Editor & {
  markdown?: MarkdownManager;
};

export interface MarkdownAdapter {
  parse: (markdown: string) => JSONContent;
  serialize: (content: JSONContent) => string;
  serializeCurrent: () => string;
}

const getMarkdownManager = (editor: Editor | null): MarkdownManager => {
  if (!editor) {
    throw new Error(
      "Cannot use markdown adapter without an active editor instance."
    );
  }

  const { markdown } = editor as EditorWithMarkdown;

  if (!markdown) {
    throw new Error(
      "Markdown extension is not enabled. Add @tiptap/markdown to your editor extensions before using createMarkdownAdapter()."
    );
  }

  return markdown;
};

export const createMarkdownAdapter = (
  editor: Editor | null
): MarkdownAdapter => ({
  parse(markdown: string) {
    const manager = getMarkdownManager(editor);
    return manager.parse(markdown);
  },
  serialize(content: JSONContent) {
    const manager = getMarkdownManager(editor);
    return manager.serialize(content);
  },
  serializeCurrent() {
    if (!editor) {
      throw new Error(
        "Cannot serialize markdown without an active editor instance."
      );
    }

    const manager = getMarkdownManager(editor);
    return manager.serialize(editor.getJSON());
  },
});
