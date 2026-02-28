"use client";

import { EmojiPicker as BaseEmojiPicker } from "frimousse";
import type { ComponentProps } from "react";
import { cn, tv, type VariantProps } from "tailwind-variants";

import type { UISize } from "../shared/size/size-system";
import { useEmojiPickerResolvedSize } from "./emoji-picker-size-context";

const emojiPickerSearchWrapperVariants = tv({
  variants: {
    size: {
      xs: "p-1.5",
      sm: "p-2",
      md: "p-2",
      lg: "p-2.5",
      xl: "p-3",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const emojiPickerSearchVariants = tv({
  base: "z-overlay border-input bg-input selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground hover:border-ring/70 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-danger aria-invalid:ring-danger/50 flex w-full min-w-0 border shadow-xs transition-[color,box-shadow,border-color] outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50",
  variants: {
    size: {
      xs: "h-6 rounded-[min(var(--radius-md),8px)] px-2 text-xs",
      sm: "h-8 rounded-[min(var(--radius-md),10px)] px-2.5 text-sm",
      md: "h-9 rounded-md px-3 text-base md:text-sm",
      lg: "h-10 rounded-md px-3 text-base md:text-sm",
      xl: "h-11 rounded-md px-4 text-base",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type EmojiPickerSearchVariantProps = Omit<
  VariantProps<typeof emojiPickerSearchVariants>,
  "size"
> & {
  size?: UISize;
};

type NativeEmojiPickerSearchProps = ComponentProps<
  typeof BaseEmojiPicker.Search
>;
type NativeEmojiPickerSearchSize = NativeEmojiPickerSearchProps["size"];

export type EmojiPickerSearchProps = Omit<
  NativeEmojiPickerSearchProps,
  "size"
> &
  EmojiPickerSearchVariantProps & {
    htmlSize?: NativeEmojiPickerSearchSize;
    wrapperClassName?: string;
  };

export const EmojiPickerSearch = ({
  className,
  htmlSize,
  size,
  wrapperClassName,
  ...props
}: EmojiPickerSearchProps) => {
  const resolvedSize = useEmojiPickerResolvedSize(size);

  return (
    <div
      className={cn(
        emojiPickerSearchWrapperVariants({ size: resolvedSize }),
        wrapperClassName
      )}
      data-size={resolvedSize}
      data-slot="emoji-picker-search-wrapper"
    >
      <BaseEmojiPicker.Search
        className={cn(
          emojiPickerSearchVariants({ size: resolvedSize }),
          className
        )}
        data-size={resolvedSize}
        data-slot="emoji-picker-search"
        size={htmlSize}
        {...props}
      />
    </div>
  );
};
