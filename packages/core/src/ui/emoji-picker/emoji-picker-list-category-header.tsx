"use client";

import type { ComponentProps } from "react";

import { cn, tv, type VariantProps } from "tailwind-variants";

import type { UISize } from "../shared/size/size-system";

import { useEmojiPickerResolvedSize } from "./emoji-picker-size-context";

const emojiPickerListCategoryHeaderVariants = tv({
  base: "bg-popover font-medium text-muted-foreground",
  variants: {
    size: {
      xs: "px-2 pb-1 text-[10px]",
      sm: "px-2.5 pb-1 text-xs",
      md: "px-3 pb-1.5 text-xs",
      lg: "px-3.5 pb-1.5 text-sm",
      xl: "px-4 pb-2 text-sm",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type EmojiPickerListCategoryHeaderVariantProps = Omit<
  VariantProps<typeof emojiPickerListCategoryHeaderVariants>,
  "size"
> & {
  size?: UISize;
};

export type EmojiPickerListCategoryHeaderProps = {
  category: { label: string };
} & ComponentProps<"div"> &
  EmojiPickerListCategoryHeaderVariantProps;

export const EmojiPickerListCategoryHeader = ({
  category,
  className,
  size,
  ...restProps
}: EmojiPickerListCategoryHeaderProps) => {
  const resolvedSize = useEmojiPickerResolvedSize(size);

  return (
    <div
      className={cn(
        emojiPickerListCategoryHeaderVariants({ size: resolvedSize }),
        className
      )}
      data-size={resolvedSize}
      data-slot="emoji-picker-list-category-header"
      {...restProps}
    >
      {category.label}
    </div>
  );
};
