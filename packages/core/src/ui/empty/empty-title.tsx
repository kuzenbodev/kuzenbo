import type { ComponentProps } from "react";
import { cn, tv } from "tailwind-variants";
import type { VariantProps } from "tailwind-variants";

import type { UISize } from "../shared/size/size-system";
import { useResolvedEmptySize } from "./empty-size-context";

const emptyTitleVariants = tv({
  base: "text-foreground font-medium tracking-tight",
  defaultVariants: {
    size: "md",
  },
  variants: {
    size: {
      lg: "text-base",
      md: "text-sm",
      sm: "text-sm",
      xl: "text-lg",
      xs: "text-xs",
    },
  },
});

type EmptyTitleVariantProps = Omit<
  VariantProps<typeof emptyTitleVariants>,
  "size"
> & {
  size?: UISize;
};

export type EmptyTitleProps = ComponentProps<"div"> & EmptyTitleVariantProps;

const EmptyTitle = ({ className, size, ...props }: EmptyTitleProps) => {
  const resolvedSize = useResolvedEmptySize(size);

  return (
    <div
      className={cn(emptyTitleVariants({ size: resolvedSize }), className)}
      data-size={resolvedSize}
      data-slot="empty-title"
      {...props}
    />
  );
};

export { EmptyTitle };
