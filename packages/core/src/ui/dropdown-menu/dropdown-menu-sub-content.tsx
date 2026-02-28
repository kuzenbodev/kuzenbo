import type { ComponentProps } from "react";
import { useContext } from "react";
import { cn, tv } from "tailwind-variants";
import type { VariantProps } from "tailwind-variants";

import type { InputSize } from "../input/input";
import { DropdownMenuContent } from "./dropdown-menu-content";
import { DropdownMenuContext } from "./dropdown-menu-context";
import { DropdownMenuOverlayContext } from "./dropdown-menu-overlay-context";

const dropdownMenuSubContentVariants = tv({
  base: "w-auto shadow-lg",
  defaultVariants: {
    size: "md",
  },
  variants: {
    size: {
      lg: "min-w-[104px] rounded-md",
      md: "min-w-[96px] rounded-md",
      sm: "min-w-[90px] rounded-[min(var(--radius-md),10px)]",
      xl: "min-w-[112px] rounded-md",
      xs: "min-w-[84px] rounded-[min(var(--radius-md),8px)]",
    },
  },
});

export type DropdownMenuSubContentProps = ComponentProps<
  typeof DropdownMenuContent
> &
  VariantProps<typeof dropdownMenuSubContentVariants>;

const DropdownMenuSubContent = ({
  align = "start",
  alignOffset = -3,
  side = "right",
  sideOffset = 0,
  className,
  size,
  ...props
}: DropdownMenuSubContentProps) => {
  const { size: rootSize } = useContext(DropdownMenuContext);
  const { size: overlaySize } = useContext(DropdownMenuOverlayContext);
  const resolvedSize: InputSize = size ?? overlaySize ?? rootSize ?? "md";

  return (
    <DropdownMenuContent
      align={align}
      alignOffset={alignOffset}
      className={cn(
        dropdownMenuSubContentVariants({ size: resolvedSize }),
        className
      )}
      data-slot="dropdown-menu-sub-content"
      side={side}
      sideOffset={sideOffset}
      size={resolvedSize}
      {...props}
    />
  );
};

export { DropdownMenuSubContent };
