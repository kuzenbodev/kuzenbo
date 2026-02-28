"use client";

import type { ComponentProps } from "react";
import { cn, tv, type VariantProps } from "tailwind-variants";

import type { UISize } from "../shared/size/size-system";
import { useTableResolvedSize } from "./table-size-context";

const tableCaptionVariants = tv({
  base: "text-muted-foreground",
  variants: {
    size: {
      xs: "mt-2 text-xs",
      sm: "mt-3 text-xs",
      md: "mt-4 text-sm",
      lg: "mt-4 text-sm",
      xl: "mt-5 text-base",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type TableCaptionProps = ComponentProps<"caption"> &
  VariantProps<typeof tableCaptionVariants> & {
    size?: UISize;
  };

const TableCaption = ({ className, size, ...props }: TableCaptionProps) => {
  const resolvedSize = useTableResolvedSize(size);

  return (
    <caption
      className={cn(tableCaptionVariants({ size: resolvedSize }), className)}
      data-size={resolvedSize}
      data-slot="table-caption"
      {...props}
    />
  );
};

export { TableCaption, tableCaptionVariants };
