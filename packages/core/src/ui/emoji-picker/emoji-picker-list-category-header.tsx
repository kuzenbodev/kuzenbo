"use client";

import type { ComponentProps } from "react";
import { cn, tv } from "tailwind-variants";
import type { VariantProps } from "tailwind-variants";

import type { UISize } from "../shared/size/size-system";
import { useEmojiPickerResolvedSize } from "./emoji-picker-size-context";

const emojiPickerListCategoryHeaderVariants = tv({
  base: "bg-popover text-muted-foreground font-medium",
  defaultVariants: {
    size: "md",
  },
  variants: {
    size: {
      lg: "px-3.5 pb-1.5 text-sm",
      md: "px-3 pb-1.5 text-xs",
      sm: "px-2.5 pb-1 text-xs",
      xl: "px-4 pb-2 text-sm",
      xs: "px-2 pb-1 text-[10px]",
    },
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
