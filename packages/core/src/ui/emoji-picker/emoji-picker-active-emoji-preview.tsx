"use client";

import type { ComponentProps } from "react";
import { cn, tv, type VariantProps } from "tailwind-variants";

import type { UISize } from "../shared/size/size-system";
import { EmojiPickerActiveEmoji } from "./emoji-picker-active-emoji";
import { useEmojiPickerResolvedSize } from "./emoji-picker-size-context";

const emojiPickerActiveEmojiPreviewVariants = tv({
  slots: {
    emoji: "",
    root: "bg-popover flex items-center rounded-md border-t",
  },
  variants: {
    size: {
      xs: {
        emoji: "text-base",
        root: "gap-1.5 px-2 py-1 text-xs",
      },
      sm: {
        emoji: "text-base",
        root: "gap-2 px-2.5 py-1.5 text-sm",
      },
      md: {
        emoji: "text-lg",
        root: "gap-2 px-3 py-2 text-sm",
      },
      lg: {
        emoji: "text-xl",
        root: "gap-2.5 px-3.5 py-2 text-sm",
      },
      xl: {
        emoji: "text-2xl",
        root: "gap-3 px-4 py-2.5 text-base",
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type EmojiPickerActiveEmojiPreviewVariantProps = Omit<
  VariantProps<typeof emojiPickerActiveEmojiPreviewVariants>,
  "size"
> & {
  size?: UISize;
};

export type EmojiPickerActiveEmojiPreviewProps = Omit<
  ComponentProps<typeof EmojiPickerActiveEmoji>,
  "children"
> &
  EmojiPickerActiveEmojiPreviewVariantProps & {
    emptyText?: string;
  };

export const EmojiPickerActiveEmojiPreview = ({
  emptyText = "Hover or navigate to see emoji details",
  size,
  ...props
}: EmojiPickerActiveEmojiPreviewProps) => {
  const resolvedSize = useEmojiPickerResolvedSize(size);
  const { emoji, root } = emojiPickerActiveEmojiPreviewVariants({
    size: resolvedSize,
  });

  return (
    <EmojiPickerActiveEmoji {...props}>
      {({ emoji: activeEmoji }) => (
        <div
          className={cn(root(), !activeEmoji && "text-muted-foreground")}
          data-size={resolvedSize}
          data-slot="emoji-picker-active-emoji-preview"
        >
          {activeEmoji ? (
            <>
              <span className={emoji()}>{activeEmoji.emoji}</span>
              <span>{activeEmoji.label}</span>
            </>
          ) : (
            <span>{emptyText}</span>
          )}
        </div>
      )}
    </EmojiPickerActiveEmoji>
  );
};
