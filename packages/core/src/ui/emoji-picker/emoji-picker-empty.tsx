"use client";

import { EmojiPicker as BaseEmojiPicker } from "frimousse";
import type { ComponentProps } from "react";
import { cn, tv } from "tailwind-variants";
import type { VariantProps } from "tailwind-variants";

import type { UISize } from "../shared/size/size-system";
import { useEmojiPickerResolvedSize } from "./emoji-picker-size-context";

const emojiPickerEmptyVariants = tv({
  base: "text-muted-foreground absolute inset-0 flex items-center justify-center",
  defaultVariants: {
    size: "md",
  },
  variants: {
    size: {
      lg: "text-sm",
      md: "text-sm",
      sm: "text-sm",
      xl: "text-base",
      xs: "text-xs",
    },
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
