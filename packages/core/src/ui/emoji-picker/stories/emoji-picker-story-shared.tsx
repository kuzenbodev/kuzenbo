import type { Meta, StoryObj } from "@storybook/react";
import { type MouseEvent, useCallback, useState } from "react";

import { EmojiPicker } from "../emoji-picker";

export const baseMeta = {
  title: "Components/EmojiPicker",
  component: EmojiPicker,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Emoji picker root and child surfaces share a unified size contract (`xs | sm | md | lg | xl`) with child-level overrides.",
      },
    },
  },
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
  },
} satisfies Meta<typeof EmojiPicker>;

type Story = StoryObj<typeof baseMeta>;

interface RecentEmoji {
  emoji: string;
  label: string;
}

const MAX_RECENT_EMOJIS = 8;

const seedRecentEmojis: RecentEmoji[] = [
  { emoji: "🚀", label: "rocket" },
  { emoji: "✅", label: "check mark button" },
  { emoji: "👀", label: "eyes" },
];

export const Default: Story = {
  args: {
    size: "md",
  },
  render: (args) => (
    <EmojiPicker size={args.size}>
      <EmojiPicker.Search />
      <EmojiPicker.Content>
        <EmojiPicker.List />
      </EmojiPicker.Content>
      <EmojiPicker.SkinToneSelector />
    </EmojiPicker>
  ),
};

const RecentlyUsedDemo = ({
  size,
}: {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}) => {
  const [recentEmojis, setRecentEmojis] =
    useState<RecentEmoji[]>(seedRecentEmojis);
  const [lastSelectedEmoji, setLastSelectedEmoji] =
    useState<RecentEmoji | null>(null);

  const handleEmojiSelect = useCallback((nextEmoji: RecentEmoji) => {
    setLastSelectedEmoji(nextEmoji);
    setRecentEmojis((previous) => {
      const withoutDuplicate = previous.filter(
        (entry) => entry.emoji !== nextEmoji.emoji
      );

      return [nextEmoji, ...withoutDuplicate].slice(0, MAX_RECENT_EMOJIS);
    });
  }, []);

  const handleRecentEmojiClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      const { emoji, label } = event.currentTarget.dataset;
      if (!emoji || !label) {
        return;
      }

      setLastSelectedEmoji({ emoji, label });
    },
    []
  );

  return (
    <div className="flex w-[22rem] flex-col gap-3">
      <div className="border-border bg-muted/30 rounded-md border p-3">
        <p className="text-foreground text-xs font-medium">
          Recently used reactions
        </p>
        <p className="text-muted-foreground mt-1 text-xs">
          Shared by the release coordination team during incident updates.
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {recentEmojis.map((entry) => (
            <button
              className="border-border bg-background rounded-md border px-2 py-1 text-base leading-none"
              data-emoji={entry.emoji}
              data-label={entry.label}
              key={entry.emoji}
              onClick={handleRecentEmojiClick}
              type="button"
            >
              {entry.emoji}
            </button>
          ))}
        </div>
      </div>

      <EmojiPicker onEmojiSelect={handleEmojiSelect} size={size ?? "sm"}>
        <EmojiPicker.Search />
        <EmojiPicker.Content>
          <EmojiPicker.List />
        </EmojiPicker.Content>
        <EmojiPicker.ActiveEmojiPreview emptyText="Select an emoji to add it to recent activity." />
        <EmojiPicker.SkinToneSelector />
      </EmojiPicker>

      <p className="text-muted-foreground text-xs">
        Last selected: {lastSelectedEmoji?.emoji ?? "None"}{" "}
        {lastSelectedEmoji ? `(${lastSelectedEmoji.label})` : ""}
      </p>
    </div>
  );
};

export const RecentlyUsed: Story = {
  args: {
    size: "sm",
  },
  render: (args) => <RecentlyUsedDemo size={args.size} />,
};

export const SearchResults: Story = {
  args: {
    size: "lg",
  },
  render: (args) => (
    <EmojiPicker size={args.size}>
      <EmojiPicker.Search defaultValue="ship" />
      <EmojiPicker.Content>
        <EmojiPicker.List />
        <EmojiPicker.Empty>
          No release-status emojis match this query.
        </EmojiPicker.Empty>
      </EmojiPicker.Content>
      <EmojiPicker.SkinToneSelector />
    </EmojiPicker>
  ),
};
