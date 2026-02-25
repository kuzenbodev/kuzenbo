"use client";

import type { ComponentProps } from "react";

import { EmojiPicker as BaseEmojiPicker } from "frimousse";
import { cn, tv, type VariantProps } from "tailwind-variants";

import type { UISize } from "../shared/size/size-system";

import { useEmojiPickerResolvedSize } from "./emoji-picker-size-context";

const emojiPickerLoadingVariants = tv({
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

type EmojiPickerLoadingVariantProps = Omit<
  VariantProps<typeof emojiPickerLoadingVariants>,
  "size"
> & {
  size?: UISize;
};

export type EmojiPickerLoadingProps = Omit<
  ComponentProps<typeof BaseEmojiPicker.Loading>,
  "size"
> &
  EmojiPickerLoadingVariantProps;

export const EmojiPickerLoading = ({
  className,
  size,
  ...props
}: EmojiPickerLoadingProps) => {
  const resolvedSize = useEmojiPickerResolvedSize(size);

  return (
    <BaseEmojiPicker.Loading
      className={cn(
        emojiPickerLoadingVariants({ size: resolvedSize }),
        className
      )}
      data-size={resolvedSize}
      data-slot="emoji-picker-loading"
      {...props}
    />
  );
};
