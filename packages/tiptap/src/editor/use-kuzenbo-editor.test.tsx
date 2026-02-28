import { afterEach, describe, expect, it } from "bun:test";

import { cleanup, render, waitFor } from "@testing-library/react";
import type { Editor, JSONContent } from "@tiptap/core";
import { useEffect } from "react";

import {
  useKuzenboEditor,
  type UseKuzenboEditorOptions,
} from "./use-kuzenbo-editor";

afterEach(cleanup);

interface UseKuzenboEditorHarnessProps extends UseKuzenboEditorOptions {
  onReady?: (editor: Editor) => void;
}

const UseKuzenboEditorHarness = ({
  onReady,
  ...options
}: UseKuzenboEditorHarnessProps) => {
  const editor = useKuzenboEditor(options);

  useEffect(() => {
    if (!editor) {
      return;
    }

    onReady?.(editor);
  }, [editor, onReady]);

  return null;
};

describe("useKuzenboEditor", () => {
  it("uses SSR-safe defaults and emits normalized update payload", async () => {
    const updates: {
      editor: Editor;
      html: string;
      json: JSONContent;
    }[] = [];

    render(
      <UseKuzenboEditorHarness
        content="<p>Start</p>"
        onReady={(editor) => {
          editor.commands.setContent("<p>Hello from update</p>");
        }}
        onUpdate={(payload) => {
          updates.push(payload);
        }}
      />
    );

    await waitFor(() => {
      expect(updates.length).toBeGreaterThan(0);
    });

    const latest = updates.at(-1);
    expect(latest).toBeDefined();
    expect(latest?.editor).toBeDefined();
    expect(latest?.html).toContain("Hello from update");
    expect(latest?.json.type).toBe("doc");
  });
});
