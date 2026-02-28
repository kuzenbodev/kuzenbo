import type { Editor, Range } from "@tiptap/core";
import { Extension } from "@tiptap/core";
import suggestionPlugin from "@tiptap/suggestion";

export interface SlashCommandItem {
  title: string;
  description?: string;
  aliases?: string[];
  command: ({ editor, range }: { editor: Editor; range: Range }) => void;
}

export interface CreateSlashExtensionOptions {
  char?: string;
  items?: SlashCommandItem[];
}

const filterSlashItems = (
  items: SlashCommandItem[],
  query: string
): SlashCommandItem[] => {
  const normalizedQuery = query.toLowerCase().trim();

  if (!normalizedQuery) {
    return items;
  }

  return items.filter((item) => {
    if (item.title.toLowerCase().includes(normalizedQuery)) {
      return true;
    }

    return (
      item.aliases?.some((alias) =>
        alias.toLowerCase().includes(normalizedQuery)
      ) ?? false
    );
  });
};

const SlashCommand = Extension.create<CreateSlashExtensionOptions>({
  name: "slashCommand",

  addOptions() {
    return {
      char: "/",
      items: [],
    };
  },

  addProseMirrorPlugins() {
    return [
      suggestionPlugin({
        char: this.options.char,
        editor: this.editor,
        items: ({ query }) => filterSlashItems(this.options.items ?? [], query),
        command: ({ editor, range, props }) => {
          const item = props as SlashCommandItem;
          item.command({ editor, range });
        },
      }),
    ];
  },
});

export const createSlashExtension = (
  options: CreateSlashExtensionOptions = {}
) => SlashCommand.configure(options);
