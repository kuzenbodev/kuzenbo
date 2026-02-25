import { mergeAttributes } from "@tiptap/core";
import { TaskList } from "@tiptap/extension-task-list";

export const createTaskListExtension = () =>
  TaskList.extend({
    addKeyboardShortcuts() {
      const shortcuts = this.parent?.() ?? {};

      return {
        ...shortcuts,
        "Mod-[": () => this.editor.commands.liftListItem("taskItem"),
        "Mod-]": () => this.editor.commands.sinkListItem("taskItem"),
      };
    },
    renderHTML({ HTMLAttributes }) {
      return [
        "ul",
        mergeAttributes({ class: "kb-tiptap-task-list" }, HTMLAttributes),
        0,
      ];
    },
  });
