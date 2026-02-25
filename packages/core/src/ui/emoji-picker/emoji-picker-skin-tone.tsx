"use client";

import type { ComponentProps } from "react";

import { EmojiPicker as BaseEmojiPicker } from "frimousse";

import type { UISize } from "../shared/size/size-system";

import { useEmojiPickerResolvedSize } from "./emoji-picker-size-context";

export type EmojiPickerSkinToneProps = Omit<
  ComponentProps<typeof BaseEmojiPicker.SkinTone>,
  "size"
> & {
  size?: UISize;
};

export const EmojiPickerSkinTone = ({
  size,
  ...props
}: EmojiPickerSkinToneProps) => {
  const resolvedSize = useEmojiPickerResolvedSize(size);

  return (
    <BaseEmojiPicker.SkinTone
      data-size={resolvedSize}
      data-slot="emoji-picker-skin-tone"
      {...props}
    />
  );
};
