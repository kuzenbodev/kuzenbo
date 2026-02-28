import type { AnyExtension } from "@tiptap/core";
import { Color } from "@tiptap/extension-color";
import { Highlight } from "@tiptap/extension-highlight";
import { Placeholder } from "@tiptap/extension-placeholder";
import { Table } from "@tiptap/extension-table";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import { TableRow } from "@tiptap/extension-table-row";
import { TaskItem } from "@tiptap/extension-task-item";
import { TextAlign } from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import { Underline } from "@tiptap/extension-underline";
import { StarterKit } from "@tiptap/starter-kit";

import { createLinkExtension, createTaskListExtension } from "../extensions";

export type TiptapEditorPreset =
  | "minimal"
  | "document"
  | "comment"
  | "knowledge-base";

export interface CreateTiptapExtensionsPresetOptions {
  placeholder?: string;
}

const createStarterKit = (includeLink: boolean): AnyExtension =>
  StarterKit.configure(includeLink ? {} : { link: false });

const createPlaceholder = (placeholder: string | undefined): AnyExtension[] => {
  if (!placeholder) {
    return [];
  }

  return [
    Placeholder.configure({
      placeholder,
    }),
  ];
};

export const createTiptapExtensionsPreset = (
  preset: TiptapEditorPreset = "minimal",
  options: CreateTiptapExtensionsPresetOptions = {}
): AnyExtension[] => {
  const basePlaceholder = createPlaceholder(
    options.placeholder ?? "Write something…"
  );

  if (preset === "minimal") {
    return [createStarterKit(true), ...basePlaceholder];
  }

  if (preset === "comment") {
    return [
      createStarterKit(false),
      Underline,
      createLinkExtension(),
      Highlight,
      ...basePlaceholder,
    ];
  }

  if (preset === "document" || preset === "knowledge-base") {
    return [
      createStarterKit(false),
      Underline,
      createLinkExtension(),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      TextStyle,
      Color,
      Highlight,
      createTaskListExtension(),
      TaskItem.configure({
        nested: true,
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      ...basePlaceholder,
    ];
  }

  return [createStarterKit(true), ...basePlaceholder];
};
