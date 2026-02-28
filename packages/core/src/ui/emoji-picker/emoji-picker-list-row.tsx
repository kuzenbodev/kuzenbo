"use client";

import type { ComponentProps } from "react";
import { useMemo } from "react";
import { cn, tv } from "tailwind-variants";
import type { VariantProps } from "tailwind-variants";

import type { UISize } from "../shared/size/size-system";
import {
  EmojiPickerSizeContext,
  useEmojiPickerResolvedSize,
} from "./emoji-picker-size-context";

const emojiPickerListRowVariants = tv({
  base: "",
  defaultVariants: {
    size: "md",
  },
  variants: {
    size: {
      lg: "scroll-my-2 px-2",
      md: "scroll-my-1.5 px-1.5",
      sm: "scroll-my-1.5 px-1.5",
      xl: "scroll-my-2 px-2.5",
      xs: "scroll-my-1 px-1",
    },
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
