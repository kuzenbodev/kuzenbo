import type { ComponentProps } from "react";
import { cn, tv } from "tailwind-variants";
import type { VariantProps } from "tailwind-variants";

import type { UISize } from "../shared/size/size-system";
import { useResolvedEmptySize } from "./empty-size-context";

const emptyContentVariants = tv({
  base: "flex w-full min-w-0 flex-col items-center text-balance",
  defaultVariants: {
    size: "md",
  },
  variants: {
    size: {
      lg: "max-w-md gap-3 text-sm",
      md: "max-w-sm gap-2.5 text-sm",
      sm: "max-w-sm gap-2 text-sm",
      xl: "max-w-md gap-3.5 text-base",
      xs: "max-w-xs gap-1.5 text-xs",
    },
  },
});

type EmptyContentVariantProps = Omit<
  VariantProps<typeof emptyContentVariants>,
  "size"
> & {
  size?: UISize;
};

export type EmptyContentProps = ComponentProps<"div"> &
  EmptyContentVariantProps;

const EmptyContent = ({ className, size, ...props }: EmptyContentProps) => {
  const resolvedSize = useResolvedEmptySize(size);

  return (
    <div
      className={cn(emptyContentVariants({ size: resolvedSize }), className)}
      data-size={resolvedSize}
      data-slot="empty-content"
      {...props}
    />
  );
};

export { EmptyContent };
