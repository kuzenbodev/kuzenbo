import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { useContext } from "react";
import { cn, tv } from "tailwind-variants";
import type { VariantProps } from "tailwind-variants";

import type { InputSize } from "../input/input";
import { DropdownMenuContext } from "./dropdown-menu-context";
import { DropdownMenuOverlayContext } from "./dropdown-menu-overlay-context";

const dropdownMenuSeparatorVariants = tv({
  base: "bg-border h-px",
  defaultVariants: {
    size: "md",
  },
  variants: {
    size: {
      lg: "-mx-1.5 my-1.5",
      md: "-mx-1 my-1",
      sm: "-mx-0.5 my-0.5",
      xl: "-mx-2 my-2",
      xs: "-mx-0.5 my-0.5",
    },
  },
});

export type DropdownMenuSeparatorProps = MenuPrimitive.Separator.Props;

const DropdownMenuSeparator = ({
  className,
  size,
  ...props
}: DropdownMenuSeparatorProps &
  VariantProps<typeof dropdownMenuSeparatorVariants>) => {
  const { size: rootSize } = useContext(DropdownMenuContext);
  const { size: overlaySize } = useContext(DropdownMenuOverlayContext);
  const resolvedSize: InputSize = size ?? overlaySize ?? rootSize ?? "md";

  return (
    <MenuPrimitive.Separator
      className={cn(
        dropdownMenuSeparatorVariants({ size: resolvedSize }),
        className
      )}
      data-size={resolvedSize}
      data-slot="dropdown-menu-separator"
      {...props}
    />
  );
};

export { DropdownMenuSeparator };
