"use client";

import type { ComponentProps } from "react";
import { useMemo } from "react";
import { cn, tv, type VariantProps } from "tailwind-variants";

import { useComponentSize } from "../shared/size/size-provider";
import type { UISize } from "../shared/size/size-system";
import { EmptyButton } from "./empty-button";
import { EmptyContent } from "./empty-content";
import { EmptyDescription } from "./empty-description";
import { EmptyHeader } from "./empty-header";
import { EmptyMedia } from "./empty-media";
import { EmptySizeContext } from "./empty-size-context";
import { EmptyTitle } from "./empty-title";

const emptyVariants = tv({
  base: "flex w-full min-w-0 flex-1 flex-col items-center justify-center rounded-lg border-dashed text-center text-balance",
  variants: {
    size: {
      xs: "gap-2 p-4",
      sm: "gap-3 p-6",
      md: "gap-4 p-8",
      lg: "gap-5 p-10",
      xl: "gap-6 p-12",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type EmptyVariantProps = Omit<VariantProps<typeof emptyVariants>, "size"> & {
  size?: UISize;
};

export type EmptyProps = ComponentProps<"div"> & EmptyVariantProps;

const Empty = ({ className, size: providedSize, ...props }: EmptyProps) => {
  const size = useComponentSize(providedSize);
  const contextValue = useMemo(() => ({ size }), [size]);

  return (
    <EmptySizeContext.Provider value={contextValue}>
      <div
        className={cn(emptyVariants({ size }), className)}
        data-size={size}
        data-slot="empty"
        {...props}
      />
    </EmptySizeContext.Provider>
  );
};

Empty.Button = EmptyButton;
Empty.Content = EmptyContent;
Empty.Description = EmptyDescription;
Empty.Header = EmptyHeader;
Empty.Media = EmptyMedia;
Empty.Title = EmptyTitle;

export {
  Empty,
  EmptyButton,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
};

export type { EmptyButtonProps } from "./empty-button";
export type { EmptyContentProps } from "./empty-content";
export type { EmptyDescriptionProps } from "./empty-description";
export type { EmptyHeaderProps } from "./empty-header";
export type { EmptyMediaProps } from "./empty-media";
export type { EmptyTitleProps } from "./empty-title";
