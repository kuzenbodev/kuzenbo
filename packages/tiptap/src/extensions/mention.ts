import { Mention } from "@tiptap/extension-mention";
import type { MentionOptions } from "@tiptap/extension-mention";

export interface TiptapMentionItem {
  id: string;
  label?: string;
}

export interface CreateMentionExtensionOptions {
  char?: string;
  items?: (query: string) => TiptapMentionItem[] | Promise<TiptapMentionItem[]>;
  HTMLAttributes?: MentionOptions["HTMLAttributes"];
}

const defaultItems = (query: string): TiptapMentionItem[] => {
  const sampleUsers = [
    { id: "ava", label: "Ava" },
    { id: "liam", label: "Liam" },
    { id: "mia", label: "Mia" },
    { id: "noah", label: "Noah" },
  ];

  if (!query) {
    return sampleUsers;
  }

  return sampleUsers.filter((item) =>
    item.label?.toLowerCase().includes(query.toLowerCase())
  );
};

export const createMentionExtension = (
  options: CreateMentionExtensionOptions = {}
) =>
  Mention.configure({
    HTMLAttributes: {
      class: "kb-tiptap-mention",
      ...options.HTMLAttributes,
    },
    deleteTriggerWithBackspace: true,
    suggestion: {
      char: options.char ?? "@",
      items: ({ query }) => {
        const loader = options.items ?? defaultItems;
        return loader(query);
      },
    },
  });
