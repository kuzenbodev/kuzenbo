import type { ComponentProps } from "react";

import { cn, tv, type VariantProps } from "tailwind-variants";
export type ItemMediaProps = ComponentProps<"div"> &
  VariantProps<typeof itemMediaVariants>;

const itemMediaVariants = tv({
  base: "flex shrink-0 items-center justify-center gap-2 group-has-[[data-slot=item-description]]/item:translate-y-0.5 group-has-[[data-slot=item-description]]/item:self-start [&_svg]:pointer-events-none",
  variants: {
    variant: {
      default: "bg-transparent",
      icon: "[&_svg:not([class*='size-'])]:size-4",
      image:
        "overflow-hidden rounded-sm group-data-[size=xs]/item:size-6 group-data-[size=sm]/item:size-8 group-data-[size=md]/item:size-10 group-data-[size=lg]/item:size-12 group-data-[size=xl]/item:size-14 [&_img]:size-full [&_img]:object-cover",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const ItemMedia = ({
  className,
  variant = "default",
  ...props
}: ItemMediaProps) => (
  <div
    className={cn(itemMediaVariants({ variant }), className)}
    data-slot="item-media"
    data-variant={variant}
    {...props}
  />
);

export { ItemMedia };
