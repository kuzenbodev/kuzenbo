import type { ComponentProps } from "react";
import { cn, tv } from "tailwind-variants";
import type { VariantProps } from "tailwind-variants";

import type { UISize } from "../shared/size/size-system";
import { useResolvedEmptySize } from "./empty-size-context";

const emptyDescriptionVariants = tv({
  base: "text-muted-foreground [&>a:hover]:text-primary-foreground [&>a]:underline [&>a]:underline-offset-4",
  defaultVariants: {
    size: "md",
  },
  variants: {
    size: {
      lg: "text-base/relaxed",
      md: "text-sm/relaxed",
      sm: "text-sm/relaxed",
      xl: "text-base/relaxed",
      xs: "text-xs/relaxed",
    },
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
