"use client";

import type { ComponentProps } from "react";
import { cn, tv } from "tailwind-variants";
import type { VariantProps } from "tailwind-variants";

import type { UISize } from "../shared/size/size-system";
import { useTableResolvedSize } from "./table-size-context";

const tableHeadVariants = tv({
  base: "text-foreground text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0",
  defaultVariants: {
    size: "md",
  },
  variants: {
    size: {
      lg: "h-11 px-2.5 text-sm",
      md: "h-10 px-2 text-sm",
      sm: "h-8 px-2 text-xs",
      xl: "h-12 px-3 text-base",
      xs: "h-7 px-1.5 text-xs",
    },
  },
});

export type TableHeadProps = ComponentProps<"th"> &
  VariantProps<typeof tableHeadVariants> & {
    size?: UISize;
  };

const TableHead = ({ className, size, ...props }: TableHeadProps) => {
  const resolvedSize = useTableResolvedSize(size);

  return (
    <th
      className={cn(tableHeadVariants({ size: resolvedSize }), className)}
      data-size={resolvedSize}
      data-slot="table-head"
      {...props}
    />
  );
};

export { TableHead, tableHeadVariants };
