"use client";

import { TIPTAP_CONTROL_REQUIREMENTS } from "../../editor/capabilities";
import {
  createTiptapControl,
  type TiptapEditorControlProps,
} from "./tiptap-editor-control";

const DEFAULT_LINK_URL = "https://example.com";

export const BoldControl = createTiptapControl({
  command: (editor) => {
    editor.chain().focus().toggleBold().run();
  },
  disabled: (editor) => !editor.can().chain().focus().toggleBold().run(),
  icon: <span className="font-semibold">B</span>,
  id: "bold",
  labelKey: "bold",
  requirement: TIPTAP_CONTROL_REQUIREMENTS.bold,
  active: (editor) => editor.isActive("bold"),
});

export const ItalicControl = createTiptapControl({
  command: (editor) => {
    editor.chain().focus().toggleItalic().run();
  },
  disabled: (editor) => !editor.can().chain().focus().toggleItalic().run(),
  icon: <span className="italic">I</span>,
  id: "italic",
  labelKey: "italic",
  requirement: TIPTAP_CONTROL_REQUIREMENTS.italic,
  active: (editor) => editor.isActive("italic"),
});

export const UnderlineControl = createTiptapControl({
  command: (editor) => {
    editor.chain().focus().toggleUnderline().run();
  },
  disabled: (editor) => !editor.can().chain().focus().toggleUnderline().run(),
  icon: <span className="underline">U</span>,
  id: "underline",
  labelKey: "underline",
  requirement: TIPTAP_CONTROL_REQUIREMENTS.underline,
  active: (editor) => editor.isActive("underline"),
});

export const StrikeControl = createTiptapControl({
  command: (editor) => {
    editor.chain().focus().toggleStrike().run();
  },
  disabled: (editor) => !editor.can().chain().focus().toggleStrike().run(),
  icon: <span className="line-through">S</span>,
  id: "strike",
  labelKey: "strike",
  requirement: TIPTAP_CONTROL_REQUIREMENTS.strike,
  active: (editor) => editor.isActive("strike"),
});

export const H1Control = createTiptapControl({
  command: (editor) => {
    editor.chain().focus().toggleHeading({ level: 1 }).run();
  },
  disabled: (editor) =>
    !editor.can().chain().focus().toggleHeading({ level: 1 }).run(),
  icon: <span className="font-semibold">H1</span>,
  id: "heading-1",
  labelKey: "heading1",
  requirement: TIPTAP_CONTROL_REQUIREMENTS.heading,
  active: (editor) => editor.isActive("heading", { level: 1 }),
});

export const H2Control = createTiptapControl({
  command: (editor) => {
    editor.chain().focus().toggleHeading({ level: 2 }).run();
  },
  disabled: (editor) =>
    !editor.can().chain().focus().toggleHeading({ level: 2 }).run(),
  icon: <span className="font-semibold">H2</span>,
  id: "heading-2",
  labelKey: "heading2",
  requirement: TIPTAP_CONTROL_REQUIREMENTS.heading,
  active: (editor) => editor.isActive("heading", { level: 2 }),
});

export const H3Control = createTiptapControl({
  command: (editor) => {
    editor.chain().focus().toggleHeading({ level: 3 }).run();
  },
  disabled: (editor) =>
    !editor.can().chain().focus().toggleHeading({ level: 3 }).run(),
  icon: <span className="font-semibold">H3</span>,
  id: "heading-3",
  labelKey: "heading3",
  requirement: TIPTAP_CONTROL_REQUIREMENTS.heading,
  active: (editor) => editor.isActive("heading", { level: 3 }),
});

export const BulletListControl = createTiptapControl({
  command: (editor) => {
    editor.chain().focus().toggleBulletList().run();
  },
  disabled: (editor) => !editor.can().chain().focus().toggleBulletList().run(),
  icon: <span>&bull; List</span>,
  id: "bullet-list",
  labelKey: "bulletList",
  requirement: TIPTAP_CONTROL_REQUIREMENTS.bulletList,
  active: (editor) => editor.isActive("bulletList"),
});

