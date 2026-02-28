"use client";

import type { ComponentProps } from "react";
import { cn, tv } from "tailwind-variants";
import type { VariantProps } from "tailwind-variants";

import type { UISize } from "../shared/size/size-system";
import { useEmojiPickerResolvedSize } from "./emoji-picker-size-context";

const emojiPickerListEmojiVariants = tv({
  base: "cursor-clickable data-active:bg-accent flex items-center justify-center rounded-md",
  defaultVariants: {
    size: "md",
  },
  variants: {
    size: {
      lg: "size-9 text-xl",
      md: "size-8 text-lg",
      sm: "size-7 text-base",
      xl: "size-10 text-2xl",
      xs: "size-6 text-sm",
    },
  },
});

type EmojiPickerListEmojiVariantProps = Omit<
  VariantProps<typeof emojiPickerListEmojiVariants>,
  "size"
> & {
  size?: UISize;
};

export type EmojiPickerListEmojiProps = {
  emoji: { emoji: string };
} & ComponentProps<"button"> &
  EmojiPickerListEmojiVariantProps;

export const EmojiPickerListEmoji = ({
  emoji,
  className,
  size,
  ...restProps
}: EmojiPickerListEmojiProps) => {
  const resolvedSize = useEmojiPickerResolvedSize(size);

  return (
    <button
      type="button"
      className={cn(
        emojiPickerListEmojiVariants({ size: resolvedSize }),
        className
      )}
      data-size={resolvedSize}
      data-slot="emoji-picker-list-emoji"
      {...restProps}
    >
      {emoji.emoji}
    </button>
  );
};
