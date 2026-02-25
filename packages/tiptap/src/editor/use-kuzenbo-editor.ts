"use client";

import type { AnyExtension, Editor, JSONContent } from "@tiptap/core";

import { useEditor } from "@tiptap/react";
import { useMemo } from "react";

import {
  createTiptapExtensionsPreset,
  type TiptapEditorPreset,
} from "./create-tiptap-extensions-preset";

export interface UseKuzenboEditorOptions {
  preset?: TiptapEditorPreset;
  content?: string | JSONContent;
  extensions?: AnyExtension[];
  onUpdate?: (payload: {
    json: JSONContent;
    html: string;
    editor: Editor;
  }) => void;
  immediatelyRender?: boolean;
  editable?: boolean;
  placeholder?: string;
}

export const useKuzenboEditor = ({
  preset = "minimal",
  content,
  extensions,
  onUpdate,
  immediatelyRender = false,
  editable = true,
  placeholder,
}: UseKuzenboEditorOptions = {}) => {
  const presetExtensions = useMemo(
    () => createTiptapExtensionsPreset(preset, { placeholder }),
    [placeholder, preset]
  );

  const allExtensions = useMemo(() => {
    if (!extensions || extensions.length === 0) {
      return presetExtensions;
    }

    return [...presetExtensions, ...extensions];
  }, [extensions, presetExtensions]);

  return useEditor({
    extensions: allExtensions,
    content: content ?? "",
    editable,
    immediatelyRender,
    onUpdate: onUpdate
      ? ({ editor }) => {
          onUpdate({
            editor,
            html: editor.getHTML(),
            json: editor.getJSON(),
          });
        }
      : undefined,
  });
};
