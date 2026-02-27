"use client";

import { Switch as SwitchPrimitive } from "@base-ui/react/switch";
import { tv, type VariantProps } from "tailwind-variants";

import type { UISize } from "../shared/size/size-system";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";
import { useComponentSize } from "../shared/size/size-provider";
import { SwitchThumb } from "./switch-thumb";

const switchVariants = tv({
  base: "peer group/switch relative inline-flex shrink-0 cursor-clickable items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-danger aria-invalid:ring-[3px] aria-invalid:ring-danger/20 data-checked:bg-primary data-disabled:cursor-not-allowed data-disabled:opacity-50 data-unchecked:bg-input dark:aria-invalid:border-danger/50 dark:aria-invalid:ring-danger/40 dark:data-unchecked:bg-input/80",
  variants: {
    size: {
      xs: "h-3 w-5 after:absolute after:-inset-1.5",
      sm: "h-3.5 w-6 after:absolute after:-inset-2",
      md: "h-4 w-7 after:absolute after:-inset-2.5",
      lg: "h-[18px] w-8 after:absolute after:-inset-3",
      xl: "h-5 w-9 after:absolute after:-inset-3.5",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type SwitchVariantProps = Omit<VariantProps<typeof switchVariants>, "size"> & {
  size?: UISize;
};

export type SwitchProps = SwitchPrimitive.Root.Props & SwitchVariantProps;

const Switch = ({
  className,
  size: providedSize,
  children,
  ...props
}: SwitchProps) => {
  const size = useComponentSize(providedSize);

  return (
    <SwitchPrimitive.Root
      className={mergeBaseUIClassName<SwitchPrimitive.Root.State>(
        switchVariants({ size }),
        className
      )}
      data-size={size}
      data-slot="switch"
      {...props}
    >
      {children ?? <SwitchThumb />}
    </SwitchPrimitive.Root>
  );
};

Switch.Thumb = SwitchThumb;

export type { SwitchThumbProps } from "./switch-thumb";
export { Switch, SwitchThumb };
