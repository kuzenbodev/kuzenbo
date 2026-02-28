"use client";

import type { Editor } from "@tiptap/core";
import { useEditorState } from "@tiptap/react";

import { useOptionalTiptapEditorContext } from "./tiptap-editor-context";

export interface UseTiptapEditorStateOptions<T> {
  editor?: Editor | null;
  selector: (editor: Editor) => T;
}

export const useTiptapEditorState = <T>({
  editor: providedEditor,
  selector,
}: UseTiptapEditorStateOptions<T>): T | null => {
  const context = useOptionalTiptapEditorContext();
  const resolvedEditor = providedEditor ?? context?.editor ?? null;

  return useEditorState({
    editor: resolvedEditor,
    selector: ({ editor: currentEditor }) => {
      if (!currentEditor) {
        return null;
      }

      return selector(currentEditor);
    },
  });
};
