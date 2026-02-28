"use client";

import { EmojiPicker as BaseEmojiPicker } from "frimousse";
import type { ComponentProps } from "react";
import { cn, tv } from "tailwind-variants";
import type { VariantProps } from "tailwind-variants";

import type { UISize } from "../shared/size/size-system";
import { useEmojiPickerResolvedSize } from "./emoji-picker-size-context";

const emojiPickerLoadingVariants = tv({
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
