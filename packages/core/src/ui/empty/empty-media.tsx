import type { ComponentProps } from "react";

import { cn, tv, type VariantProps } from "tailwind-variants";

import type { UISize } from "../shared/size/size-system";

import { useResolvedEmptySize } from "./empty-size-context";

const emptyMediaVariants = tv({
  base: "mb-2 flex shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0",
  compoundVariants: [
    {
      class: "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
      size: "xs",
      variant: "icon",
    },
    {
      class: "size-7 rounded-md [&_svg:not([class*='size-'])]:size-3.5",
      size: "sm",
      variant: "icon",
    },
    {
      class: "size-8 rounded-lg [&_svg:not([class*='size-'])]:size-4",
      size: "md",
      variant: "icon",
    },
    {
      class: "size-9 rounded-lg [&_svg:not([class*='size-'])]:size-4",
      size: "lg",
      variant: "icon",
    },
    {
      class: "size-10 rounded-xl [&_svg:not([class*='size-'])]:size-5",
      size: "xl",
      variant: "icon",
    },
  ],
  variants: {
    size: {
      xs: "mb-1.5 [&_svg:not([class*='size-'])]:size-3",
      sm: "mb-2 [&_svg:not([class*='size-'])]:size-3.5",
      md: "mb-2 [&_svg:not([class*='size-'])]:size-4",
      lg: "mb-2.5 [&_svg:not([class*='size-'])]:size-4",
      xl: "mb-3 [&_svg:not([class*='size-'])]:size-5",
    },
    variant: {
      default: "bg-transparent",
      icon: "shrink-0 bg-muted text-foreground",
    },
  },
  defaultVariants: {
    size: "md",
    variant: "default",
  },
});

type EmptyMediaVariantProps = Omit<
  VariantProps<typeof emptyMediaVariants>,
  "size"
> & {
  size?: UISize;
};

export type EmptyMediaProps = ComponentProps<"div"> & EmptyMediaVariantProps;

const EmptyMedia = ({
  className,
  size,
  variant = "default",
  ...props
}: EmptyMediaProps) => {
  const resolvedSize = useResolvedEmptySize(size);

  return (
    <div
      className={cn(
        emptyMediaVariants({ size: resolvedSize, variant }),
        className
      )}
      data-size={resolvedSize}
      data-slot="empty-icon"
      data-variant={variant}
      {...props}
    />
  );
};

export { EmptyMedia };
