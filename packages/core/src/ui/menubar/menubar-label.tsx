import type { ComponentProps } from "react";
import { useContext } from "react";
import { cn, tv } from "tailwind-variants";
import type { VariantProps } from "tailwind-variants";

import { DropdownMenuLabel } from "../dropdown-menu/dropdown-menu";
import type { InputSize } from "../input/input";
import { MenubarContext } from "./menubar-context";
import { MenubarOverlayContext } from "./menubar-overlay-context";

const menubarLabelVariants = tv({
  base: "font-medium data-[inset]:pl-8",
  defaultVariants: {
    size: "md",
  },
  variants: {
    size: {
      lg: "px-2 py-1.5 text-sm",
      md: "px-1.5 py-1 text-sm",
      sm: "px-1.5 py-1 text-xs",
      xl: "px-2.5 py-1.5 text-base",
      xs: "px-1.5 py-1 text-xs",
    },
  },
});

export type MenubarLabelProps = ComponentProps<typeof DropdownMenuLabel> &
  VariantProps<typeof menubarLabelVariants> & {
    size?: InputSize;
  };

const MenubarLabel = ({
  className,
  inset,
  size,
  ...props
}: MenubarLabelProps) => {
  const { size: rootSize } = useContext(MenubarContext);
  const { size: overlaySize } = useContext(MenubarOverlayContext);
  const resolvedSize: InputSize = size ?? overlaySize ?? rootSize ?? "md";

  return (
    <DropdownMenuLabel
      className={cn(menubarLabelVariants({ size: resolvedSize }), className)}
      data-inset={inset}
      data-size={resolvedSize}
      data-slot="menubar-label"
      size={resolvedSize}
      {...props}
    />
  );
};

export { MenubarLabel };