export const OrderedListControl = createTiptapControl({
  command: (editor) => {
    editor.chain().focus().toggleOrderedList().run();
  },
  disabled: (editor) => !editor.can().chain().focus().toggleOrderedList().run(),
  icon: <span>1. List</span>,
  id: "ordered-list",
  labelKey: "orderedList",
  requirement: TIPTAP_CONTROL_REQUIREMENTS.orderedList,
  active: (editor) => editor.isActive("orderedList"),
});

export const TaskListControl = createTiptapControl({
  command: (editor) => {
    editor.chain().focus().toggleTaskList().run();
  },
  disabled: (editor) => !editor.can().chain().focus().toggleTaskList().run(),
  icon: <span>[ ]</span>,
  id: "task-list",
  labelKey: "taskList",
  requirement: TIPTAP_CONTROL_REQUIREMENTS.taskList,
  active: (editor) => editor.isActive("taskList"),
});

export const LinkControl = createTiptapControl({
  command: (editor) => {
    const currentHref = editor.getAttributes("link").href as string | undefined;
    if (editor.isActive("link")) {
      editor.chain().focus().unsetLink().run();
      return;
    }

    editor
      .chain()
      .focus()
      .setLink({
        href: currentHref ?? DEFAULT_LINK_URL,
      })
      .run();
  },
  disabled: (editor) =>
    !editor.can().chain().focus().setLink({ href: "#" }).run(),
  icon: <span>Link</span>,
  id: "link",
  labelKey: "link",
  requirement: TIPTAP_CONTROL_REQUIREMENTS.link,
  active: (editor) => editor.isActive("link"),
});

export const UnlinkControl = createTiptapControl({
  command: (editor) => {
    editor.chain().focus().unsetLink().run();
  },
  disabled: (editor) => !editor.can().chain().focus().unsetLink().run(),
  icon: <span>Unlink</span>,
  id: "unlink",
  labelKey: "unlink",
  requirement: TIPTAP_CONTROL_REQUIREMENTS.link,
  active: () => false,
});

export const AlignLeftControl = createTiptapControl({
  command: (editor) => {
    editor.chain().focus().setTextAlign("left").run();
  },
  disabled: (editor) =>
    !editor.can().chain().focus().setTextAlign("left").run(),
  icon: <span>L</span>,
  id: "align-left",
  labelKey: "alignLeft",
  requirement: TIPTAP_CONTROL_REQUIREMENTS.textAlign,
  active: (editor) => editor.isActive({ textAlign: "left" }),
});

export const AlignCenterControl = createTiptapControl({
  command: (editor) => {
    editor.chain().focus().setTextAlign("center").run();
  },
  disabled: (editor) =>
    !editor.can().chain().focus().setTextAlign("center").run(),
  icon: <span>C</span>,
  id: "align-center",
  labelKey: "alignCenter",
  requirement: TIPTAP_CONTROL_REQUIREMENTS.textAlign,
  active: (editor) => editor.isActive({ textAlign: "center" }),
});

export const AlignRightControl = createTiptapControl({
  command: (editor) => {
    editor.chain().focus().setTextAlign("right").run();
  },
  disabled: (editor) =>
    !editor.can().chain().focus().setTextAlign("right").run(),
  icon: <span>R</span>,
  id: "align-right",
  labelKey: "alignRight",
  requirement: TIPTAP_CONTROL_REQUIREMENTS.textAlign,
  active: (editor) => editor.isActive({ textAlign: "right" }),
});

export const AlignJustifyControl = createTiptapControl({
  command: (editor) => {
    editor.chain().focus().setTextAlign("justify").run();
  },
  disabled: (editor) =>
    !editor.can().chain().focus().setTextAlign("justify").run(),
  icon: <span>J</span>,
  id: "align-justify",
  labelKey: "alignJustify",
  requirement: TIPTAP_CONTROL_REQUIREMENTS.textAlign,
  active: (editor) => editor.isActive({ textAlign: "justify" }),
});

export const CodeControl = createTiptapControl({
  command: (editor) => {
    editor.chain().focus().toggleCode().run();
  },
  disabled: (editor) => !editor.can().chain().focus().toggleCode().run(),
  icon: <span>{"</>"}</span>,
  id: "code",
  labelKey: "code",
  requirement: TIPTAP_CONTROL_REQUIREMENTS.code,
  active: (editor) => editor.isActive("code"),
});

