export interface TiptapEditorLabels {
  bold: string;
  italic: string;
  underline: string;
  strike: string;
  link: string;
  unlink: string;
  heading1: string;
  heading2: string;
  heading3: string;
  bulletList: string;
  orderedList: string;
  taskList: string;
  quote: string;
  code: string;
  codeBlock: string;
  alignLeft: string;
  alignCenter: string;
  alignRight: string;
  alignJustify: string;
  undo: string;
  redo: string;
  color: string;
  highlight: string;
  table: string;
  mention: string;
  slash: string;
}

export const DEFAULT_TIPTAP_LABELS: TiptapEditorLabels = {
  alignCenter: "Align center",
  alignJustify: "Align justify",
  alignLeft: "Align left",
  alignRight: "Align right",
  bold: "Bold",
  bulletList: "Bullet list",
  code: "Inline code",
  codeBlock: "Code block",
  color: "Text color",
  heading1: "Heading 1",
  heading2: "Heading 2",
  heading3: "Heading 3",
  highlight: "Highlight",
  italic: "Italic",
  link: "Add link",
  mention: "Mention",
  orderedList: "Ordered list",
  quote: "Blockquote",
  redo: "Redo",
  slash: "Slash command",
  strike: "Strikethrough",
  table: "Insert table",
  taskList: "Task list",
  underline: "Underline",
  undo: "Undo",
  unlink: "Remove link",
};
