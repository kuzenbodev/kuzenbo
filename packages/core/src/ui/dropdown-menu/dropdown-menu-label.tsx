import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { useContext } from "react";
import { cn, tv } from "tailwind-variants";
import type { VariantProps } from "tailwind-variants";

import type { InputSize } from "../input/input";
import { DropdownMenuContext } from "./dropdown-menu-context";
import { DropdownMenuOverlayContext } from "./dropdown-menu-overlay-context";

const dropdownMenuLabelVariants = tv({
  base: "text-muted-foreground font-medium data-[inset]:pl-8",
  defaultVariants: {
    size: "md",
  },
  variants: {
    size: {
      lg: "px-2 py-1.5 text-xs",
      md: "px-1.5 py-1 text-xs",
      sm: "px-1.5 py-1 text-xs",
      xl: "px-2.5 py-1.5 text-sm",
      xs: "px-1.5 py-1 text-[11px]",
    },
  },
});

export type DropdownMenuLabelProps = MenuPrimitive.GroupLabel.Props & {
  inset?: boolean;
} & VariantProps<typeof dropdownMenuLabelVariants>;

const DropdownMenuLabel = ({
  className,
  inset,
  size,
  ...props
}: DropdownMenuLabelProps) => {
  const { size: rootSize } = useContext(DropdownMenuContext);
  const { size: overlaySize } = useContext(DropdownMenuOverlayContext);
  const resolvedSize: InputSize = size ?? overlaySize ?? rootSize ?? "md";

  return (
    <MenuPrimitive.GroupLabel
      className={cn(
        dropdownMenuLabelVariants({ size: resolvedSize }),
        className
      )}
      data-inset={inset}
      data-size={resolvedSize}
      data-slot="dropdown-menu-label"
      {...props}
    />
  );
};

export { DropdownMenuLabel };
