"use client";

import { Command } from "@kuzenbo/core/ui/command";

import type { SlashCommandItem } from "../../extensions";

export interface TiptapEditorSlashMenuProps {
  emptyLabel?: string;
  items: SlashCommandItem[];
  onSelect: (item: SlashCommandItem) => void;
}

export const TiptapEditorSlashMenu = ({
  emptyLabel = "No commands found",
  items,
  onSelect,
}: TiptapEditorSlashMenuProps) => (
  <Command className="kb-tiptap-menu">
    <Command.List>
      {items.length === 0 ? (
        <Command.Empty>{emptyLabel}</Command.Empty>
      ) : (
        items.map((item) => (
          <Command.Item
            key={item.title}
            onSelect={() => {
              onSelect(item);
            }}
            value={item.title}
          >
            <div className="flex min-w-0 flex-col">
              <span className="truncate font-medium">{item.title}</span>
              {item.description ? (
                <span className="truncate text-xs text-muted-foreground">
                  {item.description}
                </span>
              ) : null}
            </div>
          </Command.Item>
        ))
      )}
    </Command.List>
  </Command>
);
