import type { Editor } from "@tiptap/core";

export type TiptapEditorCapability =
  | "bold"
  | "italic"
  | "underline"
  | "strike"
  | "heading"
  | "blockquote"
  | "code"
  | "codeBlock"
  | "bulletList"
  | "orderedList"
  | "taskList"
  | "link"
  | "textAlign"
  | "textColor"
  | "highlight"
  | "table"
  | "mention"
  | "slash"
  | "undo"
  | "redo"
  | "markdown";

export interface TiptapControlRequirement {
  capability: TiptapEditorCapability;
  requiredExtensions: string[];
  requiredCommands: string[];
}

export const TIPTAP_CONTROL_REQUIREMENTS = {
  bold: {
    capability: "bold",
    requiredExtensions: ["bold"],
    requiredCommands: ["toggleBold"],
  },
  italic: {
    capability: "italic",
    requiredExtensions: ["italic"],
    requiredCommands: ["toggleItalic"],
  },
  underline: {
    capability: "underline",
    requiredExtensions: ["underline"],
    requiredCommands: ["toggleUnderline"],
  },
  strike: {
    capability: "strike",
    requiredExtensions: ["strike"],
    requiredCommands: ["toggleStrike"],
  },
  heading: {
    capability: "heading",
    requiredExtensions: ["heading"],
    requiredCommands: ["toggleHeading"],
  },
  blockquote: {
    capability: "blockquote",
    requiredExtensions: ["blockquote"],
    requiredCommands: ["toggleBlockquote"],
  },
  code: {
    capability: "code",
    requiredExtensions: ["code"],
    requiredCommands: ["toggleCode"],
  },
  codeBlock: {
    capability: "codeBlock",
    requiredExtensions: ["codeBlock"],
    requiredCommands: ["toggleCodeBlock"],
  },
  bulletList: {
    capability: "bulletList",
    requiredExtensions: ["bulletList"],
    requiredCommands: ["toggleBulletList"],
  },
  orderedList: {
    capability: "orderedList",
    requiredExtensions: ["orderedList"],
    requiredCommands: ["toggleOrderedList"],
  },
  taskList: {
    capability: "taskList",
    requiredExtensions: ["taskList", "taskItem"],
    requiredCommands: ["toggleTaskList"],
  },
  link: {
    capability: "link",
    requiredExtensions: ["link"],
    requiredCommands: ["setLink", "unsetLink"],
  },
  textAlign: {
    capability: "textAlign",
    requiredExtensions: ["textAlign"],
    requiredCommands: ["setTextAlign"],
  },
  textColor: {
    capability: "textColor",
    requiredExtensions: ["textStyle", "color"],
    requiredCommands: ["setColor", "unsetColor"],
  },
  highlight: {
    capability: "highlight",
    requiredExtensions: ["highlight"],
    requiredCommands: ["toggleHighlight"],
  },
  table: {
    capability: "table",
    requiredExtensions: ["table", "tableRow", "tableCell", "tableHeader"],
    requiredCommands: ["insertTable"],
  },
  mention: {
    capability: "mention",
    requiredExtensions: ["mention"],
    requiredCommands: [],
  },
  slash: {
    capability: "slash",
    requiredExtensions: ["slashCommand"],
    requiredCommands: [],
  },
  undo: {
    capability: "undo",
    requiredExtensions: ["history"],
    requiredCommands: ["undo"],
  },
  redo: {
    capability: "redo",
    requiredExtensions: ["history"],
    requiredCommands: ["redo"],
  },
  markdown: {
    capability: "markdown",
    requiredExtensions: ["markdown"],
    requiredCommands: [],
  },
} as const satisfies Record<string, TiptapControlRequirement>;

export const getEditorExtensionNames = (editor: Editor | null): Set<string> => {
  if (!editor) {
    return new Set<string>();
  }

  return new Set(
    editor.extensionManager.extensions.map((extension) => extension.name)
  );
};

const hasCommand = (editor: Editor, commandName: string): boolean => {
  const commands = editor.commands as Record<string, unknown>;
  return typeof commands[commandName] === "function";
};

export const hasControlRequirement = (
  editor: Editor | null,
  requirement: TiptapControlRequirement | undefined
): boolean => {
  if (!editor || !requirement) {
    return true;
  }

  const extensionNames = getEditorExtensionNames(editor);
  const hasRequiredExtensions = requirement.requiredExtensions.every(
    (extensionName) => extensionNames.has(extensionName)
  );
  const hasRequiredCommands = requirement.requiredCommands.every(
    (commandName) => hasCommand(editor, commandName)
  );

  return hasRequiredExtensions && hasRequiredCommands;
};
