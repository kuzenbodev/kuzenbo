import type { ComponentProps } from "react";
import { cn, tv, type VariantProps } from "tailwind-variants";

import type { UISize } from "../shared/size/size-system";
import { useResolvedEmptySize } from "./empty-size-context";

const emptyHeaderVariants = tv({
  base: "flex flex-col items-center",
  variants: {
    size: {
      xs: "max-w-xs gap-1.5",
      sm: "max-w-sm gap-2",
      md: "max-w-sm gap-2.5",
      lg: "max-w-md gap-3",
      xl: "max-w-md gap-3.5",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type EmptyHeaderVariantProps = Omit<
  VariantProps<typeof emptyHeaderVariants>,
  "size"
> & {
  size?: UISize;
};

export type EmptyHeaderProps = ComponentProps<"div"> & EmptyHeaderVariantProps;

const EmptyHeader = ({ className, size, ...props }: EmptyHeaderProps) => {
  const resolvedSize = useResolvedEmptySize(size);

  return (
    <div
      className={cn(emptyHeaderVariants({ size: resolvedSize }), className)}
      data-size={resolvedSize}
      data-slot="empty-header"
      {...props}
    />
  );
};

export { EmptyHeader };
