import type { ComponentProps } from "react";

import { cn, tv, type VariantProps } from "tailwind-variants";

import type { UISize } from "../shared/size/size-system";

import { useResolvedEmptySize } from "./empty-size-context";

const emptyDescriptionVariants = tv({
  base: "text-muted-foreground [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary-foreground",
  variants: {
    size: {
      xs: "text-xs/relaxed",
      sm: "text-sm/relaxed",
      md: "text-sm/relaxed",
      lg: "text-base/relaxed",
      xl: "text-base/relaxed",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type EmptyDescriptionVariantProps = Omit<
  VariantProps<typeof emptyDescriptionVariants>,
  "size"
> & {
  size?: UISize;
};

export type EmptyDescriptionProps = ComponentProps<"p"> &
  EmptyDescriptionVariantProps;

const EmptyDescription = ({
  className,
  size,
  ...props
}: EmptyDescriptionProps) => {
  const resolvedSize = useResolvedEmptySize(size);

  return (
    <div
      className={cn(
        emptyDescriptionVariants({ size: resolvedSize }),
        className
      )}
      data-size={resolvedSize}
      data-slot="empty-description"
      {...props}
    />
  );
};

export { EmptyDescription };
