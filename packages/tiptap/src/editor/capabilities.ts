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
  blockquote: {
    capability: "blockquote",
    requiredCommands: ["toggleBlockquote"],
    requiredExtensions: ["blockquote"],
  },
  bold: {
    capability: "bold",
    requiredCommands: ["toggleBold"],
    requiredExtensions: ["bold"],
  },
  bulletList: {
    capability: "bulletList",
    requiredCommands: ["toggleBulletList"],
    requiredExtensions: ["bulletList"],
  },
  code: {
    capability: "code",
    requiredCommands: ["toggleCode"],
    requiredExtensions: ["code"],
  },
  codeBlock: {
    capability: "codeBlock",
    requiredCommands: ["toggleCodeBlock"],
    requiredExtensions: ["codeBlock"],
  },
  heading: {
    capability: "heading",
    requiredCommands: ["toggleHeading"],
    requiredExtensions: ["heading"],
  },
  highlight: {
    capability: "highlight",
    requiredCommands: ["toggleHighlight"],
    requiredExtensions: ["highlight"],
  },
  italic: {
    capability: "italic",
    requiredCommands: ["toggleItalic"],
    requiredExtensions: ["italic"],
  },
  link: {
    capability: "link",
    requiredCommands: ["setLink", "unsetLink"],
    requiredExtensions: ["link"],
  },
  markdown: {
    capability: "markdown",
    requiredCommands: [],
    requiredExtensions: ["markdown"],
  },
  mention: {
    capability: "mention",
    requiredCommands: [],
    requiredExtensions: ["mention"],
  },
  orderedList: {
    capability: "orderedList",
    requiredCommands: ["toggleOrderedList"],
    requiredExtensions: ["orderedList"],
  },
  redo: {
    capability: "redo",
    requiredCommands: ["redo"],
    requiredExtensions: ["history"],
  },
  slash: {
    capability: "slash",
    requiredCommands: [],
    requiredExtensions: ["slashCommand"],
  },
  strike: {
    capability: "strike",
    requiredCommands: ["toggleStrike"],
    requiredExtensions: ["strike"],
  },
  table: {
    capability: "table",
    requiredCommands: ["insertTable"],
    requiredExtensions: ["table", "tableRow", "tableCell", "tableHeader"],
  },
  taskList: {
    capability: "taskList",
    requiredCommands: ["toggleTaskList"],
    requiredExtensions: ["taskList", "taskItem"],
  },
  textAlign: {
    capability: "textAlign",
    requiredCommands: ["setTextAlign"],
    requiredExtensions: ["textAlign"],
  },
  textColor: {
    capability: "textColor",
    requiredCommands: ["setColor", "unsetColor"],
    requiredExtensions: ["textStyle", "color"],
  },
  underline: {
    capability: "underline",
    requiredCommands: ["toggleUnderline"],
    requiredExtensions: ["underline"],
  },
  undo: {
    capability: "undo",
    requiredCommands: ["undo"],
    requiredExtensions: ["history"],
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