export const CodeBlockControl = createTiptapControl({
  command: (editor) => {
    editor.chain().focus().toggleCodeBlock().run();
  },
  disabled: (editor) => !editor.can().chain().focus().toggleCodeBlock().run(),
  icon: <span>{"{ }"}</span>,
  id: "code-block",
  labelKey: "codeBlock",
  requirement: TIPTAP_CONTROL_REQUIREMENTS.codeBlock,
  active: (editor) => editor.isActive("codeBlock"),
});

export const HighlightControl = createTiptapControl({
  command: (editor) => {
    editor.chain().focus().toggleHighlight().run();
  },
  disabled: (editor) => !editor.can().chain().focus().toggleHighlight().run(),
  icon: <span>HL</span>,
  id: "highlight",
  labelKey: "highlight",
  requirement: TIPTAP_CONTROL_REQUIREMENTS.highlight,
  active: (editor) => editor.isActive("highlight"),
});

export const ColorControl = createTiptapControl({
  command: (editor) => {
    editor.chain().focus().setColor("var(--color-primary)").run();
  },
  disabled: (editor) => !editor.can().chain().focus().setColor("#000000").run(),
  icon: <span>A</span>,
  id: "color",
  labelKey: "color",
  requirement: TIPTAP_CONTROL_REQUIREMENTS.textColor,
  active: (editor) => Boolean(editor.getAttributes("textStyle").color),
});

export const InsertTableControl = createTiptapControl({
  command: (editor) => {
    editor
      .chain()
      .focus()
      .insertTable({ cols: 3, rows: 3, withHeaderRow: true })
      .run();
  },
  disabled: (editor) =>
    !editor
      .can()
      .chain()
      .focus()
      .insertTable({ cols: 3, rows: 3, withHeaderRow: true })
      .run(),
  icon: <span>Tbl</span>,
  id: "insert-table",
  labelKey: "table",
  requirement: TIPTAP_CONTROL_REQUIREMENTS.table,
});

export const UndoControl = createTiptapControl({
  command: (editor) => {
    editor.chain().focus().undo().run();
  },
  disabled: (editor) => !editor.can().chain().focus().undo().run(),
  icon: <span>&larr;</span>,
  id: "undo",
  labelKey: "undo",
  requirement: TIPTAP_CONTROL_REQUIREMENTS.undo,
});

export const RedoControl = createTiptapControl({
  command: (editor) => {
    editor.chain().focus().redo().run();
  },
  disabled: (editor) => !editor.can().chain().focus().redo().run(),
  icon: <span>&rarr;</span>,
  id: "redo",
  labelKey: "redo",
  requirement: TIPTAP_CONTROL_REQUIREMENTS.redo,
});

export type BoldControlProps = TiptapEditorControlProps;
export type ItalicControlProps = TiptapEditorControlProps;
export type UnderlineControlProps = TiptapEditorControlProps;
export type StrikeControlProps = TiptapEditorControlProps;
export type H1ControlProps = TiptapEditorControlProps;
export type H2ControlProps = TiptapEditorControlProps;
export type H3ControlProps = TiptapEditorControlProps;
export type BulletListControlProps = TiptapEditorControlProps;
export type OrderedListControlProps = TiptapEditorControlProps;
export type TaskListControlProps = TiptapEditorControlProps;
export type LinkControlProps = TiptapEditorControlProps;
export type UnlinkControlProps = TiptapEditorControlProps;
export type AlignLeftControlProps = TiptapEditorControlProps;
export type AlignCenterControlProps = TiptapEditorControlProps;
export type AlignRightControlProps = TiptapEditorControlProps;
export type AlignJustifyControlProps = TiptapEditorControlProps;
export type CodeControlProps = TiptapEditorControlProps;
export type CodeBlockControlProps = TiptapEditorControlProps;
export type HighlightControlProps = TiptapEditorControlProps;
export type ColorControlProps = TiptapEditorControlProps;
export type InsertTableControlProps = TiptapEditorControlProps;
export type UndoControlProps = TiptapEditorControlProps;
export type RedoControlProps = TiptapEditorControlProps;
