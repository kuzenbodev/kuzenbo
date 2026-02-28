"use client";

import { EmojiPicker as BaseEmojiPicker } from "frimousse";
import type { ComponentProps } from "react";
import { useMemo } from "react";
import { cn, tv } from "tailwind-variants";
import type { VariantProps } from "tailwind-variants";

import { useComponentSize } from "../shared/size/size-provider";
import type { UISize } from "../shared/size/size-system";
import { EmojiPickerActiveEmoji } from "./emoji-picker-active-emoji";
import { EmojiPickerActiveEmojiPreview } from "./emoji-picker-active-emoji-preview";
import { EmojiPickerContent } from "./emoji-picker-content";
import { EmojiPickerEmpty } from "./emoji-picker-empty";
import { EmojiPickerList } from "./emoji-picker-list";
import { EmojiPickerLoading } from "./emoji-picker-loading";
import { EmojiPickerSearch } from "./emoji-picker-search";
import { EmojiPickerSizeContext } from "./emoji-picker-size-context";
import { EmojiPickerSkinTone } from "./emoji-picker-skin-tone";
import { EmojiPickerSkinToneSelector } from "./emoji-picker-skin-tone-selector";

const emojiPickerVariants = tv({
  base: "border-border bg-popover isolate flex w-fit flex-col rounded-md border shadow-md",
  defaultVariants: {
    size: "md",
  },
  variants: {
    size: {
      lg: "h-96",
      md: "h-80",
      sm: "h-72 rounded-[min(var(--radius-md),10px)]",
      xl: "h-[28rem] rounded-xl",
      xs: "h-64 rounded-[min(var(--radius-md),8px)]",
    },
  },
});

type EmojiPickerVariantProps = Omit<
  VariantProps<typeof emojiPickerVariants>,
  "size"
> & {
  size?: UISize;
};

export type EmojiPickerProps = Omit<
  ComponentProps<typeof BaseEmojiPicker.Root>,
  "size"
> &
  EmojiPickerVariantProps;

const EmojiPicker = ({
  className,
  size: providedSize,
  ...props
}: EmojiPickerProps) => {
  const size = useComponentSize(providedSize);
  const contextValue = useMemo(() => ({ size }), [size]);

  return (
    <EmojiPickerSizeContext.Provider value={contextValue}>
      <BaseEmojiPicker.Root
        className={cn(emojiPickerVariants({ size }), className)}
        data-size={size}
        data-slot="emoji-picker"
        {...props}
      />
    </EmojiPickerSizeContext.Provider>
  );
};

EmojiPicker.ActiveEmoji = EmojiPickerActiveEmoji;
EmojiPicker.ActiveEmojiPreview = EmojiPickerActiveEmojiPreview;
EmojiPicker.Content = EmojiPickerContent;
EmojiPicker.Empty = EmojiPickerEmpty;
EmojiPicker.List = EmojiPickerList;
EmojiPicker.Loading = EmojiPickerLoading;
EmojiPicker.Search = EmojiPickerSearch;
EmojiPicker.SkinTone = EmojiPickerSkinTone;
EmojiPicker.SkinToneSelector = EmojiPickerSkinToneSelector;

export type { EmojiPickerActiveEmojiProps } from "./emoji-picker-active-emoji";
export type { EmojiPickerActiveEmojiPreviewProps } from "./emoji-picker-active-emoji-preview";
export type { EmojiPickerContentProps } from "./emoji-picker-content";
export type { EmojiPickerEmptyProps } from "./emoji-picker-empty";
export type { EmojiPickerListProps } from "./emoji-picker-list";
export type { EmojiPickerLoadingProps } from "./emoji-picker-loading";
export type { EmojiPickerSearchProps } from "./emoji-picker-search";
export type { EmojiPickerSize } from "./emoji-picker-size-context";
export type { EmojiPickerSkinToneProps } from "./emoji-picker-skin-tone";
export type { EmojiPickerSkinToneSelectorProps } from "./emoji-picker-skin-tone-selector";

export {
  EmojiPicker,
  EmojiPickerActiveEmoji,
  EmojiPickerActiveEmojiPreview,
  EmojiPickerContent,
  EmojiPickerEmpty,
  EmojiPickerList,
  EmojiPickerLoading,
  EmojiPickerSearch,
  EmojiPickerSkinTone,
  EmojiPickerSkinToneSelector,
};
