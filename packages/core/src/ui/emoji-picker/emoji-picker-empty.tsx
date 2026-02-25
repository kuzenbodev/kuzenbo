"use client";

import type { ComponentProps } from "react";

import { EmojiPicker as BaseEmojiPicker } from "frimousse";
import { cn, tv, type VariantProps } from "tailwind-variants";

import type { UISize } from "../shared/size/size-system";

import { useEmojiPickerResolvedSize } from "./emoji-picker-size-context";

const emojiPickerEmptyVariants = tv({
  base: "absolute inset-0 flex items-center justify-center text-muted-foreground",
  variants: {
    size: {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-sm",
      lg: "text-sm",
      xl: "text-base",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type EmojiPickerEmptyVariantProps = Omit<
  VariantProps<typeof emojiPickerEmptyVariants>,
  "size"
> & {
  size?: UISize;
};

export type EmojiPickerEmptyProps = Omit<
  ComponentProps<typeof BaseEmojiPicker.Empty>,
  "size"
> &
  EmojiPickerEmptyVariantProps;

export const EmojiPickerEmpty = ({
  className,
  size,
  ...props
}: EmojiPickerEmptyProps) => {
  const resolvedSize = useEmojiPickerResolvedSize(size);

  return (
    <BaseEmojiPicker.Empty
      className={cn(
        emojiPickerEmptyVariants({ size: resolvedSize }),
        className
      )}
      data-size={resolvedSize}
      data-slot="emoji-picker-empty"
      {...props}
    />
  );
};
