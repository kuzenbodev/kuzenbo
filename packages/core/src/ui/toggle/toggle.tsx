"use client";

import { Toggle as TogglePrimitive } from "@base-ui/react/toggle";
import { tv, type VariantProps } from "tailwind-variants";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";
import { useComponentSize } from "../shared/size/size-provider";

const toggleVariants = tv({
  base: "group/toggle inline-flex cursor-clickable items-center justify-center gap-1 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none hover:bg-muted hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-danger aria-invalid:ring-danger/20 aria-pressed:bg-muted data-pressed:bg-muted dark:aria-invalid:ring-danger/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  variants: {
    variant: {
      default: "bg-transparent",
      outline: "border border-input bg-transparent hover:bg-muted",
    },
    size: {
      xs: "h-6 min-w-6 rounded-[min(var(--radius-md),8px)] px-1.5 text-xs [&_svg:not([class*='size-'])]:size-3",
      sm: "h-7 min-w-7 rounded-[min(var(--radius-md),10px)] px-1.5",
      md: "h-8 min-w-8 px-2",
      lg: "h-9 min-w-9 px-2.5",
      xl: "h-10 min-w-10 px-3 text-base [&_svg:not([class*='size-'])]:size-5",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

export type ToggleProps = TogglePrimitive.Props &
  VariantProps<typeof toggleVariants>;

const Toggle = ({
  className,
  variant = "default",
  size: providedSize,
  ...props
}: ToggleProps) => {
  const size = useComponentSize(providedSize);

  return (
    <TogglePrimitive
      className={mergeBaseUIClassName<TogglePrimitive.State>(
        toggleVariants({ variant, size }),
        className
      )}
      data-slot="toggle"
      {...props}
    />
  );
};

export { Toggle, toggleVariants };
