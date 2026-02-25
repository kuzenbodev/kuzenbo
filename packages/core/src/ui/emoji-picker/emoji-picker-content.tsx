"use client";

import type { ComponentProps } from "react";

import { EmojiPicker as BaseEmojiPicker } from "frimousse";
import { cn } from "tailwind-variants";

import type { UISize } from "../shared/size/size-system";

import {
  EmojiPickerSizeContext,
  useEmojiPickerResolvedSize,
} from "./emoji-picker-size-context";

export type EmojiPickerContentProps = Omit<
  ComponentProps<typeof BaseEmojiPicker.Viewport>,
  "size"
> & {
  size?: UISize;
};

export const EmojiPickerContent = ({
  className,
  size,
  children,
  ...props
}: EmojiPickerContentProps) => {
  const resolvedSize = useEmojiPickerResolvedSize(size);

  return (
    <EmojiPickerSizeContext.Provider value={{ size: resolvedSize }}>
      <BaseEmojiPicker.Viewport
        className={cn("relative flex-1 outline-hidden", className)}
        data-size={resolvedSize}
        data-slot="emoji-picker-content"
        {...props}
      >
        {children}
      </BaseEmojiPicker.Viewport>
    </EmojiPickerSizeContext.Provider>
  );
};
