"use client";

import type { ComponentProps } from "react";

import { EmojiPicker as BaseEmojiPicker } from "frimousse";
import { cn, tv, type VariantProps } from "tailwind-variants";

import type { UISize } from "../shared/size/size-system";

import { EmojiPickerListCategoryHeader as CategoryHeader } from "./emoji-picker-list-category-header";
import { EmojiPickerListEmoji as Emoji } from "./emoji-picker-list-emoji";
import { EmojiPickerListRow as Row } from "./emoji-picker-list-row";
import {
  EmojiPickerSizeContext,
  useEmojiPickerResolvedSize,
} from "./emoji-picker-size-context";

const emojiPickerListVariants = tv({
  base: "select-none",
  variants: {
    size: {
      xs: "pb-1.5",
      sm: "pb-2",
      md: "pb-2",
      lg: "pb-2.5",
      xl: "pb-3",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type EmojiPickerListVariantProps = Omit<
  VariantProps<typeof emojiPickerListVariants>,
  "size"
> & {
  size?: UISize;
};

export type EmojiPickerListProps = Omit<
  ComponentProps<typeof BaseEmojiPicker.List>,
  "size"
> &
  EmojiPickerListVariantProps;

export const EmojiPickerList = ({
  className,
  size,
  ...props
}: EmojiPickerListProps) => {
  const resolvedSize = useEmojiPickerResolvedSize(size);

  return (
    <EmojiPickerSizeContext.Provider value={{ size: resolvedSize }}>
      <BaseEmojiPicker.List
        className={cn(
          emojiPickerListVariants({ size: resolvedSize }),
          className
        )}
        components={{
          CategoryHeader,
          Row,
          Emoji,
        }}
        data-size={resolvedSize}
        data-slot="emoji-picker-list"
        {...props}
      />
    </EmojiPickerSizeContext.Provider>
  );
};
