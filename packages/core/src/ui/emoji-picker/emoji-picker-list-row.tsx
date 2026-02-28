"use client";

import type { ComponentProps } from "react";
import { useMemo } from "react";
import { cn, tv, type VariantProps } from "tailwind-variants";

import type { UISize } from "../shared/size/size-system";
import {
  EmojiPickerSizeContext,
  useEmojiPickerResolvedSize,
} from "./emoji-picker-size-context";

const emojiPickerListRowVariants = tv({
  base: "",
  variants: {
    size: {
      xs: "scroll-my-1 px-1",
      sm: "scroll-my-1.5 px-1.5",
      md: "scroll-my-1.5 px-1.5",
      lg: "scroll-my-2 px-2",
      xl: "scroll-my-2 px-2.5",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type EmojiPickerListRowVariantProps = Omit<
  VariantProps<typeof emojiPickerListRowVariants>,
  "size"
> & {
  size?: UISize;
};

export type EmojiPickerListRowProps = ComponentProps<"div"> &
  EmojiPickerListRowVariantProps;

export const EmojiPickerListRow = ({
  children,
  className,
  size,
  ...restProps
}: EmojiPickerListRowProps) => {
  const resolvedSize = useEmojiPickerResolvedSize(size);
  const contextValue = useMemo(() => ({ size: resolvedSize }), [resolvedSize]);

  return (
    <EmojiPickerSizeContext.Provider value={contextValue}>
      <div
        className={cn(
          emojiPickerListRowVariants({ size: resolvedSize }),
          className
        )}
        data-size={resolvedSize}
        data-slot="emoji-picker-list-row"
        {...restProps}
      >
        {children}
      </div>
    </EmojiPickerSizeContext.Provider>
  );
};
