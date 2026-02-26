"use client";

import { Command } from "@kuzenbo/core/ui/command";

import type { TiptapMentionItem } from "../../extensions";

export interface TiptapEditorMentionMenuProps {
  emptyLabel?: string;
  items: TiptapMentionItem[];
  onSelect: (item: TiptapMentionItem) => void;
}

export const TiptapEditorMentionMenu = ({
  emptyLabel = "No people found",
  items,
  onSelect,
}: TiptapEditorMentionMenuProps) => (
  <Command className="kb-tiptap-menu">
    <Command.List>
      {items.length === 0 ? (
        <Command.Empty>{emptyLabel}</Command.Empty>
      ) : (
        items.map((item) => (
          <Command.Item
            key={item.id}
            onSelect={() => {
              onSelect(item);
            }}
            value={item.label ?? item.id}
          >
            <span className="truncate">{item.label ?? item.id}</span>
          </Command.Item>
        ))
      )}
    </Command.List>
  </Command>
);
