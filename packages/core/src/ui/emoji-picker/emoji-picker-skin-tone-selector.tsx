"use client";

import { EmojiPicker as BaseEmojiPicker } from "frimousse";
import type { ComponentProps } from "react";
import { cn, tv, type VariantProps } from "tailwind-variants";

import type { UISize } from "../shared/size/size-system";
import { useEmojiPickerResolvedSize } from "./emoji-picker-size-context";

const emojiPickerSkinToneSelectorVariants = tv({
  base: "bg-popover hover:bg-accent mx-2 mb-1.5 rounded-md",
  variants: {
    size: {
      xs: "size-6 text-sm",
      sm: "size-7 text-base",
      md: "size-8 text-lg",
      lg: "size-9 text-xl",
      xl: "size-10 text-2xl",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type EmojiPickerSkinToneSelectorVariantProps = Omit<
  VariantProps<typeof emojiPickerSkinToneSelectorVariants>,
  "size"
> & {
  size?: UISize;
};

export type EmojiPickerSkinToneSelectorProps = Omit<
  ComponentProps<typeof BaseEmojiPicker.SkinToneSelector>,
  "size"
> &
  EmojiPickerSkinToneSelectorVariantProps;

export const EmojiPickerSkinToneSelector = ({
  className,
  size,
  ...props
}: EmojiPickerSkinToneSelectorProps) => {
  const resolvedSize = useEmojiPickerResolvedSize(size);

  return (
    <BaseEmojiPicker.SkinToneSelector
      className={cn(
        emojiPickerSkinToneSelectorVariants({ size: resolvedSize }),
        className
      )}
      data-size={resolvedSize}
      data-slot="emoji-picker-skin-tone-selector"
      {...props}
    />
  );
};
